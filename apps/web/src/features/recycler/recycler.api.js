import { http } from '../../lib/http.js';

export const recyclerApi = {
  lots: (signal) => http.get('/recycler/lots', { signal }),
  lot: (id, signal) => http.get(`/recycler/lots/${id}`, { signal }),
  receive: (id, body) => http.post(`/recycler/lots/${id}/receive`, body),
  draftAttestation: (lotId, body) => http.post(`/recycler/attestations/lots/${lotId}`, body),
  approveAttestation: (id) => http.post(`/recycler/attestations/${id}/approve`),
};

export const MAKER_ROLES = ['owner', 'operator', 'approver'];
export const CHECKER_ROLES = ['owner', 'approver'];
