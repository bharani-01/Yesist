import express from 'express';
import { Groq } from 'groq-sdk';
import axios from 'axios';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const WAHA_API_URL = process.env.WAHA_API_URL || 'https://waha.ecosure.trackifyapp.co.in';
const WAHA_SESSION_NAME = process.env.WAHA_SESSION_NAME || 'Bharani';
const WAHA_API_KEY = process.env.WAHA_API_KEY || 'waha_secret_key_2026';

// ── Database Connection & RLS ────────────────────────────────────────────────
const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => console.error('[DB] Idle database error:', err.message));

async function withTx(userId, work) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query("SELECT set_config('app.user_id', $1, true)", [userId ?? '']);
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}

// ── Database Queries ─────────────────────────────────────────────────────────
async function findUserByPhone(phone) {
  const { rows } = await pool.query('SELECT id, full_name as "fullName", email, phone FROM app.auth_lookup_by_phone($1)', [phone]);
  return rows[0] || null;
}

async function createCitizenUser(phone, fullName) {
  const email = `${phone}@ecosure.wa`;
  const { rows } = await pool.query('SELECT app.auth_register_citizen($1, $2, $3, $4) as id', [
    email,
    phone,
    fullName,
    'whatsapp_no_password',
  ]);
  return rows[0]?.id;
}

async function findUserDevices(userId) {
  return withTx(userId, async (tx) => {
    const { rows } = await tx.query(
      'SELECT id, category, brand, model, condition FROM manual_devices WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
      [userId]
    );
    return rows;
  });
}

async function addDevice(userId, { category, brand, condition }) {
  return withTx(userId, async (tx) => {
    const { rows } = await tx.query(
      'INSERT INTO manual_devices (user_id, category, brand, condition) VALUES ($1, $2, $3, $4) RETURNING id',
      [userId, category, brand || null, condition || 'working']
    );
    return rows[0]?.id;
  });
}

async function schedulePickup(userId, { preferredDate, preferredWindow }) {
  return withTx(userId, async (tx) => {
    const { rows } = await tx.query(
      `INSERT INTO pickup_requests (requester_id, ward_id, preferred_date, preferred_window, status) 
       VALUES ($1, 1, $2, $3, 'requested') RETURNING reference`,
      [userId, preferredDate, preferredWindow]
    );
    return rows[0]?.reference;
  });
}

async function getWhatsAppSettings() {
  const { rows } = await pool.query('SELECT bot_enabled, test_mode, test_numbers FROM whatsapp_settings WHERE id = 1');
  return rows[0] || null;
}

async function getChatHistory(phone) {
  const { rows } = await pool.query(
    'SELECT role, content, name, tool_call_id FROM whatsapp_messages WHERE phone = $1 ORDER BY created_at ASC',
    [phone]
  );
  return rows;
}

async function saveChatMessage(phone, msg) {
  await pool.query(
    `INSERT INTO whatsapp_messages (phone, role, content, name, tool_call_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [
      phone,
      msg.role,
      msg.content || '',
      msg.name || null,
      msg.tool_call_id || msg.tool_calls?.[0]?.id || null,
    ]
  );
}

// ── WAHA Outbound Client ─────────────────────────────────────────────────────
async function sendWhatsAppMessage(phone, text) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (WAHA_API_KEY) headers['X-Api-Key'] = WAHA_API_KEY;

    const cleanPhone = String(phone).replace(/\D/g, '');
    const wahaPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    await axios.post(
      `${WAHA_API_URL}/api/sendText`,
      {
        chatId: `${wahaPhone}@c.us`,
        text: text,
        session: WAHA_SESSION_NAME,
      },
      { headers, timeout: 10000 }
    );
    console.log(`[WAHA OUT] Sent message to ${phone}`);
  } catch (err) {
    console.error(`[WAHA OUT] Failed to send message to ${phone}:`, err?.response?.data || err.message);
  }
}

// ── Groq AI Engine ───────────────────────────────────────────────────────────
const groq = new Groq({ apiKey: GROQ_API_KEY });

const tools = [
  {
    type: 'function',
    function: {
      name: 'addDevice',
      description: "Add a new e-waste device to the user's account. Ask the user for category (e.g. laptop, mobile) and brand before calling.",
      parameters: {
        type: 'object',
        properties: {
          category: { type: 'string', description: 'Type of device (e.g. smartphone, laptop, fridge, battery)' },
          brand: { type: 'string', description: 'Brand of the device (e.g. Apple, Dell, Samsung)' },
          condition: { type: 'string', enum: ['working', 'partially_working', 'not_working'] },
        },
        required: ['category'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'viewDevices',
      description: 'Retrieve the list of devices the user has already added.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'schedulePickup',
      description: 'Schedule a doorstep collection pickup for e-waste. Requires preferred date (YYYY-MM-DD) and window (morning/afternoon/evening).',
      parameters: {
        type: 'object',
        properties: {
          preferredDate: { type: 'string', description: 'Date in YYYY-MM-DD format' },
          preferredWindow: { type: 'string', enum: ['morning', 'afternoon', 'evening'] },
        },
        required: ['preferredDate', 'preferredWindow'],
      },
    },
  },
];

async function processIncomingMessage(phone, text) {
  if (!text) return;

  const settings = await getWhatsAppSettings();
  if (settings && settings.bot_enabled === false) {
    console.log(`[WAHA] Bot globally disabled. Ignored message from ${phone}`);
    return;
  }

  if (settings?.test_mode && !settings.test_numbers.includes(phone)) {
    console.log(`[WAHA] Ignored message from ${phone} (not in test_numbers)`);
    return;
  }

  let user = await findUserByPhone(phone);
  let rawHistory = await getChatHistory(phone);

  const history = rawHistory.map((m) => {
    const item = { role: m.role, content: m.content };
    if (m.name) item.name = m.name;
    if (m.tool_call_id && m.role === 'tool') item.tool_call_id = m.tool_call_id;
    if (m.tool_call_id && m.role === 'assistant') {
      item.tool_calls = [
        {
          id: m.tool_call_id,
          type: 'function',
          function: { name: m.name || 'unknown', arguments: '{}' },
        },
      ];
    }
    return item;
  });

  if (history.length === 0) {
    const sysMsg = {
      role: 'system',
      content: `You are the EcoSure WhatsApp Assistant for official e-waste recycling. You help citizens safely recycle electronic items, add devices to their custody ledger, and schedule doorstep pickups. Always be polite, concise, and helpful. Use tools when appropriate.`,
    };
    history.push(sysMsg);
    await saveChatMessage(phone, sysMsg);
  }

  // Handle registration flow if user is not in DB yet
  if (!user) {
    const lastMsg = history[history.length - 1];
    if (lastMsg?.role === 'assistant' && lastMsg?.content?.includes('reply with your Full Name')) {
      try {
        await createCitizenUser(phone, text.trim());
        user = await findUserByPhone(phone);
        const welcomeText = `Thanks ${user?.fullName || text}! Your EcoSure account is ready.\n\nHow can I help you today? You can:\n- Add a device (e.g. "Add a working Dell laptop")\n- View your devices\n- Schedule a pickup`;

        await saveChatMessage(phone, { role: 'user', content: text });
        await saveChatMessage(phone, { role: 'assistant', content: welcomeText });
        await sendWhatsAppMessage(phone, welcomeText);
        return;
      } catch (err) {
        console.error('Registration error:', err);
        await sendWhatsAppMessage(phone, 'Sorry, there was an issue registering your account. Please try again.');
        return;
      }
    } else {
      const prompt = `Welcome to EcoSure! We don't recognize this number. To register an account, please reply with your Full Name.`;
      await saveChatMessage(phone, { role: 'assistant', content: prompt });
      await sendWhatsAppMessage(phone, prompt);
      return;
    }
  }

  // Feed message to Groq
  const userMsg = { role: 'user', content: text };
  history.push(userMsg);
  await saveChatMessage(phone, userMsg);

  try {
    const response = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: history,
      tools: tools,
      tool_choice: 'auto',
    });

    const responseMsg = response.choices[0].message;

    if (responseMsg.tool_calls) {
      history.push(responseMsg);
      await saveChatMessage(phone, {
        role: 'assistant',
        content: responseMsg.content || '',
        name: responseMsg.tool_calls[0].function.name,
        tool_call_id: responseMsg.tool_calls[0].id,
      });

      for (const call of responseMsg.tool_calls) {
        const fnName = call.function.name;
        const args = JSON.parse(call.function.arguments);
        let resultStr = '';

        try {
          if (fnName === 'addDevice') {
            const id = await addDevice(user.id, args);
            resultStr = `Device added successfully. Device ID: ${id}`;
          } else if (fnName === 'viewDevices') {
            const devices = await findUserDevices(user.id);
            resultStr = devices.length ? `User devices: ${JSON.stringify(devices)}` : 'The user has no devices added yet.';
          } else if (fnName === 'schedulePickup') {
            const ref = await schedulePickup(user.id, args);
            resultStr = `Pickup scheduled successfully. Booking Reference: ${ref}`;
          }
        } catch (toolErr) {
          console.error(`Tool execution error [${fnName}]:`, toolErr);
          resultStr = `Action error: ${toolErr.message}`;
        }

        const toolResultMsg = {
          tool_call_id: call.id,
          role: 'tool',
          name: fnName,
          content: resultStr,
        };
        history.push(toolResultMsg);
        await saveChatMessage(phone, toolResultMsg);
      }

      // Second completion to compose user response
      const followUp = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: history,
      });

      const finalReply = followUp.choices[0].message.content;
      await saveChatMessage(phone, { role: 'assistant', content: finalReply });
      await sendWhatsAppMessage(phone, finalReply);
    } else {
      const reply = responseMsg.content;
      await saveChatMessage(phone, { role: 'assistant', content: reply });
      await sendWhatsAppMessage(phone, reply);
    }
  } catch (err) {
    console.error('Groq processing error:', err);
    await sendWhatsAppMessage(phone, "Sorry, I'm having trouble processing that right now. Please try again in a moment.");
  }
}

// ── Express Webhook Server ───────────────────────────────────────────────────
const app = express();
app.use(express.json());

// Health Check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'ecosure-whatsapp-bot' }));
app.get('/api/v1/health', (req, res) => res.json({ status: 'ok', service: 'ecosure-whatsapp-bot' }));

// WAHA Webhook Handler
app.post('/api/v1/whatsapp/webhook', async (req, res) => {
  try {
    const payload = req.body;
    if (payload.event === 'message') {
      const msg = payload.payload;
      if (msg.from?.endsWith('@g.us') || msg.fromMe) {
        return res.status(200).send('OK');
      }

      let phone = msg.from.replace('@c.us', '');
      if (phone.startsWith('91') && phone.length === 12) {
        phone = phone.substring(2);
      }

      const text = msg.body;
      console.log(`[WAHA IN] Message from ${phone}: "${text}"`);

      // Process in background without blocking WAHA webhook response
      processIncomingMessage(phone, text).catch((err) => {
        console.error('[WAHA ERROR] Error processing message:', err);
      });
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('[WAHA ERROR]', err);
    res.status(500).send('Internal Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[EcoSure WhatsApp Bot] Listening on http://0.0.0.0:${PORT}`);
  console.log(`[Webhook Target] http://172.18.0.1:${PORT}/api/v1/whatsapp/webhook`);
});
