# v3 real-life simulation 01 — Citizen: Priya, Vijay Nagar, Indore

**Simulation type:** Persona diary (4 weeks), run against the v3 PRD exactly as written  
**PRD reviewed:** [`../../prd/v3-PRD.md`](../../prd/v3-PRD.md) (all sections)  
**Prior research used:** [`../v2-deep/00-synthesis.md`](../v2-deep/00-synthesis.md), [`../v2-deep/19-citizen-indore.md`](../v2-deep/19-citizen-indore.md)  
**Date:** 2026-09-27  
**Question:** Does v3 work, in real life, for an ordinary urban household in the pilot city?

> **How to read this.** The diary is a simulation. Priya is fictional, but every friction point is either (a) something the PRD specifies, (b) a documented Indian reality found in research, or (c) a reasonable assumption, marked **(assumption)**. Prices and facts from the web are marked **verified**, **listing** (a commercial price list, not a street price), or **UNVERIFIED**. EcoSure prices use the PRD's own illustrative numbers from section 17.3 because the real rate card and incentive amounts are still open (OQ-70).

---

## 1. Who Priya is

| Item | Detail |
|------|--------|
| Age, work | 38, Hindi and English teacher at a private school, Monday–Saturday until 2 pm |
| Home | 2BHK flat in a gated society in Vijay Nagar (Scheme 54 area). Guard at the gate; society uses a visitor-approval app **(assumption: MyGate or similar, common in Indore societies)** |
| Family | Husband Anil (sales job, sceptical of "sarkari apps"), son 12, mother-in-law |
| Phone | Mid-range Android, Jio SIM. Uses WhatsApp daily, PhonePe for everything, YouTube for "how to" videos |
| Language | Reads Hindi and English; prefers Hindi for anything official-sounding |
| The pile | (1) Redmi Note 7 (2019): cracked screen, still works. (2) Samsung Galaxy J7 (2016): dead, will not switch on. (3) HP laptop (2015): works but very slow, battery dead, has family photos on it. (4) Mixer-grinder: motor burnt. (5) A bag of tangled chargers, earphones, and cables |

---

## 2. Reality check: what her options pay (researched)

| Option | What it would pay Priya for her pile | Source and status |
|--------|---------------------------------------|-------------------|
| Neighbourhood kabadiwala | Mixed e-waste about ₹15/kg; laptop about ₹150 a piece; dead phone ₹30–60; cash immediately, no questions | Indore online kabadi list with a Vijay Nagar address: e-waste ₹15/kg, laptop ₹150/pc (**listing**, thekabadiwala.com/scrap-rates/Indore). Dead phone ₹30–60 (**listing**, Hyderabad, from v2 agent 19). Indore street price **UNVERIFIED** |
| Scrap index | Indore mixed e-waste ₹41.40/kg (wholesale, what dealers get, not households) | scraprates.in/indore, Sept 2026 (**listing**, method unclear) |
| Cashify / Cashkr | Working older phones and laptops: hundreds to a few thousand rupees after home inspection; dead phones "much less"; instant payment; free pickup. Cashkr names Vijay Nagar as a pickup area and pays to UPI the same day | cashify.in, cashkr.com (**verified that the service exists**; exact quotes for her models **UNVERIFIED**, quotes below are simulated). A Reddit user sold a 10-year-old working laptop for ₹7,000 after a ₹8,000 online quote (anecdote) |
| Brand / e-commerce exchange | Discount on a new phone only if she buys one now; value decided at delivery | General knowledge; amounts **UNVERIFIED** |
| OLX | Possibly more for the working Redmi, but strangers at the door, haggling, no-shows | General knowledge |
| IMC (city) | Free: e-waste is one of Indore's six segregated waste streams collected by door-to-door garbage vehicles; drop boxes during the Swachhotsav drive (17 Sept–2 Oct) | TOI (May 2024) and Indian Masterminds (Swachhotsav) (**verified news**; current vehicle practice for household e-waste **UNVERIFIED**) |
| EcoSure v3 (PRD numbers) | Material price at the door (PRD example: phones ₹60 each, small appliances ₹25/kg) + scheme incentive in the next treasury batch (PRD example: ₹50 per data-bearing device) + possible producer top-up (₹30 per phone, only if that brand signed a take-back programme) | v3-PRD section 17.3 (illustrative) |

**Key fact found:** the state treasury route (PFMS) pays citizens by **bank account and IFSC, or Aadhaar-linked bank account (APBS)** — not to a UPI ID. Payments are validated against the bank before registration. Source: PFMS DBT FAQ and DBT Mission SOP (**verified**, pfms.nic.in, dbtbharat.gov.in). v3 section 10.2 C7 lists "UPI" as an incentive payout option; on the treasury rail this is at best an account lookup behind the scenes and cannot be assumed.

---

## 3. The diary

Simulated dates: Sunday 4 October to Saturday 31 October 2026 (Diwali is 8 November 2026, so this is the Diwali-cleaning month). The pilot is assumed to be live in software (phase 1a) in her ward.

### Week 1 — Discovering it

**Sun 4 Oct.** Saas started the Diwali "safai" early. The steel almirah top shelf is a graveyard: two phones, the old laptop, the mixer, a bag of wires. Anil says, "Kabadi ko de do, khatam." I said the phones have our photos and bank SMS. He said, "Toh hathoda maar do." Very helpful.

**Mon 5 Oct.** School parents' WhatsApp group: someone forwarded an IMC poster, "EcoSure — apna e-waste sahi jagah do, ghar par daam + sarkari protsahan." It has a gov.in link, a WhatsApp number, and a missed-call number. The gov.in part made me take it slightly seriously. Also slightly worried: government apps mean forms. **(PRD 10.2 C11, 22; 5.5 gov.in domain)**

**Tue 6 Oct.** After school I opened the link. Hindi by default — good. Consent notice in Hindi, two screens. I read half. Asked for my mobile number. OTP by SMS did not come for about 3 minutes (Jio, evening). Tapped "resend" after 30 seconds, nothing. Then chose "WhatsApp par OTP" and it came in 5 seconds. Honestly, I would have closed it if the WhatsApp option was not there. **(C1: SMS default, WhatsApp alternative, resend after 30 s — worked as designed, but the SMS default is the weaker channel for her)**

Booking asked "kya dena hai" with pictures: Mobile phone (2), Laptop (1), Chhota upkaran/mixer (1), Taar aur charger (1 bag). No model numbers needed. Nice. It asked society, wing, flat, landmark, pincode — familiar, like Swiggy. It asked if I want to "claim" devices by typing IMEI. I skipped it: why does the government need my phone's IMEI? **(C2 worked well; C3/PP2 claim creates suspicion with no explanation of hashing)**

What I did **not** see anywhere: **how much I will get**. The page says "daam + protsahan" but no number. Swiggy tells me the price before I order. **(Gap: C2 has no price estimate; incentive amounts are still OQ-70)**

**Wed 7 Oct.** Checked Cashify out of curiosity. Redmi Note 7 with cracked screen, working: quote around ₹1,100 **(simulated)**. Samsung J7, dead: a small number, maybe ₹150–250 **(simulated)**. HP laptop: "working, battery dead": around ₹3,000 **(simulated; real quotes vary widely)**. So my "junk" is worth ₹4,000+ to Cashify but EcoSure has not told me anything.

Anil at dinner: "Sarkar ₹60 dega phone ka, Cashify ₹1,100. Aur IMEI maang rahe hain — track karenge." Mother-in-law: "Kabadi wala Guddu bhaiya aata hai Thursday ko."

**Decision (the first real drop-off):** I will sell the Redmi on Cashify. The laptop I'm confused about — ₹3,000 is tempting, but the Cashify man will switch it on and look inside, and our photos are on it. I'll give the dead J7, the mixer, the wires, and maybe the laptop to EcoSure. **(Gap: v3 treats every device as scrap; reuse/resale is phase 2 — 9.5 PP7. A working phone and laptop exit the formal chain at the booking screen)**

**Thu 8 Oct.** Guddu the kabadiwala knocked at 11 am (I was at school; Saas called me). He offered ₹300 for "sab kuch" including the laptop, cash right now. Saas said wait. I told her to hold. I'm annoyed: ₹300 cash now vs a government promise with no number. **(Section 2.2 "cash beats paperwork", in person)**

Evening: EcoSure WhatsApp: "Aapki request sweekar ki gayi." Then: "Samay chunein" — slots. Weekend morning slot Saturday 10 Oct, 10–12. I booked. It asked how I want the *protsahan*: UPI, bank, voucher, nominee. I chose UPI and typed my PhonePe UPI ID. **(C5 weekend slots — good; C7 payout choice — see payout issue below)**

**Fri 9 Oct.** SMS + WhatsApp: collector name "Imran Khan", photo, ID number, masked number, and a 4-digit code "only give after weighing and payment". Photo helps. Saas feels better seeing a face and an ID. Anil: "Theek hai, par code-shode sab drama hai." **(C6 worked — genuine delight for the women at home)**

Night: I searched YouTube for "HP laptop factory reset". Started the reset at 10 pm. Finished at 1:15 am. The J7 won't turn on, so I cannot reset it. I removed the SIM tray with a safety pin — no SIM, but there's a memory card; took it out.

### Week 2 — The handover

**Sat 10 Oct, 9:40 am.** Opened the wipe checklist. Laptop: ticked "done". Mixer and wires: no checklist (good). J7: "back up, sign out, factory reset". The phone is dead. Options are "maine kar diya" or "collector madad karega". Neither is true. Collector can't reset a dead phone either. I ticked "collector madad karega" because it was the only way forward. I don't feel safe; the screen is dead but the phone memory is not. **(Gap: C4 has no path for devices that won't power on; the item cannot be collected without confirmation, so she is pushed into a false confirmation)**

**10:55 am.** Nobody. WhatsApp said "on the way" at 10:05. No ETA, no map. I have to take my son to tuition at 12:30. Anil: "Dekha? Sarkari." **(Gap: C8 has "on the way" but no ETA or late alert; no collector lateness rule)**

**11:20 am.** Guard calls on intercom: "Koi Imran aaya hai, kachra wala bol raha hai." The society app wanted me to approve a visitor; I didn't know his exact name spelling, so the guard rang instead. I sent `GATE` on WhatsApp — it alerts the collector, not the guard, so it did nothing useful. I told the guard myself. **(Gap: C5 `GATE` keyword alerts only the collector; no gate pass for the guard or visitor-app pre-approval)**

**11:30 am.** Imran is polite, has an ID card on a lanyard and a digital scale. He apologised: traffic at Vijay Nagar square and a pickup before mine took longer. He checked each item for a swollen battery; the J7 battery looked fine. He scanned the J7's IMEI sticker under the battery cover — I had to show him how to open it. Laptop serial scanned from the bottom. **(S3 battery check and PP3 legacy scan — worked, took about 8 minutes)**

About the laptop: I asked, "Can you take the hard disk out and give it to me?" He said he isn't allowed to open anything — "sirf poora saaman leta hoon" — and if I want the disk I must remove it myself before, and then it's "tuta hua" and might not count. I already reset it, so I let it go, but I wasn't happy. **(Gap: 5.2/11.1 "intact items only" is correct for agents, but v3 never says whether a citizen may remove her own hard disk, SIM, or SD card, or how that changes price or incentive)**

Weighing (my numbers, simulated): J7 0.17 kg, laptop 2.2 kg, mixer 1.8 kg, wires 0.6 kg.

Price at the door according to the rate card on his phone (using PRD 17.3 illustrative rates plus assumed laptop rate):

| Item | Rate (illustrative) | Price |
|------|--------------------|-------|
| Samsung J7 (dead) | ₹60 per phone | ₹60 |
| HP laptop | ₹200 per laptop **(assumption; not in PRD example)** | ₹200 |
| Mixer | ₹25/kg × 1.8 kg | ₹45 |
| Wires and chargers | ₹25/kg × 0.6 kg **(assumption: same small-item rate)** | ₹15 |
| **Total paid at door** | | **₹320** |

He sent ₹320 by UPI from his phone. PhonePe "ting" in 20 seconds. Only then did I tell him the 4-digit code. He typed it; it worked first try. He gave me a WhatsApp receipt naming the recycler, the agent, the weights, and the amount. That receipt looked proper — better than anything Guddu ever gives. **(C6, C7, S3 — this moment is the best part of v3)**

His phone said "Protsahan: ₹100 (2 data-bearing items), 1–4 kaam ke din mein." I asked, "Monday ko?" He said, "Madam, sarkari batch hai, 4-5 din."

So: EcoSure ₹320 now + ₹100 later = ₹420, versus Guddu's ₹300 now. The ₹100 is what makes EcoSure better — and it hasn't arrived yet.

**Total time spent by me so far:** about 30 minutes booking and reading, 3 hours laptop reset, 90 minutes waiting on Saturday, 20 minutes at the door.

**Sat 10 Oct, 2 pm.** Cashify man came for the Redmi (booked Wednesday). Checked screen, IMEI, camera; cut the quote to ₹900 because of the crack. Paid ₹900 by UPI on the spot. He also wiped it in front of me with their app. **(Comparison: Cashify's wipe-in-front-of-you is exactly the reassurance v3's checklist lacks for the dead phone)**

**Mon 12 Oct.** Nothing. Expected (weekend).

**Wed 14 Oct.** SMS: "Aapka protsahan bhugtan rok diya gaya hai. Bank khata vivaran chahiye." It turns out the incentive can't go to my UPI ID; they need my bank account number and IFSC, and the name must match the bank. Filled the form. My EcoSure name is "Priya Sharma"; the bank has "Priya A. Sharma". **(Gap: C7 promises UPI; the treasury route pays bank accounts or Aadhaar-linked accounts. First-time account validation adds days. PRD screen state "payout held" exists (10.3) but the reason is design-induced)**

Anil: "Maine kaha tha na."

**Thu 15 Oct.** Sent `STATUS`. Reply: "Aapka pickup collected hai. Protsahan: held." Nothing about why or when. Sent `HELP`. Auto-reply: "Hum 2 kaam ke din mein sampark karenge." **(Support SLA 21.4: 2 working days for payment issues — technically met, emotionally slow)**

### Week 3 — Waiting for the money

**Sat 17 Oct.** Operator called at 5:10 pm (while I was cooking). Polite. Said the name mismatch is fine after "account validation"; payment will go "in the next batch". I asked, "Kab?" — "Ma'am, 1 se 4 working day."

**Mon 19 – Tue 20 Oct.** Dussehra (20 Oct, holiday in MP **(assumption on exact holiday date)**). Nothing moves.

**Thu 22 Oct.** SMS: "₹100 aapke khate mein jama." 12 days after handover. I actually felt happy, then annoyed that ₹100 needed this much chasing. In the parents' group, someone asked, "Did the sarkari e-waste thing pay?" I wrote: "Haan, ghar par ₹320 turant, ₹100 baad mein aaya — 12 din lage, bank details dena padta hai, UPI nahi chalta. Collector achha tha." Two mothers replied "bank details?? no thanks". One said she'd try because of the receipt.

**Sat 24 Oct.** Mother's house in Rajendra Nagar has an old CRT TV and a dead inverter battery. I tried to book for her address from my account. The app accepted the TV but refused the inverter battery ("alag battery nahi le sakte", with a referral message to a battery channel I've never heard of). Fair, but now I need a second solution for the battery anyway — the kabadi will take both. **(2.3 and 10.2 C6: loose batteries correctly out of scope, but the referral is a dead end for a citizen)**

### Week 4 — Did it get recycled?

**Tue 27 Oct.** The J7 still worries me. Opened the EcoSure page: "Collected. Recycler par pahuncha: —. Recycle hua: —." No date. **(PP5 shows status; C8 has no "reached recycler" message; no expected time)**

**Sat 31 Oct.** Still no "recycled" message. I don't know if it will come in a week or three months. Anil's theory: "Imran ne kabadi ko bech diya hoga." I can't prove him wrong. The PRD says the lot must reach the recycler within its storage limit (up to 180 days) and the "recycled" message comes only after attestation **(S4, 16.3 step 10)** — so for a small agent, weeks to months is realistic.

**End-of-month reflection.** I got ₹420 for things Guddu would have bought for ₹300, plus a proper receipt, plus I didn't have to face a stranger alone thanks to the photo and ID. But the working phone went to Cashify because EcoSure never told me a price or offered resale, the dead phone's data still bothers me, the collector was 80 minutes late, the guard didn't know about him, and the ₹100 took 12 days and a bank form. I'd use it again for dead stuff before Diwali. I'd tell friends "it works, but give bank details up front and don't expect the ₹100 quickly."

---

## 4. Moments of delight

1. **WhatsApp OTP fallback** saved the sign-up when SMS lagged (C1).
2. **Booking by picture and count**, no model numbers (C2).
3. **Collector's name, photo, and ID before the visit** — the single biggest trust builder for the women in the house (C6, 22).
4. **Money at the door by UPI before giving the code** — matched the kabadiwala's speed and beat his amount (C7, 17.2 rail A).
5. **A receipt naming a licensed recycler** — the first "proper" paper she has ever had for scrap (C7, R8).
6. **Battery check and refusal explained**, rather than a confused argument (S3).
7. **The incentive SMS finally arriving** — real money from the government for doing the right thing (C7, 16.9).

## 5. Moments of drop-off (where a real Priya is most likely to quit)

Estimated share of "Priya-like" households lost at each step (**judgement estimates, not measured**):

| # | Step | What happens | Est. loss | PRD section |
|---|------|--------------|----------:|-------------|
| 1 | Seeing the offer | No price shown; kabadiwala quotes a number at the door | 25% | 10.2 C2, OQ-70 |
| 2 | Working devices | Working phone/laptop sold to Cashify/OLX/exchange instead | 30–50% of working devices (not households) | 9.5 PP7 (phase 2), 6.2 |
| 3 | IMEI claim prompt | "Government wants my IMEI" suspicion (husband/family veto) | 5–10% | 10.2 C3, 9.5 PP2, 21.3 |
| 4 | Kabadiwala knocks first | Same-day cash, no waiting | 15% of remaining | 2.2, 27.2 |
| 5 | Wipe checklist on dead phone | Forced false confirmation or abandons the phone item | 10% | 10.2 C4 |
| 6 | Collector late / guard blocks | Leaves for errands, no-show recorded | 10% | 10.2 C5, C8 |
| 7 | Incentive held for bank details | Never completes the bank form; ₹ forfeited; tells friends it "doesn't pay" | 20% of those owed | 10.2 C7, 17.2, 20.3 |
| 8 | No "recycled" message for weeks | Distrust; lower repeat and recommendation | Affects repeat, not first use | 10.2 C8, 16.3, 11.2 S4 |

---

## 6. Would she use it again? Would she recommend it?

| Question | Probability | Why |
|----------|------------:|-----|
| Uses EcoSure again within 12 months for dead/low-value items | **~55%** | Price at door beat the kabadiwala; receipt and collector ID were good; next time bank details are already on file |
| Uses EcoSure for a *working* phone or laptop | **~15%** | Cashify and exchange offers pay 5–15× more; v3 has no resale route |
| Recommends it to a friend or the parents' group | **~40%** | Recommends with caveats ("give bank details, ₹100 takes ~2 weeks, keep working phones for Cashify") |
| Recommends it enthusiastically | **~15%** | Only if the incentive arrives within 2–3 days and the "recycled" message arrives within a month |

---

## 7. PRD gaps found (with v3 section numbers)

| # | Gap | What the PRD says | What real life does | Section |
|---|-----|-------------------|---------------------|---------|
| G1 | **No price or incentive estimate at booking** | Price is paid at the door; incentive amounts open | Citizens compare numbers before committing; the kabadiwala and Cashify both quote first | 10.2 C2, C7; 29.2 OQ-70 |
| G2 | **Working devices have no reuse path in phase 1** | Refurbishment and retail events are phase 2 | Working phones/laptops (the highest-value, most data-sensitive items) leave for Cashify, Cashkr, OLX, exchange. EcoSure receives mostly dead devices and appliances, lowering passport coverage and per-kg value | 9.5 PP7; 25.7; 18.2 "cherry-picking" (considered only for agents, not citizens) |
| G3 | **Incentive payout via UPI is not how the treasury pays** | "Payout options: UPI, bank, voucher, nominee"; "next daily treasury batch (1–4 working days)" | PFMS/DBT pays validated bank accounts (account + IFSC) or Aadhaar-linked accounts; UPI IDs are not a payment instrument there; first-time validation and name matching add days | 10.2 C7; 17.2 rail B; 20.3 |
| G4 | **"1–4 working days" is ambiguous and conflicts with the tripwire** | C7 says 1–4 working days; the tripwire flags amber above a 24-hour median | A Saturday handover plus a holiday becomes 6–12 calendar days; the citizen hears "4 days" and experiences 2 weeks | 10.2 C7; 16.3 step 9; 18.3; 24.2 |
| G5 | **Wipe checklist has no path for dead devices** | Data-bearing item cannot be collected without confirmation; "collector assisted" option | Dead phones cannot be reset by anyone at the door; the citizen is forced into a false tick; no data-destruction assurance from the recycler | 10.2 C4; 16.2 `collected` gate |
| G6 | **Citizen removal of storage not defined** | Agents handle intact items only | Many people want to keep a laptop hard disk, SIM, or SD card; the PRD doesn't say whether a citizen may remove them, or whether the item still counts and earns the incentive | 5.2; 11.2 S3; 11.3 |
| G7 | **No ETA, lateness rule, or collector no-show SLA** | "On the way" message; citizen's first failed visit has no penalty | Collectors run late in traffic; citizens leave; no rule for collector-caused failure or priority rebooking | 10.2 C5, C8; 16.9 |
| G8 | **Gate handling reaches the collector, not the guard** | `GATE` keyword alerts the collector; address includes gate details | The guard (or society visitor app) is the blocker; he needs the collector's name and a pass | 10.2 C5; 3.2 field research |
| G9 | **No "reached recycler" message and no expected "recycled" date** | Messages at collected, incentive paid, and recycled (after attestation) | Lots may wait weeks (storage limit up to 180 days); silence breeds the "he sold it to the kabadi" story | 10.2 C8; 9.5 PP5; 11.2 S4; 16.3 |
| G10 | **Device claim prompt creates distrust** | Optional IMEI/serial claim; identifiers hashed | The prompt appears with no plain explanation of why, or that only a scrambled version is stored | 10.2 C3; 9.3; 9.5 PP2; 21.3 |
| G11 | **Household member handover not covered** | Code goes to the requester's phone | Often the requester is at work and a spouse or parent is home; they don't have the code | 10.2 C6; 19.3 HandoverCode |
| G12 | **Loose battery referral is a dead end** | Refused with a referral message | The citizen has no known battery channel; the kabadiwala takes everything, so the whole bundle goes informal | 2.3; 10.2 C6 |
| G13 | **The headline promise depends on producer money that may not exist** | Worked example totals ₹300 "more than a kabadiwala", including a ₹60 producer top-up | Top-ups are phase 1b and gated on letters of intent; without them the margin over the kabadiwala is just the incentive | 17.3; 13.3 P6; 25.6 |
| G14 | **No door-side dispute path for the citizen** | Disputes defined for agent–recycler weight, and "payment within 7 days of being marked paid" | If the collector pays less than the rate card, or says "UPI pending, give code first", the citizen has no button or rule | 10.2 C6; 11.2 S8; 17.4 |

---

## 8. Concrete fixes

Ranked by how much they change Priya's outcome for the least effort.

1. **Show the money up front (fixes G1, G13).** At booking, show an estimate built from the recycler's current rate card and the scheme incentive: "Aapko lagbhag ₹280–340 ghar par + ₹100 protsahan (bank mein, lagbhag [date])". Show producer top-ups only when a funded programme exists. Add to C2 and C8; make OQ-70 a Stage −1 decision, not "pilot week 1".
2. **Make the incentive rail honest and fast (fixes G3, G4).** Collect and validate bank account + IFSC (or Aadhaar-linked account, never mandatory) *at booking*, with a penny-drop or PFMS account check before the visit, so the first payout is never held. Drop "UPI" from the treasury rail wording. Show a calendar date, not "working days". For the manual pilot, ask the sponsor to fund incentives through an escrow rail (producer or recycler-administered) that can pay same-day, and measure the difference.
3. **Add a "does it still work?" fork (fixes G2).** At booking, if a phone or laptop works, say so honestly: offer a partnered refurbisher or registered buyback route (pull a thin slice of PP7 into phase 1a), or tell the citizen plainly "working devices may fetch more on resale; we take dead ones". Count routed-to-reuse devices as a circularity outcome instead of a loss.
4. **Data safety for devices that won't switch on (fixes G5, G6).** Add a wipe state `cannot_power_on` that is allowed, sealed separately, and flagged for **recorded data destruction at the recycler**, stated on the attestation. Explicitly allow the citizen (not the agent) to remove SIM, memory card, and laptop hard disk before handover, with the rate card showing the price difference. Short Hindi video: "phone band hai? koi baat nahi."
5. **Door logistics (fixes G7, G8, G11).** Live ETA and an automatic "late by 20+ minutes" message with one-tap rebook or "wait". Collector-caused no-shows count against the agent and trigger priority rebooking. Send a shareable gate pass (collector name, photo, vehicle, time window) the citizen can forward to the guard or paste into the society visitor app. Let the requester forward the handover code to a household member, logged.
6. **Close the loop sooner (fixes G9).** Add a "pahuncha recycler par" (reached recycler) WhatsApp message with date, and show an expected "recycled by" month on the status page. If the lot is still with the agent after 30 days, tell the citizen and flag the agent.
7. **Explain the claim (fixes G10).** One Hindi line under the IMEI prompt: "Hum IMEI ko code mein badal kar rakhte hain; poora number kabhi save nahi hota. Isse aapka phone dobara galat tareeke se nahi bik sakta." Make the claim optional and after booking, not before.
8. **Door-side dispute and battery hand-off (fixes G12, G14).** A "payment galat hai" button before the code is shared, and a rule: never share the code until money shows in your app. For loose batteries, name a real local channel (IMC point or battery producer take-back) with an address, or arrange for the same agent to carry it under the battery rules if a registered battery recycler partners.

---

## 9. Score

**5.5 / 10 — how well v3 works for Priya in real life.**

- **What works (+):** Hindi WhatsApp booking, category-and-count, weekend slots, collector identity and photo, battery check, money at the door before the code, a receipt naming a licensed recycler, and a real (if slow) government incentive. On dead devices and small appliances, v3 genuinely beats the kabadiwala on price, safety, and paperwork.
- **What doesn't (−):** No price shown before commitment; working devices — the most valuable and most data-sensitive items — have no reason to go to EcoSure; the treasury incentive rail is mis-described (UPI) and in practice took 12 days and a bank form; the wipe step breaks on dead phones; door logistics (late collector, guard) are only half-designed; and the "recycled" message may not arrive for months.
- **With fixes 1–4 applied,** the estimated score rises to about **7.5 / 10** for this stakeholder, because the three biggest drop-offs (no number, slow/held incentive, working devices leaking) shrink.

**Verdict:** v3 wins Priya's dead phone and broken mixer, but loses her working phone to Cashify and nearly loses her trust over a ₹100 incentive that needed a bank form and 12 days.
