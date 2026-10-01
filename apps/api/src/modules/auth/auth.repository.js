import { queryMany, queryOne } from '../../core/db.js';

export const registerCitizen = async (tx, { email, phone, fullName, passwordHash }) =>
  (await queryOne(tx, 'select app.auth_register_citizen($1,$2,$3,$4) as id', [email, phone, fullName, passwordHash])).id;

export const findCredentials = (tx, email) =>
  queryOne(tx, 'select user_id as "userId", password_hash as "passwordHash", status from app.auth_credentials($1)', [email]);

export const createSession = (tx, userId, tokenHash, ttlHours) =>
  tx.query('select app.auth_create_session($1, $2, $3)', [userId, tokenHash, ttlHours]);

export const resolveSession = async (tx, tokenHash) =>
  (await queryOne(tx, 'select app.auth_resolve_session($1) as user_id', [tokenHash]))?.user_id ?? null;

export const revokeSession = (tx, tokenHash) => tx.query('select app.auth_revoke_session($1)', [tokenHash]);

export const findUser = (tx, userId) =>
  queryOne(tx, 'select id, email, phone, full_name as "fullName", platform_role as role from users where id = $1', [userId]);

export const findMemberships = (tx, userId) =>
  queryMany(
    tx,
    `select o.id, o.org_type as type, o.name, m.org_role as "orgRole"
       from organization_members m join organizations o on o.id = m.org_id
      where m.user_id = $1 and o.status = 'active' order by o.name`,
    [userId],
  );

export const linkReferral = (tx, code, refereeId) =>
  tx.query(
    `update referral_links
     set referee_id = $1, used_at = now()
     where code = $2 and referee_id is null and referrer_id <> $1`,
    [refereeId, code],
  );

export const creditSignupGreenPoints = (tx, userId) =>
  tx.query(
    `select app.credit_green_points($1, 20, 'profile_complete', null, null, null, 'Welcome to EcoSure! Profile complete bonus')`,
    [userId],
  );

