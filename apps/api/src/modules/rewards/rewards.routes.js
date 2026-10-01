import { Router } from 'express';
import { requireWorkspace } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import * as controller from './rewards.controller.js';
import { ledgerQuery, redeemBody } from './rewards.schemas.js';

export const rewardsRoutes = Router();
rewardsRoutes.use(requireWorkspace('citizen'));

rewardsRoutes.get('/balance', controller.balance);
rewardsRoutes.get('/ledger', validate({ query: ledgerQuery }), controller.ledger);
rewardsRoutes.get('/catalogue', controller.catalogue);
rewardsRoutes.get('/redemptions', controller.redemptions);
rewardsRoutes.post('/redeem', validate({ body: redeemBody }), controller.redeem);
rewardsRoutes.get('/referral', controller.referral);
rewardsRoutes.post('/referral/generate', controller.generateReferral);
