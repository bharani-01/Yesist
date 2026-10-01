import { queryOne, queryMany } from '../../core/db.js';

export const findUserByPhone = (tx, phone) =>
  queryOne(tx, 'select id, full_name as "fullName", email, phone from users where phone = $1', [phone]);

export const createCitizenUser = async (tx, { phone, fullName }) => {
  // We use a dummy email since WhatsApp only gives us phone, unless they provide an email.
  const email = `${phone}@ecosure.wa`;
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
