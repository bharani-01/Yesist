import { createHash, createHmac, randomBytes, randomInt } from 'node:crypto';
import { env } from '../../config/env.js';

export const newSessionToken = () => randomBytes(32).toString('base64url');
export const hashSessionToken = (token) => createHash('sha256').update(token).digest('hex');

// Device identifiers are stored only as keyed hashes (PRD v3 §9.3).
export const hashIdentifier = (type, value) =>
  createHmac('sha256', env.identifierHmacKey).update(`${type}:${value}`).digest('hex');

export const newHandoverCode = () => String(randomInt(0, 1_000_000)).padStart(6, '0');
export const hashHandoverCode = (pickupId, code) =>
  createHmac('sha256', env.handoverHmacKey).update(`${pickupId}:${code}`).digest('hex');

export const sha256Hex = (text) => createHash('sha256').update(text).digest('hex');
