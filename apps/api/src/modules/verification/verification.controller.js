import * as service from './verification.service.js';

export async function verifyAttestation(req, res) {
  const attestation = await service.verifyAttestation(req.valid.params.number);
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ attestation });
}

export async function productJourney(req, res) {
  const product = await service.productJourney(req.valid.params.qr);
  res.set('Cache-Control', 'public, max-age=30');
  res.json({ product });
}
