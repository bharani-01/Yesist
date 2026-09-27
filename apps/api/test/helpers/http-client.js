/** Minimal cookie-aware JSON client for exercising the API over real HTTP. */
export class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.cookie = null;
  }

  async request(method, path, body) {
    const headers = { Accept: 'application/json' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (this.cookie) headers.Cookie = this.cookie;
    const res = await fetch(`${this.baseUrl}/api/v1${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) this.cookie = setCookie.split(';')[0];
    const text = await res.text();
    return { status: res.status, body: text ? JSON.parse(text) : null };
  }

  get(path) { return this.request('GET', path); }
  post(path, body = {}) { return this.request('POST', path, body); }
}

/** Generates a random IMEI with a valid Luhn check digit. */
export function randomImei() {
  const digits = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10));
  let sum = 0;
  for (let i = 0; i < 14; i += 1) {
    let d = digits[13 - i];
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return digits.join('') + ((10 - (sum % 10)) % 10);
}

export const today = () => new Date().toLocaleDateString('en-CA');
