# EcoSure — Domain Model

**Last updated:** 2026-09-26  
**System of record (future):** Local PostgreSQL via idempotent `schema.sql`

---

## 1. Entity overview

| Entity | Purpose |
|--------|---------|
| User | Authenticated person |
| Organization | Legal/ops entity (shop, hub, recycler, manufacturer, government) |
| OrganizationMember | User ↔ org membership and org role |
| Location | Physical site with geo coordinates |
| Device | Consumer electronic device registry entry |
| PickupRequest | Request to collect e-waste |
| PickupItem | Line item on a pickup (device and/or category + estimated weight) |
| CollectionEvent | Custody event (accepted, collected, weighed, etc.) |
| MaterialLot | Batched material with measured weight/categories |
| Transfer | Movement of a lot between organizations |
| Settlement | Financial reconciliation between two parties |
| SettlementLine | Line items (lot, weight, rate, amount) |
| EcoPointsAccount | Consumer points balance |
| EcoPointsLedgerEntry | Append-only earn/redeem/adjust entries |
| Certificate | Processing/recycling attestation document |
| ComplianceReport | Generated EPR / CPCB / SPCB oriented report |
| EducationalContent | Tips, guides, training materials |
| Notification | Outbound notification record (WhatsApp/email) |
| AuditLog | Immutable action log |
| Feedback | Stakeholder feedback to platform |

---

## 2. Core relationships

```text
User 1──* OrganizationMember *──1 Organization 1──* Location

User (consumer) 1──* Device
User / Organization 1──* PickupRequest 1──* PickupItem
PickupRequest 1──* CollectionEvent
PickupRequest *──* MaterialLot (via collection aggregation)

MaterialLot 1──* Transfer
MaterialLot 1──* Certificate
Organization 1──* Settlement (as payer or payee)
Settlement 1──* SettlementLine → MaterialLot

User (consumer) 1──1 EcoPointsAccount 1──* EcoPointsLedgerEntry
Organization / Professional Recycler 1──* ComplianceReport
Platform 1──* EducationalContent
```

---

## 3. Entity field sketches

### 3.1 User
- `id`, `email`, `phone`, `password_hash`, `full_name`, `role`, `status` (`active`|`suspended`), `whatsapp_opt_in`, `created_at`, `updated_at`

### 3.2 Organization
- `id`, `name`, `type` (`local_shop`|`regional_hub`|`pro_recycler`|`manufacturer`|`government`)
- `status` (`pending`|`approved`|`rejected`|`suspended`)
- `gstin`, `registration_docs` (refs), `description`, `capabilities` (jsonb)
- `created_at`, `updated_at`, `approved_at`, `approved_by`

### 3.3 Location
- `id`, `organization_id` (nullable for consumer home address on pickup)
- `label`, `address_line`, `city`, `state`, `pincode`, `geo` (lat/lng), `service_radius_km`

### 3.4 Device
- `id`, `owner_user_id`, `category` (phone, laptop, TV, battery, other)
- `brand`, `model`, `serial_last4` (optional), `purchase_year` (optional)
- `status` (`in_use`|`idle`|`ready_to_dispose`|`scheduled`|`collected`|`recycled`)
- `notes`, `created_at`, `updated_at`

### 3.5 PickupRequest
- `id`, `requester_user_id`, `requester_org_id` (nullable)
- `assigned_org_id` (collecting shop/hub/recycler)
- `pickup_location_id` / address snapshot
- `status` (see workflows)
- `scheduled_at`, `preferred_window`, `notes`
- `created_at`, `updated_at`

### 3.6 PickupItem
- `id`, `pickup_request_id`, `device_id` (nullable), `category`, `estimated_weight_kg`, `condition`

### 3.7 CollectionEvent
- `id`, `pickup_request_id`, `actor_user_id`, `actor_org_id`
- `event_type`, `payload` (jsonb), `occurred_at`
- Append-only

### 3.8 MaterialLot
- `id`, `origin_org_id`, `current_holder_org_id`
- `source_pickup_ids` (array or join table)
- `categories` (jsonb breakdown), `gross_weight_kg`, `net_weight_kg`
- `status` (`open`|`in_transit`|`received`|`processed`|`closed`)
- `created_at`, `updated_at`

### 3.9 Transfer
- `id`, `material_lot_id`, `from_org_id`, `to_org_id`
- `status` (`initiated`|`in_transit`|`received`|`rejected`)
- `manifest` (jsonb), `initiated_at`, `received_at`

### 3.10 Settlement
- `id`, `payer_org_id`, `payee_org_id`, `period_start`, `period_end`
- `currency` (`INR`), `gross_amount`, `adjustments`, `net_amount`
- `status` (`draft`|`posted`|`paid`|`disputed`|`closed`)
- `posted_at`, `paid_at`

### 3.11 EcoPointsAccount / Ledger
- Account: `user_id`, `balance`, `updated_at`
- Ledger: `id`, `account_id`, `entry_type` (`earn`|`redeem`|`adjust`|`expire`|`clawback`)
- `points`, `balance_after`, `reference_type`, `reference_id`, `idempotency_key`, `created_at`
- Append-only; balance derived and cached

### 3.12 Certificate
- `id`, `material_lot_id`, `issuer_org_id`, `certificate_number` (unique)
- `issued_at`, `document_uri`, `hash`, `metadata` (jsonb)
- Immutable after issue (corrections via new certificate + link)

### 3.13 ComplianceReport
- `id`, `owner_org_id`, `report_type` (`epr_summary`|`cpcb_export`|`spcb_export`|`custom`)
- `period_start`, `period_end`, `generated_at`, `generated_by`, `file_uri`, `params` (jsonb)

### 3.14 EducationalContent
- `id`, `title`, `body`, `audience_roles[]`, `locale`, `status` (`draft`|`published`), `published_at`

### 3.15 Notification
- `id`, `user_id`, `channel` (`whatsapp`|`email`|`in_app`)
- `template_key`, `payload`, `status` (`queued`|`sent`|`failed`), `provider_ref`, `created_at`

### 3.16 AuditLog
- `id`, `actor_user_id`, `action`, `entity_type`, `entity_id`, `before`, `after`, `ip`, `created_at`

---

## 4. Chain of custody

Every possession change must create a `CollectionEvent` and/or `Transfer` update so that:

`Consumer → Local Shop → Regional Hub → Professional Recycler → Certificate`

can be reconstructed for any lot.

---

## 5. Indexes and integrity (implementation notes)

- Unique: `users.email`, `certificates.certificate_number`, `eco_points_ledger.idempotency_key`
- FK cascades: soft-delete preferred for users/orgs; hard delete only anonymized
- Geo: GiST/PostGIS optional; Phase 1 may use lat/lng + Haversine
- Monetary amounts: `numeric(12,2)`; weights: `numeric(12,3)`

---

## 6. Reference data

- Device categories
- E-waste material categories / rate card keys
- Indian states for SPCB scoping
- Pickup status enum
- Notification templates

Seeded via idempotent `ON CONFLICT` patterns in `schema.sql` when implementation starts.
