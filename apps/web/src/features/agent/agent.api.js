import { http } from '../../lib/http.js';

export const agentApi = {
  openJobs: (signal) => http.get('/agent/jobs/open', { signal }),
  myJobs: (signal) => http.get('/agent/jobs', { signal }),
  job: (id, signal) => http.get(`/agent/jobs/${id}`, { signal }),
  accept: (id, body) => http.post(`/agent/jobs/${id}/accept`, body),
  collect: (id, body) => http.post(`/agent/jobs/${id}/collect`, body),
  lots: (signal) => http.get('/agent/lots', { signal }),
  createLot: (body) => http.post('/agent/lots', body),
  dispatchLot: (id, body) => http.post(`/agent/lots/${id}/dispatch`, body),
};
