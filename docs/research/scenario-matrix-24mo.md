# EcoSure India — Scenario Matrix & 24-Month Outlook

**To:** EcoSure leadership / investment stage-gate  
**From:** Product (scenario planning)  
**Date:** 2026-09-27  
**Classification:** Internal decision memo — no UI, no GTM creative  
**Inputs:** [`idea-feasibility-no-ui.md`](./idea-feasibility-no-ui.md), [`tier2-tier3-field-issues.md`](./tier2-tier3-field-issues.md), PRD overview + OQs + roadmap, manufacturer wedge analysis  
**Horizon:** 24 months from first Tier-2/3 city pilot

---

## 1. Purpose

Feasibility work already answered the binary: **PRD-as-written ≈ fail at scale; redesigned EPR custody + mid-size SaaS ≈ WORKS-IF.** This memo stress-tests *which external and product conditions* decide scale vs niche vs kill — before we burn Phase 1–3 capital on the wrong primary path.

We do **not** treat EcoSure as a consumer EcoPoints marketplace that displaces kabadi. The strategic object under test is: **formal collection → custody → recycler attestation → mid-size manufacturer evidence SaaS**, with optional network take-rate.

---

## 2. Axes (conditions crossed)

| Code | Axis | Levels | Operational meaning |
|------|------|--------|---------------------|
| **A** | EPR enforcement intensity | **High / Med / Low** | How hard CPCB/SPCB + market practice push producers to show *verifiable* end-of-life evidence (audits, shortfall pressure, consultant/PRO scrutiny). High ≠ EcoSure is statutory; High = demand for *defensible packs* rises. |
| **B** | Shop liquidity fix | **Yes / No** | Shop money in ≤7–14 days (weekly settle and/or hub advances). No = monthly/default PRD settle → multi-home, residual junk only. |
| **C** | City density seed | **Yes / No** | Launch only with min N live shops + 1 hub + 1 authorized recycler offtake SLA in that city; honest “not available” elsewhere. No = empty nearby + cold-start death spiral. |
| **D** | Consumer cash/UPI | **Yes / No** | Small UPI / trade-in / same-week voucher at collect. No = EcoPoints-later primary → households stay with kabadi cash. |

**Full grid:** 3 × 2 × 2 × 2 = **24** cells. Below: **10 plausible, decision-useful scenarios** (duplicates and “all levers off in High EPR” noise collapsed). Likelihoods are **conditional priors for India Tier-2/3 2026–28**, not forecasts.

### Likelihood priors (standalone)

| Axis state | Prior (next 24 mo) | Rationale |
|------------|-------------------|-----------|
| A = High | ~20% | Real Rules 2022 pressure exists; *uniform hard enforcement + audit culture* still uneven by state/category |
| A = Med | ~55% | Base India: compliance theatre + real shortfalls for mid-size; episodic SPCB heat |
| A = Low | ~25% | Enforcement softens / informal leakage stays acceptable / PRO credit markets dominate without custody scrutiny |
| B = Yes | ~40% if we choose it | Product/ops choice — not market weather. Capex/float required |
| B = No | Default if we ship PRD OQ-02 monthly | Path of least resistance; shops exit |
| C = Yes | ~35% if gated | Requires disciplined city checklist + BD; slow GTM |
| C = No | Default growth-marketing temptation | Ads before supply |
| D = Yes | ~35% if funded | Needs brand/EPR budget or platform float; ops complexity |
| D = No | Default PRD EcoPoints path | Cheap to build; weak in field |

---

## 3. Scenario matrix (decision table)

Outcome labels: **Scale** = multi-city formal network + meaningful ARR; **Niche** = 1–3 corridors / segment lock-in, survival ARR; **Fail** = no viable unit economics or custody volume.

Kill rule of thumb: exit city or product line if after 2 quarters in a seeded city: density below checklist, shop capture share of formalizable scrap &lt; threshold, median settle &gt;14 days on B=Yes promise, or dispute rate unacceptable (per shop feasibility kill criteria).

| # | Name | A | B | C | D | Likelihood | Outcome | Revenue that works | Stage-gate |
|---|------|---|---|---|---|------------|---------|-------------------|------------|
| S1 | **Green Corridor** | High | Yes | Yes | Yes | Low (~8%) | **Scale** | Mid-size mfr SaaS (₹30k–1.2L) + network take-rate on formal settle; recyclers free/light seats | **Persist / accelerate.** Expand city checklist; pull Phase-3 cert export forward. Do not sell “CPCB certificates.” |
| S2 | **Compliance Spine** | High | Yes | Yes | No | Low–Med (~10%) | **Scale (B2B-led)** | Manufacturer SaaS + EPR packs + hub/recycler volume fees; consumer thin (society drives, data-fear phones, brand take-back) | **Persist.** Accept consumer as niche feed; do not fund mass points marketing. |
| S3 | **Audit Panic, Dry Pipes** | High | No | Yes | Yes | Low (~5%) | **Niche → Fail risk** | Short burst of mfr interest; shops starve / multi-home → custody volume collapses | **Conditional persist 1 city only** if B fixed in ≤1 quarter; else **kill liquidity path**, not brand. |
| S4 | **Paper Demand, No Supply** | High | Yes | No | Yes | Low (~6%) | **Fail (commercial)** | Sales can close mid-size logos; empty map → churn + cert claim risk | **Kill city expansion** until C=Yes. Do not sell national coverage. |
| S5 | **Base Case — Honest Network** | Med | Yes | Yes | Yes | Med (~12%) | **Niche → Scale path** | Mfr SaaS primary; take-rate secondary; consumer UPI funded by brand/EPR budget | **Persist as default plan.** Gate cities; measure settle days + capture share. |
| S6 | **B2B Wedge, Thin Street** | Med | Yes | Yes | No | Med (~14%) | **Niche (durable)** | Mid-size Indore-class SaaS + recycler channel packs; consumer residual / society / wipe-ritual only | **Persist.** Best capital efficiency if float for D is scarce. Watch volume quality. |
| S7 | **Kabadi Residual** | Med | No | Yes | No | Med–High (~15%) | **Fail / zombie** | Almost no durable ARR; occasional recycler volume; mfr churn when packs thin | **Kill** consumer+shop GTM; **do not** build Phase 2 points as growth engine. Reboot only with B. |
| S8 | **Ads Before Density** | Med | Yes | No | Yes | Med (~10%) | **Fail (burn)** | CAC spent; empty nearby; trust damage (“scam feel” on delayed money) | **Kill growth spend.** Freeze acquisition until C checklist green. |
| S9 | **Soft EPR, Hard Ops** | Low | Yes | Yes | Yes | Low–Med (~8%) | **Niche (fragile)** | Take-rate / logistics margin only; mfr WTP collapses; gov ARR = 0 | **Persist only if unit economics on volume** clear in 2 cities; else **shrink to recycler ops tool** or exit. |
| S10 | **PRD Default Death** | Low/Med | No | No | No | High as *path if unmanaged* (~18% if we ship defaults) | **Fail** | None reliable (gov SaaS fantasy, points fantasy, recycler seat fees alone) | **Kill idea-as-written.** Rebuild around S5/S6 gates before Phase 1 city launch. |

### Combinations deliberately deprioritized (not full rows)

- **High × No × No × \*** — enforcement without liquidity or density: sales theatre, regulatory claim risk. Same decision as S4/S3: fix B/C or stop selling.
- **Low × No × \*** — informal wins; EcoSure has no wedge. Kill early.
- **Any × Yes × Yes × No vs Yes** — D is a **volume amplifier**, not the payer. S2/S6 show Scale/Niche without D; S1/S5 show faster Scale with D.

---

## 4. Cross-condition logic (PM notes)

1. **A is demand weather; B and C are control surfaces.** We cannot will High EPR; we *can* refuse to launch without B and C.
2. **D does not create the business model.** Feasibility: money is with manufacturers + take-rate. D only raises formal capture vs kabadi for phones/PCs kabadi undervalues or consumers fear.
3. **C without B** seeds a city that bleeds shops to cash buyers within weeks (field: Ramesh / monthly settle).
4. **B without C** funds float with nowhere to deploy; hub FTL and offtake SLA never form (hub collapse below ~8–12 t/month).
5. **High A without honest certificate naming** is an existential brand/legal kill independent of the matrix — custody attestations linked to recycler statutory docs only; never “CPCB certificate.”
6. **Government dashboard is not a scenario axis** — optional legitimacy, not ARR (gov feasibility ~4/10). Keep thin verify-by-number free pilot; do not stage-gate on SPCB subscriptions.

---

## 5. Stage-gate recommendations (next 2 gates)

| Gate | When | Must be true to continue | Kill / pivot |
|------|------|--------------------------|--------------|
| **G0 — Design freeze** | Before Phase 1 pilot code as GTM | Product commits: B=Yes design, C city checklist, cert naming, mfr export with Phase 3 certs | If leadership insists on points-first + monthly settle + English-only + empty-city ads → **stop** (S10) |
| **G1 — City go-live** | First pilot city | N shops live + hub + recycler offtake SLA; WhatsApp/Hindi ops path; settle ≤14 days | Slip go-live; do not soft-launch with pending approvals only |
| **G2 — 2-quarter city review** | ~6 months post go-live | Capture share, settle days, dispute rate, ≥1 paid mid-size mfr or signed LOI with pack usage | Exit city or cut consumer acquisition; hold engineering to custody+packs |

---

## 6. Best / Base / Worst — 24-month narratives

### 6.1 Best case (≈ S1 / optimistic S5) — “Formal corridor compound”

**Conditions:** A moves Med→High in pilot states; EcoSure ships B+C+D; certificate language stays honest; manufacturer export lands when Phase 3 certs exist (not held to Phase 4).

**Months 0–6:** One Tier-2 city passes checklist. Weekly shop settle + limited consumer UPI at collect. Society/brand take-back and data-wipe phones seed custody; kabadi still wins pure cash scrap — accepted. First Indore-class manufacturer pilots evidence vault + export beside consultant, not instead of CPCB portal.

**Months 7–14:** Second city clones playbook. Hub hits FTL with multi-shop trips; recycler offtake SLA holds monsoon buffer. 8–20 mid-size SaaS logos; ARR from subscriptions > vanity EcoPoints. Thin free gov verify-by-number used for legitimacy, not revenue.

**Months 15–24:** 3–5 city corridors; network take-rate meaningful. Large OEMs still PRO-locked — EcoSure is data pipe via recycler, not primary OEM SaaS. Board narrative: **scaled regional EPR evidence network**, not national consumer app. Valuation story = B2B + volume, not MAU.

**Decision at M24:** Double-down on corridor replication; kill any remaining points-as-growth experiments.

---

### 6.2 Base case (≈ S6 with partial D) — “Niche that pays the lights”

**Conditions:** A stays Med; B and C enforced by product discipline; D partial (vouchers/UPI only on partner campaigns, not universal).

**Months 0–6:** Painful BD to seed shops; slower consumer pickup rates than a metro app fantasy. Shops stay because money timing matches street reality. Volume is selective (refused-by-kabadi, wipe ritual, SMB bulk).

**Months 7–14:** Custody chain works; certificates issued as platform attestations + recycler docs. 5–12 mid-size manufacturers pay annual SaaS; recyclers join for volume not seats. EcoPoints exist as bonus ledger — not acquisition engine. One city may miss FTL and need subsidy — managed.

**Months 15–24:** Durable **niche**: compliance spine for mid-size + formal scrap in 2–3 geographies. Not a unicorn consumer story. Unit economics thin but positive if float for shop advances controlled. Government remains free pilot.

**Decision at M24:** **Persist** as specialized EPR custody + SaaS; expand only city-by-city. Do not raise growth capital on consumer MAU.

---

### 6.3 Worst case (≈ S10 / S7 / S8 compound) — “Default PRD + soft money”

**Conditions:** A Low–Med; ship OQ defaults (monthly settle, points-later, manual approval backlog, English-first, manufacturer value held to Phase 4); launch ads/cities without density; optional overclaim on “EPR certificates.”

**Months 0–6:** Empty nearby in Tier-2/3; Priya/Aditya-class users bounce to kabadi cash; Ramesh multi-homes — good scrap informal, EcoSure gets junk. Hub runs half-empty tempos. Trust tickets pile up (delayed points = scam feel).

**Months 7–14:** Phase 2 WhatsApp/points burn engineering; shops churn; no credible cert volume for Neha-class buyers. If sales still pitch CPCB-substitute PDFs, legal/brand incident risk. SPCB interest is curiosity without subscription — as predicted.

**Months 15–24:** Zombie platform or quiet shutdown. CAPEX spent on dashboards for roles that never paid (gov, recycler seats, consumer gift-card fantasy). Reputational scar with shops in pilot towns.

**Decision:** **Kill** the consumer-points-marketplace framing early (G0/G1). Residual IP (custody model) only valuable if restarted under S5/S6 gates — not incrementally patched while burning CAC.

---

## 7. One-page verdict for the stage-gate

| Question | Answer |
|----------|--------|
| What must we believe to invest? | Med EPR pressure is enough **if** B+C are non-negotiable; D is optional amplifier; payers are mid-size manufacturers + network economics. |
| What is the default if we “just build the PRD”? | **S10 Fail.** |
| Minimum persist set? | **S5 or S6** (Med × B=Yes × C=Yes × D optional). |
| Only Scale set? | **S1 or S2** (High × B × C; D optional). |
| Hard kills? | B=No sustained, C=No with growth spend, certificate overclaim, gov/recycler SaaS as primary ARR. |

**Bottom line:** Scenario planning does not change the feasibility one-liner — it prices it. EcoSure’s upside is a **controlled-corridor EPR evidence network**. Every scenario without shop liquidity and city density is a kill; consumer cash/UPI and High EPR only determine how large the persist case becomes.

---

## Related

- [`idea-feasibility-no-ui.md`](./idea-feasibility-no-ui.md) — WORKS-IF gates  
- [`tier2-tier3-field-issues.md`](./tier2-tier3-field-issues.md) — B3 money timing, B4 density  
- [`manufacturer-feasibility-02-indore-vs-oem.md`](./manufacturer-feasibility-02-indore-vs-oem.md) — who pays  
- PRD [`14-open-questions.md`](../prd/14-open-questions.md) — OQ-02/03 defaults that create S10  
