import { Router } from 'express';
import { requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './pickups.controller.js';
import { cancelPickupBody, createPickupBody } from './pickups.schemas.js';

export const pickupsRoutes = Router();
pickupsRoutes.use(requireWorkspace('citizen'));

pickupsRoutes.get('/', controller.list);
pickupsRoutes.post('/', validate({ body: createPickupBody }), controller.create);
pickupsRoutes.get('/:id', validate({ params: idParams }), controller.getById);
pickupsRoutes.post('/:id/cancel', validate({ params: idParams, body: cancelPickupBody }), controller.cancel);
pickupsRoutes.post('/:id/handover-code', validate({ params: idParams }), controller.issueHandoverCode);
