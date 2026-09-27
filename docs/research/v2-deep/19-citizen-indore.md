# 19 — Citizen adoption simulation for Indore (12 months)

**Agent:** 19 of 36 (v2 deep-research swarm)  
**Date:** 2026-09-27  
**PRD reviewed:** `00-overview.md`, `04-consumer.md`, `10-workflows.md` (v2)  
**Wave-1 inputs:** `07-payments-dbt.md`, `08-sms-whatsapp.md`, `12-madhya-pradesh.md`, `14-informal-sector.md`, `15-india-precedents.md`  
**Question:** How many Indore households will actually hand over e-waste through EcoSure in the first 12 months? How does that compare with kabadiwalas and IMC? What does the incentive size (₹0 / 30 / 75 / 150 per device) and the payout rail (instant vs PFMS daily batch) do to pickups and tonnes?

**Bottom line:** With the PRD as written (SPCB-led, no IMC partnership, continuous booking, 8-shop launch), the base case (₹75 per device, public-money daily batch) reaches about **1,300 household hand-overs and ~5 t per month by month 12, ~33 t in year one**. That is under 10% of what IMC already says it collects (~60–75 t/month) and under 2% of estimated city generation. Co-running with IMC (vehicle announcements, ward reach, monthly drives) roughly **doubles to 2.2×** every scenario. Incentive size has diminishing returns and becomes **fraud-positive above ~₹75 per device**, because it exceeds what a dead phone is worth to a kabadi. Instant payout adds roughly **15–20% volume** over a daily batch at the same cost per kg. A per-device incentive is the wrong unit.

All numbers below are model outputs from stated assumptions, not measurements. Treat them as order-of-magnitude planning figures to be replaced by Wizard-of-Oz pilot data.

---

## 1. Sources

| # | Source | URL | Used for | Status |
|---|--------|-----|----------|--------|
| S1 | TOI, IMC GIS property survey (Jan–Feb 2025): "population of around 35 lakh within IMC city limits" | https://timesofindia.indiatimes.com/city/indore/imc-to-boost-property-tax-collection-with-gis-survey-like-pimpri-chinchwad-model/articleshow/117652036.cms ; https://timesofindia.indiatimes.com/city/indore/naksha-project-gis-survey-to-boost-imcs-property-tax-collection/articleshow/118366271.cms | Population | Verified (news quoting IMC commissioner) |
| S2 | The Sootr, 7.30 lakh IMC property-tax accounts (Dec 2025) | https://thesootr.com/state/madhya-pradesh/indore-municipal-corporation-property-tax-hike-high-court-hearing-update-10941689 | Household proxy | News; includes non-residential accounts, so household count is **UNVERIFIED** |
| S3 | TOI, "Indore now shifts focus on Swachh e-waste disposal" (May 2024): 10–12 t/day generated, IMC collects 2–2.5 t/day via door-to-door vehicles and two vendors, "payment of up to Rs 20/kg" | https://timesofindia.indiatimes.com/city/indore/indore-shifts-focus-on-swachh-e-waste-disposal/articleshow/110241375.cms | IMC baseline, ₹/kg benchmark | News quoting IMC Addl. Commissioner; figures **UNVERIFIED** |
| S4 | Indian Masterminds / IMC site, Swachhotsav e-waste drive (17 Sep–2 Oct 2025): drop boxes at IMC HQ and Smart City office; door-to-door phase planned | https://indianmasterminds.com/news/swachhotsav-indore-mohan-yadav-e-waste-drive-145675/ ; https://www.imcindore.mp.gov.in/ | IMC competing/partner channel | Verified |
| S5 | Free Press Journal, 5,46,724 "segregation selfies" across 85 wards, six categories including e-waste (2026) | https://www.freepressjournal.in/indore/indore-turns-waste-segregation-into-a-selfies-world-of-record | IMC mobilisation capacity | Verified (news) |
| S6 | Free Press Journal, "Indore tops MP in digital payments with 51% UPI adoption" (6 Sep 2026): 51% of bank account holders in Indore use UPI/digital payments; national 33% | https://www.freepressjournal.in/bhopal/indore-tops-mp-in-digital-payments-with-51-upi-adoption-well-above-33-national-average | UPI eligibility | Verified (news); per-account, not per-household |
| S7 | MP urban/rural digital payments study (n=1,000): UPI used by 63.8% urban vs 28.2% rural respondents | https://exa.ai/library/publication/dsx9r10tg6p | UPI eligibility cross-check | Academic, low tier; **UNVERIFIED** sampling |
| S8 | MoSPI CMS: Telecom 2025 via PIB: 85.5% of households have a smartphone | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2132330 | WhatsApp reach | Verified (cited in agent 08) |
| S9 | Redseer, "Consumers are hoarding e-waste": ~60% of Indian households hold unused/broken electronics, average 3 devices | https://redseer.com/articles/consumers-are-hoarding-e-waste-because-they-dont-know-any-better/ | Dormant stock | Industry research; **UNVERIFIED** method |
| S10 | ETBrandEquity / Gizbot on Cashify survey 2025 (n=10,000): 70% hoard 2–3 unused phones; ~60% intend to sell, ~15% actually do; most pass to family | https://brandequity.economictimes.indiatimes.com/news/research/70-of-indians-hoard-23-unused-phones-at-home-report/124117010 ; https://www.gizbot.com/mobile/features/seven-in-ten-indians-are-sitting-on-unused-phones-worth-thousands-and-barely-anyone-sells-128297.html | Intention–action gap | Vendor survey; **UNVERIFIED** |
| S11 | Business Standard on ICEA–Accenture: 206 mn idle phones/laptops; reasons: weak incentive, data attachment, awareness | https://www.business-standard.com/industry/news/from-smart-phones-to-laptops-206-mn-obsolete-devices-lying-with-households-123090101058_1.html | Barriers (data fear) | Verified (news on industry report) |
| S12 | Bhopal primary e-waste inventory: 2.86 kg/household/year; 287,170 households | https://exa.ai/library/publication/7q8lmts7bjf | Per-household flow (MP city) | Academic, small sample (n=70 HH); **UNVERIFIED** |
| S13 | Dehradun survey: ~10.4 kg/household/year incl. large appliances; phone 0.1 kg, laptop 3.5 kg | https://exa.ai/library/publication/n3f6rbgsgyj | Device weights, upper bound | Academic; **UNVERIFIED** |
| S14 | Borthakur (Bangalore): 59.3% retain obsolete electronics; 95.8% unaware of any formal recycling centre | https://ideas.repec.org/a/taf/jenpmg/v62y2019i4p717-740.html | Awareness gap | Peer-reviewed (2019) |
| S15 | Kabadi price lists 2026: dead mobile ₹30–60/piece (UniScrapWala, Hyderabad); "mobile scrap ₹300–600", laptop ₹150–450/piece, mixed e-waste ₹30–90/kg (Kabadiwala Online, Delhi NCR); laptop scrap ₹60–450/kg (IndiaMART) | https://uniscrapwala.com/service/mobile-phones ; https://kabadiwalaonline.in/price-list/ ; https://kabadiwalaonline.in/scrap-price-today/ ; https://dir.indiamart.com/impcat/laptop-scrap.html | Informal price benchmark | Commercial listings, not Indore; **UNVERIFIED** for Indore street prices |
| S16 | Agent 15: Kerala HKS ~₹8/kg paid at door (97.7 t in 2.5 months, 93 ULBs); GHMC 15 t in 2 days, cash on spot; Pune 150 pickups ≈ 3 t; EDMC 25/39 cancelled; BMC households ~25% of 21.6 t in 5 months | `docs/research/v2-deep/15-india-precedents.md` | Calibration | Wave-1 (sources cited there) |
| S17 | Agent 07: public-money DBT pays by APBS/NACH in daily batch, T+4 working-day response; instant UPI only on private (producer) money via bank/PA escrow | `docs/research/v2-deep/07-payments-dbt.md` | Payout rail | Wave-1 |
| S18 | Agent 12: MP has ~10% household share of formal volume; UER Indore ~450 t in FY24; IMC paid pickup app announced Apr 2025 | `docs/research/v2-deep/12-madhya-pradesh.md` | Local context | Wave-1 |

**Not found:** an Indore-specific household e-waste survey, Indore street kabadi prices for dead phones in 2026, and IMC's actual e-waste tonnage for 2025–26. All three are Week 0 measurement tasks.

---

## 2. Assumptions

All parameters are editable; they were chosen to be conservative and are anchored to the sources above where possible. The model script is reproduced in §3.4.

### 2.1 Population and eligibility

| Parameter | Value | Basis |
|-----------|-------|-------|
| Households in IMC area | 750,000 | 35 lakh population (S1) ÷ ~4.6 persons; cross-check 7.3 lakh tax accounts (S2). **UNVERIFIED** |
| Serviceable share (covered by approved shops) | 30% M1–3 (8 shops, main wards) → 50% M4–6 → 70% M7–12 | PRD §8 launch gate of 8 shops; assumes network grows to ~20 shops |
| Households holding disposable e-waste | 60% | S9, S14 |
| Households able to receive UPI | 75% | 85.5% smartphone (S8) × ~51–64% account-level UPI (S6, S7) lifted to household level (any member). **UNVERIFIED** |
| Non-UPI households | Respond as if incentive = ₹0 | Scheme has no alternative payout in v2 |

### 2.2 Funnel

| Stage | Parameter | Solo (PRD as written) | With IMC co-run |
|-------|-----------|-----------------------|-----------------|
| Awareness | New share of serviceable HH aware per month | 4% declining to 2% → **~36% by M12** | 12% declining to 3% → **~71% by M12** |
| First pickup | Monthly conversion of aware, holding, not-yet-tried HH | ₹0: 0.6% · ₹30: 0.9% · ₹75: 1.4% · ₹150: 2.0% | same |
| Repeat | Share of first-time users who hand over again within 12 months | ₹0: 10% · ₹30: 14% · ₹75: 18% · ₹150: 24% | same |
| Society/RWA drives | Drives per month | 0 → 6 (starting M3) | 2 → 12 |
| Drive participation | Residents per drive (at ₹75) | 35, scaled ×0.6 / 0.8 / 1.0 / 1.25 for ₹0/30/75/150 | same |

Rationale for conversion levels: Cashify reports ~60% intend to sell a stored phone but only ~15% do (S10). Data fear and "value" attachment are top barriers (S11, S14). Delhi and Mumbai always-on municipal services produced negligible household volume (S16). A 0.6–2.0% monthly conversion of *aware* holders gives cumulative 12-month trial of roughly 7–22% of aware holders, which is optimistic compared with MCD/BMC and conservative compared with Kerala/GHMC drive spikes.

### 2.3 Material and money

| Parameter | Value | Basis |
|-----------|-------|-------|
| Weight per doorstep/drop hand-over | 4.0 kg | Phones 0.1–0.2 kg, laptop 2–3.5 kg, small appliances 1–3 kg (S13); Pune ~20 kg/pickup includes bulk (S16), so household-only is set much lower. **UNVERIFIED** |
| Incentive-eligible devices per hand-over | 2.5 | "2 phones, 1 laptop, 1 mixer" example in C2 |
| Weight per drive resident | 3.0 kg, 2 devices | Assumption |
| Incentive | Per device, only to UPI-eligible households | Query brief; C6 says "per category" |
| Instant vs daily batch | Batch multiplies first-pickup conversion by **0.85** and drive participation by **0.75** | Drives compete with kabadi and GHMC-style cash on the spot (S16); batch credit takes T+1 to T+4 working days (S17). Behavioural discount is an assumption, **UNVERIFIED** |
| Kabadi benchmark | Dead phone ₹30–60; laptop ₹150–450; mixed e-waste ₹30–90/kg; paid in cash immediately, no data questions | S15 (non-Indore listings) |
| IMC benchmark | ~2–2.5 t/day ≈ 60–75 t/month; vendors paid "up to ₹20/kg" (direction unclear) | S3 |

---

## 3. Simulation

### 3.1 Monthly hand-overs and tonnes (all channels: doorstep + drop + drive)

| Scenario | Incentive | Rail | M3 /month | M6 /month | M12 /month | M12 t/month | Year-1 hand-overs | **Year-1 tonnes** | Incentive spend | **₹ per kg** |
|----------|-----------|------|-----------|-----------|------------|-------------|-------------------|-------------------|-----------------|-------------|
| Solo | ₹0 | — | 136 | 350 | 811 | 3.1 | 5,230 | **20** | ₹0 | 0 |
| Solo | ₹30 | Instant | 186 | 481 | 1,118 | 4.3 | 7,197 | **28** | ₹3.9 L | 14 |
| Solo | ₹30 | Batch | 153 | 402 | 938 | 3.6 | 6,025 | **23** | ₹3.3 L | 14 |
| Solo | ₹75 | Instant | 260 | 684 | 1,592 | 6.2 | 10,253 | **40** | ₹14.0 L | 35 |
| **Solo (PRD base)** | **₹75** | **Batch** | **214** | **573** | **1,343** | **5.2** | **8,619** | **33** | **₹11.8 L** | **35** |
| Solo | ₹150 | Instant | 350 | 932 | 2,175 | 8.4 | 13,995 | **54** | ₹38.4 L | 71 |
| Solo | ₹150 | Batch | 289 | 783 | 1,843 | 7.2 | 11,804 | **46** | ₹32.5 L | 71 |
| IMC co-run | ₹0 | — | 330 | 825 | 1,623 | 6.2 | 11,420 | **44** | ₹0 | 0 |
| IMC co-run | ₹30 | Instant | 451 | 1,133 | 2,238 | 8.6 | 15,709 | **60** | ₹8.5 L | 14 |
| IMC co-run | ₹30 | Batch | 373 | 943 | 1,880 | 7.3 | 13,144 | **51** | ₹7.2 L | 14 |
| IMC co-run | ₹75 | Instant | 635 | 1,604 | 3,187 | 12.3 | 22,351 | **86** | ₹30.5 L | 35 |
| IMC co-run | ₹75 | Batch | 526 | 1,341 | 2,692 | 10.5 | 18,779 | **73** | ₹25.7 L | 35 |
| IMC co-run | ₹150 | Instant | 859 | 2,181 | 4,355 | 16.9 | 30,488 | **118** | ₹83.5 L | 71 |
| IMC co-run | ₹150 | Batch | 714 | 1,828 | 3,695 | 14.4 | 25,704 | **100** | ₹70.6 L | 71 |

Incentive spend excludes logistics, collector pay, messaging and payout fees.

### 3.2 Comparison with incumbent channels (month 12, t/month)

| Channel | t/month | EcoSure PRD base as % | EcoSure best case (IMC, ₹150 instant) as % |
|---------|---------|-----------------------|------------------------------------------|
| City generation (10–12 t/day, S3) | 300–360 | 1.4–1.7% | 4.7–5.6% |
| IMC door-to-door vehicles (2–2.5 t/day, S3) | 60–75 | 7–9% | 23–28% |
| Informal kabadi + hoarding (residual) | ~225–285 | 2% | 6–7% |
| One Indore recycler, UER (~450 t/yr, S18) | ~37 | 14% | 45% |

### 3.3 What drives the numbers

1. **Awareness is the binding constraint, not incentive.** Moving from solo to IMC co-run at ₹0 (44 t) beats solo at ₹150 instant (54 t) on cost: the IMC ₹0 scenario spends nothing on incentives. IMC mobilised 5.46 lakh segregation selfies across 85 wards (S5); EcoSure alone has no comparable reach.
2. **Incentive elasticity falls fast.** ₹0→₹30 adds ~38% volume at ₹14/kg. ₹30→₹75 adds ~43% at a marginal ~₹60/kg. ₹75→₹150 adds ~37% at a marginal ~₹120/kg.
3. **Per-device incentives mis-price material.** A phone weighs ~0.15 kg. ₹75 per phone is ~₹500/kg, versus ₹30–90/kg for mixed e-waste (S15) and IMC's "up to ₹20/kg" (S3). At ₹150 per device the scheme pays more than a kabadi does for a dead phone (₹30–60, S15). That creates an arbitrage: buy dead phones from kabadis and claim the incentive. The 4-pickups-per-citizen cap (C6) does not stop it, because the unit is devices, not pickups, and one shop can route many "citizens".
4. **Instant vs batch.** Under the assumed discount, instant payout lifts year-one tonnes by 17–20% at the **same ₹/kg**, because cost scales with volume. The effect is largest for drives, where the competing offer is cash on the spot (GHMC, kabadi).
5. **Shop economics are thin.** PRD base at M12 = ~1,340 hand-overs/month over ~20 shops ≈ 2–3 per shop per day, about 13 kg/shop/day. That is unlikely to keep a shop from diverting to informal buyers, which is why bulk and institutional flows (agents 12, 15) matter.
6. **The PRD metric "formal tonnes grow every month" will be met trivially** by any scenario, because it starts from zero. It says nothing about whether volume is additional or diverted from IMC's existing stream.

### 3.4 Model (reproducible)

```python
HH, ELIG_UPI, HOLD = 750_000, 0.75, 0.60
KG_DOOR, DEV_PER_PICKUP, KG_DRIVE_RES, RES_PER_DRIVE = 4.0, 2.5, 3.0, 35
serviceable = [0.30]*3 + [0.50]*3 + [0.70]*6
aw_gain = {"solo": [.04,.04,.035,.035,.03,.03,.03,.025,.025,.025,.02,.02],
           "imc":  [.12,.10,.08,.07,.06,.05,.05,.04,.04,.04,.03,.03]}
drives  = {"solo": [0,0,2,2,3,3,4,4,5,5,6,6], "imc": [2,3,4,5,6,8,8,10,10,12,12,12]}
hazard     = {0: .006, 30: .009, 75: .014, 150: .020}   # monthly first-pickup conversion
drive_mult = {0: .6, 30: .8, 75: 1.0, 150: 1.25}
repeat_12m = {0: .10, 30: .14, 75: .18, 150: .24}
BATCH_FACTOR, BATCH_DRIVE_FACTOR = 0.85, 0.75
# monthly: aware += gain; new = (HH*serviceable*HOLD*aware - tried) * h
# h blended: UPI households get hazard[inc], others hazard[0]; batch multiplies by BATCH_FACTOR
# repeats = tried * repeat_12m / 12; drive residents = drives * 35 * drive_mult (* 0.75 if batch)
# kg = (new+repeats)*4 + drive_res*3; cost = devices * incentive * ELIG_UPI
```

### 3.5 Sensitivity (qualitative)

- Kg per hand-over is the largest single lever on tonnes: at 8 kg instead of 4 kg, doorstep tonnes double while ₹/kg halves. The pilot must measure it in week 1.
- If UPI eligibility is 60% rather than 75%, incentive scenarios lose ~10% of their uplift.
- If awareness growth halves (no drives, no IMC vehicles), the solo base drops to ~20 t/year, similar to the ₹0 case.
- If Indore kabadis actually pay ₹300+ for dead smartphones (the higher S15 listings), incentive-driven phone volume falls sharply and EcoSure mainly collects low-value small appliances.

---

## 4. Findings

**F1. The PRD base case yields ~5 t/month by month 12 and ~33 t in year one (UNVERIFIED model).** That is ~1.5% of city generation and under 10% of IMC's claimed vehicle collection. It is enough to prove the custody chain, not to move Indore's formal share.

**F2. IMC partnership is worth more than any incentive level.** Co-running with IMC (vehicle announcements, ward staff, RWAs, monthly drives) multiplies volume by 2.2× at zero extra incentive cost. Without IMC, EcoSure is a third offer competing with IMC's free collection and its announced paid pickup app (S3, S4, S18).

**F3. The incentive should be modest and weight- or category-banded, not per device.** ₹30 gives the best tonnes per rupee (₹14/kg). ₹75 per device costs ~₹35/kg, above IMC's ₹20/kg vendor rate. ₹150 per device (~₹71/kg) exceeds the kabadi price of a dead phone and invites fraud through device harvesting from kabadis.

**F4. Instant payout is worth ~15–20% more volume at the same ₹/kg, and matters most for drives.** On public money the rail is a daily batch with T+1 to T+4 credit (S17). The PRD promise "paid when marked collected" will be read by citizens as instant. If credit arrives days later, the gap between promise and experience will show up as complaints and lost repeat use. Instant is feasible only on producer-pool money.

**F5. Doorstep booking alone is a weak engine; drives and institutions carry tonnes in every precedent.** The model deliberately sizes RWA drives small (35 residents each), so drives supply only ~10% of month-12 tonnes. Precedents show the upside: GHMC collected ~15 t in one weekend with 110 points (S16), which is roughly three months of the PRD base case in two days. BMC's volume was 75% non-household (S16). The PRD treats society drives as one feature among nine and has no drive calendar or targets; a single city-wide mega-drive per month could plausibly double the year-one household figure (**UNVERIFIED**, not modelled).

**F6. The funnel has no measurement hooks.** The PRD tracks completion rate and disputes, but not awareness reach, trial rate, repeat rate, kg per hand-over, cost per kg or additionality versus IMC. Without them the pilot cannot calibrate any of the parameters above.

**F7. Data fear is the main barrier for the most valuable items (phones, laptops).** The wipe checklist (C3) is correct but reactive. Data attachment is a top reason for hoarding (S11), and it deserves a position in awareness messaging ("we help you wipe it at the door"), not only in the booking flow.

---

## 5. Recommended PRD changes

| # | File | Section | Change |
|---|------|---------|--------|
| 1 | `04-consumer.md` | §C6 UPI incentive | Replace "Amount set per category" with a **banded rate card**: a flat per-hand-over amount (default ₹30, configurable ₹0–75) plus a small category band for data-bearing devices, and a **cap per hand-over and per payee account per month in rupees**, not only in pickups. State that no single-device incentive may exceed the lowest published informal price for that category (checked monthly by the operator). Show the rate card at booking (as agent 15 recommends). |
| 2 | `04-consumer.md` | §C6 and §C5 | Payout timing text depends on the rail: "paid instantly" only where the corridor is funded by the producer pool; otherwise "paid to your bank within 4 working days". The collected message shows the expected credit date. At drives, prefer the instant (producer-pool) rail. |
| 3 | `00-overview.md` | §1 assumptions, §6 stakeholders | Add IMC as co-sponsor for citizen collection. The citizen launch plan depends on IMC vehicle announcements and ward staff for awareness; without IMC, cut year-one citizen targets by half. |
| 4 | `00-overview.md` | §7 success metrics | Replace "Formal tonnes … grows every month" with: household tonnes per month against a target band (PRD base: 3–6 t/month at M12; IMC co-run: 8–15 t/month), additional tonnes over the IMC baseline, and **cost per kg** (incentive + logistics). Add funnel metrics: aware households (survey), first-time hand-overs, 90-day repeat rate, kg per hand-over. |
| 5 | `04-consumer.md` | §C8 Society drive | Promote drives to the primary launch channel: a monthly drive calendar per ward cluster (target 6–12 drives/month by M12), IMC announcements, instant payout at the drive where the rail allows, and per-drive reporting (residents, kg, devices, ₹/kg). |
| 6 | `10-workflows.md` | §1 rules, §3 step 9 | Change "The citizen incentive is paid on `collected`, not later" to "queued on `collected`; released instantly (private rail) or in the next daily batch (public rail) after automated checks: payee-account cap, device-count vs weight plausibility (for example, more than 5 phones per hand-over triggers review), shop-level anomaly score". |
| 7 | `04-consumer.md` | §C9 Education | Lead awareness content with data safety ("we help you wipe it at your door") and a plain comparison with the kabadi offer (price, speed, safety, receipt). |
| 8 | `13-roadmap.md` | Pilot, Week 0–4 | Measure the simulation's parameters before Phase 1: Indore street price of dead phones/laptops at 10 kabadis (Siyaganj, Khajrana, Malgodam), kg per hand-over, awareness baseline survey (n≥400 households), IMC's actual monthly e-waste tonnes, and A/B test ₹0 vs ₹30 vs ₹75 across comparable wards. |
| 9 | `14-open-questions.md` | New sponsor questions | (a) Is there producer-pool money for instant payout at drives? (b) Will IMC co-brand and announce drives? (c) What year-one household tonnage does the sponsor consider success, given ~20–120 t is the plausible range? |

---

## 6. Score

**5 / 10** for citizen-adoption realism of PRD v2 in Indore.

- **+** The channel mix (doorstep, drop, drive), WhatsApp and Hindi, UPI instead of points, the wipe checklist, and gate details all remove real friction. The density gate prevents an empty-map launch.
- **−** No volume target, funnel metrics or cost-per-kg control, so the pilot cannot tell success from failure. The incentive unit (per device/category, uncapped in rupees) is mis-priced against material value and is fraud-positive at higher amounts. The payout promise implies instant money that public rails cannot deliver. Drives are under-weighted relative to the evidence. IMC, the dominant awareness and collection channel in Indore, is absent. Realistic year-one household output under the PRD as written is tens of tonnes, and the document should say so.
- With changes 1–5 (banded capped incentive, rail-honest payout text, IMC co-run, funnel and ₹/kg metrics, drive-first launch), this would rise to about **7.5 / 10**.
