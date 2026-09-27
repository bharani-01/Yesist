const STEPS = [
  { key: 'requested', label: 'Requested' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'collected', label: 'Collected' },
  { key: 'in_lot', label: 'In transit' },
  { key: 'received', label: 'At recycler' },
  { key: 'closed', label: 'Recycled' },
];

export function PickupProgress({ status }) {
  const index = STEPS.findIndex((s) => s.key === status);
  if (index < 0) return null;
  return (
    <ol className="stepper" style={{ '--steps': STEPS.length }} aria-label="Pickup progress">
      {STEPS.map((step, i) => {
        const state = i < index || status === 'closed' ? 'is-done' : i === index ? 'is-current' : '';
        return (
          <li key={step.key} className={`stepper__step ${state}`} aria-current={i === index ? 'step' : undefined}>
            <span className="stepper__bar" />
            <span className="stepper__label">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
