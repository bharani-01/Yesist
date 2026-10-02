import { processIncomingMessage } from './whatsapp.service.js';
import { pool as db, withTx } from '../../core/db.js';
import { getWhatsAppSettings, updateWhatsAppSettings, getChatHistory } from './whatsapp.repository.js';
import { Errors } from '../../core/errors.js';
import { contextOf } from '../../shared/context.js';

// In-memory deduplication cache with 2-minute TTL
const processedMessageIds = new Map();
const isDuplicateMessage = (msgId) => {
  if (!msgId) return false;
  const now = Date.now();
  for (const [id, time] of processedMessageIds.entries()) {
    if (now - time > 120000) processedMessageIds.delete(id);
  }
  if (processedMessageIds.has(msgId)) return true;
  processedMessageIds.set(msgId, now);
  return false;
};

export const handleWebhook = async (req, res, next) => {
  try {
    const payload = req.body;
    
    // WAHA sends events like message, message.any, message.ack, presence.update
    // Strictly accept only the primary 'message' event to prevent duplicate processing
    if (payload?.event !== 'message') {
      return res.status(200).send('OK');
    }

    const message = payload.payload;
    if (!message) {
      return res.status(200).send('OK');
    }
    
    // Deduplicate incoming messages using WAHA message ID or event ID
    const msgId = (typeof message.id === 'object' ? (message.id._serialized || message.id.id) : message.id) || payload.id;
    if (msgId && isDuplicateMessage(msgId)) {
      console.log(`[WAHA] Duplicate message ignored: ${msgId}`);
      return res.status(200).send('OK');
    }

    // Ignore group messages
    if (message.from && message.from.endsWith('@g.us')) {
      return res.status(200).send('OK');
    }

    // Ignore messages sent by the bot itself
    if (message.fromMe) {
      return res.status(200).send('OK');
    }

    const fromJid = message.from;
    let phone = message.from.replace(/@(c\.us|s\.whatsapp\.net|lid)$/, '');
    phone = phone.replace(/\D/g, '');
    
    // The database schema supports 10-digit Indian numbers (or LIDs / international numbers)
    // If WAHA provides it with the 91 country code (e.g., 919876543210), strip the '91' prefix.
    if (phone.startsWith('91') && phone.length === 12) {
      phone = phone.substring(2);
    }

    const text = message.body;

    // Process asynchronously so we don't block the webhook response
    processIncomingMessage(phone, text, fromJid).catch(err => {
      console.error('Error processing WAHA message:', err);
    });

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
