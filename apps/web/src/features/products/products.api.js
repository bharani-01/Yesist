import { http } from '../../lib/http.js';

export const productsApi = {
  journey: (qr, signal) => http.get(`/public/products/${encodeURIComponent(qr)}`, { signal }).then((r) => r.product),
  myDevices: (signal) => http.get('/devices', { signal }).then((r) => r.devices),
  claim: (qr) => http.post('/devices/claim', { qr }),
  /** Register a product the user entered manually (no EcoSure QR label required). */
  addManual: (payload) => http.post('/devices/manual', payload).then((r) => r.device),
  /** Upload a product photo; returns the public URL string. */
  uploadPhoto: (formData) =>
    http.upload('/devices/photo', formData).then((r) => r.url),
  /** Mark device status (active or recycled) */
  updateStatus: (id, status) => http.patch(`/devices/${encodeURIComponent(id)}/status`, { status }),
};

/** Stages a labelled product moves through, in order. */
export const JOURNEY_STEPS = [
  { key: 'placed_on_market', label: 'On the market' },
  { key: 'collected', label: 'Collected' },
  { key: 'in_lot', label: 'Sealed lot' },
  { key: 'received_at_recycler', label: 'At recycler' },
  { key: 'processed', label: 'Recycled' },
];

export const JOURNEY_EVENT_LABELS = {
  registered: 'Registered by the manufacturer',
  placed_on_market: 'Placed on the market',
  claimed: 'Claimed by its owner',
  collected: 'Collected by an authorised Kabadi Wala',
  in_lot: 'Packed and sealed into dispatch bag/lot',
  at_hub: 'Arrived at a regional hub',
  received_at_recycler: 'Received by an authorised recycler',
  processed: 'Recycled',
  disputed: 'Not found when the lot was checked at the recycler',
};
