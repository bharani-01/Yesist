// Creates the database if needed, applies database/schema.sql (idempotent),
// and enables the least-privilege runtime role with the password from the environment.
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const adminUrl = process.env.DATABASE_ADMIN_URL;
const appPassword = process.env.ECOSURE_APP_DB_PASSWORD;
if (!adminUrl || !appPassword) {
  console.error('DATABASE_ADMIN_URL and ECOSURE_APP_DB_PASSWORD must be set (see .env.example).');
  process.exit(1);
}

const schemaPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../../database/schema.sql');
const target = new URL(adminUrl);
const dbName = decodeURIComponent(target.pathname.slice(1));
if (!/^[a-z_][a-z0-9_]{0,62}$/.test(dbName)) {
  console.error(`Refusing unexpected database name "${dbName}".`);
  process.exit(1);
}

async function ensureDatabase() {
  const maintenance = new URL(adminUrl);
  maintenance.pathname = '/postgres';
  const client = new pg.Client({ connectionString: maintenance.toString() });
  await client.connect();
  try {
    const { rowCount } = await client.query('select 1 from pg_database where datname = $1', [dbName]);
    if (!rowCount) {
      await client.query(`create database ${dbName}`);
      console.log(`Created database ${dbName}`);
    }
  } finally {
    await client.end();
  }
}

async function applySchema() {
  const sql = await readFile(schemaPath, 'utf8');
  const client = new pg.Client({ connectionString: adminUrl });
  await client.connect();
  try {
    await client.query(sql);
    const { rows } = await client.query('select format($1::text, $2::text) as stmt', ['alter role ecosure_app login password %L', appPassword]);
    await client.query(rows[0].stmt);
    await client.query(`grant connect on database ${dbName} to ecosure_app`);
    console.log(`Applied ${schemaPath}`);
  } finally {
    await client.end();
  }
}

try {
  await ensureDatabase();
  await applySchema();
  console.log('Database ready.');
} catch (err) {
  console.error('Database setup failed:', err.message);
  process.exit(1);
}
