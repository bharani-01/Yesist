import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatInr, formatKg, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { agentApi } from './agent.api.js';

function DeviceIcon({ categoryCode }) {
  if (categoryCode === 'laptop' || categoryCode === 'desktop_cpu') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" />
        <line x1="2" x2="22" y1="20" y2="20" />
      </svg>
    );
  }
  if (categoryCode === 'mobile_phone' || categoryCode === 'tablet') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  }
  if (categoryCode === 'monitor_tv') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.044-1.771l1.97-3.474a1.812 1.812 0 0 1 1.57-.874H10" />
      <path d="M11 19h6.185a1.83 1.83 0 0 0 1.57-.881 1.785 1.785 0 0 0 .044-1.771l-1.97-3.474a1.812 1.812 0 0 0-1.57-.874H13" />
      <path d="M15.5 8 13.53 4.526a1.812 1.812 0 0 0-1.57-.874H8.04a1.83 1.83 0 0 0-1.57.881 1.785 1.785 0 0 0-.044 1.771L8.5 10" />
    </svg>
  );
}

const itemsSummary = (items = []) => items.map((i) => `${i.quantity ?? 1} × ${i.name}`).join(', ');

export function AgentPickupsPage() {
  const query = useAsync((s) => agentApi.myJobs(s).then((r) => r.jobs), []);
  const [filter, setFilter] = useState('all');

  const jobs = query.data ?? [];
  const scheduled = jobs.filter((j) => j.status === 'scheduled');
  const collected = jobs.filter((j) => j.status === 'collected');

  const displayed = filter === 'scheduled' ? scheduled : filter === 'collected' ? collected : jobs;

  return (
    <div className="page">
      <PageHeader
        title="My Pickups"
        eyebrow="ASSIGNED & COLLECTED E-WASTE"
        actions={
          <Link to="/agent/requests" className="btn btn--primary tap-effect" style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
            Find Open Requests &rarr;
          </Link>
        }
      />

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div className="agent-filter-tabs">
          <button 
            type="button" 
            className={`agent-filter-btn ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Pickups <span className="agent-filter-count">{jobs.length}</span>
          </button>
          <button 
            type="button" 
            className={`agent-filter-btn ${filter === 'scheduled' ? 'is-active' : ''}`}
            onClick={() => setFilter('scheduled')}
          >
            Scheduled <span className="agent-filter-count">{scheduled.length}</span>
          </button>
          <button 
            type="button" 
            className={`agent-filter-btn ${filter === 'collected' ? 'is-active' : ''}`}
            onClick={() => setFilter('collected')}
          >
            Collected in Shop <span className="agent-filter-count">{collected.length}</span>
          </button>
        </div>

        {collected.length > 0 && (
          <Link to="/agent/lots" className="btn btn--secondary btn--sm tap-effect" style={{ borderRadius: 'var(--radius-pill)' }}>
            Pack {collected.length} into a Lot &rarr;
          </Link>
        )}
      </div>

      {/* Pickups List */}
      <AsyncView
        query={query}
        isEmpty={(d) => !d.length}
        empty={
          <div className="panel" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-6)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(229, 229, 234, 0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-ink-muted)' }}>
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-5.5a1.5 1.5 0 0 0-.44-1.06L18.5 7.38A1.5 1.5 0 0 0 17.44 7H14" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 6px' }}>
              No assigned pickups yet
            </h3>
            <p className="subtle" style={{ maxWidth: '360px', margin: '0 auto var(--space-4)' }}>
              Accept an open request from citizens in your ward to start collecting.
            </p>
            <Link to="/agent/requests" className="btn btn--primary btn--sm tap-effect" style={{ borderRadius: 'var(--radius-pill)' }}>Browse Open Requests</Link>
          </div>
        }
      >
        {() => (
          <aside className="products-panel" style={{ padding: 'var(--space-6) var(--space-8)' }}>
            <ul className="products-list">
              {displayed.map((j) => {
                const firstItem = j.items?.[0];
                const isScheduled = j.status === 'scheduled';
                return (
                  <li key={j.id}>
                    <Link to={`/agent/jobs/${j.id}`} className="product-item product-item--link tap-effect">
                      <div className="product-item__left">
                        <div className="product-item__icon">
                          <DeviceIcon categoryCode={firstItem?.categoryCode} />
                        </div>
                        <div className="product-item__content">
                          <span className="product-item__title">
                            {itemsSummary(j.items)}
                          </span>
                          <span className="product-item__sub">
                            {j.wardName}
                            {isScheduled && ` • Visit: ${formatDate(j.scheduledFor)} (${WINDOW_LABELS[j.scheduledWindow] ?? 'Window'})`}
                            {j.collectedNetKg && ` • ${formatKg(j.collectedNetKg)}`}
                            {j.addressLine && ` • ${j.addressLine}`}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <StatusBadge map={PICKUP_STATUS} value={j.status} />
                        {isScheduled ? (
                          <span className="btn btn--primary btn--sm tap-effect" style={{ borderRadius: 'var(--radius-pill)' }}>
                            Collect &rarr;
                          </span>
                        ) : (
                          <span className="btn btn--secondary btn--sm">
                            View &rarr;
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
      </AsyncView>
    </div>
  );
}
