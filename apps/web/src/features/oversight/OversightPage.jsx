import { useState } from 'react';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatCount, formatDate, formatDateTime, formatInr, formatInt, formatKg } from '../../lib/format.js';
import { FlagsPanel } from './components/FlagsPanel.jsx';
import { oversightApi } from './oversight.api.js';
import { useFlagStream } from './useFlagStream.js';

const LIVE_LABELS = { connecting: 'Connecting…', live: 'Live', reconnecting: 'Reconnecting…', closed: 'Offline' };

export function OversightPage() {
  const overview = useAsync((s) => oversightApi.overview(s), []);
  const [flagStatus, setFlagStatus] = useState('active');
  const flags = useAsync((s) => oversightApi.flags(flagStatus, s).then((r) => r.flags), [flagStatus]);
  const connection = useFlagStream(() => { flags.refresh(); overview.refresh(); });

  return (
    <div className="page">
      <PageHeader
        title="Programme overview"
        actions={
          <span className={`live-dot ${connection === 'live' ? 'is-live' : connection === 'connecting' ? '' : 'is-down'}`} role="status">
            Flags: {LIVE_LABELS[connection]}
          </span>
        }
      />
      <AsyncView query={overview} loadingRows={4}>{(data) => <Overview data={data} />}</AsyncView>
      <FlagsPanel query={flags} status={flagStatus} onStatusChange={setFlagStatus} onUpdated={() => { flags.refresh(); overview.refresh(); }} />
    </div>
  );
}

function Overview({ data }) {
  const t = data.totals;
  const coverage = t.dataBearingCollected ? Math.round((t.passportUnits / t.dataBearingCollected) * 100) : null;
  const openFlags = (data.openFlags.high ?? 0) + (data.openFlags.medium ?? 0) + (data.openFlags.low ?? 0);
  const maxKg = Math.max(1, ...data.weeklyCollectedKg.map((w) => Number(w.kg)));

  return (
    <>
      <div className="metrics">
        <Metric label="Collected" value={formatKg(t.collectedKg)} hint={formatCount(t.pickupsCollected, 'pickup')} />
        <Metric label="Accepted at recycler" value={formatKg(t.acceptedKg)} hint={`${formatCount(t.lotsInTransit, 'lot')} in transit`} />
        <Metric label="Attested as processed" value={formatKg(t.attestedKg)} hint={formatCount(t.attestationsIssued, 'attestation')} />
        <Metric label="Passport coverage" value={coverage == null ? '—' : `${coverage}%`} hint="Data-bearing devices with an ID (target 60%)" />
        <Metric label="Incentives committed" value={formatInr(t.incentivesCommitted)} hint={`${formatInt(t.incentivesHeld)} held for review`} />
        <Metric label="Active flags" value={formatInt(openFlags)} hint={`${data.openFlags.high ?? 0} high severity`} />
      </div>
      <div className="split">
        <Panel title="Collected per week (kg)">
          <div className="bars" style={{ '--bars': data.weeklyCollectedKg.length }} role="img" aria-label="Weekly collected kilograms for the last eight weeks">
            {data.weeklyCollectedKg.map((w) => (
              <div key={w.week} className="bars__bar" title={`${formatDate(w.week)}: ${formatKg(w.kg)}`}>
                <span className="num">{Number(w.kg) ? Math.round(Number(w.kg)) : ''}</span>
                <div className="bars__track"><div className="bars__fill" style={{ height: `${(Number(w.kg) / maxKg) * 100}%` }} /></div>
                <span>{new Date(`${w.week}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Top wards" flush>
          {data.topWards.length ? (
            <table className="table">
              <thead><tr><th>Ward</th><th className="num">Pickups</th><th className="num">Collected</th></tr></thead>
              <tbody>
                {data.topWards.map((w) => (
                  <tr key={w.wardName}><td>{w.wardName}</td><td className="num">{w.pickups}</td><td className="num">{formatKg(w.kg)}</td></tr>
                ))}
              </tbody>
            </table>
          ) : <p className="muted" style={{ padding: 'var(--space-5)', fontSize: 'var(--text-sm)' }}>No collections yet.</p>}
        </Panel>
      </div>
      <p className="subtle">Updated {formatDateTime(data.generatedAt)}</p>
    </>
  );
}

function Metric({ label, value, hint }) {
  return (
    <div className="metric">
      <div className="metric__label">{label}</div>
      <div className="metric__value">{value}</div>
      {hint && <div className="metric__hint">{hint}</div>}
    </div>
  );
}
