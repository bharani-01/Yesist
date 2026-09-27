import { Router } from 'express';
import { AGENT_ORG_TYPES, STAFF } from '../../config/constants.js';
import { requireOrg, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './lots.controller.js';
import { createLotBody, dispatchLotBody } from './lots.schemas.js';

export const lotsRoutes = Router();
lotsRoutes.use(requireWorkspace('agent'), requireOrg(AGENT_ORG_TYPES));
const work = requireOrg(AGENT_ORG_TYPES, { roles: STAFF.work });

lotsRoutes.get('/', controller.list);
lotsRoutes.get('/destinations', controller.destinations);
lotsRoutes.post('/', work, validate({ body: createLotBody }), controller.create);
lotsRoutes.post('/:id/dispatch', work, validate({ params: idParams, body: dispatchLotBody }), controller.dispatch);
