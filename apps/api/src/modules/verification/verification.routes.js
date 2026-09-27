import { Router } from 'express';
import { publicLimiter } from '../../middleware/rate-limit.js';
import { validate } from '../../middleware/validate.js';
import * as controller from './verification.controller.js';
import { attestationNumberParams, productParams } from './verification.schemas.js';

export const verificationRoutes = Router();

verificationRoutes.get(
  '/attestations/:number',
  publicLimiter,
  validate({ params: attestationNumberParams }),
  controller.verifyAttestation,
);

verificationRoutes.get(
  '/products/:qr',
  publicLimiter,
  validate({ params: productParams }),
  controller.productJourney,
);
