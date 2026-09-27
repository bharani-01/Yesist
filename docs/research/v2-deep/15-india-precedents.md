# 15 — Indian government / PPP e-waste precedents: lessons for EcoSure PRD v2

**Agent:** 15 of 36 (v2 deep research swarm)  
**Angle:** Precedents of Indian state, municipal, and PPP e-waste collection programmes and apps  
**Inputs read:** `docs/prd/00-overview.md`, `docs/prd/13-roadmap.md` (v2, 2026-09-27)  
**Research date:** 2026-09-26/27  
**Convention:** Figures come from the cited source. Where a figure is from press only, conflicts between sources, or is my own derivation, it is marked **UNVERIFIED** or **DERIVED**.

---

## 1. Executive summary

Indian precedents are consistent on five points:

1. **Drives beat always-on apps for household volume.** Time-boxed, municipally announced collection drives with many drop points and on-the-spot payment (Kerala 2025, GHMC Hyderabad 2026) move tens of tonnes in weeks. Always-on online request services (Delhi MCD/EDMC, BMC Mumbai) move very little household volume.
2. **Households are a minority of formal volume.** Where splits are published, offices, godowns, and institutions dominate (BMC: ~25% households). Government offices alone generated ₹4,637 crore of scrap-disposal revenue under DARPG Special Campaigns up to March 2026.
3. **Price transparency decides whether pickups happen.** Kerala published a fixed per-kg rate card for 44 categories and paid at the door. Delhi EDMC's private-vendor model saw 25 of 39 requests cancelled, with unrealistic price expectations cited.
4. **The pilot city already has a municipal e-waste stream.** Indore Municipal Corporation (IMC) says it collects about 2–2.5 tonnes a day of e-waste through its door-to-door garbage vehicles and hands it to two vendors. It ran a Swachhata Hi Seva e-waste drive in September 2025. **The v2 PRD does not mention IMC at all.**
5. **Programmes funded by CSR or grants end when the funding ends.** Saahas/ENSYDE bE-Responsible in Bengaluru ran from 2016 to 2022 and collected 108 t before closing. Awareness programmes such as MeitY/MAIT GreenE reached over 1.3 million people but did not report collection outcomes.

**Score for v2 against precedent evidence: 6/10.** The v2 design choices (UPI at collection, no EcoPoints, WhatsApp-first, density gate, recycler as root of trust) match what worked. The PRD is blind to the incumbent municipal channel in Indore, to drive-based launch mechanics, to the bulk and institutional share of volume, and to additionality (whether EcoSure tonnes are *new* formal tonnes or IMC's existing tonnes relabelled).

---

## 2. Sources

| # | Source | URL | Notes |
|---|--------|-----|-------|
| S1 | Onmanorama, Kerala HKS buying e-waste (2025-07-19) | https://www.onmanorama.com/news/kerala/2025/07/19/kerala-e-waste-collection-haritha-karma-sena-dispose-fridge-tv-computers.html | 44 categories, ₹55/kg hazardous, KEIL disposal |
| S2 | The Hindu, 97,678 kg across 93 ULBs (2025-10) | https://www.thehindu.com/news/national/kerala/e-waste-collection-drive-nets-97678-kg-across-93-urban-local-bodies-in-kerala/article70151639.ece | 2.5-month drive, CPCB recyclers |
| S3 | The Hindu, expansion to panchayats (2025-09) | https://www.thehindu.com/news/national/kerala/e-waste-collection-drive-to-be-expanded-to-keralas-panchayats-too/article70093737.ece | Pilot Dec 2024, partners, MSTC |
| S4 | Kerala Kaumudi editorial | https://keralakaumudi.com/en/editorial/editorial/haritha-karmasenas-e-waste-collection-deserves-praise-1592515 | 33,945 kg / ₹2.63 lakh in month one; payment float mechanism |
| S5 | Madhyamam, 33,945 kg in a month | https://www.madhyamam.com/kerala/harithakarma-sena-collected-33945-kg-of-e-waste-in-a-month-1437885 | States ₹2,63,81,866 paid, which **conflicts** with S4 |
| S6 | Clean Kerala Company GOs | https://cleankeralacompany.com/government-orders-and-circulars/ | Rate GOs 2017–2025 |
| S7 | ThePrint/PTI, Delhi eco-park land (2026-07) | https://theprint.in/india/delhi-lg-sandhu-approves-land-for-indias-first-e-waste-eco-park/2981236/ | 8.5 ha allotted |
| S8 | TOI, NGT notice on eco-park | https://timesofindia.indiatimes.com/city/delhi/ngt-issues-notice-on-delhi-e-waste-eco-park-plan/articleshow/131486673.cms | Land-use and siting challenge |
| S9 | Down To Earth court digest (2026-06-03) | https://www.downtoearth.org.in/environment/daily-court-digest-major-environment-orders-june-3-2026 | 8 schools within 500 m |
| S10 | Business Standard, capacity doubled | https://www.business-standard.com/india-news/delhi-s-holambi-kalan-e-waste-plant-to-double-capacity-after-norway-study-125081000661_1.html | 51k → 110k TPA, PPP via DSIIDC |
| S11 | TOI, MCD e-waste facility | https://timesofindia.indiatimes.com/city/delhi/mcds-e-waste-disposal-facility-finds-many-takers/articleshow/100059926.cms | ~1,000 requests / 1.5 yr, 971 fulfilled, ₹87 lakh |
| S12 | The Hindu, e-waste headache (EDMC) | https://www.thehindu.com/news/cities/Delhi/e-waste-disposal-a-mounting-headache-for-the-city/article37155485.ece | 39 requests, 25 cancelled |
| S13 | Indian Express, EDMC toll-free MoU (2021) | https://indianexpress.com/article/cities/delhi/east-delhi-civic-body-starts-toll-free-service-for-e-waste-collection-and-management-7439382/ | Zero-cost-to-ULB vendor model |
| S14 | TOI, DPCC crackdown | https://timesofindia.indiatimes.com/city/delhi/dpcc-cracks-down-on-e-waste-violations-in-delhi/articleshow/112614031.cms | 1,392 Seelampur units disconnected |
| S15 | Deccan Chronicle, GHMC 15 t (2026-03-15) | https://www.deccanchronicle.com/southern-states/telangana/ghmc-collects-15-tons-of-e-waste-1944067 | 110 centres, cash on the spot |
| S16 | New Indian Express, GHMC drive | https://www.newindianexpress.com/cities/hyderabad/2026/Mar/16/ghmc-collects-15k-kg-e-waste-in-two-days-under-praja-palana-pragathi-pranalika-programme | Swachh Auto Tipper announcements |
| S17 | Telangana Today, GHMC doorstep + QR (2026-04-23) | https://telanganatoday.com/ghmc-launches-doorstep-e-waste-collection-initiative-in-hyderabad | 30 retail drop boxes, 5 recyclers |
| S18 | Deccan Chronicle, GHMC QR, no app | https://www.deccanchronicle.com/southern-states/telangana/e-waste-collection-ghmc-provides-list-of-centres-for-disposing-disused-electronic-gadgets-1952309 | "QR code doesn't require downloading any app" |
| S19 | Telangana E-Waste Policy 2017 | https://www.rich.telangana.gov.in/assets/pdfs/Resources/Telangana-e-Waste-Management-Policy-2017.pdf | SPV / e-waste park "explore" |
| S20 | The Hindu, Siddapur eco town (2026-05-26) | https://www.thehindu.com/news/cities/Hyderabad/integrated-processing-facility-to-process-cures-waste-to-be-set-up-in-rangareddys-siddapur/article71022096.ece | Village opposition |
| S21 | be-responsible.in (Saahas/ENSYDE) | https://www.be-responsible.in/ | 108 t, 800+ institutions/RWAs |
| S22 | Saahas bE-Responsible page | https://saahas.org/initiatives/be-responsible/ | Closed; Nov 2016–Mar 2022; CSR funders |
| S23 | The Hindu, Bangalore One drop boxes | https://www.thehindu.com/news/cities/bangalore/Now-drop-off-e-waste-at-select-centres-post-offices-in-Bengaluru/article17362939.ece | BBMP not involved |
| S24 | HT, PMC door-to-door e-waste (2022-12) | https://www.hindustantimes.com/cities/pune-news/doortodoor-e-waste-collection-begins-in-pune-101670349068483.html | 150 pickups ≈ 3 t in 6-ward pilot |
| S25 | SWaCH–PMC partnership | https://swachcoop.com/about/swach-pmc-partnership/ | MPCB-authorised waste-picker coop since 2012 |
| S26 | Free Press Journal, BMC 21,000 kg | https://www.freepressjournal.in/mumbai/mumbai-news-bmc-and-private-agency-successfully-collect-recycle-21000kg-of-e-waste-across-city-in-5-months | Households 5,353.7 kg |
| S27 | Loksatta, BMC low response | https://prelaunch.loksatta.com/mumbai/bmc-mumbai-civic-body-struggles-to-collect-e-waste-low-public-response-mumbai-print-news-vsd-99-5399454/ | "Other options available", low citizen response |
| S28 | TOI, TN e-waste policy nosedives | https://timesofindia.indiatimes.com/city/chennai/e-waste-policy-nosedives-in-tn-95-enters-dumpyards/articleshow/126143615.cms | 4.66 lakh t generated vs 17,205 t recycled |
| S29 | The Hindu, GCC bulk waste via app/1913/WhatsApp | https://www.thehindu.com/news/cities/chennai/corporation-collects-over-45-tonnes-of-waste-in-one-day/article70152814.ece | Multi-channel intake |
| S30 | TN E-Waste Policy 2010 (G.O.Ms.18) | https://elcotangadi.tn.gov.in/G.o.M/G.O.Ms.18_E-Waste_Policy.pdf | Informal sector: collection and segregation only |
| S31 | TOI, Indore shifts focus on e-waste (2024) | https://timesofindia.indiatimes.com/city/indore/indore-shifts-focus-on-swachh-e-waste-disposal/articleshow/110241375.cms | IMC 2–2.5 t/day vs 10–12 t/day generated |
| S32 | Indian Masterminds, Swachhotsav Indore (2025-09) | https://indianmasterminds.com/news/swachhotsav-indore-mohan-yadav-e-waste-drive-145675/ | CM flagged off e-waste vehicles |
| S33 | EA Water, Indore recycler volumes (2023) | https://www.eawater.com/enews-waste/research-reports/a-hike-of-18-in-e-waste-disposal-to-be-likely-in-indore/ | 275 t FY22; ~4,000 t/yr estimate |
| S34 | MPPCB recycler list | https://www.mppcb.mp.gov.in/Recycler.aspx | Includes Hazargo Unit-III, Dhar |
| S35 | Adhāra Viveka, MP recycler capacity (CPCB register summary) | https://adhara-viveka.com/industrial-areas/e-waste-recycling/madhya-pradesh | 9 recyclers, 58,880 TPA; Indore 10,800 TPA. **Secondary source, UNVERIFIED** |
| S36 | GreenE / MeitY awareness | https://greene.gov.in/ | 1,923 workshops, 13,27,420 participants |
| S37 | ITU deck on MeitY awareness programme (2019) | https://www.itu.int/en/ITU-D/Regional-Presence/AsiaPacific/SiteAssets/Pages/Events/2019/Policy-awareness-workshop-on-E-waste/Awarness-Jan2019.pdf | ~100 informal actors moved to formal |
| S38 | MAIT report, DIKSHA e-waste course | https://www.mait.com/storage/uploads/newsletters/1755509577_Report%20on%20Electronics%20Waste%20Management%20(E-waste%20Course).pdf | 105,320 enrolled / 56,765 certified; regional-language demand |
| S39 | NIELIT capacity building | https://www.nielit.gov.in/content/capacity-building-e-waste-management | MP among 10 states |
| S40 | Janaagraha, Swachhata platform | https://www.janaagraha.org/work/swachhata-technology-platform/ | 2.7 crore complaints, 93% resolution |
| S41 | Indian Express, 74% Swachhata downloads inactive | https://indianexpress.com/article/technology/tech-news-technology/over-74-per-cent-of-those-who-downloaded-swachhata-app-dont-use-it-reveals-data-5042889/ | Chandigarh 2018 |
| S42 | SBM-U digital innovations | https://sbmurban.org/digital-innovations | Swachh Survekshan weightage drove usage |
| S43 | HT, Special Campaign 4.0 | https://www.hindustantimes.com/india-news/govt-earns-2k-cr-revenue-with-special-campaign-40-101731264480233.html | 5.97 lakh offices; ₹650 cr in Oct 2024 |
| S44 | DARPG post, cumulative ₹4,637.21 cr to Mar 2026 | https://www.facebook.com/DARPGIndia/posts/secretariat-reforms-report-for-march-2026-released-a-cumulative-revenue-of-46372/1278175757772168/ | All scrap, not e-waste only |
| S45 | PIB, SWM Rules 2026 | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219676&lang=1&reg=6 | MRFs may act as e-waste deposition points |
| S46 | CPCB SWM portal | https://swm.cpcb.gov.in/ | ULB monthly reporting |
| S47 | Resource Recycling, Karo Sambhav and informal workers | https://resource-recycling.com/e-scrap/2018/09/20/how-group-bolsters-standing-of-indias-informal-workers/ | Small trades → digital pay → formal link |
| S48 | SWITCH-Asia, formal–informal partnerships | https://www.switch-asia.eu/site/assets/files/2329/ewaste-partnerships-india.pdf | Interface agencies (NGOs, coops) |

---

## 3. Findings by precedent

### 3.1 Kerala — Clean Kerala Company (CKCL) + Haritha Karma Sena (HKS)

**Model.** A state-owned company under the Local Self-Government Department (CKCL) aggregates and sorts the material. Kudumbashree women's collectives (HKS), who already do door-to-door dry-waste collection, collect e-waste from homes and **pay a fixed per-kg price** from a published rate card of 44 non-hazardous categories. Hazardous items (CFLs, tube lights, batteries) are bought at ₹55/kg and go to KEIL for disposal (S1, S6). Recyclable material goes to CPCB-authorised recyclers, partly through MSTC auction (S2, S3).

**Scale.**
- The pilot started in December 2024 in a few ULBs. It was extended to all corporations in July 2025 (S3).
- Month one of the urban drive collected 33,945 kg (S4, S5).
- The full 2.5-month urban drive, across 93 ULBs, collected **97,678.71 kg**: 92,743.51 kg e-waste and 4,935.2 kg hazardous (S2).
- The drive expanded to grama panchayats from 2 October 2025 (S2). **No 2026 totals found (gap).**

**Money mechanics.** HKS pays households from the HKS consortium fund or the local body's own fund. CKCL reimburses HKS when it takes over the material (S4). In effect this is a **settlement float held by the collector and reimbursed by the aggregator**, very close to EcoSure's shop/hub settlement model.

**Payment amount conflict.** S4 says ₹2.63 lakh was paid for 33,945 kg, about ₹7.8/kg (DERIVED). S5 prints ₹2,63,81,866, about ₹777/kg, which is implausible. Treat the ₹/kg figure as **UNVERIFIED**, probably ~₹8/kg on average.

**What worked:**
- A pre-existing, trusted door-to-door workforce was reused.
- Prices were fixed and published.
- Payment happened at the door.
- The drive was time-boxed, with ministerial launch.
- It was staged: pilot, then urban, then rural.
- Collectors were trained on sorting, pricing, and hazardous handling (S1).

**What is weak:**
- Volume per ULB is modest: ~1 t per ULB over 2.5 months (DERIVED).
- Results are published as drive totals, not as a custody record.
- There is no public verification of the recycler outcome.

### 3.2 Delhi — e-waste eco-park (PPP) and municipal vendor models

**Eco-park (Holambi Kalan).**
- The park is a PPP through DSIIDC. Capacity was raised from 51,000 to 110,000 TPA after a Norway study (S10).
- DDA allotted the land in July 2026 (S7).
- The NGT issued notice on a village plea. The site was allegedly rezoned from residential. There are 8 schools within 500 m, against red-category siting rules and Rule 10 of the E-Waste (Management) Rules 2022 on industrial-area siting (S8, S9).
- Announced around 2024–25, the park is **still not operational in September 2026**.
- Lesson: treatment infrastructure takes years and is litigation-prone. EcoSure is right to depend on *existing* authorised recyclers rather than new plants.

**Municipal online vendor service.**
- MCD's vendor handled about 1,000 online requests in ~1.5 years, fulfilled 971, and paid ~₹87 lakh (S11). That is ~54 requests/month for a city of ~20 million (DERIVED). The average of ~₹9,000 per request (DERIVED) suggests mostly office/IT bulk, not households.
- East Delhi's earlier Attero MoU saw **39 requests in two months, 25 cancelled**. Pickups completed were small, and unrealistic price expectations were a reported cause (S12).
- The EDMC model cost the ULB nothing; the vendor bore all costs (S13).
- Lesson: a helpline or app with a private vendor and no price transparency or promotion yields negligible household volume.

**Enforcement against the informal sector.** DPCC disconnected 1,392 units in Seelampur and nearby areas, and fined some operators ₹20,000 each (S14). The informal hub persists. Enforcement alone does not redirect flows.

### 3.3 Telangana / Hyderabad (GHMC)

**Policy.**
- The 2017 state e-waste policy promised to earmark industrial sheds, register dismantling workers, give incentives to recyclers, and "explore" an SPV for e-waste parks (S19).
- No dedicated e-waste park was found. A broader "eco town" at Siddapur is planned for May 2026, and is already opposed by villages (S20).

**GHMC 2026 programme.** This is the most relevant recent municipal precedent.
- **Mega drives:** a weekend drive on 14–15 March 2026 ran 110 collection points across all 30 circles and collected ~15 t. Authorised recyclers paid cash on the spot and awarded reward points (S15, S16).
- One site took 510 kg and paid ₹20,874, about ₹41/kg (DERIVED; mix of cash and points, **UNVERIFIED**).
- Swachh Auto Tippers announced the drive door to door. Monthly repeat drives were scheduled for April and May (S15).
- **Always-on layer (April 2026):** 30 drop boxes inside electronics retail chains, a QR code for drop-point finding and doorstep requests that "doesn't require downloading any app", and five authorised recyclers doing pickups (S17, S18).
- Incentives are an appreciation certificate plus reward points redeemable at SHG stalls (S17). This is **the EcoPoints pattern v2 removed**, and no redemption data was found.
- **No custody, chain, or recycler-outcome reporting found** (gap).

### 3.4 Karnataka / Bengaluru

**bE-Responsible (Saahas + ENSYDE, CSR-funded by VMware and Western Digital).**
- Ran November 2016 to March 2022 and is now **closed** (S22).
- Used drop boxes at Bangalore One centres and post offices, a scheduled van for RWAs and institutions, and outreach to 800+ institutions and RWAs (S21, S23).
- Collected 108 t in total (S21), about 1.6 t/month (DERIVED) against a 3.5 t/month target (S22).
- BBMP "not involved" at launch (S23).

**Lessons:**
- A CSR-funded programme without municipal ownership plateaued below target and ended.
- Drop boxes in trusted public offices (India Post, Bangalore One) were a credible channel.
- Karnataka's model bye-laws (2019) expect ULBs to do fortnightly door-to-door e-waste collection until EPR takes over, and to integrate waste-picker organisations into DWCCs and MRFs. This is a legal hook for municipal partnership.

### 3.5 Maharashtra — Pune and Mumbai

**Pune.**
- SWaCH, a waste-picker cooperative, has been MPCB-authorised to collect and channel e-waste since 2012 (S25).
- PMC, APCCI (Poonawalla CSR), and Poornam Ecovision ran a door-to-door pilot in 6 wards: **150 pickups ≈ 3 t**, about 20 kg per pickup (DERIVED). It then scaled to 15 wards through a Google Form, QR code, and helpline (S24).
- APCCI provides the vehicles.
- Lesson: waste-picker cooperatives are a **legally authorisable collection partner**. Household pickups average ~20 kg, which is useful for EcoSure's trip economics.

**Mumbai (BMC, from May 2025).**
- Private partner Electrofine Recycling works through Google Form/QR registration and scheduled pickups, with token payment by category (S26).
- Five months yielded 21,570 kg: **households 5,353.7 kg (~25%)**, godowns 10,040 kg, industry 6,182 kg (S26, S27).
- Loksatta reports low public response because citizens have "other options", meaning kabadiwalas (S27).
- Lesson: in a mega-city with a strong informal market, a municipal service with token payment captures little household volume. Bulk and institutional sources carry the numbers.

### 3.6 Tamil Nadu / Chennai

- TN generated an estimated 4.66 lakh t of e-waste in 2024-25, but only **17,205 t was formally recycled**, against formal capacity above 90,000 TPA. The informal sector handles more than 95% of household e-waste (S28).
- **Capacity is not the constraint; collection is.**
- The GCC commissioner says there is no systematic e-waste-only collection. The planned approach is a TNPCB-approved concessionaire nudging battery-operated-vehicle (BOV) collection crews to collect e-waste alongside hazardous waste (S28).
- GCC's bulk-waste service takes requests through the Namma Chennai app, the 1913 helpline, and WhatsApp. On day one it collected 45.64 t for 145 households using 62 vehicles (S29). That is multi-channel intake, but very high cost per household.
- TN's 2010 policy explicitly limits the informal sector to **collection and segregation only**, with a path to formal dismantling through associations (S30). This is consistent with treating kabadiwalas as possible collection-tier partners.

### 3.7 Madhya Pradesh / Indore (the pilot corridor)

**This is directly load-bearing for v2 and is absent from the PRD.**
- **IMC already runs e-waste collection.** It collects "about 2–2.5 tonnes of e-waste on a daily basis" through its door-to-door garbage vehicles, against estimated generation of 10–12 t/day. It uses **two vendors** and pays "up to ₹20/kg". The article is ambiguous about who pays whom (S31, **UNVERIFIED**).
- IMC also collects from IT offices on request (S31).
- **Swachhata Hi Seva 2025:** the Chief Minister flagged off e-waste collection vehicles in Indore on 17 September 2025. Drop boxes were placed at IMC HQ and the Smart City office, and later door-to-door phases and RWA/school outreach were planned (S32).
- **Formal recycler baseline:** Indore's first authorised recycler reported 275 t received in FY22 and expected 325–350 t in FY23. Local generation is estimated at ~4,000 t/yr (S33).
- There is a **mismatch**: IMC's 2–2.5 t/day claim implies ~800 t/yr (DERIVED), versus the recycler's figures. The formal baseline is therefore **uncertain and must be measured, not assumed**.
- **Capacity:** the MPPCB list includes Unique Eco Recycle, Samyak, and Primero in Indore, and Hazargo Industries Unit-III in Dhar district, where Pithampur is located (S34).
- A secondary summary of the CPCB register gives MP 9 recyclers and 58,880 TPA, with Indore at 10,800 TPA (S35, **UNVERIFIED**). As in Tamil Nadu, formal capacity likely far exceeds formal inflow.
- **NIELIT** ran e-waste capacity-building for government employees in MP among 10 states (S39). That is a possible training partner for the field team.

**Implications for v2:**
1. EcoSure will operate in a corridor where the city already collects e-waste and holds vendor contracts.
2. Without an IMC MoU, EcoSure risks competing with or double-counting IMC flows.
3. The "formal tonnes grow every month" metric cannot be interpreted without a pre-pilot baseline that includes IMC vendor tonnes.
4. IMC's Swachh Survekshan branding and its garbage vehicles are the most efficient awareness and collection channel available.

### 3.8 National programmes and apps

**MeitY / MAIT awareness programme (GreenE), from 2015.**
- 1,923 workshops and 13,27,420 participants (S36). Phase II claimed 1.2 million people reached, 40% industry co-funding, and 1,200 trainers in 20 cities (S37).
- The DIKSHA course "Environmental Hazards of E-waste" enrolled 105,320 and certified 56,765. Learners asked for **regional-language versions** (S38).
- The only behaviour outcome reported is that "close to 100 informal actors" moved to the formal sector (S37). **No collection tonnage was linked to awareness.**
- Lesson: awareness spend without a collection mechanism does not show up in tonnes. EcoSure is right to exclude vanity metrics.

**Swachhata-MoHUA app (Janaagraha).**
- Very large scale: 2.7 crore complaints with 93% average resolution (S40).
- Usage was driven by **Swachh Survekshan scoring weightage** for cities (S42), not by citizen pull.
- In Chandigarh, **74% of downloaders were inactive** despite heavy promotion (S41).
- Its complaint categories are sanitation service-level agreements. There is no e-waste category (S40).
- Lessons:
  - Download counts mislead. v2 already excludes app downloads as a metric, which this supports.
  - The lever that moved ULBs was a **ranking incentive**. A possible EcoSure lever is recognition in Swachh Survekshan or state rankings for ULBs whose wards feed the formal chain (**sponsor ask, UNVERIFIED feasibility**).
  - Proof-photo-on-resolve and citizen reopening are proven patterns worth reusing in pickup completion and disputes.

**DARPG Special Campaigns (government offices).**
- Special Campaign 4.0 covered 5.97 lakh offices and earned over ₹650 crore from scrap in October 2024 alone (S43).
- Cumulative scrap-disposal revenue reached **₹4,637.21 crore up to March 2026** across all scrap, not e-waste only (S44).
- In MP specifically, press reports MP Police planning to dispose of legacy e-waste (S33).
- Lesson: **government and institutional legacy stock is a large, lumpy, auditable feedstock** with a state mandate behind it. It is ideal for proving the custody chain before household density exists. v2 lists societies and small offices but not government departments as a priority channel.

**SWM Rules 2026 (in force 1 April 2026).**
- E-waste is excluded from the Rules; it stays under the E-Waste Rules. However, **MRFs "may also act as deposition points for e-waste"** (S45).
- ULBs must report monthly on the CPCB SWM portal (S46), set up online grievance redressal within a year, and frame bye-laws by 31 March 2027.
- Lesson: IMC's MRFs are a legitimate hub or drop-point candidate. ULB bye-law revisions due by March 2027 are a window to write EcoSure handover into IMC practice.

**Informal-sector integration (Karo Sambhav, SWaCH, interface agencies).**
- Karo Sambhav, a PRO, converted aggregators through small first trades, then reliable digital payment, bank and GST registration, and van pickup so aggregators did not dismantle (S47).
- SWITCH-Asia recommends working through NGOs or cooperatives as "interface agencies" (S48).
- v2 treats kabadiwalas only as the competitor on cash.
- Precedent shows they can be **the collection tier**, and TN policy explicitly allows collection and segregation by informal actors (S30).

---

## 4. Cross-precedent patterns

| Pattern | Evidence | Worked? |
|---------|----------|---------|
| Time-boxed municipal drive, many drop points, pay on the spot | Kerala 97.7 t / 2.5 mo; GHMC 15 t / 2 days | **Yes**, for volume spikes |
| Always-on app or helpline + private vendor, no promotion | MCD ~54 req/mo; EDMC 25/39 cancelled; BMC households ~5 t / 5 mo | **No**, for households |
| Published fixed rate card | Kerala 44 categories | **Yes**, trust and fewer disputes |
| Reuse existing door-to-door workforce | Kerala HKS; Pune SWaCH; Indore garbage vehicles | **Yes** |
| Reward points / certificates | GHMC 2026 | Unproven; no redemption data |
| CSR-funded NGO programme without ULB ownership | Saahas 2016–22, below target, closed | **Fragile** |
| Awareness programmes | MeitY 1.3M participants; no tonnage | **No measurable collection effect** |
| New PPP treatment park | Delhi eco-park stuck in NGT | **Slow, litigation risk** |
| Bulk / institutional feedstock | BMC 75% non-household; DARPG ₹4,637 cr | **Yes**, dominant volume |
| Ranking incentive for ULBs | Swachh Survekshan drove Swachhata app use | **Yes**, for ULB behaviour |

---

## 5. v2 fit assessment

| v2 element | Precedent verdict |
|------------|-------------------|
| UPI incentive at collection, EcoPoints removed | **Strongly supported** (Kerala pays at the door; GHMC's cash on the spot beat its points) |
| Shop paid within 7 days; settlement float | **Supported**; Kerala's HKS fund plus CKCL reimbursement is the same shape |
| Corridor launch checklist (density before demand) | **Supported**; online-only services without density failed (MCD, EDMC) |
| Recycler as root of trust, existing authorised recyclers | **Supported**; Delhi eco-park delays show why not to depend on new plants. MP formal capacity likely exceeds inflow |
| WhatsApp + local language first, no app metric | **Supported** (GHMC's no-app QR; Swachhata's 74% inactive; MAIT regional-language demand) |
| Excluding app downloads and awareness metrics | **Supported** by MeitY and Swachhata evidence |
| Wizard-of-Oz manual pilot | **Supported**; Pune's 6-ward pilot before scale is the same pattern |
| Positioning "not a kabadiwala replacement" | Partly supported. Misses the **informal-as-collection-tier** model |
| Stakeholder list | **Gap**: no ULB / IMC, no SHG or waste-picker cooperative, no government-department generators |
| Success metric "formal tonnes grow" | **Gap**: no baseline or additionality; risk of relabelling IMC's existing flow |
| Pilot mechanics | **Gap**: no drive calendar; relies on continuous booking, which precedents show underperforms |
| Funding | Scheme plus producer pool. **Gap**: no multi-year continuity plan (Saahas closure) |

---

## 6. Gaps in the evidence

1. No 2026 Kerala totals, per-ULB cost, or leakage data. The ₹/kg paid is **UNVERIFIED** because sources conflict.
2. No GHMC reward-point redemption rate or recycler-outcome verification.
3. IMC's 2–2.5 t/day claim is unverified. Who pays whom in its vendor contracts, the vendor identities, and whether IMC material reaches CPCB-authorised recyclers are all unknown.
4. No precedent publishes an **unbroken custody chain** or public verification. EcoSure would be novel here. That is positive for differentiation but means there is no benchmark for the ≥95% chain-completeness target.
5. No precedent reports pickup completion rate except EDMC (14/39 ≈ 36%, DERIVED). The 70% gate at week 8 and the 80% target are ambitious against the only data point.
6. Unclear whether GHMC's April–May 2026 drives sustained March volumes; possible drive fatigue.
7. Maharashtra-wide and Karnataka-wide state programme outcomes after 2022 were not found.

---

## 7. Recommended PRD changes

| # | File | Change |
|---|------|--------|
| 1 | `00-overview.md` §1 assumptions and §6 stakeholders | Add **Indore Municipal Corporation (and Pithampur Nagar Palika)** as a partner stakeholder. State that IMC already collects e-waste (~2–2.5 t/day claimed) via door-to-door vehicles and two vendors. Add the assumption: "EcoSure operates under an MoU with IMC; IMC vehicles, MRFs, and drop boxes are EcoSure collection points or hubs, not competitors." |
| 2 | `00-overview.md` §8 corridor checklist | Add: (a) signed IMC MoU covering data sharing, co-branding, and use of vehicles and MRFs as deposition points under SWM Rules 2026; (b) a **measured pre-pilot formal baseline** (IMC vendor tonnes plus authorised recycler inbound from the corridor over the last 12 months). |
| 3 | `00-overview.md` §7 success metrics | Change "Formal tonnes … grows every month" to "**Additional** formal tonnes above the pre-pilot baseline, reported with source split (household / society / institutional / government-legacy / IMC-channel)". Add **cost per kg collected** (incentive plus logistics) and pickup cancellation rate. |
| 4 | `13-roadmap.md` Pilot section | Add a **drive calendar**: at least one weekend mega-drive per month (≥20 drop points, IMC Swachh vehicle announcements, recycler or operator paying UPI on the spot), modelled on Kerala and GHMC. Continuous booking runs alongside. Add the gate metric "household share of tonnes" so bulk tonnes cannot mask household failure, and vice versa. |
| 5 | `13-roadmap.md` Pilot weeks 1–4 | Add a **government and institutional legacy channel**: onboard state departments, MP Police, schools, and colleges in the corridor as bulk generators (DARPG Special Campaign pattern). Use them to prove chain completeness and recycler attestations before household density exists. |
| 6 | `04-consumer.md` and `05-local-recycle-shop.md` | Show a **published per-category rate card** (Kerala 44-category model) at booking and on the WhatsApp confirmation, with the expected incentive range, so price expectations are set before pickup (the EDMC cancellation lesson). |
| 7 | `01-stakeholders-and-personas.md` and `02-roles-rbac.md` | Add a **collector-partner tier** for SHGs, waste-picker cooperatives (SWaCH model), and kabadiwalas enrolled via an interface agency. Scope: collection and segregation only, no dismantling (TN 2010 policy, CPCB guidance). Pay by UPI, with KYC and optional GST assistance (Karo Sambhav pattern). |
| 8 | `11-integrations.md` | Add: IMC / ULB grievance and Swachhata-style channels as intake (read-only or referral), QR-without-app intake (GHMC), and optional reporting alignment with the CPCB SWM portal's MRF data. Do **not** build a standalone citizen app for the pilot. |
| 9 | `09-government.md` | Add a ULB view: ward-level formal tonnes feeding EcoSure, for IMC's Swachh Survekshan evidence. Propose to the sponsor that state rankings credit ULBs for verified formal e-waste tonnes (the lever that drove Swachhata adoption). |
| 10 | `14-open-questions.md` | Add sponsor questions: (a) Does IMC's current vendor contract conflict with EcoSure hubs or recyclers? (b) Multi-year budget line beyond the pilot, given CSR-funded precedents (Saahas) closed. (c) Can a ministerial / Swachhata Hi Seva launch be scheduled in September–October, when drives already run? |
| 11 | `00-overview.md` §10 risks | Add the risks "**Double-counting or relabelling existing municipal tonnes**" (mitigation: baseline plus additionality metric) and "**Drive fatigue** after launch spikes" (mitigation: monthly cadence plus institutional channel). |

---

## 8. Score

**6 / 10** for how well v2 reflects Indian precedent evidence.

- **+** Core economics (pay at the door, fast shop settlement, float), channel (WhatsApp, local language, no app metric), trust (existing authorised recyclers), and staging (manual pilot, density gate) all match what worked in Kerala, GHMC, and Pune. They also avoid what failed at MCD, EDMC, BMC, Saahas, and the Delhi eco-park.
- **−** The PRD ignores the incumbent Indore municipal e-waste stream. It has no additionality baseline, no drive-based launch mechanics, underweights bulk and government-legacy feedstock, and treats the informal sector only as a competitor. Fixing items 1–5 in §7 would lift this to about 8/10.
