# EcoSure PRD Index

**Product:** EcoSure — Making Everything Count  
**Programme:** Government initiative (Madhya Pradesh pilot in Indore, built to national standards)  
**Problem statement:** IEEE YESIST12 IEngage — Sustainable E-Waste Tracking & Recovery Platform for India  
**Version:** v3 (2026-09-27)  
**Stack (for build):** PostgreSQL + Node.js, government-hosted

---

## Start here

**[v3-PRD.md](./v3-PRD.md)** — the complete v3 PRD in one document: every idea, fix, and change, with the reasoning and research behind each decision. The topic files below are the working reference for each area.

## Read order

| # | Document | Contents |
|---|----------|----------|
| 0 | [00-overview.md](./00-overview.md) | Programme assumptions, positioning, principles, KPIs, launch checklist |
| 1 | [01-stakeholders-and-personas.md](./01-stakeholders-and-personas.md) | Stakeholders and personas |
| 2 | [02-roles-rbac.md](./02-roles-rbac.md) | Roles, access matrix, onboarding tiers |
| 3 | [03-domain-model.md](./03-domain-model.md) | Entities, integrity rules |
| 4 | [04-consumer.md](./04-consumer.md) | Citizen and bulk consumer PRD |
| 5 | [05-local-recycle-shop.md](./05-local-recycle-shop.md) | Collection agents PRD (shops, informal collectors, drop points) |
| 6 | [06-regional-hub.md](./06-regional-hub.md) | Regional hub PRD (now built as an optional, recycler-owned stop; see [19](./19-build-changes.md)) |
| 7 | [07-professional-recycler.md](./07-professional-recycler.md) | Authorized recycler PRD |
| 8 | [08-manufacturer.md](./08-manufacturer.md) | Producer PRD |
| 9 | [09-government.md](./09-government.md) | SPCB, CPCB, and city PRD |
| 10 | [10-workflows.md](./10-workflows.md) | State machines and end-to-end flows |
| 11 | [11-integrations.md](./11-integrations.md) | Messaging, payments, IoT, identifiers, government systems |
| 12 | [12-nfr-security.md](./12-nfr-security.md) | Security, compliance baseline, privacy, offline, reliability |
| 13 | [13-roadmap.md](./13-roadmap.md) | Stage −1 → pilot → phases 0–3, budget and volume gates |
| 14 | [14-open-questions.md](./14-open-questions.md) | Sponsor decisions, resolved and open questions |
| 15 | [15-strengthening-changes.md](./15-strengthening-changes.md) | What changed in v2 (history) |
| 16 | [16-product-passport.md](./16-product-passport.md) | Product passport and lifecycle tracking |
| 17 | [17-problem-statement-alignment.md](./17-problem-statement-alignment.md) | Problem statement traceability matrix |
| 18 | [18-v3-changes.md](./18-v3-changes.md) | What changed in v3 |
| 19 | [19-build-changes.md](./19-build-changes.md) | Changes made during the build: hub in scope, manufacturer and custody separation |

---

## Locked decisions

- Real government programme: joint Environment + Urban Development order, IMC co-sponsor, MPSEDC technology agency (pending sponsor confirmation, see [14](./14-open-questions.md))
- Product passport from manufacture or import; legacy passports at collection
- Collectors are documented agents of registered recyclers; intact items only; 180-day cap
- Recycler escrow for material value; treasury batches for incentives; no operator float
- Handover code triggers the incentive
- CPCB portal is statutory truth; attestations are never EPR certificates
- Problem statement KPIs are the primary success measures
- Hindi default; voice and WhatsApp channels

---

## Research

- [**v3 real-life simulations (18 agents): stakeholder, stress, Monte Carlo, judges**](../research/v3-sim/00-synthesis.md)
- [**v2 deep research (36 agents): government norms, adoption, performance**](../research/v2-deep/00-synthesis.md)
- [Senior PM / research synthesis](../research/00-senior-pm-research-synthesis.md)
- [Government initiative reframe](../research/gov-initiative-reframe.md)
- [Tier-2 / Tier-3 field issues](../research/tier2-tier3-field-issues.md)
- [Idea feasibility (no UI/UX)](../research/idea-feasibility-no-ui.md)
- [Scenario matrix 24 months](../research/scenario-matrix-24mo.md)
- [Competitive / substitute analysis](../research/competitive-substitute-analysis.md)
- [Unit economics (illustrative)](../research/unit-economics-illustrative.md)
- [Regulatory / political scenarios](../research/regulatory-political-scenarios-memo.md)
- [Pilot design](../research/pilot-design.md) (written for v2; the v3 agent model changes it)
- [GTM decision memo](../research/gtm-decision-memo.md)
