export function Badge({ tone = 'neutral', children }) {
  return <span className={tone === 'neutral' ? 'badge' : `badge badge--${tone}`}>{children}</span>;
}

/** Renders a status using a status map from lib/status.js. */
export function StatusBadge({ map, value }) {
  const entry = map[value] ?? { label: value, tone: 'neutral' };
  return <Badge tone={entry.tone}>{entry.label}</Badge>;
}
