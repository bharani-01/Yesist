# EcoSure — Product Passport and Lifecycle Tracking

**Scope:** Tracking electronic products from manufacture or import to disposal (problem statement objective 1)  
**Phase:** 1a (legacy registration, citizen claims), 1b (producer registry), 2 (retail and service events)  
**Last updated:** 2026-09-27 (v3)

---

## 1. Summary

Every electronic unit that has a unique identifier gets a product passport: a record of the unit and the events in its life. Producers and importers register models and units when products are placed on the market. Citizens claim devices they own. Devices with no passport, which is most devices in use today, get one when they are collected. The passport then joins the custody chain, so a phone can be followed from factory or port to the recycler that processed it.

Passports record **what happened to a unit**, not who owns it. Ownership and personal data stay separate and minimal.

---

## 2. Identifiers

| Identifier | Used for | Storage |
|------------|----------|---------|
| IMEI | Phones and cellular devices | Keyed hash (HMAC-SHA-256 with a server-held key). Raw IMEI is never stored |
| Manufacturer serial number | Laptops, appliances, other equipment | Keyed hash, scoped to producer and model |
| EcoSure QR | Any unit; printed by producers on packaging or labels, or issued at collection | Random public ID (no personal data), GS1 Digital Link compatible URL |
| Category + weight only | Units with no readable identifier | No unit record; counted in the lot |

Rules:
- The system never displays full IMEIs or serials. Screens show the last 4 characters only.
- Matching works by hashing the identifier entered or scanned and comparing hashes.
- The problem statement assumes unique IDs exist for major categories. Where they do not, EcoSure falls back to category and weight, so the chain still closes.

---

## 3. Lifecycle states

```text
registered → placed_on_market → claimed → handed_over → collected → in_lot → received_at_recycler → processed → materials_recovered
Side states: refurbished (returns to claimed), exported_for_reuse, lost, disputed
```

| State | Recorded by | Evidence |
|-------|-------------|----------|
| `registered` | Producer / importer | Bulk upload or API: model, unit identifiers, manufacture or import date |
| `placed_on_market` | Producer | Sale or dispatch batch (month, state). Feeds EPR placed-on-market data |
| `claimed` | Citizen or bulk consumer | Scan QR or enter IMEI/serial. Optional; never required to book a pickup |
| `handed_over` | Citizen + collector | Handover code entered by the collector |
| `collected` | Shop / drop point / IMC vehicle | Weigh record, photo of the sealed bag |
| `in_lot` | Collection agent | Unit linked to a lot |
| `received_at_recycler` | Recycler | Receiver weigh record, unit scan on arrival (sampled for mixed lots) |
| `processed` | Recycler | Custody attestation |
| `materials_recovered` | Recycler | Material recovery record for the lot |
| `refurbished` | Registered refurbisher | Refurbishment record; unit goes back into use |

Every state change is an append-only event with actor, time, place (ward or site), and evidence reference.

---

## 4. Features

### PP1 Producer model and unit registry — Phase 1b
**Story:** As a producer, I want to register the units I place on the Indian market so I can prove what happened to them at end of life.

**Acceptance criteria**
- Register models: brand, model name, category (Schedule I code), typical weight, battery type, and whether the model stores personal data.
- Upload units in bulk (CSV up to 1 million rows per file, or API) with identifiers and manufacture or import date. Invalid rows are reported, never silently dropped.
- Record placed-on-market batches by month and state.
- Producers see only their own models and units.
- Identifiers are hashed on arrival. Upload files are deleted after processing.

### PP2 Citizen device claim — Phase 1a
**Story:** As a citizen, I want to add my old phone by scanning it so that I can see it was recycled.

**Acceptance criteria**
- Claim by scanning an EcoSure QR, dialling `*#06#` and entering the IMEI, or typing a serial.
- If the unit exists in the registry, the claim links to it. If not, a legacy passport is created.
- A unit can have one active claim. A second claim on the same unit opens a review, and the incentive for that unit is held until resolved.
- Claims are optional. A citizen can book with category and count only.

### PP3 Legacy registration at collection — Phase 1a
**Story:** As a collector, I want to record a device that has no passport, so that it is still tracked.

**Acceptance criteria**
- At collection, the collector can scan the IMEI barcode or type the serial for each data-bearing device. Works offline.
- Brand and model are optional; category and count are required.
- A legacy passport is created with state `collected`.
- A data-bearing device without an identifier is still accepted and counted in the lot.

### PP4 Chain linking — Phase 1a
**Acceptance criteria**
- Each passport links to its pickup item, lot, transfer, attestation, and material recovery record.
- Recyclers scan units on arrival: 100% for phones and laptops in lots under 200 units; a random sample of at least 10% for larger or mixed lots. Missing units open a flag.
- A unit already marked `processed` that appears again in a new pickup opens a duplicate flag, and no incentive is paid for it.

### PP5 Device history for citizens — Phase 1a
**Acceptance criteria**
- A citizen sees the history of devices they claimed or handed over: collected, received, processed, with the attestation number.
- No other party's personal data is shown.

### PP6 Producer lifecycle view — Phase 1b
**Acceptance criteria**
- Counts of the producer's registered units by state, category, and state of India.
- Units collected through EcoSure by month; share with a linked passport.
- No citizen identity is ever shown; only counts and ward-level geography.

### PP7 Retail, service, and refurbishment events — Phase 2
**Acceptance criteria**
- Registered refurbishers record refurbishment and resale, moving a unit back to `claimed` state without an owner.
- Retailers running take-back counters log exchanges as `handed_over`.
- Units exported for reuse are recorded with the permit reference.

### PP8 Open standard — Phase 2
**Acceptance criteria**
- The passport data model and event API are published as an open specification (JSON schema) so other states, CPCB, and producers' systems can exchange records.
- Public API returns only non-personal data: model, category, state, and attestation number.

---

## 5. Privacy and security rules

1. IMEIs and serials are stored only as keyed hashes. The key sits in a hardware-backed key store and is rotated with re-hashing.
2. Passports hold no names, phone numbers, or addresses. Claims link a passport to a user account in a separate table, visible only to the user and, with a logged reason, the operator.
3. Police or telecom requests for unit data follow the lawful data request process in [09-government.md](./09-government.md).
4. Deleting a citizen account removes the claim link but keeps the anonymous passport and custody events.

---

## 6. What this unlocks

| Party | Value |
|-------|-------|
| Producer | Evidence that its own units reached authorized recyclers; take-back programme results; BRSR reporting |
| Recycler | Proof that inbound material is real, unit by unit for high-value devices |
| Regulator | Detect duplicates, ghost inflows, and certificates without physical material behind them |
| Citizen | Proof that their device and data were handled properly |

---

## 7. Out of scope
- Tracking ownership transfers between private owners
- Blocking stolen devices (belongs to the Department of Telecommunications' CEIR system; possible referral link only)
- Real-time location of devices in use
