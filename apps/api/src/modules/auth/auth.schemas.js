import { z } from 'zod';
import { indianMobile } from '../../shared/schemas.js';

export const registerBody = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email().trim().toLowerCase().max(254),
  phone: indianMobile,
  password: z.string().min(10, 'Use at least 10 characters').max(128),
});

export const loginBody = z.object({
  email: z.email().trim().toLowerCase().max(254),
  password: z.string().min(1).max(128),
});
