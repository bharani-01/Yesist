import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { sha256Hex } from '../../core/security/hashing.js';
import { writeAudit } from '../../shared/audit.js';
import { advanceUnits, recordCustodyEvent } from '../../shared/custody.js';
import * as repo from './attestations.repository.js';

export async function draftAttestation(lotId, input, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const lot = await repo.findReceivedLot(tx, lotId, ctx.org.id);
    if (!lot) throw Errors.conflict('not_attestable', 'Only received lots without an open dispute can be attested.');
    const draft = await repo.insertDraft(tx, {
      lotId,
      issuerOrgId: ctx.org.id,
      registrationNo: await repo.findRegistrationNo(tx, ctx.org.id),
      processedKg: input.processedKg,
      batteryKg: input.batteryKg,
      unitCount: lot.unitCountReceived ?? 0,
      makerId: ctx.userId,
    });
    if (!draft) throw Errors.conflict('attestation_exists', 'This lot already has an attestation.');
    await recordCustodyEvent(tx, { lotId, type: 'attestation_drafted', actorId: ctx.userId, orgId: ctx.org.id, detail: input });
    await writeAudit(tx, { actor: ctx, action: 'attestation.draft', entity: 'attestation', entityId: draft.id });
    return draft;
  });
}

/** Checker approval by a different user; issues the public number and content hash (PRD v3 §8.6 rule 6). */
export async function approveAttestation(id, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const a = await repo.lockForApproval(tx, id, ctx.org.id);
    if (!a) throw Errors.notFound('Attestation');
    if (a.status !== 'draft') throw Errors.conflict('already_issued', 'This attestation is already issued.');

    const issuedAt = new Date();
    const serial = await repo.nextAttestationSerial(tx);
    const publicNumber = `ECS-ATT-${issuedAt.getFullYear()}-${String(serial).padStart(6, '0')}`;
    const sha256 = sha256Hex(JSON.stringify({
      publicNumber, lotSeal: a.sealTag, issuerOrgId: a.issuerOrgId, registrationNo: a.registrationNo,
      processedKg: a.processedKg, batteryKg: a.batteryKg, unitCount: a.unitCount,
      makerId: a.makerId, checkerId: ctx.userId, issuedAt: issuedAt.toISOString(), disclaimerVersion: a.disclaimerVersion,
    }));

    await repo.markIssued(tx, id, { checkerId: ctx.userId, publicNumber, sha256, issuedAt });
    await repo.markLotAttested(tx, a.lotId);
    await advanceUnits(tx, await repo.closeLotPickups(tx, a.lotId), 'processed', a.lotId);
    await recordCustodyEvent(tx, { lotId: a.lotId, type: 'attested', actorId: ctx.userId, orgId: ctx.org.id, detail: { publicNumber } });
    await writeAudit(tx, { actor: ctx, action: 'attestation.issue', entity: 'attestation', entityId: id, detail: { publicNumber, sha256 } });
    return { id, publicNumber, sha256, issuedAt };
  });
}
