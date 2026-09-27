# EcoSure — v2 Strengthening Changes

> **History.** This records the v1 → v2 changes. Several v2 decisions (offtake agreements, hub in phase 1, operator float, target-gap view) were replaced in v3; see [18-v3-changes.md](./18-v3-changes.md). Section references below point to v2 numbering.

**Date:** 2026-09-27  
**Why:** Field research, feasibility analysis, and the government-initiative reframe showed that v1 would not work in Tier-2/3 corridors. This file records each weakness, the fix, and where it now lives.

Sources: [`../research/00-senior-pm-research-synthesis.md`](../research/00-senior-pm-research-synthesis.md), [`../research/gov-initiative-reframe.md`](../research/gov-initiative-reframe.md), [`../research/tier2-tier3-field-issues.md`](../research/tier2-tier3-field-issues.md).

---

## 1. Weakness → fix

| # | Weakness in v1 | Fix in v2 | Where |
|---|----------------|-----------|-------|
| 1 | Framed as a private SaaS; government as optional phase-4 viewer | Government programme: SPCB sponsor, department-owned data, contracted operator | [00](./00-overview.md), [09](./09-government.md) |
| 2 | EcoPoints later lose to kabadiwala cash today | Scheme-funded UPI incentive paid at collection; EcoPoints removed | [04](./04-consumer.md) C6 |
| 3 | Monthly shop settlement starves shops | Weekly settlement within 7 days; advances; no minimum | [05](./05-local-recycle-shop.md) S5, [10](./10-workflows.md) §7 |
| 4 | GSTIN and manual approval block micro shops | Micro KYC tier, provisional operation up to 500 kg/month, 3-day decision | [02](./02-roles-rbac.md) §4, [05](./05-local-recycle-shop.md) S1 |
| 5 | Empty map at launch | Corridor launch checklist; "not live yet" + waitlist instead of empty results | [00](./00-overview.md) §8, [04](./04-consumer.md) C2 |
| 6 | English first, Hindi in phase 5 | Hindi + English at launch; corridor language before go-live | [12](./12-nfr-security.md) §4 |
| 7 | WhatsApp only in phase 2, outbound only | WhatsApp in phase 1 with inbound keywords; SMS fallback | [11](./11-integrations.md) §2–3 |
| 8 | No data-wipe step for phones | Mandatory wipe confirmation before collection | [04](./04-consumer.md) C3 |
| 9 | Address as coordinates only; society and PG gates ignored | Society, wing, landmark, gate details; drop-at-shop; society drives | [04](./04-consumer.md) C2, C8 |
| 10 | Only one reschedule | Up to 3, by WhatsApp keyword | [10](./10-workflows.md) §1 |
| 11 | No offline support | Offline collect, weigh, receive with later sync | [12](./12-nfr-security.md) §3 |
| 12 | One truck, many shops not modelled | Trip entity with multi-shop routes, freight payer | [03](./03-domain-model.md), [06](./06-regional-hub.md) H3 |
| 13 | Fixed ±5% tolerance; whole settlement held on dispute | Seasonal tolerance; undisputed weight still paid; 72-hour dispute window | [10](./10-workflows.md) §4 |
| 14 | Shops pay hub freight | Hub-paid or shared freight by default | [05](./05-local-recycle-shop.md) S7 |
| 15 | Hub could hold stock with no buyer | Offtake agreement with recycler required; dwell caps and flags | [06](./06-regional-hub.md) H1–H5 |
| 16 | Recycler only in phase 3 | Recycler in phase 1 as root of trust | [07](./07-professional-recycler.md) |
| 17 | "Certificates" could be confused with EPR certificates | Renamed custody attestations; mandatory disclaimer; public verification | [07](./07-professional-recycler.md) R4–R5 |
| 18 | No fake-paperwork controls | Authorization check, weight and capacity caps, duplicate-hash flags | [03](./03-domain-model.md) §4, [12](./12-nfr-security.md) §7 |
| 19 | Producer tools only in phase 4 | Phase 2, as soon as attestations exist | [08](./08-manufacturer.md) |
| 20 | Attribution by brand string only | Method, confidence, evidence, review queue | [08](./08-manufacturer.md) P3 |
| 21 | Any producer user could download exports | Compliance approver must approve downloads | [08](./08-manufacturer.md) P5 |
| 22 | Government "revenue and profitability" view | Removed; replaced with honest formal-network aggregates | [09](./09-government.md) |
| 23 | Platform approval could look like Board authorization | Statutory registration shown separately, SPCB can dispute | [09](./09-government.md) G4 |
| 24 | No field tools for SPCB | Offline inspection pack in state language; inspection notes | [09](./09-government.md) G5–G6 |
| 25 | Statistics implied full coverage | "Formal EcoSure network only" label everywhere | [00](./00-overview.md) §5, [09](./09-government.md) G2 |
| 26 | Build six dashboards before testing anything | 12-week manual pilot with stage gates before software | [13](./13-roadmap.md) |

---

## 2. Score after v2 (on paper)

> **Superseded (2026-09-27):** A 36-agent review against Indian law, government finance rules, and local context scored v2 at **4.6 / 10** on average. The estimate below measured only the earlier product problems. See [`../research/v2-deep/00-synthesis.md`](../research/v2-deep/00-synthesis.md).

Same scoring method as the earlier assessment.

| Dimension | Weight | v1 | v2 | Why it moved |
|-----------|-------:|---:|---:|--------------|
| Problem severity | 15% | 9 | 9 | Unchanged |
| Fit as a government initiative | 20% | 7.5 | 8 | Clear sponsor model, honest positioning |
| Stakeholder adoption | 20% | 4.5 | 6.5 | UPI, weekly pay, micro KYC, WhatsApp, Hindi |
| Economics and liquidity | 15% | 5 | 6.5 | Weekly settlement, advances, shared freight, offtake agreements |
| Regulatory and trust risk | 10% | 6 | 8 | Attestation naming, verification, fraud caps |
| Execution complexity | 10% | 5 | 6 | Pilot first, phased scope, cuts |
| Evidence maturity | 10% | 3 | 3 | Still no real customer data |
| **Weighted total** | | **5.9** | **6.9** | |

**v2 on paper: about 7 / 10.**

The design is now as strong as it can be without real data. What still caps the score:

| Remaining lever | Effect if achieved | Owner |
|-----------------|--------------------|-------|
| Sponsor confirms mandate and funding (SP-01 to SP-05) | Adoption and economics up by about 0.5 each → about 7.2 | Sponsor |
| Pilot passes week-12 gate | Evidence 3 → 7 → about 7.6 | Programme team |
| Second corridor passes checklist | Execution and evidence up → about 8 | Programme team |

A score above 8 has to be earned with pilot results, not by editing the PRD.
