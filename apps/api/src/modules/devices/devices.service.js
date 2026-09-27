import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import * as repo from './devices.repository.js';

const CLAIM_ERRORS = {
  not_found: () => Errors.notFound('Product'),
  claimed: () => Errors.conflict('already_claimed', 'Someone else has already claimed this device.'),
  not_claimable: () => Errors.conflict('not_claimable', 'Only devices on sale or in use can be claimed. This one is already on its way to recycling.'),
};

export const listDevices = (ctx) => withTx(ctx.userId, (tx) => repo.listClaimed(tx, ctx.userId));

export async function claimDevice({ qr }, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const outcome = await repo.claim(tx, qr);
    if (outcome === 'ok') await writeAudit(tx, { actor: ctx, action: 'unit.claim', entity: 'product_unit', entityId: qr });
    return outcome;
  });
  if (CLAIM_ERRORS[result]) throw CLAIM_ERRORS[result]();
  return { status: result };
}
