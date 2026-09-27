# v2 Deep Research 28: Operator staffing, workload and SLA realism (Indore pilot corridor)

**Agent:** 28 of 36 (operator operations angle)  
**Date:** 2026-09-27  
**Inputs read:** `docs/prd/00-overview.md`, `10-workflows.md`, `13-roadmap.md`, `14-open-questions.md`; `docs/research/v2-deep/07-payments-dbt.md`, `10-procurement.md`; `docs/research/pilot-design.md`  
**Question:** v2 gives a contracted field operator onboarding review (3 working days), weight disputes (5 working days), weekly rate cards, incentive reconciliation, a WhatsApp support queue, settlement float and "collection logistics". How many people does that take in Indore + Pithampur, what does it cost, can the SLAs be met at peak, and is the operator design realistic?

Labels: **VERIFIED** = read in a primary or official-mirror source this session. **UNVERIFIED** = estimate, inference or secondary source. All workload figures are modelled estimates, not measured data; the pilot should replace them.

---

## 1. Sources

| # | Source | URL | Status |
|---|--------|-----|--------|
| S1 | MP minimum wages 1 Apr–30 Sep 2026 (notification 1/11/Anv./Pan/2024/6445-6650): unskilled ₹12,425, semi-skilled ₹13,421, skilled ₹15,144, highly skilled ₹16,769 per month incl. VDA; revised every April and October | https://ascent-hr.com/notification/revision-of-minimum-wages-mp-310326/ ; https://www.sgcms.com/regulatory-updates/minimum-rate-of-wages-madhya-pradesh-april-2026/ | Secondary mirrors of the Labour Commissioner notification; consistent across 3 sources |
| S2 | Times of India (IMC officials): Indore generates 10–12 t/day of e-waste, from ~8 t/day to **25 t/day around Deepawali cleaning**; IMC collects ~2–2.5 t/day through door-to-door vehicles and two vendors paying up to ₹20/kg | https://timesofindia.indiatimes.com/city/indore/indore-shifts-focus-on-swachh-e-waste-disposal/articleshow/110241375.cms | News report quoting officials; figures UNVERIFIED against IMC data |
| S3 | Swachhotsav / Swachhata Hi Seva e-waste drive, Indore, 17 Sep–2 Oct (CM flag-off, collection boxes, door-to-door planned) | https://indianmasterminds.com/news/swachhotsav-indore-mohan-yadav-e-waste-drive-145675/ | News; shows government drives land in the Sep–Oct window |
| S4 | MP CM Helpline 181: four levels (L1–L4), about 7 days each, ~28 days full ladder; L3/L4 can force-close; 7am–11pm | https://cmhelpline.mp.gov.in/faq.html ; https://getnyay.in/directory/cm-helpline-madhya-pradesh | Official FAQ (verified) + secondary for level timings |
| S5 | Meta WhatsApp Business Platform pricing: from **1 Oct 2026** service replies are billed after 1,000 free per number per month; India utility/service rate ~₹0.115; replies only inside the 24-hour customer-service window | https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing ; https://duedoor.com/whatsapp-business-api-pricing-india/ | Official (verified) + secondary for INR rate |
| S6 | Agent 07: public-rail payouts are batch, T+4 working-day response; operator may not hold public float; maker-checker needed | `v2-deep/07-payments-dbt.md` | Swarm report |
| S7 | Agent 10: SLA/LD norms (0.5%/week, cap 10%), measurement-independence concern, operator ≠ SI | `v2-deep/10-procurement.md` | Swarm report |
| S8 | Pilot design: WoZ staffing = 1 PM + **1 field associate + 0.3 FTE finance**; opex ₹6.9–12.5 L for 12 weeks; kill line 8–12 t/month | `docs/research/pilot-design.md` §4.2, §9, §11 | Internal |
| S9 | CERT-In Directions 28 Apr 2022: cyber incidents reported within 6 hours | https://www.cert-in.org.in/Directions70B.jsp | Known primary; not re-opened this session (UNVERIFIED re-check) |

---

## 2. Assumptions

### 2.1 Corridor volume (Phase 1 steady state, months 4–12 after citizen launch)

| Driver | Base month | Peak month (Sep–Nov) | Monsoon month (Jul–Aug) | Basis |
|--------|-----------:|---------------------:|------------------------:|-------|
| Active approved/provisional shops | 20 | 22 | 20 | Pilot target 12 by week 12 → ~25 by month 12 |
| Formal tonnes to hub | 12 t | 24 t (2.0×) | 10 t (0.8×) | Pilot kill line 8–12 t/month (S8); IMC reports up to 2× generation at Deepawali (S2) |
| Citizen/society doorstep pickups | 840 | 1,700 | 750 | 35% of tonnage via doorstep at ~5 kg average |
| Drop-offs paid an incentive | 300 | 600 | 250 | Estimate |
| Citizen incentive payouts | ~1,140 | ~2,300 | ~1,000 | Pickups + drop-offs |
| Failed visits | 8% | 10% | 15% | Rain, gate rules (UNVERIFIED) |
| Shop → hub transfers | 86 | 110 | 86 | 20 shops weekly |
| Hub → recycler trips | 6–8 | 12–14 | 6 | ~2 t/trip |
| Weight disputes (target ≤10%, pilot gate ≤15%) | 9–13 | 15–20 | 10–14 | Monsoon moisture raises disputes despite 8% tolerance |
| Onboarding applications | 10 | 12 | 8 | Includes ~40% drop-outs; plus document-expiry re-checks |
| Inbound support threads (non-keyword WhatsApp + calls) | ~1,600 | ~3,200 | ~1,900 | 1.5 threads per pickup, 0.5 per drop-off, 10 per shop/month; reschedules spike in monsoon |

### 2.2 Operating assumptions

- Support hours 09:00–20:00, 7 days (citizens book on weekends), Hindi + English (Malwi-comfortable staff preferred).
- "Working days" follow the MP government holiday calendar; this is **not defined in v2** and matters around Diwali.
- ~150 productive hours per FTE per month after leave, training and travel overhead.
- CTC figures include employer PF/ESI and are set above the MP skilled minimum wage (₹15,144, S1), which is revised every six months; the contract must index to it.
- Collection itself is done by shops (10-workflows §1). The operator runs a backstop only when no shop accepts a request (the "operator assignment" in §1).
- Trip planning is done by the hub (10-workflows §4). The operator supervises and witnesses; it does not own vehicles in the base model.
- Excluded from operator cost: citizen incentives, settlement float, freight, software SI/O&M, department staff time.

---

## 3. Staffing model

### 3.1 Monthly workload (base month, modelled)

| Function | Unit load | Hours/month | Notes |
|----------|-----------|------------:|-------|
| Onboarding review | 10 × (1.5 h desk + 2 h site visit) | 35 | Micro tier needs a site visit to be credible |
| Registration re-checks, recycler CPCB authorization, compliance-flag triage | — | 20 | Manual until Phase 3 registry lookups |
| Weight disputes | 12 × 3 h | 36 | Photos, scale logs, calls; ~40% need a site visit |
| Recycler partial/reject disputes | 2 × 6 h | 12 | Grade disagreements are slow |
| Payment disputes | 2 × 2 h | 4 | |
| Citizen complaints (L2) | 30 × 1 h | 30 | Incentive not received, failed visits, wipe fears |
| Public-verification failure investigations (48 h rule, 00 §7) | 2 × 4 h | 8 | Needs weekend on-call |
| Weekly rate card | 6 h × 4.3 | 26 | Street-rate calls, recycler offtake price, approval, broadcast |
| Incentive reconciliation | daily 1.5 h + 3% failures × 0.5 h + cap/fraud review | 60 | Public rail T+4 creates an ageing exceptions queue (S6) |
| Settlements (shop weekly, hub, recycler), advances, GST/TDS, bank recon, month close | — | 68 | Maker side only; checker must be department (S6) |
| Field: shop audits, hub-day supervision, society drives, mystery pickups/wipe audits, scale checks, backstop pickups, shop training | — | 225 | Indore–Pithampur ~30 km apart; two-wheeler based |
| Support L1 | 1,600 × 5 min + escalations | 155 | Volume, not coverage |
| Management, SLA/MIS reporting, department reviews, recycler/hub relations, hiring | — | 120 | |
| **Total** | | **~800** | **≈ 5.3 FTE by pure workload** |

### 3.2 Why headcount is higher than workload

Pure workload says ~5 FTE. Four constraints push it to ~10:

1. **Coverage:** 77 support hours a week, 7 days, needs ≥2 agents even at 4.6 h/day of real work.
2. **Clock cover:** a 5-working-day dispute clock and a 48-hour verification clock cannot depend on one person's leave.
3. **Segregation of duties:** whoever adjudicates disputes should not also prepare the settlement file for the same shop.
4. **Geography:** Indore wards + Pithampur + hub in one day is not possible for one field person.

### 3.3 Recommended operator team and cost (base month)

| Role | FTE | Monthly CTC (₹) | Total (₹) |
|------|----:|----------------:|----------:|
| Programme operations manager (single accountable lead) | 1 | 85,000 | 85,000 |
| Field associates (one hub-based, two ward/Pithampur), incl. ₹5k fuel/phone | 3 | 29,000 | 87,000 |
| Verification and disputes specialists (cross-trained; one on weekend on-call) | 2 | 32,000 | 64,000 |
| Support agents, Hindi/English WhatsApp + phone | 2 | 19,000 | 38,000 |
| Finance and reconciliation executive (payment maker) | 1 | 35,000 | 35,000 |
| Finance controller / CA, part-time | 0.25 | — | 20,000 |
| MIS and rate-card analyst | 0.5 | — | 17,500 |
| **People subtotal** | **9.75** | | **3,46,500** |
| Office/co-working (4 desks), phones/SIMs/data | | | 33,000 |
| Field travel beyond allowance, backstop tempo hire | | | 20,000 |
| Scale calibration, seal bags, PPE, printing | | | 12,000 |
| Goods-in-transit and public liability insurance (battery fire risk) | | | 8,000 |
| WhatsApp service/utility messages (S5: ~₹0.115 each after 1,000 free) | | | 3,000 |
| Training and recruitment | | | 10,000 |
| **Direct cost** | | | **~4,32,500** |
| Operator margin 15% | | | ~65,000 |
| **Monthly fee (excl. GST)** | | | **~₹5.0 lakh** |
| GST 18% | | | ~90,000 |
| **Monthly fee incl. GST** | | | **~₹5.9 lakh** |

**Surge (15 Sep–15 Nov + any declared drive):** +2 temporary support agents, +1 field associate, +1 verification specialist or paid overtime ≈ **+₹1.0 lakh/month for ~2–3 months**.  
**Annual operator cost:** **~₹62–74 lakh incl. GST**, before incentives, float, freight and software.

### 3.4 Cost per kilogram

| Formal volume | Team | Operator cost/month (excl. GST) | Operator cost per kg |
|--------------:|-----:|--------------------------------:|---------------------:|
| 12 t (pilot kill line) | ~10 FTE | ₹5.0 L | **~₹42/kg** |
| 25 t | ~11 FTE | ₹5.6 L | ~₹22/kg |
| 50 t | ~14 FTE | ₹7.5 L | ~₹15/kg |
| 100 t | ~20 FTE | ₹10.5 L | ~₹10/kg |

Staff scale sub-linearly (management, rate cards, verification are largely fixed). For reference, IMC's vendors reportedly pay **up to ₹20/kg** for municipal e-waste, and IMC already collects **~60–75 t/month** through garbage vehicles (S2) — five to six times the pilot kill line. At pilot volume the operator alone costs about twice what the material is worth.

### 3.5 Minimum viable pilot team

The pilot design staffs 1 field associate + 0.3 FTE finance (S8). That cannot measure, let alone meet, v2's SLAs. A scaled-down but SLA-testable pilot team is ~5 FTE: ops lead, 2 field, 1 combined support/verification, 0.5 finance, plus a named department checker (~₹2.3–2.8 lakh/month, within the "adequate" pilot budget if the PM doubles as ops lead).

---

## 4. SLA feasibility

| v2 commitment | Feasible? | Conditions / issues |
|---------------|-----------|---------------------|
| Onboarding decision in 3 working days (OQ-22) | **Yes, if the clock is defined** | Operator recommendation in 2 WD of a *complete* application; department decision 1 WD; clock pauses while documents are awaited. v2 leaves unclear who "decides" — the department owns the platform, so approval is probably a department act inside the operator's clock. Provisional operation (500 kg cap) removes most business harm from slippage. |
| Weight dispute resolved in 5 working days (10 §4) | **Yes for ~90%** | Photo + scale evidence cases resolve in 1–3 days. Site re-weighs and recycler-grade disputes need up to 10 WD. Around Diwali, 5 WD ≈ 8–9 calendar days. Disputes where the operator is a party (backstop pickups, float errors) cannot be judged by the operator. |
| Weekly rate cards (OQ-01) | **Yes (~26 h/month)** | Needs a method, publication time, department approval (rates drive public incentives and float), a max weekly change band, and an emergency mid-week revision for metal price shocks. |
| Incentive reconciliation (13 Phase 1) | **Yes, with 1 finance FTE up to ~3,000 payouts/month** | No reconciliation SLA exists. Public rail returns (T+4) create an exceptions queue needing ageing targets and a recovery register (S6). |
| WhatsApp support queue (10 §10) | **No SLA in v2 at all** | Everything outside five keywords goes to "the support queue" with no hours, first-response or resolution target. Replies after the 24-hour window require paid templates and feel like silence to the citizen (S5). |
| Failed public verification investigated in 48 hours (00 §7) | **Only with on-call** | 48 calendar hours spans weekends and holidays; needs a named on-call rota. |
| Shop paid ≤7 days of hub receipt (00 §5) | **Tight** | Partly controlled by treasury/bank, not the operator (S6). |
| Pickup completion ≥80% (00 §7, OQ-75) | **Not operator-controllable** | Shops collect. Penalising the operator for it invites overuse of operator backstop pickups, which turns the operator into a collector competing with its own shops. |

---

## 5. Peak loads

| Period | What happens | Load effect | v2 coverage |
|--------|--------------|-------------|-------------|
| **Mid-Sep → mid-Nov** (Swachhata Hi Seva drives 17 Sep–2 Oct, Navratri, Dhanteras, Deepawali cleaning) | IMC reports e-waste generation up to 25 t/day vs 10–12 average (S2); state drives launch at short notice (S3) | ~2× pickups, payouts, support; disputes rise with rushed weighing; **staff leave peaks at the same time**; Diwali holidays stretch working-day clocks | None. "Hub surge mode" is Phase 2 and addresses hub storage, not operator staffing |
| **Monsoon (late Jun → Sep)** | Heavy Indore rain, waterlogged lanes, damp material | Tonnes dip ~20%, but failed visits and reschedules rise (support +20%), field productivity −30%, moisture-weight disputes | Weight tolerance 8% only |
| **Financial year end (Feb–Mar) and EPR return periods** | Producers chase evidence, recyclers push attestations | Recycler/attestation disputes, verification checks (Phase 2 heavier) | None (UNVERIFIED timing; depends on CPCB portal calendar) |
| **Phase 1 go-live** | New software, retraining, parallel run | Support and dispute volume 1.5–2× for 4–6 weeks | None |

A Phase 1 go-live that lands in Sep–Nov stacks the two worst peaks together.

---

## 6. Escalation matrix (proposed)

| Severity | Examples | First response | Owner | Escalate to | Final authority |
|----------|----------|----------------|-------|-------------|-----------------|
| **P1 — Safety, security, fraud** | Battery fire or injury at hub/shop; data breach; systematic payout fraud; recycler authorization found invalid | Immediate call | Ops manager within 1 h | Department nodal officer within 2 h; SPCB for hazardous incidents; CERT-In within 6 h for cyber incidents (S9); DPDP breach process | Department head / steering committee |
| **P2 — Money blocked** | Shop unpaid > 7 days; float or drawing limit exhausted; payout rail down > 4 h; full-lot rejection | 2 h | Finance executive | Ops manager 4 h → department nodal officer next WD | Department (payment checker/DDO) |
| **P3 — Individual cases** | Weight dispute; incentive not received; failed visit complaint; onboarding rejection | FRT 30 min (in hours) | Support L1 → verification specialist L2 within 1 WD | Ops manager on day 4 if unresolved | **Appeal** to department nodal officer within 7 days; decision in 10 WD |
| **P4 — Information** | Status, rates, coverage | FRT 30 min | Support L1 | — | — |

**CM Helpline 181 linkage:** MP citizens escalate to 181, which routes to a department L1 officer with ~7 days per level (S4). The operator must hand the department a complete case file within 2 WD of any 181 complaint so the L1 officer can close it inside 7 days. The count of operator-attributable 181 complaints is a useful health signal.

---

## 7. SLA metrics and penalties (proposed term sheet for OQ-75)

**Fee structure:** fixed monthly service fee; up to **15% at risk** through SLA deductions, capped per month. **No per-tonne or per-pickup bonus** for the party that verifies onboarding and adjudicates disputes, because volume pay rewards inflation. Deductions for three consecutive months on the same critical metric, or at the cap two months in three, trigger a cure notice and a termination right (aligns with LD/termination patterns in S7).

| # | Metric (operator-controllable) | Target | Deduction if missed | Critical? |
|---|--------------------------------|--------|---------------------|-----------|
| 1 | Settlement lines prepared and submitted to the department checker within 2 WD of eligibility | ≥ 95% | 2% per 5-point shortfall | Yes |
| 2 | Weight disputes resolved within 5 WD / all within 10 WD | ≥ 90% / 100% | 2% | Yes |
| 3 | Onboarding recommendation within 2 WD of complete application | ≥ 90% | 1% | |
| 4 | Support first response ≤ 30 min in hours; next day 10:00 for after-hours | ≥ 90% | 1% | |
| 5 | Support cases resolved within 2 WD | ≥ 85% | 1% | |
| 6 | Payouts reconciled within 2 WD of bank/treasury statement; unexplained variance | 100%; ₹0 | 2% (plus recovery of loss) | Yes |
| 7 | Rate card published, department-approved, by Monday 10:00 | Every week | 1% per miss | |
| 8 | Failed public verification investigated within 48 h | 100% | 2% per miss | Yes |
| 9 | Record accuracy: monthly random audit of 30 custody records against evidence | ≥ 98% | 2% (<98%), 3% (<95%) | Yes |
| 10 | Unaccepted pickup requests assigned (shop or backstop) within 24 h | ≥ 95% | 1% | |
| 11 | Key personnel in place; vacancy > 30 days | 0 vacancies | 1% per role | |
| 12 | Operator-attributable CM Helpline 181 complaints | Report monthly | Reporting only in pilot year | |

**Measurement rules:**
- All clocks computed from the department-owned platform's append-only audit log; the operator cannot edit timestamps.
- Monthly SLA report generated by the platform, not typed by the operator; quarterly independent audit by a PMU or third party (S7).
- Clock-stop events defined in advance: awaiting applicant documents, department decision pending, platform outage attributable to the SI, force majeure.
- **Volume band relief:** if a month's pickups exceed 2.5× the trailing 8-week average, targets 2–5 drop by 10 points for that month. Planned peaks (Sep–Nov) do **not** get relief; the operator must staff for them.
- Shared outcome metrics (pickup completion, shop payment time end-to-end, tonnes) are reported but not penalised against the operator.

---

## 8. Findings

**F1. v2 gives the operator at least eight functions but never sizes them.** Onboarding, disputes, rate cards, incentive reconciliation, support, settlement preparation, float, backstop logistics, 48-hour verification checks. The modelled base load is ~800 hours a month; coverage, clock cover, segregation and geography turn that into **~10 FTE, rising to ~14 in Sep–Nov**. The pilot design staffs 1 field associate + 0.3 FTE finance: about a tenth of what the v2 SLAs need.

**F2. At pilot volume the operator costs more than the material is worth.** ~₹5 lakh/month excl. GST (~₹62–74 lakh/year incl. GST and surge) is ~₹42/kg at 12 t/month, falling to ~₹15/kg at 50 t. IMC's vendors reportedly pay up to ₹20/kg, and IMC already collects ~60–75 t/month (S2). v2 has no cost-to-serve metric and does not list the urban local body as a stakeholder or supply stream, although that stream would change the economics most.

**F3. The SLAs are individually feasible but their clocks are undefined.** "Working days", clock start/stop, and whether the department's approval sits inside the operator's 3-day onboarding clock are all unstated. The support queue has **no SLA**. The 48-hour verification rule needs weekend on-call. Dispute resolution has no appeal path and no longer clock for site re-weighs or recycler-grade disputes.

**F4. No peak plan.** Sep–Nov is one long peak: government drives, Navratri, Dhanteras and Deepawali, with generation up to ~2× (S2, S3). It coincides with staff leave and holiday-stretched clocks. Monsoon adds failed visits and reschedules. v2 only changes the weight tolerance and puts hub surge mode in Phase 2. Launching Phase 1 in Sep–Nov would compound the risk.

**F5. The operator is judge, pricer and payer at once.** It reviews onboarding, adjudicates disputes, sets rate cards, runs float, reconciles incentives and can do backstop pickups. v2 has no segregation: rate cards and onboarding decisions are not department-approved, disputes involving operator-handled material have no independent route, and payment maker/checker is missing (also S6, S7).

**F6. OQ-75's proposed SLA metrics are partly outside the operator's control.** Pickup completion is shop-driven and shop payment time is partly treasury-driven. Penalising the operator for them pushes it into competing with its own shops through backstop collections, or blaming the treasury. Metrics must be operator-controllable, measured from platform logs and capped.

**F7. No escalation matrix.** v2 has no severity levels, no department appeal step, no incident route for battery fires or data breaches, and no link to **CM Helpline 181**. In MP, 181 is where frustrated citizens actually go, and it lands on department officers with 7-day clocks (S4).

**F8. The operator's logistics role contradicts the workflow.** 00 §1 says the operator "runs collection logistics"; 10-workflows gives collection to shops and trip planning to the hub. Whether the operator owns vehicles, freight or hub-gate witnessing changes the team by 2–4 FTE and a vehicle contract.

**F9. Messaging cost is not the constraint; people are.** Even after Meta starts billing service replies on 1 Oct 2026 (~₹0.115 each after 1,000 free per number), messaging is ~₹3k/month. Answering inside the 24-hour window matters more for experience than for cost.

---

## 9. Recommended PRD changes

| File | Section | Change |
|------|---------|--------|
| `00-overview.md` | §1 Operations row | Add an operator **RACI**: the operator reviews (department approves) onboarding; adjudicates disputes not involving itself; drafts rate cards (department approves); prepares settlement and payout files (department checks); runs the support queue and 48-hour verification checks; backstop pickups only when no shop accepts within 24 h; does **not** own trip planning or vehicles unless contracted separately. |
| `00-overview.md` | §7 Success metrics | Add **operator cost per formal kg** (tracked, with a sponsor-agreed ceiling by month 12) and **support first-response time**. |
| `00-overview.md` | §8 Launch checklist | Replace "Programme operator field team trained" with "Operator staffed to plan (named ops manager, ≥2 verification/dispute, ≥2 support, ≥3 field, finance maker, department checker named); Sep–Nov surge roster signed; escalation matrix and on-call rota published". |
| `10-workflows.md` | New §11 "Operator service levels and clocks" | SLA table (section 4 of this report) with clock start/stop rules, MP government holiday calendar as the working-day basis, and department decision time stated separately. |
| `10-workflows.md` | §10 Notifications / support | Support queue: 09:00–20:00 all days; first response ≤ 30 min in hours, next day 10:00 after hours; resolution ≤ 2 WD; reply within the WhatsApp 24-hour window. |
| `10-workflows.md` | §4 step 6 | Add: site re-weigh and recycler-grade disputes up to 10 WD; disputes where the operator is a party go to the department; appeal to the department nodal officer within 7 days, decided in 10 WD. |
| `10-workflows.md` | New §12 "Escalation" | P1–P4 matrix from section 6, including SPCB for hazardous incidents, CERT-In 6 h, DPDP breach handling, and the CM Helpline 181 case-file handover (2 WD). |
| `10-workflows.md` | §7 Settlements | Rate card: published by Monday 10:00 after department approval; ±15% weekly band; emergency revision with approval and a shop broadcast. |
| `13-roadmap.md` | Pilot | Staff the pilot with a scaled-down SLA-testable team (~5 FTE) and **measure** onboarding, dispute, support and reconciliation times and staff hours per tonne. Week 12 gate adds: "operator cost per kg and staffing ratios measured; SLAs met at pilot volume". |
| `13-roadmap.md` | Phase 1 | Operator console includes SLA clock instrumentation and an auto-generated monthly SLA report. Do not schedule Phase 1 go-live between 15 Sep and 15 Nov. Move the operator part of surge mode (surge roster, volume-band relief) into Phase 1. |
| `14-open-questions.md` | OQ-75 | Expand into the term sheet from section 7: fixed fee with ≤15% at risk, operator-controllable metrics only, measurement from platform logs, quarterly independent audit, no per-tonne bonus, cure and termination rules, surge obligations. |
| `14-open-questions.md` | New OQs | **OQ-76** operator RACI and conflict segregation; **OQ-77** peak calendar and surge staffing; **OQ-78** integration of the IMC door-to-door e-waste stream as a supply source; **OQ-79** cost-to-serve ceiling per kg and the volume at which the operator model is justified. |
| `02-roles-rbac.md` (flag only) | Roles | Operator support agent, verification/dispute specialist, finance maker; department payment checker and nodal officer (appeals, escalation). |

---

## 10. Score

**5 / 10** for realism of v2's operator design.

Why not lower: the shape is right. A department-owned platform with a contracted operator under SLA is the conventional model. v2 already commits to concrete clocks (3-day onboarding, 5-day disputes, weekly rate cards, 48-hour verification). Provisional onboarding and settling the undisputed weight separate customer harm from operator slippage.

Why not higher: the operator is unsized and uncosted. At pilot volume it costs roughly twice the material value per kg. The support queue has no SLA, clocks are undefined, and there is no escalation matrix or CM Helpline linkage. There is no peak plan for Sep–Nov. The operator combines judge, pricer and payer roles without segregation, and OQ-75's metrics are partly outside its control. The changes in section 9 are mostly specification and contract work, not a redesign. With them, the design would score about 8.
