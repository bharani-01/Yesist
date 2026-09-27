// Runs the integration suite against an isolated `<database>_test` database so test
// records never mix with development data. Schema and test onboarding are applied first.
import { spawnSync } from 'node:child_process';

function toTestUrl(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`${name} must be set (see .env.example).`);
    process.exit(1);
  }
  const url = new URL(value);
  const db = decodeURIComponent(url.pathname.slice(1));
  url.pathname = `/${db.endsWith('_test') ? db : `${db}_test`}`;
  return url.toString();
}

const env = {
  ...process.env,
  NODE_ENV: 'test',
  DATABASE_URL: toTestUrl('DATABASE_URL'),
  DATABASE_ADMIN_URL: toTestUrl('DATABASE_ADMIN_URL'),
};

function run(args) {
  const result = spawnSync(process.execPath, args, { env, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(['scripts/db-setup.js']);
run(['scripts/onboard-pilot.js']);
run(['--test', '--test-concurrency=1', 'test/**/*.test.js']);
