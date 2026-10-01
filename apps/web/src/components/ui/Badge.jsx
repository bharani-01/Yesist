export function Badge({ tone = 'neutral', children }) {
  return <span className={tone === 'neutral' ? 'badge' : `badge badge--${tone}`}>{children}</span>;
}

/** Renders a status using a status map from lib/status.js, or direct tone/label props. */
export function StatusBadge({ map, value, tone, label, children }) {
  if (map && value !== undefined) {
    const entry = map[value] ?? { label: String(value), tone: 'neutral' };
    return <Badge tone={entry.tone}>{entry.label}</Badge>;
  }
  return <Badge tone={tone ?? 'neutral'}>{label ?? children ?? (value !== undefined ? String(value) : '')}</Badge>;
}
