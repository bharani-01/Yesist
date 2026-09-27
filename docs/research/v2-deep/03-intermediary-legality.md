# 03 — Legal status of intermediaries (shops, collection points, hubs)

**Agent:** 03 of 36, v2 deep research swarm  
**Date:** 2026-09-27  
**Scope:** Can a micro kabadi shop or a regional hub legally collect, store, and move e-waste in the EcoSure chain (citizen → shop → hub → registered recycler)? Covers the E-Waste (Management) Rules 2022 and their amendments, the Hazardous and Other Wastes Rules 2016, the Battery Waste Management Rules 2022, state consents (CTE/CTO), transport and manifest rules, storage limits, and fire norms for godowns.  
**PRD files read:** `00-overview.md`, `02-roles-rbac.md`, `05-local-recycle-shop.md`, `06-regional-hub.md` (v2, 2026-09-27). No PRD files were edited.  
**Not legal advice.** Claims marked **UNVERIFIED** could not be confirmed from a primary source during this session. A written legal opinion and a written MPPCB clarification are still needed before the pilot opens.

---

## 1. Bottom line

1. **No legal category exists for an independent e-waste "collector" or "aggregator."** Under the 2022 Rules, only manufacturers, producers, refurbishers, and recyclers register (Rule 4). The CPCB FAQ says plainly that only *registered* producers, recyclers, and refurbishers "can collect e-waste." A shop or hub has no standing of its own.
2. **A micro kabadi shop *can* operate lawfully, but only as a collection agent inside a registered recycler's channel** (or a producer's channel, under Rule 13(1)). It must work under a written agreement, must not dismantle anything, must not sell to anyone else, must keep storage short, and must keep records that the recycler can account for.
3. **A hub is in effect the recycler's collection centre**, and its storage counts against the recycler's statutory limits. It should be listed in the recycler's MPPCB consent or authorisation, or hold its own consent if MPPCB requires one (**to be confirmed with MPPCB**). If it stores loose batteries, the CPCB battery guidelines treat it as a battery collection centre, which needs CTE, CTO, and hazardous-waste authorisation (Green category), and only a producer, recycler, or refurbisher may set one up.
4. **Dismantling anywhere upstream of the recycler is the main legal hazard.** The 2024 amendment dropped SPCB authorisation from the definition of dismantler. CPCB now allows standalone dismantling only if it is written into a recycler's CTO. The 2025 CPCB categorisation puts "dismantling only" in the Green category, which still needs consent. Broken CRTs, loose batteries, mercury lamps, and PCB capacitors count as hazardous waste (HOWM entry A1180), and handling them needs HOWM Rule 6 authorisation.
5. **Storage limits:** 180 days for e-waste held by registered entities (Rule 11; CPCB may extend to 365). **90 days for waste batteries** under the CPCB battery guidelines, extendable by the SPCB under HOWM Rule 8.
6. **Transport:** the 2022 Rules dropped the 2016 three-copy Form 6 e-waste manifest. Only residues going to a treatment, storage and disposal facility (TSDF) need the HOWM Form 10 manifest. Waste batteries sent for recycling need prior intimation to the SPCB under HOWM Rule 19, plus Motor Vehicles Act compliance. A GST e-way bill applies to consignments above the value threshold (**UNVERIFIED in this session**).
7. **The PRD's architecture fits this model** (recycler as root of trust, offtake agreement, dwell caps, monsoon storage). What it never states is the *legal character* of shops and hubs. It also allows provisional shops with no written agreement, has no rule against dismantling, no statutory ceiling on dwell, no separate battery stream, no movement document, and no consent or fire checks for hubs.

**Score: 5 / 10** for legal robustness of v2 as written (see section 7).

---

## 2. Sources

Primary and official sources:

- E-Waste (Management) Rules 2022, G.S.R. 801(E), 2 Nov 2022, IndiaCode: https://indiacode.ecourtsindia.com/rules/371a802d/. MPPCB copy: https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf
- E-Waste (Management) Amendment Rules 2024, G.S.R. 164(E), 8 Mar 2024 (new dismantler definition, Rule 9A, Rule 15(7)–(10) floor and ceiling price): https://indiacode.ecourtsindia.com/rules/be675cf8/ and https://moef.gov.in/storage/tender/GSR-164(E)-[08-03-2024]-E-Waste-(Management)-Amendment-Rules-2024.pdf
- E-Waste (Management) Second Amendment Rules 2024, G.S.R. 699(E), 12 Nov 2024 (Rule 23 replaced by penalty under s.15 of the Environment Protection Act, following Jan Vishwas): https://indiacode.ecourtsindia.com/rules/a838909a/
- CPCB FAQ under the E-Waste Rules 2022: https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf
- CPCB SOP for e-waste recycler registration (Oct 2024), via Assam OCMMS: https://asocmms.nic.in/OCMMS/SPCB_DOCUMENTS/SOP_for_Ewaste_Recycler.pdf
- CPCB Guidelines for Determination of Processing Capacity of E-Waste Recycling Facility (standalone dismantlers allowed only under a recycler's CTO). Copy: https://img1.wsimg.com/blobby/go/0410bb8b-c9b9-493e-93f5-94a1728a718a/downloads/a65aae82-f59b-4527-bcc4-03d62e0b30bb/Guidelines%20for%20Determination%20of%20Processing%20Cap.pdf ; summary: https://lexplosion.in/cpcb-issues-guidelines-for-determination-of-processing-capacity-of-e-waste-recycling-facility-by-spcbs-pccs-recyclers-to-maintain-record-of-recycling-process-and-various-products/
- CPCB Implementation Guidelines for the E-Waste Rules 2016 (collection centre, storage, and transport norms; CPCB states they still apply to recyclers and refurbishers "except for capacity"): https://hppcb.nic.in/ewaste/cpcbguide.pdf ; CPCB listing: http://www.cpcb.gov.in/cpcb-technical-guidelines-sops/
- CPCB Guidelines for Environmental Compensation under the E-Waste Rules 2022 (applicability includes "any non-registered entities involved in collection, storage, transportation, sale…"): https://www.tnpcb.gov.in/PDF/Waste_Mngt/E-waste/EnvironmentalCompensation.pdf
- CPCB Categorisation of Industries 2025 (Red, Orange, Green, White, Blue; items 150.1–150.4 for e-waste): https://mpcb.gov.in/sites/default/files/Establishment%20of%20MPCB/Seniority%20list/2014/Categorization_of_Industries_CPCB_2025_.pdf
- Hazardous and Other Wastes (Management and Transboundary Movement) Rules 2016 (Rule 6 authorisation, Rule 8 storage, Rules 18–19 transport and Form 10 manifest, entry A1180): https://crda.ap.gov.in/apcrdadocs/Environment_New/Acts,%20Rules%20&%20NGT%20Orders/13.%20Hazardous%20and%20Other%20Wastes%20(Management%20and%20Transboundary%20Movement)%20Rules,%202016.pdf
- Battery Waste Management Rules 2022, IndiaCode: https://indiacode.ecourtsindia.com/rules/cbb87928/
- CPCB Guidelines for Collection, Handling, Storage and Transportation of Waste Batteries (references the 2026 consent guidelines): https://eprbattery.cpcb.gov.in/upload/adminDoc/Guidelines%20for%20Collectio,%20Handling,%20Storage%20and%20Transportation%20of%20Waste%20Batteries.pdf
- MPPCB list of e-waste recyclers (Indore: Unique Eco Recycle, Samyak Computer, Primero Waste Solution; Dhar: Hazargo Unit III): https://www.mppcb.mp.gov.in/Recycler.aspx ; dismantlers, refurbishers, collection centres: https://mppcb.mp.gov.in/Ewaste_List.aspx ; refurbishers (updated 28.08.2023): https://www.mppcb.mp.gov.in/RefurbisherList.aspx

Secondary and press sources:

- Floor-price litigation: Reuters, 21 Apr 2025: https://www.reuters.com/sustainability/climate-energy/lg-samsung-sue-indian-government-over-electronic-waste-pricing-policy-2025-04-21/ ; Mint: https://www.livemint.com/industry/manufacturing/delhi-hc-govt-response-to-lg-samsung-e-waste-payout-challenge-rules-epr-certificate-prices-11745326458051.html ; Economic Times: https://economictimes.indiatimes.com/industry/cons-products/electronics/govt-asks-delhi-hc-to-dismiss-firms-pleas-against-e-waste-payout-rules/articleshow/122324524.cms ; Newslaundry, Delhi HC stay on the price declaration (24 Dec 2025): https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration
- "Ghost" recycler investigation (31 of 41 plants): https://www.newslaundry.com/2025/07/30/exclusive-indias-e-waste-mirage-crores-in-corporate-fraud-amid-govt-lapses-public-suffering ; Environment Audit Rules notified afterwards: https://www.newslaundry.com/2025/09/04/weeks-after-nl-investigation-centre-notifies-audit-rules-on-e-waste-recycling-compliance
- 2024 amendment commentary: https://lexplosion.in/e-waste-management-amendment-rules-2024-notified-includes-provisions-for-relaxing-the-period-for-filing-annual-and-quarterly-returns/ ; https://enviliance.com/regions/south-asia/in/report_11663
- Indore fire NOC (IMC notice: storage and commercial buildings over 500 m², or 15 m and above): https://timesofindia.indiatimes.com/city/indore/get-fire-noc-in-90-days-or-face-action-imc-to-building-owners/articleshow/71912660.cms
- MP Agnishaman Evam Apatkalin Sevayen Adhiniyam 2026 (assent 31 Aug 2026, not yet in force; industrial Fire NOC above 2,000 m² as discussed at an Indore workshop). Vendor blog, **UNVERIFIED**: https://firetechenggsolutions.in/mp-fire-safety-act-2026-new-fire-safety-rules/

---

## 3. Findings

### F1. The 2022 Rules regulate registered entities, and intermediaries have no standing of their own

- **Application (Rule 2):** manufacturer, producer, refurbisher, dismantler, recycler. Collection centres, dealers, and PROs were dropped as regulated categories when the 2016 Rules were replaced.
- **Registration (Rule 4(1)–(3)):** only manufacturer, producer, refurbisher, and recycler register, and "No entity referred in sub-rule (1) shall carry out any business without registration."
- **Rule 4(4):** registered entities "shall not deal with any unregistered manufacturer, producer, recycler and refurbisher." A shop is none of these, so a recycler is not barred from dealing with it. **But a shop that dismantles or processes may be treated as an unregistered recycler**, and then the recycler that deals with it is also in breach.
- **CPCB FAQ:** "Who can collect E-Waste? … registered Producer, Recyclers and Refurbishers … can collect." Registered recyclers may collect from anywhere in India.
- **Rule 13(1):** producers "may also take help of third party organisations such as producer responsibility organisations, collection centres, dealers etc.", provided that EPR "shall lie entirely on the producer."
- **Informal purchase is tolerated at the recycler gate.** In the CPCB FAQ, for e-waste bought from the informal sector, the recycler uploads "any sales receipt having name and address of the seller," and commodity weight on the seller invoice is mandatory.
- **Enforcement exposure:** Rule 22(3) applies environmental compensation (EC) to "any entity which aids or abets the violation." The CPCB EC guidelines list "any non-registered entities involved in collection, storage, transportation, sale, processing, recycling of E-Waste" as entities the guidelines apply to. An independent shop is therefore exposed. **Working as a documented agent of a registered recycler is the defence.**
- Rule 23 (after the Second Amendment 2024) now means a penalty under s.15 of the Environment Protection Act rather than prosecution.

**Implication:** a shop's lawful status comes *from its contract*, not from EcoSure onboarding. The shop is lawful if it is a collection point operating on behalf of a registered recycler (or a producer's collection partner). A shop that buys and resells scrap to whoever pays is an unregulated trader in a grey zone and exposed to EC.

### F2. Bulk consumers can only hand over to registered entities

Rule 8 says bulk consumers (entities that used at least 1,000 units of Schedule I EEE in a financial year, including e-retailers) "shall ensure that e-waste … handed over only to the registered producer, refurbisher or recycler."

**Implication:** EcoSure "small office" and business pickups (`05` S2 and `02` bulk pickups) must show the **registered recycler as the legal receiver**, with the shop acting only as its agent. Otherwise a bulk-consumer client is in breach, and an IT company or college client will ask about it. Most RWAs are households, not bulk consumers.

### F3. Dismantling upstream of the recycler is not allowed unless it is written into the recycler's consent

- **2024 amendment:** the dismantler is now "any person or entity engaged in dismantling … in accordance with the guidelines of the CPCB." The earlier requirement for SPCB authorisation was removed.
- **CPCB processing-capacity guidelines:** "Standalone dismantling facilities … be allowed only if a recyclers apply for the same … recycler shall take responsibility of flow of material … name, address … of such dismantler shall be the part of CTO issued to the recycler instead of individual CTO."
- **CPCB categorisation 2025:** item 150.3, "dismantling (only) of e-waste," is **Green** (pollution index 43.1) and needs CTE and CTO. Item 150.2, mechanical recycling, is **Orange**. Item 150.1, pyro-, hydro-, or electro-metallurgical recycling, is **Red**. Item 150.4, refurbishing, is Green.
- **HOWM entry A1180:** waste EEE containing batteries, mercury switches, CRT glass, or PCB capacitors is hazardous, and so are the separated components (HOWM Schedule entry 18). Every occupier "engaged in handling, generation, collection, storage … transportation" of hazardous waste needs HOWM Rule 6 authorisation.
- **CPCB battery guidelines:** "No dismantling / shredding / processing activities shall be carried out at the collection centres," and "No acid draining / dismantling / seal removal … at drop points."

**Implication:** the common kabadi practice of stripping boards, cutting copper, breaking CRTs, or pulling compressors must be **contractually prohibited and operationally detected** at shops and hubs. Any hub that sorts beyond intact items needs to be written into the recycler's CTO as a standalone dismantling unit.

### F4. Storage limits

| Stream | Limit | Source |
|---|---|---|
| E-waste held by manufacturer, producer, refurbisher, or recycler (including their collection centres) | 180 days; CPCB may extend to 365 for process development; sale, transfer, and storage records must be kept | Rule 11, 2022 Rules |
| Waste batteries at a producer, collection centre, recycler, or refurbisher | 90 days; SPCB may extend under HOWM Rule 8 | CPCB battery guidelines §5 |
| Hazardous waste (for example broken CRT glass or spill residue) | 90 days; SPCB may extend to 180 in listed cases | HOWM Rule 8 |

The 2016 CPCB collection-centre norms, which CPCB says still apply except for capacity, require:

- covered sheds
- category-wise storage
- containers or stable stacking for CRTs, flat panels, and mercury lamps
- spill control for fridge and AC oils and refrigerants
- **fire-fighting arrangements and escape routes**
- storage space by category, for example 4.0 m³/tonne for IT equipment types 1–6, 5.0 for CRT monitors, 6.5–10.0 for large appliances

The battery guidelines require:

- fire-rated partitions and gaps between stacks
- smoke and heat detection
- two escape routes
- a floor at least 150 mm above maximum flood level
- secondary containment
- Li-ion stored at about 30% charge and at or below 35 °C
- a quantity cap no higher than the amount in the CTO or HOWM authorisation

**Implication:** the PRD's hub "max dwell days" is agreed by contract with no legal ceiling. The clock should start at **first custody** (the citizen hand-over) and be hard-capped well inside 180 days for e-waste and 90 days for batteries, across the shop and hub combined, because the recycler's own 180-day clock arguably includes time at its collection network (**interpretation, UNVERIFIED**). The PRD's hub monsoon check lines up with the CPCB norms but leaves out fire safety, category-wise space per tonne, and spill kits.

### F5. Battery rules bind collectors directly and are stricter than the e-waste rules

- **The BWM Rules 2022 apply to "entities involved in collection, segregation, transportation…"** Rule 7(1) says they must "hand over Waste Battery to registered refurbisher or recycler."
- **CPCB battery guidelines §4.1.1:**
  - Collection centres "shall obtain CTE / CTO / Authorization under Hazardous Waste … under Green Category."
  - "Only recyclers, refurbishers, or producers shall be allowed to set up collection centres."
  - Annual return in HOWM Form 4.
  - "No collection centre shall sell waste batteries to traders or dealers."
- **Drop points** (RWAs, retail, offices) are allowed if linked to a collection centre, kept small, periodically cleared, and never dismantled.
- **Transport:** follow HOWM Rule 18 and Motor Vehicles Act rules. Tape terminals, keep Li-ion below 30% charge, use lined containers, and **"the sender shall intimate the SPCB before handing over the waste to the transporter" (HOWM Rule 19)**.

**Implication:** a shop may lawfully be a **battery drop point** linked to a collection centre run by a recycler or producer. It must not be a battery store. A hub that accumulates batteries must be the recycler's registered battery collection centre with its own consent. The PRD's single `lot` model mixes batteries and e-waste and has no SPCB intimation step. Cross-reference: agent 13 (batteries and hazardous waste).

### F6. Transport and manifest

- The 2016 Rules required a three-copy Form 6 manifest for every e-waste movement (2016 guidelines §5.0).
- **Rule 19 of the 2022 Rules keeps a manifest only for manufacturing or recycling waste bound for a TSDF**, under the HOWM seven-copy Form 10. Intact e-waste moving from shop to hub to recycler has **no statutory manifest under the 2022 Rules**. An SPCB may still require one through consent conditions (**UNVERIFIED for MPPCB**).
- Recyclers upload purchase proof to the portal: the seller invoice or receipt with name, address, and commodity weight (CPCB FAQ).
- Rule 20 requires **accident reporting** "during transportation" by the transporter, dismantler, or recycler, immediately by phone and email to the SPCB.
- The GST e-way bill for goods above ₹50,000 under CGST Rule 138, and any reverse-charge or TCS treatment of scrap bought from unregistered sellers, are relevant to micro shops without a GSTIN (**UNVERIFIED in this session; needs a tax opinion**).

**Implication:** the PRD's `trip` should generate a **movement document**, even without a statutory form, that matches what the recycler must upload: sender identity and address, receiver registration number, categories, weights, vehicle, date, and signatures. It should also store the e-way bill number where one applies. This is the "evidence layer" the product promises.

### F7. State consent (CTE/CTO) for storage-only premises is not clearly defined

- The CPCB 2025 categorisation has explicit entries for e-waste dismantling, recycling, and refurbishing, and for ELV "collection centres without depollution" (153.4). **It has no specific entry for an e-waste collection or storage-only centre.** SPCBs may categorise sectors that are not listed.
- The 2016 guidelines said a dismantler's or recycler's collection centres "shall not require separate authorisation" if they are entered in the dismantler's or recycler's authorisation.
- The MPPCB website lists "Collection Centers" alongside authorisations (for example "Municipal Corporation, Bhopal: E-Waste Collection Points"). MPPCB therefore records collection points in its lists.
- Recyclers need CTE, CTO, and HOWM authorisation for portal registration (CPCB FAQ and SOP).

**Implication:** for the pilot, the sponsor (SPCB) should **issue a written direction or clarification** that treats EcoSure hubs as collection centres of the named recycler, entered in that recycler's CTO or authorisation, and treats shops as collection points. **Otherwise a hub must obtain its own CTO.** Because MPPCB is the sponsor, this is cheap to get and removes the biggest legal ambiguity.

### F8. Fire and building norms for godowns

- Indore Municipal Corporation requires a Fire NOC for storage, commercial, and industrial buildings above 500 m², and for buildings 15 m or taller (TOI, 2019). MP applications go through e-Nagarpalika.
- The MP Agnishaman Evam Apatkalin Sevayen Adhiniyam 2026 reportedly received assent on 31 Aug 2026 and is **not yet in force**. Industrial units above 2,000 m² may need a Fire NOC and fire audits (**UNVERIFIED, vendor source**).
- Whatever the size threshold, the CPCB collection-centre and battery guidelines require fire-fighting arrangements, detection, and escape routes.

**Implication:** hub onboarding should record either a Fire NOC or a declaration that the premises are below the threshold, plus a minimum fire kit (extinguishers of the right class, sand, fire-safe battery bin, detectors), whether or not a NOC is legally needed.

### F9. Recycler "root of trust" is weaker than the PRD assumes

- Newslaundry (Jul–Aug 2025) found **31 of 41 authorised plants in four states** were non-existent, shut, or apparently "ghost" operations that still generated EPR certificates. Some had SPCB CTOs.
- MoEFCC then notified the **Environment Audit Rules** (Sep 2025), under which registered auditors can audit EPR compliance.
- The floor price of ₹22/kg (₹34/kg for smartphones), set by the 2024 amendment to Rules 15(9)–(10) and CPCB's EC guidelines of 9 Sep 2024, is **being challenged in the Delhi High Court** by LG, Samsung, Daikin, Havells, Voltas, and Blue Star. The court **stayed the mandatory price declaration** on 24 Dec 2025. The final outcome as of Sep 2026 is **UNVERIFIED**.
- Pilot-corridor recyclers are MPPCB-listed (for example Unique Eco Recycle, Samyak Computer, and Primero Waste Solution in Indore).

**Implication:** "CPCB-authorized recycler" is the wrong term. It should be "**registered on the CPCB E-Waste EPR portal, with valid MPPCB CTO and HOWM authorisation, and capacity verified**." EcoSure's dual weighing and custody trail are an asset for recyclers facing audit, but the platform should also check that the recycler is physically operating, for example through a site visit and throughput plausibility against CTO capacity.

---

## 4. Answer to the core question

**Can a micro kabadi shop legally handle e-waste as an agent of an authorised recycler or producer?** Yes, if all of these hold:

1. **There is a written collection-point (agency) agreement** with a portal-registered recycler, directly or through the recycler's hub as its collection centre. Alternatively, the shop is named in a producer's collection arrangement (Rule 13(1)).
2. **Title, or at least legal custody, is framed as held on the recycler's behalf.** The citizen or bulk consumer hands over to "Recycler X through its collection point Y." The shop's payment is best framed as a **collection service fee plus the material price paid on the recycler's behalf**, not as the shop reselling scrap to the highest bidder.
3. **The shop only handles intact items.** No dismantling, stripping, burning, draining, CRT breaking, or battery opening. The only exception is removing user-removable batteries into a separate drop-point container.
4. **Exclusivity of outlet:** everything accepted under EcoSure goes only to the named hub or recycler. The shop does not sell to traders, especially batteries.
5. **Short storage:** days, not weeks. Quantities stay within a cap. Items are covered, kept dry, sorted by category, and kept with a basic fire kit.
6. **Records:** receipt per hand-over with name, address, and weight (this matches CPCB's informal-purchase receipt requirement), plus a movement document for each transfer.
7. **The shop is visible to the SPCB** as a collection point of the named recycler. This comes through the sponsor's direction or MPPCB's collection-centre listing.

**Contracts needed to make the chain lawful:**

| # | Contract | Parties | Key clauses |
|---|---|---|---|
| C1 | SPCB pilot direction or MoU | MPPCB, department, participating recyclers | Recognises hubs as recycler collection centres and shops as collection points for the pilot; confirms consent position; data sharing; inspection rights |
| C2 | Recycler offtake and collection-centre agreement (extends the existing H2) | Recycler and hub | Hub operates *as the recycler's collection centre*; listed in the recycler's CTO or authorisation; dwell ceiling under 180 days (batteries under 90); no dismantling unless the hub is in the recycler's CTO; weight tolerance; rejects; payment; accident reporting; inspection access; indemnity |
| C3 | Collection-point (agent) agreement | Recycler (or hub on its behalf) and shop | Agency, not resale; intact items only; exclusive outlet; storage cap in kg and days; battery drop-point rules; receipt and data-wipe duties; audit and inspection; termination for diversion; DPDP processor duties |
| C4 | Producer–recycler EPR arrangement (optional attribution) | Producer and recycler | EPR certificate transfer happens only on the CPCB portal; EcoSure attestations are evidence only |
| C5 | Operator SLA | Department and field operator | Operator runs logistics and float and is not the title-holder or legal receiver |
| C6 | Battery collection-centre arrangement | Battery-registered recycler or producer and hub | Hub's CTE, CTO and HOWM authorisation (Green); 90-day storage; SPCB intimation before transport |

---

## 5. How v2 fits

| PRD element | Legal fit | Note |
|---|---|---|
| "Every lot ends at a CPCB-authorized recycler with signed offtake agreement" (`00` §5.3) | Good direction | Wrong term; should be "portal-registered recycler with valid CTO and HOWM authorisation" |
| Hub cannot receive without an offtake agreement (`06` H1–H2) | Good | Should also say the hub *is* the recycler's collection centre and is listed in the recycler's CTO |
| Monsoon storage check (`06` H1) | Partial | No fire, space-per-tonne, CRT, lamp, or spill requirements |
| Dwell caps, normal and monsoon (`06` H5) | Partial | No legal ceiling; clock starts at hub receipt instead of first custody |
| Shop micro tier: Aadhaar, photo, UPI, 500 kg/month (`05` S1, `02` §4) | Weak | No agency agreement, no prohibited-activities undertaking, no storage cap |
| "Platform approval shown separately from statutory authorization" (`02` §4) | Good | Keep it; add a statutory basis field ("collection point of Recycler X, per MPPCB direction ref") |
| Training on "handling batteries" (`05` S10) | Partial | Batteries need a separate stream, container, cap, and SPCB intimation |
| Trip record (`06` H3) | Partial | Needs movement-document output, receiver registration number, e-way bill field, accident report |
| Bulk and business pickups (`02` note) | Gap | Bulk-consumer rule requires the registered recycler as legal receiver |
| Recycler onboarding: authorisation number, validity, capacity (`02` §4) | Partial | Add portal registration number, CTO and HOWM validity, approved categories, standalone dismantlers in the CTO, site verification |

---

## 6. Gaps and open questions

1. **MPPCB position on consent for storage-only hubs and shops.** Does a hub need its own CTO, or is listing in the recycler's CTO or authorisation enough? No primary MPPCB source was found. **UNVERIFIED.**
2. **Whether MPPCB consent conditions still require a Form-6-style e-waste manifest** after the 2022 Rules. **UNVERIFIED.**
3. **GST treatment** of e-waste bought from unregistered micro shops (reverse charge, TCS, e-way bill threshold). **UNVERIFIED; needs a tax opinion.**
4. **Whether a recycler's 180-day storage clock includes time at its collection points.** This is an interpretation, not settled.
5. **Current status of the Delhi High Court floor-price litigation** as of Sep 2026. **UNVERIFIED.** It affects recycler economics and therefore offtake rates.
6. **Commencement of the MP Fire and Emergency Services Act 2026** and its storage-premises thresholds. **UNVERIFIED.**
7. **Municipal trade licence or Shops & Establishments registration** for micro shops in Indore (IMC) and Pithampur (Nagar Palika). Not researched here.
8. **Whether the recycler's EPR registration allows the EEE codes the corridor collects.** The CPCB FAQ says producers buy only from recyclers approved for the relevant EEE code. The PRD does not check category eligibility.

---

## 7. Recommended PRD changes (not applied)

| # | File | Change |
|---|---|---|
| 1 | `00-overview.md` §1, §5.3, §11 | Replace "CPCB-authorized recycler" with "**registered recycler**: registered on the CPCB E-Waste EPR portal, holding valid SPCB CTO and HOWM authorisation". Add an assumption row: "**Legal model:** shops operate as collection points and hubs as collection centres of a named registered recycler, under a written agency agreement and an SPCB pilot direction. EcoSure onboarding is not a statutory licence." |
| 2 | `00-overview.md` §8 launch checklist | Add: (a) MPPCB written direction or clarification on hub and shop status; (b) each hub listed in its recycler's CTO or authorisation, or holding its own CTO; (c) Fire NOC or a below-threshold declaration plus fire kit at each hub; (d) a battery-registered recycler, and a battery collection centre with consent, if batteries are accepted; (e) signed legal opinion on the agency structure and GST. |
| 3 | `02-roles-rbac.md` §4 onboarding tiers | Shop (all tiers): **signed collection-point agreement (C3) required before first pickup**, including for provisional shops. Add a "prohibited activities" undertaking and a storage cap. Hub: collection-centre agreement (C2), CTO or listing reference, fire evidence, and a battery consent if applicable. Recycler: portal registration number, CTO and HOWM numbers with validity, approved EEE categories, capacity, listed standalone dismantlers, and a site-verification date. Add the statutory basis as a separate field from platform status. |
| 4 | `05-local-recycle-shop.md` S1 | Micro tier keeps its light KYC but adds an e-signed agent agreement and a Hindi undertaking: intact items only, no dismantling or burning, exclusive outlet, storage at most 7 days (or the operator's corridor setting) and at most N kg. |
| 5 | `05-local-recycle-shop.md` new S11 "Prohibited handling" | Block or flag lots whose weight-per-item or photos suggest stripping (for example a laptop well below expected weight, or boards missing). Repeated flags suspend the shop. Show the rule in Hindi on the collect screen. |
| 6 | `05-local-recycle-shop.md` S3 and S10 | Separate **battery stream**: loose or removed batteries go into a drop-point container with taped terminals and are recorded as their own line. No battery storage beyond the drop-point cap. Swollen or damaged Li-ion triggers an immediate hub pickup. |
| 7 | `05` S2 and `04` (bulk pickups) | For bulk or business pickups, record whether the client is a bulk consumer (≥1,000 EEE units/year). The receipt names the **registered recycler as receiver**, with the shop as its agent. |
| 8 | `06-regional-hub.md` H1 | Add: collection-centre agreement (C2), CTO or listing reference, Fire NOC or declaration, fire kit checklist, space-per-tonne capacity by category (CPCB norms), CRT and lamp containers, spill kit, and a battery consent if accepting batteries. |
| 9 | `06-regional-hub.md` H5 | Dwell counted from **first custody** (the citizen hand-over), not hub receipt. Hard ceilings are system constants the agreement cannot override: e-waste total at most 150 days (a buffer inside the Rule 11 limit of 180), batteries at most 75 days (inside the 90-day guideline). Agreement values must be lower. Compliance flag to the SPCB at the ceiling. |
| 10 | `06-regional-hub.md` H3 and H6 | Each trip produces a **movement document** (PDF plus record) with sender and receiver identity, receiver portal registration number, category and weight lines, vehicle, driver, date, and signatures. Store the e-way bill number where one applies. For battery consignments, record the date and reference of the prior SPCB intimation under HOWM Rule 19, and block dispatch without it. Add an **accident report** action (Rule 20) that notifies the SPCB contact and the operator. |
| 11 | `03-domain-model.md` | Add fields to organisation: `statutory_basis`, `principal_recycler_id`, `agreement_id`, `cto_ref`, `cto_valid_until`, `howm_auth_ref`, `portal_reg_no`, `fire_noc_ref`, `battery_consent_ref`, `storage_cap_kg`. Add to lot: `stream` (`ewaste` or `battery`), `first_custody_at`. Add to trip: `movement_doc_no`, `eway_bill_no`, `spcb_intimation_ref`. |
| 12 | `09-government.md` | SPCB flags for: dwell ceiling reached, a shop or hub operating past agreement or CTO expiry, suspected dismantling, batteries dispatched without intimation, and a recycler whose inbound volume exceeds its CTO capacity (plausibility check against "ghost" recyclers). |
| 13 | `14-open-questions.md` | Add sponsor decisions: the MPPCB clarification (C1); whether batteries are in scope for phase 1 (recommend excluding loose batteries until a battery collection centre has consent); legal and tax opinions; whether the shop is paid as an agent's fee or as a buyer. |
| 14 | `13-roadmap.md` Wizard-of-Oz pilot | Even the paper pilot must use C2 and C3 agreements and paper movement documents. Otherwise the pilot itself operates in the grey zone. |

---

## 8. Score

**5 / 10.** The v2 architecture points the right way: a single recycler root, agreements before hubs operate, dwell caps, formal-only framing, and platform approval kept separate from statutory status. But it never states the legal character of shops and hubs. It lets provisional shops operate with no written agency, has no rule against dismantling, no statutory storage ceiling, and no battery stream. It also skips hub consent, fire checks, and movement documents, and uses non-statutory recycler terminology. All of these can be fixed with contract and process changes, and with one letter from MPPCB, which is the sponsor, rather than with new technology. With changes 1–4, 8–10, and 13, the score would be about 8.
