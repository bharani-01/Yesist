# EcoSure — Problem Statement Alignment

**Problem statement:** IEEE YESIST12 IEngage Track — Sustainable E-Waste Tracking & Recovery Platform for India  
**Last updated:** 2026-09-27 (v3)

This document maps every requirement in the problem statement to where EcoSure v3 meets it.

---

## 1. Objectives

| # | Problem statement objective | EcoSure v3 | Where |
|---|------------------------------|------------|-------|
| 1 | Digital tracking of electronic products from manufacturing / import to disposal | Product passport: producer unit registry, placed-on-market batches, citizen claims, legacy passports at collection, lifecycle events through to material recovery | [16](./16-product-passport.md), [08](./08-manufacturer.md) P2–P3 |
| 2 | Integrate formal and informal sector participants | Informal collectors and kabadi shops as micro-tier agents of registered recyclers; NAMASTE / e-Shram IDs accepted; IMC and PRO drop points | [05](./05-local-recycle-shop.md), [10](./10-workflows.md) section 7 |
| 3 | Ensure compliance with India's EPR regulations | Agent-of-recycler legal model, 180-day cap, registration and capacity checks, certificate provenance, audit defence packs, CPCB-ready recycler records, mass balance | [07](./07-professional-recycler.md), [08](./08-manufacturer.md) P4–P5, [12](./12-nfr-security.md) section 2 |
| 4 | Incentivise responsible disposal by consumers | Recycler material price on the spot plus scheme incentive after handover code; producer take-back top-ups; drives with pooled incentives | [04](./04-consumer.md) C7, C9 |
| 5 | Real-time analytics for regulators (CPCB / SPCB) | State analytics refreshed every 15 minutes, flags within 1 minute, CPCB national view, digests, action-plan export, CM Dashboard feed | [09](./09-government.md) |

---

## 2. Background challenges

| Challenge | EcoSure response |
|-----------|------------------|
| Over 80% handled by the informal sector | Agents keep the same-day cash price; informal collectors join without GST; data protection promise |
| Limited traceability from production to end of life | Product passport and custody chain |
| Poor collection in Tier-2 / Tier-3 cities | Layer over IMC vehicles and existing points; drop points; drives; missed-call and IVR booking; offline field app |
| Low consumer awareness and incentives | Hindi education, voice, WhatsApp; price plus incentive; recycled confirmation |
| Weak EPR enforcement | Certificate provenance, unbacked certificate flags, mass balance, prioritised flags for MPPCB |

---

## 3. Keywords

| Keyword | EcoSure |
|---------|---------|
| E-Waste | Schedule I categories, E-Waste Rules 2022 |
| Sustainability | Material recovery efficiency, circular reuse (refurbishers), Net Zero reporting data |
| Re-Cycle | Recycler attestations, material recovery, mass balance |
| IoT | Connected scales, vehicle GPS (AIS-140), drop-bin fill sensors |
| Cloud | MeitY-empanelled government cloud, India-resident, built to scale nationally |

---

## 4. Constraints

| Constraint | How EcoSure handles it |
|------------|------------------------|
| E-Waste Rules 2016 and 2022 | Legal model and compliance baseline ([12](./12-nfr-security.md) section 2) |
| CPCB / SPCB requirements | Portal stays statutory truth; CPCB-ready exports; Central Inspection System links |
| DPDP Act 2023 | Notices, consent, minimisation, hashed identifiers, rights, breach process |
| Limited collection centres in Tier-2/3 | Drop points, drives, informal collectors as agents, IMC flow |
| No standard product identification across manufacturers | Accepts IMEI, serial, or EcoSure QR (GS1 Digital Link style); falls back to category and weight |
| Legacy devices without digital records | Legacy passports created at collection |
| Informal dominance in last-mile collection | Informal collectors become agents |
| Limited technical expertise among recyclers | Simple Hindi screens, CSV exports matching portal fields, operator support |
| Hazardous material handling | Intact items only for agents; battery triage; damaged batteries refused; hazardous residue tracked at recyclers |

## 5. Assumptions

| Assumption | EcoSure position |
|------------|------------------|
| Smartphone penetration above 70% | Smartphone-first, with voice and assisted channels for the rest |
| Cloud accessible and scalable | Government cloud, stateless API, national federation |
| Unique device IDs for major categories | Used where present (phones, laptops); not required for the chain to work |

---

## 6. Scope

| Problem statement | EcoSure |
|-------------------|---------|
| In scope: e-waste of India | Yes; Indore pilot, national-ready design |
| Out of scope: hazardous waste | Yes; loose and damaged batteries referred to their own channel; recyclers record hazardous residue destination only |
| Out of scope: biomedical and other waste | Yes |

---

## 7. Expected outcomes and KPIs

| Problem statement outcome or KPI | EcoSure measure | Target (Indore, 12 months) |
|----------------------------------|-----------------|----------------------------|
| Increase formal collection rate by ≥ 30% | Tonnes above agreed baseline | ≥ 30% |
| % increase in traceable e-waste | Share of recycler inflow with a complete custody chain | ≥ 90% |
| Reduction in informal processing share | Before-and-after survey of informal collectors | Measurable reduction |
| Consumer participation rate | Households handing over / households in covered wards | ≥ 5% |
| Material recovery efficiency | Recovered weight / attested input, by category | Reported for 100% of lots |
| Regulatory reporting accuracy | EcoSure recycler inflow vs CPCB portal filings | ≥ 95% match |
| Improve EPR compliance transparency | Certificates with provenance status | All certificates from participating recyclers |
| Circular economy data visibility | Open data and open passport standard | Phase 2 |
| Net Zero 2070 support | Recovered material data for emissions accounting | Reported from phase 1b |

---

## 8. Honest limits

- EcoSure cannot track devices that never enter the formal network. Every aggregate says so.
- Device-level tracking depends on producers registering units. Until they do, most units are legacy passports created at collection.
- EcoSure supports EPR compliance but cannot ensure it on its own; the CPCB portal and enforcement remain with regulators.
