import { SESSION } from '../../config/constants.js';
import { env } from '../../config/env.js';
import { contextOf } from '../../shared/context.js';
import * as service from './auth.service.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: 'strict',
  path: '/',
};

function setSessionCookie(res, token) {
  res.cookie(SESSION.cookieName, token, { ...cookieOptions, maxAge: SESSION.ttlHours * 3600 * 1000 });
}

export async function register(req, res) {
  const { token, user } = await service.register(req.valid.body, contextOf(req));
  setSessionCookie(res, token);
  res.status(201).json({ user });
}

export async function login(req, res) {
  const { token, user } = await service.login(req.valid.body, contextOf(req));
  setSessionCookie(res, token);
  res.json({ user });
}

export async function logout(req, res) {
  await service.logout(req.cookies?.[SESSION.cookieName]);
  res.clearCookie(SESSION.cookieName, cookieOptions);
  res.status(204).end();
}

export function me(req, res) {
  res.json({ user: req.auth });
}
