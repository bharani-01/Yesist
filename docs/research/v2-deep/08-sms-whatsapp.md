# 08 — SMS (TRAI DLT / NIC) and WhatsApp for a State Programme

**Agent:** 08 of 36 (v2 deep-research swarm)
**Date:** 2026-09-26
**Scope:** PRD v2 `11-integrations.md` §2–3, `10-workflows.md` §10, with cross-reference to `12-nfr-security.md` §5 and `13-roadmap.md`.
**Question:** Is WhatsApp-first (OTP + templates + inbound keywords, SMS fallback) acceptable for a state e-waste programme in India?

**Short answer:** Yes, with conditions. There is strong precedent (MyGov Helpdesk, Andhra Pradesh "Mana Mitra"), and nothing in the government security advisories bars citizen-facing transactional messages on WhatsApp. But the PRD as written would stall or cost more than it should at onboarding. Meta only lets government entities use the platform through a Solution Provider after a separate government approval. SMS is cheaper than WhatsApp for a government sender and is the only channel that reaches feature-phone users. Data residency has to be switched on explicitly. The October 2026 pricing change makes keyword replies billable. The largest real risk is scam messages impersonating incentive payouts.

---

## 1. Sources

Marked **[V]** where the claim was read directly from the primary or official page. Marked **UNVERIFIED** where it comes only from a secondary summary, an undated document, or my own inference.

### TRAI / DLT / SMS
1. TRAI, *Advice to Senders* (PE, header, content template, consent template obligations). https://www.trai.gov.in/advice-to-senders [V]
2. TRAI, TCCCPR Amendment Regulations, 12 Feb 2025 (defines "Government Message"; header suffixes -P/-S/-T/-G; annual self-certification). https://trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf [V]
3. TRAI Direction, 18 Nov 2025: mandatory pre-tagging of variables in SMS templates; rejection after 60-day logger period. https://www.trai.gov.in/sites/default/files/2025-11/Directions_18112025_0.PDF [V]
4. TRAI Press Release No. 133/2025 (same direction, plain-language). https://www.trai.gov.in/sites/default/files/2025-11/PR_No.133_of_2025.PDF [V]
5. Reliance Jio, Code of Practice for Entities (Sep 2024): government headers are registered in the agency's name; no ₹0.05 service charge for Central/State govt; ₹0.02 termination still applies. https://myjiostatic.cdn.jio.com/jio/regulatory/RJIL_CoP_Entities_Sep24.pdf [V]
6. TRAI 5-paisa exemption portal (Regulation 35). https://exemption.trai.gov.in/ [V]
7. TRAI Portal & Apps (Header Information Portal lets citizens look up a sender header). https://trai.gov.in/portal-and-apps [V]
8. Communications Today, all TSPs implemented -P/-S/-T/-G suffixes. https://www.communicationstoday.co.in/suffix-system-on-sms-headers-implemented-threat-from-ott-remains/ [V]
9. Zoho, suffix effective 6 May 2025, appended by the TSP during DLT scrubbing. https://help.zoho.com/portal/en-gb/community/topic/important-update-trai-mandates-new-sms-header-format [V]

### Government SMS gateways
10. Kerala IT Mission, *Process to avail NIC SMS Services* (eForms onboarding, 6-letter sender ID, DLT PE/header steps, rates). https://itmission.kerala.gov.in/sites/default/files/Projects/Reports/NIC%20SMS%20Rates.pdf [V, document undated, so treat the rates as **UNVERIFIED as current**]
11. C-DAC Mobile Seva, *A brief guide to eSMS Gateway / DLT registration*. https://esms.mgov.gov.in/Resources/SMS_DLT_reg.pdf [V]
12. C-DAC Mobile Seva services (push, pull SMS, IVRS). http://esms.mgov.gov.in/Services [V]
13. DIGIT (eGov) NIC SMS integration: endpoint `https://smsgw.sms.gov.in/failsafe/MLink`, entity ID + template ID required. https://docs.digit.org/complaints-resolution/deploy/configure/sms-and-email/nic-sms-integration [V]
14. NICSI tender *Message Gateway Services 2024/06*, vendor empanelment for GoI message gateway. https://www.tendershark.com/details/delhi-tender/national-informatics-centre-services-incorporated/afbc1ccd-acf1-47c4-a1ab-f7d3209ff58d (secondary aggregator; **UNVERIFIED** whether it covers WhatsApp)

### WhatsApp: government policy, onboarding, pricing, residency
15. WhatsApp Business Policy, *Policy on Government and Political Use*. https://whatsappbusiness.com/policy/ [V]
16. 360dialog, *Government agencies* onboarding (Meta approval before WABA; Classic Business Verification only; up to 14 days). https://docs.360dialog.com/docs/resources/government-agencies [V, BSP documentation]
17. Route Mobile, *Government use case request manual* (PII cannot be requested in templates). https://developer.rmlconnect.net/route-mobile-project/docs/government-use-cases-request-manual [V, BSP documentation]
18. Meta for Government, *WhatsApp account* (Business Platform requires a Solution Partner; setup "from three weeks"). https://en-gb.facebook.com/government-nonprofits/resources/basics/whatsapp-account [V]
19. Meta, *Pricing on the WhatsApp Business Platform* (per-message pricing, volume tiers, INR billing localisation; non-INR WABAs of Indian customers stop delivering on 1 Jan 2027). https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing [V]
20. Gupshup, *INR rates effective 1 Jan 2026* (India: marketing ₹0.8631, utility/authentication ₹0.115). https://www.gupshup.ai/resources/wp-content/uploads/2025/12/INR_Jan2026.pdf [V]
21. Xobito, *Service message pricing from 1 Oct 2026* (service replies ₹0.115 after 1,000 free per number per month; in-window utility no longer free). https://xobito.com/blog/whatsapp-service-message-pricing-october-2026 (secondary. Also corroborated by SleekFlow https://sleekflow.io/blog/whatsapp-business-template. **UNVERIFIED against the Meta rate card itself**)
22. Happilee, India volume tiers 2026 (authentication discounts start above 7.5 lakh/month; utility above 2.5 crore/month). https://happilee.io/whatsapp-business-api-volume-tier-pricing-india/ (secondary)
23. Meta, *Cloud API local storage* (`data_localization_region: "IN"`; data-in-use abroad up to 60 min). https://developers.facebook.com/documentation/business-messaging/whatsapp/local-storage/ [V]
24. 360dialog, *Local storage* (default region is US; not supported for coexistence numbers). https://docs.360dialog.com/docs/hub/local-storage [V]
25. Meta, *Copy code authentication templates* (preset text only; no URLs/media/emoji; expiry 1–90 min). https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/copy-code-button-authentication-templates [V]
26. Zoye, *WhatsApp templates 2026* (24-h window; template pause 3 h → 6 h → disabled; per-user marketing caps). https://www.zoye.io/blog/whatsapp-message-templates (secondary)

### Government precedent, security, fraud, telecom rules
27. PIB, MyGov Helpdesk on WhatsApp (+91 9013151515) offering DigiLocker, May 2022. https://www.pib.gov.in/PressReleasePage.aspx?PRID=1827554 [V]
28. The Hindu, AP launches "Mana Mitra" WhatsApp Governance, 161 services, 30 Jan 2025. https://www.thehindu.com/news/national/andhra-pradesh/andhra-pradesh-govt-launches-mana-mitra-governance-161-civil-services-to-be-delivered-through-whatsapp/article69160197.ece [V]
29. New Indian Express, AP signed agreement with Meta on 22 Oct 2024; 200 services by Mar 2025. https://www.newindianexpress.com/states/andhra-pradesh/2025/Mar/07/ap-expands-whatsapp-governance-mana-mitra-services-to-200 [V]
30. The Hindu, Mana Mitra to 500 services; Maharashtra adopting similar. https://www.thehindu.com/news/national/andhra-pradesh/more-whatsapp-based-public-services-by-june-says-andhra-pradesh-it-minister-lokesh/article69345000.ece [V]
31. GoI Office Memorandum, *Communication Security Advisory for Government Officials* (no classified info on WhatsApp/Telegram; use NIC email / Sandesh / Samvad for Confidential and Restricted). https://nstiwkolkata.dgt.gov.in/sites/default/files/2022-02/Advisory%20OM.pdf [V]
32. The Hindu, I&B Ministry advisory (same guidance). https://www.thehindu.com/news/national/dont-share-top-secret-information-over-internet-ib-ministry-tells-its-officials/article65062137.ece [V]
33. DoT/PIB, SIM-binding directions to WhatsApp and others, 28 Nov 2025 (app bound to active SIM; web sessions logged out ≤ 6 h). https://www.pib.gov.in/PressReleasePage.aspx?PRID=2197146 and https://www.dot.gov.in/static/uploads/2025/12/4599a9925468a2648d43e3ff724e7f0c.pdf [V]. Current enforcement status in Sept 2026: **UNVERIFIED**.
34. PIB, Telecom Cyber Security Amendment Rules 2025 (TIUE, Mobile Number Validation platform). https://www.pib.gov.in/PressReleasePage.aspx?PRID=2195208 [V]
35. MeitY, DPDP Rules 2025 (notified 13/14 Nov 2025; Rules 3, 5–16 in force 18 months later ≈ 14 May 2027; Rule 15 cross-border transfer). https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa and full text https://hexlex.in/digital-personal-data-protection-rules-2025/ [V]
36. MoSPI via PIB, *Comprehensive Modular Survey: Telecom 2025* (85.5% of households have a smartphone). https://www.pib.gov.in/PressReleasePage.aspx?PRID=2132330 [V]
37. Mint, rural women: 76.3% use a mobile phone, 48.4% own one (CMS:T 2025). https://www.livemint.com/economy/upi-usage-india-rural-women-digital-access-mobile-phone-ownership-rural-women-digital-divide-india-rural-internet-usage-11749021032545.html [V]
38. The Hindu, fake "PM Kisan" APK via WhatsApp, ₹1.95 lakh loss (2025). https://www.thehindu.com/news/cities/Hyderabad/man-loses-195-lakh-after-downloading-fake-pm-kisan-app/article69905579.ece [V]
39. Indian Express, fake PM-Kisan APK shared in a panchayat officials' WhatsApp group. https://indianexpress.com/article/india/from-whatsapp-to-lanes-of-dharavi-how-kerala-cops-tracked-fraudster-who-made-fake-pm-kisan-app-10309310/ [V]
40. Outlook Money, I4C advisory: "government never sends APK files via WhatsApp". https://www.outlookmoney.com/news/8th-pay-commission-calculator-and-fastag-recharge-scams-i4c-urges-users-not-to-click-suspicious-links [V]

---

## 2. Findings

### F1. SMS/DLT: the department must be the Principal Entity, and every template variable must be pre-tagged
- Every bulk sender, government included, must register as a Principal Entity (PE) on a telecom operator's DLT portal, register a header (sender ID) and register each content template with its fixed and variable parts. Messages that fail template scrubbing are dropped [1][2].
- The Feb 2025 amendment creates a separate **"Government Message"** category. These are messages sent "on the directions of the Central Government or the State Government". They need **no consent** and **cannot be blocked** through the preference register. Headers show a **"-G"** suffix, which the operator appends during scrubbing [2][8][9]. This helps a state programme a lot: pickup and OTP SMS arrive from a header like `XY-ECOSUR-G`, which citizens can recognise as government. But the category applies only if the **sponsoring department** is the PE and the header is registered **in the agency's name**, not the contractor's [5].
- **Nov 2025 direction:** every variable in an SMS template must be pre-tagged by type (for example `#url#`, `#numeric#`, `#cbn#`). URLs, APK links and callback numbers must be pre-whitelisted. Non-compliant messages are **rejected outright** after the 60-day logger period [3][4]. Pickup templates that carry a tracking link or the collector's phone number need those values whitelisted, or they will fail silently.
- Senders must **self-certify** their headers and templates **every year** [2]. This is an operational task someone has to own.
- Hindi and other Indic-script SMS are Unicode, capped at **70 characters per segment** versus 160 for English [10]. Multi-part messages multiply the cost, and long regional-language templates need tight wording.

### F2. NIC and C-DAC gateways are the natural SMS route, and cheaper than WhatsApp for government
- NIC SMS (`smsgw.sms.gov.in`) and C-DAC Mobile Seva (`esms.mgov.gov.in`) both serve Central, State and UT departments. The department onboards through NIC eForms (or C-DAC), picks a **6-letter alphabetic sender ID**, completes the DLT PE, header and template steps itself, and passes the entity and template IDs on each API call [10][11][13].
- TRAI's **5-paisa exemption** (Regulation 35) waives the service SMS charge for government entities. The department applies on TRAI's portal after DLT registration [6].
- NIC rates in the Kerala guidance: **₹0.0247/SMS with the exemption**, **₹0.0804/SMS without it** (including ₹0.021 DLT scrubbing), plus 7% NICSI charges and levies, with a **6-month advance payment** to NICSI [10]. These rates may be outdated (**UNVERIFIED as current**). Even so, **a government SMS OTP costs roughly 5× less than a WhatsApp authentication message (₹0.115)** once exempted, and about 30% less without the exemption.
- NIC and C-DAC also offer **PULL SMS (mobile to application)**, **missed-call** and **IVRS** services [10][12]. Inbound keywords can therefore work over SMS for feature-phone users, not only over WhatsApp.

### F3. Meta allows government use only through a Solution Provider, after a separate approval
- WhatsApp Business Policy: government entities are **permitted but must access the platform through a Solution Provider**. Law enforcement, military, intelligence and political users are prohibited, and so are "**exclusive government service providers**" [15]. The PRD says "Meta Cloud API **or** a government-empanelled provider". Direct self-serve Cloud API is **not an option for a government WABA**. It has to be a BSP, which can still host on Cloud API.
- Onboarding sequence per BSP documentation:
  1. The BSP files a government use-case request with Meta **before** the WABA is used.
  2. Meta requires a **dedicated WABA**.
  3. **Classic Business Verification** is mandatory; partner-led verification is not allowed. Review takes **up to 14 days**.
  4. Display-name review takes up to 48 h.

  Meta itself quotes setup "from three weeks" [16][17][18]. Some BSPs charge government accounts a premium tier (360dialog: $99/month) [16].
- Templates **may not request personal data (PII)** [17]. Collecting an address or UPI ID has to happen through the web form, WhatsApp Flows or a free-form in-window exchange, not through a template.
- **Inference (UNVERIFIED):** the "exclusive government service providers" prohibition probably means the contracted operator should **not** own the WABA in its own name. The WABA should belong to the sponsoring department's Meta Business portfolio, with the operator and BSP as partners. This matches the DLT rule that headers are registered in the agency's name [5] and the PRD's position that the department is the data fiduciary (`12-nfr-security.md` §5).

### F4. Meta pricing in India for 2026, including the 1 October 2026 change
| Category | Rate per delivered message (India, INR) | Notes |
|---|---|---|
| Authentication (OTP) | ₹0.115 | Discounts only above 7.5 lakh/month [20][22] |
| Utility | ₹0.115 | Discounts only above 2.5 crore/month [20][22] |
| Marketing | ₹0.8631 | Per-user caps (error 131049) apply [20][26] |
| Service (free-form reply in 24-h window) | **Free until 30 Sep 2026; ₹0.115 from 1 Oct 2026 after 1,000 free per number per month** | [21] UNVERIFIED against Meta's card |
| Utility sent inside an open window | **Free until 30 Sep 2026; billed from 1 Oct 2026** | [21] |

Plus 18% GST and any BSP markup (UNVERIFIED per BSP).

- **Implication for inbound keywords:** every automated reply to `STATUS`, `HELP` or `RESCHEDULE` becomes a paid service message after the first 1,000 per number per month.
- **Template-classification risk:** "rate change" messages and anything about incentive amounts can be reclassified by Meta as **Marketing** (7.5× cost, per-user delivery caps) if worded promotionally [26]. Write rate notices as account notices tied to the recipient's own transactions.
- **Billing localisation:** WABAs of India-based customers must be on **INR billing by 31 Dec 2026**, or Meta stops delivering on 1 Jan 2027 [19]. Any WABA set up now must be INR from day one.
- **Illustrative pilot cost (my arithmetic, UNVERIFIED volumes):** 5,000 pickups/month × about 7 WhatsApp notifications = 35,000 utility messages ≈ ₹4,000, plus OTPs (5,000 × ₹0.115 ≈ ₹575), plus GST. Cost is **not** a reason to avoid WhatsApp at pilot scale. The real costs are the onboarding lead time and the operational work.

### F5. Data residency: available, but it must be switched on at registration
- Cloud API **local storage in India** is available: the phone number is registered with `data_localization_region: "IN"`. Message content is then stored at rest only in India, but **may be processed in Meta data centres abroad for up to 60 minutes** [23]. The **default region is the US**. The setting is chosen at registration, so enabling it later means deregistering and re-registering the number. It is not supported for "coexistence" numbers that are also used in the WhatsApp Business app [24].
- **DPDP Rules 2025:** cross-border transfer is allowed unless the Central Government restricts it by order (Rule 15). The notice and consent obligations (Rules 3, 5–16) apply from about **14 May 2027** [35], which falls within the programme's life. State IT or data-localisation policies and MeitY cloud-empanelment rules may be stricter for government data. **UNVERIFIED** whether any applies to transient messaging metadata; this should go to the sponsor's legal and IT cell.
- Mitigation: minimise what goes into message bodies. Send no full address, no UPI ID, no Aadhaar and no weight/price detail beyond what a receipt needs. Keep the system of record in government-hosted storage, which the PRD already requires.

### F6. The security advisories restrict officials, not citizen notifications
- The 2022 GoI communication-security advisory (reiterated by I&B, MoD and others) bars **classified** official communication on WhatsApp and Telegram, citing foreign-controlled servers. It recommends **NIC email, Sandesh or Samvad** for Confidential and Restricted material [31][32].
- Citizen-facing transactional notices (pickup scheduled, receipt) are not classified information, so the advisory **does not prohibit** them. MyGov (since 2020) and Andhra Pradesh (Meta agreement Oct 2024; 161 → 500+ services) are Union and State precedents [27][28][29][30].
- It **does** affect staff workflows the PRD and roadmap lean on:
  - The pilot's "WhatsApp + spreadsheets" custody log (`13-roadmap.md`).
  - "Location notes by WhatsApp" (`11-integrations.md` §9).
  - Ad-hoc sharing of KYC documents, attestations or SPCB compliance flags in WhatsApp groups.

  SPCB and department staff should not receive custody evidence, KYC or compliance material over WhatsApp. Email plus in-app, as the PRD already specifies for compliance flags, is correct. Extend that to documents.

### F7. Scam impersonation is the biggest real-world risk of a WhatsApp-first design with cash incentives
- Fake "government scheme" WhatsApp messages carrying APKs or links (PM-Kisan, e-challan, 8th Pay Commission) are an active, I4C-flagged fraud pattern. One was posted in a **panchayat officials' WhatsApp group** [38][39][40]. A programme that trains citizens to expect "your incentive is paid" messages on WhatsApp is exactly the lure scammers copy.
- Controls available:
  - An **official business account** with a verified display name [16].
  - **Never sending links to install anything**; authentication templates cannot carry URLs anyway [25].
  - One published number listed on the department's `.gov.in` site.
  - The DLT **-G header**, which citizens can check on TRAI's Header Information Portal [7].
  - A standing line in every receipt: "EcoSure never asks for OTP, PIN or app installs".

### F8. Reach: WhatsApp-first leaves out a meaningful minority, so SMS must be a full channel, not a fallback
- 85.5% of households have a smartphone [36]. But among **rural women, 76.3% use a phone and only 48.4% own one** [37]. Shared and borrowed phones mean the WhatsApp account may belong to someone else in the household.
- The PRD's SMS fallback covers only OTP and pickup status. "Collected + incentive paid", "settlement paid" and dispute messages are WhatsApp-only, so a feature-phone citizen gets **no receipt for money paid to them**. That is a grievance and RTI exposure for a government programme.

### F9. DoT SIM binding (Nov 2025) affects shop and hub staff
- DoT directed WhatsApp and others to bind the app to the active SIM and to log out web sessions within 6 hours [33][34].
- Shop and hub staff who use WhatsApp Web on a shared counter PC, or a WhatsApp number whose SIM lives in another phone, will lose sessions. This argues for the **web/PWA as the operational surface for shops and hubs**, with WhatsApp only for alerts. Enforcement status in Sept 2026: **UNVERIFIED**.

### F10. Authentication-template constraints fit a web-first product
- WhatsApp OTP templates use fixed preset text ("{code} is your verification code"), an optional security line, an expiry of 1–90 minutes and a copy-code button. No URLs, media or emoji are allowed. One-tap autofill requires an Android app handshake [25].
- For a web/PWA login, copy-code is the only option, and it adds a switch between apps. SMS OTP gets browser autofill through the WebOTP API on Android Chrome (standard browser capability; not re-verified here).

---

## 3. v2 fit

| PRD v2 element | Assessment |
|---|---|
| WhatsApp in phase 1 for citizens and shops | **Sound.** Strong Union/State precedent [27–30]; advisories do not bar it [31]. |
| "Meta Cloud API or a government-empanelled provider" | **Needs correction.** Government must go through a Solution Provider with Meta government approval and Classic Business Verification [15–18]. WABA ownership should be the department's. |
| OTP: WhatsApp first, SMS fallback | **Questionable as a default.** Government SMS OTP is cheaper [10], reaches feature phones [37], carries the -G trust signal [2] and autofills in browsers. Make the OTP channel configurable per entry point: SMS-first for web login, WhatsApp when the user is already in the WhatsApp thread. |
| SMS fallback limited to OTP and pickup status | **Gap.** Payment receipts and dispute notices need SMS parity [37]. |
| "Government-approved sender ID and templates (DLT)" | **Right direction but thin.** Missing: department as PE, -G category, variable pre-tagging and whitelisting [3], annual self-certification, TRAI 5-paisa exemption, NIC/C-DAC route, Unicode length budget. |
| Inbound keywords (WhatsApp only) | **Gap.** No SMS PULL equivalent for feature phones; replies billed from 1 Oct 2026 [21]; English-only keywords do not suit Hindi or regional-language users. |
| "Opt-in recorded; transactional vs informational separate" (`12-nfr-security.md` §5) | **Good.** Should also map to Meta categories (utility/auth vs marketing) and the DLT categories (Government/Transactional/Service). |
| Data residency | **Missing.** No mention of Cloud API local storage (`IN`) or message-body minimisation [23][24]. |
| Fraud / impersonation | **Missing** [38–40]. |
| Roadmap lead time | **Missing.** Meta government approval + BV (≈ 3+ weeks [18]) and NIC eForms + DLT PE/header/templates + TRAI exemption + NICSI advance can run in parallel but belong on the critical path (durations UNVERIFIED). |
| Pilot runs on WhatsApp + spreadsheets | **Risk.** Custody evidence and KYC in WhatsApp groups conflicts with the spirit of the security advisory [31]. Use a department-controlled shared drive or form, with WhatsApp for alerts only. |

---

## 4. Gaps (not resolved by this research)

1. Current NIC/C-DAC SMS rates in 2026 and whether the sponsoring state has its own SMS gateway (many states run SDC gateways). **UNVERIFIED.**
2. Whether NICSI's message-gateway empanelment (2024/06) includes WhatsApp BSPs that the state can procure without a fresh tender, or whether GeM has a WhatsApp BSP category. **UNVERIFIED.**
3. Exact scope of Meta's "exclusive government service providers" prohibition as it applies to a contracted operator. Needs written confirmation from the chosen BSP or Meta.
4. Whether the sponsor state's data or cloud policy treats WhatsApp message metadata as government data that must stay in-country (the 60-minute processing abroad window).
5. DoT SIM-binding enforcement status and its practical effect on WhatsApp Business app vs Cloud API numbers.
6. Meta template approval behaviour for Hindi and regional-language utility templates in the e-waste and incentive domain (reclassification-to-marketing rate).
7. Whether DLT permits the same header to be used by the department for both Government (-G) and Transactional (-T) OTP traffic, or whether separate headers are needed.

---

## 5. Recommended PRD changes

| # | File | Change |
|---|---|---|
| 1 | `11-integrations.md` §2 Requirements | Replace "Meta Cloud API or a government-empanelled provider" with: "WhatsApp Business Platform through a Meta Solution Provider (BSP) procured via GeM/NICSI or the state's empanelment. WABA owned by the sponsoring department's Meta Business portfolio, with the operator and BSP as partners. Meta government use-case approval and Classic Business Verification completed before launch. Phone number registered with Cloud API local storage `data_localization_region = IN`. INR billing." |
| 2 | `11-integrations.md` §3 SMS | Expand to: "Department registers as the DLT Principal Entity. Header registered in the department's name and sent as a Government (-G) message. Route via NIC SMS or C-DAC Mobile Seva, or the state gateway. Apply for the TRAI 5-paisa exemption. All template variables pre-tagged per the TRAI direction of 18 Nov 2025; URLs and callback numbers whitelisted. Annual header/template self-certification owned by the operator. Regional-language templates sized to fit within 2 Unicode segments (≤ 134 chars)." |
| 3 | `11-integrations.md` §2 and `10-workflows.md` §10 | Make the OTP channel **per entry point**: web/PWA login uses SMS first (browser autofill, -G trust, feature phones) with WhatsApp as the alternative. A citizen already chatting on WhatsApp gets a WhatsApp authentication template. Add **SMS parity** for "Collected + incentive paid", "Settlement paid" and "Dispute opened/resolved", so every monetary event has an SMS receipt when WhatsApp delivery fails or the user has no WhatsApp. |
| 4 | `10-workflows.md` §10 inbound keywords | Add SMS PULL (NIC/C-DAC long code or short code) with the same keywords. Accept Hindi and corridor-language synonyms plus numeric menu replies (1/2/3). Note that automated replies are billed from 1 Oct 2026 beyond 1,000 free per number per month. |
| 5 | `12-nfr-security.md` §5 Privacy | Add: "Message bodies carry the minimum. No full address, UPI ID, bank details, Aadhaar or KYC data in WhatsApp or SMS content. Templates never request personal data. Meta message categories (authentication/utility; never marketing) and DLT categories are recorded per template." |
| 6 | `12-nfr-security.md` (new subsection "Channel fraud controls") | Add: "Verified official display name. One published number on the department's .gov.in site. No links to install apps and no APKs, ever. Every incentive/settlement message carries 'EcoSure never asks for your OTP, PIN or to install an app'. Header listed on TRAI's Header Information Portal. Suspicious inbound reports routed to the operator queue with a 1930 / cybercrime.gov.in pointer." |
| 7 | `12-nfr-security.md` or `09-government.md` | Add: "Official, SPCB and operator exchange of custody evidence, KYC documents, attestations and compliance material never uses WhatsApp (GoI communication-security advisory). Use in-app, NIC/government email or Sandesh." Apply this to the pilot phase too. |
| 8 | `13-roadmap.md` Pilot / Phase 1 | Add a pre-launch critical path: Meta government approval → Classic BV (≤ 14 days) → display name → template approvals (about 9 events × 3 languages). In parallel: NIC eForms → DLT PE → header → templates (pre-tagged) → TRAI exemption → NICSI advance. Pilot WhatsApp should use the department-owned number from day one, not a staff phone. |
| 9 | `14-open-questions.md` | Add open questions: (a) State gateway vs NIC vs C-DAC. (b) BSP procurement route. (c) State data-localisation stance on the 60-minute processing abroad window. (d) Written BSP/Meta confirmation on WABA ownership and the operator's role. |
| 10 | `12-nfr-security.md` Accessibility | Note shared and borrowed phones (rural women: 48.4% own vs 76.3% use). Allow a pickup to carry an alternate notification number with its own consent, and never assume the WhatsApp account holder is the requester. |

---

## 6. Score

**5 / 10** for this angle.

The strategic call (WhatsApp in phase 1 for Tier-2/3 citizens and shops) is well supported by MyGov and Andhra Pradesh precedent, and no advisory bars it. The execution detail is where v2 falls short:
- It misstates the onboarding path (government needs a BSP plus Meta government approval).
- It does not address data residency or the October 2026 billing change.
- SMS is treated as a thin fallback, even though for a government sender it is cheaper, carries a government-labelled header and reaches feature-phone users. Monetary receipts have no SMS parity.
- It has no fraud or impersonation controls, even though incentive messages are a proven scam lure.

**Verdict:** WhatsApp-first is acceptable for a state programme *if* the department owns both channels (WABA and DLT header), local storage is set to India, SMS has parity for OTP and all money events, and officials keep evidence and KYC off WhatsApp.
