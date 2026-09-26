# EcoSure — Integrations

**Last updated:** 2026-09-26

---

## 1. Principles

- Integrations are mediated by the Node.js backend; clients never hold provider secrets.
- Outbound side effects are idempotent (dedupe keys).
- Failures are logged, surfaced to ops, and do not corrupt domain state.
- Phase tags indicate when an integration becomes required.

---

## 2. WhatsApp (Phase 2)

### Scope
- **In scope:** Outbound template notifications for pickup status, EcoPoints, settlement/certificate alerts.
- **Out of scope (until later):** Inbound chatbot, free-form conversational AI, marketing broadcasts without consent.

### Requirements
- Meta WhatsApp Business Cloud API (default; BSP optional — OQ-40).
- User must opt in (`whatsapp_opt_in`); recording of consent timestamp.
- Templates: `pickup_status`, `pickup_scheduled`, `ecopoints_earned`, `settlement_posted`, `certificate_issued`.
- Persist `Notification` row per attempt with provider message id.
- Retry with exponential backoff; mark `failed` after N attempts; optional SMS later (OQ-44).

### Acceptance criteria
- Opted-out users never receive WhatsApp.
- Duplicate event does not send duplicate message (idempotency).
- Admin can view delivery status for support.

---

## 3. Geolocation / Maps (Phase 1)

### Purpose
- Nearby Local Shops, Regional Hubs, Professional Recyclers discovery.
- Service-radius filtering for pickup assignment.

### Approach
- Store `lat`/`lng` on Location.
- Distance query (Haversine or PostGIS if enabled).
- Map tiles / geocoding provider configurable (OQ-42).
- Consumer may enter pincode/address; geocode server-side.

### Acceptance criteria
- Results only include `approved` organizations.
- Empty state when none in radius; allow radius expand.
- Exact home address of consumer not exposed to unassigned shops.

---

## 4. Email (Phase 0–1)

- Transactional: signup verification, password reset, org approval status.
- Provider abstracted (SMTP or API).
- Same notification table / audit pattern.

---

## 5. File / document storage (Phase 3)

- Certificates, KYC docs, compliance exports.
- Storage interface: local filesystem first; S3-compatible later (OQ-61).
- Store content hash for certificates; serve via authenticated download URLs.

---

## 6. Payments / payouts (Phase 5)

- Phase 3: record settlements as accounting events (manual `paid`).
- Phase 5: optional UPI/bank payout integration.
- Never store full bank secrets in client; tokenize via provider.

---

## 7. Future (explicitly deferred)

| Integration | Notes |
|-------------|-------|
| CPCB portal auto-upload | Only after template parity validated |
| SMS gateway | Fallback channel |
| Push notifications (mobile) | If native apps introduced |
| IoT device telemetry | Not in product scope |

---

## 8. Security notes

- Rotate API keys; store in server env only.
- Webhook endpoints verify signatures.
- Rate-limit outbound messaging per user/org.
- PII minimized in template variables.
