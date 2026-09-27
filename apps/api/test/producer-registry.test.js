// Manufacturer registry (Track A): models, batches, unit registration with QR ids, placing on market.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { asAdmin, asAppUser, uniqueRef, useServer } from './helpers/harness.js';
import { randomImei } from './helpers/http-client.js';

const t = useServer();

async function createModel(producer, overrides = {}) {
  const res = await producer.post('/producer/models', {
    brand: 'TestBrand', modelName: uniqueRef('Phone'), categoryCode: 'mobile_phone', typicalUnitKg: 0.18, batteryType: 'li_ion', ...overrides,
  });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  return res.body.model;
}

async function createBatch(producer, modelId, quantity = 5) {
  const res = await producer.post('/producer/batches', {
    modelId, batchRef: uniqueRef('B'), marketMonth: '2026-09', stateCode: 'MP', quantity,
  });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  return res.body.batch;
}

describe('manufacturer registry', () => {
  test('owner registers a model, a batch, and units; every row gets an outcome', async () => {
    const owner = await t.signIn('producer.owner@ecosure.test');
    const me = (await owner.get('/auth/me')).body.user;
    assert.equal(me.workspace, 'producer');

    const model = await createModel(owner);
    assert.equal(model.dataBearing, true);
    const batch = await createBatch(owner, model.id, 5);
    assert.equal(batch.status, 'draft');

    const imei = randomImei();
    const upload = await owner.post(`/producer/batches/${batch.id}/units`, {
      rows: [{ imei }, { imei }, { serial: 'SN-000123' }, {}, { imei: '123' }],
    });
    assert.equal(upload.status, 200, JSON.stringify(upload.body));
    assert.equal(upload.body.registered, 3);
    assert.deepEqual(upload.body.rejected.map((r) => [r.row, r.error]), [[2, 'duplicate_in_file'], [5, 'invalid_imei']]);
    assert.ok(upload.body.results.filter((r) => r.qrPublicId).every((r) => /^[0-9a-f]{18}$/.test(r.qrPublicId)));

    // The same IMEI in a second upload is a database-level duplicate, reported per row.
    const again = await owner.post(`/producer/batches/${batch.id}/units`, { rows: [{ imei }] });
    assert.deepEqual(again.body.rejected, [{ row: 1, error: 'duplicate' }]);

    // Cannot exceed the batch quantity.
    const over = await owner.post(`/producer/batches/${batch.id}/units`, { rows: [{}, {}, {}] });
    assert.equal(over.status, 409);
    assert.equal(over.body.error.code, 'over_quantity');

    const labels = await owner.get(`/producer/batches/${batch.id}/labels`);
    assert.equal(labels.body.labels.length, 3);
    assert.ok(labels.body.labels.every((l) => l.last4.length === 4));
  });

  test('maker-checker: only an approver or owner places a batch; placed batches are frozen', async () => {
    const owner = await t.signIn('producer.owner@ecosure.test');
    const approver = await t.signIn('producer.approver@ecosure.test');
    const model = await createModel(owner, { categoryCode: 'laptop', typicalUnitKg: 2.1 });
    const batch = await createBatch(owner, model.id, 2);
    await owner.post(`/producer/batches/${batch.id}/units`, { rows: [{ serial: 'LAP-0001' }, { serial: 'LAP-0002' }] });

    // Approvers cannot create registry records (staff role check).
    assert.equal((await approver.post('/producer/models', { brand: 'X', modelName: 'Y', categoryCode: 'laptop', typicalUnitKg: 1, batteryType: 'none' })).status, 403);

    const placed = await approver.post(`/producer/batches/${batch.id}/place`);
    assert.equal(placed.status, 200, JSON.stringify(placed.body));
    assert.equal(placed.body.batch.status, 'placed');
    assert.equal((await owner.post(`/producer/batches/${batch.id}/units`, { rows: [{}] })).body.error.code, 'batch_placed');

    const units = (await owner.get(`/producer/units?batchId=${batch.id}`)).body.units;
    assert.equal(units.length, 2);
    assert.ok(units.every((u) => u.state === 'placed_on_market' && u.attestationNumber === null));
    assert.deepEqual(Object.keys(units[0]).sort(), [
      'attestationNumber', 'batchId', 'batchRef', 'brand', 'id', 'identifierType', 'last4', 'modelName', 'qrPublicId', 'state', 'updatedAt',
    ]);

    const overview = await owner.get('/producer/overview');
    assert.equal(overview.status, 200);
    assert.ok(overview.body.byState.placed_on_market >= 2);
    assert.equal(overview.body.monthly.length, 6);
  });

  test('other workspaces cannot reach the registry, and the database hides it from them', async () => {
    const shop = await t.signIn('shop@ecosure.test');
    const maker = await t.signIn('recycler.maker@ecosure.test');
    const { c: citizen, userId: citizenId } = await t.registerCitizen();
    for (const c of [shop, maker, citizen]) assert.equal((await c.get('/producer/models')).status, 403);

    const owner = await t.signIn('producer.owner@ecosure.test');
    assert.equal((await owner.get('/agent/lots')).status, 403);
    assert.equal((await owner.get('/recycler/lots')).status, 403);
    assert.equal((await owner.get('/pickups')).status, 403);

    const shopId = (await shop.get('/auth/me')).body.user.userId;
    for (const userId of [shopId, citizenId]) {
      // Only models of units they handled or claimed are visible; the rest of the registry is not.
      const [seen] = await asAppUser(userId, `select (select count(*) from product_models)::int as models,
        (select count(distinct model_id) from product_units)::int as handled`);
      const [all] = await asAdmin('select count(*)::int as n from product_models');
      assert.equal(seen.models, seen.handled);
      assert.ok(seen.models < all.n);
      assert.equal((await asAppUser(userId, 'select id from market_batches')).length, 0);
    }
    // Producers never read lifecycle rows directly (they carry custody org ids).
    const ownerId = (await owner.get('/auth/me')).body.user.userId;
    assert.equal((await asAppUser(ownerId, 'select id from lifecycle_events')).length, 0);
    assert.ok((await asAppUser(ownerId, 'select id from product_units')).length > 0);
    await assert.rejects(asAppUser(ownerId, "update market_batches set status = 'placed'"), /permission denied/);
  });
});
