import { Router } from 'express';
import { requireAuth } from '../../middleware/authorize.js';
import { credentialLimiter } from '../../middleware/rate-limit.js';
import { validate } from '../../middleware/validate.js';
import * as controller from './auth.controller.js';
import { loginBody, registerBody } from './auth.schemas.js';

export const authRoutes = Router();

authRoutes.post('/register', credentialLimiter, validate({ body: registerBody }), controller.register);
authRoutes.post('/login', credentialLimiter, validate({ body: loginBody }), controller.login);
authRoutes.post('/logout', controller.logout);
authRoutes.get('/me', requireAuth, controller.me);
