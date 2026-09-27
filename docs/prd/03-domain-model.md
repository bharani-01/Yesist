# EcoSure — Domain Model

**Last updated:** 2026-09-27 (v3)  
**System of record:** PostgreSQL, one idempotent `schema.sql`

---

## 1. Entities

### Identity and organisations
| Entity | Purpose |
|--------|---------|
| User | Authenticated person (phone-first) |
| Organization | Shop, drop point, hub, recycler, refurbisher, producer, PRO, bulk consumer, ULB, SPCB, CPCB, programme operator |
| OrganizationMember | User ↔ organization with org role (`owner`, `operator`, `finance`, `approver`, `viewer`) |
| StatutoryRegistration | CPCB/SPCB registration held by an organization (EPR registration, consent to operate) |
| AgentAgreement | A shop, drop point, or informal collector acting as documented collection agent of a registered recycler or producer |
| IdentityCheck | Result of an any-of ID check (DigiLocker, Aadhaar offline QR, in-person document, NAMASTE / e-Shram ID). Stores result and method only |
| Corridor | Pilot geography, launch-checklist status, and baseline |
| Location / Address | Sites and pickup addresses |

### Product passport
| Entity | Purpose |
|--------|---------|
| ProductModel | Producer model: brand, category, typical weight, battery type, data-bearing flag |
| ProductUnit | One unit: identifier hash, identifier type, QR public ID, current state, legacy flag |
| PlacedOnMarketBatch | Producer sales or dispatch batch by month and state |
| UnitClaim | Link between a unit and a citizen or bulk consumer (separate table, private) |
| LifecycleEvent | Append-only unit event (state, actor, place, evidence) |

### Collection and custody
| Entity | Purpose |
|--------|---------|
| PickupRequest / PickupItem | Request and line items (category, count, optional unit link) |
| CollectionDrive | Society, office, school, or IMC ward drive |
| HandoverCode | One-time code confirming handover (hashed, expires) |
| WipeConfirmation | Data-wipe confirmation for data-bearing items |
| BatteryCheck | At-pickup battery triage result (intact, swollen or damaged → refused) |
| Lot | Batch of collected material with seal tag number |
| Trip / Transfer | Vehicle movement and lot movement between organizations |
| WeighRecord | Weight reading with scale and evidence |
| Dispute | Weight, custody, or payment exception |
| CustodyAttestation | Recycler record that a lot was received and processed |
| MaterialRecovery | Recycler output per lot or period: recovered fractions and residue |
| MassBalance | Recycler period check: attested input vs output + residue + stock |

### Connected devices (IoT)
| Entity | Purpose |
|--------|---------|
| IoTDevice | Registered scale, vehicle GPS unit, or drop-bin sensor, with owner organization and calibration certificate |
| IoTReading | Signed reading: weight, location, or fill level, with device time and receive time |

### Money
| Entity | Purpose |
|--------|---------|
| RateCard | Recycler-published material prices per category (versioned) |
| EscrowAccount | Recycler or producer-funded bank escrow (reference only; funds held by the bank) |
| Settlement / SettlementLine | Payment for accepted weight between recycler and agent |
| ShopAdvance / AdvanceRecovery | Advance funded from recycler escrow only |
| CitizenIncentive | Scheme or producer top-up for a confirmed handover |
| PayoutBatch | Daily treasury or PFMS batch of incentives |
| Chargeback | Recovery from an agent after proven fraud |

### Compliance and oversight
| Entity | Purpose |
|--------|---------|
| CertificateProvenance | Link between a CPCB portal certificate (entered by the recycler or producer) and EcoSure inflow |
| EvidencePack | Producer audit defence, BRSR, or take-back pack with inputs and versions |
| PackApproval | Maker-checker approval before download |
| TakeBackProgramme | Producer-funded programme with budget and rules |
| ComplianceFlag | Rule-based signal |
| InspectionLink | Reference to an MPPCB Central Inspection System record (no duplicate inspection data) |
| Baseline | Pre-pilot tonnes per channel for additionality |
| DataRequest | RTI or lawful request, with the public information officer's decision |
| ConsentRecord | DPDP consent and notice version per user and purpose |
| BreachIncident | Security or personal data incident with CERT-In and Data Protection Board timelines |

### Platform
EducationalContent, Notification, IVRCall, OfflineSyncBatch, AuditLog, Feedback.

---

## 2. Relationships

```text
Organization (recycler | producer) 1──* AgentAgreement *──1 Organization (shop | drop point | collector)
ProductModel 1──* ProductUnit 1──* LifecycleEvent
ProductUnit 0..1──* UnitClaim *──1 User
Producer 1──* ProductModel, PlacedOnMarketBatch, TakeBackProgramme

User 1──* PickupRequest 1──* PickupItem 0..1──1 ProductUnit
PickupRequest 1──1 HandoverCode
PickupRequest *──1 Lot (via PickupItem)
Lot 1──* Transfer *──1 Trip
Transfer 1──* WeighRecord 0..1──1 IoTReading
Lot 1──0..1 CustodyAttestation 1──0..1 MaterialRecovery
Recycler 1──* MassBalance (per period)
CertificateProvenance *──* CustodyAttestation

PickupRequest 1──0..1 CitizenIncentive *──1 PayoutBatch
Settlement 1──* SettlementLine *──1 Lot
```

---

## 3. Key field sketches

### Organization
`id`, `corridor_id`, `name`, `type` (`local_shop` | `drop_point` | `informal_collector` | `regional_hub` | `pro_recycler` | `refurbisher` | `producer` | `pro` | `bulk_consumer` | `ulb` | `spcb_office` | `cpcb_office` | `programme_operator`), `status` (`applied` | `provisional` | `approved` | `suspended` | `rejected`), `kyc_tier` (`micro` | `standard`), `gstin` (nullable), `payout_ref` (tokenised), `provisional_cap_kg_month`, timestamps.

### AgentAgreement
`id`, `principal_org_id` (recycler or producer with valid CPCB registration), `agent_org_id`, `categories`, `max_storage_days` (≤ 180), `intact_only` (always true), `valid_from`, `valid_to`, `document_ref`, `mppcb_direction_ref`.

An agent cannot collect without an active agreement. The receipt given to a citizen or bulk consumer names the principal.

### ProductUnit
`id`, `model_id` (nullable for legacy), `category`, `identifier_type` (`imei` | `serial` | `qr_only`), `identifier_hash` (unique per type and producer scope), `identifier_last4`, `qr_public_id` (unique), `state`, `is_legacy`, `registered_by_org_id`, `created_at`.

### LifecycleEvent
`id`, `unit_id`, `from_state`, `to_state`, `actor_user_id`, `actor_org_id`, `ward_code`, `evidence_type`, `evidence_ref`, `occurred_at`, `recorded_at`, `captured_offline`. Append-only.

### PickupRequest
`id`, `requester_user_id`, `requester_org_id`, `drive_id`, `corridor_id`, `channel` (`whatsapp` | `web` | `ivr` | `missed_call` | `assisted`), `mode` (`doorstep` | `drop_point` | `drive`), `assigned_org_id`, `status`, `preferred_window`, `scheduled_at`, `reschedule_count`, timestamps.

### HandoverCode
`id`, `pickup_request_id`, `code_hash`, `expires_at`, `used_at`, `attempts`. Four digits, sent to the requester; the collector enters it at handover. Five wrong attempts lock the code and alert the operator.

### BatteryCheck
`id`, `pickup_item_id`, `result` (`no_battery` | `intact_embedded` | `swollen_or_damaged_refused`), `recorded_by`. Refused items get a referral message to Battery Waste Management Rules channels.

### Lot
`id`, `agent_org_id`, `principal_org_id`, `seal_tag_number` (unique), `categories`, `net_kg`, `unit_count`, `opened_at`, `sealed_at`, `storage_deadline` (sealed + agreement max, never over 180 days), `status`.

### WeighRecord
`id`, `transfer_id` or `pickup_request_id`, `party` (`sender` | `receiver`), `gross_kg`, `tare_kg`, `net_kg`, `iot_reading_id` (nullable), `scale_device_id`, `photo_ref`, `recorded_by`, `recorded_at`, `captured_offline`, `entry_method` (`connected_scale` | `manual`).

### IoTDevice / IoTReading
Device: `id`, `org_id`, `type` (`scale` | `vehicle_gps` | `bin_sensor`), `serial`, `public_key`, `calibration_cert_ref`, `calibration_valid_to`, `status`.  
Reading: `id`, `device_id`, `reading_type`, `value` (jsonb), `device_time`, `received_at`, `signature`, `signature_valid`.

Readings from a device with an expired calibration certificate are stored but not used for settlement.

### CustodyAttestation
`id`, `attestation_number` (unique, public), `lot_id`, `issuer_org_id`, `issuer_registration_id`, `processed_weight_kg`, `battery_weight_kg` (reported separately; not counted as e-waste), `categories`, `unit_count`, `issued_at`, `maker_user_id`, `checker_user_id`, `document_ref`, `sha256`, `signature` (issuer's digital signature), `supersedes_id`, `disclaimer_version`.

### MaterialRecovery
`id`, `attestation_id` or `recycler_org_id` + `period`, `fractions` (jsonb: copper, aluminium, iron, plastics, precious-metal-bearing boards, glass, residue, in kg), `hazardous_residue_kg`, `sent_to` (TSDF or downstream recycler references), `recorded_by`.

### MassBalance
`id`, `recycler_org_id`, `period`, `opening_stock_kg`, `attested_input_kg`, `output_kg`, `residue_kg`, `closing_stock_kg`, `variance_pct`, `status`. Variance above 5% opens a flag.

### CertificateProvenance
`id`, `cpcb_certificate_ref`, `certificate_quantity`, `certificate_unit` (as shown on the CPCB portal), `issuing_recycler_org_id`, `holder_producer_org_id`, `linked_attestation_ids`, `linked_input_kg`, `coverage_status` (`fully_backed` | `partially_backed` | `unbacked`), `entered_by`, `entered_at`.

EcoSure never computes certificate quantities. It records what the portal shows and whether EcoSure physical inflow exists behind it.

### CitizenIncentive
`id`, `pickup_request_id`, `user_id`, `amount`, `funding_source` (`scheme` | `producer_programme`), `payout_method` (`upi` | `bank` | `voucher` | `nominee`), `payout_batch_id`, `status` (`eligible` | `batched` | `paid` | `failed` | `held` | `reversed`), `idempotency_key` = `incentive:{pickup_id}`.

Eligible only after a valid handover code and a collector weigh record.

### Settlement
`id`, `payer_org_id` (recycler), `payee_org_id` (agent), `escrow_account_id`, `period_start`, `period_end`, `gross`, `advance_recovered`, `chargebacks`, `net`, `status`, `payment_ref`.

### Baseline
`id`, `corridor_id`, `channel` (`ulb` | `pro` | `recycler_direct` | `other`), `period_start`, `period_end`, `tonnes`, `source`, `agreed_by`.

---

## 4. Integrity rules

1. Lifecycle events, custody events, weigh records, IoT readings, attestations, and audit logs are append-only.
2. Money uses `numeric(12,2)`; weight uses `numeric(12,3)`.
3. Unique: `users.phone`, `product_units.qr_public_id`, identifier hash per scope, `lots.seal_tag_number`, `custody_attestations.attestation_number`, `custody_attestations.sha256`, idempotency keys.
4. No collection without an active agent agreement whose principal holds a valid CPCB registration.
5. A lot cannot exceed its storage deadline without opening a flag; agents cannot add pickups to an expired lot.
6. Attestation requires maker and checker to be different users of the issuing recycler.
7. Processed weight ≤ accepted weight; period total ≤ state-verified capacity; battery weight excluded.
8. A unit already `processed` cannot re-enter a pickup without a duplicate flag.
9. Citizen incentives require a used handover code; caps apply per payee account, per device, and per address.
10. Offline records keep their capture time. Conflicts are resolved by the receiving party and logged.

---

## 5. Reference data

Seeded idempotently with `ON CONFLICT`:

- Schedule I e-waste categories (E-Waste Rules 2022) with `data_bearing` and `battery_expected` flags
- Indian states, districts, and Indore wards
- Lifecycle, pickup, lot, transfer, settlement, payout, and flag status values
- Notification, WhatsApp, and IVR templates per language
- Attestation disclaimer and consent notice versions
