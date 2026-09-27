import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import { advanceUnits, recordCustodyEvent } from '../../shared/custody.js';
import * as repo from './lots.repository.js';

export const listMyLots = (ctx) => withTx(ctx.userId, (tx) => repo.listForAgent(tx, ctx.org.id));

/** Seals collected pickups into one lot. Storage time runs from the earliest collection (PRD v3 §16.4). */
export async function createLot({ sealTag, pickupIds }, ctx) {
  const uniqueIds = [...new Set(pickupIds)];
  return withTx(ctx.userId, async (tx) => {
    const agreement = await repo.findActiveAgreement(tx, ctx.org.id);
    if (!agreement) throw Errors.conflict('no_agreement', 'Your organisation has no active agreement with a registered recycler.');
    const pickups = await repo.lockCollectedPickups(tx, uniqueIds, ctx.org.id);
    if (pickups.length !== uniqueIds.length) {
      throw Errors.conflict('pickups_unavailable', 'Some pickups are not collected by you or are already in a lot.');
    }
    if (pickups.some((p) => p.principalOrgId !== agreement.principalOrgId)) {
      throw Errors.conflict('mixed_principal', 'All pickups in a lot must belong to the same recycler agreement.');
    }
    const storageStart = pickups.reduce((min, p) => (p.collectedAt < min ? p.collectedAt : min), pickups[0].collectedAt);
    const units = pickups.reduce((sum, p) => sum + p.units, 0);
    const lot = await repo.insertLot(tx, {
      agentOrgId: ctx.org.id, principalOrgId: agreement.principalOrgId, agreementId: agreement.id,
      sealTag, storageStart, maxStorageDays: agreement.maxStorageDays, units, createdBy: ctx.userId,
    });
    await repo.assignPickupsToLot(tx, lot.id, uniqueIds);
    await advanceUnits(tx, uniqueIds, 'in_lot', lot.id);
    await recordCustodyEvent(tx, {
      lotId: lot.id, type: 'sealed', actorId: ctx.userId, orgId: ctx.org.id, detail: { sealTag, pickups: pickups.length, units },
    });
    for (const p of pickups) {
      await recordCustodyEvent(tx, { pickupId: p.id, lotId: lot.id, type: 'added_to_lot', actorId: ctx.userId, orgId: ctx.org.id });
    }
    await writeAudit(tx, { actor: ctx, action: 'lot.create', entity: 'lot', entityId: lot.id });
    return lot;
  });
}

export async function dispatchLot(id, input, ctx) {
  const lot = await withTx(ctx.userId, async (tx) => {
    const row = await repo.markDispatched(tx, id, ctx.org.id, input);
    if (!row) return null;
    await repo.insertSenderWeight(tx, id, input.senderNetKg, ctx.userId);
    await recordCustodyEvent(tx, { lotId: id, type: 'dispatched', actorId: ctx.userId, orgId: ctx.org.id, detail: { netKg: input.senderNetKg } });
    await writeAudit(tx, { actor: ctx, action: 'lot.dispatch', entity: 'lot', entityId: id });
    return row;
  });
  if (!lot) throw Errors.conflict('not_dispatchable', 'Only sealed lots of your organisation can be dispatched.');
  return lot;
}
