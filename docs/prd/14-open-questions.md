# EcoSure — Open Questions and Decisions

**Last updated:** 2026-09-27 (v2)

---

## 1. Sponsor decisions (needed before Phase 0)

The PRD uses the defaults below. Each must be confirmed in writing by the sponsor.

| ID | Question | Default used in PRD |
|----|----------|---------------------|
| SP-01 | Which body owns EcoSure? | State SPCB with state IT department |
| SP-02 | Is participation mandatory for anyone? | Pilot recyclers and producers join by SPCB direction or MoU; others voluntary |
| SP-03 | Relationship to CPCB EPR portal | Upstream evidence only; portal remains statutory truth |
| SP-04 | Who funds citizen incentives and shop float? | Scheme budget plus producer take-back pool |
| SP-05 | Who runs operations? | Department owns platform; contracted field operator under SLA |
| SP-06 | Hosting | State data centre or empanelled cloud |
| SP-07 | Payout channel | Public-sector bank payout API or PFMS-linked route |
| SP-08 | Approved legal text for attestation disclaimer | Draft in [10-workflows.md](./10-workflows.md) section 6, pending legal review |
| SP-09 | Kill criteria the sponsor accepts | Pilot gates in [13-roadmap.md](./13-roadmap.md) |
| SP-10 | Pilot geography | Indore + Pithampur |

---

## 2. Resolved in v2

| ID | Topic | Decision |
|----|-------|----------|
| OQ-02 | Settlement cycle | Weekly; shops paid within 7 days of hub receipt |
| OQ-03 | Who pays whom | Recycler → hub → shop; citizens receive scheme-funded UPI incentive |
| OQ-04 | Minimum settlement | None; balances carry forward |
| OQ-05 | Dispute window | Weight: 72 hours from receipt, resolved in 5 working days. Payment: 7 days from paid |
| OQ-10–14 | EcoPoints | Removed. Replaced by UPI incentive with per-person limits |
| OQ-20 | Citizen KYC | Phone OTP only |
| OQ-21 | Shop documents | Micro tier without GSTIN, provisional cap 500 kg/month; standard tier with full documents |
| OQ-22 | Approval | Provisional operation while reviewed; decision within 3 working days |
| OQ-31 | Certificate naming | "Custody attestation" with mandatory disclaimer; never "certificate" |
| OQ-33 | Government write actions | Inspection notes only; no edits to operational records |
| OQ-40 | WhatsApp | Phase 1, with inbound keywords |
| OQ-44 | SMS fallback | Phase 1 |
| OQ-53 | Languages | Hindi + English at launch; corridor language before each corridor goes live |
| OQ-62 | Realtime | Not needed; WhatsApp notifications and offline sync cover the need |

---

## 3. Still open

| ID | Question | Working default | Needed by |
|----|----------|-----------------|-----------|
| OQ-01 | Rate card method | Operator sets weekly per category, informed by street rates and recycler offtake prices | Pilot week 1 |
| OQ-70 | Citizen incentive amounts per category | Set from pilot data; start with a flat amount per data-bearing device and per kg for others | Pilot week 1 |
| OQ-71 | Advance cap for new shops | 20% of expected weekly value until 4 weeks of history | Pilot week 2 |
| OQ-72 | Weight tolerance defaults | 5% normal, 8% monsoon; adjusted per corridor from pilot data | Pilot week 4 |
| OQ-30 | CPCB/SPCB worksheet templates | Map to current portal fields; compliance expert sign-off per version | Phase 2 |
| OQ-73 | Attribution rules for mixed lots | Brand match + bulk declaration; low confidence goes to review | Phase 2 |
| OQ-32 | Retention | 7 years compliance; 3 years operational personal data | Phase 0 |
| OQ-74 | Informal collectors | Allow informal collectors to join as micro-tier shops; do not estimate informal volumes in official views | Pilot |
| OQ-75 | Operator contract | SLA metrics: payment time, dispute resolution time, pickup completion | Before pilot |

---

## 4. Decision log

| Date | Decision |
|------|----------|
| 2026-09-26 | Stack: PostgreSQL + Node.js |
| 2026-09-26 | Documentation phase before code |
| 2026-09-27 | EcoSure is a government initiative |
| 2026-09-27 | v2: pilot before software; UPI incentive replaces EcoPoints; weekly settlement; recycler and attestations in phase 1; producers in phase 2; SPCB as core stakeholder |
