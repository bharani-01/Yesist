# EcoSure — Product Overview

**Product name:** EcoSure  
**Brand tagline:** Making Everything Count  
**Document type:** Master Product Requirements Document (PRD)  
**Programme type:** Government initiative (state-led pilot, designed to federate into national digital public infrastructure)  
**Status:** v2 — strengthened after field, feasibility, and regulatory research  
**Last updated:** 2026-09-27

---

## 1. Programme assumptions (confirm with sponsor)

These defaults drive every PRD in this folder. Changing one of them changes scope; see [14-open-questions.md](./14-open-questions.md) section "Sponsor decisions".

| Assumption | Default |
|------------|---------|
| Sponsor | State government: State Pollution Control Board (SPCB) with the state IT / e-governance department |
| Pilot geography | One corridor: Indore + Pithampur (Madhya Pradesh). No second city until pilot gates pass |
| Long-term path | Standards and data model federate into a national layer run by MoEFCC / CPCB |
| Statutory truth | The CPCB EPR portal remains the only place EPR certificates are generated. EcoSure never issues EPR certificates |
| Mandate | Authorized recyclers and registered producers taking part in the pilot join via SPCB direction or MoU. Shops, hubs, and citizens join voluntarily, with incentives |
| Operations | Department owns the platform and data. A contracted field operator runs collection logistics and settlement float under a service-level agreement |
| Hosting | State data centre or government-empanelled cloud, PostgreSQL, data resident in India |
| Funding | State scheme budget plus producer-funded take-back pool. No fee to citizens. No commission on scrap value |

---

## 2. Vision

EcoSure is the state's formal e-waste custody and evidence layer. It records every hand-off from a citizen or business to a collection shop, hub, and authorized recycler, so that formal tonnes can be counted, shops can be paid on time, producers can assemble EPR evidence, and the SPCB can see an honest picture of the formal network.

---

## 3. Problem statement

India generates large and rising volumes of e-waste. Most of it moves through informal channels that pay cash immediately, with no custody record and unsafe processing of hazardous components.

What stops formal recycling today:

1. **Cash beats paperwork.** Kabadiwalas pay the same day. Formal channels pay late or not at all.
2. **No shared custody record.** Material changes hands several times with no trail, so tonnes cannot be verified.
3. **Evidence is scattered.** Producers rebuild EPR evidence by hand from recycler PDFs, emails, and spreadsheets.
4. **Regulators see partial data.** Only formal participants are visible, and reports rarely say so.
5. **Low trust at the door.** Citizens fear data left on phones, cannot book around society or PG gate rules, and do not use English-only tools.

---

## 4. Positioning

**EcoSure is:** the formal e-waste custody and evidence infrastructure for the state, run corridor by corridor under authorized recyclers.

**EcoSure is not:**

- a replacement for kabadiwalas on cash price
- a rewards or EcoPoints app
- the CPCB EPR portal, or an issuer of EPR certificates
- an EPR credit exchange or broker
- a Producer Responsibility Organisation (PRO) substitute
- a complete picture of all e-waste in the state (it covers the formal network only)

---

## 5. Design principles

These principles override any feature request that conflicts with them.

1. **Money moves fast.** Shops are paid within 7 days of hub receipt. Citizens get a UPI incentive at collection, not points later.
2. **Density before demand.** A corridor goes live for citizens only after its launch checklist passes (section 8).
3. **Recycler is the root of trust.** Every lot ends at a CPCB-authorized recycler with a signed offtake agreement.
4. **Honest artifacts.** EcoSure issues *custody attestations*, never "certificates" that could be mistaken for EPR certificates. Every attestation can be verified publicly by number.
5. **Honest coverage.** Every aggregate says "formal EcoSure network only".
6. **WhatsApp and local language first.** Hindi and English from day one, plus the local language of each new corridor.
7. **Works offline.** Collection, weighing, and hub receipt work without signal and sync later.
8. **Real data only.** No mock operational data in any production feature.

---

## 6. Stakeholders and value

| Stakeholder | Joins because | EcoSure provides |
|-------------|---------------|------------------|
| Citizen / household | UPI incentive, doorstep or drop-off, data-wipe guidance | Simple pickup request, WhatsApp status, receipt |
| Society (RWA) / small office | Clean, documented bulk collection | Collection drives, gate-pass details, disposal receipt |
| Local collection shop | Steady volume and payment within 7 days | Pickup queue, weighing, lots, weekly settlement, advances |
| Regional hub | Full trucks and a guaranteed buyer | Multi-shop trips, dual weighing, offtake schedule |
| Authorized recycler | More compliant feedstock | Graded inbound lots, reject rights, attestation issuing |
| Producer (manufacturer) | EPR evidence without spreadsheets | Attestation library, target-gap view, exports for portal filing |
| SPCB | Visibility of the formal chain | Monitoring views, compliance flags, public verification |
| Programme operator (department) | Run the programme | Onboarding, rate cards, disputes, float, audit |

---

## 7. Success metrics (pilot, 12 months)

| Metric | Target | Why |
|--------|--------|-----|
| Formal tonnes reaching authorized recyclers | Grows every month | Core programme outcome |
| Chain completeness | ≥ 95% of lots with unbroken custody events | Evidence quality |
| Shop payment time | Median ≤ 7 days from hub receipt | Keeps shops from diverting to informal buyers |
| Pickup completion rate | ≥ 80% of accepted pickups collected | Citizen trust |
| Weight disputes | ≤ 10% of transfers | Settlement health |
| Public verifications | Tracked; any failed verification investigated within 48 hours | Fraud control |
| Producer evidence exports | Used by ≥ 10 pilot producers | Evidence value |

Metrics deliberately excluded: app downloads, EcoPoints issued, and number of government accounts.

---

## 8. Corridor launch checklist

A corridor opens to citizens only when all of these are true:

- At least 8 active approved shops covering the main wards
- At least 1 hub with storage suitable for monsoon season
- At least 1 authorized recycler with a signed offtake agreement (maximum dwell, weight tolerance, reject rules, payment terms)
- Settlement float funded for at least 8 weeks
- WhatsApp templates approved in Hindi and English
- Programme operator field team trained

---

## 9. Scope

### In scope
- Citizen, society, and small-office pickups and drop-offs
- Shop, hub, and recycler custody chain with trips, dual weighing, and disputes
- Weekly settlements and capped shop advances
- UPI citizen incentives (scheme-funded)
- Custody attestations with public verification
- Producer evidence library and exports
- SPCB monitoring views
- Wizard-of-Oz pilot before software (see [13-roadmap.md](./13-roadmap.md))

### Out of scope
- Issuing or trading EPR certificates or credits
- Automatic filing on the CPCB portal
- Replacing PROs or large-producer contracts
- General municipal solid waste
- IoT device telemetry
- Carbon credits

---

## 10. Risks the design addresses

| Risk | Mitigation in this PRD |
|------|------------------------|
| Informal cash wins | UPI incentive at collection; shop payment within 7 days |
| Empty map at launch | Corridor launch checklist |
| Fake or inflated paperwork | Attestations only from authorized recyclers, weight caps, public verification |
| Confusion with EPR certificates | Naming rule and mandatory disclaimer on every artifact |
| Hub runs out of cash | Offtake agreement, dwell cap, priced and capped advances |
| Weak connectivity and power cuts | Offline collection and receipt with later sync |
| Misleading government statistics | "Formal network only" label on every aggregate |
| Programme abandoned mid-pilot | Stage gates and kill criteria agreed with sponsor |

---

## 11. Glossary

| Term | Definition |
|------|------------|
| **E-waste** | Discarded electrical and electronic equipment and components |
| **EPR** | Extended Producer Responsibility under the E-Waste (Management) Rules, 2022 |
| **EPR certificate** | Certificate generated on the CPCB EPR portal. EcoSure never issues these |
| **Custody attestation** | EcoSure record, issued by an authorized recycler, that a lot was received and processed. Not an EPR certificate |
| **CPCB / SPCB** | Central / State Pollution Control Board |
| **Corridor** | A pilot geography with its own shops, hub, and recycler |
| **Trip** | One vehicle movement carrying lots from one or more shops |
| **Lot** | A batch of collected material with measured weight and categories |
| **Dual weighing** | Sender and receiver both record weight, with evidence |
| **Advance** | Capped, recoverable payment to a shop before settlement |
| **Programme operator** | Department staff and contracted operator who run EcoSure |
| **Formal network** | Organisations onboarded to EcoSure. Excludes informal channels |

---

## 12. Document map

See [README.md](./README.md). The reasoning behind the v2 changes is in [15-strengthening-changes.md](./15-strengthening-changes.md).
