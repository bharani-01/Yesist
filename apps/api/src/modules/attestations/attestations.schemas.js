import { z } from 'zod';
import { kg } from '../../shared/schemas.js';

export const lotIdParams = z.object({ lotId: z.uuid() });

export const draftAttestationBody = z.object({
  processedKg: kg,
  batteryKg: z.number().min(0).max(100000).multipleOf(0.001).default(0),
});
