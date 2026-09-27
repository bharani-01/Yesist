import { queryMany, queryOne } from '../../core/db.js';

const LOT_FIELDS = `
  l.id, l.seal_tag as "sealTag", l.status, l.unit_count_sent as "unitCountSent", l.unit_count_received as "unitCountReceived",
  l.sender_net_kg as "senderNetKg", l.receiver_net_kg as "receiverNetKg", l.accepted_net_kg as "acceptedNetKg",
  l.seal_intact as "sealIntact", l.vehicle_ref as "vehicleRef", l.storage_deadline as "storageDeadline",
  l.created_at as "createdAt", l.dispatched_at as "dispatchedAt", l.received_at as "receivedAt",
  ag.name as "agentName",
  (select h.name from organizations h where h.id = l.hub_org_id) as "hubName",
  l.hub_received_at as "hubReceivedAt", l.hub_net_kg as "hubNetKg", l.hub_unit_count as "hubUnitCount", l.hub_seal_intact as "hubSealIntact",
  (l.status = 'in_transit' and (l.hub_org_id is null or l.hub_received_at is not null)) as receivable`;

export const listInbound = (tx, recyclerOrgId) =>
  queryMany(
    tx,
    `select ${LOT_FIELDS},
            (select json_build_object('id', a.id, 'status', a.status, 'publicNumber', a.public_number)
               from attestations a where a.lot_id = l.id) as attestation
       from lots l join organizations ag on ag.id = l.agent_org_id
      where l.principal_org_id = $1 and l.status <> 'sealed'
      order by case when l.status = 'in_transit' and (l.hub_org_id is null or l.hub_received_at is not null) then 0
                    when l.status = 'received' then 1 when l.status = 'disputed' then 2
                    when l.status in ('in_transit','at_hub') then 3 else 4 end,
               l.dispatched_at desc nulls last
      limit 200`,
    [recyclerOrgId],
  );

export const findLot = (tx, id, recyclerOrgId) =>
  queryOne(tx, `select ${LOT_FIELDS} from lots l join organizations ag on ag.id = l.agent_org_id where l.id = $1 and l.principal_org_id = $2`, [id, recyclerOrgId]);

export const listLotContents = (tx, lotId) =>
  queryMany(
    tx,
    `select wc.name, sum(i.collected_quantity)::int as units,
            sum((select count(*) from pickup_item_units piu where piu.pickup_item_id = i.id and not piu.duplicate))::int as "passportUnits"
       from pickup_requests p
       join pickup_items i on i.pickup_id = p.id and i.collected_quantity > 0
       join waste_categories wc on wc.code = i.category_code
      where p.lot_id = $1 group by wc.name, wc.sort_order order by wc.sort_order`,
    [lotId],
  );

// Units in the lot that carry a printed manufacturer QR label (the ones a gate scan can confirm).
export const listLabelledUnits = (tx, lotId) =>
  queryMany(
    tx,
    `select distinct u.id, u.qr_public_id as "qrPublicId", u.last4, u.state, m.brand, m.model_name as "modelName"
       from pickup_requests p
       join pickup_items i on i.pickup_id = p.id
       join pickup_item_units piu on piu.pickup_item_id = i.id and not piu.duplicate
       join product_units u on u.id = piu.unit_id and not u.legacy
       left join product_models m on m.id = u.model_id
      where p.lot_id = $1
      order by u.qr_public_id`,
    [lotId],
  );

export const markUnitsMissing = (tx, lotId, unitIds) => tx.query('select app.mark_units_missing($1, $2)', [lotId, unitIds]);

export const findLotAttestation = (tx, lotId, userId) =>
  queryOne(
    tx,
    `select a.id, a.status, a.public_number as "publicNumber", a.processed_kg as "processedKg", a.battery_kg as "batteryKg",
            a.unit_count as "unitCount", a.sha256, a.drafted_at as "draftedAt", a.issued_at as "issuedAt",
            a.maker_id = $2 as "madeByMe", a.checker_id = $2 as "checkedByMe"
       from attestations a where a.lot_id = $1`,
    [lotId, userId],
  );

// In transit to this recycler: direct from the agent, or inside a hub shipment after the hub received it.
export const lockReceivableLot = (tx, id, recyclerOrgId) =>
  queryOne(
    tx,
    `select id, seal_tag as "sealTag", agent_org_id as "agentOrgId", sender_net_kg as "senderNetKg", unit_count_sent as "unitCountSent",
            hub_org_id as "hubOrgId", hub_net_kg as "hubNetKg", hub_unit_count as "hubUnitCount", shipment_id as "shipmentId"
       from lots
      where id = $1 and principal_org_id = $2 and status = 'in_transit' and (hub_org_id is null or hub_received_at is not null)
      for update`,
    [id, recyclerOrgId],
  );

export const closeShipmentIfComplete = (tx, shipmentId) =>
  tx.query(
    `update hub_shipments set status = 'received', received_at = now()
      where id = $1 and status = 'in_transit'
        and not exists (select 1 from lots where shipment_id = $1 and status = 'in_transit')`,
    [shipmentId],
  );

export const insertReceiverWeight = (tx, lotId, netKg, userId) =>
  tx.query("insert into weigh_records (side, lot_id, net_kg, entry_method, recorded_by) values ('receiver', $1, $2, 'manual', $3)", [lotId, netKg, userId]);

export const markReceived = (tx, id, r) =>
  tx.query(
    `update lots set status = $2, receiver_net_kg = $3, accepted_net_kg = $4, seal_intact = $5,
            unit_count_received = $6, received_at = now()
      where id = $1`,
    [id, r.status, r.receiverNetKg, r.acceptedNetKg, r.sealIntact, r.unitCountReceived],
  );

export const markPickupsReceived = async (tx, lotId) =>
  (await queryMany(tx, "update pickup_requests set status = 'received' where lot_id = $1 returning id", [lotId])).map((r) => r.id);
