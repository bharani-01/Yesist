# v3 Simulation 14 — Legal vetting: senior counsel's opinion to the Government of Madhya Pradesh

**Simulation:** 14 (v3 real-life simulation series)
**Persona:** Senior counsel for environmental and technology law, briefed by the Environment Department (Government of MP) and MPPCB before the Stage −1 sanction.
**PRD reviewed:** `docs/prd/v3-PRD.md` (v3 consolidated, 2026-09-27), read in full. Focus: §5.2 (agent-of-recycler model under an MPPCB direction), §9 (product passport, hashed IMEIs), §13 (certificate provenance), §17 (escrow), §21 (compliance baseline).
**Prior research relied on:** `docs/research/v2-deep/01-ewaste-rules-2022.md`, `03-intermediary-legality.md`, `04-dpdp.md`, `09-aadhaar-kyc.md`, `11-rti-open-data.md`.
**Date:** 2026-09-27. The PRD was not edited.
**Convention:** Claims backed by a primary or reputable source carry a link. Anything I could not confirm from a primary source in this session is marked **UNVERIFIED**. The three adverse events are simulations; the parties, dates and outcomes in them are invented, and the "likely outcome" is a professional judgement, not a prediction of any real court.
**Not legal advice.** This is a design-stage simulation. Before sanction, the department needs a signed opinion from the Advocate General's office or empanelled counsel.

---

## 1. Short answer

**Score: 5.5 / 10** for how robust v3's legal design would be in real life.

v3 got the big things right. It never issues or trades EPR certificates. It keeps the CPCB portal as the only statutory record. It puts every collector under a registered recycler. It keeps public money on the treasury rail and the operator away from money. It stores device identifiers as keyed hashes. It names a Public Information Officer. On paper, this is a much more lawful programme than v2.

Three things would hurt it in a real courtroom or before a real regulator:

1. **The legal basis for collectors is aimed at the wrong instrument.** The PRD rests the agent model on "an MPPCB direction recognising such agents" (§5.2, §25.2, SP-02). MPPCB's Chairperson does not appear to hold the Section 5 direction power for the E-Waste Rules. The 2001 delegation covers biomedical waste, hazardous chemicals, industrial solid waste and municipal solid waste only. And no direction can create a category of lawful entity that the Central Rules left out. The agent model is actually lawful already, through contract law and the Rules themselves. So the direction should confirm that, not try to create it. As drafted, it is the easiest target in the whole programme.
2. **The "unbacked" certificate label is legally dangerous** (§13.3 P4, §14.3 G2, G8). EcoSure sees only part of a recycler's inflow. A certificate with no matching EcoSure evidence is not evidence of a fake certificate. Put a word like "unbacked" on a producer's statutory instrument, send it to regulators across state lines, and the state has walked into CPCB's exclusive territory with a misleading label and no hearing. That is a writ petition the state would likely lose at the interim stage.
3. **The privacy design is sound in principle but leaks in practice** (§9.3, §9.6, §11.2 S3, §13.3 P3). HMAC hashing is pseudonymisation, not anonymisation. Hashed IMEIs linked to claims and pickups are still personal data. Three concrete leaks follow. Raw IMEIs will sit in collectors' offline queues, because the key cannot live on a kabadiwala's phone. The promised "rotated with re-hashing" is impossible without raw IMEIs. And unit-level producer views let a producer re-identify its own warranty customers.

All three can be fixed on paper before sanction, without new technology. With the fixes in section 7, I would expect about **7.5 / 10**.

---

## 2. Sources

| # | Source | Type | Used for |
|---|--------|------|----------|
| L1 | Environment (Protection) Act 1986, s.3, 5, 6, 23, 25 (text via MoEFCC delegation compilation) — https://cdnbbsr.s3waas.gov.in/s3fcdb3b4550e745d29a64a696047067b7/uploads/2025/02/20250219247533633.pdf | Primary | Section 5 direction power; s.23 delegation; rules under s.6/25 |
| L2 | S.O. 152(E), 10 Feb 1988 — s.5 powers delegated to listed State Governments, **including Madhya Pradesh** — https://cpc.parivesh.nic.in/writereaddata/ENV/Delegation_of_Powers/25.pdf | Primary (Gazette copy) | The MP State Government holds the s.5 power |
| L3 | S.O. 327(E), 10 Apr 2001, as quoted by the Supreme Court in *Electrosteel Steels Ltd v Union of India*, 9 Dec 2021 — https://api.sci.gov.in/supremecourt/2020/20257/20257_2020_8_15_31958_Judgement_09-Dec-2021.pdf | Primary (SC judgment) | s.5 delegated to SPCB **Chairpersons** only for "biomedical waste, hazardous chemicals, industrial solid waste and municipal solid waste including plastic waste". E-waste not listed. Whether a later notification extends it to the E-Waste Rules is **UNVERIFIED**; none was found |
| L4 | *Tamil Nadu Pollution Control Board v Sterlite Industries*, SC, 18 Feb 2019 — https://api.sci.gov.in/supremecourt/2013/17302/17302_2013_Judgement_18-Feb-2019.pdf | Primary | NGT appellate jurisdiction (s.16 NGT Act) covers s.5 EP Act directions and s.33A Water Act directions, not every executive instruction; forum fights are real |
| L5 | PIB note on direction powers (Air Act s.31A, Water Act s.33A, EP Act s.5) — https://www.pib.gov.in/PressReleasePage.aspx?lang=1&PRID=2223753&reg=6 | Primary | SPCB direction powers exist under the Air and Water Acts, tied to those Acts' functions |
| L6 | E-Waste (Management) Rules 2022, G.S.R. 801(E), rules 4, 8, 9(10), 11, 13(1), 13–15, 21, 22, 25, Schedule V — https://indiacode.ecourtsindia.com/rules/371a802d/ ; MPPCB copy — https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf | Primary | Registration categories, collection, storage, EPR certificates, CPCB duties, Steering Committee |
| L7 | MoEFCC rules page (lists First and Second Amendment 2023, Third Amendment 2024, Amendment Rules 2024; uploads dated 27 Apr 2026) — https://moef.gov.in/rules-regulations-3 ; CPCB rules page — https://cpcb.nic.in/rules-6/ | Primary | **No E-Waste amendment notified in 2025 or up to Sep 2026 was found.** Absence is **UNVERIFIED** (I could not search the Gazette exhaustively) |
| L8 | CPCB FAQ under E-Waste Rules 2022 — https://mpcb.gov.in/sites/default/files/Establishment%20of%20MPCB/Seniority%20list/2014/FAQs_for_E_Waste_Management_Rules_2022.pdf | Primary | Only registered producers, recyclers, refurbishers "can collect"; informal-purchase receipts accepted |
| L9 | NGT order, 12 Feb 2026 (CPCB status report; 17 states/UTs lack recyclers; informal handlers; inventorisation), next hearing 21 May 2026 — https://newsable.asianetnews.com/india/ngt-directs-cpcb-on-ewaste-rules-amid-major-compliance-gaps-in-states-articleshow-xgdy7z7 ; https://timesofindia.indiatimes.com/city/delhi/ngt-concern-over-lack-of-e-waste-recycling-plants-/articleshow/128571941.cms | News reporting NGT orders | NGT's current posture: it wants informal handling formalised and SPCBs to act. Outcome of the May 2026 hearing **UNVERIFIED** |
| L10 | DPDP Act 2023, s.2(t) "personal data", s.6, 7, 8, 9, 10, 17, 33, Schedule — https://egazette.gov.in/WriteReadData/2023/248045.pdf | Primary | Personal-data test; State exemptions; penalties up to ₹250 crore (security) and ₹200 crore (breach notice) |
| L11 | Commencement G.S.R. 843(E), 13 Nov 2025 — https://gazettetracker.com/g/CG-DL-E-14112025-267647 ; status of the "12-month" proposal (no amending instrument as of 1 Sep 2026) — https://dpdprules.org/blog/dpdp-18-months-to-12-months-proposal ; MeitY Secretary: no change to timelines — https://www.fortuneindia.com/technology/dpdp-act-implementation-no-extension-as-startups-face-compliance-deadline-says-meity-secretary-s-krishnan/153958 | Primary + news | Main DPDP obligations commence **13 May 2027** (computed date) |
| L12 | DPDP Rules 2025 summaries (Rule 6 safeguards: encryption, obfuscation, masking, virtual tokens; 1-year logs; Rule 7 breach) — https://www.mondaq.com/india/data-protection/1706890/a-closer-look-at-the-dpdp-rules-2025 ; KPMG — https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/11/dpdp-rules-2025-guidance-to-dpdp-act-implementation.pdf | Secondary on primary | The Rules treat masking and tokens as *safeguards* for personal data, not as a way out of the Act |
| L13 | NALSAR Tech Law Forum on *EDPS v SRB* (CJEU 2025) and DPDP — https://techlawforum.nalsar.ac.in/2716-2/ | Academic commentary | Pseudonymised data stays personal for whoever holds the key; may not be personal in the hands of a recipient with no means to re-identify. Indian position untested (**UNVERIFIED** how the Board will rule) |
| L14 | DoT on IMEI: Telecommunications Act 2023 s.42(3); Telecom Cyber Security Rules 2024 (IMEI registration on Device Setu, anti-tampering) — https://eservices.dot.gov.in/cyber-security/ ; PIB 17 Nov 2025 — https://icdr.ceir.gov.in/IVSDATA/NOTICE/Press_Release_IMEI_Registration_Consequences_of_Tampering.pdf | Primary | IMEIs are regulated telecom identifiers; producers already register every IMEI with DoT |
| L15 | Reports of a 2025 amendment creating "Telecom Identifier User Entities" and a Mobile Number Validation platform (surfaced in search synthesis) | **UNVERIFIED** | Whether phone-number-based services like EcoSure fall under it; whether notified |
| L16 | CAG, PMJAY escrow and GFR findings — https://cag.gov.in/uploads/download_audit_report/2023/10_Chapter-VI-064d22bab42d081.64642773.pdf ; IES note on escrow — https://ies.gov.in/arthapedia/concept/escrow-account | Primary / official | Escrows are normal in government schemes; CAG objects when public money sits outside rules or escrow is not monitored |
| L17 | Delhi HC EPR price-band litigation (interim relief to Blue Star, 24 Dec 2025) — https://www.newslaundry.com/2026/01/14/blue-star-gets-temporary-relief-as-delhi-hc-stays-regulators-e-waste-price-declaration ; GreenSutra (pending, no final judgment) — https://greensutra.in/epr-guide/e-waste/ | News / secondary | Large producers already litigate against e-waste regulators and win interim relief |

Constitutional and general law used without links (standard texts): Constitution Art. 14, 19(1)(g), 162, 226, 254, 266, 299, 300; Indian Contract Act 1872 s.182, 226, 238 (agency); Bharatiya Nyaya Sanhita 2023 s.356 (defamation) and its exceptions; Bharatiya Nagarik Suraksha Sanhita 2023 s.94 (production orders); NGT Act 2010 s.14, 16; RTI Act 2005 s.8, 11; IT Act 2000 s.43A, 70B (CERT-In).

---

## 3. The vetting session

*Simulated. Mantralaya, Bhopal, a Tuesday in October 2026. Present: the Principal Secretary (Environment), the MPPCB Member Secretary, the Commissioner of Indore Municipal Corporation (IMC) by video, the MPSEDC project head, a Finance Department deputy secretary, the programme's product lead, and counsel.*

**Principal Secretary:** "The steering committee wants one thing from you. Can we sign the joint order and the MPPCB direction next month without ending up before the NGT in the spring?"

**Counsel:** "You can sign a joint order. I would not sign the MPPCB direction as it is drafted. Let me explain why, and then tell you what I would sign instead."

### 3.1 Can MPPCB legally issue a direction "recognising agents"?

**My opinion: not in the form the PRD assumes, and it does not need to.**

1. **Where MPPCB's direction powers come from.** MPPCB can issue binding directions under s.33A of the Water Act and s.31A of the Air Act, but only to perform its functions under those Acts (L5). Recognising e-waste collection agents is not a water or air function. Under the Environment (Protection) Act, the s.5 power belongs to the Central Government. It was delegated to the MP State Government in 1988 (L2). It was delegated to SPCB Chairpersons in 2001, but only for biomedical waste, hazardous chemicals, industrial solid waste and municipal solid waste (L3). The E-Waste Rules did not exist then, and I found no later notification adding them (**UNVERIFIED**; the MPPCB legal cell must check its delegation file). On this record, an MPPCB Chairperson's s.5 direction on e-waste agents is open to the objection that it was issued without power.
2. **What any direction can and cannot do.** Even a valid s.5 direction must work within the Act and the Rules. The E-Waste Rules 2022 are central rules made under s.6, 8 and 25 of the EP Act (L6). They list exactly who registers: manufacturers, producers, refurbishers, recyclers (rule 4). A state direction that reads as creating a new lawful class ("recognised collection agents") or exempting anyone from registration or consent would be inconsistent with the Rules. It would also trespass on CPCB's role under Schedule V, which is to issue guidelines and SOPs for collection, storage and transport, and on the Steering Committee under rule 25.
3. **Why the agent model is lawful anyway.** A registered recycler "can collect" e-waste from anywhere (CPCB FAQ, L8). Under the Indian Contract Act, what an agent does within its authority is legally the principal's act (s.182, 226, 238). Rule 13(1) expressly lets producers use collection centres and dealers. Rule 9(10) lets recyclers use dismantlers. So a shop that collects intact items in the recycler's name, under a written agency agreement, with the recycler's receipt, is the recycler collecting. **The legality comes from the contract and the Rules. It does not come from a state direction.**
4. **What the direction should become.** Replace the single "MPPCB direction recognising agents" with three instruments:
   - **(a) A State Government order under s.5 of the EP Act (as delegated in 1988), or better, a non-statutory clarification.** It should be *declaratory*: it says that collection points operating as documented agents of a CPCB-registered recycler or producer are part of that entity's collection channel, and that the principal stays liable. It must not say "recognised" or "authorised", and it must not exempt anyone from consent requirements.
   - **(b) Consent endorsement by MPPCB, using powers it clearly has.** Each participating recycler's consent to operate (CTO) or hazardous-waste authorisation lists its collection points and any storage premises, with storage caps. This is the route the 2016 CPCB guidelines used, and the one MPPCB's own website already reflects by listing "collection points" (see prior report 03, F7).
   - **(c) A letter to CPCB** asking it to confirm the model, or to take it to the rule 25 Steering Committee. Silence is not consent, but a letter on file shows the state did not act behind CPCB's back.

**Member Secretary, MPPCB:** "If we only 'clarify', what stops a kabadiwala claiming he is an agent when an inspector finds him stripping boards?"

**Counsel:** "The same thing that stops him today: nothing in our document. The inspector checks the platform, the written agreement and the CTO list. If the kabadiwala is on none of them, he is an unregistered handler and exposed to environmental compensation under rule 22 (see prior report 03, F1). If he is on them and still stripping boards, the recycler answers for it. Your enforcement power comes from the recycler's registration and consent, not from our direction."

### 3.2 Is HMAC hashing pseudonymisation, or does it take IMEIs out of the DPDP Act?

**My opinion: it is pseudonymisation. For the department it is still personal data, and the PRD should say so plainly.**

- The DPDP Act covers "any data about an individual who is identifiable by or in relation to such data" (s.2(t), L10). The department holds the HMAC key, so it can always reproduce the hash from a scanned IMEI. The claims table links units to user accounts (§9.6 rule 2). Pickup items link units to pickup requests, and pickup requests link to people and addresses (§19.2). Identification is not just possible, it is designed in.
- The DPDP Rules list encryption, obfuscation, masking and virtual tokens as security safeguards for personal data (Rule 6, L12). They do not treat them as a way out of the Act.
- IMEIs have a tiny search space. The first 8 digits (the Type Allocation Code) identify the model, and the next 6 are a serial. An unkeyed hash can be reversed by brute force in minutes. HMAC is safe **only while the key is secret**. If the key leaks, every hash is reversible.
- The European *EDPS v SRB* reasoning (L13), that pseudonymised data may not be personal data for a recipient who cannot re-identify it, might help for **aggregate public outputs**. It does not help the department, the operator or the vendor. Indian treatment of that reasoning is untested (**UNVERIFIED**).
- **Practical consequence:** treat passports linked to a claim or a pickup as personal data, with a stated lawful basis, notice, retention and breach duties. Passports of units that were never claimed or collected (producer registry stock) are not about anyone yet. They become personal data when they are sold and claimed.

### 3.3 Is the tripartite escrow lawful for a department?

**My opinion: yes, if the department is a monitor and never the paymaster.**

- Rail A money belongs to the recycler (§17.2). It is not "moneys received by or on behalf of" the state, so Art. 266, the Treasury Code and the GFR-style rules on public money do not apply, **as long as the account is in the recycler's name and the department has no power to direct payments out of it.**
- Risk arises if the tripartite agreement gives the department release or approval powers. Then the department looks like a trustee of private money. It could be liable for wrongful or late releases. And a CAG auditor could argue the money is under government control and outside the budget (L16).
- The agreement is a government contract. It must be executed in the Governor's name by an authorised officer (Art. 299), or it may not bind the state. The Finance Department should concur because of the contingent liability.
- Release instructions come from platform data (accepted weight, dispute status). If the platform's data is wrong, the bank pays the wrong person. The agreement needs a clear rule that the bank acts on the recycler's authenticated instructions, which may be generated by the platform, and that the department is not liable for release errors except for its own wilful default.
- Whether a platform that sends release instructions for many payees needs an RBI payment-aggregator authorisation depends on who "handles the funds". If the bank does and the operator never touches money, it should not. This is **UNVERIFIED** against the current RBI payment-aggregator directions; the bank's compliance team must confirm.
- **Art. 14 point the PRD misses.** Which recyclers get into the escrow scheme, and therefore get the state's collection flow and IMC's material, is state largesse. Admission must follow published, non-discriminatory criteria open to every CPCB-registered recycler that meets them (see event 4 in section 5).

**Finance deputy secretary:** "So we sign as a party with information rights only?"

**Counsel:** "Information rights, a right to be notified of low balance and disputes, and a step-in right to suspend the recycler's participation on the platform. No money rights at all."

### 3.4 Does the "custody attestation" disclaimer hold?

**My opinion: it holds for its main purpose. Nobody can reasonably mistake an attestation for an EPR certificate. It does not protect the state from everything.**

- **What it does well.** The wording (§12.2 R5) is clear, it appears on every attestation, and it matches the Rules: certificates are generated only on the CPCB portal (rules 13–15). Maker-checker approval and a digital signature make the attestation the recycler's own statement, which puts liability for a false attestation on the recycler.
- **Where it is weak:**
  1. **Government branding creates reliance.** The public verification page (§12.2 R8) and the "recycled" WhatsApp message (§10.2 C8) come from a government platform. A citizen or a producer's auditor will read "verified on EcoSure" as state endorsement. A disclaimer cannot exclude liability for the state's own negligence, for example if the platform shows an attestation as valid after the recycler's registration has lapsed.
  2. **Silence on data destruction.** Citizens will read "processed" as "my phone's data was destroyed." The attestation says nothing about data destruction. If a phone surfaces in a grey market with data on it, the citizen's complaint will cite the state's own message.
  3. **Number format.** The PRD does not require the attestation number format to differ from the CPCB certificate format (year + end-product code + recycler code). Prior report 01 recommended an `ECS-CA-` prefix; v3 did not adopt it.
  4. **Evidence packs** (§13.3 P5) carry a separate disclaimer. That one is fine.
- **Fix.** Add two sentences: "EcoSure records the recycler's statement. The Government of Madhya Pradesh does not certify the processing." Add a data line: "Data destruction is not certified by this attestation." Adopt the distinct number prefix, and make the verification page show registration status at the time of issue and today.

### 3.5 Other points raised in the session (brief)

- **IMC is not anyone's agent.** §5.2 makes "every ... drop point" a recycler's agent, and §7.1 lists IMC ward points as drop points. A municipal corporation should not become the commercial agent of a private company. Under Schedule V of the E-Waste Rules and the Solid Waste Management Rules 2026 (prior report 01, S15), IMC has its own role: it channels e-waste to registered recyclers and can host deposition points. Also, e-waste that IMC collects has value. Choosing which recycler gets it is disposal of a public asset and needs a competitive or rotation-based allocation.
- **Informal-worker data promise** (§16.6 step 4, §21.3). "Shared with enforcement only through lawful requests" is accurate. But the police can compel production under BNSS s.94, and the department cannot refuse a valid order. The Hindi notice should say that, rather than sound like a shield.
- **Aadhaar.** v3 fixed the v2 problems: any-of ID and no storage of numbers (§8.5). Two items are still open. Which department registers as an Offline Verification Seeking Entity (OVSE) for QR and XML checks? And does DigiLocker Requester onboarding need NeGD approval (prior report 09)? Neither appears in §29.
- **RTI.** v3 fixed the core error: the PIO decides (§14.3 G10). Still missing: flag status and a right of reply before any flag naming an organisation is released (prior report 11, C5). This matters most for "unbacked" flags (event 3).
- **Legal Metrology.** Scales used to set a price must be verified and stamped under the Legal Metrology Act 2009, not just "calibration certificate on file" (§20.5). Manual photo entry is fine as evidence, but it is not a legal trade weight.

---

## 4. Event simulations

### Event 1 — NGT petition: "the MPPCB direction on agents is ultra vires"

**The trigger (simulated).** March 2027. The pilot is in week 6. An association of Indore scrap traders who were not enrolled, joined by an environmental NGO, file an original application before the NGT Central Zone Bench in Bhopal. They argue:

1. MPPCB had no power to issue the direction. The s.5 delegation to SPCB Chairpersons does not cover e-waste, and the Water and Air Acts do not reach collection agents.
2. The direction creates a class of "recognised agents" that the E-Waste Rules 2022 deliberately abolished when they dropped the 2016 collection-centre category. That makes it inconsistent with central rules.
3. The direction legitimises informal handlers without consent, fire safety or storage norms, a "substantial question relating to environment" under s.14 of the NGT Act.
4. It favours the recyclers who signed MoUs with the department, which is arbitrary under Art. 14.

**What happens next (simulated).** At the first hearing, MPPCB's counsel argues that the direction was an administrative clarification and not a s.5 direction, so no NGT appeal lies under s.16. The bench points out that the direction itself cites s.5 and uses the word "recognised". It issues notice to MPPCB, the State, CPCB and MoEFCC, and asks CPCB whether the model is consistent with the Rules. CPCB replies after six weeks. It says that collection by or on behalf of registered entities is permitted, but that SPCBs cannot create new categories. It says it will consider issuing guidance. Meanwhile, two newspapers report that "NGT questions MP's e-waste agent scheme", and three shops pause collection.

**Likely outcome:**

| Scenario | Probability (judgement) | Result |
|----------|------------------------|--------|
| Direction stays as drafted in the PRD ("MPPCB direction recognising agents") | Direction quashed or read down: **~55–65%** | Pilot pauses for 2–6 months. The agreements survive, because they are lawful contracts, but the political cover is gone. MPPCB is told to route storage premises through consent. NGT may order CPCB to issue national guidance, which is a slow win for the idea |
| Direction redrafted as declaratory, plus CTO endorsement, plus CPCB letter (section 3.1) | Petition dismissed or disposed of with directions: **~70–80%** | NGT likely *adds* conditions, such as fire safety at storage points, battery segregation and inspection reporting. The current NGT line in the national e-waste matter pushes SPCBs to formalise informal handlers (L9), which works in the programme's favour if it is framed correctly |

The biggest risk is not losing on the law. It is the delay and the headline. A six-month freeze in year one would likely trip the §18.3 red tripwire on sponsor decisions and fail the §26.3 volume gate.

### Event 2 — DPDP complaint plus data breach

**The trigger (simulated).** June 2027, after the DPDP Act's main provisions have commenced on 13 May 2027 (L11). A digital-rights volunteer in Indore files a complaint with the Data Protection Board. It says:

1. EcoSure links hashed IMEIs to phone numbers through device claims and pickups.
2. At the door, collectors scan the IMEI of every data-bearing device (§9.5 PP3), including devices whose owner never claimed them, and the notice never mentions IMEI scanning.
3. Citizens cannot withdraw consent for IMEI processing because the passport is "kept anonymous" forever.

Three weeks later, a breach. A field operator's laptop synced with the offline queue of 40 collectors is stolen. Separately, an exposed staging database is found holding a copy of the claims table (phone number, unit ID, last 4 IMEI digits) and the passport table (IMEI hashes). The HMAC key is in the hardware key store and is not exposed. But the laptop's unsynced offline queues contain **raw IMEIs scanned offline**, with pickup IDs and ward names. The field app can only hash after sync, because the key cannot be on a collector's phone. This contradicts §9.3, "Raw IMEI never stored".

**Legal analysis:**

- **Is it personal data?** Yes (section 3.2). The complaint's premise is right.
- **Was consent valid?** It depends on the notice. §21.3 promises a Hindi/English notice, but §9 never says IMEI scanning at the door is a listed purpose, and it does not separate "optional claim" from "mandatory scan at collection". PP3 makes scanning routine and PP2 calls claims optional, which invites the argument that citizens were never told. The fix is not a better consent form. It is choosing a lawful basis: consent to a notice that lists "device identifier to stop duplicate incentives and trace recycling". For scheme-funded incentives, s.7(b) could be a secondary basis if the citizen previously consented (prior report 04, F2).
- **Withdrawal and erasure.** The State is exempt from the erasure duty for its own processing (s.17(4)). But the right to withdraw consent (s.6(4)) still stops *future* processing. Keeping a hash linked to a deleted account does not breach the Act if the link is truly cut (§9.6 rule 4). The complaint fails on this point if the implementation matches the PRD.
- **Breach.** A laptop with raw IMEIs linked to pickups and wards is a personal data breach (s.2(u)). Duties apply: CERT-In within 6 hours; immediate intimation to the Board, then a detailed report within 72 hours; notice to each affected person (Rule 7). The department has a runbook (§21.2 item 10). The question is whether "reasonable security safeguards" existed (s.8(5)). An unencrypted offline queue holding raw identifiers, when the PRD itself promises raw IMEIs are never stored, is hard to defend.
- **Harm.** Moderate. IMEI plus phone number plus ward is not bank data. But IMEIs can be cloned onto stolen handsets, which is an offence under Telecommunications Act 2023 s.42(3) (L14). A leaked valid IMEI list helps cloners. Journalists will make this point.

**Likely outcome (judgement):**

| Issue | Likely finding |
|-------|----------------|
| Hashed IMEIs are personal data | **Yes** (~90%) |
| Processing without valid consent | **Partly upheld** if the notice omits IMEI scanning (~50%); dismissed if the notice itemises it and PP3 scanning is explained at the door |
| Security safeguards failure (offline raw IMEIs) | **Likely upheld** (~60–70%) if the queue was unencrypted |
| Penalty | The Board weighs severity, duration, repetition and mitigation (s.33(2)). A government fiduciary that reported on time and fixed the flaw is most likely to get **directions plus a voluntary undertaking** (s.32), or a low penalty. A large penalty (tens of crores) is unlikely but legally possible, up to ₹250 crore (L10) |
| Collateral | Writ petition seeking suspension of IMEI scanning; RTI requests on the breach; an Assembly question. The operator (a body corporate) may also face contractual claims under its SLA |

If the breach happens **before** 13 May 2027, the DPDP breach duties are not yet in force. CERT-In reporting still applies, and IT Act s.43A applies to the operator as a body corporate. Reputation damage is the same either way.

### Event 3 — A producer attacks the "unbacked" label

**The trigger (simulated).** August 2027, phase 1b. A large appliance producer (simulated as "Brand K") enters 40 CPCB certificate references into EcoSure (§13.3 P4) to build an audit-defence pack. Eleven certificates come back **"unbacked"**. They were generated by a participating Indore recycler from material that recycler also bought outside EcoSure, from a Gujarat PRO and from a bulk consumer in Pune. EcoSure never saw that inflow. Under P4, the flag also goes to MPPCB. Under G8, it reaches CPCB's national view. A weekly digest (G5) sends it to the regional officer. A journalist gets the digest via RTI, and a headline follows: "State platform finds Brand K's e-waste certificates unbacked".

**Brand K's legal options, and how each would go:**

1. **Writ petition under Art. 226 in the MP High Court (Indore Bench).** This is the likely route. Grounds:
   - The state has no power to pronounce on EPR certificates. Generation, validity and revocation belong to CPCB (rules 13–15 and 22(5)).
   - The label is arbitrary and misleading, because EcoSure sees only part of the recycler's inflow (Art. 14).
   - It harms the right to carry on business (Art. 19(1)(g)).
   - There was no notice or hearing, so natural justice was breached.
   - For recyclers in other states, the state is acting outside its territory.

   **Likely outcome: interim relief for Brand K (~60–70%)** if the label is visible beyond Brand K itself, meaning to the SPCB, to CPCB or through RTI. The court will likely say the state may *collect evidence and refer concerns to CPCB* but may not publish a characterisation of a central statutory instrument without a hearing. If the label is private to the producer and uses neutral language, the petition would likely fail (~70% dismissal).
2. **Civil suit for defamation or commercial disparagement** against the department and the operator. Government can be sued for non-sovereign acts (Art. 300), and running a data platform is not sovereign. Defences: truth, qualified privilege (reporting to a regulator acting in its duty) and good faith. "Unbacked" is not literally true, though. What is true is that "EcoSure has no linked evidence". So the truth defence weakens. **Likely outcome:** suits like this take years and rarely end in damages against the state, but an injunction on the wording is plausible. The operator carries real exposure because it has no sovereign cover. Expect operator contracts to demand indemnity.
3. **Criminal defamation** (BNS s.356). Unlikely to be pursued against officials. Exceptions for public conduct and good-faith reports to authorities apply.
4. **Complaint to CPCB and MoEFCC** that MP is running a parallel certificate-audit system. Given the price-band fight already under way in the Delhi High Court (L17), producers have an organised legal front. CPCB could write to MP asking it to stop labelling certificates. That would be a political loss even without a court order.

**The substantive point.** The label fails a basic fairness test on its own terms. "Unbacked" means *no evidence here*, not *evidence of no backing*. A participating recycler may lawfully generate certificates from non-EcoSure inflow. The PRD's own honest-coverage principle ("formal EcoSure network only", §6.3 principle 6) is contradicted by a label that implies full coverage.

---

## 5. One more adverse event the PRD should plan for

**Event 4 (brief) — an excluded recycler or PRO challenges the scheme under Art. 14.** A CPCB-registered recycler in Dewas is not among the MoU recyclers (§25.2, "MoUs: at least 1 recycler"). It watches IMC's e-waste and the state's incentive-backed flow go to competitors. It files a writ arguing that the state is steering a public asset (IMC's collected e-waste) and a public subsidy (the incentive) to chosen private firms without criteria. **Likely outcome:** a court would require published empanelment criteria open to all eligible recyclers, and a fair allocation of IMC's flow. The pilot survives if criteria exist from day one, and is disrupted if they do not. The PRD has no empanelment rule.

---

## 6. PRD gaps (with sections)

| # | Gap | PRD sections | Severity |
|---|-----|--------------|----------|
| 1 | Agent model depends on an "MPPCB direction recognising agents" that MPPCB may lack power to issue for e-waste. The direction reads as constitutive, not declaratory | §5.2, §19.3 (AgentAgreement "MPPCB direction reference"), §18.3 tripwire, §25.2, §29.1 SP-02 | **High** |
| 2 | No consent-endorsement route: collection points and storage premises are not listed in recyclers' CTO or authorisations | §5.2, §8.5, §12.2 R1 | High |
| 3 | No CPCB concurrence step; the model is not taken to CPCB or the rule 25 Steering Committee | §5.7, §25.2, §29.3 | Medium |
| 4 | "Unbacked" label is misleading, since EcoSure sees partial inflow. It is sent to SPCB and CPCB without the recycler's or producer's reply, and has no flag status or hearing | §13.3 P4, §14.3 G2, G5, G8, §16.7, §18.2 | **High** |
| 5 | State characterises central statutory instruments, including for recyclers outside MP, with no line that EcoSure only refers concerns to CPCB | §13.3 P4, §14.3 G8, §21.5 | High |
| 6 | HMAC hashing not acknowledged as pseudonymisation; no statement that linked passports are personal data with a lawful basis | §9.3, §9.6, §21.3 | High |
| 7 | Offline scanning forces raw IMEIs into collector-device queues, contradicting "raw IMEI never stored" | §9.3, §9.5 PP3, §11.2 S3, §20.6 | **High** |
| 8 | "Rotated with re-hashing" is impossible without raw IMEIs. Key rotation as written either keeps raw data or keeps old keys forever | §9.6 rule 1, §21.2 item 4 | Medium |
| 9 | Producer views at unit level with attestation numbers let a producer link units to its own warranty or customer records, which re-identifies citizens | §9.5 PP6, §13.3 P3, §8.4 | High |
| 10 | Notice does not itemise IMEI or serial scanning at collection as a purpose; PP3 routine scanning versus PP2 "optional" claims is unexplained | §9.5 PP2/PP3, §10.2 C1, §21.3 | High |
| 11 | Escrow agreement terms undefined: department's powers, Art. 299 execution, Finance concurrence, liability for release errors, payment-aggregator position | §17.2, §17.4, §29.1 SP-07 | Medium |
| 12 | No empanelment criteria for recyclers; no competitive allocation of IMC's e-waste | §5.3, §7.1, §25.2 | High |
| 13 | IMC and other public bodies treated as a private recycler's "agent" | §5.2, §7.1, §11.2 S7 | Medium |
| 14 | Attestation disclaimer lacks a "state does not certify" line and a data-destruction line; no distinct number format | §12.2 R5, R8, §10.2 C8, §29.1 SP-08 | Medium |
| 15 | No legal-hold, flag status or right of reply before RTI release of organisation flags | §14.3 G10, §8.4 | Medium |
| 16 | Aadhaar OVSE registration owner and DigiLocker Requester approval not in sponsor decisions | §8.5, §20.4, §29 | Low–Medium |
| 17 | Scales for trade weight need Legal Metrology verification, not just calibration | §20.5, §11.2 S3 | Low |
| 18 | Informal-worker data promise overstates protection against BNSS s.94 orders | §16.6, §21.3 | Low |
| 19 | Facts still unverified: no E-Waste amendment after 2024 found; SPCB s.5 delegation file; TIUE rules; RBI payment-aggregator scope | §29.3 | Medium |

---

## 7. Fixes

### 7.1 Legal basis for collectors (fixes gaps 1–3, 12, 13)

1. **Rewrite §5.2 "Decision":** "Every agent is a documented collection agent of a named CPCB-registered recycler or producer under a written agency agreement (Indian Contract Act; E-Waste Rules rules 9(10), 13(1)). The principal is legally the collector and stays liable. A **State Government clarification** (Environment Department; under EP Act s.5 as delegated by S.O. 152(E) if a binding direction is needed) *declares* this position without creating a new category or exempting anyone from consent. MPPCB **endorses each collection point and storage premises in the principal's CTO or authorisation**, with storage caps. The department writes to CPCB seeking confirmation."
2. Replace "MPPCB direction reference" in §19.3 AgentAgreement with `principal_cto_endorsement_ref` and `state_clarification_ref`. Update SP-02 and the §18.3 tripwire to match.
3. **Add a §5.8 "Recycler empanelment":** published criteria (valid CPCB registration and CTO, capacity check, escrow funded, agreement signed). Any eligible recycler can join, on published terms. IMC's collected e-waste is allocated by tender or rotation among empanelled recyclers.
4. **IMC and public bodies** are listed as **deposition points** under Schedule V and the SWM Rules 2026, not as agents. They hand over to empanelled recyclers against a receipt.

### 7.2 Certificate provenance (fixes gaps 4, 5, 15)

5. **Rename the statuses** in §13.3 P4: "linked to EcoSure evidence: full / partial / none", and show *EcoSure-linked quantity ÷ certificate quantity*. Add the line: "'None' means EcoSure holds no evidence for this certificate. It is not a finding that the certificate is invalid."
6. **Keep results private to the producer that entered the certificate.** SPCB sees only **recycler-level** patterns, such as certificates generated compared with attested EcoSure inflow plus the recycler's declared other inflow, and only after the recycler has had **15 working days to explain**.
7. EcoSure **never** labels certificates in CPCB views, digests, open data or the CM Dashboard. Concerns about recyclers outside MP go to CPCB as a referral, with evidence. Add to §21.5: "EcoSure does not assess the validity of EPR certificates. Only CPCB does."
8. Add a **flag lifecycle** (open, explanation received, referred, confirmed, dismissed) with a right of reply. Only confirmed or dismissed flags, with the organisation's response, can be released under RTI.
9. The producer notice (P4) must say what the SPCB can see before a producer enters any certificate.

### 7.3 Product passport privacy (fixes gaps 6–10)

10. **Add to §9.6:** "Keyed hashes are pseudonymised personal data wherever they are linked to a claim, pickup or account. They carry the same lawful basis, notice, retention and breach duties as other personal data."
11. **Offline capture:** the field app **encrypts each scanned identifier with the server's public key** (a sealed box) before it enters the offline queue. Only the server decrypts and hashes it, then discards the raw value. Queues are encrypted at rest, can be wiped remotely, and expire after 7 days.
12. **Key rotation:** replace "rotated with re-hashing" with **versioned keys and wrapping**. The new hash is HMAC with key 2 over the old hash, so rotation needs no raw IMEI. Old keys are destroyed after re-wrapping.
13. **Producer views are aggregate-only:** counts by state, category and month, with small cells suppressed. No unit-level lifecycle state, no ward and month per unit, and no attestation number per unit. The only exception is units the producer registered **and** that were never claimed. Add this to §8.4: "Producer must not be able to link a lifecycle event to an individual unit sold to a consumer."
14. **Notice (§10.2 C1, §21.3):** itemise "device identifier (IMEI or serial) scanned at collection, to stop duplicate incentives and trace recycling". Explain the purpose at the door in Hindi. Let citizens decline the scan; the device is then counted by category and weight, with no per-device incentive.
15. Add a **voluntary DPIA** before phase 1a, with IMEI processing as a named risk, and a note on the Telecom Identifier User Entity rules (**UNVERIFIED**; check with DoT).

### 7.4 Escrow and attestation (fixes gaps 11, 14)

16. **Specify the escrow in §17.2:** the account is in the recycler's name at a scheduled bank. The department has **information, notification and platform-suspension rights only**, no release or approval rights. The bank acts on the recycler's authenticated instructions, which may be generated by the platform. The department is not liable for release errors except its own wilful default. The agreement is executed under Art. 299 with Finance Department concurrence. The bank confirms in writing that no payment-aggregator authorisation is needed for the operator.
17. **Attestation text (§12.2 R5):** add "EcoSure records the recycler's statement; the Government of Madhya Pradesh does not certify processing" and "Data destruction is not certified by this attestation." Use the `ECS-CA-` number prefix. The verification page shows registration status at issue and today.

### 7.5 Housekeeping (fixes gaps 16–19)

18. Add to §29.1: the OVSE registration owner, DigiLocker Requester approval, the Advocate General's opinion on the agent model, and the bank's payment-aggregator confirmation.
19. §20.5: require Legal Metrology verification stamps on scales used for price.
20. §16.6 and §21.3 Hindi notice: "Your data is shared with police or other authorities only when the law requires it."
21. §29.3: add "Confirm MPPCB's s.5 delegation file", "Confirm no E-Waste amendment after G.S.R. 699(E) of 2024" and "Confirm the TIUE rules".

---

## 8. Score

**5.5 / 10** for legal robustness in real life.

| Area | Score | Why |
|------|------:|-----|
| Positioning (no certificates, CPCB portal is truth) | 8 | Clean. The Rules support it directly |
| Collector legal basis (§5.2) | 4 | The right model with the wrong anchor. The direction is the most attackable document in the programme |
| Certificate provenance (§13) | 3.5 | A misleading label, state overreach, no hearing |
| Passport privacy (§9) | 5.5 | Right instincts. Offline raw IMEIs, rotation and producer re-identification are real leaks |
| Money (§17) | 6.5 | Two-rail design is sound; escrow terms undefined; empanelment missing |
| Disclaimer and attestations | 6.5 | Holds for its main purpose; needs two more lines |
| Compliance baseline (§21) | 7 | Comprehensive list; DPDP, CERT-In, RTI mostly handled |

**With the fixes in section 7: about 7.5 / 10.** The remaining risk would be interpretive: how the Data Protection Board treats pseudonymised data and government fiduciaries, whether CPCB endorses the agent model, and whether the Supreme Court changes the RTI personal-information exemption. Those cannot be designed away, only monitored.

**Verdict:** v3 is lawful in substance but anchored on a direction MPPCB probably cannot issue and a certificate label the state cannot defend. Fix those two and close the IMEI leaks, and the programme is defensible before the NGT, the Data Protection Board and the High Court.
