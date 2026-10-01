import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, WINDOW_LABELS } from '../../lib/format.js';
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

export function AgentRequestsPage() {
  const query = useAsync((s) => agentApi.openJobs(s).then((r) => r.jobs), []);
  const [wardFilter, setWardFilter] = useState('');

  const jobs = query.data ?? [];
  const wards = [...new Set(jobs.map((j) => j.wardName).filter(Boolean))];
  const filtered = wardFilter ? jobs.filter((j) => j.wardName === wardFilter) : jobs;

  return (
    <div className="page">
      <PageHeader
        title="Open Requests"
        eyebrow="CITIZEN BOOKINGS IN YOUR WARD"
        actions={
          <Link to="/agent/pickups" className="btn btn--secondary tap-effect" style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
            View My Pickups &rarr;
          </Link>
        }
      />

      {/* Ward Filter Toolbar */}
      {wards.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Filter by ward:
          </span>
          <div className="agent-filter-tabs">
            <button 
              type="button" 
              className={`agent-filter-btn ${!wardFilter ? 'is-active' : ''}`}
              onClick={() => setWardFilter('')}
            >
              All Wards ({jobs.length})
            </button>
            {wards.map((w) => (
              <button 
                key={w}
                type="button" 
                className={`agent-filter-btn ${wardFilter === w ? 'is-active' : ''}`}
                onClick={() => setWardFilter(w)}
              >
                {w} ({jobs.filter((j) => j.wardName === w).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Requests List */}
      <AsyncView
        query={query}
        isEmpty={(d) => !d.length}
        empty={
          <div className="panel" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-6)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(229, 229, 234, 0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-ink-muted)' }}>
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 6px' }}>
              No open requests in your area
            </h3>
            <p className="subtle" style={{ maxWidth: '360px', margin: '0 auto var(--space-4)' }}>
              You are completely caught up. New citizen pickup requests will automatically appear here as soon as they are booked.
            </p>
            <Link to="/agent" className="btn btn--secondary btn--sm tap-effect">Back to Dashboard</Link>
          </div>
        }
      >
        {() => (
          <aside className="products-panel" style={{ padding: 'var(--space-6) var(--space-8)' }}>
            <ul className="products-list">
              {filtered.map((j) => {
                const firstItem = j.items?.[0];
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
                            {j.wardName} • Preferred: {formatDate(j.preferredDate)} ({WINDOW_LABELS[j.preferredWindow] ?? 'Window'}) • MF-{j.reference}
                          </span>
                        </div>
                      </div>
                      <span className="btn btn--primary btn--sm tap-effect" style={{ borderRadius: 'var(--radius-pill)' }}>
                        Review & Accept &rarr;
                      </span>
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
