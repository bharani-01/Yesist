// Track B: an optional, recycler-owned hub between the agent and the recycler.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { asAppUser, placedPhones, uniqueRef, useServer } from './helpers/harness.js';
import { today } from './helpers/http-client.js';

const t = useServer();

describe('regional hub', () => {
  test('agent → hub (weighed, flagged) → shipment → recycler receives against the hub weight', async () => {
    const [qr] = await placedPhones(t, 1);
    const shop = await t.signIn('shop@ecosure.test');
    const hub = await t.signIn('hub@ecosure.test');
    const maker = await t.signIn('recycler.maker@ecosure.test');
    const { c: citizen } = await t.registerCitizen();

    const pickup = await t.book(citizen, await t.wardId(5), [{ categoryCode: 'mobile_phone', quantity: 1 }]);
    await shop.post(`/agent/jobs/${pickup}/accept`, { scheduledFor: today(), scheduledWindow: 'afternoon' });
    const { code } = (await citizen.post(`/pickups/${pickup}/handover-code`)).body;
    const item = (await shop.get(`/agent/jobs/${pickup}`)).body.job.items[0];
    const collected = await shop.post(`/agent/jobs/${pickup}/collect`, {
      handoverCode: code, netKg: 1, materialPaidAmount: 60,
      items: [{ itemId: item.id, collectedQuantity: 1, batteryCheck: 'intact_embedded', qrIds: [qr] }],
    });
    assert.equal(collected.status, 200, JSON.stringify(collected.body));

    const sealTag = uniqueRef('HUBSEAL');
    const lotId = (await shop.post('/agent/lots', { sealTag, pickupIds: [pickup] })).body.lot.id;

    // The agent may route through the recycler's hub, and only that hub.
    const destinations = (await shop.get('/agent/lots/destinations')).body;
    assert.equal(destinations.recycler.name, 'Test Recycler (local only)');
    const hubOrg = destinations.hubs.find((h) => h.name === 'Test Regional Hub (local only)');
    assert.ok(hubOrg);
    const badHub = await shop.post(`/agent/lots/${lotId}/dispatch`, { senderNetKg: 1, hubOrgId: '00000000-0000-4000-8000-000000000000' });
    assert.equal(badHub.body.error.code, 'invalid_hub');
    assert.equal((await shop.post(`/agent/lots/${lotId}/dispatch`, { senderNetKg: 1, hubOrgId: hubOrg.id })).status, 200);

    // The recycler cannot receive a lot that is still on its way to the hub.
    assert.equal((await maker.post(`/recycler/lots/${lotId}/receive`, { receiverNetKg: 1, sealIntact: true, unitCountReceived: 1 })).body.error.code, 'not_receivable');
    assert.equal((await maker.get(`/recycler/lots/${lotId}`)).body.lot.receivable, false);

    // Hub receipt 10% light: outside tolerance, flagged against the agent.
    assert.equal((await hub.get('/hub/lots')).body.lots.find((l) => l.id === lotId).stage, 'inbound');
    const atHub = await hub.post(`/hub/lots/${lotId}/receive`, { hubNetKg: 0.9, sealIntact: true, unitCountReceived: 1 });
    assert.equal(atHub.status, 200, JSON.stringify(atHub.body));
    assert.deepEqual(atHub.body.result.flags, ['hub_weight_variance']);
    assert.equal((await hub.post(`/hub/lots/${lotId}/receive`, { hubNetKg: 0.9, sealIntact: true, unitCountReceived: 1 })).status, 409);
    assert.equal((await t.client().get(`/public/products/${qr}`)).body.product.state, 'at_hub');

    // Consolidated shipment to the recycler.
    const shipment = await hub.post('/hub/shipments', { lotIds: [lotId] });
    assert.equal(shipment.status, 201, JSON.stringify(shipment.body));
    assert.equal((await hub.post('/hub/shipments', { lotIds: [lotId] })).body.error.code, 'lots_unavailable');
    const shipped = await hub.post(`/hub/shipments/${shipment.body.shipment.id}/dispatch`, { vehicleRef: 'MP09 AB 1234' });
    assert.equal(shipped.status, 200, JSON.stringify(shipped.body));
    assert.equal(shipped.body.shipment.lots, 1);

    // The recycler weighs against the hub's 0.9 kg, so no new weight flag.
    const lot = (await maker.get(`/recycler/lots/${lotId}`)).body.lot;
    assert.equal(lot.receivable, true);
    assert.equal(lot.hubName, 'Test Regional Hub (local only)');
    const received = await maker.post(`/recycler/lots/${lotId}/receive`, { receiverNetKg: 0.9, sealIntact: true, unitCountReceived: 1 });
    assert.equal(received.status, 200, JSON.stringify(received.body));
    assert.deepEqual(received.body.result.flags, []);
    assert.equal((await hub.get(`/hub/shipments/${shipment.body.shipment.id}`)).body.shipment.status, 'received');

    const events = (await t.client().get(`/public/products/${qr}`)).body.product.events.map((e) => e.state);
    assert.deepEqual(events, ['registered', 'placed_on_market', 'collected', 'in_lot', 'at_hub', 'received_at_recycler']);
  });

  test('the hub stays out of the registry and other workspaces, and vice versa', async () => {
    const hub = await t.signIn('hub@ecosure.test');
    const owner = await t.signIn('producer.owner@ecosure.test');
    const shop = await t.signIn('shop@ecosure.test');
    for (const path of ['/producer/models', '/producer/batches', '/agent/lots', '/agent/jobs', '/recycler/lots', '/pickups']) {
      assert.equal((await hub.get(path)).status, 403, path);
    }
    assert.equal((await owner.get('/hub/lots')).status, 403);
    assert.equal((await shop.get('/hub/shipments')).status, 403);

    const hubUserId = (await hub.get('/auth/me')).body.user.userId;
    assert.equal((await hub.get('/auth/me')).body.user.workspace, 'hub');
    assert.equal((await asAppUser(hubUserId, 'select id from product_models')).length, 0);
    assert.equal((await asAppUser(hubUserId, 'select id from market_batches')).length, 0);
    const ownerId = (await owner.get('/auth/me')).body.user.userId;
    assert.equal((await asAppUser(ownerId, 'select id from hub_shipments')).length, 0);
    assert.equal((await asAppUser(ownerId, 'select id from lots')).length, 0);
  });
});
