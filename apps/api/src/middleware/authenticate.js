import { env } from '../config/env.js';
import { resolveSessionActor } from '../modules/auth/auth.service.js';

/**
 * Resolves the session cookie into req.auth. Never rejects on its own;
 * route-level authorization middleware decides what is allowed.
 */
export async function authenticate(req, _res, next) {
  const token = req.cookies?.[env.sessionCookieName];
  if (token) req.auth = await resolveSessionActor(token);
  next();
}
