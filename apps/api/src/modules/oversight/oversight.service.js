import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import * as repo from './oversight.repository.js';

export const getOverview = (ctx) =>
  withTx(ctx.userId, async (tx) => ({
    totals: await repo.totals(tx),
    openFlags: Object.fromEntries((await repo.activeFlagCountsBySeverity(tx)).map((f) => [f.severity, f.count])),
    pickupsByStatus: Object.fromEntries((await repo.pickupCountsByStatus(tx)).map((s) => [s.status, s.count])),
    topWards: await repo.topWardsByCollectedKg(tx),
    weeklyCollectedKg: await repo.weeklyCollectedKg(tx),
    generatedAt: new Date().toISOString(),
  }));

export const listFlags = (status, ctx) => withTx(ctx.userId, (tx) => repo.listFlags(tx, status));

// Officers triage flags; they cannot change the underlying custody records (PRD v3 §16.8).
export async function updateFlag(id, { status, note }, ctx) {
  const flag = await withTx(ctx.userId, async (tx) => {
    const row = await repo.updateFlagStatus(tx, id, { status, note, userId: ctx.userId });
    if (row) await writeAudit(tx, { actor: ctx, action: 'flag.status', entity: 'flag', entityId: id, detail: { status, note } });
    return row;
  });
  if (!flag) throw Errors.conflict('flag_closed', 'This flag is closed or does not exist.');
  return flag;
}
