# 02 — Real-life simulation: citizens without a smartphone using EcoSure v3

**Simulation:** 02 of the v3 real-life simulation set
**Date:** 2026-09-27
**PRD tested:** `docs/prd/v3-PRD.md` (EcoSure v3, consolidated). Section numbers below refer to that file.
**Prior research read:** `docs/research/v2-deep/20-citizen-tier3.md`, `docs/research/v2-deep/33-inclusion.md`, and the v3 topic files `04-consumer.md`, `10-workflows.md`, `03-domain-model.md`.
**Method:** The simulator plays Kamla (the PRD's own no-smartphone persona, section 7.2) through every step v3 specifies for her, exactly as written, and records where real life pushes back. Two other excluded users are simulated more briefly. Web research was used for CRT economics, IVR usability, bank-credit failures, Mhow's civic status, and CM Helpline 181 capacity.

**Short answer:** v3 fixed the *list* of channels that v2 was missing (missed call, IVR, assisted booking, bank/voucher/nominee payout, handover code, collector ID). But when Kamla actually walks through it, almost every step still quietly assumes a smartphone, a formal address, a literate reader, a valuable item, or a grandson who is at home. She drops out at the first step (her town is outside the pilot area) and, if we move her inside the pilot area, she most likely drops out at the callback or at the CRT TV's zero price. **Score: 4 / 10 for how well v3 works for excluded users in real life.**

---

## 1. Facts used (with verification status)

**Verified** means confirmed on an official or primary page during this simulation. **Unverified** means from secondary, commercial, or news sources, or a figure that could not be confirmed on a primary page. **Simulation assumption** means invented for the story and must be tested in the field.

| # | Fact | Source | Status |
|---|------|--------|--------|
| F1 | Mhow (Dr Ambedkar Nagar) is about 23 km from Indore city and is governed by the **Mhow Cantonment Board** under the Ministry of Defence, a "deemed municipality" under the Cantonments Act 2006 — **not** by Indore Municipal Corporation (IMC) | [mhow.cantt.gov.in](https://mhow.cantt.gov.in/about-us/) | Verified |
| F2 | CRT TVs hold 2–3 kg of lead in the funnel glass; a 21-inch set weighs roughly 20–30 kg in total | [Adhara Viveka glossary](https://adhara-viveka.com/glossary/cathode-ray-tube) | Unverified (industry glossary) |
| F3 | Indian recyclers reportedly charge a **gate fee of about ₹15–35/kg** for CRTs (negative value), partly offset by EPR certificates; some refuse CRTs | Same as F2 | Unverified |
| F4 | Informal scrap buyers advertise **₹150–800 per CRT TV** (they typically strip the copper yoke and board and may dump the glass) | [UniScrapWala](https://uniscrapwala.com/service/television-crt), [Bino](https://bino.bot/find/sell-crt-tv-scrap-price) | Unverified (commercial, not MP) |
| F5 | Low-literate users in India struggle with more than 3–4 IVR options; submenus confuse them. BBC Media Action found only 20% of Bihar health workers had ever used an IVR menu, mostly with a poor experience | [Mobile Kunji case narrative](https://exa.ai/library/publication/p1nx3bkwcp6) | Verified (published case study) |
| F6 | In a Hindi IVR run with a radio show, **~46% of 391 calls selected no option at all** — a usability failure rate similar to earlier work with low-literate urban migrants | [IIT Delhi case study](https://www.cse.iitd.ac.in/~aseth/visually_impaired.pdf) | Verified (academic paper) |
| F7 | Older adults report frustration at not reaching a human, long holds, and being unable to recover from mistakes in IVRs | [PubMed 21631386](https://pubmed.ncbi.nlm.nih.gov/21631386/) | Verified (US study; direction applies) |
| F8 | Of 56.04 crore Jan Dhan accounts (July 2025), **13.05 crore were inoperative**. Accounts with no customer transaction for 2 years become inoperative | [Outlook Money](https://www.outlookmoney.com/banking/jan-dhan-account-re-kyc-drive-until-september-30-how-to-reactivate-dormant-account) | Unverified (news, citing Ministry) |
| F9 | RBI has told banks to segregate DBT accounts so they keep receiving credits even when inoperative, but notes such accounts are still being frozen for KYC reasons | [RBI notification](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12750&Mode=0) | Verified |
| F10 | Returned DBT credits sit with the sponsor bank; portals may show "processed" while the beneficiary sees nothing; SMS credit alerts are unreliable in rural areas | [Assam Info Hub explainer](https://assaminfohub.com/jibon-prerana-payment-not-received/) | Unverified (explainer site) |
| F11 | CM Helpline 181 gets about **55,000 calls a day**, has ~800 agents, and MPSEDC issued an RFP in July 2026 for an **AI voice bot** on 181 | [Amar Ujala, Sep 2026](https://www.amarujala.com/madhya-pradesh/bhopal/madhya-pradesh-senior-officers-to-personally-visit-remote-districts-direct-monitoring-of-cm-helpline-complai-2026-09-03), [MPSEDC RFP](https://mpsedc.mp.gov.in/Uploaded%20Document/Tenders/24072026013924RFP703.pdf) | Verified (RFP is primary); call figures from news |
| F12 | Indore district had about **22,500 pending CM Helpline complaints** in one review | [Agniban](https://www.agniban.com/cm-helpline-is-empty-54000-complaints-pending/) | Unverified (local news, date unclear) |
| F13 | MP women 15–49 with a phone they use themselves: 48.5% (rural 40.6%); 92.1% have a bank account they use. Over half of people 60+ rely wholly or partly on basic phones | `v2-deep/33-inclusion.md` S1, S12 | Verified (NFHS-6) / Unverified (60+ figure) |

---

## 2. The people

| Person | Situation | What they want gone |
|--------|-----------|---------------------|
| **Kamla**, 58 | Homemaker in Mhow, peri-urban Indore. Basic keypad phone (Nokia-style, Hindi display, no internet). Reads a little Hindi slowly; cannot read English. No UPI. Jan Dhan account opened in 2015, last used about 18 months ago for a gas subsidy (simulation assumption). Lives with her grandson Deepak, 22, who drives a tempo and is often away for days. | A 21-inch CRT TV (dead, ~25 kg), a transistor radio (with old AA cells still inside), a dead feature phone (swollen battery) |
| **Ramprasad**, 71 | Retired mill worker in an old-city IMC ward of Indore. Uses a wheelchair after a stroke; slurred speech; partial hearing loss. Wife Shanti, 66, cannot read. One shared keypad phone. Pension in a bank account. | A dead 165-litre fridge, an old desktop CPU and monitor |
| **Sonu**, 24 | Construction labourer from Jharkhand, rents a shared room with four others near an industrial area inside IMC limits. Keypad phone with a home-state prepaid SIM; changes SIMs when offers run out. Bank account in Jharkhand. Works 8 am–8 pm, six days a week. | Three dead cheap phones, a Bluetooth speaker, chargers, a bag of wires |

---

## 3. Kamla's simulation

### 3.1 How she hears about it

A poster in Hindi at the ration shop (section 10.2 C11) shows a phone number and the words "missed call दें, पुराना TV/रेडियो/मोबाइल घर से ले जाएंगे, पैसे भी मिलेंगे" (give a missed call, we'll take your old TV/radio/phone from home, and pay you). This is the best-case entry. Kamla is interested mainly because the TV takes up space and Deepak keeps saying the kabadiwala only offered ₹100 for it.

**Friction already present:** v3 names posters and voice clips (C11) but no outreach plan specific to non-smartphone households (ration shops, anganwadis, self-help groups, temples, ward councillors). Section 26.1 budgets ~₹1.25 lakh a month for outreach across the whole city; nothing is earmarked for the channel that needs it most.

### 3.2 Step 1 — Missed call, and the first wall: she is outside the pilot

Kamla gives a missed call on a Saturday at 6 pm.

- Section 5.6 limits the pilot to **Indore city only**. Mhow is a cantonment town under the Ministry of Defence (F1), with its own board, not IMC. v3's whole collection design layers over **IMC** vehicles and ward points (section 5.3). There is no MoU with the Mhow Cantonment Board, no agent serving Mhow, and no Mhow drop point.
- C2 says: if no agent serves the area, "show the nearest drop point and next ward drive with a waitlist — never an empty map." For Kamla, "show" means the operator telling her by phone that the nearest drop point is in Indore, 23 km away.
- She is not going to take a 25 kg CRT TV on a bus to Indore.

**Real outcome: Kamla drops out here.** The PRD's own persona for excluded users (section 7.2: "Kamla — homemaker, Mhow") lives outside the PRD's own pilot geography. This is not a nitpick: it shows the persona was never walked through the actual geography rule.

For the rest of the simulation we **move Kamla into a peri-urban ward on the southern edge of IMC limits** (simulation assumption) so every other step can be tested.

### 3.3 Step 2 — The callback

C1 promises the operator "calls back within 4 working hours."

- Saturday 6 pm is outside working hours. The next working window starts Monday 10 am. The callback comes **Monday 1:40 pm**, about 44 hours after her missed call. v3 has no weekend or evening voice cover and no instant auto-acknowledgement SMS or voice message ("we got your call, we will call on Monday").
- The call comes from an unknown 10-digit number. Kamla has had two "your KYC is expiring" scam calls this month. She is cooking and does not pick up. **v3 does not say how many callback attempts are made, at what times, or what happens after they fail** (C1, section 16.3).
- On Tuesday the operator tries again and she picks up. She had half-forgotten; it takes a minute to understand who "EcoSure" is. The word "EcoSure" means nothing to her; "नगर निगम" (municipal corporation) or "सरकार" would. v3 does not say what name is used on calls, SMS sender IDs, or the collector's ID card for non-English speakers.

**Drop-off risk:** high. Many elderly callers will miss the first callback or treat it as spam. The design has one human touchpoint and no retry rule.

### 3.4 Step 2b — If she used the IVR instead

Suppose the poster had said "call 181" (section 10.2 C1 reuses CM Helpline 181 IVR "if the department agrees", SP-11).

- 181 is a statewide grievance line handling about 55,000 calls a day across 52+ departments (F11). E-waste booking would sit several menu levels deep ("press 3 for Urban Development… press 5 for sanitation… press 2 for e-waste"). Research on low-literate Indian users says more than 3–4 options or any submenu causes confusion (F5), and about 46% of calls in one Hindi IVR selected nothing (F6).
- Kamla presses 1 by mistake, lands in a complaint flow about water supply, and hangs up.
- Even if she reaches the right menu, **an IVR cannot capture her address**. Her address is "हनुमान मंदिर के पीछे, शर्मा जी की चक्की के सामने, नीला गेट" (behind the Hanuman temple, opposite Sharma's flour mill, blue gate). C2 requires "society, wing/flat, landmark, pincode" for doorstep; she has no society, no wing, no flat number, and does not know her pincode. A human must take this down.
- MPSEDC's July 2026 RFP for a 181 AI voice bot (F11) means the IVR Kamla meets may be a speech bot, not a keypad menu. That could help (she can speak) or hurt (Malwi-accented Hindi from a 58-year-old woman on a crackly line). v3 does not mention it.

**Gap:** v3 treats IVR as a booking channel, but for a first booking with a landmark address it can only be a **routing** channel to a human. And 181 is the fallback plan, with no stated alternative if the department says no.

### 3.5 Step 3 — Booking the items

The operator asks what she has. C2 says "category + count with plain-language examples."

- **TV:** "पुराना डिब्बे वाला TV" (old box TV). The operator records category "TV (CRT)", count 1.
- **Radio:** category "small consumer electronics", count 1. Nobody asks about batteries inside.
- **Dead phone:** "mobile phone", count 1. This is data-bearing, so C4 wipe help kicks in.

**Wipe step (C4).** The operator reads out: back up, sign out, factory reset, remove SIM and memory card. The phone is dead. None of these steps can be done on a dead phone. Kamla says "haan" to end the conversation. C4 says "a data-bearing item cannot be collected without a confirmation", so the operator ticks "collector assisted." **v3 has no rule for dead devices**, where the only possible steps are "remove SIM and memory card and hand them back to the owner" and "the owner accepts the data will be destroyed at the recycler."

**Consent (section 21.3).** The DPDP notice "appears before first use." On a voice call, nothing "appears." v3 does not specify a spoken notice, how consent is recorded on a call (recording? operator tick?), or how Kamla can later ask for deletion without a smartphone.

**Payout choice.** The operator asks how she wants the incentive: UPI, bank, voucher, or nominee (C7).
- UPI: she has none.
- **Bank:** she knows she has a Jan Dhan account at a nearby bank branch but does not know the account number or IFSC; the passbook is in a trunk. The operator cannot finish the booking with bank details. v3 does not say whether payout details can be added later, by whom, or through which channel.
- **Voucher at a partner outlet:** which outlet? v3 does not name the outlet type, redemption rules, expiry, or whether Kamla gets cash or only goods. In her area there may be no partner outlet at all.
- **Nominee:** she names Deepak. But the incentive record in the domain model (section 19.3 CitizenIncentive; `03-domain-model.md`) holds `user_id` and `payout_method` only — there is **no beneficiary name, no relationship, and no record that Kamla (not Deepak) did the handover.** In practice the money goes to Deepak's UPI, and Deepak is in Dewas this week.

The operator chooses "bank, details to follow." (Simulation assumption: this is what a reasonable operator would do.)

### 3.6 Step 4 — Scheduling and the handover code

C5 offers slots "including weekend mornings." Kamla takes Thursday 10 am–1 pm.

C6: she gets the collector's name, photo, ID number, masked phone number, and a **4-digit handover code** "to give only after weighing and payment." Section 16.9: the scheduled message goes by "WhatsApp, SMS fallback, IVR for IVR bookers."

What actually arrives on her keypad phone on Wednesday evening (simulation of a DLT-compliant SMS):

> `VK-MPECOS` : EcoSure pickup 24-SEP 10:00-13:00. Collector: Rajesh K, ID AG-0412. Call 080XXXXXXX. Handover code 5831. Share only after weighing & payment.

- **The photo cannot be delivered.** A keypad phone cannot show an image. C6's key safety control (see the face before you open the door) does not reach her.
- **It is in English** unless a Hindi Unicode template is used. Hindi Unicode SMS cut the message length roughly in half and some older keypad phones render Devanagari poorly (unverified for current handsets). v3 says "Hindi is the default" but does not specify Hindi SMS templates for codes.
- **The sender ID `VK-MPECOS` means nothing to her.** It looks like every bank and scam message she gets.
- **The code conflicts with everything she has been told.** Her bank, the gas agency, and the TV news all say "कभी भी OTP किसी को न बताएं" (never tell anyone an OTP). Now a government message asks her to give a 4-digit number to a stranger at her door. Either she refuses (handover fails, incentive lost) or she learns that it is fine to share codes with people who come to the door, which is exactly what scammers want. **v3 has no anti-scam line** such as "EcoSure will never ask for your bank OTP, PIN, or money" (the inclusion review recommended this; `33-inclusion.md` R7).
- **She has 212 unread SMS.** By Thursday she cannot find this one. She cannot scroll-search on her phone. v3 does not provide a voice call with the code the morning of the visit, or a way to get the code again by missed call.

The IVR variant ("IVR for IVR bookers") would read the code aloud once, on a call she might miss.

### 3.7 Step 5 — The day of the visit: safety and the CRT TV

Deepak is away. Kamla is alone.

- 10:00–12:30: she waits. She does not go to the market or the neighbour's. (The 3-hour window costs her a morning; the first failed visit is penalty-free for her, but only if someone marks it as the collector's failure.)
- 12:40: an unknown number calls. It is the collector, via the masked number, asking for directions. The landmark address takes three calls. She is nervous: a man she has never seen, asking exactly where she lives, when she is alone.
- 12:55: Rajesh arrives on a motorcycle with a small scale and a sack. He shows an ID card. It has English text and a QR code. Kamla cannot read it and has no smartphone to scan it. **v3's collector identity check works only for people who can read English or scan a QR** (C6; section 22 "collector name, photo, ID").
- **She has no way to check he is genuine** except by trusting him. The `SAFETY` keyword (C6, section 16.9) is a **WhatsApp keyword**. v3 lists no SMS keyword, no missed-call panic number, and no IVR option for safety.
- v3 does not offer: choose a slot when another adult is home, request a woman collector, or ask for a neighbour/ward volunteer to be present. The inclusion review recommended all three (`33-inclusion.md` R5); v3 did not adopt them.

**The CRT TV.** The TV sits on a wooden shelf inside the room. It weighs about 25 kg (F2).
- Rajesh cannot collect it "at the door" — he has to come in and lift it. Carrying a CRT onto a motorcycle alone is unsafe; if dropped, the tube can implode and scatter leaded glass. He needs a second person and a three-wheeler or cart.
- His scale reads up to 20 kg.
- The recycler's rate card for CRT TVs is **₹0, or negative**. Recyclers reportedly charge ₹15–35/kg to take CRTs (F3). Under C7 and section 17.2, the collector pays "the recycler's published material price", so **Kamla gets ₹0 for the TV at the door**, and the agent may be reimbursed nothing or *charged* for it (S5 reimburses "accepted weight" at the rate card). The local kabadiwala offered ₹100–150 (F4, and Deepak's quote).
- The scheme incentive might save it: OQ-70 says "per kg for others." If the incentive were, say, ₹4/kg (illustrative), the TV earns ₹100 — but only 1–4 working days later, into a bank account she has not yet given details for.
- **What Rajesh actually does** (simulation, based on agent economics in section 11 and the cherry-picking risk in section 18.2): he says "TV ke liye gaadi alag se aayegi" (a separate vehicle will come for the TV), takes the radio and phone, and never books the TV. Or he refuses it outright. v3's cherry-picking tripwire (section 18.3) watches the **high-value share** of lots falling; it does not watch **negative-value items being refused or never collected**, which is the more likely failure in this category.

**The radio.** It has two leaking AA cells inside. Loose batteries are out of scope (section 2.3); "loose batteries in lots — any" is an amber tripwire (section 18.3). Rajesh pulls them out and hands them back. Kamla now has two leaking cells and nowhere to put them. v3 says damaged batteries get "a referral message" (C6) but names no actual battery drop-off in Indore.

**The dead phone.** The battery is swollen. S3 says swollen batteries are "refused". Does that mean the phone is refused, or only the battery? v3 does not say. Rajesh takes the phone body and leaves the swollen battery on her table. She is now holding a fire-risk item, which is worse than before he came.

He scans nothing (no IMEI label readable) and records category and count only (PP3 allows this).

### 3.8 Step 6 — Weighing, payment, and the code

- Radio + phone weigh 1.3 kg. Rate card: radio ₹10/kg, feature phone ₹15 each (illustrative). He pays her **₹28 in cash**. She is disappointed; she expected "paise milenge" to mean more.
- C7 says the collector gives "a receipt naming the recycler and agent." v3 does not say if this is paper. For Kamla, only a paper receipt or an SMS she can show Deepak works. Simulation: Rajesh has no printed receipts; an SMS arrives later.
- He asks for the handover code. She cannot find the SMS. He offers to look through her phone. **She hands her phone to a stranger.** This is exactly the scenario the code was meant to make safe, and it now exposes all her messages, including bank SMS.
- If she cannot find it: section 16.2 allows a "logged operator call-back, capped" as an alternative. Rajesh calls the operator; the operator calls Kamla; she does not recognise the number (again). Eventually it works. Under a busy pilot this takes 20+ minutes or fails.
- C8 sends "collected (weight and price)." Fine by SMS.

### 3.9 Step 7 — The incentive and whether she ever sees it

- Her payout is "bank, details to follow." Nobody follows up. **v3 has no process or SLA for collecting missing payout details** from a voice/assisted user, and no rule for what happens to an incentive held for missing details (does it expire? return to the treasury?).
- Simulation: on Saturday Deepak returns, digs out the passbook, and calls the support number. After two tries he gets through (section 21.4: 2 working days for payment queries). Details are added.
- The treasury batch runs. **Account validation before first payout** (section 20.3) checks name match: the bank has "KAMLA BAI W/O R. PRAJAPATI"; the booking says "Kamla Prajapati." A strict match fails; a fuzzy match passes. v3 does not say which.
- Her account has had no customer-initiated transaction for 18 months. If it has crossed 2 years it would be inoperative (F8). RBI says DBT accounts should still accept credits (F9), but EcoSure's credit may not be tagged as DBT and could bounce. Returned credits sit with the sponsor bank and the portal may show "paid" (F10).
- If it succeeds, her bank's credit SMS says `Rs 5.20 Cr to A/c XX1234 by PFMS-MPGOVT…` (illustrative). The amount is tiny (she handed over 1.3 kg; per-kg incentive on a radio is a few rupees; the feature phone may be the only "data-bearing device" earning a flat amount). Her EcoSure SMS says "incentive paid," but she cannot tell which bank SMS matches it.
- To actually see the money she must go to the branch or a bank mitra and update her passbook. That is a half-day trip for ₹5–50.
- **The "recycled" message is WhatsApp-only** (section 16.9: "Recycled | WhatsApp | Requester"). Kamla never learns her items were recycled. The trust loop never closes for the one group that most needs proof.

### 3.10 Kamla's verdict

> "TV to wahi pada hai. Radio aur phone ke ₹28 mile. Sarkar wale paise ka pata nahi. Agli baar kabadi wale ko hi de dungi, wo TV bhi le jaata."
> (The TV is still sitting there. I got ₹28 for the radio and phone. No idea about the government money. Next time I'll just give it to the kabadiwala; he'd have taken the TV too.)

The TV, the one item with 2–3 kg of lead and the whole reason for her call, was not collected. The environmental purpose of the programme failed on the highest-hazard item.

---

## 4. Ramprasad — disabled elderly man (brief)

- **Booking.** Slurred speech and partial hearing loss make both the missed-call callback and IVR hard. Shanti takes the callback but cannot read the SMS code. v3 has **no text-only booking path for deaf or speech-impaired people** on a keypad phone: WhatsApp keywords exist (section 16.9) but no inbound SMS keywords. IS 17802 / WCAG (section 21.1) cover the web app, not voice or SMS.
- **Priority.** Section 22 says "doorstep priority" for elderly and disabled people, but there is no field to record a disability or access need at booking, and no rule that actually prioritises the request in the agent queue (S2).
- **The fridge.** A 165-litre fridge needs two people, a loading vehicle, and refrigerant-safe handling. v3's agent model assumes one collector with a scale and sack. Large appliances are not addressed in C2, S3, or section 16. IMC vehicles (section 5.3) are the natural channel, but there is no rule that routes bulky items to them.
- **Payout.** Pension account works (bank details are known from pension papers). He cannot travel to update a passbook; Shanti can. Nominee is not needed.
- **Outcome (simulation):** CPU and monitor collected after two reschedules (C5 allows three). Fridge left for "gaadi ayegi"; three weeks later a kabadiwala takes it for ₹300.

## 5. Sonu — migrant labourer renting a room (brief)

- **Time.** He works 8 am–8 pm six days a week. A Sunday morning slot (C5) works, if one is available in his area.
- **Address and landlord.** The landlord does not like strangers asking for tenants. Five tenants share one address. v3's **per-address limits** (C7, section 17.4) may flag a legitimate shared room as suspicious after one or two pickups.
- **Phone number changes.** He switches SIMs when recharge offers run out. The handover code goes to the old number. v3 ties the code, the incentive, and the account to one phone number with no way to update it mid-pickup.
- **Fear.** Indore police carry out tenant verification drives (unverified for 2026). A government programme asking for his name, address, phone, and bank details, and scanning phone IMEIs that link to the Department of Telecom's stolen-phone system (section 9.6, rule 5), looks like exposure. Two of his three dead phones were bought second-hand from a market stall. He does not know their history. v3 promises data protection to **informal collectors** (section 16.6), not to citizens like Sonu, and says nothing citizen-facing about what IMEI scanning does and does not mean.
- **Value.** Three dead cheap phones, a speaker, and wires are low value; the flat per-device incentive (OQ-70) is his only real reason to bother. He will be paid into his Jharkhand bank account 1–4 days later, which works on PFMS rails nationwide.
- **What he actually does (simulation):** sells everything to the kabadiwala who passes his lane daily for ₹40 cash. If that kabadiwala is an EcoSure `informal_collector` agent (section 16.6), the material still enters the formal chain, which is a win for the programme — but Sonu never touches EcoSure and gets no incentive. This is probably the **right** outcome for Sonu, and v3 should count it as success instead of pushing him into the citizen flow.

---

## 6. Drop-off points

### 6.1 Where excluded users leave

| # | Step | What goes wrong | PRD section | Severity |
|---|------|-----------------|-------------|----------|
| D1 | Geography | Mhow and other peri-urban areas outside IMC are not in the pilot; nearest drop point is too far for bulky items | 5.6, 5.3, 7.2, 10.2 C2 | Blocking for Kamla |
| D2 | Missed-call callback | Weekends and evenings not covered; unknown number ignored as spam; no retry rule | 10.2 C1, 16.3 | High |
| D3 | IVR | 181 menus too deep; cannot capture landmark addresses; no fallback if 181 is refused | 10.2 C1, 20.2, SP-11 | High |
| D4 | Payout details | Bank/IFSC not known on the call; voucher outlet undefined; nominee has no beneficiary record | 10.2 C7, 19.3, 20.3 | High |
| D5 | Handover code | SMS lost in inbox; English; conflicts with "never share OTP"; no morning-of reminder | 10.2 C6, 16.9, 20.2 | High |
| D6 | Collector identity | Photo cannot reach a keypad phone; ID card English + QR; `SAFETY` is WhatsApp-only | 10.2 C6, 16.9, 22 | High (safety) |
| D7 | CRT and bulky items | ₹0 or negative rate; one-person collector cannot carry; agent refuses or never returns | 10.2 C7, 11.2 S3/S5, 17.2, 18.3 | High (defeats environmental goal) |
| D8 | Batteries | Swollen phone battery and leaking cells left with the citizen; no actual referral point | 2.3, 10.2 C6, 11.2 S3 | Medium (safety) |
| D9 | Dead-device wipe | Wipe steps impossible on dead devices; forced "confirmation" | 10.2 C4 | Medium |
| D10 | Bank credit | Dormant accounts, name mismatch, bounced credits, invisible tiny amounts | 17.2, 20.3 | Medium |
| D11 | Closure | "Recycled" message WhatsApp-only; no proof for voice users | 16.9, 10.2 C8 | Medium (trust) |
| D12 | Shared/changed numbers, shared addresses | Caps and per-address limits flag honest households; code goes to old SIM | 10.2 C7, 17.4, 18.2 | Medium |

### 6.2 Illustrative funnel for 100 Kamla-like households inside IMC limits

These are **judgement estimates**, not data. They exist to show where the pilot should measure, and should be replaced by week-4 manual pilot data.

| Stage | Remaining | Main reason for loss |
|-------|----------:|----------------------|
| Heard about it and gave a missed call | 100 | — |
| Reached by callback within 2 attempts | 65 | Unknown number, weekend gap, missed calls |
| Completed booking with address | 55 | Address confusion, gave up mid-call |
| Payout details captured by visit day | 30 | Bank/IFSC unknown, no follow-up |
| Collector arrived and household felt safe to proceed | 45 (of 55) | Nobody home, fear, wrong address |
| Bulky/negative-value item actually collected | 20 (of 45 with such items) | Agent economics, vehicle, weight |
| Handover code given correctly (no operator override) | 30 (of 45) | Code lost or not understood |
| Incentive visibly received by the person who handed over | 15 | Missing details, bounced credit, paid to nominee, amount invisible |

About **15 in 100** would experience the full promise (price + incentive + proof). v3's section 24 has no metric that would show this, because it does not break participation down by channel, age, gender, or disability.

---

## 7. PRD gaps (with section numbers)

1. **Persona and geography contradict each other (sections 5.6 and 7.2).** Kamla lives in Mhow; the pilot is Indore city only; Mhow is a cantonment outside IMC. Either change the persona or add a peri-urban/cantonment plan.
2. **No rule for negative-value and bulky items (sections 10.2 C7, 11.2 S3/S5, 17.2–17.4, 18.3).** The "recycler's material price on the spot" model pays ₹0 or less for CRTs, and reimburses agents by the rate card, so agents lose money collecting the most hazardous household item. No bulky-item vehicle, two-person, or IMC routing rule. No tripwire for refused/never-collected negative-value items.
3. **Callback and IVR are under-specified (sections 10.2 C1, 16.3, 20.2, SP-11).** No weekend/evening cover, no auto-acknowledgement, no retry count or timing, no caller-ID/brand name, no fallback if 181 is refused, no recognition that IVR cannot capture landmark addresses.
4. **Handover code design assumes a smartphone mindset (sections 10.2 C6, 16.2, 16.9, 19.3).** SMS only, possibly in English, sent a day ahead, with no voice reminder, no re-request by missed call, no anti-scam wording, and a manual operator override that becomes the norm for this group.
5. **Collector verification does not work on a keypad phone (sections 10.2 C6, 16.9, 22).** Photo cannot be delivered; ID card assumes reading English or scanning a QR; `SAFETY` is a WhatsApp keyword only; no "another adult present", woman collector, or neighbour-witness option.
6. **Payout for voice users is incomplete (sections 10.2 C7, 17.4, 19.3, 20.3).** No process to capture bank details after booking; voucher outlet undefined; nominee has no beneficiary/handover-person record (`CitizenIncentive` has only `user_id` and `payout_method`); no rule for name-match tolerance, dormant accounts, bounced credits, or unclaimed incentives.
7. **Closure message excluded (section 16.9).** "Recycled" goes by WhatsApp only; voice and SMS users never get proof.
8. **No assistant role (sections 8.2, 8.3, 16.2).** "Assistant" appears as an actor in the pickup state machine but is not a role in section 8.2, has no capability row in 8.3, and has no consent, audit, or anti-abuse rules. Ward office staff (`ulb_officer`) can only create ward drives.
9. **No household or shared-phone model (sections 10.2 C1, C7, 17.4).** One number = one person; per-account and per-address caps penalise shared phones and shared rooms; the woman or elder who hands over is invisible if the phone is someone else's.
10. **Battery refusals leave the hazard with the citizen (sections 2.3, 10.2 C6, 11.2 S3).** No named battery drop-off in Indore; unclear whether a device with a swollen battery is refused whole.
11. **Dead-device wipe (section 10.2 C4).** The mandatory wipe confirmation has no path for dead devices.
12. **Accessibility stops at the web app (sections 21.1, 22).** No SMS-text booking for deaf or speech-impaired users; no disability/access-need field; "doorstep priority" has no mechanism in the agent queue (11.2 S2).
13. **No inclusion metrics or pilot gates (sections 24, 25.3).** No channel, age, gender, or disability breakdown; no gate for voice/assisted share; the manual pilot (25.3) runs a missed-call number but **not IVR**, so the voice experience is untested before software.
14. **Consent and rights by voice (section 21.3).** No spoken DPDP notice, no voice consent record, no non-smartphone route for access/deletion requests.
15. **Citizen data promise (sections 9.6, 16.6).** Informal collectors get a "not used against you" promise; citizens (especially migrants handing over second-hand phones) get no plain-language statement about IMEI scanning and police/telecom requests.

---

## 8. Concrete fixes

Ordered by leverage (impact on excluded users ÷ cost). Each names the section to change.

### 8.1 Highest leverage

**Fix 1 — Negative-value and bulky-item rule (sections 10.2 C7, 11.2 S5, 17.2, 17.4, 18.3; new OQ).**
- Rate cards may list negative-value categories (CRT TVs and monitors, large appliances with refrigerant, CFL/tube lights if in scope). For these, the citizen price is **₹0 by rule, never negative**, and the agent receives a **fixed handling fee per unit** funded from recycler escrow (the recycler earns EPR certificate value on CRT processing, F3) or from producer take-back budgets (P6), not from the agent's margin.
- Bulky items (over 15 kg or over 1 m) are flagged at booking and routed to **IMC ward vehicles or a two-person agent run** on a scheduled day, never to a one-person motorcycle visit.
- Scheme incentive for negative-value hazardous categories is **per unit, not per kg** (avoids weight-padding fraud) and is at least equal to the local kabadiwala's quote.
- New tripwire: **negative-value items booked vs collected**; amber below 80%, red below 60%.

**Fix 2 — A real voice path, tested in the manual pilot (sections 10.2 C1, 16.3, 20.2, 25.3, SP-11).**
- Instant auto-SMS and short voice message after a missed call: "नगर निगम ई-कचरा सेवा: आपकी कॉल मिली, हम [day] को [time] के बीच कॉल करेंगे" (Municipal e-waste service: we got your call; we will call on [day] between [time]).
- Callback within 4 working hours **including Saturday**; at least **3 attempts at different times over 2 days**, the last one in the evening; the same fixed callback number printed on every poster so people can save it.
- IVR is **one level, maximum 4 options** (book, reschedule/status, safety, talk to person), and any booking with a new address goes to a human. If 181 is refused, a dedicated number from an empanelled telephony provider is the named fallback.
- All citizen-facing names use **Hindi and the government brand** ("नगर निगम / म.प्र. सरकार ई-कचरा सेवा"), not only "EcoSure".
- Add **IVR and callback to the manual pilot**, with a week-8 gate (see Fix 6).

**Fix 3 — Keypad-phone-safe handover and safety (sections 10.2 C6, 16.2, 16.9, 22).**
- The handover code is sent by **Hindi SMS and an automated voice call on the morning of the visit**, and can be re-sent by giving a missed call to the same number. The citizen can also give the collector a **printed code card** handed out at assisted booking.
- Every message carries the line: "यह कोड सिर्फ कचरा देने के बाद बताएं। हम कभी बैंक OTP, PIN या पैसे नहीं मांगते।" (Say this code only after handing over. We never ask for bank OTP, PIN, or money.)
- Collector verification by voice: the citizen gives a missed call to the safety number and hears the name and ID of the collector assigned to her pickup. The collector's ID card has **Hindi text and a large photo**; the collector says the **last two digits of the citizen's code** first (two-way check), so the citizen knows he is genuine before she opens the door fully.
- A **missed-call safety number** (and SMS keyword `SAFETY`) reaching a human within 15 minutes during visit windows.
- Booking options: "another adult will be present on [day]", "woman collector if available", "collect from the door only; I will bring items out" (not possible for bulky items, which go to Fix 1 routing).

### 8.2 Also important

**Fix 4 — Payout that works for voice users (sections 10.2 C7, 17.4, 19.3, 20.3).**
- Payout details can be added **after booking and up to 60 days after collection**, by missed-call callback, at the ward office, or at a bank mitra; the incentive is held (not lost) with an SMS reminder at 7 and 30 days.
- **Separate the handover person from the phone owner:** add `handover_person_name`, `beneficiary_name`, `beneficiary_relationship` to the incentive record; nominee payouts go to the person the handover person names, and the SMS says whose account was paid.
- **Define the voucher:** redeemable for cash or goods at named outlets (fair-price ration shops or bank mitras), shown on the receipt, valid 90 days.
- Tag scheme incentives as DBT credits so RBI's segregation of DBT accounts applies (F9); on a bounced credit, SMS and call the citizen with the reason in Hindi.
- Credit SMS from EcoSure states the **amount and the bank's last 4 digits**, and the collector gives a **paper receipt** with weight, price, incentive due, and a helpline number.

**Fix 5 — Assistant role and household model (sections 8.2, 8.3, 10.2 C1, 17.4).**
- Add an `assistant` capability for ward office staff, anganwadi workers, fair-price shop owners, and agents: create a pickup for a person who is present or confirms by phone, record the assistant, the beneficiary, and a voice/OTP/thumb consent. Assistants cannot receive incentives for pickups they create; per-assistant volume feeds fraud monitoring.
- Up to 4 household members per phone number and up to 6 per address, with caps applied per member; anomaly rules flag only above that.

**Fix 6 — Measure exclusion so the pilot cannot hide it (sections 24.2, 25.3).**
- Report monthly by channel (WhatsApp, web, missed call, IVR, assisted), by age band (60+), gender of handover person, and access-need flag: booking-to-collection completion, code success without override, incentive received, and safety reports.
- Manual pilot week-8 gate: **at least 15% of pickups via voice or assisted channels**, and completion for those channels within 15 points of WhatsApp. If not, fix and repeat, as with other gates.

**Fix 7 — Close the loop for everyone (section 16.9).** "Recycled" message by SMS and optional voice call, in Hindi, with the attestation number read out digit by digit.

**Fix 8 — Batteries and dead devices (sections 10.2 C4, C6, 11.2 S3).**
- A device with a swollen or damaged removable battery is **collected without the battery**; the collector bags the battery in a fire-safe pouch and takes it to a **named battery collection point** agreed with a Battery Waste Management Rules channel before launch. Leaking loose cells are taken the same way. The citizen is never left holding a hazard the collector has identified.
- Dead devices: the wipe step becomes "SIM and memory card removed and handed back to you in front of you; data destroyed at the recycler", with that confirmation logged.

**Fix 9 — Accessibility beyond the web app (sections 21.1, 22, 11.2 S2).** Inbound **SMS keywords** in Hindi and English (`BOOK`, `STATUS`, `SAFETY`) for deaf and speech-impaired users; an access-need field at booking that moves the request to the front of the agent queue and flags two-person/vehicle collection.

**Fix 10 — Peri-urban and cantonment plan (sections 5.6, 7.2, 29.3).** Either change Kamla's persona to a peri-urban IMC ward, or add an MoU with the Mhow Cantonment Board and nearby nagar parishads as a phase 1b expansion with **monthly camp days** (as `20-citizen-tier3.md` P4 recommended) instead of doorstep visits.

**Fix 11 — Citizen data promise (sections 9.6, 21.3).** A spoken and printed plain-Hindi statement: what IMEI scanning is for, that EcoSure does not share citizen data with police except through the lawful request process, and that handing over a second-hand phone is not an offence. Spoken DPDP notice and recorded voice consent for voice bookings; deletion requests by phone or at the ward office.

**Fix 12 — Count the informal route as success for some users (sections 16.6, 24.1).** For low-value, small items from people like Sonu, selling to an EcoSure-enrolled kabadiwala is the best path. Count it in consumer participation (as "households reached via informal agents") instead of treating the citizen flow as the only win.

---

## 9. Score

**4 / 10 for how well v3 works for excluded users in real life.**

| | |
|---|---|
| **Credit (+)** | v3 accepted almost every inclusion finding in principle: missed call, IVR, assisted booking, bank/voucher/nominee payout, collector name and ID, masked calls, a handover code, a safety keyword, doorstep priority for elderly and disabled people, Hindi by default, and cash or UPI at the door. The material price at the door means Kamla gets *something* on the spot, which v2 never offered. On paper this is a large improvement on v2's 3/10. |
| **Deductions (−)** | The PRD's own no-smartphone persona lives outside the pilot area. The highest-hazard household item (the CRT TV) has a zero or negative price and no collection rule, so agents will not take it. The voice channel has no retry, weekend, or fallback rules and is not tested in the manual pilot. The handover code, collector photo, safety keyword, and "recycled" message all silently assume a smartphone or WhatsApp. Payout details for voice users have no follow-up process; nominee payouts lose track of who handed over. There is no assistant role, no household model, no battery drop-off, no dead-device rule, and no inclusion metric, so all of this would stay invisible in pilot results. |
| **On paper vs real life** | Scored on paper (does the PRD mention the channel?), v3 would be about 6.5/10. Walking a real user through it drops that to 4, because the channels exist as nouns but not as working procedures. |
| **With fixes** | Fixes 1–6 would lift this to about **7 / 10**. Most are process and data-model changes (callback rules, voice reminders, a beneficiary field, a handling fee, an assistant role, a few metrics), not new technology. The rest depends on field testing with real elderly and non-smartphone users in the manual pilot, which no desk simulation can replace. |

---

## 10. What to test in the manual pilot (week 1–8)

1. Run 30 missed-call bookings from households with no smartphone (recruit through anganwadis and ration shops). Measure callback reach rate by attempt number and time of day.
2. Record 10 IVR sessions with people over 55 before building anything; count wrong-key presses and hang-ups.
3. Book 10 CRT TVs and 5 fridges; record what agents actually do and what it costs.
4. Measure handover-code success without operator override, split by smartphone vs keypad phone.
5. Track 30 bank-account payouts to Jan Dhan accounts end to end, including bounced credits and whether the person who handed over saw the money.
6. Interview 10 women who were alone at home during the visit about how safe they felt and what would have helped.
