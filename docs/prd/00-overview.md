# EcoSure — Product Overview

**Product name:** EcoSure  
**Brand tagline:** Making Everything Count  
**Document type:** Master Product Requirements Document (PRD)  
**Status:** Approved for documentation phase  
**Last updated:** 2026-09-26

---

## 1. Vision

EcoSure is an all-in-one e-waste management SaaS platform that connects consumers, local recycle shops, regional hubs, professional recyclers, manufacturers, and government agencies into one auditable chain of custody — so every device collected, transferred, processed, and certified can be measured, rewarded, and reported.

---

## 2. Problem Statement

India generates tens of millions of tonnes of waste annually, with a large share ending in landfills, waterways, and informal channels. Within that landscape, **e-waste** is especially high-impact: hazardous materials, recoverable rare metals, and regulatory obligations under Extended Producer Responsibility (EPR).

Current gaps:

1. **Fragmented collection** — Individuals and businesses lack a trusted, trackable path from discard to certified recycling.
2. **Poor segregation and awareness** — Improper disposal stems from missing education and unclear local options.
3. **No connected ecosystem** — Stakeholders cannot share pickup status, material lots, settlements, or compliance evidence in one system.
4. **Hard-to-measure impact** — Without chain-of-custody data, sustainability efforts and EPR claims cannot be verified.

EcoSure focuses on **e-waste** (not general municipal solid waste), while remaining extensible for adjacent recyclable streams later.

---

## 3. Solution

EcoSure provides role-specific dashboards on a shared platform:

| Stakeholder | Primary value |
|-------------|---------------|
| Consumer | Device inventory, pickup scheduling, education, EcoPoints |
| Local Recycle Shop | Inbound pickup management, collection stats, hub settlements |
| Regional Hub | Aggregation, shop/business intake, settlements, regional stats |
| Professional Recycler | Downstream processing, certificates, EPR documentation support |
| Manufacturer | Product e-waste footprint, EPR / CPCB / SPCB reporting |
| Government Agency | Aggregate monitoring, compliance visibility, education |
| Platform Admin | Org approval, KYC, disputes, configuration (internal) |

Future technical foundation (not built in this documentation phase):

- **Local PostgreSQL** as the system of record
- **Node.js** secure API with authentication and RBAC
- Single idempotent **`schema.sql`** representing production database state
- Real operational data only (no mock/fake business data in production features)

---

## 4. Goals and Success Metrics

### 4.1 Product goals

- Make responsible e-waste disposal the easiest path for consumers and SMBs.
- Create an auditable chain of custody from pickup to certified processing.
- Enable fair settlements across shops, hubs, and recyclers.
- Support manufacturer EPR reporting and regulator visibility.
- Incentivize participation via EcoPoints without compromising ledger integrity.

### 4.2 Success metrics (targets to refine at launch)

| Metric | Description | Phase |
|--------|-------------|-------|
| Active consumers | Monthly active users with ≥1 device or pickup | 1 |
| Pickup completion rate | `collected` / `requested` within SLA window | 1 |
| Chain completeness | % of pickups with unbroken custody events | 1–3 |
| Time-to-settle | Median days from `processed` to `settled` | 3 |
| EcoPoints earn rate | Points earned per completed recycle event | 2 |
| Certificate issuance | Certificates issued per processed lot | 3 |
| Manufacturer report export | Successful CPCB/SPCB-ready exports | 4 |
| Regulator coverage | Agencies with read access to aggregate dashboards | 4 |

---

## 5. In Scope (product documentation)

- Six stakeholder dashboards and Platform Admin capabilities
- Domain model, RBAC, workflows, integrations, NFRs
- Phased implementation roadmap (Phases 0–5)
- Explicit open questions for unresolved commercial/legal choices

---

## 6. Out of Scope (this phase and near-term product)

- Application code, UI implementation, and live deployments
- General municipal waste (wet/dry MSW) as a first-class domain
- Legal certification that reports satisfy all CPCB/SPCB formats without expert review
- Instant payout rails and banking partnerships at Phase 0–1
- WhatsApp chatbot / conversational AI (Phase 1 is outbound notifications only)
- Carbon credit marketplace

---

## 7. Assumptions

1. India is the primary geography; INR and Indian regulatory framing apply.
2. Organizations (shops, hubs, recyclers, manufacturers, agencies) require onboarding and approval before operational use.
3. Consumers may self-register with lighter KYC than commercial orgs.
4. Pricing, scrap category rates, and EcoPoints redemption partners will be configured by Platform Admin (details in open questions).
5. Local PostgreSQL + Node.js is the intended stack until an explicit migration decision.

---

## 8. Constraints

- Least-privilege access: no role sees another org’s financials unless explicitly authorized.
- Compliance documents must be immutable once issued (append-only audit trail).
- PII handling must align with India’s DPDP Act principles (purpose limitation, access control, retention).
- Every data-driven screen must define loading, empty, success, error, unauthorized, and forbidden states.

---

## 9. Gap Analysis (draft PRD → this document set)

The original brief was a strong vision statement. Gaps closed by this PRD set:

| Gap in draft | How addressed |
|--------------|---------------|
| No user stories / acceptance criteria | Role PRDs `04`–`09` |
| No data model | `03-domain-model.md` |
| No RBAC matrix | `02-roles-rbac.md` |
| Undefined pickup states | `10-workflows.md` |
| Undefined EcoPoints rules | `04-consumer.md`, `10-workflows.md`, `14-open-questions.md` |
| Vague WhatsApp scope | `11-integrations.md` |
| Vague EPR / CPCB / SPCB | `08-manufacturer.md`, `07-professional-recycler.md` |
| Payouts without pricing model | Domain + open questions |
| Problem framed as general waste | Reframed to e-waste / EPR |
| Missing NFRs / privacy | `12-nfr-security.md` |
| Missing Platform Admin | Personas + RBAC |

---

## 10. Glossary

| Term | Definition |
|------|------------|
| **E-waste** | Discarded electrical and electronic equipment (EEE) and components |
| **EPR** | Extended Producer Responsibility — producers account for end-of-life of products they place on market |
| **CPCB** | Central Pollution Control Board (India) |
| **SPCB** | State Pollution Control Board |
| **Chain of custody** | Ordered, auditable record of possession of material from collection through processing |
| **Pickup request** | Consumer/business request for e-waste collection |
| **Material lot** | Batch of collected e-waste with weight/category metadata |
| **Transfer** | Movement of a lot between organizations (shop → hub → recycler) |
| **Settlement** | Financial reconciliation for collected/processed material between parties |
| **EcoPoints** | Incentive ledger units earned for verified recycling actions |
| **Certificate** | Formal document attesting processing/recycling of a lot (compliance evidence) |
| **Organization** | Legal or operational entity on the platform (shop, hub, recycler, manufacturer, agency) |
| **Platform Admin** | Internal EcoSure operator role for approvals, config, and dispute resolution |

---

## 11. Document map

See [README.md](./README.md) for the full index of PRD documents.
