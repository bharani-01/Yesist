import * as service from './verification.service.js';

export async function verifyAttestation(req, res) {
  const attestation = await service.verifyAttestation(req.valid.params.number);
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ attestation });
}
