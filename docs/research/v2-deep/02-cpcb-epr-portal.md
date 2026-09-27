# 02 — CPCB E-Waste EPR Portal vs EcoSure PRD v2

**Agent:** 02 of 36 (v2 deep research swarm)
**Angle:** How the CPCB e-waste EPR portal really works (how recyclers generate certificates, conversion factors, floor and ceiling prices, environmental compensation, returns, what data the portal needs, whether there is an API) and whether v2's "custody attestation + optional portal reference + producer worksheet export" design fits it.
**Date:** 2026-09-26
**PRD files reviewed:** `00-overview.md`, `15-strengthening-changes.md`, `07-professional-recycler.md`, `08-manufacturer.md` (plus `03-domain-model.md` and `11-integrations.md` for field names)
**Status:** Research only. No PRD files were edited.

Legend: **[V]** = verified against an official or primary source listed below. **[S]** = secondary source (press, consultant, law firm). **UNVERIFIED** = plausible but not confirmed from an official source.

---

## 1. Sources

| # | Source | Type |
|---|--------|------|
| S1 | E-Waste (Management) Rules, 2022 (G.S.R. 801(E), 2 Nov 2022), English text hosted by MPPCB: https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf | Official (rules text) |
| S2 | E-Waste (Management) Amendment Rules, 2024 (G.S.R. 164(E), 8 Mar 2024): https://indiacode.ecourtsindia.com/rules/be675cf8/ | Official (gazette text) |
| S3 | CPCB WM-III FAQ under E-Waste (Management) Rules, 2022 (23 Jan 2024): https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf | Official |
| S4 | CPCB, *Guidance document for generation and transfer of EPR Certificate for E-Waste Management* (copies: https://keralapcbonline.com/pcb/gotoDownloadNotification.action?notificationSetUpVO.id=6MIvFkViazY%3D and https://img1.wsimg.com/blobby/go/0410bb8b-c9b9-493e-93f5-94a1728a718a/downloads/Guidance%20document%20for%20E-Waste%20-%20generation%20and.pdf) | Official (CPCB document, re-hosted) |
| S5 | CPCB, *Guidelines for Environment Compensation (EC) under E-Waste (Management) Rules, 2022* (Aug 2024; approved by MoEFCC OM F.No. 12/136/2021-HSM, 9 Sep 2024), TNPCB copy: https://www.tnpcb.gov.in/PDF/Waste_Mngt/E-waste/EnvironmentalCompensation.pdf | Official |
| S6 | CPCB, *Framework for generation of EPR Certificate under E-Waste (Management) Rules, 2022* (notice 21 Sep 2023), linked from S3: https://cpcb.nic.in/openpdffile.php?id=TGF0ZXN0RmlsZS8zOTBfMTY5NTM1ODM1OF9tZWRpYXBob3RvMjA2MzgucGRm ; summaries: https://enviliance.com/regions/south-asia/in/report_11067 , https://chemical.chemlinked.com/news/chemical-news/india-establishes-epr-framework-for-key-metals-recycled-from-e-waste | Official (via summary; full Annexure I table not re-read line by line) |
| S7 | CPCB SOP for recycler registration on the e-waste portal (HSPCB copy): https://hrocmms.nic.in/OCMMS/SPCB_DOCUMENTS/EWM.pdf | Official |
| S8 | MPCB service page, producer registration on the e-waste EPR portal: https://mpcb.gov.in/sites/default/files/producer_ewm.pdf | Official (SPCB) |
| S9 | Plastic EPR portal bulk upload / CPCB-BOT guidance (for comparison only): https://www.nirmalvasundhara.com/wp-content/uploads/2024/04/Guidance_Manual_Bulk_Upload.pdf ; https://eprplastic.cpcb.gov.in/assets/pdfs/Instruction_Sheet.pdf | Official (plastic portal, not e-waste) |
| S10 | CPCB e-waste rules page listing amendments: https://cpcb.nic.in/rules-6/ | Official |
| S11 | Reuters, 11 Apr 2025, "From Daikin to Samsung, companies fight Modi over e-waste policy": https://www.reuters.com/world/india/daikin-samsung-companies-fight-modi-over-e-waste-policy-2025-04-11/ | [S] Press |
| S12 | Economic Times, Centre asks Delhi HC to dismiss pleas (2025): https://economictimes.indiatimes.com/industry/cons-products/electronics/govt-asks-delhi-hc-to-dismiss-firms-pleas-against-e-waste-payout-rules/articleshow/122324524.cms | [S] Press |
| S13 | Newslaundry, 14 Jan 2026, Delhi HC stays CPCB price declaration for Blue Star: https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration | [S] Press |
| S14 | LinkedIn litigation update (hearing of 27 Feb 2026, next date 17 Apr 2026): https://www.linkedin.com/posts/rohit-kr-d-771991112_oeder-activity-7434565554159480832-KHM7 | [S] Weak (social post) |
| S15 | Trilegal, Environment Law Monthly Updates, March 2024: https://trilegal.com/wp-content/uploads/2024/04/Environment-Law-Monthly-Updates-March-2024-for-publication-1.pdf | [S] Law firm |

---

## 2. Findings

### F1. Only CPCB, through the portal, generates EPR certificates, and they are credited to registered recyclers [V]
- Rule 14(1)(i): "The Central Pollution Control Board shall generate extended producer responsibility certificate through the portal in favour of a registered recycler" (S1).
- Producers meet their obligation only by buying certificates online from registered recyclers and submitting them through quarterly returns (Rule 13(3)(i), S1).
- Producers may use PROs, collection centres, dealers and similar third parties, but "the extended producer responsibility shall lie entirely on the producer only" (Rule 13(1), S1).
- Since 15 June 2023, recyclers must generate certificates through the portal (S3).

**Implication:** v2's rule that EcoSure never issues EPR certificates is legally required, not just a positioning choice.

### F2. Certificates are counted in kg of recovered metal, not kg of e-waste [V]
- Formula: **QEPR = Qp × Cf**, where Qp is the quantity of end product and Cf is a conversion factor set by CPCB with Steering Committee approval (Rule 14(1)(ii), S1).
- The CPCB framework (S6) names four end products: **gold (Au), copper (Cu), aluminium (Al) and iron/steel (Fe)**. Annexure I gives the average weight share of each metal for each of the 106 EEE codes. Example: a smartphone (ITEW15) is about Au 0.00157%, Cu 3%, Fe 3%, Al 7.97% (S6 summary).
- The gold obligation is phased in: 20% (FY23-24), 30%, 45%, **60% (FY26-27)**, 80%, then 100% from FY28-29. Cu, Al and Fe are at 100% (S6). There are rules for offsetting surplus or deficit gold against Cu/Al within ±5% (S3).
- The overall recycling target is 60% of estimated generation in FY23-24 and FY24-25, **70% in FY25-26 and FY26-27**, and 80% from FY27-28 (S3).

**Implication:** An attestation that says "X kg of category Y processed" is **not** the unit producers are measured in. Producer obligations are metal kg derived from EEE code, sales and product life.

### F3. How a recycler generates certificates on the portal (S4) [V]
The recycler enters data in a fixed order:
1. **Procurement data**: invoice per EEE item code with quantity. For purchases from the formal sector, the seller's sales invoice is uploaded. For purchases from the informal sector, "any sales receipt having name and address of the seller" is enough (S3). **Commodity weight on the seller invoice is mandatory** (S3). Annual procurement cannot exceed the recycler's processing capacity.
2. **Production data**: end products produced per item code, entered by recycling date. Entries must be sequential, cannot be backdated, and cannot exceed procured quantity.
3. **Credit generation against end-product sale**: needs a **GST-linked sales invoice** for the metal sold. Credit cannot exceed produced quantity. Entries are sequential with no backdating.
4. **Generate certificates** in denominations of 0.001–1000 kg. Each certificate number encodes year, end-product code, recycler code and a unique code (Rule 14(1)(iv), S1).
5. **Transfer to a producer** through a two-sided OTP and public-key handshake.

- **Nothing can be edited after submission** (S3, S4).
- Recyclers must collect **whole equipment**, not stripped parts, for it to count (S3).
- Material the recycler does not process itself must go to another registered recycler, and residue must go to a TSDF, with records kept (Rule 9, S1).

### F4. Certificates are pooled and do not trace back to a lot [V, by inference from S1/S4]
- Credits come from pooled production and sales per item code, and certificates are issued in arbitrary denominations.
- The producer's obligation "is independent of EEE code" (S3), although the recycler must be registered for the relevant EEE code (S3).
- So **no single EPR certificate number corresponds to a single EcoSure lot**. One lot can feed many certificates, and one certificate can draw on many lots and on non-EcoSure material.

**Implication:** v2's single optional `cpcb_portal_ref` on each attestation (R4 in `07`, `03` §Attestation) models the wrong link. The link that actually exists and can be checked is **EcoSure transfer → recycler's portal procurement invoice entry**.

### F5. Validity, purchase caps and cross-checks [V]
- A certificate is valid for **two years from the end of the financial year** in which it was generated, then it is automatically extinguished (Rule 14(1)(iii), S1).
- A producer can buy at most **current liability + leftover liability + 5%** (Rule 15(1), S1; also S3).
- Producers must buy proportionately each quarter (Rule 15(2), S1).
- Producer and recycler data are cross-checked on the portal, and **"in case of any difference, the lower figure shall be considered"** (Rule 13(3)(iii), S1).
- Certificates are subject to environmental audit by CPCB or its agencies (Rule 13(3)(iv), S1).

### F6. Returns and filing cycle [V]
- Producers, recyclers, refurbishers and manufacturers file **quarterly and annual returns on the portal by the end of the month after the quarter or year** (Rules 5(3), 6(4), 7(4), 9(6), S1).
- All certificate transactions are recorded when quarterly returns are filed (Rule 15(6), S1).
- For an April–March financial year, the likely due dates are 31 July, 31 October, 31 January and 30 April, with the annual return also due by 30 April. These dates are derived from the rule text and are UNVERIFIED against the portal calendar.
- The 2024 amendment lets the Central Government relax return timelines by up to nine months (S15, [S]; not re-read in the gazette).
- Failing to file returns is an EC violation (S5, Table 1 item 6).

### F7. Floor and ceiling prices [V] and litigation [S]
- Rule 15(9) (2024 amendment): CPCB fixes the highest and lowest exchange prices at **100% and 30% of environmental compensation (EC)**. Rule 15(10): trades between registered entities through the portal must fall within that band (S2).
- Rule 15(7)–(8): exchange platforms may be set up **only by Central Government order**, under CPCB guidelines (S2).
- EC guidelines (S5), metal-wise EC: Au ₹2,575/g, Cu ₹1,875/kg, Fe ₹101/kg, Al ₹456/kg. These are built from ₹25/kg collection and transport cost plus MRAI/REIA processing costs. Floor prices: Au ₹772/g, Cu ₹562/kg, Fe ₹30/kg, Al ₹136/kg.

  EC and floor prices by EEE category (₹ per kg of equipment):

  | Category | EC | Floor price (0.3 × EC) |
  |----------|---:|-----------------------:|
  | ITEW (IT and telecom) | 112 | **34** |
  | CEEW (consumer electrical, electronics, PV) | 74 | **22** |
  | LSEEW (large and small EEE) | 76 | 23 |
  | EETW (tools) | 82 | 25 |
  | TLSEW (toys, leisure, sports) | 34 | 10 |
  | MOW (medical) | 135 | 41 |
  | LIW (lab instruments) | 136 | 41 |

- **Litigation:** Havells, Daikin, Voltas, Blue Star, LG, Samsung and others have challenged Rules 15(9)–(10) in the Delhi High Court (S11, S12). As of the latest reports found, **there is no final judgment**. The hearing of 27 Feb 2026 did not proceed and was relisted for 17 Apr 2026 (S14, weak source). In Dec 2025 / Jan 2026 the court stayed, for Blue Star, CPCB's mandatory declaration that trades are within the band (S13). Whether anything happened after April 2026 is UNVERIFIED.
- The press reports certificates trading below the floor and describes an "e-waste underworld" of paper certificates (S13, [S]). This is the fraud risk that physical custody evidence addresses.

### F8. Environmental compensation (EC) [V]
- **Regime 1** applies to producer shortfalls, charged per metal as above. If the shortfall is later made good, **85% / 60% / 30%** of the EC is refunded after one, two or three years; after that, nothing is refunded (Rule 22, S1). Paying EC does not remove the obligation (S5).
- **Regime 2** covers other violations, based on the registration fee: ₹15,000 for recyclers, doubling on each repeat. For producers the base is ₹20,000, and false sales data costs ₹20,000 plus ₹93/kg (S5).
- **False information that inflates certificate generation by a recycler** leads to revocation and **non-refundable EC**. Three offences lead to permanent revocation (Rule 22(5), S1). Prosecution under s.15 of the EP Act is also possible (Rule 23, S1).

**Implication:** Any EcoSure data that a recycler copies into the portal carries real legal liability for that recycler.

### F9. Who must register, and dealing with unregistered entities [V]
- Only manufacturers, producers, refurbishers and recyclers register on the portal. Dismantlers and bulk consumers do not (S3).
- Rule 4(4): registered entities **"shall not deal with any unregistered manufacturer, producer, recycler and refurbisher"** (S1). Dealing with unregistered entities is an EC violation (S5, Table 1 item 3).
- Recyclers may "take help of dismantlers", but the recycler is responsible for material flow, and dismantlers may pass material only to registered recyclers (Rule 9(10), S1). The 2024 amendment defines a dismantler as one operating "in accordance with the guidelines of the Central Pollution Control Board" (S2).
- Registered producers, recyclers and refurbishers may collect e-waste anywhere in India (S3).
- Storage by manufacturers, producers, refurbishers and recyclers is capped at **180 days**, extendable to 365 days by CPCB for process development (Rule 11, S1). Storing beyond the limit is an EC violation (S5).

**Implication:** EcoSure shops and hubs are lawful only as collection and aggregation points that pass **whole equipment** to a registered recycler. If a shop or hub strips parts, dismantles outside CPCB dismantler guidelines, or refurbishes and resells, it becomes an unregistered dismantler or refurbisher. The recycler buying from it is then exposed under Rule 4(4) and the FAQ rule on whole equipment.

### F10. Recycler credentials: CPCB registration vs SPCB authorization [V]
- To register with CPCB, a recycler must hold a valid SPCB **Consent to Operate (CTO)** and a **Hazardous and Other Wastes (HOWM) authorization**. CPCB registration is valid for 5 years and is issued as a digital certificate (S3, S7).
- The portal records the EEE codes the recycler is registered for and its verified capacity (S3, S4).
- **Terminology:** CPCB grants *registration*, while SPCB grants *authorization* and consent. v2's "CPCB authorization number" (`07` R1) mixes the two up.

### F11. No public API or data feed for the e-waste portal [V for absence found; completeness UNVERIFIED]
- The e-waste portal (https://eprewaste.cpcb.gov.in/, formerly eprewastecpcb.in) is a web application with log-in, OTP and file uploads (S4, S8).
- No public API, bulk upload specification or open data feed was found.
- The **plastic** EPR portal mentions API integration for cross-validation and offers "CPCB-BOT", a robotic-process-automation (RPA) bulk-upload tool that runs on Excel and PDFs with the user's own log-in and OTP (S9). This is evidence that CPCB might add similar tooling to the e-waste portal, not that it exists today (UNVERIFIED for e-waste).
- Vendor claims of "CPCB EPR portal integration through APIs" (for example ecoex.market) are marketing, not an official interface.
- SPCBs can view stakeholder applications, geo-tagged photos and uploaded invoices for their state on the portal (S4). That is a role-based view inside the portal, not an external feed.

### F12. SPCB-side filing for e-waste EPR [UNVERIFIED]
- In the sources reviewed, producer EPR filing for e-waste is centralised on the CPCB portal.
- SPCBs handle CTO and HOWM authorization, usually through OCMMS/XGN-type state systems, and verify recyclers.
- No separate "SPCB e-waste EPR portal" for producer returns was found, so v2's "SPCB portal worksheet (per state)" (`08` P5) may not match any real filing.

---

## 3. Fit of v2 design

| v2 element | Verdict | Why |
|------------|---------|-----|
| Never issue EPR certificates; mandatory disclaimer (`00` §1, `07` R4) | **Aligned** | Required by Rule 14 (F1). Disclaimer text is accurate. |
| "Not an exchange or broker" (`00` §4) | **Aligned, and legally required** | Exchange platforms exist only by Central Government order (F7). EcoSure must never show certificate prices or match buyers and sellers. |
| No automatic portal filing (`08` §4, `11` §9) | **Aligned** | There is no API (F11). Automating with shared credentials would be a security and liability problem. |
| Attestation per lot with processed weight by category (`07` R4) | **Partly aligned** | Good custody evidence, but not in the portal's units (EEE code; metal kg) (F2, F3). "Processed" is also unclear: the portal separates procurement, production and sale. |
| Optional `cpcb_portal_ref` "once an EPR certificate exists" (`07` R4, `03`) | **Conflict (wrong data model)** | Certificates are pooled and do not map 1:1 to lots (F4). The link that can be checked is to the recycler's **procurement invoice entry** on the portal. |
| Capacity cap on attestations (`07` R4, R8) | **Aligned** | Mirrors the portal's validation that procurement cannot exceed capacity (F3). Should use the portal-verified capacity. |
| Corrections by superseding attestations (`07` R4) | **Gap** | The portal allows **no edits** once data is submitted (F3). A supersede after the recycler has entered the lot on the portal creates a mismatch that must be flagged, not silently replaced. |
| Producer target-gap by "category" (`08` P4) | **Conflict (wrong unit)** | Obligations are metal kg (Au/Cu/Al/Fe) per EEE code. Only purchased portal certificates count toward fulfilment. The "lower figure" rule applies (F2, F5). A kg-of-e-waste gap view can mislead producers into thinking they have covered their obligation. |
| CPCB and SPCB portal worksheets (`08` P5) | **Partly aligned** | CPCB-side export is useful if quarter-aligned. The SPCB-side export may target a filing that does not exist (F12). |
| Recycler "CPCB authorization" (`07` R1, `03`) | **Terminology conflict** | Should be CPCB registration (with registered EEE codes and capacity) plus SPCB CTO and HOWM authorization (F10). |
| Shops and hubs as the custody chain (`00` §6) | **Aligned, with one condition** | Lawful as collection and aggregation of **whole equipment** into a registered recycler. At risk if they dismantle, strip parts or refurbish (F9). |
| Micro-tier shops without GSTIN (`15` #4) | **Aligned** | The portal accepts informal-sector receipts that carry the seller's name, address and commodity weight (F3). EcoSure can produce exactly this. |
| Hub dwell caps (`06`) | **Aligned, but not linked to the legal limit** | Rule 11 allows 180 days of storage for registered entities (F9). Chain-level dwell plus recycler storage before processing should be checked against it. |
| Producer take-back pool (`08` P7) | **Aligned** | Rule 13(1) lets producers use collection centres and PROs while keeping responsibility (F1). The pool funds collection; it does not buy certificates. |

**Overall:** The main architectural choice is correct and in some ways legally required: EcoSure is a custody and evidence layer that sits beside the portal and never mints, prices or trades certificates. The problems are in the data model:
- units (category kg instead of EEE code and metal kg)
- the link to the portal (certificate instead of procurement invoice)
- no reference versioning for CPCB tables
- credential terminology
- no whole-equipment or no-dismantling rule for the chain
- corrections that ignore the portal's no-edit behaviour
- a possibly non-existent SPCB worksheet

---

## 4. Gaps

1. **No EEE-code dimension.** Lots use informal categories. The portal procurement form is per EEE item code (106 codes across ITEW, CEEW, LSEEW, EETW, TLSEW, MOW, LIW). Without it, recyclers must re-key and re-classify, which is where errors and "lower figure" discrepancies come from.
2. **Portal procurement pack missing.** The most valuable artefact for the recycler (and the SPCB) is a seller invoice or receipt for each hub→recycler transfer. It must show seller name and address, GSTIN if any, EEE code, commodity weight and date, formatted for the portal's "Add Invoice" step. v2 does not specify one.
3. **Wrong portal link.** A single `cpcb_portal_ref` should become a link table: attestation or transfer ↔ recycler procurement invoice entry (required once entered), plus optional many-to-many certificate numbers labelled "informational, not lot-traceable".
4. **Target-gap unit error.** `08` P4 must convert to metal kg using a versioned copy of CPCB Annexure I, or be relabelled as "feedstock evidence vs indicative obligation". It must state that fulfilment happens only through portal certificates.
5. **No CPCB reference-data versioning.** Needed for the EEE code list, Annexure I composition, the gold phase-in, EC and floor-price tables and return due dates, each with source URL and effective date. These change by notification and litigation.
6. **Correction vs portal immutability.** When an attestation is superseded after a portal procurement entry exists, the system must raise a flag to the recycler and SPCB and require an explanation. Recyclers face Rule 22(5) non-refundable EC for over-generation.
7. **Whole-equipment / no-dismantling rule absent** for shops and hubs (Rule 4(4), Rule 9(10), FAQ). Also no detection of partial lots, such as a phone lot whose weight is too low for its count, which suggests battery or PCB stripping.
8. **180-day storage check absent.** Should flag at 150 days from recycler receipt without an attestation, and block at 180 days.
9. **Filing calendar absent.** Exports should be per financial year and quarter, with due-date reminders tied to "end of month after the quarter", configurable because the Central Government can relax timelines.
10. **Litigation exposure not tracked.** The floor price (₹22/kg CEEW, ₹34/kg ITEW) drives recycler revenue and so offtake prices and shop rates. If the Delhi High Court strikes it down, recycler economics change. `14-open-questions.md` does not track this.
11. **SPCB worksheet may be fictional** (F12). It needs confirmation with MPPCB before anyone builds it.
12. **API expectations.** `11` §5 phase 3 ("automated lookup if the CPCB exposes an API") is fine, but there should be an explicit ban on RPA or scraping with users' portal credentials, and a fallback of CSV aligned to the portal form.

---

## 5. Recommended PRD changes

| # | File | Change |
|---|------|--------|
| 1 | `03-domain-model.md` | Add `eee_code` (Schedule I code, e.g. `ITEW15`) and `unit_count` to lot line items. Add reference table `cpcb_eee_codes` (code, description, category, `avg_life_years`, `au_pct`, `cu_pct`, `al_pct`, `fe_pct`, `source_url`, `effective_from`, `version`). Replace the attestation field `cpcb_portal_ref` with a `portal_links` table (`attestation_id`, `link_type` = `procurement_entry` \| `epr_certificate_info`, `portal_ref`, `entered_by`, `entered_at`), plus a note that certificates are not lot-traceable. |
| 2 | `03-domain-model.md` / `07-professional-recycler.md` R1 | Rename "CPCB authorization" to **CPCB e-waste recycler registration** (number, validity of 5 years, **registered EEE codes**, portal-verified capacity), and record **SPCB CTO** and **HOWM authorization** as separate registrations. Block attestations for EEE codes the recycler is not registered for. |
| 3 | `07-professional-recycler.md` R4 | Add the checks: EEE code present; days from recycler receipt ≤ 180 (warn at 150); whole-equipment declaration. Rename "processed weight" to "received-for-recycling weight" and add an optional "recycling date". Add **R4a Portal procurement pack**: for each accepted transfer, generate a seller receipt or invoice (seller name, address, GSTIN or "informal/micro", EEE code, commodity weight, date, EcoSure attestation number) in CSV and PDF laid out like the portal's procurement "Add Invoice" step. Recycler records the resulting portal procurement entry reference. |
| 4 | `07-professional-recycler.md` R4 (corrections) | If a `procurement_entry` link exists, a supersede must: require a reason, raise a compliance flag to operator and SPCB, and show a banner saying "Portal data cannot be edited; reconcile in next quarterly return". Never silently replace. |
| 5 | `08-manufacturer.md` P4 | Redefine target-gap: the producer enters obligations **per end product (Au, Cu, Al, Fe kg) and EEE code** as shown on its portal registration. EcoSure shows "indicative metal equivalent of attributed custody weight", computed from the versioned Annexure I, next to "certificates purchased (entered manually from portal)". Mandatory label: "Only EPR certificates purchased on the CPCB portal fulfil obligations. Where figures differ, the portal uses the lower figure." |
| 6 | `08-manufacturer.md` P5 | Make exports **financial-year and quarter-aligned** with the due date shown. Drop "SPCB portal worksheet (per state)" until MPPCB confirms a real filing that needs it, and move it to `14` as an open question. Add the 2-year certificate validity and the "liability + leftover + 5%" purchase cap as informational fields. No price fields. |
| 7 | `05-local-recycle-shop.md`, `06-regional-hub.md` | Add the rule: shops and hubs handle **whole equipment only**. No dismantling, part stripping or refurbishment for resale unless the organisation is onboarded as a dismantler under CPCB guidelines and linked to a registered recycler (Rule 4(4), 9(10)). Add anomaly flags for weight-per-unit below category norms, which suggest stripping. |
| 8 | `11-integrations.md` §5 | State that there is no public e-waste portal API as of 2026-09. Integration is file-based (CSV/PDF aligned to portal forms). **Prohibit storing users' portal credentials or running RPA against the portal.** Watch CPCB for an official API or bulk tool like the plastic portal's CPCB-BOT, and revisit then. |
| 9 | `00-overview.md` §11 Glossary | Expand "EPR certificate": generated by CPCB on the portal for a registered recycler, **in kg of recovered Au/Cu/Al/Fe**, valid 2 years from the end of the generating financial year, traded only within CPCB's floor and ceiling price band. Add "EEE code". Add "CPCB registration vs SPCB authorization". |
| 10 | `14-open-questions.md` | Add: (a) Delhi High Court challenge to Rules 15(9)–(10) and how it affects offtake economics; (b) whether MPPCB has any e-waste EPR filing beyond the CPCB portal; (c) whether hubs need SPCB authorization or consent for storing e-waste (UNVERIFIED); (d) owner of CPCB reference-data updates (compliance expert, within 14 days of a notification). |
| 11 | `09-government.md` | Add an SPCB view: "EcoSure transfers into recycler X vs recycler X's portal procurement (entered links)". This lets SPCB spot recyclers generating certificates without physical inflow, the paper-certificate problem (F7). No certificate prices shown. |

---

## 6. Score

**7 / 10** for how well the v2 portal-facing design fits the CPCB EPR regime.

- **Strong (why not lower):** v2 correctly refuses to mint, price or trade certificates, which Rules 14 and 15(7)–(10) effectively require. It keeps filing manual, which suits a portal with no API. It gates on recycler credentials and capacity, and it produces informal-sector-compatible receipts. Its custody evidence targets a documented weakness: paper certificates with no physical inflow.
- **Weak (why not higher):** The data model uses the wrong units and the wrong portal link (category kg vs EEE code and metal kg; certificate vs procurement entry). CPCB reference data is not versioned. Credential terminology is wrong. There is no whole-equipment or no-dismantling rule for the chain. Corrections ignore the portal's no-edit behaviour. The SPCB worksheet may be unnecessary.

With changes 1–8, the fit would be about **8.5 / 10**. The remaining risk is external: floor-price litigation and future CPCB changes to the portal.
