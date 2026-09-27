# v3 Simulation 16 — Hostile public scrutiny over 18 months

**Angle:** How EcoSure v3 holds up when journalists, the opposition, digital-rights groups, waste-picker unions, rival recyclers, and influencers go looking for a story.  
**PRD reviewed:** `docs/prd/v3-PRD.md` (v3 consolidated, 2026-09-27), read in full.  
**Prior research used:** `docs/research/v2-deep/31-political-stakeholders.md` (power map, election calendar, Pithampur, scrap traders), `docs/research/v2-deep/11-rti-open-data.md` (RTI, Section 8(1)(j) after DPDP, open data, statistical disclosure control).  
**Method:** Simulation. Six hostile actors are played over 18 months from sanction. Headlines, questions, and outcomes are analyst judgement, not predictions of named people or outlets. No interviews were done. Numbers marked *derived* are my arithmetic from PRD figures; they are not in the PRD.  
**Date:** 2026-09-27

---

## 1. Bottom line

EcoSure v3 has unusually good *integrity* defences for an Indian government scheme: honest "formal network only" labels, a baseline so relabelled tonnes do not count, attestations that are never called certificates, maker-checker, a public information officer (PIO) who decides RTI, proactive disclosure of the operator contract, and published kill criteria. Those will win most arguments about *fraud* and *honesty*.

It is weak on the arguments that actually decide public stories in India: **cost optics** (its own numbers show the state spending several times the value of each tonne), **surveillance framing** (a state database of hashed IMEIs, fed by producers for every phone sold), **the informal sector** (a legal model that implies anyone *not* enrolled is unlawful), **vendor and recycler selection** (nomination route, one recycler at launch), and **provenance of the design itself** (the "field research" was simulated by AI agents). Open data arrives only in phase 2, so for the first year the story will be told through RTI replies and leaks rather than by the government's own dashboard.

**Score for real-life public and political defensibility: 5 / 10** as written. About **7 / 10** with the fixes in section 8, most of which are policy text, disclosure, and scope choices rather than engineering.

---

## 2. The numbers a journalist will compute first

These are the figures that will appear in the first critical story. They come straight from v3-PRD §26 and §2.2.

| Figure | Value | Source |
|--------|-------|--------|
| Base budget, 24 months | ~₹6.0 crore spend, ~₹6.2 crore sanction | §26.1 |
| Fixed share of cost | ~₹4.9 crore of ₹6 crore | §26.2 |
| Incentives to citizens | ~₹39 lakh, about 6.5% of budget | §26.1 |
| Cost per kg at 8 t/month | ~₹224 | §26.2 |
| Cost per kg at 25 t/month | ~₹80 | §26.2 |
| Blended recycler value of mixed e-waste | ~₹45/kg | §26.2 |
| CPCB's assumed collection and transport cost | ~₹25/kg | §26.2 |
| IMC existing e-waste flow (unverified) | ~2–2.5 t/day, ~60–75 t/month | §2.2, §26.2 |

**Derived:** with the volume gates in §26.3 (8, 25, 50 t/month at successive exits) and the timeline in §25 (Stage −1 of 8–16 weeks before anything is collected), the network plausibly handles **about 400 tonnes across 24 months**. ₹6 crore ÷ 400 t ≈ **₹1.5 lakh per tonne**, against material worth about **₹45,000 per tonne**. That is roughly **3× the material value and 6× CPCB's own collection-cost assumption**.

**The worse number:** the headline KPI counts only tonnes *above* baseline (§24.1). If IMC's existing flow is logged through EcoSure (which §5.3 intends), most EcoSure tonnes will be baseline, not additional. If only a quarter to a third of tonnes are additional, the cost per **additional** tonne is **₹4.5–6 lakh** (*derived*). The PRD's own honesty rule creates this figure, and a competent RTI applicant will ask for exactly "additional tonnes" and "total expenditure" and divide.

**Budget split optics:** software, programme management unit, operator, and audits take the large majority; citizens get 6.5%. "Consultants got ₹5 crore, citizens got ₹39 lakh" writes itself.

---

## 3. The six actors

### 3.1 Investigative journalist (national outlet, RTI and open data)

**Motive:** A "cleanest city" story with a twist, following national e-waste underworld coverage and the Bhagirathpura water deaths that bruised Indore's image (research 31, F3).

**Tools:** RTI to the sponsoring department, MPPCB, IMC, MPSEDC; the public attestation verifier (§12.2 R8); the recycler directory (§13.3 P7); GPS trackers hidden in donated devices (the method used by international watchdogs on e-waste export chains); interviews with kabadiwalas in Siyaganj and Malgodam.

**RTI questions likely filed (month 3 onward):**
1. The detailed project report, the sanction order, and the file notings on how the software vendor and operator were chosen (§5.1 says MPSEDC offers "a faster procurement route through nomination"; §21.1 says "competitive procurement").
2. Total expenditure to date by head, and tonnes collected, received, attested, and **additional above baseline**, by month.
3. The baseline document: who produced it, what data, who signed (§19.3 `Baseline.agreed_by`; §24.1 says it is "agreed with sponsors").
4. Number of citizens paid, total incentive paid, number of reversals and held payouts (§17.4), and the top-5% concentration figure (§18.3).
5. Number of informal collectors enrolled, suspended, and charged back.
6. All compliance flags raised against the pilot recycler and their outcomes (§14.3 G2).
7. Who designed the programme, and the research it relied on.

**What the PRD gives the government:** G10 proactive disclosure of the operator contract, SLAs, and performance; a PIO who decides (§14.3 G10, SP-12); honest labels; published volume gates and kill criteria (§26.3, §25.3). Many answers exist and can be released quickly.

**What hurts:** open data is phase 2 (§14.3 G9, §20.7), so for roughly the first 12 months there is no public dataset and every number arrives via RTI, which looks like reluctant disclosure. Cost per kg is reported "to the steering committee" (§26.3), not to the public. The baseline is agreed by the sponsors who benefit from a low baseline. And §1.2 and §3.2 describe "field research with simulated Tier-2/3 users" and a "36-agent review" — a journalist who reads the appendix finds that the persona agents and reviewers were AI simulations and the scores (4.6/10, 6.5–7/10, 59% survival) are self-assessed.

**The GPS-tracker story (highest-risk single event):** a journalist hands 10 phones with hidden trackers to EcoSure collectors. The PRD tracks custody up to the recycler and then relies on the recycler's *self-reported* material recovery destinations and mass balance (§12.2 R6, §16.5). If even one tracker pings from an informal dismantling cluster in another state, the story is "Government e-waste scheme feeds the underworld it promised to end". The PRD has no downstream audit of where fractions go after the recycler gate, no unannounced third-party audit, and no rule on buyer verification for output fractions.

### 3.2 Opposition MLA (assembly question, budget session)

**Motive:** Accountability stories in Indore, where opposition leaders have strong ties (research 31, power map). Budget session February–March is the moment (§23 notes the state budget cycle).

**Starred questions likely asked:**
1. "How much has been spent, how many tonnes collected, and what is the cost per tonne compared with the market value of e-waste?"
2. "IMC already collects e-waste with vehicles the Chief Minister flagged off. Why is the state paying a second time for the same waste?"
3. "Which company got the software contract, was there an open tender, and what is its relationship with anyone in the department?"
4. "How many kabadiwalas and waste pickers have lost income or been harassed since the scheme began?"
5. "Why is a single private recycler receiving government-organised feedstock and deciding the price citizens get?"
6. "Does the government now hold a database of every mobile phone sold in Madhya Pradesh?"
7. "Is any of this waste going to Pithampur?"

**What helps the minister's reply:** §5.3 (custody layer over existing flows, not a parallel network); §24.1 (only additional tonnes count, so no relabelling); §5.6 (Pithampur excluded); §1.4 (EcoSure never issues or trades certificates); §17.2 (the operator never holds money; material value is paid by the recycler, not the state); §26.3 (funding stops if volume gates fail); §9.3 (raw IMEIs never stored).

**What hurts:** the cost table in §26.2 is a gift to the questioner. "Layering over IMC" answers question 2 but makes question 1 worse (if IMC tonnes are baseline, cost per additional tonne balloons; if they are counted, the programme is claiming IMC's work). There is no written answer for question 4 other than a survey of about 50 collectors (§24.1, OQ-78). Question 5 has no answer at all: §25.2 requires only "at least 1 recycler" MoU and §12.2 R3 lets that recycler set the rate card.

**Timing hazard:** the IMC election window falls in 2027 (research 31, F2). §17.4 and §23 freeze *new or increased* incentives under the Model Code of Conduct, which helps. But drives with pooled society incentives (§10.2 C9) run just before a municipal poll will be framed as "government money to RWAs before elections" even if technically an ongoing scheme.

### 3.3 Digital-rights NGO (phone-identifier surveillance)

**Motive:** Purpose creep in state databases of device identifiers, especially after the national controversy over mandatory pre-installation of a government telecom-security app in late 2025 (context to verify; it shows how quickly "your phone, tracked by the state" becomes a national story).

**The attack, in their words:** "Madhya Pradesh is building a state register of mobile phones. Producers must upload the IMEI of every unit they sell (§9.5 PP1: up to a million rows per file, placed-on-market by month and state). Collectors scan the IMEI of every device at your door (§11.2 S3, PP3). The claim table links IMEIs to your phone number (§9.6). Police and telecom requests go through a 'lawful data request process' that the PRD never defines (§9.6 rule 3, §21.3)."

**Technical point they will make (and it is correct):** a keyed hash (HMAC-SHA-256, §9.3) protects IMEIs from outside attackers, but not from whoever holds the key. IMEIs are 15 digits with a known 8-digit model prefix and a check digit, so for any model there are only about a million possible serials. The key holder — the state — can hash any IMEI it is given and look it up instantly. This is **pseudonymisation, not anonymisation**. "Hashed" is a weaker defence in public than the PRD implies.

**Questions they will send to the department (and publish):**
1. Who holds the hashing key, and can the police or DoT ask EcoSure whether a given IMEI has been seen, and where?
2. Can a "watch list" of IMEIs trigger an alert when one is scanned? (The PRD does not forbid it.)
3. Is there a warrant or court-order standard, user notification, and a published transparency report?
4. Can a citizen hand over a phone *without* its IMEI being scanned? (PP3 says collectors scan "each data-bearing device"; the claim is optional but the scan is not.)
5. Why does an e-waste scheme need producers' **sale-time** IMEIs at all, when the chain works on category and weight (§9.3, §4.3)?
6. What prevents the state exempting itself from DPDP obligations for this database?

**What helps:** raw IMEIs never stored; only last 4 characters shown (§9.3); passports hold no names (§9.6); stolen-phone blocking is left to CEIR (§9.6 rule 5); regulators see aggregates, not people (§8.1, §8.4); access to personal data is logged (§8.6); account deletion removes the claim link (§9.6 rule 4).

**What hurts:** no definition of the lawful request process; no ban on watch lists or real-time alerts; no transparency report; no citizen opt-out from IMEI scanning; population-scale producer registry justified mainly by the problem statement, not by need; custody records kept 7 years (§21.3). Most damaging line: "The PRD says the passport records what happened to a unit, not who owns it — but the pickup record has your address, the claim has your phone, and the passport has your IMEI. Joining them is one query."

### 3.4 Waste-pickers' union (exclusion and harassment)

**Motive:** Indore has a documented history of evicting waste pickers during Swachh drives, and most of its pickers are women (research 31, P15 and R14). Any scheme that formalises "collectors" will be read against that history.

**The attack:** "EcoSure makes an MPPCB direction recognising *agents of recyclers* (§5.2). Anyone who is not an agent is now, by implication, handling e-waste unlawfully. Police and IMC staff will use that to seize carts and demand bribes. Agents must sign a recycler agreement, keep a payout account, handle intact items only (removing dismantling income, §5.2), stay under 500 kg a month on the micro tier (§8.5), and accept chargebacks decided by a private operator (§11.2 S5, S8). The steering committee has no worker representative (§5.1)."

**Likely headline events:**
- A picker's sack of e-waste is seized by a ward team "because she is not registered on EcoSure". One video is enough.
- A kabadiwala is suspended by the recycler after a weight dispute and loses a month's advances.
- The union counts that fewer than 10% of known kabadis enrolled and calls the rest "criminalised".

**What helps:** no Aadhaar requirement and any-of ID including NAMASTE and e-Shram (§8.5); same-day cash business preserved (§16.6); data shared with enforcement only through the lawful request process (§11.2 S1, §21.3); "no forced enrolment" and a grievance tripwire (§27.2, §18.3); honest limit that not all will join (§30 item 4).

**What hurts:** the PRD conflates kabadiwalas (buyers with shops or carts) and waste pickers (who recover from bins and dumps); nowhere does it say non-enrolment can never be a ground for enforcement; the grievance tripwire fires only on an "organised statement" or press coverage (§18.3), which means the programme learns of harm after the union goes public; the before-and-after survey covers about 50 collectors (OQ-78) against a sector of thousands; no income-floor or displacement metric; no ID card that police must recognise.

### 3.5 Rival recycler's lobbyist

**Motive:** Commercial. A registered recycler not chosen for the pilot sees a state-organised feedstock channel going to a competitor.

**The attack:**
1. **Monopoly:** Stage −1 needs only one recycler MoU (§25.2); that recycler sets the citizen price (§12.2 R3) and receives all agent flows. "The state is subsidising one company's supply chain with ₹39 lakh of incentives and a free government app."
2. **Implied defamation:** certificate provenance marks certificates "unbacked" (§13.3 P4). Certificates from non-participating recyclers can never be "backed". Producers will read "not backed on EcoSure" as "suspect", pushing them towards the chosen recycler. That is a Competition Commission complaint in waiting.
3. **Barriers to entry:** escrow funding with two weeks of reimbursements (§12.2 R3), state-verified capacity, and platform approval favour large recyclers.
4. **Data exposure:** attestation weights by recycler are public by number (§12.2 R8), revealing volumes to competitors.

**What helps:** attestations are not certificates and EcoSure never trades them (§1.4); platform approval shown separately from statutory registration (§13.3 P7); "at least one backup recycler before phase 1b" (§27.2); no commission on scrap value (§12.1).

**What hurts:** no published, open empanelment criteria for recyclers; no rule that any registered recycler meeting them may join; no rule on how agents or citizens choose between recyclers; provenance status labels do not distinguish "unbacked" from "issued by a recycler not on EcoSure".

### 3.6 Social media influencer testing the service live

**Motive:** Views. The format is "I tried the government's new e-waste service so you don't have to".

**Likely live tests and outcomes:**

| Test | Likely result | PRD reference | Story |
|------|---------------|---------------|-------|
| Book by WhatsApp in an outer ward | "No agent in your area" → nearest drop point and waitlist | §10.2 C2 | "Government app says come back later" (mild) |
| Hand over a working mid-range phone | Recycler rate card pays scrap value (illustrative ₹60 per phone, §17.3) plus ₹50 incentive; resale platforms pay thousands | §17.3, refurbishers only in phase 2 (§25.7) | **"Government paid me ₹110 for a phone Cashify valued at ₹6,000"** (damaging and very shareable) |
| Compare with kabadiwala | Kabadiwala pays more for working phones, less for junk | §2.2 | Mixed; depends on what they bring |
| Wait for incentive | 1–4 working days via treasury batch | §10.2 C7 | Fine if it arrives; viral if it fails |
| Wait for "recycled" message | Arrives only after the lot is attested, possibly weeks later | §10.2 C8, §16.5 | "Where is my phone?" follow-up video |
| Check attestation on public verifier | Works; shows issuer, weight, status | §12.2 R8 | Positive, if they bother |
| Try to farm incentives | Books with a second SIM, assisted booking at a shop with a friend's number | §10.2 C1, §11.2 S7, §17.4 | **"I got paid twice for the same junk"** if caps or codes fail |
| Put an AirTag in a donated device | See 3.1 | §12.2 R6 | Potential scandal |

**What helps:** price on the spot plus incentive, SMS confirmations, handover code, collector name and photo, `SAFETY` keyword (§10.2 C6), Hindi first.

**What hurts:** the PRD has no clear message that **working devices are worth more through resale** and that EcoSure is for end-of-life items; no refurbishment route until phase 2; a single doorstep safety incident involving a collector with only an ID check (no background check, §8.5) would dwarf everything else.

---

## 4. Simulated coverage timeline (18 months from sanction)

Month 0 is the government order. Dates are relative; research 31 places IMC polls in 2027 and the Assembly election in November 2028.

| Month | Event | Likely headline | Tone |
|-------|-------|-----------------|------|
| 0 | Joint government order; MPSEDC named technology agency | "MP launches ₹6 crore e-waste tracking platform in Indore" (Hindi dailies, press-release driven) | Positive |
| 1–2 | Opposition notices the nomination route | "E-waste platform given without tender? Congress asks" | Negative, small |
| 2–3 | Journalist files RTIs for DPR, file notings, baseline | — | — |
| 3 | DPR shows "illustrative" budget, AI-simulated research | **"₹6 crore scheme designed on AI chatbot 'field research'"** | Negative, national potential |
| 4–6 | Manual pilot; influencer videos; empty wards; low phone prices | "Tried it: government pays ₹110 for my phone" | Negative, viral |
| 5 | Digital-rights NGO letter on producer IMEI registry | "MP to build database of every phone sold in state, warns rights group" | Negative, national |
| 6–7 | IMC election code; incentives frozen for new schemes | "Scheme paused for polls; kabadiwalas say they were never asked" | Mixed |
| 8 | Waste-picker cart seizure video | "Not on EcoSure? Indore waste picker's sack seized" | **Very negative** |
| 9 | Phase 1a launch at Swachhata Hi Seva; CM event | "Indore's e-waste now has a verified trail" | Positive |
| 10 | Diwali surge; strong volumes | "Record e-waste collection in Diwali week" | Positive |
| 11 | RTI replies on cost and additional tonnes | **"₹1.5 lakh to recycle a tonne worth ₹45,000"**; if baseline is weak: **"₹5 lakh per extra tonne"** | Negative |
| 12 | Rival recycler complaint | "One company gets government-organised e-waste, rivals cry foul" | Negative, trade press |
| 13–14 | Budget session starred questions | "Minister defends e-waste scheme cost in Assembly" | Mixed |
| 14 | Fraud case surfaces via internal flags | Either **"EcoSure catches incentive farming, recovers money"** (if the government discloses first) or **"Incentive scam in e-waste scheme"** (if RTI discloses first) | Depends on who speaks first |
| 15 | Swachh Survekshan period; IMC claims e-waste credit | "Did Indore relabel e-waste to top Swachh rankings?" | Negative if baseline disputed |
| 16–17 | Tracker investigation published | Scandal: **"Tracked: EcoSure phone ends up in Moradabad acid bath"**. Or success: **"We tracked 10 phones. All reached a licensed recycler"** | Decisive |
| 18 | Phase 1b volume gate (25 t/month) | "Scheme hits target / misses target, faces funding review" | Depends |

---

## 5. Swachh Survekshan gaming

IMC is a co-sponsor (§5.1) and the city view exists to give "ward tonnes for Swachh Survekshan" (§14.3 G7, persona Rakesh §7.2). That gives IMC an incentive to:
- set a **low baseline** (it co-signs it, §24.1), so "additional tonnes" look larger;
- **time drives and pooled society incentives** (§10.2 C9) around the survey's citizen-feedback window, which critics will call buying feedback;
- log existing vendor tonnes as EcoSure tonnes and claim both.

The PRD's baseline and "additional tonnes" rule is the right instinct, but **the party that benefits signs the baseline**, and the survey window is not mentioned in the operating calendar (§23). A rival city, an opposition councillor, or a journalist comparing IMC's reported e-waste tonnage before and after EcoSure will find it.

---

## 6. Attack lines and defence lines

| Attack line | Strength | Best defence available in the PRD | Is the defence enough today? |
|-------------|----------|-----------------------------------|------------------------------|
| "₹1.5 lakh per tonne for waste worth ₹45,000" | High | Fixed platform cost; volume gates; national reuse cuts per-city cost to ₹7–12 lakh per city-year (§26.2–26.4); honest limit 5 (§30) | **No.** The defence is a future promise; the attack is today's arithmetic |
| "Paying twice for IMC's collection" | Medium | Custody layer, additional tonnes only (§5.3, §24.1) | Partly; needs an independent baseline |
| "Contract without tender" | Medium–high | Operator and vendor contracted separately; G10 proactive disclosure (§5.4, §14.3) | **No.** §5.1 advertises nomination; §21.1 says competitive; contradiction |
| "Designed by AI, not fieldwork" | Medium, embarrassing | §30 honest limits; manual pilot before software (§25.3) | Partly; wording in §1.2 and §3.2 invites it |
| "State database of every phone" | High | Hashing, last-4 display, no names in passports (§9.3, §9.6) | **No.** No lawful-request standard, no watch-list ban, no opt-out, producer sale-time registry |
| "Waste pickers criminalised" | High | Any-of ID, no forced enrolment, data promise (§8.5, §16.6, §27.2) | **No.** No non-enforcement rule, no worker seat, reactive tripwire |
| "One recycler's monopoly" | Medium | Backup recycler before 1b (§27.2) | **No.** No open empanelment, no multi-recycler rule in the pilot |
| "Incentive scam" | Medium (small money, big story) | Handover code, caps, device-once rule, concentration tripwire, chargebacks (§17.4, §18.2–18.3) | Mostly, if the government publishes fraud findings first |
| "Fake certificates laundered" | Medium | Attestations are not certificates; provenance; mass balance; maker-checker (§12.2, §13.3) | **Yes**, this is the PRD's strongest ground |
| "Waste goes to the underworld after the recycler" | High if a tracker proves it | Mass balance, material recovery destinations (§12.2 R6) | **No.** Self-reported downstream; no third-party audit |
| "Pithampur" | Low now | Indore only (§5.6) | Yes |
| "Pre-poll freebie" | Low–medium | No new or increased incentives in a code period (§17.4, §23) | Mostly |

---

## 7. PRD gaps (with v3-PRD section references)

1. **Cost optics are unmanaged.** §26 shows cost per kg to the steering committee only (§26.3). There is no public cost disclosure, no framing of cost per *additional* tonne, and no comparison with the value of the evidence (fraud avoided, EPR provenance) that could justify it.
2. **Open data is phase 2.** §14.3 G9 and §20.7 delay the monthly dataset; the first year is RTI-only. Research 11 recommended monthly open aggregates from launch.
3. **Procurement route contradicts itself.** §5.1 praises "nomination" through MPSEDC; §21.1 says "competitive procurement"; §25.2 says "procurement of operator and, separately, software vendor" without stating the method or conflict-of-interest rules (including for the original design team).
4. **Research provenance is presented as field research.** §1.2 says "field research with simulated Tier-2/3 users"; §3.2 and §3.7 describe persona agents and a "36-agent review" whose scores are self-assessed (§1.3). No real fieldwork is listed before sanction.
5. **Lawful data requests are undefined.** §9.6 rule 3 and §21.3 point to a process the PRD never specifies: no legal threshold, no approving authority, no notice, no transparency report, no ban on watch lists or real-time alerts.
6. **IMEI minimisation stops short.** §9.5 PP1 builds a unit-level sale-time registry; PP3 scans every device at the door with no citizen opt-out; one global hashing key (§9.3, §9.6 rule 1) lets the key holder test any IMEI.
7. **No non-enforcement guarantee for the informal sector.** §5.2's MPPCB direction recognising agents has no companion clause saying non-enrolment is never a ground for seizure, fines, or eviction. §5.1's steering committee has no waste-picker or trader representative (research 31 recommended both).
8. **Kabadiwala and waste picker treated as one group.** §7.1, §11, §16.6 use `informal_collector` for both; pickers who recover from bins have different risks and needs.
9. **Grievance detection is reactive.** §18.3 fires on "organised statement" or press coverage; there is no ward-level harm reporting line or proactive monitoring beyond a ~50-person survey (OQ-78).
10. **Single-recycler pilot with recycler-set prices.** §25.2 needs only one recycler MoU; §12.2 R3 lets it set rates; no open empanelment criteria or multi-recycler rule; provenance labels (§13.3 P4) do not separate "unbacked" from "not on EcoSure".
11. **No downstream audit after the recycler gate.** §12.2 R6 and §16.5 rely on recycler self-reporting of fraction destinations; no unannounced third-party audit, buyer verification, or tracker-based spot checks.
12. **Baseline conflict of interest.** §24.1 has the baseline "agreed with sponsors", including IMC, which gains Swachh Survekshan credit (§14.3 G7). §23 does not mention the survey window.
13. **Assisted booking and optional phone at drop points open an incentive leak.** §10.2 C1 and §11.2 S7 let an agent enter a phone number for someone else; combined with nominee payouts (§10.2 C7) and the operator call-back fallback for handover codes (§16.2), an agent can farm incentives with a pool of SIMs. Caps limit each account, not each agent's network.
14. **Imported junk.** Nothing stops devices from other states being brought to Indore to earn MP incentives; "device identifier earns once" (§17.4) does not detect cross-border inflow.
15. **Working devices are routed to scrap.** Refurbishment is phase 2 (§9.5 PP7, §25.7); the citizen flow (§10) does not steer working devices to resale, inviting the "₹110 for my phone" video.
16. **Doorstep safety vetting is thin.** §8.5 requires only an ID check for collectors; there is no background check option or incident response commitment beyond the `SAFETY` keyword (§10.2 C6).
17. **No communications or crisis plan.** v3 adds the steering committee (§5.1) and election calendar (§23) but not research 31's recommended spokesperson matrix, 24-hour holding statements, or "disclose first" rule for fraud and incidents.
18. **Flags on named organisations have no status gate or right of reply.** §14.3 G2 lists flags but not the status workflow (open, under review, confirmed, dismissed) research 11 recommended before any disclosure.

---

## 8. Fixes (ordered by leverage)

### Highest leverage

1. **Publish everything monthly from day one, before anyone asks.** Move a minimal open dataset from phase 2 to the manual pilot: tonnes (total and additional), cost to date and cost per additional tonne, incentives paid and held, fraud reversals, flags confirmed, agents enrolled and suspended, grievances. Use research 11's suppression rules (under 3 organisations or 10 households). *Why:* every negative story in section 4 is worse when it arrives through RTI; a government that publishes its own bad month controls the frame. Change §14.3 G9, §20.7, §26.3.

2. **Shrink the IMEI footprint and write the surveillance limits into the government order.** Drop the producer sale-time unit registry from the pilot (keep models and batches only; units optional and producer-scoped keys so cross-producer linkage is impossible). Make door-side IMEI scanning optional for the citizen, with category and weight as the default. Add a rule: no watch lists, no real-time alerts, no bulk queries; individual lookups only on a court order or statutory order approved by a named secretary-level officer; the user is notified when the law allows; an annual transparency report of requests. Rotate keys and delete identifier hashes of processed units after the audit window. Change §9.3, §9.5 PP1 and PP3, §9.6, §21.3.

3. **Put a non-enforcement guarantee and worker seat in the MPPCB direction.** State that non-enrolment in EcoSure is never grounds for seizure, fine, eviction, or police action, and that EcoSure data is never used to identify non-enrolled workers. Add a waste-picker organisation and a trader association seat to the steering committee. Split `informal_collector` into buyer (kabadiwala) and picker, with a no-account "sell at the gate" route for pickers. Add a ward-level harm hotline and a quarterly independent survey of at least 300 collectors, including non-enrolled ones. Change §5.1, §5.2, §7.1, §16.6, §18.3, OQ-78.

### Strong

4. **Open empanelment for recyclers and at least two at launch.** Publish criteria any CPCB-registered recycler can meet; let agents choose among empanelled recyclers; show rate cards side by side; relabel provenance as "backed", "partially backed", "unbacked", or "issuer not on EcoSure". Change §12.2 R1 and R3, §13.3 P4, §25.2.

5. **Fix the procurement text and declare conflicts.** Remove "nomination" as a selling point in §5.1; state open competitive procurement on GeM (or a documented, published justification if nomination is used); require conflict-of-interest declarations, including from anyone involved in the original YESIST12 design. Publish the tender evaluation. Change §5.1, §21.1, §25.2.

6. **Reframe cost honestly and publicly.** Replace the headline "cost per kg" with three published numbers: platform cost (fixed, reusable across cities), operating cost per tonne, and cost per additional tonne. State the break-even plan (layering over IMC, adding cities) and the kill rule in one public paragraph. Add a line on what the state gets beyond tonnes: evidence against fake certificates, verified baseline for CPCB reporting. Change §26.

7. **Independent baseline and Swachh Survekshan firewall.** Baseline set and audited by the independent evaluator already budgeted in §26.1, not agreed by sponsors. Only additional, second-party-verified tonnes may be reported for Swachh Survekshan; no incentive increases or pooled-incentive drives during the survey's feedback window, or disclose them if they happen. Change §23, §24.1.

8. **Downstream audit and "track it yourself" transparency.** Quarterly unannounced third-party audits of recycler output buyers; buyer registration and invoice checks for fractions; the department itself hides trackers in a random sample of devices every quarter and publishes the results. *Why:* this pre-empts the tracker story and turns it into a success story. Change §12.2 R6, §18.2.

### Supporting

9. **Close incentive leaks.** For assisted and drop-point bookings, send the handover code to the phone entered and cap per agent network (unique payees per agent per month, SIM age checks, payee–agent graph monitoring); disallow nominee payouts to agents; cap operator call-back overrides per agent; flag devices whose manufacture or sale region is outside MP when producer data exists. Change §10.2 C1 and C7, §11.2 S7, §17.4, §18.2.

10. **Say "working phone? Sell it" upfront.** Add a triage screen that tells citizens a working device is worth more through resale or exchange, links to empanelled refurbishers early (pull a light version of PP7 into phase 1a), and positions EcoSure as the end-of-life channel. Change §10.2 C2, §9.5 PP7.

11. **Rename the research honestly.** In §1.2, §3.2, §3.7 say "desk research and AI-assisted simulations; no primary fieldwork yet", and add real fieldwork (at least 100 households, 30 kabadis, 10 pickers, 3 recyclers in Indore) to Stage −1 before the DPR. Remove self-assessed scores from any public-facing version.

12. **Crisis playbook and "disclose first" rule.** Named spokespersons (IMC Commissioner for city issues, MPPCB Member Secretary for regulatory), 24-hour holding statements for fraud, doorstep incident, fire, tracker story, and harassment claims; the department announces confirmed fraud with recovery amounts before RTI does. Add as a new §5.8 or topic file (research 31, C11).

13. **Collector safety vetting.** Optional police verification for doorstep collectors (never for gate or drop-point sellers, to avoid scaring pickers), women collectors for women-requested slots where possible, and an incident response SLA. Change §8.5, §10.2 C6.

14. **Flag status and right of reply.** Implement research 11 C5 in §14.3 G2: only confirmed or dismissed flags are disclosable, with the organisation's response.

---

## 9. Scandal versus success

### Scandal scenario (probability as written: roughly 35–40%)

The DPR leaks in month 3 with AI-simulated research and a nomination award. The influencer's "₹110 for my phone" video lands during the manual pilot. A digital-rights group frames the producer IMEI registry as "Aadhaar for phones", and the national press picks it up because of the late-2025 phone-app row. During the IMC election period a waste picker's sack is seized "for not being on EcoSure" and the union holds a press conference. RTI replies in month 11 show ₹1.5 lakh per tonne and a small share of additional tonnes. A tracker investigation finds one phone at an informal dismantling unit in another state. The opposition asks starred questions in the budget session; the minister's reply relies on promises about future volume. The steering committee invokes the volume gate at month 18 and the scheme is quietly wound down, remembered as "the ₹6 crore app that paid ₹110 for phones and tracked IMEIs".

**What makes it a scandal is not fraud.** The PRD's integrity controls mostly work. It is cost, surveillance, and exclusion stories arriving through RTI and video before the government speaks.

### Success scenario (probability with fixes: roughly 45–55%)

The department publishes a monthly open dashboard from the manual pilot, including an honest cost per additional tonne and a plain statement of the kill rule. The IMEI rule is narrow (no sale-time registry in the pilot, optional door scans, a court-order standard, and an annual transparency report), and the digital-rights group writes a cautious "better than most" note. A waste-picker organisation sits on the steering committee and co-signs the non-enforcement clause; cart-seizure claims are handled through a published hotline within days. Two recyclers are empanelled and compete on rate cards. The department runs its own tracker checks and publishes "40 of 40 devices reached licensed recyclers". When incentive farming is caught, the department announces the recovery first. The Diwali surge and IMC logging push volume past 25 t/month; the minister's Assembly answer quotes the public dashboard. National coverage runs as "Indore shows how to track e-waste honestly", and a second state asks for the open standard.

**What makes it a success is disclosure before scrutiny**, narrow data collection, and visible worker protection, not better software.

---

## 10. Score

**Public and political defensibility in real life: 5 / 10.**

- **Strengths (+):** honesty labels and baseline rule; attestations never called certificates; strong fraud controls on paper; PIO decides RTI and the operator contract is proactively disclosed; Pithampur excluded; election-period incentive freeze; published kill criteria. These win fraud and honesty arguments.
- **Weaknesses (−):** the PRD's own cost table produces the worst headline; the IMEI design reads as a state phone register with an undefined police-access process; the agent-only legal model implies non-enrolled workers are unlawful, with no guarantee against harassment and no worker seat; one recycler at launch sets prices; procurement text contradicts itself; the design rests on AI-simulated "field research"; open data waits for phase 2, so the first year's story is told by RTI replies.
- **With fixes 1–8:** about **7 / 10**. The residual risk is real cost per tonne at pilot volume, which only volume (IMC integration, more cities) can fix, and a single doorstep or downstream incident, which no document can fully prevent.
