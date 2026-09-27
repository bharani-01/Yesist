# v2 Deep Research 36 — Partnership architecture: build a shop network, or plug into IMC + PRO/recycler networks?

**Agent:** 36 of 36 (v2 deep research swarm)
**Angle:** Whether EcoSure should build its own collection-shop network or act as the software and custody layer over Indore Municipal Corporation (IMC) collection and existing PRO / recycler networks; partnership model (MoUs, data sharing, who collects, who pays); effect on v2 scope and adoption speed
**Inputs read:** `docs/prd/00-overview.md` (v2, 2026-09-27); `docs/research/v2-deep/12-madhya-pradesh.md`, `15-india-precedents.md`, `17-funding.md`
**Research date:** 2026-09-27
**Convention:** Claims from news, company marketing, aggregators, or search synthesis only are marked **UNVERIFIED**. My own inferences are marked **DERIVED**. Nothing was confirmed by phone or site visit. No PRD file was edited.

---

## 1. Sources

| # | Source | URL | Used for | Status |
|---|--------|-----|----------|--------|
| P1 | Times of India, "Indore now shifts focus on Swachh e-waste disposal" (May 2024) | https://timesofindia.indiatimes.com/city/indore/indore-shifts-focus-on-swachh-e-waste-disposal/articleshow/110241375.cms | IMC Addl. Commissioner: 2–2.5 t/day collected of 10–12 t/day via door-to-door garbage vehicles; "two vendors"; IMC "make some payment of up to ₹20/kg"; plan to "bridge scrap dealers and recycling firms" | News; quote attributed, vendor names not given |
| P2 | IMC website (Swachhotsav 2025; Swachh Shahar Jodi MoU with Depalpur) | https://imcindore.mp.gov.in/ | CM flagged off e-waste vehicles, "city's largest e-waste collection drive"; IMC signs Swachh Shahar Jodi MoUs | Primary (ULB) |
| P3 | Free Press Journal, "IMC to make money from plastic waste" (Dec 2020) | https://www.freepressjournal.in/indore/indore-municipal-corporation-to-make-money-from-plastic-waste | IMC signed MoUs with 7–8 MPPCB-authorised plastic PROs (incl. **Moonstar Enterprises**); IMC received ₹7.5 lakh on first handover | News |
| P4 | Ghamasan (Hindi), PRO certificates, 17 Mar 2021 | https://ghamasan.com/india/certificate-given-to-pro-for-plastic-recycling-commissioner-said-this-30045 | Names of 8 PROs; IMC consultant named | News |
| P5 | NDTV Swachh India, IMC first EPR credit | https://swachhindia.ndtv.com/in-a-first-indore-gets-extended-producers-responsibility-credit-by-recycling-single-use-plastic-79564/ | IMC registered on a CPCB EPR portal (plastic); ₹8,100 credit; PPP plant | News |
| P6 | Feedback Foundation, IMC empanelment | https://feedbackfoundation.in/azadi-ka-amrit-mahotsav-in-indore/ | IMC empanels agencies per zone for IEC; six-way segregation incl. e-waste | Company |
| P7 | NGT CZ Bhopal, OA 82/2026, Bhopal Municipal Corporation report | https://www.greentribunal.gov.in/sites/default/files/news_updates/2.9.26%20OA%2082-26-REPORT_pagenumber.pdf | Bhopal model: empanelled agency (Sarthak) collects via GTS/MRF e-waste bays + helpline 155304; **pays BMC ₹1.71 lakh/month royalty**; MoUs with registered recyclers; claims 60–70% capture, 3.5–5 t/month | Primary filing (BMC's own claims) |
| P8 | SNHC Journal, Bhopal e-waste clinic | https://snhcjournal.com/dec-feb-2022/indias-first-e-waste-clinic-in-bhopal/ | Bhopal buys items at posted rates (₹100 phone, ₹10/kg bulbs); call centre; NGO operator | Secondary |
| P9 | MPPCB authorised list | https://mppcb.mp.gov.in/Ewaste_List.aspx | "Municipal Corporation, Bhopal: E-Waste Collection Points" listed; UER, Prometheus, Moonstar authorisations | Primary (regulator) |
| P10 | CPCB FAQ, E-Waste Rules 2022 | https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf | Only registered producers, recyclers, refurbishers may collect; bulk consumers must hand over only to them; dismantlers not registered on portal | Primary |
| P11 | E-Waste (Management) Rules 2022 (MPPCB copy) | https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf | Rule 13(1): producers "may take help of ... PROs, collection centres, dealers"; EPR "entirely on the producer"; certificates only from registered recyclers | Primary |
| P12 | Karo Sambhav government page | https://www.karosambhav.com/government | Offers ULBs co-created collection centres and MRFs | Company |
| P13 | Karo Sambhav EPR page | https://www.karosambhav.com/epr-compliance-for-e-waste | Collection centres in 30+ states; claims work with "municipal bodies and government agencies" | Company (**UNVERIFIED** claims) |
| P14 | Karo Sambhav–GIZ develoPPP press release | https://www.karosambhav.com/press-release/e-waste-programmes-aim-to-reach-rural-india-strategic-alliance-with-giz-and-state-governments-drives-grassroots-action | Semi-urban collection systems with state governments; costs of collection mapped | Company |
| P15 | Ashoka Globalizer case, Karo Sambhav | https://globalizer.ashoka.org/casestudies/pranshu-singhal | Tripartite Prayagraj Municipal Corporation + co-processors + PRO (plastic/legacy waste); work with ULBs and Cantonment Boards | Secondary |
| P16 | vivo India EPR page | https://www.vivo.com/in/activity/E-Waste | Karo Sambhav collection centre **Khajrana, Indore — "Operational"**; PRO channels via logistics service providers (LSPs) to recyclers | Producer disclosure |
| P17 | Nokia India responsible recycling | https://www.nokia.com/about-us/company/worldwide-presence/india/responsible-recycling-at-nokia/ | Karo Sambhav / E-Parisaraa LSP collection centres at Scheme 78 (Vijay Nagar) and Lasudia Mori, Indore | Producer disclosure |
| P18 | Cerebra PRO page | https://www.cerebracomputers.com/cerebra-pro.php.html | Cerebra PRO collection centre at Chawni, Indore (operated via Bizlog); in-house tracking tool "SPOCK" | Company |
| P19 | Godrej e-waste collection centres PDF | https://static.godrejenterprises.com/E_waste_Collection_Centres_72accbf3ee.pdf | **Attero** collection point, Lasudia Mori / Dewas Naka, Indore; Hulladek listed only for Kolkata | Producer disclosure |
| P20 | Namo eWaste FY25 annual report (NSE) | https://archives.nseindia.com/annual_reports/SME_AR_27474_NAMOEWASTE_2024_2025_A_18082025154757.pdf | Recycler sources via producer procurement contracts (service centres, warehouses) and door-to-door aggregators; no MP site found | Primary (listed company) |
| P21 | Intuitive India e-waste policy | https://www.intuitive.com/en-in/e-waste-management-policy | Namo eWaste collection centre list includes Raipur (Chhattisgarh), not MP | Producer disclosure |
| P22 | Town Post, Jugsalai–Hulladek MoU (Dec 2023) | https://townpost.net/2023/12/29/jugsalai-takes-lead-in-e-waste-management-with-hulladek-mou/ | Template: **ULB collects with its own vehicles/bins; recycler takes and processes** | News |
| P23 | Newsvoir, Hulladek–JUSCO | https://www.newsvoir.com/release/hulladek-and-jusco-owned-by-tata-steel-collaborate-to-e-clean-jamshedpur-11620.html | Utility does outreach/ops support; recycler collects and pays by weight | Press release |
| P24 | Recycling Today, E-Parisaraa | https://www.recyclingtoday.com/article/rt0115-e-parisaraa-electronics-recycling/ | Recycler buys from informal collectors; PPE via government agencies | Trade press |
| P25 | BBMP SWM Bye-laws 2020 (India Code) | https://indiacode.ecourtsindia.com/rules/the-bruhat-bengaluru-mahanagara-palike-solid-waste-management-bbmp-swm-56841b96/ | ULB "facilitates" e-waste drop-off via DWCCs, picked up by recyclers; ULB role limited to what rules mandate | Primary (bye-law) |
| P26 | The Goan, Goa DRS doorstep collection | https://www.thegoan.net/goa-news/govt-plans-doorstep-collection-to-make-drs-citizenfriendly/144474.html | **Recykal** as government-appointed DRS agency integrating with local bodies' doorstep collection and informal collectors; UPI refunds | News |
| P27 | Navhind Times / TOI, Goa DRS rollout | https://navhindtimes.in/goanews/100-reverse-vending-machines-installed-ahead-of-drs-launch/ ; https://timesofindia.indiatimes.com/city/goa/goa-gets-300-reverse-vending-machines-for-drs-rollout/articleshow/131397307.cms | Panchayat/ULB **NOCs** as the adoption unit (150 panchayats, 8 ULBs); rollout 1 Sep 2026 | News |
| P28 | NITI Frontier Tech, Recykal | https://frontiertech.niti.gov.in/story/ai-and-data-are-bringing-millions-of-tonnes-of-waste-back-into-circulation/ | Recykal multi-category marketplace incl. e-waste; ₹1,200 cr ARR claim | Government-hosted story (**UNVERIFIED** figures) |
| P29 | Recykal e-waste disposal page | https://www.recykal.com/e-waste-disposal | B2B e-waste via CPCB-authorised partners in 28+ states; tracking portal | Company |
| P30 | WEF on Recykal | https://www.weforum.org/stories/2021/05/waste-india-recycling-pollution-recykal/ | "Smart Centre" software digitises aggregator records and settlements | Secondary |
| P31 | UER (Unique Eco Recycle) | https://www.uerindia.com/ | Indore authorised recycler; offers collection, logistics, data security | Company |
| P32 | E-Waste Samadhan (Samyak Computer) Instagram | https://www.instagram.com/p/DO-diqdkTXe/ | Indore CPCB/MPPCB-authorised recycler; partnerships with government and academia | Company social (**UNVERIFIED**) |

Not found: names of IMC's two e-waste vendors; any IMC e-waste MoU with a PRO; any Recykal, Hulladek, Namo eWaste or E-Parisaraa operation in MP (**absence UNVERIFIED**).

---

## 2. Findings

### F1. Indore already has four independent collection networks. EcoSure would be the fifth unless it connects them
- **IMC municipal channel:** door-to-door garbage vehicles with a segregated e-waste compartment, drop boxes, Swachhotsav drives, IT-office pickups on request, handed to two unnamed vendors (P1, P2). Claimed 2–2.5 t/day (~700–900 t/yr, DERIVED; see 15 §3.7 for the conflict with recycler figures).
- **PRO drop-off network:** Karo Sambhav (Khajrana, "Operational", P16; LSP centres at Vijay Nagar and Lasudia Mori, P17), Cerebra (Chawni, P18), Attero (Lasudia Mori, P19). These exist because producers must show collection channels. Throughput is **UNVERIFIED**; producer disclosures suggest they are thin drop points run by logistics firms.
- **Local authorised recyclers' own B2B collection:** UER, Samyak / E-Waste Samadhan, Primero, plus dismantler Moonstar (P31, P32; 12 F1). They serve corporates, showrooms and government, roughly 90% of formal MP volume (12 F4).
- **Informal kabadi cluster** (Siyaganj, Malgodam, Khajrana; 12 F4) which captures most household volume.
- The v2 PRD's model (8 new shops → 1 hub → 1 recycler, run by a contracted field operator) builds a fifth network in parallel. None of the four existing networks records an end-to-end custody chain or offers public verification (15 §6 gap 4). **That gap, not collection capacity, is EcoSure's unique contribution.**

### F2. IMC has a proven habit of contracting authorised third parties per waste stream, and it gets paid
- In Dec 2020 IMC signed MoUs with 7–8 MPPCB-authorised plastic PROs and received ₹7.5 lakh on the first handover (P3, P4). It later registered on the CPCB EPR portal and earned plastic EPR credit through a PPP plant (P5).
- The same pattern in MP is Bhopal: the municipal corporation empanels an e-waste agency that collects from transfer stations and a helpline, **pays the ULB ₹1.71 lakh/month royalty**, and routes to registered recyclers under MoUs (P7). MPPCB lists "Municipal Corporation, Bhopal" as authorised e-waste collection points (P9).
- **Implication:** in MP, e-waste is revenue-neutral-to-positive for ULBs. IMC will not want a state platform that pays citizens while IMC's own vendors pay IMC (DERIVED). EcoSure must slot in as the *record* of IMC's existing vendor flow, not a competing buyer.

### F3. The law already defines who may collect; EcoSure's "shops" are only lawful as recycler or producer agents
- Only registered producers, recyclers and refurbishers may collect; bulk consumers must hand over only to them (P10). Producers may use PROs, collection centres and dealers, but the obligation stays with the producer (P11).
- ULBs occupy a recognised facilitation role: BBMP bye-laws have the ULB "facilitate" drop-off through DWCCs with pickup by recyclers (P25); Jugsalai's MoU has the ULB collect with its own vehicles and the recycler process (P22); MPPCB lists a municipal corporation's collection points (P9).
- **Implication:** every EcoSure collection node (IMC vehicle, MRF bay, PRO centre, kabadi shop) must be tied in the data model to a registered recycler or producer that is legally responsible for it. A state-owned "shop network" in its own name has no clean legal basis (see also `03-intermediary-legality.md`).

### F4. PROs and recycler platforms already sell "custody software" to producers; EcoSure must be a neutral ledger they feed, not a rival
- Cerebra markets "SPOCK" for end-to-end tracking for brands (P18); Recykal sells B2B tracking portals and "Smart Centre" settlement software for aggregators (P29, P30); Karo Sambhav promises producers "localized impact to SPCBs" (P13).
- In Goa the state appointed Recykal as implementing agency and adoption was gated by **ULB/panchayat NOCs**, integrating with local bodies' doorstep collectors (P26, P27). That is the closest Indian precedent to a state-sponsored platform plugged into municipal collection.
- **Implication:** if EcoSure behaves like a commercial platform (own shops, own buyers), PROs and recyclers treat it as a competitor and withhold data. If it behaves like **DPI** (open schema, API intake, public verification, no commercial role), their incentive flips: EcoSure-verified custody becomes evidence they can show producers and MPPCB (DERIVED). The v2 "not a PRO substitute" positioning points this way but the operating model does not.

### F5. Plugging in changes adoption speed by roughly an order of magnitude
- Own network: v2's launch gate needs ≥8 approved shops, a monsoon-proof hub, 8 weeks of funded float, and a trained operator field team before citizens are served. Informal shops convert slowly (Karo Sambhav needed small first trades → digital pay → GST help; 15 §3.8). Realistic time to first gated corridor: **4–9 months** (DERIVED).
- Plug-in: IMC vehicles already reach every ward daily; three PRO drop points and three authorised recyclers exist; IMC signs third-party MoUs routinely (P3). Recording IMC-vendor handovers and recycler inbound weights needs only a handover form, a weighbridge slip and an API/CSV feed. Realistic time to first custody events: **4–8 weeks** after an IMC MoU (DERIVED).
- Precedents confirm: CSR/NGO networks without ULB ownership plateaued (Saahas, 15 §3.4); ULB-owned channels (Kerala HKS, GHMC, Bhopal) scaled fastest (15 §4, P7).

### F6. Plugging in carries real risks that the PRD must design for
- **Transparency resistance:** IMC's vendors and the "₹20/kg" flow (direction unknown, P1) may not welcome weighed, public custody records. Mitigate by making EcoSure custody a condition in the *next* vendor empanelment, not a retrofit.
- **Double counting / relabelling:** existing IMC and PRO tonnes must be baselined (15 rec 2–3).
- **Commercial sensitivity:** PROs will not share producer-level pricing or client lists. Share custody events and weights only; keep commercial terms out of scope.
- **Neutrality:** a state platform must onboard every authorised recycler/PRO on equal terms or face favouritism complaints (DERIVED).
- **Citizen offer conflict:** IMC's free collection, IMC's announced paid pickup app (12 S10), and EcoSure's UPI incentive must be one offer.

---

## 3. Options

| | A. Build own shop network (v2 as written) | B. Pure software layer over IMC + PRO/recyclers | C. **Hybrid: plug in first, shops only to fill gaps** |
|---|---|---|---|
| Who collects | EcoSure-approved shops + contracted operator trips | IMC vehicles/MRFs, PRO drop points, recyclers' B2B teams | IMC + PROs + recyclers first; kabadi shops enrolled as **recycler-agent collection partners** where coverage is thin |
| Who owns custody | Operator/department | Each partner; EcoSure records | Each legally responsible recycler/producer; EcoSure is the neutral ledger and verifier |
| Money flow | Scheme float → shops → citizens | Unchanged market flows; EcoSure touches no money | Material value flows recycler → vendor/IMC/shop → citizen as today; EcoSure orchestrates *records* of settlement and pays only state top-ups via DBT |
| Legal fit (P10, P11) | Weak unless shops become recycler agents anyway | Strong | Strong |
| Time to first custody data | 4–9 months | 4–8 weeks | 4–8 weeks (partners), shops from month 3 |
| Household additionality | High if it works, slow | Low (mostly relabels existing flows) | Medium–high: baseline + shop layer targets informal share |
| Cost to state | Highest (float, operator field team, hub) | Lowest | Low–medium |
| Political fit | Competes with IMC brand | Strong | Strong; IMC co-brands |
| Main risk | Empty map, competing with IMC | No new tonnes; partners' data quality | Partner data quality; neutrality governance |

**Rejected:** A, because it spends the pilot rebuilding capacity that exists, competes with the Chief Minister-launched IMC channel, and has no clean legal footing for state-run shops. B alone, because it would mainly relabel existing formal tonnes and would not test the informal-household thesis.

---

## 4. Recommendation: Option C — EcoSure as the state custody and settlement-evidence layer over existing networks

### 4.1 Partnership stack (four agreements)

| # | Agreement | Parties | Key terms |
|---|-----------|---------|-----------|
| M1 | **Tripartite programme MoU** | Environment Dept / MPPCB, IMC (with UADD), state IT agency (MPSEDC) | IMC is co-sponsor and co-brand; IMC vehicles, MRF e-waste bays and drop boxes become registered EcoSure collection nodes; IMC vendor handovers recorded as custody events; next IMC e-waste vendor empanelment requires EcoSure custody recording and a named registered recycler; ward-level formal tonnes returned to IMC for Swachh Survekshan; no change to IMC's royalty or vendor revenue in the pilot |
| M2 | **Recycler network agreement** (one standard form, open to every MPPCB-authorised and CPCB-portal-registered recycler in the corridor) | Department + each recycler (UER, Samyak/E-Waste Samadhan, Primero; dismantler Moonstar as upstream only) | Recycler is legally responsible collector for its nodes and enrolled shops; receipt weights and grading entered in EcoSure within 48 h; issues custody attestations; offtake price schedule published per category (feeds citizen price, see 17 F2); reject rules; no exclusivity |
| M3 | **PRO / producer data-sharing agreement** (standard, non-exclusive) | Department + Karo Sambhav, Cerebra, Attero or any PRO/producer with Indore nodes | Their Indore collection centres register as nodes; they push custody events (API or daily CSV) for material collected in the corridor; EcoSure never sees commercial terms; they may cite EcoSure verification numbers to producers and MPPCB; exit and data-deletion clause |
| M4 | **Collection-partner enrolment** (shops, kabadis, SHGs, waste-picker groups) | Recycler (principal) + collection partner, witnessed by an interface agency | Partner collects and segregates only, no dismantling; KYC + UPI; weekly settlement paid by the recycler, recorded in EcoSure; state top-ups via DBT; enrolment only where node coverage is thin |

All agreements share: a published data standard (custody event schema, category codes, weight evidence), DPDP-compliant personal data handling (citizen data stays with the collecting partner unless needed for DBT), open aggregate data labelled "formal EcoSure network only", and equal-terms onboarding for any authorised entity.

### 4.2 Who collects, who pays

| Flow | Collects | Pays citizen/generator | Pays for logistics | Pays for platform |
|------|----------|------------------------|--------------------|-------------------|
| Household via IMC vehicle / drive | IMC (vendor) | Free drop today; posted price or state top-up only if IMC agrees to one unified offer | IMC vendor (funded by material value; royalty to IMC unchanged) | State |
| Household via PRO drop point | PRO LSP | PRO / producer (voluntary) | PRO (producer-funded) | State |
| Kabadi / shop collection partner | Enrolled partner | Partner, from recycler's posted price; state top-up via DBT for negative-value items | Recycler | State |
| Government / PSU / corporate bulk | Recycler B2B | Recycler (tender / GeM price) | Recycler | State |
| Drives (monthly) | IMC + recyclers on site | Recycler price + optional state top-up | IMC (16th FC SWM grants, per 17 F4) | State |

EcoSure itself holds no float and buys no material. The v2 "settlement float" becomes a recycler obligation in M2/M4, with an optional small state revolving guarantee for enrolled partners only (consistent with 17 §5).

### 4.3 Effect on v2 scope

| Area | Change |
|------|--------|
| Removed / shrunk | Operator-run trip logistics as the default; hub operated by the programme; 8-week state float as a launch gate; building the shop network before launch |
| Added | Organisation types `urban_local_body`, `pro`, `collection_partner` (agent of recycler); node registry with legal-principal link; partner API + bulk CSV intake with validation and idempotency; partner-issued custody events with evidence; baseline import (12 months of IMC vendor + recycler corridor inbound); per-partner data-sharing scopes enforced by RLS; unified citizen offer lookup (which node, what price, who pays) |
| Kept | Custody attestations, public verification, dual weighing at recycler receipt, disputes, SPCB views, producer evidence library, WhatsApp/Hindi, offline capture |
| Adoption | First custody events in 4–8 weeks after M1 versus 4–9 months; SPCB/IMC dashboards populated from week one of partner feeds; shops added progressively as a measured additionality lever |

---

## 5. Recommended PRD changes

| # | File | Change |
|---|------|--------|
| 1 | `00-overview.md` §1 Programme assumptions — **Operations** and **Mandate** rows | Replace "contracted field operator runs collection logistics and settlement float" with: "EcoSure is the custody and evidence layer over existing collection networks in the corridor: IMC municipal collection, PRO/producer collection points, and authorised recyclers' B2B collection. Collection partners (shops, kabadis, SHGs) are enrolled as agents of a registered recycler, only where coverage is thin. EcoSure holds no float and buys no material." Mandate: "IMC joins as co-sponsor under a tripartite MoU; recyclers and PROs join on a standard, non-exclusive, equal-terms agreement." |
| 2 | `00-overview.md` §8 Corridor launch checklist | Replace "≥8 active approved shops / ≥1 hub / float ≥8 weeks" with: signed M1 IMC MoU; ≥2 recyclers on the M2 agreement (status checked on MPPCB list and CPCB portal within 30 days); ≥1 PRO on M3; IMC vendor handovers flowing as custody events for 2 consecutive weeks; 12-month baseline imported; one unified citizen offer agreed with IMC. Shop count becomes a Phase 1 additionality target, not a launch gate. |
| 3 | `00-overview.md` §4 Positioning | Add to "EcoSure is": "a neutral, non-commercial ledger that IMC, PROs, recyclers and producers feed and cite." Add to "EcoSure is not": "a collection operator or buyer competing with IMC, PROs or recyclers." |
| 4 | `00-overview.md` §6 Stakeholders | Add rows: **Urban local body (IMC)** (joins for Swachh Survekshan evidence and vendor oversight; gets ward-level formal tonnes and vendor custody records); **PRO / producer collection network** (joins for SPCB-visible, verifiable local collection evidence; gets verification numbers, node listing). Redefine **Local collection shop** as "collection partner enrolled under a registered recycler". |
| 5 | `00-overview.md` §7 Metrics | Add "Share of corridor formal inflow recorded in EcoSure by source (IMC / PRO / recycler B2B / collection partner)" and "Additional tonnes above baseline from collection partners". Keep "shop payment ≤7 days" but measure it as recycler-paid. |
| 6 | `00-overview.md` §10 Risks | Add: "Partners withhold or delay data" (mitigation: custody recording as a condition of IMC vendor empanelment and a public list of participating nodes); "Neutrality / favouritism complaints" (standard equal-terms agreements); "Relabelling existing tonnes" (baseline + source split). |
| 7 | `03-domain-model.md` | Add `Organisation.type` values `urban_local_body`, `pro`, `collection_partner`; add `CollectionNode` with `legal_principal_org_id` (registered recycler or producer, required); add `PartnerAgreement` (type M1–M4, scopes, start/end, status) and `DataFeed` (source org, method API/CSV, last sync, error count); custody events carry `source_org_id` and `ingest_method`. |
| 8 | `11-integrations.md` | Add a partner ingestion API (signed requests per org, idempotency keys, schema validation, quarantine for rejected rows) and a daily CSV channel for IMC vendors and PROs without IT; publish the data standard as an open specification. |
| 9 | `02-roles-rbac.md` / `12-nfr-security.md` | Add roles `ulb_officer`, `pro_operator`, `collection_partner`; RLS so each partner sees only its own nodes and events plus public aggregates; no partner sees another's commercial or personal data. |
| 10 | `13-roadmap.md` | Week 0: IMC MoU (Addl. Commissioner SWM), identify IMC's two vendors and contract terms, meet Karo Sambhav/Cerebra/Attero Indore ops, recycler agreements. Pilot weeks 1–4: record IMC handovers + recycler receipts only (no shops). Weeks 5–12: enrol first collection partners under one recycler in the Khajrana/Siyaganj cluster. Gate: "≥2 sources feeding custody events for 4 weeks". |
| 11 | `14-open-questions.md` | Add sponsor questions: Is IMC co-sponsor and will it add EcoSure custody recording to its next vendor empanelment? Direction and amount of IMC's "up to ₹20/kg" payment? Will IMC's paid pickup app integrate or be replaced? Which recycler is principal for the first collection partners? |

---

## 6. Score

**4 / 10** for the partnership architecture of PRD v2 as written.

- **+** Positioning already says "not a PRO substitute", "recycler is the root of trust", and "never issues EPR certificates"; the custody and verification layer is genuinely missing from every existing Indore network, so the core product is well aimed.
- **−** The operating model contradicts that positioning: it builds a parallel shop-hub network with a state-run float, ignores IMC's existing daily e-waste stream and its PRO-contracting track record, ignores three PRO collection points and three authorised recyclers already in Indore, lacks legal principals for shops, and has no partner data agreements or ingestion path. That makes adoption slow (months), costly, and politically competitive with IMC.
- Adopting Option C (changes 1, 2, 7 and 10 especially) would raise this to about **7.5 / 10**. The remaining risk is whether IMC's vendors and PROs actually share weighed, timely data, which only the Week 0 conversations can settle.
