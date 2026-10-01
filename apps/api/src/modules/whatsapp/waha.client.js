import axios from 'axios';

const WAHA_URL = process.env.WAHA_API_URL || 'https://waha.ecosure.trackifyapp.co.in';
const SESSION = process.env.WAHA_SESSION_NAME || 'Bharani';
// Fallback to unauthenticated if WAHA_API_KEY is not set
const API_KEY = process.env.WAHA_API_KEY || 'waha_secret_key_2026';

export const sendWhatsAppMessage = async (phone, text) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (API_KEY) headers['X-Api-Key'] = API_KEY;

    // WAHA expects phone number with country code, no + (e.g. 919876543210)
    // The internal system uses 10 digits, so prepend 91 for Indian numbers if needed
    const wahaPhone = phone.length === 10 ? `91${phone}` : phone;

    await axios.post(
      `${WAHA_URL}/api/sendText`,
      {
        chatId: `${wahaPhone}@c.us`,
        text: text,
        session: SESSION,
      },
      { headers }
    );
    console.log(`[WAHA] Sent message to ${phone}`);
  } catch (error) {
    console.error(`[WAHA] Failed to send message to ${phone}:`, error?.response?.data || error.message);
  }
};
