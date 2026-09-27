# EcoSure

E-waste custody and recovery platform for the Madhya Pradesh programme (Indore pilot). A citizen books a doorstep pickup; a verified collection agent weighs the items and confirms the handover with a one-time code from the citizen; sealed lots travel to an authorised recycler, which records the gate weight and issues a maker-checker custody attestation that anyone can verify. Oversight officers see programme aggregates and compliance flags in real time.

Manufacturers (producers) only register data: product models, placed-on-market batches, and the individual units in each batch. Every unit gets a QR label (`/p/<id>`) that follows it through collection to the recycler; the manufacturer sees end-of-life outcomes for its own units but never touches pickups, lots, or custody partners.

The QR label is the only link between the manufacturer's registry and the custody chain:

- Anyone can scan a label and open `/p/<id>`, which shows the product, its stage, and dates. It never shows who handled the product, where it was, or who owns it.
- A signed-in citizen can claim a device that is on the market and follow it under **My devices**.
- The collection agent scans labels at the door. Unknown labels and labels from the wrong category are rejected, and a label already in the custody chain is flagged for review.
- The recycler can scan labels when a lot arrives. Every labelled unit not scanned before the receipt is recorded is marked missing and raises a high-severity flag for the regulator. Only units that were actually received count as recycled when the attestation is issued.

A collection agent can send a sealed lot straight to the recycler or through one of the recycler's own regional hubs. The hub weighs each lot on arrival against the agent's reading (a variance outside tolerance raises a `hub_weight_variance` flag against the agent), keeps the seal intact, and loads lots onto consolidated shipments. The recycler then weighs each lot against the hub's reading, so any loss is attributed to the leg where it happened. Hubs never see manufacturer data, and manufacturers never see lots, hubs, or shipments.

Product context lives in [`docs/prd`](docs/prd/README.md) and the field simulations in [`docs/research`](docs/research).

## Stack

| Layer | Technology |
| --- | --- |
| Database | PostgreSQL (tested on 18), single idempotent [`database/schema.sql`](database/schema.sql) with forced row-level security |
| API | Node.js 22+, Express 5, `pg`, Zod ([`apps/api`](apps/api)) |
| Web | React 19, React Router 7, Vite 7 ([`apps/web`](apps/web)) |

## Getting started

1. Copy `.env.example` to `.env` and fill in every value. Secrets must be at least 32 random characters; never commit `.env`.
2. Install dependencies: `npm install`
3. Create the database, apply the schema, and enable the least-privilege runtime role: `npm run db:setup`
4. Create the local test organisations and accounts (clearly marked local-only): `npm run onboard:pilot`
5. Run the API and the web client in two terminals:
   - `npm run dev:api` (http://localhost:4000)
   - `npm run dev:web` (http://localhost:5173, proxies `/api` to the API)

Production on a single server: `npm run build` then `npm start`; the API serves `apps/web/dist` on the same origin.

### Deploying to Firebase App Hosting

The live deployment is App Hosting backend `yesist-12` in project `eco-sure-537d9` (region `asia-southeast1`): https://yesist-12--eco-sure-537d9.asia-southeast1.hosted.app. App Hosting builds the repository with `npm run build` and runs `npm start`, so the API serves the web client on one origin. [`apphosting.yaml`](apphosting.yaml) sets the production configuration; the database is Supabase PostgreSQL.

1. **Database.** Keep the Supabase connection details in a git-ignored `.env.supabase`: `DATABASE_ADMIN_URL` (the `postgres` user), `DATABASE_URL` (the `ecosure_app` role through the session pooler), `ECOSURE_APP_DB_PASSWORD`, and `DATABASE_CA_CERT_FILE=database/certs/supabase-root-ca.crt`. Apply the schema with `node --env-file=.env.supabase apps/api/scripts/db-setup.js`. The schema revokes Supabase's `anon` and `authenticated` roles from every table, because EcoSure never uses Supabase's REST API.
2. **Secrets.** Create the three secrets that `apphosting.yaml` references and give the backend access to them. Use the values from `.env.supabase`:
   ```
   firebase apphosting:secrets:set ecosure-database-url --project eco-sure-537d9
   firebase apphosting:secrets:set ecosure-identifier-hmac --project eco-sure-537d9
   firebase apphosting:secrets:set ecosure-handover-hmac --project eco-sure-537d9
   firebase apphosting:secrets:grantaccess ecosure-database-url,ecosure-identifier-hmac,ecosure-handover-hmac --backend yesist-12 --project eco-sure-537d9
   ```
   `DATABASE_URL` must use the Supabase **session pooler** (`aws-0-ap-southeast-1.pooler.supabase.com`, user `ecosure_app.<project-ref>`): the direct `db.<ref>.supabase.co` address is IPv6-only and unreachable from App Hosting, and transaction mode would break the live flag listener.
3. **Roll out from GitHub.** Trigger rollouts from the connected repository. It never contains `.env`, so local development settings (a `localhost` database, demo login) cannot reach production. `apphosting.yaml` also sets `DEMO_LOGIN_ENABLED=false` and `NODE_ENV=production` explicitly, and the API refuses demo login in production.

Never run `onboard:pilot` against the hosted database; its accounts are for local testing only.

[`firebase.json`](firebase.json) and the [`Dockerfile`](Dockerfile) support the alternative setup: classic Firebase Hosting for the web client, with `/api/**` rewritten to a Cloud Run service `ecosure-api`. There, set `SESSION_COOKIE_NAME=__session`, because Hosting forwards no other cookie to Cloud Run.

### Local test accounts

`npm run onboard:pilot` reads [`apps/api/scripts/pilot-onboarding.example.json`](apps/api/scripts/pilot-onboarding.example.json). All accounts share the password in `PILOT_ACCOUNT_PASSWORD`.

| Email | Workspace |
| --- | --- |
| `citizen@ecosure.test` | Citizen |
| `shop@ecosure.test` | Collection agent (repair shop, wards 1â€“10) |
| `recycler.maker@ecosure.test` | Recycler operator (drafts attestations) |
| `recycler.checker@ecosure.test` | Recycler approver (issues attestations) |
| `hub@ecosure.test` | Regional hub supervisor (records arrivals, ships to the recycler) |
| `producer.owner@ecosure.test` | Manufacturer owner (registers models, batches, and units) |
| `producer.approver@ecosure.test` | Manufacturer approver (places batches on the market) |
| `spcb@ecosure.test` | State pollution control board officer (triages flags) |
| `imc@ecosure.test` | Municipal officer (read-only oversight) |

Citizens can also self-register at `/register`.

For local demos, set `DEMO_LOGIN_ENABLED=true` in `.env` and restart the API: the sign-in page then lists these accounts, and picking one fills in the email and password. The account list comes from the same onboarding file, and the API refuses to start if the flag is set with `NODE_ENV=production`.

## Tests

`npm test` provisions an isolated `<database>_test` database (schema plus test accounts), then runs the integration suite against the real API and PostgreSQL: authentication and authorisation, the full custody chain with fraud controls, handover-code lockout, the manufacturer registry (per-row upload outcomes, maker-checker placing, workspace isolation), the QR product journey (public page, claims, collection by QR, gate scan with missing-unit flags), the regional hub leg (routing, arrival weighing, shipments, and isolation from the registry), and direct row-level-security checks. Development data is never touched.

## Architecture

```
apps/api/src
  config/        environment validation and domain constants
  core/          database pool and transactions, errors, logger, password and HMAC helpers
  middleware/    request context, logging, authentication, authorisation, validation,
                 rate limits, origin guard, no-store, error handler
  modules/<name> routes -> controller -> service -> repository, plus Zod schemas
  realtime/      PostgreSQL LISTEN/NOTIFY -> server-sent events for compliance flags
  jobs/          storage-deadline scan
apps/web/src
  app/           router and root
  components/    UI primitives, layout, loading/empty/error states
  features/<name> pages, feature components, and API clients per workspace
  lib/ hooks/ styles/
database/schema.sql
```

Security properties the code relies on:

- Every request runs inside a transaction that sets `app.user_id`; the runtime role `ecosure_app` is not the table owner and row-level security is forced, so the database enforces access even if an API check is missed.
- Sessions are httpOnly, `SameSite=Strict` cookies; only a SHA-256 of the token is stored. Passwords use scrypt.
- State-changing requests must come from an allowed origin and carry JSON.
- IMEI and serial numbers are stored as keyed HMACs; only the last four digits are ever shown.
- Custody events, weigh records, and the audit log are append-only; the runtime role has no `DELETE` grant.
- Attestations require a different approver from the drafter, and public verification returns non-personal fields only.
- The public product page reads through a single security-definer function that returns stages and dates only. Claims are written only through `app.claim_unit()`, and each citizen can see only their own claims.
