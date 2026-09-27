import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import { advanceUnits, loadSchemeSettings, raiseFlag, recordCustodyEvent, weightTolerancePct } from '../../shared/custody.js';
import * as repo from './intake.repository.js';

export const listInboundLots = (ctx) => withTx(ctx.userId, (tx) => repo.listInbound(tx, ctx.org.id));

export async function getLot(id, ctx) {
  const lot = await withTx(ctx.userId, async (tx) => {
    const row = await repo.findLot(tx, id, ctx.org.id);
    if (!row) return null;
    const labelled = await repo.listLabelledUnits(tx, id);
    return {
      ...row,
      contents: await repo.listLotContents(tx, id),
      labelledUnits: labelled.map(({ id: _id, ...u }) => u),
      attestation: await repo.findLotAttestation(tx, id, ctx.userId),
    };
  });
  if (!lot) throw Errors.notFound('Lot');
  return lot;
}

/**
 * Gate receipt: receiver weight vs sender weight, seal check, unit count.
 * Outside tolerance the lower reading is accepted and a dispute is flagged (PRD v3 §16.4 step 5).
 */
export async function receiveLot(id, input, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const lot = await repo.lockInTransitLot(tx, id, ctx.org.id);
    if (!lot) return null;
    const settings = await loadSchemeSettings(tx);
    const sender = Number(lot.senderNetKg);
    const receiver = input.receiverNetKg;
    const variancePct = (Math.abs(receiver - sender) / sender) * 100;
    const tolerancePct = weightTolerancePct(settings);
    const withinTolerance = variancePct <= tolerancePct;
    const accepted = withinTolerance ? receiver : Math.min(sender, receiver);
    const status = input.sealIntact ? 'received' : 'disputed';

    let missing = [];
    if (input.scan) {
      const labelled = await repo.listLabelledUnits(tx, id);
      const expected = new Set(labelled.map((u) => u.qrPublicId));
      const stray = input.scan.qrIds.filter((qr) => !expected.has(qr));
      if (stray.length) {
        throw Errors.badRequest('qr_not_in_lot', `${stray.length} scanned label${stray.length === 1 ? ' does' : 's do'} not belong to this lot (…${stray[0].slice(-4)}). Set ${stray.length === 1 ? 'it' : 'them'} aside and rescan.`);
      }
      const scanned = new Set(input.scan.qrIds);
      missing = labelled.filter((u) => !scanned.has(u.qrPublicId));
    }

    await repo.insertReceiverWeight(tx, id, receiver, ctx.userId);
    await repo.markReceived(tx, id, {
      status, receiverNetKg: receiver, acceptedNetKg: accepted.toFixed(3),
      sealIntact: input.sealIntact, unitCountReceived: input.unitCountReceived,
    });
    await advanceUnits(tx, await repo.markPickupsReceived(tx, id), 'received_at_recycler', id);

    const flags = [];
    if (missing.length) {
      await repo.markUnitsMissing(tx, id, missing.map((u) => u.id));
      flags.push('unit_missing_at_scan');
      await raiseFlag(tx, {
        type: 'unit_missing_at_scan', severity: 'high', orgId: lot.agentOrgId, lotId: id,
        summary: `Lot ${lot.sealTag}: ${missing.length} labelled unit${missing.length === 1 ? ' was' : 's were'} not found when scanned at the gate`,
        evidence: { missing: missing.map((u) => ({ qrPublicId: u.qrPublicId, last4: u.last4 })) },
        dedupeKey: `scan:${id}`,
      });
    }
    if (!withinTolerance) {
      flags.push('weight_variance');
      await raiseFlag(tx, {
        type: 'weight_variance', severity: variancePct > tolerancePct * 2 ? 'high' : 'medium', orgId: lot.agentOrgId, lotId: id,
        summary: `Lot ${lot.sealTag}: receiver weight differs from sender weight by ${variancePct.toFixed(1)}% (tolerance ${tolerancePct}%)`,
        evidence: { senderNetKg: sender, receiverNetKg: receiver, acceptedNetKg: accepted, tolerancePct },
        dedupeKey: `weight:${id}`,
      });
    }
    if (!input.sealIntact) {
      flags.push('seal_broken');
      await raiseFlag(tx, {
        type: 'seal_broken', severity: 'high', orgId: lot.agentOrgId, lotId: id,
        summary: `Lot ${lot.sealTag} arrived with a broken or mismatched seal`,
        evidence: { sealTag: lot.sealTag }, dedupeKey: `seal:${id}`,
      });
    }
    const receivedPct = lot.unitCountSent > 0 ? (input.unitCountReceived / lot.unitCountSent) * 100 : 100;
    if (receivedPct < settings.unit_leakage_min_pct) {
      flags.push('unit_count_leakage');
      await raiseFlag(tx, {
        type: 'unit_count_leakage', severity: receivedPct < 90 ? 'high' : 'medium', orgId: lot.agentOrgId, lotId: id,
        summary: `Lot ${lot.sealTag}: ${input.unitCountReceived} of ${lot.unitCountSent} units received (${receivedPct.toFixed(1)}%)`,
        evidence: { sent: lot.unitCountSent, received: input.unitCountReceived }, dedupeKey: `units:${id}`,
      });
    }
    await recordCustodyEvent(tx, {
      lotId: id, type: 'received', actorId: ctx.userId, orgId: ctx.org.id,
      detail: {
        netKg: receiver, acceptedNetKg: accepted, sealIntact: input.sealIntact, unitCountReceived: input.unitCountReceived, flags,
        ...(input.scan && { scannedLabels: input.scan.qrIds.length, missingLabels: missing.length }),
      },
    });
    await writeAudit(tx, { actor: ctx, action: 'lot.receive', entity: 'lot', entityId: id, detail: { flags } });
    return {
      status, acceptedNetKg: accepted.toFixed(3), variancePct: Number(variancePct.toFixed(2)), tolerancePct, flags,
      missingLabels: missing.map((u) => u.qrPublicId.slice(-6)),
    };
  });
  if (!result) throw Errors.conflict('not_receivable', 'Only lots in transit to your organisation can be received.');
  return result;
}
