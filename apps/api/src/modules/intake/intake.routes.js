import { Router } from 'express';
import { RECYCLER_ORG_TYPES, STAFF } from '../../config/constants.js';
import { requireOrg, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './intake.controller.js';
import { receiveLotBody } from './intake.schemas.js';

export const intakeRoutes = Router();
intakeRoutes.use(requireWorkspace('recycler'), requireOrg(RECYCLER_ORG_TYPES));
const work = requireOrg(RECYCLER_ORG_TYPES, { roles: STAFF.work });

intakeRoutes.get('/', controller.list);
intakeRoutes.get('/:id', validate({ params: idParams }), controller.getById);
intakeRoutes.post('/:id/receive', work, validate({ params: idParams, body: receiveLotBody }), controller.receive);
