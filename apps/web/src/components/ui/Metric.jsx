export function Metric({ label, value, unit, hint, size }) {
  return (
    <div className={size === 'lg' ? 'metric metric--lg' : 'metric'}>
      <div className="metric__label">{label}</div>
      <div className="metric__value">{value}{unit && <span className="metric__unit">{unit}</span>}</div>
      {hint && <div className="metric__hint">{hint}</div>}
    </div>
  );
}
