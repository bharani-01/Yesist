# v3 Simulation 09 — The regulator: four weeks as an MPPCB regional officer in Indore

**Simulation:** 09 (v3 real-life simulation series)
**Persona:** Suresh, Regional Officer (RO), MPPCB Regional Office Indore. Second persona: a CPCB scientist in the E-waste division, Delhi.
**PRD reviewed:** `docs/prd/v3-PRD.md` (v3 consolidated, 2026-09-27), read in full. Prior research: `docs/research/v2-deep/27-spcb-adoption.md`.
**Date:** 2026-09-27. The PRD was not edited.
**Convention:** Facts from primary government pages are cited. News, aggregator, LinkedIn or inferred claims are marked **UNVERIFIED**. The narrative itself is a simulation: people, companies and numbers in it are invented unless a source is given.

---

## 1. Short answer

**Score: 5.5 / 10** for how well v3 works for regulators in real life.

v3 took the right lessons from the v2 adoption review: push digests instead of hoping officers log in, link to the Central Inspection System (CIS), export the CPCB action-plan table, and feed the CM Dashboard. Those are the parts Suresh actually uses. But v3 stopped at the surface. A flag in v3 can be raised, ranked, and linked, but it cannot be *disposed of* by the officer. There is no "acknowledged", "not actionable", "explanation received" or "referred to HQ" state. In a Board running at roughly one-third strength, an open red flag that nobody can close is not evidence; it is a liability with the officer's name on it. The two headline flags (mass-balance variance and unbacked certificate) are both built on data the recycler reports itself, and the "unbacked" label is technically misleading because EcoSure only sees part of a recycler's inflow. Nothing in v3 turns EcoSure data into something that survives objection before the National Green Tribunal (NGT). And the recycler sees its own flags the moment they are raised, which tips off exactly the kind of politically connected operator the flags are meant to catch.

---

## 2. Sources and context

| # | Source | Type | Used for |
|---|--------|------|----------|
| S1 | Indian Express, "Nearly half of all posts in pollution boards vacant" — https://indianexpress.com/article/india/nearly-half-of-all-posts-in-pollution-boards-vacant-some-for-decades-9584609/ (via doc 27 S1) | News citing a CPCB affidavit to the NGT (2024) | MPPCB: 1,228 sanctioned posts, 783 vacant (63.76%) |
| S2 | Down To Earth, Daily Court Digest, 6 Jan 2026 — https://www.downtoearth.org.in/environment/daily-court-digest-major-environment-orders-january-6-2026-2 | News reporting an NGT filing | MPPCB "lacked the authority to independently fill vacant positions"; depends on MPPSC and the Staff Selection Board; proposal to amend rules pending with the state; 18 Scientist posts advertised 25 Feb 2025; 20 Chemist and 11 Lab Assistant posts advertised 28 Oct 2025 |
| S3 | MPPCB Assistant Engineer (Environment) recruitment 2026 — https://govtserviceinfo.com/mppcb-ae-recruitment-2026/ ; https://www.karmasandhan.com/mppcb-ae-recruitment-2026/ | Aggregators (**UNVERIFIED** against the MPPCB notification) | Only 14 AE posts advertised, applications 10–30 Apr 2026 |
| S4 | MPPCB Indore RO contract hiring, June 2026 — https://mpplr.com/mppcb-bharti-2026/ ; postponement — https://mpvacancy.in/2026/06/17/mppcb-vacancy-2026/ | Aggregators (**UNVERIFIED**) | Indore RO (Scheme 78, Vijay Nagar) advertised one-year contract JRF, field assistant and data-entry posts for a Pithampur groundwater project; walk-in postponed. Shows the RO fills gaps with short contract staff |
| S5 | CPCB reply in NGT EA 04/2024 in OA 512/2018 (Shailesh Singh v. State of UP) — https://www.greentribunal.gov.in/sites/default/files/news_updates/Reply%20by%20CPCB%20in%20EA%20No.%2004%20of%202024%20IN%20OA%20No.%20512%20of%202018%20(Shailesh%20Singh%20Vs.%20Govt%20of%20Uttar%20Pradesh%20and%20Ors).pdf | Primary (NGT website) | CPCB Section 5 EPA directions to all SPCBs: physically verify recyclers and refurbishers (GPS location, GPS-tagged photos and video, EEE-code raw material, installed machinery, actual capacity) against what they uploaded on the EPR portal; act against false uploads; correct CTOs; drives against illegal recyclers |
| S6 | CPCB Action Taken Report in the same matter — https://www.greentribunal.gov.in/sites/default/files/news_updates/Action%20Taken%20Report%20on%20behalf%20of%20CPCB%20in%20EA%20No%2004%20of%202024%20in%20OA%20No%20512%20of%202018%20Shailesh%20SIngh%20Vs.%20State%20of%20UP%20and%20Ors.pdf | Primary (NGT website) | NGT order of 14 Nov 2025: "lapse in the enforcement of the Rules"; SPCBs to "assess the performance of existing Recycling Plants and bridge the gaps"; CPCB to provide a reliable e-waste quantification method; monitor vulnerable locations and inter-state movement |
| S7 | Newslaundry investigation, 30 Jul 2025 — https://www.newslaundry.com/2025/07/30/exclusive-indias-e-waste-mirage-crores-in-corporate-fraud-amid-govt-lapses-public-suffering ; reporter's diary, 29 Dec 2025 — https://www.newslaundry.com/2025/12/29/reporters-diary-how-i-chased-trucks-and-scaled-walls-to-uncover-indias-e-waste-recycling-fraud | Investigative journalism | 31 of 41 visited plants in UP, Haryana, Uttarakhand, Rajasthan inactive, non-existent or irregular; trucks doing short weighbridge runs to fake inflow; Haryana SPCB told the NGT all plants were compliant; environment audit rules followed (claims about scale are the publication's, **UNVERIFIED** independently) |
| S8 | "GST linked e-waste invoices", CPCB direction reportedly dated 7 Jul 2026 — https://legalupdate.qhsealert.com/gst-linked-e-waste-invoices-cpcb-epr-portal-update-2026/ ; https://www.hulladekpwl.com/post/india-s-e-waste-regulations-in-2026-what-s-changed-and-what-businesses-must-know | Compliance blogs (**UNVERIFIED**, primary direction not found) | Recyclers must upload GST e-invoices for recovered end products on the EPR portal; certificates on other invoices treated as false. CPCB reportedly uses automated "over-generation" flagging and GST/Customs cross-checks |
| S9 | CPCB Environmental Compensation guidelines under E-Waste Rules 2022 (TNPCB mirror) — https://www.tnpcb.gov.in/PDF/Waste_Mngt/E-waste/EnvironmentalCompensation.pdf | Primary (mirror) | Rule 22 EC; recycler EC regime based on ₹15,000 registration fee, doubling on repeat default; false EPR certificates attract EC |
| S10 | Producer registration SOP (MPCB mirror) — https://www.mpcb.gov.in/sites/default/files/producer_ewm.pdf | Primary (mirror) | Rule 4(5): CPCB revokes registration for false information for up to 3 years after a hearing; decision within 10 working days of hearing |
| S11 | Bharatiya Sakshya Adhiniyam 2023, section 63 — https://indiacode.ecourtsindia.com/bsa/section/63.md ; commentary — https://www.lawweb.in/2025/06/how-to-prove-electronic-evidence-under.html | Primary statute + commentary | Electronic records admissible only with a certificate in the Schedule format, signed by the person in charge **and** an expert, with hash value (hash detail from commentary) |
| S12 | MPPCB home page and CIS SOP (via doc 27 S8, S10) | Primary | All inspections routed through CIS; risk-based, rotational allocation; 48-hour digitally signed report |

**Context Suresh works in (from S1–S6, doc 27):** one RO covering Indore district's air, water, hazardous waste, biomedical, plastic, batteries and e-waste units; consent renewals on XGN with a 30-working-day target; CIS-allocated inspections with a 48-hour report deadline; several live NGT matters; CM Helpline complaints; and a Board that cannot even hire its own clerks without state approval (S2). E-waste is perhaps 2–5% of his week (**UNVERIFIED** estimate).

---

## 3. The simulation

### Setting (pilot week 20, Phase 1b just live)

EcoSure has been live on software for eight weeks. Three authorised recyclers take pilot material; one ("Recycler R", invented) is in the Sanwer Road industrial area and is owned by a family with close ties to a sitting MLA. About 11 tonnes a month flow through EcoSure. IMC logs its vehicle flow. Suresh has an `spcb_officer` account scoped to "MPPCB Regional Office Indore" (v3 §14.3 G1). Phase 1b has switched on the weekly digest (G5), action-plan export and CM Dashboard feed (G6).

### Week 1 — "Another WhatsApp message"

**Monday 9:40.** Suresh is in the RO before the Joint Director's weekly review. His phone has 212 unread WhatsApp messages: the district collector's group, two NGT counsel, industry associations, three consent applicants chasing files, and the EcoSure digest (G5).

The digest says: 14 open flags, 11.2 t collected, 3 new agents, 1 registration expiring in 45 days. The top items are two "storage deadline at 75%" warnings for kabadi shops, one "attestation missing past SLA", one "weight anomaly" at a drop point, and — sixth — a "mass-balance variance" at Recycler R. He reads the first three lines on the notification preview and does not open it.

*Why:* the top of the list is agent-level housekeeping (storage warnings, missing attestations). These are the operator's and the recycler's problems, not the regulator's. The PRD ranks by "severity × weight × age" (G2) with one list for everyone; it does not separate "operator must fix" from "regulator should know". The one flag that matters to him is sixth.

Earlier in the week he had also received seven individual flag emails, because v3 §16.9 sends "Email + in-app" on every flag opening, *in addition to* the digest. He has created an Outlook rule that moves "EcoSure" emails to a folder. (He uses his NIC email; the rule took 20 seconds.)

**Tuesday–Friday.** Consent renewals (14 pending on XGN, two near the 30-day deemed-approval line), a CIS-allocated inspection of a dyeing unit, a hazardous-waste show-cause reply, preparing a compliance affidavit for an NGT matter on Pithampur groundwater. He does not open EcoSure.

**Time on EcoSure in week 1: about 1 minute** (digest preview).

### Week 2 — The mass-balance flag and the call from above

**Monday.** The digest again. Mass-balance variance at Recycler R is now the top item because it has aged. Details, when he finally taps the link: July mass balance, opening stock 62.0 t, attested input 38.4 t, outputs and residue 29.1 t, closing stock declared 58.1 t, variance 13.2 t (13.2% of throughput), threshold 5% (R6).

He opens EcoSure on his laptop for the first time in two weeks. It asks for a phone OTP (v3 §20.8: "Phone OTP for everyone"). The page loads. He looks for what to do. He can:

- read the flag and its evidence,
- "link to a Central Inspection System record" (G2) — but there is no CIS record, because CIS decides who inspects whom, and this unit's next rotational inspection is not due,
- nothing else. He cannot mark it "under examination", ask the recycler a question, attach a note, or send it up to HQ.

**What the numbers actually mean** (Suresh's own reasoning, and correct): a 13% monthly gap at a recycler can be moisture (July is monsoon; v3 already uses 8% monsoon tolerance for transfers in §16.4, but not for mass balance), a mis-keyed closing stock, output sold but not yet entered, material from non-EcoSure suppliers processed against EcoSure stock, or genuine ghost inflow. Every input to that equation is **entered by the recycler itself**. EcoSure's two-party evidence (§6.3 principle 4) stops at the recycler's gate. Mass balance is the recycler grading its own homework.

**Tuesday.** Recycler R's owner calls the Joint Director, not Suresh. The recycler saw the flag the minute it opened, because v3 §8.3 gives organisations read access to their "own" flags. The call is friendly: "Some software error, sir, the vendor is fixing our stock entry." Recycler R files a corrected closing stock in EcoSure on Wednesday. Mass balance is recomputed; variance falls to 3.9%; the flag auto-resolves (the PRD does not say whether corrected mass balances supersede or append; §19.4 says attestations and weigh records are append-only but is silent on MassBalance).

**Wednesday.** The Joint Director tells Suresh: "Keep an eye on it. No notice without talking to HQ. The pilot is the Minister's project and this recycler is one of its three." Suresh notes it in his own diary, not in EcoSure, because EcoSure has nowhere to put it.

**What a careful officer would want:** a record that he saw the flag on day X, that the recycler corrected its data on day Y, what the correction was, and that the pattern (a large correction right after a flag) is itself visible. EcoSure keeps the audit log (§21.2 item 7) but does not surface "corrected after flag" to the officer.

**Time on EcoSure in week 2: about 25 minutes.** Action taken: none in EcoSure. Informally: asks the CIS nodal officer whether a "complaint-based" inspection can be scheduled (answer: needs a written complaint or HQ direction — **UNVERIFIED**, CIS SOP allows some special inspections but the route for a platform-generated signal is unclear).

### Week 2–3 — The "unbacked certificate" flag

**Thursday of week 2.** New flag, high severity: "Unbacked certificate — Producer P (Mumbai) entered 3 CPCB certificates issued by Recycler Q (Indore) for 120 t; 17.6 t linked to EcoSure attestations; 102.4 t unbacked." (P4, G2.)

Suresh's first reaction is alarm; his second is doubt.

1. **"Unbacked" is the wrong word.** Recycler Q gets most of its material from outside EcoSure (bulk consumers, other states, PROs). EcoSure only sees its pilot inflow. The PRD itself says every number is "formal EcoSure network only" (§6.3 principle 6, §30 item 1) — but the certificate-provenance status says "unbacked", not "not linked to EcoSure inflow". A journalist or an RTI applicant reading "102 t unbacked" will read "102 t fake".
2. **It is not his case.** The certificate was generated on the CPCB portal; revocation is CPCB's power (Rule 4(5), S10); environmental compensation for false certificates is levied under CPCB guidelines (S9). MPPCB can inspect Recycler Q and act on its consent, but the certificate question belongs to CPCB. v3 has no "refer to CPCB" path until the CPCB national view in Phase 2 (G8).
3. **The producer typed the certificate numbers by hand** (P4: "exactly as shown"). One of the three had a digit transposed; that alone accounted for 40 t showing as unlinked. (Invented, but the risk is built in.)

He forwards a screenshot to the HQ e-waste cell by WhatsApp. The flag stays open.

### Week 3 — The RTI

**Monday.** A Hindi RTI application arrives at the MPPCB Indore RO from a local environmental activist: *"Provide a list of all compliance flags raised by the EcoSure system against e-waste recyclers in Indore since launch, and the action taken by MPPCB on each."*

Problems, in the order the RO's clerk discovers them:

1. **Whose information is it?** v3 SP-12 puts the Public Information Officer in the *sponsoring department* (Environment), and v3 §21.3 makes the department the data fiduciary. But the application is addressed to MPPCB, and MPPCB officers "hold" the flags in the RTI sense because they can access them. The clerk does not know whether to transfer under RTI section 6(3) or answer. (Doc 11 already raised this; v3 G10 does not resolve inter-authority handling.)
2. **"Action taken" is blank.** The honest answer is "14 flags seen; action: none recorded" for most of them, because EcoSure has no disposition field and Suresh's reasons live in his diary. The Recycler R flag shows "auto-resolved after data correction" with no officer involvement — which reads badly.
3. **Naming recyclers.** Flags naming Recycler R and Recycler Q may be exempt under section 8(1)(d) (commercial confidence) or not; unverified, not-yet-examined flags naming companies are exactly the kind of record a PIO hesitates over. v3 has no flag disclosure policy.

The RO replies after 28 days with a count by flag type and no names, citing 8(1)(d). A first appeal follows. Suresh spends about **3 hours** across the month on this RTI, more than on everything else in EcoSure combined. Most of it is reconstructing what he did from WhatsApp and his diary.

### Week 3 — The NGT hearing

**Thursday.** The NGT Central Zone Bench (Bhopal) hears a matter on illegal e-waste burning near an Indore scrap cluster (invented, but consistent with NGT S6's direction to "monitor vulnerable locations"). MPPCB's counsel, prepared by HQ, wants to show action. The affidavit cites EcoSure: "formal e-waste collection in Indore rose to 11.2 t a month; 38 informal collectors enrolled as agents of registered recyclers."

The applicant's counsel objects:

- These are printouts from a platform run by a private vendor. Where is the section 63 BSA certificate (S11)? Who is "the person in charge of the computer" — MPPCB, the Environment Department, MPSEDC, or the vendor? v3 has hashes on attestations (R5) and append-only logs (§19.4), but **no certificate generator, no named custodian, no export manifest**.
- The numbers are self-reported by agents and recyclers. The figure says "formal EcoSure network only" (G4); IMC's own estimate is ~2 t a *day* (§2.2, unverified). 11.2 t a month is under 20% of that.

The Bench accepts the figures "as indicative", asks MPPCB for a physical verification report of recyclers and illegal units in the cluster within eight weeks, and observes that "a software dashboard is not a substitute for inspection." Suresh is named for the verification report.

EcoSure data was cited, helped a little (it showed *something* was being done), and carried no weight on the question that mattered.

### Week 4 — The CPCB query and the quarterly report

**Monday.** A CPCB letter, forwarded by HQ, repeats the Section 5 direction (S5): physically verify every e-waste recycler, with GPS-tagged photos, installed machinery, actual capacity vs EPR-portal capacity; report within 30 days. HQ asks each RO for its part.

Suresh opens EcoSure for the second-longest session of the month (about 40 minutes). What helps:

- **Registration check (G3)** gives him the list of pilot recyclers with CPCB registration, validity and consent capacity side by side. Useful for 3 of the roughly 20 e-waste units in his jurisdiction (**UNVERIFIED** count); the other 17 are not on EcoSure.
- **Capacity view (R10)** and attested tonnes per recycler help him prioritise which of the three to visit first.

What does not help: EcoSure has no per-unit pre-inspection brief (doc 27 C6 recommended it; v3 has only a "district inspection pack" in G6), so he prints three screens and staples them. GPS-tagged photos and machinery verification must come from the site; EcoSure stores recycler-uploaded photos but these are not an inspection record.

**Wednesday.** The HQ e-waste cell asks for the quarterly CPCB state e-waste action-plan inputs. **This is the moment EcoSure earns its place.** The G6 export gives formal tonnes, agents formalised, drives held and collection points by ward, bilingual, in the table format. Suresh's clerk adds the non-EcoSure units by hand. What used to take two days takes half a day. Suresh tells the Joint Director this is "the only useful thing in it so far".

**Friday — the boss.** The Joint Director's expectations, in his own words (simulated):

1. "No surprises in the Minister's review." The CM Dashboard tile (G6) shows 11.2 t/month formal collection for Indore. The Principal Secretary has asked why it is so small when IMC collects 2 t a day. Nobody told the Joint Director that the KPI is "formal EcoSure network only" and excludes IMC flow not yet connected. He wants the tile to show "additional tonnes vs baseline" (§24.1), which it does not.
2. "Zero pending." He counts open flags as pending work. 14 open flags on the Board's name, with no way to close them, look like 14 things MPPCB ignored.
3. "Don't create trouble with the pilot recyclers." Unstated but clear.

**Time on EcoSure in the four weeks: about 1 hour 45 minutes in the tool, plus about 3 hours reconstructing actions for the RTI, plus half a day saved on the quarterly report.**

### The CPCB scientist (Phase 2, eight months later)

Dr Meera, Scientist 'D' in CPCB's waste management division, is asked by her Divisional Head to "look at the MP EcoSure national view" before a Ministry meeting.

- **What she sees (G8):** one federated state (MP), one city (Indore), four recyclers, ~40 t a month. National e-waste generation is ~1.7 million t a year (§2.1). EcoSure covers well under 0.1% of it. The aggregates are statistically meaningless nationally.
- **What she finds useful:** the recycler-level comparison of EcoSure inflow against portal filings for the four MP recyclers — but G8 promises "aggregates", not recycler drill-down, and the CPCB portal already holds the filing side. What she actually wants is an **API**: for a CPCB recycler registration number, give me EcoSure's attested inflow, mass balance, and linked certificates, so it can feed the portal's own over-generation checks (S8, **UNVERIFIED** that CPCB runs these). She does not want another login.
- **What worries her:** (1) a state platform labelling CPCB portal certificates "unbacked" creates a parallel judgement on a CPCB instrument; (2) with GST e-invoice linking now reportedly required on the portal (S8), CPCB may see certificate provenance as its own job; (3) "federation" implies CPCB adopts a state-built standard — which needs a CPCB committee and a Ministry decision, not a PRD line.
- **Her note to the Divisional Head:** "Good methodology for custody evidence at the collection end, which the portal does not see. Value to CPCB is as a data source per recycler and a model SOP for agents of recyclers, not as a national dashboard. Recommend a data-sharing MoU and an API, not a login."

---

## 4. What gets used vs ignored

| v3 feature (section) | Used? | Why |
|----------------------|-------|-----|
| G6 quarterly CPCB action-plan export | **Used, valued** | Saves real drafting time on a mandatory report |
| G3 registration check + R10 capacity view | **Used under pressure** | Answers "which units, what capacity" for a CPCB query |
| G5 weekly digest | **Glanced at, rarely opened** | Arrives in a noisy WhatsApp; top items are operator housekeeping |
| G2 flags — agent-level (storage, missing attestation, weight anomaly, seal, payout) | **Ignored** | Operator/recycler problems; officer can't act or dispose |
| G2 flags — recycler-level (mass balance, capacity exceeded, registration expired) | **Read, not acted on in EcoSure** | No disposition, no question-to-recycler, no escalation; politically risky |
| G2 unbacked certificate | **Read, forwarded informally** | Not MPPCB's power; label misleading; no CPCB referral path until Phase 2 |
| §16.9 per-flag emails | **Filtered to a folder** | Duplicate of digest; noise |
| G2 "link to CIS record" | **Barely used** | CIS allocates inspections; a link only exists after an inspection happens |
| G4 15-minute analytics | **Not used by Suresh** | Nobody needs 15-minute freshness for e-waste enforcement; used by HQ for the Minister's review |
| "Flags within 1 minute" (§16.8, §21.4) | **Irrelevant to officer; harmful via recycler view** | Recycler sees own flag instantly and can pre-empt |
| G6 CM Dashboard feed | **Seen by bosses; caused a problem** | Absolute formal tonnes look tiny; "additional vs baseline" not shown |
| G6 district inspection pack | **Not used** | He needs a per-unit brief |
| G10 RTI log | **Painful** | PIO is in another department; "action taken" has no data |
| G8 CPCB national view | **Low value to CPCB as a dashboard** | Tiny coverage; CPCB wants an API per recycler |

---

## 5. Legal weight of EcoSure evidence

Plain-English assessment; not legal advice.

1. **Admissibility.** EcoSure printouts are electronic records. Before the NGT, courts or in a CPCB revocation hearing, they need a section 63 BSA certificate signed by the person in charge of the system and an expert, in the Schedule format, with a hash (S11). v3 does not say who that person is (department, MPSEDC, or vendor) or provide a certificate-ready export. Today, EcoSure evidence is **easily objected to**.
2. **Weight even if admitted.** Almost all recycler-level data (inflow acceptance, output fractions, stock, mass balance) is **self-declared by the regulated entity**. Two-party evidence exists only at hand-offs *into* the recycler (§6.3 principle 4; §16.4). A tribunal will treat recycler-side numbers as the recycler's own admission (useful against it if they show a gap; useless as proof of compliance). Signed attestations with maker-checker (R5) bind the recycler to what it declared — that is genuinely useful in a show-cause.
3. **What it can support.** A show-cause notice, a request for explanation, prioritising a CIS or special inspection, and corroborating physical inspection findings. It cannot, alone, support revocation, environmental compensation or prosecution; those need inspection, sampling, invoices and the CPCB portal record.
4. **What it can hurt.** Open, undisposed flags are records under RTI and discoverable in litigation. "102 t unbacked" on a platform run for the state, if wrong, is a defamation and administrative-law risk for the department, and an embarrassment for the officer whose jurisdiction it sits in.
5. **Honest positioning:** EcoSure is *intelligence and corroboration*, not *proof*. v3 §21.5 says EcoSure "supports EPR compliance evidence"; it should say the same about enforcement evidence and design exports to be section-63-ready.

---

## 6. PRD gaps (with v3 section references)

| # | Gap | v3 reference | Real-life effect |
|---|-----|--------------|------------------|
| GAP-1 | **No flag disposition.** SPCB can only read flags and link a CIS record; no acknowledged / explanation requested / not actionable (with reason) / referred to HQ or CPCB / closed-by-officer states. Doc 27 C3 recommended this; v3 did not adopt it | §14.3 G2; §8.3 ("Compliance flags: R"); §16.8 | Open flags pile up as officer liability; RTI "action taken" is blank; boss counts them as pending |
| GAP-2 | **Recycler sees high-risk flags instantly** ("own" flags), enabling pre-emptive data correction and political calls before the regulator looks | §8.3; §21.4 "flags within 1 minute" | Tip-off; flag "auto-resolves" after correction with no officer involvement |
| GAP-3 | **Corrections after a flag are not surfaced.** Append-only rules cover attestations and weigh records but are silent on MassBalance and stock entries | §19.4; §12.2 R6 | Self-correction erases the signal |
| GAP-4 | **Mass balance rests on recycler self-declaration**, with a flat 5% threshold and no monsoon allowance, no link to independent data (GST e-invoices for outputs, weighbridge slips, electricity use) | §12.2 R6; §19.3 MassBalance; §18.2 "Ghost recycler inflow" | False positives in monsoon; false negatives for a careful fraudster |
| GAP-5 | **"Unbacked" label is misleading.** EcoSure sees only pilot inflow; certificates backed by non-EcoSure material show as "unbacked". Certificate numbers are typed by hand | §13.3 P4; §6.3 principle 6; §30 item 1 | Wrong public signal; defamation risk; MPPCB lacks the power to act on certificates |
| GAP-6 | **No CPCB referral path before Phase 2.** Unbacked-certificate and capacity flags need CPCB, but G8 is Phase 2 and read-only aggregates | §14.3 G8; §25.7 | Forwarded by WhatsApp screenshot |
| GAP-7 | **No evidence export built for tribunals.** No section 63 BSA certificate, named system custodian, hash manifest, or chain-of-custody report | §21.2 item 7; §21.5; §12.2 R5 | NGT treats data as "indicative" |
| GAP-8 | **One flag list for everyone.** Agent housekeeping and regulator-grade signals share a ranking; per-flag emails duplicate the digest | §14.3 G2, G5; §16.9 | Digest ignored; emails filtered |
| GAP-9 | **Digest undefined.** No item cap, no "regulator-only" filter, no Hindi requirement, no "what changed since last week", no acknowledgement from the digest | §14.3 G5 | Low engagement |
| GAP-10 | **CIS integration is after-the-fact only.** "Flag-to-inspection links" but no risk-list export to the CIS scheduler and no rule for how a platform signal triggers a special inspection | §20.7; §14.3 G2 | EcoSure cannot influence who gets inspected |
| GAP-11 | **No per-unit pre-inspection brief.** Only a district pack | §14.3 G6 | Officer prints screens before the CPCB-directed verification |
| GAP-12 | **RTI ownership split.** PIO in the sponsoring department while MPPCB officers hold the same records; no flag disclosure policy (names, unverified flags, 8(1)(d)) | §14.3 G10; SP-12; §21.3 | Confused transfer, weak reply, first appeal |
| GAP-13 | **CM Dashboard shows the wrong KPI.** Feed contents unspecified; absolute formal tonnes invite "why so small?"; additional-vs-baseline and integrity KPIs not mandated for the feed | §14.3 G6; §24.1 | Political embarrassment; pressure on officers |
| GAP-14 | **Officer accounts: phone OTP, no MFA, no RO-seat lifecycle** on transfer | §20.8; §20.4; §14.3 G1 | Weak access for users who see evidence on named firms; orphaned accounts after transfers |
| GAP-15 | **Jurisdiction not modelled.** Pilot is "Indore city only" (§5.6), but pilot recyclers may sit in areas under other ROs (e.g. Pithampur/Dhar); flag routing to the correct RO is not specified | §5.6; §14.3 G1, G5 | Wrong officer gets flags (**UNVERIFIED** where pilot recyclers are) |
| GAP-16 | **No escalation or protection for the officer.** Nothing auto-escalates an unacknowledged critical flag to HQ, so the decision to act against a connected operator rests on one RO | §14.3 G2; §5.1 steering committee | Quiet suppression |
| GAP-17 | **Adoption gate is vague.** "MPPCB confirms flags and digests are useful" (pilot week 12) and "MPPCB uses flags in inspections" (Phase 1b exit) are unmeasurable | §25.3; §25.6 | Can be signed off without real use |
| GAP-18 | **CPCB value misjudged.** G8 as a national dashboard; CPCB wants a per-recycler API and data-sharing MoU | §14.3 G8; §5.7; §20.7 | Low CPCB uptake; turf risk |

---

## 7. Fixes (smallest coherent changes)

| # | Fix | PRD section to change | Addresses |
|---|-----|-----------------------|-----------|
| F1 | **Flag disposition workflow for SPCB.** States: `open` → `acknowledged` → `explanation_requested` (recycler must answer in N working days, answer attached) → `referred` (to HQ, CIS, or CPCB, with reference) → `closed_by_officer` (reason code + note) or `not_actionable` (reason code). Every change is append-only and signed with the officer's seat. Operational records stay read-only; only the flag's disposition is writable. Critical flags need acknowledgement within 5 working days, else auto-escalate to HQ e-waste cell | §14.3 G2; §8.3 (add "W: flag disposition" for SPCB); §19.1 ComplianceFlag + FlagDisposition | GAP-1, GAP-12, GAP-16 |
| F2 | **Split flags into two queues.** "Operations" flags (storage, missing attestation, weight, seal, payout) go to operator and recycler only. "Regulatory" flags (mass-balance variance, capacity exceeded, registration expired, duplicate hash, unbacked/unlinked certificate, repeated agent anomalies) go to SPCB. SPCB sees operations flags only as monthly counts or when they breach an escalation rule | §14.3 G2; §16.9 | GAP-8 |
| F3 | **Regulator-first window for regulatory flags.** Recycler sees a neutral "data query" (not "flag") when the officer requests an explanation, or after 5 working days, whichever is first. Any edit to mass balance, stock or recovery records after a flag opens is appended as a correction and shown on the flag ("corrected after flag: −13.2 t closing stock") | §8.3; §12.2 R6; §19.4 (add MassBalance and stock to append-only list) | GAP-2, GAP-3 |
| F4 | **Rename and harden certificate provenance.** Statuses: "linked to EcoSure inflow: X of Y (Z%)" and "not linked (EcoSure sees only pilot inflow)". Only raise a regulatory flag when certificates from a recycler in a period exceed that recycler's *total* declared inflow or verified capacity, not EcoSure inflow alone. Validate certificate references against portal format; add recycler confirmation of each reference | §13.3 P4; §14.3 G2; §18.2 | GAP-5 |
| F5 | **Stronger mass balance.** Seasonal threshold (e.g. 8% July–Sept) consistent with §16.4; require output evidence where it exists (GST e-invoice numbers for recovered outputs, reportedly now uploaded to the CPCB portal — S8, **UNVERIFIED**); show the variance trend over 3 months, not one month; flag on repeat or large variance | §12.2 R6; §19.3 | GAP-4 |
| F6 | **Section-63-ready evidence export.** One-click "evidence bundle" per flag or recycler: records, hash manifest, audit trail, and a pre-filled BSA Schedule certificate naming the system custodian (recommend MPSEDC as person in charge, with a named technical expert under contract). State in §21.5 that EcoSure is intelligence and corroboration, not proof | §21.2; §21.5; new §14.3 G12; §5.4 (custodian) | GAP-7 |
| F7 | **Tight digest.** Regulatory flags only, max 7 items, Hindi first, "new / changed / waiting on you" sections, one-tap acknowledge from the link; remove per-flag emails for SPCB except critical | §14.3 G5; §16.9 | GAP-8, GAP-9 |
| F8 | **CIS risk-list export and per-unit brief.** Monthly ranked unit list in a format the CIS nodal officer can use for special or risk-based inspection; one-page Hindi/English brief per unit (consent and CPCB registration, capacity vs attested, open regulatory flags with dispositions, last CIS outcome). Confirm CIS route in Stage −1 | §14.3 G6; §20.7; §25.2 | GAP-10, GAP-11 |
| F9 | **CPCB referral in Phase 1b and API in Phase 2.** Officer can refer a flag to CPCB with an evidence bundle (email to the CPCB e-waste division with reference logged). Replace G8 "national view" with a per-recycler data API keyed on CPCB registration number, under a data-sharing MoU; keep a thin dashboard only for the MoU's reviewers | §14.3 G8; §20.7; §25.6–25.7 | GAP-6, GAP-18 |
| F10 | **RTI and disclosure policy for flags.** MPPCB appoints its own PIO for EcoSure records it holds; flags naming firms are disclosed only after disposition, with 8(1)(d) review; proactive monthly publication of flag counts by type and disposition | §14.3 G10; SP-12 | GAP-12 |
| F11 | **Define the CM Dashboard feed.** Mandatory fields: additional tonnes vs baseline, month-on-month formal tonnes, % second-party weighed, recyclers physically verified, flags disposed within SLA. Label on the tile: "Formal EcoSure network; IMC flow connected: x%" | §14.3 G6; §24.1 | GAP-13 |
| F12 | **RO-seat accounts with MFA** (NIC email SSO or TOTP), jurisdiction mapping by unit address to the correct RO, auto-deactivation on transfer | §14.3 G1; §20.4; §20.8 | GAP-14, GAP-15 |
| F13 | **Measurable regulator gates.** Pilot week 12: ≥ 80% of regulatory flags dispositioned within SLA; ≥ 1 quarterly report filed with the export. Phase 1b exit: ≥ 2 inspections (CIS or special) triggered or prioritised by EcoSure evidence, with outcomes recorded | §25.3; §25.6; §24.2 | GAP-17 |

---

## 8. Score

**5.5 / 10** for how well v3 works for regulators in real life.

- **For (+):** read-only regulators; honest "formal network only" labels; quarterly action-plan export (the one clear time-saver); registration and capacity checks; digest instead of dashboard; CIS and CM Dashboard named as integration points; maker-checker, signed attestations that bind recyclers to their declarations; mass balance and certificate provenance as the right ideas.
- **Against (−):** flags cannot be disposed of, so they become officer liability; recycler sees regulatory flags first; mass balance and "unbacked" rest on self-declared or partial data with misleading labels; no tribunal-ready evidence; CIS link is after-the-fact; RTI ownership split; CM Dashboard KPI invites embarrassment; CPCB offered a dashboard when it wants an API.
- **Trajectory:** with F1–F4 and F6–F8 (disposition, split queues, regulator-first window, honest provenance labels, section-63 export, tight digest, per-unit brief and CIS list) I would expect **7–7.5 / 10**. The rest depends on things only the government can confirm: whether CIS accepts platform-generated special inspections, who acts as system custodian, and whether CPCB signs a data-sharing MoU.

---

## 9. Open questions for primary interviews

1. Can a CIS special inspection be triggered by an EcoSure regulatory flag, and who authorises it (RO, HQ, CIS nodal officer)?
2. Which body will sign section 63 BSA certificates for EcoSure records: MPSEDC, the Environment Department, or MPPCB?
3. Where are the likely pilot recyclers located, and which MPPCB RO has jurisdiction over each?
4. Is the CPCB GST e-invoice direction of 7 July 2026 real and in force, and can recyclers share invoice numbers with EcoSure?
5. Will MPPCB name its own PIO for EcoSure records, and what is its position on disclosing unverified flags naming firms?
6. Would CPCB's e-waste division accept a per-recycler API under an MoU, and who in CPCB would own it?
