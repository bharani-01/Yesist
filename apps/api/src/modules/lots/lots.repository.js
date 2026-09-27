import { queryMany, queryOne } from '../../core/db.js';

export const listForAgent = (tx, agentOrgId) =>
  queryMany(
    tx,
    `select l.id, l.seal_tag as "sealTag", l.status, l.unit_count_sent as "unitCountSent",
            l.sender_net_kg as "senderNetKg", l.accepted_net_kg as "acceptedNetKg", l.storage_deadline as "storageDeadline",
            l.created_at as "createdAt", l.dispatched_at as "dispatchedAt", l.received_at as "receivedAt",
            r.name as "recyclerName",
            (select count(*)::int from pickup_requests p where p.lot_id = l.id) as "pickupCount",
            (select a.public_number from attestations a where a.lot_id = l.id and a.status = 'issued') as "attestationNumber"
       from lots l join organizations r on r.id = l.principal_org_id
      where l.agent_org_id = $1 order by l.created_at desc limit 100`,
    [agentOrgId],
  );

export const findActiveAgreement = (tx, agentOrgId) =>
  queryOne(
    tx,
    `select a.id, a.principal_org_id as "principalOrgId", a.max_storage_days as "maxStorageDays"
       from agent_agreements a where a.id = app.active_agreement($1)`,
    [agentOrgId],
  );

export const lockCollectedPickups = (tx, pickupIds, agentOrgId) =>
  queryMany(
    tx,
    `select p.id, p.principal_org_id as "principalOrgId",
            (select coalesce(sum(i.collected_quantity),0) from pickup_items i where i.pickup_id = p.id)::int as units,
            (select min(ce.created_at) from custody_events ce where ce.pickup_id = p.id and ce.event_type = 'collected') as "collectedAt"
       from pickup_requests p
      where p.id = any($1) and p.assigned_agent_org_id = $2 and p.status = 'collected' and p.lot_id is null
      for update`,
    [pickupIds, agentOrgId],
  );

export const insertLot = (tx, l) =>
  queryOne(
    tx,
    `insert into lots (agent_org_id, principal_org_id, agreement_id, seal_tag, storage_deadline, unit_count_sent, created_by)
     values ($1,$2,$3,$4, $5::timestamptz + make_interval(days => $6), $7, $8)
     returning id, seal_tag as "sealTag", status, storage_deadline as "storageDeadline"`,
    [l.agentOrgId, l.principalOrgId, l.agreementId, l.sealTag, l.storageStart, l.maxStorageDays, l.units, l.createdBy],
  );

export const assignPickupsToLot = (tx, lotId, pickupIds) =>
  tx.query("update pickup_requests set status = 'in_lot', lot_id = $1 where id = any($2)", [lotId, pickupIds]);

export const markDispatched = (tx, id, agentOrgId, { senderNetKg, vehicleRef }) =>
  queryOne(
    tx,
    `update lots set status = 'in_transit', sender_net_kg = $3, vehicle_ref = $4, dispatched_at = now()
      where id = $1 and agent_org_id = $2 and status = 'sealed'
      returning id, status`,
    [id, agentOrgId, senderNetKg, vehicleRef ?? null],
  );

export const insertSenderWeight = (tx, lotId, netKg, userId) =>
  tx.query("insert into weigh_records (side, lot_id, net_kg, entry_method, recorded_by) values ('sender', $1, $2, 'manual', $3)", [lotId, netKg, userId]);
