import { z } from 'zod';

export const listFlagsQuery = z.object({
  status: z.enum(['open', 'under_review', 'escalated', 'closed', 'active', 'all']).default('active'),
});

export const updateFlagBody = z.object({
  status: z.enum(['under_review', 'escalated', 'closed']),
  note: z.string().trim().min(5, 'Add a short note (at least 5 characters)').max(1000),
});
