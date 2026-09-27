# 09 — Aadhaar and lawful micro-KYC for shop onboarding

**Agent:** 09 of 36 (v2 deep research swarm)
**Date:** 2026-09-26
**Scope:** PRD v2 requirement "Aadhaar-verified owner phone through a licensed verification provider" for micro-tier shops ([02](../../prd/02-roles-rbac.md) §4, [05](../../prd/05-local-recycle-shop.md) S1, [11](../../prd/11-integrations.md) §7).
**Not legal advice.** Findings need confirmation by the sponsoring department's legal cell and the state's UIDAI/IT nodal officer.

---

## 1. Sources

Primary (government) sources were fetched or surfaced by search on 2026-09-26. "UNVERIFIED" means I could not confirm it from a primary source during this session.

| # | Source | URL |
|---|--------|-----|
| S1 | Aadhaar Act 2016 (as amended), UIDAI | https://uidai.gov.in/images/Aadhaar_Act_2016_as_amended.pdf |
| S2 | Aadhaar and Other Laws (Amendment) Act 2019 | https://uidai.gov.in/images/news/Amendment_Act_2019.pdf |
| S3 | UIDAI circular, 25 Nov 2019: Section 7 use by State Governments (quotes Puttaswamy paras 322, 447(2)(m)) | https://www.uidai.gov.in/images/UIDAI_Circular_Guidelines_on_use_of_Aadhaar_section_7_of_the_Aadhaar_Act_2016_by_the_State_Governments_25Nov_19.pdf |
| S4 | UIDAI Circular 13 of 2025 (3 Nov 2025): Gazette notifications under Section 7 (page title only retrieved; body UNVERIFIED) | https://uidai.gov.in/en/ecosystem/authentication-devices-documents/authentication-document/19501-circular-13-of-2025-dated-03-11-2025-guidelines-on-publishing-gazette-notification-under-provision-of-section-7-of-the-aadhaar.html |
| S5 | Example State Section 7 Gazette notification (Tamil Nadu, 2024) | https://stationeryprinting.tn.gov.in/extraordinary/2024/175_Ex_II_1_2024.pdf |
| S6 | Aadhaar Authentication for Good Governance (SWIK) Rules 2020, text | https://updates.manupatra.com/roundup/contentsummary.aspx?iid=27978 ; http://it.delhigovt.nic.in/writereaddata/Odr2020842403.pdf |
| S7 | PIB: SWIK Amendment Rules 2025 notified 31 Jan 2025 | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2098223 ; https://uidai.gov.in/images/Press_Release-Aadhaar_Authentication_Good_Governace.pdf |
| S8 | SWIK Amendment Rules 2025, rule 4 and 5 text (secondary) | https://www.legitquest.com/act/aadhaar-authentication-for-good-governance-social-welfare-innovation-knowledge-amendment-rules-2025/107C1 |
| S9 | Aadhaar Good Governance Portal: how to apply, guidelines (24 Feb 2025), SOP | https://swik.meity.gov.in/how-to-apply-procedure ; https://swik.meity.gov.in/pdf/Guidelines.pdf ; https://swik.meity.gov.in/pdf/SOP_for_Pvt_Entity_proposals.pdf |
| S10 | Aadhaar (Authentication and Offline Verification) Regulations 2021, clean copy to 30 Dec 2025 | https://uidai.gov.in/images/The_Aadhaar_Authentication_and_Offline_Verifications_Regulations_2021-_Clean_copy-30122025.pdf ; https://upload.indiacode.nic.in/showfile?actid=AC_CEN_37_85_00001_201618_1517807328460&filename=aov_eng.pdf&type=regulation |
| S11 | UIDAI OVSE registration page, OVSE playbook, OVSE application form | https://uidai.gov.in/en/ovse-registration.html ; https://uidai.gov.in/images/OVSE_Playbook.pdf ; https://uidai.gov.in/images/ApplicationFormandTC.pdf |
| S12 | UIDAI Circular 14 of 2025: Aadhaar Data Vault; ADV FAQ (3 Nov 2025) | https://uidai.gov.in/images/Circular-No.14_of-2025.pdf ; https://www.uidai.gov.in/images/FAQs_Aadhaar_Data_Vault_03112025_v10.pdf |
| S13 | UIDAI AUA/KUA compliance checklist (masking, display of last 4 digits) | https://uidai.gov.in/images/Compliance_checklist_for_certifying_compliance_with_controls__that_the_AUAKUA_is_required_to_have_in_place.pdf |
| S14 | UIDAI Circular 2 of 2025: Sub-AUA/Sub-KUA approval and joint undertaking | https://uidai.gov.in/images/Circular_2_of_2025_Amended__Sub-AUA_and_Sub-KUA_application_form__Joint_Undertaking.pdf |
| S15 | AUA/KUA Agreement v4.0 (no direct API exposure to other agencies) | https://uidai.gov.in/images/resource/AUA_KUA_Agreement_v_40.pdf |
| S16 | DigiLocker Requester API spec v1.12, API Setu partner resources | https://cf-media.api-setu.in/resources/Requester-APISpecification-V1_12.pdf ; https://apisetu.gov.in/digilocker |
| S17 | NeGD RFE for DigiLocker ecosystem enablement partners (2026, via MediaNama) | https://www.medianama.com/wp-content/uploads/2026/09/e03f3d4baff2d57d1ffeb96d31f83c6a-1.pdf |
| S18 | RBI: Udyam Assist Platform for informal micro enterprises; RBI MSME FAQ | https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12500&Mode=0 ; https://www.rbi.org.in/scripts/FAQView.aspx/FAQView.aspx?Id=84 |
| S19 | IFF critique of SWIK Rules (context on voluntariness) | https://internetfreedom.in/bad-rules-for-good-governance/ |

---

## 2. Findings

### F1. Section 7 does not fit shop onboarding
Section 7 lets a State require Aadhaar authentication only "as a condition for receipt of a subsidy, benefit or service" funded from the Consolidated Fund of the State (S1, S2). It needs a scheme-specific Gazette notification, enrolment support, and alternate identification for people without Aadhaar (S3, S5). The UIDAI 2019 circular quotes Puttaswamy: "benefits" and "services" must have "the colour of some kind of subsidies", meaning welfare schemes (S3).

A shop paid per kg for collection services is a commercial counterparty, not a welfare beneficiary. So a Section 7 notification that makes Aadhaar mandatory for shops is legally weak. Citizen incentives are closer to a benefit, but they are small and the PRD rightly keeps citizens on phone OTP (OQ-20).

### F2. Voluntary authentication needs a Section 4(4)(b)(ii) / SWIK approval, which a state department can seek
Section 4(4) allows an entity to do authentication only if UIDAI finds it meets privacy and security standards, and it either has a Parliamentary law allowing it or has a purpose "the Central Government in consultation with the Authority, and in the interest of State, may prescribe" (S1). That prescription is the SWIK Rules 2020, whose rule 3 purposes include "usage of digital platforms to ensure good governance" and, since the 2025 amendment, "promoting ease of living of residents and enabling better access to services" (S6, S9). Authentication under these rules "shall be on a voluntary basis" (S6).

Process after the 31 Jan 2025 amendment (S7, S8, S9):
1. The State department (or a government organisation, routed through its parent department) submits an Appendix-1 proposal on swik.meity.gov.in with a Secretary-approved covering letter.
2. MeitY reviews and refers the proposal to UIDAI.
3. UIDAI examines it against rule 3 and the Act.
4. MeitY authorises the department.
5. The department publishes a Gazette notification for the use.

After that the programme still needs an AUA/KUA route (its own, the state's existing AUA, or Sub-AUA/Sub-KUA under an approved AUA). A non-government operator, such as a SaaS vendor, must go through the department's recommendation. Timeline: not published. A realistic estimate is several months (UNVERIFIED).

### F3. A "licensed verification provider" is not a legal category; many KYC API aggregators are not permitted routes
Appointing a third-party Sub-AUA/Sub-KUA needs prior UIDAI approval and a joint undertaking (reg. 14(1)(ga), S14). An AUA must never "expose the Aadhaar Authentication API directly to any other agency" (S15). e-KYC data shared with a Sub-KUA cannot be shared onward (reg. 16(3), S10). Press reports say MeitY acted against some identity-verification API firms in 2025 (UNVERIFIED; secondary search synthesis only). If the PRD's "licensed provider" means a private KYC API vendor, it creates legal and reputational risk for a government programme.

### F4. Aadhaar does not "verify a phone"
Yes/No authentication returns only a yes or no. e-KYC returns demographic data and a photo. Neither confirms that the phone number the shop gives EcoSure is the Aadhaar-linked mobile. OTP-mode authentication proves the person controls the Aadhaar-registered mobile at that moment, but EcoSure never learns that number. The Paperless Offline e-KYC XML carries a hashed mobile that an OVSE can check against a mobile number the holder supplies, using the share code (S11 describes XML sharing with a share code; hash-check detail UNVERIFIED in this session). So "Aadhaar-verified owner phone" should be replaced with two separate claims: "identity verified" and "phone verified by OTP".

### F5. Offline verification is the lightest lawful Aadhaar route, but it has registration and storage rules
Under the AOV Regulations as amended to Dec 2025 (S10, S11):
- There are five offline modes: Secure QR, Paperless Offline e-KYC (XML), Aadhaar Verifiable Credential through the Aadhaar App, e-Aadhaar, and paper-based.
- Reg. 16C: an OVSE must not accept Aadhaar as proof of identity "without first verifying the digital signature of the Authority" in the QR or XML. A photocopy by itself is not acceptable proof.
- Reg. 13A: OVSE registration with UIDAI is required for XML or Verifiable Credential verification. It needs a callback URL, domain, Class 3 certificate and logo, and registration is valid for 2 years. The UIDAI page lists "Central and State Government departments" as eligible.
- Offline verification must be for a lawful purpose, with consent, a success or failure notice to the holder, and a grievance mechanism (S11 form terms).
- Offline Aadhaar Data must be masked before storage (definition (mc), S10).

This route does not need a SWIK Gazette notification because it is not authentication. It still needs a lawful purpose, consent, and an offered alternative.

### F6. Masking and storage rules the PRD must reflect
- Storing the full Aadhaar number, or e-KYC XML that contains it, requires an Aadhaar Data Vault with an HSM and reference keys. Other systems may hold only tokens (Circular 14/2025, S12).
- Aadhaar numbers the user types into an authentication request must not be stored in any form (S12).
- Physical copies must have the first 8 digits redacted (reg. 14 (mb), S10, S13).
- Display is masked to the last 4 digits except for roles with a functional need (S13).
- Authentication logs must never retain the PID block (the encrypted identity data sent in a request), and must record the purpose disclosed and the consent given (reg. 18, S10).
- The PRD's "store only the verification result and masked number" is directionally correct. It is missing: consent capture, purpose disclosure, no storage of the typed Aadhaar number, and a ban on uploading Aadhaar images into "KYC documents" storage ([11](../../prd/11-integrations.md) §8).

### F7. An alternative identification route is mandatory, not optional
Section 4(6) and the Section 8(2) proviso require requesting entities to offer "alternate and viable means of identification" and to not deny service to anyone who refuses or fails authentication (S2). The PRD has no non-Aadhaar path, which conflicts with these provisions.

### F8. DigiLocker gives a consent-based route and fits a government sponsor
A government department can onboard as a DigiLocker Requester through API Setu, with NeGD approval of each use case and document type. Integration is OAuth 2.0 with PKCE, and the consent purpose can be `kyc` or `verification` (S16). NeGD is widening Requester onboarding through empanelled partners in 2026 (S17). With the holder's consent, DigiLocker can return issued documents such as a driving licence, PAN, voter ID where an issuer exists, or the Aadhaar document itself. Whether pulling Aadhaar through DigiLocker triggers the ADV obligations depends on what the program stores (UNVERIFIED; ask NeGD). Storing only the document type, issuer, a masked identifier, and the verification timestamp avoids most of that exposure.

### F9. Business-existence proofs available to non-GST micro shops
- **Udyam Assist Certificate** (Udyam Assist Platform run by SIDBI) is for informal micro enterprises without PAN or GSTIN. It is issued with help from RBI-regulated designated agencies, such as banks, and is treated at par with Udyam Registration for priority-sector lending (S18). It is useful as an optional upgrade signal and a financial-inclusion link for advances.
- **Udyam Registration** (Aadhaar-based self-declaration plus PAN), a **Shops and Establishments registration**, or a **municipal trade licence** are state-specific; availability varies by state and ULB (UNVERIFIED per corridor).
- **PAN** is verifiable through NSDL/Protean or Income Tax APIs for authorised entities (UNVERIFIED for a state programme).
- **Voter ID** is common among target owners; digital verification depends on a DigiLocker issuer being available (UNVERIFIED).
- **UPI VPA name-lookup or penny-drop** on the payout bank account confirms who will receive money. For a payments programme, that is often the most important check (see [11](../../prd/11-integrations.md) §4).

---

## 3. v2 fit

| PRD statement | Assessment |
|---------------|------------|
| "Aadhaar-verified owner phone" (05 S1) | Conceptually wrong (F4). No lawful route verifies a phone through Aadhaar except the offline XML hash, which needs OVSE registration |
| "through a licensed verification provider" (11 §7) | Undefined. It must be the state's AUA/KUA, an approved Sub-AUA/KUA, or the programme's own OVSE registration (F3, F5) |
| Aadhaar as the only micro-tier identity (02 §4) | Conflicts with the Section 4(6) and 8(2) duty to offer alternatives (F7) |
| "storing only the verification result and masked number" (11 §7) | Correct direction; incomplete on consent, purpose, logs, and document storage (F6) |
| Provisional 500 kg cap with 3-day review | Good risk control. It lowers how strong KYC must be at day 0 |
| DigiLocker deferred to phase 3 (11 §9) | Deferral makes sense for *issuing attestations*. Using DigiLocker as a *Requester* for KYC should be phase 1 or 2 |
| Section 7 not mentioned | Correct to avoid. It should be recorded explicitly as not applicable (F1) |

The strengths are the tiered and capped design, keeping GSTIN optional, and storing only the result. The weakness is that the identity requirement is written as a single Aadhaar gate that may not be lawful for a mandatory commercial onboarding. It also depends on an approval (a SWIK notification or an OVSE registration) that the phase-1 plan does not budget time for.

---

## 4. Gaps

1. No legal basis is named for Aadhaar use: Section 7, Section 4(4)(b)(ii)/SWIK, or offline verification.
2. No owner of the UIDAI relationship is named (which department or AUA), and no lead time is planned. It is not in the open questions ([14](../../prd/14-open-questions.md)).
3. No alternative identity path; this is a statutory requirement.
4. No consent text, purpose disclosure, Hindi consent language, or holder notification.
5. No rule banning Aadhaar images or photocopies in document storage, and no rule for redacting the first 8 digits if they are received.
6. The domain model ([03](../../prd/03-domain-model.md)) has `kyc_tier` but no verification-evidence entity: method, issuer, masked reference, verified_at, verifier, consent id.
7. No re-verification or revocation rule, for example when the owner changes or a UPI name mismatches.
8. The DPDP Act 2023 and DPDP Rules 2025 duties (notice, consent, retention, breach reporting) are not linked to KYC data (UNVERIFIED; Rules notification date not confirmed in this session).
9. Payout-account name match is not tied to the KYC identity (fraud path: a verified owner hands over a mule UPI ID).

---

## 5. Recommended lawful micro-KYC design

**Principle:** Aadhaar is one *optional* way to prove identity. It is never the only one, and the programme never stores the Aadhaar number.

Micro tier, day 0 (provisional, 500 kg per month):
1. **Phone OTP** (WhatsApp or SMS) proves control of the contact number. This is already in the PRD.
2. **Owner identity: the owner picks any one option.**
   - (a) DigiLocker Requester consent pull of an issued ID (Aadhaar, driving licence, PAN, or voter ID where an issuer exists). Store only the doc type, issuer, last 4 characters, name, and timestamp.
   - (b) Aadhaar offline verification: scan the Secure QR on the owner's Aadhaar letter or PVC card, or receive the Verifiable Credential through the Aadhaar App, and check UIDAI's signature. The XML or Verifiable Credential mode needs OVSE registration; confirm whether QR-only verification does. Store the result, name, and last 4 digits only.
   - (c) Assisted path: a hub or ULB field officer sees the original ID in person and records the ID type and last 4 characters with a geotagged shop photo. No image of the ID is stored.
3. **Payout binding:** the UPI VPA or bank-account holder name must fuzzy-match the verified owner name. A mismatch sends the application to operator review.
4. **Shop existence:** a signboard photo, landmark address, and a field visit or hub vouch within the 3-day review.

Standard tier (no cap): any one of Udyam or Udyam Assist certificate, Shops and Establishments registration, trade licence, or GSTIN, plus the micro-tier checks.

Online Aadhaar authentication (OTP or e-KYC) is added only if the sponsoring department gets a SWIK approval and Gazette notification and uses the state AUA. It stays voluntary even then.

---

## 6. Recommended PRD changes

| File | Change |
|------|--------|
| [05-local-recycle-shop.md](../../prd/05-local-recycle-shop.md) S1 | Replace "Aadhaar-verified owner phone" with: "Phone verified by OTP; owner identity verified by any one of DigiLocker-issued ID, Aadhaar offline (QR/App) verification, or in-person ID check by a field officer; UPI/bank holder name matches the owner." Add: "Aadhaar is never mandatory; refusing Aadhaar never blocks onboarding." |
| [02-roles-rbac.md](../../prd/02-roles-rbac.md) §4 | Micro-tier requirement becomes "Verified phone, verified owner identity (any accepted method), shop photo, name-matched UPI ID." Standard tier accepts Udyam / Udyam Assist / Shops & Establishments / trade licence / GSTIN. |
| [11-integrations.md](../../prd/11-integrations.md) §7 | Rewrite Identity: name the legal basis (offline verification under AOV Regs 2021 reg. 16B/16C, OVSE registration under reg. 13A; online authentication only after SWIK Rules approval + Gazette notification via the state AUA). Remove "licensed verification provider"; allow only state AUA/KUA, UIDAI-approved Sub-AUA/KUA, or the programme's own OVSE. Add DigiLocker Requester (API Setu, NeGD approval) as phase 1 or 2. |
| [11-integrations.md](../../prd/11-integrations.md) §8 | Add: "Aadhaar images, photocopies, XML, and full numbers are never stored. If received by mistake, they are rejected or redacted (first 8 digits) before storage. Display shows at most the last 4 digits." |
| [11-integrations.md](../../prd/11-integrations.md) §9 | Split the DigiLocker row: "issuance of attestations" stays deferred; "Requester KYC pull" moves up. |
| [03-domain-model.md](../../prd/03-domain-model.md) | Add an `identity_verification` entity: `org_id`, `person_id`, `method` (`digilocker` \| `aadhaar_offline_qr` \| `aadhaar_offline_vc` \| `field_check` \| `aadhaar_auth`), `doc_type`, `issuer`, `masked_ref` (last 4 only), `name_as_verified`, `consent_id`, `purpose`, `verified_at`, `verified_by`, `result`, `expires_at`. Must not contain an Aadhaar number column. |
| [12-nfr-security.md](../../prd/12-nfr-security.md) | Add KYC data rules: consent and purpose logs (AOV reg. 18 style), retention period, DPDP notice in Hindi and English, holder notification of each verification, grievance contact. |
| [14-open-questions.md](../../prd/14-open-questions.md) | Add: "Which department owns the UIDAI relationship (OVSE registration / SWIK proposal / state AUA)? Lead time?" and "Is QR-only offline verification permitted without OVSE registration for our use? (confirm with UIDAI)" and "Does DigiLocker pull of Aadhaar trigger ADV obligations for a Requester?" |
| [15-strengthening-changes.md](../../prd/15-strengthening-changes.md) row 4 | Note that micro KYC is "any-of" identity, not Aadhaar-only, and add the name-matched payout as a fraud control. |

---

## 7. Score

**4 / 10** for the v2 micro-KYC identity requirement as written.

The capped provisional tier, optional GSTIN, and result-only storage are good product choices (they would score about 7). The score is pulled down because the Aadhaar requirement names no legal basis, has no statutory alternative path, relies on an undefined "licensed provider" route that may not be permitted, promises a "verified phone" that Aadhaar cannot deliver, and ignores the months of UIDAI or NeGD approvals needed before phase 1. With the changes above, the design would reach about 8.
