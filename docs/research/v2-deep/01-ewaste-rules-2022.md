# 01 — E-Waste (Management) Rules, 2022 and amendments: legal fit of EcoSure PRD v2

**Agent:** 01 of 36 (v2 deep research swarm)
**Angle:** E-Waste (Management) Rules, 2022 (G.S.R. 801(E)) and every amendment through September 2026; registration categories, EPR targets, EPR certificate generation, storage limits, legal status of collection centres, dealers and aggregators, channelisation; legal fit of each v2 role.
**Research date:** 2026-09-26/27
**PRD files reviewed:** `00-overview.md`, `15-strengthening-changes.md`, `02-roles-rbac.md`, `03-domain-model.md` (grep), `04-consumer.md` (grep), `05-local-recycle-shop.md`, `06-regional-hub.md`, `07-professional-recycler.md`, `08-manufacturer.md`, `10-workflows.md` (grep).
**Status:** Research only. No PRD file was edited.

---

## 1. Sources

### Primary (Gazette, CPCB, MoEFCC, SPCB, PIB)

| # | Source | URL | What it establishes |
|---|--------|-----|---------------------|
| S1 | E-Waste (Management) Rules, 2022, G.S.R. 801(E), 2 Nov 2022, in force 1 Apr 2023 (India Code transcription of Gazette) | https://indiacode.ecourtsindia.com/rules/371a802d/ | Full text of rules 1–25 and Schedules I–V |
| S2 | Same rules, copy hosted by MPPCB (the pilot state's board) | https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf | Same text; confirms MPPCB relies on the 2022 rules |
| S3 | E-Waste (Management) Amendment Rules, 2023, G.S.R. 61(E), 30 Jan 2023 (CPCB-hosted Gazette PDF) | https://eprewaste.cpcb.gov.in/assets/PDF/E-waste%20Management%20First%20Amendment%20Rules%202023.pdf | RoHS documentation change; Schedule II exemptions for solar and medical devices |
| S4 | E-Waste (Management) Second Amendment Rules, 2023, G.S.R. 534(E), 24 Jul 2023 | https://indiacode.ecourtsindia.com/rules/30654748/ | Refrigerant destruction duty; multi-product conversion factor; Schedules II-A/B/C |
| S5 | E-Waste (Management) Amendment Rules, 2024, G.S.R. 164(E), 8 Mar 2024 (CPCB labels it "Third Amendment Rules, 2024") | https://indiacode.ecourtsindia.com/rules/be675cf8/ | Dismantler redefined; rule 9A return-timeline relaxation; rule 15(7)–(10) certificate exchange platform and price band |
| S6 | E-Waste (Management) Second Amendment Rules, 2024, G.S.R. 699(E), 12 Nov 2024 (Jan Vishwas alignment) | https://indiacode.ecourtsindia.com/rules/a838909a/ | Rule 23 (prosecution) substituted to align with decriminalised EP Act s.15 |
| S7 | CPCB "Rules" page for e-waste (updated 17 May 2024) | https://cpcb.nic.in/rules-6/ | CPCB's own list of amendments: First 2023, Second 2023, Third 2024 |
| S8 | CPCB WM-III FAQ under E-Waste (Management) Rules, 2022 (23 Jan 2024) | https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf | Who may collect; dismantlers and bulk consumers do not register; informal-purchase receipt rule; full-equipment rule; GST-linked end-product invoices; fee schedule |
| S9 | CPCB Environmental Compensation Guidelines under EWMR 2022 (approved by MoEFCC OM 09 Sep 2024) | https://www.nirmalvasundhara.com/wp-content/uploads/2025/01/09-10-2024-EC-Guidelines-under-EWMR.pdf (mirror of the CPCB document, File CP-22/31/2024-WM-III) | EC per end product; lowest EPR certificate price per EEE category (₹/kg) |
| S10 | CPCB SOP for registration of stakeholders on the e-waste EPR portal (hosted on Haryana SPCB OCMMS) | https://hrocmms.nic.in/OCMMS/SPCB_DOCUMENTS/EWM.pdf | Recycler registration validity 5 years; CPCB physical/video verification within 3 months |
| S11 | CPCB Implementation Guidelines for E-Waste (Management) Rules, 2016 | https://cpcb.nic.in/displaypdf.php?id=aHdtZC9HVUlERUxJTkVTX0VXQVNURV9SVUxFU18yMDE2LnBkZg== | Historical: collection centres of dismantlers/recyclers need no separate authorisation if listed in the parent authorisation (superseded regime, but still the only CPCB text describing collection centres) |
| S12 | E-Waste (Management) Rules, 2016 (Rajasthan DoIT copy) | https://doitc.rajasthan.gov.in/Files/DOITCWEB/WriteReadData/PoliciesGuidelinesOrders/202109081132511275988v1.pdf | Historical: dealers and collection centres had duties and 120-day storage — removed in 2022 |
| S13 | MPPCB list of authorised e-waste dismantlers, recyclers, refurbishers, manufacturers and their collection centres | https://mppcb.mp.gov.in/Ewaste_List.aspx | MPPCB still lists "collection points" (e.g. Bhopal Municipal Corporation) and several refurbishers |
| S14 | MPPCB recycler authorisation list | https://www.mppcb.mp.gov.in/Recycler.aspx | Indore recyclers: Unique Eco Recycle, Samyak Computer, Primero Waste Solution; Hazargo Industries (Dhar district, Pithampur area) |
| S15 | Solid Waste Management Rules, 2026 (notified 27 Jan 2026, in force 1 Apr 2026) | https://indiacode.ecourtsindia.com/rules/solid-waste-management-rules-2026-4714d326/ and https://swm.cpcb.gov.in/ | E-waste excluded from SWM rules, but registered MRFs may act as deposition centres for e-waste and channel it onward |
| S16 | PIB release on SWM Rules 2026 | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246814&lang=1&reg=3 | Confirms notification and commencement dates |
| S17 | PIB release on circular-economy rules (2026) | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2244104&lang=2&reg=48 | Government's own list of e-waste instruments; NITI Aayog e-waste circularity report, Jan 2026 |
| S18 | Hazardous and Other Wastes (M&TM) Amendment Rules, 2025 (EPR for non-ferrous scrap, effective 1 Apr 2026) | https://moef.gov.in/storage/tender/1751520898.pdf | Adjacent regime for copper/aluminium scrap — possible overlap for recovered fractions |

### Secondary (used only to corroborate or for litigation status)

| # | Source | URL |
|---|--------|-----|
| T1 | Newslaundry, "Blue Star gets temporary relief as Delhi HC stays regulator's e-waste price declaration", 14 Jan 2026 | https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration |
| T2 | Reuters, "From Daikin to Samsung, companies fight Modi over e-waste policy", 11 Apr 2025 | https://www.reuters.com/world/india/daikin-samsung-companies-fight-modi-over-e-waste-policy-2025-04-11/ |
| T3 | GreenSutra, "E-Waste EPR Explained 2026" | https://greensutra.in/news/e-waste-epr-explained-2026/ |
| T4 | Newslaundry, "Hitachi venture allows e-waste recycling bids far below govt price", 27 Jun 2025 | https://www.newslaundry.com/2025/06/27/hitachi-venture-allows-e-waste-recycling-bids-far-below-govt-price |
| T5 | CPCB guidance on EPR certificate generation (mirror) | https://img1.wsimg.com/blobby/go/0410bb8b-c9b9-493e-93f5-94a1728a718a/downloads/Guidance%20document%20for%20E-Waste%20-%20generation%20and.pdf |

---

## 2. Findings

### 2.1 Amendment timeline (verified)

| Instrument | Gazette no. / date | In force | Relevance to EcoSure |
|------------|--------------------|----------|----------------------|
| Principal rules | G.S.R. 801(E), 2 Nov 2022 | 1 Apr 2023 | Whole framework; supersedes 2016 rules (S1) |
| Amendment Rules, 2023 ("First") | G.S.R. 61(E), 30 Jan 2023 | 1 Apr 2023 | RoHS only; no custody impact (S3) |
| Second Amendment Rules, 2023 | G.S.R. 534(E), 24 Jul 2023 | On publication | Recyclers and refurbishers must manage end-of-life refrigerant using CPCB-approved destruction technology — affects ACs and fridges in the pickup catalogue (S4) |
| Amendment Rules, 2024 (CPCB: "Third") | G.S.R. 164(E), 8 Mar 2024 | On publication | Dismantler no longer defined by SPCB authorisation, but "in accordance with CPCB guidelines"; certificate exchange platform; price band 30–100% of EC (S5) |
| Second Amendment Rules, 2024 | G.S.R. 699(E), 12 Nov 2024 | On publication | Rule 23 prosecution substituted in line with Jan Vishwas decriminalisation (S6). Exact new wording **UNVERIFIED** (source text truncated) |
| 2025 amendments | None found | — | **UNVERIFIED absence.** No E-Waste amendment notified in 2025 appears on CPCB (S7), India Code, or PIB (S17). The task brief's "2025 amendments" could not be confirmed |
| 2026 amendments | None found | — | **UNVERIFIED absence** as of research date. Adjacent 2026 instrument: SWM Rules 2026 (S15) |

Naming trap: the Gazette title of G.S.R. 164(E) is "Amendment Rules, 2024", CPCB calls it "Third Amendment Rules, 2024", and G.S.R. 699(E) is titled "Second Amendment Rules, 2024". PRD and legal annexes should cite by G.S.R. number, not by ordinal.

### 2.2 Registration categories (rule 4)

- Only four categories register on the CPCB portal: **manufacturer, producer, refurbisher, recycler** (rule 4(1), S1; S8).
- No business in these categories without registration (rule 4(3)).
- **Rule 4(4): registered entities "shall not deal with any unregistered manufacturer, producer, recycler and refurbisher."** Shops and hubs are none of these four, so a recycler may lawfully buy from them — unless the shop or hub is in fact acting as an unregistered refurbisher (repairing and reselling) or recycler.
- Dismantlers and bulk consumers do **not** register on the portal (S8).
- Recycler registration needs SPCB Consent to Operate (Air and Water Acts) plus authorisation under the Hazardous and Other Wastes Rules, 2016; registration is valid 5 years; CPCB verifies within 3 months (S8, S10). So the correct statutory identifier is a **CPCB EPR-portal registration**, backed by SPCB CTO and HOWM authorisation. The 2022 rules do not issue a "CPCB authorization".
- **Rule 2(c): the rules do not apply to micro enterprises** as defined in the MSMED Act, 2006. How CPCB applies this exclusion to micro recyclers or collectors is **UNVERIFIED**.
- Rule 2(a): **waste batteries are excluded** and fall under the Battery Waste Management Rules, 2022.

### 2.3 Who may collect: legal status of shops, hubs, collection centres, dealers and aggregators

- CPCB FAQ (S8): "Under the E-Waste (Management) Rules 2022, **registered Producer, Recyclers and Refurbishers** ... can collect E-Waste." Recyclers and refurbishers may collect from anywhere in India.
- The 2016 rules gave dealers and collection centres their own duties, authorisation and a 120-day storage cap (S12). **The 2022 rules removed these roles.** They survive in only one line: rule 13(1) lets producers "take help of third party organisations such as producer responsibility organisations, collection centres, dealers etc." with the proviso that "**the extended producer responsibility shall lie entirely on the producer only**."
- Rule 9(10): recyclers may "take help of dismantlers"; the recycler is responsible for material flow to and from them, and dismantlers must give material only to registered recyclers and keep records.
- Aggregators and kabadiwalas have **no defined status**. However, CPCB accepts recycler purchases from the informal sector if the recycler uploads "any sales receipt having name and address of the seller"; formal purchases need the seller's sales invoice; **commodity weight is mandatory on the seller's invoice** (S8).
- CPCB expects recyclers to collect **full equipment**, not parts, so that nothing is stripped and leaked to the informal sector (S8).
- Rule 8: **bulk consumers** (entities that used ≥ 1,000 units of Schedule I EEE in a financial year, including e-retailers) must hand e-waste **only to a registered producer, refurbisher or recycler**.
- Schedule V: urban and rural local bodies must channel e-waste found in municipal waste, and orphan products, to registered recyclers or refurbishers, and facilitate collection systems. The **SWM Rules 2026** allow registered Material Recovery Facilities to act as **deposition centres for e-waste** for onward channelisation (S15, S16).
- MPPCB still publishes "collection centres" and "collection points" of authorised entities, including Bhopal Municipal Corporation (S13). This suggests the state board recognises collection points **attached to an authorised entity**. Whether MPPCB registers stand-alone collection points under any current instrument is **UNVERIFIED**.

**Conclusion:** a shop or hub has **no independent legal status** under the 2022 rules. It is lawful only as the documented agent or collection point of a registered recycler (or producer, PRO or refurbisher), as a dismantler working for a recycler, or as a local-body or MRF deposition point. Whether a stand-alone hub needs its own MPPCB consent (Consent to Establish / Consent to Operate) is **UNVERIFIED** and must be settled with MPPCB before launch.

### 2.4 Storage time limits (rule 11)

- Manufacturers, producers, refurbishers and recyclers may store e-waste for **no more than 180 days**, keep records of sale, transfer and storage, and make them available for inspection. CPCB may extend this to 365 days only for process development (S1).
- The rule does not name shops, hubs or dismantlers. Once material is legally the recycler's (for example, a hub operating as the recycler's collection point), the recycler's 180-day clock plausibly runs from the recycler's receipt at that point. **UNVERIFIED** whether MPPCB would start the clock at citizen handover, shop, hub, or recycler gate. The conservative design is a 180-day ceiling from first collection.
- The old 2016 cap for collection centres was 120 days (S12). It no longer applies, but inspectors may still use it informally.

### 2.5 EPR targets (Schedules III and IV)

| FY | Schedule III (established producers) | Schedule IV (new producers) |
|----|---------------------------------------|-----------------------------|
| 2023-24 | 60% of EEE placed on market in year Y−X | 15% of FY 2021-22 sales |
| 2024-25 | 60% | 20% of FY 2022-23 sales |
| **2025-26** | **70%** | 20% of sales two years back |
| **2026-27 (current)** | **70%** | 20% of sales two years back |
| 2027-28 | 80% | same |
| 2028-29 onward | 80% (may be increased after review) | same |

X is the product's average life, set by CPCB. Used-EEE importers carry 100%. Solar PV has no recycling target, only storage until 2034-35 (S1, S8).

### 2.6 How EPR certificates are generated (rules 13–15, CPCB framework)

- **CPCB generates** certificates on the portal **in favour of a registered recycler** (rule 14(1)(i)). Producers meet obligations only by **online purchase of certificates from registered recyclers**, submitted in quarterly returns (rule 13(3)(i)). Where producer and recycler figures differ, the **lower figure** counts (rule 13(3)(iii)).
- Quantity eligible: **QEPR = Qp × Cf**, where Qp is the quantity of **end product** recovered and Cf is a CPCB conversion factor (rule 14(1)(ii)). End products are **gold, copper, aluminium and iron**. The recycler must upload procurement invoices or receipts, production data, and **GST-linked end-product sales invoices** (S8, T5).
- **The obligation is independent of EEE code** (S8). A producer can buy certificates from any registered recycler that can recycle the EEE code for which the obligation was assigned. **Brand of the collected device is legally irrelevant to certificate generation.**
- Certificate validity: 2 years from the end of the FY of generation. Unique number = year + end-product code + recycler code + unique code. Statutory denominations 100/200/500/1000 kg (rule 14(1)(iii)–(iv)); CPCB guidance allows smaller denominations (T5).
- Purchase cap: current-year liability + leftover + 5% (rule 15(1)); purchases must be proportionate each quarter (rule 15(2)).
- Refurbishing certificates **defer** a producer's obligation; only 75% of the deferred quantity returns. They never extinguish the obligation (rule 14(2)).
- **Price band** (rule 15(9)–(10), inserted 2024): highest price = 100% and lowest = 30% of EC. The CPCB EC Guidelines (S9) set the **lowest certificate price per kg by category**: IT and telecom (ITEW) ₹34; consumer electrical and electronics (CEEW) ₹22; large and small EEE (LSEEW) ₹23; tools (EETW) ₹25; toys (TLSEW) ₹10; medical and lab (MOW/LIW) ₹41. The EC basis assumes ₹25/kg collection and transport cost.
- **Litigation:** Samsung, LG, Daikin, Havells, Voltas, Blue Star and Johnson Controls-Hitachi have challenged the price band in the Delhi High Court (T2). On 24 Dec 2025 an interim order stopped CPCB from insisting on the price-compliance declaration from Blue Star (T1). Status after June 2026 is **UNVERIFIED**; a secondary source says no final judgment as of June 2026 (T3). Reports describe certificates trading below the floor (T4).
- Penalties: EC for false information and for aiding or abetting (rule 22(3)); revocation of recycler registration for over-generation of certificates (rule 22(5)); prosecution under EP Act s.15 (rule 23, as substituted in 2024).

### 2.7 Adjacent obligations that touch the pickup catalogue

- **Batteries** (rule 2(a)): loose batteries, and arguably batteries removed from devices, go through Battery Waste Management Rules channels. The e-waste recycler may not be registered for them.
- **Refrigerant** (G.S.R. 534(E)): ACs and fridges must reach the recycler with the refrigerant circuit intact; venting or degassing at shop level defeats the recycler's duty.
- **Refurbishment** (rules 7 and 14(2)): repairing and reselling devices is registrable refurbisher activity (portal registration + SPCB CTO + HOWM authorisation, S8). Many Indore mobile-repair shops, the target shop persona, do exactly this.
- **Non-ferrous scrap EPR** (HOWM Amendment Rules 2025, from 1 Apr 2026, S18): may apply to copper and aluminium fractions sold onward. Overlap with e-waste fractions is **UNVERIFIED**.
- **Rule 10 state duties:** the state Industries Department must earmark industrial space for dismantling and recycling; the Labour Department must recognise and register dismantling workers and help them form groups. This gives an SPCB/state sponsor a direct statutory hook for OQ-74 (informal collectors).

---

## 3. v2 fit assessment (role by role)

| v2 role | Statutory category | Fit | Notes |
|---------|--------------------|-----|-------|
| Citizen / household | Not regulated (consumer) | **Good** | No legal duty to use registered channels; UPI incentive lawful |
| Society / small office | Bulk consumer only if ≥ 1,000 EEE units used in FY | **Partial** | A true bulk consumer must hand over only to a registered producer, refurbisher or recycler (rule 8). A shop taking the handover in its own name puts the office in breach. The PRD has no bulk-consumer flag |
| Local collection shop (`local_shop`) | **None.** Lawful only as agent or collection point of a registered recycler, producer or PRO (rule 13(1)), or informal seller with a receipt (S8) | **Weak as written** | PRD treats shops as independent traders paid on a platform rate card. Nothing links a shop to a legal principal. Micro tier (Aadhaar + photo) is lawful for a seller, but any repair or resale makes the shop an unregistered refurbisher (rule 4(3)–(4)). PRD's "Issuing attestations: out of scope" is correct |
| Regional hub (`regional_hub`) | **None.** Plausibly a recycler's collection point or dismantler (rule 9(10)); MPPCB consent position **UNVERIFIED** | **Partial** | The offtake-agreement gate (H1–H2) is the right instinct: it ties the hub to a registered recycler. But the PRD frames the hub as a buyer and reseller that pays shops and is paid by the recycler, which is trading, not agency. Dwell caps are configurable with no statutory ceiling; 180-day rule 11 is not referenced. No hub consent or registration field |
| Authorized recycler (`pro_recycler`) | **Recycler** (rule 4(1)(d)) | **Good, with terminology fixes** | Root-of-trust framing matches rules 13–14. But PRD R1 asks for a "CPCB authorization number"; the actual instruments are CPCB portal registration + SPCB CTO + HOWM authorisation + registered EEE codes + capacity. Attestation "processed weight" is input weight, while certificates are end-product × Cf; the PRD's `cpcb_portal_ref` field is the right bridge. Capacity check (R4) should use registered capacity per portal. No refrigerant or battery capability fields |
| Producer (`producer`) | **Producer** (rule 4(1)(b)) | **Weak on value proposition** | Producers discharge EPR only by buying CPCB certificates. Brand attribution (P3) has no statutory effect because obligation is code-independent and certificate-based. The target-gap view (P4) compares input kg with a target that is fulfilled in end-product certificate kg, so it can mislead. The take-back pool (P7) buys the producer nothing statutory unless paired with certificate purchase from the recycler that processed those lots. Rule 13(1) proviso: using EcoSure does not shift any liability |
| SPCB (`spcb_officer`) | Schedule V duties: inventorisation, EPR monitoring as directed by CPCB, random inspection of recyclers and refurbishers, capacity utilisation | **Good** | Custody chain directly supports inventorisation and capacity monitoring. Inspection pack (G5–G6) matches Schedule V(2)(3) |
| Local body (not a v2 role) | Schedule V(3); SWM Rules 2026 MRFs as e-waste deposition centres | **Missed opportunity** | Indore Municipal Corporation MRFs could be statutory-backed hubs or drop points |

**Honesty positioning:** strong. "Custody attestation, not an EPR certificate", no issuance, no trading, and portal as sole truth all match rules 13–15. Attestation numbering must not imitate the certificate number format (year + end-product code + recycler code).

---

## 4. Gaps and risks

| # | Gap / risk | Severity | Rule basis |
|---|------------|----------|------------|
| G1 | Shops and hubs have no legal principal. If MPPCB treats a hub as an unconsented e-waste facility, or a shop as an unregistered refurbisher, the SPCB-sponsored pilot is visibly non-compliant with its own sponsor's rules | **High** | Rules 4(3), 4(4), 9(10), 13(1); "facility" definition 3(1)(n) |
| G2 | Bulk-consumer handover to an unregistered shop breaches rule 8, and offices and colleges are a named v2 channel (society drives, P8 bulk pickups) | **High** | Rule 8 |
| G3 | Producer value is overstated: attribution and target-gap by input weight have no effect on statutory compliance, and could be misread as offsetting obligation | **High** (trust/regulatory) | Rules 13(3), 14(1)(ii); FAQ "obligation independent of EEE code" |
| G4 | Wrong statutory identifier ("CPCB authorization number") for recyclers; no capture of SPCB CTO, HOWM authorisation, registered EEE codes, validity, or registered capacity | Medium | Rule 4; S8, S10 |
| G5 | No statutory ceiling on dwell. Configurable offtake dwell could exceed 180 days across shop → hub → recycler | Medium | Rule 11 |
| G6 | Batteries and refrigerant-bearing appliances not separated; a lot that mixes batteries is outside the e-waste recycler's scope | Medium | Rule 2(a); G.S.R. 534(E) |
| G7 | Shops that repair and resell collected devices act as unregistered refurbishers; the PRD neither prohibits resale nor routes reusable devices to registered refurbishers (who exist in MP, S13) | Medium | Rules 4(3), 7, 14(2) |
| G8 | Recycler portal uploads need a seller invoice or receipt with name, address and commodity weight. The PRD has no document that satisfies this, so recyclers must re-key EcoSure data into paper receipts, which weakens the chain | Medium (also a missed value) | CPCB FAQ (S8) |
| G9 | Parts-stripping: CPCB wants full equipment at recyclers. The PRD records category + count, and shop weights, but does not flag stripped devices (missing boards, compressors, copper) | Medium | CPCB FAQ (S8) |
| G10 | Certificate price floor is sub judice. If struck down, recycler margins on EcoSure feedstock fall and offtake agreements may be renegotiated | Medium (economic) | Rule 15(9); T1–T3 |
| G11 | Micro-enterprise exclusion (rule 2(c)) is unclear. It could help (micro shops outside the rules) or confuse (a micro "recycler" claiming exemption) | Low / **UNVERIFIED** | Rule 2(c) |
| G12 | Ordinal naming of amendments is inconsistent (CPCB "Third" vs Gazette "Amendment Rules, 2024"); legal annexes may cite the wrong instrument | Low | S5, S6, S7 |

---

## 5. Recommended PRD changes (file + exact change)

These are proposed edits for the PRD owner; this agent did not apply them.

1. **`02-roles-rbac.md` §4 Onboarding tiers — add a column "Statutory basis" and a rule below the table:**
   > "Shops and hubs have no registration category under the E-Waste (Management) Rules, 2022 (rule 4). Each shop and hub operates only as a documented collection point of a named registered recycler (or producer / PRO / refurbisher) under rule 13(1) or rule 9(10). Onboarding records the principal's CPCB portal registration number, and the principal's written appointment letter. A shop or hub with no active principal cannot collect."
   Also change Recycler requirement from "Authorization number, validity, capacity" to **"CPCB EPR-portal recycler registration number and validity; SPCB Consent to Operate and HOWM authorisation numbers and validity; registered EEE codes; registered annual capacity."**

2. **`07-professional-recycler.md` R1 — replace** "CPCB authorization number, validity dates, authorized capacity, and document upload. Operator verifies against the CPCB list before approval." **with**
   > "CPCB EPR-portal recycler registration (number, validity, registered EEE codes, registered capacity), SPCB Consent to Operate and Hazardous Waste authorisation (numbers, validity), and whether the recycler can accept refrigerant-bearing appliances and batteries (Battery Waste Management Rules registration). Operator verifies against the CPCB portal and the MPPCB list. Any expiry blocks new attestations and inbound trips."
   Rename "CPCB authorization" to "CPCB registration" throughout (`00-overview.md` principle 3, `03-domain-model.md` `issuer_registration_id` comment, `09-government.md`, `12-nfr-security.md` §7).

3. **`06-regional-hub.md` H1/H2/H5 — add:**
   > H1: "Hub records its MPPCB consent status (CTE/CTO number or written MPPCB confirmation that none is required as a collection point of the named recycler). Hub cannot receive lots without one of these." (Open question for sponsor; see change 12.)
   > H2: "`max_dwell_days` and `monsoon_max_dwell_days` cannot exceed a corridor statutory ceiling (default 180 days from first collection at shop, per rule 11); operator can only lower it."
   > H5: "Hard compliance flag `statutory_dwell_breach` when any lot's age from first collection reaches 150 days (warning) / 180 days (breach)."
   Mirror in `03-domain-model.md` (`OfftakeAgreement` constraint; new `flag_type` value) and `10-workflows.md` §5.

4. **`08-manufacturer.md` P3/P4/P7 and §1 Summary — reframe producer value.** Add to Summary:
   > "Under rules 13–15, producers meet EPR only by buying EPR certificates that CPCB generates for registered recyclers from recovered end products (gold, copper, aluminium, iron). EPR obligation is independent of EEE code and brand. EcoSure attribution and custody evidence do not reduce, offset, or discharge any EPR obligation; they support audit defensibility of certificates bought from EcoSure-network recyclers and brand-level take-back reporting."
   In P4, rename "Target-gap view" to **"Certificate coverage view"**: show CPCB certificates the producer has bought from EcoSure-network recyclers (entered by the producer with the portal reference), and next to them the attested custody lots behind those recyclers' certificates. Remove the "attested and attributed weight against target, and the gap" line. In P7 add: "Take-back funding is paired with a certificate purchase agreement with the processing recycler, made off-platform; EcoSure records the reference only."

5. **`04-consumer.md` C8 (society drives) and `08-manufacturer.md` P8 (bulk pickups) — add bulk-consumer handling:**
   > "Requester declares whether it is a bulk consumer (used ≥ 1,000 Schedule I EEE units in the FY, rule 8). For bulk consumers, the handover receipt names the registered recycler as the receiving entity, with the shop or hub shown as its collection agent, and carries the recycler's CPCB registration number."

6. **`05-local-recycle-shop.md` §4 Out of scope — add** "Repairing or reselling collected devices (that is refurbisher activity under rule 7 and needs CPCB registration)". **Add S11 Reuse routing (Phase 2):** "Working devices flagged at collection can be routed to a registered refurbisher on the corridor list instead of the recycler; the refurbisher's CPCB registration is verified like a recycler's."

7. **`05-local-recycle-shop.md` S3 and `03-domain-model.md` `PickupItem` — add stream flags:**
   > "`stream`: `e_waste` | `battery` (Battery Waste Management Rules, 2022 — separate lot, sent only to a battery-registered recycler) | `refrigerant_bearing` (must stay sealed; no degassing at shop)." Add `completeness` (`whole` | `parts_missing`) with a photo for items that come in missing boards, compressors or coils.

8. **`07-professional-recycler.md` new R9 (Phase 1) — "Portal-ready procurement documents":**
   > "For every accepted lot EcoSure produces a seller receipt / invoice (seller name and address, commodity weight per category, date, lot and trip IDs) that meets the CPCB FAQ requirement for procurement proof, for the recycler to upload to the CPCB portal. EcoSure does not upload on the recycler's behalf."

9. **`07-professional-recycler.md` R4 — add:**
   > "Attestation number format must not resemble the CPCB EPR certificate format (year + end-product code + recycler code + unique code, rule 14(1)(iv)). Use the prefix `ECS-CA-`. Attestations state input weight received and processed; they never state end-product or certificate quantities."

10. **`00-overview.md` §11 Glossary — add rows:**
    > "**Registered recycler**: recycler registered on the CPCB EPR portal under rule 4 (with SPCB CTO and HOWM authorisation). Replaces 'CPCB-authorized recycler'."
    > "**Collection point**: a shop or hub operating as the documented agent of a registered recycler. Not a statutory category."
    > "**Bulk consumer**: rule 3(1)(b) entity; must hand over only to registered producer, refurbisher or recycler."
    Update the EPR row to cite "E-Waste (Management) Rules, 2022 (G.S.R. 801(E)) as amended by G.S.R. 61(E) 2023, 534(E) 2023, 164(E) 2024 and 699(E) 2024".

11. **`00-overview.md` §8 Corridor launch checklist — add:**
    > "Each hub and shop has an active principal (registered recycler appointment letter); MPPCB has confirmed in writing the consent position for hubs; at least one battery-registered recycler channel exists."

12. **`14-open-questions.md` Sponsor decisions — add:**
    > "SP-xx: MPPCB written position on whether (a) hubs need CTE/CTO as stand-alone e-waste facilities, (b) shops acting as recycler collection points need any registration, (c) rule 11's 180-day clock starts at first collection or at recycler receipt, and (d) rule 2(c) micro-enterprise exclusion applies to collectors."
    > "OQ-xx: Can Indore Municipal Corporation MRFs act as EcoSure hubs or drop points under SWM Rules 2026 (MRF as e-waste deposition centre)?"
    > "OQ-xx: Contingency if the Delhi High Court strikes down the rule 15(9) certificate price band — offtake price review trigger."

13. **`09-government.md` — add G-feature "Schedule V support":** export of custody data in a form that supports MPPCB's Schedule V duties (inventorisation, recycler capacity utilisation), with the formal-network-only label. Also add a reference to the rule 10 Labour Department duty (registration of dismantling workers) as the statutory route for OQ-74.

---

## 6. Score

**6 / 10** for legal fit with the E-Waste (Management) Rules, 2022 as amended.

- **What earns the 6:** the positioning is legally honest and correct. The CPCB portal is the only certificate source, attestations are clearly not certificates, there is no trading, and the recycler is the root of trust. That matches rules 13–15 and removes the biggest regulatory risk from v1. SPCB monitoring matches Schedule V.
- **What holds it back:**
  - Shops and hubs have no statutory principal.
  - The bulk-consumer handover breaches rule 8.
  - Producer attribution and the target-gap view imply value the rules do not recognise.
  - Recycler credentials use the wrong terminology.
  - There is no 180-day storage ceiling.
  - The battery, refrigerant and refurbishment streams are unaddressed.
- **How to reach 8:** make changes 1–5 and get MPPCB's written answers (change 12). All of this is PRD and documentation work; no new build is needed.
