# 05 — Drive-day simulation: society, college, government office

**Simulator:** v3 real-life simulation, drives  
**Scope:** EcoSure v3 PRD ([`../../prd/v3-PRD.md`](../../prd/v3-PRD.md)) — mainly §10.2 C6, C7, C9, C10; §11.2 S3; §16; §17.4; §18.3; §19; §21.3. Builds on [`../v2-deep/21-society-bulk-drives.md`](../v2-deep/21-society-bulk-drives.md).  
**Date:** 2026-09-27  
**Method:** Read the full v3 PRD and the v2 drives review. Ran three drive days minute by minute using the PRD's rules exactly as written, then did throughput maths. Web search for real Indian drive outcomes and government disposal rules. Anything not traced to a primary source is marked **UNVERIFIED**. All service times are simulator estimates, not measurements.

---

## 1. Headline

**Score: 4.5 / 10 for how well v3 drives work in real life.**

v3 fixed the right things on paper: a drive exists as a thing, there is a 150 kg threshold, residents can pool incentives, and government offices get a separate mode. But the drive is still run as *80 doorstep pickups at one table*. Each resident still needs their own handover code, their own weigh record, their own on-the-spot material payment, their own wipe confirmation, and their own incentive. With one agent at one desk, that caps a morning at about 35–40 residents. Pooling collides with the fraud caps. Swollen batteries are "refused" with nowhere to go. And the government-office mode records auction references but does not help the office do the thing it actually has to do (condemn, list, auction, destroy hard disks, split out batteries), so offices will not use it.

| Drive | Works as written? | Score |
|-------|-------------------|-------|
| Society, 200 flats (Sunita) | Partly. Runs, but queue collapses above ~40 residents and pooling breaks | 5 / 10 |
| Engineering college with hostels | Poorly. Lunch-hour spike, dead phones, under-18 students, student items mixed with college assets | 4 / 10 |
| District government office (old computers) | Barely. EcoSure is a spectator to a months-long GFR-style auction | 3 / 10 |

---

## 2. What real drives look like (evidence)

| # | Source | What it says | Status |
|---|--------|--------------|--------|
| E1 | v2-deep report 21 (S1, S2) — Bengaluru BAF + Saahas: 1,533 kg from 30 complexes / 6,000 flats | ~51 kg per complex, ~0.26 kg per flat | Press + operator report |
| E2 | Report 21 (S15) — Rajasthan, 38.5 t from 150+ complexes, with cash | ≤ ~257 kg per complex | Brand PR |
| E3 | [Free Press Journal, Jan 2025](https://www.freepressjournal.in/mumbai/navi-mumbai-kharghar-taloja-residents-recycle-28-kgs-of-e-waste-generate-funds-for-animal-care) — Kharghar–Taloja welfare association, 9-day drive | **28 kg**, about ₹6,000 raised, money went to animal care (i.e. pooled, not per resident) | Secondary (press) |
| E4 | [Stumpblog / Mumbai](https://stumpblog.com/dont-dump-gadgets-recycle-them-40-mumbai-societies-show-to-do-it-collect-700kg-of-e-waste/) — 40 societies + 2 colleges over 2 weeks | 700 kg total, **~17 kg per site**; bins left outside societies | Secondary, **UNVERIFIED** |
| E5 | [Green Ecosystem guide](https://greenecosystem.in/how-to-organize-a-successful-recycle-collection-drive-at-your-cooperative-housing-society/) — Royal Galaxy CHS, Gandhi Jayanti week | 200 kg of *all* recyclables; money used for the society garden | Blog, **UNVERIFIED** |
| E6 | [ScrapRates.in](https://scraprates.in/blog/scrap-collection-housing-societies-guide) — society scrap economics | E-waste ~10 kg per quarter per 100-flat society at ~₹25/kg; societies pool scrap money for maintenance | Blog, **UNVERIFIED** |
| E7 | [SITAM college, Hans India](https://www.thehansindia.com/andhra-pradesh/sitam-holds-awareness-workshop-on-e-waste-964426) | ~1 t incl. CPUs, ACs, washing machines, monitors (institutional + household mix) | Secondary |
| E8 | [SMVITM NSS unit](https://sode-edu.in/smvitm/news-2/news/nss-yrc-unit-conducts-annual-e-waste-collection-drive-crosses-500-kg-milestone/) | 500 kg over **two** annual drives | Primary (college) |
| E9 | [K K Wagh, Nashik — E-Yantran 2025](https://www.linkedin.com/posts/kkwieercomputerengg_eyantran2025-csikkwieer-sustainability-activity-7293960053789773824-4vr0) | 45+ student volunteers ran the drive | Self-reported |
| E10 | [GFR 2017 Rule 217](https://constitutionofindia.in/rule-217-of-the-general-financial-rules-2017-disposal-of-goods/) | Committee declares items unserviceable; book value and reserve price; report in **Form GFR-10**; e-waste bidders must hold recycler registration valid on auction **and** delivery dates | Mirror of GFR text |
| E11 | [CAG DG Audit Kolkata GeM forward auction](https://cag.gov.in/uploads/tenders/tenders-E-waste-Bid-Document-0666993492314c5-31656925.pdf) | Registered recyclers only; "as is where is"; winner certifies recycling **within 45 days**; batteries sold under battery rules | Primary (tender) |
| E12 | [CSIR disposal note, 2026](https://www.csir.res.in/sites/default/files/2026-05/disposal_exercise-need_for_a_mma.pdf) | GFR Rules 217–223; forward auction / tender / GeM; low-value lots below ~₹4 lakh left to competent authority (CSIR practice) | Primary (CSIR), threshold **UNVERIFIED** for MP |
| E13 | [DoT IT condemnation guidelines 2014](https://kvspgtcs.org/wp-content/uploads/2020/04/Condemnation-IT-DoT.pdf), endorsed by [MeitY DO 18.10.2022](https://irdai.gov.in/documents/37343/991022/DO+Letter+from+MeitY.pdf/71226add-1dc3-18bf-3cfb-3a41b8ad1267?download=true&t=1668592125002&version=1.0) | Condemnation note per item; committee with IT + finance member; competent-authority approval; remove all data after backup; remove inventory labels; committees meet twice a year | Primary |
| E14 | [Govt guidelines for IT devices](https://cdnbbsr.s3waas.gov.in/s35352696a9ca3397beb79f116f3a33991/uploads/2020/09/2020091825.pdf) | Hard disks retained by the organisation even if faulty and **destroyed** before disposal | Primary (state portal copy) |
| E15 | MP condemnation practice — search results point to **M.P. Bhandar Kray Niyam** and MPPCB authorised list | MP state offices likely follow state store rules, not GFR directly | **UNVERIFIED** — needs MP Finance Department confirmation |
| E16 | [Ambrane (India)](https://ambraneindia.com/blogs/ambraneindia/how-to-dispose-of-a-power-bank-safely), [iFixit](https://www.ifixit.com/Wiki/What_to_do_with_a_swollen_battery), [US EPA](https://www.epa.gov/recycle/frequent-questions-lithium-ion-batteries) | Swollen lithium: do not press or charge; isolate in a metal container with sand; tape terminals; take to an authorised battery handler | Secondary / regulator (US) |

**What this tells us:** a real society drive gives **20–250 kg**, most societies pool the money for a common cause, and colleges only reach 500 kg–1 t when the institution's own old equipment is included. Government offices never "hand over"; they condemn and auction.

---

## 3. Simulation rules taken from the PRD

These are the rules the simulated agent had to follow, quoted or paraphrased from v3:

1. Drive confirmed when **expected volume ≥ 150 kg** or operator override (§10.2 C9; OQ-77).
2. Residents register **by WhatsApp link or at the desk**; **batch weighing**; **each resident still gets a receipt, code, and incentive**; residents can pool incentives (C9).
3. Material price paid **on the spot** by UPI or cash, receipt naming recycler and agent (C7).
4. **4-digit handover code** given only after weighing and payment; collector enters it, 5 attempts (C6, S3). One code per pickup request (§19.2).
5. Battery check per item; **swollen or damaged refused with a referral message** (C6, S3; §19.3 BatteryCheck).
6. No data-bearing item collected **without a wipe confirmation** (C4).
7. IMEI/serial scan where possible (PP3).
8. Incentive trigger: **valid handover code + collector weigh record** (§17.4).
9. Caps: **4 paid pickups per payee account per month**, per-address limits, device once (C7, §17.4); concentration tripwire if top 5% of payee accounts exceed 15% of spend (§18.3).
10. Users must be **18+** (§21.3).
11. Micro-tier agents operate **up to 500 kg a month** (§8.5).
12. Support SLA: **1 working day** for queries (§21.4); handover fallback is a logged operator call-back (§16.2).

---

## 4. Drive 1 — Sunita's society, Vijay Nagar (200 flats), Sunday

### 4.1 Setup (two weeks before)

| When | What happens | PRD friction |
|------|--------------|--------------|
| T−14 days | Sunita asks for a drive through WhatsApp. The flow asks for "expected volume". She has no idea; she types "200 kg" because it sounds right. | C9 relies on host-entered expected volume. Nobody knows kg. |
| T−13 | Committee meeting. Treasurer: "Pool everything to the society fund, like our paper-raddi money." Two members: "People should get their own money or nobody will come." No decision. | C9 says *residents* can pool; it does not say who sets the default or how a committee decision is recorded. |
| T−12 | Sunita forwards the WhatsApp registration link to the society group (180 members). | — |
| T−7 | 22 registrations. Categories and counts only. The system's typical-weight table converts this to **~74 kg**. | Registration-based estimate is well below the 150 kg threshold. |
| T−3 | 38 registrations, ~118 kg estimated. One resident lists "old fridge". Operator overrides the threshold because the fridge alone is ~45 kg. | No rule for when to override, merge with a neighbouring drive, or cancel. No T−24h check. |
| T−2 | Society rules: vehicles over a certain size need committee approval; the guard needs a gate pass with vehicle number. Not issued yet. | Sunita's persona (§7.2) lists "gate pass" as a need, but C9 does not include it. |
| T−1 | Handover codes sent by SMS to the 38 registrants with a reminder. | Codes go out a day early and get buried in SMS inboxes. |

### 4.2 Drive day, minute by minute

Team as the PRD implies: **one agent** (a micro-tier shop owner, Ramesh) plus his helper, one Tata Ace–class small goods vehicle.

| Time | Event |
|------|-------|
| 08:30 | Vehicle arrives. Guard has no gate pass. Calls Sunita, who is asleep. |
| 08:48 | Entry allowed. Desk set up by the clubhouse under a borrowed shamiana. |
| 09:00 | Ramesh has one phone with the app, one 150 kg platform scale (50 g resolution), his own UPI. He has ₹3,000 cash for small payouts. |
| 09:05 | First resident: two chargers and a remote. Weighs 0.3 kg — the platform scale reads 0.30 or 0.35. Price ₹7. Pays by UPI. Resident reads out code. 1 min 40 s. |
| 09:10–09:30 | Slow trickle: 6 residents. Average 2.5 min each. |
| 09:32 | First walk-up (not registered). Needs sign-in by OTP, consent notice, categories. OTP SMS takes 40 s. 4 min total. |
| 09:45 | Resident with two old phones. Has not wiped them. C4 blocks collection. Ramesh walks her through a factory reset on one; the second phone does not power on. There is no "dead device, cannot wipe" option. She takes the dead phone home. **9 min.** |
| 09:55 | Queue is now 7 people. Walk-ups arriving as neighbours see the desk. |
| 10:00–11:00 | **Peak.** 31 households arrive in this hour. Ramesh clears 13. Queue peaks at **19 people**, waits of 25–35 minutes. |
| 10:12 | **Swollen power bank.** Mrs Kapoor hands over a power bank with a visibly bulging case. PRD says refuse with referral message. Ramesh refuses. She says "I am not taking it back into my flat" and puts it on the table. The helper moves it to the corner. It sits in the sun on a plastic chair among cardboard boxes. No sand bucket, no metal tin, no instructions in the app. |
| 10:20 | Three residents in the queue leave ("will come back") — they do not. |
| 10:31 | Resident cannot find his code (SMS from yesterday lost among bank OTPs). Fallback is an operator call-back (§16.2). It is Sunday; operator support is 1 working day (§21.4). Ramesh takes the items and says "incentive will come" — no code, so **no incentive** under §17.4. |
| 10:40 | Two more residents with missing codes. Ramesh starts asking them to "resend". The system has no resend-at-desk function described. |
| 10:55 | Ramesh's cash is gone; five residents with ₹5–₹15 of cables don't have UPI on hand ("my son has it"). They say "keep it". The receipt still has to show a price. |
| 11:10 | Fridge brought down by the owner's domestic help and a watchman. Weighed on the platform: 47 kg. Resident wants ₹400; rate card gives about ₹280. Argument for 6 minutes. |
| 11:30 | **Committee dispute.** Treasurer asks Ramesh to pay all incentives into the society account. Ramesh says residents choose. Treasurer tells people in the queue to "tick pooled". Some do, some don't. One resident: "I want my ₹50, not a donation to your garden." |
| 11:45 | Sunita asks Ramesh for a list of which flats participated so she can thank them in the group. He cannot share it (§8.4: citizens cannot see others' pickups; there is no host role). |
| 12:00 | Desk closes by agreement. 6 people still in queue; Ramesh serves them by 12:25. |
| 12:30 | Loading. Material goes into sacks, sealed with one numbered tag. The power bank is still on the chair. Ramesh leaves it; the watchman later throws it in the dry-waste bin. |
| 13:00 | Vehicle leaves. |

### 4.3 Outcome

| Measure | Result |
|---------|--------|
| Registered | 38 |
| Registered who showed | 27 (71%) |
| Walk-ups | 26 |
| Households served | **49** (4 left the queue, 1 refused wipe item) |
| Weight | **~138 kg** (fridge 47 kg, one CRT TV 21 kg, rest small) |
| Residents with a valid code (incentive-eligible) | 43 of 49 |
| Residents who pooled | 18 |
| Time per household (mean) | ~4.6 min |
| Swollen battery | Left on site, ended in municipal dry waste |

**Would the pooling have worked?** No. If the society's bank account is the payee for 18 pooled incentives, the **4 paid pickups per payee account per month** cap (C7, §17.4) holds 14 of them, and the society account instantly trips the **incentive concentration** tripwire (§18.3). The operator sees a "fraud" flag on Monday.

---

## 5. Can 80 residents each get a code and incentive in one morning?

### 5.1 Service time per household (simulator estimates)

| Step (per household, PRD as written) | Time |
|--------------------------------------|------|
| Find registration or sign in walk-up (OTP, consent) | 0.5 min registered / 2.5 min walk-up |
| Battery check per item | 0.2 min per item |
| Wipe confirmation per data-bearing item (already wiped) | 0.5 min |
| Wipe help if not wiped | 5–8 min (or walk away) |
| IMEI/serial scan per phone or laptop | 0.5 min |
| Weigh (small items on a platform scale) | 0.5 min |
| Pay material price (UPI or cash, record it) | 1.0 min |
| Enter handover code (or chase a missing one) | 0.3 min / 3+ min |
| **Typical household, registered, one phone wiped + cables** | **~3.5 min** |
| **Weighted average for a mixed society queue** (40% small items only, 35% wiped phone, 15% unwiped phone, 10% large appliance; half walk-ups) | **~4.5–5 min** |

### 5.2 Throughput

| Setup | Capacity per hour | 80 households need | Fits in 09:00–12:30? |
|-------|------------------|--------------------|----------------------|
| 1 desk, PRD as written | ~12–13 | ~6.5 hours | **No** — serves ~40–45 |
| 2 desks, PRD as written | ~25 | ~3.3 hours | On average yes, but **not at peak** |
| 3 desks, PRD as written | ~38 | ~2.2 hours | Yes |
| 1 desk, fast lane (see §9 fix 1) | ~30 | ~2.7 hours | Yes, with some queue |
| 2 desks, fast lane | ~60 | ~1.4 hours | Yes, comfortably |

**Peak problem:** arrivals are not even. In the simulation about 45% arrive in one hour (10:00–11:00). For 80 households that is **~36 arrivals per hour**. Two desks at 25/hour build a queue of ~11 an hour, with waits over 25 minutes. People leave after 10–15 minutes (**UNVERIFIED**, simulator judgement from Indian queue behaviour). So:

> **Answer:** 80 residents can each get a code and incentive in one morning **only with three desks** (three phones with the app, three scales or one shared platform + two bench scales, three payers of material price), **or** with a fast lane that drops per-resident material payment and per-resident weighing. With the PRD's implied one-agent team, the realistic ceiling is **35–45 households**.

### 5.3 Team size and vehicle

| Drive size | Team (PRD as written) | Team (fast lane) | Vehicle |
|------------|----------------------|------------------|---------|
| Society, 40–80 households, 100–250 kg | 3 desk operators + 1 loader/sealer + 1 battery/queue marshal = **5** | 1 desk operator + 1 host volunteer at registration + 1 loader = **3** | One small goods vehicle (Tata Ace class, ~750 kg payload, **UNVERIFIED** exact figure). Weight never binds; **volume** binds if 2+ fridges/washing machines come |
| College, 100–150 students + institutional lot 500–900 kg | **6–7** | **4** + student volunteers | Weight fits one small vehicle; volume of CPUs/monitors usually needs **two trips or a 14-ft truck** |
| Government office, 60 PCs + printers + UPS, ~1.1 t | N/A (lifted by the auction winner) | N/A | Winner's truck; batteries on a separate vehicle or separate secured section |

The PRD never states team size, desk count, scales, or vehicle class for drives. Budget §26 has no line for drive crews.

---

## 6. Drive 2 — Engineering college in Indore with hostels, weekday

Assume a private engineering college, ~2,400 students, ~900 in hostels. The NSS coordinator (a faculty member) is the host.

### 6.1 Setup

| When | What happens | PRD friction |
|------|--------------|--------------|
| T−10 | NSS coordinator requests a drive. Registrar adds: "Also take the old lab computers — 40 CPUs, 30 monitors, 6 printers." | C9 treats the drive as one thing. Student personal items (consumer) and college assets (Rule 8 bulk consumer, needs a receipt naming the recycler) are **two legal regimes in one drive**. |
| T−9 | Link goes into class WhatsApp groups. | — |
| T−5 | 164 registrations. 23 fail at sign-up: first-year students aged 17 (§21.3 requires 18+; "minors hand over through a parent's account" — parents are in Bhopal, Jabalpur, Patna). | Under-18 rule blocks a real chunk of first-years. |
| T−4 | Hostel students all list the **same address** (hostel block). | Per-address limits (C7) will hold incentives after the first few. |
| T−3 | Chief warden: outside collectors cannot enter girls' hostel; desk must be at the main academic block. | Gate/entry rules for institutions not modelled. |
| T−1 | 45 NSS volunteers offer to run registration and sorting. | PRD has no volunteer or host-helper role (§8.2, §8.3). Volunteers cannot legally handle items as agents, but they can guide the queue. |

### 6.2 Drive day

| Time | Event |
|------|-------|
| 09:30 | Agent team (2 people) arrives. Desk in the academic block foyer. |
| 09:30–12:45 | Classes running. 22 students trickle in. |
| 11:15 | Registrar's staff wheel out lab equipment on trolleys: 40 CPUs, 30 monitors (mix of CRT and LCD), 6 printers, 4 UPS units with lead-acid batteries. Agent starts weighing — 76 items on a platform scale, ~40 min of work. **Student desk is unmanned meanwhile.** |
| 11:40 | UPS batteries: sealed lead-acid. These are batteries, not "embedded in a device travelling with it" in any real sense. Agent unsure; app has no path. He leaves them with the college. |
| 12:30 | Registrar asks for "the certificate for our Rule 8 records". Agent can give a receipt naming the recycler (C10). Registrar also wants hard disks removed first — the IT head insists disks are **retained and destroyed** in-house (institutional policy, like E14). CPUs go without disks; the disks stay in a cupboard with no disposal route. |
| 12:45–14:00 | **Lunch spike.** ~70 students arrive in 75 minutes (**~56/hour**). Two-person team, one desk, ~4 min each. Queue reaches **40+**. Students leave for 14:00 lab sessions. |
| 13:05 | Broken phones: roughly a third of student phones have cracked screens or do not power on (**UNVERIFIED** share). C4 blocks collection without a wipe confirmation. Volunteers improvise "I confirm" taps on behalf of students — this makes the wipe confirmation meaningless. |
| 13:20 | Student with a **swollen laptop battery** (lid won't close). Refused. He puts it back in his hostel room. |
| 13:40 | Students ask: "Why is my incentive ₹0?" — the per-address limit on the hostel address has kicked in after the first few paid pickups. |
| 14:00 | Queue drops to zero as labs start. 31 students left without handing over. |
| 15:30 | Loading. CPUs and monitors fill the small goods vehicle by volume; second trip needed. The agent is a micro-tier shop: this drive (~780 kg) **exceeds his 500 kg/month cap** (§8.5). The app blocks collection of the last ~280 kg, or the operator overrides after a phone call. |
| 17:30 | Second trip done. Agent has paid ~₹2,600 to students on the spot plus the college's material value (he cannot pay a private college ~₹20,000 for lab scrap from his own float; the college's accounts office wants a bank transfer against an invoice). |

### 6.3 Outcome

| Measure | Result |
|---------|--------|
| Students served | **~61** of 164 registered + walk-ups (37%) |
| Student items weight | ~45 kg (chargers, earphones, cables, phones, a few laptops) |
| Institutional lot | ~735 kg (CPUs without disks, monitors, printers); UPS batteries left behind |
| Incentives held by per-address limit | ~40% of eligible students (**simulated**) |
| Legal clarity | Low — one drive record mixing consumer and bulk-consumer material; receipt covers the college but not in its asset-disposal format |

**Lesson:** the college drive's tonnage is the institution's own equipment, which is a Rule 8 bulk-consumer disposal with a payment *to* the college, not a resident incentive event. The student part is small, spiky, and blocked by the 18+ rule, the per-address cap, and dead phones.

---

## 7. Drive 3 — District government office disposing of old computers

Assume a state government district office in Indore (e.g. a Collectorate branch). ~60 old desktops, 12 printers, 15 UPS units, some CRT monitors. It is the October **Special Campaign** window, when offices are pushed to clear scrap and report space freed (report 21, S23–S24).

### 7.1 What the office must actually do (evidence E10–E15)

1. User sections write **condemnation notes** per item (E13).
2. A **condemnation committee** (with an IT and a finance member) declares items unserviceable and records reasons (E10, E13).
3. Work out **book value / reserve price**; prepare a **GFR-10-style report** (E10). For a state office, the equivalent under MP's store and financial rules — **UNVERIFIED** (E15).
4. **Competent authority approval** (E13).
5. **Back up and remove all data**; the office's own policy often says **retain and destroy hard disks** (E13, E14).
6. **Sell by forward auction** (GeM or MSTC) to bidders holding recycler registration valid on the auction and delivery dates (E10, E11). Low-value lots may use a simpler mode decided by the competent authority (E12, threshold **UNVERIFIED** for MP).
7. Winner pays, lifts "as is where is", and gives a **recycling certificate within ~45 days** (E11).
8. **Batteries** go as a separate lot under battery rules (E11).

### 7.2 Simulated timeline

| Day | Event | EcoSure's role under v3 (C10, §20.7) |
|-----|-------|---------------------------------------|
| Day 0 (1 Oct) | Office superintendent hears of EcoSure at an IMC meeting; asks for a "drive" on 10 Oct. | Operator explains: government offices get "assisted mode recording GeM or MSTC references". Superintendent: "So you won't take it?" |
| Day 2 | Accounts officer: "We cannot give government property free or accept an incentive. It must be auctioned." | Correct — EcoSure has nothing to offer here beyond references. |
| Day 5 | IT assistant starts condemnation notes. The asset register has serial numbers for only 38 of 60 CPUs. | EcoSure passports could help (serial scan → list), but C10 does not offer a lot-list builder. |
| Day 12 | Committee meets. Finance member wants reserve price; nobody knows e-waste rates. | EcoSure has recycler rate cards (R3) but they are private to recyclers; no benchmark is offered to government offices. |
| Day 15 | IT head: hard disks must be removed and destroyed. 60 disks pulled. No degausser or shredder. Disks go into a steel cupboard. | Gap: no route for witnessed on-site disk destruction by a recycler with a certificate. The disks become a second orphan e-waste pile. |
| Day 18 | Competent authority approves. | — |
| Day 21 | UPS units: finance member asks whether batteries go with the e-waste lot. Nobody knows. They are split into a separate lot after an argument; the battery lot sits unsold. | Gap: no battery-lot guidance for offices. |
| Day 26 | Lot listed on MSTC (office already has an MSTC account from vehicle auctions) — about ₹60,000 reserve. | EcoSure can record the listing reference. |
| Day 31 (end of campaign) | Office reports the items as "disposal initiated" in the campaign report. Auction scheduled for Day 40. | — |
| Day 40 | Auction. H1 bidder: a registered recycler from another state (not on EcoSure). EcoSure-participating Indore recycler bids lower. | EcoSure cannot require bidders to be EcoSure participants — that would restrict competition in a public auction (**UNVERIFIED** legally, but high risk). |
| Day 55 | Winner lifts the lot. No EcoSure seal, no weigh record, no custody chain. | Chain breaks. Only an auction reference exists. |
| Day 100 | Winner's recycling certificate arrives (on letterhead). | EcoSure can upload it; it is not an attestation. |

**Outcome:** EcoSure adds almost nothing. The office's legal path is fixed, slow (≈ 2–4 months, **simulated**), and competitive. The "drive" concept does not apply, the threshold does not apply, incentives cannot apply, and a custody chain only exists if the winning bidder happens to be an EcoSure recycler.

**Where EcoSure *could* add value** (not in v3): a lot-list builder from serial scans (condemnation notes + GFR-10 fields), a public reference-rate benchmark by category from aggregated recycler rate cards, a witnessed hard-disk destruction service by participating recyclers with a certificate, a battery-lot checklist, and a voluntary "attested disposal" badge if the winning recycler records the lift on EcoSure.

---

## 8. Failure points (all three days)

| # | Failure | Drive(s) | Root cause in PRD | Severity |
|---|---------|----------|-------------------|----------|
| F1 | Queue collapses above ~40 households with one desk | Society, college | C9 keeps per-resident code, weigh record, payment, wipe, scan; no staffing rule | **High** |
| F2 | Batch weighing contradicts per-resident weigh record and per-kg price | All consumer drives | C9 "batch weighing" vs §17.4 "incentive needs collector weigh record" and C7 per-kg price on the spot | **High** |
| F3 | Pooled incentives hit per-account cap and fraud tripwire | Society | C7 / §17.4 caps and §18.3 concentration tripwire do not exempt a host pool | **High** |
| F4 | Swollen batteries refused with nowhere to go; end up in municipal waste or back in homes | Society, college | C6, S3 "refuse with referral"; §2.3 out of scope; no quarantine kit | **High** (fire and reputational) |
| F5 | Missing handover codes on a Sunday with no operator | Society | §16.2 fallback is operator call-back; §21.4 SLA 1 working day; codes sent the day before | Medium-High |
| F6 | Threshold based on a guess; no T−24h check or merge rule | Society | C9 uses host "expected volume"; OQ-77 only sets the number | Medium |
| F7 | Dead phones cannot be collected (no wipe possible) | Society, college | C4 requires a wipe confirmation; no "cannot power on — recycler destroys" path | Medium-High |
| F8 | Micro-tier agent cap (500 kg/month) breaks on one institutional drive | College | §8.5 | Medium |
| F9 | Agent float cannot cover on-spot payments for institutional lots | College | C7 / §17.2 rail A assumes agent pays first | Medium |
| F10 | Under-18 students and shared hostel address block incentives | College | §21.3 18+; C7 per-address limits | Medium |
| F11 | Consumer items and institutional assets mixed in one drive record | College | C9 and C10 not linked; no per-lot legal type | Medium |
| F12 | No host role — secretary cannot see participation, set pooling default, or get a list | Society, college | §8.2–8.4 merge host into `bulk_consumer`/citizen | Medium |
| F13 | Government office path not supported beyond references | Gov office | C10, §20.7 | **High** for that segment |
| F14 | Hard disks and UPS batteries orphaned | College, gov office | No disk-destruction or battery-lot flow | Medium |
| F15 | Sunita is labelled a bulk consumer; most RWAs are not under Rule 8 | Society | §7.2 persona label vs §10 C10 | Low (confusing paperwork) |
| F16 | No drive workflow, state machine, or KPIs | All | §16 and §24 have none; `CollectionDrive` named in §19.1 with no fields in §19.3 | Medium |

---

## 9. Fixes (ordered by leverage)

### Fix 1 — Drive fast lane (replaces per-resident doorstep mechanics at drives)

- **One drive-level handover**, signed by two parties: agent and host (secretary, NSS coordinator). This meets principle 4 (two-party evidence, §6.3) at drive level.
- **Resident token instead of a per-resident SMS code.** Registration issues a QR/short token shown on the resident's WhatsApp; walk-ups get a printed token from a roll at the desk and add their phone number later if they want an incentive. Keep the SMS code only for doorstep pickups.
- **Per-resident lines by category and count**, not weight. Incentives at drives are per item (the PRD already allows "flat per data-bearing device", OQ-70). **Weight is recorded per category bin for the whole drive**, which is what batch weighing really means. Change §17.4 to accept "drive weigh record + resident line" as the trigger.
- **Material value paid once per drive** to the host (or donated), not per resident. Residents who want their own material price can ask; default is pooled material value, individual incentive.
- **Wipe confirmation moves to registration** (a WhatsApp checklist), plus a **"device dead — recycler destroys data"** option that routes the item to a sealed data-bearing bag with 100% unit scan at the recycler (PP4 already requires this under 200 units).
- Effect: service time drops from ~4.5–5 min to **~1.5–2 min**; one desk handles ~30 households an hour.

### Fix 2 — Make pooling a real payout type, decided before the link goes out

- Host sets the **pooling default** by recording a committee decision (upload minutes or a two-member approval, like maker-checker, §8.2) *before* the registration link is live. Each resident still sees and can change their choice at registration.
- Pooled incentives go to a **drive-level host payee** (society/institution bank account, validated), **exempt from the 4-per-account cap and the concentration tripwire**, but with its own per-drive cap (e.g. registered residents × per-item amount, capped by drive weight).
- Host gets a **drive statement**: households, items by category, kg, amount pooled, attestation number when processed — the thing Sunita shows at the AGM. Host sees counts, not names, unless residents opt in to be listed.
- Add a **host role** (`drive_host`) to §8.2–8.4 with these rights, and a **host volunteer** role that can run the registration queue but not handle money or seals.

### Fix 3 — Route by host type, and give each its own flow

| Host type | Flow | What changes |
|-----------|------|--------------|
| RWA / society | Consumer drive (Fix 1 + Fix 2) | Remove "bulk consumer" label from Sunita's persona unless the RWA crosses Rule 8 |
| Private college / office / hospital | **Split drive**: consumer lane for students/staff + **institutional lot** as a Rule 8 bulk disposal: receipt naming recycler, payment to the institution by the recycler (rail A, bank transfer against invoice), asset-list export | Institutional lots go through a **recycler-direct crew**, not a micro-tier agent (fixes the 500 kg cap and float problem) |
| Government office | **GFR/state-rule assist track**, never a drive day | Lot-list builder from serial scans with GFR-10 fields; reference-rate benchmark from aggregated recycler rates; checklist for condemnation note, committee, approval; **witnessed hard-disk destruction certificate** by a participating recycler; **battery lot checklist**; auction reference capture; optional attested lift if the winner records it. Confirm MP rules with the Finance Department (Stage −1) |
| Under-18 students | Consumer lane through a **host-custodian** (the college) rather than a parent account | Incentive pooled to the NSS unit or a campus cause by default for minors |

### Other fixes

- **Battery quarantine kit at every drive**: metal bin with dry sand, terminal tape, a "damaged battery" bag, a separate numbered seal, and a same-day handover to the principal recycler *if* it holds battery-waste registration; otherwise to IMC's hazardous point. Record as a `BatteryCheck = swollen_quarantined` event outside the e-waste lot, so the lot stays clean but the item does not end up in the dry-waste bin. Change C6/S3 wording from "refused" to "refused from the e-waste lot, quarantined". (Whether power banks fall under Schedule I EEE or only the battery rules is **UNVERIFIED**; the kit works either way.)
- **Threshold on registrations, not guesses**: registration closes T−48h; system converts categories to kg with typical weights; at T−24h, confirm, **merge** with a nearby drive on the same vehicle route, or **convert to a drop box** with notice to the host (report 21, recommendation 3, still not adopted).
- **Drive staffing rule**: desks = ceil(expected households ÷ 30) with fast lane (÷ 12 without); one loader per 300 kg; one queue/battery marshal per drive over 40 households; vehicle class by expected large appliances, not just kg.
- **Sunday cover**: drive days get an on-call operator; codes/tokens resendable at the desk.
- **Drive workflow and entity**: add §16.x drive state machine (`draft → open → registration_closed → confirmed | merged | converted | cancelled → in_progress → collected → attested → statement_sent`) and `CollectionDrive` fields in §19.3.
- **Drive KPIs in §24.2**: kg per drive, households per drive, median wait, % drives meeting threshold, cost per kg vs doorstep, % residents with incentive paid within 4 working days, battery quarantines.

---

## 10. PRD gaps with section references

| Gap | v3 section | Fix |
|-----|-----------|-----|
| Per-resident code, weigh, price, incentive at drives | §10.2 C9, C6, C7; §17.4 | Fix 1 |
| Batch weighing vs per-resident weigh record trigger | §10.2 C9 vs §17.4 | Fix 1 |
| Threshold uses host "expected volume"; no close/merge/convert | §10.2 C9; OQ-77 (§29.2) | Other fixes |
| Pooling breaks caps and tripwire; no default-setting process | §10.2 C7, C9; §17.4; §18.3 | Fix 2 |
| No host or volunteer role | §8.2, §8.3, §8.4 | Fix 2 |
| Swollen batteries "refused" with no quarantine | §10.2 C6; §11.2 S3; §19.3 BatteryCheck; §2.3 | Battery kit |
| Wipe confirmation blocks dead devices | §10.2 C4 | Fix 1 |
| Handover fallback depends on weekday operator | §16.2; §21.4 | Sunday cover |
| Micro-tier 500 kg cap vs institutional drives | §8.5 | Fix 3 |
| Agent float for institutional lots | §10.2 C7; §17.2 | Fix 3 |
| 18+ rule and per-address limits vs hostel students | §21.3; §10.2 C7 | Fix 3 |
| Consumer and institutional material in one drive | §10.2 C9, C10 | Fix 3 |
| Government office mode = references only | §10.2 C10; §20.7 | Fix 3 |
| No hard-disk or battery-lot flow for institutions | §10.2 C10; §21.1 (Battery Rules row) | Fix 3 |
| `CollectionDrive` has no fields; no drive workflow | §19.1, §19.3; §16 | Other fixes |
| No drive staffing, vehicle, or budget line | §26.1 | Staffing rule |
| No drive KPIs | §24.1, §24.2 | Drive KPIs |
| Sunita labelled bulk consumer | §7.2 | Fix 3 |
| Special Campaign (Oct) not in the calendar for government offices | §23 | Add row: Special Campaign → government-office assist track, start condemnation in mid-September |

---

## 11. Score and reasoning

**4.5 / 10.**

- **What works (why not lower):** the drive is a named feature with a threshold, pooling, and a government-office mode (§10.2 C9–C10); the recycler-named receipt meets Rule 8 for private institutions; the incentive is on top of a market price; drives are timed to Swachhata Hi Seva and Diwali (§23). A patient society with ~40 participating households will get through a morning and end with ~100–200 kg, which is realistic and useful.
- **What breaks (why not higher):** the per-resident mechanics cap throughput at ~40 households per desk-morning; batch weighing contradicts the incentive trigger; pooling trips the fraud controls; swollen batteries have no safe exit and will end up in municipal waste during a government programme (pre-mortem story 3, §27.1); the college drive's real tonnage is an institutional disposal the PRD doesn't separate; and the government-office segment is out of reach because the PRD only records auction references.
- **With fixes 1–3 plus the battery kit:** estimated **7–7.5 / 10**. Drives could then realistically become the pilot's largest household channel by kg, though still small next to IMC's existing flow (§5.3).

All service times, arrival rates, and outcomes above are simulator estimates for design purposes. They should be replaced by stopwatch data from the first three manual-pilot drives (§25.3).
