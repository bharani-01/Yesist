import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Segmented, SelectField, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { addDaysIso, todayIso, WINDOW_LABELS } from '../../lib/format.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useReference } from '../reference/useReference.js';
import { pickupsApi } from './pickups.api.js';

const WINDOW_OPTIONS = Object.entries(WINDOW_LABELS).map(([value, label]) => ({ value, label }));

export function NewPickupPage() {
  const reference = useReference();
  return (
    <div className="page">
      <PageHeader title="Book a pickup" description="A verified collector from your ward will confirm a time." back={{ to: '/pickups', label: 'My pickups' }} />
      <AsyncView query={reference}>{(ref) => <PickupForm reference={ref} />}</AsyncView>
    </div>
  );
}

function PickupForm({ reference }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([{ categoryCode: reference.categories[0].code, quantity: 1 }]);
  const [form, setForm] = useState({
    wardId: '', addressLine: '', landmark: '', contactName: user.fullName ?? '', contactPhone: user.phone ?? '',
    preferredDate: addDaysIso(1), preferredWindow: 'morning',
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const fieldErrors = error?.fieldErrors?.() ?? {};
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const usedCodes = new Set(items.map((i) => i.categoryCode));
  const nextFree = reference.categories.find((c) => !usedCodes.has(c.code));
  const hasBatteryItems = items.some((i) => reference.categories.find((c) => c.code === i.categoryCode)?.hasBattery);

  const updateItem = (index, patch) => setItems(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { pickup } = await pickupsApi.create({
        ...form,
        wardId: Number(form.wardId),
        landmark: form.landmark || undefined,
        items: items.map((i) => ({ categoryCode: i.categoryCode, quantity: Number(i.quantity) })),
      });
      navigate(`/pickups/${pickup.id}`, { replace: true });
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };

  return (
    <form className="split" onSubmit={onSubmit} noValidate>
      <div className="stack">
        <Panel title="What are you handing over?">
          <div className="form-grid">
            {items.map((item, index) => (
              <div key={index} className="row" style={{ alignItems: 'flex-end' }}>
                <SelectField
                  label={index === 0 ? 'Item type' : undefined}
                  aria-label="Item type"
                  className="grow"
                  value={item.categoryCode}
                  onChange={(e) => updateItem(index, { categoryCode: e.target.value })}
                  style={{ minWidth: 220 }}
                >
                  {reference.categories.map((c) => (
                    <option key={c.code} value={c.code} disabled={c.code !== item.categoryCode && usedCodes.has(c.code)}>{c.name}</option>
                  ))}
                </SelectField>
                <TextField
                  label={index === 0 ? 'Quantity' : undefined}
                  aria-label="Quantity"
                  type="number"
                  min={1}
                  max={50}
                  value={item.quantity}
                  onChange={(e) => updateItem(index, { quantity: e.target.value })}
                  style={{ width: 96 }}
                />
                {items.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => setItems(items.filter((_, i) => i !== index))} aria-label={`Remove item ${index + 1}`}>Remove</Button>
                )}
              </div>
            ))}
            {fieldErrors.items && <span className="field__error">{fieldErrors.items}</span>}
            {nextFree && items.length < 8 && (
              <div><Button variant="secondary" size="sm" onClick={() => setItems([...items, { categoryCode: nextFree.code, quantity: 1 }])}>Add another item</Button></div>
            )}
            {hasBatteryItems && (
              <Alert tone="warning">Devices with swollen, leaking, or damaged batteries cannot be collected at the door. Keep them away from heat and ask the collector about safe drop-off.</Alert>
            )}
          </div>
        </Panel>

        <Panel title="Where should we collect?">
          <div className="form-grid">
            <SelectField label="Ward (Indore)" required value={form.wardId} onChange={set('wardId')} error={fieldErrors.wardId}>
              <option value="">Select your ward</option>
              {reference.wards.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
            </SelectField>
            <TextField label="Address" autoComplete="street-address" required value={form.addressLine} onChange={set('addressLine')} error={fieldErrors.addressLine} hint="Society, wing, flat, street" />
            <TextField label="Landmark (optional)" value={form.landmark} onChange={set('landmark')} error={fieldErrors.landmark} />
            <div className="form-grid form-grid--2">
              <TextField label="Contact name" autoComplete="name" required value={form.contactName} onChange={set('contactName')} error={fieldErrors.contactName} />
              <TextField label="Contact mobile" type="tel" inputMode="numeric" maxLength={10} required value={form.contactPhone} onChange={set('contactPhone')} error={fieldErrors.contactPhone} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="stack">
        <Panel title="When?">
          <div className="form-grid">
            <TextField label="Preferred date" type="date" min={todayIso()} max={addDaysIso(30)} required value={form.preferredDate} onChange={set('preferredDate')} error={fieldErrors.preferredDate} />
            <Segmented name="window" label="Preferred time" value={form.preferredWindow} onChange={(v) => setForm({ ...form, preferredWindow: v })} options={WINDOW_OPTIONS} />
          </div>
        </Panel>
        <Panel title="How it works">
          <ol className="stack stack--sm muted" style={{ margin: 0, paddingLeft: 18, fontSize: 'var(--text-sm)' }}>
            <li>A collector from your ward accepts and confirms the time.</li>
            <li>At the door, you share a one-time handover code after weighing.</li>
            <li>You receive the recycler’s price on the spot; the scheme incentive follows in the next treasury batch.</li>
            <li>You get the recycling attestation number once the recycler processes it.</li>
          </ol>
        </Panel>
        {error && !Object.keys(fieldErrors).length && <ErrorAlert error={error} />}
        <Button type="submit" block loading={pending}>Request pickup</Button>
      </div>
    </form>
  );
}
