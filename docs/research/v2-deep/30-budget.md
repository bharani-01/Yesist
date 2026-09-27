# 30 — 24-month programme budget, cost per tonne, and state fundability

**Agent:** 30 of 36 (v2 deep research swarm)
**Angle:** Build a 24-month budget for EcoSure v2 (Indore + Pithampur pilot, then Phases 0–2) and test whether a state can fund it.
**Date:** 2026-09-27
**Inputs read:** `docs/prd/00-overview.md`, `docs/prd/13-roadmap.md`, `docs/research/pilot-design.md`, `docs/research/unit-economics-illustrative.md`, `v2-deep/07-payments-dbt.md`, `v2-deep/10-procurement.md`, `v2-deep/17-funding.md`, `v2-deep/12-madhya-pradesh.md` (grep). `v2-deep/24-*` was not present.
**Status:** Research only. No PRD file was edited.

> **Every rupee figure in this document is ILLUSTRATIVE.** They are planning estimates built from the sources and assumptions below, not quotes, sanctioned amounts, or measured pilot data. Replace them with MPSEDC / GeM quotes, operator bids, and pilot weighbridge and settlement ledgers before any DPR or sanction note.

**Score for v2 budget realism and fundability as written: 4 / 10**

---

## 1. Sources and benchmarks

| # | Benchmark | Value used | Source / status |
|---|-----------|-----------|-----------------|
| B1 | Pilot 12-week WoZ opex | ₹6.9L frugal – ₹12.5L adequate, plus ₹1.5–3L float | `pilot-design.md` §11 (ILLUSTRATIVE, private-startup framing; government version adds operator mobilisation and audit) |
| B2 | Recycler landed value, blended mixed e-waste | ₹45/kg (₹45,000/t) | `unit-economics-illustrative.md` (ILLUSTRATIVE) |
| B3 | Hub spread, full truck | +₹4,300/t; half truck +₹1,300/t; thin month ≈ ₹0 | same (ILLUSTRATIVE) |
| B4 | EPR certificate floor | ₹22/kg consumer EEE, ₹34/kg IT/telecom, ₹23/kg appliances; band 30–100% of EC; under Delhi HC challenge, interim stay for one petitioner (Jan 2026) | CPCB EC Guidelines 09-09-2024 (nirmalvasundhara mirror); Newslaundry 14-01-2026; GreenSutra 2026 summary. Floor values VERIFIED from EC guideline mirror / secondary summaries |
| B5 | CPCB's own assumed collection + transport cost | ₹25/kg | CPCB EC Guidelines (VERIFIED, via `17-funding.md` S3) |
| B6 | CERT-In empanelled security audit, government tenders | ₹0.6L (small dept, GeM) to ₹11.9L (hardening + VAPT + STQC GIGW validation, AP, Aug 2026) | GeM bid GEM/2025/B/6622890; tenderdetail 56809111 (secondary aggregator) |
| B7 | Indian manual pentest day rate | ~₹0.3–1.0L per tester-day | budgetsecurity.com 2026 (secondary) |
| B8 | Existing Indore municipal e-waste collection | IMC collects 2–2.5 t/day of est. 10–12 t/day; "payment up to ₹20/kg" (direction unclear) | TOI May 2024 via `12-madhya-pradesh.md` (news; UNVERIFIED) |
| B9 | Bhopal ULB e-waste model | Agency pays BMC ₹1.71L/month royalty for 3.5–5 t/month | NGT CZ OA 82/2026 via `17-funding.md` S18 (BMC claim) |
| B10 | MP software procurement route and O&M norm | MPSEDC nomination; 6–12 mo build + 12–24 mo O&M; PBG 3–10% | `10-procurement.md` |
| B11 | Public-money payout rails | DBT via PFMS/IFMIS; no private float; daily batch | `07-payments-dbt.md` |

MPSEDC does not publish awarded values for comparable portals; software build cost below is therefore estimated from team size × blended SI rate (UNVERIFIED against a specific MP award).

---

## 2. Assumptions

### 2.1 Calendar (24 months from administrative approval)

| Months | Stage | Notes |
|--------|-------|-------|
| 1–3 | Stage −1: sanction, operator procurement, float instrument, DBT route | Per `10-procurement.md`; not in PRD today |
| 4–6 | 12-week manual pilot | SI procurement runs in parallel via MPSEDC, gate-conditional award |
| 7–8 | Phase 0 foundations | |
| 9–12 | Phase 1 custody chain live | CERT-In safe-to-host before go-live |
| 13–15 | Phase 2 producers and SPCB monitoring | |
| 16–24 | Warranty / O&M, steady corridor operations | Phase 3 (second corridor) is **out** of this budget |

### 2.2 Volume scenarios (formal tonnes reaching the authorised recycler through EcoSure)

| Scenario | Pilot months 4–6 | Months 7–12 | Months 13–24 | 24-month total | Month-24 run rate |
|----------|-----------------:|------------:|-------------:|---------------:|------------------:|
| **Low** | 3 t/mo | 8 t/mo | 8 t/mo | **~150 t** | 8 t/mo (hub "fragile" threshold) |
| **Base** | 5 t/mo | 12 t/mo | 25 t/mo | **~390 t** | 25 t/mo (unit-economics base) |
| **High** | 8 t/mo | 20 t/mo | 50 t/mo | **~745 t** | 50 t/mo (≈ 70–80% of IMC's current collected flow, B8) |

### 2.3 Citizens served

"Citizen served" = one household / small-office hand-over (pickup, drop-off, or society-drive item) recorded with a receipt. Assume 40% of tonnage comes from citizen hand-overs at ~3 kg each; the rest is shop walk-in stock, bulk offices, and societies counted by lot.

| Scenario | Citizen hand-overs (24 mo) |
|----------|---------------------------:|
| Low | ~20,000 |
| Base | ~52,000 |
| High | ~99,000 |

### 2.4 Cost assumptions (ILLUSTRATIVE)

| Line | Assumption |
|------|-----------|
| Software build, Phases 0–2 | ~7 FTE × 9 months × ₹2.0L blended SI rate + design/testing ≈ ₹1.4 cr (low ₹0.8 cr lean OSS team; high ₹2.5 cr large-SI QCBS with native apps) |
| Software O&M | 3 FTE × 9 months × ₹1.5L ≈ ₹0.4 cr (months 16–24) |
| Hosting | ₹1.5L/month for prod + DR + staging on MeitY-empanelled cloud, 18 months (low: SDC allocation ~₹0.55L/mo; high ₹2.5L/mo) |
| Messaging | WhatsApp BSP + SMS/OTP ≈ ₹15 per citizen hand-over lifecycle (~10 messages + OTPs) plus shop/hub traffic |
| Audits and evaluation | CERT-In safe-to-host initial + retest (₹6L), post-Phase-2 re-audit (₹5L), annual re-audit (₹4L), STQC / GIGW accessibility testing (₹8L), DPDP data-protection assessment (₹5L), independent ledger / float audit (₹5L), third-party pilot + year-1 evaluation (₹7L) = ₹40L |
| Field operator, fixed | 1 corridor manager + 5–6 field associates + helpline + 1 vehicle + overhead ≈ ₹4L/month × 18 months (months 7–24). Pilot months are in the pilot line |
| Operator logistics viability gap | State tops up freight/handling not covered by hub spread: ₹6,000/t at low volume (half trucks), ₹3,000/t base, ₹1,000/t high (mostly full trucks) |
| Citizen incentive (scheme top-up) | ₹75 average per hand-over via DBT batch; remainder of any citizen payment is purchase price from recycler value (per `17-funding.md`) |
| Shop joining / goodwill | ₹5L one-time |
| Float corpus (recoverable) | 8 weeks of shop settlements at ₹28/kg plus 40% advance headroom at month-24 run rate. Treated as capital, not spend; 10% loss / carrying cost budgeted as spend |
| IEC / awareness | ₹1.25L/month: society and college drives, data-wipe camps, ward notices, local radio, WhatsApp creatives |
| Department PMU staff | Programme lead ₹2L + technical/product lead ₹1.5L + finance/ops (DDO support, reconciliation) ₹1L = ₹4.5L/month × 24. SPCB nodal officer time is sunk and excluded |
| Setup + legal | DPR, counsel memo on attestation naming, contract drafting ≈ ₹10L |
| Contingency | 10% of expenditure |

---

## 3. Budget table (24 months, ₹ lakh, ILLUSTRATIVE)

Fixed lines are the same in every volume scenario; variable lines scale with tonnes and citizens. High volume adds 2 field staff.

| # | Line | Low volume | Base volume | High volume | Type |
|---|------|-----------:|------------:|------------:|------|
| 1 | Setup, DPR, legal | 10 | 10 | 10 | Fixed |
| 2 | 12-week manual pilot (operator mobilisation, field team, freight, scales, counsel, WA; excl. incentives and float) | 15 | 15 | 15 | Fixed |
| 3 | Software build Phases 0–2 | 140 | 140 | 140 | Fixed |
| 4 | Software O&M (months 16–24) | 40 | 40 | 40 | Fixed |
| 5 | Hosting (cloud / SDC) | 27 | 27 | 27 | Fixed |
| 6 | Messaging (WhatsApp BSP, SMS, OTP) | 3 | 8 | 15 | Variable |
| 7 | Audits: CERT-In, STQC/GIGW, DPDP, ledger audit, evaluation | 40 | 40 | 40 | Fixed |
| 8 | Field operator contract, fixed fee (months 7–24) | 72 | 72 | 96 | Semi-fixed |
| 9 | Operator logistics viability gap | 9 | 12 | 7 | Variable |
| 10 | Citizen incentive top-ups (DBT) | 15 | 39 | 74 | Variable |
| 11 | Shop joining / goodwill | 5 | 5 | 5 | Fixed |
| 12 | Float loss and carrying cost | 1 | 2 | 4 | Variable |
| 13 | IEC / awareness | 30 | 30 | 30 | Fixed |
| 14 | Department PMU staff | 108 | 108 | 108 | Fixed |
| | **Subtotal** | **515** | **548** | **611** | |
| 15 | Contingency 10% | 52 | 55 | 61 | |
| | **Total expenditure (24 months)** | **~₹5.7 cr** | **~₹6.0 cr** | **~₹6.7 cr** | |
| | Float corpus (recoverable capital, separate head or recycler advance) | 6 | 20 | 40 | Capital |
| | **Cash to be sanctioned incl. float** | **~₹5.7 cr** | **~₹6.2 cr** | **~₹7.1 cr** | |

**Cost shape:** in the base case, **~89% of spend is fixed** (software, PMU, operator retainer, audits, hosting, IEC). Only ~11% moves with tonnes. The programme is a fixed-cost platform wrapped around a small variable flow.

### 3.1 Cost-range sensitivity on the cost side (base volume)

| Variant | Build | PMU | Operator fixed | Total 24-mo spend |
|---------|------:|----:|---------------:|------------------:|
| Lean (OSS reuse, thin Phase 0–1 only, shared PMU with MPSEDC/SPCB, ULB pays IEC) | 80 | 60 | 48 | **~₹3.9 cr** |
| Base | 140 | 108 | 72 | **~₹6.0 cr** |
| Heavy (large SI via QCBS, native apps, 5-person PMU) | 250 | 192 | 96 | **~₹8.4 cr** |

---

## 4. Cost per formal tonne and per citizen served

### 4.1 Full 24-month cost (includes one-time build)

| Scenario | 24-mo spend | Formal tonnes | **Cost per tonne** | Cost per kg | Citizens served | **Cost per citizen** |
|----------|-----------:|--------------:|-------------------:|------------:|----------------:|---------------------:|
| Low | ₹567L | 150 t | **₹3.78 lakh/t** | ₹378 | 20,000 | **₹2,830** |
| Base | ₹603L | 390 t | **₹1.55 lakh/t** | ₹155 | 52,000 | **₹1,160** |
| High | ₹672L | 745 t | **₹0.90 lakh/t** | ₹90 | 99,000 | **₹680** |
| Lean cost + high volume | ~₹450L | 745 t | ₹0.60 lakh/t | ₹60 | 99,000 | ₹455 |

### 4.2 Steady-state recurring cost (year 2+, excluding build)

Recurring fixed run rate ≈ O&M ₹50L + hosting ₹18L + audits ₹10L + operator ₹48L + IEC ₹15L + PMU ₹54L ≈ **₹2.0 cr/year**, plus variable (~₹1,000–6,000/t gap + ₹75 per citizen).

| Monthly formal volume | Annual tonnes | Recurring fixed cost per kg | Plus variable | **All-in recurring ₹/kg** |
|----------------------:|--------------:|----------------------------:|--------------:|--------------------------:|
| 8 t | 96 t | ₹208 | ~₹16 | **~₹224** |
| 25 t | 300 t | ₹67 | ~₹13 | **~₹80** |
| 50 t | 600 t | ₹33 | ~₹11 | **~₹44** |
| 100 t (≈ IMC's whole current collected flow and more) | 1,200 t | ₹17 | ~₹10 | **~₹27** |

### 4.3 Comparison with the value in the material

| Value per tonne (ILLUSTRATIVE) | ₹/t | Who receives it today |
|--------------------------------|----:|-----------------------|
| Recycler landed value, blended (B2) | ₹45,000 | Hub / shop chain |
| EPR certificate floor, consumer EEE (B4) | ₹22,000 | Recycler (paid by producer) |
| EPR certificate floor, IT/telecom (B4) | ₹34,000 | Recycler |
| CPCB assumed collection + transport cost (B5) | ₹25,000 | Benchmark for "efficient" collection |
| **Material + certificate combined (upper bound)** | **~₹67,000–79,000** | |
| EcoSure programme cost, base, 24-month | **₹1,55,000** | State |
| EcoSure programme cost, high, 24-month | **₹90,000** | State |
| EcoSure recurring, 50 t/month | **₹44,000** | State |

Reading: in the 24-month window, the state spends **2–3.5× the combined recycler + EPR certificate value of every tonne** it formalises in base volume, and **5–8×** in low volume. Only in steady state at ≥ 50 t/month does recurring cost fall to roughly the value of the material alone, and only at ~100 t/month does it approach CPCB's own ₹25/kg collection-cost benchmark. By contrast, Bhopal's ULB model (B9) is revenue-positive to the city at 3.5–5 t/month because it buys no software, PMU, or incentives.

---

## 5. Findings

### F1. The absolute amount is easily fundable by Madhya Pradesh; value for money is the real barrier.
~₹6 cr over 24 months (~₹3 cr/year) is a rounding error against a state budget in the ₹4+ lakh crore range (MP 2025-26 budget ~₹4.2 lakh cr; 2026-27 figure UNVERIFIED) and is in line with ordinary MPSEDC e-governance projects. It likely sits within department / SPCB sanction powers or needs one Finance Department concurrence (exact MP delegation thresholds UNVERIFIED). The obstacle is the DPR test: Finance will compare ₹1.5 lakh per formal tonne (base) against Bhopal's royalty-earning model and IMC's existing vendor flow, and ask why the state is paying more than the material and certificate are worth.

### F2. The programme is ~90% fixed cost at pilot-corridor volumes; volume is the only lever that matters.
Software, PMU, operator retainer, audits, and IEC make up ~₹4.9 cr of the base ₹6.0 cr. Moving from low (150 t) to high (745 t) volume adds only ~₹1 cr but cuts cost per tonne by 76%. The PRD's success metric "formal tonnes grow every month" has no numeric floor, and the corridor checklist gates on shop count, not tonnes. A corridor that settles at 8 t/month (the pilot kill threshold) costs ~₹2.2 lakh per tonne in steady state, indefinitely.

### F3. EcoSure's volume ambition is small relative to Indore's existing formal flow, which changes the design choice.
IMC already collects ~60–75 t/month through door-to-door vehicles and two vendors (B8, UNVERIFIED). The base scenario reaches 25 t/month by month 24. Running a parallel shop→hub network produces a high-cost sliver; making EcoSure the custody and evidence layer on top of IMC's existing collection (plus the shop network as an add-on) is the only path to the 50–100 t/month where unit costs become defensible.

### F4. Citizen incentives are a small share of cost; the "per citizen served" cost is dominated by overhead.
Base incentive spend is ~₹39L (6.5% of budget), yet cost per citizen served is ~₹1,160 against a ₹75 incentive: ~94% of the per-citizen cost is platform and programme overhead. Cutting incentives to save money is the wrong lever and would reduce volume, raising unit cost. Funding the citizen payment mostly from recycler value (as `17-funding.md` recommends) makes the scheme top-up smaller still.

### F5. The build is priced for a multi-year platform but gets only ~9–12 months of use inside a 24-month window, and the PRD has no budget, no amortisation view, and no cost-recovery lines.
Phase 1 goes live around month 12 at best (later with competitive QCBS). Amortised over 5 years with one corridor, the ₹1.8 cr build + O&M is ~₹36L/year; spread over 3–5 corridors it falls to ₹7–12L per corridor-year, which is where the platform investment makes sense. The PRD's "no fee, no commission" stance leaves the state paying everything; producer evidence exports (the only party with an EPR-linked benefit) carry no cost-recovery fee, and the certificate value (₹22–34k/t) flows past the programme entirely.

### Additional observations
- The float corpus (₹6–40L) is small; the problem is legality and custodian (`07`, `10`), not size. A recycler advance written into the offtake agreement removes it from the state budget.
- Audits are cheap (₹40L incl. evaluation) relative to their approval-gating power; they should be budgeted from day one, not discovered at go-live.
- PMU cost (₹1.08 cr) is the second-largest line and is often omitted in startup-style estimates. Omitting it would understate the programme by ~18%.
- Certificate-floor litigation (B4) is a budget risk: if the floor falls, recycler willingness to share value down the chain drops and the state's viability-gap line grows.

---

## 6. Recommended PRD changes

| Priority | File | Change |
|----------|------|--------|
| **1** | `00-overview.md` §1 Programme assumptions (Funding row) and new §1a "Programme budget" | Add a stated 24-month envelope with fixed/variable split: "Indicative 24-month budget ₹5.5–7 cr (ILLUSTRATIVE, to be replaced by DPR): software build + O&M ~30%, PMU ~18%, field operator ~13–16%, audits/evaluation ~7%, IEC ~5%, citizen top-ups 3–11%, contingency 10%; float corpus ₹6–40L separate and preferably recycler-advanced." Require a DPR with cost per formal tonne and cost per citizen served before sanction. |
| **2** | `00-overview.md` §7 Success metrics; `13-roadmap.md` gates | Add numeric **volume and unit-cost gates**: pilot week-12 run rate ≥ 8 t/month (existing kill threshold, make it a PRD gate); Phase 1 exit ≥ 25 t/month; month-24 target ≥ 50 t/month; programme reports **recurring cost per formal kg** monthly, with a sponsor review if it stays above ₹100/kg for two quarters. Keep "formal network only" labelling. |
| **3** | `00-overview.md` §6 Stakeholders, §4 Positioning; `13-roadmap.md` Phase 1 | Reposition the Indore corridor as the **custody and evidence layer on top of IMC's existing e-waste collection and vendors**, with the shop→hub network as an additional channel, so volume starts near IMC's ~60 t/month instead of from zero. Add IMC as co-sponsor and co-funder of IEC and collection points (16th FC tied SWM grants per `17-funding.md`). |
| 4 | `13-roadmap.md` Phase 0–2 | Scope the build to the **lean variant** (OSS stack, web/PWA not native apps, reuse MPSEDC hosting/SSO where possible) with a build cap; state that Phase 2 producer features are funded only if ≥ 10 producers sign intent. Add a 5-year amortisation line and state that platform investment is justified only with a committed second corridor (Phase 3). |
| 5 | `00-overview.md` §1 Funding; `08-manufacturer.md` | Add a cost-recovery line: producers pay a per-kg evidence/attestation service charge or per-export fee (cost recovery, not commission on scrap), and offtake agreements pass a defined share of certificate value down the chain. Target: cover ≥ 30% of recurring operating cost from non-budget sources by month 24. |
| 6 | `14-open-questions.md` Sponsor decisions | Add SP: budget head and sanction amount; SP: PMU staffing (new hires vs deputation vs MPSEDC shared); SP: float custodian (recycler advance default). Add OQ: MP delegation-of-financial-powers threshold for this sanction; OQ: GEF/UNDP–MeitY co-funding of build and evaluation. |
| 7 | `10-workflows.md` / `09-government.md` | Operator console shows monthly cost per formal kg, fixed vs variable burn, and incentive top-up per fund source, so the unit-cost gate is measured from platform data. |

---

## 7. Score

**4 / 10** for budget realism and state fundability of v2 as written.

- **For:** the programme is small in absolute terms and fits MP's normal e-governance spend; the WoZ pilot keeps early spend low (~₹15L ops before any build); "no mock data" and the gate structure make a gate-conditional budget possible; audit and hosting costs are modest.
- **Against:** the PRD contains no budget, no fixed/variable split, no unit-cost metric, and no numeric volume target. At the volumes the pilot design implies (8–25 t/month), the state pays ₹0.9–3.8 lakh per formal tonne over 24 months, 2–8× the combined recycler and EPR certificate value. PMU and O&M are not acknowledged. Cost recovery from producers and certificate value is absent.
- **With the changes above** (numeric volume gates, IMC-layered positioning, lean build, cost-recovery line, and a stated envelope), the programme becomes a defensible ₹4–6 cr demonstration with a credible path to ~₹25–45/kg recurring cost, and this score rises to about 7/10.
