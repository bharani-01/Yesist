# 06 — Hosting, CERT-In and Government IT Compliance Review of PRD v2

**Agent:** 06 of 36 (v2 deep research swarm)
**Date:** 2026-09-26
**Scope:** How well PRD v2 fits MeitY cloud empanelment (GI Cloud / MeghRaj), NIC hosting, the MP State Data Centre (SDC), the CERT-In Directions of 28 April 2022, CERT-In security audits, the Government of India open-source policy, and data localisation.
**Files reviewed:** `docs/prd/12-nfr-security.md`, `docs/prd/11-integrations.md`, `docs/prd/13-roadmap.md` (all v2, dated 2026-09-27). Also checked: `14-open-questions.md` (SP-06 Hosting).
**PRD files were not edited.**

---

## 1. Sources

Primary (government) sources:

| # | Source | URL |
|---|--------|-----|
| S1 | CERT-In Directions under Section 70B(6), No. 20(3)/2022-CERT-In, 28 Apr 2022 | https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf |
| S2 | CERT-In FAQs on the Cyber Security Directions, May 2022 | https://www.cert-in.org.in/PDF/FAQs_on_CyberSecurityDirections_May2022.pdf |
| S3 | CERT-In Guidelines on Information Security Practices for Government Entities | https://cert-in.org.in/PDF/guidelinesgovtentities.pdf |
| S4 | CERT-In Comprehensive Cyber Security Audit Policy Guidelines v1.0, 25 Jul 2025 | https://www.cert-in.org.in/PDF/Comprehensive_Cyber_Security_Audit_Policy_Guidelines.pdf |
| S5 | CERT-In Cyber Security Audit Baseline Requirements (CSA-BR) | https://www.cert-in.org.in/PDF/CyberSecurityAuditbaseline.pdf |
| S6 | CERT-In Technical Guidelines on SBOM, QBOM & CBOM, AIBOM and HBOM v2.0 (3 Oct 2024) | https://cert-in.org.in/PDF/TechnicalGuidelines-on-SBOM,QBOM&CBOM,AIBOM_and_HBOM_ver2.0.pdf |
| S7 | MeitY AMBUD — Inviting Application for Empanelment of Cloud Services of CSPs | https://www.ambud.meity.gov.in/assets/web_assets/manual/inviting_application_for_empanelment_of_cloud_service_offerings_of_cloud_service_providers.pdf |
| S8 | MeitY AMBUD FAQ (STQC audit, annual surveillance audit) | https://www.ambud.meity.gov.in/faq |
| S9 | MeitY Guidelines for Procurement of Cloud Services v2.2 | https://www.ambud.meity.gov.in/assets/web_assets/Includes/files/5.%20Guidelines_Procurement_Cloud%20Services_v2.2.pdf |
| S10 | NICSI Cloud / National Government Cloud (MeghRaj delivery) | https://nicsi.nic.in/nicsi/nicsi-cloud/ |
| S11 | MPSEDC Cloud Adoption Framework (Govt. of MP) | https://mpsedc.mp.gov.in/Uploaded%20Document/Policies%20and%20Rules/Cloud%20Adoption%20Framework.pdf |
| S12 | MPSEDC RFP — Rate contract / MSP for cloud services (TN 545, Jun 2024) | https://mpsedc.mp.gov.in/Uploaded%20Document/Tenders/18062024051452RFP%20Cloud%20TN%20545.pdf |
| S13 | MPSEDC Security Audit portal (CERT-In empanelled state auditor) | https://mpsedc.mp.gov.in/securityaudit/ |
| S14 | MP State Data Centre, Bhopal (india.gov.in listing) | https://www.india.gov.in/website-madhya-pradesh-state-data-centre-bhopal |
| S15 | Policy on Adoption of Open Source Software for GoI (2015) | http://egovstandards.gov.in/sites/default/files/2021-07/Policy%20on%20Adoption%20of%20Open%20Source%20Software%20for%20Government%20of%20India.pdf |
| S16 | MeitY OSS policy document compilation (2024 upload) | https://www.meity.gov.in/static/uploads/2024/03/Policy-Document.pdf |
| S17 | DPDP Rules 2025 (Gazette text, English) | https://www.dpdpa.com/DPDP_Rules_2025_English_only.pdf |
| S18 | GIGW 3.0 portal (NIC) and STQC CQW certification | https://guidelines.india.gov.in/ |
| S19 | Meta WhatsApp Cloud API — Local storage | https://developers.facebook.com/docs/whatsapp/cloud-api/overview/local-storage/ |

Secondary:

| # | Source | URL |
|---|--------|-----|
| S20 | Business Standard — "Cert-In makes annual cybersecurity audit mandatory" (Jul 2025) | https://www.business-standard.com/industry/news/cert-in-mandates-annual-cybersecurity-audit-for-public-private-companies-125072700416_1.html |
| S21 | Business Standard — "Government says open source software use not made mandatory" (2015) | https://www.business-standard.com/article/economy-policy/government-says-open-source-software-use-not-made-mandatory-115052701154_1.html |
| S22 | Bar & Bench — DPDP Rules 2025 phased commencement | https://www.barandbench.com/law-firms/view-point/meity-notifies-final-digital-personal-data-protection-rules-2025 |
| S23 | KPMG — DPDP Rules 2025 guidance | https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/11/dpdp-rules-2025-guidance-to-dpdp-act-implementation.pdf |
| S24 | GIGW Compliance & Certification Handbook (s3waas) | https://cdnbbsr.s3waas.gov.in/s3c92a10324374fac681719d63979d00fe/uploads/2023/12/2023122166.pdf |

Verification note: all URLs were returned by live search on 2026-09-26/27. Content was read from the fetched text for S1–S4, S6, S7, S11, S12, S13, S17 and S19. Items marked **UNVERIFIED** below are based on search summaries or general knowledge that I could not confirm directly in a primary document.

---

## 2. Findings

### F1. CERT-In Directions (28 Apr 2022) apply directly and are specific — v2 does not mention them

The Directions (S1) apply to "service providers, intermediaries, data centres, body corporate and Government organisations". That covers both the SPCB (the sponsor, which is the data fiduciary) and the contracted operator. The binding operational requirements are:

- **6-hour incident reporting.** Report the incidents listed in Annexure I to CERT-In within 6 hours of noticing them, by email (incident@cert-in.org.in), phone or fax. The FAQ (S2, Q30) allows a partial first report, with the rest submitted later.
- **180-day rolling log retention within Indian jurisdiction.** Logs of all ICT systems must be kept and supplied to CERT-In on request or with an incident report. The FAQ lists firewall, IDS, SIEM, web, database, mail, proxy, SSH and VPN logs.
- **NTP synchronisation.** All system clocks must sync with NIC or NPL NTP servers, or with a source traceable to them. S3 names `samay1.nic.in`, `samay2.nic.in` and `time.nplindia.org`.
- **Point of contact.** Name a point of contact / CISO and register them with CERT-In (S1; S3 §3.1).

v2 §9 ("Observability") specifies structured logs and alerts to the operator only. It gives no retention period, no clock source and no incident-reporting clock. The phrase "alerts to the operator" is the only incident path.

### F2. Security audit: v2 covers only a one-time pre-go-live audit; the norm is now recurring

- v2 §2.8 requires a "Security audit by a CERT-In empanelled auditor before go-live". That is correct but incomplete.
- The CERT-In Comprehensive Cyber Security Audit Policy Guidelines v1.0 of 25 Jul 2025 (S4) expect a comprehensive audit **at least once a year**, plus an audit **after any major change** such as a migration, overhaul or significant configuration change. Scope includes applications, APIs, databases, cloud, source code review, mobile apps and third-party risk (S4, S20).
- The Government Entities guidelines (S3 §3.4, §15.3) require an internal audit **every 6 months** and a third-party audit **every year**.
- In MP specifically, **MPSEDC is itself a CERT-In empanelled auditor** and runs a state audit portal (S13). Its flow is an NDA and initiation document, then Level-1 testing on a test URL, then remediation, then a **Security Certificate** and final report. In practice the SDC or state cloud will ask for this certificate before production hosting. This is **UNVERIFIED** as a written hosting precondition, but it is standard SDC practice.
- The MPSEDC cloud RFP (S12 §5.5.5) requires the MSP to submit **VA/PT reports every six months**.

Implication: the Phase 0 and Phase 1 exits in `13-roadmap.md` should include the audit certificate, and later phases (Phase 2 adds producers and SPCB exports, which is a "major change") need a re-audit. Roadmap duration should include roughly 4–8 weeks for the audit and remediation cycle (**UNVERIFIED** estimate based on typical state audit queues).

### F3. "Government-empanelled cloud" is the right idea but is under-specified

- MeitY empanels CSP services under three deployment models: **Public Cloud, Virtual Private Cloud (VPC) and Government Community Cloud (GCC)**. It covers IaaS, PaaS and SaaS. Services must pass an **STQC audit** and an **annual STQC surveillance audit** (S7, S8). Required certifications include ISO 27001, 27017, 27018, 20000-1 and a Tier III data centre, and the NOC/SOC must be in India (S7, S9).
- Empanelment is **per service and per data centre**, not per vendor. An empanelled CSP's managed PostgreSQL, object storage or KMS may or may not be empanelled. The PRD should require that **every component used** (compute, managed Postgres, object storage, backup, KMS, WAF/CDN) is on the MeitY empanelled list (S7). This is the most common gap in state RFPs (**UNVERIFIED** as a statistic).
- **MP route:** the MP Cloud Adoption Framework (S11) makes **MPSEDC the nodal agency**. Departments request cloud through MPSEDC, which runs a rate contract with MSPs reselling MeitY-empanelled CSPs (S12, tender MPSEDC/SDC/2025/618). The requirement is "Cloud Hosting and Services should be hosted in India ONLY" (S12 §10). The MP SDC in Bhopal also offers co-location and DR hosting (S14). **For an MP SPCB (MPPCB) sponsor, the practical route is an MPSEDC request (SDC or MPSEDC-contracted empanelled cloud), not direct procurement.** Whether MPPCB, as a statutory board, is obliged to use MPSEDC or may procure through GeM directly is **UNVERIFIED**.
- **NIC route:** NIC/NICSI provides National Government Cloud (MeghRaj) hosting through the NGC portal (S10). This is an option if a central body (CPCB/MoEFCC) later co-sponsors federation in Phase 3.
- **Shared responsibility:** the MeitY procurement guidelines (S9) split duties between the department, the CSP, and the MSP/SI (audit trails, SLA validation, forensic support). v2 names a "contracted operator" but not who is the MSP/SI, and it does not define the shared-responsibility split.

### F4. Data localisation: v2 says "data in India" but its own integrations break that

- CERT-In (S1) requires logs to be kept within Indian jurisdiction. MPSEDC (S12) requires hosting in India only. MeitY GCC/VPC requires data residency in India (S7).
- DPDP Rules 2025 (S17, notified 13 Nov 2025): Rule 15 and Section 16 permit cross-border transfer unless the Central Government restricts it. Most obligations, including Rule 6 security safeguards, Rule 7 breach intimation and Rule 15 transfers, come into force on **13/14 May 2027** (S22, S23). EcoSure Phase 1 is likely to go live around or after that date, so these obligations will apply.
- **Integrations that leave India by default:**
  - **Meta WhatsApp Cloud API.** By default data at rest is stored in the USA. "Local storage" with `data_localization_region: IN` keeps data at rest in India, but message content may be processed abroad for up to **60 minutes** (S19). This setting is chosen **per phone number at registration** and cannot be changed afterwards (S19; Clickatell note). v2 §2 of `11-integrations.md` does not require it.
  - **Maps and geocoding.** v2 says the provider is "configurable". Commercial geocoders process addresses outside India (**UNVERIFIED** per provider). Citizen addresses are personal data.
  - **Aadhaar verification provider, SMS aggregator, error tracking, email and CI/CD SaaS.** None has a residency requirement in v2. Error trackers and log SaaS commonly capture request payloads.
- Government policy commonly treats government data as India-only through MeitY guidelines and state RFPs. No single statute requires localisation of all non-sensitive state data (**UNVERIFIED** as a complete legal statement). In practice, the SPCB will require it contractually.

### F5. DPDP Rules add log and breach timings that must be reconciled with CERT-In

- DPDP Rule 6(1)(e) (S17): keep **logs and personal data for one year** for detection and remediation of breaches, unless another law requires otherwise. This is **longer** than the CERT-In 180-day minimum. The PRD should adopt **≥ 1 year** for access and processing logs (effective May 2027).
- DPDP Rule 7 (S17): inform affected data principals **without delay** and the Data Protection Board without delay. Submit a detailed report within **72 hours**.
- The result is **three parallel breach clocks**: CERT-In **6 h**, DPDP Board **72 h**, and data principals **without delay**, plus the sponsor department's own CISO and NIC-CERT/state CERT (S3 §14.2). v2 §5 ("Privacy") does not mention breach notification at all.

### F6. Open-source policy fits the v2 stack; SBOM obligation is missing

- The 2015 GoI OSS Policy (S15, S16) makes OSS the **preferred option**. RFPs must require suppliers to consider OSS and justify any exclusion. The policy does **not** mandate OSS (S21). It binds central government and states that choose to adopt it. Whether MP has adopted it is **UNVERIFIED**.
- PostgreSQL + Node.js is fully OSS, which fits the policy well. Risk points are proprietary SaaS dependencies (Meta WhatsApp, commercial maps, SaaS observability) and any vendor-locked managed services. Open-data maps (v2 §5 already says "open data preferred") align with the policy.
- **SBOM:** CERT-In SBOM Guidelines v2.0 (S6 §7.1.2) state that "all software supplied to the government … must be accompanied by a complete SBOM" in **SPDX or CycloneDX**, maintained over time, with VEX for vulnerabilities. S3 §8.5 repeats this for vendors. v2 does not mention an SBOM, dependency scanning or VEX.
- **Source code ownership / escrow:** government practice is for the department to own the source code and IPR of custom software built with public funds (**UNVERIFIED** for MP; common in MeitY model RFP clauses). v2 is silent on who owns the code, which matters if the operator changes.

### F7. Government-entity baseline controls that v2 misses

From S3 (CERT-In Government Entities guidelines):

- **MFA** for privileged and remote access (§5.8.2, §7.6). v2 uses phone OTP for all users. That is acceptable for citizens and shops, but **SPCB officials, operator admins and database/infra access need MFA**, preferably with a second factor other than SMS.
- **SIEM integration**, with SIEM and perimeter logs kept for 180 days (§4.5.5).
- **Asset and software inventory**, including versions and patch levels (§3.6). **Patch management** with critical patches applied promptly (§13).
- **Cyber Crisis Management Plan (CCMP)**, shared with CERT-In (Annexure 1).
- **Dedicated security function** separate from IT operations (§3.3). At pilot scale this can be a named CISO / security lead at the sponsor plus one at the operator.

### F8. Reliability and DR targets are too thin for SDC/cloud hosting contracts

- v2 §8 sets 99.5% availability, daily backups and a quarterly restore test. It sets **no RPO/RTO**, **no DR site** and **no backup location or encryption requirement**.
- The MP SDC offers DR services (S11, S14). MeitY cloud procurement guidelines (S9) expect the RFP to state DR, backup and SLA parameters. For custody and money records, a daily backup means **up to 24 hours of lost custody events and payouts**. That is inconsistent with the "append-only audit log" promise.
- Suggested targets: RPO ≤ 15 minutes (WAL archiving / PITR), RTO ≤ 4 hours, backups encrypted and stored in India in a separate zone, and a DR drill every 6 months. These values are recommendations, not sourced mandates.

### F9. GIGW 3.0 / STQC website quality applies to the public web surface

- Public-facing government web apps are expected to comply with **GIGW 3.0** (NIC). Compliance can be certified through STQC's **Certified Quality Website (CQW)** scheme by submitting a Website Quality Manual (S18, S24). v2 targets WCAG 2.1 AA, which overlaps heavily with GIGW accessibility, but it does not name GIGW.
- GIGW also expects a **.gov.in / .nic.in domain**, website policies (privacy, copyright, hyperlinking, terms) and a content-archival policy. Whether a public verification page on an operator-branded domain is acceptable for an SPCB programme is **UNVERIFIED**. The safer choice is a `.gov.in` subdomain under the sponsor.

---

## 3. v2 fit — what v2 already gets right

| Area | v2 position | Assessment |
|------|-------------|------------|
| Hosting | "State data centre or government-empanelled cloud; data in India" | Correct direction; matches the MPSEDC framework and MeitY policy |
| Stack | PostgreSQL + Node.js | Strong fit with the GoI OSS policy; no licence cost; portable between SDC and cloud |
| Audit | CERT-In empanelled audit before go-live | Correct, but one-time only |
| Integrations | Backend-only keys, idempotent side effects, webhook signature checks | Good security hygiene |
| Payments | PSB payout / PFMS route "to be confirmed" | Sensible for government money; keeps RBI-regulated rails |
| Maps | Open data preferred | Aligns with the OSS policy and localisation |
| Privacy | Fiduciary = sponsor, operator = processor; retention defined | Correct DPDP roles |
| Audit log | Append-only, including SPCB access to personal data | Strong; aligns with DPDP Rule 6 "visibility on accessing personal data" |
| Governance | Hosting is an open sponsor question (SP-06) | Honest, but it blocks Phase 0 and needs a decision date |

---

## 4. Gaps (ranked by go-live risk)

| # | Gap | Severity | Where |
|---|-----|----------|-------|
| G1 | No CERT-In Directions compliance: no 6-hour incident reporting, no 180-day India-resident log retention, no NIC/NPL NTP sync, no CERT-In point of contact | **High** (statutory; applies to sponsor and operator) | `12-nfr-security.md` §2, §9 |
| G2 | Audit is one-time only: no annual audit, no audit after major change, no 6-monthly VA/PT, no MPSEDC security certificate as a gate, no audit time in the roadmap | **High** | `12-nfr-security.md` §2.8; `13-roadmap.md` Phase 0–2 exits |
| G3 | Data localisation contradicted by integrations: WhatsApp local storage not required; geocoder, SMS, KYC and observability vendors have no residency clause | **High** | `11-integrations.md` §2, §3, §5, §7; `12-nfr-security.md` §1 |
| G4 | No breach-notification workflow covering the CERT-In 6 h, DPDP 72 h and data-principal clocks; no CCMP or incident runbook | **High** | `12-nfr-security.md` §5, §9 |
| G5 | Empanelment under-specified: "empanelled cloud" not tied to the MeitY per-service list, deployment model (GCC/VPC) or STQC status; MP route through MPSEDC not named; no shared-responsibility matrix | **Medium–High** | `12-nfr-security.md` §1; `14-open-questions.md` SP-06 |
| G6 | No MFA for privileged users (SPCB, operator admin, infra) | **Medium–High** | `12-nfr-security.md` §2 |
| G7 | Log retention not stated; DPDP Rule 6 requires ≥ 1 year of processing logs from May 2027 | **Medium** | `12-nfr-security.md` §9 |
| G8 | No RPO/RTO/DR; daily backup conflicts with the custody-integrity promise | **Medium** | `12-nfr-security.md` §8 |
| G9 | No SBOM (SPDX/CycloneDX), dependency scanning, VEX or patch SLA | **Medium** | `12-nfr-security.md` §2; `13-roadmap.md` Phase 0 |
| G10 | Source-code / IPR ownership and exit/handover (data export, escrow) not stated | **Medium** | `12-nfr-security.md` (new section) |
| G11 | GIGW 3.0 / STQC CQW, `.gov.in` domain and website policies not mentioned | **Low–Medium** | `12-nfr-security.md` §4, §6 |
| G12 | Encryption at rest and key management (KMS in India, key custody with the sponsor) not stated | **Medium** | `12-nfr-security.md` §2 |

---

## 5. Recommended PRD changes

### `docs/prd/12-nfr-security.md`

1. **§1 Architecture, Hosting row.** Replace with: "MP State Data Centre or MPSEDC-contracted cloud, where every component used (compute, managed PostgreSQL, object storage, backup, KMS, WAF) is on the MeitY empanelled list (GCC or VPC model, with a current STQC audit). All data, backups, logs and keys stay in India. The sponsor holds the cloud account through MPSEDC; the operator acts as the MSP/SI under a written shared-responsibility matrix."
2. **New §2a "CERT-In compliance".**
   - Name an incident point of contact / CISO at the sponsor and at the operator, and register them with CERT-In.
   - Report Annexure-I incidents to CERT-In within 6 hours. Copy the sponsor CISO, the MP state CERT (MPSEDC) and NIC-CERT where applicable.
   - Sync all servers and containers to NIC/NPL NTP (`samay1.nic.in`, `samay2.nic.in`, `time.nplindia.org`). Record timestamps in UTC with the offset. Device capture time is stored separately from server receipt time.
   - Keep all ICT logs (application, database, WAF, access, admin, VPN/SSH) for at least 1 year in India. This satisfies both the CERT-In 180-day rule and DPDP Rule 6. Logs are tamper-evident and can be exported to CERT-In on request.
   - Maintain a Cyber Crisis Management Plan and an incident runbook, and run a tabletop exercise before go-live.
3. **§2.8 Security audit.** Replace with: "A CERT-In empanelled auditor (for example MPSEDC's CoE) audits the application before each production go-live and issues a security certificate. A comprehensive audit follows annually and after every major change (new role module, new integration, hosting migration), per the CERT-In audit guidelines of July 2025. VA/PT is repeated every 6 months, an internal review every 6 months, and critical findings are closed before release."
4. **§2 new items.**
   - MFA for all SPCB, operator-admin and infrastructure accounts, with a second factor other than SMS/WhatsApp OTP.
   - Encryption at rest, with keys in an India-region KMS under sponsor custody.
   - An SBOM in SPDX or CycloneDX generated on every release, dependency vulnerability scanning in CI, and a patch SLA (critical within 7 days, high within 30 days).
5. **§5 Privacy — add breach notification.** "On a personal data breach: CERT-In within 6 hours; affected data principals without delay through WhatsApp/SMS; Data Protection Board without delay, with a detailed report within 72 hours (DPDP Rule 7). The operator must tell the sponsor within 2 hours of detection." Also require that sub-processors keep data in India.
6. **§8 Reliability.** Add RPO ≤ 15 minutes (PITR/WAL archiving), RTO ≤ 4 hours, encrypted backups in a separate India zone or the SDC DR site, and a DR drill every 6 months. Keep the quarterly restore test.
7. **New §11 "Ownership and exit".** The sponsor owns the source code, IPR, data and domain. Code is kept in a sponsor-controlled repository. At contract end, the operator provides a full data export (schema.sql plus data), runbooks and a 90-day handover.
8. **§4 / §6.** State GIGW 3.0 compliance for public pages, host them on a sponsor `.gov.in` subdomain, and publish website policies. Seek STQC CQW certification before public launch of the verification page.

### `docs/prd/11-integrations.md`

9. **§1 Principles — add:** "Every provider must store data at rest in India and sign a DPDP data-processing agreement. Providers that process personal data abroad need written sponsor approval and are listed in a sub-processor register."
10. **§2 WhatsApp.** Require Cloud API **local storage with `data_localization_region = IN`**, set when the number is registered (it cannot be changed later). Record that message content may be processed abroad for up to 60 minutes, and get sponsor sign-off. Alternatively, use an Indian BSP hosted on MeitY-empanelled infrastructure.
11. **§5 Maps.** Default to a self-hosted open-data geocoder (OSM/Nominatim or a government GIS such as Bhuvan / MP state GIS) inside the hosting boundary. Never send citizen addresses to foreign geocoders.
12. **§7 Identity.** The Aadhaar verification provider must be a UIDAI-licensed AUA/KUA or its sub-AUA, and must store data in India. Store only the result and masked number, as v2 already says.
13. **New row: observability / error tracking.** Self-hosted or India-region only. Scrub PII from payloads.

### `docs/prd/13-roadmap.md`

14. **Phase 0.** Change "government hosting environment" to "MPSEDC hosting request approved; empanelled-service list confirmed; NTP, 1-year log retention and CERT-In point of contact configured; CCMP drafted; SBOM pipeline in CI". Add to the exit criteria: "Hosting and CERT-In compliance checklist signed by sponsor CISO."
15. **Phase 1 exit.** Add: "CERT-In empanelled security audit certificate issued; critical and high findings closed; DR drill passed." Add a 4–8 week audit-and-remediation buffer before go-live (**UNVERIFIED** duration).
16. **Phase 2 exit.** Add: "Re-audit after major change (producer exports, SPCB data access) completed."
17. **Cross-cutting rules.** Add: "5. No new third-party service that handles personal data is used without an India-residency check and an update to the sub-processor register."

### `docs/prd/14-open-questions.md`

18. **SP-06.** Split it into:
    - (a) SDC co-location or MPSEDC-contracted empanelled cloud;
    - (b) who holds the cloud account and pays;
    - (c) whether MPPCB must route through MPSEDC;
    - (d) the named CISO / CERT-In point of contact.

    Set a decision deadline before Phase 0 starts.

---

## 6. Score

**Score: 5 / 10** for hosting, CERT-In and government-IT compliance readiness.

v2 has the right instincts: government hosting, data in India, an OSS stack, a CERT-In empanelled audit, DPDP roles and an append-only audit log. That makes it far better than a generic SaaS PRD. It falls short in four ways:

- It omits the three binding CERT-In Directions requirements (6-hour reporting, 180-day India log retention, NIC/NPL NTP).
- It treats the audit as one-time.
- Its own integrations (WhatsApp default storage, a "configurable" geocoder, SaaS vendors) contradict "data in India".
- It has no breach workflow, no MFA for officials, no RPO/RTO and no SBOM.

These are all document-level fixes that cost little now. They will be expensive if the MPSEDC audit or the hosting onboarding finds them in Phase 1.
