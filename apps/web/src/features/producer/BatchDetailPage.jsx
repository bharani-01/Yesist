import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Segmented, TextField } from '../../components/ui/Field.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime, formatInt } from '../../lib/format.js';
import { BATCH_STATUS } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { monthLabel } from './BatchesPage.jsx';
import { parseUnitCsv, producerApi, producerRole, ROW_ERROR_LABELS, STAFF, UNITS_PER_REQUEST } from './producer.api.js';

export function BatchDetailPage() {
  const { id } = useParams();
  const query = useAsync((s) => producerApi.batch(id, s), [id]);
  return (
    <div className="page">
      <AsyncView query={query}>{(batch) => <BatchDetail batch={batch} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function BatchDetail({ batch, onChange }) {
  const { user } = useAuth();
  const role = producerRole(user);
  const remaining = batch.quantity - batch.registeredUnits;
  const isDraft = batch.status === 'draft';

  return (
    <>
      <PageHeader
        back={{ to: '/producer/batches', label: 'Batches' }}
        title={<>Batch <span className="mono">{batch.batchRef}</span></>}
        description={`${batch.brand} ${batch.modelName} · ${monthLabel(batch.marketMonth)} · ${batch.stateCode}`}
        actions={<StatusBadge map={BATCH_STATUS} value={batch.status} />}
      />
      <div className="split">
        <div className="stack">
          {isDraft && remaining > 0 && (STAFF.work.includes(role)
            ? <RegisterUnits batch={batch} remaining={remaining} onRegistered={onChange} />
            : <Alert tone="info">An owner or operator uploads units into draft batches.</Alert>)}
          {isDraft && <PlacePanel batch={batch} canPlace={STAFF.approve.includes(role)} onPlaced={onChange} />}
          {!isDraft && (
            <Alert tone="success" title="On the market">
              Placed {formatDateTime(batch.placedAt)}. Registered units can now be claimed by their owners and tracked to recycling by QR.
            </Alert>
          )}
        </div>
        <Panel title="Batch">
          <div className="stack stack--sm">
            <dl className="dl">
              <dt>Declared units</dt><dd>{formatInt(batch.quantity)}</dd>
              <dt>Registered</dt><dd>{formatInt(batch.registeredUnits)}</dd>
              <dt>Created</dt><dd>{formatDateTime(batch.createdAt)}</dd>
            </dl>
            {batch.registeredUnits > 0 && (
              <div className="row">
                <Link to={`/producer/batches/${batch.id}/labels`} className="btn btn--secondary btn--sm">Print QR labels</Link>
                <Link to={`/producer/units?batchId=${batch.id}`} className="btn btn--ghost btn--sm">View units</Link>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}

function RegisterUnits({ batch, remaining, onRegistered }) {
  const [mode, setMode] = useState('csv');
  const [rows, setRows] = useState(null);
  const [fileName, setFileName] = useState('');
  const [qrCount, setQrCount] = useState('');
  const [progress, setProgress] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    setOutcome(null);
    setError(null);
    if (!file) { setRows(null); setFileName(''); return; }
    setFileName(file.name);
    setRows(parseUnitCsv(await file.text()));
  };

  const pendingRows = mode === 'csv' ? rows : Array.from({ length: Math.min(Number(qrCount) || 0, remaining) }, () => ({}));
  const tooMany = pendingRows && pendingRows.length > remaining;

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setOutcome(null);
    const all = pendingRows;
    let registered = 0;
    const rejected = [];
    try {
      for (let start = 0; start < all.length; start += UNITS_PER_REQUEST) {
        setProgress({ done: start, total: all.length });
        const chunk = all.slice(start, start + UNITS_PER_REQUEST);
        const result = await producerApi.registerUnits(batch.id, chunk);
        registered += result.registered;
        for (const r of result.rejected) rejected.push({ row: start + r.row, error: r.error, input: chunk[r.row - 1] });
      }
    } catch (err) {
      setError(err);
    } finally {
      setProgress(null);
      setOutcome({ registered, rejected });
      setRows(null);
      setFileName('');
      setQrCount('');
      if (fileRef.current) fileRef.current.value = '';
      if (registered) onRegistered();
    }
  };

  return (
    <Panel title="Register units">
      <form className="form-grid" onSubmit={submit}>
        <p className="subtle">Room for {formatInt(remaining)} more units. Each registered unit gets a QR label. IMEIs and serials are stored only as keyed hashes plus the last four characters.</p>
        <Segmented
          name="unit-source"
          label="Source"
          value={mode}
          onChange={(v) => { setMode(v); setOutcome(null); setError(null); }}
          options={[{ value: 'csv', label: 'Upload CSV of IMEIs or serials' }, { value: 'qr', label: 'QR labels only' }]}
        />
        {mode === 'csv' ? (
          <div className="field">
            <label className="field__label" htmlFor="unit-csv">CSV file</label>
            <input id="unit-csv" ref={fileRef} className="input" type="file" accept=".csv,text/csv,text/plain" onChange={onFile} aria-describedby="unit-csv-hint" />
            <span id="unit-csv-hint" className="field__hint">
              {rows ? `${fileName}: ${formatInt(rows.length)} rows` : 'A header row with an “imei” or “serial” column, or one value per line.'}
            </span>
          </div>
        ) : (
          <TextField label="Number of labels" type="number" min="1" max={remaining} value={qrCount} onChange={(e) => setQrCount(e.target.value)} hint="For products without an IMEI or serial. Each label gets a unique random ID." />
        )}
        {tooMany && <Alert tone="warning">This file has {formatInt(pendingRows.length)} rows but the batch only has room for {formatInt(remaining)}.</Alert>}
        {progress && <p className="subtle" role="status">Registering… {formatInt(progress.done)} of {formatInt(progress.total)}</p>}
        <ErrorAlert error={error} />
        {outcome && <UploadOutcome outcome={outcome} />}
        <div className="form-actions">
          <Button type="submit" loading={!!progress} disabled={!pendingRows?.length || tooMany}>
            Register {pendingRows?.length ? formatInt(pendingRows.length) : ''} units
          </Button>
        </div>
      </form>
    </Panel>
  );
}

function UploadOutcome({ outcome }) {
  const { registered, rejected } = outcome;
  const download = () => {
    const lines = ['row,value,reason', ...rejected.map((r) => `${r.row},${r.input?.imei ?? r.input?.serial ?? ''},"${ROW_ERROR_LABELS[r.error] ?? r.error}"`)];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rejected-rows.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Alert tone={rejected.length ? 'warning' : 'success'} title={`${formatInt(registered)} registered, ${formatInt(rejected.length)} rejected`}>
      {rejected.length > 0 && (
        <div className="stack stack--sm" style={{ marginTop: 8 }}>
          <ul className="row-errors subtle" style={{ margin: 0, paddingLeft: 18 }}>
            {rejected.slice(0, 50).map((r) => <li key={r.row}>Row {r.row}: {ROW_ERROR_LABELS[r.error] ?? r.error}</li>)}
          </ul>
          {rejected.length > 50 && <span className="subtle">and {formatInt(rejected.length - 50)} more.</span>}
          <div><Button type="button" variant="secondary" size="sm" onClick={download}>Download rejected rows</Button></div>
        </div>
      )}
    </Alert>
  );
}

function PlacePanel({ batch, canPlace, onPlaced }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const place = async () => {
    setPending(true);
    setError(null);
    try {
      await producerApi.placeBatch(batch.id);
      onPlaced();
    } catch (err) {
      setError(err);
      setPending(false);
    }
  };
  const short = batch.quantity - batch.registeredUnits;
  return (
    <Panel title="Place on market">
      <div className="stack stack--sm">
        <p className="subtle">
          Placing freezes the batch: no more units can be added, and every registered unit is marked as sold into the market.
          {short > 0 && ` ${formatInt(short)} declared units are not registered yet.`}
        </p>
        {!canPlace ? <Alert tone="info">Only an owner or approver can place a batch on the market.</Alert>
          : batch.registeredUnits === 0 ? <Alert tone="info">Register at least one unit first.</Alert>
          : (
            <>
              <ErrorAlert error={error} />
              <div><Button onClick={place} loading={pending}>Place {formatInt(batch.registeredUnits)} units on market</Button></div>
            </>
          )}
      </div>
    </Panel>
  );
}
