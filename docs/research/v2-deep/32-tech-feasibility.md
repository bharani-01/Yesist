# 32 — Engineering Feasibility of PRD v2

**Agent:** 32 of 36 (v2 deep-research swarm)
**Date:** 2026-09-27
**Scope:** Team size, a realistic timeline for Phases 0–2, the hardest components (offline sync conflicts, payout reconciliation, attestation integrity, bilingual output), PWA versus native Android for field staff, testing on low-end devices, and architecture risks.
**Files reviewed:** `docs/prd/03-domain-model.md`, `11-integrations.md`, `12-nfr-security.md`, `13-roadmap.md`; `docs/research/v2-deep/06-hosting-certin.md`, `08-sms-whatsapp.md`.
**PRD files were not edited.**

**Short answer:** The architecture is sound: PostgreSQL + Node.js, append-only custody, idempotent side effects, government hosting. The **6–8 + 12–16 + 10–12 week plan (28–36 weeks) is not realistic**. With a competent team of 9–11 people, expect **about 50–62 weeks** from Phase 0 start to Phase 2 exit. Most of the gap comes from outside the code: hosting provisioning, WhatsApp and SMS onboarding, the payout API contract, and the CERT-In audit. Inside the code, Phase 1 packs four role apps, offline sync, money movement and attestations into one phase. Phase 1 should be split in two.

---

## 1. Sources

| # | Source | URL |
|---|--------|-----|
| W1 | MDN, *Storage quotas and eviction criteria* | https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria |
| W2 | web.dev, *Persistent storage* | https://web.dev/articles/persistent-storage |
| W3 | web.dev, *Storage for the web* | https://web.dev/articles/storage-for-the-web |
| W4 | web.dev, *Offline data* (Learn PWA) | https://web.dev/learn/pwa/offline-data |
| W5 | Chromium source, `background_sync_parameters.cc` | https://chromium.googlesource.com/chromium/src/+/HEAD/content/public/browser/background_sync_parameters.cc |
| W6 | WICG, *Web Background Synchronization* spec | https://wicg.github.io/background-sync/spec/ |
| W7 | WICG, *Periodic Background Sync* spec (browser support table) | https://wicg.github.io/periodic-background-sync/ |
| W8 | Chrome for Developers, *Periodic Background Sync* | https://developer.chrome.com/docs/capabilities/periodic-background-sync |
| W9 | TestMu, *Background Sync browser support* (notes that Android WebView does not expose SyncManager) | https://www.testmuai.com/learning-hub/background-sync-browser-support/ |
| W10 | Chrome for Developers, *Trusted Web Activity overview* and *Offline-first TWA* | https://developer.chrome.com/docs/android/trusted-web-activity , https://developer.chrome.com/docs/android/trusted-web-activity/offline-first |
| W11 | Wednesday, *Native offline vs PWA for field teams (2026)* (vendor opinion) | https://mobile.wednesday.is/writing/native-offline-vs-pwa-field-teams-enterprise-comparison-2026 |
| W12 | FieldGovern, *Offline data collection in India: PWA vs app vs paper* (vendor opinion) | https://www.fieldgovern.com/blog/offline-data-collection-india.html |
| W13 | firt.dev, *PWA power tips* (Android Go and storage notes) | https://firt.dev/pwa-design-tips/ |

**What the sources establish:**
- Chromium lets one origin use up to 60% of the disk (W1, W4). Data is "best-effort" by default and can be evicted under storage pressure unless `navigator.storage.persist()` is granted. Chrome grants persistence silently, using heuristics such as whether the PWA is installed (W2, W4).
- Chrome's one-off Background Sync makes **at most 3 attempts**: the first immediately, then retries after **5 and 15 minutes**. Each sync event can run for **at most 3 minutes** (W5).
- Periodic sync runs **no more often than every 12 hours**, only for installed apps, and depends on site engagement (W5, W8).
- Background Sync is **Chromium-only**. Firefox and Safari do not support it (W7, W9). Android **WebView does not expose SyncManager**, so a WebView wrapper loses it (W9).
- A Trusted Web Activity (TWA) uses Chrome as its runtime, so it keeps Chrome's service-worker features. On first launch, the service worker is not yet installed, so a first launch while offline needs a native fallback screen (W10).

Estimates in §3 are engineering judgement, not sourced figures. Lead times for external dependencies come from docs 06 and 08 where stated. Anything else is marked **UNVERIFIED**.

---

## 2. Findings

### F1. Phase 1 is really three projects

Phase 1 in `13-roadmap.md` covers all of the following:
- a citizen app, a shop app, a hub app and a recycler app;
- offline capture for three of those roles;
- dual weighing with photos;
- trips and transfers;
- disputes;
- weekly settlements with advances and recoveries;
- citizen UPI incentives;
- custody attestations with capacity checks;
- public verification;
- SPCB flags;
- an operator console (rate cards, disputes, float view, reconciliation);
- full Hindi and English.

That is about 30 of the 45 entities in `03-domain-model.md`, plus two regulated integrations (payouts and messaging). Each block alone would take a small team 6–10 weeks to build properly:
- **custody chain + offline**
- **money** (settlements, advances, payouts, reconciliation)
- **attestations + regulator views**

Doing all three in 12–16 weeks, and still leaving time for a CERT-In audit (doc 06 estimates 4–8 weeks, UNVERIFIED), is not credible.

### F2. The offline sync conflict model is underspecified, and it is the highest technical risk

`03-domain-model.md` §4.6 says only: "Conflicts are resolved by the receiving party and logged." `12-nfr-security.md` §3 gives one example ("same lot received twice"). The spec does not cover:

- **What syncs.** It is not stated whether clients replicate row state or submit commands. For an append-only custody chain, clients should submit **commands/events** (for example `ReceiveTransfer`, `RecordWeigh`) with client-generated UUIDv7 IDs and idempotency keys. The server stays the only authority on state transitions. Row replication with last-write-wins is unsafe here.
- **Rejection semantics.** Some offline actions will be invalid by the time they sync: the lot was already received by another device, the shop was suspended, the rate card changed, or the offtake agreement expired. The PRD has no "rejected on sync" state, no rule for telling the user, and no rule for what happens to a physical lot whose digital receipt was rejected.
- **Two-sided custody.** In a hand-off, the sender and the receiver may both be offline. Their weigh records arrive in any order, possibly hours apart. Tolerance checks and disputes must therefore be computed at sync time, not capture time. Settlements must not post lines whose counterpart weigh record is still missing.
- **Clocks.** Device clocks on low-end phones drift or are set by hand. Doc 06 already requires NTP on servers. The client needs `captured_at` (from the device), `received_at` (from the server) and a detected clock-skew flag. Dwell and SLA calculations should use server time plus an allowed skew.
- **Auth while offline.** Phone-OTP server sessions will expire during long offline stretches. A field user must still be able to capture work offline and re-authenticate before syncing, without losing the queue. The queue must also be bound to the user and device so a shared phone cannot sync someone else's records.
- **Photos.** Weigh photos are 200–500 KB each (W12). They must go in a separate, resumable upload queue (OPFS or IndexedDB blobs), compressed on the device. A record should sync without its photo and be marked "evidence pending". Loading a full 12 MP image into a canvas on a 2 GB phone can crash the tab (UNVERIFIED, commonly reported).
- **The 5-minute target.** `12-nfr-security.md` §8 says sync happens "within 5 minutes of signal returning". This is only achievable when the app is **open**. In the background, Chrome's Background Sync fires once connectivity returns, with at most 3 attempts (retries at +5 and +15 minutes) and a 3-minute limit per event (W5). OEM battery managers (Xiaomi, Realme, Oppo, Vivo) may also delay it. The target should be restated: sync on app open and on the `online` event, and use Background Sync as best effort only.

### F3. Payout reconciliation needs a ledger, and the payout rail itself is still undecided

- `11-integrations.md` §4 leaves the payout channel as "a public-sector bank payout API or PFMS-linked route, to be confirmed". Everything in the incentive and settlement workflow depends on that choice:
  - the status model (synchronous, asynchronous, "deemed success", T+1 returns);
  - how idempotency works;
  - the reconciliation file format;
  - cut-off times;
  - float funding.

  Bank API onboarding for a government account typically takes 8–16 weeks: agreement, UAT, IP whitelisting, digital signing certificates (UNVERIFIED; varies by bank). A PFMS route is usually slower.
- The domain model has `Settlement`, `SettlementLine`, `ShopAdvance`, `AdvanceRecovery` and `CitizenIncentive`. It has **no double-entry ledger, no payout-attempt table and no bank-statement import**. Without these, the following cannot be reconciled or audited:
  - a payout that shows failed at the bank but paid in the app;
  - a reversal after "paid";
  - a partly disputed settlement;
  - an advance recovered across two settlements.

  The daily reconciliation target in `12-nfr-security.md` §8 needs these tables.
- Money movement is the area where a CERT-In auditor and the sponsor's finance team will look hardest. Build a thin, well-tested payments module with maker-checker approval for batch release. It should run on its own schedule and not block the custody chain.

### F4. Attestation integrity: storing a hash is not proof of who issued it, and the capacity rule has a race

- `CustodyAttestation.sha256` proves the file has not changed since upload. It does **not** prove that EcoSure or the recycler issued it. Anyone can hash a fake PDF. Public verification should check a **server-side signature**: Ed25519 or X.509 over the canonical attestation fields, with keys in the India-region KMS that doc 06 recommends. It should also show a QR code that resolves to the government-hosted verification page. The audit log should be **hash-chained** so tampering is detectable, which fits "append-only".
- The rule "total attested weight for an issuer ≤ authorized capacity for the period" is a **cross-row invariant**. Two concurrent issues can both pass the check. It needs either `SERIALIZABLE` transactions or a per-issuer, per-period advisory lock (`pg_advisory_xact_lock`) plus a period-total row, and a test that proves concurrent issuing cannot break it.
- Supersede chains need a unique constraint on `supersedes_id` so there cannot be two successors, and a rule that only the latest version in a chain counts toward capacity and attribution.

### F5. Bilingual output is a real workstream, not a translation pass

- Hindi PDFs (worksheets, attestations, inspection packs) need correct Devanagari conjunct shaping. Common Node PDF libraries shape complex scripts poorly (UNVERIFIED for current versions). The low-risk route is HTML-to-PDF through headless Chromium with a bundled Noto Devanagari font, which the Chromium engine already shapes correctly.
- Each message template goes through **two external approvals per language**: Meta template review and DLT template registration with pre-tagged variables (doc 08). That is about 9 events × 3 languages, or roughly 27 templates, each approved twice. Hindi SMS is capped at 70 characters per Unicode segment (doc 08). These approvals are on the schedule's critical path, not just translation work.
- The PRD needs a translation workflow: string catalogue (ICU MessageFormat), a named Hindi reviewer, glossary for e-waste and legal terms, pseudo-localisation in CI, Indian number formatting (lakh/crore), and a policy for bilingual legal text (which language prevails).

### F6. PWA versus native Android: an installable PWA is viable if it is hardened and delivered via TWA, with a native fallback decided early

| Factor | Plain PWA (browser install) | PWA in a TWA (Play Store) | Capacitor shell (web code + native SQLite and background worker) | Native Kotlin |
|---|---|---|---|---|
| Code reuse with citizen and operator web | Full | Full | About 90% | Low |
| Offline storage durability | Best-effort unless persistence is granted (W1, W2) | Same; installation improves the chance persistence is granted (W4) | SQLite in app storage; not evicted by the browser | SQLite/Room |
| Background sync | Chromium only; 3 attempts; 3-minute cap (W5) | Same, because Chrome is the runtime (W10) | WorkManager, reliable | WorkManager |
| First launch while offline | Fails | Needs a native fallback activity (W10) | Works | Works |
| Distribution and updates | URL; instant | Play Store; web content updates instantly | Play Store; web content updates instantly (with care) | Play Store review |
| Extra cost versus PWA | — | Small (2–3 days) | +15–25% on field-app work (estimate) | +60–100% (a second codebase) |

**Recommendation:**
- Build one responsive web client.
- Ship field roles as a **TWA** from Phase 1. Call `navigator.storage.persist()`, run an IndexedDB command queue, and use OPFS for photos.
- Run a **2-week offline spike in Phase 0** on real low-end devices. Kill criteria: any lost record, eviction observed, or queue replay failing after the OS kills the app. If any is hit, move the field roles to a **Capacitor** shell, which reuses the same web code.
- Do not use a plain WebView wrapper: it loses SyncManager (W9).
- Fully native Kotlin is not justified at pilot scale.

### F7. Low-end device testing is not planned or budgeted

`12-nfr-security.md` §4 says "works on low-end Android phones and 2G/3G connections", but there is no device matrix, no performance budget and no field-test plan. A real device lab (UNVERIFIED model availability) should include:
- 2 Android Go phones (2 GB RAM, Android 12–14 Go);
- 3 budget phones (3–4 GB RAM) from Xiaomi/Redmi, Realme and Samsung M/A series, which have the most aggressive battery managers;
- 1 older phone (Android 9–10) to set the minimum supported Chrome version;
- 1 shared counter tablet.

The test plan also needs:
- **Chaos tests:** airplane mode mid-upload, force-stop during sync, device clock moved ±2 days, storage filled to under 500 MB free, two devices receiving the same lot, session expiry while offline.
- **Budgets:** initial JavaScript ≤ 170 KB gzipped for field routes; interactive in under 5 s on a 2 GB phone over emulated 3G; memory under 150 MB during photo capture.
- **Field testing:** a week-long shadow run in Pithampur before the Phase 1 exit.

Feature phones (KaiOS/JioPhone) cannot run the PWA. The PRD should say so and rely on SMS/IVRS for those users (doc 08).

### F8. Architecture risks

1. **A single idempotent `schema.sql` with no migrations.** This works for creating tables and policies. It cannot safely handle renames, type changes, backfills or splitting data in production. Keep `schema.sql` as the canonical, idempotent snapshot, and also keep ordered, versioned migrations for data changes. CI should check that a fresh `schema.sql` build and the migrated database produce the same schema.
2. **Background jobs and outbox.** Messages, payouts, flag computation, exports and PDF generation need a durable job queue. Use a Postgres-backed queue (pg-boss or graphile-worker) with a transactional outbox. This avoids adding Redis to the SDC footprint and keeps side effects consistent with custody writes.
3. **Shape of the system.** Use a **modular monolith**: one Node service with modules for identity, custody, payments, attestations, compliance and messaging, plus a separate worker process. Microservices would multiply the audit surface and the hosting requests to MPSEDC.
4. **External lead times dominate.** These do not depend on the code:
   - hosting via MPSEDC (doc 06);
   - Meta government approval and business verification, 3+ weeks (doc 08);
   - DLT principal entity, header and templates, plus the TRAI exemption (doc 08);
   - the payout API contract (8–16 weeks, UNVERIFIED);
   - a licensed Aadhaar verification provider (UNVERIFIED lead time);
   - the CERT-In audit, 4–8 weeks (doc 06).

   The roadmap rule "no phase starts until the previous gate passes" puts all of these in series after the pilot.
5. **Authentication.** Phone OTP for everyone conflicts with MFA for SPCB and operator admins (doc 06, F7). Without an early decision, this becomes rework.
6. **The performance target mixes server and network time.** "Pickup list p95 < 800 ms on 3G" combines server latency with 3G round trips (often 300–600 ms each). Split it: server p95 ≤ 300 ms, plus a client budget for 3G.
7. **Object storage and malware scanning on SDC.** Private object storage (for example MinIO on the SDC) and ClamAV-style scanning must be provisioned and patched by the operator. This work is not in the Phase 0 plan.

---

## 3. Team and timeline

### Minimum viable team (steady state, Phases 0–2)

| Role | FTE | Notes |
|---|---|---|
| Tech lead / architect | 1 | Owns sync protocol, data model, security design |
| Backend engineers (Node + Postgres) | 2 | Custody, payments, attestations, compliance |
| Frontend / PWA engineers | 2 | Field offline client, citizen, operator, SPCB |
| Offline/mobile specialist | 1 | Sync engine, TWA/Capacitor, device lab (can be one of the frontend engineers if senior) |
| QA engineer (manual + automation, device lab) | 1 | Chaos and field tests |
| DevOps / security engineer | 1 | SDC/cloud, CI, SBOM, logs, backups, audit remediation |
| Product designer (bilingual UX) | 0.5–1 | Icon+text field UX, accessibility |
| Hindi content/localisation owner | 0.5 | Strings, templates, legal glossary |
| Product manager / BA | 1 | Sponsor, pilot ops, gates, acceptance |
| Payments / finance analyst | 0.5 | Reconciliation rules, bank onboarding |
| **Total** | **≈ 9.5–11 FTE** | A 4–5 person team roughly doubles the timeline |

### Realistic timeline (assumes external tracks start during the pilot)

| Stage | PRD v2 | Realistic | What drives the difference |
|---|---|---|---|
| Pilot (manual) | 12 wk | 12 wk | Unchanged. Start hosting, WABA, DLT, payout-bank and audit-empanelment procurement in week 1 |
| Phase 0 — Foundations | 6–8 wk | **8–10 wk** | Hosting provisioning, CI/SBOM, auth with MFA for admins, messaging service, offline spike (F6), migrations tooling |
| Phase 1a — Custody chain + offline + attestations | — | **14–16 wk** | Shop/hub/recycler offline flows, dual weigh, disputes, attestations with signatures, public verification, bilingual UI. Payouts via manual bank-file upload with reconciliation |
| Phase 1b — Automated money + citizen + SPCB | — | **8–10 wk** | UPI payout API, citizen incentives, advances, ledger reconciliation, SPCB flags, operator console |
| CERT-In audit + remediation + field shadow run | not in plan | **4–8 wk** | Can overlap the end of 1b by about 2 weeks |
| **Phase 1 total** | 12–16 wk | **24–32 wk** | |
| Phase 2 — Producers and monitoring | 10–12 wk | **12–14 wk + 3–4 wk re-audit** | Attribution review queue, bilingual PDF worksheets, export approvals, inspection packs, offline inspection |
| **Phases 0–2 total** | 28–36 wk | **≈ 50–62 wk** | About 1.7× the PRD figure |

**Verdict on the question asked:** Phase 0 at 6–8 weeks is achievable only if hosting and messaging onboarding are already done. Phase 1 at 12–16 weeks is **not realistic**: the true figure is 24–32 weeks including the audit. Phase 2 at 10–12 weeks is close, but it needs a re-audit (doc 06).

---

## 4. Risks (ranked)

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Phase 1 overrun, causing the pilot corridor to lose momentum (shops go back to informal buyers) | High | High | Split Phase 1; keep the manual pilot running until 1a exits |
| R2 | Offline data loss or duplicate custody events | Medium | High | Command-based sync, idempotency keys, persisted storage, chaos tests, Capacitor fallback gate |
| R3 | Payout rail undecided, blocking weekly settlement | High | High | Decide the rail during the pilot; ship bank-file payouts first; add a ledger |
| R4 | External approvals (hosting, WABA, DLT, bank, audit) serialised after the pilot | High | High | Run them in parallel from pilot week 1; record owners and dates in `14-open-questions.md` |
| R5 | Forged attestation PDFs pass hash-only verification | Medium | High | Signed attestations + QR + hash-chained audit |
| R6 | Capacity invariant broken by concurrent issuing | Low–Medium | High | Advisory lock or SERIALIZABLE; concurrency test |
| R7 | Hindi PDF shaping defects in statutory worksheets | Medium | Medium | Headless-Chromium rendering; golden-file visual tests |
| R8 | Schema evolution breaks production data (idempotent file only) | Medium | Medium | Versioned migrations alongside `schema.sql` |
| R9 | OEM battery killers and storage pressure on budget phones | High | Medium | Foreground sync, persist(), pending-sync badge, device lab |
| R10 | Key-person risk on the sync engine | Medium | Medium | Written sync protocol spec; pair programming; property-based tests |

---

## 5. Recommended PRD changes

| # | File | Change |
|---|---|---|
| 1 | `13-roadmap.md` Overview table and Phase 1 | Split Phase 1 into **1a Custody chain** (14–16 wk: shop/hub/recycler offline, dual weigh, disputes, signed attestations, public verification, bilingual; payouts by reviewed bank file) and **1b Money and regulator** (8–10 wk: UPI payout API, citizen incentives, advances, daily ledger reconciliation, SPCB flags, operator console). Add a **4–8 wk CERT-In audit and field shadow run** before the Phase 1 exit. Change Phase 0 to 8–10 wk and Phase 2 to 12–14 wk plus re-audit. |
| 2 | `13-roadmap.md` Pilot | Add a parallel **"Pilot-period enablement track"**, with named owners, starting in week 1: hosting request, Meta government approval and business verification, DLT principal entity, header and templates, payout bank selection and API agreement, Aadhaar provider contract, audit empanelment slot. Amend the rule to: "No *product* phase starts until the previous gate passes; enablement work runs in parallel." |
| 3 | `13-roadmap.md` Phase 0 | Add: a 2-week **offline spike on the device lab**, with kill criteria (any lost record, eviction observed, replay failure after the OS kills the app → switch field roles to a Capacitor shell); job queue plus outbox; migrations tooling; admin MFA. Add a Phase 0 exit condition: "offline spike passed on the reference low-end device". |
| 4 | `12-nfr-security.md` §3 Offline | Replace it with a sync protocol spec, covering:<br>• clients submit append-only **commands** with client UUIDv7 IDs and idempotency keys, and the server is authoritative;<br>• a `rejected_on_sync` state with user notification and an operator queue;<br>• `captured_at`, `received_at` and a skew flag;<br>• photos in a separate resumable queue, with records syncing as "evidence pending";<br>• the queue bound to user and device, with offline capture allowed after the session expires but re-authentication required to sync;<br>• `navigator.storage.persist()` requested, and a warning when storage is not persisted or free space is below 500 MB. |
| 5 | `12-nfr-security.md` §8 | Change "Offline sync within 5 minutes of signal returning" to: "within 1 minute while the app is open; background sync is best effort (Chromium: 3 attempts, 3-minute cap)". Change "Pickup list p95 < 800 ms on 3G" to "server p95 ≤ 300 ms; field route interactive < 5 s on the reference 2 GB device over emulated 3G; initial JS ≤ 170 KB gz". |
| 6 | `12-nfr-security.md` §1 Clients | State: "Field roles ship as an installable PWA packaged as a Trusted Web Activity (Play Store) with a native offline first-launch screen; plain WebView wrappers are not allowed. Minimum Chrome version defined in Phase 0. Feature phones are served by SMS/IVRS only." |
| 7 | `12-nfr-security.md` new §4a "Device and field testing" | Add the device matrix (2 Android Go 2 GB, 3 budget OEM 3–4 GB, 1 Android 9–10, 1 counter tablet), the chaos test list (F7) and a 1-week field shadow run before each field-role phase exits. |
| 8 | `03-domain-model.md` §1 and §3 | Add the entities **LedgerAccount**, **LedgerEntry** (double-entry, append-only), **PayoutAttempt** (provider reference, status, raw response, attempt number) and **BankStatementLine** (imported for daily reconciliation). Settlement, CitizenIncentive, ShopAdvance and AdvanceRecovery post ledger entries. Add **SyncCommand** (id, device, user, type, payload hash, captured_at, received_at, result, rejection_reason) to replace or extend `OfflineSyncBatch`. |
| 9 | `03-domain-model.md` CustodyAttestation and §4 | Add `signature`, `signing_key_id` and `canonical_payload_version`. Make `supersedes_id` unique. Add: "capacity check runs under a per-issuer, per-period lock; only the latest version in a supersede chain counts". Add a hash-chained `AuditLog` (`prev_hash`, `row_hash`). |
| 10 | `12-nfr-security.md` §4 Language | Add: ICU string catalogue, named Hindi reviewer and glossary, pseudo-localisation in CI, Indian number formatting, PDFs rendered through headless Chromium with an embedded Noto Devanagari font and golden-file tests, and a statement of which language prevails in bilingual legal text. |
| 11 | `11-integrations.md` §4 UPI payouts | Add: "Payout rail decision is a pilot-period gate. Until the API is live, settlements are released as a maker-checker-approved bank file. The daily reconciliation matches PayoutAttempt to BankStatementLine and flags mismatches to the operator." |
| 12 | `13-roadmap.md` Cross-cutting rules | Change rule 1 to: "`schema.sql` is the canonical idempotent snapshot; data-changing releases also ship an ordered migration, and CI checks that the snapshot and migrated database produce the same schema." Add rule 5: "Modular monolith with one worker process; Postgres-backed job queue with transactional outbox for messages, payouts and PDFs." |
| 13 | `00-overview.md` or `13-roadmap.md` | Add a **team and staffing** line: about 10 FTE (§3), with the note that a 4–5 person team roughly doubles the timeline. |
| 14 | `14-open-questions.md` | Add: payout rail and bank (owner, date); minimum Android/Chrome version; TWA versus Capacitor decision date (end of the Phase 0 spike); Hindi legal-text precedence. |

---

## 6. Score

**5 / 10** for engineering feasibility as written.

**What works:** the stack is fitting and portable. Append-only custody, idempotent side effects, a single system of record, WhatsApp as a phase-1 channel, pilot-first gating and dropping the points ledger all simplify the build and reduce risk.

**Why the score is not higher:**
- The schedule is about 1.7× too optimistic, mainly because Phase 1 bundles three projects and leaves out the audit and external lead times.
- The offline conflict model is one sentence long, for the hardest subsystem in the product.
- Money movement has no ledger, and the payout rail is still undecided.
- Attestation verification relies on a hash with no signature.
- Low-end device support is stated but has no test plan.

All of these can be fixed in the PRD now at low cost. With the Phase 1 split, a parallel enablement track and a written sync protocol, the plan becomes deliverable by a team of about 10 in roughly 12–15 months.
