# 22 — Micro kabadi shop participation and unit economics

**Agent:** 22 of 36, v2 deep research swarm
**Date:** 2026-09-27
**Question:** Would a micro kabadi shop in the Indore–Pithampur corridor actually join EcoSure and route *good* material through it? This takes into account the legal agent requirement, the ban on dismantling, battery separation, KYC alternatives, and payment timing under government finance rules (T+4 working days).
**PRD files read:** `05-local-recycle-shop.md`, `02-roles-rbac.md`, `10-workflows.md`, `04-consumer.md` (C6 and out-of-scope), `14-open-questions.md` (SP-04, OQ-03). Wave-1 research read: `03`, `07`, `09`, `13`, `14`. No PRD files were edited.
**Caveat:** All rupee figures are illustrative. Scrap-rate web sources are aggregator or dealer pages, not audited market data. Every number that feeds the margin model is marked **UNVERIFIED** and must be replaced with pilot week 1–4 data.

---

## 1. Sources

| # | Source | URL | Use | Status |
|---|---|---|---|---|
| W1 | ScrapRates.in, Indore rate index (24 Sep 2026): e-waste ₹41.40/kg, copper ₹574.59, Li-ion ₹79.46, aluminium ₹146.59 | https://scraprates.in/indore | Corridor off-platform price anchor | Aggregator; **UNVERIFIED** |
| W2 | ScrapRates.in, e-waste national average ₹42.77/kg (Sep 2026) | https://scraprates.in/scrap-materials/e-waste | Mixed e-waste anchor | Aggregator; **UNVERIFIED** |
| W3 | ScrapRates.in, Indore copper ₹602/kg #1, bright ₹813; insulated wire 60–75% of base | https://scraprates.in/indore/copper-scrap-price | Cable-stripping incentive | Aggregator; **UNVERIFIED** |
| W4 | TradeIndia, Indore copper scrap listings ₹340–750/kg | https://www.tradeindia.com/indore/copper-scrap-city-196883.html | Cross-check | Listings; **UNVERIFIED** |
| W5 | todaypricerates, e-waste item rates (PCB ₹400–800/kg, TV ₹40–150/kg, mixed ₹30–100/kg, phone battery ₹8–25/piece) | https://resale.todaypricerates.com/ewaste-scrap-rate | Category spread | Aggregator; **UNVERIFIED** |
| W6 | Urban Eco Recyclers, Bangalore laptop rates (dead laptop ₹300–800/unit; laptop board ₹400–900/kg; Li-ion ₹80–150/kg; LCD panel ₹20–60/kg) | https://urbanecorecyclers.com/laptop-scrap-buyer-in-bangalore/ | High-value basket and stripping uplift | Dealer page; **UNVERIFIED** |
| W7 | kabadiwalaonline.in (motherboard ₹200–350, laptop ₹180–280/kg, scrap phone ₹300–600 each) | https://kabadiwalaonline.in/e-waste-scrap-buyers-near-me/ | Phone value per unit | Dealer page; **UNVERIFIED** |
| W8 | Alibaba buying guide (unsorted motherboard ₹80–120/kg; graded ₹150–250/kg) | https://electronics.alibaba.com/buyingguides/motherboard-cpu-scrap-guide-value,-recovery-selling-tips | Sorting uplift | Secondary; **UNVERIFIED** |
| W9 | ScrapRates.in, Li-ion ₹84/kg national; "never sell to kabadiwalas" | https://scraprates.in/scrap-batteries/lithium-ion-battery | Battery value | Aggregator; **UNVERIFIED** |
| A1 | Monash (open access), *Circular economy and household e-waste management in India, Part II: kabadiwalas*: collector wage ₹0.50–2/kg; middleman buys e-waste at ₹50/kg and sells at ₹55–70/kg (refurbish stream) | https://researchmgt.monash.edu/ws/portalfiles/portal/501931386/477758180_oa.pdf | Informal margin structure (10–40%) | Peer-reviewed |
| A2 | ET Edge / Kabadiwalla Connect Chennai study: level-1 scrap shops average ~9,293 kg/month (all materials), level-2 ~45,966 kg/month | https://etedge-insights.com/sdgs-and-esg/sustainability/understanding-the-potential-of-informal-waste-recycling-in-chennai/ | Checks whether the 500 kg cap fits | Secondary; 2017 data |
| A3 | NextBillion on Kabadiwalla Connect: middlemen buy at ~20% margin; small volume, single processor relationship | https://nextbillion.net/from-trash-to-resource-how-technology-can-help-informal-waste-pickers-solve-indias-recycling-problem/ | Aggregation value to shops | Secondary |
| A4 | Resource Recycling (2018) on Karo Sambhav: informal processors outbid formal ones; material is cherry-picked before reaching the formal sector; pilot subsidies unsustainable | https://dev.resource-recycling.com/e-scrap/2018/09/20/how-group-bolsters-standing-of-indias-informal-workers/ | Adverse selection precedent | Secondary |
| A5 | Economic Times (2012), MAIT: "informal sector continues to offer better prices"; Panasonic collection boxes "hardly got any e-waste" | https://economictimes.indiatimes.com/tech/hardware/what-happens-to-the-millions-of-gadgets-we-discard/articleshow/11852112.cms | Historical failure of formal take-back | Secondary, old |
| A6 | Sage / *Vikalpa* (2019), *E-Waste Management in India: Issues and Strategies*: financing gap; cherry-picking; EPR as the gap-filler | https://journals.sagepub.com/doi/10.1177/0256090919880655 | EPR pass-through logic | Peer-reviewed |
| A7 | Redseer (Feb 2025), *Consumer-led e-waste market assessment*: informal sector captures >60% of metal value; formal contribution margins in single digits | https://redseer.com/wp-content/uploads/2025/02/E-waste-Landscape-in-India.pdf | Formal cost disadvantage | Industry report; table values **UNVERIFIED** |
| A8 | IISc CPDM paper: informal CRT dismantling has higher profit per day than formal | https://dm.iisc.ac.in/cpdm/ideaslab050320/paper_scans/UID_192.pdf | Dismantling incentive | Student paper; **UNVERIFIED** |
| R03 | Wave-1 agent 03 (legality): shop is lawful only as a written collection agent of a registered recycler; intact items only; exclusive outlet; EPR floor ₹22/kg (₹34 smartphones) under Delhi HC challenge | `docs/research/v2-deep/03-intermediary-legality.md` | Legal constraints | Internal |
| R07 | Wave-1 agent 07 (payments): public rail pays by APBS/NACH within T+4 working days of the file; realistic "7 days of hub receipt" becomes 7–10 days; advances from scheme funds are an audit risk | `docs/research/v2-deep/07-payments-dbt.md` | Timing model | Internal |
| R09 / R14 | Wave-1 agents 09 and 14: Aadhaar needs an alternate ID; itinerant collectors are excluded; Seelampur and Indore distrust of enforcement | `09-aadhaar-kyc.md`, `14-informal-sector.md` | KYC and trust | Internal |
| R13 | Wave-1 agent 13: batteries are a separate legal stream; drop-point rules; 90-day storage limit | `13-batteries-hazardous.md` | Battery separation | Internal |

---

## 2. Assumptions (all UNVERIFIED; pilot must measure)

1. **Profile of a micro shop:** a fixed-premises general kabadi in Indore that already handles 5–10 t/month of paper, metal and plastic (A2). E-waste is 2–5% of weight, which gives **150–450 kg/month of e-waste**. This is my assumption, not a sourced figure.
2. **Material mix by weight:** 50% low-value (CRT/LED TVs, printers, plastic-heavy small appliances), 40% mid-value (chargers, cables, routers, set-top boxes, keyboards, small boards), 10% high-value (laptops, phones, tablets, desktop boards). Batteries are about 8–12% of mid and high-value weight.
3. **Off-platform sell prices (intact, Indore):** low ₹25/kg, mid ₹42/kg (W1), high ₹200/kg blended. A laptop weighs about 2.2 kg and sells for ₹300–800 (W6). A scrap phone weighs about 0.18 kg and sells for ₹300–600 (W7), so the per-kg phone value is dominated by resale and refurbishment value.
4. **Off-platform buy prices from households:** low ₹10/kg, mid ₹25/kg, high ₹130/kg. This gives gross margins of 20–60%, in line with A1 (10–40% on the refurbish stream) and A3 (~20%).
5. **Stripping uplift** (boards separated, cables burned or stripped, batteries sold loose): +₹15–20/kg on mid (for cables, insulated wire is worth ₹60–120/kg against bare copper at ₹575–813/kg; W3, W5) and +₹30–50/kg on high (boards ₹400–900/kg; W6). Labour cost is about ₹3–5/kg.
6. **EcoSure rate card** = recycler gate price − hub cost. Recycler gate price = intact material value + EPR pass-through. EPR pass-through is **30–50% of the ₹22/kg floor**, i.e. ₹7–11/kg, and more for smartphones. This depends on the floor surviving the Delhi HC litigation (R03). Hub cost (shared freight, handling and margin) is ₹7–9/kg.
7. **Cost of money** for a micro kabadi: 3–5% per month from informal lenders or supplier credit. **UNVERIFIED.**
8. **Cash cycle on EcoSure:** time to fill a trip-worthy lot (about 100 kg) at 300 kg/month is 7–10 days. After that: trip, hub receipt, 72-hour dispute window, payment file within 3 working days, then credit within T+4 working days (R07). **The total from citizen hand-over to shop credit is 17–25 calendar days.** Off-platform, the shop sells to a local dealer the same day or weekly, for cash.

---

## 3. Findings

### F1. The PRD never says whether the shop pays the citizen for the material, and the whole business case turns on it
`04` C6 pays the citizen a scheme-funded UPI incentive. `04` §4 puts "Cash payment by the collector" out of scope. `10` §7 and `14` OQ-03 say money flows recycler → hub → shop. Read literally, the shop pays the citizen nothing and collects the full rate card: a **collection-fee model**. Agent 03 recommends framing it as "collection fee + material price paid on the recycler's behalf": a **trade model**. The two readings give opposite answers (F2). In practice citizens are used to being paid by kabadiwalas (A6), so the fee model only works for items where the scheme incentive is at least what the kabadi would pay. That rules out phones and laptops unless the incentive is ₹300+ per device.

### F2. Margin per kg: on-platform wins only for low and mid-value material, and only under the fee model
Illustrative figures in ₹/kg, before the shop's own labour. See Assumptions 3–8.

| Basket | Off-platform, intact | Off-platform, with stripping | On-platform, fee model (rate card R, citizen paid by scheme) | On-platform, trade model (R − buy price) |
|---|---|---|---|---|
| Low (TVs, printers) | 25 − 10 = **15** | ~15 (little to strip; CRT breaking is hazardous) | R ≈ 20 → **20** | 22 − 10 = **12** |
| Mid (chargers, cables, routers) | 42 − 25 = **17** | ~33 | R ≈ 43 → **43** | 45 − 25 = **20** |
| High (laptops, boards) | 200 − 130 = **70** | ~110 | R ≈ 120–180 → **120–180**, but **supply ≈ 0** unless the citizen incentive matches the kabadi offer | 180 − 130 = **50** |
| Phones | Resale value dominates (₹300–600 per unit) | n/a | Supply ≈ 0 at a flat incentive of ₹50–100 | Negative against the refurb market |

**Monthly example, 400 kg (200 low / 160 mid / 40 high):**

| Mode | Gross/month | Less capital cost and delay | Net |
|---|---|---|---|
| Off-platform, some stripping | 3,000 + 4,800 + 3,600 = ₹11,400 | ~0 (same-day cash) | **~₹11,400** |
| On-platform, fee model (assumes high items still arrive) | 4,000 + 6,880 + 4,800 = ₹15,680 | −₹800 | **~₹14,900** |
| On-platform, fee model, realistic (high items leak) | 4,000 + 6,880 + 0 | −₹600 | **~₹10,300** plus off-platform high-value margin of ₹3,600 = **~₹13,900 when multi-homing** |
| On-platform, trade model | 2,400 + 3,200 + 2,000 = ₹7,600 | −₹800 (≈3 weeks of capital at 4%/month, plus lot waiting) | **~₹6,800** |

**Reading:** under the trade model a rational shop loses about 40% by routing everything through EcoSure. The losses come from no stripping, a thin EPR pass-through, and a 3-week cash cycle. Under the fee model, the best strategy is to **multi-home**: send low and mid-value material through EcoSure and keep high-value material and phones off-platform. Both outcomes starve recyclers of the PCB-rich fraction that pays for formal recycling (A4, A7).

### F3. The 500 kg/month provisional cap plus flat per-kg rates attract heavy, low-value material
The cap is measured in kilograms, and the platform's advantage over the informal market is largest where informal prices are lowest: CRT and plastic-heavy TVs, printers. A shop will therefore fill its cap with those items. Twenty CRT televisions reach 500 kg. The cap also sits right at the assumed micro e-waste range (150–450 kg; A2 with Assumption 1), so it binds for exactly the shops that are most engaged. The PRD should cap by **value and data-bearing device count**, and use category-specific rates so the incentive structure does not reward weight alone.

### F4. Legal constraints remove the informal margin levers, and the PRD offers no price compensation for them
- **Agent agreement and exclusive outlet** (R03): once material is accepted through EcoSure it cannot be sold elsewhere. That conflicts with the multi-homing described in F2 unless exclusivity is scoped **per pickup, not per shop**. A shop-wide exclusivity clause would stop most general kabadis joining at all, because e-waste is 2–5% of their business.
- **No dismantling** removes the stripping uplift: +₹15–20/kg on mid-value and +₹30–50/kg on high-value material. Cable burning is the strongest temptation, since bare copper is worth 5–8× insulated cable (W3). Nothing in the rate card makes up for it.
- **Battery separation** (R13): user-removable Li-ion batteries sell for ₹80–150/kg off-platform (W6, W9). `05` S10 only offers training. If batteries are excluded from phase 1 (agent 03's recommendation) or unpaid, the shop sells them to local traders. That breaches BWMR's "no sale to traders" rule and creates a fire risk. Batteries need their own rate line and a drop-point container provided by the hub.
- **Hazard handling burden** (swollen cells, broken CRT or lamp glass) costs the shop time and risk and is not paid for.

### F5. Payment timing: "7 days" is really 17–25 days from citizen to shop, and the hidden delay is building up a lot
`05` S5 starts the clock at hub receipt. For a micro shop, the delay that matters is **waiting until a lot is big enough for a trip** (7–10 days at 300 kg/month), plus the realistic public-rail cycle of 7–10 days (R07). Under the trade model that locks working capital for about 3 weeks. Capital that currently turns over about 20× a month would turn over about 1.3×. A shop with ₹20,000 of capital could fund only ~₹20,000 of EcoSure buying per cycle. The 40% advance becomes available only after 4 weeks of history and, on public money, carries audit risk (R07). The advance therefore does not solve the onboarding-month cash gap, and that month is when a shop decides whether to stay.

### F6. Lead generation is the real value to shops, and it is also the main leakage channel
Doorstep requests from households, RWAs and offices are demand that a micro kabadi cannot get cheaply today. `05` S2 reveals the full address after acceptance. At that point a shop can offer the citizen cash for a laptop or phone, then mark `failed_visit` or `cancelled`, or collect only the chargers. Nothing in `10` §1 detects this pattern, which amounts to disintermediation after the lead is accepted. The 4-pickups-per-month citizen cap (`04` C6) does not address it. Leakage signals to track include: acceptance followed by cancellation or failure; declared device counts versus collected counts; data-bearing items declared but not weighed; and citizen feedback.

### F7. KYC and trust: onboarding friction is less about documents than about fear of being visible
The micro tier's light document set is right (Aadhaar-verified phone, signboard photo, UPI). Agents 09 and 14 show it needs an alternate ID and a no-premises route. For a kabadi, the bigger deterrent is that a government platform builds a **dated, weighed, geo-tagged record** of their trade. The fear is SPCB raids (the Seelampur pattern), ULB eviction (the Indore 2018 pattern), and tax visibility of UPI credits. A standard-tier shop also faces 2% GST TDS above ₹2.5 lakh per contract (R07). Without a written purpose-limitation promise, shown in Hindi at onboarding, join rates among established kabadis will be low. Recruitment will then skew towards new entrants and fronts, which increases fraud.

### F8. What would make joining rational
A shop joins and routes good material if **on-platform net per kg ≥ off-platform net per kg for each category, after timing**. The levers available are:
1. **EPR pass-through** paid visibly as a per-category premium, e.g. "+₹X/kg producer premium" on the rate card, which is higher for smartphones and laptops.
2. **A per-device incentive for data-bearing items** that is competitive with kabadi offers (₹200–400 per phone or laptop; **UNVERIFIED**, needs pilot data). Only producer take-back money can realistically fund this (R07).
3. **A small collection fee paid when an item is marked `collected`** from the producer pool or operator float. This covers shop labour immediately and cuts the cash cycle for the fee component to T+1–4.
4. **A battery rate line and a free drop container.**
5. **Weekly milk-run trips or a collection point**, so lots do not wait for a threshold weight.
6. **Per-pickup exclusivity** instead of shop-wide exclusivity.

---

## 4. Would a micro shop join?

- **Join:** likely, but as a *secondary* channel. Leads, hub-paid freight, dispute rights and a formal receipt are attractive, and joining is cheap.
- **Route good material:** unlikely as v2 is written. Under the trade model the platform pays ~40% less than the informal market. Under the fee model citizens will not hand over phones and laptops for a flat scheme incentive. Either way, the result is **multi-homing with adverse selection**: EcoSure gets heavy low-value items and the informal market keeps boards, phones, copper and batteries.
- **Stay after month 1:** at risk, because the onboarding month has no advance and a 17–25 day cash cycle.

---

## 5. Recommended PRD changes (not applied)

| # | File | Change |
|---|---|---|
| 1 | `04-consumer.md` §C6 and §4; `10-workflows.md` §7; `14-open-questions.md` OQ-03 | **Decide and state the material-price model.** Recommended: the shop pays the citizen a *recorded* material price, in cash or UPI, logged on the pickup, acting as the recycler's agent. The scheme or producer incentive is paid on top. Remove "Cash payment by the collector" from out of scope and replace it with "Unrecorded payment by the collector". Add `material_price_paid` and `payment_method` to the pickup. |
| 2 | `05-local-recycle-shop.md` §S6; `03-domain-model.md` rate card | Rate card per **category** with three visible components: base material rate, **producer/EPR premium**, and **battery rate**. Per-device rates for data-bearing items. The operator publishes a weekly comparison against the corridor informal price index. Target is on-platform net ≥ off-platform intact net for each category (pilot KPI). |
| 3 | `05-local-recycle-shop.md` §S1; `02-roles-rbac.md` §4 | Provisional cap in **₹ value and data-bearing device count**, not only 500 kg. Categories with negative informal value (CRT) count at reduced weight. Show cap usage on the home screen. Alternate IDs as recommended by agents 09 and 14. |
| 4 | `05-local-recycle-shop.md` §S5; `10-workflows.md` §7 | Add a **collection fee paid on `collected`** (producer pool or operator working capital, never scheme head). Report the **end-to-end SLA from citizen hand-over to shop credit** (target ≤ 14 days) alongside the hub-receipt SLA. Offer an onboarding advance for weeks 1–4 from operator working capital, secured by the agent agreement. |
| 5 | `05-local-recycle-shop.md` §S4 and §S7; `06-regional-hub.md` trips | **Weekly milk run** per shop cluster, or a collection-point drop, whatever the lot weight. A lot older than N days (default 7) triggers a pickup automatically. This removes the lot-building delay. |
| 6 | `05-local-recycle-shop.md` new S11 (with agent 03 R5 and agent 14 R3) | Agent agreement with **per-pickup exclusivity**: material accepted through EcoSure goes only to the hub. The shop's other scrap trade is out of scope. State the rule in Hindi on the accept screen. |
| 7 | `05-local-recycle-shop.md` §S3; `10-workflows.md` §1 | **Battery line:** removable batteries are weighed as a separate line into a hub-supplied drop container and paid at the battery rate. Swollen cells trigger a priority pickup and a handling bonus. |
| 8 | `10-workflows.md` §1; `12-nfr-security.md` anomaly detection | **Leakage detection:** flag shops with high rates of accept-then-cancel or failed visits, collected device count below declared count, or data-bearing items declared but not collected. Ask citizens by WhatsApp: "Did the collector offer you cash outside EcoSure?" The response ladder is warning, then fewer leads, then suspension with appeal. |
| 9 | `05-local-recycle-shop.md` §S1; `12-nfr-security.md` | **Purpose-limitation notice** in Hindi at onboarding: individual shop data is not shared with SPCB, ULB or tax authorities except under a legal order, and every access is logged. This is aligned with agent 14 R5. |
| 10 | `13-roadmap.md` pilot gates; `00-overview.md` metrics | Pilot KPIs: **share of data-bearing devices and boards in lot weight** (adverse-selection indicator); on-platform versus informal net per kg by category; shop 8-week retention; leakage flag rate; end-to-end cash cycle. Redesign trigger: high-value share below 5% of lot weight after 6 weeks. |
| 11 | `14-open-questions.md` | New OQs: material-price model (fee or trade); EPR pass-through share and who guarantees it if the floor price is struck down; per-device incentive level; whether cables and chargers get a premium that offsets the copper-stripping incentive. |

---

## 6. Score

**4 / 10** for "a micro kabadi shop will join *and* route good material through EcoSure", as v2 is written.

v2 gets the non-price frictions largely right: no GSTIN, Hindi, offline, hub-paid freight, weekly settlement, partial payment on disputes, no minimum payout. It also correctly identifies cash speed as the core problem. But it leaves the material-price model undefined, gives the shop no price compensation for giving up dismantling and loose battery sales, counts the cap in kilograms (which rewards low-value weight), ignores the time it takes to build a lot, promises a "7 days" that is really 17–25 days from the citizen, and has no controls against leakage after a lead is accepted. The predictable result is multi-homing with adverse selection, and EcoSure would end up the channel for material nobody else wants. With changes 1–5 and 8, backed by producer money for the EPR premium and per-device incentives, the score would be about 7. Until pilot data replaces the illustrative rates, the economics stay **UNVERIFIED**.
