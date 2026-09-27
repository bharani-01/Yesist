// End-to-end custody chain against a real PostgreSQL database. Run through `npm test`,
// which provisions the isolated `<database>_test` schema and test accounts first.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, describe, test } from 'node:test';
import pg from 'pg';
import { HttpClient, randomImei, today } from './helpers/http-client.js';

process.env.NODE_ENV = 'test';
const { createApp } = await import('../src/app.js');
const { closePool } = await import('../src/core/db.js');
const { isValidImei } = await import('../src/shared/schemas.js');

const PASSWORD = process.env.PILOT_ACCOUNT_PASSWORD;
let server;
let baseUrl;
const client = () => new HttpClient(baseUrl);

async function signIn(email) {
  const c = client();
  const res = await c.post('/auth/login', { email, password: PASSWORD });
  assert.equal(res.status, 200, `login ${email}: ${JSON.stringify(res.body)}`);
  return c;
}

async function registerCitizen() {
  const c = client();
  const n = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
  const res = await c.post('/auth/register', {
    fullName: 'Test Citizen', email: `citizen-${randomUUID()}@ecosure.test`, phone: `9${n}`, password: 'citizen-password-1',
  });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  return { c, userId: res.body.user.userId };
}

async function book(citizen, wardId, items) {
  const res = await citizen.post('/pickups', {
    wardId, contactName: 'Test Citizen', contactPhone: '9876543210', addressLine: '12 Test Lane, Indore',
    preferredDate: today(), preferredWindow: 'morning', items,
  });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  return res.body.pickup.id;
}

before(async () => {
  assert.ok(PASSWORD, 'PILOT_ACCOUNT_PASSWORD must be set');
  server = createApp().listen(0);
  await new Promise((r) => server.once('listening', r));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((r) => server.close(r));
  await closePool();
});

describe('authentication and authorization', () => {
  test('unauthenticated requests get 401 with a stable code', async () => {
    const res = await client().get('/pickups');
    assert.equal(res.status, 401);
    assert.equal(res.body.error.code, 'unauthenticated');
    assert.ok(res.body.error.requestId);
  });

  test('wrong workspace gets 403', async () => {
    const { c } = await registerCitizen();
    assert.equal((await c.get('/agent/jobs')).status, 403);
    const shop = await signIn('shop@ecosure.test');
    assert.equal((await shop.get('/pickups')).status, 403);
    assert.equal((await shop.get('/oversight/flags')).status, 403);
  });

  test('invalid credentials do not reveal whether the account exists', async () => {
    const a = await client().post('/auth/login', { email: 'nobody@ecosure.test', password: 'x' });
    const b = await client().post('/auth/login', { email: 'shop@ecosure.test', password: 'wrong-password' });
    assert.equal(a.status, 401);
    assert.equal(b.status, 401);
    assert.equal(a.body.error.code, b.body.error.code);
  });

  test('validation errors list the failing fields', async () => {
    const { c } = await registerCitizen();
    const res = await c.post('/pickups', { wardId: 'x', items: [] });
    assert.equal(res.status, 400);
    assert.equal(res.body.error.code, 'validation_failed');
    assert.ok(res.body.error.details.length > 0);
  });

  test('cross-origin state changes are rejected', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://evil.example' },
      body: JSON.stringify({ email: 'shop@ecosure.test', password: PASSWORD }),
    });
    assert.equal(res.status, 403);
  });
});

describe('custody chain: booking → handover → lot → receipt → maker-checker attestation → verification', () => {
  test('full chain with fraud controls and flags', async () => {
    const ref = await client().get('/reference');
    const wardId = ref.body.wards.find((w) => w.number === 1).id;
    const shop = await signIn('shop@ecosure.test');
    const maker = await signIn('recycler.maker@ecosure.test');
    const checker = await signIn('recycler.checker@ecosure.test');
    const spcb = await signIn('spcb@ecosure.test');
    const imc = await signIn('imc@ecosure.test');

    // Citizen A books two phones and a mixer.
    const { c: citizenA } = await registerCitizen();
    const pickupA = await book(citizenA, wardId, [
      { categoryCode: 'mobile_phone', quantity: 2 },
      { categoryCode: 'small_appliance', quantity: 1 },
    ]);

    // Agent sees the request without the address, then accepts.
    const open = await shop.get('/agent/jobs/open');
    assert.ok(open.body.jobs.some((j) => j.id === pickupA));
    const preview = await shop.get(`/agent/jobs/${pickupA}`);
    assert.equal(preview.body.job.address, null);
    assert.equal(preview.body.job.isMine, false);
    assert.equal((await citizenA.post(`/pickups/${pickupA}/handover-code`)).status, 409);
    const accepted = await shop.post(`/agent/jobs/${pickupA}/accept`, { scheduledFor: today(), scheduledWindow: 'afternoon' });
    assert.equal(accepted.status, 200, JSON.stringify(accepted.body));
    const job = (await shop.get(`/agent/jobs/${pickupA}`)).body.job;
    assert.equal(job.address.addressLine, '12 Test Lane, Indore');

    // Citizen generates a handover code; a wrong code is rejected and counted.
    const { body: { code } } = await citizenA.post(`/pickups/${pickupA}/handover-code`);
    assert.match(code, /^\d{6}$/);
    const phone = job.items.find((i) => i.categoryCode === 'mobile_phone');
    const mixer = job.items.find((i) => i.categoryCode === 'small_appliance');
    const imeis = [randomImei(), randomImei()];
    assert.ok(imeis.every(isValidImei));
    const collectBody = (handoverCode) => ({
      handoverCode, netKg: 2.4, materialPaidAmount: 170,
      items: [
        { itemId: phone.id, collectedQuantity: 2, batteryCheck: 'intact_embedded', identifiers: imeis },
        { itemId: mixer.id, collectedQuantity: 1 },
      ],
    });
    const wrong = await shop.post(`/agent/jobs/${pickupA}/collect`, collectBody(code === '000000' ? '111111' : '000000'));
    assert.equal(wrong.status, 422);
    assert.equal(wrong.body.error.code, 'handover_invalid');

    const collected = await shop.post(`/agent/jobs/${pickupA}/collect`, collectBody(code));
    assert.equal(collected.status, 200, JSON.stringify(collected.body));
    assert.deepEqual(collected.body.result.incentive, { eligibleUnits: 2, amount: '100.00', status: 'eligible' });

    // Citizen B presents one of the same phones: duplicate flag, no incentive.
    const { c: citizenB } = await registerCitizen();
    const pickupB = await book(citizenB, wardId, [{ categoryCode: 'mobile_phone', quantity: 1 }]);
    await shop.post(`/agent/jobs/${pickupB}/accept`, { scheduledFor: today(), scheduledWindow: 'evening' });
    const codeB = (await citizenB.post(`/pickups/${pickupB}/handover-code`)).body.code;
    const itemB = (await shop.get(`/agent/jobs/${pickupB}`)).body.job.items[0];
    const dup = await shop.post(`/agent/jobs/${pickupB}/collect`, {
      handoverCode: codeB, netKg: 0.2, materialPaidAmount: 60,
      items: [{ itemId: itemB.id, collectedQuantity: 1, batteryCheck: 'intact_embedded', identifiers: [imeis[0]] }],
    });
    assert.equal(dup.status, 200, JSON.stringify(dup.body));
    assert.equal(dup.body.result.duplicates, 1);
    assert.equal(dup.body.result.incentive, null);

    // Citizen B cannot read citizen A's pickup.
    assert.equal((await citizenB.get(`/pickups/${pickupA}`)).status, 404);

    // Agent seals and dispatches a lot.
    const sealTag = `SEAL-${randomUUID().slice(0, 8).toUpperCase()}`;
    const lot = await shop.post('/agent/lots', { sealTag, pickupIds: [pickupA, pickupB] });
    assert.equal(lot.status, 201, JSON.stringify(lot.body));
    const lotId = lot.body.lot.id;
    assert.equal((await shop.post(`/agent/lots/${lotId}/dispatch`, { senderNetKg: 3.2 })).status, 200);

    // Recycler receives: 9.4% under sender weight → lower reading accepted, variance flagged.
    const received = await maker.post(`/recycler/lots/${lotId}/receive`, { receiverNetKg: 2.9, sealIntact: true, unitCountReceived: 4 });
    assert.equal(received.status, 200, JSON.stringify(received.body));
    assert.equal(received.body.result.acceptedNetKg, '2.900');
    assert.deepEqual(received.body.result.flags, ['weight_variance']);

    // Maker-checker: processed + battery cannot exceed accepted; maker cannot approve.
    assert.equal((await maker.post(`/recycler/attestations/lots/${lotId}`, { processedKg: 2.8, batteryKg: 0.3 })).status, 400);
    const draft = await maker.post(`/recycler/attestations/lots/${lotId}`, { processedKg: 2.5, batteryKg: 0.3 });
    assert.equal(draft.status, 201, JSON.stringify(draft.body));
    assert.equal((await maker.post(`/recycler/attestations/${draft.body.attestation.id}/approve`)).status, 403);
    const issued = await checker.post(`/recycler/attestations/${draft.body.attestation.id}/approve`);
    assert.equal(issued.status, 200, JSON.stringify(issued.body));
    const { publicNumber } = issued.body.attestation;
    assert.match(publicNumber, /^ECS-ATT-\d{4}-\d{6}$/);

    // Public verification returns non-personal fields only.
    const verified = await client().get(`/public/attestations/${publicNumber}`);
    assert.equal(verified.status, 200);
    assert.equal(verified.body.attestation.processedKg, '2.500');
    assert.deepEqual(Object.keys(verified.body.attestation).sort(), [
      'batteryKg', 'categories', 'disclaimerVersion', 'issuedAt', 'issuer', 'processedKg', 'publicNumber', 'registrationNo', 'sha256', 'unitCount',
    ]);

    // Citizen sees the closed pickup with the attestation and incentive.
    const detail = (await citizenA.get(`/pickups/${pickupA}`)).body.pickup;
    assert.equal(detail.status, 'closed');
    assert.equal(detail.attestation.publicNumber, publicNumber);
    assert.equal(detail.incentive.amount, '100.00');
    assert.ok(detail.timeline.some((t) => t.type === 'attested'));

    // Regulator sees flags; city officer is read-only.
    const flags = (await spcb.get('/oversight/flags')).body.flags;
    const variance = flags.find((f) => f.type === 'weight_variance' && f.lotSealTag === sealTag);
    assert.ok(variance);
    assert.ok(flags.some((f) => f.type === 'duplicate_device' && f.pickupReference));
    assert.equal((await imc.post(`/oversight/flags/${variance.id}/status`, { status: 'closed', note: 'not allowed' })).status, 403);
    const triaged = await spcb.post(`/oversight/flags/${variance.id}/status`, { status: 'under_review', note: 'Calling the agent for scale photos' });
    assert.equal(triaged.status, 200);
    const overview = await spcb.get('/oversight/overview');
    assert.equal(overview.status, 200);
    assert.ok(Number(overview.body.totals.attestedKg) >= 2.5);
  });

  test('handover code locks after five wrong attempts', async () => {
    const wardId = (await client().get('/reference')).body.wards.find((w) => w.number === 2).id;
    const shop = await signIn('shop@ecosure.test');
    const { c: citizen } = await registerCitizen();
    const pickup = await book(citizen, wardId, [{ categoryCode: 'cables_accessories', quantity: 1 }]);
    await shop.post(`/agent/jobs/${pickup}/accept`, { scheduledFor: today(), scheduledWindow: 'morning' });
    const { code } = (await citizen.post(`/pickups/${pickup}/handover-code`)).body;
    const item = (await shop.get(`/agent/jobs/${pickup}`)).body.job.items[0];
    const attempt = (handoverCode) => shop.post(`/agent/jobs/${pickup}/collect`, {
      handoverCode, netKg: 0.3, materialPaidAmount: 12, items: [{ itemId: item.id, collectedQuantity: 1 }],
    });
    const wrongCode = code === '999999' ? '888888' : '999999';
    const codes = [];
    for (let i = 0; i < 5; i += 1) codes.push((await attempt(wrongCode)).body.error.code);
    assert.deepEqual(codes, ['handover_invalid', 'handover_invalid', 'handover_invalid', 'handover_invalid', 'handover_locked']);
    assert.equal((await attempt(code)).body.error.code, 'handover_locked');
  });
});

describe('row-level security (second line of defence)', () => {
  test('database hides other citizens’ pickups and all addresses from officers', async () => {
    const wardId = (await client().get('/reference')).body.wards.find((w) => w.number === 3).id;
    const { c: owner } = await registerCitizen();
    const { userId: otherId } = await registerCitizen();
    const pickupId = await book(owner, wardId, [{ categoryCode: 'printer', quantity: 1 }]);
    const spcbId = (await (await signIn('spcb@ecosure.test')).get('/auth/me')).body.user.userId;

    const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
    await db.connect();
    const asUser = async (userId, sql, params) => {
      await db.query('begin');
      try {
        await db.query("select set_config('app.user_id', $1, true)", [userId]);
        return (await db.query(sql, params)).rows;
      } finally {
        await db.query('rollback');
      }
    };
    try {
      assert.equal((await asUser(otherId, 'select id from pickup_requests where id = $1', [pickupId])).length, 0);
      assert.equal((await asUser(spcbId, 'select id from pickup_requests where id = $1', [pickupId])).length, 1);
      assert.equal((await asUser(spcbId, 'select * from pickup_addresses where pickup_id = $1', [pickupId])).length, 0);
      assert.equal((await asUser('', 'select id from pickup_requests where id = $1', [pickupId])).length, 0);
      await assert.rejects(asUser(otherId, 'select * from handover_codes'), /permission denied/);
      await assert.rejects(asUser(spcbId, 'delete from audit_log'), /permission denied/);
    } finally {
      await db.end();
    }
  });
});
