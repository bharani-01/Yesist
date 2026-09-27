import { z } from 'zod';
import { qrPublicId } from '../../shared/schemas.js';

export const attestationNumberParams = z.object({
  number: z.string().trim().toUpperCase().regex(/^ECS-ATT-\d{4}-\d{6}$/, 'Use the format ECS-ATT-YYYY-NNNNNN'),
});

export const productParams = z.object({ qr: qrPublicId });
