import { z } from 'zod';
import { kg } from '../../shared/schemas.js';

export const receiveLotBody = z.object({
  receiverNetKg: kg,
  sealIntact: z.boolean(),
  unitCountReceived: z.number().int().min(0).max(100000),
});
