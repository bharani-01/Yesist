import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import { advanceUnits, compareWeights, flagArrival, loadSchemeSettings, raiseFlag, recordCustodyEvent } from '../../shared/custody.js';
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
 * Gate receipt: receiver weight vs the previous custodian's (the hub when the lot came through one,
 * otherwise the agent), seal check, unit count, and the optional QR label scan.
 */
export async function receiveLot(id, input, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const lot = await repo.lockReceivableLot(tx, id, ctx.org.id);
    if (!lot) return null;
    const settings = await loadSchemeSettings(tx);
    const viaHub = lot.hubOrgId != null;
    const expectedKg = Number(viaHub ? lot.hubNetKg : lot.senderNetKg);
    const receiver = input.receiverNetKg;
    const weights = { ...compareWeights(settings, expectedKg, receiver), expectedKg, measuredKg: receiver };
    const accepted = weights.acceptedKg;
    const status = input.sealIntact ? 'received' : 'disputed';
    const handedOverBy = viaHub ? lot.hubOrgId : lot.agentOrgId;

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
    if (lot.shipmentId) await repo.closeShipmentIfComplete(tx, lot.shipmentId);

    const flags = [];
    if (missing.length) {
      await repo.markUnitsMissing(tx, id, missing.map((u) => u.id));
      flags.push('unit_missing_at_scan');
      await raiseFlag(tx, {
        type: 'unit_missing_at_scan', severity: 'high', orgId: handedOverBy, lotId: id,
        summary: `Lot ${lot.sealTag}: ${missing.length} labelled unit${missing.length === 1 ? ' was' : 's were'} not found when scanned at the gate`,
        evidence: { missing: missing.map((u) => ({ qrPublicId: u.qrPublicId, last4: u.last4 })) },
        dedupeKey: `scan:${id}`,
      });
    }
    flags.push(...await flagArrival(tx, settings, {
      stage: 'recycler', lot, orgId: handedOverBy, weights, sealIntact: input.sealIntact,
      unitsSent: viaHub ? lot.hubUnitCount : lot.unitCountSent, unitsReceived: input.unitCountReceived,
    }));
    await recordCustodyEvent(tx, {
      lotId: id, type: 'received', actorId: ctx.userId, orgId: ctx.org.id,
      detail: {
        netKg: receiver, acceptedNetKg: accepted, sealIntact: input.sealIntact, unitCountReceived: input.unitCountReceived, flags,
        ...(input.scan && { scannedLabels: input.scan.qrIds.length, missingLabels: missing.length }),
      },
    });
    await writeAudit(tx, { actor: ctx, action: 'lot.receive', entity: 'lot', entityId: id, detail: { flags } });
    return {
      status, acceptedNetKg: accepted.toFixed(3), variancePct: Number(weights.variancePct.toFixed(2)), tolerancePct: weights.tolerancePct, flags,
      missingLabels: missing.map((u) => u.qrPublicId.slice(-6)),
    };
  });
  if (!result) throw Errors.conflict('not_receivable', 'Only lots on their way to your gate can be received. Lots routed through a hub arrive in its shipment.');
  return result;
}
