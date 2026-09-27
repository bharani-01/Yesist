import { Router } from 'express';
import { requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import * as controller from './devices.controller.js';
import { claimBody } from './devices.schemas.js';

export const devicesRoutes = Router();
devicesRoutes.use(requireWorkspace('citizen'));

devicesRoutes.get('/', controller.list);
devicesRoutes.post('/claim', validate({ body: claimBody }), controller.claim);
