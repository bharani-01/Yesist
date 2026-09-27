# EcoSure PRD Index

**Product:** EcoSure — Making Everything Count  
**Programme:** Government initiative (state-led pilot, designed to federate nationally)  
**Version:** v2 (strengthened, 2026-09-27)  
**Stack (for build):** PostgreSQL + Node.js, government-hosted

---

## Read order

| # | Document | Contents |
|---|----------|----------|
| 0 | [00-overview.md](./00-overview.md) | Programme assumptions, positioning, principles, metrics, launch checklist |
| 1 | [01-stakeholders-and-personas.md](./01-stakeholders-and-personas.md) | Stakeholders and field-grounded personas |
| 2 | [02-roles-rbac.md](./02-roles-rbac.md) | Roles, access matrix, onboarding tiers |
| 3 | [03-domain-model.md](./03-domain-model.md) | Entities, integrity rules |
| 4 | [04-consumer.md](./04-consumer.md) | Citizen PRD |
| 5 | [05-local-recycle-shop.md](./05-local-recycle-shop.md) | Local collection shop PRD |
| 6 | [06-regional-hub.md](./06-regional-hub.md) | Regional hub PRD |
| 7 | [07-professional-recycler.md](./07-professional-recycler.md) | Authorized recycler PRD |
| 8 | [08-manufacturer.md](./08-manufacturer.md) | Producer PRD |
| 9 | [09-government.md](./09-government.md) | SPCB PRD |
| 10 | [10-workflows.md](./10-workflows.md) | State machines and end-to-end flows |
| 11 | [11-integrations.md](./11-integrations.md) | WhatsApp, SMS, UPI, registries |
| 12 | [12-nfr-security.md](./12-nfr-security.md) | Security, offline, language, privacy, RTI |
| 13 | [13-roadmap.md](./13-roadmap.md) | Pilot → Phase 0–3 with stage gates |
| 14 | [14-open-questions.md](./14-open-questions.md) | Sponsor decisions, resolved and open questions |
| 15 | [15-strengthening-changes.md](./15-strengthening-changes.md) | What changed in v2, and the updated score |

---

## Locked decisions

- Government programme with SPCB as sponsor (defaults pending sponsor confirmation, see [14](./14-open-questions.md))
- 12-week manual pilot in Indore + Pithampur before any software
- UPI incentive at collection; no EcoPoints
- Weekly shop settlement within 7 days
- Recycler and custody attestations in phase 1; attestations are never EPR certificates
- Hindi + English at launch; WhatsApp in phase 1

---

## Research

- [Senior PM / research synthesis](../research/00-senior-pm-research-synthesis.md)
- [Government initiative reframe](../research/gov-initiative-reframe.md)
- [Tier-2 / Tier-3 field issues](../research/tier2-tier3-field-issues.md)
- [Idea feasibility (no UI/UX)](../research/idea-feasibility-no-ui.md)
- [Scenario matrix 24 months](../research/scenario-matrix-24mo.md)
- [Competitive / substitute analysis](../research/competitive-substitute-analysis.md)
- [Unit economics (illustrative)](../research/unit-economics-illustrative.md)
- [Regulatory / political scenarios](../research/regulatory-political-scenarios-memo.md)
- [Pilot design](../research/pilot-design.md)
- [GTM decision memo](../research/gtm-decision-memo.md)
