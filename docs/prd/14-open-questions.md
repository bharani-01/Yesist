# EcoSure — Open Questions and Decisions

**Last updated:** 2026-09-27 (v3)

---

## 1. Sponsor decisions (needed in Stage −1)

The PRD uses the defaults below. Each must be confirmed in writing.

| ID | Question | Default used in PRD |
|----|----------|---------------------|
| SP-01 | Who owns EcoSure? | Joint order: Environment Department (with MPPCB) and Urban Development (with IMC); MPSEDC as technology agency |
| SP-02 | Legal basis for collectors | MPPCB direction recognising agents of CPCB-registered recyclers and producers |
| SP-03 | Relationship to CPCB EPR portal | Evidence layer only; portal remains statutory truth |
| SP-04 | Incentive funding | State scheme budget through treasury and PFMS; producer top-ups through escrow |
| SP-05 | Operations | Department owns; field operator and software vendor contracted separately |
| SP-06 | Hosting | MeitY-empanelled government cloud or state data centre |
| SP-07 | Escrow bank and agreement | Scheduled bank, tripartite agreement with recycler and department |
| SP-08 | Attestation disclaimer text | Draft in [10-workflows.md](./10-workflows.md) section 5, pending legal review |
| SP-09 | Kill criteria | Pilot gates and volume gates in [13-roadmap.md](./13-roadmap.md) |
| SP-10 | Pilot geography | Indore city only |
| SP-11 | CM Helpline 181 for IVR booking | Reuse if the department agrees |
| SP-12 | Public information officer | Named officer in the sponsoring department |

---

## 2. Resolved in v3

| ID | Topic | Decision |
|----|-------|----------|
| V3-01 | Product tracking | Product passport from manufacture or import; legacy passports at collection |
| V3-02 | Identifier storage | Keyed hashes only; last 4 characters shown |
| V3-03 | Collector legal status | Agent of a registered recycler or producer; intact items only; 180-day cap |
| V3-04 | Batteries | Embedded batteries travel with devices; loose or damaged batteries refused and referred |
| V3-05 | Payment rails | Recycler escrow for material value; treasury batches for incentives; no operator float |
| V3-06 | Incentive trigger | Handover code + weigh record |
| V3-07 | Hub | Not in pilot; recycler-owned in phase 2 |
| V3-08 | Producer value | Registry, certificate provenance, audit and BRSR packs; no target-gap view |
| V3-09 | IoT | Connected scales (1a), vehicle GPS (1b), bin sensors (2); manual fallback always |
| V3-10 | Realtime | Needed for regulators: analytics ≤ 15 minutes, flags within 1 minute (replaces v2 OQ-62) |
| V3-11 | KYC | Any-of ID; Aadhaar never mandatory |
| V3-12 | Relationship to IMC | Co-sponsor; IMC flow logged as drop point |
| V3-13 | KPIs | Problem statement KPIs are primary |
| V3-14 | RTI | Public information officer decides; operator prepares |

Still valid from v2: weekly reimbursement within 7 days; no minimum settlement; weight disputes within 72 hours resolved in 5 working days; "custody attestation" naming; regulators cannot edit records; Hindi and English at launch.

---

## 3. Still open

| ID | Question | Working default | Needed by |
|----|----------|-----------------|-----------|
| OQ-70 | Incentive amounts per category | Flat per data-bearing device, per kg for others; set from pilot data | Pilot week 1 |
| OQ-71 | Advance cap for new agents | 20% until 4 weeks of history | Pilot week 2 |
| OQ-72 | Weight tolerance | 5% normal, 8% monsoon | Pilot week 4 |
| OQ-76 | Unit scan sampling rates | 100% under 200 phones and laptops; 10% sample otherwise | Pilot week 4 |
| OQ-77 | Drive dispatch threshold | 150 kg | Pilot week 2 |
| OQ-78 | Informal processing baseline survey method | Sample of 50 collectors before and after | Stage −1 |
| OQ-79 | Producer registry format | CSV + API; align with any CPCB or BIS identifier guidance | Phase 1b |
| OQ-80 | Material recovery categories | Align with CPCB recycler return fields | Phase 1b |
| OQ-81 | Model Code of Conduct dates | Check Indore municipal election schedule | Stage −1 |
| OQ-82 | Facts marked UNVERIFIED in the 36-agent review | Verify before sponsor sign-off (see [`../research/v2-deep/00-synthesis.md`](../research/v2-deep/00-synthesis.md) section 6) | Stage −1 |

---

## 4. Decision log

| Date | Decision |
|------|----------|
| 2026-09-26 | Stack: PostgreSQL + Node.js |
| 2026-09-26 | Documentation phase before code |
| 2026-09-27 | EcoSure is a government initiative |
| 2026-09-27 | v2: pilot before software; UPI incentive; weekly settlement; recycler in phase 1; SPCB core |
| 2026-09-27 | v3: aligned to IEEE YESIST12 problem statement and 36-agent norms review; real government programme |
