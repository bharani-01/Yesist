# 05 — GIGW 3.0, STQC, accessibility (RPwD / IS 17802) and language policy: does EcoSure PRD v2 comply?

**Agent:** 05 of 36 (v2 deep-research swarm)
**Date:** 2026-09-26
**PRD files reviewed:** `docs/prd/00-overview.md`, `docs/prd/04-consumer.md`, `docs/prd/12-nfr-security.md` (plus a grep across all PRD files for language and accessibility terms)
**Angle:** Guidelines for Indian Government Websites and Apps (GIGW 3.0), STQC Certified Quality Website (CQW), Rights of Persons with Disabilities (RPwD) Act 2016 and IS 17802, Official Languages Act 1963, Madhya Pradesh (MP) Official Language Act 1957, required WCAG level, mobile app rules, UMANG / MyGov / national-platform integration.

**Verdict:** v2 has the right *intent* (Hindi + English at launch, WCAG 2.1 AA mentioned, CERT-In audit, plain language, icons plus text). It does **not** yet state the obligations a state-government-owned product will be audited against. GIGW 3.0 conformance, STQC certification, a gov.in domain, IS 17802 coverage beyond web screens, accessible documents, and the Hindi-first rule for MP are all missing. **Score: 4 / 10.**

---

## 1. Sources

Items marked **UNVERIFIED** come from secondary or commercial sources, or are details I could not confirm on a primary government page.

| # | Source | URL | Used for |
|---|--------|-----|----------|
| S1 | GIGW 3.0 — Introduction (NIC / DARPG) | https://guidelines.india.gov.in/introduction/ | Scope; STQC CQW expectation; national-platform integration list |
| S2 | GIGW 3.0 — New features | https://guidelines.india.gov.in/new-features-of-gigw-3-0/ | WCAG 2.1 Level AA; 17 new success criteria; Web Information Manager (WIM) |
| S3 | GIGW 3.0 — Guidelines (full text) | https://guidelines.india.gov.in/guidelines/ | gov.in domain; emblem; minimum homepage content; bilingual + Unicode; API integration with India Portal / DigiLocker / Aadhaar / SSO / MyGov / Data Platform / MyScheme; security audit clearance; time limits; help, feedback, contact |
| S4 | GIGW 3.0 — Annexure II conformity matrix | https://guidelines.india.gov.in/annexure-ii-matrix-to-check-conformity/ | Checkpoints: "Website is bilingual with a prominent language selection link and uses Unicode"; "pages in multiple languages updated simultaneously"; security audit before production |
| S5 | GIGW 3.0 — Mobile app statements | https://guidelines.india.gov.in/new-mobile-app-statement/ | Touch targets ≥ 9×9 mm; follows device text size; localized accessibility labels; avoid session timeouts; screen-reader notifications; captions; app privacy policy; API hosting with DR |
| S6 | GIGW 3.0 — Accessibility guidelines | https://guidelines.india.gov.in/accessibility-guidelines-and-attributes/ | WCAG 2.1 success criteria as adopted |
| S7 | GIGW 3.0 PDF (S3WaaS copy, uploaded 2026-07) | https://cdnbbsr.s3waas.gov.in/s3c92a10324374fac681719d63979d00fe/uploads/2026/07/2026072438.pdf | Mandatory policies (Copyright, CMAP, Content Archival, Content Review, Hyperlinking, T&C, Monitoring Plan); WIM appointment; social-media integration |
| S8 | GIGW 3.0 PDF (2023) | https://cdnbbsr.s3waas.gov.in/s3c92a10324374fac681719d63979d00fe/uploads/2023/05/2023051731.pdf | Hindi and regional font testing; error-free language checkpoint |
| S9 | STQC — Website Quality Certification | https://www.stqc.gov.in/en/website-quality-certification-0 | CQW process; certificate valid 3 years with annual and surprise surveillance; security audit by STQC, NIC or CERT-In empanelled lab |
| S10 | Lumiverse — STQC GIGW 3.0 process guide | https://www.lumiversesolutions.com/stqc-gigw-3-0-compliance-process-guide-2025/ | **UNVERIFIED** (vendor): CERT-In VAPT is a prerequisite; about 5–6 months end to end |
| S11 | RPwD Act 2016 (text) | https://www.mssocietyindia.org/wp-content/uploads/RPWD-ACT-2016.pdf | Section 42 (accessible electronic media, captioning); Section 46 (service providers) |
| S12 | CABE Foundation — IS 17802 notified under RPwD Rules | https://www.cabefoundation.com/p/standards-for-accessibility-of-ict.html | Rule 15(1)(c)(i)–(iii); G.S.R. 359(E), 10 May 2023; IS 17802 Parts 1 and 2 mandatory for websites and apps |
| S13 | IS 17802 Part 1:2021 (BIS text) | https://broadbandindiaforum.in/wp-content/uploads/2022/08/IS-17802_1_2021.pdf | Technical adoption of EN 301 549 v3.2.1: web (clause 9), non-web documents (10), software (11) |
| S14 | NZ Government — applying WCAG to mobile apps | https://govtnz.github.io/web-a11y-guidance/ka/accessible-ux-best-practices/mobile-apps/applying-wcag-to-mobile-apps.html | EN 301 549 clause 11: all WCAG 2.1 A/AA criteria except six apply to native apps |
| S15 | Mondaq — India's evolving accessibility framework | https://www.mondaq.com/india/telecoms-mobile-cable-communications/1678740/bridging-the-digital-divide-indias-evolving-accessibility-framework | Rule 15(1)(c)(ii): documents in ePUB or OCR-based PDF |
| S16 | Supreme Court — Rajive Raturi v. Union of India (8 Nov 2024) | https://api.sci.gov.in/supremecourt/2005/9321/9321_2005_1_1503_56986_Judgement_08-Nov-2024.pdf | Rule 15 held non-mandatory; Union directed to frame mandatory accessibility rules |
| S17 | NALSAR-CDS report on ICT accessibility rules (2025) | https://cdnbbsr.s3waas.gov.in/s3e58aea67b01fa747687f038dfde066f6/uploads/2025/06/202506271799433515.pdf | Proposed rule: Accessibility Conformance Report (ACR) per product; MeitY may revoke approval of non-compliant apps; registration portal |
| S18 | halfaccessible.com — SC order of 29 Jul 2026, draft RPwD Amendment Rules 2026 | https://halfaccessible.com/rpwd-act-disability-rights-india-supreme-court/ | **UNVERIFIED** (commercial blog): draft rules published 16 Jul 2026; ACR mandatory; 12 or 18 month timelines by turnover; SC wants rule-making done within 6 months |
| S19 | Disability Rights India — SC order of 29 Jul 2026 | https://www.disabilityrightsindia.com/2026/08/supreme-court-directs-independent-state-commissioners-for-persons-with-disabilities.html | Draft ICT rules published; existing obligations "continue unabated"; next listing 20 Jan 2027 |
| S20 | Official Languages Act 1963 (Department of Official Language) | https://rajbhasha.gov.in/en/official-languages-act-1963 | Section 3(3): bilingual documents (binds the **Union** government, not a state department directly) |
| S21 | Official Language Rules 1976 (CAG copy) | https://cag.gov.in/uploads/media/Official-Language-Rules-20200728115111.pdf | Rule 3: Union communications to Region "A" states (MP is Region A) in Hindi; Rule 6: bilingual responsibility |
| S22 | MP Official Language Act 1957 (Indian Kanoon) | http://indiankanoon.org/doc/131994505/ | Hindi in Devanagari is MP's official language "for all purposes"; numeral provisions |
| S23 | Patrika — MP GAD order, January 2016 | https://www.patrika.com/bhopal-news/all-government-work-correspondence-will-be-in-hindi-5561367 | **UNVERIFIED** (news report): all technical and non-technical state work to be in Hindi; English use treated as misconduct |
| S24 | NDTV MP — e-KYC Samagra ID mandatory for schemes | https://mpcg.ndtv.in/madhya-pradesh-news/kyc-updation-for-sarkari-yojana-to-avail-the-benefits-of-government-schemes-in-mp-e-kyc-verified-samagra-id-has-now-become-mandatory-6486586 | **UNVERIFIED** (news report): MP departments told to integrate Samagra API and e-KYC-verified Samagra ID for scheme benefits |
| S25 | MP e-Service portal (MPSeDC) | https://services.mp.gov.in/eservice/ | Hindi-first state single-window portal hosted by MPSeDC |
| S26 | UMANG RFPs (NeGD) | https://negd.gov.in/wp-content/uploads/2025/04/UMANG-RFP-Final.pdf | State department onboarding through APIs, FRS documents and a SPOC |
| S27 | PIB — Bhashini and NITI Aayog statement of intent | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2298661&lang=2&reg=48 | Bhashini: 36 text and 23 voice languages; powers 800+ government websites |
| S28 | GOV.IN AppStore — App Hosting and Security Guidelines | https://www.apps.gov.in/assets/SOP/App-Hosting-&-Security-Guidelines.pdf | OWASP MASVS; security go/no-go before publication |
| S29 | CERT-In Directions, 28 Apr 2022 | https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf | NIC/NPL NTP sync; 180-day logs within India |
| S30 | Advisory OM on WhatsApp for official communication | https://nstichennai.dgt.gov.in/sites/default/files/2023-01/Advisory%20OM.pdf | Officials told to use NIC email or Sandes / Samvad, not WhatsApp, for restricted information |
| S31 | The Hindu — Maharashtra "Aaple Sarkar" WhatsApp services | https://www.thehindu.com/news/national/maharashtra/maharashtra-govt-collaborates-with-meta-to-launch-whatsapp-based-citizen-services/article69274850.ece | Precedent: a state using WhatsApp for citizen services in 3 languages, text and voice |

---

## 2. Findings

### F1. GIGW 3.0 applies, and it is an audited standard, not a design reference
- GIGW 3.0 was framed by NIC with STQC and CERT-In and adopted by DARPG. It covers websites, web portals, web applications **and mobile apps** (S1, S2).
- Organisations must assess existing and in-development sites against GIGW 3.0 and "obtain CQW certification from the STQC Directorate" (S1). CQW is valid for 3 years with annual and surprise surveillance audits (S9). A vendor estimates about 5–6 months from start to certificate (S10, **UNVERIFIED**).
- Checkpoints that bind EcoSure directly (S3, S4, S7):
  - Site on a **gov.in / nic.in** domain.
  - **State emblem or official logo** and **ownership** shown on the home page and entry screens.
  - Minimum home-page content: organisation name, about, services, Contact us, Feedback, link to india.gov.in, search or sitemap, terms and conditions.
  - A readily available **Help** section.
  - A named **Web Information Manager (WIM)**, whose contact details are published.
  - Approved policies: Copyright, CMAP, Content Archival, Content Review, Hyperlinking, T&C, Website Monitoring Plan, and a published Privacy Policy.
  - A Website Quality Manual (WQM) submitted to STQC.
  - A security audit clearance from **NIC, STQC, an STQC-empanelled lab or a CERT-In-empanelled lab** before production.

### F2. The required accessibility level is WCAG 2.1 AA as a floor, and under IS 17802 it covers more than web screens
- GIGW 3.0 "ensures conformity with Level AA of WCAG 2.1" (S2).
- RPwD Rules, Rule 15(1)(c)(iii), as amended by G.S.R. 359(E) on 10 May 2023, makes **IS 17802 Parts 1 and 2** mandatory for "websites, apps, ICT based public facilities and services" (S12).
- IS 17802 Part 1 adopts **EN 301 549 v3.2.1** (S13). That means WCAG 2.1 AA for web (clause 9), plus requirements for **non-web documents** (clause 10: PDFs, exports, attestations) and **software** (clause 11: installable or offline apps). All but six WCAG A/AA criteria apply to native apps (S14).
- Rule 15(1)(c)(ii) requires documents placed on websites to be **ePUB or OCR-based PDF** (S15).
- Enforcement is tightening:
  - *Rajive Raturi* (Nov 2024) held the old Rule 15 non-mandatory and ordered mandatory rules (S16).
  - A proposed rule would require an **Accessibility Conformance Report (ACR)** for every covered website and app, re-verified after significant changes, with MeitY able to revoke approvals (S17).
  - Draft RPwD Amendment Rules 2026 were reportedly published on 16 Jul 2026. The Supreme Court wants rule-making finished within 6 months and has listed the matter for 20 Jan 2027 (S18 **UNVERIFIED**, S19). The final rules will probably be notified **during the EcoSure pilot**.
- GIGW mobile rules add specifics (S5):
  - Touch targets at least **9×9 mm**.
  - UI follows the **device text-size setting**.
  - Accessibility labels **localized** into each UI language.
  - **Avoid session timeouts**, or offer an extension.
  - Notifications readable by screen readers.
  - Captions for audio and transcripts for video.
  - A privacy policy that lists the device resources the app uses (camera, location, storage).

### F3. Language: in MP, Hindi is the state's official language, so Hindi should be the default, not one of two peers
- The MP Official Language Act 1957 makes Hindi in Devanagari the official language "for all purposes" of the state (S22).
- A 2016 MP General Administration Department order reportedly requires all state government work in Hindi (S23, **UNVERIFIED**).
- GIGW requires sites to be **bilingual with a prominent language switch and Unicode text**. Language versions must be **updated simultaneously**, Hindi fonts must be tested across browsers, and page language must be marked in code (`lang` attribute, WCAG 3.1.1 and 3.1.2) (S3, S4, S8).
- The Official Languages Act 1963, section 3(3), binds the **Union** government (S20). It applies to EcoSure only if CPCB or MoEFCC artifacts or the planned national federation layer come into play. MP is a Region "A" state, so Union communications to it are in Hindi (S21).
- MP law's defaults on numerals are ambiguous: Devanagari numerals, with international numerals allowed by notification (S22). The product should say which numerals appear on weights, amounts and attestation numbers.

### F4. National-platform integration is expected, "as per requirement"
- GIGW 3.0 says integration with India Portal, DigiLocker, Aadhaar, SSO, MyGov, the Open Government Data platform and MyScheme "must be enabled" where relevant. The owning department decides which ones apply (S3). Social-media integration is also expected (S7).
- **UMANG** onboarding is API-based through an FRS document and a department SPOC (S26). It is optional for a pilot.
- **Bhashini** offers free machine translation, speech recognition (ASR) and text-to-speech (TTS) across 36 text and 23 voice languages (S27). GIGW 3.0 names it as the "AI-based Indian language translation tool" (S1).
- MP-specific: departments are reportedly told to use **e-KYC-verified Samagra ID** through the Samagra API for scheme benefits (S24, **UNVERIFIED**). A scheme-funded UPI incentive could fall under this directive, which conflicts with v2's phone-only, low-friction sign-in.

### F5. WhatsApp-first is acceptable for citizens but not for officials, and it is an ICT service under RPwD
- There is precedent for state citizen services on WhatsApp in Hindi, English and a regional language, by text and voice: Maharashtra's "Aaple Sarkar" (S31).
- Officials are advised to use NIC email, Sandes or Samvad rather than WhatsApp for restricted official information (S30). SPCB officer notifications should therefore not run on WhatsApp.
- IS 17802 covers "ICT based services" (S12), so WhatsApp templates need to be text-first and must not carry information only in images. A non-WhatsApp path is needed for users who cannot use it.

### F6. Adjacent obligations the PRD omits
- CERT-In Directions require NTP sync to NIC or NPL, 180-day logs kept within India, and incident reporting (S29).
- If an installable app is listed, the GOV.IN AppStore requires an OWASP MASVS security go/no-go (S28). GIGW also requires API hosting with disaster recovery at a separate geographic site (S5).

---

## 3. v2 fit (what already aligns)

| Requirement | v2 evidence | Fit |
|-------------|-------------|-----|
| Bilingual Hindi + English | `12` §4, `00` principle 6, `04` C1 | **Partial.** Bilingual intent is there. No Hindi default, no Unicode or font requirement, no simultaneous-update rule, no `lang` tagging |
| WCAG 2.1 AA | `12` §4 "WCAG 2.1 AA target for web screens" | **Partial.** Worded as a "target" and limited to "web screens". Leaves out the offline app (software), PDFs and exports (documents), and WhatsApp/SMS |
| Security audit before go-live | `12` §2.8, CERT-In empanelled auditor | **Mostly.** GIGW also accepts NIC or STQC. No re-audit rule after major releases; not tied to STQC CQW |
| Plain language, icons plus text, low-end Android, 2G/3G | `12` §4, `05` large buttons | **Good.** Supports cognitive accessibility and GIGW performance guidance |
| Data in India, state data centre | `12` §1 | **Good.** Needs DR at a separate site (S5) |
| Privacy (DPDP) | `12` §5 | **Partial.** No published privacy policy page that lists device permissions (S5) |
| Feedback | `09` G8 (SPCB only) | **Partial.** GIGW wants public feedback with a response mechanism on every page |
| DigiLocker | `11` "consider after legal review in phase 3" | **Partial.** Other GIGW platforms (OGD, MyScheme, MyGov, India Portal link, Bhashini) not addressed |
| Education videos | `04` C9, `05` Hindi videos | **Gap.** No captions or transcripts (RPwD s.42, GIGW mobile) |
| Screen states incl. offline | `04` §3 | **Good.** Add accessible announcement of state changes (WCAG 4.1.3) |

---

## 4. Gaps

1. **No GIGW 3.0 / STQC CQW requirement anywhere.** The roadmap has no certification milestone, although certification takes months and needs a WIM, a WQM and policies. Risk: the SPCB cannot formally launch or link the site, and the state IT department may block hosting.
2. **No gov.in domain, emblem or ownership rule.** "EcoSure" branding with no visible "MP Pollution Control Board, Government of Madhya Pradesh" ownership fails the GIGW identity checkpoints and weakens trust against phishing clones of the UPI incentive.
3. **Accessibility scope too narrow and too soft.** The PRD says "target" and "web screens" only. It does not cite IS 17802 or EN 301 549, and does not cover the offline app, attestation PDFs, compliance exports or WhatsApp templates. There is no ACR, no assistive-technology test plan (TalkBack on low-end Android, NVDA), and no audit gate.
4. **No accessible-document rule.** Attestations, producer exports and SPCB reports must be tagged, OCR-searchable PDF or ePUB, with the language declared.
5. **Hindi is not the default for MP.** C1 lets the user choose from "Hindi, English, corridor language". In MP the "corridor language" is Hindi, which makes the phrasing confusing. The personas file mentions a "Marathi/Hindi WhatsApp flow" for a pilot that is in Indore. The PRD has no Hindi-first ordering rule for bilingual artifacts and no numeral rule.
6. **No non-WhatsApp, non-visual path.** OTP arrives by WhatsApp with SMS fallback only. There is no **voice or IVR OTP**, no missed-call booking, and no voice notes for blind or low-literacy users. Bhashini TTS and ASR are not considered.
7. **OTP and time-limit accessibility not specified.** The PRD does not require OTP autofill or paste (WCAG 2.2 accessible authentication), any CAPTCHA to have an audio alternative, session-extension prompts, or long offline sessions for field staff.
8. **Mandatory GIGW pages and policies missing.** Help, Contact, public Feedback, T&C, Privacy, Copyright, Hyperlinking, Accessibility Statement, sitemap and search, last-updated date, and a link to india.gov.in.
9. **National and state platform integration unaddressed.** Nothing on OGD (data.gov.in) publishing of formal-network aggregates, a MyScheme listing for the incentive, MyGov for public-awareness campaigns, Bhashini, or the Samagra ID directive. Nothing on UMANG, even as an explicit "not in pilot" decision.
10. **Official-user channel.** WhatsApp alerts to SPCB and department users conflict with the advisories. Use NIC email or Sandes.
11. **Mobile-app specifics missing.** No rule on 9×9 mm touch targets, device text size, landscape and portrait support, localized accessibility labels, or which app store (Play Store under the department's account, or GOV.IN AppStore).
12. **CERT-In operational directions missing.** NTP sync, 180-day logs and incident reporting.

---

## 5. Recommended PRD changes (file + change)

| # | File | Change |
|---|------|--------|
| R1 | `12-nfr-security.md` §4 | Replace "WCAG 2.1 AA target for web screens" with: "**Must conform to GIGW 3.0 and IS 17802 Parts 1 and 2 (EN 301 549), meaning WCAG 2.1 Level AA as the minimum for web, the installable offline app (software) and all generated documents. Design to WCAG 2.2 AA where it costs little (target size, accessible authentication, focus not obscured).** Maintain an Accessibility Conformance Report (ACR), updated each major release. Test with TalkBack on a low-end Android phone and with NVDA on desktop, in Hindi and English." |
| R2 | `12-nfr-security.md` new §11 "Government web compliance" | Add these requirements: gov.in subdomain (for example `ecosure.mp.gov.in`, name to be confirmed); MP state emblem or MPPCB logo and ownership line on every entry screen; page titles ending "Government of Madhya Pradesh, India"; mandatory pages (Help, Contact, Feedback with response SLA, T&C, Privacy Policy listing device permissions, Copyright, Hyperlinking, Accessibility Statement, sitemap and search, last-updated date, india.gov.in link); a named WIM; approved CMAP, Content Archival, Content Review and Monitoring policies; a Website Quality Manual; **STQC CQW certification** before public citizen launch, with annual surveillance. |
| R3 | `12-nfr-security.md` §2.8 | Expand to: "Security audit clearance ('safe to host') from NIC, STQC or a CERT-In-empanelled auditor before production and after every major release. OWASP ASVS for web, MASVS for any app. CERT-In Directions (NTP sync to NIC/NPL, 180-day logs in India, incident reporting within the mandated window). DR site in a separate seismic zone." |
| R4 | `12-nfr-security.md` §4 (language) | Add: "**Hindi is the default UI and message language in MP corridors.** English is available through a prominent switch on every screen. Unicode Devanagari with a tested font (for example Noto Sans Devanagari); `lang` attributes on the page and on mixed-language passages. Language versions are published together and no screen ships in one language only. Bilingual artifacts put Hindi first. International numerals for weights, amounts and IDs unless the sponsor confirms otherwise. Translations reviewed by a human; Bhashini machine translation allowed only for user-generated text such as shop descriptions." |
| R5 | `12-nfr-security.md` §4 (documents) | Add: "Attestations, producer exports and SPCB reports are generated as tagged, text-based PDF/UA (or ePUB) with document language set, reading order, table headers and alt text. No scanned-image PDFs." |
| R6 | `04-consumer.md` C1 | Change to: "Language defaults to Hindi (corridor official language), with a switch to English visible on the first screen. OTP by WhatsApp, then SMS, **then a voice call reading the OTP in Hindi**. The OTP field supports SMS autofill and paste. No image-only CAPTCHA; if a challenge is needed, provide an audio or alternative challenge. Session expiry shows a warning with an 'extend' action (WCAG 2.2.1)." Replace "corridor language" with "the corridor's official language (Hindi in MP)". |
| R7 | `04-consumer.md` C5 / C9 and `05-local-recycle-shop.md` | C5: "WhatsApp templates are text-first; images and buttons never carry information that is not also in text. Status also available by SMS and on the web page." C9 and shop training: "All videos have Hindi captions and a transcript; audio description for any instructional visual step." |
| R8 | `04-consumer.md` new C12 (phase 2) | "Voice / missed-call access: a citizen gives a missed call or calls an IVR number to request a pickup callback or hear pickup status in Hindi (Bhashini TTS or recorded prompts)." Serves blind, low-literacy and non-smartphone users. |
| R9 | `11-integrations.md` | Add a "Government platforms" table: Bhashini (phase 1, translation QA and TTS); OGD data.gov.in (phase 2, formal-network aggregates in CSV with the coverage label); MyScheme listing for the citizen incentive (phase 2); MyGov for awareness campaigns (phase 2); india.gov.in link (phase 1); DigiLocker (phase 3, as now); UMANG (**not in pilot**, re-evaluate at federation); NIC email or Sandes for SPCB and department user alerts instead of WhatsApp (phase 1). |
| R10 | `14-open-questions.md` "Sponsor decisions" | Add: OQ on the gov.in subdomain and who holds the registration; OQ on whether the MP Samagra ID e-KYC directive applies to the UPI incentive (it would break phone-only sign-in); OQ on app distribution (PWA only, Play Store under the department's account, or GOV.IN AppStore); OQ on the budget and owner for STQC CQW and the ACR; OQ naming the WIM. |
| R11 | `13-roadmap.md` and `00-overview.md` §8 launch checklist | Add gates: "Accessibility audit (IS 17802 / WCAG 2.1 AA) passed with ACR published"; "Security audit clearance issued"; "STQC CQW applied for, with certification before scale-up beyond pilot"; "Hindi and English content complete and simultaneously published". Start the WQM and policies in the Wizard-of-Oz phase, because certification lead time is months. |
| R12 | `01-stakeholders-and-personas.md` | Fix the "Marathi/Hindi WhatsApp flow" persona need to "Hindi (Malwa region) WhatsApp flow" for the Indore–Pithampur pilot. Add one persona with a disability (for example a low-vision retired resident using TalkBack) and one low-literacy shop helper, so accessibility has named users. |
| R13 | `12-nfr-security.md` §3 (offline) / mobile | Add: "Touch targets ≥ 9×9 mm (about 48 dp); UI scales with device font size up to 200% without loss; works in portrait and landscape; accessibility labels localized in Hindi; sync status and errors announced to screen readers; no forced timeout during offline capture." |

---

## 6. Score

**4 / 10** for GIGW / accessibility / language readiness.

- **Credit (+):** Hindi + English at launch, plain language, icons plus text, low-bandwidth design, a WCAG 2.1 AA mention, CERT-In audit, data in India, offline states.
- **Deductions (−):** GIGW 3.0 and STQC are absent; no gov.in domain, emblem or ownership rule; accessibility is a soft "target" for web screens only, with no IS 17802, ACR, document or app coverage; no Hindi-default rule for MP; no voice path for blind or low-literacy users; mandatory policies and pages are missing; national-platform integration is unaddressed; WhatsApp is used for official users.

Applying R1–R6 and R11 would raise this to about **7.5 / 10** without adding product scope beyond the pilot. Most of the change is compliance wording, launch gates, and a voice OTP fallback.
