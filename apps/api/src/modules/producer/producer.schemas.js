import { z } from 'zod';
import { UNITS_PER_REQUEST } from '../../config/constants.js';

const INDIAN_STATE_CODES = [
  'AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CG', 'DN', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LA', 'LD',
  'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OD', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB',
];

export const createModelBody = z.object({
  brand: z.string().trim().min(1).max(80),
  modelName: z.string().trim().min(1).max(120),
  modelCode: z.string().trim().regex(/^[A-Za-z0-9._/-]{1,40}$/, 'Model code: letters, digits, . _ / -').optional(),
  categoryCode: z.string().regex(/^[a-z_]{2,40}$/),
  typicalUnitKg: z.number().positive().max(1000).multipleOf(0.001),
  batteryType: z.enum(['none', 'li_ion', 'li_polymer', 'nimh', 'lead_acid', 'other']),
});

export const createBatchBody = z.object({
  modelId: z.uuid(),
  batchRef: z.string().trim().regex(/^[A-Za-z0-9._/-]{2,40}$/, 'Batch reference: 2–40 letters, digits, . _ / -'),
  marketMonth: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM'),
  stateCode: z.enum(INDIAN_STATE_CODES, { message: 'Choose an Indian state' }),
  quantity: z.number().int().min(1).max(1_000_000),
});

// One row per unit: an IMEI, a serial, or nothing (QR-only label).
export const registerUnitsBody = z.object({
  rows: z.array(z.object({
    imei: z.string().trim().optional(),
    serial: z.string().trim().optional(),
  })).min(1).max(UNITS_PER_REQUEST),
});

export const listUnitsQuery = z.object({
  state: z.enum(['registered', 'placed_on_market', 'claimed', 'collected', 'in_lot', 'at_hub', 'received_at_recycler', 'processed']).optional(),
  batchId: z.uuid().optional(),
});
