import { queryMany, queryOne } from '../../core/db.js';

const LOT_FIELDS = `
  l.id, l.seal_tag as "sealTag", l.status, l.unit_count_sent as "unitCountSent", l.unit_count_received as "unitCountReceived",
  l.sender_net_kg as "senderNetKg", l.receiver_net_kg as "receiverNetKg", l.accepted_net_kg as "acceptedNetKg",
  l.seal_intact as "sealIntact", l.vehicle_ref as "vehicleRef", l.storage_deadline as "storageDeadline",
  l.created_at as "createdAt", l.dispatched_at as "dispatchedAt", l.received_at as "receivedAt",
  ag.name as "agentName"`;

export const listInbound = (tx, recyclerOrgId) =>
  queryMany(
    tx,
    `select ${LOT_FIELDS},
            (select json_build_object('id', a.id, 'status', a.status, 'publicNumber', a.public_number)
               from attestations a where a.lot_id = l.id) as attestation
       from lots l join organizations ag on ag.id = l.agent_org_id
      where l.principal_org_id = $1 and l.status <> 'sealed'
      order by case l.status when 'in_transit' then 0 when 'received' then 1 when 'disputed' then 2 else 3 end,
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
            count(piu.unit_id) filter (where not piu.duplicate)::int as "passportUnits"
       from pickup_requests p
       join pickup_items i on i.pickup_id = p.id and i.collected_quantity > 0
       join waste_categories wc on wc.code = i.category_code
       left join pickup_item_units piu on piu.pickup_item_id = i.id
      where p.lot_id = $1 group by wc.name, wc.sort_order order by wc.sort_order`,
    [lotId],
  );

export const findLotAttestation = (tx, lotId, userId) =>
  queryOne(
    tx,
    `select a.id, a.status, a.public_number as "publicNumber", a.processed_kg as "processedKg", a.battery_kg as "batteryKg",
            a.unit_count as "unitCount", a.sha256, a.drafted_at as "draftedAt", a.issued_at as "issuedAt",
            a.maker_id = $2 as "madeByMe", a.checker_id = $2 as "checkedByMe"
       from attestations a where a.lot_id = $1`,
    [lotId, userId],
  );

export const lockInTransitLot = (tx, id, recyclerOrgId) =>
  queryOne(
    tx,
    `select id, seal_tag as "sealTag", agent_org_id as "agentOrgId", sender_net_kg as "senderNetKg", unit_count_sent as "unitCountSent"
       from lots where id = $1 and principal_org_id = $2 and status = 'in_transit' for update`,
    [id, recyclerOrgId],
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
