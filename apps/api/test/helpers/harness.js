// Shared test harness: starts the real app on an ephemeral port against the test database.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before } from 'node:test';
import pg from 'pg';
import { HttpClient, today } from './http-client.js';

process.env.NODE_ENV = 'test';
const { createApp } = await import('../../src/app.js');
const { closePool } = await import('../../src/core/db.js');

export const PASSWORD = process.env.PILOT_ACCOUNT_PASSWORD;

export function useServer() {
  const state = { baseUrl: null, server: null };
  before(async () => {
    assert.ok(PASSWORD, 'PILOT_ACCOUNT_PASSWORD must be set');
    state.server = createApp().listen(0);
    await new Promise((r) => state.server.once('listening', r));
    state.baseUrl = `http://127.0.0.1:${state.server.address().port}`;
  });
  after(async () => {
    await new Promise((r) => state.server.close(r));
    await closePool();
  });

  const client = () => new HttpClient(state.baseUrl);
  return {
    state,
    client,
    async signIn(email, password = PASSWORD) {
      const c = client();
      const res = await c.post('/auth/login', { email, password });
      assert.equal(res.status, 200, `login ${email}: ${JSON.stringify(res.body)}`);
      return c;
    },
    async registerCitizen() {
      const c = client();
      const n = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
      const res = await c.post('/auth/register', {
        fullName: 'Test Citizen', email: `citizen-${randomUUID()}@ecosure.test`, phone: `9${n}`, password: 'citizen-password-1',
      });
      assert.equal(res.status, 201, JSON.stringify(res.body));
      return { c, userId: res.body.user.userId };
    },
    async book(citizen, wardId, items, extra = {}) {
      const res = await citizen.post('/pickups', {
        wardId, contactName: 'Test Citizen', contactPhone: '9876543210', addressLine: '12 Test Lane, Indore',
        preferredDate: today(), preferredWindow: 'morning', items, ...extra,
      });
      assert.equal(res.status, 201, JSON.stringify(res.body));
      return res.body.pickup.id;
    },
    async wardId(number) {
      return (await client().get('/reference')).body.wards.find((w) => w.number === number).id;
    },
  };
}

/** Runs SQL as a given app user inside a rolled-back transaction (RLS checks). */
export async function asAppUser(userId, sql, params) {
  const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await db.connect();
  try {
    await db.query('begin');
    await db.query("select set_config('app.user_id', $1, true)", [userId ?? '']);
    return (await db.query(sql, params)).rows;
  } finally {
    await db.query('rollback').catch(() => {});
    await db.end();
  }
}

/** Runs SQL as the database owner (setup only: creating fixture organisations). */
export async function asAdmin(sql, params) {
  const db = new pg.Client({ connectionString: process.env.DATABASE_ADMIN_URL });
  await db.connect();
  try {
    return (await db.query(sql, params)).rows;
  } finally {
    await db.end();
  }
}

export const uniqueRef = (prefix) => `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;

/** Registers and places `count` QR-only phone units through the manufacturer API; returns their QR ids. */
export async function placedPhones(t, count) {
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
