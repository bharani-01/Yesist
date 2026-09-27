# EcoSure

E-waste custody and recovery platform for the Madhya Pradesh programme (Indore pilot). A citizen books a doorstep pickup; a verified collection agent weighs the items and confirms the handover with a one-time code from the citizen; sealed lots travel to an authorised recycler, which records the gate weight and issues a maker-checker custody attestation that anyone can verify. Oversight officers see programme aggregates and compliance flags in real time.

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

Production: `npm run build` then `npm start`; the API serves `apps/web/dist` on the same origin.

### Local test accounts

`npm run onboard:pilot` reads [`apps/api/scripts/pilot-onboarding.example.json`](apps/api/scripts/pilot-onboarding.example.json). All accounts share the password in `PILOT_ACCOUNT_PASSWORD`.

| Email | Workspace |
| --- | --- |
| `citizen@ecosure.test` | Citizen |
| `shop@ecosure.test` | Collection agent (repair shop, wards 1–10) |
| `recycler.maker@ecosure.test` | Recycler operator (drafts attestations) |
| `recycler.checker@ecosure.test` | Recycler approver (issues attestations) |
| `spcb@ecosure.test` | State pollution control board officer (triages flags) |
| `imc@ecosure.test` | Municipal officer (read-only oversight) |

Citizens can also self-register at `/register`.

For local demos, set `DEMO_LOGIN_ENABLED=true` in `.env` and restart the API: the sign-in page then lists these accounts, and picking one fills in the email and password. The account list comes from the same onboarding file, and the API refuses to start if the flag is set with `NODE_ENV=production`.

## Tests

`npm test` provisions an isolated `<database>_test` database (schema plus test accounts), then runs the integration suite against the real API and PostgreSQL: authentication and authorisation, the full custody chain with fraud controls, handover-code lockout, and direct row-level-security checks. Development data is never touched.

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
