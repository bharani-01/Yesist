import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

function limiter({ windowMs, limit, message }) {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skip: () => env.isTest,
    handler: (req, res) =>
      res.status(429).json({ error: { code: 'rate_limited', message, requestId: req.id } }),
  });
}

export const credentialLimiter = limiter({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: 'Too many sign-in attempts. Try again in 15 minutes.',
});

export const apiLimiter = limiter({
  windowMs: 60 * 1000,
  limit: 300,
  message: 'Too many requests. Slow down and try again shortly.',
});

export const publicLimiter = limiter({
  windowMs: 60 * 1000,
  limit: 60,
  message: 'Too many verification requests. Try again in a minute.',
});
