import { processIncomingMessage } from './whatsapp.service.js';

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
