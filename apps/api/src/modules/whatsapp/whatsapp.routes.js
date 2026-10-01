import express from 'express';
import { handleWebhook, getSettings, updateSettings, getMessages } from './whatsapp.controller.js';
import { requireRole } from '../../middleware/authorize.js';

const router = express.Router();

// Public webhook
router.post('/webhook', handleWebhook);

// Admin routes (only programme_operator can access)
router.get('/settings', requireRole(['programme_operator']), getSettings);
router.put('/settings', requireRole(['programme_operator']), updateSettings);
router.get('/messages', requireRole(['programme_operator']), getMessages);

export default router;
