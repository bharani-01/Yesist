// Single source of truth for status labels and semantic tones across the UI.

export const PICKUP_STATUS = {
  requested: { label: 'Requested', tone: 'info' },
  scheduled: { label: 'Scheduled', tone: 'info' },
  collected: { label: 'Collected', tone: 'info' },
  in_lot: { label: 'On the way to recycler', tone: 'info' },
  received: { label: 'At recycler', tone: 'info' },
  closed: { label: 'Recycled', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'neutral' },
  refused_item: { label: 'Refused', tone: 'warning' },
};

export const LOT_STATUS = {
  sealed: { label: 'Sealed', tone: 'info' },
  in_transit: { label: 'In transit', tone: 'info' },
  received: { label: 'Received', tone: 'info' },
  disputed: { label: 'Disputed', tone: 'danger' },
  attested: { label: 'Attested', tone: 'success' },
};

export const INCENTIVE_STATUS = {
  eligible: { label: 'Due in next treasury batch', tone: 'info' },
  batched: { label: 'In treasury batch', tone: 'info' },
  paid: { label: 'Paid', tone: 'success' },
  failed: { label: 'Payment failed', tone: 'danger' },
  held: { label: 'On hold for review', tone: 'warning' },
  reversed: { label: 'Reversed', tone: 'danger' },
};

export const FLAG_STATUS = {
  open: { label: 'Open', tone: 'danger' },
  under_review: { label: 'Under review', tone: 'warning' },
  escalated: { label: 'Escalated', tone: 'danger' },
  closed: { label: 'Closed', tone: 'neutral' },
};

export const FLAG_SEVERITY = {
  high: { label: 'High', tone: 'danger' },
  medium: { label: 'Medium', tone: 'warning' },
  low: { label: 'Low', tone: 'info' },
};

export const FLAG_TYPE_LABELS = {
  weight_variance: 'Weight variance',
  seal_broken: 'Broken seal',
  unit_count_leakage: 'Unit count leakage',
  duplicate_device: 'Duplicate device',
  storage_deadline: 'Storage deadline',
  incentive_cap: 'Incentive cap',
};

export const UNIT_STATE = {
  registered: { label: 'Registered', tone: 'neutral' },
  placed_on_market: { label: 'On the market', tone: 'neutral' },
  claimed: { label: 'Claimed by owner', tone: 'info' },
  collected: { label: 'Collected', tone: 'info' },
  in_lot: { label: 'In a sealed lot', tone: 'info' },
  at_hub: { label: 'At a hub', tone: 'info' },
  received_at_recycler: { label: 'At recycler', tone: 'info' },
  processed: { label: 'Recycled', tone: 'success' },
};

export const BATCH_STATUS = {
  draft: { label: 'Draft', tone: 'warning' },
  placed: { label: 'On the market', tone: 'success' },
};

export const TIMELINE_LABELS = {
  requested: 'Pickup requested',
  scheduled: 'Pickup scheduled',
  handover_code_issued: 'Handover code generated',
  handed_over: 'Handed over to collector',
  collected: 'Weighed and collected',
  added_to_lot: 'Sealed in a lot',
  dispatched: 'Dispatched to recycler',
  received: 'Received by recycler',
  attested: 'Recycling attested',
  cancelled: 'Cancelled',
};
