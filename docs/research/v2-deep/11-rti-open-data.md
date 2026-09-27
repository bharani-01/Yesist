# 11 — RTI, Open Data, and Public Disclosure Design (PRD v2 deep review)

**Agent:** 11 of 36 (research swarm)
**Angle:** RTI Act 2005 obligations (Sections 2(f), 4, 8, 11), the DPDP Act amendment to RTI Section 8(1)(j), NDSAP / data.gov.in open-data norms, CPCB/SPCB disclosure practice for e-waste statistics, whether contracted-operator records are "held" by the public authority, and a recommended disclosure design.
**PRD files reviewed:** `docs/prd/09-government.md` (G1–G9), `docs/prd/12-nfr-security.md` (§5 Privacy, §6 Transparency and RTI).
**Research date:** 2026-09-26/27. PRD files were not edited.
**Convention:** Claims supported by a primary or reputable secondary source carry the URL. Claims that are my inference, or that I could not confirm from a primary source, are marked **UNVERIFIED**.

---

## 1. Sources

### Primary law and government instruments
| # | Source | URL |
|---|--------|-----|
| S1 | RTI Act 2005, full text (CIC) | https://cic.gov.in/sites/default/files/RTI-Act_English.pdf |
| S2 | RTI Act Section 2 (definitions incl. 2(f), 2(h), 2(j)) | https://indiankanoon.org/doc/277989/ |
| S3 | RTI Act Section 8 (exemptions) | https://indiacode.ecourtsindia.com/rti-act/section/8/ |
| S4 | RTI Act Section 11 (third-party information) | https://indiacode.ecourtsindia.com/rti-act/section/11/ |
| S5 | DPDP Act 2023, Gazette text (Section 44(3) substitutes RTI 8(1)(j)) | https://egazette.gov.in/WriteReadData/2023/248045.pdf |
| S6 | DPDP Act Section 44 (India Code mirror) | https://indiacode.ecourtsindia.com/digital-personal-data-protection-act-2023/section/44/ |
| S7 | DPDP commencement notification G.S.R. 843(E), 13 Nov 2025 | https://gazettetracker.com/g/CG-DL-E-14112025-267647 ; https://www.banklaw.in/manage/images/services/1757404942DPDPActEnforcementNotification-13.11.2025.pdf |
| S8 | DPDP Rules 2025 (G.S.R. 846(E)), Rule 1 commencement | https://www.dpdpa.com/DPDP_Rules_2025_English_only.pdf ; https://dpdpa.co.in/dpdp-rules/rule-1-dpdp-2025 |
| S9 | PIB clarification: Section 8(2) public-interest override still available | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2158506&lang=2&reg=48 |
| S10 | DoPT OM No.1/6/2011-IR dated 15 Apr 2013 — Section 4 suo motu disclosure guidelines (incl. §1.2 PPP disclosure, §4.4 annual third-party transparency audit) | https://cic.gov.in/sites/default/files/DOPT%20OM15.04.2013.pdf |
| S11 | DoPT reiteration (OM 07 Nov 2019) — transparency audits by government training institutes | https://www.iimc.gov.in/files/inline-documents/Guidelines_regarding_Suo_Motu_Disclosure.pdf |
| S12 | NDSAP 2012 | https://geoportal.mp.gov.in/geoportal/Content/Policies/NDSAP_2012.pdf |
| S13 | NDSAP Implementation Guidelines v2.4 (negative list, open list, high-value datasets, data controller) | https://data.gov.in/sites/default/files/NDSAP%20Implementation%20Guidelines%202.4.pdf |
| S14 | Government Open Data License – India (GODL), Gazette 13 Feb 2017 | https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf |
| S15 | E-Waste (Management) Rules 2022 — Rule 18 (CPCB annual report), Schedule of authority duties (SPCB: inventorisation, EPR monitoring, random inspection, capacity-utilisation monitoring) | https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf |
| S16 | CPCB FAQ, E-Waste Rules 2022 | https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf |
| S17 | MoSPI Data Dissemination Guidelines (Feb 2019) — suppression/anonymisation of establishment identifiers | https://mospi.gov.in/sites/default/files/data_disemination/Data_Dissemination_Guidelines%20_feb19.pdf |

### Case law, commission decisions, litigation tracking
| # | Source | URL |
|---|--------|-----|
| S18 | CIC, Navroz Mody v Mumbai Port Trust (2009) — PPP concession agreements disclosable; sever under Section 10 | https://indiankanoon.org/doc/1040027/ |
| S19 | CIC (Shailesh Gandhi, 2011) — public authority must access contractor/sub-contractor PF compliance under 2(f) | https://www.moneylife.in/article/rti-judgement-series-public-authority-must-access-information-about-pf-facilities-of-subcontractors/33357.html |
| S20 | Analysis of SC Constitution Bench (CPIO SC v Subhash Chandra Agarwal) on 2(f) "can be accessed" | https://www.moneylife.in/article/all-private-organisations-come-under-rti-analysis-of-the-sc-order-bringing-cji-under-the-rti-act/58700.html |
| S21 | ISTM RTI portal — no duty to create/collate non-held information; analysed data/statistics accessible | https://www.istm.gov.in/rti_portal/cms/69 |
| S22 | Venkatesh Nayak v Union of India, writ petition text (challenge to Section 44(3)) | https://www.scobserver.in/wp-content/uploads/2026/02/Venkatesh-Nayak-v-Union-of-India-Writ-Petition.pdf |
| S23 | LiveLaw — SC refers challenge to larger bench, no stay (16 Feb 2026) | https://www.livelaw.in/top-stories/supreme-court-refers-pleas-challenging-dpdp-act-amendment-to-rti-act-to-larger-bench-523266 |
| S24 | Economic Times — same | https://economictimes.indiatimes.com/news/india/supreme-court-refers-challenges-to-dpdp-act-to-5-judge-bench/articleshow/128435509.cms |
| S25 | Supreme Court Observer — hearing 7 Aug 2026 | https://www.scobserver.in/reports/challenge-to-dpdp-act-day-2-law-may-impede-investigative-journalism-petitioners-argue/ |
| S26 | The Hindu — 7 Aug 2026 hearing | https://www.thehindu.com/news/national/sc-to-examine-impact-of-dpdp-law-on-rti-investigative-journalism/article71317413.ece |
| S27 | DPDP case tracker (status as at 31 Jul 2026: larger bench not constituted) | https://www.dpdpindia.in/case-tracker.html |
| S28 | dpdprules.org status summary (no provision stayed as of 23 Aug 2026) | https://dpdprules.org/blog/dpdp-act-supreme-court-challenge |

### Statistical disclosure control references (method, not Indian law)
| # | Source | URL |
|---|--------|-----|
| S29 | Australian Bureau of Statistics — treating aggregate data (frequency and dominance rules) | https://www.abs.gov.au/statistics/understanding-statistics/data-confidentiality-guide/treating-aggregate-data |
| S30 | UK Government Analysis Function — SDC for administrative-data tables | https://analysisfunction.civilservice.gov.uk/policy-store/sdc-for-tables-produced-from-administrative-data/ |

---

## 2. Findings

### F1. The operator does not and cannot "handle" RTI requests — the PIO of the public authority decides
- RTI duties sit with the **public authority** through its Public Information Officer (PIO) and First Appellate Authority. Sections 5–7 and 11 place the decision, the timelines, and third-party notices on the PIO (S1, S4).
- `09-government.md` G9 says RTI requests are "logged with legal basis and **handled by the operator**". That is wrong in law if "handled" means deciding what to release. The operator can only **retrieve, compile, and pre-redact** records for the PIO. The PIO decides.
- Timelines the system must support: 30 days by default; 48 hours where life or liberty is involved (Section 7(1)); and 40 days where the Section 11 third-party procedure applies (5-day notice → 10-day representation → decision) (S1, S4). The operator's retrieval SLA therefore has to fit well inside the PIO's window. A 5–7 working-day retrieval SLA is a reasonable design target (**UNVERIFIED** — this is my design recommendation, not a statutory figure).

### F2. Records on the contracted operator's system are RTI "information" of the sponsor
- Section 2(f) covers "information relating to any private body which can be accessed by a public authority under any other law", and Section 2(j) covers information "held by or under the control of" a public authority (S2).
- The CIC has directed public authorities to obtain contractor records they are entitled to access (S19). The Subhash Chandra Agarwal Constitution Bench reading confirms that "can be accessed" means the authority is entitled to ask for it (S20).
- In EcoSure the sponsoring department is the DPDP **data fiduciary** and the operator is a **processor under contract** (`12-nfr-security.md` §5), and hosting is in the state data centre or on government-empanelled cloud (§1). On those facts the platform database is almost certainly "held by or under the control of" the sponsor, independent of 2(f) (**UNVERIFIED** as a legal conclusion — no case found that is specific to SaaS operators, but the fiduciary/processor structure and state hosting make "control" hard to deny).
- Consequence: the operator cannot refuse a PIO's request on commercial grounds. The contract must oblige the operator to produce records on the PIO's instruction.
- Separate risk: if the operator is "substantially financed" by government funds, it could itself be a public authority under Section 2(h)(d)(ii) (S2). The Supreme Court's Thalappalam (2013) test for "substantial" financing would apply (**UNVERIFIED** — case not fetched in this session). The PRD does not address this.

### F3. Since 13 Nov 2025, RTI Section 8(1)(j) is a flat exemption for "personal information". It is under challenge but not stayed
- DPDP Act Section 44(3) replaced Section 8(1)(j) with "information which relates to personal information". This removed the public-activity test, the unwarranted-invasion test, the larger-public-interest proviso, and the proviso that information which cannot be denied to Parliament cannot be denied to a citizen (S5, S6, S22).
- Section 44(3) came into force on **13 Nov 2025** by G.S.R. 843(E). Most of the DPDP Act's data-fiduciary obligations start on **13 May 2027** (S7, S8).
- The government's position is that Section 8(2) still allows disclosure where public interest outweighs harm (S9).
- Litigation: on 16 Feb 2026 the Supreme Court issued notice, **refused an interim stay**, and referred the matter to a larger bench (S23, S24). On 7 Aug 2026 it gave the Union two weeks to reply (S25, S26). As at 31 Jul 2026 the larger bench had not been constituted (S27), and no provision had been stayed as of 23 Aug 2026 (S28). I found no later order up to 2026-09-27 (**UNVERIFIED** that none exists).
- Implications for EcoSure:
  - **Citizen data** (name, phone, address, UPI ID, pickup history, incentive payouts) is exempt from RTI disclosure today. The disclosure policy should treat it as never releasable at record level, with an 8(2) public-interest release requiring a recorded decision by a named competent authority.
  - **Officials**: SPCB officers' names on inspection notes and approvals are "personal information" under a literal reading. Before the amendment they were routinely disclosable as public activity. The policy should still publish the **designation and office** that took a decision, so accountability does not depend on the outcome of the litigation.
  - **Sole-proprietor collection shops (kabadiwalas)**: the proprietor is a natural person, so the shop's "public name", phone number, and location may be personal information. Companies and LLPs are not data principals under DPDP. Most recyclers and hubs are companies; many shops are not (**UNVERIFIED** as to the share, but consistent with `tier2-tier3-field-issues.md`). G3's "organization's public name" on flags, and any public list of shops, needs an entity-type rule.
  - The policy must be **switchable**. If the Supreme Court restores a public-interest test, the redaction rules have to change without a code release.

### F4. Section 8(1)(d) and Section 11 cover operator and participant commercial data, but PPP guidance favours disclosure
- Section 8(1)(d) exempts commercial confidence, trade secrets, and IP only where disclosure would harm a third party's competitive position, subject to a larger-public-interest override (S3).
- Section 11 requires a written notice within 5 days to a third party whose information "has been treated as confidential by that third party", 10 days for their representation, and a decision within 40 days (S4).
- DoPT's Section 4 guidelines say that where public services are delivered through a PPP, "all information relating to the PPPs must be disclosed in the public domain": concession agreements, O&M manuals, fees and revenue collected, outputs and outcomes, how the private party was selected, and periodic payments with their purpose. Only material falling under 8(1)(d)/8(1)(j) is held back (S10 §1.2). Those guidelines are addressed to central public authorities; states generally mirror them (**UNVERIFIED** per state).
- The CIC has held that PPP concession agreements are disclosable, with Section 10 severance of genuinely sensitive clauses (S18).
- Implications for EcoSure:
  - The **operator contract, service levels, performance against service levels, payments to the operator, and the selection process** should be published proactively.
  - **Recycler and hub prices, per-lot settlement amounts, recovery yields, and bank details** are plausible 8(1)(d) material. They need a "treated as confidential" marker captured at onboarding, so the PIO knows when Section 11 notice is required.
  - **Attestation weights by recycler and month** are compliance outputs, not trade secrets. They should default to disclosable (**UNVERIFIED** — a policy position, not a ruling).

### F5. Section 4(1)(b) creates proactive duties that the PRD does not map
Relevant Section 4(1)(b) items (S1), with the 2013 guidelines on digital publication, updating, and annual third-party transparency audits (S10, S11):
- (xii) **Manner of execution of subsidy programmes, including amounts allocated and details of beneficiaries.** Citizen UPI incentives are, in substance, a state subsidy. The amendment now bars beneficiary names. Publishing aggregates (amount allocated and disbursed, and number of beneficiaries by district and month) satisfies the purpose of this item without disclosing personal data (**UNVERIFIED** interpretation).
- (xiii) **Particulars of recipients of concessions, permits or authorisations.** A public register of platform-approved organizations — legal name, type, district, statutory registration numbers, platform status — fits here, with the sole-proprietor caveat in F3.
- (iii) Decision-making procedure, (iv) norms, and (vi) categories of documents held. The disclosure policy, flag definitions, data dictionary, and the "formal network only" methodology should be published.
- Section 4(1)(d) requires giving reasons for administrative or quasi-judicial decisions to affected persons. Platform approval, suspension, and a "disputed" registration mark (G4) need a recorded reason that is shown to the affected organization.
- `12-nfr-security.md` §6 mentions only "published aggregates" and a "documented disclosure policy". It does not say that proactive disclosure is a statutory duty or how often it is refreshed.

### F6. Open-data norms: NDSAP, GODL, and data.gov.in
- NDSAP (2012) requires each ministry or department to publish a **negative list** (non-shareable data: confidential, security, personal information; RTI Sections 8–9 are consulted) and treats everything else as the **open list**, prioritised into high-value datasets and published on data.gov.in in machine-readable form, with metadata and regular (quarterly) updates. A Data Controller and an NDSAP cell run the programme (S12, S13).
- NDSAP formally binds Government of India agencies. States either adopt it or run their own state data policies (**UNVERIFIED** which policy applies to the target state; this must be checked per corridor).
- GODL-India (2017) is the standard open licence. It is worldwide and royalty-free, requires an attribution statement, and excludes personal and sensitive data (S14).
- EcoSure implication: the SPCB (or the sponsoring department) should declare an EcoSure negative list and open list, and publish monthly formal-network aggregates as CSV and JSON under GODL with a DOI or URL, a version, and the coverage label.

### F7. CPCB/SPCB public disclosure practice today is thin, which is the opening for EcoSure
- Under the E-Waste Rules 2022, CPCB runs the centralised EPR portal and is responsible for "documentation, compilation of data on e-waste and uploading on websites of CPCB", and submits an annual report to MoEFCC within one month of the end of the financial year (Rule 18). SPCBs handle inventorisation, EPR monitoring as directed by CPCB, random inspections, and monitoring of recycling-capacity utilisation (S15).
- In practice, CPCB annual reports appear with long delays: the 2022–23 report was released on 27/09/2024 (https://cpcb.nic.in/annual-report.php). Some SPCBs publish standalone e-waste annual reports, for example Goa's 2022–23 report (https://goaspcb.gov.in/annual-reports/). SPCBs submit quarterly action-plan progress reports to CPCB (https://worldtradescanner.com/Parliamentary%20Question-Electronic%20Waste%20Management.htm — secondary reproduction of a parliamentary answer; **UNVERIFIED** against sansad.in).
- I found no SPCB that publishes district-by-month e-waste flow statistics as open data (**UNVERIFIED** — absence of evidence from a limited search).
- EcoSure implication: a monthly, labelled, machine-readable formal-network dataset would exceed current practice. The value to the SPCB is feeding its inventorisation duty and its quarterly reports to CPCB. The risk is that the figures are read as state totals, which is why the G2 coverage label is essential and should be embedded in the file metadata, not just the chart.

### F8. Aggregates can re-identify organizations and citizens without statistical disclosure control
- District-by-month-by-category cells with only one or two contributing organizations reveal that organization's volumes, which is potentially 8(1)(d) material. Ward-level citizen incentive counts can reveal individuals.
- Standard practice is a frequency (threshold) rule, commonly 3, 5 or 10 contributors, plus a dominance (n,k) rule for magnitude tables, and secondary suppression so suppressed cells cannot be recovered from totals (S29, S30). MoSPI likewise suppresses establishment identifiers in released unit-level data (S17).
- G2 and G6 export tonnes by corridor, district, and month, and G2 also exports organization counts. Neither applies suppression rules.

### F9. Inspection notes and flags are RTI records, and exemptions are conditional
- G5 inspection notes are hidden from the organization "unless the SPCB chooses to share". Under RTI they are still records. Section 8(1)(h) (information that would impede investigation or prosecution) can protect them only while enforcement is live. After closure, they are likely disclosable with personal names redacted (**UNVERIFIED** — general CIC practice, not a specific ruling fetched).
- Automated flags (G3), such as "weight anomaly" and "duplicate hash", are system inferences, not findings. Releasing them with organization names risks reputational harm. The disclosure policy should mark flag status (open, under review, confirmed, dismissed) and release only confirmed or closed outcomes, with the organization's response attached.

### F10. Retention and anonymisation interact with RTI
- RTI applies only to information that exists. The public authority has no duty to create or collate information it does not hold (S21), but it cannot destroy records while a request or appeal is pending (**UNVERIFIED** as a specific statutory rule; state public records rules and CIC practice generally require holds).
- `12-nfr-security.md` §5 anonymises personal fields after 3 years and keeps custody records for 7 years. That is compatible with RTI, but there must be a **legal hold** that pauses anonymisation or deletion for records under an open RTI request, appeal, or investigation.

---

## 3. v2 fit assessment

| PRD element | Fit | Comment |
|---|---|---|
| G2 coverage label "Formal EcoSure network only" | Good | Strong transparency hygiene. Extend it into file metadata and the open-data licence notice. |
| G2 self-reported vs second-party-weighed share | Good | Useful data-quality disclosure. Publish it with the aggregates. |
| G3 flags with "organization's public name" | Partial | No entity-type rule for sole proprietors (personal information) and no flag-status gate. |
| G4 verified/disputed registration mark | Partial | No reasons requirement (Section 4(1)(d)) and no right of reply. |
| G5 inspection notes, append-only | Partial | Good integrity. No RTI exemption tagging (8(1)(h)) and no review-on-closure. |
| G6 offline pack, bilingual, stamped cut-off | Good | Add suppression and a "not for publication" marking for any non-aggregate content. |
| G7 public verification, no personal data or prices | Good | Consistent with 8(1)(j) and 8(1)(d). |
| G9 lawful requests "handled by the operator" | **Poor** | The decision must sit with the PIO. No timelines, no Section 11 workflow, no appeal record, no legal hold. |
| NFR §5 fiduciary/processor split | Good | This is what makes operator records "held" by the sponsor. Use it. |
| NFR §6 "documented disclosure policy" | Weak | Referenced, not specified. No Section 4 mapping, no open-data plan, no SDC rules, no DPDP-amendment switch. |
| NFR §7 audit log of SPCB/operator access to personal data | Good | Extend to RTI retrievals and releases. |

**Overall:** v2 has good instincts (coverage labels, no personal data on public pages, a fiduciary/processor split, an audit log). It treats RTI as an edge case rather than a designed workflow, and it has no proactive-disclosure or open-data design.

---

## 4. Gaps

1. G9 wrongly assigns RTI "handling" to the operator. There is no PIO or FAA role, no statutory clock, and no Section 11 notice path.
2. The operator contract has no clause obliging production of records to the PIO and no retrieval SLA.
3. The disclosure policy is not versioned or configurable, and there is no switch for the pending Section 44(3) litigation.
4. No data classification per field: personal information (8(1)(j)), third-party commercial (8(1)(d)/Section 11), investigation (8(1)(h)), or public.
5. No "treated as confidential" marker captured from organizations at onboarding, which triggers Section 11.
6. No entity-type handling for sole-proprietor shops (natural persons).
7. No Section 4(1)(b) proactive-disclosure register: authorised organizations, subsidy aggregates, operator contract and payments, methodology.
8. No open-data release: no NDSAP negative/open list, no GODL licence, no machine-readable monthly dataset, no DOI/versioning.
9. No statistical disclosure control (minimum cell count, dominance rule, secondary suppression) for G2/G6 and public datasets.
10. No flag-status gate before any release of flag data, and no organization right of reply.
11. No legal hold that pauses retention-driven anonymisation during RTI, appeal, or investigation.
12. No reasons requirement for approval, suspension, or "disputed" decisions (Section 4(1)(d)).
13. The operator's own public-authority exposure under Section 2(h) (substantial financing) is not assessed.
14. No annual transparency audit hook (DoPT §4.4 pattern) and no RTI statistics (requests, releases, refusals by exemption).

---

## 5. Recommended PRD changes (file + change)

| # | File | Change |
|---|------|--------|
| C1 | `docs/prd/09-government.md` G9 | Rewrite: "RTI requests are **decided by the sponsoring department's or SPCB's PIO**. The operator retrieves and pre-redacts records within 5 working days of a PIO instruction. The system tracks the statutory clock (30 days; 48 hours for life or liberty; 40 days when Section 11 applies), Section 11 third-party notices (sent within 5 days, 10-day representation window), the decision, the exemptions cited per field, and the First Appeal. Every retrieval and release is audit-logged." Add a `pio` / `first_appellate_authority` capability (not a new org type) in `02-roles-rbac.md`. |
| C2 | `docs/prd/12-nfr-security.md` §6 | Replace with a **Disclosure Policy specification**: (a) a field-level classification: `public`, `personal_8_1_j`, `third_party_commercial_8_1_d`, `investigation_8_1_h`, `internal`; (b) a versioned, configuration-driven policy that can switch the 8(1)(j) behaviour if the Supreme Court restores a public-interest test, with every redaction citing the policy version; (c) an 8(2) public-interest release only with a recorded decision by a named competent authority; (d) designation and office, not the officer's name, for any published SPCB decision. |
| C3 | `docs/prd/12-nfr-security.md` §6 (new sub-section "Proactive disclosure and open data") | Monthly open dataset (CSV and JSON) of formal-network aggregates by district, category, and month, published under GODL-India with version, cut-off, coverage label, and methodology, and pushed to the state portal or data.gov.in where the state participates. Publish an EcoSure NDSAP-style negative list and open list. Section 4(1)(b) register: approved organizations (companies/LLPs by legal name; sole proprietors by shop ID and district only unless they consent), incentive aggregates (amount and beneficiary counts by district and month), operator contract, service levels, performance, and payments. Publish an annual RTI and transparency statistics page. |
| C4 | `docs/prd/09-government.md` G2, G6 and `12-nfr-security.md` §6 | Add **statistical disclosure control**: suppress any public or exported cell with fewer than 3 contributing organizations (fewer than 10 citizens for citizen counts), apply an (n,k) dominance rule (for example, top 2 organizations above 80% of the cell), apply secondary suppression against totals, and mark suppressed cells "c". SPCB-internal views may show unsuppressed values, labelled "Not for publication". |
| C5 | `docs/prd/09-government.md` G3, G4, G5 | Flags carry a status (`open`, `under_review`, `confirmed`, `dismissed`). Only `confirmed` or `dismissed` flags, with the organization's response, are releasable. Sole-proprietor names are never shown outside SPCB and operator views. G4 "disputed" requires a written reason visible to the organization and a right of reply (Section 4(1)(d)). G5 notes carry an exemption tag (8(1)(h) while an investigation is open), reviewed when the investigation closes. |
| C6 | `docs/prd/12-nfr-security.md` §5 | Add a **legal hold**: retention-driven anonymisation or deletion is suspended for records linked to an open RTI request, appeal, audit, or investigation, and the hold is audit-logged. |
| C7 | `docs/prd/03-domain-model.md` (organization entity) and `docs/prd/10-workflows.md` (onboarding) | At onboarding, capture the organization's entity type (company, LLP, partnership, sole proprietor) and which fields it asks to be "treated as confidential" (pricing, yields, bank details). Explain that attestation weights and registration status are disclosable compliance data. |
| C8 | `docs/prd/14-open-questions.md` | Add: (a) which state data or open-data policy applies in each corridor; (b) whether the operator could be a Section 2(h) public authority (substantial financing); (c) who is the designated PIO — the SPCB or the sponsoring department; (d) monitoring of the Section 44(3) Supreme Court challenge, with a policy-switch owner. |
| C9 | `docs/prd/00-overview.md` or the operator contract annex | Contract clauses: the operator must produce records to the PIO within the service level; the operator may not assert commercial confidentiality over programme data; data returns to the sponsor on exit; the operator provides an annual transparency-audit extract. |

---

## 6. Score

**4 / 10** for RTI and open-data readiness of PRD v2.

- Positives: coverage labelling, no personal data or prices on the public page, a clean fiduciary/processor split, audit logging of personal-data access, and a stated intent to have a disclosure policy.
- Negatives: the core RTI workflow is legally misassigned to the operator; there is no Section 4 proactive-disclosure or NDSAP/GODL open-data design; there is no statistical disclosure control; there is no handling of the post-November-2025 8(1)(j) regime or its pending challenge; and there is no Section 11 third-party path, legal hold, or reasons requirement.
- With C1–C6 applied, I would expect this area to reach **7.5–8 / 10**. The remaining uncertainty is state-specific policy and the outcome of the Supreme Court case.
