import { z } from 'zod';
import { kg } from '../../shared/schemas.js';

export const createLotBody = z.object({
  sealTag: z.string().trim().toUpperCase().regex(/^[A-Z0-9-]{6,30}$/, 'Seal tag: 6–30 letters, digits, or dashes'),
  pickupIds: z.array(z.uuid()).min(1).max(200),
});

export const dispatchLotBody = z.object({
  senderNetKg: kg,
  vehicleRef: z.string().trim().max(40).optional(),
});
