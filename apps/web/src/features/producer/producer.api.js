import { http } from '../../lib/http.js';

export const producerApi = {
  overview: (signal) => http.get('/producer/overview', { signal }),
  models: (signal) => http.get('/producer/models', { signal }).then((r) => r.models),
  createModel: (body) => http.post('/producer/models', body).then((r) => r.model),
  batches: (signal) => http.get('/producer/batches', { signal }).then((r) => r.batches),
  batch: (id, signal) => http.get(`/producer/batches/${id}`, { signal }).then((r) => r.batch),
  createBatch: (body) => http.post('/producer/batches', body).then((r) => r.batch),
  registerUnits: (id, rows) => http.post(`/producer/batches/${id}/units`, { rows }),
  placeBatch: (id) => http.post(`/producer/batches/${id}/place`).then((r) => r.batch),
  labels: (id, signal) => http.get(`/producer/batches/${id}/labels`, { signal }),
  units: (params, signal) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString();
    return http.get(`/producer/units${qs ? `?${qs}` : ''}`, { signal }).then((r) => r.units);
  },
};

/** Must match UNITS_PER_REQUEST on the API. */
export const UNITS_PER_REQUEST = 2000;

export const STAFF = {
  work: ['owner', 'operator'],
  approve: ['owner', 'approver'],
};

export const BATTERY_LABELS = {
  none: 'No battery', li_ion: 'Lithium-ion', li_polymer: 'Lithium-polymer', nimh: 'NiMH', lead_acid: 'Lead-acid', other: 'Other',
};

export const ROW_ERROR_LABELS = {
  both_identifiers: 'Both an IMEI and a serial were given; use one',
  invalid_imei: 'Not a valid 15-digit IMEI',
  invalid_serial: 'Serial must be 4–40 letters, digits, or dashes',
  duplicate_in_file: 'Repeated earlier in this upload',
  duplicate: 'Already registered',
};

export const INDIAN_STATES = [
  ['AN', 'Andaman and Nicobar Islands'], ['AP', 'Andhra Pradesh'], ['AR', 'Arunachal Pradesh'], ['AS', 'Assam'], ['BR', 'Bihar'],
  ['CH', 'Chandigarh'], ['CG', 'Chhattisgarh'], ['DN', 'Dadra and Nagar Haveli and Daman and Diu'], ['DL', 'Delhi'], ['GA', 'Goa'],
  ['GJ', 'Gujarat'], ['HR', 'Haryana'], ['HP', 'Himachal Pradesh'], ['JK', 'Jammu and Kashmir'], ['JH', 'Jharkhand'],
  ['KA', 'Karnataka'], ['KL', 'Kerala'], ['LA', 'Ladakh'], ['LD', 'Lakshadweep'], ['MP', 'Madhya Pradesh'], ['MH', 'Maharashtra'],
  ['MN', 'Manipur'], ['ML', 'Meghalaya'], ['MZ', 'Mizoram'], ['NL', 'Nagaland'], ['OD', 'Odisha'], ['PY', 'Puducherry'],
  ['PB', 'Punjab'], ['RJ', 'Rajasthan'], ['SK', 'Sikkim'], ['TN', 'Tamil Nadu'], ['TS', 'Telangana'], ['TR', 'Tripura'],
  ['UP', 'Uttar Pradesh'], ['UK', 'Uttarakhand'], ['WB', 'West Bengal'],
];

/** Staff role of the signed-in user in their producer organisation. */
export const producerRole = (user) => user?.orgs?.find((o) => o.type === 'producer')?.orgRole ?? null;

/**
 * Parses an uploaded CSV into registration rows. Accepts a header row naming `imei` and/or
 * `serial`, or a single unlabelled column (15-digit values are treated as IMEIs).
 */
export function parseUnitCsv(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return [];
  const cells = (line) => line.split(',').map((c) => c.trim().replace(/^"(.*)"$/, '$1'));
  const header = cells(lines[0]).map((h) => h.toLowerCase());
  const imeiCol = header.indexOf('imei');
  const serialCol = header.findIndex((h) => h === 'serial' || h === 'serial_no' || h === 'serial number');
  if (imeiCol >= 0 || serialCol >= 0) {
    return lines.slice(1).map((line) => {
      const c = cells(line);
      const row = {};
      if (imeiCol >= 0 && c[imeiCol]) row.imei = c[imeiCol];
      if (serialCol >= 0 && c[serialCol]) row.serial = c[serialCol];
      return row;
    });
  }
  return lines.map((line) => {
    const value = cells(line)[0];
    return /^\d{15}$/.test(value.replace(/\s+/g, '')) ? { imei: value } : { serial: value };
  });
}
