import { withTx, queryOne } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { hashHandoverCode, newHandoverCode } from '../../core/security/hashing.js';
import { writeAudit } from '../../shared/audit.js';
import { loadSchemeSettings, recordCustodyEvent } from '../../shared/custody.js';
import * as repo from './pickups.repository.js';
import { sendWhatsAppMessage } from '../whatsapp/waha.client.js';

const BOOKING_HORIZON_DAYS = 30;
const CITIZEN_VISIBLE_DETAIL = ['scheduledFor', 'scheduledWindow', 'netKg', 'expiresAt', 'publicNumber', 'reason'];

function isWithinBookingWindow(dateText) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${dateText}T00:00:00`);
  const max = new Date(today);
  max.setDate(max.getDate() + BOOKING_HORIZON_DAYS);
  return !Number.isNaN(date.getTime()) && date >= today && date <= max;
}

const publicDetail = (detail = {}) =>
  Object.fromEntries(Object.entries(detail).filter(([k]) => CITIZEN_VISIBLE_DETAIL.includes(k)));

export async function createPickup(input, ctx) {
  if (!isWithinBookingWindow(input.preferredDate)) {
    throw Errors.conflict('date_out_of_range', `Choose a date between today and ${BOOKING_HORIZON_DAYS} days from now.`);
  }
  return withTx(ctx.userId, async (tx) => {
    if (!(await repo.wardExists(tx, input.wardId))) throw Errors.conflict('unknown_ward', 'Select a ward from the list.');
    const codes = input.items.map((i) => i.categoryCode);
    if ((await repo.countActiveCategories(tx, codes)) !== codes.length) {
      throw Errors.conflict('unknown_category', 'One of the item categories is not accepted.');
    }
    const pickup = await repo.insertPickup(tx, { requesterId: ctx.userId, ...input });
    await repo.insertAddress(tx, pickup.id, input);
    for (const item of input.items) await repo.insertItem(tx, pickup.id, item);
    await recordCustodyEvent(tx, { pickupId: pickup.id, type: 'requested', actorId: ctx.userId });
    await writeAudit(tx, { actor: ctx, action: 'pickup.create', entity: 'pickup', entityId: pickup.id });
    
    // WAHA Notification
    const user = await queryOne(tx, 'select phone from users where id = $1', [ctx.userId]);
    if (user?.phone) {
      sendWhatsAppMessage(user.phone, `EcoSure: Your pickup request (Ref: ${pickup.reference}) has been booked for ${input.preferredDate} (${input.preferredWindow}). Thank you for choosing to recycle!`);
    }

    return pickup;
  });
}

export const listMyPickups = (ctx) => withTx(ctx.userId, (tx) => repo.listForRequester(tx, ctx.userId));

export async function getMyPickup(id, ctx) {
  const pickup = await withTx(ctx.userId, async (tx) => {
    const p = await repo.findForRequester(tx, id, ctx.userId);
    if (!p) return null;
    const [address, items, timeline, incentive, attestation, handoverCodeExpiresAt] = [
      await repo.findAddress(tx, id),
      await repo.listItems(tx, id),
      await repo.listTimeline(tx, id, p.lotId),
      await repo.findIncentive(tx, id),
      p.lotId ? await repo.findIssuedAttestationForLot(tx, p.lotId) : null,
      await repo.latestHandoverExpiry(tx, id),
    ];
    return {
      ...p,
      address,
      items,
      timeline: timeline.map((t) => ({ type: t.type, at: t.at, detail: publicDetail(t.detail) })),
      incentive,
      attestation,
      handoverCodeExpiresAt,
    };
  });
  if (!pickup) throw Errors.notFound('Pickup');
  return pickup;
}

export async function cancelPickup(id, { reason }, ctx) {
  const updated = await withTx(ctx.userId, async (tx) => {
    const row = await repo.cancel(tx, id, ctx.userId, reason);
    if (row) {
      await recordCustodyEvent(tx, { pickupId: id, type: 'cancelled', actorId: ctx.userId, detail: { reason } });
      await writeAudit(tx, { actor: ctx, action: 'pickup.cancel', entity: 'pickup', entityId: id });
      
      // WAHA Notification
      const user = await queryOne(tx, 'select phone from users where id = $1', [ctx.userId]);
      if (user?.phone) {
        sendWhatsAppMessage(user.phone, `EcoSure: Your pickup request (Ref: ${row.reference}) has been cancelled. Reason: ${reason}`);
      }
    }
    return row;
  });
  if (!updated) throw Errors.conflict('not_cancellable', 'This pickup can no longer be cancelled.');
  return updated;
}

// Issues a fresh one-time code. The plain code is returned once; only its keyed hash is stored.
export async function issueHandoverCode(id, ctx) {
  const code = newHandoverCode();
  const expiresAt = await withTx(ctx.userId, async (tx) => {
    const p = await repo.findStatus(tx, id, ctx.userId);
    if (!p) throw Errors.notFound('Pickup');
    if (p.status !== 'scheduled') {
      throw Errors.conflict('not_scheduled', 'A handover code is available once an agent has scheduled your pickup.');
    }
    const settings = await loadSchemeSettings(tx);
    const expiry = await repo.issueHandoverCode(tx, id, hashHandoverCode(id, code), settings.handover_code_ttl_minutes);
    await recordCustodyEvent(tx, { pickupId: id, type: 'handover_code_issued', actorId: ctx.userId, detail: { expiresAt: expiry } });
    return expiry;
  });
  return { code, expiresAt };
}
