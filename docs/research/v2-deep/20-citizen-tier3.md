# 20 — Citizen Experience if v2 Extends to a Tier-3 Town (Phase 3)

**Agent:** 20 of 36 (wave 2, deep evaluation)  
**Date:** 2026-09-27  
**Scope:** How the v2 citizen design (UPI at collection, WhatsApp-first, Hindi + English, micro-tier shops, corridor launch checklist) holds up in a Tier-3 town such as Sagar (MP), with Gwalior (MP) and Bhagalpur (Bihar) as comparison points.  
**Inputs read:** `docs/prd/00-overview.md`, `docs/prd/04-consumer.md`, `docs/research/tier2-tier3-field-issues.md`, wave-1 files `v2-deep/05`, `07`, `08`, `12`, `14`, `15`, `17`.  
**PRD files edited:** none.

**Short answer:** The v2 citizen flow is built for a dense, smartphone-owning, UPI-using, literate household in Indore. In a Tier-3 town it can pass the corridor launch checklist *on paper* while being non-viable in practice. The checklist only counts supply (8 shops, 1 hub, 1 recycler) and says nothing about volume, freight distance, women's phone access, literacy, or voice channels. The main failure points are shop economics at low volume, identity and payment tied to one (usually male-owned) phone, text-only trust and wipe flows, and incentives that cannot compete with informal prices for phones.

---

## 1. Sources

| # | Source | URL | Status |
|---|--------|-----|--------|
| T1 | NFHS-5 (2019–21) Madhya Pradesh state and district fact sheets (OpenCity compendium): women owning a mobile phone they use themselves — urban 58.8%, rural 31.4%, total 38.5%; district literacy for women aged 15–49 | https://data.opencity.in/dataset/ae734771-4981-4031-ac38-7c056aa2c0f0/resource/ba0c9fff-8a43-4af5-9c74-1eb09180e874/download/ee4f53f3-d694-40bf-8c9c-8139e93c6318.pdf | Verified (extracted from the PDF text) |
| T2 | NFHS-5 district fact sheets: women literate (15–49) — **Gwalior 76.0%**, **Sagar 69.4%**; women with 10+ years schooling — Gwalior 37.9%, Sagar 32.9% | Same as T1 | Verified (district sheets do not carry the phone indicator) |
| T3 | NFHS-5 Bihar compendium: state women literate 57.8%, women ever used internet 20.6%, women own phone 51.4%; **Bhagalpur** women literate 65.6% | https://data.opencity.in/dataset/ae734771-4981-4031-ac38-7c056aa2c0f0/resource/f080a6ab-4a17-4672-982f-aa6c17160555/download/cbd87ca2-6c76-43a3-ae90-fd0070ac619d.pdf | Verified |
| T4 | PMC ecological analysis of NFHS-5: MP has the **lowest** share of women with their own phone of all 36 states/UTs (38.5%); Bihar lowest women's internet use (20.6%) | https://pmc.ncbi.nlm.nih.gov/articles/PMC13390612/ | Verified |
| T5 | GSMA Mobile Gender Gap Report 2025: India smartphone ownership gender gap widened from 32% (2023) to **39% (2024)**; 13% of women smartphone owners do not use mobile internet, two-thirds of them unaware of it; literacy/digital skills a top barrier | https://www.gsma.com/wp-content/uploads/2025/12/The-Mobile-Gender-Gap-Report-2025.pdf | Verified |
| T6 | MoSPI CMS: Telecom 2025 press release: 85.5% of households have at least one smartphone; 15–29 age group rural internet use 92.7% | https://www.mospi.gov.in/sites/default/files/press_release/Final_press%20release_CMS_T.pdf | Verified (state/district split not published in summary) |
| T7 | Wave-1 `08-sms-whatsapp.md` F8 citing CMS 2025: among rural women, 76.3% use a phone but only 48.4% own one | `docs/research/v2-deep/08-sms-whatsapp.md` | Secondary (wave-1) |
| T8 | SBI Research, *New Insights from UPI Data* (Aug 2025): NPCI state-wise UPI — MP 2.2% and Bihar 2.1% of July 2025 volume vs Maharashtra 9.8% | https://sbi.bank.in/documents/13958/14472/New+Insights+from+UPI+Data_SBI+Research.pdf/5e8227bf-78b1-5838-59b5-1ba3e76099b5?t=1755680722524 | Verified |
| T9 | Redseer via Wikipedia: ~70% of UPI users outside Tier-1, 80%+ of new users from Tier-2 (2023) | https://en.wikipedia.org/wiki/Unified_Payments_Interface | Secondary; no Tier-3 town-level figure found — **UNVERIFIED for Sagar/Bhagalpur** |
| T10 | MPPCB authorised recycler list: 11 recyclers — Indore (3), Sehore (3), Gwalior (Prometheus), Mandideep, Dhar, Bhopal, Jabalpur. **None in Sagar** | https://www.mppcb.mp.gov.in/Recycler.aspx | Verified (page as fetched Sep 2026) |
| T11 | CPCB list of dismantlers/recyclers as on 03-05-2023: no Bihar entry found by text search | https://legalupdate.qhsealert.com/file/128_List_of_E-waste_Recycler_May_2023.pdf | Secondary copy; current Bihar status **UNVERIFIED** |
| T12 | Census 2011 (via census2011.co.in / Wikipedia): Gwalior M Corp 10.5–10.7 lakh (60 wards); Bhagalpur 3.98–4.0 lakh; Sagar 2.73 lakh | https://www.census2011.co.in/data/town/802159-sagar-madhya-pradesh.html ; https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population | Verified (2011); 2026 projections on the site are **UNVERIFIED** |
| T13 | Times of India (2026), Vijayawada: chip shortage makes dead 4G/5G phones valuable; traders pay up to ₹20,000–25,000 for some dead handsets | https://timesofindia.indiatimes.com/city/vijayawada/ai-boom-global-chip-crunch-turn-dead-phones-into-gold-fuel-new-scrap-market-in-vijayawada/articleshow/133192412.cms | Secondary news; spread to MP/Bihar Tier-3 **UNVERIFIED** |
| T14 | Jaipur kabadiwala rate card: feature phone ₹15, smartphone ₹30, laptop ₹200, CPU ₹250 per piece | https://anilkabadiwala.com/scrap-price-list/ | Single vendor, Tier-2; **UNVERIFIED** as Tier-3 benchmark |
| T15 | Wave-1 `05-gigw-accessibility-language.md`: no voice/IVR OTP, no missed-call booking in v2 | `docs/research/v2-deep/05-gigw-accessibility-language.md` | Wave-1 |
| T16 | Wave-1 `07-payments-dbt.md`: public money pays by APBS/NACH in daily batches (up to T+4), not instantly to a VPA; caps should be per payee account | `docs/research/v2-deep/07-payments-dbt.md` | Wave-1 |
| T17 | Wave-1 `15-india-precedents.md`: Kerala Haritha Karma Sena (Kudumbashree women's collectives) buy e-waste door-to-door at a fixed per-kg rate (~₹8/kg average, UNVERIFIED); Indore IMC ~1.2 kg/capita/yr generation implied (4,000 t / ~3.3M) | `docs/research/v2-deep/15-india-precedents.md` | Wave-1 |

---

## 2. Assumptions

1. **Reference town:** Sagar, MP (~4 lakh people in 2026, UNVERIFIED projection; ~2.73 lakh in 2011). Gwalior (1M+) is administratively a large city and is *not* a true Tier-3 test; it is used only as an upper bound. Bhagalpur is used to test an out-of-state (non-MP) phase-3 extension.
2. **Generation:** Tier-3 household e-waste per capita is assumed at ~0.5 kg/yr (about 40% of the ~1.2 kg implied for Indore in T17). Sagar total ≈ 200 t/yr. First-year formal capture of 5–10% ≈ **10–20 t/yr, i.e. 0.8–1.7 t/month**. All of this is an **UNVERIFIED planning assumption**; it must be replaced by a local inventory before launch.
3. **Freight:** Sagar to Bhopal/Sehore or Jabalpur recyclers is roughly 170–200 km by road (UNVERIFIED). A small-truck round trip is assumed at ₹8,000–12,000 (UNVERIFIED).
4. **Shop margin:** A micro shop's formal margin is assumed at ₹5–10/kg (UNVERIFIED), consistent with the ₹22–34/kg EPR floor band minus freight and handling (wave-1 `01`, `17`).
5. **Payment rail:** Phase-3 incentives are assumed to be public money unless a producer pool funds the corridor, so the T+4 daily batch in T16 applies.
6. NFHS-5 fieldwork (2019–21) is 5–7 years old; phone ownership has risen since, but GSMA T5 shows the *gender gap* in India widened in 2024, so the direction of the finding holds.

---

## 3. Findings

### F1. The corridor checklist can pass "hollow" in Tier-3 because it counts supply, not viability (high confidence)
The checklist (00-overview §8) requires 8 shops, 1 monsoon-safe hub, 1 recycler with offtake, 8 weeks of float, Hindi+English templates and a trained team. Applied to the three towns:

| Checklist item | Sagar | Gwalior | Bhagalpur |
|----------------|-------|---------|-----------|
| ≥ 8 active shops covering main wards | Likely countable (repair shops, kabadis), but each would see ~100–200 kg/month (Assumption 2), about ₹500–2,000/month margin. Many will go dormant | Passes on count; 8 shops for 60 wards and 10 lakh+ people is thin coverage | Countable; same economics as Sagar |
| ≥ 1 hub with monsoon storage | No known candidate; would need to be created | Plausible | No known candidate |
| ≥ 1 recycler with offtake | **No recycler in Sagar** (T10). Offtake with a Bhopal/Sehore/Jabalpur recycler is legal, so it passes on paper, but freight is ₹5–15/kg at 0.8–1.7 t/month (Assumptions 2–3), eating most of the margin | Prometheus Recycling is in Gwalior district (T10) — passes | **No Bihar recycler found** in the 2023 CPCB list (T11, current status UNVERIFIED). Offtake would be interstate |
| Float 8 weeks | Passes (money only) | Passes | Passes, but needs a Bihar sponsor — MP SPCB cannot sponsor it |
| Hindi + English templates | Passes on text; misses voice/dialect needs (F5) | Passes | Passes on text; spoken Angika/Maithili not covered |
| Field team trained | Passes | Passes | Passes |

**Verdict:** Sagar likely passes the checklist with a distant recycler and a newly created hub while failing on volume, freight and shop income, which is exactly the "empty network" failure the checklist was meant to prevent. The checklist has no minimum modelled volume, no freight-cost-per-kg ceiling, no demand-side readiness test, and no scaling of "8 shops" to population or ward count. Bhagalpur is not a phase-3 "extension" at all; it is a new state programme with a different SPCB, sponsor and likely interstate offtake.

### F2. Doorstep pickup economics break at Tier-3 density; drop-off days must be the primary mode (high confidence, figures UNVERIFIED)
At ~1 t/month spread over a whole town, a doorstep visit for "1 mixer and 2 phones" (a few kg) costs more in collector time than the material and incentive are worth. v2 treats doorstep, drop-at-shop and society drive as equal modes (C2) and caps paid pickups at 4/month (C6), a cap that matters in Indore but is irrelevant where households have few items. Tier-3 towns also have fewer gated societies, so C8 "society drive" has a smaller base. What works in Tier-3 practice is scheduled **ward or market-day collection camps** (weekly haat, ward office, school, post office) plus drop-at-shop, with doorstep only above a minimum volume or for elderly/disabled households. Kerala's HKS model (T17) works because an existing door-to-door workforce is reused, not because a separate pickup network is created.

### F3. Identity, OTP and UPI are tied to one phone, which in Tier-3 MP usually is not the woman's (high confidence)
- MP has the lowest women's own-phone rate in India: 38.5% overall, 31.4% rural, 58.8% urban (T1, T4). India's women–men smartphone gap is 39% and widening (T5). Among rural women, 76% use a phone but only 48% own one (T7).
- C1 assumes one person = one phone = one WhatsApp = one UPI ID. In a shared-phone household, the OTP, WhatsApp status, and the **incentive** all go to the phone owner, usually a husband or son. The woman who stored, cleaned and handed over the appliances gets no receipt and no money.
- The 5-attempts-per-hour lockout (C1) is harsh when several family members share a device or the phone is with someone at work.
- OTP delivery fails silently if DLT templates are not correctly tagged (wave-1 `08` F1), and in weak-signal galis WhatsApp may not load. v2 has no voice OTP (T15).
- Wave-1 `07` recommends caps per payee account. In Tier-3 that is correct for fraud but will also block legitimate households where several members book to one shared VPA, unless the household is modelled explicitly.
- Public-money incentives arrive in up to T+4 working days (T16). In a town where the kabadi pays cash on the spot, "paid in 4 days to your son's UPI" is not a reward the woman at the door experiences at all.

### F4. Incentive sensitivity cuts both ways: small sums matter more, but phones are being bid away (medium confidence)
- In lower-income Tier-3 households a ₹20–50 incentive is more meaningful than in Indore, so bulky low-value items (CRT TVs, fans, mixers, CFLs, batteries) respond well to a flat per-category incentive. These are also the most hazardous and least attractive to kabadis.
- Phones and laptops are the opposite. Kabadi per-piece rates are low in some markets (₹15–30, T14), but a 2026 chip shortage has pushed dead 4G/5G phone prices to hundreds or thousands of rupees in some towns (T13, spread UNVERIFIED). A flat scheme incentive will lose every valuable phone to informal traders and collect only the negative-value fraction. That is still an environmental win, but the PRD's metrics and producer-evidence story assume a representative mix.
- v2 sets the amount "per category by the programme operator" (C6) with no rule for benchmarking against local informal prices or reviewing it by corridor.

### F5. Literacy and language: text-only Hindi is necessary but not sufficient (high confidence)
- Women aged 15–49 literate: Gwalior 76.0%, Sagar 69.4%, Bhagalpur 65.6% (T2, T3). Roughly one in three women in Sagar or Bhagalpur cannot read a WhatsApp template or the C3 wipe checklist. Older women and elderly men fare worse (NFHS covers only 15–49).
- Spoken dialects (Bundeli around Sagar, Angika/Maithili around Bhagalpur) are not written languages for templates, but they matter for voice prompts and collector scripts.
- C3's wipe steps ("back up, sign out, factory reset") presume digital skills that many Tier-3 phone owners, and most elderly users, do not have. "Collector assisted" is written as the exception; in Tier-3 it will be the norm, which raises the stakes on collector conduct and device-screen photo rules.

### F6. Trust is local and in-person; a government WhatsApp sender is also a scam template (medium confidence)
Tier-3 citizens trust faces they know: ward councillor, SHG "didi", anganwadi/ASHA worker, the neighbourhood repair shop, the post office. A WhatsApp message saying "your government incentive is paid, click here" is the exact pattern of active PM-Kisan-style scams (wave-1 `08` F7). v2 has no assisted or proxy booking path through trusted local intermediaries, and no in-person verification ritual (printed receipt, handover code) that works without a smartphone.

### F7. Women and elderly are invisible in the persona set (high confidence)
The simulated field research (`tier2-tier3-field-issues.md`) used a Gwalior male student and a Bhagalpur male shop owner. There is no Tier-3 homemaker on a shared phone, no elderly widow, and no low-literacy user, so the PRD never had to solve for them. Its own "next validation" section still lists real Gwalior interviews and Tier-3 shop ride-alongs as not done.

---

## 4. Recommended PRD changes

| # | File | Change |
|---|------|--------|
| P1 | `00-overview.md` §8 | Split the checklist into **supply**, **viability** and **access** gates. Supply: shops scaled to population (for example at least 1 active shop per 50,000 residents and every ward within 3 km of a drop point), not a fixed 8. Viability: modelled monthly volume ≥ a threshold that fills one outbound trip within the recycler dwell cap; freight cost ≤ ₹X/kg (sponsor-set); each shop's projected formal margin ≥ ₹Y/month, or a funded shop retainer for the first 6 months. Access: voice/IVR channel live, assisted-booking partners signed (ULB, SHG federation, post office or CSC), audio wipe guide recorded, local e-waste inventory done. A corridor that passes supply but fails viability does not launch. |
| P2 | `00-overview.md` §1 and `13-roadmap.md` Phase 3 | Define **corridor archetypes** (metro/Tier-2 vs Tier-3 spoke). A Tier-3 town launches as a **spoke of an existing corridor hub** (for example Sagar → Bhopal/Sehore) with consolidated monthly trips, not as a standalone corridor with its own hub. A new state (for example Bihar) is a new programme with its own sponsor, SPCB and offtake, not a phase-3 extension. Add real Tier-3 validation (10 interviews including 5 women on shared phones and 2 elderly users, 3 shop ride-alongs) as a phase-3 entry gate. |
| P3 | `04-consumer.md` C1 | Add voice-call OTP in Hindi after SMS (align with wave-1 `05` R6). Treat an inbound WhatsApp session from a number as verification of that number. Replace the per-number lockout with per-number plus per-device limits that tolerate shared phones. Add **assisted booking**: a shop, SHG member, ward office or CSC operator books on behalf of a citizen with recorded verbal consent, and the citizen gets an SMS or printed receipt. |
| P4 | `04-consumer.md` C2 / C7 / C8 | Add a **collection camp** mode (ward, market day, school, post office) managed by the operator, and make it the default mode in Tier-3 archetype corridors. Doorstep pickup in Tier-3 requires a minimum volume or an access flag (elderly, disabled). |
| P5 | `04-consumer.md` C6 | Separate **requester** from **payee**: the person handing over can name their own bank account or VPA, name-verified via the bank-name lookup (wave-1 `07`), so a woman on her husband's phone can still be paid to her own account (Jan Dhan). Model a **household** with multiple members so per-payee caps do not block shared VPAs. Send an **SMS** payment receipt, not WhatsApp only. Rate card set per corridor and **reviewed monthly against local informal prices** for phones and laptops, with a published rule for high-value categories. |
| P6 | `04-consumer.md` C3 / C9 | Wipe guide available as **audio and pictograms** (Bhashini TTS or recorded Hindi), not text only. In Tier-3 archetypes, collector-assisted wipe is the expected path: add a scripted, citizen-witnessed procedure (SIM and memory card physically handed back to the citizen before sealing) and a printed or SMS handover code the citizen can quote in a grievance. |
| P7 | `04-consumer.md` new C12 (Phase 1 for Tier-3 archetype, Phase 2 elsewhere) | Missed-call / IVR booking and status in Hindi, with dialect voice prompts where the operator records them (align with wave-1 `05` R8). |
| P8 | `01-stakeholders-and-personas.md` | Add personas: a Tier-3 homemaker (Sagar) who shares her husband's phone and has her own Jan Dhan account, and an elderly widower with a keypad phone. Each needs a named path through booking, wipe, handover and payment. |
| P9 | `05-local-recycle-shop.md` | For Tier-3 archetypes: hub-paid consolidated freight, a time-limited shop retainer or minimum monthly guarantee funded from the scheme, and shops acting as assisted-booking points (P3) with an attribution fee. |
| P10 | `14-open-questions.md` | New OQs: Tier-3 archetype volume threshold and freight ceiling; who funds shop retainers; whether assisted booking by SHG/CSC operators needs a formal MoU; interstate offtake rules for states without recyclers; minimum incentive vs informal phone prices. |

---

## 5. Score

**4 / 10** for Tier-3 readiness of the v2 citizen design.

- **Credit (+):** Hindi from day one, WhatsApp-first, SMS fallback, text-list drop-off points, an honest "not live in your area" state, micro-tier shops without GSTIN, and a launch checklist at all. These are the right foundations and far better than v1.
- **Deductions (−):** a count-only checklist that can pass hollow; no volume or freight viability gate; one-phone identity and payment that excludes most Tier-3 women; no voice path for about a third of women who cannot read; delayed public-money incentives in cash-first markets; flat incentives that will lose valuable phones to informal buyers; no assisted booking through trusted local intermediaries; and no women or elderly personas.

Applying P1, P3, P4, P5 and P6 would lift this to about **7 / 10** without changing the core custody model. The remaining gap is real field validation, which no desk research can replace.
