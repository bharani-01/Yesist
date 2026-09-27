import { randomBytes } from 'node:crypto';
import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { hashIdentifier } from '../../core/security/hashing.js';
import { writeAudit } from '../../shared/audit.js';
import { isValidImei } from '../../shared/schemas.js';
import * as repo from './producer.repository.js';

const SERIAL_PATTERN = /^[A-Za-z0-9-]{4,40}$/;

export const listModels = (ctx) => withTx(ctx.userId, (tx) => repo.listModels(tx, ctx.org.id));

export async function createModel(input, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const category = await repo.findCategory(tx, input.categoryCode);
    if (!category) throw Errors.badRequest('unknown_category', 'Choose a listed e-waste category.');
    const row = await repo.insertModel(tx, ctx.org.id, ctx.userId, input, category.dataBearing);
    await writeAudit(tx, { actor: ctx, action: 'product_model.create', entity: 'product_model', entityId: row.id });
    return repo.findModel(tx, row.id, ctx.org.id);
  });
}

export const listBatches = (ctx) => withTx(ctx.userId, (tx) => repo.listBatches(tx, ctx.org.id));

export async function getBatch(id, ctx) {
  const batch = await withTx(ctx.userId, (tx) => repo.findBatch(tx, id, ctx.org.id));
  if (!batch) throw Errors.notFound('Batch');
  return batch;
}

export async function createBatch(input, ctx) {
  return withTx(ctx.userId, async (tx) => {
    if (!(await repo.findModel(tx, input.modelId, ctx.org.id))) throw Errors.badRequest('unknown_model', 'Choose one of your registered models.');
    const row = await repo.insertBatch(tx, ctx.org.id, ctx.userId, input);
    await writeAudit(tx, { actor: ctx, action: 'market_batch.create', entity: 'market_batch', entityId: row.id });
    return repo.findBatch(tx, row.id, ctx.org.id);
  });
}

/** Validates and hashes one upload row. Raw identifiers never leave this function. */
function prepareRow(raw, { orgId, modelId }) {
  const imei = raw.imei?.replace(/\s+/g, '') || null;
  const serial = raw.serial?.toUpperCase() || null;
  if (imei && serial) return { error: 'both_identifiers' };
  if (imei) {
    if (!isValidImei(imei)) return { error: 'invalid_imei' };
    return { type: 'imei', hash: hashIdentifier('imei', imei), last4: imei.slice(-4) };
  }
  if (serial) {
    if (!SERIAL_PATTERN.test(serial)) return { error: 'invalid_serial' };
    // Serials are only unique within a producer's model (PRD v3 §9.3).
    return { type: 'serial', hash: hashIdentifier('serial', `${orgId}:${modelId}:${serial}`), last4: serial.slice(-4) };
  }
  const qr = randomBytes(9).toString('hex');
  return { type: 'qr', hash: hashIdentifier('qr', qr), last4: qr.slice(-4), qr };
}

/**
 * Registers up to UNITS_PER_REQUEST units into a draft batch. Every row gets an outcome;
 * invalid or duplicate rows are reported and never silently dropped (PRD v3 §9.5 PP1).
 */
export async function registerUnits(batchId, { rows }, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const batch = await repo.findBatch(tx, batchId, ctx.org.id);
    if (!batch) throw Errors.notFound('Batch');
    if (batch.status !== 'draft') throw Errors.conflict('batch_placed', 'This batch is already on the market. Create a new batch for more units.');
    if (batch.registeredUnits + rows.length > batch.quantity) {
      throw Errors.conflict('over_quantity', `This batch has room for ${batch.quantity - batch.registeredUnits} more units.`);
    }

    const results = new Array(rows.length);
    const seen = new Set();
    const accepted = [];
    rows.forEach((raw, i) => {
      const prepared = prepareRow(raw, { orgId: ctx.org.id, modelId: batch.modelId });
      if (prepared.error) results[i] = { row: i + 1, error: prepared.error };
      else if (seen.has(`${prepared.type}:${prepared.hash}`)) results[i] = { row: i + 1, error: 'duplicate_in_file' };
      else {
        seen.add(`${prepared.type}:${prepared.hash}`);
        accepted.push({ index: i, prepared });
      }
    });

    if (accepted.length) {
      const outcomes = await repo.registerUnits(tx, batchId, accepted.map(({ prepared }) => ({
        type: prepared.type, hash: prepared.hash, last4: prepared.last4, ...(prepared.qr && { qr: prepared.qr }),
      })));
      for (const o of outcomes) {
        const { index } = accepted[o.rowIndex - 1];
        results[index] = o.error ? { row: index + 1, error: o.error } : { row: index + 1, qrPublicId: o.qrPublicId };
      }
    }

    const registered = results.filter((r) => r.qrPublicId).length;
    await writeAudit(tx, {
      actor: ctx, action: 'market_batch.register_units', entity: 'market_batch', entityId: batchId,
      detail: { submitted: rows.length, registered },
    });
    return { registered, rejected: results.filter((r) => r.error), results };
  });
}

export async function placeBatch(batchId, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const batch = await repo.findBatch(tx, batchId, ctx.org.id);
    if (!batch) throw Errors.notFound('Batch');
    if (batch.status !== 'draft') throw Errors.conflict('batch_placed', 'This batch is already on the market.');
    const units = await repo.placeBatch(tx, batchId);
    await writeAudit(tx, { actor: ctx, action: 'market_batch.place', entity: 'market_batch', entityId: batchId, detail: { units } });
    return repo.findBatch(tx, batchId, ctx.org.id);
  });
}

export async function batchLabels(batchId, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const batch = await repo.findBatch(tx, batchId, ctx.org.id);
    if (!batch) throw Errors.notFound('Batch');
    return { batch, labels: await repo.listBatchLabels(tx, batchId, ctx.org.id) };
  });
}

export const listUnits = (query, ctx) => withTx(ctx.userId, (tx) => repo.listUnitOutcomes(tx, { ...query, limit: 300 }));

export async function overview(ctx) {
  return withTx(ctx.userId, async (tx) => {
    // One transaction client runs queries sequentially.
    const totals = await repo.registryTotals(tx, ctx.org.id);
    const byState = await repo.unitCountsByState(tx, ctx.org.id);
    const monthly = await repo.monthlyOutcomes(tx, 6);
    const byModel = await repo.processedByModel(tx, ctx.org.id);
    return { totals, byState: Object.fromEntries(byState.map((r) => [r.state, r.count])), monthly, byModel };
  });
}
