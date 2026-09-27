import { randomBytes } from 'node:crypto';
import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import { advanceUnits, compareWeights, flagArrival, loadSchemeSettings, recordCustodyEvent } from '../../shared/custody.js';
import * as repo from './hub.repository.js';

export const listLots = (ctx) => withTx(ctx.userId, (tx) => repo.listLots(tx, ctx.org.id));

export async function getLot(id, ctx) {
  const lot = await withTx(ctx.userId, async (tx) => {
    const row = await repo.findLot(tx, id, ctx.org.id);
    return row && { ...row, contents: await repo.listLotContents(tx, id) };
  });
  if (!lot) throw Errors.notFound('Lot');
  return lot;
}

/**
 * Hub receipt: hub weight vs the agent's sender weight, seal check, and unit count.
 * The lot stays sealed; its storage deadline keeps running until the recycler receives it.
 */
export async function receiveLot(id, input, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const lot = await repo.lockInboundLot(tx, id, ctx.org.id);
    if (!lot) return null;
    const settings = await loadSchemeSettings(tx);
    const expectedKg = Number(lot.senderNetKg);
    const weights = { ...compareWeights(settings, expectedKg, input.hubNetKg), expectedKg, measuredKg: input.hubNetKg };

    await repo.insertHubWeight(tx, id, input.hubNetKg, ctx.userId);
    await repo.markReceivedAtHub(tx, id, input);
    await advanceUnits(tx, await repo.listLotPickupIds(tx, id), 'at_hub', id);
    const flags = await flagArrival(tx, settings, {
      stage: 'hub', lot, orgId: lot.agentOrgId, weights, sealIntact: input.sealIntact,
      unitsSent: lot.unitCountSent, unitsReceived: input.unitCountReceived,
    });
    await recordCustodyEvent(tx, {
      lotId: id, type: 'received_at_hub', actorId: ctx.userId, orgId: ctx.org.id,
      detail: { netKg: input.hubNetKg, sealIntact: input.sealIntact, unitCountReceived: input.unitCountReceived, flags },
    });
    await writeAudit(tx, { actor: ctx, action: 'lot.receive_at_hub', entity: 'lot', entityId: id, detail: { flags } });
    return { variancePct: Number(weights.variancePct.toFixed(2)), tolerancePct: weights.tolerancePct, flags };
  });
  if (!result) throw Errors.conflict('not_receivable', 'Only lots on their way to your hub can be received.');
  return result;
}

export const listShipments = (ctx) => withTx(ctx.userId, (tx) => repo.listShipments(tx, ctx.org.id));

export async function getShipment(id, ctx) {
  const shipment = await withTx(ctx.userId, async (tx) => {
    const row = await repo.findShipment(tx, id, ctx.org.id);
    return row && { ...row, lots: await repo.listShipmentLots(tx, id) };
  });
  if (!shipment) throw Errors.notFound('Shipment');
  return shipment;
}

async function loadAll(tx, shipmentId, lotIds, ctx) {
  const unique = [...new Set(lotIds)];
  const loaded = await repo.loadLots(tx, shipmentId, ctx.org.id, unique);
  if (loaded.length !== unique.length) {
    throw Errors.conflict('lots_unavailable', 'Some lots are not at your hub or are already on a shipment.');
  }
  for (const lotId of loaded) {
    await recordCustodyEvent(tx, { lotId, type: 'loaded_on_shipment', actorId: ctx.userId, orgId: ctx.org.id, detail: { shipmentId } });
  }
  return loaded;
}

/** Starts a consolidated load to the hub's recycler with lots that are at the hub. */
export function createShipment({ lotIds }, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const recycler = await repo.findRecycler(tx, ctx.org.id);
    if (!recycler) throw Errors.conflict('no_agreement', 'Your hub has no active agreement with a registered recycler.');
    const reference = `SHP-${randomBytes(4).toString('hex').toUpperCase()}`;
    const shipment = await repo.insertShipment(tx, { reference, hubOrgId: ctx.org.id, recyclerOrgId: recycler.id, createdBy: ctx.userId });
    await loadAll(tx, shipment.id, lotIds, ctx);
    await writeAudit(tx, { actor: ctx, action: 'shipment.create', entity: 'hub_shipment', entityId: shipment.id, detail: { lots: lotIds.length } });
    return shipment;
  });
}

export async function addLots(id, { lotIds }, ctx) {
  const added = await withTx(ctx.userId, async (tx) => {
    if (!await repo.lockLoadingShipment(tx, id, ctx.org.id)) return null;
    const loaded = await loadAll(tx, id, lotIds, ctx);
    await writeAudit(tx, { actor: ctx, action: 'shipment.add_lots', entity: 'hub_shipment', entityId: id, detail: { lots: loaded.length } });
    return loaded.length;
  });
  if (added == null) throw Errors.conflict('not_loading', 'Only shipments that are still loading can take more lots.');
  return { added };
}

/** The vehicle leaves: every lot on the shipment is in transit to the recycler again. */
export async function dispatchShipment(id, { vehicleRef }, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const shipment = await repo.lockLoadingShipment(tx, id, ctx.org.id);
    if (!shipment) return null;
    const lotIds = await repo.markShipmentLotsInTransit(tx, id, vehicleRef);
    if (!lotIds.length) throw Errors.conflict('empty_shipment', 'Add at least one lot before dispatching.');
    await repo.markShipmentDispatched(tx, id, vehicleRef, ctx.userId);
    for (const lotId of lotIds) {
      await recordCustodyEvent(tx, { lotId, type: 'shipped_from_hub', actorId: ctx.userId, orgId: ctx.org.id, detail: { shipmentId: id, vehicleRef } });
    }
    await writeAudit(tx, { actor: ctx, action: 'shipment.dispatch', entity: 'hub_shipment', entityId: id, detail: { lots: lotIds.length } });
    return { id, reference: shipment.reference, status: 'in_transit', lots: lotIds.length };
  });
  if (!result) throw Errors.conflict('not_loading', 'Only shipments that are still loading can be dispatched.');
  return result;
}
