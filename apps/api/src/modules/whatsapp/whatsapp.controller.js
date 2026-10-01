import { processIncomingMessage } from './whatsapp.service.js';
import { pool as db } from '../../core/db.js';
import { getWhatsAppSettings, updateWhatsAppSettings, getChatHistory } from './whatsapp.repository.js';
import { Errors } from '../../core/errors.js';

export const handleWebhook = async (req, res, next) => {
  try {
    // WAHA webhook payload structure
    const payload = req.body;
    
    // WAHA sends events like message, message.any
    if (payload.event === 'message') {
      const message = payload.payload;
      
      // Ignore group messages
      if (message.from.endsWith('@g.us')) {
        return res.status(200).send('OK');
      }

      // Ignore messages sent by the bot itself
      if (message.fromMe) {
        return res.status(200).send('OK');
      }

      const phone = message.from.replace('@c.us', '');
      const text = message.body;

      // Process asynchronously so we don't block the webhook response
      processIncomingMessage(phone, text).catch(err => {
        console.error('Error processing WAHA message:', err);
      });
    }

    res.status(200).send('OK');
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req, res, next) => {
  try {
    const settings = await getWhatsAppSettings(db);
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const { testMode, testNumbers } = req.body;
    if (typeof testMode !== 'boolean' || !Array.isArray(testNumbers)) {
      throw Errors.badRequest('Invalid payload');
    }
    const updated = await updateWhatsAppSettings(db, { testMode, testNumbers });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { phone } = req.query;
    if (!phone) throw Errors.badRequest('Phone number is required');
    const messages = await getChatHistory(db, phone);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
