import { env } from '../config/env.js';
import { AppError } from '../core/errors.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Defence in depth against CSRF alongside SameSite=strict cookies:
 * state-changing requests must come from an allowed origin and carry JSON.
 */
export function originGuard(req, _res, next) {
  if (SAFE_METHODS.has(req.method)) return next();
  const origin = req.get('origin');
  const self = `${req.protocol}://${req.get('host')}`;
  if (origin && origin !== env.webOrigin && origin !== self) {
    return next(new AppError(403, 'origin_not_allowed', 'Request origin is not allowed.'));
  }
  if (req.get('content-length') > 0 && !req.is('application/json')) {
    return next(new AppError(415, 'unsupported_media_type', 'Send the request body as JSON.'));
  }
  return next();
}
