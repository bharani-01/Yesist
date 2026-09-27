import { contextOf } from '../../shared/context.js';
import * as service from './attestations.service.js';

export async function draft(req, res) {
  res.status(201).json({ attestation: await service.draftAttestation(req.valid.params.lotId, req.valid.body, contextOf(req)) });
}

export async function approve(req, res) {
  res.json({ attestation: await service.approveAttestation(req.valid.params.id, contextOf(req)) });
}
