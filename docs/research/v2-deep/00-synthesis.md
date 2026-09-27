# EcoSure PRD v2 — 36-Agent Deep Research Synthesis

**Date:** 2026-09-27  
**Scope:** How PRD v2 would perform and be adopted, checked against Indian government norms, law, local Madhya Pradesh context, economics, and operations.  
**Method:** 36 research agents in two waves. Wave 1 (01–18) covered law, norms, and precedents using web sources. Wave 2 (19–36) simulated adoption and performance, building on wave 1.  
**Evidence caveat:** Agents cited official and news sources where found. Claims they could not confirm are marked UNVERIFIED in the individual reports. Rupee figures are illustrative. Verify the load-bearing facts listed in section 6 before acting on them.

---

## 1. Headline

PRD v2 fixed the product-market problems from v1, but it is **not yet lawful or fundable as written** for a government programme.

| Measure | Result |
|---------|--------|
| Average score across 35 scored angles | **4.6 / 10** |
| Wave 1 (law, norms, precedents) | 4.9 / 10 |
| Wave 2 (adoption, economics, operations) | 4.4 / 10 |
| Pre-mortem survival chance, v2 as written | about 30% |
| Pre-mortem survival chance, with the top changes | about 60% |

The earlier self-assessment of "about 7 / 10 on paper" in [`../../prd/15-strengthening-changes.md`](../../prd/15-strengthening-changes.md) was too high. It scored the design against the product problems found earlier. It did not test the design against the law, government finance rules, or Indore's existing collection system, and those are where most of the new gaps are.

---

## 2. Scores by angle

### Wave 1 — law, norms, precedents

| # | Angle | Score |
|---|-------|------:|
| 01 | E-Waste Rules 2022 and amendments | 6 |
| 02 | CPCB EPR portal mechanics | 7 |
| 03 | Legal status of shops and hubs | 5 |
| 04 | DPDP Act and Rules | 4 |
| 05 | GIGW 3.0, accessibility, language | 4 |
| 06 | Hosting and CERT-In | 5 |
| 07 | Government payments (DBT, PFMS, UPI) | 5 |
| 08 | SMS DLT and WhatsApp for government | 5 |
| 09 | Aadhaar-based KYC | 4 |
| 10 | Procurement (MP rules, GeM, MPSEDC) | 4 |
| 11 | RTI and open data | 4 |
| 12 | Madhya Pradesh context | 6 |
| 13 | Batteries and hazardous materials | 3 |
| 14 | Informal sector inclusion | 5 |
| 15 | Indian programme precedents | 6 |
| 16 | International precedents | 6 |
| 17 | Funding sources | 4 |
| 18 | Fake certificate fraud patterns | 5 |

### Wave 2 — adoption, economics, operations

| # | Angle | Score |
|---|-------|------:|
| 19 | Citizen adoption, Indore | 5 |
| 20 | Citizen adoption, Tier-3 towns | 4 |
| 21 | Society and bulk drives | 5 |
| 22 | Micro kabadi shops | 4 |
| 23 | Organized drop points | 4 |
| 24 | Hub economics | 4 |
| 25 | Recycler adoption | 5.5 |
| 26 | Producer value | 4 |
| 27 | SPCB officer adoption | 5 |
| 28 | Operator staffing and SLAs | 5 |
| 29 | Fraud red team | 4.5 |
| 30 | Budget and cost per tonne | 4 |
| 31 | Political stakeholders | 4 |
| 32 | Technical feasibility and timeline | 5 |
| 33 | Inclusion and doorstep safety | 3 |
| 34 | Seasonal stress | 4 |
| 35 | Pre-mortem | 30% survival |
| 36 | Partnership architecture | 4 (7.5 if adopted) |

---

## 3. The five structural problems

These came up across many agents independently. Fixing them moves the most scores at once.

### 3.1 Shops and hubs have no legal standing on their own
Under the E-Waste (Management) Rules 2022, only producers, manufacturers, refurbishers, and recyclers register. Only registered entities may collect (CPCB FAQ, as reported by agents 01, 03). A kabadi shop or hub is lawful only as a **documented agent or collection point of a registered recycler or producer**. Bulk consumers must hand over to registered entities, so receipts must name the recycler. Storage is capped at 180 days for e-waste and 90 days for batteries.
Sources: 01, 03, 13, 21, 23.

### 3.2 Batteries are a separate legal regime
The Battery Waste Management Rules 2022 cover all batteries, including those inside devices, with their own EPR, storage limits, manifest (Hazardous Waste Rules Form 10), and fire rules. v2 barely mentions batteries. Battery weight must not count in e-waste attestations.
Sources: 13, 24, 34.

### 3.3 The money design does not fit government finance rules
Public money pays through PFMS or the state treasury system in batches, usually taking 1–4 working days, not instant UPI at collection. A private operator cannot hold government float. Paying out others' money over UPI needs RBI payment-aggregator authorisation. Advances from scheme funds are likely audit objections. The citizen incentive also triggers only on the shop's say-so, which makes it the main fraud surface.
Sources: 07, 10, 17, 29, 35.

### 3.4 v2 ignores Indore's existing e-waste collection
Indore Municipal Corporation reportedly already collects about 2–2.5 t/day through garbage vehicles and vendors (UNVERIFIED in detail). PROs and three authorized recyclers already operate in Indore. v2 would build a parallel shop network worth an estimated 5–20 t/month, at about ₹40–220 per kg, beside a city flow several times larger. The strongest recommendation across agents: make EcoSure the **custody and evidence layer over existing collection**, with the city corporation as co-sponsor.
Sources: 12, 15, 19, 24, 28, 30, 31, 36.

### 3.5 The producer value proposition uses the wrong unit
EPR is fulfilled by buying CPCB certificates counted in kilograms of recovered metal, not brand-attributed input weight. The target-gap view and portal worksheets therefore add no compliance value and could mislead. Real producer value: **audit defence** (proving the recycler behind a certificate is physically real), **BRSR take-back evidence**, and credible take-back programmes.
Sources: 01, 02, 26.

---

## 4. Other significant gaps

| Area | Gap | Source |
|------|-----|--------|
| Privacy | No consent notices, breach process (6-hour CERT-In, 72-hour DPB), age gate, processor contracts, or grievance officer. DPDP duties bind from 13 May 2027, around phase 1 launch | 04 |
| Security | CERT-In 2022 directions missing (6-hour reporting, 180-day logs in India, NIC time sync); only one audit planned instead of annual | 06 |
| Web norms | GIGW 3.0, STQC certification, gov.in domain, IS 17802 accessibility, Hindi as default in MP | 05 |
| WhatsApp | Government must onboard through a solution provider; India data storage must be set at registration; SMS should carry OTP and payment messages | 08 |
| Aadhaar | Cannot be mandatory for a commercial activity without notification; need non-Aadhaar alternatives; never store Aadhaar documents | 09 |
| Procurement | No sanction or procurement stage; MP rules mean 2–12 months before contracts; operator and software vendor should be separate | 10 |
| RTI | The information officer, not the operator, decides requests; publish contract and aggregates; suppress small cells | 11 |
| Pithampur | Protest history and recycler incident risk; drop from pilot | 12, 31 |
| Informal workers | No links to NAMASTE, e-Shram, city waste-picker registers; no protection against worker data being used for enforcement | 14 |
| Fraud | No handover code; per-SIM caps are easy to beat; no chargebacks; no device counts; attestations hash-only without signature; maker-checker missing | 16, 18, 29 |
| Recyclers | Offtake agreement lacks price and indexation; per-lot attestation doesn't match batch processing; need CPCB-ready procurement receipts | 25 |
| SPCB | MPPCB is about 64% understaffed and already uses XGN, the Central Inspection System, and the CPCB portal; needs digests and exports, not another dashboard | 27 |
| Operator | About 10 staff, about ₹5 lakh/month; no support SLA, surge plan, or escalation matrix | 28 |
| Budget | About ₹6 crore over 24 months (illustrative); 89% fixed cost; cost per tonne 2–8× material plus certificate value at pilot volumes | 30 |
| Politics | Wrong sponsor alone (needs Environment + Urban Development + city corporation); 2027 municipal election Model Code of Conduct could freeze incentives | 31, 34 |
| Timeline | Phases 0–2 realistically 50–62 weeks, not 28–36; sync protocol and payment ledger unspecified | 32 |
| Inclusion | No IVR or missed-call booking, no assisted booking, no non-UPI payout, no collector safety measures | 20, 33 |
| Seasons | Diwali surge during pilot; heat and lithium fire risk; monsoon rules undefined | 34 |
| Drives | No drive entity, dispatch threshold, or government-office (GeM/MSTC) mode | 21 |

---

## 5. Recommended changes for PRD v3 (ranked by leverage)

1. **Reposition as the custody layer over existing collection.** Co-sponsor with the Indore city corporation and Urban Development; plug into city vehicles, PRO drop points, and recyclers; add shops only where coverage is thin. (36, 12, 15, 30)
2. **Legal model for every handler.** Every shop, drop point, and receiving point is the documented agent of a named registered recycler or producer. Intact equipment only, no dismantling. 180-day e-waste and 90-day battery limits. MPPCB written direction. (01, 03, 23)
3. **Separate battery stream.** Battery triage at pickup, separate lots and recyclers, no battery storage at shops or hubs in the pilot, Form 10 manifest. (13)
4. **Two-rail money design.** Material price paid by the recycler (through the shop as its agent) from escrow, with no operator-held public float; scheme top-up paid in PFMS batches; producer top-up optional and escrowed. Advances only from recycler or producer money. (07, 17, 22, 24, 35)
5. **Fraud controls.** Citizen handover code as the payout trigger; caps per payee account, device, and address; shop chargebacks; numbered seals; device counts and hashed IMEIs; maker-checker and signed attestations. (16, 18, 29)
6. **No separate hub in the pilot.** Deliver straight to recycler gates in Indore; the recycler owns any later hub. (24)
7. **Producer module rebuilt.** Replace target-gap and worksheets with certificate provenance (recycler physical-inflow evidence), BRSR take-back evidence, and audit-defence packs; add a PRO/consultant delegate role; gate on signed letters of intent. (26, 01, 02)
8. **Compliance baseline in NFRs.** DPDP consent and breach process, CERT-In directions, GIGW 3.0 with STQC, IS 17802, Hindi default, annual security audits, India-only data residency for every provider. (04, 05, 06, 08)
9. **Lawful KYC.** Phone OTP plus any one of DigiLocker, Aadhaar offline QR, or in-person ID check; payout name match; never mandatory Aadhaar; accept NAMASTE, e-Shram, and city waste-picker IDs. (09, 14)
10. **SPCB fit.** Link to the Central Inspection System instead of separate inspection notes; weekly digests; CPCB quarterly action-plan export; KPI feed to the CM Dashboard through MPSEDC. (27)
11. **Governance and calendar.** Joint government order (Environment + Urban Development), steering committee, election Model Code of Conduct rules, launch at Swachhata Hi Seva, per-corridor operating calendar. (31, 34)
12. **Realistic roadmap and budget.** Add a sanction-and-procurement stage; split phase 1 into custody (1a) and money plus regulator views (1b); 50–62 weeks for phases 0–2; stated 24-month budget; volume gates (8, 25, 50 t/month) and cost per kg tracking. (10, 30, 32)
13. **Inclusion and safety.** Missed-call and IVR booking via CM Helpline 181 infrastructure; assisted booking at shops and ward offices; bank, voucher, or nominee payouts; collector ID, masked calls, and a safety report path. (20, 33)
14. **Drives as the main citizen channel.** Drive entity, dispatch threshold, batch weighing, pooled incentive option, host certificate, government-office mode that assists GeM/MSTC disposal. (21, 15)
15. **Measure additionality.** 12-month baseline before the pilot; report only tonnes above the existing city and PRO flows. (15, 19, 30)

---

## 6. Facts to verify before acting

These are load-bearing and at least partly UNVERIFIED in the reports:

- Indore Municipal Corporation's current e-waste tonnage and vendor contracts
- Current status of authorized recyclers in Indore and the Pithampur recycler incident
- Any 2025–2026 amendments to the E-Waste Rules and the reported CPCB 7 July 2026 direction on e-invoices
- Delhi High Court status on the EPR certificate floor price
- Indore municipal election dates and Model Code of Conduct applicability
- DPDP Rules commencement date for the main obligations (reported as 13 May 2027)
- WhatsApp pricing and government onboarding terms in India for 2026

---

## 7. Projected score after v3

If the 15 changes in section 5 are made (estimates from the individual agents, averaged):

| Stage | Estimated score | Survival (pre-mortem) |
|-------|----------------:|----------------------:|
| v2 as written | 4.6 | about 30% |
| v3 with the 15 changes | about 6.5–7 | about 60% |
| v3 plus verified facts, signed MoUs, and a passed pilot | about 7.5–8 | higher; to be measured |

---

## 8. Report index

All reports are in this folder: `01-ewaste-rules-2022.md` through `36-partnerships.md`.
