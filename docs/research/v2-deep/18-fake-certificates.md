# 18 — Fake EPR Certificates, Paper Trading, and Capacity Inflation: Does EcoSure v2 Close the Known Fraud Patterns?

**Agent:** 18 of 36 (v2 deep-research swarm)
**Date:** 2026-09-26
**PRD files reviewed:** `07-professional-recycler.md`, `10-workflows.md`, `12-nfr-security.md` (with cross-checks against `03-domain-model.md`, `09-government.md`, `11-integrations.md`)
**Angle:** Fake EPR certificate and paper-trading scandals in India (e-waste and plastic, 2022–2026), CPCB enforcement, NGT orders, capacity-inflation cases, CPCB guidance on third-party certificates and naming. The question is whether v2's naming ("custody attestation" with a disclaimer) and its four controls (processed weight ≤ accepted weight, period total ≤ authorized capacity, duplicate-hash flag, authorization check) close these fraud patterns, and what else is needed.

**Bottom line:** The naming and disclaimer in v2 are correct and match how CPCB describes EPR certificates. The four controls, however, were designed against a fraud model ("a recycler types a larger number") that is not how Indian EPR fraud has actually happened. The documented patterns are ghost or idle plants holding real registrations, capacity inflated at the licensing stage, staged truck-and-weighbridge movements with dummy photos and invoices, end-product sales that cannot be proven, and account takeover on the credit portal. v2 catches none of these reliably, because every v2 check trusts inputs the fraudster controls: the declared capacity, the uploaded photos, and the recycler's own claim that material was "processed". **Score: 5/10.**

---

## 1. Sources

Verification status: **V** = read directly (primary document or full article text). **S** = seen only in search-result excerpts or a secondary summary. **UNVERIFIED** = LinkedIn or a single secondary source; confirm against the primary CPCB document before relying on it.

| # | Source | Status |
|---|--------|--------|
| S1 | CPCB report to NGT, EA No. 04/2024 in OA 512/2018 (*Shailesh Singh v. State of UP*), Dec 2024: e-waste EPR portal status, directions of 30-01-2024 and 19-02-2024, guidance document extracts. https://www.greentribunal.gov.in/sites/default/files/news_updates/Report%20of%20CPCB%20in%20EA%20No.%2004%20of%202024%20IN%20OA%20No.%20512%20of%202018%20(Shailesh%20Singh%20Vs.%20State%20of%20U.P%20&%20Ors.).pdf | V |
| S2 | CPCB report to NGT, OA 993/2024 & OA 926/2024 (suo motu, 6 lakh fake plastic EPR certificates), GST e-invoice API integration. https://www.greentribunal.gov.in/sites/default/files/news_updates/REPORT%20BY%20CPCB%20IN%20O.A.%20NO.%20993%20OF%202024%20&%20O.A.%20NO.%20926%20OF%202024.pdf | V |
| S3 | The Hindu, "6 lakh fake pollution-trading certificates unearthed in three States" (Jul 2024). https://www.thehindu.com/sci-tech/energy-and-environment/6-lakh-fake-pollution-trading-certificates-unearthed-in-three-states/article68401068.ece | S |
| S4 | The Hindu, "Apex pollution body battles multiple assaults on plastic waste trading scheme" (national audit of about 800 recyclers; portal hack FIR). https://www.thehindu.com/sci-tech/energy-and-environment/apex-pollution-body-battles-multiple-assaults-on-plastic-waste-trading-scheme/article68422838.ece | S |
| S5 | Indian Express, "CPCB audit finds irregularities in 3 state boards; fines 4 firms more than Rs 355 crore". https://indianexpress.com/article/cities/bangalore/cpcb-audit-finds-irregularities-in-3-state-boards-fines-4-firms-9020554/ | S |
| S6 | Hindustan Times, "NGT asks Maha to submit response on fake pollution certificates till Nov" (Jul 2024). https://www.hindustantimes.com/cities/pune-news/ngt-asks-maha-to-submit-response-on-fake-pollution-certificates-till-nov-101722447101510.html | S |
| S7 | India Legal, "NGT takes suo motu note of over 6 lakh fake EPR certificates". https://indialegallive.com/constitutional-law-news/courts-news/gujarat-fake-epr-certificates-cpcb-environmental-compliance/ | S |
| S8 | Times of India, "Cybercons hack into CPCB's portal to steal green 'credit'" (20 Jul 2024; 10,244 t of plastic EPR certificates transferred). https://timesofindia.indiatimes.com/city/delhi/cybercons-hack-into-cpcbs-portal-to-steal-green-credit/articleshow/111872537.cms | S |
| S9 | Newslaundry, "India's e-waste mirage, 'crores in corporate fraud'" (30 Jul 2025; 31 of 41 e-waste plants ghost or irregular). https://www.newslaundry.com/2025/07/30/exclusive-indias-e-waste-mirage-crores-in-corporate-fraud-amid-govt-lapses-public-suffering | V |
| S10 | Newslaundry, "India's 'missing' e-waste plants expose regulatory black hole" (8 Aug 2025). https://www.newslaundry.com/2025/08/08/exclusive-indias-missing-e-waste-plants-expose-regulatory-black-hole | S |
| S11 | Newslaundry, "Weeks after NL investigation, centre notifies audit rules" (4 Sep 2025; Environment Audit Rules, 2025). https://www.newslaundry.com/2025/09/04/weeks-after-nl-investigation-centre-notifies-audit-rules-on-e-waste-recycling-compliance | S |
| S12 | Newslaundry, "Reporter's diary: How I chased trucks…" (29 Dec 2025). https://www.newslaundry.com/2025/12/29/reporters-diary-how-i-chased-trucks-and-scaled-walls-to-uncover-indias-e-waste-recycling-fraud | S |
| S13 | CPCB, *Guidelines for Determination of Processing Capacity of E-Waste Recycling Facility by SPCBs/PCCs* (4 Nov 2024). Mirror: https://img1.wsimg.com/blobby/go/0410bb8b-c9b9-493e-93f5-94a1728a718a/downloads/a65aae82-f59b-4527-bcc4-03d62e0b30bb/Guidelines%20for%20Determination%20of%20Processing%20Cap.pdf ; summaries: https://www.teamleaseregtech.com/updates/article/36829/ , https://lexplosion.in/cpcb-issues-guidelines-for-determination-of-processing-capacity-of-e-waste-recycling-facility-by-spcbs-pccs-recyclers-to-maintain-record-of-recycling-process-and-various-products/ | S (mirror, not cpcb.nic.in) |
| S14 | CPCB, *SOP for E-waste Recycler registration* (Oct 2024): geotagged video that must stay live, self-declaration. https://asocmms.nic.in/OCMMS/SPCB_DOCUMENTS/SOP_for_Ewaste_Recycler.pdf | S |
| S15 | CPCB, *Guidance document for generation and transfer of EPR Certificate (E-Waste)*. Mirror: https://img1.wsimg.com/blobby/go/0410bb8b-c9b9-493e-93f5-94a1728a718a/downloads/Guidance%20document%20for%20E-Waste%20-%20generation%20and.pdf ; also reproduced in S1 | V (via S1) |
| S16 | Lexplosion, CPCB EC guidelines under E-Waste (M) Rules 2022, Rule 22(2), 22(5). https://lexplosion.in/cpcb-issues-guidelines-for-environment-compensation-to-be-levied-for-violation-of-various-provisions-of-e-waste-management-rules-2022/ | S |
| S17 | TeamLease RegTech, CPCB direction of 19 Feb 2024 on e-waste EPR certificate generation. https://www.teamleaseregtech.com/updates/article/30204/cpcb-issued-a-direction-for-ensuring-the-generation-of-epr-certificate/ | S |
| S18 | LinkedIn posts on the CPCB direction dated **07-07-2026**: GST e-invoices mandatory for e-waste recovered-material sales; certificates backed by other invoices may be treated as false. https://www.linkedin.com/posts/mitcon-eme_cpcb-direction-dated-07072026-activity-7483841148462174208-IpRI ; https://www.linkedin.com/posts/rohit-kr-d-771991112_direction-to-spcb-activity-7483022697245974528-98iW | **UNVERIFIED** (primary CPCB PDF not located) |
| S19 | LinkedIn post: CPCB show-cause notices to 11 plastic waste processors, 8 Apr 2025, after a GST e-invoice review; credit generation blocked. https://www.linkedin.com/posts/ekta-pundir-27b2a91b6_epr-plasticwaste-cpcb-activity-7320751122439094272-OMxv | **UNVERIFIED** |
| S20 | CPCB plastic EPR portal, list of plastic waste processors with registered capacity and environmental compensation (EC) amounts. https://eprplastic.cpcb.gov.in/plastic/downloads/PDF_III_merged.pdf | V (the list's basis for EC is not stated in the extract) |
| S21 | TeamLease RegTech, CPCB public notice of 29 Jan 2024 on fraudulent impersonators: CPCB has appointed no consultants. https://www.teamleaseregtech.com/updates/article/39079/cpcb-warns-against-fraudulent-impersonators-and-fake-notices/ | S |
| S22 | MPCB SOP for PIBO registration: PIBOs "shall not deal with any entity not registered through on-line centralized portal"; only certificates from registered processors count. https://www.mpcb.gov.in/sites/default/files/standing_orders/SOP_PIBOS_0001.pdf | S |
| S23 | LinkedIn summary of the NGT e-waste national status hearing (12 Feb 2026; next date 21 May 2026). https://www.linkedin.com/posts/skmishraadvocate_ngt-nationalgreentribunal-ewaste-activity-7430180383817646080-zeh4 | **UNVERIFIED** |
| S24 | The420.in, "₹1,800-crore e-waste scam" (secondary coverage of S9). https://the420.in/india-e-waste-recycling-scam-ghost-plants-epr-credits/ | S |

---

## 2. Findings

### F1. Plastic EPR, 2023–24: about 6 lakh fake certificates from capacity inflation and plants that never processed anything
- In CPCB random audits in August 2023, four plastic waste processors were found to have generated EPR certificates far beyond their physical capacity (S3, S5, S2):
  - Enviro Recyclean (Karnataka): 3,50,000 t "without any actual processing".
  - Shakti Plastics (Palghar): 2,56,240 t against 17,760 TPA; "plant has not commenced its operation"; 40 workers against 125 declared.
  - Technova (Gujarat): 92,500 t against 4,700 TPA.
  - Asha Recyclean (Gujarat): 11,482 t in excess of capacity; 8 workers against 30.
- EC above ₹355 crore was levied (S5). CPCB directed on 26-10-2023 suspension, one-year debarment (clause 11.4 of the EPR guidelines), and EC "corresponding to the quantum of EPR certificates generated not in conformity" (S2).
- The tell-tale signals were a headcount mismatch against the application, output beyond installed capacity, and **no proof of sale of the recycled product** (S3).
- Insiders said SPCB verification "rarely happens"; firms upload details and are "verified without checks" (S3).
- The NGT took suo motu cognisance in July 2024 (OA 993/2024, OA 926/2024) and directed CPCB to report on plugging the loopholes (S6, S7, S2).

### F2. E-waste EPR, 2025: ghost plants holding valid registrations
- Newslaundry ground-verified 41 CPCB-registered e-waste plants in UP, Haryana, Uttarakhand, and Rajasthan (S9, S10, S12):
  - **31 were inactive, non-existent, or irregular**, and 7 were missing or shut.
  - Together they were authorised for 8.49 lakh t/yr (about ₹1,800 crore of credits), roughly one-third of formal capacity.
  - Some had been "inspected and approved twice".
- Mechanics observed:
  - **Trucks shuttling between the plant and a nearby dharmkanta (weighbridge) within 1 km**, with workers photographing trucks at the gate: staged inbound evidence.
  - Recycled output masked as incoming scrap by layering discarded ACs and fridges on top, which inflates the declared input.
  - **Capacity raised on paper** at a shut plant with SPCB approval (Pegasus, Bulandshahr).
  - A plant approved far above its infrastructure (Uttarakhand).
  - A plant that had shut still showing as authorised on the CPCB portal (Greenscape's second plant).
- Credits were sold at ₹6–8/kg, against a ₹22/kg floor price (S9).
- The Haryana SPCB told the NGT that all its units were compliant, which the ground findings contradict (S9).
- Response: MoEFCC notified the Environment Audit Rules in September 2025. Registered third-party auditors can now audit EPR compliance for CPCB and SPCBs (S11).

### F3. CPCB's e-waste countermeasures, 2024–2026: evidence of outputs, verified capacity, and GST linkage
- The direction of 30-01-2024 required SPCBs to physically verify recyclers' GPS location, geotagged photos and video, EEE-code-wise inputs, installed machinery, and actual capacity. SPCBs must act where portal details are false "so as to ensure that no false EPR Certificate is being generated" (S1).
- The direction of 19-02-2024 required SPCBs to issue notices and withdraw CTO where recyclers are not uploading invoices. They must also verify procured, recycled, end-product, and sold quantities, and "installed plant & machinery and their capacities" (S1, S17).
- A 2021 direction under the Water and Air Acts, reproduced in S1, requires **randomised, transparently selected audits** with material balance of input against output. Recovered metals must be **correlated with GST paid**.
- The capacity guidelines of 4 Nov 2024 (S13):
  - CTO capacity is based on installed machinery, capped at 20 h/day, and set by the bottleneck stage.
  - A minimum machinery list includes a **weighbridge** and a shredder.
  - Separate recycling and refurbishing capacities are required.
  - Stage-wise input and output records must be kept.
- The Oct 2024 SOP (S14) requires a geotagged video link that must stay live after registration. An inactive link "will be considered as willful concealment".
- The portal already enforces "do not procure e-waste per annum more than total processing capacity" at data entry (S1/S15). **v2's capacity cap therefore duplicates a check CPCB has had since 2023, and that check did not stop F2.**
- Portal workflow (S15): procurement invoices, then end products (Fe, Cu, Al, Au), then **GST-linked sales invoices**, then certificate generation.
- A direction dated 07-07-2026, reported by several consultants, makes GST e-invoices mandatory for recovered-material sales. Certificates backed by other invoices "may be treated as false" (S18, **UNVERIFIED**).
- For plastic, GST e-invoice upload has been required since 21-12-2022 and is auto-validated via the GST API (S2). CPCB blocked credit generation for 11 processors in April 2025 after a GST e-invoice review (S19, **UNVERIFIED**).

### F4. Penalties and naming: only CPCB generates EPR certificates, and third-party "certificates" have no standing
- E-Waste Rules 2022, Rule 14: **CPCB generates** EPR certificates through the portal in favour of registered recyclers (S1, S15). Rule 22(2) and 22(5): EC for "transaction or use of false EPR certificate". Over-generation through false information means revocation, and three offences mean permanent revocation (S16). False information can also bring revocation of up to three years (S15).
- For plastic, PIBOs "shall not deal with any entity not registered" on the portal, and only certificates from registered processors count (S22).
- CPCB's 29-01-2024 notice says it has "not appointed any consultants". Impersonators should be reported to the CVO (S21).
- **No CPCB guidance was found that specifically regulates or names third-party "attestations".** v2's disclaimer wording ("not an EPR certificate… generated only on the CPCB EPR portal") matches the legal position in S1 and S15. However, a document issued by a government programme that carries tonnage and a verify-by-number page is the kind of artefact a producer or consultant may try to pass off as EPR evidence. The disclaimer protects EcoSure; it does not stop misuse (inference).

### F5. Account takeover and credential theft are an active attack on EPR registries
- Plastic EPR portal hack, 18–20 Dec 2023, the annual-return deadline: **10,244 t of certificates transferred** after PIBO login credentials were altered. There is a Delhi Police FIR, six beneficiary firms, two intermediaries, and a "major rehaul" of portal security (S8, S4).
- For EcoSure: an attestation-issuing account protected only by a phone OTP (v2 §7 Identity) is a SIM-swap and OTP-phishing target. Issuance spikes near filing deadlines are an attack indicator (inference from S8).

### F6. The regulator is under-resourced, and the EcoSure SPCB dashboard inherits that weakness
- MoEFCC cited "constraints in terms of manpower, resources, capacity" (S11). SPCB affidavits gave blanket compliance reports (S9). About 295–353 e-waste recyclers are registered nationally (S1, S9).
- NGT e-waste monitoring continues in 2026, with CPCB directed to file further status reports (S23, **UNVERIFIED**).
- v2 gives SPCB users flags and read-only inspection notes. Flags without **inspection selection, outcomes, and closure SLAs** repeat the "flagged but never checked" failure.

### F7. Local relevance to the Indore pilot
- The CPCB plastic EC list (S20) includes at least one Indore processor (Sanwer Road). The basis of the EC is not stated in the extract, and this is **not evidence of certificate fraud**. It does show that Indore sits inside the same enforcement landscape, and the pilot's single recycler is a concentration risk: one bad actor means the whole corridor's attestations are tainted.

---

## 3. How well v2 fits the known fraud patterns

| # | Known fraud pattern (source) | v2 control | Does it close it? | Why |
|---|------------------------------|-----------|-------------------|-----|
| P1 | Output beyond real capacity (F1) | Period total ≤ authorized capacity (R4, §7) | **Partially / weakly** | The cap uses the *declared* capacity, which F2 shows is itself inflated (capacity raised on paper). EcoSure sees only EcoSure lots, a small share of the recycler's throughput, so the cap will almost never bind. The period is undefined (FY? monthly pro-rata?). The CPCB portal already has this check, and it failed. |
| P2 | Ghost or idle plant with valid registration (F2) | Authorization check at onboarding against the CPCB list (R1) | **No** | A paper check against a list the ghost plants are on. There is no site verification, no re-verification, and no signal from the CPCB portal on suspensions. "Expired" is handled; "suspended" or "revoked" mid-validity is not. |
| P3 | Staged trucks, weighbridge slips, dummy photos (F2) | Dual weighing with photos (§7), duplicate hash | **Partially** | This is EcoSure's structural strength: material must originate from **citizen pickups → shop → hub**, with counter-party weights. That is far harder to fake than a recycler's self-declared procurement. But the photos are exactly what F2 fraudsters stage, the SHA-256 duplicate check catches only byte-identical files, and there is no vehicle, e-way bill, or GPS consistency check. |
| P4 | Input padding: output re-counted as input, or non-chain material mixed in (F2) | Processed ≤ accepted | **Partially** | This stops attesting more than was received from EcoSure. It does not stop a hub or shop adding unsourced material to a lot (lot weight > sum of pickups) to inflate "citizen-sourced" tonnage. |
| P5 | No proof of end-product sale / "processed" is only a claim (F1, F3) | None: "processed" is a recycler assertion | **No** | CPCB now treats output evidence (GST e-invoiced end-product sales) as the anchor. v2 attests "processed" with no mass balance (fractions + residue + hazardous waste sent to TSDF ≈ input), no processing date window, and no output reference. |
| P6 | Double counting: the same kg backs an EcoSure attestation for Producer A and a portal certificate sold to Producer B (inference from F4) | Optional CPCB portal reference (R4). Note that `11-integrations.md` §6 says phase 3 while `07` implies phase 1 | **No** | There is no rule that each kg is attributed to only one producer across both systems. The portal reference is optional and unreconciled. |
| P7 | Forged or altered attestation PDF (F4) | Public verify-by-number, SHA-256 hash | **Mostly yes** | Verify-by-number returns canonical database data. This needs a QR code to the verify URL, a server signature over canonical fields, and a verify page that shows status prominently. Without them, a doctored PDF with a real number and altered weight still fools a reader who doesn't click through. |
| P8 | Account takeover and deadline-time transfer (F5) | Phone OTP, audit log | **No** | There is no step-up authentication for issuance, no dual control, no device binding, and no issuance-velocity alert. |
| P9 | Misrepresentation of a programme document as an EPR certificate (F4) | Name "custody attestation" plus mandatory disclaimer | **Yes, mostly** | Correct and legally aligned. Remaining risks: government emblem or logo placement, the word "attested" read as "certified", evidence packs forwarded out of context, and producer exports lacking the disclaimer on every page. |
| P10 | Flag raised, nobody inspects (F6) | SPCB flags plus append-only notes | **No** | There is no randomised inspection selection, outcome state, SLA, or consequence (for example, freezing issuance). |
| P11 | Fraud discovered later with no retroactive remedy (F1: EC tied to "quantum of certificates") | Supersede only | **No** | There is no `suspended` or `revoked` attestation status, no freeze of an issuer, and no notice to producers who used affected attestations. |

**Overall:** v2 closes P7 and P9 well and P3/P4 partially. That is thanks to the citizen-origin chain, which is a real advantage over the CPCB self-declaration model. It does not close P1 in practice, and it does not close P2, P5, P6, P8, P10, or P11.

---

## 4. Gaps

1. **Capacity source and period are undefined.** Self-declared or CPCB-list capacity is the value fraudsters inflate. The PRD should use the **SPCB CTO capacity verified under the Nov 2024 guidelines** (S13), pro-rated per month, and add a utilization-share signal.
2. **There is no physical-existence verification.** Onboarding is a desk check. There is no geotagged site visit by the operator, no check that the CPCB-required live video link still works, and no periodic re-verification.
3. **There is no registration-status monitoring beyond expiry.** Suspension, CTO withdrawal, and one-year debarment during the validity period are not modelled (the `organizations.status` enum has `suspended`, but nothing drives it from regulator action).
4. **There is no output-side evidence.** "Processed" is unevidenced. There is no mass balance, no end-product fraction record, no hazardous-residue record, and no GST e-invoice reference (IRN).
5. **The duplicate-hash check is too narrow.** SHA-256 over the attestation document catches only exact reuse. Reused weighbridge slips, re-used photos (perceptual hashing), repeated vehicle numbers, and implausible trip timing are not checked.
6. **Lot mass balance upstream is missing.** Lot weight is never reconciled with the sum of its pickup weights. Unsourced material can be laundered into "citizen-sourced" tonnage.
7. **There is no cross-system single-attribution rule.** The CPCB portal reference is optional and its phase is inconsistent (07 vs 11). There is no reconciliation of attested kg against portal certificates.
8. **The issuance authentication is weak.** Phone OTP alone protects a high-value action. There is no maker-checker, no digital signature (DSC) or eSign, and no velocity or deadline-spike alerts.
9. **The attestation lifecycle is incomplete.** Only `issued` and `superseded` exist. `suspended`, `revoked`, and `under_review` states are needed, along with public display and producer notification.
10. **SPCB flags have no consequence loop.** Randomised inspection sampling, inspection outcomes, auto-freeze on a critical flag, and SLA tracking are missing.
11. **There are misuse-resistance gaps.** The artefact needs a watermark, a statement that it is non-transferable and not tradeable, per-page disclaimers on producer exports, a policy on the state emblem, and a public "report misuse" route.
12. **The pilot has a concentration risk.** A single recycler per corridor is a single point of trust failure. There is no contingency if it is suspended.

---

## 5. Recommended PRD changes (file + change)

| # | File | Change |
|---|------|--------|
| C1 | `07-professional-recycler.md` R1; `03-domain-model.md` §statutory registration; `12-nfr-security.md` §7 | Capacity for the cap is the **SPCB CTO recycling capacity (TPA)**, with the CTO document and issue date recorded separately from CPCB registration. Store `cto_capacity_tpa`, `cto_valid_to`, and `capacity_source`. The cap is monthly: EcoSure attested kg ≤ (CTO TPA ÷ 12) × a configurable utilization ceiling (default 0.85). A flag also opens when EcoSure share exceeds a threshold of declared capacity or grows more than X% month-on-month. Any capacity increase requires a new CTO upload plus operator re-verification before it takes effect. |
| C2 | `07` R1 (new acceptance criteria); `09-government.md` | **Physical verification before approval and every 6 months:** an operator or SPCB-nominated geotagged site visit with timestamped photos of the machinery listed in the CPCB minimum list (shredder, weighbridge, separators), plus a headcount and a check that the CPCB-mandated live video link works. Record it as a `site_verification` entity. Approval is blocked without one, and issuance is frozen when a re-verification is overdue. |
| C3 | `07` R1; `03` domain model; `10-workflows.md` §6 | **Registration-status states** `active`, `suspended`, `revoked`, `debarred`, `expired`, each with the regulator reference and date. SPCB users (and the operator on regulator notice) can set `suspended` or `revoked` with a reference number. Issuance blocks immediately, and the attestations from the look-back window are marked `under_review` (see C6). |
| C4 | `07` R4; `10` §6; `03` | **Output evidence before issue.** A per-lot or per-batch processing record with input kg, output fractions (Fe, Cu, Al, precious-metal-bearing fractions, plastics), residue, and hazardous waste sent to TSDF (with manifest number). A mass-balance tolerance is configurable. There is an optional-then-mandatory **GST e-invoice IRN reference** for end-product sales when the CPCB 07-07-2026 direction is confirmed (S18). The processing date must fall within the recycler's inbound date plus a configurable window. |
| C5 | `07` R4/R7; `10` §8; `11-integrations.md` §6 | **Single-attribution rule:** each attested kg can be attributed to at most one producer across EcoSure evidence packs. For evidence-pack inclusion after N days (default 90), the CPCB portal reference moves from optional to **required**, and a reconciliation flag opens when portal-referenced tonnage for a period is less than EcoSure attested tonnage. Fix the phase inconsistency: the reference field is phase 1 (manual entry) and automated lookup is phase 3. |
| C6 | `07` R4/R5; `03`; `10` §6 | **Attestation lifecycle:** `issued`, `superseded`, `under_review`, `revoked`. Revocation requires a reason and a regulator or operator reference. The public verify page shows the status as a banner. Producers holding affected attestations in evidence packs get automatic notice, and the next export excludes them. |
| C7 | `12-nfr-security.md` §2/§7; `02-roles-rbac.md` | **Issuance hardening:** maker-checker, meaning two distinct recycler members (preparer and authorised signatory named in the CPCB registration). Issuance requires step-up authentication (a device-bound credential or Aadhaar eSign, with OTP-only not allowed). Every attestation is server-signed over its canonical fields. There are velocity alerts (issuance count or kg over a rolling baseline, and spikes in the 10 days before EPR filing deadlines). The org owner is notified out-of-band on each issuance. |
| C8 | `12` §7; `09` flags; `03` compliance flag enum | **Broaden duplicate detection** beyond document SHA-256: perceptual hashing of weigh and bag photos across lots, uniqueness of weighbridge slip numbers per weighbridge, repeated vehicle numbers with implausible cycle times, photo EXIF/geofence mismatch against the registered site, and an e-way bill number on hub-to-recycler trips (where applicable) checked for vehicle and weight consistency. New flag types: `photo_reuse`, `slip_reuse`, `vehicle_anomaly`, `geofence_mismatch`, `mass_balance`, `lot_padding`. |
| C9 | `10` §4/§5; `12` §7 | **Lot mass balance:** lot sender weight must reconcile with the sum of constituent pickup weights within tolerance. The excess is recorded as "non-chain material" and **cannot be attested as citizen-sourced**. Attestations show citizen-sourced kg and other kg separately. |
| C10 | `09-government.md`; `10` §9 | **Inspection loop:** a randomised monthly inspection sample (seeded, logged, reproducible, so selection is transparent, matching the CPCB direction in S1), weighted by flag severity. An inspection has outcome states `pass`, `observations`, `fail`. A `fail` or an unresolved critical flag after the SLA freezes issuance. Environment Audit Rules 2025 auditors (S11) are added as an optional read-only auditor role. |
| C11 | `07` R4/R5/R7; `10` §6/§8 | **Misuse resistance:** a diagonal "NOT AN EPR CERTIFICATE" watermark, and a QR code to the canonical verify URL on every page. The disclaimer appears on every page of producer exports and evidence packs. The text states the attestation is non-transferable and not tradeable. The state emblem is not used on attestations (department name only, per sponsor legal review). A public "report suspected misuse" form files to the operator queue. |
| C12 | `00-overview.md` risks; `13-roadmap.md` pilot gates | **Concentration and kill criteria:** at least two authorised recyclers per corridor before scale-up, or a documented contingency. Kill or pause if any recycler in the corridor is found by CPCB/SPCB to have generated false EPR certificates. Add the risk "Recycler later found fraudulent; EcoSure attestations cited as legitimacy" with mitigations C2, C3, and C6. |

---

## 6. Score

**5 / 10** for how well v2 closes the known Indian fake-certificate and paper-trading patterns.

- **In v2's favour:**
  - The naming and disclaimer are legally correct (P9).
  - Verify-by-number defeats simple forgery (P7).
  - The citizen → shop → hub → recycler chain with counter-party weights is structurally stronger than CPCB's recycler self-declaration model, which is where F1 and F2 fraud entered (P3, P4 partially).
- **Against v2:**
  - The capacity cap trusts the inflatable number and duplicates a portal check that already failed.
  - Authorization is a desk check against a list that includes ghost plants.
  - "Processed" has no output evidence.
  - Nothing prevents double counting against portal certificates.
  - OTP-only issuance invites the account-takeover pattern already seen on the CPCB portal.
  - There is no revoke or suspend lifecycle and no inspection consequence loop.

With C1–C8 the score would reach about 7.5. C9–C12 would push it to about 8.5. Beyond that the limit is external: EcoSure can't see a recycler's non-EcoSure throughput or its CPCB portal activity without a CPCB data feed.
