import express from 'express';
import { handleWebhook, getSettings, updateSettings, getMessages } from './whatsapp.controller.js';
import { requireRole } from '../../middleware/authorize.js';

const router = express.Router();

// Public webhook
router.post('/webhook', handleWebhook);

// Admin routes
const OVERSIGHT_ROLES = ['programme_operator', 'spcb_officer', 'cpcb_officer', 'ulb_officer'];

router.get('/settings', requireRole(...OVERSIGHT_ROLES), getSettings);
router.put('/settings', requireRole(...OVERSIGHT_ROLES), updateSettings);
router.get('/messages', requireRole(...OVERSIGHT_ROLES), getMessages);

export default router;
