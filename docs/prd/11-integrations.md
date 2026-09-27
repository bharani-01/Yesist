# EcoSure — Integrations

**Last updated:** 2026-09-27 (v3)

---

## 1. Principles

- All integrations run through the backend. Clients never hold provider keys.
- Side effects (messages, payouts) are idempotent.
- Failures are logged and visible to the operator; they never corrupt custody records.
- Every provider stores data in India and signs a data processing agreement (DPDP).

---

## 2. Messaging — Phase 1a

### SMS
- OTP, payment confirmations, and handover codes. Always available as the fallback.
- TRAI DLT registration: government entity, approved sender ID and templates.

### WhatsApp
- Onboarded as a government entity through a Meta Business Solution Provider, with India data storage selected at registration.
- Outbound templates in Hindi and English: pickup status, handover code, collected, recycled, trip and seal alerts, disputes, settlements, rate changes, weekly digests.
- Inbound keywords: `RESCHEDULE`, `CANCEL`, `GATE`, `HELP`, `STATUS`, `SAFETY`.
- Opt-in recorded with timestamp; webhook signatures verified; retry with backoff.

### Voice
- Missed-call number with operator call-back.
- IVR booking and status in Hindi, using CM Helpline 181 infrastructure where the sponsor agrees, or a government-empanelled telephony provider.
- Masked calling between collector and citizen.

---

## 3. Payments — Phase 1a

| Rail | Money | Route |
|------|-------|-------|
| Scheme incentive | Public money | State treasury system (IFMIS) and PFMS daily batches to bank or UPI-linked accounts |
| Material reimbursement and advances | Recycler money | Recycler-funded bank escrow, paid by bank API or UPI |
| Producer top-ups | Producer money | Producer-funded escrow |

- The operator never holds funds. Escrow is held by a scheduled bank under a tripartite agreement.
- Account validation (penny-drop or name match) before the first payout.
- Every payout has an idempotency key and daily reconciliation.
- Bank details stored as tokens only.

---

## 4. Identity — Phase 1a
- Phone OTP for all users.
- Any-of ID check for agents: DigiLocker, Aadhaar offline QR (verified locally, number not stored), in-person document check, NAMASTE ID, or e-Shram card.
- Store only the result, method, and date.

---

## 5. Connected devices (IoT) — Phase 1a (scales), 1b (vehicle GPS), 2 (bin sensors)

| Device | Use | Integration |
|--------|-----|-------------|
| Weighing scale | Sender and receiver weights | Bluetooth or USB scale read by the field app; readings signed by the app with the device key; Legal Metrology calibration certificate on file |
| Vehicle GPS | Trip route evidence | AIS-140 devices already fitted to commercial vehicles, or the state vehicle location tracking platform, via provider API |
| Bin fill sensor | Drop-point collection trigger | LoRaWAN or cellular sensor sending fill level to the backend; used only for trip planning |

- Every device is registered to an organization with its calibration or certificate details.
- Readings are stored with device time and receive time. Unsigned or expired-calibration readings are kept but not used for settlement.
- Manual entry with a photo is always allowed so the chain never stops when a device fails.

---

## 6. Product identifiers — Phase 1a (scan), 1b (producer upload)
- Camera scanning of IMEI barcodes, serial barcodes, and EcoSure QR codes in the field app (offline).
- EcoSure QR codes use GS1 Digital Link style URLs so producers can print them with existing packaging systems.
- Producer bulk upload (CSV) and API with keyed hashing on arrival.
- Optional referral link to the Department of Telecommunications' CEIR portal for lost or stolen phones; no data exchange.

---

## 7. Statutory and government systems

| System | Phase | Integration |
|--------|-------|-------------|
| CPCB EPR portal | 1a manual, 3 API if offered | Operator verifies registrations against published lists; recyclers and producers enter certificate references |
| MPPCB consent data | 1a | Capacity and consent validity entered from consent orders; automated when a feed exists |
| MPPCB Central Inspection System | 1b | Link flags to inspection records by reference |
| CM Dashboard (MPSEDC) | 1b | KPI feed |
| data.gov.in | 2 | Monthly open data publication |
| GeM / MSTC | 1a | Record disposal reference for government office e-auctions |
| NAMASTE / e-Shram | 1a | Accept IDs as KYC; link to welfare referral information |

---

## 8. Maps and geocoding — Phase 1a
- Pincode, ward, and landmark first; coordinates optional.
- Server-side geocoding with a configurable provider (government or open data preferred).
- Text list works without map tiles.

---

## 9. Document storage — Phase 1a
- Attestations, agreements, KYC results, packs, photos.
- Government-hosted object storage; private by default; signed, time-limited download links.
- SHA-256 and digital signatures for attestations.

---

## 10. Deferred
| Integration | Why deferred |
|-------------|--------------|
| Automatic CPCB portal submission | Portal is the statutory system; producers file themselves |
| DigiLocker issuance of attestations | After legal review, phase 3 |
| RFID seal tags | Numbered tamper-evident seals first |
