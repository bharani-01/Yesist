# EcoSure — Integrations

**Last updated:** 2026-09-27 (v2)

---

## 1. Principles

- All integrations run through the backend. Clients never hold provider keys.
- Side effects (messages, payouts) are idempotent.
- Failures are logged and visible to the operator; they never corrupt custody records.

---

## 2. WhatsApp — Phase 1

Moved from phase 2 to phase 1 because citizens and shops in Tier-2/3 corridors live on WhatsApp.

**Scope**
- OTP delivery.
- Outbound templates in Hindi, English, and corridor language: pickup accepted, scheduled, collector on the way, collected + incentive, sent for recycling, trip planned/arrived, dispute opened/resolved, settlement paid, rate change.
- Inbound keywords: `RESCHEDULE`, `CANCEL`, `GATE`, `HELP`, `STATUS`. Other messages go to the operator support queue.

**Requirements**
- WhatsApp Business Platform (Meta Cloud API or a government-empanelled provider).
- Opt-in recorded with timestamp; transactional and informational messages kept separate.
- Retry with backoff; SMS fallback for OTP and pickup status.
- Webhook signatures verified.

---

## 3. SMS — Phase 1
- Fallback for OTP and pickup status when WhatsApp fails or the user has no WhatsApp.
- Government-approved sender ID and templates (DLT registration).

---

## 4. UPI payouts — Phase 1
- Citizen incentives and shop settlements paid by UPI through a government-approved payment channel (for example, a public-sector bank payout API or PFMS-linked route, to be confirmed with the sponsor).
- UPI ID validated before first payout.
- Every payout has an idempotency key and a reconciliation record.
- Bank account details stored as tokens only.

---

## 5. Maps and geocoding — Phase 1
- Pincode and landmark first; coordinates optional.
- Server-side geocoding; provider configurable (open data preferred for a government programme).
- Service radius filtering for shop matching.
- Text list works without map tiles.

---

## 6. Statutory registries — Phase 1 (manual), Phase 3 (automated)
- Phase 1: operator verifies CPCB authorizations and EPR registrations manually against published lists.
- Phase 3: automated lookup if the CPCB exposes an API or data feed.
- Phase 3: optional link from an attestation to its CPCB portal EPR certificate reference.

---

## 7. Identity — Phase 1
- Phone OTP for all users.
- Aadhaar-based verification for shop owners (micro tier) through a licensed verification provider, storing only the verification result and masked number.

---

## 8. Document storage — Phase 1
- Attestations, agreements, KYC documents, exports, photos.
- Government-hosted object storage; private by default; signed, time-limited download links.
- SHA-256 stored for attestations.

---

## 9. Deferred
| Integration | Why deferred |
|-------------|--------------|
| Automatic CPCB portal submission | Portal remains the statutory system; manual filing by producers |
| GPS vehicle tracking | Location notes by WhatsApp are enough for the pilot |
| IoT scales | Photo + scale ID first |
| DigiLocker issuance of attestations | Consider after legal review in phase 3 |
