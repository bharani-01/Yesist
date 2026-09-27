# v3 Simulation 10 — MP Finance Department and treasury review of the EcoSure DPR

**Simulation date:** 2026-09-27
**What was reviewed:** `docs/prd/v3-PRD.md` (read in full), with prior research `v2-deep/07-payments-dbt.md`, `10-procurement.md`, `17-funding.md`, `30-budget.md`
**Method:** role-play of a Madhya Pradesh Finance Department review meeting on the EcoSure detailed project report (DPR), plus web checks on DBT, PFMS, MP IFMIS, MP financial powers, GST, and CAG findings. Everything the characters say is simulated. Facts are marked **verified** (read in an official or primary source during this session), **secondary** (news or commentary), or **unverified** (inference or practitioner norm).

> All rupee figures are illustrative and come from the PRD (section 26) or `30-budget.md`. None are quotes or sanctioned amounts.

---

## 1. Bottom line

**Outcome: RETURNED for revision.** Finance does not reject the idea. It returns the ₹6.2 crore, 24-month DPR and offers an in-principle path for a smaller, staged sanction (Stage −1, manual pilot, and Phase 0 only; roughly ₹1–1.2 crore illustrative), subject to conditions.

**Score for financial and administrative feasibility of v3 as written: 4.5 / 10.**

v3 fixed the worst v2 problems: the operator no longer holds public money, and material value is paid from recycler funds rather than the scheme. But when the design meets a real treasury, three problems stand out:

1. **The citizen incentive rail (Rail B) does not fit how DBT works.** DBT is built for enrolled, repeat beneficiaries paid to validated bank accounts. EcoSure wants to pay ₹50–100 once to tens of thousands of strangers, by UPI, voucher, or a nominee's account, in daily batches. Most of those payout options cannot be used with treasury money, and each failed ₹75 payment costs more staff time to fix than it is worth.
2. **The value-for-money case does not survive a Finance reading.** About ₹1.55 lakh per formal tonne over 24 months, against roughly ₹45,000 of material value, is already hard to defend. The PRD's own additionality rule makes it worse: only tonnes above baseline count, so layering over IMC's existing flow lowers cost per *reported* tonne but not cost per *additional* tonne. Bhopal's city model earns a royalty instead of spending money.
3. **The administrative path is under-specified.** There is no budget head, no Drawing and Disbursing Officer (DDO), no implementing agency, and no scheme guidelines with a fixed incentive rate. The department's role in the tripartite escrow is undefined. Stage −1 at 8–16 weeks ignores MP's budget cycle and approval committees.

---

## 2. Who was in the room (simulated)

| Character | Role | What they care about |
|-----------|------|----------------------|
| **Deputy Secretary, Finance (Budget)** | Chairs the review; budget section | Scheme head, whether this is a new scheme, recurring liability, value for money, whether it fits the zero-based budget |
| **Budget Section Officer** | Prepares the note for the Standing Finance Committee | Object heads, the split between one-time and recurring cost, GST, agency charges, lapse |
| **Joint Director, Treasuries (IFMIS team)** | Runs MP IFMIS | Bill preparation, e-payment files, daily volume, failed-transaction refunds, DDO controls |
| **State DBT cell / PFMS state coordinator** | DBT Mission code, PFMS configuration, state DBT portal | Beneficiary registration, Aadhaar seeding and the NPCI mapper, account validation, return codes, reporting |
| **DDO, sponsoring department** (proposed from Environment Department / MPPCB) | Signs payment bills | "Whose eligibility am I certifying, and on whose data?" |
| **Senior Audit Officer, Office of the Accountant General (MP)** | Invited informally to give an audit view (the AG does not normally sit in sanction meetings) | What CAG will write in the year-2 audit |
| **Programme team** (Environment + UDHD, MPSEDC) | Presenting the DPR | Getting sanction before the Swachhata Hi Seva window |

---

## 3. Meeting simulation

### 3.1 Opening — is this a scheme or an IT project?

**Deputy Secretary (Budget):** Let me read your cost shape back to you. Of ₹6 crore, about ₹39 lakh is citizen incentive. The rest is software, a programme management unit, an operator, audits, and outreach. So this is about 94% administration and 6% benefit. Why is it coming to me as a DBT scheme?

**Programme team:** It is a platform with an incentive attached. The incentive is a small share because the recycler pays the material price at the door (PRD 17.2, 17.3).

**Deputy Secretary:** Then send me two proposals: an e-governance project through MPSEDC, and, if you still need it, a small incentive scheme with its own rules. Mixing them makes both harder to approve and harder to audit. And note that under our current instructions, a new project or scheme goes through the Cost Screening Committee, then the Standing Finance Committee (under ₹50 crore, chaired by your Secretary), and needs Cabinet approval. New heads that add financial burden are not being taken in the supplementary budget. *(Committee thresholds and "Cabinet nod for new projects": secondary, Free Press Journal; supplementary budget rule: secondary, Times of India, 2025. Finance Powers Manual 2025 Part-1 effective 1 July 2025: secondary.)*

**Budget Section Officer:** Which also means your "Stage −1: 8–16 weeks" (PRD 25.2) is not realistic for a new head. If this is approved now, in September, the head appears in the 2027-28 budget from April 2027, unless you can re-appropriate from an existing head or use MPPCB's own board funds for the pilot. PRD section 23 treats February–March only as the time when schemes are *renewed*. For this project, it is also when the scheme is *born*.

### 3.2 Scheme head and object head

**Budget Section Officer:** Which department owns the head? PRD 5.1 is a joint order of Environment and Urban Development. Money needs one controlling officer. Is it under the environment major head or the urban development major head? *(Exact MP major and object head codes not checked: unverified.)* Is the incentive a "subsidy" or "grants-in-aid"? That choice decides the object head and which audit rules apply.

**Programme team:** The PRD does not say. The steering committee has a Finance representative (5.1).

**Budget Section Officer:** A representative is not a head. I need: one administrative department, one budget controlling officer, one DDO, one implementing agency, and scheme guidelines that fix the rate. Your incentive amount is an open question to be settled in "pilot week 1" (OQ-70). I cannot put an undefined rate into a sanction. Give me a notified rate, a per-person cap, an annual ceiling, and a rule for what happens when the ceiling is reached in January.

**Budget Section Officer (continuing):** Also, the budget has no GST line. Software build, O&M, hosting, operator, audits, messaging, and any outsourced PMU staff are taxable services at 18% (standard rate for IT and manpower services; exact treatment per contract unverified). On roughly ₹3–3.5 crore of taxable services, that is **₹55–65 lakh missing** (illustrative). You also have no MPSEDC agency or PMC charge (typically a percentage of project cost; unverified for MPSEDC), no escrow or bank fees, and no line for DBT failure handling.

### 3.3 Treasury — can IFMIS pay ₹50–100 every day?

**Joint Director, Treasuries:** Technically, yes. IFMIS already pays scholarships, pensions, and relief to lakhs of accounts, and a single bill can carry thousands of e-payment lines. The value of each payment does not matter to the system. But look at how it actually works:

1. The DDO prepares a bill in IFMIS, attaches the beneficiary file, and signs it digitally.
2. The treasury checks and passes it; the e-payment file goes to the bank or, for DBT, onward to NPCI/RBI.
3. Credits and returns come back; returns must be matched and re-paid by a fresh bill.

"Daily batch" (PRD 10.2 C7, 17.2) means the DDO signs a bill every working day, roughly 250 bills a year, for about 70–100 payments each (52,000 hand-overs over 24 months in the base case, `30-budget.md` 2.3). That is possible, but it only makes sense if eligibility is certified automatically and the DDO is not personally re-checking handover codes. Weekly is the normal rhythm for schemes like this and is easier to control.

**Joint Director:** Your tripwire (PRD 18.3) is amber if the median time from collection to incentive is over 24 hours. Honestly, from collection to credit it is 3–7 working days: the eligibility cut-off, the bill, treasury passing, then the bank or NPCI response. The DBT SOP itself allows up to T+4 working days for the success or failure response *(verified: DBT Mission SOP for DBT Payments)*. Your amber line would trip every day. Set amber at 5 working days and red at 10.

**Joint Director:** And now the part your PRD does not know about. CAG has already reported that **MP IFMIS has no automated control for refund bills on failed transactions**: the DDO manually re-keys account details from treasury returns. In 13 districts that gap was used to divert **₹23.81 crore** of relief money to accounts of unauthorised persons, including through dummy names *(verified: CAG Report No. 10 of 2024 on MP, year ended March 2022; CAG IT audit of MP IFMIS also recommends controls for re-processing failed transactions)*. Any new scheme with thousands of small payments to strangers will get close attention from us on this point.

### 3.4 PFMS and DBT cell — beneficiary registration, Aadhaar, the NPCI mapper

**PFMS state coordinator:** Four facts you need to design around:

1. **DBT pays bank accounts, not UPI IDs.** Payments go by account number and IFSC (account-based DBT) or through the Aadhaar Payments Bridge using Aadhaar as the financial address *(verified: PFMS DBT FAQ; CGA OM 115 of 25-09-2025; DBT SOP)*. There is no DBT-to-VPA route. PRD C7 lists "UPI, bank, voucher at a partner outlet, or a nominee's account". On the treasury rail, only "bank" works.
2. **The beneficiary must be registered and validated before the first payment.** PFMS validates the account (bank response expected the same day, registration within 16 business hours per the DBT SOP) *(verified)*. For schemes on SNA-SPARSH, a PFMS Beneficiary ID is mandatory from 1 January 2026 and a DBT Mission code is mandatory in every payment file *(verified: CGA OM 146 of 28-11-2025)*. For a purely state-funded scheme paid through MP IFMIS, whether PFMS registration is mandatory is **unverified**, but state schemes are expected to take a DBT Mission code and report on the DBT portal. Scheme creation and DBT configuration are prerequisites, and the PFMS state directorate configures state schemes *(verified: PFMS DBT FAQ)*.
3. **Aadhaar-based payment needs the Aadhaar number, and seeding fails a lot.** Common return codes are "Aadhaar not mapped to account" (64), "Aadhaar mapping does not exist" (96), "account blocked or frozen" (68), and de-seeding by the bank *(verified: NPCI/DBT Mission APB SOP)*. Only the last-seeded active account receives Aadhaar-based DBT. PRD 8.5 says EcoSure never stores Aadhaar numbers. That is good privacy, but it means **you cannot use the Aadhaar bridge at all**. You are limited to account-based DBT, so every citizen must give you a bank account number, IFSC, and name as held by the bank.
4. **In MP the natural key is Samagra ID, not a new registry.** Samagra (the state single citizen database) already links families and members to bank accounts for DBT, and MP notified voluntary Aadhaar authentication on the Samagra portal on 23 October 2025, with alternative IDs required if a person opts out *(secondary: TeamLease RegTech summary of notification STN-14-0004-2025-XLI-2; Free Press Journal on Samagra-bank seeding)*. MP also has its own Aadhaar Act of 2019 for notifying state schemes *(verified: PRS copy of MP Act 6 of 2019)*. Build on this instead of asking citizens for bank details on WhatsApp.

**DBT cell officer:** On failures, CAG's DBT performance audit found **14% of Core DBT transactions rejected** in test-checked schemes, 91,283 failed transactions not re-initiated after 30 days, and the top reasons were an invalid bank identifier, inactive Aadhaar seeding, a blocked account, and Aadhaar not mapped *(verified: CAG Performance Audit of DBT, 2022)*. A later NSAP audit found implementing agencies never told beneficiaries why their payment failed, so pensions simply stopped *(verified: CAG/AG NSAP DBT report, 2024)*.

Now apply that to EcoSure. A pensioner will visit a bank branch to fix a seeding problem worth ₹1,000 a month. A one-time e-waste donor will not do it for ₹75. So you will build up a pile of failed, unclaimed small liabilities, grievances ("sarkar ne paisa nahi diya"), and audit paras about "benefits not delivered".

**Budget Section Officer:** Put a number on it. Your PMU finance and operations post is budgeted at about ₹1 lakh a month (`30-budget.md`). At base volume that is about 2,200 payments a month, so **roughly ₹45 of that one salary per ₹75 incentive**, before any failure handling. At 5–15% failure you have 110–330 cases a month, each needing a call, re-validation, and a fresh bill. The administrative cost of the incentive is close to the incentive itself.

**Answer to the question "Are daily batches to lakhs of small beneficiaries for ₹50–100 feasible?"**
*Technically yes, administratively marginal.* MP IFMIS and DBT rails can carry the volume. What is expensive is registration and failure handling for one-off beneficiaries. The pilot does not have lakhs of beneficiaries anyway (about 20,000–99,000 hand-overs over 24 months across the budget scenarios), but a statewide rollout would. It becomes feasible if: payments go weekly, not daily; only to accounts that are already validated (Samagra-seeded, or validated at first use); failed payments get two retries and then lapse under a published rule; and incentives are paid per household per quarter rather than per pickup. Even better, the state stays off this rail in the pilot and lets producers or recyclers pay citizens directly (section 6).

### 3.5 The DDO's question

**DDO:** When I sign a bill, I certify that each payee is eligible. Under PRD 17.4, eligibility means "a valid handover code plus a collector weigh record. Nothing else." Both are generated on a platform run by a contracted vendor and operated by a contracted operator. I cannot see the citizen, the scale, or the device. So on what basis am I certifying?

**Programme team:** Maker-checker, audit logs, caps, and fraud flags (18.2).

**DDO:** Maker-checker in your PRD covers attestations, evidence packs, chargebacks, and reversals (8.2, 21.2). It does not cover the **payment file**. I need:
- a system-generated eligibility list, frozen at a cut-off time, with a hash, a count, and a total;
- a departmental checker (not the operator) who approves it, plus a 2–5% random sample verified by phone before the bill;
- proof that the platform went through an STQC or CERT-In audit before any money moves;
- payment only to the account holder's own validated account.

"Nominee's account" is exactly the pattern CAG found in the relief fraud: payments to accounts of persons other than the beneficiary. Remove it. "Voucher at a partner outlet" is a payment to a private shop, not to a beneficiary, which means it is a procurement. "Pooled incentive to the society fund" (C9) is a grant of public money to a private housing society, and needs its own rule, if allowed at all.

### 3.6 The tripartite escrow

**Deputy Secretary:** PRD 17.2 and SP-07 say "recycler-funded bank escrow under a tripartite agreement (bank, recycler, department)". Can a government department be party to an escrow holding private money? Yes, it happens: state departments sign tripartite and escrow agreements in PPP and subsidy schemes, usually after Finance concurrence and Law Department vetting of a standard template *(secondary: PPP tripartite templates; West Bengal AHP guidelines require prior Finance approval to open escrow accounts)*. What matters is **what role the department takes**:

| Department role | Consequence | Finance view |
|-----------------|-------------|--------------|
| Signatory who approves releases | Department controls private money. It is exposed to claims when a release is late or wrong, and the account may be treated as a government-operated account | **Not acceptable** |
| Beneficiary of information rights only (view balances, receive alerts, can suspend the recycler from EcoSure if the balance falls below the floor) | No custody, no release authority, no liability | **Acceptable** after Law vetting |
| Guarantor of agent reimbursements if the recycler defaults | Contingent liability on the state | **Not acceptable** |

**Senior Audit Officer:** Two more points. First, who instructs the bank to pay the agents? If the platform (a government system run by a vendor) generates the release instructions, the department is in effect operating the account. The recycler must authorise releases, with the platform supplying only the data. Second, the PRD has the operator resolving weight and payment disputes (S8, R9) between two private parties over private money. That is adjudication. Put it in the agent agreement as the recycler's obligation, with the operator only as a facilitator, or the department inherits the grievance when a recycler goes bust owing 40 kabadiwalas their advances.

**Deputy Secretary:** My preference: a **bilateral** escrow between the recycler and a scheduled bank, with the department as a named information-rights party through a side letter, and an explicit "no financial liability of the State" clause. Keeping the escrow balance above the floor is a condition of the recycler's MoU, not of a government contract.

### 3.7 GST

**Budget Section Officer:** Three separate GST questions:
1. **Citizen incentive from the state:** not taxable. A subsidy from the Central or State Government is excluded from "consideration" and from value of supply (CGST Act s.2(31) and s.15(2)(e)) *(verified: s.15 text)*. A household handing over its own old devices is not supplying in the course of business anyway.
2. **Incentives to agents, informal collectors, or societies for doing work** (hosting drives, collecting): if paid as a reward for performing a scheme task, this can be **taxable consideration, not a subsidy**. A Gujarat AAR held a state scheme incentive paid for performing the scheme to be taxable *(verified: Gujarat AAR 35/2021)*. Keep all agent money on the recycler rail, and never pay agents from the scheme head.
3. **The agent model and GST registration:** CGST s.24 requires compulsory registration, regardless of turnover, for persons making taxable supplies *on behalf of* other taxable persons as agents *(statutory text known; how it applies to a kabadiwala buying intact e-waste for a recycler is unverified)*. PRD 8.5 promises "No GSTIN" for the micro tier. Whether the micro tier trades in its own name (as a trader below threshold) or in the recycler's name (as an agent) changes the answer. Get a tax counsel opinion before the agent agreement template is final. The GST rate on e-waste (HSN 8549; 5% vs 18%) is still unresolved *(unverified, per `07-payments-dbt.md`)*.
4. **Government as payer to vendors:** the department must deduct GST TDS at 2% on operator, vendor, and hosting contracts above ₹2.5 lakh *(verified: CGST s.51)*, and income-tax TDS. This is routine, but the ledger and the PMU need to do it.

### 3.8 Value for money — cost per tonne

**Deputy Secretary:** Your own budget review (`30-budget.md` 4.1) says ₹1.55 lakh per formal tonne over 24 months in the base case, ₹3.78 lakh in the low case. Blended recycler value is about ₹45,000 a tonne, and the EPR certificate floor adds ₹22,000–34,000 (paid by producers to recyclers, and under litigation). CPCB assumes ₹25 a kg for collection and transport. So the state spends 2–3.5 times what the material and certificate are worth.

**Programme team:** Recurring cost falls to about ₹44/kg at 50 t/month (PRD 26.2), and layering over IMC's existing 60–75 t/month flow gets us there.

**Deputy Secretary:** That argument contradicts your own KPI. PRD 24.1 counts only **tonnes above the pre-pilot baseline**, and IMC's existing flow *is* the baseline. Layering over IMC makes cost per *reported* tonne look good. It does nothing for cost per *additional* tonne, which is the only thing the state is buying. Illustration: in the base case, if half of the 390 tonnes are additional, cost per additional tonne is about **₹3.1 lakh**. If a quarter are, it is about **₹6.2 lakh**. Put cost per additional tonne in the DPR and in section 1.3, and set the volume gates (26.3) on additional tonnes, not gross tonnes.

**Programme team:** The public value is not only tonnes: traceability, fraud evidence for EPR, regulator analytics, and informal-sector inclusion.

**Deputy Secretary:** Accepted, and that is the honest case. Then price it that way: this is a **regulatory evidence platform** with a demonstration corridor. Show what it replaces (manual inspections, fake-certificate losses, NGT exposure). Show that producers, who benefit most from provenance and audit packs, carry part of the recurring cost (OQ-83 is still "optional"). And show the five-year cost across 3–5 cities, where build cost falls to about ₹7–12 lakh per city-year (PRD 26.4).

### 3.9 Comparison with the Bhopal ULB royalty model

**Deputy Secretary:** In Bhopal, the municipal corporation's empanelled agency **pays BMC about ₹1.71 lakh a month** in royalty for 3.5–5 t/month *(verified excerpt of BMC's own claim before NGT, OA 82/2026, via `17-funding.md`)*. That is roughly ₹34,000–49,000 per tonne of *revenue* to the city, against your ₹1.55 lakh per tonne of *cost*. Why shouldn't IMC just tender an e-waste concession?

**Programme team:** Bhopal's volume is small against the city's generation, and press reports on the same NGT matter say most of Bhopal's e-waste is still burned or disposed of unscientifically *(secondary: Times of India)*. A royalty model makes money from whatever the agency chooses to collect. It proves nothing about where material goes, gives producers no provenance, and gives MPPCB no flags.

**Deputy Secretary:** Fair. So the two are complementary, not alternatives. IMC can run a Bhopal-style concession for collection (revenue-positive or neutral to the city) and **require the concessionaire to record custody on EcoSure** as a contract condition. The state then pays only for the tracking layer, and the collection economics are carried by the material. Your PRD section 5.3 says "layer over IMC", but section 17 still has the state paying citizens. Pick the cheaper path.

### 3.10 Procurement route — MPSEDC nomination or tender?

**Budget Section Officer:** MP Store Purchase and Service Procurement Rules, Rule 6, allow departments to place software development work directly with MPSEDC without a tender *(verified per `10-procurement.md`)*. That is the right route for the platform, but three conditions apply:
1. **MPSEDC will tender anyway** to select an implementation agency, and its RFPs do get re-issued (its blockchain platform RFP reached a third call) *(verified per `10-procurement.md`)*. Budget 2–5 months, not weeks.
2. **Do not release the full sanction to MPSEDC upfront.** Funds parked in an agency's bank account ahead of need is a standard CAG paragraph. Release by milestone against deliverables, with interest on any balance returned.
3. **The field operator cannot be nominated.** Any service above ₹2.5 lakh needs an open tender (21 days minimum) or a GeM custom bid *(verified per `10-procurement.md`)*. CEDMAP nomination covers outsourcing and training services and might fit the pilot operator; that fit is unverified.

**Deputy Secretary:** And keep the operator and software vendor separate (PRD 5.4 already does). Add break clauses: if the week-12 or phase-1b volume gate fails (26.3), the department must be able to stop without paying for unbuilt phases. PRD 25.2 does not mention gate-conditional award or termination for convenience.

### 3.11 The Accountant General's view — what CAG would criticise in year 2

**Senior Audit Officer:** If you run it as written, here is the draft year-2 paragraph list I would expect, roughly in order of likely severity:

1. **Cost per additional tonne far above the DPR, and funding continued after volume gates were missed.** "The 25 t/month gate was not met, yet the O&M and operator contracts were extended." Evidence: steering committee minutes, cost per kg reports.
2. **Additionality not established.** The baseline was agreed late or by the implementing department itself; IMC's existing tonnes were relabelled as scheme outcome. PRD pre-mortem story 2 is exactly this.
3. **Incentives paid on data from a private platform without independent verification.** The DDO certified eligibility based on vendor-generated lists; there was no departmental sample check.
4. **Failed transactions not re-initiated or not informed.** "X payments of ₹Y lakh returned; beneficiaries not told; no lapse rule; refund bills prepared manually." This is the same pattern as MP IFMIS and NSAP.
5. **Concentration and collusion.** A few accounts received many incentives (agent family members); caps were per account, not per person or household. PRD 18.3 has a concentration tripwire, but no rule on what happens when it trips.
6. **Funds parked with the implementing agency (MPSEDC or EPCO) and interest not remitted.**
7. **Contract management.** Liquidated damages not levied on delayed software; SLA deductions not applied to the operator because the SLA data came from the platform the vendor runs; GST TDS not deducted.
8. **Compliance gates skipped.** Go-live before the STQC or CERT-In audit; DPDP notices missing on IVR bookings.
9. **Unclear liability in the escrow.** Agents unpaid after a recycler exit; the department named in grievances and court cases as a party to the agreement.
10. **Duplicate funding.** Outreach charged to both the scheme and SBM-U IEC or the IMC budget; no per-source ledger or utilisation certificates.
11. **Outcomes not measured.** The informal-sector survey (OQ-78) or the independent evaluation was not done on time, so the claimed "informal to formal" shift has no evidence.
12. **Idle assets.** Connected scales, IVR, and bin sensors bought but little used.

**Senior Audit Officer:** Your PRD already has the right instincts: append-only audit logs, idempotency, daily reconciliation, maker-checker, and honest labels. What it lacks is the **government-side evidence**: bill numbers, UTRs, NPCI return codes, DDO approval records, sample-check logs, a recovery register, per-fund ledgers, and utilisation certificates.

### 3.12 Closing

**Deputy Secretary:** Decision: **returned**. The idea is sound, and the regulatory evidence value is real. Resubmit as (a) a lean platform project through MPSEDC, released by milestone with break clauses; (b) a pilot funded from existing heads or MPPCB board funds; and (c) an optional, notified, capped incentive scheme only after the pilot shows additional tonnes. The citizen top-up in the pilot should come from producers or recyclers, not the treasury.

---

## 4. Outcome and conditions

**Decision: RETURN (revise and resubmit).** In-principle support for a staged first tranche.

| # | Condition | Before |
|---|-----------|--------|
| C1 | Split the DPR into (a) a platform project (MPSEDC, milestone releases) and (b) a separate incentive scheme with guidelines | Resubmission |
| C2 | Name one administrative department, one budget controlling officer, one DDO, and one implementing agency (candidates: MPPCB, or EPCO under the Environment Department; unverified fit) | Resubmission |
| C3 | Show cost per **additional** tonne in the DPR and in PRD 1.3; set volume gates on additional tonnes | Resubmission |
| C4 | Add GST (about ₹55–65 lakh illustrative), agency charges, bank fees, and DBT failure handling to the budget | Resubmission |
| C5 | First tranche limited to Stage −1, the manual pilot, and Phase 0 (about ₹1–1.2 crore illustrative), funded by re-appropriation or MPPCB board funds; no new head until the 2027-28 budget | First tranche |
| C6 | During the pilot, no treasury-funded citizen incentive. The top-up is paid by producers or recyclers through their own escrow or bank payout (instant UPI is legal on private money) | Pilot week 0 |
| C7 | Escrow: bilateral recycler–bank account; the department only has information rights; explicit no-liability clause; Law Department vetting; recycler authorises releases | MoU signing |
| C8 | If an incentive scheme is later approved: notified fixed rate, per-household quarterly cap, annual ceiling with a first-come rule, weekly batches, own validated account only (Samagra-linked or validated at first use), two retries then lapse, beneficiary told why a payment failed | Scheme notification |
| C9 | Payment-file controls: frozen eligibility list with a hash, a departmental checker, a 2–5% phone sample before each bill, and bill number, UTR, and return code stored per payout | Before first public payment |
| C10 | Procurement: MPSEDC nomination for software with milestone releases and termination-for-convenience at each gate; open tender or GeM custom bid for the operator; operator and vendor must be different firms | Contract signing |
| C11 | Tax counsel opinion on the agent model and GST registration (s.24) and on e-waste HSN/rate before the agent agreement template is final | Pilot week 0 |
| C12 | Producer cost recovery (OQ-83) turned into a target: at least 30% of recurring operating cost from non-budget sources by month 24 | Phase 1b |

---

## 5. PRD gaps (with v3 section references)

| # | Gap | Where in v3 | Why Finance cares |
|---|-----|-------------|-------------------|
| G1 | Payout options on Rail B (UPI, voucher, nominee account) are not possible with treasury DBT; only the beneficiary's own validated bank account works | 10.2 C7; 17.2; 22 (no-UPI row) | Non-compliant payment modes; nominee payments match the MP relief-fraud pattern |
| G2 | "Next daily treasury batch" and the 24-hour amber tripwire assume a speed IFMIS and the DDO cannot deliver | 10.2 C7; 16.3 step 9; 18.3 | The tripwire would trip constantly; false expectations sent to citizens |
| G3 | No scheme guidelines, no fixed incentive rate, no annual ceiling, no rule for when the budget runs out | 17.4; 29.2 OQ-70; 18.3 ("committed incentive budget") | A sanction cannot be issued for an undefined, open-ended liability |
| G4 | No budget head, controlling officer, DDO, or implementing agency; the joint order leaves ownership of the money unclear | 5.1; 25.2; 29.1 | No one can sign a bill |
| G5 | "Never store Aadhaar" (a good rule) rules out the Aadhaar Payments Bridge; the PRD never says it will collect account number, IFSC, and bank name for account-based DBT, or use Samagra | 8.5; 20.3; 20.4; 21.1 | Registration design is missing; data minimisation conflicts with DBT data needs |
| G6 | No failed-transaction, retry, lapse, or unclaimed-amount policy; no beneficiary notice of the failure reason | 17.4; 19.3 CitizenIncentive (status "failed" only) | A direct CAG finding in the DBT and NSAP audits; MP IFMIS refund weakness |
| G7 | Maker-checker does not cover the payment file; no departmental sample check; DDO certifies on vendor data | 8.2; 17.4; 21.2 | DDO personal liability; audit para |
| G8 | CitizenIncentive has no bill number, UTR, NPCI return code, DDO or checker IDs, fund ID, or recovery status; no per-fund ledger or utilisation-certificate export | 19.1; 19.3 | Reconciliation with IFMIS and utilisation certificates are impossible |
| G9 | The department's role in the tripartite escrow (signatory? release authority? guarantor?) is undefined | 12.2 R3; 17.2; 29.1 SP-07 | Contingent liability; possible "government-operated account" |
| G10 | The operator resolves disputes over private recycler–agent money | 11.2 S8; 12.2 R9; 17.4 | The department inherits adjudication and grievances |
| G11 | Pooled society incentives send public money to private housing societies with no rule allowing it | 10.2 C9 | Grant to a private body without authority |
| G12 | The budget omits GST, MPSEDC agency charges, bank and escrow fees, and failure-handling cost | 26.1 | DPR understated by roughly 10% or more |
| G13 | Cost per tonne uses gross tonnes, while the KPI counts only additional tonnes; the "layer over IMC" argument makes cost per reported tonne look better but does not change cost per additional tonne | 1.3; 5.3; 24.1; 26.2 | The core value-for-money claim is internally inconsistent |
| G14 | Stage −1 (8–16 weeks) ignores the Cost Screening Committee, Standing Finance Committee, Cabinet approval, and the rule against new heads in the supplementary budget | 25.1; 25.2; 23 | Realistic start is April 2027 unless there is an interim funding route |
| G15 | No gate-conditional award, break clauses, or milestone release to MPSEDC | 25.2; 26.3 | Volume gates cannot be enforced against signed contracts; risk of funds parked with the agency |
| G16 | Funding sources omit IMC/16th Finance Commission SWM grants, MPPCB own funds, the CPCB EC fund, and a Bhopal-style concession, all of which `17-funding.md` recommended | 26.4 | The state carries almost all cost |
| G17 | GST status of the agent model (s.24 compulsory registration for agents) is unexamined; the micro tier promises "No GSTIN" | 8.5; 11.2 S1 | A legal promise that may not hold |
| G18 | No comparison with the Bhopal royalty model or the status-quo option in the DPR | 5.3; 26 | Finance always asks "compared with what?" |

---

## 6. Fixes

### 6.1 Highest leverage

1. **Take the state off the citizen-payment rail for the pilot.** Pay citizens the recycler's price at the door (as now), plus a producer or recycler top-up from private escrow through a bank payout API or an RBI-authorised payment aggregator. Instant UPI is legal on private money *(`07-payments-dbt.md` F2, F3)*. State money funds only the platform, the PMU, audits, and evaluation. Bring a treasury incentive back only as a **notified, capped, weekly, household-level scheme** after the pilot shows additional tonnes, built on Samagra-linked validated accounts. This removes G1, G2, G5, G6, G7, and most of G11 in one move and takes pre-mortem story 1 off the critical path.
2. **Rewrite the DPR as a lean regulatory-evidence platform with honest unit costs.** Split the platform project from the incentive scheme. Use the lean build (about ₹3.9 crore variant, PRD 26.1). Add GST and agency charges. Show cost per additional tonne. Put the Bhopal-style concession alongside (IMC concession with EcoSure custody recording as a contract condition). Set a producer cost-recovery target. Release money to MPSEDC by milestone, with termination-for-convenience at each volume gate. This addresses G3, G4, G12, G13, G15, G16, and G18.
3. **Make the escrow private and the department an observer.** Use a bilateral recycler–bank escrow; the department gets information rights through a side letter and an explicit no-liability clause; the recycler authorises releases; disputes are the recycler's obligation under the agent agreement, with the operator only facilitating. Law Department vetting of one standard template. This addresses G9 and G10.

### 6.2 Other fixes

- **Name the money owners** in PRD 5.1 and 29.1: administrative department, budget controlling officer, DDO, implementing agency (add as SP-13 to SP-16).
- **Fund Stage −1 and the pilot** by re-appropriation or MPPCB board funds, and plan the new head for the 2027-28 budget. Change Stage −1 in 25.2 to "8–16 weeks if funded from an existing head; otherwise aligned to the next budget (April)".
- **Payment-file controls** in 17.4 and 21.2: frozen eligibility list with a hash, departmental checker, 2–5% phone sample, own-account only, two retries then lapse, SMS telling the citizen why the payment failed, recovery register.
- **Domain model** (19.3): add a `Fund` entity and per-payout `fund_id`, `ifmis_bill_no`, `utr`, `return_code`, `ddo_id`, `checker_id`, `retry_count`, `lapsed_at`, `recovery_status`; add a utilisation-certificate export.
- **Tripwires** (18.3): collection-to-credit amber above 5 working days, red above 10; add "failed payouts over 5% of the batch" and "unresolved failures older than 30 days".
- **Remove** nominee-account and voucher payouts from Rail B (keep them only on the private rail, where the payer allows it), and remove pooled society incentives from public money.
- **Tax**: add a tax-counsel item to 29.3 on s.24 registration for agents and the e-waste HSN/rate; keep all agent money on the recycler rail.
- **Budget** (26.1): add GST, agency charges, bank fees, and a failure-handling line; state cost per additional tonne alongside gross.

---

## 7. Score

**4.5 / 10 for how financially and administratively feasible v3 is in real life.**

- **What works:** no operator float; material value paid from recycler money; incentives in treasury batches rather than instant UPI; Stage −1 exists; volume gates exist; MPSEDC nomination is a real fast route; honest "formal network only" labels; strong audit-log and idempotency instincts.
- **What pulls it down:** the citizen incentive is designed like a consumer app payout and not like a DBT scheme (payout modes, daily speed, no failure policy, no registration design); value for money does not hold up on additional tonnes; no money owner (head, DDO, agency); undefined incentive rate; the department's escrow role is unclear; the budget is missing GST and agency charges; Stage −1 ignores the budget cycle.
- **With the three highest-leverage fixes,** this rises to about **6.5–7 / 10**. What remains is political continuity of funding and whether additional tonnes actually appear, which only the pilot can show.

---

## 8. Sources checked in this session

| Source | Used for | Status |
|--------|----------|--------|
| DBT Mission, SOP for DBT Payments — https://dbtbharat.gov.in/data/documents/SOP%20for%20DBT%20Payments.pdf | T+4 response; beneficiary validation within 16 business hours | Verified (extract) |
| DBT Mission/NPCI, SOP of Aadhaar Payments Bridge — https://dbtbharat.gov.in/data/dbt_payments/Standard-Operating-Procedure-of-Aadhaar-Payments-Bridge-(APB).pdf | Mapper, return codes 64, 68, 96 | Verified (extract) |
| CGA OM 146 dt 28-11-2025, SOP for DBT under SNA-SPARSH — https://cga.nic.in/writereaddata/file/SOPDBTOM146dt28112025.pdf | PFMS Beneficiary ID mandatory from 1-1-2026; DBT Mission code mandatory | Verified (extract) |
| CGA OM 115 dt 25-09-2025 FAQ — https://cga.nic.in/writereaddata/file/OMNo115dt25092025.pdf | Account-based vs Aadhaar-based DBT prerequisites | Verified (extract) |
| PFMS DBT FAQ — https://pfms.nic.in/SitePages/doc/PFMS_DBT_FAQ.pdf | Scheme creation and configuration prerequisites; state directorate configures state schemes; Aadhaar not mandatory | Verified (extract) |
| Chhattisgarh SOP for DBT through SNA-SPARSH — https://ekoshonline.cg.gov.in/UserMaualSOPPDF/sop%20for%20dbt%20schemes%20under%20sna%20sparsh-3-16.pdf | Example of state cyber-treasury flow, 12:00 NPCI cut-off | Verified (another state; MP flow may differ) |
| CAG Report No. 10 of 2024 (MP, year ended March 2022) — https://cag.gov.in/uploads/download_audit_report/2024/Report-No.10-(English)-067dd02e0eefbe9.98770704.pdf | ₹23.81 crore relief fraud; no IFMIS control on refund bills for failed transactions | Verified (extract) |
| CAG IT audit of MP IFMIS — https://cag.gov.in/uploads/icisa_it_reports/MP-0695f432f596750-88681169.pdf | Lack of controls to re-process failed transactions | Verified (extract) |
| CAG Performance Audit of DBT (2022) — https://cag.gov.in/webroot/uploads/download_audit_report/2022/Performance%20Audit%20of%20Direct%20Benefit%20Transfer-0632329ede44685.62105221.pdf | 14% rejections; 91,283 not re-initiated; failure reasons | Verified (extract; the audited state is not MP) |
| CAG/AG NSAP DBT report (2024) — https://cag.gov.in/webroot/uploads/download_audit_report/2024/AG-Report-NSAP-Eng-067f8b2d369c876.27877078.pdf | Beneficiaries not informed of failure reasons | Verified (extract) |
| CGST Act s.15 — https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/acts/2017_CGST_act/active/chapter4/section15_v1.00.html | Government subsidies excluded from value of supply | Verified |
| Gujarat AAR 35/2021 — https://gstcouncil.gov.in/sites/default/files/AAR/guj_aar_35_2021_30.07.2021_rnsbl.pdf | Scheme incentive paid for performance held taxable | Verified (extract) |
| MP Aadhaar Act 2019 — https://prsindia.org/files/bills_acts/acts_states/madhya-pradesh/2019/Act%206%20of%202019%20MP.pdf | State power to notify schemes for Aadhaar | Verified (extract) |
| MP notification on voluntary Aadhaar authentication on Samagra, 23-10-2025 — https://www.teamleaseregtech.com/updates/article/50124/ | Voluntary; alternative IDs required | Secondary |
| Free Press Journal on Samagra–bank seeding by MPSEDC | Samagra as DBT key | Secondary |
| Free Press Journal, "Finance Department puts stop on new projects without Cabinet nod" | Cost Screening Committee, Standing Finance Committee thresholds, Cabinet approval | Secondary; date and current force unverified |
| Times of India, 2025 supplementary budget / zero-based budgeting | New heads adding burden not taken in supplementary budget | Secondary |
| IANS/The Hawk, MP Finance Powers Manual 2025 (Part-1), effective 1-7-2025 | Delegation context | Secondary |
| PPP tripartite and escrow templates; West Bengal AHP guidelines (Finance approval for escrow accounts) | Government as party to escrow; Finance/Law vetting practice | Secondary (other states and central PPP) |
| `v2-deep/07`, `10`, `17`, `30` | Prior findings on rails, procurement, funding, budget | Internal research |

**Not verified in this session:** MP major and object head codes for this scheme; whether PFMS beneficiary registration is mandatory for a purely state-funded scheme paid through MP IFMIS; MPSEDC agency charge rate; CEDMAP fit for the pilot operator; whether EPCO or MPPCB can act as implementing agency or DDO; how s.24 GST registration applies to informal collection agents; e-waste GST rate; NPCI or sponsor-bank charges per APBS or NACH credit.
