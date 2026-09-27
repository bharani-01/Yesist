import { withTx } from '../../core/db.js';
import { Errors } from '../../core/errors.js';
import * as repo from './verification.repository.js';

export async function verifyAttestation(number) {
  const attestation = await withTx(null, (tx) => repo.findIssuedAttestation(tx, number));
  if (!attestation) throw Errors.notFound('Attestation');
  return attestation;
}
