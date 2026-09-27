import { createApp } from './app.js';
import { env } from './config/env.js';
import { closePool } from './core/db.js';
import { logger } from './core/logger.js';
import { scheduleStorageDeadlineScan } from './jobs/storage-deadline.job.js';
import { startFlagEvents, stopFlagEvents } from './realtime/flag-events.js';

const app = createApp();
const server = app.listen(env.port, () => logger.info({ port: env.port, env: env.nodeEnv }, 'EcoSure API listening'));

await startFlagEvents();
const stopScan = scheduleStorageDeadlineScan();

let shuttingDown = false;
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'shutting down');
  stopScan();
  await stopFlagEvents();
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (err) => logger.error({ err }, 'unhandled rejection'));
