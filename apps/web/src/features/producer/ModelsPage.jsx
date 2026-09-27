import { useState } from 'react';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { SelectField, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatInt, formatKg } from '../../lib/format.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useReference } from '../reference/useReference.js';
import { BATTERY_LABELS, producerApi, producerRole, STAFF } from './producer.api.js';

export function ModelsPage() {
  const { user } = useAuth();
  const canWork = STAFF.work.includes(producerRole(user));
  const models = useAsync((s) => producerApi.models(s), []);
  const [created, setCreated] = useState(null);

  return (
    <div className="page">
      <PageHeader title="Product models" description="Each model you sell. Units and batches are registered against a model." />
      <div className="split">
        <Panel title="Registered models" flush>
          <AsyncView query={models} isEmpty={(d) => !d.length} empty={<EmptyState title="No models yet" text="Register your first model with the form." />}>
            {(rows) => (
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Model</th><th>Category</th><th className="num">Typical weight</th><th>Battery</th><th className="num">Batches</th></tr></thead>
                  <tbody>
                    {rows.map((m) => (
                      <tr key={m.id}>
                        <td>
                          <strong>{m.brand} {m.modelName}</strong>
                          {m.modelCode && <div className="subtle mono">{m.modelCode}</div>}
                        </td>
                        <td>{m.categoryName}{m.dataBearing && <div className="subtle">Stores personal data</div>}</td>
                        <td className="num">{formatKg(m.typicalUnitKg)}</td>
                        <td>{BATTERY_LABELS[m.batteryType]}</td>
                        <td className="num">{formatInt(m.batchCount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AsyncView>
        </Panel>
        <div className="stack">
          {created && <Alert tone="success" title="Model registered">{created.brand} {created.modelName} is ready for batches.</Alert>}
          {canWork
            ? <CreateModelForm onCreated={(m) => { setCreated(m); models.refresh(); }} />
            : <Alert tone="info">Only an owner or operator of your organisation can register models.</Alert>}
        </div>
      </div>
    </div>
  );
}

const EMPTY = { brand: '', modelName: '', modelCode: '', categoryCode: '', typicalUnitKg: '', batteryType: 'li_ion' };

function CreateModelForm({ onCreated }) {
  const reference = useReference();
  const [form, setForm] = useState(EMPTY);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const fieldErrors = error?.fieldErrors?.() ?? {};
  const fieldError = (key) => fieldErrors[key];

  const onCategory = (e) => {
    const category = reference.data?.categories.find((c) => c.code === e.target.value);
    setForm({
      ...form,
      categoryCode: e.target.value,
      typicalUnitKg: form.typicalUnitKg || (category ? String(category.typicalUnitKg) : ''),
      batteryType: category && !category.hasBattery ? 'none' : form.batteryType,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const model = await producerApi.createModel({
        brand: form.brand, modelName: form.modelName, categoryCode: form.categoryCode,
        typicalUnitKg: Number(form.typicalUnitKg), batteryType: form.batteryType,
        ...(form.modelCode.trim() && { modelCode: form.modelCode.trim() }),
      });
      setForm(EMPTY);
      onCreated(model);
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <Panel title="Register a model">
      <form className="form-grid" onSubmit={submit}>
        <div className="form-grid form-grid--2">
          <TextField label="Brand" required maxLength={80} value={form.brand} onChange={set('brand')} error={fieldError('brand')} />
          <TextField label="Model name" required maxLength={120} value={form.modelName} onChange={set('modelName')} error={fieldError('modelName')} />
        </div>
        <TextField label="Model code (optional)" maxLength={40} value={form.modelCode} onChange={set('modelCode')} error={fieldError('modelCode')} hint="Your internal SKU or model number" />
        <SelectField label="E-waste category" required value={form.categoryCode} onChange={onCategory} error={fieldError('categoryCode')} disabled={!reference.data}>
          <option value="" disabled>{reference.status === 'error' ? 'Categories unavailable' : 'Choose a category'}</option>
          {reference.data?.categories.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
        </SelectField>
        <div className="form-grid form-grid--2">
          <TextField label="Typical unit weight (kg)" type="number" step="0.001" min="0.001" max="1000" required value={form.typicalUnitKg} onChange={set('typicalUnitKg')} error={fieldError('typicalUnitKg')} />
          <SelectField label="Battery" value={form.batteryType} onChange={set('batteryType')} error={fieldError('batteryType')}>
            {Object.entries(BATTERY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </SelectField>
        </div>
        <ErrorAlert error={error} />
        <div className="form-actions">
          <Button type="submit" loading={pending} disabled={!form.brand.trim() || !form.modelName.trim() || !form.categoryCode || !(Number(form.typicalUnitKg) > 0)}>Register model</Button>
        </div>
      </form>
    </Panel>
  );
}
