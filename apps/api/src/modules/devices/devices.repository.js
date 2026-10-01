import { queryMany, queryOne } from '../../core/db.js';

// Units the citizen claimed. Includes active pickup booking for the device's category
// so the UI can show a "Booked for pickup" badge and block re-booking.
export const listClaimed = (tx, userId) =>
  queryMany(
    tx,
    `select
       u.qr_public_id          as "qrPublicId",
       u.state,
       case
         when u.state in ('processed', 'materials_recovered') or rc.id is not null then 'recycled'
         when u.state in ('collected', 'in_lot', 'at_hub', 'received_at_recycler') then 'in_transit'
         when active_pr.id is not null then 'booked'
         else 'active'
       end                     as status,
       (u.state in ('processed', 'materials_recovered') or rc.id is not null) as "isRecycled",
       case when (u.state in ('processed', 'materials_recovered') or rc.id is not null) then coalesce(rc.issued_at, u.updated_at) else null end as "recycledAt",
       rc.cert_number          as "certNumber",
       u.category_code         as "categoryCode",
       u.updated_at            as "updatedAt",
       c.claimed_at            as "claimedAt",
       m.brand,
       m.model_name            as "modelName",
       wc.name                 as "categoryName",
       -- Active pickup booking for this device's category (requested or scheduled)
       active_pr.id            as "activePickupId",
       active_pr.status        as "activePickupStatus",
       active_pr.preferred_date::text as "activePickupDate"
     from unit_claims c
     join product_units u        on u.id = c.unit_id
     join waste_categories wc    on wc.code = u.category_code
     left join product_models m  on m.id = u.model_id
     left join recycling_certificates rc on rc.unit_id = u.id
     -- Find an open pickup by the same citizen that includes this device's category
     left join lateral (
       select pr.id, pr.status, pr.preferred_date
       from pickup_requests pr
       join pickup_items pi on pi.pickup_id = pr.id
       where pr.requester_id = c.user_id
         and pi.category_code = u.category_code
         and pr.status in ('requested','scheduled')
       order by pr.created_at desc
       limit 1
     ) active_pr on true
     where c.user_id = $1
     order by c.claimed_at desc
     limit 200`,
    [userId],
  );

export const listManual = (tx, userId) =>
  queryMany(
    tx,
    `select
       m.id,
       m.status,
       (m.status = 'recycled') as "isRecycled",
       m.recycled_at as "recycledAt",
       m.status as state,
       case lower(trim(m.category))
         when 'smartphone' then 'mobile_phone'
         when 'mobile' then 'mobile_phone'
         when 'phone' then 'mobile_phone'
         when 'mobile_phone' then 'mobile_phone'
         when 'laptop' then 'laptop'
         when 'tablet' then 'tablet'
         when 'television' then 'monitor_tv'
         when 'tv' then 'monitor_tv'
         when 'monitor' then 'monitor_tv'
         when 'monitor_tv' then 'monitor_tv'
         when 'desktop' then 'desktop_cpu'
         when 'desktop_cpu' then 'desktop_cpu'
         when 'printer' then 'printer'
         when 'refrigerator' then 'small_appliance'
         when 'washing machine' then 'small_appliance'
         when 'air conditioner' then 'small_appliance'
         when 'microwave' then 'small_appliance'
         when 'small_appliance' then 'small_appliance'
         else coalesce((select code from waste_categories where code = lower(trim(m.category))), 'cables_accessories')
       end as "categoryCode",
       m.updated_at as "updatedAt",
       m.created_at as "claimedAt",
       m.brand,
       m.model      as "modelName",
       m.category   as "categoryName",
       m.photo_url  as "photoUrl",
       null         as "certNumber",
       null         as "activePickupId",
       null         as "activePickupStatus",
       null         as "activePickupDate"
     from manual_devices m
     where m.user_id = $1
     order by m.created_at desc
     limit 200`,
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
       (user_id, category, brand, model, serial_number, year_of_purchase, condition, notes, photo_url, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,'active')
     returning id, category, brand, model, status, created_at as "createdAt"`,
    [userId, d.category, d.brand, d.model, d.serialNumber, d.yearOfPurchase, d.condition, d.notes, d.photoUrl],
  );

export const updateManualDeviceStatus = (tx, userId, id, status) =>
  queryOne(
    tx,
    `update manual_devices
     set status = $1,
         recycled_at = case when $1 = 'recycled' then now() else null end,
         updated_at = now()
     where id = $2 and user_id = $3
     returning id, status, recycled_at as "recycledAt"`,
    [status, id, userId],
  );

export const updateClaimedUnitStatus = (tx, userId, qr, status) =>
  queryOne(
    tx,
    `update product_units
     set state = case when $1 = 'recycled' then 'processed' else 'claimed' end,
         updated_at = now()
     where qr_public_id = $2
       and id in (select unit_id from unit_claims where user_id = $3)
     returning id, qr_public_id as "qrPublicId", state`,
    [status, qr, userId],
  );
