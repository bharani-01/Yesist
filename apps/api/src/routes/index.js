import { Router } from 'express';
import { noStore } from '../middleware/no-store.js';
import { attestationsRoutes } from '../modules/attestations/attestations.routes.js';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { collectionRoutes } from '../modules/collection/collection.routes.js';
import { healthRoutes } from '../modules/health/health.routes.js';
import { intakeRoutes } from '../modules/intake/intake.routes.js';
import { lotsRoutes } from '../modules/lots/lots.routes.js';
import { oversightRoutes } from '../modules/oversight/oversight.routes.js';
import { pickupsRoutes } from '../modules/pickups/pickups.routes.js';
import { producerRoutes } from '../modules/producer/producer.routes.js';
import { referenceRoutes } from '../modules/reference/reference.routes.js';
import { verificationRoutes } from '../modules/verification/verification.routes.js';

/** Versioned API surface (mounted at /api/v1). */
export function buildApiRouter() {
  const api = Router();

  // Public
  api.use('/health', healthRoutes);
  api.use('/reference', referenceRoutes);
  api.use('/public', verificationRoutes);

  // Authenticated (authorization is enforced per module)
  api.use('/auth', noStore, authRoutes);
  api.use('/pickups', noStore, pickupsRoutes);
  api.use('/agent/jobs', noStore, collectionRoutes);
  api.use('/agent/lots', noStore, lotsRoutes);
  api.use('/recycler/lots', noStore, intakeRoutes);
  api.use('/recycler/attestations', noStore, attestationsRoutes);
  api.use('/oversight', noStore, oversightRoutes);
  api.use('/producer', noStore, producerRoutes);

  return api;
}
