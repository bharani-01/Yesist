import { IMEI_CATEGORIES } from '../../config/constants.js';
import { withTx } from '../../core/db.js';
import { AppError, Errors } from '../../core/errors.js';
import { hashHandoverCode, hashIdentifier } from '../../core/security/hashing.js';
import { writeAudit } from '../../shared/audit.js';
import { loadSchemeSettings, raiseFlag, recordCustodyEvent } from '../../shared/custody.js';
import { isValidImei } from '../../shared/schemas.js';
import { creditPickupCollectedPoints } from '../rewards/rewards.service.js';
import { sendWhatsAppMessage } from '../whatsapp/waha.client.js';
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

    // Credit Green Points to citizen
    const totalCollected = input.items.reduce((sum, line) => sum + (line.collectedQuantity || 0), 0);
    await creditPickupCollectedPoints(tx, {
      requesterId: pickup.requesterId,
      pickupId: id,
      totalCollected,
      eligibleDataBearing: eligibleUnits,
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

export async function lookupCustomer(phone, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const customer = await repo.findCustomerByPhone(tx, phone);
    if (!customer) {
      return { found: false, customer: null };
    }
    return {
      found: true,
      customer: {
        id: customer.id,
        fullName: customer.fullName,
        phone: customer.phone,
        email: customer.email,
        pointsBalance: customer.pointsBalance,
      },
    };
  });
}

export async function getAgentRatesAndCategories(ctx) {
  return withTx(ctx.userId, async (tx) => {
    const agreement = await repo.findActiveAgreement(tx, ctx.org.id);
    if (!agreement) {
      return { agreement: null, rates: [], categories: [] };
    }
    const [rates, categories] = await Promise.all([
      repo.listCurrentRates(tx, agreement.principalOrgId),
      repo.listCategoriesByCodes(tx, agreement.categories),
    ]);
    return {
      agreement: {
        id: agreement.id,
        principalOrgId: agreement.principalOrgId,
        categories: agreement.categories,
      },
      rates,
      categories,
    };
  });
}

export async function walkInIntake(input, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const agreement = await repo.findActiveAgreement(tx, ctx.org.id);
    if (!agreement) {
      throw Errors.conflict('no_agreement', 'Your organisation has no active agreement with a registered recycler.');
    }

    const itemCategoryCodes = input.items.map((i) => i.categoryCode);
    const categories = await repo.listCategoriesByCodes(tx, itemCategoryCodes);
    const categoryByCode = new Map(categories.map((c) => [c.code, c]));

    for (const item of input.items) {
      const cat = categoryByCode.get(item.categoryCode);
      if (!cat) throw Errors.badRequest('invalid_category', `Category ${item.categoryCode} does not exist.`);
      if (!agreement.categories.includes(item.categoryCode)) {
        throw Errors.conflict('category_not_covered', `Your agreement does not cover ${cat.name}.`);
      }
      if (cat.hasBattery && !item.batteryCheck) {
        throw Errors.badRequest('battery_check_required', `Record a battery check for ${cat.name}.`);
      }
      if (item.batteryCheck === 'swollen_or_damaged_refused' && item.quantity > 0) {
        throw Errors.badRequest('damaged_battery', 'Items with swollen or damaged batteries must be refused.');
      }
      const idType = identifierTypeFor(item.categoryCode);
      for (const value of item.identifiers || []) {
        const valid = idType === 'imei' ? isValidImei(value) : /^[A-Za-z0-9-]{4,40}$/.test(value);
        if (!valid) {
          throw Errors.badRequest('invalid_identifier', `"…${value.slice(-4)}" is not a valid ${idType === 'imei' ? 'IMEI' : 'serial number'}.`);
        }
      }
    }

    let customerId = null;
    let customerName = input.customer.fullName?.trim() || 'Walk-in Customer';
    let customerPhone = input.customer.phone?.trim() || null;
    const isAnonymous = Boolean(input.customer.isAnonymous);

    if (isAnonymous || !customerPhone) {
      customerId = await repo.getOrCreateGuestCitizen(tx);
      customerName = 'Walk-in Guest';
      customerPhone = '9999900000';
    } else {
      const existing = await repo.findCustomerByPhone(tx, customerPhone);
      if (existing) {
        customerId = existing.id;
        if (!input.customer.fullName && existing.fullName) {
          customerName = existing.fullName;
        }
      } else {
        if (!customerName || customerName.length < 2) {
          customerName = 'Walk-in Citizen';
        }
        customerId = await repo.createCitizenUser(tx, { phone: customerPhone, fullName: customerName });
      }
    }

    const hour = new Date().getHours();
    const currentWindow = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    const wardId = input.wardId || (await repo.findAgentPrimaryWard(tx, ctx.org.id));
    const orgName = await repo.findOrgName(tx, ctx.org.id);
    const today = new Date().toISOString().slice(0, 10);

    const pickup = await repo.insertDirectPickup(tx, {
      requesterId: customerId,
      wardId,
      agentOrgId: ctx.org.id,
      principalOrgId: agreement.principalOrgId,
      preferredDate: today,
      preferredWindow: currentWindow,
      netKg: input.netKg,
      materialPaidAmount: input.materialPaidAmount,
    });

    await repo.insertPickupAddress(tx, pickup.id, {
      contactName: customerName,
      contactPhone: customerPhone,
      addressLine: `Direct Walk-in Drop-off · ${orgName}`,
      landmark: `Counter drop-off (${input.payoutMethod?.toUpperCase() || 'CASH'})`,
    });

    let duplicates = 0;
    let eligibleUnits = 0;
    let totalCollected = 0;
    const receiptItems = [];

    for (const itemInput of input.items) {
      const cat = categoryByCode.get(itemInput.categoryCode);
      const refused = itemInput.batteryCheck === 'swollen_or_damaged_refused';
      const collectedQuantity = refused ? 0 : itemInput.quantity;
      totalCollected += collectedQuantity;

      const itemRow = await repo.insertDirectItem(tx, pickup.id, {
        categoryCode: itemInput.categoryCode,
        quantity: itemInput.quantity,
        collectedQuantity,
        batteryCheck: itemInput.batteryCheck || (cat.hasBattery ? null : 'no_battery'),
        refusedReason: itemInput.refusedReason || null,
      });

      let lineDuplicates = 0;
      const flagDuplicate = async (unit, label) => {
        lineDuplicates += 1;
        await raiseFlag(tx, {
          type: 'duplicate_device',
          severity: 'high',
          orgId: ctx.org.id,
          pickupId: pickup.id,
          summary: `A device (${label}) already in the custody chain was presented at walk-in`,
          evidence: { unitId: unit.unitId, priorState: unit.priorState },
          dedupeKey: `dup:${unit.unitId}:${pickup.id}`,
        });
      };

      for (const raw of itemInput.identifiers || []) {
        const type = identifierTypeFor(itemInput.categoryCode);
        const value = type === 'serial' ? raw.toUpperCase() : raw;
        const unit = await repo.linkUnit(tx, {
          itemId: itemRow.id,
          categoryCode: itemInput.categoryCode,
          type,
          hash: hashIdentifier(type, value),
          last4: value.slice(-4),
        });
        if (unit.duplicate) await flagDuplicate(unit, `…${value.slice(-4)}`);
      }

      for (const qr of itemInput.qrIds || []) {
        const unit = await repo.linkUnitByQr(tx, itemRow.id, qr);
        if (unit.problem === 'not_found') {
          throw Errors.badRequest('unknown_qr', `QR label …${qr.slice(-4)} is not registered with EcoSure.`);
        }
        if (unit.problem === 'category_mismatch') {
          throw Errors.badRequest('qr_category_mismatch', `QR label …${qr.slice(-4)} belongs to a different kind of device.`);
        }
        if (unit.duplicate) await flagDuplicate(unit, `QR …${qr.slice(-4)}`);
      }

      duplicates += lineDuplicates;
      if (cat.dataBearing && !refused) {
        eligibleUnits += collectedQuantity - lineDuplicates;
      }

      receiptItems.push({
        categoryCode: itemInput.categoryCode,
        name: cat.name,
        quantity: itemInput.quantity,
        collectedQuantity,
        batteryCheck: itemInput.batteryCheck,
        identifiers: (itemInput.identifiers || []).map((id) => `…${id.slice(-4)}`),
      });
    }

    await repo.insertDoorstepWeight(tx, pickup.id, input.netKg, ctx.userId);
    await recordCustodyEvent(tx, {
      pickupId: pickup.id,
      type: 'handed_over',
      actorId: ctx.userId,
      orgId: ctx.org.id,
      detail: { channel: 'walk_in', customer: customerName, payoutMethod: input.payoutMethod },
    });
    await recordCustodyEvent(tx, {
      pickupId: pickup.id,
      type: 'collected',
      actorId: ctx.userId,
      orgId: ctx.org.id,
      detail: { netKg: input.netKg, materialPaidAmount: input.materialPaidAmount, duplicates, walkIn: true },
    });

    let pointsAwarded = 0;
    if (!isAnonymous) {
      await creditPickupCollectedPoints(tx, {
        requesterId: customerId,
        pickupId: pickup.id,
        totalCollected,
        eligibleDataBearing: eligibleUnits,
      });
      pointsAwarded = 50 + (totalCollected * 10) + (eligibleUnits * 25);
    }

    let incentive = null;
    if (eligibleUnits > 0 && !isAnonymous) {
      const settings = await loadSchemeSettings(tx);
      const held = (await repo.countPaidIncentivesThisMonth(tx, customerId)) >= settings.max_paid_pickups_per_month;
      incentive = {
        eligibleUnits,
        amount: (eligibleUnits * settings.incentive_per_data_bearing_device).toFixed(2),
        status: held ? 'held' : 'eligible',
      };
      await repo.insertIncentive(tx, {
        pickupId: pickup.id,
        payeeId: customerId,
        ...incentive,
        holdReason: held ? 'monthly_cap' : null,
      });
      if (held) {
        await raiseFlag(tx, {
          type: 'incentive_cap', severity: 'low', orgId: ctx.org.id, pickupId: pickup.id,
          summary: 'Incentive held: payee exceeded the monthly paid-pickup cap',
          evidence: { cap: settings.max_paid_pickups_per_month }, dedupeKey: `cap:${pickup.id}`,
        });
      }
    }

    await writeAudit(tx, {
      actor: ctx,
      action: 'pickup.walk_in_intake',
      entity: 'pickup',
      entityId: pickup.id,
      detail: { duplicates, eligibleUnits, netKg: input.netKg, materialPaidAmount: input.materialPaidAmount },
    });

    return {
      pickup: {
        id: pickup.id,
        reference: pickup.reference,
        status: 'collected',
        collectedNetKg: pickup.collectedNetKg,
        materialPaidAmount: pickup.materialPaidAmount,
      },
      customer: {
        id: customerId,
        fullName: customerName,
        phone: isAnonymous ? null : customerPhone,
      },
      pointsAwarded,
      incentive,
      duplicates,
      receipt: {
        reference: pickup.reference,
        date: new Date().toISOString(),
        agentOrgName: orgName,
        customerName,
        customerPhone: isAnonymous ? null : customerPhone,
        items: receiptItems,
        totalNetKg: input.netKg,
        materialPaidAmount: input.materialPaidAmount,
        payoutMethod: input.payoutMethod,
        pointsAwarded,
      },
    };
  });

  // Async WhatsApp receipt notification (non-blocking)
  if (!input.customer.isAnonymous && result.customer.phone && result.customer.phone.length === 10) {
    const itemsText = result.receipt.items.map((i) => `• ${i.collectedQuantity}x ${i.name}`).join('\n');
    const msg = `*EcoSure E-Waste Drop-off Receipt*\n\n` +
      `Hello *${result.customer.fullName}*,\n` +
      `Your e-waste drop-off at *${result.receipt.agentOrgName}* has been successfully processed.\n\n` +
      `*Reference:* ${result.pickup.reference}\n` +
      `*Weight:* ${result.receipt.totalNetKg} kg\n` +
      `*Payout Received:* INR ${Number(result.receipt.materialPaidAmount).toFixed(2)}\n` +
      `*Green Points Earned:* +${result.pointsAwarded} points\n\n` +
      `*Items Deposited:*\n${itemsText}\n\n` +
      `Thank you for recycling responsibly with EcoSure Indore.`;
    sendWhatsAppMessage(result.customer.phone, msg).catch((err) => {
      console.error('[WAHA] Walk-in receipt dispatch failed:', err?.message || err);
    });
  }

  return result;
}
