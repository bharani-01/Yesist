import { Router } from 'express';
import { ATTESTATION_CHECKER_ROLES, ATTESTATION_MAKER_ROLES, RECYCLER_ORG_TYPES } from '../../config/constants.js';
import { requireOrg, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './attestations.controller.js';
import { draftAttestationBody, lotIdParams } from './attestations.schemas.js';

export const attestationsRoutes = Router();
attestationsRoutes.use(requireWorkspace('recycler'));

attestationsRoutes.post(
  '/lots/:lotId',
  requireOrg(RECYCLER_ORG_TYPES, { roles: ATTESTATION_MAKER_ROLES }),
  validate({ params: lotIdParams, body: draftAttestationBody }),
  controller.draft,
);
attestationsRoutes.post(
  '/:id/approve',
  requireOrg(RECYCLER_ORG_TYPES, { roles: ATTESTATION_CHECKER_ROLES }),
  validate({ params: idParams }),
  controller.approve,
);
