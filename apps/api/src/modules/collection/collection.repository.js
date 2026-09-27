import { queryMany, queryOne } from '../../core/db.js';

const ITEM_SUMMARY = `
  coalesce((select json_agg(json_build_object(
      'id', i.id, 'categoryCode', i.category_code, 'name', wc.name, 'quantity', i.quantity,
      'collectedQuantity', i.collected_quantity, 'batteryCheck', i.battery_check,
      'dataBearing', wc.data_bearing, 'hasBattery', wc.has_battery) order by wc.sort_order)
    from pickup_items i join waste_categories wc on wc.code = i.category_code where i.pickup_id = p.id), '[]'::json)`;

// Addresses are not selected: they stay hidden until acceptance (PRD v3 §8.4).
export const listOpenInServiceWards = (tx, agentOrgId) =>
  queryMany(
    tx,
    `select p.id, p.reference, p.preferred_date as "preferredDate", p.preferred_window as "preferredWindow",
            p.created_at as "createdAt", w.name as "wardName", ${ITEM_SUMMARY} as items
       from pickup_requests p join wards w on w.id = p.ward_id
       join agent_service_wards sw on sw.ward_id = p.ward_id and sw.agent_org_id = $1
      where p.status = 'requested' and p.assigned_agent_org_id is null
      order by p.preferred_date, p.created_at
      limit 100`,
    [agentOrgId],
  );

export const listAssigned = (tx, agentOrgId) =>
  queryMany(
    tx,
    `select p.id, p.reference, p.status, p.scheduled_for as "scheduledFor", p.scheduled_window as "scheduledWindow",
            p.collected_net_kg as "collectedNetKg", p.updated_at as "updatedAt", w.name as "wardName",
            a.address_line as "addressLine", ${ITEM_SUMMARY} as items
       from pickup_requests p join wards w on w.id = p.ward_id
       left join pickup_addresses a on a.pickup_id = p.id
      where p.assigned_agent_org_id = $1 and p.status in ('scheduled','collected')
      order by p.status desc, p.scheduled_for nulls last, p.updated_at desc
      limit 200`,
    [agentOrgId],
  );

export const findJob = (tx, id) =>
  queryOne(
    tx,
    `select p.id, p.reference, p.status, p.preferred_date as "preferredDate", p.preferred_window as "preferredWindow",
            p.scheduled_for as "scheduledFor", p.scheduled_window as "scheduledWindow",
            p.collected_net_kg as "collectedNetKg", p.material_paid_amount as "materialPaidAmount",
            p.principal_org_id as "principalOrgId", p.assigned_agent_org_id as "assignedAgentOrgId",
            w.name as "wardName", ${ITEM_SUMMARY} as items
       from pickup_requests p join wards w on w.id = p.ward_id where p.id = $1`,
    [id],
  );

export const findAddress = (tx, pickupId) =>
  queryOne(
    tx,
    `select contact_name as "contactName", contact_phone as "contactPhone", address_line as "addressLine", landmark
       from pickup_addresses where pickup_id = $1`,
    [pickupId],
  );

export const findActiveAgreement = (tx, agentOrgId) =>
  queryOne(
    tx,
    `select a.id, a.principal_org_id as "principalOrgId", a.categories, a.max_storage_days as "maxStorageDays"
       from agent_agreements a where a.id = app.active_agreement($1)`,
    [agentOrgId],
  );

export const listCurrentRates = (tx, recyclerOrgId) =>
  queryMany(
    tx,
    `select distinct on (category_code) category_code as "categoryCode", price_per_unit as "pricePerUnit", price_per_kg as "pricePerKg"
       from rate_cards where recycler_org_id = $1 and effective_from <= current_date
      order by category_code, effective_from desc`,
    [recyclerOrgId],
  );

export const listItemCategories = async (tx, pickupId) =>
  (await queryMany(tx, 'select category_code from pickup_items where pickup_id = $1', [pickupId])).map((r) => r.category_code);

export const assign = (tx, id, agentOrgId, { scheduledFor, scheduledWindow }) =>
  queryOne(
    tx,
    `update pickup_requests
        set assigned_agent_org_id = $2, status = 'scheduled', scheduled_for = $3, scheduled_window = $4
      where id = $1 and status = 'requested' and assigned_agent_org_id is null and $3::date >= current_date
      returning id, status`,
    [id, agentOrgId, scheduledFor, scheduledWindow],
  );

export const lockAssignedPickup = (tx, id, agentOrgId) =>
  queryOne(tx, 'select id, requester_id as "requesterId", status from pickup_requests where id = $1 and assigned_agent_org_id = $2 for update', [id, agentOrgId]);

export const listItemsWithCategory = (tx, pickupId) =>
  queryMany(
    tx,
    `select i.id, i.category_code as "categoryCode", i.quantity, wc.data_bearing as "dataBearing", wc.has_battery as "hasBattery"
       from pickup_items i join waste_categories wc on wc.code = i.category_code where i.pickup_id = $1`,
    [pickupId],
  );

// Returns ok | missing | expired | locked | used | invalid; the attempt counter is committed by the caller.
export const consumeHandoverCode = async (tx, pickupId, codeHash) =>
  (await queryOne(tx, 'select app.consume_handover_code($1, $2) as result', [pickupId, codeHash])).result;

export const updateItemOutcome = (tx, itemId, { collectedQuantity, batteryCheck, refusedReason }) =>
  tx.query(
    'update pickup_items set collected_quantity = $2, battery_check = $3, refused_reason = $4 where id = $1',
    [itemId, collectedQuantity, batteryCheck, refusedReason],
  );

export const linkUnit = (tx, { itemId, categoryCode, type, hash, last4 }) =>
  queryOne(
    tx,
    'select unit_id as "unitId", prior_state as "priorState", duplicate from app.link_unit_at_collection($1, $2, $3, $4, $5)',
    [itemId, categoryCode, type, hash, last4],
  );

export const insertDoorstepWeight = (tx, pickupId, netKg, userId) =>
  tx.query("insert into weigh_records (side, pickup_id, net_kg, entry_method, recorded_by) values ('doorstep', $1, $2, 'manual', $3)", [pickupId, netKg, userId]);

export const markCollected = (tx, id, { netKg, materialPaidAmount }) =>
  tx.query("update pickup_requests set status = 'collected', collected_net_kg = $2, material_paid_amount = $3 where id = $1", [id, netKg, materialPaidAmount]);

export const countPaidIncentivesThisMonth = async (tx, payeeId) =>
  (await queryOne(
    tx,
    `select count(*)::int as n from citizen_incentives
      where payee_user_id = $1 and status in ('eligible','batched','paid') and created_at >= date_trunc('month', now())`,
    [payeeId],
  )).n;

export const insertIncentive = (tx, i) =>
  tx.query(
    `insert into citizen_incentives (pickup_id, payee_user_id, eligible_units, amount, status, hold_reason, idempotency_key)
     values ($1,$2,$3,$4,$5,$6,$7)`,
    [i.pickupId, i.payeeId, i.eligibleUnits, i.amount, i.status, i.holdReason, `incentive:${i.pickupId}`],
  );
