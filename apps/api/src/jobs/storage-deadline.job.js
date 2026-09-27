import { JOBS } from '../config/constants.js';
import { withTx } from '../core/db.js';
import { logger } from '../core/logger.js';
import { loadSchemeSettings } from '../shared/custody.js';

// Flags lots that have used 75% of their storage period without reaching the recycler (PRD v3 §16.4 step 8).
export async function runStorageDeadlineScan() {
  return withTx(null, async (tx) => {
    const settings = await loadSchemeSettings(tx);
    const { rows } = await tx.query('select app.scan_storage_deadlines($1) as raised', [settings.storage_flag_pct]);
    return rows[0].raised;
  });
}

export function scheduleStorageDeadlineScan() {
  const tick = async () => {
    try {
      const raised = await runStorageDeadlineScan();
      if (raised) logger.info({ raised }, 'storage deadline flags raised');
    } catch (err) {
      logger.error({ err }, 'storage deadline scan failed');
    }
  };
  tick();
  const timer = setInterval(tick, JOBS.storageDeadlineScanMs);
  timer.unref();
  return () => clearInterval(timer);
}
