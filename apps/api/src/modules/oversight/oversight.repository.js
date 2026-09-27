import { queryMany, queryOne } from '../../core/db.js';

// Aggregates only; no personal data is selected (PRD v3 §8.4).

export const totals = (tx) =>
  queryOne(
    tx,
    `select
       (select count(*) from pickup_requests)::int as "pickupsTotal",
       (select count(*) from pickup_requests where status in ('collected','in_lot','received','closed'))::int as "pickupsCollected",
       (select coalesce(sum(collected_net_kg),0) from pickup_requests where status in ('collected','in_lot','received','closed')) as "collectedKg",
       (select coalesce(sum(accepted_net_kg),0) from lots where status in ('received','attested','disputed')) as "acceptedKg",
       (select coalesce(sum(processed_kg),0) from attestations where status = 'issued') as "attestedKg",
       (select count(*) from attestations where status = 'issued')::int as "attestationsIssued",
       (select count(*) from lots where status = 'in_transit')::int as "lotsInTransit",
       (select count(*) from product_units)::int as "passportUnits",
       (select coalesce(sum(i.collected_quantity),0) from pickup_items i
          join waste_categories wc on wc.code = i.category_code and wc.data_bearing)::int as "dataBearingCollected",
       (select coalesce(sum(amount),0) from citizen_incentives where status in ('eligible','batched','paid')) as "incentivesCommitted",
       (select count(*) from citizen_incentives where status = 'held')::int as "incentivesHeld"`,
  );

export const activeFlagCountsBySeverity = (tx) =>
  queryMany(tx, "select severity, count(*)::int as count from compliance_flags where status in ('open','under_review','escalated') group by severity");

export const pickupCountsByStatus = (tx) =>
  queryMany(tx, 'select status, count(*)::int as count from pickup_requests group by status');

export const topWardsByCollectedKg = (tx) =>
  queryMany(
    tx,
    `select w.name as "wardName", count(*)::int as pickups, coalesce(sum(p.collected_net_kg),0) as kg
       from pickup_requests p join wards w on w.id = p.ward_id
      where p.status in ('collected','in_lot','received','closed')
      group by w.name, w.number order by kg desc, w.number limit 10`,
  );

export const weeklyCollectedKg = (tx) =>
  queryMany(
    tx,
    `select to_char(d.week, 'YYYY-MM-DD') as week, coalesce(sum(p.collected_net_kg),0) as kg
       from generate_series(date_trunc('week', now()) - interval '7 weeks', date_trunc('week', now()), interval '1 week') as d(week)
       left join custody_events ce on ce.event_type = 'collected' and date_trunc('week', ce.created_at) = d.week
       left join pickup_requests p on p.id = ce.pickup_id
      group by d.week order by d.week`,
  );

export const listFlags = (tx, status) =>
  queryMany(
    tx,
    `select f.id, f.flag_type as type, f.severity, f.status, f.summary, f.evidence, f.resolution_note as "resolutionNote",
            f.opened_at as "openedAt", f.updated_at as "updatedAt",
            o.name as "orgName", o.org_type as "orgType", l.seal_tag as "lotSealTag", p.reference as "pickupReference"
       from compliance_flags f
       left join organizations o on o.id = f.org_id
       left join lots l on l.id = f.lot_id
       left join pickup_requests p on p.id = f.pickup_id
      where case $1::text
              when 'all' then true
              when 'active' then f.status in ('open','under_review','escalated')
              else f.status = $1::text end
      order by case f.severity when 'high' then 0 when 'medium' then 1 else 2 end, f.opened_at desc
      limit 200`,
    [status],
  );

export const updateFlagStatus = (tx, id, { status, note, userId }) =>
  queryOne(
    tx,
    `update compliance_flags set status = $2, resolution_note = $3, updated_by = $4
      where id = $1 and status <> 'closed'
      returning id, status, resolution_note as "resolutionNote", updated_at as "updatedAt"`,
    [id, status, note, userId],
  );
