# EcoSure — Government Agency Dashboard PRD

**Role:** `government`  
**Organization type:** `government`  
**Phase focus:** Phase 4  
**Last updated:** 2026-09-26

---

## 1. Summary

Government agencies (e.g., CPCB/SPCB-aligned users) get **read-heavy** aggregate visibility into platform e-waste flows, education resources, feedback channels, and compliance monitoring signals. They do **not** receive a commercial “platform revenue/profitability” view.

---

## 2. Features

### F-G1 Registration and profile — Phase 0 / enable Phase 4

**Description:** Agency registers jurisdiction (national/state), contacts; Platform Admin verifies.

**Acceptance criteria:**
- Approval required.
- Jurisdiction metadata drives default filters (e.g., state).

**Data:** `Organization`  
**Permissions:** Admin approve

---

### F-G2 Overall waste collection and processing statistics — Phase 4

**Description:** Aggregate kg collected/processed, org counts by type, certificate counts, trend charts.

**User story:** As a regulator analyst, I want reliable aggregates so I can monitor regional performance.

**Acceptance criteria:**
- Filters: date range, state/region.
- No individual consumer PII in default views.
- Loading/empty/error states.
- Export aggregate CSV for internal use.

**Data:** Platform aggregates  
**Permissions:** Government role

---

### F-G3 Educational resources — Phase 4 (content may exist Phase 1)

**Description:** Access education/training materials tagged for government audience (and general).

**Acceptance criteria:**
- Read published content; empty handled.

**Data:** `EducationalContent`  
**Permissions:** Read

---

### F-G4 Financial statistics — clarified / limited — Phase 4

**Original draft asked for “payout and financial statistics… revenue and profitability.”**

**Product decision:** Government dashboards show **compliance-oriented economic signals only**, such as:
- Count/value of **posted settlements** in jurisdiction (optional, anonymized totals)
- Outstanding dispute counts

They do **not** show EcoSure corporate profitability, org bank details, or competitor-level rate cards.

**Acceptance criteria:**
- UI labels avoid “your revenue”.
- Any financial aggregate is jurisdiction-scoped and anonymized.
- Detail drill-down to named org finances requires future lawful process feature (out of scope Phase 4).

---

### F-G5 Platform overall statistics — Phase 4

**Description:** Users, businesses, total e-waste, sustainability impact summaries.

**Acceptance criteria:**
- Consistent with F-G2; may include EcoPoints program participation counts (not balances per user).

---

### F-G6 Feedback and suggestions — Phase 4

**Description:** Submit feedback on platform features.

**Acceptance criteria:**
- Create `Feedback` with category/body.
- Confirmation success state; history of own submissions.
- Platform Admin can review.

**Data:** `Feedback`  
**Permissions:** Write own; admin read all

---

### F-G7 Monitor and enforce compliance — Phase 4 (monitor) / Phase 5 (enforce)

**Description:** Monitor compliance signals; enforcement write-tools later.

**Phase 4 (in scope):**
- Flags: lots past SLA without certificate; orgs suspended; missing transfers.
- Read-only lists with org public names and metrics.

**Phase 5 (later):**
- Formal notices/orders workflow (OQ-33).

**Acceptance criteria (Phase 4):**
- Flag list with severity and age.
- Click-through to aggregate evidence (lot counts, cert gaps) without dumping unrelated PII.
- Cannot mutate pickup/settlement records.

**Data:** Derived compliance views  
**Permissions:** Read

---

## 3. Screen checklist

Agency profile, aggregate dashboard, compliance flags, education, feedback, limited economic signals — L/E/S/Err/401/403.

---

## 4. Clarifications vs original draft

| Draft ask | PRD decision |
|-----------|--------------|
| Gov “revenue and profitability” | Replaced with anonymized compliance economic signals |
| Enforce compliance | Monitor in Phase 4; enforce workflows Phase 5 |
| Same “overall stats” as operators | Yes for aggregates; no for private financials |
