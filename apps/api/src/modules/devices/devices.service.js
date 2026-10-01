import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import { writeAudit } from '../../shared/audit.js';
import { creditDeviceAddedBonus } from '../rewards/rewards.service.js';
import * as repo from './devices.repository.js';

const CLAIM_ERRORS = {
  not_found: () => Errors.notFound('Product'),
  claimed: () => Errors.conflict('already_claimed', 'Someone else has already claimed this device.'),
  not_claimable: () => Errors.conflict('not_claimable', 'Only devices on sale or in use can be claimed. This one is already on its way to recycling.'),
};

export const listDevices = (ctx) => withTx(ctx.userId, async (tx) => {
  const [claimed, manual] = await Promise.all([
    repo.listClaimed(tx, ctx.userId),
    repo.listManual(tx, ctx.userId),
  ]);
  const combined = [...claimed, ...manual];
  combined.sort((a, b) => new Date(b.claimedAt || b.updatedAt) - new Date(a.claimedAt || a.updatedAt));
  return combined;
});

export async function claimDevice({ qr }, ctx) {
  const result = await withTx(ctx.userId, async (tx) => {
    const outcome = await repo.claim(tx, qr);
    if (outcome === 'ok') await writeAudit(tx, { actor: ctx, action: 'unit.claim', entity: 'product_unit', entityId: qr });
    return outcome;
  });
  if (CLAIM_ERRORS[result]) throw CLAIM_ERRORS[result]();
  return { status: result };
}

export async function getDeviceCertificate(qr, ctx) {
  const cert = await withTx(ctx.userId, (tx) => repo.findCertificate(tx, qr, ctx.userId));
  if (!cert) throw Errors.notFound('Certificate');
  if (!cert.issuedAt) throw Errors.conflict('not_yet_certified', 'This device has not been recycled and certified yet.');
  return cert;
}

export async function addManualDevice(input, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const device = await repo.insertManualDevice(tx, ctx.userId, input);
    await creditDeviceAddedBonus(tx, ctx.userId, device.id, `${input.brand || ''} ${input.model || ''}`.trim());
    return device;
  });
}

export async function updateDeviceStatus(idOrQr, status, ctx) {
  return withTx(ctx.userId, async (tx) => {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrQr);
    let updated = null;
    if (isUuid) {
      updated = await repo.updateManualDeviceStatus(tx, ctx.userId, idOrQr, status);
    } else {
      updated = await repo.updateClaimedUnitStatus(tx, ctx.userId, idOrQr, status);
    }
    if (!updated) throw Errors.notFound('Device');

    await writeAudit(tx, {
      actor: ctx,
      action: status === 'recycled' ? 'device.recycle' : 'device.activate',
      entity: 'device',
      entityId: idOrQr,
      detail: { status },
    });

    return updated;
  });
}
