import { queryMany } from '../../core/db.js';

export const listCategories = (tx) =>
  queryMany(
    tx,
    `select code, name, data_bearing as "dataBearing", has_battery as "hasBattery", typical_unit_kg as "typicalUnitKg"
       from waste_categories where active order by sort_order`,
  );

export const listWards = (tx) =>
  queryMany(tx, 'select id, city, number, name from wards where active order by city, number');
