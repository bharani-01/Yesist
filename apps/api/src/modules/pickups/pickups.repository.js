import { queryMany, queryOne } from '../../core/db.js';

export const wardExists = async (tx, wardId) =>
  Boolean(await queryOne(tx, 'select 1 from wards where id = $1 and active', [wardId]));

export const countActiveCategories = async (tx, codes) =>
  (await queryOne(tx, 'select count(*)::int as n from waste_categories where active and code = any($1)', [codes])).n;

export const insertPickup = (tx, { requesterId, wardId, preferredDate, preferredWindow }) =>
  queryOne(
    tx,
    `insert into pickup_requests (requester_id, ward_id, preferred_date, preferred_window)
     values ($1,$2,$3,$4) returning id, reference, status, created_at as "createdAt"`,
    [requesterId, wardId, preferredDate, preferredWindow],
  );

export const insertAddress = (tx, pickupId, a) =>
  tx.query(
    'insert into pickup_addresses (pickup_id, contact_name, contact_phone, address_line, landmark) values ($1,$2,$3,$4,$5)',
    [pickupId, a.contactName, a.contactPhone, a.addressLine, a.landmark],
  );

export const insertItem = (tx, pickupId, item) =>
  tx.query('insert into pickup_items (pickup_id, category_code, quantity) values ($1,$2,$3)', [pickupId, item.categoryCode, item.quantity]);

export const listForRequester = (tx, requesterId) =>
  queryMany(
    tx,
    `select p.id, p.reference, p.status, p.preferred_date as "preferredDate", p.preferred_window as "preferredWindow",
            p.scheduled_for as "scheduledFor", p.scheduled_window as "scheduledWindow", p.created_at as "createdAt",
            w.name as "wardName",
            coalesce(sum(i.quantity), 0)::int as "itemCount",
            string_agg(wc.name, ', ' order by wc.sort_order) as categories
       from pickup_requests p
       join wards w on w.id = p.ward_id
       left join pickup_items i on i.pickup_id = p.id
       left join waste_categories wc on wc.code = i.category_code
      where p.requester_id = $1
      group by p.id, w.name
      order by p.created_at desc
      limit 100`,
    [requesterId],
  );

export const findForRequester = (tx, id, requesterId) =>
  queryOne(
    tx,
    `select p.id, p.reference, p.status, p.preferred_date as "preferredDate", p.preferred_window as "preferredWindow",
            p.scheduled_for as "scheduledFor", p.scheduled_window as "scheduledWindow",
            p.collected_net_kg as "collectedNetKg", p.material_paid_amount as "materialPaidAmount",
            p.cancel_reason as "cancelReason", p.created_at as "createdAt", p.lot_id as "lotId",
            w.name as "wardName", ag.name as "agentName", pr.name as "recyclerName"
       from pickup_requests p
       join wards w on w.id = p.ward_id
       left join organizations ag on ag.id = p.assigned_agent_org_id
       left join organizations pr on pr.id = p.principal_org_id
      where p.id = $1 and p.requester_id = $2`,
    [id, requesterId],
  );

export const findAddress = (tx, pickupId) =>
  queryOne(
    tx,
    `select contact_name as "contactName", contact_phone as "contactPhone", address_line as "addressLine", landmark
       from pickup_addresses where pickup_id = $1`,
    [pickupId],
  );

export const listItems = (tx, pickupId) =>
  queryMany(
    tx,
    `select i.id, i.category_code as "categoryCode", wc.name, i.quantity, i.collected_quantity as "collectedQuantity",
            i.battery_check as "batteryCheck", i.refused_reason as "refusedReason"
       from pickup_items i join waste_categories wc on wc.code = i.category_code
      where i.pickup_id = $1 order by wc.sort_order`,
    [pickupId],
  );

export const listTimeline = (tx, pickupId, lotId) =>
  queryMany(
    tx,
    `select event_type as type, created_at as "at", detail from custody_events where pickup_id = $1
     union all
     select ce.event_type, ce.created_at,
            case when ce.event_type = 'attested' then jsonb_build_object('publicNumber', ce.detail->>'publicNumber') else '{}'::jsonb end
       from custody_events ce
      where ce.lot_id = $2 and ce.pickup_id is null and ce.event_type in ('dispatched','received','attested')
     order by 2`,
    [pickupId, lotId],
  );

export const findIncentive = (tx, pickupId) =>
  queryOne(
    tx,
    `select amount, eligible_units as "eligibleUnits", status, hold_reason as "holdReason", created_at as "createdAt"
       from citizen_incentives where pickup_id = $1`,
    [pickupId],
  );

export const findIssuedAttestationForLot = (tx, lotId) =>
  queryOne(tx, `select public_number as "publicNumber", issued_at as "issuedAt" from attestations where lot_id = $1 and status = 'issued'`, [lotId]);

export const latestHandoverExpiry = async (tx, pickupId) =>
  (await queryOne(
    tx,
    `select detail->>'expiresAt' as "expiresAt" from custody_events
      where pickup_id = $1 and event_type = 'handover_code_issued' order by created_at desc limit 1`,
    [pickupId],
  ))?.expiresAt ?? null;

export const cancel = (tx, id, requesterId, reason) =>
  queryOne(
    tx,
    `update pickup_requests set status = 'cancelled', cancel_reason = $3
      where id = $1 and requester_id = $2 and status in ('requested','scheduled')
      returning id, status`,
    [id, requesterId, reason],
  );

export const findStatus = (tx, id, requesterId) =>
  queryOne(tx, 'select status from pickup_requests where id = $1 and requester_id = $2', [id, requesterId]);

export const issueHandoverCode = async (tx, pickupId, codeHash, ttlMinutes) =>
  (await queryOne(tx, 'select app.issue_handover_code($1, $2, $3) as expires_at', [pickupId, codeHash, ttlMinutes])).expires_at;
