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

export const mapCategoryCode = (input) => {
  if (!input) return 'small_appliance';
  const s = String(input).toLowerCase();
  if (s.includes('phone') || s.includes('mobile') || s.includes('smartphone')) return 'mobile_phone';
  if (s.includes('laptop') || s.includes('macbook') || s.includes('notebook')) return 'laptop';
  if (s.includes('tablet') || s.includes('ipad')) return 'tablet';
  if (s.includes('desktop') || s.includes('cpu') || s.includes('pc') || s.includes('computer')) return 'desktop_cpu';
  if (s.includes('tv') || s.includes('television') || s.includes('monitor') || s.includes('screen') || s.includes('display')) return 'monitor_tv';
  if (s.includes('printer') || s.includes('scanner')) return 'printer';
  if (s.includes('cable') || s.includes('charger') || s.includes('accessory') || s.includes('wire') || s.includes('adapter')) return 'cables_accessories';
  return 'small_appliance';
};

// Function to schedule pickup
export const schedulePickup = async (tx, { userId, preferredDate, preferredWindow, address, contactName, contactPhone, landmark, items }) => {
  // 1. Insert into pickup_requests
  const result = await queryOne(tx, `
    insert into pickup_requests (requester_id, ward_id, preferred_date, preferred_window, status) 
    values ($1, 1, $2, $3, 'requested') returning id, reference`, [
    userId,
    preferredDate, // e.g. '2026-10-15'
    preferredWindow, // 'morning', 'afternoon', 'evening'
  ]);

  if (!result) return null;
  const pickupId = result.id;
  const reference = result.reference;

  // 2. Fetch requester info if name or phone not explicitly passed
  const user = await queryOne(tx, 'select full_name as "fullName", phone from users where id = $1', [userId]);
  const cName = (contactName || user?.fullName || 'EcoSure Citizen').trim();
  const cPhone = (contactPhone || user?.phone || '9999999999').replace(/\D/g, '') || '9999999999';
  const addrLine = (address || '').trim() || 'Indore Citizen Address';

  // 3. Insert into pickup_addresses
  await tx.query(`
    insert into pickup_addresses (pickup_id, contact_name, contact_phone, address_line, landmark)
    values ($1, $2, $3, $4, $5)
    on conflict (pickup_id) do update set
      contact_name = excluded.contact_name,
      contact_phone = excluded.contact_phone,
      address_line = excluded.address_line,
      landmark = excluded.landmark
  `, [pickupId, cName, cPhone, addrLine, landmark || null]);

  // 4. Insert into pickup_items (from user's manual_devices or items argument)
  const userDevices = await queryMany(tx, 'select category, brand from manual_devices where user_id = $1', [userId]);
  const categoriesToAdd = new Set();
  
  if (items && typeof items === 'string') {
    items.split(/[,+&]/).forEach(item => {
      const code = mapCategoryCode(item.trim());
      if (code) categoriesToAdd.add(code);
    });
  }

  for (const d of userDevices) {
    const code = mapCategoryCode(d.category);
    if (code) categoriesToAdd.add(code);
  }

  // Default to at least one category if nothing specified
  if (categoriesToAdd.size === 0) {
    categoriesToAdd.add('laptop');
  }

  for (const catCode of categoriesToAdd) {
    await tx.query(`
      insert into pickup_items (pickup_id, category_code, quantity)
      values ($1, $2, 1)
      on conflict (pickup_id, category_code) do update set quantity = pickup_items.quantity + 1
    `, [pickupId, catCode]);
  }

  return reference;
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

