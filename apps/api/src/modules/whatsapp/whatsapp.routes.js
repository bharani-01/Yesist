import express from 'express';
import { handleWebhook } from './whatsapp.controller.js';

const router = express.Router();

router.post('/webhook', handleWebhook);

export default router;
