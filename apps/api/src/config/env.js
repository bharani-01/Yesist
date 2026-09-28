function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable ${name}`);
  return value;
}

function secret(name) {
  const value = required(name);
  if (value.length < 32) throw new Error(`${name} must be at least 32 characters`);
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const demoLogin = process.env.DEMO_LOGIN_ENABLED === 'true';
if (demoLogin && nodeEnv === 'production') {
  throw new Error('DEMO_LOGIN_ENABLED must not be set in production');
}

// Firebase Hosting forwards only a cookie named "__session" to Cloud Run.
const sessionCookieName = process.env.SESSION_COOKIE_NAME ?? 'ecosure_session';
if (!/^[A-Za-z0-9_]{1,64}$/.test(sessionCookieName)) {
  throw new Error('SESSION_COOKIE_NAME may contain only letters, digits, and underscores');
}

// Always on in production; a hosted development stage served over HTTPS sets it explicitly.
const secureCookies = nodeEnv === 'production' || process.env.COOKIE_SECURE === 'true';

// "true" trusts one proxy hop; a number trusts that many (Firebase Hosting in front of Cloud Run adds more than one).
function trustProxyHops(value) {
  if (!value || value === 'false') return false;
  if (value === 'true') return 1;
  const hops = Number(value);
  if (!Number.isInteger(hops) || hops < 1 || hops > 5) throw new Error('TRUST_PROXY must be true, false, or 1-5');
  return hops;
}

export const env = Object.freeze({
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required('DATABASE_URL'),
  identifierHmacKey: secret('IDENTIFIER_HMAC_KEY'),
  handoverHmacKey: secret('HANDOVER_HMAC_KEY'),
  // Comma-separated, e.g. both Firebase Hosting domains plus a custom domain.
  webOrigins: Object.freeze((process.env.WEB_ORIGIN ?? 'http://localhost:5173').split(',').map((o) => o.trim()).filter(Boolean)),
  trustProxy: trustProxyHops(process.env.TRUST_PROXY),
  sessionCookieName,
  secureCookies,
  demoLogin,
  demoPassword: demoLogin ? required('PILOT_ACCOUNT_PASSWORD') : null,
});
