# EcoSure — Changes Made During the Build

**Last updated:** 2026-09-27  
**Scope:** decisions taken while implementing the QR product journey that differ from, or sharpen, the v3 PRD.

---

## 1. The hub moves into the build

v3 placed the regional hub in phase 2 ([06](./06-regional-hub.md), change 11 in [18](./18-v3-changes.md)). The build now includes it as an **optional, recycler-owned stop** between the collection agent and the recycler:

- A hub is an organisation of type `regional_hub` that holds an agreement with a recycler as its principal. It is never independent and never works for more than the recycler it has an active agreement with.
- An agent chooses, per lot, to dispatch directly to the recycler or through one of that recycler's hubs. Direct delivery remains the default.
- The hub weighs each sealed lot on arrival against the agent's reading, checks the seal and unit count, and loads lots onto consolidated shipments. A variance outside tolerance raises `hub_weight_variance` against the agent.
- The recycler then weighs against the hub's reading, so a loss is attributed to the leg on which it happened.
- The hub keeps each lot's original storage deadline; a stop at the hub does not extend it.

## 2. Manufacturers and custody partners are kept apart

The PRD describes producers and custody partners in separate chapters but did not say they must never overlap. The build enforces it in the database:

| Rule | Enforcement |
| --- | --- |
| A user belongs to manufacturer organisations or custody organisations (agent, drop point, hub, recycler), never both | Trigger on `organization_members` |
| An organisation's type cannot change after creation | Trigger on `organizations` |
| Only an authorised recycler can be the principal of an agreement; only collection, drop point, and hub organisations can act for it | Trigger on `agent_agreements` |
| Manufacturers read only their own models, batches, and unit states; they never see lots, pickups, hubs, or shipments | Row-level security |
| Hubs never see models, batches, or registration data | Row-level security |

The two sides meet only at the product QR label: custody events move a unit's state, and the manufacturer reads the resulting states of its own units. This supersedes the v3 wording that a collector may be an agent of a producer (change 5 in [18](./18-v3-changes.md)): in the build, custody agreements are with recyclers only, and producers meet their obligations through recyclers' attestations.

## 3. What the QR label shows

The public page `/p/<id>` shows the product, its stage, and dates. It never shows people, wards, addresses, agents, or hubs. Brand and model are visible to the manufacturer, the citizen who claimed the unit, and the recycler that holds it; agents and hubs work from the category only.
