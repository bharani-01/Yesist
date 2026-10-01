import { processIncomingMessage } from './whatsapp.service.js';
import { pool as db, withTx } from '../../core/db.js';
import { getWhatsAppSettings, updateWhatsAppSettings, getChatHistory } from './whatsapp.repository.js';
import { Errors } from '../../core/errors.js';
import { contextOf } from '../../shared/context.js';

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

      let phone = message.from.replace('@c.us', '');
      
      // The database schema requires 10-digit Indian numbers (^[6-9][0-9]{9}$)
      // WAHA provides it with the country code (e.g., 919876543210). Strip the '91' prefix.
      if (phone.startsWith('91') && phone.length === 12) {
        phone = phone.substring(2);
      }

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
    const ctx = contextOf(req);
    const settings = await withTx(ctx.userId, tx => getWhatsAppSettings(tx));
    res.json(settings);
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const { botEnabled, testMode, testNumbers } = req.body;
    if (botEnabled !== undefined && typeof botEnabled !== 'boolean') {
      throw Errors.badRequest('Invalid botEnabled value');
    }
    if (testMode !== undefined && typeof testMode !== 'boolean') {
      throw Errors.badRequest('Invalid testMode value');
    }
    if (testNumbers !== undefined && !Array.isArray(testNumbers)) {
      throw Errors.badRequest('Invalid testNumbers payload');
    }
    
    // Normalize test numbers to match the 10-digit database format and deduplicate
    const normalizedNumbers = testNumbers ? [...new Set(testNumbers.map(n => {
      let num = String(n).replace(/\D/g, ''); // Remove all non-digits (like +)
      if (num.startsWith('91') && num.length === 12) {
        num = num.substring(2);
      }
      return num;
    }).filter(n => n.length === 10))] : undefined;

    const ctx = contextOf(req);
    const updated = await withTx(ctx.userId, tx => updateWhatsAppSettings(tx, { 
      botEnabled,
      testMode, 
      testNumbers: normalizedNumbers 
    }));
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { phone } = req.query;
    if (!phone) throw Errors.badRequest('Phone number is required');
    
    let normalizedPhone = String(phone).replace(/\D/g, '');
    if (normalizedPhone.startsWith('91') && normalizedPhone.length === 12) {
      normalizedPhone = normalizedPhone.substring(2);
    }
    
    const ctx = contextOf(req);
    const messages = await withTx(ctx.userId, tx => getChatHistory(tx, normalizedPhone));
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const testSend = async (req, res, next) => {
  try {
    const { phone, message } = req.body;
    if (!phone) throw Errors.badRequest('Phone number is required');
    
    let normalizedPhone = String(phone).replace(/\D/g, '');
    if (normalizedPhone.startsWith('91') && normalizedPhone.length === 12) {
      normalizedPhone = normalizedPhone.substring(2);
    }
    
    // Import here to avoid circular dependency if any, or just import at top.
    const { sendWhatsAppMessage } = await import('./waha.client.js');
    await sendWhatsAppMessage(normalizedPhone, message || 'Hello! This is a test message from EcoSure WhatsApp integration.');
    
    res.json({ success: true, message: 'Test message sent' });
  } catch (err) {
    next(err);
  }
};
