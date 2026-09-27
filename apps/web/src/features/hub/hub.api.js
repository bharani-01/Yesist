import { http } from '../../lib/http.js';

export const hubApi = {
  lots: (signal) => http.get('/hub/lots', { signal }).then((r) => r.lots),
  lot: (id, signal) => http.get(`/hub/lots/${id}`, { signal }).then((r) => r.lot),
  receive: (id, body) => http.post(`/hub/lots/${id}/receive`, body),
  shipments: (signal) => http.get('/hub/shipments', { signal }).then((r) => r.shipments),
  shipment: (id, signal) => http.get(`/hub/shipments/${id}`, { signal }).then((r) => r.shipment),
  createShipment: (body) => http.post('/hub/shipments', body),
  addLots: (id, body) => http.post(`/hub/shipments/${id}/lots`, body),
  dispatchShipment: (id, body) => http.post(`/hub/shipments/${id}/dispatch`, body),
};

/** Lots physically at the hub and not yet loaded on a shipment. */
export const loadableLots = (signal) => hubApi.lots(signal).then((lots) => lots.filter((l) => l.stage === 'at_hub' && !l.shipmentId));

export function toggleIn(set, id) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id); else next.add(id);
  return next;
}

const WORK_ROLES = ['owner', 'operator'];

/** True when the signed-in member may receive lots and load or dispatch shipments. */
export function canWorkAtHub(user) {
  return WORK_ROLES.includes(user?.orgs?.find((o) => o.type === 'regional_hub')?.orgRole);
}
