import express, { Router } from 'express';
import { PRODUCER_ORG_TYPES, STAFF } from '../../config/constants.js';
import { requireOrg, requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { idParams } from '../../shared/schemas.js';
import * as controller from './producer.controller.js';
import { createBatchBody, createModelBody, listUnitsQuery, registerUnitsBody } from './producer.schemas.js';

export const producerRoutes = Router();
producerRoutes.use(requireWorkspace('producer'), requireOrg(PRODUCER_ORG_TYPES));

const work = requireOrg(PRODUCER_ORG_TYPES, { roles: STAFF.work });
const approve = requireOrg(PRODUCER_ORG_TYPES, { roles: STAFF.approve });
// Unit uploads are chunked by the client; this is the only route with a larger body limit.
const bulkJson = express.json({ limit: '2mb' });

producerRoutes.get('/overview', controller.overview);
producerRoutes.get('/compliance', controller.complianceReport);
producerRoutes.get('/models', controller.listModels);
producerRoutes.post('/models', work, validate({ body: createModelBody }), controller.createModel);
producerRoutes.get('/batches', controller.listBatches);
producerRoutes.post('/batches', work, validate({ body: createBatchBody }), controller.createBatch);
producerRoutes.get('/batches/:id', validate({ params: idParams }), controller.getBatch);
producerRoutes.post('/batches/:id/units', work, bulkJson, validate({ params: idParams, body: registerUnitsBody }), controller.registerUnits);
producerRoutes.post('/batches/:id/place', approve, validate({ params: idParams }), controller.placeBatch);
producerRoutes.get('/batches/:id/labels', validate({ params: idParams }), controller.batchLabels);
producerRoutes.get('/units', validate({ query: listUnitsQuery }), controller.listUnits);
