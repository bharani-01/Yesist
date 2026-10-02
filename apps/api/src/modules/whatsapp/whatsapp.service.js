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
      description: 'Schedule a doorstep pickup for e-waste. You MUST ask the user for preferred date, time window, and full pickup address before calling this tool.',
      parameters: {
        type: 'object',
        properties: {
          preferredDate: { type: 'string', description: 'Date in YYYY-MM-DD format (e.g., 2026-10-05 or tomorrow\'s date)' },
          preferredWindow: { type: 'string', enum: ['morning', 'afternoon', 'evening'], description: 'Time window: morning (9am-12pm), afternoon (12pm-4pm), evening (4pm-7pm)' },
          address: { type: 'string', description: 'Full doorstep pickup address including house/flat no., street, and area' },
          items: { type: 'string', description: 'Devices or items to collect (e.g. laptop, smartphone, TV)' }
        },
        required: ['preferredDate', 'preferredWindow', 'address'],
      },
    },
  }
];

// Formatting helper for clean WhatsApp text
export const formatWhatsAppText = (text) => {
  if (!text) return '';
  return text
    .replace(/([.!?])([A-Z])/g, '$1 $2') // Ensure space after punctuation if touching capital letter
    .replace(/\n{3,}/g, '\n\n')          // Max 2 consecutive linebreaks
    .trim();
};

const SYSTEM_PROMPT = {
  role: 'system',
  content: `You are the EcoSure WhatsApp Assistant 🌿 — a friendly, efficient e-waste recycling concierge for Indian citizens.

MISSION:
Help citizens easily register e-waste devices (smartphones, laptops, TVs, appliances, batteries) and schedule door-to-door pickups.

WHATSAPP FORMATTING RULES (STRICT):
1. Keep replies SHORT, CRISP, and VISUALLY ATTRACTIVE. Never write long paragraphs or repeat sentences.
2. Use clean WhatsApp formatting:
   - *Bold* for important labels, categories, dates, and actions.
   - _Italics_ for examples, hints, and notes.
   - Clean bullet points (•) and emojis (📱, 💻, 🏷️, ⚙️, 📅, ⏰, 📦, 📍, ✅).
   - Use double line breaks between sections for high readability.
3. When asking the user for device details to add, ALWAYS format cleanly like:
   📱 *Category:* (e.g. Smartphone, Laptop, TV)
   🏷️ *Brand:* (e.g. Apple, Dell, Samsung)
   ⚙️ *Condition:* (Working, Partially Working, or Not Working)

   _Example: "Dell laptop, working"_
4. When scheduling a pickup:
   You MUST ask the user for all of the following details before booking:
   📅 *Preferred Date:* (e.g. 2026-10-04 or Tomorrow)
   ⏰ *Time Window:* (Morning 9–12, Afternoon 12–4, or Evening 4–7)
   📍 *Pickup Address:* (House/Flat no., Street, Area, Indore)
   📦 *Items to Collect:* (Devices to collect)

   If any of Date, Window, or Address is missing, ask for the missing details before calling schedulePickup!
5. NEVER repeat yourself. Never add filler like "I'll be here when you're ready" or restate the same question.`
};

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

  // Handle Registration manually before handing off to AI
  if (!user) {
    const lastMsg = history[history.length - 1];
    if (lastMsg?.role === 'assistant' && lastMsg?.content?.includes('Full Name')) {
      const cleanName = (text || '').trim();
      if (cleanName.length < 2) {
        const retryPrompt = `⚠️ *Name Too Short*\n\nPlease reply with your *Full Name* (at least 2 letters) to complete your EcoSure registration.\n\n_Example: "G L Swaminathan"_`;
        await saveChatMessage(db, phone, { role: 'user', content: text });
        await saveChatMessage(db, phone, { role: 'assistant', content: retryPrompt });
        await sendWhatsAppMessage(target, retryPrompt);
        return;
      }
      try {
        await createCitizenUser(db, { phone, fullName: cleanName });
        user = await findUserByPhone(db, phone);
        const welcomeText = `🎉 *Welcome to EcoSure!* 🌿\nThanks *${user?.fullName || cleanName}*, your citizen account is ready!\n\nHow can I help you today?\n1️⃣ ➕ *Add e-waste device* (Laptop, Phone, TV, etc.)\n2️⃣ 📦 *View my devices*\n3️⃣ 📅 *Schedule a doorstep pickup*\n\n_Just reply with what you'd like to do!_`;
        
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
      const prompt = `🌿 *Welcome to EcoSure!* 🌿\n\nWe don't recognize this WhatsApp number yet.\nTo create your free citizen account, please reply with your *Full Name*.\n\n_Example: "G L Swaminathan"_`;
      await saveChatMessage(db, phone, { role: 'assistant', content: prompt });
      await sendWhatsAppMessage(target, prompt);
      return;
    }
  }

  // Process with AI
  const userMsg = { role: 'user', content: text };
  await saveChatMessage(db, phone, userMsg);

  // Construct fresh Groq message thread with SYSTEM_PROMPT at head
  const recentHistory = history.filter(m => m.role !== 'system').slice(-10);
  const groqMessages = [
    SYSTEM_PROMPT,
    ...recentHistory,
    userMsg
  ];

  try {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      messages: groqMessages,
      tools: tools,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;
    
    // Handle Tool Calls
    if (responseMessage.tool_calls) {
      groqMessages.push(responseMessage);
      
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
            functionResult = `Device added successfully. DB ID: ${id}. Details: ${args.category} (${args.brand || 'No brand specified'}), condition: ${args.condition || 'working'}`;
          } else if (functionName === 'viewDevices') {
            const devices = await withTx(user.id, tx => findUserDevices(tx, user.id));
            if (devices.length === 0) functionResult = "The user has no devices added yet.";
            else functionResult = `User devices: ${JSON.stringify(devices.map(d => ({ category: d.category, brand: d.brand, condition: d.condition })))}`;
          } else if (functionName === 'schedulePickup') {
            const ref = await withTx(user.id, tx => schedulePickup(tx, { 
              userId: user.id, 
              ...args,
              contactName: user.fullName,
              contactPhone: user.phone || phone,
            }));
            functionResult = `Pickup scheduled successfully. Booking Reference: ${ref}. Preferred Date: ${args.preferredDate}, Window: ${args.preferredWindow}, Address: ${args.address}`;
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

        groqMessages.push(toolResultMsg);
        await saveChatMessage(db, phone, toolResultMsg);
      }

      // Send the results back to Groq to generate a final text response
      const finalResponse = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
        messages: groqMessages,
      });

      const finalText = formatWhatsAppText(finalResponse.choices[0].message.content);
      await saveChatMessage(db, phone, { role: 'assistant', content: finalText });
      await sendWhatsAppMessage(target, finalText);

    } else {
      // Standard text response
      const replyText = formatWhatsAppText(responseMessage.content);
      await saveChatMessage(db, phone, { role: 'assistant', content: replyText });
      await sendWhatsAppMessage(target, replyText);
    }
  } catch (error) {
    console.error('[Groq Error]:', error);
    await sendWhatsAppMessage(target, 'Sorry, I am having trouble processing your request right now. Please try again in a moment.');
  }
};

