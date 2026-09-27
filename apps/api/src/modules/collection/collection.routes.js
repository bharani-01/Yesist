import { Router } from 'express';
import { AGENT_ORG_TYPES } from '../../config/constants.js';
import { requireOrg, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './collection.controller.js';
import { acceptJobBody, collectJobBody } from './collection.schemas.js';

export const collectionRoutes = Router();
collectionRoutes.use(requireWorkspace('agent'), requireOrg(AGENT_ORG_TYPES));

collectionRoutes.get('/open', controller.listOpen);
collectionRoutes.get('/', controller.listMine);
collectionRoutes.get('/:id', validate({ params: idParams }), controller.getById);
collectionRoutes.post('/:id/accept', validate({ params: idParams, body: acceptJobBody }), controller.accept);
collectionRoutes.post('/:id/collect', validate({ params: idParams, body: collectJobBody }), controller.collect);
