# EcoSure — Product Overview

**Product name:** EcoSure  
**Brand tagline:** Making Everything Count  
**Document type:** Master Product Requirements Document (PRD)  
**Programme type:** Government initiative. State-led pilot in Madhya Pradesh, built to national standards so it can federate with CPCB  
**Problem statement:** IEEE YESIST12 IEngage — Sustainable E-Waste Tracking & Recovery Platform for India (alignment in [17-problem-statement-alignment.md](./17-problem-statement-alignment.md))  
**Status:** v3. Aligned to the problem statement and to the 36-agent norms review ([`../research/v2-deep/00-synthesis.md`](../research/v2-deep/00-synthesis.md))  
**Last updated:** 2026-09-27

---

## 1. Programme assumptions (confirm with sponsors)

These defaults drive every PRD in this folder. Changing one changes scope; see [14-open-questions.md](./14-open-questions.md).

| Assumption | Default |
|------------|---------|
| Sponsors | Joint government order from the Environment Department (with the Madhya Pradesh Pollution Control Board, MPPCB) and the Urban Development and Housing Department (with Indore Municipal Corporation, IMC) |
| Technology agency | MPSEDC (state e-governance agency) as nodal technology agency |
| Pilot geography | Indore city only. Pithampur is dropped from the pilot |
| National path | Open data standards and APIs so CPCB and other states can federate. CPCB gets a national read view from phase 2 |
| Statutory truth | The CPCB EPR portal is the only place EPR registrations, targets, and certificates exist. EcoSure never issues or trades EPR certificates |
| Legal model for collectors | Every shop and drop point is the documented collection agent of a named CPCB-registered recycler or producer, under an MPPCB direction |
| Relationship to existing collection | EcoSure is the tracking and custody layer over existing flows (IMC vehicles, producer take-back points, PROs, recyclers). New shops are added only where coverage is thin |
| Operations | Department owns the platform and data. A contracted operator runs field support under a service-level agreement. The software vendor is contracted separately |
| Hosting | MeitY-empanelled government cloud or state data centre; all data in India |
| Money | Material value is paid by recyclers from escrow. Scheme incentives are paid through the state treasury system and PFMS in daily batches. The operator never holds public money |
| Scope | E-waste only, as defined by the E-Waste (Management) Rules 2022. Hazardous waste, biomedical waste, and loose batteries are out of scope; batteries inside devices travel with the device |

---

## 2. Vision

EcoSure is India's circular e-waste tracking and recovery platform, starting in Indore. It gives every electronic product a digital record from manufacture or import to recycling, counts every formal hand-off, includes informal collectors as recognised partners, rewards citizens for responsible disposal, and gives CPCB and SPCB near real-time evidence they can trust.

---

## 3. Problem statement

India is the third-largest e-waste generator, with over 1.7 million tonnes a year. Despite the E-Waste (Management) Rules 2016 and 2022:

1. **No product traceability.** Nobody can follow a device from factory or port to recycler. Most devices in use have no digital record.
2. **Informal dominance.** Over 80% of e-waste is handled informally. Collectors get cash immediately, and formal channels offer them no place.
3. **Poor Tier-2/3 collection.** Few formal collection points, long distances to recyclers, and weak connectivity.
4. **No reason for citizens to act.** Low awareness, fear of data leaks, and no incentive that beats the kabadiwala's cash.
5. **Weak EPR enforcement.** Certificates can be generated without verifiable physical material behind them. Regulators see partial, self-reported data.

The result is environmental contamination, loss of recoverable metals, worker health risks, and lost revenue for formal recyclers.

---

## 4. Positioning

**EcoSure is:**
- a product passport registry for electronic products (manufacture or import to disposal)
- a custody chain that records every formal hand-off with weight, photo, and connected-device evidence
- the way informal collectors join the formal chain as recognised agents of recyclers
- an EPR compliance evidence layer that links CPCB portal certificates to physical material
- a regulator analytics service for CPCB, SPCB, and the city

**EcoSure is not:**
- the CPCB EPR portal, or an issuer or trader of EPR certificates
- a points or rewards app
- a replacement for the kabadiwala's cash price
- a parallel collection network competing with the city or PROs
- a complete count of all e-waste; it reports the formal network and says so

---

## 5. Design principles

These principles override any conflicting feature request.

1. **Track the product, not just the sack.** Every device that has an ID keeps it through the chain. Devices without IDs are counted by category and weight.
2. **Layer, do not duplicate.** Connect existing city, PRO, and recycler flows before adding new shops.
3. **Recycler is the root of trust.** Every lot ends at a CPCB-registered recycler, and every collector acts as that recycler's documented agent.
4. **Evidence from two parties.** Weight, custody, and payout each need confirmation by two independent parties (sender and receiver, or citizen handover code and collector).
5. **Honest artifacts.** Custody attestations are never called certificates. Every attestation is publicly verifiable by number.
6. **Honest coverage.** Every aggregate says "formal EcoSure network only" and shows additional tonnes above the pre-pilot baseline.
7. **Hindi first, voice and WhatsApp friendly.** Hindi is the default. Missed-call, IVR, and assisted booking exist for people without smartphones.
8. **Works offline.** Collection, weighing, and receipt work without signal and sync later.
9. **Lawful by design.** DPDP, CERT-In, GIGW 3.0, and the E-Waste Rules are requirements, not afterthoughts.
10. **Real data only.** No mock operational data in any production feature.

---

## 6. Stakeholders and value

| Stakeholder | Joins because | EcoSure provides |
|-------------|---------------|------------------|
| Citizen / household | Fair price, incentive, data safety | Booking by WhatsApp, web, missed call, or at a shop; handover code; UPI or bank payout; device history |
| Bulk consumer (society, office, school) | Rule 8 duty to hand over to registered channels | Collection drives, disposal receipts naming the recycler |
| Local collection shop / informal collector | Steady volume, recognition, payment within 7 days | Agent status, pickup queue, offline weighing, weekly settlement |
| Drop point (IMC, retailer, PRO) | Count what they already collect | Drop logging, fill-level alerts, custody hand-off |
| Regional hub (phase 2, recycler-owned) | Full trucks | Multi-shop trips, dual weighing |
| Authorized recycler | More legal feedstock, fewer fake-paperwork accusations | Agent network, graded inbound lots, attestations, mass balance |
| Producer / importer | Audit-proof EPR evidence, BRSR take-back data | Product registry, certificate provenance, audit defence packs, take-back programmes |
| City (IMC) | Swachh Survekshan credit, less dumping | Ward-level collection data, drive calendar |
| MPPCB (SPCB) | Enforcement evidence with 64% posts vacant | Flags, digests, inspection links, state analytics |
| CPCB | National picture | Federated read view and open data standard |

---

## 7. Success metrics

The problem statement's KPIs are primary. Targets apply to the Indore pilot at 12 months unless stated.

| KPI | Definition | Target |
|-----|------------|--------|
| Formal collection increase | Tonnes reaching authorized recyclers through EcoSure above the 12-month pre-pilot baseline for the same channels | ≥ 30% above baseline |
| Traceable e-waste share | Share of tonnes received by pilot recyclers with a complete custody chain | ≥ 90% |
| Device-level traceability | Share of data-bearing devices collected with a linked product passport | ≥ 60% of phones and laptops |
| Informal processing share | Share of surveyed informal collectors' volume routed to formal recyclers (sample survey, before and after) | Measurable reduction; target set after baseline survey |
| Consumer participation | Unique households handing over at least once / households in covered wards | ≥ 5% in covered wards |
| Material recovery efficiency | Recovered material weight reported by recyclers / input weight attested, by category | Reported for 100% of attested lots |
| Regulatory reporting accuracy | Share of EcoSure recycler inflow that matches the recycler's CPCB portal filings for the same period, within tolerance | ≥ 95% |

Operational health metrics (tracked, not headline): shop payment time (median ≤ 7 days), pickup completion (≥ 80%), weight disputes (≤ 10%), fraud reversals, cost per kg, and public verifications.

Excluded: app downloads, points issued, number of government accounts.

---

## 8. Corridor launch checklist

A corridor opens to citizens only when all of these are true:

- Government order issued and MPPCB direction on collection agents in force
- At least 1 authorized recycler has signed agent agreements with every participating shop and drop point
- IMC collection flow connected (vehicles or ward points logging to EcoSure)
- At least 8 active collection points covering the pilot wards
- Recycler escrow funded; PFMS incentive scheme code active
- Hindi and English messages, IVR prompts, and WhatsApp templates approved
- 12-month baseline of existing formal tonnes agreed with sponsors
- Operator field team trained, including battery safety and data-wipe help
- Election Model Code of Conduct check done (no new incentives launched during a code period)

---

## 9. Scope

### In scope
- Product passport: producer registration of models and units, citizen claims, legacy registration at collection
- Citizen, bulk consumer, and drive collection; drop points; informal collectors as agents
- Custody chain: lots, trips, dual weighing, connected scales, vehicle GPS, disputes
- Recycler receipt, attestation, material recovery reporting, mass balance
- Two-rail payments: recycler escrow for material value, treasury batch payouts for incentives
- EPR evidence: certificate provenance, audit defence and BRSR packs, take-back programmes
- Regulator analytics for CPCB, SPCB, and the city, with compliance flags
- Public verification of attestations and open data

### Out of scope
- Issuing, trading, or brokering EPR certificates
- Automatic filing on the CPCB portal
- Hazardous waste, biomedical waste, municipal solid waste
- Loose or damaged batteries (referred to Battery Waste Management Rules channels)
- Dismantling by shops or hubs
- Carbon credits

---

## 10. Risks the design addresses

| Risk | Mitigation |
|------|------------|
| Informal cash wins | Shop pays the material price on the spot as recycler's agent; scheme incentive on top |
| Collectors operating illegally | Agent-of-recycler model under MPPCB direction; intact items only; 180-day storage cap |
| Parallel network nobody needs | Custody layer over IMC, PRO, and recycler flows; additionality measured |
| Fake pickups and incentive fraud | Handover code, per-account and per-device caps, chargebacks, device IDs |
| Fake EPR certificates | Certificate provenance linked to physical inflow and recycler mass balance |
| Battery fires | Intact devices only; damaged batteries refused and referred; storage limits |
| Public money misused | No operator float; PFMS batches; recycler escrow; audit trail |
| Privacy breach | DPDP controls, hashed device IDs, CERT-In incident process |
| Election freeze | Model Code of Conduct planning in the launch calendar |
| Programme abandoned | Stage gates and kill criteria agreed with sponsors |

---

## 11. Glossary

| Term | Definition |
|------|------------|
| **E-waste** | Electrical and electronic equipment listed in Schedule I of the E-Waste (Management) Rules 2022, when discarded |
| **EPR** | Extended Producer Responsibility under the E-Waste (Management) Rules 2022 |
| **EPR certificate** | Certificate generated on the CPCB EPR portal. EcoSure never issues these |
| **Product passport** | EcoSure record of an individual unit (by serial, IMEI hash, or QR) and its lifecycle events |
| **Legacy device** | A device with no passport, registered when it is collected |
| **Custody attestation** | Recycler-issued EcoSure record that a lot was received and processed. Not an EPR certificate |
| **Certificate provenance** | Link between a CPCB portal certificate and the physical EcoSure inflow behind it |
| **Collection agent** | Shop, drop point, or informal collector acting for a named registered recycler or producer |
| **Handover code** | One-time code the citizen gives the collector to confirm the handover |
| **Mass balance** | Recycler check that output material plus residue matches attested input |
| **Additional tonnes** | Tonnes above the agreed pre-pilot baseline |
| **Formal network** | Organisations onboarded to EcoSure. Excludes informal channels |

---

## 12. Document map

See [README.md](./README.md). What changed from v2 is in [18-v3-changes.md](./18-v3-changes.md).
