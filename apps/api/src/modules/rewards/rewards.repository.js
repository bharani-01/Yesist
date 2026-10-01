import { queryMany, queryOne } from '../../core/db.js';

export const getBalance = async (tx, userId) => {
  const row = await queryOne(
    tx,
    `select balance_after as balance
     from green_point_ledger
     where user_id = $1
     order by id desc
     limit 1`,
    [userId],
  );
  return row ? Number(row.balance) : 0;
};

export const getStats = async (tx, userId) => {
  const balanceRow = await queryOne(
    tx,
    `select
       coalesce((select balance_after from green_point_ledger where user_id = $1 order by id desc limit 1), 0) as balance,
       coalesce(sum(case when delta > 0 then delta else 0 end), 0)::int as "totalEarned",
       coalesce(sum(case when delta < 0 then abs(delta) else 0 end), 0)::int as "totalRedeemed",
       count(*)::int as "transactionCount"
     from green_point_ledger
     where user_id = $1`,
    [userId],
  );

  // Compute citizen eco-rank
  const userBalance = Number(balanceRow?.balance || 0);
  const rankRow = await queryOne(
    tx,
    `select count(distinct user_id)::int + 1 as rank
     from (
       select user_id, (array_agg(balance_after order by id desc))[1] as b
       from green_point_ledger
       group by user_id
     ) t
     where t.b > $1`,
    [userBalance],
  );

  return {
    balance: userBalance,
    totalEarned: Number(balanceRow?.totalEarned || 0),
    totalRedeemed: Number(balanceRow?.totalRedeemed || 0),
    transactionCount: Number(balanceRow?.transactionCount || 0),
    rank: Number(rankRow?.rank || 1),
  };
};

export const listLedger = (tx, userId, { limit, before }) => {
  if (before) {
    return queryMany(
      tx,
      `select
         id,
         delta,
         balance_after      as "balanceAfter",
         event_type         as "eventType",
         ref_pickup_id      as "refPickupId",
         ref_device_id      as "refDeviceId",
         ref_redemption_id  as "refRedemptionId",
         note,
         created_at         as "createdAt"
       from green_point_ledger
       where user_id = $1 and id < $2
       order by id desc
       limit $3`,
      [userId, before, limit],
    );
  }
  return queryMany(
    tx,
    `select
       id,
       delta,
       balance_after      as "balanceAfter",
       event_type         as "eventType",
       ref_pickup_id      as "refPickupId",
       ref_device_id      as "refDeviceId",
       ref_redemption_id  as "refRedemptionId",
       note,
       created_at         as "createdAt"
     from green_point_ledger
     where user_id = $1
     order by id desc
     limit $2`,
    [userId, limit],
  );
};

export const listCatalogue = (tx) =>
  queryMany(
    tx,
    `select
       key,
       label,
       description,
       points_cost        as "pointsCost",
       reward_type        as "rewardType",
       icon_emoji         as "iconEmoji",
       active,
       sort_order         as "sortOrder"
     from reward_catalogue
     where active = true
     order by sort_order asc`,
  );

export const findCatalogueItem = (tx, key) =>
  queryOne(
    tx,
    `select
       key,
       label,
       description,
       points_cost        as "pointsCost",
       reward_type        as "rewardType",
       icon_emoji         as "iconEmoji",
       active
     from reward_catalogue
     where key = $1`,
    [key],
  );

export const findRedemptionByIdempotencyKey = (tx, idempotencyKey) =>
  queryOne(
    tx,
    `select
       r.id,
       r.user_id          as "userId",
       r.reward_key       as "rewardKey",
       r.points_spent     as "pointsSpent",
       r.status,
       r.voucher_code     as "voucherCode",
       r.idempotency_key  as "idempotencyKey",
       r.created_at       as "createdAt",
       r.fulfilled_at     as "fulfilledAt",
       c.label            as "rewardLabel",
       c.icon_emoji       as "iconEmoji"
     from green_point_redemptions r
     join reward_catalogue c on c.key = r.reward_key
     where r.idempotency_key = $1`,
    [idempotencyKey],
  );

export const createRedemption = (tx, { userId, rewardKey, pointsSpent, idempotencyKey }) =>
  queryOne(
    tx,
    `insert into green_point_redemptions
       (user_id, reward_key, points_spent, idempotency_key, status)
     values ($1, $2, $3, $4, 'pending')
     returning
       id,
       user_id          as "userId",
       reward_key       as "rewardKey",
       points_spent     as "pointsSpent",
       status,
       voucher_code     as "voucherCode",
       created_at       as "createdAt"`,
    [userId, rewardKey, pointsSpent, idempotencyKey],
  );

export const tryAssignVoucher = async (tx, redemptionId, rewardKey) => {
  const voucher = await queryOne(
    tx,
    `select id, code
     from voucher_pool
     where reward_key = $1 and assigned_to is null
     for update skip locked
     limit 1`,
    [rewardKey],
  );

  if (!voucher) return null;

  await queryOne(
    tx,
    `update voucher_pool
     set assigned_to = $1
     where id = $2`,
    [redemptionId, voucher.id],
  );

  return queryOne(
    tx,
    `update green_point_redemptions
     set status = 'fulfilled', voucher_code = $1, fulfilled_at = now()
     where id = $2
     returning
       id,
       user_id          as "userId",
       reward_key       as "rewardKey",
       points_spent     as "pointsSpent",
       status,
       voucher_code     as "voucherCode",
       created_at       as "createdAt",
       fulfilled_at     as "fulfilledAt"`,
    [voucher.code, redemptionId],
  );
};

export const listUserRedemptions = (tx, userId) =>
  queryMany(
    tx,
    `select
       r.id,
       r.reward_key       as "rewardKey",
       c.label            as "rewardLabel",
       c.description      as "rewardDescription",
       c.reward_type      as "rewardType",
       c.icon_emoji       as "iconEmoji",
       r.points_spent     as "pointsSpent",
       r.status,
       r.voucher_code     as "voucherCode",
       r.created_at       as "createdAt",
       r.fulfilled_at     as "fulfilledAt"
     from green_point_redemptions r
     join reward_catalogue c on c.key = r.reward_key
     where r.user_id = $1
     order by r.created_at desc
     limit 50`,
    [userId],
  );

export const creditGreenPoints = (tx, { userId, delta, eventType, refPickupId, refDeviceId, refRedemptionId, note }) =>
  queryOne(
    tx,
    `select app.credit_green_points($1, $2, $3, $4, $5, $6, $7) as "balanceAfter"`,
    [userId, delta, eventType, refPickupId ?? null, refDeviceId ?? null, refRedemptionId ?? null, note ?? null],
  );

export const countRecentDeviceBonuses = async (tx, userId) => {
  const row = await queryOne(
    tx,
    `select count(*)::int as count
     from green_point_ledger
     where user_id = $1
       and event_type = 'device_added'
       and created_at > now() - interval '7 days'`,
    [userId],
  );
  return row ? Number(row.count) : 0;
};

export const getReferralStats = async (tx, userId) => {
  const myLink = await queryOne(
    tx,
    `select code, created_at as "createdAt"
     from referral_links
     where referrer_id = $1`,
    [userId],
  );

  const stats = await queryOne(
    tx,
    `select
       count(referee_id)::int as "totalInvites",
       count(bonus_credited_at)::int as "successfulRecycles"
     from referral_links
     where referrer_id = $1`,
    [userId],
  );

  return {
    code: myLink?.code || null,
    totalInvites: Number(stats?.totalInvites || 0),
    successfulRecycles: Number(stats?.successfulRecycles || 0),
    pointsEarned: Number(stats?.successfulRecycles || 0) * 100,
  };
};

export const saveReferralCode = (tx, userId, code) =>
  queryOne(
    tx,
    `insert into referral_links (referrer_id, code)
     values ($1, $2)
     on conflict (referrer_id) do update set referrer_id = excluded.referrer_id
     returning code`,
    [userId, code],
  );

export const findPendingReferralFor = (tx, refereeId) =>
  queryOne(
    tx,
    `select id, referrer_id as "referrerId", code, bonus_credited_at as "bonusCreditedAt"
     from referral_links
     where referee_id = $1 and bonus_credited_at is null
     limit 1`,
    [refereeId],
  );

export const markReferralBonusCredited = (tx, referralId) =>
  queryOne(
    tx,
    `update referral_links
     set bonus_credited_at = now()
     where id = $1
     returning id`,
    [referralId],
  );

export const countCollectedPickups = async (tx, userId) => {
  const row = await queryOne(
    tx,
    `select count(*)::int as count
     from pickup_requests
     where requester_id = $1 and status in ('collected', 'in_lot', 'received', 'closed')`,
    [userId],
  );
  return row ? Number(row.count) : 0;
};
