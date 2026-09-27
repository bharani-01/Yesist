# 17 — Funding sources for EcoSure v2 (citizen UPI incentive + shop float)

**Agent:** 17 of 36 (v2 deep research swarm)
**Angle:** Realistic funding sources and legality of a "producer take-back pool"
**Date of research:** 2026-09-26/27
**PRD read:** `00-overview.md`, `14-open-questions.md`, `08-manufacturer.md` (plus grep of `03`, `04`, `11`, `13`)
**Status:** Research only. No PRD file was edited.

**Score for v2 funding design as written: 4 / 10**

The PRD's single line "state scheme budget plus producer-funded take-back pool" names two sources, neither of which is sized, has a legal vehicle, or has a clear reason to pay. The money that actually exists in this system is (a) the material value of the e-waste, (b) the EPR certificate value that producers already must pay registered recyclers, and (c) urban local body sanitation grants. The PRD uses none of these explicitly.

---

## 1. Sources

Verified means I read the primary text or an official copy. UNVERIFIED means secondary source only, or the claim is my inference.

| # | Source | URL | Status |
|---|--------|-----|--------|
| S1 | E-Waste (Management) Rules 2022, full text (MPPCB copy) | https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf | Verified (Rules 6(3), 9(8), 10, 13(1), 22(6)(i) read) |
| S2 | CPCB FAQ, E-Waste Rules 2022 ("who can collect") | https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf | Verified (excerpt) |
| S3 | CPCB Environmental Compensation Guidelines, approved by MoEFCC OM 09-09-2024 | https://www.tnpcb.gov.in/PDF/Waste_Mngt/E-waste/EnvironmentalCompensation.pdf ; https://www.nirmalvasundhara.com/wp-content/uploads/2025/01/09-10-2024-EC-Guidelines-under-EWMR.pdf | Verified (floor = 30% of EC, ceiling = 100%; collection + transport cost taken as ₹25/kg) |
| S4 | TeamLease RegTech note on EC guidelines notification | https://www.teamleaseregtech.com/updates/article/35161/cpcb-notified-regarding-the-environmental-compensation-ec-guidelines-u/ | Secondary |
| S5 | Economic Times — producers challenge Rules 15(9)/15(10) floor price in Delhi HC; ₹22/kg minimum | https://economictimes.indiatimes.com/industry/cons-products/electronics/govt-asks-delhi-hc-to-dismiss-firms-pleas-against-e-waste-payout-rules/articleshow/122324524.cms ; https://economictimes.indiatimes.com/industry/cons-products/electronics/delhi-hc-seeks-centres-reply-on-lg-samsung-plea-against-electronic-waste-management-policy-hike/articleshow/120524867.cms | Secondary |
| S6 | Reuters — Daikin, Samsung, others fight floor price | https://www.reuters.com/world/india/daikin-samsung-companies-fight-modi-over-e-waste-policy-2025-04-11/ | Secondary |
| S7 | Newslaundry — Delhi HC interim stay (24-12-2025) on CPCB price declaration; certificates trading below floor | https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration | Secondary; case status after Jan 2026 UNVERIFIED |
| S8 | MCA CSR FAQ — Rule 2(1)(d) exclusions (statutory obligations, sponsorship, normal course of business) | https://www.mca.gov.in/bin/dms/getdocument?mds=GTatbQatWaZKl7Zzifcd9Q%253D%253D&type=open | Verified (excerpt) |
| S9 | Companies (CSR Policy) Amendment Rules 2021 text | https://www.corporatelaws.in/2021/01/companies-csr-policy-amendment-rules.html | Secondary copy of official rules |
| S10 | SBM-U 2.0 Operational Guidelines (TN / WB / MoHUA copies) | https://sbmurban.org/storage/app/media/pdf/swachh-bharat-2.pdf ; https://www.cma.tn.gov.in/sbm/Assets/User-manual/SBM-2.0-Guidelines.pdf | Verified (IEC 5% at §8.7.2; CB 3% at §9.15.2; e-waste only as segregation duty; §6.8 no duplication of funding) |
| S11 | Cabinet approval SBM-U 2.0 till 2025-26 (₹1,41,600 cr; central share ₹36,465 cr) | https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1763354 | Verified |
| S12 | PIB Jan 2026 still labels SBM-U 2.0 "2021–2026"; no extension found | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2220345&lang=1&reg=3 | Verified; "no successor scheme" is UNVERIFIED |
| S13 | Lok Sabha reply — SBM-U 2.0 SWM central share ₹10,930 cr, released via SLTC-approved state action plans | https://sansad.in/getFile/lsapps/loksabhaquestions/annex/188/AU702_3lI9oQ.pdf | Verified |
| S14 | PRS summary, 16th Finance Commission 2026-31 | https://prsindia.org/files/policy/policy_committee_reports/16th_FC_Report_Summary.pdf | Verified |
| S15 | Explanatory Memorandum / Action Taken on 16th FC | https://www.indiabudget.gov.in/doc/16fc.pdf | Verified (50% of basic grant tied to sanitation & SWM and/or water; untied cannot pay salaries) |
| S16 | NGT-filed CPCB Guideline for Utilisation of EC Fund (OA 593/2017) | https://www.greentribunal.gov.in/sites/default/files/news_updates/Guideline%20for%20Utilization%20of%20EC%20Fund%20by%20CPCB%20in%20OA%20No.%20593%20of%202017%20%28Paryavaran%20Suraksha%20Samiti%20%26%20Anr.%20Vs.%20Union%20of%20India%20%26%20Ors.pdf | Verified (excerpt) |
| S17 | NGT CZ Bhopal — MPPCB imposing EC on ULBs (OA 71/2023 ATR) | https://www.greentribunal.gov.in/sites/default/files/news_updates/ATR%20OA%2071-2023%2027.11.2024%20FINAL.pdf | Verified (excerpt) |
| S18 | NGT CZ OA 82/2026 — Bhopal Municipal Corporation e-waste model; empanelled agency pays BMC royalty ₹1.71 lakh/month; 3.5–5 t/month | https://www.greentribunal.gov.in/sites/default/files/news_updates/2.9.26%20OA%2082-26-REPORT_pagenumber.pdf | Verified (excerpt; BMC's own claims) |
| S19 | Times of India — NGT on Bhopal e-waste; MP ~5,000 t/yr | https://timesofindia.indiatimes.com/city/bhopal/90-of-bhopals-e-waste-burned-disposed-unscientifically/articleshow/133662719.cms | Secondary |
| S20 | Clean Kerala Company GOs — hazardous e-waste ₹55/kg (S.O. 300/2025/LSGD) | https://cleankeralacompany.com/government-orders-and-circulars/ | Verified (listing) |
| S21 | The Hindu — Kerala household e-waste buy-back; ₹8.84 lakh paid to households; sale via MSTC | https://www.thehindu.com/news/national/kerala/e-waste-collection-drive-to-be-expanded-to-keralas-panchayats-too/article70093737.ece | Secondary |
| S22 | Kerala Kaumudi / TeamLease — payment from Haritha Karma Sena consortium fund or LSG own fund, reimbursed by CKCL | https://keralakaumudi.com/en/editorial/editorial/haritha-karmasenas-e-waste-collection-deserves-praise-1592515 ; https://www.teamleaseregtech.com/updates/article/44523/kerala-govt-issued-guidelines-for-e-waste-collection-drive/ | Secondary |
| S23 | GEF project 11405 — MeitY/UNDP electronics circular economy, GEF $15M, co-finance $108.6M, approved 11-08-2025 | https://www.thegef.org/projects-operations/projects/11405 | Verified |
| S24 | UNDP India press release — includes "test business models for replacement-rebate schemes" | https://www.undp.org/india/press-releases/india-advances-transition-circular-economy-electronics-sector-gef-and-undp-support | Verified |
| S25 | MeitY GreenE awareness programme | https://greene.gov.in/ | Verified |
| S26 | C-MET EoI — MeitY project for informal recycler clusters via MSME-CDP | https://cmet.gov.in/sites/default/files/eoi/EoI%20on%20selection%20of%20accelerators.pdf | Verified (excerpt) |
| S27 | GIZ / RLG "E-Safai" develoPPP (BMZ), Delhi + Hyderabad | https://www.pninews.com/amp/rlg-india-giz-india-announce-landmark-e-waste-management-project-e-safai/ | Secondary |
| S28 | GIZ / adelphi — formal–informal e-waste partnerships | https://adelphi.de/system/files/mediathek/bilder/giz2018-en-e-waste-partnerships-india.pdf | Verified |
| S29 | World Bank Kerala SWM loan $105M (2021) | https://cleanindiajournal.com/world-bank-provides-105-million-loan-for-keralas-solid-waste-management/ | Secondary |
| S30 | Andhra Pradesh Circular Economy & Waste Recycling Policy 4.0 (2025-30) operational guidelines — VGF, concessional loans, matching funds | https://apindustries.gov.in/APIndus/Data/policies/2026INDS_40346_MS26_E.pdf | Verified (excerpt) |
| S31 | CPCB 2016 implementation guidelines — producers may run consumer incentive / DRS / buy-back | https://hppcb.nic.in/ewaste/cpcbguide.pdf | Verified; superseded regime (context only) |
| S32 | Knocksense — Indore Municipal Corporation earns first plastic EPR credit via MRF agency (Mar 2026) | https://www.knocksense.com/indore/indore-municipal-corporation-becomes-first-urban-body-to-receive-epr-credit/ | Secondary |
| S33 | Urban SDG platform — Indore six-bin segregation incl. e-waste | https://urbansdgplatform.org/profile/profile_caseView_detail.msc?no_case=767 | Secondary |

---

## 2. Findings

### F1. The producer's legal obligation is to buy EPR certificates, not to fund a pool. A take-back pool is lawful only as voluntary spend.

- Rule 13(1) lets producers "take help of third party organisations such as producer responsibility organisations, collection centres, dealers etc.", with EPR "entirely on the producer" (S1). Rule 6(3) also requires producers to create awareness (S1).
- EPR is extinguished only by end-of-life processing at a registered recycler and an EPR certificate on the CPCB portal (S1 Rule 14(iv); S2).
- Nothing in the 2022 Rules bars a producer from paying citizens a take-back incentive. The superseded 2016 guidelines explicitly listed "incentive scheme for consumers" as a take-back option (S31). So **yes, a producer can fund citizen incentives**, but:
  1. The spend does **not** create EPR credit by itself. The producer only gets credit if it also acquires the certificate generated from that tonnage. EcoSure's `take_back_programme` attribution method in `08-manufacturer.md` P3/P7 has no statutory meaning and should not imply it does.
  2. The state **cannot compel** producers to pay into a state pool without a statute or rule that authorises it. A compulsory levy with no legal basis is exposed under Article 265 (no tax except by authority of law) and fee "quid pro quo" doctrine (my inference; UNVERIFIED legal opinion). `00-overview.md` says pilot producers "join via SPCB direction or MoU". A direction to *join* is arguable; a direction to *pay* is not.
  3. Producers are actively litigating to pay *less* (Rules 15(9)/15(10) floor-price challenge by Havells, Daikin, Voltas, Blue Star, LG, Samsung; interim stay on the CPCB price declaration, Dec 2025) (S5–S7). Voluntary additional spend on top of the certificate floor will be small unless it lowers their total compliance cost or secures certificate supply.

### F2. The biggest real "producer money" already flows through recyclers: the EPR certificate value.

- CPCB EC guidelines set the certificate floor at 30% of EC and ceiling at 100%, and build the EC from a collection-and-transport cost of **₹25/kg** plus processing cost (S3). Reported minimum is **₹22/kg** for consumer electronics (S5); a higher smartphone rate (~₹34/kg) is reported in secondary summaries (UNVERIFIED).
- That means each formal kg arriving at a registered recycler already carries a producer-paid value designed to cover collection. The realistic "producer take-back pool" is a **pass-through of certificate value from recycler to hub, shop, and citizen**, written into the offtake agreement, not a separate state-held pot.
- Risk: if the Delhi HC strikes down the floor, this value can fall sharply; certificates were already reported trading below floor (S7). Budget must not assume the floor survives.

### F3. Environmental compensation money is held centrally by CPCB and suits one-time pilot grants, not recurring incentives.

- Rule 22(6)(i): e-waste EC goes into a **CPCB escrow account** and may be used for collection/recycling of uncollected, historical, or orphaned e-waste, R&D, "incentivising recyclers", and "financial assistance to local bodies for managing waste management projects", as decided by the committee (S1).
- The SPCB does **not** hold e-waste EC; it can only propose projects. The general NGT-driven EC fund (OA 593/2017) supports equipment, labs, studies, and training, with an evaluation committee of CPCB and SPCB officials (S16). MPPCB's own EC (for example against ULBs under SWM rules, S17) is governed by NGT orders.
- Fit: a one-time CPCB EC-fund proposal from MPPCB with Indore Municipal Corporation for orphan-device collection, hub storage, and the first 8 weeks of float is plausible. Recurring citizen cash from EC is not. Whether any e-waste EC has been disbursed to date: UNVERIFIED.

### F4. Urban local body grants are the most reliable recurring public money, and the PRD does not name the ULB as a funder.

- **16th Finance Commission (2026-31):** ₹3.56 lakh crore for ULBs; 50% of basic grants tied to "sanitation and solid waste management and/or water management"; untied grants cannot pay salaries (S14, S15). Indore Municipal Corporation can legitimately spend tied SWM grants on e-waste collection points, drives, storage, and possibly per-kg payments as an SWM operating cost (the last is my inference; UNVERIFIED with MP UDHD).
- **SBM-U 2.0** (2021-22 to 2025-26; ₹1,41,600 crore outlay) mentions e-waste only as a segregation duty; project funding is for MRFs, transfer stations, processing, legacy waste (S10, S11). The **IEC component (5%, 60:40 Centre:State)** and **capacity-building component (3%)** fit e-waste drives, wipe-camp training, and field team training, but not recurring citizen cash (S10). No extension beyond 2025-26 was found as of Sept 2026 (S12); a successor scheme is UNVERIFIED. §6.8 forbids duplicate funding across schemes, so EcoSure needs per-source ledgers.
- **15th FC** grants ended with 2025-26; do not plan on them for the pilot.
- Indore already runs six-bin segregation including e-waste (S33) and has earned plastic EPR credit through a PPP MRF agency (S32), so the ULB is a natural co-sponsor.

### F5. Indian precedents show e-waste collection can be close to self-financing when priced from material value.

- **Kerala (2024–25):** LSGD guidelines (July 2025) let local bodies pay households per kg for e-waste; Haritha Karma Sena pays from its consortium fund or the LSG's own fund and is reimbursed by Clean Kerala Company, which sells to recyclers through the MSTC portal; ₹8.84 lakh paid to households in the early phase; hazardous fraction priced at ₹55/kg (S20–S22).
- **Bhopal (2024–26):** the municipal corporation's empanelled e-waste agency pays BMC a **royalty of ₹1.71 lakh/month** while collecting 3.5–5 t/month (S18, BMC's own claim before NGT). E-waste is revenue-positive for the city, not a subsidy sink.
- Implication: the citizen "incentive" should mostly be a **posted purchase price** funded by recycler offtake value (scrap + certificate), with scheme money only topping up negative-value or data-bearing items.

### F6. CSR can fund awareness and inclusion, never EPR, and never brand-linked incentives.

- CSR Rule 2(1)(d) excludes "activities carried out for fulfilment of any other statutory obligations" and "sponsorship activities for deriving marketing benefits for its products or services" (S8, S9). So producer EPR costs cannot be booked as CSR, and a brand-specific citizen incentive ("return any Brand X device, get ₹100") looks like sponsorship and fails CSR.
- CSR (Schedule VII item iv, environmental sustainability) can fund: citizen awareness, data-wipe camps, informal collector training and safety kits, society/school drives beyond EPR. It must flow through a registered implementing agency (CSR-1), for example a state society or Section 8 company (UNVERIFIED which MP entity has CSR-1).
- SBM-U 2.0 guidelines themselves suggest CSR for capacity building (S10 §9.15.6).

### F7. National and multilateral programmes offer technical assistance and demonstration money, not a recurring incentive budget.

- **GEF/UNDP–MeitY** "Accelerating Transition to a Circular Economy in India's EEE Sector": GEF $15M, co-finance ~$108.6M, approved Aug 2025, five years; explicitly to "strengthen systems for collection and recycling" and "test business models for replacement-rebate schemes" and informal sector upgrading (S23, S24). EcoSure's corridor is a strong candidate demonstration site; ask MeitY/UNDP. Pilot-site selection status: UNVERIFIED.
- **MeitY** GreenE awareness programme (MAIT-implemented) and C-MET informal-cluster project via MSME-CDP (S25, S26): IEC and recycler-side capex, not citizen payouts.
- **GIZ:** E-Safai develoPPP (BMZ) 2020–23 with RLG in Delhi/Hyderabad; formal–informal partnership guidance (S27, S28). A new develoPPP with a recycler or producer is realistic for TA and field operations; current GIZ e-waste calls: UNVERIFIED.
- **World Bank:** no current state e-waste operation found; nearest precedent is Kerala SWM ($105M, 2021) (S29). IFC ran a 2017 e-waste programme with PROs. Treat as long-term, not pilot money.
- **State industrial policy precedent:** Andhra Pradesh Circular Economy Policy 4.0 (2025-30) offers VGF, concessional loans, and matching-fund rules for recycling clusters (S30). MP could use a similar instrument for hub capex and float guarantees.

### F8. Rules on who may collect shape how money can flow.

- CPCB FAQ: only registered producers, recyclers, and refurbishers may collect e-waste under the 2022 Rules (S2). Shops and hubs in EcoSure are not registered entities, so they must operate as **agents or collection partners of the corridor recycler (or a producer)**. Money therefore flows most cleanly **recycler → hub → shop → citizen**, which is already the PRD's settlement chain (`14-open-questions.md` OQ-03). The incentive should ride the same chain, paid on behalf of the recycler, with state top-ups paid by DBT.

---

## 3. Fit with v2

| PRD element | Fit | Notes |
|-------------|-----|-------|
| `00` §1 Funding: "scheme budget + producer take-back pool" | Weak | Omits material value, certificate pass-through, ULB grants. No legal vehicle for pooled producer money. No budget figure. |
| `00` §1 Mandate: producers join by SPCB direction | Risky | Acceptable for data participation; cannot be used to require payments. |
| `00` §8 checklist: float funded ≥ 8 weeks | Good gate | But the source of float is undefined. Recycler advance or a state revolving corpus are the realistic options. |
| `14` SP-04 | Under-specified | A single question hides five decisions (see section 5). |
| `08` P7 take-back programme | Misleading as written | Implies funding produces attributable EPR evidence. It only helps if paired with certificate transfer through the portal. Brand-specific targeting is fine as producer spend but not as CSR. |
| `03` `CitizenIncentive.funding_source` = `scheme` \| `producer_pool` | Too narrow | Needs material value, ULB, CSR, grant; plus a per-source ledger for utilisation certificates. |
| `04` C6 incentive "scheme-funded" | Misframed | Most of the payment should be a purchase price from offtake value. |
| "No commission on scrap value" | Compatible | Passing recycler value down the chain is not a commission. |

---

## 4. Gaps

1. **No pilot budget.** No estimate of incentive spend per month, float corpus, or operator contract value. Earlier internal research (`docs/research/pilot-design.md`) had ₹40k–80k for consumer incentives in a Wizard-of-Oz phase; v2 does not carry any figure forward.
2. **No fund custodian.** Who holds producer, CSR, or grant money: state treasury, a registered state society, the operator, or recycler escrow? Each has different rules (treasury receipts cannot easily be earmarked; societies need CSR-1 and audit; escrow needs a tripartite agreement).
3. **No per-source eligibility rules.** CSR money cannot be brand-linked; SBM money cannot duplicate other schemes; 16th FC tied grants must be SWM; EC money is project-bound. The platform must enforce these per payout.
4. **No utilisation certificate / audit export.** Government grants require utilisation certificates (GFR 2017 Rule 238 for central grants; state equivalents; UNVERIFIED for MP specifics). The domain model has no ledger to produce them.
5. **ULB missing as stakeholder/funder.** Indore Municipal Corporation (and Pithampur Nagar Palika) hold the most relevant recurring money and the SWM mandate for e-waste found in municipal waste (Schedule of Rules 2022, local body duties, S1).
6. **Certificate-floor litigation risk** not in the risk table.
7. **Post-pilot sustainability.** Scheme money is annual and political. Without a material-value core, the incentive stops when the budget line lapses.
8. **Negative-value items** (CRT, CFL, batteries, small plastic-heavy items) need explicit gap funding; data-bearing devices need a separate wipe-service cost line.

---

## 5. Recommended funding model

Layer the money so the recurring core does not depend on a budget line.

| Layer | Pays for | Source | Vehicle | Recurring? |
|-------|----------|--------|---------|------------|
| 1. Material + certificate value | Citizen purchase price per category; shop and hub margins | Recycler offtake price (scrap value + share of EPR certificate value) | Offtake agreement with pass-through schedule; paid recycler → hub → shop → citizen | Yes |
| 2. Scheme gap top-up | Top-up for negative-value and data-bearing items; per-person caps | State budget line (Environment Dept / SPCB own funds) | DBT via state IFMIS / PFMS-linked payout (see `07-payments-dbt.md`) | Yes, annual sanction |
| 3. ULB co-funding | Collection points, drives, storage bay at MRF/transfer station, IEC | 16th FC tied SWM grants; SBM-U IEC/CB while available | ULB work order to the field operator | Yes |
| 4. Producer voluntary top-up | Brand or category-specific bonus; campaign days | Producer's own EPR/take-back budget | Tripartite escrow (producer, recycler, operator) or via producer's PRO; never state treasury; paired with certificate transfer on the portal | Campaign-based |
| 5. CSR (beyond EPR) | Awareness, wipe camps, informal collector training and kits | Any company's CSR (non-brand-linked) | CSR-1-registered state society or Section 8 partner | Project-based |
| 6. One-time grants / TA | Float corpus, hub capex, evaluation | CPCB EC fund proposal; GEF/UNDP–MeitY demo; GIZ develoPPP | Project agreements | No |

**Float:** fund the 8-week float from (a) a recycler-provided advance written into the offtake agreement, backed by (b) a one-time state revolving corpus (from layer 2 or 6), not from producer money.

**Answer to the core question:** A producer take-back pool **can** legally fund citizen incentives as voluntary producer spend, delivered through the recycler or a PRO, but it does not create EPR credit by itself, it cannot be compelled by SPCB direction, it cannot be booked as CSR, and it should not sit in a state account. Treat it as an optional top-up, not a pillar.

---

## 6. Recommended PRD changes

| File | Change |
|------|--------|
| `00-overview.md` §1 Funding row | Replace with the six-layer model. Core: "Citizen payment is a posted purchase price funded by recycler offtake value (scrap + EPR certificate share); state scheme money tops up negative-value and data-bearing items; ULB grants fund collection points and drives; producer and CSR contributions are voluntary and ring-fenced." |
| `00-overview.md` §1 Sponsor and §6 Stakeholders | Add Indore Municipal Corporation / Pithampur ULB as co-sponsor and funder (16th FC tied SWM grants). |
| `00-overview.md` §1 Mandate | Clarify: SPCB direction or MoU governs data participation only; no participant can be directed to pay into a pool. |
| `00-overview.md` §10 Risks | Add "EPR certificate floor struck down or unenforced (Delhi HC litigation)" with mitigation: incentive pricing reviewed weekly from actual offtake price; scheme top-up cap. Add "Scheme budget lapses after pilot". |
| `14-open-questions.md` SP-04 | Split into: SP-04a recycler pass-through schedule; SP-04b state top-up budget line and sanction order; SP-04c ULB co-funding MoU; SP-04d custodian for producer/CSR money (escrow vs state society); SP-04e float corpus source. Add OQ: CPCB EC-fund proposal (owner MPPCB, due Phase 0); OQ: GEF/UNDP–MeitY demonstration site request. |
| `08-manufacturer.md` P7 | Reframe as "Voluntary take-back top-up". Money flows into tripartite escrow or producer's PRO, never a state account. State plainly: funding does not create EPR credit; credit requires certificate transfer on the CPCB portal from the processing recycler. Brand-linked top-ups are producer spend, not CSR. Add acceptance criterion: attribution method `take_back_programme` is shown only with the linked portal certificate reference once available. |
| `03-domain-model.md` `CitizenIncentive` | Replace `funding_source` enum with a split: `base_price_amount` (material value) plus zero or more `IncentiveFunding` lines, each with `fund_id`. Add `Fund` entity: `source_type` (`material_value` \| `state_scheme` \| `ulb_grant` \| `producer_topup` \| `csr` \| `grant`), `sanction_ref`, `custodian`, `eligibility_rules` (categories, corridors, brand-linked allowed yes/no), `balance`, `period`. |
| `04-consumer.md` C6 | Rename to "Collection payment". Receipt shows base price plus any top-up, each labelled with its funder, e.g. "₹40 purchase price + ₹20 state top-up". |
| `09-government.md` (operator/float views) | Add per-fund balance, burn rate, weeks of float remaining, and utilisation-certificate export per fund and period. |
| `13-roadmap.md` Phase 0 gate | Add funding gate: signed offtake pass-through schedule, state sanction order for top-up, ULB MoU, float corpus in place. Wizard-of-Oz pilot budget stated in rupees. |
| `12-nfr-security.md` | Payout eligibility check per fund (CSR cannot be brand-linked; tied grants only for eligible categories) enforced server-side before payout. |

---

## 7. Score

**4 / 10** for funding realism of v2 as written.

- Good: no citizen fee, no scrap commission, float gate in the launch checklist, payout channel question already open (SP-07).
- Weak: relies on two sources with no size, custodian, or legal basis; ignores the money that already exists (material and certificate value, ULB grants); P7 implies producer funding yields EPR evidence; mandate language could be read as compulsion to pay.
- With the changes above, funding realism rises to roughly 7/10. The remaining risk is political continuity of the state top-up and the outcome of the certificate floor litigation.
