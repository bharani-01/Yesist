import { IMEI_CATEGORIES } from '../../config/constants.js';
import { withTx } from '../../core/db.js';
import { AppError, Errors } from '../../core/errors.js';
import { hashHandoverCode, hashIdentifier } from '../../core/security/hashing.js';
import { writeAudit } from '../../shared/audit.js';
import { loadSchemeSettings, raiseFlag, recordCustodyEvent } from '../../shared/custody.js';
import { isValidImei } from '../../shared/schemas.js';
import * as repo from './collection.repository.js';

const HANDOVER_ERRORS = {
  missing: 'The customer has not generated a handover code yet. Ask them to open the pickup and tap "Show handover code".',
  expired: 'This code has expired. Ask the customer to generate a new one.',
  used: 'This code has already been used.',
  locked: 'Too many wrong attempts. The customer must generate a new code.',
  invalid: 'That code is not correct.',
};

const identifierTypeFor = (categoryCode) => (IMEI_CATEGORIES.includes(categoryCode) ? 'imei' : 'serial');

export const listOpenJobs = (ctx) => withTx(ctx.userId, (tx) => repo.listOpenInServiceWards(tx, ctx.org.id));

export const listMyJobs = (ctx) => withTx(ctx.userId, (tx) => repo.listAssigned(tx, ctx.org.id));

export async function getJob(id, ctx) {
  const job = await withTx(ctx.userId, async (tx) => {
    const p = await repo.findJob(tx, id);
    if (!p) return null;
    const isMine = p.assignedAgentOrgId === ctx.org.id;
    const principalId = isMine ? p.principalOrgId : (await repo.findActiveAgreement(tx, ctx.org.id))?.principalOrgId;
    const { principalOrgId, assignedAgentOrgId, ...rest } = p;
    return {
      ...rest,
      isMine,
      address: isMine ? await repo.findAddress(tx, id) : null,
      rates: principalId ? await repo.listCurrentRates(tx, principalId) : [],
    };
  });
  if (!job) throw Errors.notFound('Job');
  return job;
}

export async function acceptJob(id, schedule, ctx) {
  const job = await withTx(ctx.userId, async (tx) => {
    const agreement = await repo.findActiveAgreement(tx, ctx.org.id);
    if (!agreement) throw Errors.conflict('no_agreement', 'Your organisation has no active agreement with a registered recycler.');
    const categories = await repo.listItemCategories(tx, id);
    if (categories.some((c) => !agreement.categories.includes(c))) {
      throw Errors.conflict('category_not_covered', 'Your agreement does not cover every item category in this pickup.');
    }
    const row = await repo.assign(tx, id, ctx.org.id, schedule);
    if (!row) return null;
    await recordCustodyEvent(tx, { pickupId: id, type: 'scheduled', actorId: ctx.userId, orgId: ctx.org.id, detail: schedule });
    await writeAudit(tx, { actor: ctx, action: 'pickup.accept', entity: 'pickup', entityId: id });
    return row;
  });
  if (!job) throw Errors.conflict('not_available', 'This request is no longer open, or the date is in the past.');
  return job;
}

function validateCollectionLines(lines, items) {
  const byId = new Map(items.map((i) => [i.id, i]));
  if (lines.length !== items.length || lines.some((l) => !byId.has(l.itemId))) {
    throw Errors.badRequest('items_mismatch', 'Record every item line of this pickup exactly once.');
  }
  for (const line of lines) {
    const item = byId.get(line.itemId);
    const idType = identifierTypeFor(item.categoryCode);
    if (line.collectedQuantity > item.quantity) throw Errors.badRequest('quantity_too_high', 'Collected quantity cannot exceed the booked quantity.');
    if (item.hasBattery && !line.batteryCheck) throw Errors.badRequest('battery_check_required', 'Record a battery check for every item with a battery.');
    if (line.batteryCheck === 'swollen_or_damaged_refused' && line.collectedQuantity > 0) {
      throw Errors.badRequest('damaged_battery', 'Items with swollen or damaged batteries must be refused.');
    }
    if (line.collectedQuantity < item.quantity && !line.refusedReason && line.batteryCheck !== 'swollen_or_damaged_refused') {
      throw Errors.badRequest('refusal_reason_required', 'Give a reason for any item not collected.');
    }
    if (line.identifiers.length && !item.dataBearing) throw Errors.badRequest('identifier_not_expected', 'Identifiers are only recorded for data-bearing devices.');
    if (line.identifiers.length + line.qrIds.length > line.collectedQuantity) throw Errors.badRequest('too_many_identifiers', 'More identifiers and QR labels than collected devices.');
    if (new Set(line.identifiers).size !== line.identifiers.length) throw Errors.badRequest('duplicate_identifier', 'The same identifier was entered twice.');
    for (const value of line.identifiers) {
      const valid = idType === 'imei' ? isValidImei(value) : /^[A-Za-z0-9-]{4,40}$/.test(value);
      if (!valid) {
        throw Errors.badRequest('invalid_identifier', `"…${value.slice(-4)}" is not a valid ${idType === 'imei' ? 'IMEI' : 'serial number'}.`);
      }
    }
  }
  const qrIds = lines.flatMap((l) => l.qrIds);
  if (new Set(qrIds).size !== qrIds.length) throw Errors.badRequest('duplicate_qr', 'The same QR label was scanned twice.');
  if (!lines.some((l) => l.collectedQuantity > 0)) {
    throw Errors.badRequest('nothing_collected', 'Nothing was collected. Refuse the pickup instead.');
  }
  return byId;
}

/**
 * Doorstep handover: battery checks, passport linking, weighing, then the incentive
 * (valid handover code + weigh record, capped per payee per month — PRD v3 §17.4).
 */
export async function collectJob(id, input, ctx) {
  const outcome = await withTx(ctx.userId, async (tx) => {
    const pickup = await repo.lockAssignedPickup(tx, id, ctx.org.id);
    if (!pickup) throw Errors.notFound('Job');
    if (pickup.status !== 'scheduled') throw Errors.conflict('not_collectable', 'This pickup is not waiting for collection.');

    const items = await repo.listItemsWithCategory(tx, id);
    const byId = validateCollectionLines(input.items, items);

    // Runs before any other write so a wrong code only commits the attempt counter.
    const check = await repo.consumeHandoverCode(tx, id, hashHandoverCode(id, input.handoverCode));
    if (check !== 'ok') return { handoverError: check };

    let duplicates = 0;
    let eligibleUnits = 0;
    for (const line of input.items) {
      const item = byId.get(line.itemId);
      await repo.updateItemOutcome(tx, line.itemId, {
        collectedQuantity: line.collectedQuantity,
        batteryCheck: line.batteryCheck ?? (item.hasBattery ? null : 'no_battery'),
        refusedReason: line.refusedReason ?? null,
      });
      let lineDuplicates = 0;
      const flagDuplicate = async (unit, label) => {
        lineDuplicates += 1;
        await raiseFlag(tx, {
          type: 'duplicate_device', severity: 'high', orgId: ctx.org.id, pickupId: id,
          summary: `A device (${label}) already in the custody chain was presented again`,
          evidence: { unitId: unit.unitId, priorState: unit.priorState },
          dedupeKey: `dup:${unit.unitId}:${id}`,
        });
      };
      for (const raw of line.identifiers) {
        const type = identifierTypeFor(item.categoryCode);
        const value = type === 'serial' ? raw.toUpperCase() : raw;
        const unit = await repo.linkUnit(tx, {
          itemId: line.itemId, categoryCode: item.categoryCode, type, hash: hashIdentifier(type, value), last4: value.slice(-4),
        });
        if (unit.duplicate) await flagDuplicate(unit, `…${value.slice(-4)}`);
      }
      for (const qr of line.qrIds) {
        const unit = await repo.linkUnitByQr(tx, line.itemId, qr);
        if (unit.problem === 'not_found') throw Errors.badRequest('unknown_qr', `QR label …${qr.slice(-4)} is not registered with EcoSure.`);
        if (unit.problem === 'category_mismatch') {
          throw Errors.badRequest('qr_category_mismatch', `QR label …${qr.slice(-4)} belongs to a different kind of device than “${item.name}”.`);
        }
        if (unit.duplicate) await flagDuplicate(unit, `QR …${qr.slice(-4)}`);
      }
      duplicates += lineDuplicates;
      if (item.dataBearing) eligibleUnits += line.collectedQuantity - lineDuplicates;
    }

    await repo.insertDoorstepWeight(tx, id, input.netKg, ctx.userId);
    await repo.markCollected(tx, id, input);
    await recordCustodyEvent(tx, { pickupId: id, type: 'handed_over', actorId: ctx.userId, orgId: ctx.org.id });
    await recordCustodyEvent(tx, {
      pickupId: id, type: 'collected', actorId: ctx.userId, orgId: ctx.org.id,
      detail: { netKg: input.netKg, materialPaidAmount: input.materialPaidAmount, duplicates },
    });

    let incentive = null;
    if (eligibleUnits > 0) {
      const settings = await loadSchemeSettings(tx);
      const held = (await repo.countPaidIncentivesThisMonth(tx, pickup.requesterId)) >= settings.max_paid_pickups_per_month;
      incentive = {
        eligibleUnits,
        amount: (eligibleUnits * settings.incentive_per_data_bearing_device).toFixed(2),
        status: held ? 'held' : 'eligible',
      };
      await repo.insertIncentive(tx, {
        pickupId: id, payeeId: pickup.requesterId, ...incentive, holdReason: held ? 'monthly_cap' : null,
      });
      if (held) {
        await raiseFlag(tx, {
          type: 'incentive_cap', severity: 'low', orgId: ctx.org.id, pickupId: id,
          summary: 'Incentive held: payee exceeded the monthly paid-pickup cap',
          evidence: { cap: settings.max_paid_pickups_per_month }, dedupeKey: `cap:${id}`,
        });
      }
    }
    await writeAudit(tx, { actor: ctx, action: 'pickup.collect', entity: 'pickup', entityId: id, detail: { duplicates, eligibleUnits } });
    return { status: 'collected', duplicates, incentive };
  });

  if (outcome.handoverError) {
    throw new AppError(422, `handover_${outcome.handoverError}`, HANDOVER_ERRORS[outcome.handoverError]);
  }
  return outcome;
}
