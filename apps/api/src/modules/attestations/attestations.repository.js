import { queryMany, queryOne } from '../../core/db.js';

export const findReceivedLot = (tx, lotId, recyclerOrgId) =>
  queryOne(
    tx,
    `select id, unit_count_received as "unitCountReceived" from lots
      where id = $1 and principal_org_id = $2 and status = 'received'`,
    [lotId, recyclerOrgId],
  );

export const findRegistrationNo = async (tx, orgId) =>
  (await queryOne(tx, 'select registration_no from organizations where id = $1', [orgId])).registration_no;

export const insertDraft = (tx, d) =>
  queryOne(
    tx,
    `insert into attestations (lot_id, issuer_org_id, registration_no, processed_kg, battery_kg, unit_count, maker_id)
     values ($1,$2,$3,$4,$5,$6,$7)
     on conflict (lot_id) do nothing
     returning id, status`,
    [d.lotId, d.issuerOrgId, d.registrationNo, d.processedKg, d.batteryKg, d.unitCount, d.makerId],
  );

export const lockForApproval = (tx, id, recyclerOrgId) =>
  queryOne(
    tx,
    `select a.id, a.lot_id as "lotId", a.status, a.maker_id as "makerId", a.issuer_org_id as "issuerOrgId",
            a.registration_no as "registrationNo", a.processed_kg as "processedKg", a.battery_kg as "batteryKg",
            a.unit_count as "unitCount", a.disclaimer_version as "disclaimerVersion", l.seal_tag as "sealTag"
       from attestations a join lots l on l.id = a.lot_id
      where a.id = $1 and a.issuer_org_id = $2 for update of a`,
    [id, recyclerOrgId],
  );

export const nextAttestationSerial = async (tx) =>
  (await queryOne(tx, "select nextval('attestation_number_seq') as n")).n;

export const markIssued = (tx, id, { checkerId, publicNumber, sha256, issuedAt }) =>
  tx.query(
    "update attestations set status = 'issued', checker_id = $2, public_number = $3, sha256 = $4, issued_at = $5 where id = $1",
    [id, checkerId, publicNumber, sha256, issuedAt],
  );

export const markLotAttested = (tx, lotId) => tx.query("update lots set status = 'attested' where id = $1", [lotId]);

export const closeLotPickups = async (tx, lotId) =>
  (await queryMany(tx, "update pickup_requests set status = 'closed' where lot_id = $1 returning id", [lotId])).map((r) => r.id);
