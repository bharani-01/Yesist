# 35 — Pre-mortem: "It is September 2028 and EcoSure has been shut down"

**Agent:** 35 of 36 (v2 deep research swarm)
**Date written:** 2026-09-27
**Method:** Klein-style pre-mortem. Assume failure, then work backwards to the most plausible causal chains, grounded in the PRD v2 files and the swarm reports available at the time of writing.
**Inputs read:** all 17 files in `docs/prd/` (`README.md`, `00`–`15`), and all 18 reports then present in `docs/research/v2-deep/` (`01`–`18`). Reports 19–34 and 36 did not exist yet, so this pre-mortem does not reflect them.
**Status:** Research only. No PRD file was edited.

---

## 0. Bottom line

- **Survival probability for PRD v2 as written: about 30%.** "Survival" here means the programme is still operating in the Indore corridor under a live sponsor mandate in September 2028. It does not need to have reached Phase 2 to count.
- **With the ten changes in section 4 adopted before the pilot starts: about 60%.**
- The PRD's product logic is sound. It pays at the door, settles shops weekly, treats the recycler as the root of trust, uses honest naming, runs a manual pilot first, and gates each corridor on density. Swarm reports 15 and 16 find that this logic matches what worked in Kerala, GHMC Hyderabad, Ghana and China. **None of the five failure stories below starts with a bad product idea.** Each one starts with an institutional, legal, money or political fact that v2 does not model.
- The 18 swarm reports average **4.9 / 10**. The weakest angles are batteries and hazardous waste (3), DPDP (4), accessibility (4), Aadhaar/KYC (4), procurement (4), RTI (4) and funding (4). Nearly all of these are document, contract and gating fixes, not new software.

### Why 30%

Each story gets an unconditional probability that it happens and is fatal by September 2028. The five risks are treated as roughly independent.

| # | Failure story | P(fatal), v2 as written | P(fatal), with section-4 changes |
|---|---------------|------------------------:|---------------------------------:|
| 1 | Money and procurement stall | 35% | 15% |
| 2 | Indore Municipal Corporation (IMC) channel conflict and additionality scandal | 20% | 10% |
| 3 | The sponsor's own pilot is found non-compliant, triggered by a hazard incident | 15% | 7% |
| 4 | Incentive farming plus a ghost recycler: "government platform launders paper recycling" | 12% | 6% |
| 5 | No one pays for the evidence: value mismatch and funding cliff | 20% | 12% |
| | **Survival = ∏(1 − p)** | **≈ 31%** | **≈ 59%** |

Timeline anchor: the calendar is tighter than the roadmap implies.

| Date | Event | Source |
|------|-------|--------|
| Sep 2026 | PRD v2 written; sponsor decisions SP-01 to SP-10 all unconfirmed | `14` |
| Oct 2026 – Feb 2027 | Realistic "Stage −1": administrative approval, sanction, pilot operator contract, payout route | 10 |
| 1 Oct 2026 | WhatsApp service replies become billable; government WABA needs a BSP and Meta approval (3+ weeks) | 08 |
| Early–mid 2027 | 12-week manual pilot, if Stage −1 finishes | `13` |
| **13 May 2027** | DPDP Act fiduciary obligations commence: notice, consent, breach reporting, security | 04 |
| 2027 | Software SI procurement: 6–12 months competitive, or 2–5 months through MPSEDC nomination | 10 |
| Late 2027 – 2028 | Phase 0 + Phase 1 (18–24 weeks), CERT-In safe-to-host audit, STQC CQW (5–6 months) | 05, 06, 10 |
| Feb–Mar 2028 | MP state budget for FY 2028-29 decides whether the scheme line continues | 17 |
| Late 2028 | MP assembly elections due (last held Nov 2023). Model code of conduct and pre-election scheme reviews. *Context from general knowledge, not a swarm source.* | — |

Realistic sponsor-approval-to-Phase-1 is **14–20 months** on a competitive route (report 10). So in the best plausible case, EcoSure software goes live in the first half of 2028, about six months before a state election. Every story below plays out inside that window.

---

## 1. The five failure stories

### Story 1 — "The pilot that the treasury could not pay for" (P ≈ 35%)

**Causal chain**

1. **Oct 2026.** The PRD assumes a contracted operator, a UPI incentive and an 8-week settlement float exist on day one of the pilot (`13`, `00` §8). None has a procurement instrument. Any MP service above ₹2.5 lakh needs an open tender of at least 21 days unless it is nominated (report 10, F4).
2. The sponsor decides SP-04, SP-05 and SP-07 late. Finance asks who holds the float. Under the Receipts & Payments Rules, SNA-SPARSH and TSA, a private operator may not hold scheme float (report 07, F3; report 10, F5). The float becomes an "advance" that needs FA concurrence and a bank guarantee. Weeks pass.
3. **Early 2027.** The pilot starts four months late, funded by a workaround in which the operator pre-finances from its own working capital. Incentives come from scheme money routed through PFMS/IFMIS, which pays to Aadhaar-seeded or validated bank accounts in batches with up to **T+4 working days** response (report 07, F1–F2). The WhatsApp message says "incentive paid", and the money arrives four days later. Citizens complain on WhatsApp and to IMC.
4. The shop settlement chain runs: hub receipt, then the 72-hour dispute window, then maker-checker, then PAO signing, then T+4. That is 7–10 days, and the "within 7 days" promise is **structurally unmeetable** (report 07, F4). Shops, whose entire reason to join was fast money, divert high-value items back to kabadiwalas. The week-8 gate asks "no sign that shops send only low-value material" (`13`), and it fails.
5. The gate is re-run once, as the roadmap allows. Now the operator's pre-financing is exhausted, and the 40% advances have been drawn by shops and cannot be recovered from falling volumes. An Accountant General inspection flags the advances as unsecured supplier advances (report 07, F4).
6. The second gate failure hits the roadmap's own kill criterion: "If it fails again, stop and report to the sponsor" (`13`). Even if the pilot had passed, strict gate sequencing leaves a **6–12 month gap** before an SI exists (report 10, F9), and the field team disbands.
7. **2027–28.** The sponsor's officer is transferred. The file closes as "pilot concluded; not scaled."

**Early warning signals**

- SP-04, SP-05 and SP-07 still "default" or unconfirmed by 31 Dec 2026.
- No named procuring entity or route (MPSEDC nomination, GeM custom bid) by pilot week −4.
- The finance department asks "who holds the float?" in writing.
- The first pilot incentive is paid more than 24 hours after `collected`.
- Median shop payment is above 7 days in any of pilot weeks 2–4, or the high-value share of shop lots falls week on week.
- The operator asks for a scope change or an advance before week 6.

**The one 2026 decision that would have prevented it**

> **Adopt the two-rail, layered money model before the pilot.** Core citizen and shop payments come from recycler offtake value (scrap plus a share of EPR certificate value) passed down the chain, and are paid instantly from a bank- or recycler-held escrow. Scheme money is only a daily-batch DBT top-up. No float is held by the operator. SLAs are rewritten to what the rails can actually meet. (Reports 07 §5, 17 §5, 10 SP-12.)

---

### Story 2 — "Indore already had an e-waste programme" (P ≈ 20%)

**Causal chain**

1. The PRD's sponsor is the SPCB plus the state IT department. It never mentions that **IMC already collects about 2–2.5 t/day of e-waste** through door-to-door vehicles and two vendors. IMC also ran a CM-flagged Swachhotsav e-waste drive in September 2025 and announced a paid doorstep-pickup app (reports 12 F2, 15 §3.7).
2. EcoSure launches a scheme-funded UPI incentive in the same wards. Citizens now face three offers: IMC's free vehicle, IMC's paid app, and EcoSure paying them. IMC and UADD read EcoSure as the SPCB encroaching on the city's flagship Swachh brand, eight years at #1 (report 12 F7).
3. The success metric is "formal tonnes grow every month" (`00` §7). There is no baseline and no additionality measure, so tonnes rise partly because IMC vendor material and government-office disposals get relabelled as EcoSure tonnes (report 15 §3.7, §6).
4. Micro-tier KYC needs a shop photo with a signboard and Aadhaar (`05` S1). That excludes itinerant, mostly women waste pickers: 93% of Indore's more than 3,000 pickers are women (report 14 F5). Non-enrolled kabadis lose supply to incentivised shops. Advocacy groups link EcoSure to IMC's documented 2018–19 displacement of pickers before Swachh Survekshan (report 14 F5).
5. "Indore + Pithampur" branding and a planned hub raise the question "is more toxic waste coming to Pithampur?" This happens against the Union Carbide protests of 2025 and the April 2026 Sector-3 fire (report 12 F5).
6. **2028.** A journalist or an AG performance audit compares EcoSure's tonnes with IMC's vendor tonnes and finds additionality near zero. Waste-picker organisations protest. IMC declines to renew cooperation, and the SPCB loses political cover in a pre-election year. The programme is merged into IMC's own channel, which is a polite shutdown.

**Early warning signals**

- No IMC Additional Commissioner (SWM) meeting in pilot week 0.
- IMC launches or expands its own paid pickup app during the pilot.
- More than 30% of pilot tonnes come from bulk or government sources with no household split reported.
- Any EcoSure lot that traces back to an IMC vendor.
- Grievances from non-enrolled kabadis, or waste-picker organisation statements.
- Local Hindi press asks about the "Pithampur hub".

**The one 2026 decision that would have prevented it**

> **Make IMC/UADD a co-sponsor under an MoU before the pilot.** IMC vehicles, MRFs and drop boxes become EcoSure collection points. The programme runs Indore-first, with no Pithampur hub. A **measured pre-pilot formal baseline** (IMC vendor tonnes plus recycler inbound from the corridor) is taken, and success is reported as **additional** tonnes by source. (Reports 12 §5, 15 §7 items 1–3.)

---

### Story 3 — "The regulator's own pilot broke the regulator's rules" (P ≈ 15%)

**Causal chain**

1. Under the E-Waste (Management) Rules 2022, shops and hubs have **no registration category**. They are lawful only as documented agents or collection points of a registered recycler, producer or PRO (reports 01 §2.3, 03 F1). The PRD onboards them as independent traders paid on a platform rate card, and it lets provisional shops operate with no written agreement.
2. Batteries sit inside most target items. They fall under the Battery Waste Management Rules 2022, with a **90-day storage cap**, a rule that only recyclers, producers or refurbishers may run collection centres, CTE/CTO/HW authorisation, and Form 10 plus SPCB intimation for transport (report 13 F1–F4). The PRD has one line on battery training.
3. The hub accumulates loose and swollen Li-ion alongside general e-waste in a monsoon-proofed but not fire-segregated godown. There is no fire NOC check, no quarantine container and no incident entity (reports 03 F8, 13 F7).
4. **2027 or 2028.** A battery thermal event causes a hub fire. Recent precedents include a Delhi godown in August 2026 with two dead, and Bidadi in April 2026 (report 13 F7). Or there is a lower-drama trigger: a lot mixes batteries into e-waste attestations, and a recycler rejects it as outside its registration.
5. The press and an NGT petition ask whether the hub had consent. It did not; MPPCB never issued the written direction. The recycler named as principal has only an e-waste registration, not a battery one, and it faces Rule 4(4) and Rule 22(3) "aiding and abetting" exposure. It withdraws from the offtake agreement.
6. MPPCB, the sponsor, cannot defend a programme that runs unconsented storage, so it suspends operations "pending review." With no second recycler and no hub, the corridor fails its own launch checklist, and the programme never reopens.

**Early warning signals**

- No MPPCB written direction on the hub and shop legal status by pilot week 0.
- Offtake agreement signed without accepted-category terms.
- Any loose battery in a pilot lot.
- A hub godown in Pithampur or near residential or school sites.
- No fire kit or fire NOC evidence at hub onboarding.
- A recycler reject reason citing batteries, CRTs or stripped devices.
- A shop observed stripping boards or repairing and reselling devices, which is unregistered refurbisher activity (report 01 G7).

**The one 2026 decision that would have prevented it**

> **Obtain an MPPCB written direction, and sign agency contracts (C1–C3 in report 03), before any pilot collection.** Shops operate as collection points and hubs as collection centres of a named registered recycler. Whole equipment only, no dismantling. Statutory dwell ceiling runs from first custody. **Loose batteries are excluded from the pilot** until a battery-registered collection centre with consent exists. (Reports 01 §5, 03 §7, 13 §5.)

---

### Story 4 — "Paper custody, real fraud" (P ≈ 12%)

**Causal chain**

1. The citizen incentive is paid on `collected`, and the only witness is the shop's own weigh record (`10` §1; `04` C6). The cap is 4 pickups per citizen, keyed to the citizen, while money goes to a UPI VPA (report 07 F7). The incentive is a flat amount per data-bearing device (OQ-70).
2. Shops farm incentives. They book fake pickups with friends' phones and VPAs, split pickups to multiply per-device payments, and resell good phones on the grey market while padding lot weight with other scrap. Weight-only reconciliation cannot see device substitution (report 16 F2–F3; the China 2009–11 trade-in voucher pattern).
3. At the root of trust, the corridor's single recycler was checked on paper against a list that ghost plants also appear on. Newslaundry found **31 of 41 registered e-waste plants inactive or irregular** in 2025 (report 18 F2). The capacity cap uses declared capacity, which is exactly what is inflated. "Processed" needs no output evidence. Issuance is protected by phone OTP only, the same pattern as the 2023 CPCB plastic-portal credential takeover (report 18 F5).
4. EcoSure attestations carry a government programme's name and a verify-by-number page. They get cited by producers or consultants as legitimacy for certificates sold from the same recycler. There is no single-attribution rule across the EcoSure and CPCB systems (report 18 P6).
5. **2028.** A CAG/AG audit samples paid incentives and finds clusters of VPAs sharing a bank-name hash, the PM-KISAN pattern (report 07 F7). Separately, CPCB or MPPCB suspends the recycler. EcoSure has no `revoked` or `under_review` status and no producer notification (report 18 P11).
6. The headline: "Government e-waste platform certified ghost recycler." The sponsor shuts the platform to limit damage.

**Early warning signals**

- Paid-pickup concentration: top 5% of VPAs or devices take more than 20% of incentives.
- Hub-received device count below shop-collected count.
- Shop lot weight above the sum of its pickups.
- Photo or slip reuse.
- Recycler inbound from EcoSure growing faster than 20% month on month against CTO capacity.
- An overdue recycler site re-verification.
- Issuance spikes in the 10 days before EPR filing deadlines.
- Only one recycler in the corridor.

**The one 2026 decision that would have prevented it**

> **No money or attestation may rest on a single self-interested witness.** Incentives are queued at `collected` and released after automated checks: caps per payee account, device and address; related-party blocks; a callback sample. The shop underwrites clawback if the hub-received count does not match. Attestations need a geotagged recycler site verification every 6 months, output mass balance, maker-checker plus step-up authentication, and a revoke lifecycle. At least two recyclers before scale. (Reports 07 §5, 16 R1–R2, R8, 18 C1–C7, C12.)

---

### Story 5 — "Nobody needed the evidence enough to pay for it" (P ≈ 20%)

**Causal chain**

1. The PRD sells producers an attestation library, brand attribution and a "target-gap view" in kilograms of e-waste by category (`08` P3–P4). Under Rules 13–15, producers discharge EPR **only by buying CPCB certificates, counted in kilograms of recovered Au/Cu/Al/Fe**. The obligation is independent of EEE code and brand, and certificates are pooled, so they cannot be traced to a lot (reports 01 §2.6, 02 F2–F4). The target-gap view is in the wrong unit, and brand attribution has no statutory effect.
2. Producers are litigating to pay **less**: the Delhi High Court challenge to the certificate floor price, with an interim stay in December 2025 (reports 01, 02 F7, 17 F1). The SPCB can direct producers to join, but it cannot direct them to pay into a state pool without a legal basis (report 17 F1). The "producer take-back pool" never materialises beyond one CSR-style gesture, and CSR cannot fund brand-linked incentives (report 17 F6).
3. The week-12 gate asks for "≥ 5 producers say they would use the exports" (`13`). Producers say yes politely, and nobody pays.
4. The PRD never produces the one artefact recyclers and the SPCB actually need: a **portal-ready seller receipt or procurement pack** (seller name, address, EEE code, commodity weight). The CPCB FAQ requires this for recycler procurement uploads (reports 01 G8, 02 §4). It also produces nothing mapped to MPPCB's quarterly action-plan report to CPCB (report 12 F3). So neither the recycler nor the SPCB feels operational pull.
5. If the Delhi High Court weakens the floor, or certificates keep trading below it at ₹6–8/kg (report 18 F2), recycler margins fall and offtake pass-through shrinks.
6. **FY 2028-29.** The state scheme line, which was annual, political and sized nowhere in the PRD (report 17 §4), is not renewed in a pre-election budget. There is no 12-month commitment or transition rule (report 16 R4), so incentives stop abruptly. Formal volumes collapse immediately, as China's did in the 2011–12 subsidy gap (report 16 F1). Saahas's bE-Responsible closed the same way when CSR ended (report 15 §3.4).

**Early warning signals**

- No producer signs any funded MoU by pilot week 12.
- Producers ask whether "attributed kg" counts toward EPR.
- The recycler re-keys EcoSure data by hand into portal procurement entries.
- The SPCB does not use EcoSure output in its quarterly CPCB report.
- A Delhi High Court judgment on Rules 15(9)–(10).
- Offtake price revisions downward.
- No multi-year budget line in the FY 2027-28 revised estimates.
- The pilot design has no rupee budget figure (report 17 gap 1).

**The one 2026 decision that would have prevented it**

> **Re-anchor the value proposition on the actors who already have a legal need, and fund the core from material value.** Build the recycler's portal procurement pack and portal-procurement links (by EEE code), and the SPCB's Schedule V and quarterly-report outputs, as the phase-1 deliverables. Drop brand attribution and the kg target-gap. Commit 12 months of incentive budget, with a written transition to offtake-funded pricing before any corridor launches. (Reports 01 §5.4, §5.8, 02 §5, 16 R4, 17 §5–6.)

---

## 2. Cross-cutting accelerants

These do not kill EcoSure alone, but each makes every story above faster or more likely.

| Accelerant | Effect | Source |
|------------|--------|--------|
| Compliance gates not in the roadmap: DPDP from 13 May 2027, CERT-In 6-hour reporting and logs, STQC CQW (5–6 months), IS 17802, gov.in domain | Phase 1 launch slips a further 3–6 months into the pre-election window (Story 1) | 04, 05, 06 |
| Aadhaar-only micro KYC with no alternative ID and no legal route | Onboarding blocked or legally challengeable; excludes women and itinerant collectors (Stories 1, 2) | 07 F6, 09, 14 F6 |
| WhatsApp government onboarding: BSP required, Meta approval, `IN` residency set at registration; SMS parity missing for money events | Launch delay; feature-phone citizens get no receipt for public money; scam impersonation of incentive messages (Stories 1, 4) | 08 |
| RTI handled "by the operator"; no statistical disclosure control | An RTI appeal or journalist request exposes shop-level data or a legal misassignment at the worst time (Stories 2, 4) | 11 |
| Single recycler per corridor | One suspension ends the corridor (Stories 3, 4) | 12 F1, 18 C12 |
| Operator and SI possibly the same firm | SLA data measured by the party being measured (Story 1) | 10 gap 5 |

---

## 3. What v2 gets right (do not undo these)

1. Pay the discarder at or near collection. No EcoPoints. (Reports 15, 16.)
2. Weekly shop settlement, undisputed weight paid, hub-paid freight. (Reports 14, 15.)
3. Recycler as root of trust using **existing** recyclers, not new plants; Delhi eco-park shows why. (Report 15 §3.2.)
4. "Custody attestation", never "certificate", with a mandatory disclaimer. Public verify-by-number. (Reports 01, 02, 18.)
5. "Formal EcoSure network only" on every aggregate. (Reports 11, 16.)
6. Manual Wizard-of-Oz pilot with kill criteria. (Reports 15, 16.)
7. Department owns data and code; OSS stack; state hosting. (Reports 06, 10.)

---

## 4. The 10 highest-leverage PRD changes (synthesised across swarm reports 01–18)

Ranked by how much failure probability each removes per unit of effort. Almost all are PRD, contract and gating changes, not code.

| Rank | Change | Kills / weakens | Files | Source reports |
|-----:|--------|-----------------|-------|----------------|
| 1 | **Two-rail, layered money model.** Core payments come from recycler offtake value (scrap plus certificate share), passed recycler → hub → shop → citizen, instant from escrow. Scheme money is a daily-batch DBT top-up for negative-value and data-bearing items. No operator-held float (use escrow/TRA or reimbursement). Advances never come from scheme funds. Settlement SLA becomes "file approved ≤ 3 working days after the dispute window; credit ≤ T+4". The incentive is **queued** at `collected`. A per-fund ledger produces utilisation certificates. At least 12 months of budget is committed before launch, with a transition plan. | 1, 5 | `00` §1/§8, `04` C6, `10` §1/§7, `11` §4, `03`, `14` SP-04/07 | 07, 10, 16, 17 |
| 2 | **Stage −1 plus a parallel, gate-conditional SI procurement.** Named procuring route (MPSEDC nomination under MP SPR Rule 6 for software; GeM custom bid or open tender for the operator). Operator ≠ SI. A realistic calendar with CERT-In audit and STQC buffers. "No phase **build** starts until the gate passes; procurement runs in parallel." A bridge extension for the pilot operator. | 1 | `13`, `14` (new SP-11 to SP-13), `00` §1 | 06, 10 |
| 3 | **Legal operating model and MPPCB written direction.** Shops are collection points and hubs are collection centres of a named **registered** recycler (CPCB registration + SPCB CTO + HOWM + registered EEE codes). Agency agreements are required even for provisional shops. Whole equipment only; no dismantling, stripping or refurbishment. Statutory dwell ceiling of 150 days (buffer inside Rule 11's 180) from first custody. Bulk-consumer handover names the recycler as receiver. | 3, 4 | `00` §1/§5/§8/§11, `02` §4, `05`, `06` H1/H2/H5, `07` R1, `03` | 01, 02, 03 |
| 4 | **IMC/UADD co-sponsor, baseline and additionality.** An MoU uses IMC vehicles, MRFs and drop boxes as collection points. Indore-first, with no Pithampur hub. A measured pre-pilot baseline; success = additional tonnes by source (household / society / institutional / government legacy / IMC channel). A monthly drive calendar. A government and bulk-consumer legacy channel to prove the chain early. | 2 | `00` §1/§6/§7/§8/§10, `13` pilot, `14` SP-10 | 12, 15 |
| 5 | **Incentive integrity.** Caps per payee account (bank-name hash), device and address, not only per citizen. Related-party blocks. Per-device count reconciliation from pickup to lot to hub, with a leakage flag. Shop-underwritten clawback. A ≥ 5% callback sample. Incentives differentiated by value and hazard, published per category (low or zero where street price already beats formal price). Beneficial-owner declaration and a ban on hub–recycler related parties in the pilot. | 4 | `04` C6, `10` §1/§3/§4, `03`, `02`, `14` OQ-70 | 07, 16 |
| 6 | **Root-of-trust hardening.** Capacity cap uses SPCB CTO capacity, pro-rated monthly. Geotagged site verification before approval and every 6 months. Registration states (`suspended`, `revoked`, `debarred`) driven by regulator notice. Output mass balance before issue. Attestation lifecycle (`under_review`, `revoked`) with producer notification. Maker-checker plus step-up authentication (not OTP-only) for issuance. Velocity alerts. At least 2 recyclers per corridor before scale. Kill criterion if a corridor recycler is found generating false certificates. | 4, 3 | `07` R1/R4/R5, `03`, `09`, `12` §2/§7, `13` gates | 01, 02, 18 |
| 7 | **Battery and hazardous-stream split.** Loose batteries excluded from the pilot. A `regime` / `hazard_class` on every item and lot; one regime per lot; battery weight never in e-waste attestations. A hub site-safety audit (fire, segregation, quarantine, spill kit, fire NOC or declaration). A `HazardIncident` entity with an SPCB notification clock. A Form 10 and SPCB intimation gate for battery trips. Separate CRT and lamp handling. | 3 | `03`, `05` S3/S4/S10, `06` H1/H3/H5, `09`, `10` | 03, 13 |
| 8 | **Re-anchor value on legal needs.** Replace brand attribution and the kg "target-gap" with a certificate-coverage view clearly labelled "only CPCB certificates fulfil obligations". Build a **portal-ready procurement pack** (seller receipt by EEE code with commodity weight) for recyclers. `portal_links` point to recycler procurement entries, not certificates. An EEE-code dimension and versioned CPCB reference data. SPCB outputs mapped to Schedule V and the quarterly action-plan report. Drop the "SPCB portal worksheet" until MPPCB confirms it exists. | 5 | `08` P3–P7, `07` new R9, `03`, `09` | 01, 02, 12, 17 |
| 9 | **Compliance-by-design launch gates.** DPDP notice, consent records, lawful basis per purpose, breach runbook (CERT-In 6 h, Board 72 h, principals), children policy, processor DPAs, all live before any citizen onboarding after 13 May 2027. CERT-In NTP, 1-year logs and point of contact. Annual and post-change audits. MFA for officials. RPO/RTO. GIGW 3.0, gov.in domain, STQC CQW, IS 17802 with an ACR. WhatsApp through a department-owned WABA with `IN` local storage. DLT `-G` SMS with parity for every money event. Channel anti-scam controls. | 1, 4 | `12`, `11` §2/§3, `13` Phase 0/1 exits, `04` C1 | 04, 05, 06, 08 |
| 10 | **Lawful micro-KYC, informal inclusion and transparency.** Any-of identity (DigiLocker, Aadhaar offline QR/VC, or in-person check); Aadhaar never mandatory; name-matched payout account. A no-premises collector tier and collectives/SHGs. NAMASTE and e-Shram linkage as optional benefits. Worker-data purpose limitation (not an enforcement registry). A displacement-grievance metric with a redesign trigger. RTI decided by the PIO (operator only retrieves). Statistical disclosure control on aggregates. A legal hold on anonymisation. | 2, 1 | `05` S1, `02` §4, `11` §7, `03`, `09` G9, `12` §6, `14` OQ-74, `00` §7 | 09, 11, 14 |

### If only three can be done before the pilot

1. **Rank 1 (money model).** It removes the single largest failure chain and is a precondition for honest shop and citizen promises.
2. **Rank 3 (MPPCB direction and agency model).** It is one letter from the sponsor's own board plus standard contracts, and without it the pilot operates in a legal grey zone from day one.
3. **Rank 4 (IMC co-sponsor and additionality baseline).** It turns the most powerful local incumbent from a competitor into a channel, and it makes the pilot's results defensible.

---

## 5. Pre-mortem tripwires to add to `13-roadmap.md` (proposed)

A short monitoring list the sponsor can review monthly. Any **red** means stop and fix before the next gate.

| Tripwire | Amber | Red |
|----------|-------|-----|
| Sponsor decisions SP-01 to SP-10 plus money, procurement and legal decisions confirmed in writing | < 80% by pilot week −4 | Any of SP-04, SP-05, SP-07, or the MPPCB direction missing at week 0 |
| Time from `collected` to citizen credit | > 24 h median | > 4 working days median |
| Shop payment time from hub receipt | > 7 days median | > 10 days median, two weeks running |
| High-value share of shop lots, week on week | Falls 2 weeks running | Falls 4 weeks running |
| Additional tonnes vs baseline | < 50% of reported tonnes | Baseline not measured |
| Incentive concentration (top 5% of payee accounts) | > 15% of spend | > 25% of spend |
| Device-count leakage (hub count / shop count) | < 97% | < 90% |
| Recycler site verification | Due within 30 days | Overdue |
| Loose batteries or mixed-regime lots | Any | Any at a hub without battery consent |
| Committed incentive budget ahead | < 12 months | < 6 months, with no transition plan |
| Non-enrolled kabadi grievances | Any organised statement | Protest or press coverage |

---

## 6. Limits of this pre-mortem

- It uses only swarm reports 01–18. Later reports (19–34, 36) may change the probabilities, especially on unit economics, UX and adoption.
- The probabilities are judgement calls, anchored to the swarm's evidence and to precedents (China 2011–12 subsidy gap, EDMC and BMC low household uptake, Saahas closure, Newslaundry ghost plants, CAG PM-KISAN findings). They are not a statistical model.
- The MP assembly election timing (late 2028) is general knowledge, not a swarm-verified source.
- Several load-bearing facts inherited from the swarm are marked UNVERIFIED in their source reports:
  - IMC tonnage and the direction of its ₹20/kg payment.
  - The Hazargo link to the Pithampur fire.
  - The status of the Delhi High Court floor-price litigation after April 2026.
  - The MPPCB consent position for hubs.
  
  Each should be confirmed in pilot week 0.
