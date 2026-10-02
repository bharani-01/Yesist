import { queryOne, queryMany } from '../../core/db.js';

export const findUserByPhone = (tx, phone) =>
  queryOne(tx, 'select id, full_name as "fullName", email, phone from app.auth_lookup_by_phone($1)', [phone]);

export const createCitizenUser = async (tx, { phone, fullName }) => {
  // We use a dummy email since WhatsApp only gives us phone, unless they provide an email.
  const cleanId = String(phone).replace(/[^a-zA-Z0-9]/g, '');
  const email = `wa_${cleanId}@ecosure.wa`;
  const result = await queryOne(tx, 'select app.auth_register_citizen($1, $2, $3, $4) as id', [
    email,
    phone,
    fullName,
    'whatsapp_no_password',
  ]);
  return result?.id;
};


// Functions to interact with user's devices
export const findUserDevices = (tx, userId) =>
  queryMany(tx, 'select id, category, brand, model, condition from manual_devices where user_id = $1 order by created_at desc limit 10', [userId]);

export const addDevice = async (tx, { userId, category, brand, condition }) => {
  const result = await queryOne(tx, 'insert into manual_devices (user_id, category, brand, condition) values ($1, $2, $3, $4) returning id', [
    userId,
    category,
    brand || null,
    condition || 'working',
  ]);
  return result?.id;
};

// Function to schedule pickup
export const schedulePickup = async (tx, { userId, preferredDate, preferredWindow }) => {
  // wardId is required by DB schema, using a dummy 1 for now or we could fetch from user profile if it exists.
  const result = await queryOne(tx, `
    insert into pickup_requests (requester_id, ward_id, preferred_date, preferred_window, status) 
    values ($1, 1, $2, $3, 'requested') returning reference`, [
    userId,
    preferredDate, // e.g. '2026-10-15'
    preferredWindow, // 'morning', 'afternoon', 'evening'
  ]);
  return result?.reference;
};

// WhatsApp Config and Memory
export const getWhatsAppSettings = (tx) =>
  queryOne(tx, 'select bot_enabled, test_mode, test_numbers from whatsapp_settings where id = 1');

export const updateWhatsAppSettings = (tx, { botEnabled, testMode, testNumbers }) =>
  queryOne(tx, `
    update whatsapp_settings 
    set bot_enabled = coalesce($1, bot_enabled),
        test_mode = coalesce($2, test_mode), 
        test_numbers = coalesce($3, test_numbers) 
    where id = 1 returning *
  `, [botEnabled, testMode, testNumbers]);

export const getChatHistory = (tx, phone) =>
  queryMany(tx, 'select role, content, name, tool_call_id from whatsapp_messages where phone = $1 order by created_at asc', [phone]);

export const saveChatMessage = (tx, phone, message) => {
  return queryOne(tx, `
    insert into whatsapp_messages (phone, role, content, name, tool_call_id)
    values ($1, $2, $3, $4, $5)
    returning id
  `, [
    phone,
    message.role,
    message.content || '',
    message.name || null,
    message.tool_call_id || message.tool_calls?.[0]?.id || null, // Simplified for single tool call
  ]);
};

export const clearChatHistory = (tx, phone) =>
  queryOne(tx, 'delete from whatsapp_messages where phone = $1', [phone]);

