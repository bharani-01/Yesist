import { Groq } from 'groq-sdk';
import { pool as db, withTx } from '../../core/db.js';
import { 
  findUserByPhone, createCitizenUser, findUserDevices, addDevice, schedulePickup, 
  getWhatsAppSettings, getChatHistory, saveChatMessage 
} from './whatsapp.repository.js';
import { sendWhatsAppMessage } from './waha.client.js';

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

export const processIncomingMessage = async (phone, text, replyTarget = null) => {
  if (!text) return; // Ignore non-text messages for now
  const target = replyTarget || phone;

  // Check bot master switch and test mode from DB
  const settings = await getWhatsAppSettings(db);
  if (settings && settings.bot_enabled === false) {
    console.log(`[WAHA] WhatsApp Automation is DISABLED globally. Ignored message from ${phone}`);
    return;
  }

  if (settings?.test_mode) {
    const isAllowed = settings.test_numbers.some(n => phone.includes(n) || n.includes(phone));
    if (!isAllowed) {
      console.log(`[WAHA] Ignored message from ${phone} (not in TEST_NUMBERS)`);
      return;
    }
  }

  let user = await findUserByPhone(db, phone);

  // Fetch chat history from DB
  let history = await getChatHistory(db, phone);

  // Re-format history to match Groq API structure
  history = history.map(msg => {
    let m = { role: msg.role, content: msg.content };
    if (msg.name) m.name = msg.name;
    if (msg.tool_call_id && msg.role === 'tool') m.tool_call_id = msg.tool_call_id;
    if (msg.tool_call_id && msg.role === 'assistant') {
      m.tool_calls = [{
        id: msg.tool_call_id,
        type: 'function',
        function: { name: msg.name || 'unknown', arguments: "{}" }
      }];
    }
    return m;
  });

  if (history.length === 0) {
    const sysMsg = { 
      role: 'system', 
      content: `You are the EcoSure WhatsApp Assistant. You help citizens manage their e-waste by adding devices and scheduling pickups. 
      Always be polite, concise, and helpful. Use the provided tools when necessary.` 
    };
    history.push(sysMsg);
    await saveChatMessage(db, phone, sysMsg);
  }

  // Handle Registration manually before handing off to AI
  if (!user) {
    const lastMsg = history[history.length - 1];
    if (lastMsg?.role === 'assistant' && lastMsg?.content?.includes('reply with your Full Name')) {
      const cleanName = (text || '').trim();
      if (cleanName.length < 2) {
        const retryPrompt = 'Please reply with your full name (at least 2 letters) to register your account.';
        await saveChatMessage(db, phone, { role: 'user', content: text });
        await saveChatMessage(db, phone, { role: 'assistant', content: retryPrompt });
        await sendWhatsAppMessage(target, retryPrompt);
        return;
      }
      try {
        await createCitizenUser(db, { phone, fullName: cleanName });
        user = await findUserByPhone(db, phone);
        const welcomeText = `Thanks ${user?.fullName || cleanName}! Your EcoSure account is ready.\n\nHow can I help you today? You can:\n- Add a device\n- View your devices\n- Schedule a pickup`;
        
        await saveChatMessage(db, phone, { role: 'user', content: text });
        await saveChatMessage(db, phone, { role: 'assistant', content: welcomeText });
        
        await sendWhatsAppMessage(target, welcomeText);
        return;
      } catch (err) {
        console.error('Registration error:', err);
        await sendWhatsAppMessage(target, 'Sorry, there was an error registering your account. Please try again later.');
        return;
      }
    } else {
      const prompt = `Welcome to EcoSure! We don't recognize this number. To register an account, please reply with your Full Name.`;
      await saveChatMessage(db, phone, { role: 'assistant', content: prompt });
      await sendWhatsAppMessage(target, prompt);
      return;
    }
  }

  // Process with AI
  const userMsg = { role: 'user', content: text };
  history.push(userMsg);
  await saveChatMessage(db, phone, userMsg);

  try {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      messages: history,
      tools: tools,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;
    
    // Handle Tool Calls
    if (responseMessage.tool_calls) {
      history.push(responseMessage);
      
      // Save assistant's tool call to DB
      await saveChatMessage(db, phone, {
        role: 'assistant',
        content: responseMessage.content || '',
        name: responseMessage.tool_calls[0].function.name,
        tool_call_id: responseMessage.tool_calls[0].id
      });

      for (const toolCall of responseMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let functionResult = '';

        try {
          if (functionName === 'addDevice') {
            const id = await withTx(user.id, tx => addDevice(tx, { userId: user.id, ...args }));
            functionResult = `Device added successfully. DB ID: ${id}`;
          } else if (functionName === 'viewDevices') {
            const devices = await withTx(user.id, tx => findUserDevices(tx, user.id));
            if (devices.length === 0) functionResult = "The user has no devices.";
            else functionResult = `User devices: ${JSON.stringify(devices)}`;
          } else if (functionName === 'schedulePickup') {
            const ref = await withTx(user.id, tx => schedulePickup(tx, { userId: user.id, ...args }));
            functionResult = `Pickup scheduled successfully. Booking Reference: ${ref}`;
          }
        } catch (dbErr) {
          console.error(`Tool execution error [${functionName}]:`, dbErr);
          functionResult = `Error executing action: ${dbErr.message}`;
        }

        const toolResultMsg = {
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: functionResult,
        };

        history.push(toolResultMsg);
        await saveChatMessage(db, phone, toolResultMsg);
      }

      // Send the results back to Groq to generate a final text response
      const finalResponse = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        messages: history,
      });

      const finalText = finalResponse.choices[0].message.content;
      history.push({ role: 'assistant', content: finalText });
      await saveChatMessage(db, phone, { role: 'assistant', content: finalText });
      await sendWhatsAppMessage(target, finalText);

    } else {
      // Standard text response
      const replyText = responseMessage.content;
      history.push({ role: 'assistant', content: replyText });
      await saveChatMessage(db, phone, { role: 'assistant', content: replyText });
      await sendWhatsAppMessage(target, replyText);
    }
  } catch (error) {
    console.error('[Groq Error]:', error);
    await sendWhatsAppMessage(target, 'Sorry, I am having trouble processing your request right now.');
  }
};

