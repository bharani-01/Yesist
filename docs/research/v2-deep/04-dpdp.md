# 04 — DPDP Act 2023 and DPDP Rules 2025: does EcoSure PRD v2 comply?

**Agent:** 04 of 36 (v2 deep research swarm)  
**Date of research:** 2026-09-26/27  
**Scope:** Digital Personal Data Protection Act, 2023 (DPDP Act), DPDP Rules, 2025 and their phased commencement; adjacent obligations that bite on the same data (CERT-In Directions 2022, Aadhaar offline-verification regulations, IT Act s.43A / SPDI Rules until repeal, RTI s.8(1)(j) amendment).  
**PRD files reviewed:** `docs/prd/00-overview.md`, `02-roles-rbac.md`, `03-domain-model.md`, `12-nfr-security.md` (plus grep of `10-workflows.md`, `11-integrations.md`, `13-roadmap.md`, `14-open-questions.md`).  
**Not legal advice.** Anything marked **UNVERIFIED** was not confirmed from a primary source in this session and needs counsel sign-off.

---

## 1. Sources

Primary / official:

1. DPDP Act, 2023 — Gazette text: https://egazette.gov.in/WriteReadData/2023/248045.pdf (s.6, 7, 8, 9, 10, 11–14, 16, 17(4), 44(3) and Schedule of penalties read from this text).
2. DPDP Rules, 2025 (G.S.R. 846(E), 13/14 Nov 2025) — MeitY: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa ; English text mirror: https://www.dpdpa.com/DPDP_Rules_2025_English_only.pdf ; IndiaCode: https://indiacode.ecourtsindia.com/rules/fe07b131/
3. Commencement notification G.S.R. 843(E), 13 Nov 2025: https://indiacode.ecourtsindia.com/rules/e1be0965/
4. PIB backgrounder on the Rules (14 Nov 2025): https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
5. MeitY explanatory note on the Rules: https://www.meity.gov.in/writereaddata/files/Explanatory-Note-DPDP-Rules-2025.pdf
6. Second Schedule (State processing standards): https://dpdprules.org/rules/second-schedule and CADP full text https://cadp.in/resources/official-texts/dpdp-rules-2025/
7. CERT-In Directions under s.70B(6), 28 Apr 2022: https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf ; FAQs: https://www.cert-in.org.in/PDF/FAQs_on_CyberSecurityDirections_May2022.pdf
8. Aadhaar (Authentication and Offline Verification) Regulations 2021 as amended 9 Dec 2025: https://indiacode.ecourtsindia.com/rules/2b98dd38/ ; UIDAI OVSE page / FAQ: https://uidai.gov.in/en/ovse , https://www.uidai.gov.in/hi/ovse-faq ; OVSE playbook: https://uidai.gov.in/images/OVSE_Playbook.pdf

Secondary / tracking (used for status of proposals and litigation):

9. Business Standard, 22 Jan 2026, "MeitY may cut compliance timeline for key DPDP rules to 12 months": https://www.business-standard.com/technology/tech-news/meity-may-cut-compliance-timeline-for-key-dpdp-rules-to-12-months-126012201293_1.html
10. dpdprules.org, status of the 12-month proposal (verified 1 Sep 2026): https://dpdprules.org/blog/dpdp-18-months-to-12-months-proposal
11. dpdprules.org, Supreme Court challenge status (to 23 Aug 2026): https://dpdprules.org/blog/dpdp-act-supreme-court-challenge ; The Hindu, 7 Aug 2026: https://www.thehindu.com/news/national/sc-to-examine-impact-of-dpdp-law-on-rti-investigative-journalism/article71317413.ece ; SC Observer: https://www.scobserver.in/reports/challenge-to-dpdp-act-day-2-law-may-impede-investigative-journalism-petitioners-argue/
12. Government-sector commentary (s.7(b) vs s.17): https://dpdpact.net/implementation/government
13. Consent Manager deadline commentary: https://cyberaube.com/blog/dpdp-consent-manager-deadline-november-2026-data-fiduciary-playbook

---

## 2. Findings (the law as it stands on 2026-09-26)

### F1. Commencement is phased, and EcoSure's software launch lands on the main deadline

| Date | What commences | Source |
|------|----------------|--------|
| 13 Nov 2025 | Act s.1(2), 2, 18–26, 35, 38–43, 44(1) and 44(3) (RTI amendment). Rules 1, 2, 17–21 (Board set-up) | [3], [2] |
| 13 Nov 2026 | Act s.6(9) and 27(1)(d); Rule 4 + First Schedule — **Consent Manager registration only** | [3], [2], [13] |
| 13 May 2027 (computed) | Act s.3–5, 6(1)–(8),(10), 7–17, 27 (rest), 28–34, 36, 37, 44(2). Rules 3, 5–16, 22, 23 — **notice, legitimate uses, security, breach, erasure, children, SDF, rights, grievance, cross-border, penalties** | [3], [2], [10] |

- A January 2026 MeitY proposal to compress Significant Data Fiduciary (SDF) obligations to 12 months was reported [9] but, as of 1 Sep 2026, **no amending notification exists** [10]. Treat 13 May 2027 as the binding date, with a watch item.
- Supreme Court (W.P.(C) 177/2026, Venkatesh Nayak v UoI) is hearing challenges to s.17, 36, 44(3) and Rules 17, 23(2); **no stay** was granted; Centre asked to respond on 7 Aug 2026 [11].
- **v2 timing:** Roadmap = 12-week pilot + Phase 0 (6–8 weeks) + Phase 1 (12–16 weeks). Started around Oct 2026, Phase 1 goes live roughly **April–July 2027 — straddling 13 May 2027**. The product must be DPDP-compliant on day one of software; the Wizard-of-Oz pilot (WhatsApp + shared spreadsheets) runs under the older regime.
- Until s.44(2) commences, **IT Act s.43A and the SPDI Rules 2011 still apply to the contracted operator as a body corporate** (UPI/bank details and biometrics are SPDI). **UNVERIFIED** as to the exact SPDI scope for UPI VPA — counsel to confirm.

### F2. Lawful basis: consent by default; s.7(b) is narrow and conditional for a State programme

- s.7(b) lets the State and its instrumentalities process data without consent to provide a *subsidy, benefit, service, certificate, licence or permit*, but only where the person **previously consented** to State processing for such a benefit, or the data comes from a **Central-Government-notified State database** [1], [12].
- Rule 5 + Second Schedule add standards even for s.7(b): lawful, purpose-limited, minimal, accurate, retention-limited, secure, and an **intimation** with the business contact information and a link to exercise rights [6].
- Rule 5(2)(c) treats benefits paid "using public funds" (Consolidated Fund / public account of the State) as covered [2]. So a **scheme-funded** citizen incentive may fit; a **producer-pool-funded** incentive (`funding_source = producer_pool`) does **not** use public funds and cannot rely on s.7(b).
- s.7(c) (State functions under any law) plausibly covers SPCB enforcement use of organisation and custody data under the E-Waste (Management) Rules 2022 — **UNVERIFIED** as applied; counsel to confirm.
- EcoSure citizens join voluntarily (00-overview §1). The cleanest basis for citizen, shop-owner, and driver data is therefore **s.6 consent with a Rule 3 notice**, plus s.7(b)/(c) only where the sponsor documents them.

### F3. Notice (Rule 3) and consent mechanics

The notice must stand alone and give: an **itemised description** of personal data, the **specific purposes**, a link to **withdraw consent as easily as it was given**, to **exercise rights**, and to **complain to the Board** [2]. Consent must be free, specific, informed, unconditional, unambiguous, limited to necessary data, and available in English or any Eighth-Schedule language (s.6(1), (3)) [1]. Withdrawal must stop processing by the fiduciary **and its processors** within a reasonable time (s.6(6)) [1].

### F4. Consent Managers are optional

Rule 4 only creates a registration regime for Consent Managers from 13 Nov 2026 [2], [13]. Fiduciaries are not required to integrate one. Principals may route consent through one once s.6(7)–(8) commence in May 2027. **Implication:** keep a structured consent record that could be exposed later; do not build a Consent Manager integration now.

### F5. State exemptions (s.17) are narrower than teams assume

- s.17(4): for processing **by the State or its instrumentality**, **s.8(7)** (erase once purpose served) and **s.12(3)** (right to erasure) do not apply. **s.12(2)** (correction) also does not apply where no decision affecting the principal is made [1].
- Security (s.8(5)), breach notification (s.8(6)), notice, access (s.11), grievance (s.13), children (s.9), and processor accountability all **still apply** to the State [1], [12].
- s.17(2)(a) (full exemption for a *notified* instrumentality, for sovereignty/security purposes) is irrelevant to e-waste custody.
- **Critical caveat:** the s.17(4) relief attaches to processing *by the State*. If the operator, WhatsApp BSP, or any sub-processor acts outside the department's instructions, or if the department is not formally named as fiduciary in the operator contract, the exemption is weak. **UNVERIFIED** how the Board will treat PPP-operated programmes.

### F6. Children (s.9 and Rule 10)

Before processing a child's (under 18) data the fiduciary needs **verifiable parental consent**, checked against reliable identity and age details or a virtual token such as DigiLocker. It must not do **tracking, behavioural monitoring, or targeted advertising** directed at children [1], [2]. Penalty: up to ₹200 crore (Schedule) [1]. Students disposing of old phones are a plausible EcoSure segment. Phone-OTP signup has **no age gate**.

### F7. Security, logging and retention floors

- Rule 6(1): minimum safeguards are encryption, masking or tokenisation; access control; access logs with monitoring and review; backups for continuity; **retain logs and personal data for one year** for incident investigation; **security clauses in processor contracts**; and organisational measures [2].
- Rule 8(3): retain personal data, traffic data, and processing logs for **at least one year** from processing, then erase unless another law requires longer [2].
- Rule 8(1)–(2) and the Third Schedule: fixed 3-year inactivity erasure with a **48-hour prior warning** applies only to listed classes (large e-commerce, gaming, social media) [2]. EcoSure is not listed. For a State fiduciary, s.17(4) removes s.8(7) in any case.
- CERT-In: **all** body corporates and government organisations must keep ICT logs for a rolling **180 days in India** and report listed incidents, including data breaches, **within 6 hours** [7].

### F8. Breach notification (s.8(6) and Rule 7)

- To **each affected principal**, without delay, through their account or registered contact: what happened, likely consequences, mitigation, steps they can take, and a contact person [2].
- To the **Data Protection Board**: an immediate intimation, then a **detailed report within 72 hours** (or longer if the Board allows in writing), covering facts, cause, mitigation, who caused it, remediation, and the principal notifications sent [2].
- This runs **in parallel with CERT-In's 6-hour report** [7].
- Penalty for failing to notify: up to ₹200 crore. For failing reasonable security safeguards: up to ₹250 crore [1].

### F9. Rights, grievance, nomination, contact point

- Access to a summary of data and a list of fiduciaries/processors it was shared with (s.11). Correction/erasure (s.12, limited by s.17(4)). Grievance redressal (s.13). Nomination (s.14) [1].
- Rule 9: publish the business contact of a DPO or responsible person, and repeat it in every rights response. Rule 14: publish how to raise requests and which identifiers are needed; respond to grievances within **≤ 90 days**; support nomination [2].

### F10. Significant Data Fiduciary (s.10 and Rule 13)

SDF status requires **government notification** on volume, sensitivity, and risk grounds [1]. A single-corridor state pilot is unlikely to be notified. The declared long-term path, a national federated layer under MoEFCC/CPCB (00-overview §1), could be. SDF duties are a DPO based in India, an independent data auditor, an annual DPIA and audit reported to the Board, algorithmic due diligence, and possible localisation of specified data [2].

### F11. Processors and cross-border transfer

- The fiduciary remains responsible for processing done on its behalf. It may engage a processor **only under a valid contract** (s.8(1)–(2)). Rule 6(1)(f) requires security clauses in that contract. On withdrawal of consent or at retention end, the fiduciary must make processors erase (s.8(7)–(8)) [1], [2].
- s.16: transfers abroad are allowed except to countries the Centre restricts by notification. Sectoral or State rules that require stricter residency prevail [1].
- WhatsApp Business (Meta Cloud API or a BSP) processes phone numbers and message content, likely outside India. **UNVERIFIED:** the actual hosting region for the chosen BSP.

### F12. Aadhaar for shop owners

- Aadhaar Act s.8A(3) (as reflected in UIDAI OVSE terms): the entity must tell the person what is shared, the uses, and **the alternatives to Aadhaar**.
- Physical Aadhaar copies must be masked (first 8 digits redacted) before storage. Storing the Aadhaar number for non-authentication purposes needs UIDAI permission. Registered OVSEs may store offline Aadhaar data only with explicit consent, and must delete it verifiably when consent is revoked [8].
- v2 (11-integrations) already says "store only the verification result and masked number". That aligns, but it does not name an alternative ID path.

### F13. RTI interplay

s.44(3) (in force since 13 Nov 2025) replaced RTI s.8(1)(j) with a blanket exemption for "information which relates to personal information". This is under Supreme Court challenge, with no stay [11]. EcoSure's RTI disclosure policy (12-nfr §6) should rely on it for citizen, shop-owner, and driver data. Organisation-level custody and attestation data is not personal data and remains disclosable.

---

## 3. v2 fit: what the PRD already gets right

| DPDP expectation | v2 today | Assessment |
|------------------|----------|------------|
| Identify fiduciary and processor | 12-nfr §5: department is fiduciary, operator is processor under contract | **Good.** This is also the basis for s.17(4) relief |
| Data minimisation | "Collect only what operations need"; categories and counts only; device details optional (10-workflows) | **Good** |
| Need-to-know disclosure | Full address shown only after the shop accepts; producers never see citizen identity; SPCB sees aggregates only (02-rbac §3) | **Strong**, in line with the Second Schedule's purpose limitation |
| Access logging | Append-only audit log of all SPCB/operator personal-data access, with a reason (12-nfr §2.7, 02-rbac §5.5) | **Good.** Supports Rule 6(1)(c) |
| Retention with anonymisation | 3 years operational, 7 years compliance, then anonymise without breaking custody | **Mostly good.** Exceeds the 1-year floor; see gaps |
| Rights | Access, correction, deletion (as anonymisation) | **Partial.** No nomination, grievance SLA, contact point, or channel |
| Marketing consent separate | WhatsApp opt-in separate from transactional notices | **Partial.** Only one boolean is stored, with no notice version |
| Residency | Hosting in India | **Good** for the system of record. Silent on the WhatsApp/SMS/UPI processors |
| Security audit | CERT-In-empanelled audit before go-live | **Good**, but no incident or breach process |
| Aadhaar | Masked number plus verification result only (11-integrations) | **Good**, but no alternative ID and no consent text |
| Wipe confirmation | Required for data-bearing devices | **Good** protection for the citizen's *device* data, which is separate from DPDP duties on EcoSure's own data |

---

## 4. Gaps (what is missing or risky)

| # | Gap | Law | Severity |
|---|-----|-----|----------|
| G1 | **No Rule 3 notice.** No itemised data list, purposes, withdrawal/rights/Board-complaint links, languages, or notice versioning | s.5, s.6, Rule 3 | High |
| G2 | **No consent record model.** `users.whatsapp_opt_in` is one boolean. No purposes, notice version, language, channel, timestamp of withdrawal, or processor propagation. No consent for shop owners, drivers, or gate contacts | s.6(1),(4),(6), (10) burden of proof on fiduciary | High |
| G3 | **Lawful basis not documented per purpose.** Scheme vs producer-pool incentive, SPCB monitoring, fraud analytics, and education/marketing are not mapped to s.6 / s.7(b) / s.7(c) | s.4, s.7, Rule 5 | High |
| G4 | **No breach-response process.** Nothing on detection, the 6-hour CERT-In report, the immediate + 72-hour Board report, per-principal WhatsApp/SMS notice, or a breach register | s.8(6), Rule 7, CERT-In | High |
| G5 | **No children policy.** No age declaration, no parental-consent path, no bar on child-directed monitoring. Anomaly detection "on repeated devices/UPI IDs" is behavioural monitoring if applied to minors | s.9, Rule 10 | High |
| G6 | **Processor chain not specified.** No list of sub-processors (operator, WhatsApp BSP, SMS gateway, UPI PSP/bank, Aadhaar verification provider, malware scanner, cloud, map/geocoding). No contract clauses (security, breach notice to fiduciary within hours, erasure on instruction, audit, India residency, sub-processor approval) | s.8(1)–(2),(7)(b), Rule 6(1)(f) | High |
| G7 | **Log-retention floors not stated.** Missing the 1-year minimum for processing logs and personal data (Rule 6(1)(e), 8(3)) and the 180-day in-India ICT logs (CERT-In). "Deletion anonymises" does not say that logs are kept for 1 year first | Rules 6, 8(3); CERT-In | Medium |
| G8 | **Grievance and contact point missing.** No DPO/grievance officer, no ≤ 90-day SLA, no nomination, no published "how to exercise rights" page, no Board-complaint link | s.8(9), s.13, s.14, Rules 9, 14 | Medium |
| G9 | **Privacy scope covers citizens only.** Shop owners (sole proprietors: Aadhaar, UPI VPA, shop photo), drivers (`driver_name`, `driver_phone`), gate contacts (`gate_contact_name`), society RWA contacts, and officers are all data principals. 12-nfr §5 speaks only of "citizens" | s.2(j), s.5 | Medium |
| G10 | **Photos and geodata.** Doorstep and weigh photos can show faces, house fronts, or IMEI labels. `lat`/`lng` is precise location. No EXIF stripping, face-avoidance guidance, or retention class for photos | s.8(4)–(5), minimisation | Medium |
| G11 | **Offline device storage.** Field devices queue personal data (addresses, photos) locally. No at-rest encryption, remote wipe, or maximum offline age | Rule 6(1)(a),(b) | Medium |
| G12 | **Cross-border and residency contradiction.** "Data resident in India" versus WhatsApp/Meta processing. No policy on what may go in message templates (for example, no full address, no UPI ID) | s.16; state/sectoral residency | Medium |
| G13 | **Aadhaar alternatives and consent text missing** for micro-tier shops. Aadhaar-only KYC risks s.8A non-compliance and exclusion | Aadhaar Act s.8A; Regs 2021 (am. 2025) | Medium |
| G14 | **Erasure semantics are unclear.** s.17(4) exempts the *State* from s.8(7)/12(3), but v2 promises deletion. Good policy, but it should be a deliberate choice, with processors bound to it and exceptions stated (fraud holds, disputes, statutory custody) | s.12, s.17(4) | Low–Medium |
| G15 | **No DPIA or SDF readiness.** No voluntary DPIA before go-live and no trigger for the national layer to prepare for SDF | s.10, Rule 13 | Low (pilot) / High (national) |
| G16 | **Pre-software pilot.** The Wizard-of-Oz pilot puts citizen addresses and UPI IDs in "shared spreadsheets" and WhatsApp groups with no access control, retention, or migration/erasure plan | SPDI Rules now; DPDP s.8 later | Medium |
| G17 | **RTI policy not tied to s.44(3)**, and no fallback if the Supreme Court restores the public-interest test | RTI s.8(1)(j) as amended | Low |

---

## 5. Recommended PRD changes (file + change)

Do not edit the PRDs as part of this research. These are proposals for the PRD owner.

### `12-nfr-security.md`

1. **Replace §5 "Privacy (DPDP Act)" with a full "Privacy and data protection" section** containing:
   - **Regime and dates:** "Design to the DPDP Act 2023 + DPDP Rules 2025 as fully in force from 13 May 2027. Until then, the operator also complies with IT Act s.43A / SPDI Rules 2011. Track MeitY amendments and the Supreme Court petitions (W.P.(C) 177/2026)."
   - **Fiduciary/processor:** the department is the Data Fiduciary for all principals (citizens, shop owners, drivers, gate/RWA contacts, staff). Operator, WhatsApp BSP, SMS gateway, UPI PSP, Aadhaar verification provider, hosting, and malware scanning are processors. A sub-processor register is published.
   - **Lawful-basis table** per purpose:
     - Pickup and custody: consent.
     - Scheme-funded incentive: consent, with s.7(b)/Rule 5 as a secondary basis only if the sponsor documents it.
     - Producer-pool incentive: consent only.
     - SPCB monitoring of organisations: s.7(c), aggregates.
     - Fraud controls: consent/notice.
     - WhatsApp education and updates: separate opt-in.
   - **Notice:** a Rule 3 notice, versioned, in Hindi, English, and the corridor language. It includes an itemised data list, purposes, withdraw/rights/Board-complaint links, and the grievance contact. It is shown before OTP completion and linked from every WhatsApp template footer.
   - **Children:** citizen accounts are 18+ by self-declaration at signup. Minors dispose through a parent's account. No behavioural monitoring or anomaly scoring is applied to accounts flagged as minors.
   - **Rights and grievance:** access (summary plus list of processors), correction, erasure-as-anonymisation, and nomination. Grievance officer and DPO contact published (Rule 9). Grievances resolved within 30 days (internal target, below the 90-day legal ceiling). Rights requests are accepted via app, WhatsApp keyword, and shop counter.
   - **Retention (restated):** keep processing and access logs and relevant personal data for at least 1 year (Rules 6(1)(e), 8(3)). ICT logs are kept 180 days in India (CERT-In). Operational personal data is kept 3 years after last activity, then anonymised. Custody and compliance data is kept 7 years with personal fields tokenised. Photos are kept 1 year unless attached to a dispute or attestation. Processors must erase on instruction and certify.
   - **Residency:** the system of record, backups, and logs stay in India. Message templates carry no full address, UPI ID, Aadhaar data, or photos. Cross-border processors must be documented under s.16.
2. **Add §2a "Incident and breach response"**:
   - Detect, then triage within 1 hour.
   - Report to CERT-In within **6 hours**.
   - Send an immediate intimation to the **Data Protection Board**, then a detailed report within **72 hours**.
   - Notify every affected principal by WhatsApp/SMS in their language with the Rule 7(1) content.
   - Keep a breach register.
   - Processors must notify the fiduciary within **2 hours** of awareness. This is a contract term.
   - Run an annual tabletop drill.
3. **Extend §2 Security** with:
   - field-level encryption or tokenisation for phone, address, UPI VPA, and Aadhaar reference (Rule 6(1)(a));
   - encrypted offline queues with remote wipe and a 7-day maximum unsynced age;
   - EXIF/GPS stripping on uploaded photos;
   - quarterly access reviews.
4. **Add §5a "DPIA":** a voluntary DPIA before Phase 1 go-live and before each new corridor. The DPIA becomes mandatory and annual if EcoSure or the national layer is notified as an SDF.

### `03-domain-model.md`

5. Add these entities:
   - **`PrivacyNotice`**: `id`, `version`, `language`, `body_ref`, `effective_from`.
   - **`ConsentRecord`**: `id`, `principal_user_id` or `principal_ref`, `purpose` (`pickup_service` | `incentive_payout` | `whatsapp_updates` | `education` | `shop_onboarding` | `aadhaar_verification`), `notice_id`, `channel`, `granted_at`, `withdrawn_at`, `evidence`.
   - **`DataRightsRequest`**: `id`, `principal`, `type` (`access` | `correction` | `erasure` | `nomination` | `grievance`), `received_at`, `due_at`, `status`, `response_ref`.
   - **`BreachIncident`**: `id`, `detected_at`, `certin_reported_at`, `dpb_intimated_at`, `dpb_report_at`, `principals_notified_at`, `summary`, `status`.
   - **`Processor`**: `name`, `purpose`, `region`, `contract_ref`, `dpa_signed_at`.
6. Replace `users.whatsapp_opt_in` / `_at` with `ConsentRecord` rows. Add `users.age_confirmed_adult` (bool plus timestamp).
7. Mark personal-data columns (`phone`, `full_name`, `Address.*`, `lat`/`lng`, `gate_contact_name`, `upi_vpa`, `driver_name`, `driver_phone`, `photo_ref`) with a **retention class** and an **anonymisation rule** in §4 Integrity rules. Anonymising must keep custody hashes valid.
8. Constrain `Device` to non-identifying fields. Do not store IMEI or serial numbers unless a producer take-back programme needs them, and then only with consent.

### `02-roles-rbac.md`

9. Add a **`privacy_officer` capability** within `programme_operator`. It handles rights requests, breach register, and consent exports, with no access to settlements.
10. Add to §3: "Operator field staff see a citizen's address only for jobs assigned to their corridor, and only until the pickup closes plus 7 days."
11. Add an enforcement rule: "Withdrawal of consent for a purpose revokes processing within 48 hours across the system and processors. Custody records already created are retained under the retention class."

### `11-integrations.md`

12. For Aadhaar:
    - Offer an **alternative ID path**: PAN, voter ID, or an Udyam/shop licence plus an in-person check by the operator.
    - Show the s.8A notice (what is shared, uses, alternatives).
    - Use UIDAI offline verification (Aadhaar App VC / secure QR) or a licensed provider.
    - Never store the full Aadhaar number or images of unmasked Aadhaar cards.
13. For WhatsApp, SMS, and UPI: list each provider as a processor with its region. Add a **template data policy** (which fields may appear), a DPA requirement, and India storage where available.

### `13-roadmap.md`

14. **Pilot:**
    - Use an access-controlled workspace, not open shared sheets.
    - Show a one-page notice and get verbal/WhatsApp consent from every citizen and shop.
    - Plan to migrate pilot data into the system or erase it within 30 days of the pilot ending.
15. **Phase 0 exit criteria:**
    - notice and consent model live;
    - rights-request queue live;
    - breach runbook tested;
    - processor DPAs signed;
    - DPIA done.
    
    Place this as a gate before any citizen onboarding after **13 May 2027**.

### `14-open-questions.md`

16. Add sponsor decisions:
    - **OQ-DP1:** Does the department accept being the named Data Fiduciary, and will it rely on s.7(b)/(c) for any purpose?
    - **OQ-DP2:** Who is the DPO or grievance officer?
    - **OQ-DP3:** Does the state require stricter residency than s.16 (affects WhatsApp)?
    - **OQ-DP4:** Honour erasure despite the s.17(4) exemption? Recommended: yes, as anonymisation.
    - **OQ-DP5:** Update OQ-32 retention with the 1-year log floor and a photo retention class.

### `00-overview.md`

17. Add design principle 9: **"Privacy by default."** Collect the minimum. Show addresses only to the assigned shop. Keep every consent provable. Report every breach within statutory time.

---

## 6. Score

**4 / 10** for DPDP readiness of the v2 privacy design.

- **What earns points:** correct fiduciary/processor framing (which also secures s.17(4) relief), need-to-know address gating, strict producer/SPCB separation from citizen identity, logged privileged access, India hosting, masked Aadhaar, and retention with anonymisation that preserves custody.
- **What loses points:** no Rule 3 notice, no consent record, no per-purpose lawful basis, no breach process (CERT-In 6 h, Board 72 h, principal notices), no children policy, no processor contracts or sub-processor list, no grievance/DPO/nomination mechanics, and missing log-retention floors. These are all mandatory from 13 May 2027, roughly when Phase 1 is due to launch.
- **With the changes above:** the design could reach about 8/10. The remaining risk is legal interpretation of s.7(b)/s.17(4) for a PPP-operated programme, and possible SDF status for the national layer.
