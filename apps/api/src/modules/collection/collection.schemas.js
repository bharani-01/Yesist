import { z } from 'zod';
import { isoDate, kg, money, qrPublicId, timeWindow } from '../../shared/schemas.js';

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
    qrIds: z.array(qrPublicId).max(50).default([]),
  })).min(1),
});

const sanitizeMobile = (val) => {
  if (!val) return val;
  const digits = String(val).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
};

export const cleanMobile = z.string().trim()
  .transform(sanitizeMobile)
  .refine((v) => /^[6-9]\d{9}$/.test(v), { message: 'Enter a valid 10-digit Indian mobile number (e.g. 9826012345)' });

export const lookupCustomerQuery = z.object({
  phone: cleanMobile,
});

export const walkInIntakeBody = z.object({
  customer: z.object({
    phone: cleanMobile.optional().nullable(),
    fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(120).optional().nullable(),
    isAnonymous: z.boolean().default(false),
  }),
  netKg: z.number().positive('Net weight must be greater than 0').max(100000),
  materialPaidAmount: z.number().min(0, 'Material paid amount cannot be negative').max(1000000).default(0),
  payoutMethod: z.enum(['cash', 'upi', 'none']).default('cash'),
  wardId: z.number().int().positive().optional(),
  items: z.array(z.object({
    categoryCode: z.string().regex(/^[a-z_]{2,40}$/),
    quantity: z.number().int().min(1).max(50),
    batteryCheck: z.enum(['no_battery', 'intact_embedded', 'swollen_or_damaged_refused']).optional(),
    refusedReason: z.string().trim().max(200).optional(),
    identifiers: z.array(z.string().trim().min(4).max(40)).max(50).default([]),
    qrIds: z.array(qrPublicId).max(50).default([]),
  })).min(1, 'Please record at least one device category'),
});
