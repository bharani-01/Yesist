import { http } from '../../lib/http.js';

export const oversightApi = {
  overview: (signal) => http.get('/oversight/overview', { signal }),
  flags: (status, signal) => http.get(`/oversight/flags?status=${encodeURIComponent(status)}`, { signal }),
  updateFlag: (id, body) => http.post(`/oversight/flags/${id}/status`, body),
  streamUrl: '/api/v1/oversight/stream',
};

export const FLAG_UPDATE_ROLES = ['spcb_officer', 'cpcb_officer', 'programme_operator'];
