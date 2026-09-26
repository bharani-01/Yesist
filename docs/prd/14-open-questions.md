# EcoSure — Open Questions

**Status:** Unresolved product / commercial / legal decisions  
**Last updated:** 2026-09-26

These items must be answered before or during the phase noted. Until resolved, PRDs use documented defaults.

---

## Pricing and settlements

| ID | Question | Default (until decided) | Needed by |
|----|----------|-------------------------|-----------|
| OQ-01 | How are scrap category rates set (platform-wide vs hub-negotiated)? | Platform Admin configures category rate cards; hubs may apply regional multipliers | Phase 3 |
| OQ-02 | Settlement cycle (weekly, biweekly, monthly)? | Monthly settlement batches | Phase 3 |
| OQ-03 | Who pays whom in Consumer → Shop → Hub → Recycler? | Recycler pays Hub; Hub pays Shop; Consumer earns EcoPoints (not cash) in Phase 1–2 | Phase 3 |
| OQ-04 | Minimum weight / value thresholds for settlement? | Configurable; default 5 kg or ₹500 equivalent | Phase 3 |
| OQ-05 | Dispute window after settlement posting? | 14 calendar days | Phase 5 |

---

## EcoPoints

| ID | Question | Default | Needed by |
|----|----------|---------|-----------|
| OQ-10 | Points per kg vs per device category? | Hybrid: base points by category + weight bonus | Phase 2 |
| OQ-11 | Redemption partners (gift cards, vouchers, donations)? | Start with internal catalog placeholders; integrate partners later | Phase 2 |
| OQ-12 | Point expiry? | 24 months from earn date | Phase 2 |
| OQ-13 | Can businesses earn EcoPoints? | Consumers only in Phase 2; businesses later | Phase 2 |
| OQ-14 | Anti-fraud rules (duplicate devices, fake pickups)? | Points credit only after `collected` + verified weight; admin clawback | Phase 2 |

---

## Onboarding and KYC

| ID | Question | Default | Needed by |
|----|----------|---------|-----------|
| OQ-20 | Consumer KYC level? | Phone + email verification; optional Aadhaar/ID later | Phase 0 |
| OQ-21 | Commercial org documents required? | GSTIN, address proof, authorized person ID; recycler: valid authorization/consent docs | Phase 0–1 |
| OQ-22 | Auto-approve vs manual approve for shops/hubs? | Manual Platform Admin approval before operational pickups | Phase 1 |
| OQ-23 | Multi-location orgs (one org, many sites)? | Supported via Location entities under Organization | Phase 1 |

---

## Compliance and reporting

| ID | Question | Default | Needed by |
|----|----------|---------|-----------|
| OQ-30 | Exact CPCB/SPCB export templates? | Export structured CSV/PDF using fields defined in manufacturer PRD; map to official templates with domain expert | Phase 4 |
| OQ-31 | Certificate legal wording and signatory? | Platform-generated certificate with recycler org stamp metadata; wet signature optional upload | Phase 3 |
| OQ-32 | Retention period for compliance artifacts? | 7 years (configurable) | Phase 3–4 |
| OQ-33 | Government write actions (orders, notices)? | Read + feedback only in Phase 4; enforcement write later | Phase 4 |

---

## Integrations

| ID | Question | Default | Needed by |
|----|----------|---------|-----------|
| OQ-40 | WhatsApp Business provider (Meta Cloud API vs BSP)? | Meta Cloud API via Node service; outbound templates only | Phase 2 |
| OQ-41 | Inbound WhatsApp chatbot? | Out of scope until post-Phase 2 | Later |
| OQ-42 | Maps provider for nearby search? | Configurable (e.g., OpenStreetMap Nominatim or Google Maps) | Phase 1 |
| OQ-43 | Payment / payout rail? | Manual settlement recording first; UPI/bank payout later | Phase 5 |
| OQ-44 | SMS fallback if WhatsApp fails? | Log failure; optional SMS Phase 5 | Phase 5 |

---

## Product scope

| ID | Question | Default | Needed by |
|----|----------|---------|-----------|
| OQ-50 | Include B2B bulk pickups in Phase 1? | Yes for businesses registered as manufacturers/other orgs requesting pickup via shop/hub | Phase 1 |
| OQ-51 | Device “usage tracking” depth (runtime telemetry vs manual status)? | Manual device registry + status (in use / idle / ready to dispose); no IoT telemetry | Phase 1 |
| OQ-52 | Expand beyond e-waste? | Explicitly deferred | Later |
| OQ-53 | Multi-language (Hindi + English) at MVP? | English UI first; i18n hooks; Hindi Phase 5 | Phase 5 |

---

## Technical

| ID | Question | Default | Needed by |
|----|----------|---------|-----------|
| OQ-60 | Migrate Local PostgreSQL → managed Postgres/Supabase later? | Stay local until ops need managed HA | Open |
| OQ-61 | File storage for certificates/docs? | Local object storage / filesystem abstraction; S3-compatible later | Phase 3 |
| OQ-62 | Realtime updates (pickup status)? | Polling + optional WebSocket later; not required for Phase 1 | Phase 5 |

---

## Decision log

| Date | ID | Decision | Owner |
|------|-----|----------|-------|
| 2026-09-26 | Stack | Local PostgreSQL + Node.js (not Supabase for now) | Product |
| 2026-09-26 | Docs | PRD documents only this phase | Product |
| 2026-09-26 | MVP roles | Phase 1 = Consumer + Local Shop + Regional Hub | Product |

When a question is resolved, move it here and update the relevant PRD.
