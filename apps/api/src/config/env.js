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

export const env = Object.freeze({
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required('DATABASE_URL'),
  identifierHmacKey: secret('IDENTIFIER_HMAC_KEY'),
  handoverHmacKey: secret('HANDOVER_HMAC_KEY'),
  webOrigin: process.env.WEB_ORIGIN ?? 'http://localhost:5173',
  trustProxy: process.env.TRUST_PROXY === 'true',
  demoLogin,
  demoPassword: demoLogin ? required('PILOT_ACCOUNT_PASSWORD') : null,
});
