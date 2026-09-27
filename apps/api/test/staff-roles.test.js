// Staff roles inside an organisation: every member reads, only the right roles write.
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { asAdmin, asAppUser, uniqueRef, useServer } from './helpers/harness.js';
import { today } from './helpers/http-client.js';

const t = useServer();
const userId = async (email) => (await asAdmin('select id from users where email = $1', [email]))[0].id;

/** A sealed lot from the test shop, ready to dispatch. */
async function sealedLot() {
  const shop = await t.signIn('shop@ecosure.test');
  const { c: citizen } = await t.registerCitizen();
  const pickup = await t.book(citizen, await t.wardId(4), [{ categoryCode: 'small_appliance', quantity: 1 }]);
  await shop.post(`/agent/jobs/${pickup}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
  const { code } = (await citizen.post(`/pickups/${pickup}/handover-code`)).body;
  const item = (await shop.get(`/agent/jobs/${pickup}`)).body.job.items[0];
  assert.equal((await shop.post(`/agent/jobs/${pickup}/collect`, {
    handoverCode: code, netKg: 2, materialPaidAmount: 50,
    items: [{ itemId: item.id, collectedQuantity: 1, batteryCheck: 'no_battery' }],
  })).status, 200);
  const lot = (await shop.post('/agent/lots', { sealTag: uniqueRef('ROLE'), pickupIds: [pickup] })).body.lot;
  return { shop, citizen, pickup, lot };
}

describe('staff roles', () => {
  test('a finance member reads the agent workspace but cannot accept, collect, seal, or dispatch', async () => {
    const finance = await t.signIn('shop.finance@ecosure.test');
    const { c: citizen } = await t.registerCitizen();
    const pickup = await t.book(citizen, await t.wardId(4), [{ categoryCode: 'mobile_phone', quantity: 1 }]);
    const { lot } = await sealedLot();

    assert.equal((await finance.get('/agent/jobs')).status, 200);
    assert.equal((await finance.get('/agent/jobs/open')).status, 200);
    assert.equal((await finance.get('/agent/lots')).status, 200);

    const writes = [
      [`/agent/jobs/${pickup}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' }],
      [`/agent/jobs/${pickup}/collect`, { handoverCode: '000000', netKg: 1, materialPaidAmount: 0, items: [] }],
      ['/agent/lots', { sealTag: uniqueRef('FIN'), pickupIds: [pickup] }],
      [`/agent/lots/${lot.id}/dispatch`, { senderNetKg: 2 }],
    ];
    for (const [path, body] of writes) assert.equal((await finance.post(path, body)).status, 403, path);
  });

  test('a recycler viewer cannot receive lots or touch attestations; an operator cannot issue them', async () => {
    const { shop, lot } = await sealedLot();
    assert.equal((await shop.post(`/agent/lots/${lot.id}/dispatch`, { senderNetKg: 2 })).status, 200);
    const viewer = await t.signIn('recycler.viewer@ecosure.test');
    const maker = await t.signIn('recycler.maker@ecosure.test');
    const checker = await t.signIn('recycler.checker@ecosure.test');

    assert.equal((await viewer.get(`/recycler/lots/${lot.id}`)).status, 200);
    assert.equal((await viewer.post(`/recycler/lots/${lot.id}/receive`, { receiverNetKg: 2, sealIntact: true, unitCountReceived: 1 })).status, 403);
    assert.equal((await maker.post(`/recycler/lots/${lot.id}/receive`, { receiverNetKg: 2, sealIntact: true, unitCountReceived: 1 })).status, 200);

    assert.equal((await viewer.post(`/recycler/attestations/lots/${lot.id}`, { processedKg: 1.5, batteryKg: 0 })).status, 403);
    const draft = await maker.post(`/recycler/attestations/lots/${lot.id}`, { processedKg: 1.5, batteryKg: 0 });
    assert.equal(draft.status, 201, JSON.stringify(draft.body));
    const attestationId = draft.body.attestation.id;
    assert.equal((await maker.post(`/recycler/attestations/${attestationId}/approve`)).status, 403);
    assert.equal((await viewer.post(`/recycler/attestations/${attestationId}/approve`)).status, 403);
    assert.equal((await checker.post(`/recycler/attestations/${attestationId}/approve`)).status, 200);
  });

  test('the database refuses writes from read-only roles even without the API', async () => {
    const { lot } = await sealedLot();
    const financeId = await userId('shop.finance@ecosure.test');
    const ownerId = await userId('shop@ecosure.test');
    const viewerId = await userId('recycler.viewer@ecosure.test');
    const touch = 'update lots set vehicle_ref = vehicle_ref where id = $1 returning id';

    assert.equal((await asAppUser(financeId, touch, [lot.id])).length, 0);
    assert.equal((await asAppUser(ownerId, touch, [lot.id])).length, 1);
    assert.equal((await asAppUser(financeId, 'select id from lots where id = $1', [lot.id])).length, 1);
    const [orgs] = await asAdmin('select agent_org_id, principal_org_id from lots where id = $1', [lot.id]);
    await assert.rejects(
      asAppUser(financeId, "insert into lots (agent_org_id, principal_org_id, seal_tag, created_by) values ($1, $2, 'SEAL-FINANCE', $3)",
        [orgs.agent_org_id, orgs.principal_org_id, financeId]),
      (err) => err.code === '42501',
    );
    assert.equal((await asAppUser(viewerId, touch, [lot.id])).length, 0);
  });
});
