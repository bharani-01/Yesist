import { useMemo, useState } from 'react';
import { Alert, ErrorAlert } from '../../../components/ui/Alert.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { SelectField, TextAreaField, TextField } from '../../../components/ui/Field.jsx';
import { Panel } from '../../../components/ui/Panel.jsx';
import { formatInr } from '../../../lib/format.js';
import { agentApi } from '../agent.api.js';

const IMEI_CATEGORIES = new Set(['mobile_phone', 'tablet']);
const BATTERY_OPTIONS = [
  { value: '', label: 'Select battery condition' },
  { value: 'intact_embedded', label: 'Battery intact' },
  { value: 'no_battery', label: 'No battery' },
  { value: 'swollen_or_damaged_refused', label: 'Swollen or damaged (refuse)' },
];

/** Doorstep collection: battery triage, device IDs, weight, price, then the customer's handover code. */
export function CollectForm({ job, onCollected }) {
  const [lines, setLines] = useState(() => job.items.map((i) => ({
    itemId: i.id, collectedQuantity: i.quantity, batteryCheck: '', refusedReason: '', identifiers: '',
  })));
  const [netKg, setNetKg] = useState('');
  const [paid, setPaid] = useState('');
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const itemById = useMemo(() => Object.fromEntries(job.items.map((i) => [i.id, i])), [job.items]);
  const update = (index, patch) => setLines(lines.map((l, i) => (i === index ? { ...l, ...patch } : l)));

  const suggestedPrice = useMemo(() => {
    let total = 0;
    for (const l of lines) {
      const item = itemById[l.itemId];
      const rate = job.rates.find((r) => r.categoryCode === item.categoryCode);
      if (rate?.pricePerUnit != null) total += Number(rate.pricePerUnit) * Number(l.collectedQuantity || 0);
    }
    return total;
  }, [lines, itemById, job.rates]);

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const body = {
        handoverCode: code,
        netKg: Number(netKg),
        materialPaidAmount: Number(paid || 0),
        items: lines.map((l) => {
          const item = itemById[l.itemId];
          const refused = l.batteryCheck === 'swollen_or_damaged_refused';
          return {
            itemId: l.itemId,
            collectedQuantity: refused ? 0 : Number(l.collectedQuantity),
            batteryCheck: item.hasBattery ? l.batteryCheck || undefined : undefined,
            refusedReason: l.refusedReason || undefined,
            identifiers: item.dataBearing && !refused ? l.identifiers.split(/\s+/).map((s) => s.trim()).filter(Boolean) : [],
          };
        }),
      };
      const { result: r } = await agentApi.collect(job.id, body);
      setResult(r);
      onCollected(r);
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };

  if (result) {
    return (
      <Alert tone="success" title="Handover confirmed">
        {result.incentive
          ? `Customer incentive: ${formatInr(result.incentive.amount)} (${result.incentive.status}).`
          : 'No scheme incentive for this pickup.'}
        {result.duplicates > 0 && ` ${result.duplicates} device(s) were already in the custody chain and have been flagged for review.`}
      </Alert>
    );
  }

  return (
    <Panel title="Collect at the door">
      <form className="form-grid" onSubmit={submit} noValidate>
        {lines.map((line, index) => {
          const item = itemById[line.itemId];
          const refused = line.batteryCheck === 'swollen_or_damaged_refused';
          const short = !refused && Number(line.collectedQuantity) < item.quantity;
          return (
            <fieldset key={line.itemId} className="form-grid" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', margin: 0 }}>
              <legend style={{ fontWeight: 600, padding: '0 6px' }}>{item.name} · booked {item.quantity}</legend>
              <div className="form-grid form-grid--2">
                {item.hasBattery && (
                  <SelectField label="Battery check" value={line.batteryCheck} onChange={(e) => update(index, { batteryCheck: e.target.value })}>
                    {BATTERY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </SelectField>
                )}
                <TextField label="Collected quantity" type="number" min={0} max={item.quantity} disabled={refused} value={refused ? 0 : line.collectedQuantity} onChange={(e) => update(index, { collectedQuantity: e.target.value })} />
              </div>
              {refused && <Alert tone="warning">Do not collect devices with swollen or damaged batteries. Advise the customer on safe storage.</Alert>}
              {short && <TextField label="Reason for not collecting the rest" value={line.refusedReason} onChange={(e) => update(index, { refusedReason: e.target.value })} />}
              {item.dataBearing && !refused && (
                <TextAreaField
                  label={IMEI_CATEGORIES.has(item.categoryCode) ? 'IMEI numbers (optional)' : 'Serial numbers (optional)'}
                  hint={IMEI_CATEGORIES.has(item.categoryCode) ? 'Dial *#06# on each phone. One per line. Only the last 4 digits are ever shown.' : 'One per line, from the device label.'}
                  rows={2}
                  value={line.identifiers}
                  onChange={(e) => update(index, { identifiers: e.target.value })}
                />
              )}
            </fieldset>
          );
        })}
        <div className="form-grid form-grid--2">
          <TextField label="Total net weight (kg)" type="number" step="0.001" min="0.001" required value={netKg} onChange={(e) => setNetKg(e.target.value)} hint="Weighed at the door" />
          <TextField label="Price paid to customer (₹)" type="number" step="0.01" min="0" value={paid} onChange={(e) => setPaid(e.target.value)} hint={suggestedPrice ? `Rate card suggests ${formatInr(suggestedPrice)} for per-unit items` : 'From the recycler rate card'} />
        </div>
        <TextField label="Customer’s handover code" className="" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} hint="Ask the customer to open the pickup and tap “Show handover code”" style={{ letterSpacing: '0.3em', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)' }} />
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={code.length !== 6 || !(Number(netKg) > 0)}>Confirm handover</Button>
        </div>
      </form>
    </Panel>
  );
}
