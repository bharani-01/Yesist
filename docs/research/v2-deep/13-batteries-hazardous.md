# 13 — Batteries, Hazardous Fractions, Storage and Transport Safety

**Agent:** 13 of 36 (v2 deep research swarm)
**Date:** 2026-09-26
**PRD files reviewed:** `03-domain-model.md`, `05-local-recycle-shop.md`, `06-regional-hub.md` (plus a grep across `docs/prd/` for battery, CRT, mercury, lamp, fire and PPE)
**Angle:** How the Battery Waste Management Rules, 2022 (and amendments) overlap with e-waste; separate battery EPR; lithium fire risk in godowns and trucks; CRT and mercury-lamp handling; hazardous-waste transport documents; PPE and safety norms; the E-Waste Rules Schedule I categories.

---

## 1. Sources

Primary (government / gazette / CPCB):

1. E-Waste (Management) Rules, 2022 — full text, IndiaCode: https://indiacode.ecourtsindia.com/rules/371a802d/ (also MPPCB copy: https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf)
2. CPCB FAQ, E-Waste (Management) Rules, 2022: https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf
3. E-Waste (Management) Second Amendment Rules, 2024 (G.S.R. 699(E); lists prior amendments of 30 Jan 2023, 24 Jul 2023, 8 Mar 2024): https://indiacode.ecourtsindia.com/rules/a838909a/
4. Battery Waste Management Rules, 2022 (S.O. 3984(E), 24 Aug 2022): https://eprbattery.cpcb.gov.in/upload/adminDoc/Battery-WasteManagementRules-2022.pdf and https://thc.nic.in/Central%20Governmental%20Rules/Battery%20Waste%20Management%20Rules,%202022.pdf
5. Battery Waste Management Amendment Rules, 2025 (S.O. 958(E), 24 Feb 2025; notes earlier amendments of 20 Jun 2024 and S.O. 5210(E) of 3 Dec 2024): https://eprbattery.cpcb.gov.in/upload/adminDoc/Battery_Waste_Management_(Amendment)_Rules,_2025.pdf and https://indiacode.ecourtsindia.com/rules/e9e0b9d7/
6. CPCB FAQ, Battery Waste Management Rules, 2022: https://eprbattery.cpcb.gov.in/upload/adminDoc/Frequently%20Asked%20Questions%20(General).pdf
7. CPCB, *Guidelines for Collection, Handling, Storage and Transportation of Waste Batteries* (cover dated July 2026 in the fetched copy): https://eprbattery.cpcb.gov.in/upload/adminDoc/Guidelines%20for%20Collectio,%20Handling,%20Storage%20and%20Transportation%20of%20Waste%20Batteries.pdf (mirror: https://www.mpcb.gov.in/sites/default/files/batteries/Guidelines_for_collection_handling.pdf)
8. CPCB, *Guidelines for Recycling of Waste Batteries*: https://eprbattery.cpcb.gov.in/upload/adminDoc/Guidelines%20for%20Recycling%20of%20Waste%20Batteries%20.pdf
9. Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 (HOWM) — Rule 18 transport, Rule 19 manifest (Form 10), Rule 22 accident reporting (Form 11): https://upload.indiacode.nic.in/showfile?actid=AC_CH_60_926_00001_00001_1558607117075&filename=final_hwm_rules_2016__english_.pdf&type=rule
10. CPCB, *Implementation Guidelines for E-Waste (Management) Rules, 2016* (collection-centre storage, CRT/lamp handling, space norms): https://cpcb.nic.in/displaypdf.php?id=aHdtZC9HVUlERUxJTkVTX0VXQVNURV9SVUxFU18yMDE2LnBkZg== (MPCB copy: https://www.mpcb.gov.in/sites/default/files/electronic-waste/related-documents/Guidelines_for_implementation_of_EWASTE_RULES_25072019.pdf)
11. Form 6 e-waste manifest (2016-rules era), SPCB copies: https://ddnocmms.nic.in/SPCB_DOCUMENTS/Form-6%20Ewaste.pdf, https://hppcb.nic.in/ewaste/Rform.pdf
12. Central Motor Vehicles Rules, 1989, Rules 129–137 (dangerous goods): https://cgtransport.gov.in/Notification/CMVR_1989.pdf ; summary by Telangana Transport Dept: https://transport.telangana.gov.in/html/hazardous-substance.html

Secondary / context:

13. Mondaq summary of CPCB battery guidelines: https://www.mondaq.com/india/waste-management/1832258/cpcb-guidelines-on-waste-batteries-key-requirements-for-collection-storage-and-transportation
14. Toxics Link, e-waste guideline commentary (PPE, CRT handling): https://toxicslink.org/wp-content/uploads/2022/08/E-waste-rule-guidelines.pdf
15. Seyecs, battery EPR 2026 guide (targets summary): https://blogs.seyecs.com/epr-certification-for-battery-waste/ — secondary, treat numbers as UNVERIFIED unless matched to source 4.
16. EVXpertz, battery logistics (UN3480/3481, SoC ≤ 30%): https://evxpertz.com/blogs/battery-logistics-safe-transportation-regulations — secondary, UNVERIFIED.
17. Fire incidents: The Hindu, Ranipet mobile-spares waste godown fire (Mar 2025): https://www.thehindu.com/news/national/tamil-nadu/mobile-phone-spare-parts-godown-gutted-near-ranipet/article69385978.ece ; Economic Times, Delhi godown e-rickshaw battery blast, 2 dead (Aug 2026): https://economictimes.indiatimes.com/news/india/fire-breaks-out-in-godown-in-west-delhi-after-suspected-e-rickshaw-battery-blast/articleshow/133286642.cms ; Asianet, Bidadi battery warehouse fire (Apr 2026): https://newsable.asianetnews.com/karnataka-news/karnataka-massive-fire-at-battery-warehouse-in-bidadi-industrial-area-thick-smoke-rises-articleshow-qsknodi

---

## 2. Findings

### F1. Batteries are legally a separate waste stream, even when they arrive inside a phone or laptop
- E-Waste Rules 2022, Rule 2(a): the rules "shall not apply to waste batteries as covered under the Battery Waste Management Rules, 2022" (sources 1, 2).
- BWMR 2022, Rule 2(1)(ii): applies to "all types of batteries regardless of chemistry, shape, volume, weight, material composition and use" (source 4). The definition of Producer explicitly includes battery "including in equipment" (source 4, Rule 3).
- BWMR Rules 8(2)(vi) and 9(2)(vi): refurbishers and recyclers must "ensure that the Waste Battery is removed from collected appliance if Battery is incorporated in an equipment" (source 4).
- **Implication:** Every lot that contains phones, laptops, power banks, UPS units or cordless appliances contains two regulated streams. Battery weight must not be counted as e-waste in any producer evidence, and the downstream party must hold a BWMR registration (Form 2(B)), not only an e-waste authorization.

### F2. Battery EPR is a separate register, portal, certificate and target regime
- Producers register on the CPCB battery EPR portal (Form 1(A)/1(B)), file an EPR plan (Form 1(C)) by 30 June, annual returns (Form 3); recyclers/refurbishers file quarterly Form 4 (source 4).
- Targets are set per battery type (portable, automotive, industrial, EV) and chemistry; portable rechargeable consumer-electronics batteries have a collection target of 70% of quantity placed on the market in the reference year from 2024-25 onwards, with 100% recycling/refurbishment of collected quantity (source 4, Schedule II; figures read from partially garbled PDF text — confirm table before quoting externally).
- Recovery targets for portable batteries: 70% (2024-25), 80% (2025-26), 90% (2026-27 onwards) of dry weight (source 4, Hindi text of Rule 10(4)).
- 2025 amendment: producers must print a barcode/QR code with their EPR registration number on the battery, the equipment containing it, or packaging (source 5). This makes **brand/producer attribution of batteries far easier than for e-waste** — a scan at collection could capture the EPR number.
- Accumulated amendments: 20 Jun 2024, 3 Dec 2024 (S.O. 5210(E)), 24 Feb 2025 (S.O. 958(E)) (source 5 note). Contents of the 2024 amendments not verified in this pass — UNVERIFIED.

### F3. CPCB battery guidelines put hard limits on who may aggregate batteries and how
From source 7 (fetched copy dated July 2026; gazette status of the guideline document UNVERIFIED):
- **Only recyclers, refurbishers or producers may set up battery collection centres.** Collection centres need CTE/CTO/HW authorization from the SPCB (Green category), a site plan approved for storage capacity, and file annual returns in HOWM Form 4.
- Collection centres may set up **drop points** (RWAs, shops, offices). At drop points: no acid draining, dismantling or seal removal; modest volumes; regular pickups; containers resistant to electrolyte; ventilated, dry, shaded; away from children.
- **Storage limit: 90 days** at producer, collection centre, recycler or refurbisher (extendable by SPCB under HOWM Rule 8). Contrast: e-waste storage limit is 180 days (E-Waste Rules 2022, Rule 11, extendable to 365 by CPCB).
- Separate spaces per type (portable/automotive/industrial/EV) and chemistry (lead-acid, Li-ion, Zn, NiCd); **fire-rated partitions and gaps between stacks**; CO₂ or inert-gas suppression for larger centres; fire detector, CO₂ extinguisher, emergency kit, fireproof safety bag.
- Li-ion stored at ~30% SoC, at or below 35 °C, away from heat; damaged batteries quarantined in lined metal containers with non-conductive, non-combustible cushioning (vermiculite); terminals taped.
- **PPE:** gloves, eyewear, apron and shoes when handling damaged/defective batteries; HAZMAT-trained designated staff; access restricted to trained persons; regular mock drills with records; storage inspection log.
- **No collection centre shall sell waste batteries to traders or dealers** — only to registered recyclers.
- Weighing and records per delivery, including chemistry, in HOWM Rule 20 format (Annexure I).

### F4. Battery transport uses the hazardous-waste manifest (Form 10), not an e-waste manifest; Form 11 is the accident report
- CPCB battery guideline §6 (source 7): transport must follow BWMR, Motor Vehicles Act rules, and **HOWM Rule 18**; the sender must **intimate the SPCB before handover (HOWM Rule 19)**; responsibility for safe transport must be indicated **in the manifest**; inter-state transit needs prior intimation to transit states and **NOC from SPCBs of both states**; transport authorization held by the sender or receiver arranging transport.
- HOWM Rule 19: **Form 10** is the seven-copy manifest (sender, transporter, receiver, SPCB copies) (source 9).
- HOWM Rule 22: accidents during handling/transport are reported immediately by phone/email and then in **Form 11** (source 9). So "Form 11 manifest" in the brief is a mix-up: **Form 10 = manifest, Form 11 = accident report.**
- E-waste itself: the 2016 rules had a Form 6 e-waste manifest (source 11). The 2022 rules' Rule 19 only requires HOWM provisions for waste destined to a TSDF, and Rule 20 requires immediate accident reporting to the SPCB by phone and email (source 1). Whether SPCBs still expect a Form 6-style manifest for shop→hub→recycler e-waste movement under the 2022 rules is **UNVERIFIED** and likely varies by state — the platform should generate a manifest-style movement document anyway.
- Li-ion packs: SoC below 30% in transport; lined containers, taped terminals, no mixing with other materials, leak-proof cabin, secured load, fire extinguisher in vehicle (source 7).
- Motor vehicle law: CMVR Rules 129–137 require class labels on packages and vehicles, safety equipment, consignor responsibility, driver information/training and a TREM card for dangerous goods (source 12). Lithium batteries are UN Class 9 (UN3480 loose, UN3481 in/with equipment) — how CMVR applies to small consolidated waste loads in a tempo is **UNVERIFIED**; treat as "apply when loose-battery quantity exceeds a corridor threshold".

### F5. CRTs and mercury lamps are named hazardous fractions inside e-waste
- Schedule I lists **CEEW5 "Fluorescent and other Mercury containing lamps"**, CEEW15/16 HID and sodium lamps, CEEW6 monitors/screens (source 1). Schedule II RoHS exemptions reference mercury in lamps and **lead in CRT glass** — confirming these as hazardous components (source 1).
- CPCB implementation guidelines (source 10): CRTs, LCD/LED/plasma TVs and mercury lamps must be **stored in containers or stably stacked to avoid breakage**; broken-lamp and oil spills must be contained (dry sand, absorbent pads) and sent to a TSDF; covered sheds; fire-fighting and escape routes; **space norms** (e.g. CRT monitors 5.0 m³/t, phones 1.0 m³/t, lamps 1.0 m³/t, fridges 10 m³/t).
- Only skilled staff with PPE may dismantle; CRT cutting must be in vacuum chambers with dust extraction (source 14) — i.e. **never at a shop or hub**.

### F6. Schedule I has 106 items in seven categories — the PRD's "category" must be a coded list
- Seven categories: ITEW (IT/telecom), CEEW (consumer electrical/electronics incl. PV panels), LSEW/LSEEW (large and small electrical equipment), EEDT (tools), TAMEW (toys/leisure/sports), MDEW (medical devices), LMEW (laboratory/monitoring) — 106 EEE (sources 1, 2; CPCB FAQ).
- Producer EPR targets are per EEE code and average life (Schedule III: 60% → 70% → 80%) — attribution and exports must work at code level, not "phones/laptops".

### F7. Fire risk is real and recent in exactly this supply chain
- Ranipet (TN), Mar 2025: open godown of mobile-phone spare-part waste gutted, 2 acres, residents' eye irritation (source 17).
- Bidadi (KA), Apr 2026: warehouse storing batteries and electronics destroyed; slow fire response (source 17).
- West Delhi, Aug 2026: e-rickshaw battery blast while charging in a godown; two dead (source 17).
- Pattern: informal godowns with mixed combustibles, charging on premises, no segregation. A programme-branded hub that burns would be a reputational and legal event (HOWM Rule 23 liability on the occupier).

### F8. Micro-enterprise exemption does not remove safety duties
E-Waste Rules 2022 exclude micro enterprises (Rule 2(c)) (source 1), which suits the PRD's micro-tier shops. But BWMR applies to "entities involved in collection, segregation, transportation" with no micro exemption (source 4, Rule 2(1)(i); Rule 7 requires such entities to hand over only to registered recyclers and follow CPCB guidelines). So a micro shop that accepts loose batteries is inside BWMR even if outside the E-Waste Rules.

---

## 3. Fit with PRD v2

| Area | What v2 has | Assessment |
|------|-------------|------------|
| Category model | `PickupItem.category` and a reference list "aligned to the E-Waste Rules 2022 schedule, with a `data_bearing` flag" (03 §5) | Good start, but no battery regime, no hazard class, no Schedule I codes stated. |
| Battery handling | One line: S10 training "handling batteries" (05) | Essentially absent. No separation, no condition triage, no storage cap, no downstream battery recycler. |
| Storage | Hub onboarding has monsoon readiness (covered, raised, drained) (06 H1); dwell caps per offtake (06 H5) | Monsoon only. No fire, segregation, temperature, quarantine, spill kit, or 90-day battery clock. The statutory 180-day e-waste ceiling is not stated as an upper bound on `max_dwell_days`. |
| Transport | `Trip` with vehicle, driver, route, freight (03, 06 H3) | No manifest reference, no SPCB intimation, no hazardous-load checklist, no Form 10 for batteries. |
| Downstream authorization | `StatutoryRegistration` supports CPCB/SPCB types; offtake needs an "authorized recycler" (03, 06 H2) | Doesn't distinguish e-waste recycler vs BWMR battery recycler; offtake has no accepted-category list (CRTs and batteries are commonly rejected). |
| Attestation / exports | Attestation weight ≤ accepted weight; capacity checks (03) | Battery weight could silently flow into e-waste attestations and producer exports — an evidence-integrity defect. |
| Incidents | Disputes cover weight/custody/payment only | No incident entity for fire, breakage, leak, injury; no SPCB accident-reporting path (E-waste Rule 20; HOWM Rule 22 Form 11). |
| People safety | None beyond training videos | No PPE kit, no mandatory training gate, no mock-drill record. |

The v2 domain model is structurally ready (append-only events, flags, registrations, offtake terms) — the gaps are mostly **missing fields, reference data and rules**, not architecture.

---

## 4. Gaps

1. **Regime split:** no way to mark an item/lot as E-Waste Rules vs BWMR, so battery weight can leak into e-waste evidence.
2. **Battery-in-device state:** no record of whether the battery is present, removed, swollen, damaged or leaking.
3. **Who removes batteries:** unspecified. Per BWMR, removal is the recycler's/refurbisher's duty; shops and hubs removing batteries = dismantling without authorization.
4. **Hub legal status for batteries:** CPCB guideline allows only recyclers/producers/refurbishers to set up battery collection centres. A hub holding loose batteries must operate as a collection centre **of** a registered battery recycler/producer, with its own SPCB CTO/HW authorization — not addressed.
5. **Storage clocks:** 90-day battery limit and 180-day statutory e-waste ceiling not modelled.
6. **Fire safety at hubs and shops:** no segregated battery bay, partitions, extinguisher type, detector, temperature, quarantine container, no-charging rule, mock drills.
7. **CRT / mercury lamp:** no breakage-prevention packaging, spill kit, "broken lamp" handling, or TSDF route for spill residue.
8. **Transport documents:** no manifest per transfer; no Form 10 + SPCB intimation for battery consignments; no inter-state NOC check.
9. **Hazardous trip checklist:** no SoC/terminal-taping/containers/extinguisher/labels/TREM confirmation.
10. **Incidents:** no fire/spill/injury record, no SPCB notification workflow.
11. **PPE and training gating:** training is optional content; no PPE issuance record.
12. **Offtake scope:** no accepted categories / hazardous fraction terms; CRT and battery rejections will become disputes.
13. **Battery EPR attribution:** the 2025 QR/EPR-number labelling is an easy attribution signal the PRD doesn't use.
14. **Schedule I coding:** categories not committed to the 106 official codes.

---

## 5. Recommended PRD changes

### `03-domain-model.md`
1. **Category reference data** — each category row gets: `schedule_code` (e.g. `ITEW15`, `CEEW5`), `regime` (`ewaste_2022` | `bwmr_2022`), `hazard_class` (`general` | `li_ion_embedded` | `battery_loose_li_ion` | `battery_loose_lead_acid` | `battery_loose_other` | `crt_lead_glass` | `mercury_lamp` | `refrigerant_equipment`), `battery_type` (`portable` | `automotive` | `industrial` | `ev`, nullable), `battery_chemistry` (nullable), `fragile` (bool), `storage_m3_per_tonne`. Seed all 106 Schedule I codes plus BWMR battery types idempotently.
2. **PickupItem** — add `battery_present` (`yes` | `no` | `unknown`), `battery_condition` (`intact` | `swollen` | `damaged` | `leaking`), `battery_epr_ref` (optional, scanned QR/EPR number per BWMR 2025 amendment), `breakage` (bool, for CRT/lamps).
3. **Lot** — add `regime` and `hazard_class`; **integrity rule: a lot has exactly one regime; loose batteries, damaged batteries, CRTs and mercury lamps are never mixed with general e-waste in one lot.** Damaged/swollen batteries go into a `quarantine` lot.
4. **StatutoryRegistration** — extend `registration_type` with `bwmr_recycler` (Form 2(B)), `bwmr_refurbisher`, `hw_authorisation`, `cto`, `transport_authorisation`, `fire_noc`.
5. **OfftakeAgreement** — add `accepted_categories[]` (schedule codes / hazard classes), `battery_recycler_org_id` (or a second agreement type `battery_offtake`), `max_battery_dwell_days` (≤ 90), and a validation `max_dwell_days ≤ 180` (E-Waste Rules Rule 11).
6. **Transfer** — add `manifest_number`, `manifest_type` (`ewaste_movement` | `howm_form10`), `spcb_intimation_ref`, `transit_state_nocs[]`, `document_ref`. Battery transfers require `howm_form10` + intimation before `in_transit`.
7. **Trip** — add `carries_hazardous` (derived), and a `TripSafetyCheck` (append-only): terminals taped, lined containers, Li-ion SoC note, load secured, extinguisher present, class labels, TREM card (when threshold exceeded), driver briefed.
8. **New entity `HazardIncident`** (append-only): `type` (`fire` | `smoke` | `battery_swelling` | `leak` | `lamp_breakage` | `crt_breakage` | `injury`), `org_id`, `trip_id`/`lot_id`, `occurred_at`, `description`, `photos`, `spcb_notified_at`, `spcb_report_ref` (HOWM Form 11 / E-Waste Rule 20), `closed_at`.
9. **New entity `SiteSafetyAudit`**: per hub/shop location, checklist version, extinguishers (type, expiry), detector, battery bay partition, max temp observation, quarantine container, spill kit (sand/absorbent, mercury kit), PPE stock, last mock drill date, photos, verified_by.
10. **ComplianceFlag types** — add `battery_dwell_exceeded` (90 days), `ewaste_statutory_dwell_exceeded` (180 days), `mixed_regime_lot`, `quarantine_lot_open`, `manifest_missing`, `safety_audit_overdue`, `incident_unreported` (no SPCB notification within 24 h).
11. **Integrity rules** — (a) e-waste attestations and producer e-waste exports exclude `bwmr_2022` weight; (b) battery lots can only be transferred to an org with a verified `bwmr_recycler`/`bwmr_refurbisher` registration; (c) shops and hubs cannot record a `battery_removed` event unless their org holds a dismantling/refurbisher authorization.

### `05-local-recycle-shop.md`
1. **S1 Onboarding** — shop agrees to a "drop point" safety pledge: no dismantling, no battery removal, no charging of collected devices, no sale to kabadiwalas/traders; receives a starter kit (lined battery bin, terminal tape, lamp tubes/boxes, gloves, eyewear, sand bucket). Record kit issuance.
2. **S3 Collect and weigh** — per item, ask "battery inside?" and "any swelling/leak?" with picture icons. Swollen/leaking batteries: do not collect at doorstep unless the shop has a quarantine bag; otherwise route to hub pickup. Loose batteries tape terminals and go into a separate bag/lot. Mercury lamps and CRTs must stay intact; broken lamp → log incident, bag with sand, flag for hub.
3. **S4 Lots** — shop app blocks mixing regimes/hazard classes in one lot; quarantine lot is separate.
4. **New S11 Storage limits** — per-shop cap for loose Li-ion (e.g. ≤ 25 kg, corridor-configurable — value UNVERIFIED, set with SPCB) and CRT count; pickup trip auto-requested when cap nears; batteries at the shop ≤ 30 days so the chain stays inside 90 days.
5. **S10 Training** — make battery/CRT/lamp safety module **mandatory before first pickup** (short quiz in Hindi/corridor language), refresh yearly.
6. **New S12 Incident report** — one-tap "fire / smoke / swelling / breakage / injury" with photo, works offline; alerts hub and operator.

### `06-regional-hub.md`
1. **H1 Onboarding** — add a `SiteSafetyAudit`: segregated battery bay with fire-rated partition and stack gaps, CO₂/appropriate extinguishers and detector, ventilation and shade (≤ 35 °C target), quarantine metal container with vermiculite, spill kit (sand, absorbent, mercury kit), PPE stock, two escape routes, fire NOC where required, CTO/HW authorization if storing loose batteries. Space check using Schedule I m³/tonne norms against planned throughput.
2. **H1/H2 legal status** — hub that holds loose batteries must be linked to a registered battery recycler/producer (its collection-centre arrangement per CPCB guideline) — record the linkage and the recycler's Form 2(B).
3. **H2 Offtake** — accepted categories per recycler; separate battery offtake; CRT/lamp outlet named (many e-waste recyclers won't take CRT glass).
4. **H3 Trip planning** — hazardous trips need the TripSafetyCheck and a manifest before `in_transit`; battery consignments need Form 10 + SPCB intimation; inter-state requires transit NOCs; never co-load damaged batteries with general e-waste.
5. **H5 Inventory and dwell** — three clocks: battery 90 days, e-waste min(agreement, 180), quarantine lots with a short cap (e.g. 7 days — UNVERIFIED, operator-set). Dashboard shows kg of Li-ion on site against the approved storage capacity.
6. **H9 Surge mode** — hard cap on battery stock during festivals; overflow location must pass its own safety audit.
7. **New H11 Safety operations** — monthly self-inspection log, quarterly mock drill record, incident register with SPCB-notification tracking.

### Other files
- `09-government.md` — SPCB view of `HazardIncident`, overdue safety audits, battery dwell flags, manifests per transfer.
- `10-workflows.md` — add a battery branch: collect → segregated lot → hub battery bay → Form 10 transfer → BWMR recycler → (optional) battery EPR certificate evidence, separate from the e-waste attestation path.
- `14-open-questions.md` — (a) Does the SPCB in the pilot state expect a Form 6-style manifest for e-waste under the 2022 rules? (b) Can a hub legally hold loose batteries as a recycler's collection centre, and what CTO category? (c) CMVR dangerous-goods threshold for mixed small loads. (d) Loose-battery caps at shops.
- `00-overview.md` risk table — add "Fire at hub/shop or in transit" with mitigations above.

---

## 6. Score

**3 / 10** for v2 on this angle.

The data model is solid enough to absorb the fixes (append-only events, flags, registrations, offtake terms). But batteries — which are physically inside most of the programme's target items — are regulated under a separate rulebook with a separate recycler registration, a 90-day storage limit, hazardous-waste transport paperwork (Form 10, SPCB intimation) and explicit fire/PPE norms, and v2 addresses none of it beyond a training video title. Battery weight leaking into e-waste attestations is an evidence-integrity risk, and an unsafe hub fire is a programme-ending risk.

---

## 7. Verification notes

- Rule texts quoted from IndiaCode and CPCB PDFs listed above; Schedule II battery target tables were partially garbled in text extraction — re-check percentages from the PDF before external use.
- CPCB battery guideline copy fetched shows "July 2026"; whether this is the latest revision or supersedes an earlier version is UNVERIFIED.
- Contents of BWMR amendments of June 2024 and Dec 2024 — UNVERIFIED (not read).
- Applicability of Form 6-style e-waste manifest under 2022 rules — UNVERIFIED, state-dependent.
- CMVR dangerous-goods applicability to small mixed Li-ion waste loads and UN3480/3481 classification in Indian road practice — UNVERIFIED (secondary source only).
- Suggested numeric caps (25 kg loose Li-ion per shop, 30 days at shop, 7-day quarantine) are design proposals, not regulatory figures.
