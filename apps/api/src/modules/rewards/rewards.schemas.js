import { z } from 'zod';

export const redeemBody = z.object({
  rewardKey: z.string().trim().regex(/^[a-z_]{2,40}$/, 'Invalid reward key'),
  idempotencyKey: z.string().trim().uuid().optional(),
});

export const ledgerQuery = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  before: z.coerce.number().int().optional(),
});
