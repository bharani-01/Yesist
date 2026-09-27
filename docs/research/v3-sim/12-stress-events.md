# v3 Simulation 12 — Four Stress Events on the Live Indore Corridor (Year 1)

**Date:** 2026-09-27
**Reviewed:** `docs/prd/v3-PRD.md` (whole document; mainly sections 11, 12, 16, 17, 18.3, 19, 20, 21, 22, 23, 25, 27), plus earlier research `v2-deep/34-seasonal-stress.md`, `13-batteries-hazardous.md`, `28-operator-ops.md`
**Method:** We ran four realistic bad weeks on the corridor after phase 1a goes live, hour by hour for the first day and day by day after that. For each one we set out what breaks, how the roughly 10-person operator copes, what citizens and agents go through, who is legally responsible, the damage to reputation, and how the corridor recovers. Real incidents come from web searches. Anything not confirmed from a primary or dated source is marked **UNVERIFIED**.

---

## 0. Baseline corridor we are stressing

The PRD gives stage durations, not volumes by month. We assume a plausible year-1 state inside the PRD's own volume gates (section 26.3):

| Item | Assumed year-1 value | Basis |
|------|----------------------|-------|
| Formal tonnes a month | ~15 t (between the 8 t pilot gate and the 25 t phase 1b gate) | PRD 26.3 |
| Agents | ~25 (about 15 shops, 6 informal collectors, 4 drop points), plus IMC vehicles logging | PRD 11, 25.3 week-4 gate (≥ 8 agents) |
| Recyclers | 1 live, backup recycler "before phase 1b" | PRD 27.2 |
| Doorstep pickups | ~1,000 a month (~230 a week) | Report 28 model scaled to 15 t |
| Drop-offs with incentive | ~300 a month | Report 28 |
| Drives | ~6 a month | PRD 10.2 C9 |
| Operator team | ~10: ops manager, 3 field, 2 verification/disputes, 2 support, 1 finance, part-time MIS/CA | Report 28 §3.3; PRD 26.1 (~₹4 lakh/month) |
| Agent capacity | ~3–4 doorstep pickups per agent per day, and most agents also run a shop | Field-research assumption (**UNVERIFIED**) |
| Incentive budget | ~₹39 lakh over 24 months | PRD 26.1 |

Dates used: Diwali 2027 is 29 October (Dhanteras about 27 Oct, Bhai Dooj about 31 Oct–1 Nov; one-day variance between almanacs). Monsoon peak is July–August. Heat peak is May. Financial year-end is March.

---

## 1. Real-world evidence used

| # | Incident | Source | Status |
|---|----------|--------|--------|
| R1 | Indore battery-making unit near Phuti Kothi: lithium cells on a multi-slot charging rack exploded, 5 staff trapped on the third floor and rescued, 2 people sickened by smoke, ~15,000 L of water used (June 2026) | [People's Update](https://peoplesupdate.com/indore-battery-factory-fire-footi-kothi-lithium-battery-blast-rescue-112903) | News report (Hindi); date of 29 June from search synthesis, **UNVERIFIED** |
| R2 | Sudama Nagar, Indore: fire in a battery labelling and packing building, no casualties (22 Aug 2026) | [Amar Ujala](https://www.amarujala.com/madhya-pradesh/indore/massive-fire-breaks-out-at-a-battery-packing-building-in-indore-indore-news-c-1-1-noi1551-4639803-2026-08-22) | News report |
| R3 | Narwal, Sanwer Road, Indore: scrap warehouse fire, 3 tenders and ~10 tankers, labour quarters next door evacuated, women with breathing trouble (2026) | [Times of India](https://timesofindia.indiatimes.com/city/indore/fire-breaks-out-at-scrap-warehouse-in-narwwal-area/articleshow/129738396.cms) | News report. Sanwer Road is the same industrial belt where recyclers sit (report 34) |
| R4 | Brijeshwari Annex, Indore: house fire killed 8. Officials first blamed EV charging, the family disputed it, the CM ordered a probe, and the collector announced IIT-Indore EV safety SOPs (March 2026) | [New Indian Express](https://www.newindianexpress.com/states/madhya-pradesh/2026/Mar/19/indore-blaze-son-rejects-ev-short-circuit-theory-as-cm-assures-probe), [TOI](https://timesofindia.indiatimes.com/city/indore/fire-didnt-originate-from-external-pole-discom-report/articleshow/129724681.cms) | News reports. Shows how fast lithium fires in Indore become **political** |
| R5 | West Delhi godown: e-rickshaw battery blast, 2 dead (17 Aug 2026) | [ThePrint/PTI](https://theprint.in/india/fire-breaks-out-in-godown-in-west-delhi-after-suspected-e-rickshaw-battery-blast/3016806/) | News report |
| R6 | Vadodara battery godown fire: firefighters cut open the tin roof, nearby societies evacuated | [TOI](https://timesofindia.indiatimes.com/city/vadodara/fires-gut-automobile-workshop-battery-godown/articleshow/127422865.cms) | News report |
| R7 | Bidadi (Karnataka) battery and electronics warehouse fire; fire engines still not there an hour later (Apr 2026) | [Asianet](https://newsable.asianetnews.com/karnataka-news/karnataka-massive-fire-at-battery-warehouse-in-bidadi-industrial-area-thick-smoke-rises-articleshow-qsknodi) | News report |
| R8 | Indore flooding: Dwarkapuri, Prajapat Nagar, Raj Mahal Colony, Rajendra Nagar, Khajrana, IT Park, old-city lanes waist-deep; car with children swept away; Kanh river rescues; 77.7 mm in 2 hours | [Bhaskar English](https://www.bhaskarenglish.in/local/mp/news/car-swept-away-in-indore-rains-three-rescued-heavy-downpour-floods-city-as-3-inch-rain-paralyses-traffic-135799560.html), [Bhaskar English 2](https://www.bhaskarenglish.in/local/mp/news/heavy-rains-submerge-indore-villages-cut-off-over-5-inches-rain-floods-low-lying-areas-triggers-rescues-and-choral-river-isolation-135836733.html), [TOI](https://timesofindia.indiatimes.com/city/indore/rain-washes-away-ganesh-pandals-car-in-prajapat-nagar/articleshow/123607661.cms) | News reports; exact years (2025 vs 2026) not checked for each, **UNVERIFIED** |
| R9 | Indore summer 2026: 2-hour scheduled cuts, ~10 unscheduled shutdowns and ~50 trippings a day | Report 34, source P1 (TOI) | News report |
| R10 | Madhya Pradesh e-Office down about 7 hours on 13 Aug 2026 (NIC server fault) with **treasury transactions** hit across 52 departments; reportedly down **5 days in September 2025** | [Lalluram](https://lalluramnews.com/state/madhya-pradesh/mp-vallabh-bhavan-e-office-portal-nic-server-glitch/), [Swadesh](https://www.swadeshnews.in/pradesh/mp-mantralaya-e-office-down-52-departments-bhopal-madhya-pradesh/236804) | News reports; the 5-day 2025 outage is **UNVERIFIED** beyond one outlet |
| R11 | UPI outage on 12 Apr 2025: success rate ~50% for 2 hours and ~80% for 3 more; the fourth disruption in three weeks | [Economic Times](https://economictimes.indiatimes.com/tech/technology/npci-attributes-upi-outage-to-excessive-api-calls-plans-preventive-measures/articleshow/120316821.cms) | NPCI root cause, as reported |
| R12 | Meta outages: ~6–7 h in Oct 2021 (WhatsApp included), ~3 h in Dec 2024 (WhatsApp affected), ~2–3 h on 12 Jun 2026 (WhatsApp Business Platform disrupted, mobile WhatsApp mostly up); no public postmortem in 2026 | [FlowVerify](https://www.flowverify.co/blog/meta-missing-postmortem-instagram-breach), [Blazetrends](https://blazetrends.com/facebook-and-whatsapp-web-outage-how-metas-unified-backend-failed/) | Secondary. **A 3-day WhatsApp outage has no precedent**, so we model a 3-day failure at the Business Solution Provider (BSP) or in billing instead, which is realistic |
| R13 | PM-Kisan DBT failures from unmapped Aadhaar, closed accounts and KYC gaps; banks told to fix them | [TOI](https://timesofindia.indiatimes.com/business/india-business/pm-kisan-yojana-payouts-hit-by-aadhaar-account-errors-banks-directed-to-fix-transaction-failures-by-government-rs-63500-crore-allocated-for-scheme-in-fy26/articleshow/123542182.cms) | News report |
| R14 | PFMS can take up to 48 h to accept or reject a DBT transaction (Nikshay FAQ); rejection codes need fixes at the beneficiary level | [Nikshay PFMS FAQ](https://nikshayeverwellprod.blob.core.windows.net/training-materials-nikshay/Nikshay%20Documents/Nikshay-DBT-%20PFMS%20FAQs.pdf), [PFMS remedies](https://pfms.nic.in/sitePages/doc/PFMS_Validation_Payment_Rejection_Remedies.pdf) | Official documents |
| R15 | IMC officials: Indore e-waste goes from ~8 t/day to ~25 t/day around Deepawali | Report 28, source S2 (TOI) | News quoting officials, **UNVERIFIED** against IMC data |

No named "e-waste godown fire" in India in 2025–26 turned up as cleanly as the battery fires above. The Delhi e-waste clusters (Mustafabad, Seelampur) show a pattern of illegal residential storage and open burning ([TOI](https://timesofindia.indiatimes.com/city/delhi/mcd-issues-notices-to-35-illegal-e-waste-units-in-mustafabad/articleshow/125094171.cms)). That is exactly the kind of shop EcoSure plans to formalise.

---

## 2. Event A — Diwali week with a 5× booking surge

### 2.1 Set-up

Diwali 2027 falls on 29 October. The surge runs from about 22 October to 5 November and peaks in the five days before Dhanteras. Weekly doorstep bookings go from ~230 to **~1,150**, drop-offs from ~70 to ~350, and societies ask for about 12 extra drives. A 5× surge is more than the IMC-reported ~3× jump in generation (R15), because the platform is new and a Swachhata Hi Seva campaign has just promoted it. This is a stress case, not a forecast.

### 2.2 Timeline

| When | What happens |
|------|--------------|
| **D−10 (19 Oct)** | Bookings reach 2× by the morning. The operator follows section 23 ("extra drive slots; surge staffing; faster recycler pickups"). None of those three has a number, an owner or a trigger, so the ops manager asks for 2 temporary support staff. Their procurement is a contract variation that the department has not pre-approved. |
| **D−8** | Bookings are 4×. Of ~25 agents, 9 shop-owner agents stop accepting doorstep jobs because their own Diwali retail and repair season has started. Effective doorstep capacity falls from ~80 a day to ~55 a day. |
| **D−7, 09:00** | 170 new bookings overnight. The pickup queue (S2) shows 310 unaccepted requests. Section 16.3 step 4 only handles areas with no agent, so there is **no "we are full" state**. Citizens get "accepted" or nothing. |
| **D−7, 14:00** | Missed-call bookings reach ~90 a day. The promised call-back "within 4 working hours" (C1) needs ~15 support-hours a day on its own. The two support agents fall behind by the afternoon, and missed-call users (older people and people without smartphones, section 22) are the first left out. |
| **D−7, 18:00** | The **recycler escrow low-balance alert fires** (R3: alert below 2 weeks of expected reimbursements). The expected amount is computed on normal weeks, and a 5× week burns 5 weeks of float. The recycler's finance team is shut for Dhanteras preparation. |
| **D−6** | Agents ask for advances to pay citizens the material price at the door. The advance cap is 40% of *average* weekly accepted value (S5, 17.4), which is far below the cash they need this week. Some agents pay citizens late or "next week", which breaks the core promise of price on the spot (C7). |
| **D−5** | **Escrow hits zero, so new pickups for that recycler's agents pause automatically** (R3, 17.4 "new pickups pause at zero"). With one recycler (27.2), that means **the whole corridor stops taking bookings at peak**. That is the worst possible moment and exactly the rule working as written. |
| **D−5 to D−3** | The ops manager calls the department. Topping up escrow is the recycler's job, and the department cannot lend it money (17.1). The recycler adds ₹8 lakh on D−3, and pickups restart with a backlog of ~700. |
| **D−3** | The shop storage rooms fill up. Lots are sealed faster than the recycler can receive them, because recycler staff are on festival leave and the gate runs 1 shift. Embedded-battery devices stack up in shops **during firecracker week** (report 34 F4). Section 23's heat rule does not apply because it is October. |
| **D−2 (Dhanteras)** | Bank holiday effects begin. Incentive batches go into the treasury queue. The "1–4 working days" promise (C7) becomes 6–8 calendar days, which **trips the red line in 18.3** ("> 4 working days median"). The tripwire is monthly, so the steering committee finds out in the second week of November. |
| **D−1 to D+2** | Brand exchange offers (Samsung, Panasonic, retailers; report 34 C7, C8) take the high-value phones and laptops. What is left for EcoSure is heavier, low-value items such as CRT TVs, coolers and mixers. The "high-value share falls" tripwire (18.3) goes amber for a reason that is not fraud. |
| **D+3 to D+7** | Labour returns. The backlog clears at ~110 pickups a day. About 22% of D−7 to D−1 bookings are cancelled by citizens who sold to the kabadiwala instead. Complaints reach CM Helpline 181 (report 28 F7): "government e-waste scheme took my booking and never came". |
| **D+14** | Weight disputes from rushed weighing run at ~14%, just under the pilot gate of 15% but above the ≤ 10% target (24.2). The dispute team works through 5 working days of Diwali holidays, and the 5-working-day clock (S8) is missed for about 40% of cases. |

### 2.3 Breaking points

1. **The escrow pause-at-zero rule plus a single recycler shuts the corridor at peak.** This is the sharpest failure in the whole simulation, and the PRD designed it in (R3, 17.4, 27.2).
2. **There is no queue-full state.** Section 16.3 always "accepts". Nothing throttles booking, shows an honest wait time, or sends people to drives or drop points when capacity is short.
3. **Agent capacity does not stretch.** Shop agents drop out in their own retail peak, and the PRD has no temporary agents, no IMC-vehicle substitution plan, and no drive-first routing.
4. **Advances are sized on averages.** The 40% cap starves agents in exactly the week they need cash.
5. **Holiday calendars are ignored.** The 1–4 working day incentive, the 7-day reimbursement, and the 72-hour and 5-day dispute clocks do not define a working-day calendar (report 28 F3 is still unresolved in v3).
6. **Surge mode is phase 2 and belongs to the hub** (15.2 H6). Section 23 names the problem but gives no rule with a number in it.

### 2.4 Operator coping

With 10 people, the operator can clear about ~150 support threads a day. Demand is ~350–400 a day (1.5 threads per pickup plus reschedules and "where is my collector" questions). It will triage by hand: answer money problems first, send doorstep requests to drives, and stop the missed-call line for 2 days. Every one of those choices hits the inclusion groups first. The ops manager and finance executive will spend D−7 to D−3 on escrow and advances instead of supervising. Real cost: about ₹1–1.5 lakh of extra temporary staff and overtime (report 28 §3.3), which only helps if it was contracted **before** September.

### 2.5 Citizens and agents

- About 700 citizens wait 5–10 days, and about 150 give up and sell informally. First-time users come away thinking the government scheme is slow, which damages the programme's main differentiator.
- Agents who paid citizens out of their own pocket wait ~10 days for reimbursement, which breaks the red line in 18.3 (> 10 days median). Two or three micro agents quietly sell their stock to informal buyers for cash. That is a leakage and custody breach the platform only sees later as a device-count gap.

### 2.6 Legal liability

The legal risk is low. Late incentives are a grievance, not a breach of law. Agents paying citizens late is a problem under the agent agreement, and **the recycler is responsible as principal** for its agents' obligations to citizens. Storage piling up in Diwali week is the one real legal exposure, and it feeds straight into Event C.

### 2.7 Reputation

The damage is moderate and local: 181 complaints, WhatsApp forwards and a Dainik Bhaskar item along the lines of "EcoSure not reaching homes". The political cost is low unless it combines with a fire.

### 2.8 Recovery

It takes 2–3 weeks. The backlog clears, but about 20% of first-time bookers are lost for good (**UNVERIFIED** estimate).

### 2.9 Event A score: 5 / 10

The design holds together, but a normal rule (pause at zero escrow) combines with the lack of a second recycler into a total shutdown.

---

## 3. Event B — Four-day monsoon flood with power cuts and a network outage

### 3.1 Set-up

It is late July in year 1. 120 mm of rain falls overnight, and waterlogging lasts 4 days in low-lying wards: Dwarkapuri, Prajapat Nagar, Raj Mahal Colony, Rajendra Nagar, Khajrana and old-city lanes (R8). Discom shuts down feeders in the flooded areas for safety, for 6–30 hours in rolling blocks (R9 pattern). Mobile data is patchy for 3 days because towers run on batteries and diesel is short, and one operator is down for a whole day (**UNVERIFIED** as an Indore precedent; common after Indian floods). Four agents have storage in affected wards.

### 3.2 Timeline

| When | What happens |
|------|--------------|
| **Day 1, 02:00** | Heavy rain. By 06:00, 40 doorstep pickups are booked for the day in affected wards. |
| **Day 1, 07:00** | Section 23 says "fewer doorstep slots in flooded wards", but **nobody has declared the flood**. There is no calendar window mechanism (report 34 F1 is still open in v3), so bookings are still accepted. |
| **Day 1, 09:00** | Agents mark visits as `failed_visit`. The PRD has no weather reason code, so failed-visit stats count against agents and citizens. The first failed visit is penalty-free (C5), but the second one is not. |
| **Day 1, 11:00** | The power cut begins. The Bluetooth scales (20.5) have 6–8 h of battery and phones are at 40%. Agents switch to "manual entry with a photo" (20.5), which is allowed. |
| **Day 1, 15:00** | A shop storage room in Prajapat Nagar takes in 30 cm of water. Two sealed lots (~180 kg, 22 phones, 4 laptops, a power bank sack mistakenly accepted) are wet. **Lithium cells that have been under water can short and ignite days later.** The PRD has no wet-battery quarantine rule. |
| **Day 1, 18:00** | Data drops. The field app works offline (principle 8, 21.4 "sync within 5 minutes of signal"). That target assumes a short gap, not 72 hours. |
| **Day 2** | Agents in unaffected wards keep collecting offline. **Handover-code check:** the PRD says the collector enters the code (5 attempts, 19.3), but it does not say whether the code can be **checked offline**. If only the server can check it, every offline collection is "code entered, not verified", and incentives are held. If the device checks it, the hash and attempt counter sit on a phone, which weakens a fraud control. Either way the PRD does not say. |
| **Day 2** | Citizens in flooded wards cannot receive SMS codes, so they cannot hand over. IVR bookers cannot get through. Kamla (the persona in section 7.2) is cut off completely. |
| **Day 2** | Operator staff can't get to the office in Vijay Nagar because of waterlogging (R8 lists Vijay Nagar/AB Road in earlier years). They work from home on patchy data. The gov-cloud platform itself is fine. |
| **Day 3** | The operator has no view of offline agents (last-seen, queued records, battery level). **Sync backlog observability** is listed as a metric in 21.4, but there is no operator procedure for it. |
| **Day 3** | The recycler gate on Sanwer Road is cut off by a flooded approach road. Inbound trips are cancelled. Lots near 75% of their storage deadline are flagged; the flags are correct but useless. |
| **Day 4, 16:00** | Signal returns. About 25 agents push 3 days of records at once: ~450 custody events, ~900 photos of 1–3 MB each over congested 4G/3G. Sync finishes 6–20 hours later, not in 5 minutes. Two phones died on Day 3 with unsynced records; one agent's phone had water damage and its **records are lost**, because the PRD has no rule for local backup or export. |
| **Day 5** | **Conflicts:** four pickups were collected offline by an agent while the operator reassigned the same bookings to other agents who also turned up. Section 19.4 rule 10 says "conflicts resolved by the receiver and logged", which does not tell anyone what to do when two agents both paid a citizen. Two citizens received the material price twice. |
| **Day 5** | Clock drift: one phone's clock is 40 minutes off after a battery-dead reboot with no network time. Capture times are wrong, and CERT-In time sync (21.1) only covers servers. |
| **Days 6–10** | Wet lots reach the recycler and weigh 9–12% less once dry. That is outside the 8% monsoon tolerance, so disputes open (S8). The "lower reading" rule (16.4 step 5) makes shop agents lose on water that evaporated. The flood-damaged lots have seals that peeled off in water, so they open "custody disputes" automatically (R4) even though nobody tampered with them. |
| **Days 7–21** | **Post-flood surge:** households throw out flood-damaged TVs, fridges and inverters. Volume doubles for 2 weeks, and a lot of it contains wet batteries (inverter lead-acid and UPS units), which is outside EcoSure's scope (2.3). Agents will get lead-acid batteries anyway. |

### 3.3 Breaking points

1. **Offline mode is sized for minutes, not days.** Offline checking of the handover code, local backup, photo upload priority, clock integrity and a double-collection rule are all undefined (PRD 8, 19.4 rule 10, 21.4).
2. **There is no declared "disruption window".** Flooded wards keep taking bookings, failed visits count against people, and SLAs keep running.
3. **Flood-damaged stock has no path.** There is no wet-battery quarantine, no "seal damaged by water" reason, no `lost` or `destroyed` custody outcome with a loss owner (19.3 has `lost` for passports only), and no insurance. The agent has already paid citizens and is only reimbursed after recycler receipt (S5), so **the agent carries the whole loss**.
4. **Monsoon tolerance is a number, not evidence** (report 34 F3 is still open). There are no wet/dry condition flags, no tare, and no draining of appliances.
5. **Out-of-scope batteries arrive as a surge.** Lead-acid inverter batteries after floods are common. The PRD says "refer", with no named battery channel partner.

### 3.4 Operator coping

The three field staff cannot reach flooded wards. The team spends the 4 days on phone check-ins with agents, which they can't make when the network is down. After the flood the two verification specialists face ~40 disputes at once (normal is ~12 a month). The 5-working-day clock breaks, and 2–3 weeks of backlog follow.

### 3.5 Citizens and agents

Citizens in flooded wards are cut off for 4–6 days, and most don't care because they have bigger problems. The harm comes afterwards: disputed weights, held incentives from unverified offline codes, and duplicate collectors turning up. Agents lose stock, cash (paid out and not reimbursed) and working days. One micro agent losing ~₹6–8k of paid-out material value is enough to make them leave.

### 3.6 Legal liability

- A flooded lot is a **custody loss inside the agent's premises**. Under the agent agreement the agent holds the material *for the recycler* (5.2), but the PRD does not say who carries the risk of loss. Under Indian Contract Act principles, an agent who uses reasonable care is generally not liable for loss by an act of God, which pushes the loss back to the principal (the recycler), who has not paid for it yet. **Needs legal review (UNVERIFIED).**
- If wet lithium stock later catches fire at the shop, see Event C. A foreseeable hazard left unquarantined makes the negligence case much stronger.
- Double-paid citizens: the recovery is small and nobody is liable, but the case needs a written rule.

### 3.7 Reputation

Low during the flood, since the city's attention is elsewhere. Medium afterwards if agents complain publicly about losses ("government scheme left us holding wet junk").

### 3.8 Recovery

Data takes 1–2 days. Disputes take 3 weeks, and agent trust takes a month or more. Records from the drowned phone are lost for good.

### 3.9 Event B score: 4 / 10

Offline-first is a principle, but the long-outage details that make it work are missing.

---

## 4. Event C — Lithium battery fire in a shop's storage room, helper injured, media coverage

### 4.1 Set-up

It is 14 May in year 1, the heat peak. It is 43 °C outside, a tin-roofed storage room behind a mobile repair shop on the MR-10 side is hotter, and the night low is 30 °C (report 34 W6, W8). The shop is a **standard-tier agent** of the sole recycler. It holds 3 sealed lots and 1 open lot with ~140 phones, 18 laptops, 30 power banks and chargers, and a few cordless appliances.

The shop owner also repairs phones and charges customer devices on a power strip in the same room. A 1-hour scheduled power cut has just ended, and the inrush restarts charging (R9 pattern). One swollen phone was accepted three weeks ago because the helper at the door judged the battery "looks OK". The S3 check depends on judgement, and C6 refuses swollen batteries only when someone notices them.

Real anchors: R1 (Indore charging-rack explosion with trapped staff), R2, R3 (Sanwer Road scrap fire), R4 (Indore lithium fire becomes political within 24 h), R5 (Delhi deaths).

### 4.2 Timeline, hour by hour

| Time | What happens |
|------|--------------|
| **15:40** | Thermal runaway in a power bank or swollen phone inside the open lot sack. It makes popping sounds and white smoke. |
| **15:42** | The helper (19, informal, paid in cash, no ESI or insurance) tries to drag the sack out and is **burned on the forearms and face** when a second cell vents. The shop owner uses a small ABC powder extinguisher, which cannot stop cell-to-cell propagation. |
| **15:50** | Flames reach the cardboard and plastic. Neighbours call 101. The helper goes to MY Hospital by auto. |
| **16:05** | Fire tenders arrive (Indore response is usually faster than Bidadi's hour in R7, **UNVERIFIED**). They use water. Cells keep popping "like firecrackers" (R1 wording). The residential floors above are evacuated. |
| **16:30** | Local WhatsApp groups circulate video. The EcoSure agent decal on the shutter (the PRD implies agent identification but does not require signage) is **visible in the video**. |
| **16:45** | The shop owner calls the operator support line. The PRD has a `SAFETY` keyword for citizens at the door (C6), but **no agent incident button** and no hazard incident type (19.1 has disputes and flags only). The support agent logs it as "other". |
| **17:00** | The ops manager hears about it from a field associate who saw the video. There is no severity ladder (report 28 recommended P1–P4; v3 section 21.2 item 10 has an incident runbook for **cyber** incidents only). |
| **17:30** | The fire is under control. About 2.5 tonnes of stock is lost across the shop and store, 4 lots of it EcoSure material. |
| **18:00** | Police arrive. A case is likely registered against the shop owner (see 4.4). Police ask "whose material is this?" The owner shows his EcoSure agent agreement with the recycler. |
| **18:30** | The recycler's compliance head is called. Their first instinct is to protect their CPCB and MPPCB authorisation, so they **suspend all 25 agents pending review**. The PRD allows this (R2: invite, approve, suspend). |
| **19:00** | A local TV reporter calls the IMC PRO: "Is this the government e-waste scheme?" IMC is a co-sponsor (5.1). **There is no media line, no named spokesperson and no holding statement.** The IMC PRO says "we will check". |
| **20:00** | The department nodal officer is informed through personal WhatsApp. The steering committee meets monthly (5.1), so there is no emergency convening rule. |
| **21:30** | The first news story goes up online: "*Sarkari e-waste yojana ki dukaan mein dhamaka, naukar jhulsa*" ("Blast at government e-waste scheme shop, worker burned"). |
| **Day 2, 08:00** | Print coverage. The opposition links it to R4 ("after 8 deaths in March, government is now *storing* battery waste in homes"). The CM's office asks for a report. |
| **Day 2, 10:00** | The collector orders a fire and safety check of "all e-waste storage in the city". Fire safety officers visit EcoSure agents; 60% have no working extinguisher of the right type and no fire NOC, which small shops usually lack anyway (**UNVERIFIED** estimate). |
| **Day 2, 12:00** | MPPCB issues a show-cause notice **to the recycler** as the registered entity whose agent stored the material, and asks whether accident reporting under E-Waste Rules 2022 Rule 20 was done "immediately" (report 13 F4). Nobody did it, because the PRD gives nobody that duty. |
| **Day 2, 15:00** | The helper's family demands compensation. The shop owner says the recycler should pay, the recycler says it is the shop's employee, and the operator says it only runs support. **Nobody holds insurance.** Report 28 costed ₹8,000/month of goods-in-transit and public liability insurance for the operator, but it is not in v3. |
| **Day 3** | Corridor collections are at 0 because all agents are suspended. Citizens with booked pickups get no message, since the PRD has no "programme pause" broadcast. Kabadiwalas who never joined say "we told you so" (18.3 tripwire: "grievances from non-enrolled kabadiwalas"). |
| **Days 4–7** | The department orders a pause on all data-bearing and battery-bearing categories pending an SOP. **Phones and laptops are the economic core** (17.3 worked example): without them, citizen value and agent margin collapse. |
| **Day 10** | An NGT suo motu notice is a real possibility, because the NGT often acts on news reports of hazardous fires (pattern known, **UNVERIFIED** for this case). |
| **Weeks 2–6** | The recycler reinstates 15 of 25 agents after site checks. Four shop agents quit on their own ("not worth the police"). The backup recycler, not needed until phase 1b (27.2), does not exist yet. The 25 t phase 1b volume gate (26.3) is now out of reach, which raises the question of whether funding continues. |

### 4.3 Breaking points

1. **Shops have no storage-safety regime.** Site safety audits, extinguisher types, fire checks and "no charging" rules exist only for **phase 2 hubs** (15.2 H1). Shops (S1, S4) have none, although they are where the stock actually sits in the pilot, because there is no hub.
2. **Storage time is too long for battery-bearing stock.** S4 lets lots sit **up to 180 days**. The CPCB battery guideline's 90-day limit and ≤ 35 °C storage (report 13 F3) are not applied to embedded batteries. Section 23 says "shorter storage for battery-bearing items" in heat, with no number and no enforcement.
3. **There is no quantity cap.** Nothing limits the kilograms or unit count of battery-bearing devices an agent can hold. Batching into lots actually **encourages** accumulation.
4. **The battery check depends on the judgement of the person at the door.** Swollen means refused (S3, C6), but intact-looking cells can still be dangerous, and helpers are not required to be trained. S10 training is "Hindi videos", not a gate before first pickup.
5. **Incidents are not modelled.** There is no `HazardIncident` entity (19.1), no Rule 20 reporting owner, no severity ladder, no agent incident button, and no programme-pause broadcast.
6. **There is no insurance anywhere in the PRD.**
7. **There is no crisis communications plan** covering spokesperson, holding lines, sponsor escalation within hours, or media protocol. The steering committee meets monthly.
8. **One recycler is a single point of failure.** Its self-protective suspension takes down 100% of the corridor.

### 4.4 Who is legally responsible under the agent model?

This is not legal advice. It is a plain-English map of likely exposure, and it needs a legal opinion (**UNVERIFIED**).

| Party | Likely exposure | Why |
|-------|-----------------|-----|
| **Shop owner (agent, occupier, employer)** | **Primary.** Criminal: Bharatiya Nyaya Sanhita offences for rash or negligent acts endangering life and causing hurt or grievous hurt (the old IPC 336–338 equivalents); causing death by negligence if the helper dies. Civil: compensation to the helper (Employees' Compensation Act 1923 if the helper counts as a workman), to neighbours and to property owners. Regulatory: municipal trade licence and fire safety breaches. BWMR 2022 applies to collection entities with no micro exemption (report 13 F8). | He controls the premises, the charging practice and the helper. |
| **Recycler (principal, CPCB-registered)** | **Significant.** Under the Indian Contract Act the principal is bound by acts the agent does within its authority, and storage of the principal's material is squarely within the agency. It is plausibly vicariously liable in tort for the stored material. Regulatory: MPPCB show-cause, possible suspension of consent or authorisation, and the E-Waste Rules duty to report accidents. Commercially, its EPR certificate flow is at risk. | v3 deliberately makes "the recycler accountable for its agents" (5.2), so the model routes liability here **by design**. That is good for fraud control, but the recycler has not priced it in, and it will react by suspending the whole network. |
| **Department / MPPCB (sponsor, author of the agent direction)** | **Low legal, high political.** Direct liability is unlikely unless a platform rule caused the unsafe storage, for example allowing 180-day accumulation or requiring shops to hold material until lots are full. Exposure to PILs or NGT is plausible. MPPCB is in the awkward position of regulating a scheme it co-sponsors. | "Government scheme" framing in the media. |
| **Operator** | **Contractual.** Liable if it onboarded or site-checked the shop negligently; depends on the indemnities in its contract (none specified). | It verified onboarding (S1). |
| **Software vendor** | Negligible, unless a software fault hid a storage-deadline or quantity warning. | — |
| **Helper** | None. He is the victim. | — |

**The core lesson:** the agent model settles the legal question of **who owns the material**, but it creates a **real-world liability chain** (shop → recycler → sponsor) that nobody in v3 has insured, contracted or rehearsed.

### 4.5 Reputation

**Severe.** This is the pre-mortem's story 3 happening for real (27.1, rated ~7% in v3). With the March 2026 Indore EV-fire deaths still fresh (R4), the programme becomes "the government that brought battery waste into neighbourhoods". Expect a 2–6 week collection freeze, the loss of the phone category for a while, kabadiwala "told you so" statements, and the scheme being cited in the 2027 civic election campaign (report 34 E6–E9).

### 4.6 Recovery

It takes 6–12 weeks, and only with a published safety SOP, insured agents, a second recycler and site-checked shops. Without those, the programme is unlikely to recover in Indore before the state budget (23: February–March).

### 4.7 Event C score: 3 / 10

The PRD knows fires happen (S3 cites 2026 godown fires; 27.1 story 3) and treats the battery check as the whole answer. Storage, incidents, insurance and communications are all missing.

---

## 5. Event D — WhatsApp or BSP billing failure for 3 days, plus a PFMS batch failure the same week

### 5.1 Set-up

It is mid-March in year 1: financial year-end, when treasury and PFMS processing is congested and budget heads close (**UNVERIFIED** as a cause of failure, but a well-known squeeze). Two things go wrong.

1. **WhatsApp stops for 3 days.** A real 3-day Meta outage has no precedent (R12 shows 2–7 hours). The realistic cause is the **Business Solution Provider**: its prepaid messaging wallet runs out because the department's purchase order renewal is stuck at year-end, or a card or billing failure on the WhatsApp Business account suspends paid template messages. Inbound messages may still reach Meta, but the BSP webhook is down, so they are not delivered to EcoSure.
2. **The PFMS batch fails.** Two daily incentive batches are rejected (a scheme code or sanction mapping error after a year-end budget re-allocation), and a third is stuck "in process" for 48+ hours (R14). An NIC-side outage like R10 (MP treasury transactions hit for about 7 hours, reportedly 5 days in 2025) is also plausible.

### 5.2 Timeline

| When | What happens |
|------|--------------|
| **Mon 09:00** | Template sends start failing with billing errors. Nobody notices for 3 hours, because the PRD watches message delivery (21.4) but has no alert threshold or owner for it. |
| **Mon 12:00** | Citizen confirmations ("accepted / scheduled / on the way") are not arriving. **Handover codes go by SMS** (16.9, 20.2), so collections carry on. This is where the "SMS first for money and codes" decision pays off. |
| **Mon 14:00** | Inbound WhatsApp bookings, `RESCHEDULE`, `GATE`, `STATUS` and **`SAFETY`** keywords are silently lost (16.9). **A woman at home who types SAFETY on WhatsApp gets no response.** The C6 safety design names "keyword or button", but WhatsApp-only users have no button. |
| **Mon 15:00** | Operator support is itself on WhatsApp Business. The operator switches to the SMS fallback for outbound, but **not every WhatsApp template has an approved DLT SMS twin**, so some messages cannot be sent at all. Approving new DLT templates takes days. |
| **Mon 18:00** | The missed-call line gets 4× normal traffic. The 4-hour call-back SLA fails. |
| **Tue** | The ops manager asks the department to pay the BSP. Payment needs a sanction and bill through IFMIS, which is year-end congested. The **manual pilot** in 25.3 runs entirely on WhatsApp. If this had happened during the pilot, the custody log itself (WhatsApp plus spreadsheets) would have stopped. |
| **Tue 11:00** | **PFMS batch 1 is rejected** (scheme code mapping). The finance executive resubmits. |
| **Wed 10:00** | Batch 2 is rejected. Batch 3 has been "in process" for over 30 hours. **The risk of double payment is real:** if batch 3 is resubmitted while PFMS may still pay it, citizens could be paid twice. The PRD's "idempotency keys on every payment" (17.4) work inside EcoSure, but PFMS batch status comes back as bank return files; nothing defines a **do-not-resubmit-until-final** rule. |
| **Wed 16:00** | About 1,100 incentives are now 3–6 working days late. The **18.3 red line** is crossed (median > 4 working days). The tripwire is reviewed monthly. Citizens can't get "incentive delayed" messages because WhatsApp is down, and SMS costs are fine but the templates are missing. |
| **Thu** | Local forwards say "EcoSure paisa nahi de raha, fraud hai" ("EcoSure isn't paying, it's a fraud"). CM Helpline 181 complaints (report 28 F7) go to department L1 officers, who have no case file. |
| **Thu 17:00** | The BSP wallet is topped up through an emergency approval. WhatsApp resumes. The BSP replays webhooks, but Meta's retry window and the BSP's buffering are not guaranteed (**UNVERIFIED**), so some inbound messages are lost for good. The operator sees about 600 inbound messages arrive at once, many out of order (`CANCEL` before `BOOK`). |
| **Fri** | The PFMS scheme mapping is fixed. Batch 3 finally returns as "paid". Because batch 3 was resubmitted inside batch 4, about 180 citizens are paid twice (~₹18,000). Recovering money from citizens is politically toxic and costs more than it recovers. |
| **Week +1** | Reconciliation takes the finance executive most of the week (report 28 said 1 finance FTE can handle ~3,000 payouts a month when things are normal). |

**Rail A keeps running.** Agents' material reimbursements come from the recycler's bank escrow (17.2), so agents are **unaffected** by PFMS. The two-rail split contains the damage well.

### 5.3 Breaking points

1. **WhatsApp is a single channel for inbound, including SAFETY.** SMS and IVR do not cover all the keywords, and there is no documented fallback.
2. **Government billing for a prepaid messaging service.** Year-end purchase order and payment delays can switch off the programme's main channel. There is no advance wallet float, second BSP or contract clause to cover this.
3. **SMS templates don't match WhatsApp ones.** DLT templates need to be pre-approved for every WhatsApp template, including "incentive delayed" and "programme paused".
4. **There is no PFMS failure protocol.** Nothing defines "in process" vs "rejected" vs "paid", no rule forbids resubmitting while a batch is unresolved, there is no ledger of accrued but unpaid incentives, citizens get no automatic delay message, and there is no case-file handover for 181 complaints.
5. **Tripwires are monthly** (18.3). A red tripwire needs daily alerts.

### 5.4 Operator coping

It is manageable but chaotic. Two support staff plus two verification staff go on the phones, and field staff visit agents to reassure them. The biggest time sink is reconciling the double payments. There is no "outage mode" script.

### 5.5 Citizens and agents

Citizens get their incentives 6–9 days late and some messages are lost. The safety channel was degraded for 3 days, which is the most serious harm even if nothing bad happened. Agents barely notice, apart from missing rate-change messages.

### 5.6 Legal liability

- **Incentive delay:** the department is responsible for scheme delivery. There is no statutory right to a timeline, but it is an audit issue (CAG-style "delays in DBT").
- **Double payment:** an audit objection to the department. Recovery would follow the scheme guidelines, and the PRD has none.
- **SAFETY channel failure:** if a citizen was harmed during those 3 days after sending SAFETY on WhatsApp, the programme's advertised safety feature did not work. That creates **serious reputational and possibly negligence exposure** for the department and operator. The BSP's contract liability is probably capped.
- **Data:** the webhook replay and messages lost at the BSP need a DPDP processor review. It is not a breach unless data leaked.

### 5.7 Reputation

Moderate: "fraud" rumours and 181 complaints. It turns severe only if the SAFETY failure coincides with an incident.

### 5.8 Recovery

About 1–2 weeks. The design recovers well because money rail A was isolated.

### 5.9 Event D score: 5.5 / 10

The best-designed of the four areas (SMS-first codes, separate money rails), let down by operations: billing, template parity, and PFMS reconciliation.

---

## 6. Cross-cutting findings

### 6.1 The same weak points show up in every event

| Weakness | A Diwali | B Flood | C Fire | D Outage |
|----------|:--------:|:-------:|:------:|:--------:|
| One recycler is a single point of failure (27.2) | ✔ escrow pause | ✔ gate cut off | ✔ network suspension | — |
| No declared "disruption window" or degraded mode | ✔ | ✔ | ✔ | ✔ |
| No severity ladder or crisis escalation (21.2 item 10 covers cyber only) | — | ✔ | ✔ | ✔ |
| Monthly tripwires and steering committee (18.3, 5.1) too slow | ✔ | — | ✔ | ✔ |
| Working-day calendar undefined | ✔ | ✔ | — | ✔ |
| No insurance or loss owner | — | ✔ | ✔ | — |
| Operator sized for normal weeks (~10 staff) | ✔ | ✔ | ✔ | ✔ |

### 6.2 What v3 gets right under stress

- **The two money rails are separate** (17.2). The PFMS failure does not touch agents, and a WhatsApp failure does not stop handover codes (SMS first, 20.2).
- **Manual entry with a photo is always allowed** (20.5), so a failed scale or power cut does not stop custody.
- **Offline-first as a principle** (6.3 principle 8) and append-only events (19.4) make recovery possible even if it is messy.
- **The battery check at the door** (S3) and the out-of-scope rule for loose batteries (2.3) reduce the chance of a fire (though not the storage risk).
- **Recycler accountability for agents** (5.2) gives a clear legal anchor, even though nobody has insured it.

---

## 7. PRD gaps (with sections)

| # | Gap | PRD section | Event |
|---|-----|-------------|-------|
| G1 | Escrow "pause at zero" has no surge top-up or grace, and there is only one recycler until phase 1b | 12.2 R3, 17.4, 27.2 | A, C |
| G2 | No booking throttle, "queue full" state, honest wait time, or drive and drop-point redirection | 16.3, 10.2 C2 | A |
| G3 | Advances capped on average weekly value with no seasonal pre-funding | 11.2 S5, 17.4 | A |
| G4 | Working days undefined for incentive, reimbursement and dispute clocks; holidays ignored | 10.2 C7, 11.2 S5/S8, 17.4 | A, B, D |
| G5 | Surge mode is phase 2 and hub-only; section 23 rules have no numbers, owners or triggers | 15.2 H6, 23 | A |
| G6 | No mechanism to declare disruption windows (flood, heat, festival, outage) with policy overrides | 23 (report 34 F1 still open) | A, B |
| G7 | Offline limits undefined: offline handover-code check, local backup, sync prioritisation, clock integrity, double-collection rule | 6.3 #8, 19.4 rule 10, 21.4 | B |
| G8 | No `lost` or `destroyed` custody outcome for lots, no loss owner, no insurance | 16.2, 19.3 | B, C |
| G9 | Monsoon tolerance with no moisture evidence; "lower reading" penalises agents | 16.4 step 5, 23 | B |
| G10 | No storage-safety regime for shops or drop points (only for phase 2 hubs) | 11.2 S1/S4 vs 15.2 H1 | C |
| G11 | 180-day storage for battery-bearing items; no 90-day battery clock, heat cap or quantity cap | 11.2 S4, 19.3 Lot, 23 heat row | C |
| G12 | Battery training not a gate before first pickup; helpers not covered | 11.2 S10 | C |
| G13 | No hazard incident entity, no E-Waste Rule 20 reporting owner, no agent incident button | 19.1, 21.2 #10 | C |
| G14 | No crisis communications plan, spokesperson, or emergency steering committee convening | 5.1, 27 | C, D |
| G15 | No "programme pause" broadcast to booked citizens and agents | 16.9 | C, D |
| G16 | WhatsApp-only inbound keywords, including SAFETY; no SMS or IVR parity | 10.2 C6, 16.9 | D |
| G17 | No BSP redundancy, advance wallet, or protection against government billing delays; manual pilot runs entirely on WhatsApp | 20.2, 25.3 | D |
| G18 | DLT SMS templates not required to match every WhatsApp template | 20.2 | D |
| G19 | No PFMS batch failure protocol: status states, do-not-resubmit rule, accrual ledger, delay message, 181 case files | 17.4, 20.3 | D |
| G20 | Tripwires reviewed monthly; red lines need same-day alerts | 18.3 | A, C, D |
| G21 | Operator contract has no surge roster, severity ladder or incident role; report 28 recommendations not carried into v3 | 5.4, 26.1 | All |

---

## 8. Fixes (in order of leverage)

### 8.1 Highest leverage (do before phase 1a go-live)

1. **Agent storage safety and incident package** (fixes G8, G10–G15):
   - Add a site safety check to S1 for any agent that stores stock: the right extinguisher type plus a sand bucket, no charging of any device in the storage area, shade and ventilation, a lined metal bin for suspect devices, battery-backed smoke detection where power cuts are common.
   - **Battery-bearing items:** cap the number held per agent (for example ≤ 40 devices or ≤ 50 kg, to be set with MPPCB, **UNVERIFIED** values) and limit dwell to ≤ 30 days (≤ 14 days from April to June and in the Diwali window). This stays well inside the CPCB 90-day battery limit.
   - A trip is triggered automatically when the cap is near.
   - Battery training becomes a **gate before first pickup**, for everyone who handles items, helpers included.
   - A `HazardIncident` entity and an **agent incident button that works offline**. Principal recyclers must report under E-Waste Rule 20 within 24 hours, with a flag if they don't.
   - **Mandatory insurance** in the agent agreement: public liability plus personal accident for workers. Pool it under the programme or the recycler for micro agents; report 28 costed about ₹8,000/month for the operator's cover.
   - A crisis communications protocol: named spokesperson, holding statements in Hindi and English, sponsor call within 2 hours, and emergency steering committee convening within 24 hours.
2. **Degraded-mode switch in the operator console** (fixes G2, G4, G6, G7, G15, G20):
   - A single mechanism to declare a window per ward or corridor: `surge`, `flood`, `heat`, `outage`, `incident_pause`.
   - Each window carries policy overrides: booking throttle and honest wait time, drive and drop-point redirection, a weather reason code for failed visits, paused SLA clocks on a published working-day calendar, and a broadcast to booked citizens and agents.
   - Offline tolerance of **72 hours**: the handover code is checked on the device against a cached keyed hash with the attempt counter, then re-checked on the server; records upload before photos; local encrypted export; device clock sanity checks; a rule that when two agents collect the same pickup, the first code wins and the second is recovered.
   - Red tripwires raise **same-day alerts** to the department.
3. **Remove the single points of failure in channel, rail and recycler** (fixes G1, G3, G16–G19):
   - **A second recycler with signed agent agreements before go-live**, not before phase 1b. Every agent is dual-principal, or can switch quickly.
   - **Surge escrow:** the recycler pre-funds 4× normal weekly float by 1 October. At zero balance, new bookings pause after a 72-hour grace period rather than immediately.
   - SMS and IVR parity for every inbound keyword, **especially SAFETY**, plus a toll-free safety number printed on the collector's ID card.
   - A DLT twin for every WhatsApp template.
   - Two BSPs, or one BSP with a 60-day prepaid float and a clause that it keeps serving if government payment is late.
   - A written **PFMS protocol** with states (`batched`, `submitted`, `in_process`, `paid`, `rejected`, `returned`), a hard **no-resubmit-until-final** rule, an accrual ledger, an automatic SMS to citizens after 4 working days, and 181 case files created automatically.

### 8.2 Next

- Seasonal advance pre-funding: a Diwali advance based on the last Diwali or a planned surge, not a 4-week average (G3).
- Moisture evidence at both weighings (condition, tare, drained appliances) and a 48-hour maximum gap in monsoon; a "seal damaged by water" reason that does not open a tampering dispute (G9).
- A named battery channel partner (a BWMR-registered recycler) for the post-flood inverter and UPS surge, even though loose batteries stay out of scope (2.3).
- Add a surge roster, severity ladder and incident duties to the operator contract (report 28 §6–7) (G21).
- Run the manual pilot with a non-WhatsApp backup log (SMS codes plus a paper custody book) (G17).
- Diwali readiness checklist by 1 October: recycler gate hours, surge staff contracted, drive calendar, escrow top-up, and storage caps halved.

---

## 9. Scores

| Event | Score | One line |
|-------|------:|----------|
| A Diwali 5× | 5 / 10 | Holds together, but the escrow pause and one recycler shut the corridor at peak |
| B Flood, power and network | 4 / 10 | Offline-first in principle; long-outage mechanics and flood-loss rules missing |
| C Battery fire with injury and media | 3 / 10 | No storage safety, incidents, insurance or crisis communications; the liability chain is real and uninsured |
| D WhatsApp/BSP and PFMS | 5.5 / 10 | Two rails and SMS-first codes help; billing, template parity and PFMS reconciliation are unplanned |
| **v3 resilience in real life (overall)** | **4.5 / 10** | Weighted towards C, because one fire can end the programme |

For comparison, report 34 scored v2's seasonal resilience at 4/10. v3 fixed parts of the money design, Model Code of Conduct awareness and the battery door check, but it left storage safety, degraded modes and operator surge capacity mostly as principles. **With the three fixes in 8.1, we estimate it would reach about 7 / 10 (UNVERIFIED estimate).**

---

## 10. Verification notes

- Volume, capacity and staffing figures are modelled assumptions (section 0), not measured data.
- Hazard dates and details come from news reports (R1–R10). Some Indore flood reports (R8) may be from 2025 rather than 2026.
- A 3-day WhatsApp outage has no precedent; we used a BSP or billing failure as the realistic stand-in.
- The PFMS year-end failure mechanism is a plausible scenario, not a documented incident. R10 shows MP treasury transactions being hit by NIC outages.
- The legal mapping in 4.4 is a plain-English reading of general principles (Indian Contract Act agency, BNS negligence offences, Employees' Compensation Act, E-Waste Rules 2022 Rule 20, BWMR 2022). It is **not legal advice** and needs review by the department's counsel.
- The proposed caps (40 devices or 50 kg per agent, 30 or 14 days' dwell, 72-hour offline tolerance, 4× surge escrow) are design proposals, not regulatory figures.
