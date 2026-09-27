import { z } from 'zod';
import { isoDate, kg, money, timeWindow } from '../../shared/schemas.js';

export const acceptJobBody = z.object({
  scheduledFor: isoDate,
  scheduledWindow: timeWindow,
});

export const collectJobBody = z.object({
  handoverCode: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code from the customer'),
  netKg: kg,
  materialPaidAmount: money,
  items: z.array(z.object({
    itemId: z.uuid(),
    collectedQuantity: z.number().int().min(0).max(50),
    batteryCheck: z.enum(['no_battery', 'intact_embedded', 'swollen_or_damaged_refused']).optional(),
    refusedReason: z.string().trim().max(200).optional(),
    identifiers: z.array(z.string().trim().min(4).max(40)).max(50).default([]),
  })).min(1),
});
