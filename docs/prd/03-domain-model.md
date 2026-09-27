# EcoSure — Domain Model

**Last updated:** 2026-09-27 (v2)  
**System of record:** PostgreSQL, one idempotent `schema.sql`

---

## 1. Entities

| Entity | Purpose |
|--------|---------|
| User | Authenticated person (phone-first) |
| Organization | Shop, hub, recycler, producer, SPCB office, programme operator |
| OrganizationMember | User ↔ organization with org role (`owner`, `operator`, `finance`, `viewer`) |
| StatutoryRegistration | CPCB/SPCB registration or authorization held by an organization |
| Corridor | Pilot geography and its launch-checklist status |
| Location | Site with coordinates, landmark, and service radius |
| Address | Pickup address with society, wing, flat, landmark, and gate details |
| Device | Optional citizen device record |
| PickupRequest | Request to collect e-waste |
| PickupItem | Line item: category, count, optional device link |
| WipeConfirmation | Citizen confirmation that data-bearing devices were wiped |
| CollectionEvent | Append-only custody event |
| Lot | Batch of collected material |
| Trip | One vehicle movement carrying one or more transfers |
| Transfer | Movement of a lot between two organizations inside a trip |
| WeighRecord | Weight reading by one party, with evidence |
| Dispute | Weight, custody, or payment exception |
| OfftakeAgreement | Hub ↔ recycler terms: dwell, tolerance, reject rules, payment days |
| RateCard | Versioned category rates per corridor |
| Settlement / SettlementLine | Payment between two parties for a period |
| ShopAdvance / AdvanceRecovery | Capped advance to a shop and its recovery |
| CitizenIncentive | UPI payout to a citizen for a collected pickup |
| CustodyAttestation | Recycler-issued record that a lot was received and processed |
| AttributionRecord | How a lot's weight is attributed to a producer |
| ComplianceExport | Producer evidence export with its inputs |
| ExportApproval | Approval before an export can be downloaded |
| ComplianceFlag | Rule-based signal (for example, lot past dwell without attestation) |
| InspectionNote | Append-only SPCB note on an organization or flag |
| EducationalContent | Guides and training, per language |
| Notification | WhatsApp / SMS / email record |
| OfflineSyncBatch | Records captured offline and synced later |
| AuditLog | Immutable action log |
| Feedback | Stakeholder feedback |

---

## 2. Relationships

```text
Corridor 1──* Organization 1──* Location
Organization 1──* StatutoryRegistration
User *──* Organization (OrganizationMember)

User 1──* PickupRequest 1──* PickupItem
PickupRequest 1──1 Address
PickupRequest 0..1──1 WipeConfirmation
PickupRequest 1──* CollectionEvent
PickupRequest *──1 Lot

Trip 1──* Transfer *──1 Lot
Transfer 1──* WeighRecord
Transfer 0..*──* Dispute

Organization (hub) *──* Organization (recycler) via OfftakeAgreement
Lot 1──0..1 CustodyAttestation
Lot 1──* AttributionRecord *──1 Organization (producer)

Settlement 1──* SettlementLine *──1 Lot
Organization (shop) 1──* ShopAdvance 1──* AdvanceRecovery
PickupRequest 1──0..1 CitizenIncentive
```

---

## 3. Key field sketches

### User
`id`, `phone` (unique, primary login), `email` (optional), `full_name`, `preferred_language` (`hi`, `en`, plus corridor language), `whatsapp_opt_in`, `whatsapp_opt_in_at`, `status`, timestamps.

### Organization
`id`, `corridor_id`, `name`, `type` (`local_shop` | `regional_hub` | `pro_recycler` | `producer` | `spcb_office` | `programme_operator`), `status` (`applied` | `provisional` | `approved` | `suspended` | `rejected`), `kyc_tier` (`micro` | `standard`), `gstin` (nullable), `upi_vpa`, `bank_ref` (tokenised), `provisional_cap_kg_month`, timestamps, `approved_by`.

- `provisional` organizations may operate up to their cap while documents are reviewed.
- `micro` KYC tier does not require GSTIN.

### StatutoryRegistration
`id`, `organization_id`, `authority` (`CPCB` | `SPCB`), `registration_type`, `registration_number`, `valid_from`, `valid_to`, `authorized_capacity_tpa` (recyclers), `document_ref`, `verified_by`, `verified_at`.

Platform approval is stored separately from statutory registration and is never shown as a statutory authorization.

### Corridor
`id`, `name`, `state`, `languages[]`, `launch_status` (`preparing` | `live` | `paused`), checklist fields (active shops, hubs, offtake agreements, float weeks funded, templates approved).

### Address
`id`, `line`, `society_name`, `wing`, `flat`, `landmark`, `pincode`, `lat`, `lng`, `gate_instructions`, `gate_contact_name`.

Unassigned shops see only locality and pincode. Full address is visible after acceptance.

### PickupRequest
`id`, `requester_user_id`, `requester_org_id`, `corridor_id`, `mode` (`doorstep` | `drop_at_shop` | `society_drive`), `assigned_org_id`, `status`, `preferred_window`, `scheduled_at`, `reschedule_count`, timestamps.

### PickupItem
`id`, `pickup_request_id`, `category`, `count`, `estimated_weight_kg` (optional), `device_id` (optional), `data_bearing` (bool, derived from category).

### WipeConfirmation
`id`, `pickup_request_id`, `confirmed_by_user_id`, `method` (`factory_reset` | `sim_removed` | `storage_removed` | `collector_assisted`), `confirmed_at`. Required before `collected` when any item is data-bearing.

### Trip
`id`, `corridor_id`, `vehicle_number`, `driver_name`, `driver_phone`, `origin_org_id`, `destination_org_id`, `status` (`planned` | `loading` | `in_transit` | `arrived` | `closed`), `departed_at`, `arrived_at`, `freight_cost`, `freight_payer` (`hub` | `shared` | `recycler`), `last_location_note`.

### Transfer
`id`, `trip_id`, `lot_id`, `from_org_id`, `to_org_id`, `status` (`planned` | `in_transit` | `received` | `partially_accepted` | `rejected`), `accepted_weight_kg`, `rejected_weight_kg`, `reject_reason`.

### WeighRecord
`id`, `transfer_id` or `pickup_request_id`, `party` (`sender` | `receiver`), `gross_kg`, `tare_kg`, `net_kg`, `scale_id`, `photo_ref`, `recorded_by`, `recorded_at`, `captured_offline` (bool).

### OfftakeAgreement
`id`, `hub_org_id`, `recycler_org_id`, `max_dwell_days`, `monsoon_max_dwell_days`, `weight_tolerance_pct`, `monsoon_tolerance_pct`, `reject_rules`, `payment_days`, `return_freight_payer`, `valid_from`, `valid_to`, `document_ref`.

### RateCard
`id`, `corridor_id`, `version`, `effective_from`, `category`, `rate_per_kg`, `published_by`. Rate cards are reviewed weekly.

### Settlement
`id`, `payer_org_id`, `payee_org_id`, `period_start`, `period_end`, `cadence` (`weekly`), `gross`, `advance_recovered`, `adjustments`, `net`, `status` (`draft` | `posted` | `paid` | `disputed` | `closed`), `payment_ref`, `posted_at`, `paid_at`.

Undisputed lines are paid even when other lines on the same settlement are disputed.

### ShopAdvance
`id`, `shop_org_id`, `issuer_org_id`, `amount`, `cap_basis` (share of last 4 weeks of received value), `issued_at`, `outstanding`, `status`. Recovered automatically from the next settlements.

### CitizenIncentive
`id`, `pickup_request_id`, `user_id`, `amount`, `funding_source` (`scheme` | `producer_pool`), `upi_ref`, `status` (`pending` | `paid` | `failed` | `reversed`), `idempotency_key` = `incentive:{pickup_id}`.

### CustodyAttestation
`id`, `attestation_number` (unique, public), `lot_id`, `issuer_org_id`, `issuer_registration_id` (must be a valid CPCB authorization), `processed_weight_kg`, `categories`, `issued_at`, `document_ref`, `sha256`, `supersedes_id`, `cpcb_portal_ref` (optional), `disclaimer_version`.

Rules:
- `processed_weight_kg` cannot exceed the accepted weight received for the lot.
- Total attested weight for an issuer cannot exceed its authorized capacity for the period.
- Corrections create a new attestation that supersedes the old one.

### AttributionRecord
`id`, `lot_id`, `producer_org_id`, `method` (`brand_match` | `bulk_declaration` | `take_back_programme` | `manual_review`), `weight_kg`, `confidence` (`high` | `medium` | `low`), `evidence_ref`, `ruleset_version`, `reviewed_by`.

Low-confidence records go to a review queue and are excluded from exports until reviewed.

### ComplianceExport
`id`, `producer_org_id`, `export_type` (`evidence_summary` | `portal_worksheet_cpcb` | `portal_worksheet_spcb`), `state`, `period_start`, `period_end`, `language` (`en` | `hi` | `bilingual`), `template_version`, `ruleset_version`, `params`, `file_ref`, `status`, `generated_by`.

### ExportApproval
`id`, `export_id`, `requested_by`, `approved_by`, `reason`, `decision`, `decided_at`. Downloads require an approved record.

### ComplianceFlag
`id`, `corridor_id`, `flag_type` (`dwell_exceeded` | `attestation_missing` | `weight_anomaly` | `capacity_exceeded` | `registration_expired` | `duplicate_hash`), `subject_type`, `subject_id`, `severity`, `opened_at`, `resolved_at`.

### InspectionNote
`id`, `spcb_org_id`, `subject_type`, `subject_id`, `reference_number`, `note`, `created_by`, `created_at`. Append-only.

### OfflineSyncBatch
`id`, `device_id`, `user_id`, `captured_from`, `captured_to`, `record_count`, `synced_at`, `conflicts` (jsonb).

---

## 4. Integrity rules

1. Custody events, weigh records, attestations, inspection notes, and audit logs are append-only.
2. Money uses `numeric(12,2)`; weight uses `numeric(12,3)`.
3. Unique: `users.phone`, `custody_attestations.attestation_number`, `custody_attestations.sha256`, idempotency keys on incentives and settlements.
4. A lot cannot be transferred to a recycler without an active offtake agreement with the sending hub.
5. An attestation cannot be issued by an organization without a valid, verified CPCB authorization.
6. Offline records keep their capture time. Conflicts are resolved by the receiving party and logged.

---

## 5. Reference data

Seeded idempotently with `ON CONFLICT`:

- E-waste categories aligned to the E-Waste (Management) Rules, 2022 schedule, with a `data_bearing` flag
- Indian states and corridor records
- Pickup, transfer, trip, settlement, and flag status values
- Notification templates per language
- Attestation disclaimer text versions
