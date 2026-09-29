const API_BASE = '/api/v1';

export class ApiError extends Error {
  constructor(status, code, message, details, requestId) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }

  /** Maps server validation details ("body.fieldName") to { fieldName: message }. */
  fieldErrors() {
    const out = {};
    for (const d of this.details ?? []) {
      const key = d.path?.split('.').slice(1).join('.');
      if (key && !out[key]) out[key] = d.message;
    }
    return out;
  }
}

const listeners = new Set();
/** Subscribe to session expiry (401 on an authenticated call). */
export function onUnauthorized(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

async function request(method, path, body, { signal, silent401 = false } = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      credentials: 'same-origin',
      headers: body === undefined ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError(0, 'network', 'You appear to be offline. Check your connection and try again.');
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const e = data?.error ?? {};
    const error = new ApiError(res.status, e.code ?? 'unknown', e.message ?? 'Something went wrong.', e.details, e.requestId);
    if (res.status === 401 && !silent401) listeners.forEach((fn) => fn(error));
    throw error;
  }
  return data;
}

export const http = {
  get: (path, opts) => request('GET', path, undefined, opts),
  post: (path, body = {}, opts) => request('POST', path, body, opts),
  /** Multipart upload — body must be a FormData instance. */
  upload: async (path, formData) => {
    let res;
    try {
      res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' }, // no Content-Type: browser adds boundary
        body: formData,
      });
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      throw new ApiError(0, 'network', 'You appear to be offline. Check your connection and try again.');
    }
    if (res.status === 204) return null;
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const e = data?.error ?? {};
      const error = new ApiError(res.status, e.code ?? 'unknown', e.message ?? 'Something went wrong.', e.details, e.requestId);
      if (res.status === 401) listeners.forEach((fn) => fn(error));
      throw error;
    }
    return data;
  },
};
