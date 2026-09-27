import { z } from 'zod';

export const idParams = z.object({ id: z.uuid() });
export const indianMobile = z.string().regex(/^[6-9]\d{9}$/, 'Enter a 10-digit Indian mobile number');
export const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD');
export const timeWindow = z.enum(['morning', 'afternoon', 'evening']);
export const kg = z.number().positive().max(100000).multipleOf(0.001);
export const money = z.number().min(0).max(1000000).multipleOf(0.01);

// 15-digit IMEI with a valid Luhn check digit.
export function isValidImei(value) {
  if (!/^\d{15}$/.test(value)) return false;
  let sum = 0;
  for (let i = 0; i < 15; i += 1) {
    let digit = Number(value[14 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
