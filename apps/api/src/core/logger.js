// Structured JSON logger. Child loggers carry request-scoped fields such as requestId.

const SECRET_KEYS = /password|token|secret|cookie|authorization|code_hash|handover/i;

function redact(value, depth = 0) {
  if (value instanceof Error) {
    return { message: value.message, code: value.code, stack: value.stack };
  }
  if (!value || typeof value !== 'object' || depth > 4) return value;
  const out = Array.isArray(value) ? [] : {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = SECRET_KEYS.test(k) ? '[redacted]' : redact(v, depth + 1);
  }
  return out;
}

function createLogger(bindings = {}) {
  const write = (level, fields, msg) => {
    if (process.env.NODE_ENV === 'test' && level !== 'error' && !process.env.TEST_LOGS) return;
    const line = JSON.stringify({ level, time: new Date().toISOString(), msg, ...bindings, ...redact(fields) });
    (level === 'error' ? console.error : console.log)(line);
  };
  return {
    info: (fields, msg) => write('info', fields, msg),
    warn: (fields, msg) => write('warn', fields, msg),
    error: (fields, msg) => write('error', fields, msg),
    child: (extra) => createLogger({ ...bindings, ...extra }),
  };
}

export const logger = createLogger({ service: 'ecosure-api' });
