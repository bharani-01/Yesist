import { Groq } from 'groq-sdk';
import { db } from '../../core/db.js';
import { findUserByPhone, createCitizenUser, findUserDevices, addDevice, schedulePickup } from './whatsapp.repository.js';
import { sendWhatsAppMessage } from './waha.client.js';

// In-memory conversation history (for testing; in production use Redis or DB)
const conversations = new Map();

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key_to_prevent_crash_if_missing',
});

// Define tools for Groq to call
const tools = [
  {
    type: 'function',
    function: {
      name: 'addDevice',
      description: 'Add a new e-waste device to the user\'s account. Ask the user for category (e.g. laptop, mobile) and brand before calling.',
      parameters: {
        type: 'object',
        properties: {
          category: { type: 'string', description: 'Type of device (e.g., smartphone, laptop, fridge)' },
          brand: { type: 'string', description: 'Brand of the device (e.g., Apple, Dell)' },
          condition: { type: 'string', enum: ['working', 'partially_working', 'not_working'] }
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
      description: 'Schedule a pickup for the e-waste. Ask the user for the preferred date (YYYY-MM-DD) and window (morning/afternoon/evening).',
      parameters: {
        type: 'object',
        properties: {
          preferredDate: { type: 'string', description: 'Date in YYYY-MM-DD format' },
          preferredWindow: { type: 'string', enum: ['morning', 'afternoon', 'evening'] }
        },
        required: ['preferredDate', 'preferredWindow'],
      },
    },
  }
];

export const processIncomingMessage = async (phone, text) => {
  if (!text) return; // Ignore non-text messages for now

  // Check test mode
  if (process.env.WHATSAPP_TEST_MODE === 'true') {
    const allowed = (process.env.WHATSAPP_TEST_NUMBERS || '').split(',');
    if (!allowed.includes(phone)) {
      console.log(`[WAHA] Ignored message from ${phone} (not in TEST_NUMBERS)`);
      return;
    }
  }

  let user = await findUserByPhone(db, phone);

  // Initialize conversation
  if (!conversations.has(phone)) {
    conversations.set(phone, [
      { 
        role: 'system', 
        content: `You are the EcoSure WhatsApp Assistant. You help citizens manage their e-waste by adding devices and scheduling pickups. 
        Always be polite, concise, and helpful. Use the provided tools when necessary.` 
      }
    ]);
  }

  const history = conversations.get(phone);

  // Handle Registration manually before handing off to AI to ensure DB integrity
  if (!user) {
    // If the last message from us was asking for name, assume this is the name
    const lastMsg = history[history.length - 1];
    if (lastMsg.role === 'assistant' && lastMsg.content.includes('reply with your Full Name')) {
      try {
        await createCitizenUser(db, { phone, fullName: text });
        user = await findUserByPhone(db, phone);
        const welcomeText = `Thanks ${text}! Your EcoSure account is ready.\n\nHow can I help you today? You can:\n- Add a device\n- View your devices\n- Schedule a pickup`;
        history.push({ role: 'user', content: text }, { role: 'assistant', content: welcomeText });
        await sendWhatsAppMessage(phone, welcomeText);
        return;
      } catch (err) {
        console.error('Registration error:', err);
        await sendWhatsAppMessage(phone, 'Sorry, there was an error registering your account. Please try again later.');
        return;
      }
    } else {
      // First time seeing this number
      const prompt = `Welcome to EcoSure! We don't recognize this number. To register an account, please reply with your Full Name.`;
      history.push({ role: 'assistant', content: prompt });
      await sendWhatsAppMessage(phone, prompt);
      return;
    }
  }

  // --- Process with AI ---
  history.push({ role: 'user', content: text });

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: history,
      tools: tools,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;
    
    // Handle Tool Calls
    if (responseMessage.tool_calls) {
      history.push(responseMessage); // Append assistant's tool call request

      for (const toolCall of responseMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let functionResult = '';

        try {
          if (functionName === 'addDevice') {
            const id = await addDevice(db, { userId: user.id, ...args });
            functionResult = `Device added successfully. DB ID: ${id}`;
          } else if (functionName === 'viewDevices') {
            const devices = await findUserDevices(db, user.id);
            if (devices.length === 0) functionResult = "The user has no devices.";
            else functionResult = `User devices: ${JSON.stringify(devices)}`;
          } else if (functionName === 'schedulePickup') {
            const ref = await schedulePickup(db, { userId: user.id, ...args });
            functionResult = `Pickup scheduled successfully. Booking Reference: ${ref}`;
          }
        } catch (dbErr) {
          console.error(`Tool execution error [${functionName}]:`, dbErr);
          functionResult = `Error executing action: ${dbErr.message}`;
        }

        history.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: functionResult,
        });
      }

      // Send the results back to Groq to generate a final text response for the user
      const finalResponse = await groq.chat.completions.create({
        model: 'llama-3.1-70b-versatile',
        messages: history,
      });

      const finalText = finalResponse.choices[0].message.content;
      history.push({ role: 'assistant', content: finalText });
      await sendWhatsAppMessage(phone, finalText);

    } else {
      // No tool calls, just a standard text response
      const replyText = responseMessage.content;
      history.push({ role: 'assistant', content: replyText });
      await sendWhatsAppMessage(phone, replyText);
    }
  } catch (error) {
    console.error('[Groq Error]:', error);
    await sendWhatsAppMessage(phone, 'Sorry, I am having trouble processing your request right now.');
  }
};
