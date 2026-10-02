import { queryMany, queryOne } from '../../core/db.js';

// Producer registry reads and writes. Nothing here touches pickups, lots, hubs, or custody tables.

const MODEL_FIELDS = `m.id, m.brand, m.model_name as "modelName", m.model_code as "modelCode", m.category_code as "categoryCode",
  wc.name as "categoryName", m.typical_unit_kg as "typicalUnitKg", m.battery_type as "batteryType",
  m.data_bearing as "dataBearing", m.created_at as "createdAt"`;

const BATCH_FIELDS = `b.id, b.batch_ref as "batchRef", to_char(b.market_month, 'YYYY-MM') as "marketMonth", b.state_code as "stateCode",
  b.quantity, b.status, b.placed_at as "placedAt", b.created_at as "createdAt",
  m.id as "modelId", m.brand, m.model_name as "modelName", m.category_code as "categoryCode",
  (select count(*)::int from product_units u where u.batch_id = b.id) as "registeredUnits"`;

export const listModels = (tx, orgId) =>
  queryMany(
    tx,
    `select ${MODEL_FIELDS},
            (select count(*)::int from market_batches b where b.model_id = m.id) as "batchCount"
       from product_models m join waste_categories wc on wc.code = m.category_code
      where m.producer_org_id = $1 order by m.brand, m.model_name`,
    [orgId],
  );

export const findCategory = (tx, code) =>
  queryOne(tx, 'select code, data_bearing as "dataBearing" from waste_categories where code = $1 and active', [code]);

export const insertModel = (tx, orgId, userId, m, dataBearing) =>
  queryOne(
    tx,
    `insert into product_models (producer_org_id, brand, model_name, model_code, category_code, typical_unit_kg, battery_type, data_bearing, created_by)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     returning id`,
    [orgId, m.brand, m.modelName, m.modelCode ?? null, m.categoryCode, m.typicalUnitKg, m.batteryType, dataBearing, userId],
  );

export const findModel = (tx, id, orgId) =>
  queryOne(tx, `select ${MODEL_FIELDS} from product_models m join waste_categories wc on wc.code = m.category_code where m.id = $1 and m.producer_org_id = $2`, [id, orgId]);

export const listBatches = (tx, orgId) =>
  queryMany(
    tx,
    `select ${BATCH_FIELDS} from market_batches b join product_models m on m.id = b.model_id
      where b.producer_org_id = $1 order by b.created_at desc limit 200`,
    [orgId],
  );

export const findBatch = (tx, id, orgId) =>
  queryOne(tx, `select ${BATCH_FIELDS} from market_batches b join product_models m on m.id = b.model_id where b.id = $1 and b.producer_org_id = $2`, [id, orgId]);

export const insertBatch = (tx, orgId, userId, b) =>
  queryOne(
    tx,
    `insert into market_batches (producer_org_id, model_id, batch_ref, market_month, state_code, quantity, created_by)
     values ($1,$2,$3, ($4 || '-01')::date, $5, $6, $7)
     returning id`,
    [orgId, b.modelId, b.batchRef, b.marketMonth, b.stateCode, b.quantity, userId],
  );

export const registerUnits = (tx, batchId, rows) =>
  queryMany(
    tx,
    'select row_index as "rowIndex", qr_public_id as "qrPublicId", error from app.register_units($1, $2::jsonb)',
    [batchId, JSON.stringify(rows)],
  );

export const placeBatch = async (tx, batchId) =>
  (await queryOne(tx, 'select app.place_batch($1) as placed', [batchId])).placed;

export const listBatchLabels = (tx, batchId, orgId) =>
  queryMany(
    tx,
    `select u.qr_public_id as "qrPublicId", u.identifier_type as "identifierType", u.last4
       from product_units u where u.batch_id = $1 and u.producer_org_id = $2 order by u.created_at, u.id`,
    [batchId, orgId],
  );

export const listUnitOutcomes = (tx, { state, batchId, limit }) =>
  queryMany(
    tx,
    `select unit_id as id, qr_public_id as "qrPublicId", identifier_type as "identifierType", last4, state,
            brand, model_name as "modelName", batch_id as "batchId", batch_ref as "batchRef",
            updated_at as "updatedAt", attestation_number as "attestationNumber"
       from app.producer_unit_outcomes($1, $2, $3)`,
    [state ?? null, batchId ?? null, limit],
  );

export const unitCountsByState = (tx, orgId) =>
  queryMany(tx, 'select state, count(*)::int as count from product_units where producer_org_id = $1 group by state', [orgId]);

export const registryTotals = (tx, orgId) =>
  queryOne(
    tx,
    `select (select count(*)::int from product_models where producer_org_id = $1) as models,
            (select count(*)::int from market_batches where producer_org_id = $1) as batches,
            (select count(*)::int from market_batches where producer_org_id = $1 and status = 'draft') as "draftBatches",
            (select coalesce(sum(quantity),0)::int from market_batches where producer_org_id = $1 and status = 'placed') as "placedQuantity"`,
    [orgId],
  );

export const monthlyOutcomes = (tx, months) =>
  queryMany(tx, `select to_char(month, 'YYYY-MM') as month, collected, received, processed from app.producer_monthly_outcomes($1)`, [months]);

export const processedByModel = (tx, orgId) =>
  queryMany(
    tx,
    `select m.id, m.brand, m.model_name as "modelName", count(u.id)::int as units,
            count(u.id) filter (where u.state in ('collected','in_lot','at_hub','received_at_recycler','processed'))::int as collected,
            count(u.id) filter (where u.state = 'processed')::int as processed
       from product_models m left join product_units u on u.model_id = m.id
      where m.producer_org_id = $1
      group by m.id order by processed desc, units desc limit 20`,
    [orgId],
  );

export const complianceReportData = async (tx, orgId) => {
  const org = await queryOne(tx, 'select id, name, registration_no as "registrationNo" from organizations where id = $1', [orgId]);
  const models = await listModels(tx, orgId);
  const batches = await listBatches(tx, orgId);
  const totals = await registryTotals(tx, orgId);
  const units = await queryMany(
    tx,
    `select u.id, u.qr_public_id as "qrPublicId", u.identifier_type as "identifierType", u.last4, u.state,
            m.brand, m.model_name as "modelName", m.category_code as "categoryCode",
            b.batch_ref as "batchRef",
            (select a.public_number from pickup_item_units piu
               join pickup_items i on i.id = piu.pickup_item_id
               join pickup_requests p on p.id = i.pickup_id
               join attestations a on a.lot_id = p.lot_id and a.status = 'issued'
              where piu.unit_id = u.id and not piu.duplicate limit 1) as "attestationNumber",
            (select l.seal_tag from pickup_item_units piu
               join pickup_items i on i.id = piu.pickup_item_id
               join pickup_requests p on p.id = i.pickup_id
               join lots l on l.id = p.lot_id
              where piu.unit_id = u.id and not piu.duplicate limit 1) as "sealTag"
       from product_units u
       join product_models m on m.id = u.model_id
       join market_batches b on b.id = u.batch_id
      where u.producer_org_id = $1
      order by u.updated_at desc
      limit 200`,
    [orgId],
  );
  return { org, models, batches, totals, units };
};
