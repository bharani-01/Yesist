import { z } from 'zod';
import { qrPublicId } from '../../shared/schemas.js';

export const claimBody = z.object({ qr: qrPublicId });

export const manualDeviceBody = z.object({
  category:     z.string().trim().min(1).max(80),
  brand:        z.string().trim().max(80).optional().transform(v => v || null),
  model:        z.string().trim().max(120).optional().transform(v => v || null),
  serialNumber: z.string().trim().max(80).optional().transform(v => v || null),
  yearOfPurchase: z.union([z.number().int().min(1990).max(new Date().getFullYear()), z.null()]).optional(),
  condition:    z.enum(['working', 'partially_working', 'not_working']).optional().default('working'),
  notes:        z.string().trim().max(500).optional().transform(v => v || null),
  photoUrl:     z.string().url().optional().nullable(),
});
