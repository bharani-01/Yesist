import { http } from '../../lib/http.js';

export const pickupsApi = {
  list: (signal) => http.get('/pickups', { signal }),
  get: (id, signal) => http.get(`/pickups/${id}`, { signal }),
  create: (body) => http.post('/pickups', body),
  cancel: (id, reason) => http.post(`/pickups/${id}/cancel`, { reason }),
  handoverCode: (id) => http.post(`/pickups/${id}/handover-code`),
};
