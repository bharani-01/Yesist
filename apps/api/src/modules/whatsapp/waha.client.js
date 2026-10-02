import axios from 'axios';

const WAHA_URL = process.env.WAHA_API_URL || 'https://waha.ecosure.trackifyapp.co.in';
const SESSION = process.env.WAHA_SESSION_NAME || 'Bharani';
// Fallback to unauthenticated if WAHA_API_KEY is not set
const API_KEY = process.env.WAHA_API_KEY || 'waha_secret_key_2026';

export const sendWhatsAppMessage = async (target, text) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (API_KEY) headers['X-Api-Key'] = API_KEY;

    let chatId;
    if (String(target).includes('@')) {
      chatId = target;
    } else {
      const cleanPhone = String(target).replace(/\D/g, '');
      const wahaPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      chatId = `${wahaPhone}@c.us`;
    }

    await axios.post(
      `${WAHA_URL}/api/sendText`,
      {
        chatId,
        text: text,
        session: SESSION,
      },
      { headers }
    );
    console.log(`[WAHA] Sent message to ${target}`);
  } catch (error) {
    console.error(`[WAHA] Failed to send message to ${target}:`, error?.response?.data || error.message);
  }
};

