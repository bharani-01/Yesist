import { useState } from 'react';
import { AsyncView, EmptyState } from '../../../components/feedback/AsyncView.jsx';
import { ErrorAlert } from '../../../components/ui/Alert.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { SelectField, TextField } from '../../../components/ui/Field.jsx';
import { Panel } from '../../../components/ui/Panel.jsx';
import { formatDateTime } from '../../../lib/format.js';
import { FLAG_SEVERITY, FLAG_STATUS, FLAG_TYPE_LABELS } from '../../../lib/status.js';
import { useAuth } from '../../auth/AuthProvider.jsx';
import { FLAG_UPDATE_ROLES, oversightApi } from '../oversight.api.js';

const FILTERS = [
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'all', label: 'All' },
];

export function FlagsPanel({ query, status, onStatusChange, onUpdated }) {
  const { user } = useAuth();
  const canTriage = FLAG_UPDATE_ROLES.includes(user.role);
  return (
    <Panel
      title="Compliance flags"
      flush
      actions={
        <div className="segmented" role="radiogroup" aria-label="Filter flags">
          {FILTERS.map((f) => (
            <label key={f.value}>
              <input type="radio" name="flag-filter" checked={status === f.value} onChange={() => onStatusChange(f.value)} />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      }
    >
      <AsyncView query={query} isEmpty={(d) => !d.length} empty={<EmptyState title="No flags" text="Weight, seal, unit-count, duplicate-device, and storage flags appear here within a minute of being raised." />}>
        {(flags) => (
          <ul className="list">
            {flags.map((f) => <FlagRow key={f.id} flag={f} canTriage={canTriage} onUpdated={onUpdated} />)}
          </ul>
        )}
      </AsyncView>
      {!canTriage && <p className="subtle" style={{ padding: '0 var(--space-5) var(--space-4)' }}>City officers have read-only access to flags.</p>}
    </Panel>
  );
}

function FlagRow({ flag, canTriage, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ status: flag.status === 'open' ? 'under_review' : 'closed', note: '' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await oversightApi.updateFlag(flag.id, form);
      setOpen(false);
      onUpdated();
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <li className="list__item" style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
      <div className="row row--between" style={{ width: '100%' }}>
        <div className="list__main">
          <span className="row" style={{ gap: 'var(--space-2)' }}>
            <StatusBadge map={FLAG_SEVERITY} value={flag.severity} />
            <strong>{FLAG_TYPE_LABELS[flag.type] ?? flag.type}</strong>
          </span>
          <span>{flag.summary}</span>
          <span className="list__meta">
            {flag.orgName && <span>{flag.orgName}</span>}
            {flag.lotSealTag && <span>Lot <span className="mono">{flag.lotSealTag}</span></span>}
            {flag.pickupReference && <span className="mono">{flag.pickupReference}</span>}
            <span>Opened {formatDateTime(flag.openedAt)}</span>
          </span>
          {flag.resolutionNote && <span className="subtle">Note: {flag.resolutionNote}</span>}
        </div>
        <div className="row">
          <StatusBadge map={FLAG_STATUS} value={flag.status} />
          {canTriage && flag.status !== 'closed' && !open && <Button variant="secondary" size="sm" aria-label={`Update ${FLAG_TYPE_LABELS[flag.type] ?? flag.type} flag ${flag.lotSealTag ?? flag.pickupReference ?? ''}`.trim()} onClick={() => setOpen(true)}>Update</Button>}
        </div>
      </div>
      {open && (
        <form className="form-grid" style={{ width: '100%' }} onSubmit={submit}>
          <div className="form-grid form-grid--2">
            <SelectField label="New status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="under_review">Under review</option>
              <option value="escalated">Escalate (inspection)</option>
              <option value="closed">Close</option>
            </SelectField>
            <TextField label="Note" required minLength={5} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} hint="Recorded in the audit log" />
          </div>
          <ErrorAlert error={error} />
          <div className="form-actions">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" loading={pending} disabled={form.note.trim().length < 5}>Save</Button>
          </div>
        </form>
      )}
    </li>
  );
}
