# 33 — Inclusion and doorstep safety: who EcoSure PRD v2 leaves out, and how to bring them in

**Agent:** 33 of 36 (v2 deep-research swarm)
**Date:** 2026-09-27
**PRD files reviewed:** `docs/prd/04-consumer.md`, `docs/prd/12-nfr-security.md`, `docs/prd/05-local-recycle-shop.md` (collector identity), grep across all PRD files for assisted, voice, IVR, cash, masking and women terms. Read with `docs/research/v2-deep/05-gigw-accessibility-language.md`.
**Angle:** Who is excluded by a WhatsApp-first, phone-OTP, UPI-paid citizen flow (feature-phone users, women on shared or no phones, elderly, visually impaired, people without UPI), how to include them (IVR / missed call, assisted booking at shop, anganwadi or ward office, non-UPI payout, voice notes), and the safety of women receiving collectors at home.

**Verdict:** v2 is designed for one person: a literate adult who owns a smartphone, has WhatsApp and a UPI ID in their own name, and is comfortable letting a stranger into the home. In Madhya Pradesh that describes well under half of adult women and a minority of people over 60. Every citizen journey step (C1 sign-in, C2 booking, C4 reschedule, C5 status, C6 payout) depends on the same smartphone + WhatsApp + UPI stack, and there is no assisted, voice or non-UPI path. Doorstep safety is not addressed at all: no collector identity check, no number masking, no handover code, no safety escalation. **Score: 3 / 10.**

---

## 1. Sources

Items marked **UNVERIFIED** come from secondary, commercial or news sources, or are figures I could not confirm on a primary government or survey page.

| # | Source | URL | Used for |
|---|--------|-----|----------|
| S1 | NFHS-6 (2023-24) national and state fact sheets, IIPS | http://www.nfhsiips.in/nfhsnew/nfhsuser/assets/National%20Family%20Health%20Survey%20(NFHS-6)%202023-2024%20Fact%20Sheets.pdf | MP women (15–49) with a mobile phone they themselves use: **48.5%** (urban 69.2%, rural 40.6%); NFHS-5 was 38.5%. India: 63.6%. MP women with a bank account they use: 92.1% |
| S2 | NFHS-6 MP state compendium (hosted by a news site) | https://lalluram.com/wp-content/uploads/2026/08/NFHS-6_StateFact_Madhya-Pradesh__Madhya-Pradesh_compendium.pdf | Same MP row as S1 (cross-check). Host is secondary, figures match S1 |
| S3 | NFHS-5 (2019-21) MP fact sheet (OpenCity copy) | https://data.opencity.in/dataset/ae734771-4981-4031-ac38-7c056aa2c0f0/resource/ba0c9fff-8a43-4af5-9c74-1eb09180e874/download/ee4f53f3-d694-40bf-8c9c-8139e93c6318.pdf | NFHS-5 MP: 38.5% (urban 58.8%, rural 31.4%) — lowest of all states and UTs |
| S4 | PMC ecological analysis of NFHS-5 | https://pmc.ncbi.nlm.nih.gov/articles/PMC13390612/ | Confirms MP was the lowest state (38.5%) vs Goa 91.2% |
| S5 | Down To Earth — NFHS-5 women's empowerment | https://www.downtoearth.org.in/economy/what-does-nfhs-5-data-tell-us-about-state-of-women-empowerment-in-india-80920 | MP, Chhattisgarh, UP, Gujarat at the bottom for women's phone access |
| S6 | Swadesh News — NFHS-6 MP rural–urban gap | https://www.swadeshnews.in/pradesh/mp-rural-urban-health-gap-nfhs6-report/211492 | **UNVERIFIED / likely wrong**: quotes 90.3% urban and 78.2% rural for MP women's phones. Those numbers match the **Maharashtra** row in S1, not MP. Do not cite |
| S7 | The Sootr — NFHS MP report (Hindi) | https://thesootr.com/state/madhya-pradesh/nfhs-madhya-pradesh-report-women-bank-account-mobile-11892269 | 48.5% own phone vs 92% bank account; notes dependence on male relatives for digital access (**UNVERIFIED** interpretation) |
| S8 | GSMA Mobile Gender Gap Report 2025 (PDF) | https://www.gsma.com/wp-content/uploads/2025/12/The-Mobile-Gender-Gap-Report-2025.pdf | India smartphone-ownership gender gap widened from **32% (2023) to 39% (2024)**; 13% of Indian women smartphone owners don't use mobile internet, two-thirds unaware of it |
| S9 | GSMA press release, 14 May 2025 | https://www.gsma.com/newsroom/press-release/progress-closing-the-mobile-internet-gender-gap-stalls-in-lmics-gsma-mobile-gender-gap-report-2025/ | South Asia mobile-internet gender gap 32%; handset cost 24% of women's monthly income vs 12% of men's (LMIC); literacy/digital skills a top barrier |
| S10 | IAMAI–Kantar "Internet in India 2024" press note | https://www.indiadigitalsummit.in/wp-content/uploads/2025/01/Led-by-Surge-in-Indic-Language-Adoption.pdf | 886 M active users; 47% women; **58% of rural shared-device users are women**; Indic-language driven growth |
| S11 | Factly — NSS 80th round CMS: Telecom (May 2025) | https://factly.in/data-while-telephone-ownership-reaches-near-100-slow-improvement-in-other-abilities/ | Households: 59.2% smartphone only, **9.7% non-smartphone only (12.3% rural)**, 26.2% both; 43.5% of 15+ can send email |
| S12 | ThePrint — Dey & Paul (2026) on CMS:T 2025, older adults | https://theprint.in/opinion/from-aadhaar-to-upi-how-indias-digital-rails-can-include-not-exclude-older-adults/3053392/ | **More than half of people 60+ rely exclusively or partly on basic/feature phones**; ~2 in 5 of 60+ can use the internet; smartphone access 44.7% (60–69), 42% (70+) vs 88.6% (18–49). Opinion piece citing NSS (**UNVERIFIED** against primary tables) |
| S13 | DAHLIA study, rural Mysuru older adults (PMC) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8938771/ | 50% phone ownership, very few smartphones, ~10–11% digitally literate; poor vision and literacy as barriers; family and local health staff as enablers |
| S14 | Census 2011 disability (PIB table / census2011.co.in) | https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=124292 | MP: 15.5 lakh persons with disabilities; **2.71 lakh with visual disability**, 2.67 lakh hearing, 4.05 lakh locomotor |
| S15 | NPCI — UPI 123PAY | https://www.npci.org.in/product/upi-123pay | UPI for feature phones via IVR, missed call, feature-phone apps, sound; multilingual IVR; onboarding without internet |
| S16 | PIB UPI factsheet | https://www.pib.gov.in/FactsheetDetails.aspx?id=150962&lang=1&ModuleId=16&NoteId=150962&reg=6 | 123PAY limit raised to ₹10,000; Aadhaar face authentication for UPI PIN onboarding aimed at senior citizens |
| S17 | Mordor Intelligence — India real-time payments | https://www.mordorintelligence.com/industry-reports/india-real-time-payments-market | **UNVERIFIED** (commercial): 123PAY >10 M transactions/month early 2025; "400 M feature-phone users" |
| S18 | MP CM Helpline 181 — About | https://cmhelpline.mp.gov.in/About.aspx | State IVR call centre since 2014 for scheme info and grievances; rural reach |
| S19 | MP CM Helpline — Missed call campaign | https://cmhelpline.mp.gov.in/MissedCallCampaign.aspx | Zero-cost missed-call registration for departments with SMS/voice confirmation and dashboard — directly reusable pattern |
| S20 | CM Jan Seva (181) services | https://cmhelpline.mp.gov.in/cmhlcare.aspx | Precedent: MP delivers certificates by phone call alone, no app |
| S21 | Urban Company engineering — number masking | https://medium.com/uc-engineering/masking-phone-numbers-to-protect-user-privacy-in-a-marketplace-94c2e7c5f29f | Per-order proxy numbers so neither party sees the other's real number |
| S22 | Urban Company "Heimdall" identity check | https://medium.com/@teodce/how-urbancompany-is-using-microsofts-cognitive-apis-to-build-heimdall-the-gatekeeper-1eb76cf6c198 | Start-job OTP from customer + on-job selfie to stop job hand-off to unverified people |
| S23 | AuthBridge on Urban Company trust & safety | https://authbridge.com/newsroom/how-urban-company-is-focussing-on-safety-and-upskilling-to-stay-ahead-of-the-game/ | Third-party background verification before onboarding; trust & safety desk with law-enforcement liaison (**UNVERIFIED**, vendor PR) |
| S24 | The Quint — women workers on home-service safety | https://www.thequint.com/jobs/urban-company-insta-maids-help-domestic-workers-in-15-minutes-women-safety-minimum-wages-dignity-labour-latest | SOS button, women-only safety helpline; critics cite bot-only helplines and weak grievance redress — safety runs both ways (collector women too) |
| S25 | LIRNEasia AfterAccess India (2018) | https://lirneasia.net/wp-content/uploads/2018/08/LIRNEasia-AfterAccess-India-ICT-access-and-use-in-India-and-the-Global-South.pdf | Background: women 46% less likely to own a mobile (older data); feature-phone owners are not internet users |

---

## 2. Findings

### F1. In MP, fewer than half of women have a phone of their own, and in rural MP it is about 4 in 10
- NFHS-6 (2023-24): **48.5%** of MP women aged 15–49 have a mobile phone they themselves use — **69.2% urban, 40.6% rural** — against 63.6% nationally (S1, S2). NFHS-5 put MP at 38.5%, the lowest of every state and UT (S3, S4, S5).
- The same women have high bank access: **92.1%** have a bank account they use (S1). The bottleneck is the phone, not the bank.
- NFHS measures *any* phone, not a smartphone with WhatsApp. GSMA finds India's **smartphone** gender gap **widened to 39%** in 2024, and 13% of women smartphone owners do not use mobile internet at all (S8).
- IAMAI: **58% of rural shared-device internet users are women** (S10). The phone a woman uses is often her husband's or son's.
- **Implication for v2.** C1 ties the account, OTP, language, WhatsApp consent and UPI payout to one phone number. On a shared phone, the booking, the status messages, and (critically) the **incentive** go to whoever owns the number, usually a male relative. The woman who actually gathered and handed over the e-waste is invisible to the system and gets nothing. The pilot's own metrics will under-count women because the account holder's gender is the phone owner's.

### F2. Feature phones are a structural minority, not an edge case, and heavily concentrated among the elderly
- NSS CMS:T 2025: **9.7% of households have only non-smartphones (12.3% rural)**; another 26.2% have both, meaning some members use a basic phone (S11).
- Among people **60+**, more than half rely exclusively or partly on basic/feature phones, smartphone access is ~42–45%, and only ~2 in 5 can use the internet on any device (S12, **UNVERIFIED** against primary tables). Small rural studies show ~10% digital literacy among older adults, with poor vision and literacy as barriers (S13).
- Older households are exactly the ones holding old TVs, CRT monitors, fridges, landline phones and drawers of dead handsets. A WhatsApp-only funnel filters out the highest-yield households.
- v2 gives SMS only as an **OTP fallback** (C1). Booking (C2), rescheduling (C4, WhatsApp keyword), society registration (C8, WhatsApp link) and status (C5) all assume WhatsApp or the web app. A feature-phone user can receive a code but cannot do anything with it.

### F3. MP already runs the voice and missed-call channels EcoSure needs
- **CM Helpline 181** has been the state's IVR citizen channel since 2014 (S18). It offers departments a **zero-cost missed-call campaign service** that captures the caller's number, sends SMS/voice confirmation and shows a dashboard (S19). CM Jan Seva delivers certificates purely by phone call (S20).
- **UPI 123PAY** (NPCI) lets feature-phone users onboard and transact via IVR or missed call in multiple languages, limit ₹10,000 (S15, S16). A payout to a feature-phone user's bank-linked UPI ID is technically possible; the problem is knowing the ID, not the rails.
- Aadhaar face authentication for UPI PIN setup was introduced to help senior citizens and first-time users (S16).
- **Implication.** An IVR / missed-call booking path is not a new build of telephony infrastructure; it is an integration with a state channel the sponsoring government already owns. v2 does not mention 181 at all.

### F4. "No UPI ID" is common among exactly the excluded groups, and v2 has no fallback
- C6 pays **only** to "the citizen's UPI ID". §4 explicitly puts "cash payment by the collector" out of scope (correctly, for fraud and custody reasons).
- People without a smartphone rarely have a UPI ID; 123PAY adoption is small (S17, **UNVERIFIED**) relative to the feature-phone base. Women with a bank account (92%, S1) but no own phone cannot receive to "their" UPI ID unless it is linked to a phone they control.
- Result: the incentive, the main behavioural lever in v2, is structurally unavailable to many women, most elderly feature-phone users and many low-income households. They will still sell to the kabadiwala for cash.
- Cash-equivalent alternatives that keep an audit trail: **bank account transfer via IFSC** (IMPS/NEFT, same PFMS/DBT rails as other schemes — see `07-payments-dbt.md`), **payment to a nominated beneficiary** chosen by the person handing over (for example the woman's own account while the booking came from her husband's phone), **shop-credited in-kind voucher** redeemable at the collection shop, or **donation** to the ward/anganwadi fund. Each must be recorded against the same idempotent payout record.

### F5. Visually impaired and low-literacy citizens have no usable channel end to end
- MP had **2.71 lakh** people with a visual disability in Census 2011 (S14); the real number with low vision among the elderly is much higher.
- WhatsApp templates are workable with TalkBack only if text-first (agent 05 R7). But the wipe checklist (C3), the attestation link (C5) and the UPI flow are all visual, multi-step tasks. Nothing lets a blind or non-literate citizen **hear** the checklist, **speak** a booking or **hear** the collected weight and amount.
- WhatsApp **voice notes** are how many low-literacy users already communicate. v2's WhatsApp design is keyword-based (`RESCHEDULE`, `GATE`), which is the hardest pattern for low-literacy users.
- Bhashini ASR/TTS (agent 05 S27) can turn a Hindi voice note into a structured draft booking for human confirmation, and read status back as audio.

### F6. Doorstep safety is not specified — for the citizen or for the collector
- v2 sends a stranger to the home (C2 doorstep mode, C4) and shares the citizen's exact address (`12` §5: "shared only with the assigned shop"). Collectors are employees or helpers of micro-tier shops that only need an **Aadhaar-verified owner** (`05` onboarding). The **collector themself** is not identified, verified or named to the citizen anywhere.
- There is no: named collector with photo shown before arrival; **handover code** the citizen gives only to the right person (the Urban Company start-job OTP pattern, S22); **masked calling** (S21) — today the collector will see and keep the citizen's real number, and the citizen the collector's; SOS or safety-report path; rule that the collector does not need to enter the home; option to **choose a time when another adult is present** or to request a **woman collector / drop-off instead**.
- A woman alone at home, especially where the phone and account belong to someone else, is the person most likely to be at the door and least likely to be able to verify who is standing there. Phishing risk compounds this: fake "EcoSure collectors" or fake "incentive" calls asking for UPI PINs are a predictable fraud pattern once a government scheme pays money (see agent 05 gap 2 on ownership branding).
- Safety runs both ways: women collectors or helpers entering homes need the same protections (S24).

### F7. Assisted booking has natural hosts in the programme's own network
- The **collection shop** already meets citizens face to face; **anganwadi workers** and **ward offices / Lok Seva Kendras** are trusted touchpoints for women and elderly in MP. A booking made on someone's behalf ("assisted") is standard in Indian scheme delivery (S13 notes family and local health staff as the main enablers for older adults).
- v2 roles (`02-roles-rbac.md`) have no "assist on behalf of citizen" capability; only "collector assisted" wipe confirmation exists. Without a role and an audit trail, assisted bookings will happen informally anyway (shop staff booking with their own phone), which breaks the one-incentive-per-citizen limit and the anomaly detection in `12` §7.

---

## 3. v2 fit

| Requirement | v2 evidence | Fit |
|-------------|-------------|-----|
| Works on low-end Android, 2G/3G | `12` §4 | **Good** for smartphone users; says nothing about non-smartphones |
| SMS fallback | `04` C1 (OTP only) | **Partial.** SMS carries only the OTP, not booking, status or receipt |
| Plain language, icons + text | `12` §4 | **Good**, but only for staff; no voice/audio for citizens |
| Society drive | `04` C8 | **Partial.** Registration by WhatsApp link only; the secretary cannot register residents on their behalf |
| UPI incentive | `04` C6 | **Gap** for no-UPI citizens; no bank, beneficiary or voucher option |
| One account per phone | `04` C1, `12` §7 anomaly rules | **Gap** for shared phones; the anomaly rules will *flag* legitimate multi-person households on one number |
| Doorstep collector identity and safety | none | **Gap** |
| Assisted / on-behalf booking | only wipe "collector assisted" | **Gap** |
| Inclusion metrics | none | **Gap.** No channel, gender or age-band reporting to prove who is served |

---

## 4. Recommended PRD changes (file + change)

| # | File | Change |
|---|------|--------|
| R1 | `04-consumer.md` new **C12 Voice and missed-call booking — Phase 1 (pilot)** | "A citizen gives a missed call to the EcoSure number (through CM Helpline 181's missed-call service or an operator IVR). Within 2 working hours an operator or IVR calls back in Hindi, records categories and counts, address and landmark, preferred slot, and payout method, and creates the pickup as channel `voice`. Confirmation, collector details, collected weight and amount are sent by **SMS and a voice call**. Status can be heard by calling the same number and entering the booking number. No smartphone or WhatsApp required at any step." Supersedes agent 05 R8's phase-2 placement: in MP this is the primary channel for a large share of households, not an add-on. |
| R2 | `04-consumer.md` new **C13 Assisted booking — Phase 1** and `02-roles-rbac.md` | Add an `assistant` capability for shop staff, anganwadi workers, ward-office / Lok Seva Kendra staff and society secretaries: "Create a pickup on behalf of a person who is present or has consented by phone. Records the assistant's user ID, the location type, the beneficiary's name and phone (may be a feature phone or a shared phone), and a consent confirmation (OTP to the beneficiary's phone, or a recorded voice consent if no phone). Assisted pickups count toward the beneficiary's incentive limit, not the assistant's. Assistants cannot receive incentives for pickups they create. Assisted volume per assistant is shown to the operator and feeds anomaly detection." Update C8 so the secretary can register residents directly. |
| R3 | `04-consumer.md` C6 and `03-domain-model.md` / `schema.sql` | Replace "Paid to the citizen's UPI ID" with: "Paid to the payout method the person handing over chooses at booking or at collection: (a) UPI ID, (b) **bank account + IFSC** via the scheme's DBT/PFMS rail, (c) a **nominated beneficiary** (for example a household member's own account — the person handing over is recorded as the beneficiary, not the phone owner), (d) an **in-kind voucher** redeemable at the collecting shop, or (e) donation to a listed ward/anganwadi fund. All options use the same idempotent payout record, limits and audit trail. Cash by the collector remains out of scope." Add `payout_method`, `beneficiary_name`, `beneficiary_is_account_holder` to the payout entity. |
| R4 | `04-consumer.md` C1 and `12-nfr-security.md` §7 | C1: "A phone number may hold **up to 4 household member profiles** (name, optional gender and age band); each pickup names the member handing over, and incentives and receipts are attributed to that member." §7: anomaly rules must treat multiple profiles on one number as normal up to that limit, and flag only above it. This prevents the anomaly engine from penalising women on shared phones. |
| R5 | `04-consumer.md` new **C14 Doorstep safety — Phase 1** and `05-local-recycle-shop.md` | "Before the visit, the citizen receives the **collector's name, photo and shop name** (WhatsApp, SMS or voice). Each collector is individually registered under the shop with phone OTP and ID verification (result stored, not the document). The collector must enter a **4-digit handover code** that the citizen gives in person before a pickup can be marked collected (SMS/voice for feature-phone users; the code is never shown in the collector app). All calls go through **masked proxy numbers** valid only for the pickup window; the collector never sees the citizen's real number. Collection happens at the door by default; the collector does not need to enter the home. The citizen can choose 'I prefer another adult present' (slot suggestions), 'request woman collector where available', or switch to drop-off at any time. A **'report a safety concern'** option (app, WhatsApp keyword `SAFETY`, and the voice number) goes to a human at the operator within 1 hour, with escalation to 1091 / 112 information. The same channel is available to collectors. Safety reports suspend the collector pending review." |
| R6 | `04-consumer.md` C3, C5 and `12-nfr-security.md` §4 | "The wipe checklist, collected receipt (weight, categories, amount) and attestation number are available as **audio in Hindi** (recorded or Bhashini TTS) and by voice call. WhatsApp accepts **voice notes** for booking and rescheduling: speech is transcribed (Bhashini ASR), turned into a draft, and confirmed back to the citizen by a short text + audio summary before it is submitted. Keywords remain as a shortcut, not the only path." |
| R7 | `12-nfr-security.md` new §4.1 "Inclusion" | "Channels are equal: every citizen action (book, reschedule, cancel, status, receipt, payout choice, grievance, deletion request) must be possible via (1) smartphone/WhatsApp, (2) voice/missed call + SMS, and (3) assisted booking. No feature is launched citizen-side unless it has a non-smartphone path or an explicit, documented exemption." Add fraud messaging: "Every message states that EcoSure staff never ask for a UPI PIN or OTP over a call." |
| R8 | `09-*` operator/SPCB dashboards and `00-overview.md` §8 success metrics | Add inclusion metrics, reported monthly by corridor: share of pickups by channel (WhatsApp / voice / assisted); share with a woman as the handing-over member; share of members aged 60+; payout method mix and payout failure rate by method; safety reports per 1,000 visits and time to human response. **Pilot gate:** at least 20% of pickups via voice or assisted channels and at least 35% with a woman as handing-over member in the Indore pilot, or a documented reason. |
| R9 | `01-stakeholders-and-personas.md` | Add personas: (a) a rural/peri-urban woman in her 40s who uses her husband's phone and has her own Jan Dhan account; (b) a 68-year-old retired man with a feature phone and a cupboard of old electronics; (c) a low-vision resident (joins agent 05 R12); (d) an anganwadi worker acting as assistant. Each should map to R1–R6. |
| R10 | `11-integrations.md` and `14-open-questions.md` | Integrations: CM Helpline 181 missed-call/IVR (phase 1), masked-calling telephony provider (phase 1), bank/IFSC payout via DBT rail (phase 1, see agent 07), Bhashini ASR/TTS (phase 1). Open questions: Can EcoSure use the 181 missed-call service and call-centre capacity, and who funds call minutes? Is the Department of Women & Child Development willing to let anganwadi workers act as assistants (and is there an honorarium)? What ID verification level is required for individual collectors? |

---

## 5. Score

**3 / 10** for inclusion and doorstep safety.

- **Credit (+):** Hindi-first intent, SMS OTP fallback, low-bandwidth/low-end Android design, plain language, text-list fallback for drop-off points (C7), society drives that reduce individual doorstep visits, first failed visit without penalty, "collector assisted" wipe as a precedent for assistance.
- **Deductions (−):** Every citizen action requires a personally-owned smartphone with WhatsApp; the incentive requires a UPI ID in the booker's name; shared phones silently re-route the incentive to the phone owner and will trip anomaly rules; no voice, missed-call or assisted path despite MP owning a ready missed-call/IVR channel (181); no audio for blind or low-literacy users; no collector identity, handover code, masking or safety escalation for women receiving strangers at home; no inclusion metrics, so exclusion will be invisible in pilot results.

Applying R1–R5 and R8 would raise this to about **7 / 10**. Most of the cost is telephony integration (reused state channel), a payout-method field, a household-member profile, and a collector-identity/handover step that also strengthens custody and fraud controls.
