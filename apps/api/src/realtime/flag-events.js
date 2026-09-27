import pg from 'pg';
import { env } from '../config/env.js';
import { logger } from '../core/logger.js';
import { pgConfig } from '../core/pg-config.js';

// One LISTEN connection fans out flag notifications to authorised SSE subscribers.
// Payloads carry only ids; clients refetch through the RLS-protected API.

const CHANNEL = 'ecosure_flags';
const HEARTBEAT_MS = 25_000;
const MAX_BACKOFF_MS = 30_000;

const subscribers = new Set();
let client = null;
let stopped = false;
let backoffMs = 1_000;
let heartbeat = null;

function broadcast(event, data) {
  const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of subscribers) res.write(frame);
}

async function connect() {
  if (stopped) return;
  client = new pg.Client(pgConfig(env.databaseUrl));
  client.on('notification', (msg) => {
    try {
      broadcast('flag', JSON.parse(msg.payload));
    } catch (err) {
      logger.warn({ err }, 'ignored malformed flag notification');
    }
  });
  client.on('error', (err) => {
    logger.error({ err }, 'flag listener connection error');
    scheduleReconnect();
  });
  try {
    await client.connect();
    await client.query(`listen ${CHANNEL}`);
    backoffMs = 1_000;
    broadcast('resync', {});
    logger.info({}, 'flag listener connected');
  } catch (err) {
    logger.error({ err }, 'flag listener failed to connect');
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (stopped) return;
  const old = client;
  client = null;
  old?.end().catch(() => {});
  setTimeout(connect, backoffMs).unref();
  backoffMs = Math.min(backoffMs * 2, MAX_BACKOFF_MS);
}

export function startFlagEvents() {
  stopped = false;
  heartbeat = setInterval(() => {
    for (const res of subscribers) res.write(': keep-alive\n\n');
  }, HEARTBEAT_MS);
  heartbeat.unref();
  return connect();
}

export async function stopFlagEvents() {
  stopped = true;
  clearInterval(heartbeat);
  for (const res of subscribers) res.end();
  subscribers.clear();
  await client?.end().catch(() => {});
}

export function subscribe(res) {
  subscribers.add(res);
  return () => subscribers.delete(res);
}
