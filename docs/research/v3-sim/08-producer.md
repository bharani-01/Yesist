# 08 — Producer simulation: will real producers and PROs use EcoSure v3?

**Simulation:** 08 of the v3 real-life simulation set
**Date:** 2026-09-27
**Read in full:** `docs/prd/v3-PRD.md` (all 32 sections). Prior research: `docs/research/v2-deep/26-producer-value.md`, `docs/research/v2-deep/02-cpcb-epr-portal.md`.
**Status:** Research only. No PRD file was edited.

**Who was simulated**

| # | Organisation (fictional, typical) | Person | Situation |
|---|-----------------------------------|--------|-----------|
| P1 | Large smartphone brand, Indian subsidiary (private limited, not listed in India), Gurugram office | Head of EPR and Sustainability, India; reports to a regional ESG lead abroad | Sells roughly 1–2 crore phones a year across India. EPR runs through two PROs plus direct recycler contracts. Global parent publishes an ESG report |
| P2 | Indian appliance maker, listed on NSE (top 500), plants in two states | Compliance Manager (EPR, BIS, plastic and battery EPR); reports to the Company Secretary and the Head of Sustainability | Fans, mixers, ACs, water heaters. Files BRSR; BRSR Core assessment is coming in. Its industry association is part of the Delhi High Court challenge to the EPR floor price |
| P3 | Small importer of power banks and earphones, own brand, sells mostly on Amazon and Flipkart | Founder, plus an outside EPR consultant who files for 60+ small clients | Turnover about ₹12 crore. EPR spend about ₹1–2 lakh a year all-in. Goods made in Shenzhen, white-label |
| PRO | Large e-waste PRO / compliance aggregator | Business head and legal counsel | Serves hundreds of producers, runs collection in 100+ cities including Indore, buys certificates from a panel of recyclers across states |

Legend used in this report: **[V]** confirmed from an official or primary source. **[S]** secondary (law firm, consultant, press). **UNVERIFIED** means a weak single source, a conflicting source, or my own inference. All meeting dialogue is simulated.

---

## 1. What the producer sees in v3 (short recap)

From v3-PRD §13, §9, §16.7, §17.2, §25.6:

- **P1 Onboarding** (CPCB registration verified) and **delegates** for PROs and consultants with a signed mandate per producer (§13.3 P1, §8.5).
- **P2 / PP1 Product registry**: models, then **units** by CSV (up to 1 million rows a file) or API, with IMEI or serial hashed **on arrival** at the state server, and **placed-on-market batches by month and state of India** (§9.5 PP1, §9.3).
- **P3 / PP6 End-of-life view**: own units by lifecycle state, with attestation numbers (§13.3 P3, §9.5 PP6).
- **P4 Certificate provenance**: producer enters CPCB certificate references; EcoSure marks each **fully backed, partially backed, or unbacked**; unbacked certificates from participating recyclers **raise a flag for the producer and the SPCB** (§13.3 P4, §14.3 G2, §8.3).
- **P5 Evidence packs**: audit defence, BRSR take-back data, take-back results; maker-checker download; 7-year retention (§13.3 P5).
- **P6 Take-back programmes**: citizen top-ups funded from **producer escrow** (§13.3 P6, §17.2 rail B′).
- Producer module arrives in **phase 1b**, roughly 9–14 months after sanction (§25.1). Stage −1 already asks for **3 producer letters of intent** (§25.2) and phase 1b exit needs **≥10 producers using the registry or packs** (§25.6). Possible fees for evidence packs are an open question (§26.4, OQ-83).

---

## 2. What the real world looks like in 2026 (web research)

| # | Fact | Status | Source |
|---|------|--------|--------|
| W1 | Producers meet e-waste EPR only by buying CPCB-portal certificates from registered recyclers. Certificates are in kg of recovered gold, copper, aluminium, iron, not kg of e-waste or brand | V | E-Waste Rules 2022 r.13–14; CPCB framework (via `02-cpcb-epr-portal.md` F1–F2) |
| W2 | Recycling target is 70% of estimated generation for FY 2025-26 and 2026-27, 80% from 2027-28 | V | CPCB FAQ (eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf); GreenSutra 2026 explainer [S] |
| W3 | The floor/ceiling price band (Rules 15(9)–(10)) is still before the Delhi High Court; no final judgment as of mid-2026; interim relief for Blue Star on the price declaration (Dec 2025 / Jan 2026). Petitioners include Havells, Daikin, Voltas, Blue Star, Samsung, LG | S (consistent across ET, Business Standard, Newslaundry, GreenSutra) | economictimes.indiatimes.com (2025); newslaundry.com 14 Jan 2026; greensutra.in 2026 |
| W4 | CPCB direction dated 7 July 2026 reportedly requires recyclers to upload GST e-invoices for recovered-material sales, otherwise certificates may be treated as invalid | **UNVERIFIED** (LinkedIn post only) | linkedin.com activity 7482795169013100544 |
| W5 | Registered Environment Auditors can be assigned to audit under the EPR framework (Environment Audit Rules 2025) | V | PIB, 29 Aug 2025 (via `26-producer-value.md` S5) |
| W6 | Manufacturers and importers must **already register every IMEI with DoT's Device Setu (ICDR) portal before first sale or import**, under the Telecom Cyber Security Rules 2024 | V | PIB release, 17 Nov 2025 (icdr.ceir.gov.in) |
| W7 | IMEI is a persistent device identifier; it becomes personal data once linked to a person (SIM, owner, claim). DPDP main obligations reportedly start 13–14 May 2027 | S | NALSAR Tech Law Forum; TBA Law; Lexology (2025–26) |
| W8 | Under the 2022 e-waste rules, PROs are no longer a separately registered intermediary for e-waste; they operate as service providers and aggregators. Producers may still "take help of" PROs (r.13(1)) while keeping full responsibility | S for "no registration" (Adhara Viveka glossary, Jun 2026); V for r.13(1) | adhara-viveka.com; indiacode rules text |
| W9 | BRSR Principle 2 asks: processes to reclaim products at end of life (e-waste listed separately); whether EPR applies and whether the collection plan matches the EPR plan; tonnes reclaimed and reused/recycled/safely disposed; reclaimed products as % of products sold per category | V | SEBI circular 12 Jul 2023 (BRSR format); Mahindra BRSR page as an example filer |
| W10 | BRSR is filed only by the top 1,000 listed companies. Most big smartphone brands in India operate through unlisted subsidiaries (for example Samsung India Electronics Pvt Ltd, Apple India Pvt Ltd, Xiaomi Technology India Pvt Ltd) | V for BRSR scope; **UNVERIFIED** for each company's listing status in 2026 (my knowledge, not re-checked) | SEBI; company names from general knowledge |
| W11 | Small-producer EPR spend is roughly ₹50,000–2.5 lakh a year including consultants; certificates ₹5–25/kg in practice | S (consultant marketing) | greenpermits.in 2026 (via `26` S17) |
| W12 | Chargers, adapters and power banks are said to be explicitly in Schedule I from FY 2025-26; power banks also fall under Battery Waste Management Rules registration and battery EPR | **UNVERIFIED** / conflicting (consultant blogs) | blogs.seyecs.com 2026; greenpermits.in 2026 |
| W13 | CPCB is reportedly cross-checking EPR registration against customs Bill of Entry data for importers in 2026 | **UNVERIFIED** (consultant claims) | standphillindia.in; blogs.seyecs.com |
| W14 | Annual e-waste EPR return deadline for FY 2025-26: sources disagree (30 April vs 30 June 2026) | **UNVERIFIED** / conflicting | greenpermits.in; LinkedIn posts |
| W15 | Large PROs run their own apps, collection in 100+ cities, and partner with municipal bodies and state IT departments (Karo Sambhav says it serves Apple, Dell, HP, Lenovo) | S (PRO's own site) | karosambhav.com; weee-forum.org |
| W16 | PRO leaders publicly complain of a "race to the bottom" in compliance cost per kg and paperwork being mistaken for compliance | S | WEEE Forum #PROsatwork article |

What this means in one paragraph: producers already live inside two national government registries (CPCB EPR portal for obligations and certificates, DoT Device Setu for every IMEI). Their EPR teams are measured on **cost per kg of certificate and zero audit findings**, nationally, in metal-kg. The industry is in active litigation with CPCB over price. Any new state platform is judged on one question: *does it reduce my cost or my audit risk, without creating new risk?*

---

## 3. Meeting simulations

### 3.1 The pitch (common to all three)

**Setting:** Video call plus one in-person session in Bhopal. MP Environment Department Additional Chief Secretary opens, MPPCB Member Secretary attends, MPSEDC and the programme's product lead present. Deck follows v3-PRD §1, §9, §13.

**Pitch in the government's words (simulated):**
> "Madhya Pradesh is launching EcoSure in Indore. Register your products, see where they end up, prove your EPR certificates are backed by real recycling, get BRSR-ready data, and run take-back programmes with state backing. We are asking for a letter of intent now. It's free in the pilot."

**Room reaction (all producers):**
- Everyone takes the meeting. Nobody says no to an ACS and the state PCB in the same room. Politeness is not adoption.
- First question from every producer: *"Is this mandatory? Is CPCB on board?"* The honest answer (v3-PRD §1.4, §6.2, SP-03) is "no and not yet; it's an evidence layer." That answer lowers urgency immediately.
- Second question: *"Which other states?"* Answer: Indore only, national design, CPCB view in phase 2 (§5.6, §5.7, §25.7). National teams hear "one city, maybe more later."

### 3.2 P1 — Smartphone brand, Gurugram

**Internal meeting after the pitch.** Present: Head of EPR (Rohit, simulated), Legal Counsel (Data Protection), IT/SAP lead, Sustainability Manager, Government Affairs.

**Government Affairs:** "We need to be seen supporting MP. The CM's office tracks this. Say yes to something small."

**Head of EPR:** "Our obligation is national and in metal-kg. Indore's entire formal target for the pilot is 8 tonnes a month, all brands, all categories (§26.3). Our phones in that are maybe a few hundred kilos. It won't move a single certificate decision. But it doesn't cost us much to be in the room."

**Legal (data):** "They want every IMEI we sell in India, plus placed-on-market by state and month (§9.5 PP1). Three problems.
1. We **already register every IMEI with DoT's Device Setu** before sale. Why would we send the same list to a state environment department? Ask them to get it from DoT or not at all.
2. The PRD says identifiers are hashed **on arrival** (§9.5 PP1). So the raw IMEIs travel to and sit, even briefly, on a state server. Hashing is keyed HMAC with a server key (§9.3) — fine — but an IMEI has only about a million possible serials per model code, so if that key ever leaks, every hash can be reversed in minutes. And once a citizen claims a device (§9.5 PP2), the IMEI is linked to a person, which makes it personal data under DPDP, with the state as fiduciary but us as the source.
3. State-by-month sales is **market-share data**. It sits in a government database subject to RTI. The PRD's RTI section talks about personal data (§14.3 G10) but says nothing about commercial confidentiality. I won't sign off without a written confidentiality commitment and a policy that relies on RTI section 8(1)(d)."

**IT lead:** "A national IMEI extract every month is a real project: SAP to a secure transfer, reconciliation, error reports, a new vendor security review of a state cloud. Four to six months of partial effort, and we'd need their API spec and a CERT-In audit report first. For one city? No."

**Head of EPR on certificate provenance (§13.3 P4):** "This is the part that scares me. We buy certificates from about 15 recyclers across India. Maybe one is in MP. If we type our certificate numbers in, EcoSure compares them to *its own* inflow at that recycler. Most of that recycler's material comes from outside EcoSure, so the tool will say 'partially backed' or 'unbacked' — and the PRD says an unbacked result **flags the SPCB automatically**. We'd be creating a government record that says our certificates are unbacked, based on a tool that can't see the recycler's other inflow. And the certificates are in **metal-kg by EEE code**, while EcoSure records category-kg. The PRD says EcoSure 'never recalculates quantities' — so how is it deciding 'fully backed'? It can't, honestly."

**Legal (regulatory):** "Rule 22 and 23 expose us for *using* false certificates. Today, if a recycler turns out to be a ghost, we say we bought on the CPCB portal from a CPCB-registered recycler in good faith. The day we see an 'unbacked' flag on a state portal and keep the certificate, we lose good faith. My advice: **do not enter certificate references.** If they want to help, let them flag *recyclers* to us privately, and get CPCB to say in writing that checking EcoSure counts as due diligence."

**Sustainability Manager:** "We don't file BRSR in India; we're not listed here. Our parent's global report might use a line like 'X tonnes collected in Indore with the MP government', but they'll want it assured. A take-back pilot for Diwali is plausible from the marketing and sustainability budget — ₹10–15 lakh, for the PR. Not CSR money; brand-linked spend doesn't qualify."

**Decision (P1):** Sign a non-binding LOI to "explore a take-back programme and model-level registration". No unit upload. No certificate entry. Ask for API documentation, security audit, confidentiality clause, and a CPCB letter.

### 3.3 P2 — Listed appliance maker

**Internal meeting.** Present: Compliance Manager (Sneha, simulated), Company Secretary, Head of Sustainability, Legal, Service Network Head.

**Company Secretary:** "Our association is suing CPCB over the floor price. A state regulator's platform that grades our certificates is not neutral territory. Anything we upload may end up in an enforcement file or an RTI answer. Keep distance, but don't offend the MP government — we have a plant application pending there." (Plant detail simulated.)

**Compliance Manager:** "Practical view. Our fans and mixers are sold in the tens of lakhs a year. Serial numbers exist, but no kabadiwala scans the serial on a 12-year-old mixer. So the unit registry does nothing for us on the collection side. Our ACs and fridges come back through **dealer exchange**, not doorstep pickup, and ACs go to scrap dealers for the copper. The PRD's retailer take-back is phase 2 (§9.5 PP7). In the pilot, our products show up as 'category + weight, no unit record' (§9.3). So P3 end-of-life view will be almost empty for us."

**Head of Sustainability:** "BRSR is where this could help. Principle 2 asks for tonnes of our products reclaimed and the percentage of products sold. Our current answer is basically 'we met EPR through certificates', which assessors are starting to question because certificates aren't our products. A **government-verified, brand-specific take-back number** with a verification link would be a genuinely better answer. But only for products we paid to take back, and only if the method is documented so the BRSR Core assessor accepts it. And Indore alone gives a tiny percentage of products sold — it's a showcase, not a disclosure fix."

**Legal on provenance:** Same view as P1, stronger. "We will not create a record that grades our certificates, not while we're in court over certificate pricing."

**Service Network Head:** "Our service centres in Indore already generate e-waste. P8 bulk collection (§13.3) is fine — we'd use that because it's just a pickup."

**Decision (P2):** LOI with conditions: take-back pilot of ₹5–10 lakh if the BRSR pack is designed with their assessor; register **models only**; service centres use bulk pickup. Provenance: no.

### 3.4 P3 — Small importer of power banks and earphones

**Internal meeting.** The founder and the outside EPR consultant, 20 minutes on a phone call.

**Consultant:** "First, half your products may not even be in scope. Power banks are batteries — you're registered on the battery EPR portal too, and EcoSure excludes loose batteries and only accepts batteries embedded in devices (§2.3, §1.4). Whether a power bank counts as 'embedded' is unclear; my guess is agents will refuse or misclassify them. Earphones weigh 20 grams. Your whole annual obligation is a few hundred kilos."

**Founder:** "Do I need serial numbers? My factory doesn't give me a serial list. And I sell on Amazon nationally — I don't know my sales by state."

**Consultant:** "Then the registry (§9.5 PP1) and placed-on-market by state don't apply to you. Provenance — I buy your certificates in bulk for 60 clients from whoever's cheapest that quarter. You won't log in. If anyone logs in, it's me, and I won't either unless a client asks or CPCB requires it."

**Founder:** "Does it cost anything?" — "Free now. Maybe a fee later (OQ-83)." — "Then no."

**Decision (P3):** No action. Might be listed passively if the consultant joins as a delegate.

### 3.5 PRO — the real channel

**Internal meeting.** Business head, legal counsel, city operations lead for MP, tech lead.

**Business head:** "Two sides to this. **Upside:** we already collect in Indore. If our collection points are logged as EcoSure drop points (§11.2 S7), we get state recognition, verified tonnage, and a public verification link we can sell to brand clients as proof. MPPCB relationship matters for our recycler partners in MP. **Downside:** certificate provenance could expose our certificate sourcing. Like every PRO, part of our volume comes from recyclers we can't fully audit. If brands start checking our certificates against a state tool and see 'unbacked', they'll blame us."

**Legal:** "The delegate model needs a signed mandate *per producer* (§8.5). We have hundreds of clients. We need a **portfolio mandate** process and a multi-client view, otherwise we'll never onboard. Also: the PRD says the agent model allows collection agents of 'registered recyclers or producers' (§5.2). We're neither in our own name under the 2022 rules, as far as we understand. So our Indore collection points would have to be agents of one of our recyclers or brands. Fine, but the paperwork falls on us."

**Tech lead:** "We have our own app and traceability platform. We will not re-key. We need an API that accepts our collection events and gives us back attestation numbers. The PRD's public API is phase 2 (§9.5 PP8). CSV in phase 1b is workable for a pilot."

**City operations lead:** "In Indore, IMC's flow and our flow overlap. If EcoSure counts only tonnes above baseline (§24.1), and our existing tonnes are in the baseline, we get no 'additional' credit for what we already do. We'd want our growth measured, not our history ignored."

**Decision (PRO):** Yes to logging Indore collection as drop points and to acting as delegate for a few willing brand clients, **if** provenance runs at recycler level and privately. No fee. Wants API.

---

## 4. Decisions with probabilities

Probabilities are judgement calls for the 12 months after the producer module goes live, assuming v3 is built as written. They are not a statistical model.

| Decision | P1 Smartphone | P2 Appliance (listed) | P3 Small importer | PRO |
|----------|:---:|:---:|:---:|:---:|
| Attend the government pitch | 85% | 80% | 30% | 90% |
| Sign a non-binding LOI (§25.2) | 45% | 40% | 10% | 50% |
| Register **models** (brand, category, weight) | 60% | 55% | 15% | n/a (for clients: 30%) |
| Upload **unit identifiers** (hashed IMEI/serial) as PP1 asks | **10%** | **12%** | **2%** | n/a |
| Provide **placed-on-market by state and month** | 8% | 15% | 3% | n/a |
| Enter **certificate references** for provenance as designed (auto-flag to SPCB) | **8%** | **5%** | 3% (via consultant) | **5%** for clients |
| …same, if provenance were private-first and recycler-level | 35% | 30% | 5% | 40% |
| Fund an Indore **take-back programme** from escrow (§13.3 P6) | 30% (₹10–15 lakh) | 25% (₹5–10 lakh) | 2% | n/a (would *operate* one for a brand: 45%) |
| Use a **BRSR pack** in a filed BRSR | n/a (not listed in India) — use in global ESG report: 20% | 30% | n/a | n/a |
| Use an **audit defence pack** in a real CPCB/REA audit | 10% | 8% | 2% | 10% |
| **Pay a fee** for evidence packs (OQ-83) | 5% | 8% | 1% | 3% |
| Log existing Indore collection as EcoSure drop points | 20% (via own service centres) | 35% (service centres, bulk pickup) | 0% | 45% |
| Still active after 12 months | 30% | 30% | 3% | 45% |

**Reading the table:** producers will say yes to low-risk, visible, small things (LOI, model registration, a take-back showcase, bulk pickups from service centres). They say no to the three things v3 treats as its producer core: **unit registration, state-level sales data, and certificate provenance with automatic regulator flags.** The PRO is the most likely long-term user, but for its own reasons (recognition, verified tonnage it can resell as proof).

**Against v3's own gates:**
- Stage −1 needs 3 producer LOIs (§25.2). Likely met (political LOIs are cheap): ~70%.
- Phase 1b exit needs **≥10 producers using the registry or packs** (§25.6). If "using" means model registration or one take-back pack: ~45%. If it means unit registration or provenance: ~10%.
- The device-traceability KPI (≥60% of phones and laptops with a linked passport, §24.1) is **not** harmed much, because legacy passports at collection count (§9.7). But almost none of those passports will link to a *producer-registered* unit, so "tracking from manufacture" (problem statement objective 1, §4.1) stays mostly on paper.

---

## 5. Answers to the specific questions

### 5.1 Legal review of uploading unit identifiers (even hashed)

**Verdict: most legal teams say no to bulk unit upload in the pilot.**

Reasons they give:
1. **Duplication of a central registry.** IMEIs are already registered with DoT's Device Setu before sale (W6). A state environment platform asking again looks unnecessary and invites the question "under what law?" v3 cites no legal basis requiring producers to share unit data with a state (§21.1 lists norms, none of which compels this).
2. **Raw identifiers leave the producer.** "Hashed on arrival" (§9.5 PP1) means plaintext crosses into the state system. Legal wants hashing **before** upload, or no upload.
3. **Low-entropy identifiers.** An IMEI is an 8-digit model code (TAC) plus a 6-digit serial and a check digit. A keyed hash protects it only while the key stays secret; if the key leaks, the whole table is reversible quickly. v3 has the key in a hardware store and rotates it (§9.6), which is good, but producers carry reputational risk they cannot control.
4. **It becomes personal data once claimed.** When a citizen claims a device (§9.5 PP2), the identifier links to a person. The state is the fiduciary (§21.3), but the producer supplied the dataset. DPDP obligations start around May 2027 (W7, §29.3), right when phase 1b would go live.
5. **Commercial confidentiality.** Placed-on-market by **state and month** is market-share intelligence. v3 has no confidentiality commitment, no RTI section 8(1)(d) policy, and no rule limiting who inside government can see it (§8.3 gives SPCB/CPCB "Agg" on registry; aggregates across brands are safe, but a single-brand-per-category aggregate in one state is not).
6. **Proportionality.** Uploading national unit lists to cover one city fails any "necessary and proportionate" test legal teams apply.

**What legal would accept:** model-level data; identifier matching that happens without producers handing over lists (see Fix 2); a data-sharing agreement with confidentiality, purpose limitation, and deletion.

### 5.2 IT effort

| Task | P1 Smartphone | P2 Appliance | P3 Importer |
|------|---------------|--------------|-------------|
| Model list (CSV) | 1–2 days | 2–3 days | Hours (if bothered) |
| Unit extract, monthly, hashed, from SAP/MES to state API | 3–6 months part-time + security review of state cloud | 2–4 months; serials often in service systems, not sales | Not possible (no serial data) |
| Placed-on-market by state | Possible from sales/distributor data, but not the same as CPCB filing basis | Possible from dealer data | Not possible (marketplace sales) |
| Vendor/security due diligence of state platform | Needed: CERT-In audit report, data processing terms | Needed | Skipped |

v3's 1-million-row CSV limit (§9.5 PP1) is itself a hint of the mismatch: a large phone brand would need 10–20 files a year for India. The effort is real and the benefit is one city.

### 5.3 Does a single-city pilot matter to a national compliance team?

**For compliance: no.** National EPR is metal-kg against a national target (W1, W2). Indore's formal network aims for 8–50 tonnes a month across all brands and categories (§1.3, §26.3). One brand's share is a rounding error in its certificate purchasing.

**For government relations and PR: yes, a little.** Being "the first brand in MP's programme" is worth a press release and a Diwali take-back campaign. That's a marketing decision, not a compliance decision, and it's made by a different budget owner.

**It matters to compliance only if:** (a) CPCB adopts EcoSure's provenance or standard nationally (§25.7, phase 2), or (b) MPPCB starts using EcoSure flags in recycler inspections that affect certificates the producer holds. Either would make producers pay attention quickly — for defensive reasons.

### 5.4 What would they pay for?

| Offer | P1 | P2 | P3 | PRO |
|-------|----|----|----|-----|
| Fee for evidence packs (OQ-83) | No | Unlikely | No | No |
| Take-back programme **execution** (they fund citizen top-ups and outreach; the state provides the verified chain) | Yes, small (₹10–15 lakh pilot) | Yes, small (₹5–10 lakh) | No | Would operate for brands |
| Recycler due-diligence signal ("which recyclers have verified physical inflow and no open flags") | Would use; wouldn't pay a state for it | Same | Via consultant | Would use to choose recyclers; wouldn't pay |
| Assured BRSR/ESG take-back data | Global report: maybe | Yes, if the assessor accepts the method | No | Would resell as a service to clients |

Paying a state government fee raises its own problems (does the department have legal authority to charge; is it a tax; does paying imply endorsement). The only money producers will reliably put in is **take-back programme funding**, and only as a marketing/sustainability spend, in lakhs, not crores.

### 5.5 Does certificate provenance create liability? ("What if our certificates show unbacked?")

**Yes, as designed, and this is the single biggest producer-side flaw in v3.**

- **Unit mismatch.** v3 stores certificates "exactly as on the portal" (metal-kg by end product) and says EcoSure "never recalculates quantities" (§13.3 P4, §19.3). But EcoSure attestations are category-kg of e-waste (§12.2 R5), and v3 has **no EEE code** dimension and **no conversion table** (v2 research `02` gap 1 and change 1 were not carried into v3; there is no "EEE code" anywhere in the PRD). So the "fully / partially / unbacked" label cannot be computed honestly.
- **Pooled certificates.** Certificates are pooled across a recycler's total inflow, not tied to lots (`02` F4). EcoSure sees only EcoSure inflow. A recycler with 90% legitimate non-EcoSure inflow would show most certificates as "partially backed" or "unbacked". That's a false negative about a real recycler, and it lands on the producer's record.
- **Automatic regulator flag.** "Unbacked certificates … raise a flag for the producer **and SPCB**" (§13.3 P4) and SPCB has read access to provenance (§8.3). A producer who volunteers certificate data creates a government record that can be read as notice of possibly false certificates (Rules 22–23; `26` F2). Continuing to hold them after that notice weakens a good-faith defence.
- **Recycler entering producer data.** §16.7 step 2 says "producer **or recycler** enters CPCB certificate references". A recycler entering which producers bought its certificates exposes producers' supplier relationships without their consent.
- **No recognised benefit.** No CPCB or Registered Environment Auditor guidance says checking EcoSure counts as due diligence (`26` F2, still open; not in v3 §29.2). So the tool adds risk and no protection.
- **Litigation context.** Appliance makers are in court with CPCB over certificate pricing (W3). A state tool that grades their certificates will be read as enforcement, not help.

**Rational producer response:** don't enter anything. The feature will sit unused unless redesigned (see Fix 1).

### 5.6 BRSR usefulness

- **Useful for listed producers** (P2-type: listed appliance, electrical, and IT hardware makers). BRSR Principle 2 asks about reclaiming *their* products at end of life, tonnes reused/recycled/safely disposed, and reclaimed as a percentage of products sold (W9). Certificates don't answer that; brand-specific verified take-back does (`26` F3).
- **Not useful as a BRSR tool for most smartphone brands**, which operate in India through unlisted subsidiaries (W10, company status UNVERIFIED). They'd use EcoSure data, if at all, in the parent's global report.
- **Not useful for small importers** (not listed).
- **Scale problem.** Indore take-back tonnes will be a tiny percentage of national products sold, so the BRSR "% reclaimed" indicator barely moves. The value is qualitative ("we run a government-verified programme") plus a small, assurable number.
- **Method matters.** v3's BRSR pack (§13.3 P5) doesn't say which attribution counts. Only producer-funded take-back units and the producer's own bulk returns can honestly be called "our products reclaimed". Brand guesses from mixed citizen pickups should not go in BRSR (`26` F7). v3 dropped v2's attribution method and confidence fields and didn't replace them with a rule.

### 5.7 Take-back budgets

- **Source:** marketing or sustainability budgets. CSR is not allowed for brand-linked or statutory spend (`26` F3, CSR rule 2(1)(d)).
- **Size:** ₹5–15 lakh for a first-city pilot for a big brand. At v3's illustrative ₹30 per phone top-up (§17.3), ₹10 lakh funds about 33,000 phones — far more than Indore's pilot volume. So budgets are not the constraint; **visibility and control** are.
- **Escrow friction:** v3's rail B′ is "producer-funded escrow" (§17.2) with no detail. Producers will ask: whose bank, who can release funds, what if the programme under-spends, can we withdraw, is there a tripartite agreement like the recycler's (§17.2 rail A says tripartite for recyclers only)? Finance teams at producers need a PO, an invoice or agreement, and a refund clause. None is specified.
- **Claims control:** brands will want to publicise results; the state will want to control use of its name. v2 research asked for approved claim templates and no use of the state emblem (`26` change 6). v3 has no claims guardrails (no mention of greenwashing, emblem, or claim templates).
- **Programme design:** brands prefer **exchange-linked** take-back (trade in old device, discount on new), run through retail. v3's take-back is a citizen top-up on any pickup of the brand's category (§13.3 P6), and retailer take-back is phase 2 (§9.5 PP7). So the programme brands actually want arrives late.
- **Model Code of Conduct:** v3 freezes new or increased *state* incentives during elections (§10.2 C7, §23). It doesn't say whether *producer* top-ups are also frozen. Brands will ask, because a Diwali campaign that gets paused is a PR problem.

### 5.8 The PRO's view

- PROs are the real channel to mid-size and small producers (`26` F5), and v3 now has a delegate role — good.
- But v3's delegate needs a **signed mandate per producer** (§8.5) and has no multi-client (portfolio) view, bulk onboarding, or API before phase 2 (§9.5 PP8).
- PROs' legal status under the 2022 e-waste rules is no longer a separate registration (W8, secondary). v3's agent model accepts principals that are "registered recyclers or producers" (§5.2, §19.3 AgentAgreement). A PRO running Indore collection points must structure them as agents of a recycler or a brand client. v3 doesn't describe this path, though `pro` exists as an organisation type (§19.1).
- PROs benefit from recycler-level verification (helps them pick clean recyclers and sell "clean certificates"), but they are threatened by certificate-level grading of their clients' certificates.
- Baseline rules (§24.1) put existing PRO flows into the baseline, so PROs get no "additional" credit for what they already do; they need growth measured and history recognised.

---

## 6. PRD gaps (with v3-PRD section references)

| # | Gap | v3-PRD section | Why it matters to producers |
|---|-----|----------------|------------------------------|
| G1 | Provenance label (fully/partially/unbacked) cannot be computed: certificates are metal-kg by end product, EcoSure records category-kg, there is no EEE code and no conversion table, and "never recalculates quantities" | §13.3 P4, §19.3 CertificateProvenance, §12.2 R5; v2 `02` gaps 1 and 4 not carried over | The core producer feature gives wrong or meaningless answers |
| G2 | No "outside EcoSure coverage" state; a recycler's non-EcoSure inflow makes legitimate certificates look unbacked | §13.3 P4 | False negatives create legal exposure for producers and defamation risk for recyclers |
| G3 | Unbacked results auto-flag the SPCB; SPCB reads provenance; no private review step | §13.3 P4, §14.3 G2, §8.3 | Producers won't volunteer data that becomes a regulator record against them |
| G4 | Recycler can enter a producer's certificate references | §16.7 step 2, §8.3 (recycler W on provenance) | Exposes producers' supplier contracts without consent |
| G5 | No recognition from CPCB or REAs that EcoSure evidence counts as due diligence; not an open question in v3 | §29.2 (missing); v2 `26` change 8(b) | No upside to offset the risk |
| G6 | Bulk unit upload of national identifiers, hashed only after arrival; no client-side hashing; no link to DoT Device Setu | §9.5 PP1, §9.3, §20.6 | Legal and IT blockers; duplicates a central registry |
| G7 | Placed-on-market by state and month requested with no confidentiality, purpose limitation, or RTI 8(1)(d) policy | §9.5 PP1, §14.3 G10, §21.3 | Market-share data in an RTI-exposed database |
| G8 | Most device passports in the pilot will be legacy (no producer link), so "manufacture-to-disposal" tracking is mostly nominal; v3 already admits this | §9.7, §30 item 2 | Producers see an empty end-of-life view |
| G9 | Brand attribution for phones could come free from the IMEI model code (TAC) without any producer upload, but v3 doesn't use it | §9.3, §9.5 PP3 | Missed chance to give producers value without asking them for data |
| G10 | Small importers' products (power banks) may fall under battery rules and be refused or misclassified; no rule for power banks | §2.3, §1.4, §12.2 R5, §19.3 BatteryCheck | Excludes a whole class of small producers; unclear to agents |
| G11 | BRSR pack doesn't define which attribution methods are allowed; v2's method/confidence fields were dropped | §13.3 P5; §28.1 item 20 (v2 had method/confidence) | Risk of unassurable or misleading BRSR numbers |
| G12 | No claims guardrails for take-back publicity (templates, no state emblem, no EPR implication) | §13.3 P6 | Greenwashing and misuse of the government's name |
| G13 | Producer escrow undefined (bank, release rules, refunds, tripartite terms) and no answer on Model Code of Conduct for producer top-ups | §17.2 B′, §17.4, §23 | Finance teams can't approve; campaigns can be paused |
| G14 | Delegates need per-producer mandates; no portfolio view or API until phase 2; PRO collection structure not described | §8.5, §13.3 P1, §9.5 PP8, §5.2 | The main channel to small producers can't onboard at scale |
| G15 | Certificate-exchange (EPRETP) and floor-price litigation risks are not tracked as open questions | §29.2, §29.3 (only floor price listed as a fact to verify) | If purchases become anonymous exchange trades, provenance loses most of its value (`26` F6) |
| G16 | Fee for evidence packs is floated without checking legal authority to charge or producer willingness | §26.4, OQ-83 | Unrealistic funding assumption; pre-mortem story 5 ("nobody pays") stays live |
| G17 | Phase 1b exit "≥10 producers using the registry or packs" doesn't define "using" | §25.6 | Easy to game with model uploads; hides the real adoption gap |
| G18 | Exchange-linked take-back (retail trade-in), which brands actually run, is phase 2 | §9.5 PP7 | The programme type producers want arrives after the pilot is judged |

---

## 7. Fixes

Ordered by leverage.

### Fix 1 — Rebuild certificate provenance as private, recycler-level, and fair (G1–G5, G15)

- **Change the question.** Replace per-certificate "fully / partially / unbacked" with a **recycler-level verified-inflow view**: for each recycler the producer bought from, show EcoSure-verified inflow for the quarter, in EEE code and metal-equivalent kg (using a versioned copy of CPCB Annexure I, with source and effective date), next to the certificates the producer says it bought. Add four states: **consistent**, **needs review**, **inconsistent**, **outside EcoSure coverage** (recycler not in the network or EcoSure share too small to judge).
- **Private first.** Results go only to the producer (and its delegate). No automatic SPCB flag from producer-entered data. SPCB flags come from **recycler-side signals** (capacity breach, mass balance, inflow vs portal procurement), which v3 already has (§12.2 R4–R7, §14.3 G2).
- **Producer-only entry.** Only the producer or its mandated delegate may enter its certificate references; remove the recycler path in §16.7.
- **Get the upside in writing.** Before building, ask MPPCB and CPCB (WM-III) for a written position that a producer's use of EcoSure recycler checks is evidence of due diligence. Add this as a sponsor decision in §29.1 and an open question in §29.2, with EPRETP status and the floor-price judgment tracked alongside.
- **Add EEE code** to lot line items and attestations (v2 `02` change 1).

### Fix 2 — Replace bulk unit upload with match-on-collection (G6–G9)

- **Pilot default: models only.** Producers register models (brand, category, EEE code, typical weight, battery type) and, for phones, their **TAC (model code) ranges**. Every collected phone's IMEI then maps to brand and model automatically, with no unit list from the producer.
- **Optional unit matching without handing over lists.** When a producer wants unit-level proof, EcoSure sends the producer a list of *collected* identifiers in its own TAC or serial ranges (encrypted to that producer), and the producer matches them internally. The producer never uploads its sales list; EcoSure never learns unsold identifiers.
- If a producer does upload units, hash **on the producer's side** with a published tool before transfer, never plaintext at the state.
- **Drop placed-on-market by state** from the pilot. If needed later, take only what the producer already files with CPCB, at the same granularity.
- **Data-sharing agreement** with confidentiality, purpose limitation, deletion, and an RTI policy citing section 8(1)(d) for commercially sensitive producer data (add to §14.3 G10 and §21.3).
- In phase 2, explore a DoT Device Setu lookup (read-only, TAC to brand/model) instead of producer uploads.

### Fix 3 — Make take-back-as-a-service and PROs the producer front door (G10–G14, G16–G18)

- **Lead offer:** a fixed-scope Indore take-back programme a brand can buy from its marketing or sustainability budget: budget, categories, dates, verified tonnage dashboard, public verification link, and an assessor-ready BRSR/ESG pack counting **only** producer-funded take-back and the producer's own bulk returns.
- **Escrow terms** for rail B′: tripartite like the recycler's, release on valid handover code, refund of unused balance, monthly statement. State that producer top-ups follow the same Model Code of Conduct rule as state incentives, and plan campaigns around it.
- **Claims guardrails:** approved claim templates, no state emblem, no implication of EPR fulfilment.
- **PROs as first-class delegates:** portfolio mandate (one agreement covering many producers, each producer able to revoke), multi-client view, CSV import of PRO collection events in phase 1b, API in phase 2. Describe how PRO collection points become agents of a recycler or brand client. Measure PRO growth above its own baseline and show its historical tonnes separately, so existing work is recognised.
- **Retail trade-in logging** moved from phase 2 to phase 1b for one partner brand.
- **Power banks:** write an explicit rule (accepted as embedded-battery devices if intact, or referred to the battery channel), confirmed with MPPCB.
- **Drop pack fees** from the pilot plan (OQ-83) until legal authority and willingness to pay are confirmed.
- **Tighten gates:** Stage −1 LOIs should include at least one brand committing a take-back budget and one PRO committing to log Indore collection. Phase 1b exit "using" should mean *at least one funded programme or one provenance review completed*, not a model upload.

---

## 8. Score

**4.5 / 10** for how well v3 works for producers in real life.

**Why not lower:**
- The positioning is honest and legally correct: no certificates, no trading, no filing on anyone's behalf (§1.4, §6.2, §21.5).
- v3 fixed v2's worst producer mistakes: the target-gap view in the wrong unit is gone, a delegate role exists, and BRSR and take-back are named (§13.2, §28.2 item 12).
- Take-back with a public verification link and bulk pickups from service centres are low-friction wins producers will actually use.
- Recycler-side integrity controls (capacity, mass balance, maker-checker, seals) give a credible base for a real recycler-quality signal.

**Why not higher:**
- The feature v3 calls the producer's main benefit — certificate provenance — can't compute its label honestly (unit mismatch, pooled certificates, no coverage state) and automatically turns producer-volunteered data into regulator flags. Legal teams will block it.
- The product passport asks producers for national identifier lists and state-level sales data to cover one city, with plaintext upload, no confidentiality terms, and no link to the IMEI registry they already use.
- An Indore-only pilot is irrelevant to national metal-kg compliance; value is PR and goodwill. BRSR helps listed appliance makers but not most smartphone subsidiaries; small importers are out of reach and partly out of scope.
- No producer will pay, and the only producer money likely to arrive (take-back budgets of a few lakh) has no defined escrow or claims rules.

**With Fixes 1–3:** about **6.5–7 / 10**. The rest depends on outside facts: whether CPCB or auditors recognise EcoSure evidence, how the certificate exchange and floor-price litigation end, and whether a second state or CPCB adopts the standard.

---

## 9. One-line verdict

Producers will take the meeting, sign a polite letter, and maybe fund a small Indore take-back for PR, but they won't upload unit identifiers or enter a single certificate until provenance is private, fair, measured in the right units, and recognised by CPCB.
