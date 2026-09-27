import { Router } from 'express';
import * as controller from './reference.controller.js';

export const referenceRoutes = Router();

referenceRoutes.get('/', controller.getReference);
