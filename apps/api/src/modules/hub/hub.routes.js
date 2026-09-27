import { Router } from 'express';
import { HUB_ORG_TYPES, STAFF } from '../../config/constants.js';
import { requireOrg, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './hub.controller.js';
import { addShipmentLotsBody, createShipmentBody, dispatchShipmentBody, receiveAtHubBody } from './hub.schemas.js';

// Recycler-owned regional hub: physical custody only (no registry routes, no pickups).
export const hubRoutes = Router();
hubRoutes.use(requireWorkspace('hub'), requireOrg(HUB_ORG_TYPES));
const work = requireOrg(HUB_ORG_TYPES, { roles: STAFF.work });

hubRoutes.get('/lots', controller.listLots);
hubRoutes.get('/lots/:id', validate({ params: idParams }), controller.getLot);
hubRoutes.post('/lots/:id/receive', work, validate({ params: idParams, body: receiveAtHubBody }), controller.receiveLot);

hubRoutes.get('/shipments', controller.listShipments);
hubRoutes.post('/shipments', work, validate({ body: createShipmentBody }), controller.createShipment);
hubRoutes.get('/shipments/:id', validate({ params: idParams }), controller.getShipment);
hubRoutes.post('/shipments/:id/lots', work, validate({ params: idParams, body: addShipmentLotsBody }), controller.addLots);
hubRoutes.post('/shipments/:id/dispatch', work, validate({ params: idParams, body: dispatchShipmentBody }), controller.dispatchShipment);
