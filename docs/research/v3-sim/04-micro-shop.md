# 04 — Real-life simulation: Ramesh's micro shop under EcoSure v3

**Simulation:** 4 of the v3 real-life series  
**Date:** 2026-09-27  
**Question:** Can a small Indore scrap and repair shop run as a recycler's agent under v3 (pay citizens upfront, reimbursed from recycler escrow within 7 days, advances up to 40%) for 12 weeks without its working capital breaking? And is it worth his while compared with selling to informal aggregators?  
**Inputs read:** `docs/prd/v3-PRD.md` (full), `docs/research/v2-deep/22-micro-shop.md`, `24-hub-economics.md`, `30-budget.md`. Web search for 2026 scrap rates (below). No PRD files were edited.  
**Caveat:** This is a simulation, not field data. Every rupee figure is **illustrative**. Web rates come from aggregator and dealer pages and are **UNVERIFIED**. The recycler's rate card and the agent handling margin are my assumptions because the PRD does not set them (that is itself a finding).

---

## 1. Who Ramesh is

| Item | Value |
|------|-------|
| Business | Small scrap-plus-phone/electronics repair shop, Indore (Juni Indore side), about 10 × 12 ft plus a covered front |
| Working capital | ₹40,000 in total. About ₹20,000 of it must always stay free for his core business (repair parts, rent, helper's month-end wage) |
| People | Ramesh plus one helper (₹12,500/month, paid whether or not EcoSure exists) |
| Vehicles | Own two-wheeler for pickups; a borrowed tempo (Tata Ace class) from a relative, ₹700 per trip for diesel and goodwill, only when the relative is not using it |
| EcoSure status | Micro-tier agent of one Indore recycler (gate on the Sanwer Road / Palda side, ~15 km away). Signed agent agreement, provisional cap 500 kg/month (PRD §8.5, §11.2 S1) |
| Storage | About 150 kg of mixed e-waste fits in the shop without blocking repair work (TVs fill space before they fill weight) |

---

## 2. Prices used

### 2.1 Web anchors (all UNVERIFIED)

| Source | What it says |
|--------|--------------|
| [ScrapRates.in, Indore (Sep 2026)](https://scraprates.in/indore) | Mixed e-waste ₹41.40/kg; copper ₹574.59/kg; Li-ion battery ₹79.46/kg |
| [TodayPriceRates, e-waste 2026](https://resale.todaypricerates.com/ewaste-scrap-rate) | Phones ₹50–350 each; laptops ₹100–400 each; boards ₹400–800/kg; TVs ₹40–150/kg; cables ₹60–120/kg; mixed ₹30–100/kg |
| [KabadiwalaOnline](https://kabadiwalaonline.in/e-waste-scrap-buyers-near-me/) | Scrap phone ₹300–600; laptop scrap ₹180–280/kg; motherboard ₹200–350/kg |
| [Gurugram Kabadiwala (Jun 2026)](https://gurugramkabadiwala.com/e-waste-scrap-buyers/) | Old smartphone ₹300–3,000 each; mixed boards ₹80–180/kg |
| [TradeIndia electronic scrap (Mar 2026)](https://www.tradeindia.com/manufacturers/electronic-scrap.html) | Mixed e-waste listings ₹40–250/kg; ₹50,000/t bulk |
| v2 research `24-hub-economics.md` | Indore wholesale ~₹40/kg; household pickup ₹5–7 lower |

### 2.2 Simulation prices

| Category | EcoSure rate card v1 (what Ramesh pays the citizen, recycler's price) | Rate card v2 (from week 7) | Informal: Ramesh buys from household | Informal: Ramesh sells (aggregator at Juni / refurbisher / own repair parts) |
|----------|------|------|------|------|
| Phone (dead or old) | ₹60 each (PRD §17.3 example) | ₹50 | ₹100–120 | ₹180 (parts value for a repair shop) |
| Laptop | ₹300 each | ₹300 | ₹400 | ₹700 |
| Small appliances (mixer, iron, fan) | ₹25/kg (PRD §17.3 example) | ₹22 | ₹18 | ₹30 |
| Flat TV / monitor | ₹20/kg | ₹20 | ₹12 | ₹22 |
| IT, chargers, cables, routers | ₹35/kg | ₹32 | ₹30 | ₹45 |
| **Agent handling margin** paid by the recycler on top of reimbursement | **₹6/kg accepted** (assumption; PRD never sets it) | ₹6 | — | — |

Average price paid to citizens works out at about ₹44/kg on a phone-heavy normal week, ₹40/kg after the rate cut, and ₹30–32/kg in the Diwali weeks when TVs and appliances dominate.

### 2.3 Other assumptions

- A pickup averages ~3.4 kg (v2 budget used 3 kg). Two-wheeler fuel ₹20 per visit (routes batched, petrol ~₹107/L, UNVERIFIED).
- A lot is sealed at ~95–100 kg, because a ₹700 tempo trip on a smaller lot costs more per kg than the margin.
- Reimbursement = what he paid for accepted items, minus the value of any weight the recycler did not accept, plus ₹6/kg on receiver weight. Per-device items are reimbursed per unit that passes the recycler's unit scan.
- Simulated calendar: week 1 starts Monday 7 September 2026 (late monsoon, during Swachhata Hi Seva). Dussehra falls in week 7 (20 Oct) and Diwali at the end of week 9 (8 Nov). Festival dates should be confirmed.
- Ramesh's time is valued at ~₹100/hour (a mix of his repair time and his helper's time).

---

## 3. Compliance time per job (what the app adds)

| Step (PRD reference) | Extra minutes vs an informal pickup |
|------|------|
| Battery check per item, about 5 items (§11.2 S3) | 2.5 |
| Data-wipe confirmation or "collector assisted" wipe on phones (§10.2 C4) | 4 on average (dead phones cannot be wiped at all; he has to record that) |
| IMEI or serial scan (§9.5 PP3). Dead phones cannot show `*#06#`; labels sit under batteries or SIM trays; scans often fail and get typed in | 2 |
| Weigh and photograph the scale display (§11.2 S3) | 1.5 |
| Record price and pay by UPI, share receipt (§10.2 C7) | 1.5 |
| Handover code, including citizens who cannot find the SMS and operator call-backs (§10.2 C6) | 1.5 |
| Sealed-bag photo | 1 |
| **Per pickup** | **~15 minutes** |
| Seal a lot, record sender weight, photos (§11.2 S4) | 30 per lot |
| Recycler gate trip vs a 3 km run to the Juni aggregator: queue, receiver weighing, seal check, unit scan of every phone (§16.4) | ~2.5 hours extra per trip (3.5 h vs 1 h) |
| Disputes, flag replies, settlement checks, support calls | 0.5–2 hours in bad weeks |

---

## 4. The 12-week ledger

"Float" = money Ramesh has paid to citizens for material that the recycler has not yet reimbursed. "Costs" = fuel, tempo or hired truck, bags, extra labour, interest, and chargebacks. Hours are **extra compliance hours only**, over and above what an informal pickup would take.

| Wk | Dates | What happened | Pickups (kg) | Paid to citizens | Reimbursed in | Advance / loan | Costs | Closing cash | Float | Extra hrs |
|----|-------|---------------|--------------|-----------------:|--------------:|---------------:|------:|-------------:|------:|----------:|
| 0 | — | Start | — | — | — | — | — | **40,000** | 0 | (4 h onboarding, not counted) |
| 1 | 7–13 Sep | First leads; training videos; one handover code fails, operator call-back takes 25 min. Lot L1 opened | 8 (26) + 2 failed | 1,140 | — | No advance: no history | 240 | 38,620 | 1,140 | 6 |
| 2 | 14–20 Sep | **Monsoon week.** Waterlogged lanes; 2 failed visits; wet cartons. Lot too small for a tempo trip, so he waits | 6 (20) + 2 failed | 860 | — | — | 180 | 37,580 | 2,000 | 3 |
| 3 | 21–27 Sep | Swachhata Hi Seva publicity. L1 sealed at 94.0 kg on his own (uncalibrated, not connected) scale | 14 (48) | 2,100 | — | — | 340 | 35,140 | 4,100 | 4 |
| 4 | 28 Sep–4 Oct | L1 delivered by borrowed tempo. **Receiver weight 89.9 kg (−4.4%)**, inside the 8% monsoon band, so the recycler's weight is used with no dispute possible. Unit scan: 2 phones "unmatched" (typed IMEIs), ₹120 held. One power bank rejected (₹15 already paid) | 13 (45) | 1,970 | — | — | 1,020 | 32,150 | 6,070 | 7.25 |
| 5 | 5–11 Oct | L1 reimbursed on day 7 (₹4,100 paid − ₹137 lost weight/reject + ₹537 margin − ₹120 held). Advance available: 20% of ~₹1,100 average week = ₹225, not worth taking. Applies for standard tier to lift the 500 kg cap before Diwali. L2 sealed at 95.0 kg. Late rains | 14 (50) | 2,150 | 4,380 | — | 340 | 34,040 | 4,240 | 5.5 |
| 6 | 12–18 Oct | L2 delivered. October, so tolerance drops to 5%. Material still damp: **receiver 89.8 kg (−5.5%)**, dispute opens, lower reading paid anyway; 5 working days later the ruling is "moisture, receiver weight stands". 1.5 h of photos and calls for nothing. Held ₹120 released | 15 (55) | 2,380 | 120 | — | 1,060 | 30,720 | 6,500 | 8.75 |
| 7 | 19–25 Oct | **Dussehra.** L2 reimbursed on **day 9** (bank holiday in the escrow batch). **Rate card v2 from 19 Oct** (phone ₹60→₹50, appliances ₹25→₹22), announced by WhatsApp on Saturday. Two citizens refuse ₹50 for phones at the door ("the kabadi gave ₹120") and keep them. L3 sealed at 99 kg | 12 (44) | 1,740 | 4,519 | — | 300 | 33,199 | 4,120 | 4 |
| 8 | 26 Oct–1 Nov | Pre-Diwali clean-out starts. L3 delivered: receiver 95.4 kg (−3.6%, within band). **Recycler applies rate card v2 at receipt** to week-6 stock he bought at v1: ₹202 lost; operator says the agreement says "rate at receipt". Hires helper's brother for 2 days. 120 kg now in the shop | 32 (120) | 3,840 | — | — | 2,460 | 26,899 | 7,960 | 13 |
| 9 | 2–8 Nov | **Diwali week.** L3 reimbursed day 8. 60 pickups, heavy TVs and appliances; refuses 3 swollen batteries and a fridge he cannot carry. **Storage overflow:** ~350 kg against ~150 kg of space; bags stacked in the lane under a tarp; 40+ phones with batteries near the soldering bench. **Borrowed tempo unavailable** (relative's own Diwali deliveries), so he hires an Ace for ₹1,200. Gate queue 4 hours because every agent is surging. L4 (120 kg) received at 115.8 kg. L5 (110 kg): one plastic seal tag snapped when the driver threw the bags, so **the whole lot goes into a custody dispute** (104 kg received, ₹3,300 frozen). Recycler escrow drops below its 2-week alert. Takes the 40% advance: ₹920 | 60 (230) | 6,900 | 4,400 | +920 advance | 4,150 | 21,169 | 10,740 | 21 |
| 10 | 9–15 Nov | Diwali holidays: recycler gate and operator closed Mon–Wed. L4 reimbursement goes past day 7. L5 dispute stuck. Operator offers a 160 kg society drive, but November would then pass the **500 kg cap** and standard tier is still pending, so he **declines it**. Cash falls to ₹17,819, **below his ₹20,000 core-business reserve** (rent due 1 Dec, helper's wage, parts for the post-Diwali phone-repair rush). **Borrows ₹10,000 from a local lender at 3%/month.** He is tempted to sell the unsealed 120 kg to the Juni aggregator for same-day cash (~₹4,500) but does not | 25 (90) | 2,790 | — | +10,000 loan | 560 | 27,819 | 13,530 | 8.75 |
| 11 | 16–22 Nov | L4 reimbursed on **day 11**, with the ₹920 advance auto-recovered. L5 dispute resolved day 12: "handling, not tampering", but 3 dead phones fail the IMEI match, so ₹150 withheld. Standard tier approved (about 4.5 weeks after applying). L6 (210 kg) delivered by tempo, received at 202.5 kg | 16 (55) | 2,090 | 3,489 | −920 recovered | 1,080 | 28,138 | 11,780 | 8.5 |
| 12 | 23–29 Nov | L5 paid (17 days after delivery). L6 paid day 7. **Chargeback ₹300**: a Diwali booking by his helper's cousin bundled items bought from a kabadi to farm incentives; proven, and charged to Ramesh's settlement (PRD §17.4). Repays loan + ₹150 interest. L7 (105 kg, ₹3,990) waiting in the shop | 14 (50) | 1,900 | 10,674 | −10,150 repaid | 340 | **26,422** | 3,990 | 4 |
| **Total** | | | **229 pickups, 833 kg** | **29,860** | **28,802** (before chargeback) | net 0 | **12,520** | | | **~94 h** |

**End position:** ₹26,422 cash + ₹3,990 of stock awaiting delivery (worth about ₹4,500 once reimbursed) ≈ **₹30,900 against the ₹40,000 he started with.** EcoSure trade cost him roughly **₹9,100 in 12 weeks**, before counting his time.

### 4.1 Reimbursement timing

| Lot | Delivered | Paid | Days after delivery | Days from first citizen payment in the lot |
|-----|-----------|------|--------------------:|-------------------------------------------:|
| L1 | 28 Sep | 5 Oct | 7 | 27 |
| L2 | 12 Oct | 21 Oct | 9 | 16 |
| L3 | 26 Oct | 3 Nov | 8 | 22 |
| L4 | 5 Nov | 16 Nov | 11 | 21 |
| L5 | 5 Nov | 23 Nov | 18 (seal dispute) | 21 |
| L6 | 17 Nov | 24 Nov | 7 | 15 |

The median is **8.5 days after delivery**, which trips the PRD's amber tripwire (§18.3). What Ramesh feels is the second column: **15–27 days, about 20 on average**, from paying a citizen to getting that money back. The PRD only measures the first column.

---

## 5. Answers to the three questions

### 5.1 Does his working capital survive?

**Barely, and only with a loan.** In normal weeks the float is ₹4,000–8,000 and never threatens him. The danger is Diwali: float peaks at **₹13,530** (weeks 9–10), about 6× a normal week, at the same moment that:

- the recycler gate and operator close for three days;
- recycler escrow runs low because every agent is surging;
- a snapped seal freezes a whole lot for 18 days;
- the advance, based on his *average* week, is only ₹920, about 7% of the peak float;
- his own Diwali costs (parts for the repair rush, helper's bonus, rent) hit.

He dipped below his ₹20,000 core-business reserve in week 10 and borrowed ₹10,000 at 3%/month. A shop with ₹25,000 instead of ₹40,000 would have stopped taking pickups, or sold the stock informally, in Diwali week, which is exactly when the programme needs him.

The slow bleed matters more than the float. Most of the ₹9,100 drop is **operating loss**, not money stuck in the pipeline.

### 5.2 Net margin per kg: EcoSure vs informal aggregator

| | EcoSure (simulated) | Informal (same 833 kg, same pickups) |
|--|--|--|
| Gross margin | ₹6/kg handling margin, minus weight-band losses (~₹1.2/kg), rate-card loss, rejects → **~₹4.0/kg** (₹2,932 on 728 kg delivered) | Bulk material ~₹12/kg; phones ~₹80 each; laptops ~₹300 each → **~₹26/kg** (₹22,070) |
| Fuel, freight, bags, labour | ₹12,220 (freight to a 15 km gate: ₹4,000) | ~₹9,860 (aggregator 3 km away or picks up; no failed-visit penalty since he chooses jobs) |
| Chargebacks, interest | ₹450 | 0 |
| **Net cash per kg** | **about −₹11/kg** | **about +₹15/kg** |
| Extra compliance time | ~94 h (≈ ₹9,400 at ₹100/h, another ~₹11/kg) | 0 |
| Cash cycle | ~20 days | Same day to weekly |

Even if the informal assumptions are cut hard (phone margin ₹40, bulk ₹8/kg), informal still nets about +₹4/kg. **To break even in cash on EcoSure, the handling margin would need to be about ₹16–17/kg**, or about ₹11/kg if the recycler paid the freight. To also cover his time it would need about ₹27/kg.

What EcoSure gives him that informal does not: **leads** (doorstep bookings he would not otherwise get), a legal status, and a receipt that protects him from police and officials. Those are real, but they do not pay the fuel bill.

### 5.3 Hours lost to compliance

**About 94 hours in 12 weeks: ~7.8 hours a week, 21 hours in Diwali week.** That is roughly 12 working days. The biggest items are the per-pickup steps (~15 minutes each, 57 hours in total), gate trips (~12 hours) and disputes, flags and holds (~8 hours). The IMEI step on dead phones is the most wasteful: it takes time, often fails, and the failures later hold his money (weeks 4 and 11).

---

## 6. Break points (where real life beats the design)

1. **The margin is below the cost of doing the job.** ₹6/kg (or any figure; the PRD does not set one) cannot cover ₹15/kg of fuel, freight and labour. Every extra kilogram deepens the loss.
2. **The weight band is a one-way loss.** Ramesh pays citizens on his scale. Within tolerance the recycler's lower weight is used silently, so a normal 3.5–4.5% shrink costs him about 20% of his margin. Outside tolerance the lower reading is paid anyway (week 6).
3. **Monsoon tolerance ends on a calendar date.** October material was still wet (week 6), but the band had already dropped to 5%.
4. **Rate cuts hit stock already bought.** The v2 rate card was applied at receipt to material paid for at v1 (week 8).
5. **Advances follow the average, not the surge.** The biggest advance available was ₹920 against a ₹13,530 float.
6. **Festival closures and escrow dips land in the same week.** Reimbursement went to 9–11 days exactly when he needed it fastest.
7. **One snapped seal freezes the whole lot.** The rule "undisputed weight is paid" does not help when a seal dispute makes all of the weight disputed.
8. **The 500 kg cap bites in the only month with volume.** Standard tier took about 4.5 weeks, so he turned down a 160 kg society drive.
9. **Storage and fire.** Diwali stock was more than twice his space, with battery-bearing phones next to a soldering iron. The PRD's storage-safety rule covers April–June heat only.
10. **Freight belongs to nobody in the pilot.** The borrowed tempo disappears in festival week; a hired Ace costs ₹5/kg.
11. **Phone prices lose at the door and tempt the agent.** ₹50–60 per phone against a kabadi's ₹100–120. For a repair shop a dead phone is worth ₹150–200 as parts, which is the strongest leakage incentive in the whole chain.
12. **Chargebacks land on the agent for citizen-side fraud** he did not knowingly commit.
13. **Dead phones break the IMEI step,** which then creates "unmatched unit" holds on his money.

---

## 7. PRD gaps (with v3 section references)

| # | Gap | v3 section |
|---|-----|-----------|
| G1 | Agent handling margin is never quantified or given a floor. The recycler sets it alone through the rate card, and agents can only read it | §11.2 S5–S6, §12.2 R3, §17.3 step 5, §8.3 (Rate cards: agent R) |
| G2 | Who absorbs the gap between sender and receiver weight **inside** tolerance is not stated; in practice it is the agent, who already paid the citizen on the sender weight | §16.4 step 5, §11.2 S8, §17.4 Disputes |
| G3 | Monsoon tolerance is tied to calendar months (July–September), not to actual weather | §16.4 step 5, §23, OQ-72 |
| G4 | No rule on whether reimbursement uses the rate card at collection or at receipt; no minimum notice for rate changes | §11.2 S6, §12.2 R3 ("reviewed weekly") |
| G5 | Advance formula (20% new, 40% of average weekly accepted value) has no seasonal or surge component; the Diwali rule mentions staffing and pickups but not money | §17.4 Advances, §11.2 S5, §23, OQ-71 |
| G6 | "Within 7 days" does not say calendar or working days, and does not cover bank or festival holidays; the SLA starts at recycler receipt, not at citizen payment (v2 research F5 flagged this and it is still open) | §11.2 S5, §12.2 R9, §18.3, §24.2, §25.3 week-8 gate |
| G7 | Escrow rule only alerts below 2 weeks and pauses at zero; nothing requires a pre-festival top-up | §12.2 R3, §17.4 Escrow health, §23 |
| G8 | Micro cap is in kg (v2 research F3, unchanged); standard-tier review time is not set; behaviour at the cap is not defined | §8.5, §11.2 S1 |
| G9 | Freight from agent to recycler gate in the pilot has no payer. "Freight payer never the shop" exists only for phase-2 hubs; recycler-planned trips are optional | §11.2 S4, §15.2 H2, §16.4 |
| G10 | A broken seal opens a custody dispute on the whole lot, with no path to pay unit-scanned or clearly intact weight, and no distinction between handling damage and tampering | §16.4 step 4, §11.2 S5, §18.2 (lot tampering) |
| G11 | Chargebacks have no standard of proof for agent liability, no cap, and no appeal timeline | §17.4 Chargebacks, §11.2 S5, §18.2 |
| G12 | IMEI capture assumes working phones or readable labels; failed scans create unit-scan holds that delay money | §9.5 PP3–PP4, §11.2 S3, §16.4 step 6 |
| G13 | No time budget for agent compliance steps and no pay for "collector-assisted" wipe help | §10.2 C4, §11.2 S3 |
| G14 | Storage capacity and fire rules for micro shops cover heat months only, not festival surges | §11.2 S4, §23 |
| G15 | Repair-shop agents are not treated as a special case, although their core trade (harvesting parts) conflicts with "intact only" | §11.3, §5.2 |
| G16 | Phone material price in the worked example (₹60) is well below what informal buyers pay; there is no per-device agent incentive to stop leakage | §17.3, §10.2 C7 |
| G17 | Success metrics do not track agent net ₹/kg, agent hours, or 8-week agent retention | §24.2, §25.3 |

---

## 8. Fixes

### 8.1 Highest leverage

1. **A published handling-fee floor plus recycler-run freight.** Write into every agent agreement a minimum fee: about ₹40 per completed pickup plus ₹8/kg, or a flat ₹15–17/kg (UNVERIFIED, to be set from pilot costs). Make the recycler run a **weekly milk run** to each agent cluster at its own cost. The recycler can afford it: a direct-to-gate recycler keeps about ₹5,400/t before its EPR income of ₹10,000–22,000/t (`24-hub-economics.md` §3.3). Add "agent net ₹/kg" and "agent 8-week retention" as pilot gate metrics. *Fixes G1, G9, G17.*
2. **Pay on collection, not on receipt.** Escrow pays the agent **80% of the recorded citizen payment within 2 working days** of a valid handover code plus weigh record, and the balance plus margin on receipt. Inside the tolerance band, pay on the **sender** weight, so the recycler (who controls grading) carries normal shrink. Apply the **rate card in force on the collection date**, with 7 days' notice of any change. Existing controls (handover code, caps, connected scale, seals) already protect the 80%. This cuts the cash cycle from ~20 days to ~2, removes the weight-band loss, and makes advances mostly unnecessary. *Fixes G2, G4, G5, G6.*
3. **A festival surge package, switched on 3 weeks before Dussehra and Diwali.** It includes:
   - an automatic seasonal advance equal to 40% of the agent's forecast surge value, not his average week;
   - recycler escrow topped up to 4 weeks of expected reimbursements;
   - the cap switched to value and device count, and lifted automatically after 4 clean weeks;
   - the SLA counted in working days, with holidays excluded and published in advance;
   - extra gate shifts;
   - a recycler cage or overflow pickup when an agent's stock passes the space he declared.

   *Fixes G5, G6, G7, G8, G14.*

### 8.2 Other fixes

- **Seal disputes:** pay the unit-scanned and visibly intact weight on time. Decide the rest within 5 working days, and treat handling damage separately from tampering. *(G10)*
- **Chargebacks:** the agent is liable only where evidence shows he knew or should have known. Cap each chargeback at one week's margin, and allow 7 days to appeal. *(G11)*
- **Dead phones:** accept a photo of the label or "no readable ID" without a hold. Unit-scan mismatches on dead phones should flag for review, not withhold money. *(G12)*
- **Compliance time budget:** at most 5 minutes of app steps per pickup. Batch battery checks by category, and skip the wipe step for devices that will not power on. Pay a ₹10 "assisted wipe" fee where the agent does the wipe. *(G13)*
- **Weather-based tolerance:** the operator can switch on the 8% band by ward and date when there is IMD rain data. *(G3)*
- **Phones:** add a per-device agent fee and a producer top-up so that the phone rate at the door is within about ₹30 of the informal price. Repair-shop agents must keep EcoSure stock physically separate and tagged. *(G15, G16)*

---

## 9. Score

**4 / 10** for how well v3 works for a real micro shop.

**What v3 gets right:**
- It settles the material-price model: the agent pays the citizen at the door on the recycler's behalf.
- Money comes from recycler escrow rather than public money.
- Undisputed weight is paid, there is no minimum payout, and onboarding needs no GSTIN.
- It is Hindi-first and works offline.

For Ramesh, those remove the paperwork blockers that sank v1 and v2.

**What still breaks:**
- The design never pays the agent enough to cover the cost of collecting.
- Normal weight shrink and rate cuts land on him.
- The cash cycle is really ~20 days, not 7.
- Advances ignore the Diwali surge.
- The 500 kg cap and the freight gap bite in the one month that matters.
- Each pickup adds about 15 minutes of compliance.

A rational Ramesh stays enrolled for the leads and the legal cover, sends heavy low-value material through EcoSure, and keeps phones and boards informal. That is the adverse-selection outcome the v2 review warned about.

**With fixes 1–3:** about **7 / 10**. Those numbers stay UNVERIFIED until the manual pilot measures real agent costs, weight shrink and cash cycles.
