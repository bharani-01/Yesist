import { Router } from 'express';
import { FLAG_UPDATE_ROLES } from '../../config/constants.js';
import { requireRole, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './oversight.controller.js';
import { listFlagsQuery, updateFlagBody } from './oversight.schemas.js';

export const oversightRoutes = Router();
oversightRoutes.use(requireWorkspace('oversight'));

oversightRoutes.get('/overview', controller.overview);
oversightRoutes.get('/flags', validate({ query: listFlagsQuery }), controller.listFlags);
oversightRoutes.post(
  '/flags/:id/status',
  requireRole(...FLAG_UPDATE_ROLES),
  validate({ params: idParams, body: updateFlagBody }),
  controller.updateFlag,
);
oversightRoutes.get('/stream', controller.stream);
