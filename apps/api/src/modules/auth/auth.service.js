import { AGENT_ORG_TYPES, HUB_ORG_TYPES, OVERSIGHT_ROLES, PRODUCER_ORG_TYPES, RECYCLER_ORG_TYPES, SESSION } from '../../config/constants.js';
import { withTx } from '../../core/db.js';
import { AppError, Errors } from '../../core/errors.js';
import { hashSessionToken, newSessionToken } from '../../core/security/hashing.js';
import { DUMMY_PASSWORD_HASH, hashPassword, verifyPassword } from '../../core/security/password.js';
import { writeAudit } from '../../shared/audit.js';
import * as repo from './auth.repository.js';

export function workspaceFor(role, orgs) {
  if (role === 'citizen') return 'citizen';
  if (OVERSIGHT_ROLES.includes(role)) return 'oversight';
  if (orgs.some((o) => PRODUCER_ORG_TYPES.includes(o.type))) return 'producer';
  if (orgs.some((o) => RECYCLER_ORG_TYPES.includes(o.type))) return 'recycler';
  if (orgs.some((o) => HUB_ORG_TYPES.includes(o.type))) return 'hub';
  if (orgs.some((o) => AGENT_ORG_TYPES.includes(o.type))) return 'agent';
  return 'none';
}

export async function loadActor(userId) {
  return withTx(userId, async (tx) => {
    const user = await repo.findUser(tx, userId);
    if (!user) return null;
    const orgs = await repo.findMemberships(tx, userId);
    return {
      userId: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      orgs,
      workspace: workspaceFor(user.role, orgs),
    };
  });
}

export async function resolveSessionActor(token) {
  const userId = await withTx(null, (tx) => repo.resolveSession(tx, hashSessionToken(token)));
  return userId ? loadActor(userId) : null;
}

async function startSession(userId) {
  const token = newSessionToken();
  await withTx(null, (tx) => repo.createSession(tx, userId, hashSessionToken(token), SESSION.ttlHours));
  return token;
}

export async function register(input, ctx) {
  const passwordHash = await hashPassword(input.password);
  const userId = await withTx(null, async (tx) => {
    const id = await repo.registerCitizen(tx, { ...input, passwordHash });
    if (id) {
      await writeAudit(tx, { actor: null, action: 'user.register', entity: 'user', entityId: id, ip: ctx.ip });
      // Credit signup milestone points
      await repo.creditSignupGreenPoints(tx, id);
      // Link referral code if provided
      if (input.referralCode) {
        await repo.linkReferral(tx, input.referralCode.trim().toUpperCase(), id);
      }
    }
    return id;
  });
  if (!userId) throw Errors.conflict('account_exists', 'An account with this email or phone already exists.');
  return { token: await startSession(userId), user: await loadActor(userId) };
}

export async function login({ email, password }, ctx) {
  const cred = await withTx(null, (tx) => repo.findCredentials(tx, email));
  const ok = await verifyPassword(password, cred?.passwordHash ?? DUMMY_PASSWORD_HASH);
  if (!cred || !ok) throw new AppError(401, 'invalid_credentials', 'Email or password is incorrect.');
  if (cred.status !== 'active') throw new AppError(403, 'account_suspended', 'This account is suspended. Contact the EcoSure helpdesk.');
  const token = await startSession(cred.userId);
  await withTx(cred.userId, (tx) =>
    writeAudit(tx, { actor: { userId: cred.userId }, action: 'user.login', entity: 'user', entityId: cred.userId, ip: ctx.ip }));
  return { token, user: await loadActor(cred.userId) };
}

export async function logout(token) {
  if (token) await withTx(null, (tx) => repo.revokeSession(tx, hashSessionToken(token)));
}
