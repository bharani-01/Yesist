import { queryMany, queryOne } from '../../core/db.js';

// Units the citizen claimed by scanning their QR label. RLS limits rows to the caller's claims.
export const listClaimed = (tx, userId) =>
  queryMany(
    tx,
    `select u.qr_public_id as "qrPublicId", u.state, u.category_code as "categoryCode", u.updated_at as "updatedAt", c.claimed_at as "claimedAt",
            m.brand, m.model_name as "modelName", wc.name as "categoryName"
       from unit_claims c
       join product_units u on u.id = c.unit_id
       join waste_categories wc on wc.code = u.category_code
       left join product_models m on m.id = u.model_id
      where c.user_id = $1
      order by c.claimed_at desc limit 200`,
    [userId],
  );

/**
 * Returns recycling certificate data for a citizen-owned device.
 * Reads from the recycling_certificates table (populated by the
 * trg_generate_certificates trigger when an attestation is issued).
 * Returns null if the device has not yet been attested.
 */
export const findCertificate = (tx, qr, userId) =>
  queryOne(
    tx,
    `select
       u.qr_public_id   as "qrPublicId",
       m.brand,
       m.model_name     as "modelName",
       wc.name          as "categoryName",
       rc.cert_number   as "certNumber",
       rc.issued_at     as "issuedAt",
       o.name           as "recyclerName",
       o.registration_no as "registrationNo"
     from unit_claims c
     join product_units u         on u.id = c.unit_id
     join waste_categories wc     on wc.code = u.category_code
     left join product_models m   on m.id = u.model_id
     left join recycling_certificates rc on rc.unit_id = u.id
     left join attestations a     on a.id = rc.attestation_id
     left join organizations o    on o.id = a.issuer_org_id
     where c.user_id = $1 and u.qr_public_id = $2`,
    [userId, qr],
  );

// Returns ok | already_yours | claimed | not_claimable | not_found.
export const claim = async (tx, qr) => (await queryOne(tx, 'select app.claim_unit($1) as result', [qr])).result;

export const insertManualDevice = (tx, userId, d) =>
  queryOne(
    tx,
    `insert into manual_devices
       (user_id, category, brand, model, serial_number, year_of_purchase, condition, notes, photo_url)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     returning id, category, brand, model, created_at as "createdAt"`,
    [userId, d.category, d.brand, d.model, d.serialNumber, d.yearOfPurchase, d.condition, d.notes, d.photoUrl],
  );
