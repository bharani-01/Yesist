import pg from 'pg';
import { env } from '../config/env.js';
import { logger } from './logger.js';

// numeric stays a string (pg default) to keep money and weight exact.
export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => logger.error({ err }, 'idle database client error'));

/**
 * Runs work inside one transaction with the row-level-security user context set.
 * Pass userId = null for public or pre-authentication calls.
 */
export async function withTx(userId, work) {
  const client = await pool.connect();
  try {
    await client.query('begin');
    await client.query("select set_config('app.user_id', $1, true)", [userId ?? '']);
    const result = await work(client);
    await client.query('commit');
    return result;
  } catch (err) {
    await client.query('rollback').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}

export async function queryOne(client, text, params) {
  const { rows } = await client.query(text, params);
  return rows[0] ?? null;
}

export async function queryMany(client, text, params) {
  const { rows } = await client.query(text, params);
  return rows;
}

export async function checkDatabase() {
  const { rows } = await pool.query('select 1 as ok');
  return rows[0]?.ok === 1;
}

export const closePool = () => pool.end();
