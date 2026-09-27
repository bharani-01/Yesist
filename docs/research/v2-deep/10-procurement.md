# v2 Deep Research 10: Procurement path and roadmap realism

**Agent:** 10 of 36 (procurement angle)  
**Date:** 2026-09-26  
**Inputs read:** `docs/prd/00-overview.md`, `docs/prd/13-roadmap.md`, `docs/prd/14-open-questions.md`  
**Question:** How would a Madhya Pradesh department buy EcoSure (software + field operator + float) under GFR 2017, GeM, MP Store Purchase and Service Procurement Rules, QCBS, PPP and empanelment norms? Is "12-week pilot, then Phase 0 → 1 → 2" realistic once procurement is included?

Labels: **VERIFIED** = read in a primary or official-mirror document during this session. **UNVERIFIED** = secondary source, inference, or practitioner norm not confirmed from a primary text.

---

## 1. Sources

| # | Source | URL | Status |
|---|--------|-----|--------|
| S1 | GFR 2017, Rule 149 (GeM) and thresholds, amendment OM 10.07.2024 | https://www.govtstaff.com/2024/07/general-financial-rules-2017-gfr-2017-amendment-issued-vide-o-m-dated-10-07-2024.html | Secondary mirror of DoE OM |
| S2 | Compilation of GFR amendments up to 31.07.2024 (Rules 149, 161, 162, 183, 201) | https://www.potoolsblog.in/2024/09/compilation-of-amendments-in-general.html | Secondary mirror |
| S3 | GFR 2017 full text (updated 2024) | https://cdnbbsr.s3waas.gov.in/s316026d60ff9b54410b3435b403afd226/uploads/2024/08/202408121698012541.pdf | Official mirror |
| S4 | GFR compilation up to 31.07.2025 (DoE OM 19.09.2025) | https://www.govtstaff.com/2025/09/bi-annual-compilation-updation-of-amendments-in-gfr-2017-upto-31-07-2025-department-of-expenditure-o-m-dated-19-09-2025.html | Secondary mirror |
| S5 | GFR Rule 194 (single source selection of consultants) | https://smportkolkata.shipping.gov.in/smpk/wp-content/uploads/2024/06/GFR_provisions_regarding_single_source_selection-1.pdf | Official PSU mirror |
| S6 | GFR Rule 172 (advance payments: 30% private, 40% govt agency/PSU, bank guarantee) | https://nitdgp.ac.in/uploads/82cb81c7ee80d79b8ac80bda680fce40.pdf | Official institutional mirror |
| S7 | DoE Manual for Procurement of Consultancy & Other Services (June 2022) | https://www.chennaiport.gov.in/api/static/default/vigilance_content/Manual%20-%20Procurement%20of%20Consultancy%20&%20Other%20Services%20(Updated%20June,%202022).pdf | Official mirror |
| S8 | MP Store Purchase and Service Procurement Rules 2015, as amended 2022 (up to April 2023), English booklet | https://website.mpphed.in/uploads/pdfManuals/1719559948_0312fbf7a5db6ab4db82.pdf | Official MP dept mirror — **VERIFIED** (Rules 4, 6, 7, 10, 14, 15 read) |
| S9 | MP SPR 2022 amendment notice (applicability to boards, corporations) | https://teamleaseregtech.com/updates/article/21326/madhya-pradesh-stores-purchase-and-services-procurement-rules-2022/ | Secondary |
| S10 | Model RFP for Selection of Implementation Agencies (MeitY, 2018) incl. SLA, escrow, IPR guidance | https://icar.org.in/sites/default/files/inline-files/model_rfp_for_selection_of_implementation_agencies-2018.pdf | Official mirror — **VERIFIED** (sections 2.16, 2.18; PBG 10%; LD >10% termination) |
| S11 | MeitY Application Development & Re-engineering Guidelines | https://www.meity.gov.in/static/uploads/2024/02/Application_Development_Re-Engineering_Guidelines_0.pdf | Official |
| S12 | MeitY indicative SWAN RFP (BOOT/PPP, QCBS option) | https://www.meity.gov.in/static/uploads/2024/02/An7_Indicative_SWAN_Network-1.pdf | Official |
| S13 | MPSEDC RFP: MP Blockchain-as-a-Service Platform, **3rd call** (MPSEDC/Tech/2025/661) | https://mpsedc.mp.gov.in/Uploaded%20Document/Tenders/05122025112306RFP661.pdf | Official — **VERIFIED** (IPR, daily code check-in, LD 0.5%/week capped 10%) |
| S14 | MPSEDC RFP: PMU/PMC for Single Citizen Database (2023) | https://mpsedc.mp.gov.in/Uploaded%20Document/Tenders/260920230131232%20MPSEDC-SCD-2023-522.pdf | Official |
| S15 | GeM QCBS RFP (NaViGate Bharat portal) — 70:30 formula, 55-mark threshold | https://bidplus.gem.gov.in/bidding/bid/downloadBuyerDoc/9134791/17743326770518.pdf | Official (GeM) |
| S16 | QCI RFP on GeM: DAY-NULM tech platform — 6 mo dev + 6 mo warranty + 12 mo AMC, PBG 5%, QCBS 70:30, source code at go-live, IP to buyer | https://bidplus.gem.gov.in/bidding/bid/downloadBuyerDoc/6940929/17271053129378.pdf | Official (GeM) — **VERIFIED** |
| S17 | GeM "Custom Bid for Services" training deck (≥ ₹5 lakh, SoW + SLA + payment terms mandatory) | https://assets-bg.gem.gov.in/resources/upload/shared_doc/training_content/Custom-Catalog-Based-Bid-Service-1760191896.pdf | Official (GeM) |
| S18 | MeitY cloud procurement guidelines v2.2 (empanelled CSPs bought via GeM) | https://www.ambud.meity.gov.in/assets/web_assets/Includes/files/5.%20Guidelines_Procurement_Cloud%20Services_v2.2.pdf | Official |
| S19 | MeitY empanelled CSP list (17.09.2026) | https://ambud.meity.gov.in/assets/web_assets/manual/csp_empaneled_1789647065CSPs_Details_17092026.pdf | Official |
| S20 | CERT-In Guidelines on Information Security Practices for Government Entities | https://cert-in.org.in/PDF/guidelinesgovtentities.pdf | Official |
| S21 | Kerala Legislature EOI: "safe-to-host" audit before SDC hosting; first report 2 weeks after work order | https://www.niyamasabha.org/codes/15kla/tenders/Quotation%20%20Webcasting%20Security%20audit%2003.10.24.pdf | Official |
| S22 | DEA Guidelines for Formulation, Appraisal and Approval of PPP projects (central; ₹100 cr / ₹250 cr bands) | http://dea.gov.in/files/guidelines_documents/Document1_Guidelines_formulation_appraisal_approval_PPP_Projects.pdf | Official |
| S23 | ADB PPP Monitor — India national landscape (MP: PPP Guidelines 2009, empowered committee workflow) | https://www.pppmonitor.adb.org/country/india/national-ppp-landscape | Secondary (multilateral) |
| S24 | MP PHED doc: MP project approval flow (authority → DIF → SLEC → Cabinet) | https://www.phed.mp.gov.in/uploads/pdfgeneral/1722254055_8150deb7b662e39375b4.pdf | Official |
| S25 | CAG Report No. 4 of 2023 — eProcurement in Tamil Nadu (bid-opening-to-award 9 to 1,552 days) | https://cag.gov.in/webroot/uploads/download_audit_report/2023/Report-No-4-of-2023-eProcurement-English-0668269bb4dda56.82968764.pdf | Official |
| S26 | CAG — Delhi e-bus procurement finalised only on 3rd tender (~18 months) | https://cag.gov.in/uploads/download_audit_report/2022/8-Chapter-4-067e10dd07aba68.45465076.pdf | Official |
| S27 | South Delhi MC tender: e-waste collection incl. citizen/RWA online pickups, bidder pays stakeholders directly, SLA/LD | https://mcdonline.nic.in/portal/downloadFile/nit557_21030303400737.pdf | Official |
| S28 | MPITFED empanelment EOI (includes "E-waste Management Agency" and "SMS & WhatsApp" categories) | https://mpitfed.org/empanelment/ | Official (state cooperative federation) |
| S29 | LIC Indore GeM bid GEM/2026/B/8017090 (e-waste degaussing & management services, 10-day bid window) | https://www.tendershark.com/details/madhya-pradesh-tender/life-insurance-corporation-of-india/0eee88b9-3c65-4fc7-895c-7a002ef85a75 | Aggregator — UNVERIFIED |
| S30 | Indore MC tender example on mptenders (services, 120-day bid validity, ~4-week bid window) | https://mptenders.gov.in/nicgep/app?component=%24DirectLink&page=FrontEndLatestActiveTenders&service=direct&sp=SOiTiY72RQh3b%2BQzA%2Bk%2FYNQ%3D%3D | Official |

---

## 2. Findings

### F1. GFR 2017 does not bind the state; the MP Store Purchase and Service Procurement Rules do

- GFR 2017 applies to central ministries, departments, and (by default) central autonomous bodies (S4, Rule 1). A state SPCB and state IT department are governed by state rules.
- The MP Store Purchase and Service Procurement Rules 2015 (as amended 2022, up to April 2023) apply to all MP departments, panchayats and urban bodies, undertakings with > 50% state shareholding, and **corporations and boards** (S8, S9). The MP Pollution Control Board as a state statutory board is therefore very likely covered (**UNVERIFIED** for MPPCB specifically; the board may also have its own delegation of financial powers).
- GFR remains relevant as the benchmark (MP rules mirror it) and becomes binding if central money (for example a MoEFCC/CPCB grant) flows with GFR conditions attached (**UNVERIFIED**, depends on sanction letter).

### F2. GeM is mandatory centrally, optional-but-bound in MP; custom bids make GeM usable for EcoSure

- Centrally, Rule 149 makes GeM **mandatory** for goods/services available on GeM: direct purchase up to ₹50,000; L1 of three OEMs up to ₹10 lakh; above ₹10 lakh mandatory GeM bid or reverse auction (S1, S2).
- In MP, Rule 7 says the buyer "may" purchase from GeM, with rate reasonableness certified by the indentor; tenders above ₹2.5 lakh can run on GeM **or** mptenders.gov.in, and MP rules apply even on GeM (S8 Rule 4, 7, 10.1.1). **VERIFIED.**
- Neither "e-waste custody platform development" nor "e-waste field logistics with settlement float" is a standard GeM category. GeM's **Custom Bid for Services** exists for this: minimum ₹5 lakh, mandatory Scope of Work, SLA and payment-terms uploads, and state buyers are eligible (S17). Software development QCBS bids are routinely run on GeM (S15, S16).
- Cloud: MeitY-empanelled CSPs (STQC-audited) are bought through GeM marketplace or GeM bid/RA (S18, S19). This fits PRD "government-empanelled cloud" (SP-06).

### F3. The fastest lawful route for the software is nomination to MPSEDC, not an open RFP

- MP Rule 6(ii) lists **MPSEDC** for "work related to software development … and training related services" and **CEDMAP** for "training related services and outsourcing services". Purchasing officers "may place orders directly to these institutions … without inviting tender" (S8 Rule 6). **VERIFIED.**
- In practice MPSEDC then runs its own RFP to select an implementation agency (S13, S14), so nomination moves the procurement burden to MPSEDC but does not remove it. MPSEDC also maintains an IT/ITES empanelment (search-result evidence; **UNVERIFIED** in detail), which could shorten mini-competition to weeks.
- Centrally the analogue is GFR Rule 172's 40% advance ceiling for government agencies/PSUs and Rule 194 single-source only in exceptional cases with recorded justification (S5, S6).
- MPSEDC's own RFPs show retender risk: the Blockchain platform RFP is on its **3rd call** (S13).

### F4. QCBS 70:30 is the norm for bespoke e-governance software; the field operator is a different procurement

- Software: QCBS with technical weight 70, financial 30, minimum technical threshold (55–70 marks), TS = (T/Tmax) × 70, FS = (Pmin/P) × 30 (S15, S16, S12). The DoE consultancy manual caps technical weight at 80 and says LCS is the default unless QCBS is justified (S7, secondary summary).
- Typical structure: 6 months development, 6 months warranty, 12–24 months O&M (S16); MPSEDC Blockchain RFP: ~12 months build incl. go-live, then 24 months O&M (S13).
- Field operator (collection logistics, weighing, hub handling, settlement float) is a **non-consultancy service**. Centrally Rule 201 allows limited tender up to ₹50 lakh; above that, advertised tender on CPPP/GeM (S2). In MP, **anything above ₹2.5 lakh needs open tender**, minimum 21 days bid period (14 days short tender with recorded reasons), advertisement in one national and two state newspapers (S8 Rule 10.1). **VERIFIED.** A 12-week pilot operator with vehicles, staff and UPI incentives will exceed ₹2.5 lakh.
- Precedent for operator design: South Delhi MC's e-waste tender made the selected bidder collect from offices and from citizens/RWAs via an online request system, **pay stakeholders directly** at quoted item rates, and face SLA/LD for delayed pickup or payment (S27). This is close to the EcoSure operator model and avoids government-held float.

### F5. Government-funded "settlement float" held by a private operator conflicts with advance-payment norms

- GFR Rule 172: payments normally after service; advances to private firms capped at 30% of contract value with bank guarantee; 40% to govt agencies/PSUs (S6). MP rules require performance guarantee ~3% and follow similar payment-after-delivery logic (S8 Rule 15); an explicit MP advance-payment clause was not located (**UNVERIFIED**).
- PRD 00-overview section 8 requires "settlement float funded for at least 8 weeks" and SP-05 says the operator "runs … settlement float". If the float is scheme money transferred upfront to a private operator, it is an advance that needs FA concurrence, BG cover and a cap. Options: (a) department-owned escrow / trust-and-retention account with operator as payment agent; (b) weekly reimbursement against platform settlement records (department pays after hub receipt); (c) producer take-back pool held outside the treasury (PRO, recycler, or Section 8 entity) so it is not public money; (d) SDMC-style model where the operator/recycler pays from its own working capital and recovers from scrap value.
- Citizen UPI incentives from scheme funds will need a DBT/IFMIS-compatible route (SP-07 already flags PFMS); this is a sanction and treasury question, not just an integration.

### F6. PPP is the wrong frame; DEA PPPAC is irrelevant at this scale

- DEA guidelines cover **central-sector** PPPs, with bands at ₹100 cr, ₹250 cr and above (S22). MP runs its own PPP Guidelines 2009 with approval via Department of Investment and Finance → State Level Empowered Committee → Cabinet (S23, S24). That route adds months and requires a DPR with IRR/NPV.
- EcoSure has no user-fee concession or private capex to recover. It is a **service contract with performance payments** (operator) plus a **software build-and-O&M contract** (SI). Calling it "PPP" in sponsor documents would invite the SLEC route unnecessarily (inference).

### F7. IP ownership and source code: department ownership is standard; escrow is secondary if code lives in a department repo

- MeitY model RFP: IPR for bespoke development "must lie with the Purchaser" and must follow the 2015 Policy on Collaborative Application Development by Opening the Source Code of Government Applications; OSS must be considered and exclusion justified (S10 §2.18, OSS policy text). **VERIFIED.**
- Escrow is "optional", mainly for proprietary/licensed code, and adds cost (annual escrow agent fee) (S10 §2.16). **VERIFIED.**
- Current MP practice goes further: MPSEDC requires the IA to check in all code **daily** to a MPSEDC-provided repository with test scripts, and hand over code, docs and scripts at exit; pre-existing bidder IP stays with bidder, customised components go to MPSEDC (S13). QCI links final go-live payment to source code + build document submission (S16). **VERIFIED.**
- Implication: the PRD's "department owns platform and data" is conventional and procurable; the PRD should specify department-owned repo from day one and treat escrow only for any proprietary third-party component.

### F8. SLA and penalty patterns are well established

- Liquidated damages: 0.5% of delayed deliverable value per week, **capped at 10% of total contract value** (MPSEDC, S13); QCI: 0.5%/week for max 10 weeks, then termination and PBG forfeiture (S16). Model RFP: termination right if LD deductions exceed 10% of contract price (S10). **VERIFIED.**
- Performance guarantee: MP norm ~3% (S8 Rule 15); central model RFP 10%; QCI 5% (S10, S16). EMD in MP up to 3% with MP MSEs/startups exempt (S8 Rule 14).
- Operational SLA penalties are usually graded bands (e.g., data accuracy < 98% → 10% deduction, < 95% → 25%) against periodic payments (S10). A quarterly SLA-deduction cap of ~10–20% of the quarterly fee is common practice (**UNVERIFIED**).
- OQ-75 already names the right operator SLA metrics (payment time, dispute resolution time, pickup completion). They need bands, measurement source (the platform itself, which creates a conflict if the operator also operates the platform), and caps.

### F9. Realistic timelines (approval → contract → go-live)

| Step | Typical duration | Evidence |
|------|------------------|----------|
| Concept note, administrative approval, financial sanction / budget head (new scheme may need finance dept + cabinet) | 2–6 months | **UNVERIFIED** practitioner norm; S24 shows multi-level approvals for large projects |
| RFP drafting (SoW, SLA, evaluation criteria), finance/legal vetting | 1–2 months | **UNVERIFIED** |
| Bid period incl. pre-bid and corrigenda | 3–6 weeks (MP minimum 21 days; S30 shows ~4 weeks) | S8 Rule 10.1.3, S30 |
| Technical evaluation, presentations, financial opening (QCBS) | 4–10 weeks | **UNVERIFIED**; CAG TN shows 9 to 1,552 days bid-opening-to-award (S25) |
| LoA, PBG (15–21 days), contract signing | 3–4 weeks | S10, S16 |
| Retender if < 3 bids / non-responsive | +2–6 months | S13 (3rd call), S26 (3rd tender, ~18 months) |
| CERT-In safe-to-host audit + retests | 3–6 weeks | S21 (2 weeks first report), S20 |
| **Competitive QCBS, approval to signed SI contract** | **~6–12 months** | Synthesis |
| **MPSEDC nomination + MPSEDC empanelled mini-competition** | **~2–5 months** | Synthesis, **UNVERIFIED** |
| **GeM custom bid for the pilot operator** | **~6–10 weeks** after sanction | S17, S29 (10-day window seen), S8 |

---

## 3. Fit with PRD v2

| PRD element | Procurement reality | Fit |
|-------------|---------------------|-----|
| Pilot 12 weeks "before writing software" (13-roadmap) | Pilot needs a contracted operator, UPI incentive funds, and float. In MP any service > ₹2.5 lakh needs open tender (21+ days) unless nominated (CEDMAP/MPSEDC) or funded by non-public money. No procurement step appears before "week 0". | Weak |
| "No phase starts until previous gate passes" | If SI procurement starts only after the week-12 gate, Phase 0 cannot start for another 6–12 months. The rule, taken literally, creates a dead gap in which the manual pilot must keep running without a funded mandate. | Weak |
| Phase 0 6–8 weeks | Plausible as build time, but excludes cloud/SDC provisioning via GeM, repo setup under department account, and CERT-In audit window. | Partial |
| Phase 1 12–16 weeks incl. offline, WhatsApp, UPI payouts | Build time is plausible; WhatsApp BSP and payout bank/PFMS route are separate procurements or MoUs. CERT-In safe-to-host needed before go-live (12-nfr-security item 8 already says this). | Partial |
| SP-05 "contracted field operator under SLA" | Correct model; mirrors SDMC precedent. But float ownership and advance rules unaddressed. | Partial |
| Funding "scheme budget plus producer take-back pool" | Producer pool held outside treasury is the most procurement-light float source; PRD doesn't say who holds it. | Partial |
| "Department owns platform and data" | Matches MeitY model RFP and MPSEDC IPR clauses. Needs repo, OSS, exit clauses written down. | Good |
| OQ-75 operator SLA metrics | Right metrics; missing bands, caps, LD, PBG, measurement independence. | Partial |
| Success metrics / kill criteria | Pilot gates are strong inputs to a gate-conditional contract (right to not award / terminate for convenience). | Good |

**Overall:** the product sequencing is sound, but the roadmap is written as if engineering time were the critical path. In an MP state programme the critical path is sanction + two procurements (SI and operator) + treasury route for incentives/float. Realistic calendar from sponsor approval to Phase 1 live in the corridor: **~14–20 months** with competitive QCBS, **~9–12 months** via MPSEDC nomination and a parallel procurement track, versus the ~11–14 months implied by summing pilot + P0 + P1 durations with zero procurement gaps.

---

## 4. Gaps

1. **No procurement track anywhere in the PRD.** Nothing in 13-roadmap or 14-open-questions names the procuring entity, method, portal, or timeline.
2. **Pilot operator contracting is unaddressed.** Who is the operator in weeks 1–12, under what instrument, paid how?
3. **Float legality.** "Operator runs settlement float" conflicts with advance-payment norms if the float is public money.
4. **Citizen UPI incentive route** needs sanction + DBT/treasury route; SP-07 exists but is not marked as a pilot blocker.
5. **Conflict of interest**: if the field operator and the software SI are the same firm, the SLA data source (the platform) is controlled by the party being measured. PRD is silent.
6. **Gate vs procurement sequencing**: no gate-conditional award or break clause to let procurement run in parallel with the pilot.
7. **IP/exit**: no statement of department-owned repo, OSS licence posture, exit management, knowledge transfer, or data handback.
8. **Contract terms**: no PBG, LD, SLA bands/caps, O&M duration, or change-control threshold.
9. **Other buys not listed**: cloud/SDC (GeM), WhatsApp BSP, SMS gateway, CERT-In auditor, payout bank, possibly PMU. Each is a small procurement with its own lead time.
10. **Mandate instruments**: SP-02 "SPCB direction or MoU" for recyclers/producers is separate from procurement but must be signed before pilot week 4 gate (signed offtake).

---

## 5. Recommended PRD changes

| File | Change |
|------|--------|
| `13-roadmap.md` | Add a **"Stage −1: Sanction and procurement" (8–16 weeks)** before the pilot: administrative approval + financial sanction; pilot operator engaged (GeM custom bid, or CEDMAP/MPSEDC nomination under MP SPR Rule 6, or producer/recycler-funded MoU); treasury/DBT route for incentives; float instrument signed. Pilot week 0 cannot start until these exist. |
| `13-roadmap.md` | Add a **parallel SI procurement track**: RFP drafting starts at pilot week 0, bid published by week 4–6, award no earlier than the week-12 gate, with an explicit **gate-conditional award** (right to cancel before award / terminate for convenience after contract if gate fails). Replace "no phase starts until previous stage gate passes" with "no phase **build** starts until the gate passes; procurement may run in parallel". |
| `13-roadmap.md` | Add realistic calendar table: competitive QCBS 6–12 months; MPSEDC route 2–5 months; CERT-In safe-to-host 3–6 weeks before Phase 1 go-live; state bridge plan if the SI is not on board when the pilot ends (continue manual ops under the pilot operator contract with an extension option). |
| `14-open-questions.md` | Add sponsor decisions **SP-11 Procuring entity and route** (default: department nominates MPSEDC for software under MP SPR Rule 6; field operator via open tender on GeM custom bid), **SP-12 Float instrument** (default: department-owned escrow/TRA with operator as paying agent, weekly reimbursement against platform records; advance, if any, ≤ 30% with BG), **SP-13 Pilot funding source** (default: producer take-back pool held outside treasury for pilot incentives). Mark SP-07 as "needed before pilot". |
| `14-open-questions.md` | Expand **OQ-75** into a contract term sheet: SLA bands with graded deductions, quarterly deduction cap (~10–20%, to confirm), LD 0.5%/week capped at 10% of contract value, PBG 3% (MP norm) to 10%, termination if LD > 10%, SLA measured from department-owned platform logs with monthly independent reconciliation; **operator and software SI must be different entities** (or SLA audited by PMU). |
| `00-overview.md` section 1 | Change "Operations" assumption to name **two contracts** (software SI with build + 12–24 months O&M; field operator service contract with SLA) and state explicitly: "not a PPP concession; no user fee; not routed through MP PPP Guidelines 2009". Add procurement rules row: "MP Store Purchase and Service Procurement Rules 2015 (amended 2022); GeM where category exists; GFR 2017 where central funds apply." |
| `00-overview.md` section 8 | Change "Settlement float funded for at least 8 weeks" to "Settlement float funded for at least 8 weeks **through an instrument approved by the finance department (escrow/TRA or reimbursement), not an unsecured advance to the operator**". |
| `12-nfr-security.md` (and 13-roadmap Phase 0) | Add IP/exit requirements: all bespoke code and data owned by the department; code committed daily to a department-owned repository from Phase 0; OSS-first per 2015 GoI policy; escrow only for proprietary third-party components; exit management plan and handover at every release; CERT-In safe-to-host re-audit annually and after major server-side change. |
| `11-integrations.md` | List procurement vehicle per external service: cloud via GeM (MeitY-empanelled CSP) or SDC allocation; WhatsApp BSP and SMS via GeM or MPSEDC/MPITFED empanelled providers; payout via PSB/PFMS MoU. |

---

## 6. Score

**4 / 10** for procurement realism of the v2 roadmap.

Why not lower: the operating model (department-owned platform, contracted operator under SLA, empanelled cloud, CERT-In audit, stage gates) is the conventional, procurable shape, and MP SPR Rule 6 offers a genuine fast lane via MPSEDC. Why not higher: the roadmap has no sanction or procurement stage, assumes a pilot operator and incentive money exist on day one, makes a float arrangement that is hard to fund lawfully with public money, and its strict gate sequencing would insert a 6–12 month procurement gap between pilot and Phase 0. Adding a Stage −1, a parallel gate-conditional SI procurement, and a float instrument would raise this to about 7/10.
