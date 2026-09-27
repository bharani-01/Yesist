import { queryOne } from '../../core/db.js';

// Security-definer function returns non-personal fields only (PRD v3 §8.4).
export const findIssuedAttestation = (tx, number) =>
  queryOne(
    tx,
    `select public_number as "publicNumber", issuer_name as issuer, registration_no as "registrationNo",
            issued_at as "issuedAt", processed_kg as "processedKg", battery_kg as "batteryKg",
            unit_count as "unitCount", categories, sha256, disclaimer_version as "disclaimerVersion"
       from app.verify_attestation($1)`,
    [number],
  );
