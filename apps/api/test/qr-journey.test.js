// The QR bridge: a manufacturer-labelled unit is claimed, collected by QR, and scanned at the recycler gate.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { uniqueRef, useServer } from './helpers/harness.js';
import { today } from './helpers/http-client.js';

const t = useServer();

/** Registers and places `count` QR-only phone units; returns their QR ids. */
async function placedPhones(count) {
  const owner = await t.signIn('producer.owner@ecosure.test');
  const approver = await t.signIn('producer.approver@ecosure.test');
  const model = (await owner.post('/producer/models', {
    brand: 'QRBrand', modelName: uniqueRef('Q'), categoryCode: 'mobile_phone', typicalUnitKg: 0.2, batteryType: 'li_ion',
  })).body.model;
  const batch = (await owner.post('/producer/batches', {
    modelId: model.id, batchRef: uniqueRef('QB'), marketMonth: '2026-08', stateCode: 'MP', quantity: count,
  })).body.batch;
  const upload = await owner.post(`/producer/batches/${batch.id}/units`, { rows: Array.from({ length: count }, () => ({})) });
  assert.equal(upload.body.registered, count);
  assert.equal((await approver.post(`/producer/batches/${batch.id}/place`)).status, 200);
  return upload.body.results.map((r) => r.qrPublicId);
}

describe('QR product journey', () => {
  test('claim → collect by QR → gate scan flags the missing unit → attestation → public page', async () => {
    const [qrA, qrB, qrC] = await placedPhones(3);
    const shop = await t.signIn('shop@ecosure.test');
    const maker = await t.signIn('recycler.maker@ecosure.test');
    const checker = await t.signIn('recycler.checker@ecosure.test');
    const spcb = await t.signIn('spcb@ecosure.test');

    // Anyone can open the product page; it names no people or organisations.
    const publicPage = await t.client().get(`/public/products/${qrA}`);
    assert.equal(publicPage.status, 200);
    assert.deepEqual(Object.keys(publicPage.body.product).sort(), [
      'attestationNumber', 'brand', 'categoryName', 'claimed', 'events', 'modelName', 'qrPublicId', 'registered', 'state',
    ]);
    assert.equal(publicPage.body.product.state, 'placed_on_market');
    assert.equal((await t.client().get('/public/products/not-a-label')).status, 400);
    assert.equal((await t.client().get('/public/products/000000000000000000')).status, 404);

    // A citizen claims unit A; a second citizen cannot.
    const { c: citizen } = await t.registerCitizen();
    const { c: other } = await t.registerCitizen();
    assert.equal((await citizen.post('/devices/claim', { qr: qrA.toUpperCase() })).body.status, 'ok');
    assert.equal((await citizen.post('/devices/claim', { qr: qrA })).body.status, 'already_yours');
    assert.equal((await other.post('/devices/claim', { qr: qrA })).body.error.code, 'already_claimed');
    assert.equal((await shop.post('/devices/claim', { qr: qrB })).status, 403);
    const devices = (await citizen.get('/devices')).body.devices;
    assert.deepEqual(devices.map((d) => [d.qrPublicId, d.state]), [[qrA, 'claimed']]);
    assert.ok(devices[0].brand && devices[0].modelName, 'claimant can read the model of a claimed device');

    // Collection by QR: unknown labels and wrong categories are rejected before anything is written.
    const wardId = await t.wardId(4);
    const pickup = await t.book(citizen, wardId, [{ categoryCode: 'mobile_phone', quantity: 2 }, { categoryCode: 'laptop', quantity: 1 }]);
    await shop.post(`/agent/jobs/${pickup}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    const { code } = (await citizen.post(`/pickups/${pickup}/handover-code`)).body;
    const items = (await shop.get(`/agent/jobs/${pickup}`)).body.job.items;
    const phone = items.find((i) => i.categoryCode === 'mobile_phone');
    const laptop = items.find((i) => i.categoryCode === 'laptop');
    const collect = (phoneQr, laptopQr = []) => shop.post(`/agent/jobs/${pickup}/collect`, {
      handoverCode: code, netKg: 2.6, materialPaidAmount: 200,
      items: [
        { itemId: phone.id, collectedQuantity: 2, batteryCheck: 'intact_embedded', qrIds: phoneQr },
        { itemId: laptop.id, collectedQuantity: 1, batteryCheck: 'intact_embedded', qrIds: laptopQr },
      ],
    });
    assert.equal((await collect([qrA, 'ffffffffffffffffff'])).body.error.code, 'unknown_qr');
    assert.equal((await collect([qrA], [qrC])).body.error.code, 'qr_category_mismatch');
    assert.equal((await collect([qrA, qrA])).body.error.code, 'duplicate_qr');
    const collected = await collect([qrA, qrB]);
    assert.equal(collected.status, 200, JSON.stringify(collected.body));
    assert.equal(collected.body.result.duplicates, 0);
    assert.equal((await t.client().get(`/public/products/${qrB}`)).body.product.state, 'collected');

    // Lot, dispatch, and the gate scan: the recycler sees the labelled units and scans only A.
    const sealTag = uniqueRef('SEAL');
    const lotId = (await shop.post('/agent/lots', { sealTag, pickupIds: [pickup] })).body.lot.id;
    await shop.post(`/agent/lots/${lotId}/dispatch`, { senderNetKg: 2.6 });
    const lot = (await maker.get(`/recycler/lots/${lotId}`)).body.lot;
    assert.deepEqual(lot.labelledUnits.map((u) => u.qrPublicId).sort(), [qrA, qrB].sort());
    assert.deepEqual(lot.contents.map((c) => [c.name, c.units, c.passportUnits]), [['Mobile phone', 2, 2], ['Laptop', 1, 0]]);

    const stray = await maker.post(`/recycler/lots/${lotId}/receive`, {
      receiverNetKg: 2.6, sealIntact: true, unitCountReceived: 3, scan: { qrIds: [qrA, qrC] },
    });
    assert.equal(stray.body.error.code, 'qr_not_in_lot');
    const received = await maker.post(`/recycler/lots/${lotId}/receive`, {
      receiverNetKg: 2.6, sealIntact: true, unitCountReceived: 3, scan: { qrIds: [qrA] },
    });
    assert.equal(received.status, 200, JSON.stringify(received.body));
    assert.deepEqual(received.body.result.flags, ['unit_missing_at_scan']);
    assert.deepEqual(received.body.result.missingLabels, [qrB.slice(-6)]);
    const flag = (await spcb.get('/oversight/flags')).body.flags.find((f) => f.type === 'unit_missing_at_scan' && f.lotSealTag === sealTag);
    assert.ok(flag);

    // Attestation moves only the scanned unit to processed; the missing one stays disputed.
    const draft = await maker.post(`/recycler/attestations/lots/${lotId}`, { processedKg: 2.4, batteryKg: 0.1 });
    const issued = await checker.post(`/recycler/attestations/${draft.body.attestation.id}/approve`);
    assert.equal(issued.status, 200, JSON.stringify(issued.body));
    const pageA = (await t.client().get(`/public/products/${qrA}`)).body.product;
    const pageB = (await t.client().get(`/public/products/${qrB}`)).body.product;
    assert.equal(pageA.state, 'processed');
    assert.equal(pageA.attestationNumber, issued.body.attestation.publicNumber);
    assert.deepEqual(pageA.events.map((e) => e.state), ['registered', 'placed_on_market', 'claimed', 'collected', 'in_lot', 'received_at_recycler', 'processed']);
    assert.ok(pageA.claimed);
    assert.equal(pageB.state, 'disputed');
    assert.equal(pageB.attestationNumber, pageA.attestationNumber);

    // The manufacturer sees the outcome without custody identities.
    const owner = await t.signIn('producer.owner@ecosure.test');
    const units = (await owner.get('/producer/units?state=processed')).body.units;
    assert.ok(units.some((u) => u.qrPublicId === qrA && u.attestationNumber === pageA.attestationNumber));
  });
});
