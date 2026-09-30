import { queryMany } from '../../core/db.js';

export const listCategories = (tx) =>
  queryMany(
    tx,
    `select code, name, data_bearing as "dataBearing", has_battery as "hasBattery", typical_unit_kg as "typicalUnitKg"
       from waste_categories where active order by sort_order`,
  );

export const listWards = (tx) =>
  queryMany(tx, 'select id, city, number, name from wards where active order by city, number');

export const getAgentIdentity = async (tx, userId) => {
  const result = await queryMany(
    tx,
    `select u.full_name as "fullName", o.name as "orgName", o.id_card_number as "idCardNumber"
     from users u
     join organization_members m on m.user_id = u.id
     join organizations o on o.id = m.org_id
     where u.id = $1 and u.status = 'active' and o.status = 'active'
       and o.org_type in ('local_shop', 'informal_collector', 'drop_point')
     limit 1`,
    [userId]
  );
  return result[0] || null;
};
