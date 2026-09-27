# 13 — Build Feasibility Simulation of PRD v3

**Simulator role:** Senior government-tech solution architect. Has shipped DBT and state portals on NIC and MeitY-empanelled cloud, been through MPSEDC hosting requests, CERT-In audits and STQC cycles.
**Date:** 2026-09-27
**Input:** `docs/prd/v3-PRD.md` (read in full). Prior work: `docs/research/v2-deep/32-tech-feasibility.md` and `06-hosting-certin.md`.
**Question:** Can a realistic government system integrator (SI) team of 7 people build v3 as written in 52–66 weeks? Where does it slip, which technology choices are unrealistic, and what should change?
**PRD files were not edited.**

---

## 0. Short answer

**Score: 4.5 / 10 for technical feasibility in real life, as written.** About 7 / 10 if the fixes in section 7 are adopted.

The core stack (PostgreSQL, Node.js, append-only custody, government hosting) is right and boring in a good way. The problems are elsewhere:

1. **Some device assumptions are not true in browsers.** An installable web app cannot talk to most Indian Bluetooth scales (Web Bluetooth only speaks Bluetooth Low Energy, and does not exist at all on iPhones). Camera barcode scanning through the browser's built-in detector works only on Android Chrome. Old phones mostly have no scannable IMEI barcode anyway.
2. **The money rails do not run the way the PRD describes.** PFMS talks to outside systems mainly by SFTP files, needs bank-account validation first, and depends on a treasury officer signing bills. "Daily batch, paid in 1–4 working days" is not realistic in year one. A bank escrow account with the department as a third party and a live API usually takes months to set up.
3. **v3 added scope but cut the build time.** The earlier technical review (`32-tech-feasibility.md`) sized Phase 1a at 14–16 weeks with about 10 people and a smaller scope. v3 gives Phase 1a 12–14 weeks, adds the product passport, IoT devices, IVR, drives and all channels, and makes STQC certification an exit gate. With 7 people, realistic sanction-to-Phase-2 is **about 90–95 weeks (P50)**, not 52–66.
4. **Several fixes from the v2 technical and hosting reviews did not make it into v3.** There is still no written offline sync protocol, no payment ledger, no database migrations, no multi-factor login for officials, and no recovery-point target (see section 5).
5. **One privacy promise cannot be kept as written.** §9.6 says the IMEI hashing key "is rotated with re-hashing". Because raw IMEIs are never stored, there is nothing to re-hash. Key rotation has to be redesigned (section 4.4).

---

## 1. Sources and verification status

| # | Claim checked | Finding | Status | Source |
|---|---------------|---------|--------|--------|
| W1 | Web Bluetooth on iOS | Not supported in Safari on iOS (all versions to 26.x). Every iOS browser uses WebKit, so Chrome on iPhone does not have it either. Third-party Safari extensions can fake it, but only if the user installs them. | **Verified** | caniuse.com/web-bluetooth; caniuse.com/mdn-api_bluetooth_requestdevice; beacio.com |
| W2 | Web Bluetooth on Android | Supported in Chrome for Android and Samsung Internet. **Bluetooth Low Energy (GATT) only.** Classic Bluetooth serial (SPP) devices are not reachable through Web Bluetooth. | **Verified** | developer.chrome.com/docs/capabilities/bluetooth |
| W3 | Classic Bluetooth serial from the browser | Chrome can reach Classic Bluetooth serial devices through the **Web Serial API**. On Android this is a recent addition (Chrome Platform Status lists it as "prepare to ship", estimated 2025). Android WebView does not get it. Wired USB serial on Android is **not** yet supported through Web Serial. | **Verified** (availability on the exact Chrome versions found on budget phones in Indore is **UNVERIFIED**) | developer.chrome.com/blog/serial-over-bluetooth; chromestatus.com/feature/5139978918821888; blink-dev "Intent to Ship: Web serial over Bluetooth on Android" |
| W4 | Indian stamped scales with Bluetooth | They exist: Legal Metrology–stamped platform scales with Bluetooth and RS232 are sold in India (e.g., HSCo). The type of Bluetooth (Low Energy or Classic serial) varies by model and add-on module. | **Verified** that they exist; **UNVERIFIED** which Bluetooth type the pilot's scales will use | hindustanscale.com product pages |
| W5 | Barcode scanning in a web app | The browser's built-in `BarcodeDetector` works in Chrome for Android. It is disabled by default in Safari on iOS. The cross-platform route is a WebAssembly decoder (ZBar or ZXing compiled to WebAssembly). | **Verified** | caniuse.com/mdn-api_barcodedetector; scanbot.io; dev.to (WebAssembly barcode on iOS) |
| W6 | PFMS integration with outside systems | PFMS FAQ: outside systems integrate "presently" in **SFTP mode**. Onboarding needs Annexure I/II forms, IP whitelisting, a source system ID, scheme creation and DBT configuration. There are four integration models, including state treasury (IFMIS) integration. | **Verified** | pfms.nic.in PFMS_DBT_FAQ.pdf; state SNA/SNA-SPARSH SOPs (Chhattisgarh eKosh) |
| W7 | Scheme money flow for state schemes | In the SNA and SNA-SPARSH models, the state treasury system (IFMIS) builds payment files and sends them to PFMS. Agencies work with maker and checker users. How MP's treasury system connects for a **purely state-funded** scheme like EcoSure's incentive is **UNVERIFIED**. | **Partly verified** | Chhattisgarh SNA-SPARSH SOP v3.0 |
| W8 | AIS-140 coverage | Mandatory for public service vehicles and for goods carriers with permits (enforced through fitness and permit checks). **Two-wheelers, three-wheelers and e-rickshaws are exempt centrally.** Some states add rules for commercial three-wheelers. A vendor blog says a May 2026 Supreme Court order found under 1% of public service vehicles compliant. | **Verified** for scope; the compliance figure is **UNVERIFIED** | mobosafe.in; fleetx.ai; intangles.ai (vendor guides) |
| W9 | Getting AIS-140 tracking data | MoRTH's National Transport Repository data-sharing policy (Aug 2025) makes state transport departments owners of their data and allows sharing by API "case by case" through a memorandum of data compliance, a CERT-In audit certificate every year, IP whitelisting and breach reporting. The state tracking back-end is a Command and Control Centre run by the transport department or its vendor (MP: a BSNL-run site). | **Verified** for the policy; **UNVERIFIED** whether MP transport would share live location data with an environment programme, or how long approval would take | parivahan.gov.in data-sharing-policy.pdf; Khaitan & Co summary; mp.vltsecurity.com |
| W10 | IMC vehicle GPS | Indore already runs a GPS vehicle tracking system (VTMS) on about 700 of 750 garbage vehicles. It feeds the Smart City command centre and has RFID-linked weighbridges. | **Verified** (from 2017–2019 case studies; current state **UNVERIFIED**) | NDMC Smart City knowledge centre; smartcityindore.org; Bioenable case study |
| W11 | STQC website certification | Needs a CERT-In security audit report first. Vendors say it takes 5–6 months on average end to end. The certificate lasts 3 years with yearly surveillance audits. | **Verified** for process; duration is a **vendor claim (UNVERIFIED)** | stqc.gov.in; lumiversesolutions.com |
| W12 | Escrow APIs | API-based escrow exists through fintech technology partners working with banks (Castler, RazorpayX and others). Bank approval of the use case and a tripartite agreement come first. One vendor says "sandbox and live in under 2 weeks"; that is for private clients, not a government party. | **Verified** for existence; government-party timelines **UNVERIFIED** | castler.com; razorpay.com/x/escrow-accounts |

Everything else in this report is engineering judgement and is labelled as an estimate.

---

## 2. The simulated team

The PRD gives no team size. A typical MPSEDC or GeM-procured SI team at this budget (~₹1.4 crore for phases 0–2, §26.1) looks like this:

| Role | FTE | Reality note |
|------|-----|--------------|
| Project manager / business analyst | 1 | Also handles sponsor meetings, PFMS and bank paperwork, and gate reviews. Overloaded from week 1 |
| Tech lead / architect | 1 | Also acts as part-time DevOps and security lead, because nobody else can |
| Backend engineers (Node + PostgreSQL) | 2 | Custody, money, attestations, integrations |
| Frontend / web app engineers | 2 | Field offline app, citizen web, operator and regulator consoles |
| QA engineer | 1 | Manual testing plus some automation; no dedicated device lab time |
| **Total** | **7** | Missing compared with the 9.5–11 FTE sized in `32-tech-feasibility.md`: offline/mobile specialist, dedicated DevOps/security, designer, Hindi content owner, payments analyst |

**Budget check (estimate):** a loaded SI rate of about ₹1.3–1.6 lakh per person-month (**UNVERIFIED**, typical for state SI contracts) means 7 FTE for 20 months costs ₹1.8–2.2 crore. The PRD's ₹1.4 crore build line pays for about 13–15 months of this team. **The build budget is roughly 30–50% short of the realistic timeline.**

---

## 3. Sprint-by-sprint dry run

**Assumptions.** Two-week sprints. Week 0 is **budget sanction**. The SI cannot start until it is contracted. Plan column = what the PRD implies. Actual column = what a real team would see. External tracks (hosting, messaging, money, audits) run in parallel from the day the sponsor has authority to sign.

### 3.1 Before the SI arrives (Stage −1, §25.2)

| Week | Planned (PRD) | What actually happens | Slip |
|------|---------------|-----------------------|------|
| 0–16 | Sanction, procurement, MoUs, baseline in 8–16 weeks | MPSEDC nomination is the fast route. Even so, the DPR (§26 says one is needed before sanction), SI scope, tender or nomination note and contract take **12–20 weeks**. The operator procurement runs separately and is slower. | SI contract signed around **week 16** (P50), week 24 (P80) |
| 4–16 | Hosting request | MPSEDC hosting request can only be filed once the department has sanction and a named system owner. VM, database, object storage and network provisioning in the state data centre or MPSEDC cloud takes **6–10 weeks** (estimate; prior review `06` says the same). | Hosting ready around week 22–26 |
| 4–16 | Messaging and money onboarding | DLT principal-entity registration as a government body and a sender header: 2–4 weeks. Meta business verification for a government department through a BSP: 3–6 weeks (**UNVERIFIED** for 2026). PFMS/treasury scheme code: needs the budget head to exist first. | Most of these slide until the scheme code exists |

**Result:** the SI starts about 16 weeks after sanction with **no government hosting, no scheme code and no messaging accounts**. That is normal. The PRD diagram shows Phase 0 starting straight after Stage −1 (§25.1), which is right, but it assumes the external tracks are finished by then.

### 3.2 Phase 0 — Foundations (PRD: 8–10 weeks)

| Sprint | Planned | Actual | Slip (cumulative) |
|--------|---------|--------|-------------------|
| S1 (wk 17–18) | Repository, CI, `schema.sql` core, OTP sign-in | Team builds on a non-government dev environment with synthetic data only (the rule of "no mock operational data" applies to production, not dev). The tech lead spends half the sprint on the MPSEDC hosting form, network diagram and security questionnaire. | 0 |
| S2 (wk 19–20) | Row-level security, org roles, authorization middleware | Row-level security with a Node connection pool needs a per-request `SET LOCAL` of user and org context inside a transaction. The first design leaks context between pooled connections in a test. Fixed, but it costs the sprint. | +1 wk |
| S3 (wk 21–22) | Operator console: tiers, any-of ID, agent agreements | On track. The PM discovers that the SMS OTP template needs DLT approval **per language**, and that OTP for SPCB officers conflicts with the CERT-In multi-factor rule for privileged users (`06-hosting-certin.md` F7). §20.4 still says "Phone OTP for everyone". Rework: add an authenticator-app second factor for officials. | +2 wk |
| S4 (wk 23–24) | **Offline and device spike** (recommended in `32`, not in the PRD) | The team buys 3 budget Android phones and 1 Android Go phone, plus the scale the recycler already owns. Findings are in section 4.1. **Web Bluetooth cannot see the scale**: it uses a Classic Bluetooth serial module. IMEI barcode scanning works on the box sticker, but most collected phones arrive without a box. | +2 wk |
| S5 (wk 25–26) | SMS, WhatsApp, missed-call services; CERT-In logging; time sync | Hosting arrives in week 25 without object storage or a malware scanner. The MSP asks for a separate change request. WhatsApp BSP contract is not yet signed, so it is built against the BSP sandbox. | +3 wk |
| S6 (wk 27–28) | Phase 0 exit | Exit criteria met on the dev environment. Staging on government hosting takes 2 more weeks to reach parity (NTP to NIC servers, 1-year log retention, WAF rules). | **+4 wk** |

**Phase 0 actual: about 14 weeks (weeks 17–30) against 8–10 planned.**

### 3.3 Phase 1a — Tracking and custody live (PRD: 12–14 weeks)

§25.5 puts all of this into one phase: citizen booking on **every** channel, device claims, wipe help, handover codes, drives, bulk receipts, payout methods, the agent offline app with battery check, scanning, legacy passports, connected scales, seals, deadlines, drop points, recycler network, rate cards, escrow, unit scans, maker-checker attestations, reimbursements, capacity, payments with caps and chargebacks, flags, city view, public verification, RTI log, Hindi and English, IVR, **plus a security audit and STQC certification as the exit**.

| Sprint | Planned | Actual | Slip (cumulative) |
|--------|---------|--------|-------------------|
| S7–S8 (wk 31–34) | Pickup, handover code, agent queue | Built. Then the offline question arrives: **how does a collector with no signal check a handover code?** §19.3 stores a code hash. If that hash is cached on the phone, a 4-digit code can be guessed offline in under a second (10,000 options), and the 5-attempt lock (§19.3) cannot be enforced. Decision: the phone records the code as entered; the **server** verifies it at sync; the incentive waits for that. The citizen's material price is paid anyway (it is recycler money). The PRD needs this rule. | +5 wk |
| S9–S10 (wk 35–38) | Offline collect, sync | §19.4 rule 10 still says "conflicts resolved by the receiver and logged". The team writes the missing sync protocol (commands with client IDs, a "rejected on sync" state, device vs server time, a separate photo upload queue). This is the single hardest part of the product, and the PRD still gives it one sentence. Budget phones: Xiaomi and Realme battery savers kill the tab, so background sync fires late or not at all. | +7 wk |
| S11 (wk 39–40) | Scanning and legacy passports | See section 4.2. The team adds OCR of the `*#06#` screen and manual entry with a check-digit test, because barcodes are rarely available. | +8 wk |
| S12 (wk 41–42) | Connected scales | The scale reads through a Classic Bluetooth module, so it needs Web Serial over Bluetooth on Android Chrome. That works on 2 of the 4 test phones (older Chrome on one; one OEM browser). Decision: **manual weight plus photo of the display is the default**, and scale integration becomes a pilot enhancement for the recycler gate only. | +9 wk |
| S13–S14 (wk 43–46) | Recycler inflow, unit scans, attestations | The capacity check (§12.2 R5, "period total ≤ state-verified capacity") needs a per-issuer lock to stop two attestations passing together, as `32` warned. Signed attestations, a unique successor rule and a hash-chained audit log are added. | +9 wk |
| S15–S16 (wk 47–50) | Payments with caps and chargebacks; escrow reimbursement | There is **no ledger** in §19.1 (only Settlement, CitizenIncentive, PayoutBatch, Chargeback). The team adds ledger entries, payout attempts and bank-statement import, because reconciliation cannot be done without them. The recycler's bank offers no escrow API to a state programme within the timeline. Reimbursement ships as a **maker-checker-approved bank file** the recycler uploads to its own net banking. | +11 wk |
| S17 (wk 51–52) | Incentive via treasury batch | The scheme code exists, but PFMS/treasury integration is file-based (SFTP), needs IP whitelisting, a source-system ID and beneficiary **account validation before first payment** (W6). UAT with the treasury team is scheduled for after Diwali. The pilot runs incentives through the sponsor-approved interim route §25.3 already mentions. | +12 wk |
| S18 (wk 53–54) | IVR, missed call | The 181 CM Helpline is run by a vendor under its own contract. Adding a new IVR tree is a **change request** to that contract, which needs a note-sheet and price approval (**UNVERIFIED**, typical). The team switches to a GeM-procured cloud telephony provider with India data centres for the missed-call number and a simple Hindi IVR tree. | +13 wk |
| S19–S20 (wk 55–58) | Hindi and English everywhere; drives; RTI log; city view | Hindi strings, 27+ message templates each needing Meta and DLT approval, and Hindi PDF shaping through headless Chromium. No Hindi content owner on the team, so the sponsor's staff review strings. Turnaround is 1–2 weeks per batch. | +14 wk |
| S21 (wk 59–60) | Feature freeze; CERT-In audit starts | MPSEDC's CERT-In empanelled audit: first round finds the usual problems (session fixation on the operator console, verbose errors, missing rate limits on the attestation verification page). | — |
| wk 61–68 | Audit rounds 2–3; field shadow run | Three audit rounds take 8 weeks. The week-long field shadow run finds that 2 GB phones crash when the camera and photo compression run together. | — |
| wk 68–70 | **Go-live of the software corridor** | STQC is **not** done. It needs the CERT-In report first and then 5–6 months (W11). The steering committee accepts GIGW self-compliance plus the CERT-In certificate for go-live, with STQC to follow. | — |

**Phase 1a actual: about 38 weeks (weeks 31–68/70) including the audit, against 12–14 planned.** Without the audit it is about 30 weeks.

**Calendar collision:** §23 names September–October (Swachhata Hi Seva) as the preferred launch window. That puts go-live of new software straight into the **Diwali surge** (section 4.7). A real sponsor would move software go-live to January–February and run Diwali on the manual process.

### 3.4 Phase 1b — Producers, recovery, analytics (PRD: 10–12 weeks)

| Sprint | Actual |
|--------|--------|
| wk 71–74 | Producer registry. CSV of up to 1 million rows per file (§9.5 PP1). Every IMEI must be keyed-hashed on arrival. If each hash is a call to a hardware security module (§21.2 item 4), throughput limits the upload (section 4.4). Fix: the key is unwrapped once from the key service into worker memory, and the upload runs as a background job. |
| wk 75–78 | Certificate provenance, evidence packs, maker-checker downloads, Hindi PDFs |
| wk 79–82 | Material recovery, mass balance, CPCB-ready exports, state analytics (15-minute refresh from materialised views; analytics roles read aggregates, not raw rows under row-level security) |
| wk 83–84 | Vehicle GPS. The AIS-140 route (§20.5) stalls: agents' vehicles are mostly three-wheelers, e-rickshaws and tempos (exempt, W8), and a data-sharing memorandum with MP transport is months away (W9). The team integrates **IMC's existing vehicle tracking feed from the Smart City command centre** (W10) for city vehicles, and **phone GPS breadcrumbs from the field app** during trips for everyone else. |
| wk 85–88 | Re-audit after major change (CERT-In, `06` F2) |

**Phase 1b actual: about 18 weeks (weeks 71–88) against 10–12.**

### 3.5 Phase 2 — National readiness (PRD: 10–12 weeks)

CPCB national view, open passport standard and public API, recycler-owned hubs, refurbishers, retailer take-back, bin sensors, badges. Realistic: **14–16 weeks + 3–4 weeks re-audit → weeks 89–108.** Bin sensors need a LoRaWAN network or cellular sensors plus a hardware tender. Whether Indore has a usable LoRaWAN network is **UNVERIFIED**. This is the first thing to cut.

### 3.6 Summary of the dry run

| Stage | PRD | Simulated (7 FTE) | Main causes |
|-------|-----|-------------------|-------------|
| Stage −1 to SI start | 8–16 wk | 16 wk (P50) | DPR, nomination note, contract |
| Phase 0 | 8–10 wk | 14 wk | Hosting lead time, admin MFA rework, device spike |
| Phase 1a (incl. audit) | 12–14 wk | 38 wk | Scope, offline sync, missing ledger, money rails, IVR vendor, Hindi approvals, 3 audit rounds |
| Phase 1b (incl. re-audit) | 10–12 wk | 18 wk | Hashing at volume, GPS source change |
| Phase 2 (incl. re-audit) | 10–12 wk | 18–20 wk | Hardware tender, re-audit |
| **Sanction → end of Phase 2** | **52–66 wk** | **≈ 104–108 wk as written; ≈ 90–95 wk if the team descopes as it goes** | |

---

## 4. Deep dives on the named risk areas

### 4.1 Web Bluetooth scales from a web app

- **iOS:** impossible without users installing a third-party Safari extension (W1). Field users on iPhones cannot use connected scales from the web app at all.
- **Android:** works only if the scale speaks **Bluetooth Low Energy**. Many Indian scales and aftermarket modules use **Classic Bluetooth serial** (HC-05 style). Those need Web Serial over Bluetooth, which reached Android Chrome only recently (W3) and not in WebView wrappers.
- **USB scales:** Web Serial on Android does not support wired serial ports yet (W3). WebUSB may work for some USB serial chips, but this is **UNVERIFIED** and fragile.
- **"Signed readings":** §20.5 says readings are "signed with the app's device key". That proves the **app** sent the number, not that the **scale** measured it. A collector can type any number into a modified app and it will be signed. Real signed readings need a scale or gateway that holds its own key. That hardware is uncommon and expensive in India (**UNVERIFIED** pricing).

**Verdict:** a Bluetooth scale read by a web app is a demo feature, not a pilot feature. The real anti-fraud evidence is **two-party weighing** (sender and receiver) plus a photo of the display, which §16.4 already has.

### 4.2 Camera IMEI scanning offline on low-end phones

- The browser's built-in barcode detector works on Android Chrome (W5). A WebAssembly fallback works on iOS but adds about 200–400 KB and runs slower on 2 GB phones (estimate).
- The bigger problem is physical. IMEI barcodes are on the **box** and, on older phones, **under the removable battery**. Most phones handed over at the door have no box. Modern phones have a non-removable battery, and the IMEI is laser-etched on the SIM tray in tiny text, with no barcode. `*#06#` only works if the phone powers on.
- **Realistic capture mix (estimate):** 20–35% barcode, 30–40% `*#06#` screen (OCR or typing), and the rest no identifier. The pilot target of **≥ 40% of phones with an identifier scanned** (§25.3 week 8 gate) is reachable. The Phase 1a/KPI target of **≥ 60% linked passports** (§9.7, §24.1) is at risk until producers register units.
- **Fix:** accept scan, OCR of the `*#06#` screen, or typed entry with the IMEI check-digit (Luhn) test, recorded as the "method". Count only scanned or OCR'd identifiers as strong evidence.

### 4.3 Offline sync conflicts on budget Android

What goes wrong in practice (all appeared in the dry run):

1. The collector and the recycler are both offline. Their weigh records reach the server hours apart and in either order. Tolerance checks must run at sync time, not at capture time.
2. The agent is suspended, or the rate card changes, while the phone is offline. The server must reject some synced actions and tell the user. The PRD has no "rejected on sync" state.
3. Phone clocks are wrong. Storage deadlines (§11.2 S4) and incentive timing must use server time with a skew flag.
4. OEM battery savers (Xiaomi, Realme, Oppo, Vivo) kill background work. The "sync within 5 minutes of signal" target (§21.4) only holds when the app is open.
5. Browser storage can be evicted on a full phone unless persistence is granted.
6. Handover code checking offline (section 3.3, S7–S8).

`32-tech-feasibility.md` F2 wrote out the protocol that solves these. v3 did not adopt it.

### 4.4 HMAC key rotation and "re-hashing" 10 million rows

§9.6 rule 1: "the key sits in a hardware-backed key store and is rotated with re-hashing." §9.3: "Raw IMEI never stored."

- **These two rules contradict each other.** You cannot re-hash without the original input, and the original is deliberately thrown away.
- "Wrapping" the old hash with a new key (new = HMAC(k2, old hash)) does not help. Lookups still need k1, so k1 can never be destroyed, and nothing is gained.
- **The IMEI space is small.** Once you know the 8-digit model code (public), there are about a million serials per model. If the key leaks, every hash made with it can be reversed quickly by brute force. The security therefore depends entirely on the key **never leaving the key store**.
- **What works:**
  - **Key versioning.** Store a `key_version` on each row. New records use the newest key. A scan computes the hash under each active key version (2–3 HMAC operations, which is cheap) and looks all of them up.
  - **Lazy re-keying.** Re-key a row only when the raw IMEI is scanned again.
  - **Rotation on compromise only**, with an incident process, not on a calendar.
  - Keep old key versions, non-exportable, for the 7-year retention period (§21.3).
- **Cost if a bulk re-hash ever were possible** (for example, from a producer's re-upload): 10 million HMACs inside a cloud hardware security module at 2,000–5,000 operations a second is 35–85 minutes (**UNVERIFIED** throughput; varies by provider). Updating 10 million rows that carry unique indexes, in batches, takes 1–3 hours, roughly doubles table size until vacuum, and needs a dual-read period. That is manageable, but only if the raw values exist.
- **Other passport gaps:**
  - §19.4 rule 3 scopes serial hashes "per producer and model". At collection, a legacy device's producer and model are often unknown (§9.5 PP3 says brand and model are optional). The scope key is missing exactly when it is needed.
  - Hardware-backed key stores on the MP state data centre or MPSEDC cloud are **UNVERIFIED**. The fallback is a key-management service with the HMAC key unwrapped into worker memory.
- **Scale:** 10 million units a state (§20.8) is small for PostgreSQL. But if producers register every phone sold in MP, the state could pass that within about a year (**UNVERIFIED** sales figure). Design for 100 million or more with partitioning by year from day one.

### 4.5 PFMS and treasury integration

- PFMS integrates outside systems in **SFTP (file) mode** (W6). Onboarding needs the scheme created and configured for DBT, the agency configured, Annexure forms, IP whitelisting and a source system ID.
- **Account validation** comes before the first payment to any beneficiary. New citizens' first incentive therefore waits for validation, plus the bill cycle.
- Payments move after a treasury bill is passed. That needs a drawing and disbursing officer (DDO) to approve. **Daily** batches of ₹50–₹100 payments to citizens need a DDO every day. In practice that becomes weekly (**UNVERIFIED** for MP, typical elsewhere).
- Many DBT flows expect Aadhaar-based payment. §8.5 rightly refuses mandatory Aadhaar. Bank-account payments are still possible, but the sponsor must confirm that the treasury will allow them (**UNVERIFIED**).
- For a purely state-funded incentive, the integration is with **MP's treasury system**, not PFMS directly. Whether MP's treasury system accepts payment files from an outside system is **UNVERIFIED**.
- **Realistic year-one service level:** weekly batches, with 5–10 working days from handover to money for a first-time payee and 3–7 for repeat payees. The tripwire in §18.3 (red above a 4-working-day median) will fire in the first months.

### 4.6 Bank escrow API

- API escrow exists through fintech partners (W12). Bank approval of the use case, KYC and a tripartite agreement come first. A **government department as a party** adds legal vetting on the bank's side. Expect 12–20 weeks (**UNVERIFIED**).
- The recycler owns the material money (§17.2 Rail A). The department does not need to co-sign every release. It only needs to **see** balances and releases.
- **Fix:** Phase 1a uses the recycler's own current account (or a virtual account at its bank). EcoSure produces maker-checker-approved payout files. The recycler's finance user uploads them to net banking. EcoSure imports the bank statement for reconciliation. Add an API only when a bank offers it. Keep the tripartite escrow as a phase-2 improvement.

### 4.7 IVR vendor

- Reusing CM Helpline 181 (§10.2 C1, SP-11) means changing another vendor's contract. That is slow and outside the SI's control.
- **Fix:** a GeM-procured cloud telephony provider with Indian data centres. It supplies a missed-call number, a small Hindi IVR tree (book, status, reschedule, safety) and masked calling. Estimate 6–10 weeks including procurement.

### 4.8 STQC

- §25.5 makes "security audit **and** STQC certification passed" the Phase 1a exit.
- STQC certification needs the CERT-In audit report first (W11). Vendors put the end-to-end process at 5–6 months. As an exit gate, it adds about 20 weeks in series.
- **Fix:** make GIGW self-compliance plus the CERT-In certificate the go-live gate. Apply for STQC after go-live and have it before the national (Phase 2) exit.

### 4.9 AIS-140 data from the state vehicle tracking system

- AIS-140 covers buses, taxis and permit goods carriers. Most e-waste movements in Indore use three-wheelers, e-rickshaws, tempos, handcarts and the collector's own two-wheeler, which are exempt centrally (W8).
- Getting data from the state's tracking back-end requires a data-sharing memorandum with the transport department under the MoRTH policy, a yearly CERT-In audit and IP whitelisting (W9). An environment programme asking for live vehicle locations is a new use case. Expect months (**UNVERIFIED**).
- **Fix:** use IMC's existing vehicle tracking feed through the Smart City command centre (W10) for city vehicles. Use phone GPS breadcrumbs during an active trip for everything else. Treat GPS as supporting evidence, not proof (seals and two-party weights are the proof).

### 4.10 Diwali load

- **Server load is not the problem.** Indore has about 7 lakh households (**UNVERIFIED**, population ÷ 4.5). At 5% participation (§24.1), that is about 35,000 households a year. If a quarter of the annual volume lands in the six Diwali weeks, that is roughly 200–300 pickups a day on average, with peaks near 1,000 on drive weekends. That is a few requests a second, and a single PostgreSQL server handles it easily. Even 10 states would be under 100 requests a second.
- **What does break at Diwali:**
  - **Bank holidays.** Diwali closes banks for 2–4 days, so treasury batches stop, and the 4-working-day tripwire fires.
  - **Missed-call call-backs** within 4 working hours (§10.2 C1) need people, not servers.
  - **Recycler gate scanning.** Scanning 100% of phones in lots under 200 (§12.2 R4) at about 10 seconds each takes about 5.5 labour-hours per 2,000 phones.
  - **Sync and photo storms** after drives: 50 collectors uploading 3 photos per pickup at once over weak 4G.
  - **Change freeze.** Nobody should deploy new software into the surge.
- **Fix:** no software go-live between October and mid-November. Surge staffing is an operator contract item. Use sample scanning above a daily threshold during surge weeks. Queue photo uploads with compression on the phone.

### 4.11 Server-sent events

- Government WAFs and load balancers often buffer responses or close idle connections after 60 seconds (**UNVERIFIED** for MP hosting).
- **Fix:** send a heartbeat every 20–30 seconds, fall back to polling every 60 seconds, and re-fetch after reconnecting (§20.8 already says clients re-fetch). There are few government users, so this is low risk.

---

## 5. PRD gaps (with sections)

| # | Gap | PRD section | Severity |
|---|-----|-------------|----------|
| G1 | IMEI key "rotated with re-hashing" is impossible because raw IMEIs are never stored. Rotation needs key versioning. | §9.6 rule 1; §9.3 | High |
| G2 | Offline sync protocol still missing ("conflicts resolved by the receiver"). No "rejected on sync" state, no time-skew rule, no photo queue. | §19.4 rule 10; §11.2 S2–S3; §21.4 | High |
| G3 | Handover code checking offline is not specified. A cached 4-digit hash can be brute-forced, and the 5-attempt lock cannot be enforced offline. | §10.2 C6; §19.3 HandoverCode; §17.4 | High |
| G4 | Bluetooth or USB scales read by the web app, with "signed readings". Web Bluetooth is Low Energy only, absent on iOS, and USB serial is unsupported on Android. App signing does not prove what the scale measured. | §20.5 table; §11.2 S3; §18.2 weight inflation row | High |
| G5 | Treasury/PFMS "daily batch, 1–4 working days". PFMS is file-based, needs account validation and DDO approval; the state-scheme route through MP's treasury is unconfirmed. | §10.2 C7; §17.2; §17.3; §20.3; §18.3 tripwire | High |
| G6 | Phase 1a scope and duration conflict with the earlier technical review. The exit gate includes STQC (5–6 months). | §25.1; §25.5 | High |
| G7 | No payment ledger, payout-attempt or bank-statement entities. | §19.1 Money | High |
| G8 | Single idempotent `schema.sql` with no versioned migrations for data changes. | §19.5; §25.9 rule 1 | Medium |
| G9 | Phone OTP for everyone. No second factor for SPCB, CPCB, operator admins or infrastructure. | §20.4; §20.8 Auth row | Medium–High |
| G10 | Daily backups with no RPO or RTO. Up to 24 hours of custody and money records could be lost. | §21.4 | Medium |
| G11 | AIS-140 as the GPS source. Most e-waste vehicles are exempt, and data sharing needs a transport memorandum. IMC's existing vehicle tracking feed is not mentioned. | §20.5; §16.4 step 2 | Medium |
| G12 | IVR reuses CM Helpline 181 with no fallback vendor. | §10.2 C1; §20.2; SP-11 | Medium |
| G13 | Tripartite escrow with the department and an API assumed from day one. | §12.2 R3; §17.2; SP-07 | Medium |
| G14 | Field-role platform not stated. Web Bluetooth and the barcode detector do not work on iOS; feature phones cannot run the app. | §20.8 Clients; §22 | Medium |
| G15 | Serial hash scope "per producer and model" is missing for legacy devices, whose model is unknown. | §19.4 rule 3; §9.5 PP3 | Medium |
| G16 | Launch window of September–October runs into the Diwali surge and bank holidays. | §23; §25.2 | Medium |
| G17 | No staffing line. The build budget (~₹1.4 crore) funds about 13–15 months of a 7-person team. | §26.1 | Medium |
| G18 | Performance targets still mix server and 3G time ("p95 < 800 ms on 3G"). Sync "within 5 minutes" is only true when the app is open. | §21.4 | Low–Medium |
| G19 | Bin sensors assume a LoRaWAN or cellular network and a hardware tender, for little evidence value. | §20.5; §25.7 | Low |
| G20 | The 10 million units a state scale target is low if producers register all phones sold. No partitioning plan. | §20.8 | Low |

---

## 6. Risk register

| # | Risk | Probability (estimate) | Impact | Early signal |
|---|------|------------------------|--------|--------------|
| R1 | Sanction-to-Phase-2 takes more than 66 weeks | **90%** | High: budget cliff at the state budget (§23) | Phase 0 not exited by week 28 |
| R2 | Phase 1a takes more than 20 weeks | **85%** | High | Sync protocol not written by the end of Phase 0 |
| R3 | Treasury/PFMS incentive route not live at software go-live | **70%** | High: citizen trust, tripwire red | Scheme code missing at SI start |
| R4 | Web-app scale integration fails on most pilot phones or scales | **75%** | Low if manual weight plus photo is the default; high if scales are mandatory | Device spike result |
| R5 | Offline data loss or duplicate custody events in the first month | **40%** without a protocol; 10% with one | High | Unresolved sync rejections in the operator queue |
| R6 | Handover code fraud through offline guessing | **30%** if hashes are cached on the phone | Medium–High | Many codes succeed on the first try from a few agents |
| R7 | Escrow API not available; manual bank file needed | **80%** | Low if the bank-file route is planned | Bank asks for legal vetting of the department clause |
| R8 | IVR through 181 not available within 6 months | **65%** | Medium: inclusion promise (§22) | No change request raised by week 8 |
| R9 | STQC not done by the Phase 1a exit | **90%** | Low if the gate is changed; high if kept | — |
| R10 | AIS-140 data-sharing memorandum not signed by Phase 1b | **75%** | Low if IMC's feed and phone GPS are used | — |
| R11 | CERT-In audit needs 3 or more rounds | **60%** | Medium: +4–6 weeks | Round 1 finding count |
| R12 | IMEI key compromise with no rotation plan | **5%** | Very high: all hashes reversible | — |
| R13 | Build budget runs out before Phase 2 | **60%** | High | Burn above 1/20 of budget a month |
| R14 | Software go-live collides with Diwali | **50%** if §23's launch window is followed | Medium | Go-live date set in September–October |

---

## 7. Fixes

### 7.1 Highest leverage (do these first)

1. **Ship the field roles as an Android-only app shell, not a plain web app.** Use Capacitor (the same web code inside a thin native Android app). It gives native Bluetooth for both Low Energy and Classic serial scales, on-device barcode scanning and OCR (Google ML Kit, works offline), SQLite storage that the browser cannot evict, and reliable background sync. Citizens, operators and regulators stay on the responsive web app. Say plainly that field roles need Android 9+ and that iOS and feature-phone users are served by WhatsApp, IVR and assisted booking. Make **manual weight plus a photo of the display the default**, with scales as an optional enhancement at the recycler gate. *Removes G4 and G14; reduces G2, G3, R4 and R5.*
2. **Design money around the rails that exist today.**
   - **Incentive:** weekly batch through MP's treasury, with SFTP files and beneficiary account validation at first registration (not at first payout). The pilot uses the sponsor-approved interim route. The service level becomes "within 7 working days". Change the §18.3 tripwire to match.
   - **Material money:** the recycler's own bank account, with maker-checker payout files and statement import. API and tripartite escrow come later.
   - **Add the ledger** (ledger entries, payout attempts, bank-statement lines).
   - *Removes G5, G7 and G13; reduces R3 and R7.*
3. **Re-plan scope and time honestly.**
   - Split Phase 1a into **1a-i "Custody core"**: agent, recycler and operator flows; offline sync; handover codes checked on the server; attestations; bank-file money; Hindi.
   - Then **1a-ii "Channels"**: citizen web, WhatsApp keywords, missed call and IVR through a cloud telephony vendor, drives, treasury incentives.
   - Move vehicle GPS, bin sensors, producer API and STQC out of the 1a gate.
   - Publish the timeline as **≈ 75–85 weeks with 9–10 FTE**, or ≈ 90–95 weeks with 7.
   - Add an offline/mobile engineer, a DevOps/security engineer and a finance/Hindi analyst (together about 2.5 FTE), and raise the build line to match.
   - *Removes G6 and G17; reduces R1, R2 and R13.*

### 7.2 Other fixes

| Fix | Closes |
|-----|--------|
| Replace "rotated with re-hashing" with key versioning, lazy re-keying on scan, rotation only on compromise, non-exportable keys held for 7 years, and an explicit statement that IMEI keyed hashes rely on key secrecy | G1, R12 |
| Write the sync protocol from `32-tech-feasibility.md` F2 into §19.4 and §21.4. Add the "rejected on sync" state and the time-skew rule. | G2, R5 |
| Handover code: the phone records the code as entered; the server verifies at sync; the incentive depends only on server verification; the attempt counter lives on the server; no code hash on the phone | G3, R6 |
| Accept IMEI capture by scan, OCR of the `*#06#` screen, or typed entry with a check-digit test. Record the method, and count only scan or OCR as strong evidence. | §9.5 PP3 realism |
| Scope serial hashes by manufacturer when known, and global with a "weak" flag otherwise | G15 |
| Add ordered migrations alongside the canonical `schema.sql`. CI checks that both produce the same schema. | G8 |
| Authenticator-app second factor for all government, operator-admin and infrastructure users | G9 |
| RPO ≤ 15 minutes (continuous write-ahead-log archiving), RTO ≤ 4 hours, DR drill every 6 months | G10 |
| GPS source: IMC's existing vehicle tracking feed through the Smart City command centre, plus phone GPS during trips. Keep AIS-140 as an option if MP transport agrees. | G11, R10 |
| IVR through a GeM cloud telephony provider with India data centres. 181 is an option, not the plan. | G12, R8 |
| Go-live gate = CERT-In certificate plus GIGW self-compliance. STQC before the Phase 2 exit. | G6, R9 |
| No software go-live between October and mid-November. Surge staffing goes into the operator contract. | G16, R14 |
| Split performance targets (server p95 ≤ 300 ms; field route interactive in under 5 s on a 2 GB phone over emulated 3G). Sync within 1 minute while the app is open. | G18 |
| Drop bin sensors from the plan unless a city IoT network already exists | G19 |
| Partition passport and lifecycle-event tables by year. Plan for 100 million+ units a state. | G20 |
| Server-sent events with a heartbeat and a polling fallback | §20.8 |

---

## 8. Realistic timeline

| Scenario | Team | Scope | Sanction → end of Phase 2 | Probability of meeting PRD's 52–66 weeks |
|----------|------|-------|---------------------------|------------------------------------------|
| As written | 7 FTE | Full v3 | ≈ 104–108 weeks | < 5% |
| Descoped as it goes (what really happens) | 7 FTE | v3 minus bin sensors, AIS-140, STQC gate | ≈ 90–95 weeks (P50); ≈ 110 (P80) | < 10% |
| Recommended | 9–10 FTE | Fixes in section 7 | ≈ 75–85 weeks (P50) | ≈ 15% |
| Aggressive but possible | 10 FTE, SI contracted by week 10, hosting pre-arranged by MPSEDC | Section 7 fixes plus Phase 2 trimmed to national view and open standard | ≈ 66–72 weeks | ≈ 35% |

**The manual pilot (§25.3) is the project's safety net.** Its 12 weeks run alongside Phase 0 and prove the behaviour. The same manual processes (spreadsheets, bank files, WhatsApp) should stay available as a **fallback for every software release**, especially over Diwali.

---

## 9. Score

**Technical feasibility in real life: 4.5 / 10 as written.**

**What is strong:**
- The stack fits government hosting and the open-source policy.
- Append-only custody, maker-checker controls, two-party weighing and "manual entry with photo always allowed" (§20.5) are exactly the right instincts.
- The manual pilot first, the honest limits and the refusal of mandatory Aadhaar all reduce build risk.
- At Indore's scale, load is not a concern.

**Why not higher:**
- Four named technology choices do not work as described in the real world: Web Bluetooth scales with app-signed readings, re-hashing without raw IMEIs, AIS-140 as the GPS source, and daily PFMS batches paying in 1–4 days.
- The timeline shrank while the scope grew. With 7 people, the real figure is about 1.5–1.7 times the PRD's.
- Recommendations from the v2 technical and hosting reviews (sync protocol, ledger, migrations, admin second factor, RPO) were not carried into v3.

**With the section 7 fixes: about 7 / 10.** The product is buildable by a normal government SI. The fixes are mostly **decisions and rewording**, not new invention: an Android shell for field roles, the money rails that exist today, and an honest scope and timeline.
