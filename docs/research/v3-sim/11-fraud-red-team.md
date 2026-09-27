# 11 — Fraud Red Team Simulation: Eight Adversaries Against EcoSure v3 for Six Months

**Simulation:** 11 (v3 real-life simulation round)
**Date:** 2026-09-27
**Document attacked:** [`../../prd/v3-PRD.md`](../../prd/v3-PRD.md), mainly §9 (product passport), §12 (recycler, attestations, mass balance), §13 (certificate provenance), §16 (workflows), §17 (two-rail payments), §18 (fraud controls). Cross-checked with §8 (roles), §19 (integrity rules), §20.5 (IoT), and §26 (budget).
**Prior work:** [`../v2-deep/29-fraud-red-team.md`](../v2-deep/29-fraud-red-team.md) (v2 money fraud, 4.5/10) and [`../v2-deep/18-fake-certificates.md`](../v2-deep/18-fake-certificates.md) (v2 fake certificates, 5/10).
**Status:** Research only. No PRD files were edited.

**Bottom line:** v3 took on most of the obvious fixes from the v2 red team: a handover code, "a device earns once", numbered seals, unit scans, maker-checker on attestations, mass balance, and certificate provenance. These stop lazy fraud. They do not stop organised fraud, because in almost every case **the evidence that releases money or backs a certificate is still created by someone who benefits from it.** The ring controls the phones that receive handover codes. The agent types the phone number. The operator can confirm a handover by "call-back". The app signs the scale reading, not the scale. The recycler's gate guard checks the seal. The recycler appoints its own agents, receives its own lots, and approves its own attestations through two brothers. Across the eight attacks, v3 **stops 0 outright, partly stops 3, detects 2 late, and misses 3.** The most dangerous result is attack 7: EcoSure's "fully backed" provenance badge can be used to launder paper recycling. That is exactly the scandal the pre-mortem was meant to prevent (§27.1 story 4). **Real-life fraud resistance score: 5.5 / 10.**

---

## 1. Setting and assumptions

| Item | Value used | Source |
|------|-----------|--------|
| Pilot volume | 8 t/month at the start, rising towards 25 t/month | §1.3, §26.3 |
| Scheme incentive | ₹50 per data-bearing device (illustrative), per kg for other items | §17.3, OQ-70 |
| Producer top-up | ₹30 per phone where a brand runs a take-back programme | §17.3 |
| Material price | Phones about ₹60 each; small appliances about ₹25/kg | §17.3 |
| Incentive budget | About ₹39 lakh over 24 months, so **about ₹9.75 lakh per 6 months** | §26.1 |
| Paper EPR certificate price | ₹6–8/kg on the grey market; ₹22/kg floor price | `18-fake-certificates.md` F2 |
| Dead feature phone, bought by the kilo in Delhi markets (Seelampur, Mandoli) | ₹15–40 each plus about ₹3 freight | Field estimate, **unverified** |
| Diverted working or repairable smartphone | ₹500–3,000 resale value against ₹60 scrap value | Field estimate, **unverified** |

The incentive budget matters for how losses are read. For the incentive-farming attacks (1, 3, 4, 8), the state cannot lose more than the incentive pot unless it tops the pot up. The real damage is therefore threefold: honest citizens get crowded out when the budget runs dry, the headline KPI ("30% above baseline", §4.4) is inflated with fake or imported tonnes, and CAG finds payments it cannot justify.

All rupee figures are judgement estimates for a 6-month window at pilot scale. They are not a statistical model.

---

## 2. Summary table

| # | Adversary | Who loses money | 6-month loss: likely (high) | v3 outcome | When detected |
|---|-----------|-----------------|------------------------------|-----------|---------------|
| 1 | Agent + family ring (many SIMs, bank accounts, addresses) | State incentive pot, producer escrow | ₹2–4 lakh (₹8 lakh) | **Partly stops** | Month 3–5 through the concentration tripwire, if at all |
| 2 | Collector takes the handover code first, then short-pays | Citizens; programme reputation | ₹3–6 lakh from citizens (₹10 lakh) | **Detects late** | Only when citizens complain; most never do |
| 3 | Importer of junk phones from Delhi farming "device earns once" | State incentive pot, producer escrow, KPI integrity | ₹6–10 lakh (the whole 6-month pot) | **Misses** | When the budget runs out, or a later audit |
| 4 | IMEI spoofing, fabricated and cloned IMEIs | State incentive pot; honest owners of cloned IMEIs | ₹1.5–4 lakh (₹6 lakh) | **Partly stops** | Only on sampled recycler scans |
| 5 | Scale tampering with "connected" scales | Citizens (short-weighing), state (per-kg incentive), recycler (padding) | ₹2–4 lakh in total (₹7 lakh) | **Detects late / misses** | Padding caught at processing after reimbursement; short-weighing never caught |
| 6 | Seal swap with a corrupt recycler gate guard | Recycler; producers (false "processed" records); citizens (unwiped data) | ₹3–6 lakh per agent–guard pair | **Misses** | When a "processed" phone turns up for resale |
| 7 | Paper recycler inflating inflow, maker and checker are brothers | Producers, the CPCB EPR system, the state's credibility | ₹20–70 lakh of certificate value "backed" | **Misses** | Journalist or CAG ground visit, 6–18 months |
| 8 | Operator insider abusing call-back handover confirmation | State incentive pot | ₹2–5 lakh | **Detects late** | CAG sample audit, 9–15 months |

**Money at risk in 6 months:** about ₹15–30 lakh in direct losses (the incentive pot, citizens, recyclers, producer escrow). On top of that, ₹20–70 lakh of EPR certificates could carry an EcoSure "fully backed" status they don't deserve. The certificate exposure is the larger harm because producers can be charged environmental compensation on it and the state's name is attached to it.

---

## 3. Attack playbooks

### Attack 1 — Agent plus family ring farming incentives

**Playbook**

1. Ramesh runs a micro-tier shop, approved provisionally with one ID (§8.5). He enrols as an agent of the only Indore recycler.
2. Twelve relatives and friends each open a Jan Dhan account (zero balance, same day) and buy one or two prepaid SIMs (₹0–₹100 each). This gives 20 phone numbers, 12 bank accounts, and 6 real addresses (the family home, two relatives' flats, the shop, a rented room, a cousin in another ward).
3. Ramesh books pickups himself through **assisted booking** (§8.3: agents have W (assisted) on "Create pickup"). He types in a relative's number, so the handover code goes to a phone the ring controls.
4. As a shortcut he also uses **drop point mode**: "optional phone number of the person dropping off for their code and incentive" (§11.2 S7). Whatever number the drop point operator types in receives the code. There's no doorstep and no GPS check.
5. Each account takes 4 paid pickups a month (the cap, §17.4). **There is no limit on devices per pickup and no rupee ceiling**, so each pickup carries 3–5 dead phones with readable IMEI labels, bought at ₹20–40.
6. The material price the agent "pays" to relatives is reimbursed by recycler escrow, so it costs the ring nothing. The ring keeps the ₹50 state incentive plus the ₹30 producer top-up per phone.

**Six-month result:** 12 accounts × 4 pickups × 4 phones = about 190 phones a month. At ₹50–80 each, that's roughly ₹10–15k a month, or ₹60–90k over 6 months for one ring. With 3–5 rings across the city: **₹2–4 lakh** from the state pot and producer escrow.

**What v3 does**

| v3 control | Effect |
|-----------|--------|
| Handover code to the requester's phone (§10.2 C6) | **Defeated.** The ring owns the requester phones, and the agent chose the numbers |
| 4 pickups per payee account (§17.4) | Slows it down. It adds 12 accounts, not 1 |
| Per-address limits (§10.2 C7) | Undefined. No normalisation rule or number is given |
| Device earns once (§9.5 PP4) | Works, but each phone is new, so it doesn't bite |
| Concentration tripwire: top 5% of accounts above 15% of spend (§18.3) | Unlikely to fire. With about 2,000 payee accounts, the top 5% is 100 accounts; 12 ring accounts at the cap are a small share of spend |
| Payout account name match (§18.2) | Applies to agents. Citizens have no verified name to match |

**Verdict: partly stops.** Detected in month 3–5 only if an analyst looks at shared devices or addresses by hand.

**Gaps:** agents can create pickups and choose the requester's number (§8.3, §16.3 step 1); drop points can type any phone (§11.2 S7); caps count pickups, not devices or rupees (§17.4); there's no related-party check between an agent and the payees on its pickups (§18.2 "Fake pickups").

**Fixes**

- **A1.1** When an agent or drop point books on someone's behalf, the handover code isn't released until the citizen confirms from their own phone. They reply `YES` or dial a missed-call number from that phone. An agent-typed number never gets a code on its own.
- **A1.2** Add ceilings per payee bank account (from the account validation response), per normalised address, and per agent: a monthly rupee cap (for example ₹500 per household) and a device cap per pickup (for example 5 data-bearing devices).
- **A1.3** Add a related-party graph: payee accounts, phone numbers, device fingerprints, and addresses shared across pickups. Also flag when an agent's pickups keep paying the same small set of accounts (for example more than 30% of an agent's incentive spend going to 10 or fewer accounts).
- **A1.4** For assisted, drop-point, and provisional-agent pickups, pay the incentive **after recycler receipt and unit scan**, not at the handover code.
- **A1.5** GPS proof of visit: flag doorstep collections recorded more than 150 m from the geocoded address.

---

### Attack 2 — Collector takes the handover code first, then short-pays

**Playbook**

1. The collector arrives at an elderly citizen's home and says, "The app needs your code to start weighing." C6 says the code should be given only after weighing and payment, but nothing in the system enforces that order.
2. With the code entered, the pickup moves to `collected` and the citizen's state incentive is triggered. The citizen is happy about the incentive.
3. The collector records the full rate-card price (₹140) but pays ₹60 in cash, or says "UPI failed, I'll send it tonight" and never does.
4. The collector is **reimbursed by recycler escrow on accepted weight × rate** (§11.2 S5), whatever they actually paid. Every rupee of short-payment is profit.
5. Variation: the collector marks an item `refused_item` ("battery swollen"), takes it anyway, and sells it informally.

**Six-month result:** a dishonest collector doing 200 pickups a month, short-paying 40% of them by about ₹70, makes about ₹5,600 a month, or ₹34k over 6 months. If 15 of about 100 agents do this: **₹3–6 lakh taken from citizens.** The state loses nothing directly. The programme loses trust, and this is the kind of story local reporters write ("Government's e-waste collectors cheat elderly").

**What v3 does:** The "collected (weight and price)" message (§10.2 C8) lets a citizen notice. Payment disputes are allowed within 7 days (§17.4). But cash payments leave no proof, most citizens won't dispute ₹70, and the IVR and missed-call users (§10.2 C1) may never read the message.

**Verdict: detects late**, and only for citizens who complain.

**Gaps:** the code isn't bound to confirmation of the price paid (§16.3 steps 7–8); the collector handles the recycler's money with no proof of payment (§17.2 rail A); there's no citizen-side check of the amount received; `refused_item` has no citizen confirmation (§16.2).

**Fixes**

- **A2.1** Make it a two-step handshake. The collector records the weight and price first. The citizen's phone (SMS, WhatsApp, or IVR readback) then shows "₹140 recorded as paid to you. Reply 1 if received". The code becomes valid only after that reply, or the code is issued only at that point.
- **A2.2** For UPI, capture the transaction reference (UTR) and match it at reconciliation. For cash, a random 10% IVR survey asks, "How much did you receive?", and mismatches score against the agent.
- **A2.3** In phase 1b, have recycler escrow pay the citizen's material price directly through its bank's payout API, triggered by the collector's record, so the collector no longer handles the money.
- **A2.4** A `refused_item` needs the citizen to confirm the item stayed with them ("Collector returned the item? 1/2").

---

### Attack 3 — Importer of junk phones buying dead devices in bulk from Delhi markets

**Playbook**

1. A trader buys 20,000 dead feature phones and smartphones by the kilo in Seelampur or Mandoli at ₹15–40 each. Every one has a genuine, never-seen IMEI printed on its label.
2. The trader ships them to Indore by road (about ₹3 per phone).
3. They come in through three routes: (a) a registered "bulk consumer" organisation (§10.2 C10), a shell trading office; (b) society drives, where 60 "residents" register by WhatsApp link (§10.2 C9); (c) attack 1 style rings.
4. **Nothing limits devices per pickup or rupees per payee.** A bulk consumer pickup of 500 phones is 1 pickup under the "4 per month" cap (§17.4) and earns ₹25,000 in state incentive plus up to ₹15,000 in producer top-ups.
5. "A device earns once" (§9.5 PP4, §17.4) is **the business model, not a barrier**: every phone is a first-time unit. The recycler scans them, they match, the counts reconcile, and the device-count leakage tripwire (§18.3) stays green.

**Six-month result:** 12,000–20,000 phones at ₹50 would cost ₹6–10 lakh, **which is the entire 6-month incentive pot** (§26.1). Producer escrow loses another ₹3–6 lakh. The pot runs dry in about month 4, and genuine Indore citizens are told "payout held". The headline KPI jumps with tonnes that were never Indore's.

**What v3 does:** nothing that bites. Passports built at collection (§9.5 PP3) record the phones faithfully. The material is real and does get recycled, so every custody check passes.

**Verdict: misses.** The fraud surfaces when the budget runs out or when an evaluator asks why phone volume tripled while households didn't.

**CAG angle:** "Incentive paid for e-waste sourced from outside the state, with no additionality." This is a textbook audit para, and §24's additionality measure only compares totals against a baseline.

**Gaps:** caps count pickups, not units (§17.4); bulk consumers and drives have no incentive rules (§10.2 C9, C10); there are no origin or plausibility signals; nothing checks whether a TAC (the first 8 IMEI digits, which identify brand and model) is plausible for the declared model or for the Indore market.

**Fixes**

- **A3.1** Rupee and device ceilings per payee per month, as in A1.2. Bulk consumers **don't** get the per-device citizen incentive; they get the price and a receipt, plus a separately budgeted programme where one exists.
- **A3.2** Drive incentives: one paid registration per flat, capped at the host society's declared flat count, paid after recycler receipt.
- **A3.3** Tier the incentive: full rate for devices where the IMEI is read from the device (a powered `*#06#` screen or an electronic read) or claimed earlier by the citizen; a low or zero incentive for label-only dead feature phones. Accept some unfairness to genuine dead phones; this is the price-it-out lever from `29-fraud-red-team.md`.
- **A3.4** A TAC anomaly flag: batches dominated by out-of-market or long-discontinued TACs, or IMEIs with near-sequential serial numbers, go on hold for review.
- **A3.5** Put a named monthly **incentive burn-rate tripwire** in §18.3: spend running more than 30% ahead of plan for 2 weeks pauses new payouts for anything other than households.

---

### Attack 4 — IMEI spoofing and cloned IMEIs

**Playbook**

1. **Fabrication:** an agent generates IMEIs that pass the Luhn check digit using real TACs (free tools exist online) and types them in. §9.5 PP2 and PP3 allow typed entry. Each typed IMEI goes with a real dead phone or empty shell of the right weight.
2. To survive a recycler scan, the agent prints matching IMEI barcode labels (a thermal sticker printer costs about ₹3,000) and sticks them on shells.
3. Lots of 200 or more units get only a **10% random sample scan** (§9.5 PP4, §12.2 R4), so 90% of fabricated IMEIs are never checked.
4. **Clones:** India has millions of cheap phones sharing IMEIs. A widely reported 2020 Meerut police case found one IMEI on about 13,500 handsets (**unverified figure**). The first genuine clone to arrive earns; every later honest owner gets a "duplicate device" flag and no incentive. That's a grievance generator.
5. **Griefing:** someone who knows other people's IMEIs (a repair shop worker, for example) claims them first (§9.5 PP2). The real owner's incentive is then held for review.

**Six-month result:** 3,000–8,000 fabricated units at ₹50 means **₹1.5–4 lakh**, competing with attack 3 for the same pot. Clones cause honest-user complaints but little direct loss.

**What v3 does:** "Device earns once" stops re-use of the same number. The 100% scan below 200 units makes small-lot fabrication risky. No check validates the TAC or Luhn digit, matches the TAC against the declared brand, or tells printed labels from original ones.

**Verdict: partly stops.**

**Gaps:** typed IMEIs are allowed on money-bearing units (§9.5 PP2, PP3); sampling above 200 units (§12.2 R4, OQ-76); no TAC validation; no rule for legitimate clones (§9.5 PP4 treats every duplicate as fraud); no CEIR duplicate-IMEI signal (§9.6 rule 5 only links to CEIR for stolen phones).

**Fixes**

- **A4.1** Check the Luhn digit, check the TAC against a licensed GSMA TAC database, and check that TAC's brand and model against the declared or scanned model. Mismatches go on hold.
- **A4.2** Money-bearing identifiers must be **scanned by camera**, with a photo of the label or screen stored and checked for near-duplicates. Typed entry is allowed for tracking but earns only the low tier.
- **A4.3** Scanning at the recycler becomes **100% for every unit that earned money**, whatever the lot size. The 10% sample applies only to units that earned nothing. Missing incentivised units are charged back from the agent's settlement (§17.4 chargebacks).
- **A4.4** Handle clones: a duplicate hash with a different model or TAC brand, or a gap of more than 12 months, goes to a quick review rather than automatic denial, with a service standard of 5 working days. Ask DoT whether CEIR can share a duplicate-IMEI indicator.

---

### Attack 5 — Scale tampering with "connected" scales

**Playbook**

1. The PRD says readings are "**signed with the app's device key**" (§20.5). That proves which phone sent the reading, not what the scale measured. A rooted phone, a Bluetooth scale emulator (a ₹500 microcontroller pretending to be the scale), or a modified app can inject any number.
2. Low-tech versions: a magnet under the platform, a wrong tare, or a thumb on the pan. Or simply "the scale's battery died": **manual entry with a photo is always allowed** (§20.5), and the photo can be of another display.
3. **Short-weighing citizens** (the classic *kaanta maarna*): the scale reads 10–15% low at the door, so the citizen is paid less. The agent's lot sender weight at loading is honest, and the recycler reimburses on its own accepted weight (§11.2 S5). The agent pockets the gap. **v3 never reconciles the sum of door weights with the lot weight** (§16.4 compares only sender with receiver), so this is invisible.
4. **Padding:** sand, water, or brick fragments inside sealed lots raise the per-kg incentive (OQ-70) and the agent's reimbursement. The recycler's gate scale weighs the same padded bag, so the 5% tolerance check passes. Padding is found only when the lot is opened for processing, which can be after the 7-day reimbursement (§11.2 S5).

**Six-month result:** short-weighing by 30% of agents on 25 t/month costs citizens about ₹1–2 lakh. Per-kg incentive inflation costs the state about ₹0.5–1 lakh. Padding costs the recycler about ₹1 lakh. **Total about ₹2–4 lakh.**

**What v3 does:** calibration certificates are kept on file; expired-calibration readings aren't used for money (§19.3 IoTReading); sender and receiver are weighed (§16.4).

**Verdict: padding is detected late; short-weighing is missed.**

**Gaps:** readings aren't signed at the scale (§20.5); manual fallback is unlimited (§20.5); there's no lot-versus-pickup reconciliation (§16.4, §19.4); no weight bands per category; reimbursement is paid before grading (§11.2 S5, §12.2 R4).

**Fixes**

- **A5.1** Scale-level signing: approve only scales whose indicator signs readings (secure element, sealed firmware, Legal Metrology approval) and pair each scale to one agent device. Until those exist, treat readings from ordinary Bluetooth scales as "photo-grade", not "connected".
- **A5.2** Cap manual entry: when more than 20% of an agent's weights in a month are manual, per-kg incentives on those pickups are held and the agent is flagged.
- **A5.3** Lot reconciliation **in both directions**: the sum of door weights compared with the lot sender weight compared with the receiver weight. A lot heavier than its pickups means padding or off-book material; a lot lighter means short-weighing or diversion.
- **A5.4** Plausible weight bands per item (for example 1 mixer = 1.5–4 kg; 1 phone = 80–250 g).
- **A5.5** The department runs **mystery pickups**: 2–4 a month, with staff booking as citizens and handing over known-weight items. This is the most reliable way to catch short-weighing, and it costs almost nothing.

---

### Attack 6 — Seal swapping with a corrupt recycler gate guard

**Playbook**

1. The agent separates the valuable items at the shop (working smartphones, laptops with good boards), keeps them, and fills the lot to the same weight with dead feature phones and appliance scrap.
2. **Seal options:** order look-alike tamper seals with the same printed number (seal printers in Delhi and Mumbai take small orders); or cut and replace the seal, knowing the guard will record "seal intact".
3. The gate guard, paid ₹500 per lot, records seal intact, enters a receiver weight within 5%, and does the **unit scan**. The guard scans IMEI barcodes of the diverted phones **from a photo on his phone screen**, which scanner apps accept, so the recycler scan "matches" the door scan.
4. The diverted phones are sold in the grey market or to repair shops. Some still hold data, because the wipe step was "collector assisted" (§10.2 C4).
5. The passports now say `processed` and `materials_recovered`. The attestation says the recycler processed them, and the producer's end-of-life view (§13.3 P3) counts them.

**Six-month result:** 20 good phones a week at ₹800 is about ₹16k a week, so **₹3–6 lakh for one agent–guard pair**, lost by the recycler, which paid for goods it never got. The state loses no money directly. The bigger risk is a news story: "Phone my family gave to the government programme is on sale in Palika Bazaar with our photos on it." That's a DPDP breach story with the state's name on it.

**What v3 does:** numbered seals and a seal check (§12.2 R4); GPS routes in phase 1b (§20.5); device-count leakage and high-value share tripwires (§18.3). All of these trust the receiving insider. Counts match because the guard fakes them. Mass balance within 5% by weight (§12.2 R6) passes because junk of the same weight went in.

**Verdict: misses.** It surfaces only when a diverted phone is found and traced.

**Gaps:** the seal check and unit scan are done by recycler staff alone (§12.2 R4, §16.4 steps 4–6); seal numbers alone can be copied (§11.2 S4, §20.9 defers stronger seals); scans can be done from screens; nothing checks composition per unit (circuit-board grams per phone) in mass balance; there's no signal when a `processed` IMEI shows up again on a mobile network.

**Fixes**

- **A6.1** High-value items go into a **small per-pickup pouch sealed in front of the citizen**. The pouch seal number is printed on the citizen's receipt and photographed at the door. The recycler opens pouches at a fixed camera station, and the photo of each device must show the physical label.
- **A6.2** **Seals with a secret:** a printed number plus a scratch-off or QR code holding a server-signed random value, checked in the app at receipt, so a copied number fails.
- **A6.3** **Witnessed random lot openings:** 5% of lots, chosen by a seeded public sampler, opened on video in front of an operator field officer or an Environment Audit Rules 2025 auditor, not the gate guard.
- **A6.4** Composition check per unit in mass balance: expected circuit-board and battery grams per claimed phone or laptop. A recycler whose output has far fewer boards than its phone count implies is flagged.
- **A6.5** Ask DoT for a "**processed IMEI seen on network**" alert through CEIR. It would be the strongest diversion signal available anywhere.
- **A6.6** Rotate gate staff between shifts and agents; flag guard–agent pairs with zero variance.

---

### Attack 7 — Paper recycler inflating inflow to back certificates (maker and checker are brothers)

**Playbook**

1. "Green Metals Pvt Ltd" holds a CPCB registration and an MPPCB consent whose capacity (4,000 TPA) was inflated at licensing, as happened in the Newslaundry cases (`18-fake-certificates.md` F2). R1 accepts "state-verified capacity" as it stands (§12.2 R1).
2. The owner's two brothers are EcoSure org users: one is the `operator` (maker), the other the `approver` (checker). §8.6 rule 6 and §19.4 rule 6 require only **two different users**, so this passes.
3. The recycler **appoints its own agents** (§8.3: Recycler A (own agents); §12.2 R2). It enrols 12 micro-tier "agents" (employees, cousins, a driver) using any-of ID (§8.5). Each can do 500 kg/month provisionally, and the recycler can move them to standard tier with no cap.
4. The ghost agents create pickups through assisted booking. The handover codes go to 40 SIMs the recycler holds, or the pickups use the **operator call-back path** (§16.2). The recycler doesn't even need to claim the incentive, so incentive-based checks never see it.
5. Weights are typed in with photos (§20.5). Lots are "delivered" to the recycler's own gate, where **the same company records the receiver weight, the seal check, and the unit scans** (§12.2 R4).
6. Mass balance (§12.2 R6) is self-reported: opening stock + input = output + residue + closing stock. **Closing stock is the balancing figure**, so the 5% test always passes. Output destinations are free text; no GST e-invoice IRN is required.
7. The recycler generates certificates on the CPCB portal and sells them to producers. The producers enter the certificate references in EcoSure, **which marks them "fully backed"** (§13.3 P4). Nothing stops the same attested kilogram being linked to certificates held by several producers; single attribution isn't stated.
8. Evidence packs (§13.3 P5) carry weigh, seal, GPS, and mass-balance evidence with the state's programme name on them.

**Six-month result:** 50 t/month of inflated inflow over 6 months is 300 t. At ₹6–22/kg that's **₹18–66 lakh of certificates with an EcoSure "fully backed" status.** If the same kilograms are linked twice, double that. Producers face environmental compensation on the full quantity if CPCB later finds the certificates false (`18-fake-certificates.md` F1: over ₹355 crore levied on four firms).

**What v3 does**

| v3 control | Why it fails here |
|-----------|--------------------|
| Maker-checker (§12.2 R5) | Two relatives are two different users |
| Capacity from state consent (§12.2 R1) | The consent figure itself is inflated |
| Unit scans (§12.2 R4) | Done by the same recycler |
| Mass balance within 5% (§12.2 R6) | Self-reported; closing stock absorbs any gap |
| Device-count leakage (§18.3) | Agent and recycler are the same interest |
| Unbacked certificate flag (§13.3 P4) | The certificate looks backed, because EcoSure created the backing |
| Digital signature (§12.2 R5) | Proves who signed, not that the material existed |

**Verdict: misses.** Weak signals exist but aren't monitored: most tonnage comes from assisted bookings; citizens are unreachable or never engage; tonnage with zero incentive claims; agents clustered around the recycler's address; all lots delivered by the recycler's own vehicle. Discovery would come from a journalist's ground visit or a CAG audit, 6–18 months in. The headline would be "State's own platform certified ghost e-waste". That is pre-mortem story 4 (§27.1), which v3 rates at 6%. This simulation suggests it's nearer 15–20% once the platform is live and certificates carry an EcoSure status.

**Gaps:** maker-checker has no independence rule (§8.6, §19.4); recyclers approve their own agents without an independent check (§8.3, §12.2 R2); the recycler's receipt is the only evidence for its own agents' inflow (§12.2 R4); mass balance is self-reported with no output invoices (§12.2 R6); provenance has no single-attribution rule and no corroboration test (§13.3 P4); attestations can only be superseded, not revoked (§12.2 R5); there's no physical site re-verification (§12.2 R1).

**Fixes**

- **A7.1** Add an **"independently corroborated kilograms" tier.** A kilogram counts towards "fully backed" only if it has (a) a citizen-confirmed handover from an independent, aged, non-virtual SIM, (b) weight evidence from a party other than the recycler (a scale-signed reading or a third-party weighbridge slip), and (c) trip evidence (AIS-140 vehicle GPS). Everything else shows as "recorded, not corroborated", and provenance must display the split.
- **A7.2** A **single-attribution ledger:** each attested kilogram can back at most one certificate across all producers. Linking beyond the attested quantity opens a flag for the producer and SPCB.
- **A7.3** **Independent checker:** for attestations above a threshold (for example 5 t a month), the checker must be an Environment Audit Rules 2025 auditor or an operator field officer. Related-party declarations are also required for maker and checker, with automatic flags on shared surname, address, bank, or device.
- **A7.4** **Output-anchored mass balance:** output sales must carry GST e-invoice IRNs, and hazardous residue must carry TSDF manifest numbers. Closing stock above 30 days of input is flagged, and physical stock counts happen during site visits.
- **A7.5** **Agent approval needs an operator countersign plus a site photo for micro agents.** Flag a recycler when more than 25% of its EcoSure inflow comes from agents less than 90 days old, or when assisted bookings exceed 40%.
- **A7.6** **Attestation lifecycle:** add `under_review` and `revoked` states, a status banner on the public verify page, and automatic notice to producers who hold affected certificate links (as in `18-fake-certificates.md` C6).
- **A7.7** **Unannounced site verification** before approval and every 6 months: machinery photos, headcount, and a stock count. Seeded, publicly reproducible random sampling decides who is visited.

---

### Attack 8 — Operator insider abusing call-back handover confirmation

**Playbook**

1. §16.2 lets `handed_over` be entered with "valid, unexpired handover code **(or logged operator call-back, capped)**". §17.4 says the incentive trigger is "valid handover code + collector weigh record. **Nothing else.**" The PRD contradicts itself, and the build team will implement the more permissive version so real citizens who lost their code aren't stuck.
2. Suresh, an operator support executive, works with three agents. They create pickups for numbers they control. Suresh logs "call-back done, citizen confirmed" without a real call, or with a 5-second call to a ring number.
3. The operator also holds **"Citizen incentives: F"** (§8.3) and reviews held payouts (§17.4: "held payouts go to operator review"). Maker-checker covers attestations, packs, chargebacks, and reversals (§21.2 item 9), **but not releasing held payouts, call-back confirmations, or payee changes.** So Suresh also releases payouts that attack 1 rings hit caps on.
4. The operator also handles missed-call bookings and call-backs (§10.2 C1), resolves disputes (§11.2 S8), and approves organisations (§8.3). One corrupt team lead can cover a whole ring end to end.

**Six-month result:** 300 fake call-back confirmations a month × 2 devices × ₹50 is about ₹30k a month, or ₹1.8 lakh. Released held payouts add ₹1–3 lakh. **₹2–5 lakh.**

**What v3 does:** the call-back is "logged" and "capped", but neither the cap nor the log's content is defined. Audit logs are append-only (§19.4 rule 1). No tripwire tracks call-back share.

**Verdict: detects late.** A CAG sample audit will find call-backs with no call recording, most likely 9–15 months in, when the first audit cycle covers the scheme. By then it is an audit para naming the department.

**Gaps:** the §16.2 vs §17.4 contradiction; no definition of the call-back evidence or cap; no maker-checker on held-payout release, call-back overrides, or payee changes (§21.2 item 9); operator powers concentrated in one role (§8.3); no department-owned reconciliation separate from the operator.

**Fixes**

- **A8.1** Fix the contradiction: a **call-back never lets staff click-confirm.** The fallback is a system-placed IVR call to the requester's verified number, where the citizen confirms by pressing a key (DTMF). The call ID, duration, and recording are linked automatically. Staff can't enter the confirmation themselves.
- **A8.2** A hard cap of IVR-confirmed handovers at 3% of each agent's pickups and 20 a day per staff member. Incentives on these pickups are paid only after recycler receipt and unit scan.
- **A8.3** Maker-checker for releasing held payouts, overriding caps, changing payees, and resolving disputes above ₹1,000. The checker must be a department (not operator) finance reviewer.
- **A8.4** A **monthly department-run reconciliation** (not the operator's) of payouts against handovers against recycler receipts against call records. Include a random callback by department staff to 2% of paid citizens.
- **A8.5** A new tripwire in §18.3: call-back share of handovers (amber above 2%, red above 5%), and a staff-level view of who confirmed what.

---

## 4. Cross-cutting findings

**F1. Money still leaves before independent evidence arrives.** The incentive is paid 1–4 working days after the code (§17.2). The lot reaches the recycler about 5 days later (§17.3 step 5). Chargebacks "where possible" (§17.4) hit agent settlements, but a ghost or provisional agent simply exits. Every high-risk channel (assisted booking, drop points, provisional agents, IVR call-backs, bulk consumers, drives) should pay after receipt and scan.

**F2. Caps count the wrong thing.** "4 paid pickups per payee account" (§17.4) limits pickups, not devices or rupees. Attacks 1, 3, and 4 all use this.

**F3. "Maker-checker" and "dual weighing" assume the two parties are independent.** At the recycler they often aren't: brothers, a guard and a driver, or a recycler and its own agents. Independence has to come from outside the organisation: citizens, department staff, auditors, telecom data, tax invoices.

**F4. The §18.2 control table is stronger on paper than in the workflows.** Examples: "connected scales with calibration certificates" (§18.2), but the scale doesn't sign (§20.5); "handover code to the requester's phone" (§18.2), but the agent picks the phone (§8.3, §11.2 S7); "incentive trigger: nothing else" (§17.4), but there's a call-back bypass (§16.2).

**F5. There's no active testing.** Every v3 control is passive monitoring. No mystery pickups, canary devices, witnessed openings, or department call-back surveys. These are the cheapest controls with the most value for a government scheme, and CAG looks for them.

**F6. Tripwires aren't tuned to how rings operate.** The concentration tripwire (top 5% above 15% of spend) misses rings that spread across many accounts. Missing tripwires: incentive burn rate, call-back share, assisted-booking share, zero-engagement citizens, manual-weight share, and new-agent share of recycler inflow.

---

## 5. CAG and journalist exposure

| Rank | Story | Attack | Likelihood within 12 months | Damage |
|------|-------|--------|-----------------------------|--------|
| 1 | "Government platform certified ghost e-waste; producers bought backed certificates" | 7 | Medium | Programme-ending. NGT interest likely, given the continuing e-waste monitoring (`18-fake-certificates.md` F2, F6) |
| 2 | "Phones given to government scheme resold with personal data" | 6 (and 2) | Medium | DPDP breach, Data Protection Board notice, loss of citizen trust in the wipe promise (§10.2 C4) |
| 3 | CAG: "Incentives paid without beneficiary verification; operator confirmed handovers without calls; payments to related accounts; out-of-state material with no additionality" | 1, 3, 8 | High, once CAG covers the scheme | Audit paras, recoveries, questions in the Assembly, delays to the phase 2 budget |
| 4 | "Collectors cheat elderly citizens on scrap price" | 2, 5 | Medium to high | Local press, kabadiwala groups amplify it (§18.3 grievance tripwire) |
| 5 | "Indore pays for Delhi's junk" | 3 | Low to medium | KPI credibility, national rollout story weakened |

CAG will specifically look for: documented beneficiary verification; independence of the agency confirming the benefit from the agency paying it; maker-checker on releases and overrides; department-owned (not contractor) reconciliation; basis for KPIs and additionality; and whether red flags were acted on. v3 is weakest on independence and on acting on flags.

---

## 6. PRD changes, by leverage

| Priority | Change | PRD sections | Attacks closed |
|----------|--------|--------------|----------------|
| **1** | **Independently corroborated kilograms tier plus single-attribution ledger** for provenance and evidence packs. GST IRN-anchored mass balance. An independent checker (auditor or operator) above a threshold. Related-party declarations. `under_review` and `revoked` attestation states | §12.2 R5, R6; §13.3 P4, P5; §8.6; §19.4 | 7 (and weakens 6) |
| **2** | **Move the money gate and cap the right thing.** Pay after recycler receipt and 100% scan of incentivised units for all high-risk channels. Rupee and device ceilings per payee, address, and agent. No per-device incentive for bulk consumers. Citizen-initiated confirmation before any code is released on assisted and drop-point pickups. Luhn/TAC checks and camera-scan-only for money. Remove the click-to-confirm call-back (IVR DTMF only) and fix the §16.2/§17.4 contradiction | §8.3; §9.5 PP2–PP4; §10.2 C6, C7, C9, C10; §11.2 S7; §16.2; §17.4 | 1, 3, 4, 8 |
| **3** | **Department-run active assurance.** Monthly mystery pickups; canary devices with known IMEIs planted in lots; seeded random witnessed lot openings (5%); a 2–10% department call-back and price survey; a CEIR "processed IMEI seen on network" request to DoT; unannounced recycler site visits every 6 months | §14.3; §18.2; §18.3; §20.7; §12.2 R1 | 2, 5, 6, and a check on all the others |
| 4 | Two-step handover: price confirmed on the citizen's phone before the code is valid; UTR capture; citizen confirmation of `refused_item` | §10.2 C6, C7; §16.3 | 2 |
| 5 | Scale-signed readings, a cap on manual entry, two-way lot-vs-pickup reconciliation, weight bands | §20.5; §16.4; §19.3 | 5 |
| 6 | Per-pickup pouch seals for high-value items, seals with a secret value, a camera station for opening, composition checks per unit, gate staff rotation | §11.2 S4; §12.2 R4, R6; §20.9 | 6 |
| 7 | Maker-checker with a department reviewer for held-payout release, cap overrides, payee changes, and large disputes. A department-owned monthly reconciliation | §8.3; §17.4; §21.2 item 9 | 8, 1 |
| 8 | New tripwires: incentive burn rate, call-back share, assisted-booking share, manual-weight share, zero-engagement citizens, new-agent share of recycler inflow, TAC anomalies | §18.3 | All (earlier detection) |

**Cost note:** changes 1–3 are mostly rules and process: fields, flags, a sampler, and a few hours of department staff time each month. The biggest new costs are auditor fees for independent checking (about ₹5–10 lakh a year, **estimate**) and scale-signing hardware (phase 1b). Both are small next to the ₹20–70 lakh of certificate exposure in attack 7.

---

## 7. Score

**5.5 / 10** for real-life fraud resistance of v3 as written.

**For v3:**

- It has an answer to the v2 red team's biggest finding (the shop alone decided whether the incentive was paid).
- "A device earns once", seals, unit scans, maker-checker, mass balance, and provenance cover the lazy and opportunistic frauds that make up most attempts.
- The two-rail design keeps public money out of the collector's hands. The operator holds no float.
- The disclaimer and verify-by-number still defeat simple forgery.

**Against v3:**

- The incentive trigger can be satisfied entirely by ring-controlled phones, agent-typed numbers, or an operator click.
- Caps count pickups, not devices or rupees, so imported junk and fabricated IMEIs drain the whole 6-month pot.
- Recycler-side evidence (receipt, seal check, scans, mass balance, maker-checker) is produced by one interested party. The provenance badge can therefore launder paper recycling, which is the scenario v3 itself calls fatal.
- There's no active testing, no department-owned reconciliation, and no revoke path.

**With the fixes:** priorities 1–3 raise the score to about 7.5. Adding 4–8 brings it to about 8–8.5. Collusion between a real citizen and an agent over real material can't be fully stopped. It can only be priced out with household ceilings and tiered incentives.
