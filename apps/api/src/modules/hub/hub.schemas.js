import { z } from 'zod';
import { kg } from '../../shared/schemas.js';

export const receiveAtHubBody = z.object({
  hubNetKg: kg,
  sealIntact: z.boolean(),
  unitCountReceived: z.number().int().min(0).max(100000),
});

const lotIds = z.array(z.uuid()).min(1).max(200);

export const createShipmentBody = z.object({ lotIds });

export const addShipmentLotsBody = z.object({ lotIds });

export const dispatchShipmentBody = z.object({
  vehicleRef: z.string().trim().min(2).max(40),
});
