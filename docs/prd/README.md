# EcoSure PRD Document Index

**Product:** EcoSure — Making Everything Count  
**Purpose:** Complete product requirements for the e-waste management SaaS platform  
**Stack (future build):** Local PostgreSQL + Node.js (custom auth/RBAC)  
**Documentation status:** Complete for planning; application code not included

---

## Read order

| # | Document | Description |
|---|----------|-------------|
| 0 | [00-overview.md](./00-overview.md) | Vision, problem, goals, glossary, gap analysis |
| 1 | [01-stakeholders-and-personas.md](./01-stakeholders-and-personas.md) | Personas and stakeholder map |
| 2 | [02-roles-rbac.md](./02-roles-rbac.md) | Role capability matrix and denials |
| 3 | [03-domain-model.md](./03-domain-model.md) | Entities and relationships |
| 4 | [04-consumer.md](./04-consumer.md) | Consumer dashboard PRD |
| 5 | [05-local-recycle-shop.md](./05-local-recycle-shop.md) | Local Recycle Shop PRD |
| 6 | [06-regional-hub.md](./06-regional-hub.md) | Regional Hub PRD |
| 7 | [07-professional-recycler.md](./07-professional-recycler.md) | Professional Recycler PRD |
| 8 | [08-manufacturer.md](./08-manufacturer.md) | Manufacturer PRD |
| 9 | [09-government.md](./09-government.md) | Government Agency PRD |
| 10 | [10-workflows.md](./10-workflows.md) | State machines and end-to-end flows |
| 11 | [11-integrations.md](./11-integrations.md) | WhatsApp, maps, storage, payments |
| 12 | [12-nfr-security.md](./12-nfr-security.md) | Security, privacy, NFRs |
| 13 | [13-roadmap.md](./13-roadmap.md) | Phased implementation plan |
| 14 | [14-open-questions.md](./14-open-questions.md) | Unresolved decisions and defaults |

---

## Locked decisions

- **This phase:** PRD documents only (no application code)
- **Database:** Local PostgreSQL
- **Phase 1 MVP roles:** Consumer, Local Recycle Shop, Regional Hub
- **Later roles:** Professional Recycler (Phase 3), Manufacturer + Government (Phase 4)

---

## Quality bar

Each role feature includes description, user stories, acceptance criteria, data touched, permissions, UI states, and phase tags.

## Related research

- [**Gov initiative reframe**](../research/gov-initiative-reframe.md) — **READ FIRST if EcoSure is a government programme**
- [**Senior PM / research synthesis**](../research/00-senior-pm-research-synthesis.md) — multi-angle validation, pivot decision
- [Tier-2 / Tier-3 India field issues](../research/tier2-tier3-field-issues.md)
- [Idea feasibility (no UI/UX)](../research/idea-feasibility-no-ui.md)
- [Scenario matrix 24mo](../research/scenario-matrix-24mo.md)
- [Competitive / substitute analysis](../research/competitive-substitute-analysis.md)
- [Unit economics (illustrative)](../research/unit-economics-illustrative.md)
- [Regulatory / political scenarios](../research/regulatory-political-scenarios-memo.md)
- [Pilot design (WoZ)](../research/pilot-design.md)
- [GTM decision memo](../research/gtm-decision-memo.md)
- [12-week pilot / test design](../research/pilot-design.md) — learning-first Indore WoZ plan; kill criteria; no product build yet
