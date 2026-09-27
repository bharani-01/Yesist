# EcoSure v3 — Real-Life Simulation Synthesis

**Date:** 2026-09-27  
**Subject:** [`../../prd/v3-PRD.md`](../../prd/v3-PRD.md)  
**Method:** 18 simulation agents. 17 played real stakeholders or ran stress tests against v3 in realistic Indore and Madhya Pradesh conditions, using web research where needed; one ran a 10,000-run Monte Carlo model. A final agent simulated an IEEE YESIST12 judging panel.  
**Caveat:** These are AI simulations grounded in desk research, not field data. Prices and local facts marked UNVERIFIED in the reports must be checked. Treat the scores as a structured stress test, not a measurement.

---

## 1. Headline

| Lens | Score |
|------|------:|
| **Real-life performance** (average of 17 simulations) | **4.7 / 10** |
| Real life, if the fixes proposed by the simulations are applied (their own estimates) | about 6.5–7.5 / 10 |
| **YESIST12 competition panel** (document only, no prototype) | **6.8 / 10** |
| Competition panel with a working prototype and field evidence | about 8.0–8.5 / 10 |
| Monte Carlo: programme survives to month 24 | 55% |
| Monte Carlo: genuine success (survives + ≥ 25 t/month from new channels + true 30% KPI) | **10%** (37–44% with the two volume fixes) |

**Verdict:** v3 is the right *strategy*. It aligns with the problem statement, is legally aware, and is the best-researched design so far. But it is not yet a *workable operation*. The v3 change log estimated 6.5–7; that estimate was too high. Real-life performance barely moved from v2 (4.6 → 4.7). v3 fixed the strategic problems, but the operational detail that decides whether shops, kabadiwalas, the treasury, and IMC can actually run it is still missing, and the new features (passport, provenance) brought new risks.

---

## 2. Scores by simulation

| # | Simulation | Score | One-line verdict |
|---|------------|------:|------------------|
| 01 | Citizen, Indore (Priya) | 5.5 | Wins dead devices on price and safety; loses working phones to Cashify and trust to slow incentives |
| 02 | Citizens without smartphones | 4 | Right channels listed, no procedures to make them work |
| 03 | Kabadiwala (informal collector) | 4.5 | Joins for the ID card; keeps sending valuable parts to his aggregator |
| 04 | Micro shop cash flow | 4 | Ends 12 weeks ~₹9,100 down; needs a loan in Diwali week; ~94 hours of compliance |
| 05 | Society, college, government-office drives | 4.5 | Drives built like doorstep pickups repeated at one table |
| 06 | Indore Municipal Corporation politics | 5 | Right strategy, thin city-operations detail |
| 07 | Recycler owner | 4.5 | Honest recyclers pay for the trust layer, then get flagged for being visible |
| 08 | Producers | 4.5 | Will fund small take-back pilots, won't hand over identifiers or certificates |
| 09 | MPPCB officer and CPCB | 5.5 | Quarterly export valued; unclosable flags become an officer's liability |
| 10 | Finance department and treasury | 4.5 | Returned for revision: payments designed like a consumer app, not a treasury scheme |
| 11 | Fraud red team | 5.5 | Stops lazy fraud, loses to organised collusion |
| 12 | Diwali, flood, fire, outage stress | 4.5 | Built for normal weeks; one shop fire could end the programme |
| 13 | Build feasibility | 4.5 | Buildable, but ~90–95 weeks with 7 people, and the browser can't do the field app |
| 14 | Legal counsel | 5.5 | Lawful in substance, anchored on a direction MPPCB probably can't issue |
| 15 | Monte Carlo (24 months) | 4 | Survives on relabelled city tonnes; genuine new collection is a 1-in-10 bet |
| 16 | Journalist, opposition, NGOs | 5 | Strong against fraud stories, weak against cost, surveillance, exclusion |
| 18 | Tier-2/3 expansion | 4 | Dewas works as an Indore suburb; beyond that, built only for Indore |
| 17 | YESIST12 judging panel | 6.8 | Best-researched entry, but still a document; build the demo |

---

## 3. The twelve cross-cutting problems

Ranked by how many simulations hit them and how fatal they are.

### 3.1 Small players lose money (01, 03, 04, 05, 10)
The agent handling margin is never set. Reimbursement really takes about 20 days, not 7. Shrink inside the tolerance band and rate changes on stock already bought fall on the agent. In Diwali week the advance cap (~₹920) was nothing against ~₹13,500 of stock he had paid for. For kabadiwalas, the "intact only" rule plus below-aggregator rates cost about 27% of income, with nothing to make up for it.

### 3.2 Treasury incentives don't fit how DBT works (01, 10, 13)
PFMS pays validated bank accounts through officer-signed bills and SFTP files. UPI, voucher, and nominee payouts don't fit. Daily ₹50–100 payments to one-time citizens bring 5–15% failures costing more than the payment. "1–4 working days" became 12 days in simulation.

### 3.3 "Unbacked certificate" label is wrong and dangerous (07, 08, 09, 14)
EcoSure sees only part of each recycler's inflow, and certificates are in kg of recovered metal while EcoSure counts kg of e-waste. So honest participants look "unbacked" while non-participants are never flagged. Producers won't enter certificates, recyclers are penalised for joining, and a High Court would likely stay the label.

### 3.4 Additionality: the volume mostly isn't new (06, 15, 16)
Volume gates count IMC and recycler tonnes that already existed. Counting only new channels, the 25 t and 50 t gates fall to 12% and 0.4%. IMC's claimed 2–2.5 t/day may be much lower when weighed, and a public gap would embarrass IMC and end the pilot. Cost per *additional* tonne may be ₹4.5–6 lakh.

### 3.5 The legal anchor is weak (14)
MPPCB probably lacks power to issue a direction creating "agents". The Section 5 powers delegated to board chairpersons in 2001 leave out e-waste, and a direction cannot create a category the Rules left out. NGT challenge risk is about 55–65%.

### 3.6 Recycler collusion beats the controls (07, 11)
A paper recycler appoints its own agents, receives its own lots, makes relatives maker and checker, and self-reports mass balance. EcoSure could then certify its paper as "fully backed". The app signs scale readings, not the scale itself, and the gate guard alone checks seals.

### 3.7 Shop battery safety and single points of failure (12, 05)
There are no storage-safety rules at shops (only for phase-2 hubs), battery devices can sit 180 days, and there is no insurance, incident process, or media plan. There is one recycler, and zero escrow pauses the whole corridor at Diwali. No degraded mode exists. Swollen batteries are refused with nowhere safe to go.

### 3.8 The field tech is unrealistic (13)
Web Bluetooth doesn't exist on iPhones and doesn't support the Classic Bluetooth most Indian scales use. Old phones rarely carry IMEI barcodes. HMAC "re-hashing" is impossible because raw IMEIs are never kept. STQC (5–6 months) sits on the phase 1a exit gate. The realistic timeline is about 90–95 weeks with 7 people, not 52–66.

### 3.9 IMEI registry reads as surveillance (08, 14, 16)
A sale-time national IMEI registry is legally heavy (hashed IMEIs are still personal data), producers won't upload it, and it invites a surveillance framing. Raw IMEIs would sit in offline queues on collectors' phones.

### 3.10 City operations are missing (06)
Garbage-vehicle drivers cannot run handover codes and IMEI scans. There is no workflow starting custody at transfer stations. Existing IMC vendors and their fees are ignored. Swachh Survekshan doesn't score e-waste tonnes. A commissioner transfer resets everything.

### 3.11 Inclusion is listed, not engineered (02, 05)
The PRD's own persona Kamla lives in Mhow, outside the Indore city pilot. Negative-value items (CRT TVs) get ₹0 and are left behind. IVR has no retry or fallback rules. Codes, safety, and "recycled" messages assume a smartphone. Students hit the 18+ rule and per-address caps.

### 3.12 It doesn't travel beyond Indore (18)
The launch checklist assumes an IMC-style city. Tier-3 towns make 1–2 t/month against a hub break-even of ~52 t. Rewa's nearest recycler is 250–430 km away. Odisha has no registered recyclers. The "open standard" is only a schema.

---

## 4. Fixes for v4, ranked by leverage

| # | Fix | Solves | Sources |
|---|-----|--------|---------|
| 1 | **Measure only genuinely new tonnes.** Weigh all flows for 6 weeks before launch and publish nothing; use that as the baseline. Put volume gates and the 30% KPI on new channels, reported channel by channel | 3.4 | 06, 15, 16 |
| 2 | **Make agents and bulk consumers the volume engine.** 50+ agents, rate card within ₹4/kg of aggregators, per-kg formalisation bonus (Monte Carlo: genuine success 10% → 37–44%) | 3.1, 3.4 | 03, 04, 15 |
| 3 | **Fix agent money.** Set a handling-fee floor (~₹15–17/kg); pay 80% within 2 working days on sender weight at the collection-date rate; recycler-run weekly pickup rounds; weekly ward points with same-day cash for kabadiwalas; festival surge advances and pre-topped escrow; cap measured by value | 3.1 | 03, 04 |
| 4 | **Fund pilot citizen incentives from recyclers and producers, not the treasury.** State money funds the platform only. Keep a separate, capped treasury scheme with weekly batches to validated bank accounts for later phases | 3.2 | 01, 10, 13 |
| 5 | **Replace "unbacked" with private, recycler-level evidence.** Label as "EcoSure-evidenced share: full / partial / none / outside EcoSure coverage". Keep it private to the producer and recycler, give a right of reply, use EEE codes, and flag regulators only when whole-plant data can't support certificates. Seek CPCB's written recognition as due diligence | 3.3 | 07, 08, 09, 14 |
| 6 | **Re-anchor the legal model.** List collection points in each recycler's consent to operate and seek CPCB confirmation; make any MPPCB order declaratory, not a new category | 3.5 | 14 |
| 7 | **Independent verification against collusion.** Only independently confirmed kilograms back evidence; each kilogram backs one certificate once; outside checker for recyclers above 5 t/month; department mystery pickups; filmed random lot openings; mass balance tied to invoices and manifests with a 90-day calibration period and a 7-day private window | 3.6 | 07, 11 |
| 8 | **Pay incentives only after recycler receipt and scan,** with household rupee and device limits; remove the operator call-back bypass | 3.6, 3.2 | 11 |
| 9 | **Shop safety package.** Battery-device caps, 14–30 day dwell for battery items, no charging, training before first pickup, incident button, mandatory insurance, crisis protocol, sand-bin kits at drives, and a safe route for swollen batteries | 3.7 | 05, 12 |
| 10 | **Resilience.** Second recycler before go-live; surge escrow; degraded-mode switch (throttle bookings, pause SLA clocks, 72-hour offline codes); SMS and IVR for every keyword; rule against resubmitting PFMS batches | 3.7 | 12 |
| 11 | **Realistic tech.** Android native field app (for example, Capacitor) instead of a browser app; manual weight plus photo as the default; versioned key wrapping instead of re-hashing; encrypt offline scans with the server's public key; split phase 1a; move GPS, bin sensors, and STQC off the exit gate; add ~2.5 people; plan ~90 weeks | 3.8 | 13, 14 |
| 12 | **Drop the sale-time IMEI registry.** Producers register models and IMEI model codes (TAC); units are matched at collection. Producers see aggregates only. Put IMEI limits in the government order (court-order access only, no watch lists, annual transparency report) | 3.9 | 08, 14, 16 |
| 13 | **City collection workflow.** Custody starts at transfer stations, not garbage-vehicle doors; separate KPIs for the city stream; logging duties in the next vendor contract; steering committee named by post with a new-commissioner briefing | 3.10 | 06 |
| 14 | **Regulator workflow.** Officers can close flags with a reason; critical flags escalate to HQ; officers see regulatory flags before recyclers; post-flag corrections logged; one-click tribunal evidence pack with a BSA section 63 certificate and a named custodian | 3.3, 3.6 | 09 |
| 15 | **Engineer inclusion.** Fix the Mhow persona or add peri-urban coverage; ₹0 price floor with an agent handling fee for negative-value items; bulky items to city vehicles; SMS plus voice codes; missed-call safety; assistant role and beneficiary field; results reported by channel, age, and gender | 3.11 | 02 |
| 16 | **Drives fast lane.** One host-signed handover, resident tokens, incentives by item count, material value paid once to the host, pooling as its own payout type, separate government-office track with hard-disk destruction | 3.11 | 05 |
| 17 | **Working devices and price clarity.** "Does it work?" route to refurbishers or resale; price and incentive estimate with a date at booking; "can't switch on" path ending in recorded data destruction | 3.1 | 01 |
| 18 | **Hub-and-spoke for Tier-3.** Towns as spokes of a parent city with a municipal recovery-facility corner and a funded monthly truck run; checklist split into supply, cost, and access gates; one shared platform with an onboarding kit for other states | 3.12 | 18 |
| 19 | **Public defensibility.** Monthly open data including cost per additional tonne; guarantee that not enrolling is never grounds for enforcement; waste-picker and trader seats on the steering committee | 3.9, 3.11 | 16 |

---

## 5. For the YESIST12 submission specifically

The panel scored 6.8. Its highest marks were problem understanding (8.7) and alignment with the problem statement (8.4); its lowest were IoT/Cloud (4.7) and feasibility (6.1). To reach 8+:

1. A working end-to-end demo: booking → collection with handover code → recycler attestation → live regulator flag.
2. A real connected scale in the demo, plus 10–20 real interviews in Indore (the current research is simulated).
3. Environmental impact numbers (emissions avoided, metals recovered), a published open data schema, and a 10-slide deck.
4. Fix the circular "reporting accuracy" KPI (recyclers file using EcoSure's own export), for example by comparing against independently audited recycler filings.

---

## 6. Honest reading of these results

- v3 is clearly better than v2 in *direction* (problem statement fit, legal awareness, city partnership), but real-life simulations are harsher than the norms review. They test cash flow, workload, and incentives hour by hour.
- The most important single number is the Monte Carlo's 10% genuine-success rate. It says the programme could survive for two years on relabelled city tonnes without formalising much new e-waste. Fixes 1–3 target exactly that.
- Several simulations estimated about 7 with their fixes. That is plausible but unproven until a v4 is re-tested and, ultimately, piloted.

---

## 7. Report index

`01-citizen-priya.md` · `02-citizen-no-smartphone.md` · `03-kabadiwala.md` · `04-micro-shop.md` · `05-drives.md` · `06-imc-politics.md` · `07-recycler.md` · `08-producer.md` · `09-regulator.md` · `10-finance-treasury.md` · `11-fraud-red-team.md` · `12-stress-events.md` · `13-build-feasibility.md` · `14-legal.md` · `15-montecarlo.md` (+ `15-montecarlo.py`, `15-montecarlo-results.json`) · `16-public-scrutiny.md` · `17-yesist-judges.md` · `18-tier3-expansion.md`
