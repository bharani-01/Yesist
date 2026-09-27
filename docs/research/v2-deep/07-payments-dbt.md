# 07 — Government payments, DBT and settlement feasibility

**Agent:** 07 of 36 · **Date:** 2026-09-26 · **Scope:** PRD v2 files `04-consumer.md`, `05-local-recycle-shop.md`, `10-workflows.md`, `11-integrations.md`
**Question:** Can an Indian government programme pay citizens a UPI incentive at collection and pay shops weekly within 7 days of hub receipt, possibly through a contracted operator holding float?

**Bottom line:** Both promises are achievable only if the PRD separates *where the money comes from*. If the money is public (Consolidated Fund of India or of a State), it must flow through PFMS / State IFMIS under DBT Mission and Treasury Single Account (TSA) rules. Those rails pay to Aadhaar-seeded or validated bank accounts through APBS or NACH, not to a UPI VPA, with a published T+4 working-day response SLA. In that case a private operator may not hold scheme float. It can only work against a drawing limit (TSA Hybrid). "Instant UPI at collection" is not a native public-money capability today. If the money comes from producers (EPR take-back budgets), it is private money: a bank or an RBI-authorised payment aggregator can pay by UPI instantly from an escrow account. v2 currently blends the two ("scheme budget or producer take-back pool"), and this is the biggest gap.

---

## 1. Sources

| # | Source | URL | Status |
|---|--------|-----|--------|
| S1 | DBT Mission, *SOP for DBT Payments* (Jan 2019): four-stage process, maker-checker, DBT Scheme Codes, APB-else-NACH routing, **T+4 working days** max for the success/failure response | https://dbtbharat.gov.in/data/documents/SOP%20for%20DBT%20Payments.pdf | Verified (search extract) |
| S2 | CGA OM No. 146 dt 28-11-2025: extension of SNA-SPARSH to DBT schemes; direct State→NPCI APBS for Aadhaar DBT, PFMS-IFMIS-eKuber for account DBT; DBT Mission code mandatory; **PFMS Beneficiary ID mandatory from 1 Jan 2026** | https://cga.nic.in/writereaddata/file/SOPDBTOM146dt28112025.pdf | Verified (search extract) |
| S3 | PFMS DBT FAQ: scheme creation and DBT configuration are prerequisites; Aadhaar "not mandatory but desirable"; all PFMS payments routed through NPCI (APBS/NACH) | https://pfms.nic.in/SitePages/doc/PFMS_DBT_FAQ.pdf | Verified (search extract) |
| S4 | DBT Bharat document index: DoE OM on mandatory PFMS use in DBT (23-12-2014); mandatory routing of DBT through NPCI (26-05-2017) | https://dbtbharat.gov.in/static-page-content/spagecont?id=4 | Verified (index only; OMs not opened) |
| S5 | Union Budget statement on SNA and SNA-SPARSH: just-in-time release, "avoids float/idle parking of funds"; phased rollout 2023 to Nov 2025 | https://www.indiabudget.gov.in/doc/eb/stat4aa.pdf | Verified |
| S6 | DoE OM 16-01-2024 / CGA OM 385 dt 30-09-2025: unspent SNA balances returned to the Consolidated Fund via Bharatkosh | https://doe.gov.in/circulars/just-time-release-centrally-sponsored-scheme-css-funds-through-sna-sparsh-model-procedure ; https://cga.nic.in/writereaddata/file/OMNo385dt30092025.pdf | Verified |
| S7 | DoE guidelines for Central Sector Schemes (09-03-2022): RBI e-Kuber assignment accounts; agencies "shall not open/operate/park funds in any other bank account"; EAT module or PFMS integration, updated daily | https://cga.nic.in/writereaddata/file/GuidelinesCentralSectorSchemesDt09032022.pdf | Verified |
| S8 | CGA FAQ on TSA Hybrid (OM 360-361 dt 29-01-2025): applies where a **private sub-agency** cannot hold an RBI account; private SAs get **drawing limits** in commercial-bank zero-balance/savings accounts, claim-based | https://cga.nic.in/writereaddata/file/OMNo360-361Dt29012025.pdf | Verified (search extract) |
| S9 | CGA PFMS rollout page (EAT module: expenditure, advances, transfers) | https://cga.nic.in/Page/Roll-out-.aspx | Verified |
| S10 | CAG State Finances chapter citing Receipts & Payments Rules r.100(2): no drawal "unless required for immediate disbursement"; parking outside Government Account criticised | https://cag.gov.in/webroot/uploads/download_audit_report/2020/09_Chapter%204%20-%20Financial%20Reporting-0624574ad13beb7.53614971.pdf | Verified |
| S11 | GFR 2017 (updated to 31-01-2026): sanction, propriety, grants-in-aid; interest on released funds to be remitted to CFI (training deck) | https://www.startupindia.gov.in/content/dam/startupindia/homebanners/GFR-31st-Jan-2026.pdf ; https://www.mcrhrdi.gov.in/asodr2018/week3/1-ASO-DR-GFR2017-May2018.pdf | Partly verified (exact rule numbers for interest/advances UNVERIFIED) |
| S12 | CGST Act s.51 (GST TDS): govt departments, local authorities, govt agencies deduct 1% CGST + 1% SGST (2% IGST) where a contract's taxable value exceeds ₹2.5 lakh | https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter10/section51_v1.00.html ; https://gst.kar.nic.in/Documents/FAQ/FAQsonTDS.pdf | Verified |
| S13 | Notification 06/2024-CT(Rate): RCM on **metal scrap (Ch. 72–81)** supplied by unregistered to registered persons, from 10-10-2024 | https://taxguru.in/goods-and-service-tax/gst-reverse-charge-mechanism-rcm-metal-scrap.html | Secondary source; primary notification not opened |
| S14 | E-waste GST rate: HSN 8549 reportedly 5% from 22-09-2025; older commentary says 18% | https://blog.saginfotech.com/gst-rate-hsn-code-scrap-materials ; https://www.taxtmi.com/forum/issue?id=119267 | **UNVERIFIED** (conflicting secondary sources) |
| S15 | Income-tax s.206C(1): TCS 1% on "scrap" (manufacturing waste); Central and State Governments are excluded from "buyer"; 206C(1H) dropped from 1-4-2025 | https://taxnotice.vittsphere.com/caselaw/case/statutory-position-206c-scrap-and-the-explanation-definitions/ ; https://indiacode.ecourtsindia.com/finance-act-2025/section/72/ | Secondary; whether household e-waste counts as "scrap" is **UNVERIFIED** |
| S16 | RBI Master Direction on Payment Aggregators (15-09-2025): non-bank PA needs RBI authorisation and ₹15 cr net worth (₹25 cr by year 3); merchant funds kept in an escrow at a scheduled commercial bank; banks exempt | https://rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12896 ; https://sarafpartners.com/rbi-issues-the-reserve-bank-of-india-regulation-of-payment-aggregators-directions-2025/ | Verified |
| S17 | NPCI OC-101A (24-04-2025): payer apps must show only the CBS (bank-registered) beneficiary name from the Validate Address API | https://www.npci.org.in/uploads/UPI_OC_No_101_A_FY_2025_26_Strengthening_beneficiary_name_verification_and_display_during_UPI_transactions_eb7bd7ed72.pdf | Verified |
| S18 | NPCI UPI Consolidated Circular (P2P collect restrictions, Reserve Pay limits) | https://www.npci.org.in/uploads/UPI_Consolidated_Circular_f9c023a0ef.pdf | Verified (not read in full) |
| S19 | Aadhaar Act s.7 plus UIDAI circulars: a scheme-specific Gazette notification is needed to make Aadhaar mandatory for a Consolidated-Fund benefit; an alternative ID must be offered; States may notify for State-funded schemes | https://uidai.gov.in/images/Aadhaar_Act_2016_as_amended.pdf ; https://www.uidai.gov.in/images/UIDAI_Circular_Guidelines_on_use_of_Aadhaar_section_7_of_the_Aadhaar_Act_2016_by_the_State_Governments_25Nov_19.pdf ; https://uidai.gov.in/images/Circualr_3_of_2024.pdf | Verified |
| S20 | CAG PM-KISAN audits: Assam (37% ineligible, 0.24% recovered, fake registrations made by prefixing zeros to account numbers, 3,104 multiple registrations on the same accounts); Bihar (₹39 cr to income-tax payers, 16–24 months to detect; ₹22.6 lakh credited to wrong persons' accounts; payments made despite stop-payment requests) | https://cag.gov.in/uploads/download_audit_report/2024/04-Overview-066d9895d3f9b77.87175827.pdf ; https://cag.gov.in/uploads/download_audit_report/2022/2--Report-no---5--ENGLISH-Overview-0639c52a034c633.08461765.pdf | Verified |
| S21 | Uttarakhand/Rudraprayag Digital Deposit Refund System (district MoU with Recykal, 2022): ₹10 **deposit** refunded by UPI or cash at centres and reverse vending machines | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2204421 ; https://www.recykal.com/articles/india-s-first-digital-deposit-refund-system-wins-digital-india-awards-2022 | Verified |
| S22 | PIB: CBDC (e₹) programmable DBT pilots for PMGKAY in Gujarat and Puducherry (Feb 2026) and Chandigarh / DNH; no government UPI-VPA DBT pilot found | https://www.pib.gov.in/PressReleasePage.aspx?PRID=2299535&lang=2&reg=48 | Verified; "no UPI DBT pilot" is a negative finding and **UNVERIFIED** |
| S23 | E-Waste (Management) Rules 2022 and 2024 amendments: EPR certificate price band set at 30–100% of environmental compensation; no consumer deposit-refund mandate | https://indiacode.ecourtsindia.com/rules/be675cf8/ | Verified |

---

## 2. Findings

### F1. Public-money DBT pays to Aadhaar or bank accounts, not UPI IDs (high confidence)
PFMS routes all DBT through NPCI's APBS (Aadhaar as the financial address) or NACH (account + IFSC) (S1, S3, S4). SNA-SPARSH extends this with direct State→NPCI APBS connectivity (S2). A DBT Mission scheme code is mandatory, and from 1 Jan 2026 so is a PFMS Beneficiary ID per beneficiary (S2). No official government DBT on a UPI VPA was found. The new "digital-cash" DBT experiments use CBDC wallets, not UPI (S22). **Implication:** `11-integrations.md §4` ("UPI through a … PFMS-linked route") conflates two rails. A PFMS-linked route will collect a bank account or Aadhaar, not a VPA. A VPA can still be used to *discover* the account, because the Validate Address API returns the CBS name (S17). The account itself then has to be registered and validated in PFMS.

### F2. "Paid when marked collected" cannot be instant on public money (high confidence)
The DBT SOP expects maker-checker authorisation of payment files after eligibility conditions are met, and allows up to **T+4 working days** for a success/failure response (S1). Under TSA or SNA-SPARSH, each payment needs a sanction, a DDO bill and a PAO digital signature, or a claim against an assigned limit (S7, S8). An event-triggered, per-transaction public payout within minutes of a shop tap has no precedent in the sources reviewed. What *is* feasible on public money is a **daily batch**: incentives marked collected by a cut-off time are paid in the next file, with credit typically in 1–4 working days. Instant payment is possible only with private money (producer pool) held by a bank or an authorised PA (S16). The Kedarnath scheme shows UPI refunds at collection work in a government-backed programme, but the money there is the consumer's own **deposit** held by the private partner, not budget money (S21).

### F3. A private operator may not hold government float; it can hold a drawing limit (high confidence)
The Receipts & Payments Rules bar drawing money "unless required for immediate disbursement", and CAG routinely flags parking of funds outside the Government Account (S10). DoE's Central Sector guidelines forbid agencies from parking scheme funds in other accounts (S7). SNA-SPARSH exists specifically to "avoid float/idle parking", and unspent balances must go back to the Consolidated Fund (S5, S6). The sanctioned route for a private implementer is **TSA Hybrid**: a private sub-agency receives a *drawing limit* on a zero-balance commercial-bank account and pays on claims, with PFMS updated daily (S7, S8). Separately, any non-bank that pools and disburses third-party money by UPI at scale is doing payment-aggregator business and needs RBI authorisation, ₹15 cr net worth and an escrow account (S16). **Implication:** "operator holding float" should be struck. Replace it with (a) a TSA-Hybrid drawing limit for public money, or (b) a bank-held or PA-held escrow funded by producers for private money.

### F4. Weekly shop settlement within 7 days is feasible but tight; the 40% advance is the real problem (medium confidence)
A weekly batch is well within public financial practice. The MSME 45-day payment norm is far looser (UNVERIFIED, not researched here). The risk is the chain: hub receipt, then the 72-hour weight-dispute window (`10-workflows §4`), then the payment file, maker-checker and PAO signing (S1, S7), then a T+4 response. That adds up to roughly 7–10 calendar days, so "within 7 days of hub receipt" will be missed routinely on public rails. A defensible SLA is "payment file approved within 3 working days of hub receipt; credit within T+4 working days of the file". Advances of up to 40% of average weekly value, recovered from later settlements, are advances to *suppliers*. GFR expects advances to vendors to be sanctioned and secured, and a rolling, formula-based advance to thousands of unregistered micro shops is very likely to draw an audit para (S11; the exact GFR rule on securing advances is UNVERIFIED). Advances should therefore come from producer money or the operator's own working capital, never from the scheme head.

### F5. Tax treatment differs by shop tier; v2 is silent (medium confidence)
- **GST TDS (s.51):** applies only when the *payer* is a government department, local authority or government agency, and only for contracts above ₹2.5 lakh taxable value: 2% (S12). Most micro shops fall below this per contract, and unregistered micro-tier suppliers have no GSTIN to deduct against. The standard tier with a GSTIN on annual agreements can cross the threshold, and the system must then compute, report and certify TDS.
- **RCM on metal scrap:** if shops or hubs sell *dismantled* copper, aluminium or iron (Ch. 72–81) to a registered buyer, the buyer pays GST under reverse charge (S13). Whole e-waste (HSN 8549/8548) is not on the list. The PRD should stop shops from declaring dismantled metal, or record HSN per lot.
- **E-waste GST rate:** conflicting secondary sources give 5% (8549, post Sept 2025) and 18% (S14). **UNVERIFIED.** The rate card must carry an HSN/rate field that the operator can configure.
- **TCS s.206C(1) at 1%:** applies to sales of "scrap" (manufacturing waste) by sellers. Governments are excluded as buyers (S15). Whether post-consumer e-waste counts as "scrap" is **UNVERIFIED**; it matters for hub→recycler sales.
- **Citizen incentive:** small benefit payments carry no GST or income-tax deduction obligations that we found (not formally verified).

### F6. Aadhaar-verified micro-tier onboarding needs a legal basis (high confidence)
If shop onboarding or citizen eligibility requires Aadhaar for a benefit paid from a Consolidated Fund, s.7 of the Aadhaar Act requires a scheme-specific Gazette notification, enrolment support and an **alternative ID** (S19). `05 §S1` makes "Aadhaar-verified owner phone" mandatory for the micro tier with no alternative. That is non-compliant unless the scheme is notified and an alternative path exists. If only producer money is involved, the Aadhaar Act's s.4/s.8 private-use restrictions apply instead (UNVERIFIED detail).

### F7. DBT leakage precedents map directly onto v2's design (high confidence)
PM-KISAN audits found fake registrations made by prefixing zeros to account numbers, many beneficiaries sharing one account, credits to the wrong person's account, payments continuing after stop-payment orders, and near-zero recovery (0.24% in Assam) (S20). For EcoSure the equivalent risks are:
- many citizen "pickups" paid to a small set of VPAs or accounts, which is shop–citizen collusion;
- incentives paid on `collected` before the hub weighs anything, so weight is inflated at the shop;
- reversal "by the operator" (`04 §C6`) with no recovery path, because UPI credits cannot be clawed back from citizens in practice.

The v2 cap of 4 paid pickups per citizen per month is keyed to the citizen, but money is paid to a VPA. The cap needs to apply per **payee account** (bank-name hash from Validate Address) and per device and address as well.

### F8. CAG will audit the platform, not just the money (medium confidence)
Based on the audit patterns above (S10, S20), CAG or AG performance audits will ask for:
- eligibility evidence behind each payment (weigh photo, hub receipt);
- maker-checker logs;
- reconciliation between the platform ledger and PFMS/bank statements;
- stop-payment enforcement;
- recovery registers;
- interest on any funds held.

v2 has idempotency and a reconciliation record (`11 §4`) but no maker-checker, no recovery register and no PFMS/IFMIS reference fields.

---

## 3. Fit with v2

| v2 promise | Public money (CFI/State) | Producer money (EPR pool) |
|---|---|---|
| UPI incentive at `collected` (`04 §C6`, `10 §1, §3.9`) | **Not feasible as instant.** Daily batch through PFMS/IFMIS to a validated account; T+1 to T+4 | Feasible: bank payout API or RBI-authorised PA from escrow; instant |
| Pay to UPI ID (`11 §4`) | Use the VPA only to discover the account; pay by APBS/NACH | Feasible |
| Weekly shop settlement within 7 days of hub receipt (`05 §S5`, `10 §7`) | Feasible weekly; 7 days **tight**, so reword the SLA | Feasible |
| Advance up to 40% (`10 §7`) | **Audit risk**; avoid | Feasible with operator/producer credit risk |
| Operator holds float | **Not permitted**; use TSA-Hybrid drawing limit | Only via bank escrow or an authorised PA |
| Aadhaar-verified micro shops (`05 §S1`, `11 §7`) | Needs s.7 notification plus an alternative ID | Consent-based; offline or masked verification only |
| Operator reversal of incentive (`04 §C6`) | Needs recovery register; recovery practically nil | Same |

---

## 4. Gaps in v2

1. No **funding-source model**. "Scheme budget or producer take-back pool" decides which rails, laws and SLAs apply, and v2 leaves it open.
2. No **payment approval flow**: maker-checker, DDO/approver roles, daily cut-off, batch file, and PFMS/IFMIS/UTR references per payout.
3. No **sponsor-bank or PA contract model**, and no statement on who legally holds money at each step.
4. Incentive released **before any independent weight check**, with no clawback path except against the shop.
5. Abuse caps keyed to the citizen, not to payee account, device or address.
6. No **tax fields**: HSN per lot/category, GST rate, GST-TDS applicability, RCM flag for metal scrap, TDS certificates for standard-tier shops.
7. Aadhaar is mandatory with no alternative ID and no s.7 basis.
8. No **stop-payment, recovery register or unclaimed/failed-payout** policy (for example, a VPA that is closed, or an account frozen by the bank). Failed DBT credits return with NPCI reason codes (S4) and need re-validation.
9. No mention of **interest, idle balance or year-end lapse** of scheme funds (S6).
10. Settlement SLA ignores the 72-hour dispute window and approval time.

---

## 5. Recommended PRD changes

| File | Section | Change |
|---|---|---|
| `11-integrations.md` | §4 UPI payouts | Rewrite as **"Payouts — two rails"**. (a) *Public rail:* PFMS/State IFMIS under DBT Mission code and TSA/SNA-SPARSH; beneficiary registered with PFMS Beneficiary ID; payment by APBS or NACH to the account resolved from the VPA via Validate Address; daily batch; store PFMS batch ID, UTR, NPCI return code. (b) *Private rail (producer pool):* sponsor bank payout API or RBI-authorised PA escrow; instant UPI. The programme's funding decision picks the rail per corridor. Remove "PFMS-linked UPI". |
| `04-consumer.md` | §C6 | Change "Paid … when the pickup is marked collected" to: "Queued on `collected`; paid instantly on the private rail, or in the next daily batch (credit in up to 4 working days) on the public rail. The citizen message states the expected date." Add caps **per payee account (bank-name hash), device and address**, not only per citizen. State that reversals are recovered from the **shop's** next settlement when fraud is attributable to the shop; citizen recovery is best-effort and logged in a recovery register. |
| `10-workflows.md` | §1 rules, §3 step 9 | Replace "paid on `collected`, not later" with "incentive **queued** on `collected`; released after automated checks (duplicate payee, cap, shop risk score)". Optional corridor setting: hold the incentive until hub receipt for shops with a variance history. |
| `10-workflows.md` | §7 Settlements | New SLA: "Settlement file approved (maker-checker) within 3 working days after the dispute window closes or hub receipt, whichever is later; credit within 4 working days of approval." Advances: "funded only from the producer pool or operator working capital; never from scheme funds; secured by the shop agreement." Add stop-payment, failed-credit re-validation and year-end unspent-balance rules. |
| `05-local-recycle-shop.md` | §S1 | Micro tier: "Aadhaar verification **or** an alternative ID (voter ID, PAN, Udyam, municipal trade licence). Aadhaar mandatory only if the sponsor issues a s.7 notification." |
| `05-local-recycle-shop.md` | §S5 | Change "within 7 days of hub receipt" to the SLA above. Add a TDS/GST line on statements for standard-tier shops (s.51 above ₹2.5 lakh per contract when the payer is a government entity). Statements show HSN and the reverse-charge flag if metal scrap is declared. |
| `02-roles-rbac.md` (not in my scope; flag only) | Roles | Add **Payment Maker** and **Payment Checker/Approver (DDO-equivalent)** roles, separated from operations. The operator cannot approve its own batches on the public rail. |
| `14-open-questions.md` | New OQs | Funding source per corridor; sponsor bank; TSA-Hybrid vs SNA-SPARSH applicability; GST rate/HSN for e-waste (5% vs 18%); whether s.206C "scrap" covers household e-waste; whether the scheme gets a s.7 Aadhaar notification. |
| Data model / schema (future) | Payouts | Fields: `funding_source`, `rail`, `pfms_beneficiary_id`, `batch_id`, `maker_id`, `checker_id`, `utr`, `npci_return_code`, `recovery_status`, `hsn`, `gst_rate`, `gst_tds_amount`, `rcm_flag`. |

---

## 6. Score

**5 / 10.** Paying citizens and shops is the core incentive loop, and v2 correctly makes it idempotent, reconciled, capped, and paid out regardless of disputes. But the two headline promises ("UPI at collection" and "within 7 days") are written as if the money were private, while the sponsor is a government. Operator float is not permissible on public money. The Aadhaar-only micro tier lacks a legal basis. The fraud controls are weaker than CAG's PM-KISAN findings require. The fixes are mostly wording, roles and data fields, not a redesign. With the two-rail model, it would score about 8.
