import { z } from 'zod';
import { kg, qrPublicId } from '../../shared/schemas.js';

export const receiveLotBody = z.object({
  receiverNetKg: kg,
  sealIntact: z.boolean(),
  unitCountReceived: z.number().int().min(0).max(100000),
  // When the gate scanned QR labels, every labelled unit of the lot not in this list is missing.
  scan: z.object({ qrIds: z.array(qrPublicId).max(5000) }).optional(),
});
