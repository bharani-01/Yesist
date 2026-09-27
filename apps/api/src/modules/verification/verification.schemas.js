import { z } from 'zod';

export const attestationNumberParams = z.object({
  number: z.string().trim().toUpperCase().regex(/^ECS-ATT-\d{4}-\d{6}$/, 'Use the format ECS-ATT-YYYY-NNNNNN'),
});
