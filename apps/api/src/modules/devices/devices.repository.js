import { queryMany, queryOne } from '../../core/db.js';

// Units the citizen claimed by scanning their QR label. RLS limits rows to the caller's claims.
export const listClaimed = (tx, userId) =>
  queryMany(
    tx,
    `select u.qr_public_id as "qrPublicId", u.state, u.updated_at as "updatedAt", c.claimed_at as "claimedAt",
            m.brand, m.model_name as "modelName", wc.name as "categoryName"
       from unit_claims c
       join product_units u on u.id = c.unit_id
       join waste_categories wc on wc.code = u.category_code
       left join product_models m on m.id = u.model_id
      where c.user_id = $1
      order by c.claimed_at desc limit 200`,
    [userId],
  );

// Returns ok | already_yours | claimed | not_claimable | not_found.
export const claim = async (tx, qr) => (await queryOne(tx, 'select app.claim_unit($1) as result', [qr])).result;
