import { queryMany, queryOne } from '../../core/db.js';

// A hub sees only lots routed to it and its own shipments; never registry data.
const LOT_FIELDS = `
  l.id, l.seal_tag as "sealTag", l.status, l.unit_count_sent as "unitCountSent", l.sender_net_kg as "senderNetKg",
  l.storage_deadline as "storageDeadline", l.dispatched_at as "dispatchedAt", l.vehicle_ref as "vehicleRef",
  l.hub_received_at as "hubReceivedAt", l.hub_net_kg as "hubNetKg", l.hub_unit_count as "hubUnitCount",
  l.hub_seal_intact as "hubSealIntact", l.received_at as "recyclerReceivedAt",
  case when l.status = 'in_transit' and l.hub_received_at is null then 'inbound'
       when l.status = 'at_hub' then 'at_hub'
       when l.status = 'in_transit' then 'shipped'
       else 'delivered' end as stage,
  ag.name as "agentName", s.id as "shipmentId", s.reference as "shipmentReference", s.status as "shipmentStatus"`;

const LOT_FROM = `
  from lots l
  join organizations ag on ag.id = l.agent_org_id
  left join hub_shipments s on s.id = l.shipment_id`;

export const listLots = (tx, hubOrgId) =>
  queryMany(
    tx,
    `select ${LOT_FIELDS} ${LOT_FROM}
      where l.hub_org_id = $1 and l.status <> 'sealed'
      order by case when l.status = 'in_transit' and l.hub_received_at is null then 0
                    when l.status = 'at_hub' then 1 when l.status = 'in_transit' then 2 else 3 end,
               coalesce(l.hub_received_at, l.dispatched_at) desc nulls last
      limit 200`,
    [hubOrgId],
  );

export const findLot = (tx, id, hubOrgId) =>
  queryOne(tx, `select ${LOT_FIELDS} ${LOT_FROM} where l.id = $1 and l.hub_org_id = $2`, [id, hubOrgId]);

export const listLotContents = (tx, lotId) =>
  queryMany(
    tx,
    `select wc.name, sum(i.collected_quantity)::int as units
       from pickup_requests p
       join pickup_items i on i.pickup_id = p.id and i.collected_quantity > 0
       join waste_categories wc on wc.code = i.category_code
      where p.lot_id = $1 group by wc.name, wc.sort_order order by wc.sort_order`,
    [lotId],
  );

export const lockInboundLot = (tx, id, hubOrgId) =>
  queryOne(
    tx,
    `select id, seal_tag as "sealTag", agent_org_id as "agentOrgId", sender_net_kg as "senderNetKg", unit_count_sent as "unitCountSent"
       from lots where id = $1 and hub_org_id = $2 and status = 'in_transit' and hub_received_at is null
      for update`,
    [id, hubOrgId],
  );

export const markReceivedAtHub = (tx, id, r) =>
  tx.query(
    `update lots set status = 'at_hub', hub_received_at = now(), hub_net_kg = $2, hub_seal_intact = $3, hub_unit_count = $4
      where id = $1`,
    [id, r.hubNetKg, r.sealIntact, r.unitCountReceived],
  );

export const insertHubWeight = (tx, lotId, netKg, userId) =>
  tx.query("insert into weigh_records (side, lot_id, net_kg, entry_method, recorded_by) values ('hub', $1, $2, 'manual', $3)", [lotId, netKg, userId]);

export const listLotPickupIds = async (tx, lotId) =>
  (await queryMany(tx, 'select id from pickup_requests where lot_id = $1', [lotId])).map((r) => r.id);

export const findRecycler = (tx, hubOrgId) =>
  queryOne(tx, 'select o.id, o.name from organizations o where o.id = app.hub_principal($1)', [hubOrgId]);

// --- Shipments ---------------------------------------------------------------

const SHIPMENT_FIELDS = `
  s.id, s.reference, s.status, s.vehicle_ref as "vehicleRef", s.created_at as "createdAt",
  s.dispatched_at as "dispatchedAt", s.received_at as "receivedAt", r.name as "recyclerName",
  (select count(*)::int from lots l where l.shipment_id = s.id) as "lotCount",
  (select coalesce(sum(l.hub_net_kg), 0) from lots l where l.shipment_id = s.id) as "netKg",
  (select coalesce(sum(l.hub_unit_count), 0)::int from lots l where l.shipment_id = s.id) as units`;

export const listShipments = (tx, hubOrgId) =>
  queryMany(
    tx,
    `select ${SHIPMENT_FIELDS} from hub_shipments s join organizations r on r.id = s.recycler_org_id
      where s.hub_org_id = $1
      order by case s.status when 'loading' then 0 when 'in_transit' then 1 else 2 end, s.created_at desc
      limit 100`,
    [hubOrgId],
  );

export const findShipment = (tx, id, hubOrgId) =>
  queryOne(tx, `select ${SHIPMENT_FIELDS} from hub_shipments s join organizations r on r.id = s.recycler_org_id where s.id = $1 and s.hub_org_id = $2`, [id, hubOrgId]);

export const listShipmentLots = (tx, shipmentId) =>
  queryMany(tx, `select ${LOT_FIELDS} ${LOT_FROM} where l.shipment_id = $1 order by l.hub_received_at`, [shipmentId]);

export const insertShipment = (tx, s) =>
  queryOne(
    tx,
    `insert into hub_shipments (reference, hub_org_id, recycler_org_id, created_by) values ($1,$2,$3,$4)
     returning id, reference, status`,
    [s.reference, s.hubOrgId, s.recyclerOrgId, s.createdBy],
  );

export const lockLoadingShipment = (tx, id, hubOrgId) =>
  queryOne(tx, "select id, reference from hub_shipments where id = $1 and hub_org_id = $2 and status = 'loading' for update", [id, hubOrgId]);

// Only lots physically at this hub and not yet on a shipment can be loaded.
export const loadLots = async (tx, shipmentId, hubOrgId, lotIds) =>
  (await queryMany(
    tx,
    `update lots set shipment_id = $1
      where id = any($3) and hub_org_id = $2 and status = 'at_hub' and shipment_id is null
      returning id`,
    [shipmentId, hubOrgId, lotIds],
  )).map((r) => r.id);

export const markShipmentDispatched = (tx, id, vehicleRef, userId) =>
  tx.query(
    `update hub_shipments set status = 'in_transit', vehicle_ref = $2, dispatched_by = $3, dispatched_at = now() where id = $1`,
    [id, vehicleRef, userId],
  );

export const markShipmentLotsInTransit = async (tx, shipmentId, vehicleRef) =>
  (await queryMany(
    tx,
    `update lots set status = 'in_transit', vehicle_ref = $2 where shipment_id = $1 and status = 'at_hub' returning id`,
    [shipmentId, vehicleRef],
  )).map((r) => r.id);
