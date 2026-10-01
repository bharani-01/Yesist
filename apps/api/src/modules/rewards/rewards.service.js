import crypto from 'node:crypto';
import { withTx } from '../../core/db.js';
import { AppError, Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import * as repo from './rewards.repository.js';

function generateRandomReferralCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = 'ECO-';
  for (let i = 0; i < 5; i++) {
    res += chars[crypto.randomInt(chars.length)];
  }
  return res;
}

export const getBalanceAndStats = (ctx) =>
  withTx(ctx.userId, (tx) => repo.getStats(tx, ctx.userId));

export const getLedger = (query, ctx) =>
  withTx(ctx.userId, (tx) => repo.listLedger(tx, ctx.userId, query));

export const getCatalogue = (ctx) =>
  withTx(ctx.userId, (tx) => repo.listCatalogue(tx));

export const getUserRedemptions = (ctx) =>
  withTx(ctx.userId, (tx) => repo.listUserRedemptions(tx, ctx.userId));

export async function redeemReward({ rewardKey, idempotencyKey: providedKey }, ctx) {
  const idempotencyKey = providedKey || crypto.randomUUID();

  return withTx(ctx.userId, async (tx) => {
    // 1. Check idempotency first
    const existing = await repo.findRedemptionByIdempotencyKey(tx, idempotencyKey);
    if (existing) {
      return existing;
    }

    // 2. Validate catalogue item
    const reward = await repo.findCatalogueItem(tx, rewardKey);
    if (!reward || !reward.active) {
      throw Errors.notFound('Reward');
    }

    // 3. Verify balance
    const currentBalance = await repo.getBalance(tx, ctx.userId);
    if (currentBalance < reward.pointsCost) {
      throw new AppError(
        422,
        'insufficient_points',
        `You need ${reward.pointsCost} points for this reward, but have ${currentBalance} points.`,
      );
    }

    // 4. Create pending redemption row
    const redemption = await repo.createRedemption(tx, {
      userId: ctx.userId,
      rewardKey,
      pointsSpent: reward.pointsCost,
      idempotencyKey,
    });

    // 5. Deduct points via SECURE ledger function
    await repo.creditGreenPoints(tx, {
      userId: ctx.userId,
      delta: -reward.pointsCost,
      eventType: 'redemption',
      refRedemptionId: redemption.id,
      note: `Redeemed: ${reward.label}`,
    });

    // 6. Try to assign voucher from pool
    const fulfilled = await repo.tryAssignVoucher(tx, redemption.id, rewardKey);
    const finalRedemption = fulfilled || redemption;

    // 7. Write audit
    await writeAudit(tx, {
      actor: ctx,
      action: 'rewards.redeem',
      entity: 'green_point_redemption',
      entityId: redemption.id,
      detail: {
        rewardKey,
        pointsSpent: reward.pointsCost,
        status: finalRedemption.status,
        voucherAssigned: Boolean(finalRedemption.voucherCode),
      },
    });

    return {
      ...finalRedemption,
      rewardLabel: reward.label,
      rewardDescription: reward.description,
      iconEmoji: reward.iconEmoji,
      rewardType: reward.rewardType,
    };
  });
}

export async function getReferralInfo(ctx) {
  return withTx(ctx.userId, async (tx) => {
    let stats = await repo.getReferralStats(tx, ctx.userId);
    if (!stats.code) {
      let code = generateRandomReferralCode();
      let saved = false;
      while (!saved) {
        try {
          await repo.saveReferralCode(tx, ctx.userId, code);
          saved = true;
        } catch (err) {
          if (err.code === '23505') {
            code = generateRandomReferralCode();
          } else {
            throw err;
          }
        }
      }
      stats = await repo.getReferralStats(tx, ctx.userId);
    }
    return stats;
  });
}

export async function generateReferralCode(ctx) {
  return getReferralInfo(ctx);
}

// -----------------------------------------------------------------------------
// Hooks invoked by other modules
// -----------------------------------------------------------------------------

/**
 * Award points when citizen adds a device manually to My Devices (max 3/week).
 */
export async function creditDeviceAddedBonus(tx, userId, deviceId, label) {
  const recentCount = await repo.countRecentDeviceBonuses(tx, userId);
  if (recentCount < 3) {
    await repo.creditGreenPoints(tx, {
      userId,
      delta: 5,
      eventType: 'device_added',
      refDeviceId: deviceId,
      note: `Added device to My Devices: ${label || 'Device'}`,
    });
  }
}

/**
 * Award points upon completed pickup handover.
 */
export async function creditPickupCollectedPoints(tx, { requesterId, pickupId, totalCollected, eligibleDataBearing }) {
  // 1. Base pickup bonus (+50)
  await repo.creditGreenPoints(tx, {
    userId: requesterId,
    delta: 50,
    eventType: 'pickup_collected',
    refPickupId: pickupId,
    note: 'Pickup handover completed',
  });

  // 2. Per device collected (+10 per device)
  if (totalCollected > 0) {
    await repo.creditGreenPoints(tx, {
      userId: requesterId,
      delta: totalCollected * 10,
      eventType: 'device_collected',
      refPickupId: pickupId,
      note: `Recycled ${totalCollected} e-waste device(s)`,
    });
  }

  // 3. Data-bearing bonus (+25 per eligible data-bearing device)
  if (eligibleDataBearing > 0) {
    await repo.creditGreenPoints(tx, {
      userId: requesterId,
      delta: eligibleDataBearing * 25,
      eventType: 'data_bearing_bonus',
      refPickupId: pickupId,
      note: `Safe data destruction bonus (${eligibleDataBearing} device(s))`,
    });
  }

  // 4. Referral bonus check: if this is the referee's 1st collected pickup, credit +100 to referrer
  const totalPickups = await repo.countCollectedPickups(tx, requesterId);
  if (totalPickups === 1) {
    const referral = await repo.findPendingReferralFor(tx, requesterId);
    if (referral && referral.referrerId !== requesterId) {
      await repo.creditGreenPoints(tx, {
        userId: referral.referrerId,
        delta: 100,
        eventType: 'referral_bonus',
        refPickupId: pickupId,
        note: 'Friend completed their first e-waste recycling pickup!',
      });
      await repo.markReferralBonusCredited(tx, referral.id);
    }
  }
}
