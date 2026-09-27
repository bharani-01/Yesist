import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');

/**
 * pg client options for a connection string. When DATABASE_CA_CERT_FILE is set (hosted PostgreSQL such
 * as Supabase, whose certificates chain to a private root), TLS is required and verified against that
 * CA only. Any sslmode in the URL is dropped because pg lets URL parameters override the ssl option.
 */
export function pgConfig(connectionString) {
  const caFile = process.env.DATABASE_CA_CERT_FILE;
  if (!caFile) return { connectionString };
  const url = new URL(connectionString);
  for (const key of ['sslmode', 'sslrootcert', 'sslcert', 'sslkey', 'uselibpqcompat']) url.searchParams.delete(key);
  const ca = readFileSync(isAbsolute(caFile) ? caFile : resolve(repoRoot, caFile), 'utf8');
  return { connectionString: url.toString(), ssl: { ca, rejectUnauthorized: true } };
}
