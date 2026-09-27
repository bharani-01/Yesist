const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
const kgFmt = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 });
const intFmt = new Intl.NumberFormat('en-IN');
const dateFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const dateTimeFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

export const formatInr = (v) => (v == null ? '—' : inr.format(Number(v)));
export const formatKg = (v) => (v == null ? '—' : `${kgFmt.format(Number(v))} kg`);
export const formatInt = (v) => (v == null ? '—' : intFmt.format(Number(v)));
export const formatCount = (v, singular, plural = `${singular}s`) => `${formatInt(v ?? 0)} ${Number(v) === 1 ? singular : plural}`;
export const formatDate = (v) => (v ? dateFmt.format(new Date(String(v).length === 10 ? `${v}T00:00:00` : v)) : '—');
export const formatDateTime = (v) => (v ? dateTimeFmt.format(new Date(v)) : '—');

export const WINDOW_LABELS = { morning: 'Morning (9–12)', afternoon: 'Afternoon (12–4)', evening: 'Evening (4–7)' };

export const todayIso = () => new Date().toLocaleDateString('en-CA');
export function addDaysIso(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-CA');
}

export function relativeFromNow(v) {
  const diffMin = Math.round((new Date(v).getTime() - Date.now()) / 60000);
  const abs = Math.abs(diffMin);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (abs < 60) return rtf.format(diffMin, 'minute');
  if (abs < 60 * 48) return rtf.format(Math.round(diffMin / 60), 'hour');
  return rtf.format(Math.round(diffMin / 1440), 'day');
}
