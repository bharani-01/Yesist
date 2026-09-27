import { z } from 'zod';
import { indianMobile, isoDate, timeWindow } from '../../shared/schemas.js';

export const createPickupBody = z.object({
  wardId: z.number().int().positive(),
  contactName: z.string().trim().min(2).max(120),
  contactPhone: indianMobile,
  addressLine: z.string().trim().min(5).max(300),
  landmark: z.string().trim().max(160).optional().transform((v) => v || null),
  preferredDate: isoDate,
  preferredWindow: timeWindow,
  items: z.array(z.object({
    categoryCode: z.string().regex(/^[a-z_]{2,40}$/),
    quantity: z.number().int().min(1).max(50),
  })).min(1).max(8),
}).refine((b) => new Set(b.items.map((i) => i.categoryCode)).size === b.items.length, {
  message: 'Each category can appear only once', path: ['items'],
});

export const cancelPickupBody = z.object({
  reason: z.string().trim().min(3).max(300),
});
