# 15 — Monte Carlo simulation: EcoSure v3, first 24 months after sanction

**Date:** 2026-09-27
**PRD tested:** [`../../prd/v3-PRD.md`](../../prd/v3-PRD.md), mainly sections 5, 17, 18, 24, 25, 26 and 27
**Prior research used:** [`../v2-deep/19-citizen-indore.md`](../v2-deep/19-citizen-indore.md), [`../v2-deep/30-budget.md`](../v2-deep/30-budget.md), [`../v2-deep/35-premortem.md`](../v2-deep/35-premortem.md), [`../unit-economics-illustrative.md`](../unit-economics-illustrative.md)
**Model:** [`15-montecarlo.py`](./15-montecarlo.py). 10,000 runs, seed 20260927, Python 3.15 with NumPy 2.5. Full output is in `15-montecarlo-results.json` and the console log is in `run-output.txt`.
**Status:** Research only. No PRD file was edited.

> Every rupee and tonnage figure here is **illustrative**. The inputs are planning assumptions drawn from the sources listed, and several of those sources are themselves unverified (PRD section 29.3). The simulation shows which assumptions decide the outcome. It does not predict the outcome.

---

## 1. Bottom line

**Quantitative viability score: 4 / 10 for v3 as written.** With the two fixes in section 9 it rises to about 6 / 10.

- **The programme survives to month 24 in about 55% of runs.** The PRD estimates about 59% (section 27.1). Most deaths are early: pilot gate stops (13%), budget not renewed (8%), and procurement lapse (4%).
- **The volume gates look achievable only because they count relabelled tonnes.** Measured the way the PRD words them (all tonnes that EcoSure tracks), the 8, 25 and 50 t/month gates pass in 80%, 56% and 25% of runs. Counting only tonnes from new channels (households, agents and bulk consumers), they pass in 60%, 12% and 0.4% of runs. Most "EcoSure tonnes" are IMC and recycler flows that already existed.
- **The ≥30% above baseline KPI is hit in 4–37% of runs, depending on how it is measured.** The PRD definition is ambiguous (section 24.1). Read literally ("EcoSure tonnes minus the baseline"), it passes in 4.5% of runs. If total formal tonnes are compared with a static baseline, it passes in 37%, but that version credits organic growth. Genuine additionality passes in 27%.
- **Genuine success is about 10%.** That means the programme survives, new channels reach 25 t/month, and genuinely additional tonnes are at least 30% above baseline.
- **The roadmap is about twice as long as the PRD says.** Phase 2 ends at a median of month 25. It finishes within the PRD's 66 weeks in 0.3% of runs, and within 24 months in 42%.
- **Money is not the constraint; volume is.** The programme spends a median of ₹5.3 crore, and 95% of that is fixed cost. Incentive spend reaches a median of only ₹5.5 lakh of the ₹39 lakh line, because households supply only about 4 t/month. Each genuinely additional kg costs a median of ₹204 over 24 months, or ₹92/kg as a recurring cost at month 24.
- **The five inputs that matter most:**
  1. Kilograms each informal agent formalises per month.
  2. Whether IMC integration actually works.
  3. What share of IMC's flow already reaches authorized recyclers.
  4. How many agents enrol.
  5. The size of the recycler and PRO baseline, which is the denominator of the KPI.

---

## 2. What the model does

The model has six parts. Each is computed month by month, for months 1–24 after sanction.

1. **Schedule.**
   - Stage −1 comes first. If it runs past 12 months, the programme lapses.
   - The 12-week manual pilot follows, with gates at weeks 4, 8 and 12 (PRD section 25.3). A failed gate is fixed and retried once, adding 1.5 months. If it fails a second time, the steering committee stops the programme (probability 50%) or changes course, adding 2 months.
   - Phase 0 runs in parallel with the pilot, starting once the software vendor is contracted. Phase 1a follows, and go-live needs CERT-In and STQC audits. Phase 1b and Phase 2 come next.
   - The 25 and 50 t/month gates are checked at the Phase 1b and Phase 2 exits, with one 2-month retry. After a second failure the programme is killed with probability 60%.
2. **Volume, by channel:**
   - **IMC:** the share of IMC's existing vehicle and ward-point flow brought under EcoSure custody. It is 35% of the eventual capture during the manual pilot and ramps up after go-live.
   - **Other baseline flows:** recycler-direct and PRO flows logged by participating recyclers.
   - **Households:** Bass-style adoption in covered wards, plus drives. Adoption is boosted if IMC does outreach and responds to the incentive amount.
   - **Informal agents:** enrolment follows a ramp. Agents churn, which gets worse when reimbursement is slow or the price gap is wide. They divert part of their material informally, and diversion rises with the gap between street and formal prices.
   - **Bulk consumers, institutions and producer take-back.**
   - **Recycler dropout:** a temporary volume dip, or death of the programme if there is no backup recycler.
3. **Additionality.** Each channel has an uncertain share of genuinely new tonnes. The rest is baseline material that has been relabelled. The baseline is the part of IMC's flow already reaching authorized recyclers, plus recycler-direct and PRO flows.
4. **Three readings of the KPI:**
   - **Literal:** EcoSure-tracked tonnes minus the baseline, divided by the baseline.
   - **Total-formal:** genuine additions, plus organic growth, plus weight inflation, compared with a static baseline.
   - **True:** genuine additions only.

   All three are measured over months 13–24. A run counts only if the programme is alive at month 24. The literal and total-formal readings also require the baseline to have been agreed in Stage −1.
5. **Survival events,** calibrated to the v3 pre-mortem (section 27.1):
   - Budget renewal at month 15.5 (February–March 2028).
   - IMC conflict or an additionality scandal.
   - A hazard incident.
   - A fraud scandal.
   - Recycler dropout with no backup.
   - Kabadiwala backlash.
6. **Costs,** following the base budget lines from `30-budget.md` and PRD section 26.1:
   - **Fixed:** programme management unit (PMU), operator, pilot, software build and O&M, hosting, audits, outreach, setup and goodwill.
   - **Variable:** incentives including fraud leakage, messaging, and a logistics viability gap.
   - A 10% contingency on top.

**Sensitivity analysis:**

- **Tornado:** each input is pinned at its P10 and then its P90 value. The same 10,000 runs are repeated with common random numbers, and the change in outcome probabilities is recorded.
- **Spearman rank correlation:** each input against month-24 additional tonnes.

---

## 3. Assumptions table

"P10–P90" is the range that 80% of draws fall in. "Flag" inputs are yes/no events with the stated probability.

| Input | Distribution | Median (P10–P90) | Source / reasoning |
|-------|--------------|------------------|--------------------|
| Stage −1 duration | lognormal | 5.0 mo (2.6–9.5) | PRD s25.1 says 8–16 weeks; procurement research (v2-deep/10) says 2–12 months |
| Software slip multiplier, Phases 0–2 | lognormal | 1.25× (0.97–1.62) | Technical review estimated 50–62 weeks, against the PRD's ~40 weeks of phase durations |
| Extra audit delay before 1a exit | uniform | 1.5 mo (0.3–2.7) | PRD s25.5 needs security audit + STQC; 35-premortem: STQC takes 5–6 months |
| Software vendor lag after Stage −1 | lognormal | 1.0 mo (0.5–2.2) | PRD s25.2 separate vendor; MPSEDC nomination takes 2–5 months |
| IMC true existing flow | mixture | 51 t/mo (24–68) | Reported 60–75 t/mo (PRD s2.2, s26.2; TOI 2024, unverified per s29.3). 50% chance the claim is overstated |
| IMC integration works (MoU + logging) | flag | p = 0.60 | PRD s5.1, s25.2; assumed P(MoU) 0.75 × P(logging works) 0.8 |
| Maximum share of IMC flow under custody | uniform | 0.65 (0.45–0.85) | IMC's two vendors have existing contracts (19-citizen S3). If integration fails, capture is 15% of this |
| Share of IMC flow already reaching authorized recyclers | uniform | 0.73 (0.55–0.91) | Unknown; PRD s29.3 lists IMC vendor contracts as unverified |
| Recycler-direct + PRO Indore flow (baseline) | lognormal | 20 t/mo (9–43) | Assumption; one Indore recycler takes ~450 t/yr (19-citizen S18) |
| Share of that flow tracked on EcoSure | uniform | 0.45 (0.25–0.65) | Only participating recyclers log it (PRD s5.3) |
| Household market potential, covered wards | logit-normal | 12% (6.7–20.6%) | 60% of households hold e-waste × a 15–25% intention-to-action rate (19-citizen S9, S10) |
| Household trial rate (Bass p) | lognormal | 0.5%/mo (0.26–0.95) | Calibrated to the 19-citizen conversion of 0.6–2%/mo |
| Word-of-mouth rate (Bass q) | lognormal | 0.12/mo (0.07–0.20) | Assumption |
| Kg per household hand-over | lognormal | 3.5 (2.2–5.5) | 19-citizen used 4 kg, 30-budget 3 kg, unit economics 2.5 kg |
| Households covered in pilot | uniform | 105k (69k–141k) | Covered wards are not defined in the PRD (s5.6); ~750k households citywide |
| Households covered after go-live | uniform | 275k (175k–375k) | Assumption |
| Drives per month at maturity | uniform | 11 (7–15) | 19-citizen recommends 6–12; PRD s10.2 C9 |
| Residents per drive | lognormal | 30 (18–50) | 19-citizen: 35 residents at a ₹75 incentive |
| Repeat hand-overs per adopter | uniform | 2%/mo (1.2–2.8) | 19-citizen: 10–24% repeat within 12 months |
| Scheme incentive per hand-over | lognormal | ₹70 (₹45–110), elasticity 0.48 | PRD s17.3 illustrative ₹50 per device; OQ-70; elasticity from 19-citizen (₹30→₹75) |
| Payout median > 4 working days | flag | p = 0.25 (cuts uptake ×0.85) | PRD s17.2 treasury batch; v2-deep/07 T+4 |
| Agents at maturity | triangular | 40 (22–63) | PRD s25.3 needs ≥ 8 by week 4; Indore has more than 3,000 waste pickers, but few will sign |
| Agent enrolment time constant | uniform | 5.5 mo (3.5–7.5) | Assumption; PRD s11.2 S1 |
| Agents pre-recruited in Stage −1 | uniform | 5 (1–9) | PRD s25.2 |
| Gross e-waste per agent | lognormal | 400 kg/mo (210–760) | 19-citizen: ~13 kg per shop per day; unit economics: 180 kg lots |
| Street price minus formal price | uniform | ₹6/kg (₹1.2–10.8) | Unit economics Economy 2: street ₹32 vs formal ₹28 plus friction |
| Informal diversion (derived: 0.12 + 0.03 × gap) | derived | 30% (16–44%) | Unit economics: adverse selection when the gap exceeds ₹8 |
| Agent base churn | logit-normal | 3.5%/mo (2.1–5.8) | Assumption. Adds 3 points if reimbursement is slow, and more if the gap is above ₹6 |
| Agent reimbursement > 7 days | flag | p = 0.30 | 35-premortem Story 1; PRD s17 escrow reduces this risk |
| Agent tonnes already formal (relabelled) | uniform | 35% (23–47%) | PRD s5.3 layers over recyclers' own networks |
| Bulk / institutional tonnes at maturity | lognormal | 5 t/mo (2.3–10.8) | 30-budget: most tonnage is non-household; BMC: 75% non-household |
| Bulk tonnes genuinely additional | uniform | 40% (24–56%) | Rule 8 already obliges bulk consumers to use authorized channels |
| Household tonnes cannibalised from IMC | uniform | 22% (12–32%) | 35-premortem Story 2 |
| Organic growth of baseline flows | uniform | 7.5%/yr (1.5–13.5) | Generation growth plus IMC's own pickup app |
| IMC flow uplift from EcoSure outreach | uniform | 7.5% (1.5–13.5) | 19-citizen F2 |
| Fraud leakage of incentive spend | logit-normal | 8% (4.3–14%) | 35-premortem Story 4; PRD s18 controls |
| Weight inflation in reported tonnes | uniform | 2% (0.4–3.6%) | PRD s18.2 dual weighing |
| Week-8 gate first-try pass probability | uniform | 0.63 (0.45–0.81); ×0.6 if reimbursement is slow | PRD s25.3: five conditions must all pass |
| Week-12 non-volume conditions | fixed | 0.765 (LOIs 0.9 × MPPCB 0.85) | PRD s25.3 |
| Baseline agreed in Stage −1 | flag | p = 0.85 | PRD s24.1, s18.3 |
| Backup recycler before Phase 1b | flag | p = 0.60 | PRD s27.2 |
| Incentive budget top-up when exhausted | flag | p = 0.50 | PRD s26.1 incentive line of ₹39 lakh |
| Fixed-cost overrun | lognormal | 1.10× (0.91–1.33) | 30-budget contingency; government IT norms |

**Fixed survival-event settings** (calibrated to PRD s27.1 and `35-premortem.md`):

| Event | Setting |
|-------|---------|
| Budget renewal at month 15.5 | Refused with probability 0.20 if tracked volume is under 25 t/month, otherwise 0.06. Add 0.08 if the recurring cost is above ₹150/kg |
| IMC conflict or additionality scandal | 0.12 if IMC integration failed; 0.10 if less than 30% of tonnes are additional; otherwise 0.04 |
| Hazard incident | Up to 8%, scaling with tonnes handled; fatal half the time |
| Fraud scandal | 2% + 0.6 × (leakage − 5%) |
| Recycler dropout | 0.8% a month. Fatal 40% of the time if there is no backup recycler |
| Kabadiwala backlash | 3% |
| Municipal election Model Code of Conduct | 70% chance of a 2-month incentive freeze in months 6–11 |

**Cost lines** (₹ lakh, from 30-budget base):

| Line | Amount |
|------|--------|
| Setup, DPR and legal | 10 |
| Manual pilot | 5 a month |
| PMU | 4.5 a month |
| Field operator | 4 a month, after the pilot |
| Outreach | 1.25 a month |
| Hosting | 1.5 a month |
| Software build | 140, spread from Phase 0 to the Phase 2 exit |
| Software O&M | 4.4 a month, after Phase 2 |
| Audits and evaluation | 40 |
| Agent goodwill | 5 |
| Messaging | ₹15 per hand-over |
| Logistics viability gap | ₹6,000/t at 8 t or less, ₹3,000/t at 25 t, ₹1,000/t at 50 t or more (new-channel tonnes only) |
| Contingency | 10% |

---

## 4. Results (P10 / P50 / P90)

"Alive" means runs still operating at month 24 (55% of runs).

### 4.1 Schedule (months after sanction)

| Milestone | P10 | P50 | P90 | PRD claim |
|-----------|----:|----:|----:|-----------|
| Stage −1 ends / pilot starts | 2.6 | 5.0 | 9.5 | 2–4 (s25.1) |
| Pilot ends (including retries) | 6.8 | 10.4 | 16.7 | — |
| Phase 1a go-live | 12.6 | 16.5 | 22.8 | — |
| Phase 1b exit (25 t gate) | 15.8 | 20.4 | 28.1 | — |
| Phase 2 exit (50 t gate) | 19.5 | 24.9 | 33.9 | 12–15 (52–66 weeks, s1.3 / s25.1) |

The chance of reaching each milestone by month 24 is 93% for go-live, 76% for the Phase 1b exit and 42% for the Phase 2 exit. The chance of reaching the Phase 2 exit within the PRD's 66 weeks is 0.3%.

### 4.2 Tonnes per month

| Measure | P10 | P50 | P90 |
|---------|----:|----:|----:|
| Tracked t/month at month 12 (all runs) | 0 | 22.7 | 40.0 |
| Tracked t/month at month 24 (all runs; dead runs count as 0) | 0 | 30.0 | 82.8 |
| Tracked t/month at month 24 (alive runs) | 29.7 | 59.8 | 92.0 |
| New-channel t/month at month 24 (alive runs) | 11.2 | 18.7 | 31.4 |
| Genuinely additional t/month at month 24 (alive runs) | 10.2 | 20.7 | 35.2 |
| Baseline t/month (IMC formal share + recycler/PRO) | 34.4 | 56.2 | 83.6 |
| Cumulative tracked tonnes over 24 months | 41 | 434 | 1,002 |
| Cumulative additional tonnes over 24 months | 14 | 166 | 400 |
| Additional share of tracked tonnes | 28% | 40% | 51% |

**Month-24 channel mix** (alive runs, P50):

| Channel | t/month |
|---------|--------:|
| IMC custody | 27.9 |
| Recycler / PRO relabel | 9.1 |
| Agents | 8.0 |
| Bulk | 4.8 |
| Households | 3.9 |

**Other month-24 results** (alive runs):

- **Active agents:** 17 / 29 / 45 (P10 / P50 / P90).
- **Informal diversion:** P50 30% of agent material still goes to street buyers.
- **Household participation in covered wards:** 1.4% / 3.3% / 7.7%. The chance of reaching the ≥ 5% KPI (PRD s4.4, s24.1) is **15%**.

### 4.3 Money

| Measure | P10 | P50 | P90 |
|---------|----:|----:|----:|
| Total 24-month spend, all runs (₹ crore; dead runs stop spending) | 0.97 | 4.65 | 6.08 |
| Total 24-month spend, alive runs (₹ crore) | 4.31 | 5.31 | 6.38 |
| Fixed share of spend (alive runs) | 92% | 95% | 97% |
| Scheme incentive spend (₹ lakh) | 0.3 | 5.5 | 18.5 |
| Fraud leakage (₹ lakh) | 0.02 | 0.41 | 1.67 |
| 24-month cost per tracked kg (alive runs) | ₹49 | ₹78 | ₹144 |
| **24-month cost per additional kg (alive runs)** | **₹119** | **₹204** | **₹392** |
| Recurring cost per tracked kg at month 24 | ₹20 | ₹32 | ₹59 |
| **Recurring cost per additional kg at month 24** | **₹53** | **₹92** | **₹178** |

- Spend exceeds the ₹6.2 crore sanction in 8% of runs.
- For comparison, material is worth about ₹45/kg to a recycler, and CPCB assumes collection costs about ₹25/kg (PRD s26.2).
- **Fraud is a reputational risk, not a budget risk.** Leakage in rupees is tiny because the household incentive flow is tiny. The danger is a scandal (Story 4), not the money lost.

---

## 5. Gate, KPI and survival probabilities

### 5.1 Volume gates (PRD s26.3): reached and passed within 24 months

| Gate | PRD basis (all tracked tonnes) | Strict basis (new channels only) | Month-24 run rate ≥ threshold, tracked | Month-24 run rate ≥ threshold, new channels |
|------|------:|------:|------:|------:|
| 8 t/month at pilot exit | **79.6%** | 59.5% | 55.8% | 54.6% |
| 25 t/month at Phase 1b exit | **55.7%** | 11.6% | 53.3% | 13.3% |
| 50 t/month at Phase 2 exit | **24.9%** | 0.4% | 35.5% | 0.6% |

The gap between the two bases is the relabelling effect. **The PRD gates can be passed by logging IMC's and recyclers' existing flows**, which is the "additionality scandal" the pre-mortem warns about (s27.1, Story 2).

### 5.2 Headline KPI: formal collection ≥ 30% above baseline (s24.1)

| Reading of the KPI | P(hit) | Ratio in alive runs (P10 / P50 / P90) |
|--------------------|------:|-----------------------------|
| Literal: "tonnes through EcoSure above the baseline" | **4.5%** | −59% / −21% / +29% |
| Total formal tonnes vs a static 12-month baseline (credits organic growth) | **36.5%** | +24% / +43% / +74% |
| True additionality (genuinely new tonnes ÷ baseline) | **27.1%** | +14% / +30% / +58% |

The literal reading almost always fails. EcoSure never captures 100% of the baseline channels, so its tracked tonnes stay below the full baseline even when real additions happen. The static-baseline reading passes more often than the truth, because it counts organic growth and weight inflation as success.

### 5.3 Combined outcomes

| Outcome | Probability |
|---------|------:|
| **Survive to month 24** | **54.5%** |
| PRD-view success: survive, pass the 25 t gate, and hit the literal KPI | 4.4% |
| **Genuine success:** survive, new channels ≥ 25 t/month at month 24, and true KPI ≥ 30% | **10.1%** |
| Genuine success if IMC integration works | 13.3% |
| Genuine success if IMC integration fails | 5.1% |

### 5.4 Why programmes die (share of all runs)

| Cause | Share of runs |
|-------|------:|
| Pilot gate stopped after a second failure | 12.7% |
| State budget not renewed (month 15.5) | 8.0% |
| 50 t gate kill | 4.8% |
| IMC conflict / additionality scandal | 4.6% |
| Stage −1 lapse (> 12 months) | 4.3% |
| Fraud scandal | 3.2% |
| Hazard incident | 2.5% |
| Kabadiwala backlash | 2.2% |
| 25 t gate kill | 1.6% |
| Recycler dropout with no backup | 1.6% |
| **Total killed** | **45.5%** |

**Late programmes survive by not being tested.** Pinning Stage −1 at its P90 (9.5 months) raises survival to 61%, because those runs never reach the 25 or 50 t gates within 24 months. The PRD has no calendar-based checkpoint (see gap G6), so a slow programme is safer than a fast one that misses a gate.

---

## 6. Sensitivity analysis (tornado)

Each input was pinned at its P10 and then its P90 across all 10,000 runs. The table ranks inputs by the combined swing in genuine success and the true KPI. The base case is 10.1% genuine success and 27.1% true KPI.

| Rank | Input | At P10 value | At P90 value | Genuine success P10 → P90 | True KPI P10 → P90 | Survival P10 → P90 |
|----:|-------|-------|-------|------|------|------|
| **1** | **Kg each agent handles per month** | 211 kg | 759 kg | 2.2% → 24.3% | 18.3% → 39.0% | 51% → 58% |
| **2** | **IMC integration works** | yes | no | 13.7% → 4.9% | 40.3% → 7.9% | 64% → 40% |
| **3** | **Share of IMC flow already formal** | 0.55 | 0.91 | 11.8% → 7.9% | 39.3% → 13.5% | 55% → 54% |
| **4** | **Agents enrolled at maturity** | 26 | 63 | 3.6% → 18.4% | 20.4% → 34.6% | 52% → 57% |
| **5** | **Recycler/PRO baseline size** | 9 t | 43 t | 11.8% → 7.3% | 36.5% → 14.0% | 52% → 58% |
| 6 | Bulk / institutional tonnes | 2.3 t | 10.8 t | 5.9% → 16.8% | 23.9% → 32.0% | 53% → 57% |
| 7 | Street − formal price gap | ₹1.2 | ₹10.8 | 14.3% → 5.6% | 30.7% → 23.2% | 56% → 53% |
| 8 | Stage −1 duration | 2.6 mo | 9.5 mo | 11.3% → 8.3% | 31.1% → 20.6% | 53% → 61% (artefact, see 5.4) |
| 9 | Household market potential | 6.7% | 20.6% | 7.1% → 14.0% | 24.7% → 29.8% | ≈ |
| 10 | Word-of-mouth rate | 0.07 | 0.20 | 7.6% → 13.8% | 25.1% → 29.5% | ≈ |

**Inputs that barely move the outcome:**

- Incentive amount (±1.6 points on success).
- Payout speed (under 1 point).
- Fraud leakage share (±0.6 points on success, ±3 points on survival).
- Weight inflation.
- Fixed-cost overrun. It changes cost per kg but not success.
- Incentive budget top-up. The ₹39 lakh line never binds.

The software slip multiplier mainly moves survival (±10 points) and the timing of the 25 t gate (63% → 47%). The Spearman rank correlations with month-24 additional tonnes agree with the tornado: IMC integration −0.31 (negative because a low draw means success), kg per agent +0.13, IMC flow size +0.12, agents enrolled +0.09, IMC formal share −0.09 and Stage −1 −0.08.

**Plain-English reading:**

1. **The informal agent channel is the only lever that creates new tonnes at scale.** Households give about 4 t/month even at 5% participation. Agents are the difference between failure and success, and their numbers are uncertain because the PRD sets no agent target and no reason to formalise beyond the recycler's price.
2. **The IMC relationship decides both survival and the KPI.** If IMC integration fails, survival drops from 64% to 40% and the true KPI collapses to 8%.
3. **The KPI result depends on facts nobody has measured yet:** how much of IMC's flow is already formal, and how big the recycler and PRO baseline is. If IMC's vendors already deliver 90% of its flow to authorized recyclers, capturing it adds almost nothing. If the recycler baseline is large, the 30% bar rises beyond reach.

---

## 7. What must be true for success

Runs that reach genuine success usually share these conditions:

1. **IMC integration works and a meaningful slice of IMC's flow is not formal today.** Genuine success is 13% when IMC integration works, 5% when it fails, and 16% if it works, more than 25% of IMC's flow is informal, and household potential is at least 12%.
2. **About 45 or more agents are active, each formalising 400 kg or more a month.** That means a gross throughput of 500 kg or more and diversion held under about 20%. This needs a street-to-formal price gap of ₹4/kg or less (unit economics Economy 2) and reimbursement within 7 days.
3. **Bulk, institutional and government-office channels bring 8 t/month or more,** and at least half of that is new.
4. **Stage −1 finishes in about 4 months or less** (MPSEDC nomination, not open tender), so the 25 t gate is tested before month 20.
5. **The baseline is small enough, and measured by channel, so that a 30% uplift is reachable.** With a baseline of about 56 t/month, 30% means about 17 additional t/month sustained over months 13–24. New channels deliver a median of 19 t/month at month 24, but less earlier in the window.

---

## 8. PRD gaps found by the simulation

| # | Gap | PRD section | Evidence from the model |
|---|-----|-------------|-------------------------|
| G1 | **The KPI definition is ambiguous and, read literally, nearly unachievable.** "Tonnes through EcoSure above baseline" compares partially captured channels with a full baseline. The static baseline credits organic growth. Nothing adjusts for the counterfactual trend | s24.1, s4.4 | Literal 4.5% vs total-formal 36.5% vs true 27.1% |
| G2 | **Volume gates count relabelled tonnes,** contradicting the PRD's own additionality logic | s26.3, s26.2, s5.3 | Gates pass 80/56/25% on tracked tonnes vs 60/12/0.4% on new channels |
| G3 | **The timeline is too short.** 52–66 weeks from sanction to the Phase 2 exit is almost impossible once procurement, slip and audits are included | s1.3, s25.1 | Median Phase 2 exit at month 25; 0.3% finish within 66 weeks; the 50 t gate is not evaluated by month 24 in 58% of runs |
| G4 | **No agent volume target and no agent-side reason to formalise.** Agents get only the recycler price, which is below street price, so about 30% of their material is diverted | s11.2 (S5, S6), s17.2, s25.3 | Kg per agent and agent count are the #1 and #4 sensitivities; success ranges from 2% to 24% |
| G5 | **The household channel is over-weighted and the incentive line is oversized.** The ≥ 5% participation KPI is reached in 15% of runs, and incentive spend reaches a median of ₹5.5 lakh against ₹39 lakh | s4.4, s24.1, s26.1, s10.2 C7 | Households give ~3.9 t/month at month 24; the incentive amount has almost no effect |
| G6 | **No calendar-based kill or review.** Gates are tied to phase exits, so slow programmes are never tested | s25.3, s26.3, SP-09 in s29.1 | Survival rises from 53% to 61% when Stage −1 is slow |
| G7 | **The load-bearing facts are unmeasured:** IMC's true tonnage, the share of IMC's flow that is already formal, and the size of the recycler/PRO baseline | s29.3, s2.2, s26.2 | Three of the top five sensitivities; the KPI swings from 13% to 40% |
| G8 | **Cost per kg is reported on tracked tonnes,** which hides the cost of genuinely new tonnes | s26.2, s24.2 | ₹32/kg recurring on tracked vs ₹92/kg on additional tonnes at month 24 |
| G9 | **"Covered wards" is undefined,** so the participation denominator can be chosen after the fact | s5.6, s24.1 | Participation swings with the covered-household input |
| G10 | **The pre-mortem survival estimate is slightly optimistic,** and it omits pilot-gate self-termination as a cause of death | s1.3, s27.1 | 54.5% in the model vs ~59% in the PRD; pilot-gate stops alone are 12.7% |

---

## 9. Fixes

### Fix 1 — Put the KPI and the gates on genuinely new tonnes, and measure the baseline properly

These changes cover gaps G1, G2, G7, G8 and G9.

- **Define "additional tonnes" channel by channel** (PRD s24.1): additional tonnes = tracked tonnes in a channel minus that channel's baseline × the capture share for that channel. Add a trend adjustment using two or three comparison wards with no EcoSure activity.
- **Measure three numbers in Stage −1** with a weighbridge and vendor-invoice audit (s25.2, s29.3): IMC's real monthly tonnage, the share of IMC's flow already going to authorized recyclers, and recycler/PRO inflow by origin.
- **Restate the volume gates** (s26.3) as a pair: tracked tonnes (8 / 25 / 50) **and** additional tonnes (for example 5 / 12 / 20 t/month).
- **Report cost per additional kg** alongside cost per tracked kg (s24.2, s26.2).
- **Name the covered wards and their household counts** in Stage −1 (s5.6).

This fix does not raise the success odds by itself. It stops the programme from declaring a false success, and it stops a real success from being reported as a failure (a 4.5% pass rate under the literal reading against 27% true).

### Fix 2 — Make informal agents and bulk consumers the volume engine, not households

These changes cover gaps G4, G5 and G6.

- **Set agent targets** (s11, s25.3, s25.6): at least 50 agents by the Phase 1b exit, each formalising 500 kg or more a month, and track kg per agent as a headline operational metric (s24.2).
- **Close the price gap to ₹4/kg or less** with a recycler price-match clause in the agent agreement (s12.2 R3). Add a small per-kg formalisation bonus on additional agent tonnes, paid only after the recycler's device count reconciles with the agent's (s18.3). Fund it by re-scoping the underused household incentive line (s26.1, s17.4).
- **Make bulk, institutional and government-office legacy disposal a launch channel** with a target of 8 t/month or more (s10.2 C10).
- **Add calendar checkpoints** at months 12 and 18 (s25, SP-09) so a slow programme is reviewed even when no phase exit has happened.

**Simulated effect** (same runs, same seed):

| Scenario | Survive | 25 t gate (PRD) | 25 t gate (strict) | True KPI | Genuine success |
|----------|------:|------:|------:|------:|------:|
| v3 as written | 54.5% | 55.7% | 11.6% | 27.1% | 10.1% |
| Fix 2: agent engine (gap ₹0–4, agents 30–90, 500 kg, lower churn) | 59.3% | 61.1% | 35.5% | 42.3% | 31.1% |
| + bulk/government channel (median 8 t) | 60.3% | 61.8% | 42.4% | 45.1% | 36.8% |
| + Stage −1 by nomination (median 3.5 months) | 61.4% | 71.0% | 48.8% | 48.3% | 39.3% |
| + IMC MoU signed in Stage −1 (integration works with p = 0.8) | 65.9% | 73.8% | 50.7% | 55.1% | 44.3% |

---

## 10. Model limitations

- **Every input is an assumption.** Several rest on unverified sources: IMC tonnage, kabadi prices and household counts. The tornado shows which assumptions to measure first.
- **Channels are modelled as independent,** apart from a few explicit links: IMC outreach boosts household adoption, slow reimbursement raises churn, and the price gap raises both diversion and churn. Real correlations, such as one bad operator hurting every channel, would widen the ranges.
- **Survival-event probabilities are calibrated to the pre-mortem's judgement calls,** not to observed data.
- **The 50 t/month gate is often not evaluated by month 24.** Its probability here means "reached and passed within the window".
- **A monsoon or Diwali seasonal cycle is not modelled.** Diwali surges would add short-lived tonnes around months 11–13 and 23–24, depending on the sanction date.
- **Producer take-back top-ups (rail B′) are not modelled,** because the PRD gates them on letters of intent and has no volume assumption for them.

---

## 11. Score

**Quantitative viability: 4 / 10 for v3 as written.**

- **In favour:**
  - Survival (55%) is close to the PRD's own estimate.
  - Costs are stable and well inside the sanction in 92% of runs.
  - Fraud leakage is small.
  - Layering over IMC does make the tracked-volume gates reachable.
- **Against:**
  - Genuine success is about 10%.
  - The headline KPI, as written, cannot be measured reliably.
  - The gates reward relabelling.
  - The timeline is about twice the PRD's claim.
  - The household channel, which the PRD designs most carefully, contributes about 4 t/month.
  - The agent channel, which decides success, has no target, no incentive and no price protection.
- **With Fix 1 and Fix 2:** about **6 / 10.** Genuine success rises to about 37–44% in the model, and the KPI becomes honest. The remaining uncertainty is factual (IMC and baseline numbers), and only Stage −1 measurement can resolve it.
