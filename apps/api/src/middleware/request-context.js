import { randomUUID } from 'node:crypto';
import { logger } from '../core/logger.js';

const INCOMING_ID = /^[A-Za-z0-9-]{8,64}$/;

/** Assigns a request id (reusing a safe inbound X-Request-Id) and a request-scoped logger. */
export function requestContext(req, res, next) {
  const inbound = req.get('x-request-id');
  req.id = inbound && INCOMING_ID.test(inbound) ? inbound : randomUUID();
  req.log = logger.child({ requestId: req.id });
  res.set('X-Request-Id', req.id);
  next();
}
