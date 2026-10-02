import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatInr, formatKg, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS } from '../../lib/status.js';
import { agentApi } from './agent.api.js';
import { LotsPanel } from './components/LotsPanel.jsx';
import { WalkInIntakeModal } from './components/WalkInIntakeModal.jsx';

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

export function AgentHomePage() {
  const { user } = useAuth();
  
  const open = useAsync((s) => agentApi.openJobs(s).then((r) => r.jobs), []);
  const mine = useAsync((s) => agentApi.myJobs(s).then((r) => r.jobs), []);

  const openList = open.data ?? [];
  const myJobsList = mine.data ?? [];

  const scheduledJobs = myJobsList.filter((j) => j.status === 'scheduled');
  const collectedJobs = myJobsList.filter((j) => j.status === 'collected');
  const totalCollectedKg = myJobsList.reduce((acc, j) => acc + (Number(j.collectedNetKg) || 0), 0);
  const totalPayout = myJobsList.reduce((acc, j) => acc + (Number(j.materialPaidAmount) || 0), 0);

  const activeJob = scheduledJobs[0] || openList[0];

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const displayName = user?.fullName ?? user?.orgs?.[0]?.name ?? 'Collection Partner';

  const [showWalkInModal, setShowWalkInModal] = useState(false);

  const headerActions = (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      <button 
        type="button" 
        className="btn btn--primary tap-effect" 
        style={{
          borderRadius: 'var(--radius-pill)',
          padding: '12px 20px',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}
        onClick={() => setShowWalkInModal(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Walk-in Intake
      </button>
      <Link 
        to="/agent/id-card" 
        className="btn btn--secondary tap-effect" 
        style={{ borderRadius: 'var(--radius-pill)', padding: '12px 20px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
        Agent ID Card
      </Link>
    </div>
  );

  return (
    <div className="page">
      {/* Top Greeting */}
      <PageHeader
        title={displayName}
        eyebrow={greeting}
        actions={headerActions}
      />

      {/* 2-Column Dashboard Grid Matching Citizen Page */}
      <div className="dashboard-grid">
        {/* Left Column: Financial & Weight Impact, Quick Action Cards, Active Task */}
        <div className="stack">
          {/* Hero Weight & Impact Card */}
          <section className="hero-impact-card" aria-label="Total Collected and Payouts">
            <div className="hero-impact-card__header">
              <span className="hero-impact-card__eyebrow">Total E-Waste Collected</span>
              <div className="hero-impact-card__amount">
                <span>{totalCollectedKg.toFixed(1)}</span>
                <span className="hero-impact-card__symbol" style={{ fontSize: '1.4rem', marginLeft: '6px' }}>kg</span>
              </div>
              <Link 
                to="/agent/lots" 
                className="hero-impact-card__link tap-effect"
              >
                <span>Packed Bags &amp; Dispatches</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="hero-impact-card__divider" />

            <div className="hero-impact-card__substats">
              <div className="hero-substat">
                <span className="hero-substat__label">Customer Payouts</span>
                <div className="hero-substat__value">
                  <span style={{ fontSize: '0.88rem', marginRight: '2px' }}>₹</span>
                  <span>{totalPayout.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="hero-substat">
                <span className="hero-substat__label">Completed Pickups</span>
                <div className="hero-substat__value">
                  <span>{collectedJobs.length}</span>
                  <span className="hero-substat__unit">pickups</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Action Tiles */}
          <div className="action-cards">
            <Link 
              to="/agent/requests"
              className="action-card action-card--light tap-effect"
            >
              <div>
                <h4 className="action-card__title">Open Requests</h4>
                <p className="action-card__sub">{openList.length} waiting in your ward</p>
              </div>
              <div className="action-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
              </div>
            </Link>

            <Link 
              to="/agent/pickups"
              className="action-card action-card--light tap-effect"
            >
              <div>
                <h4 className="action-card__title">My Pickups</h4>
                <p className="action-card__sub">{scheduledJobs.length} visits scheduled</p>
              </div>
              <div className="action-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-5.5a1.5 1.5 0 0 0-.44-1.06L18.5 7.38A1.5 1.5 0 0 0 17.44 7H14" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setShowWalkInModal(true)}
              className="action-card action-card--light tap-effect"
              style={{ textAlign: 'left', font: 'inherit', cursor: 'pointer' }}
            >
              <div>
                <h4 className="action-card__title">Walk-in Intake</h4>
                <p className="action-card__sub">Counter drop-off</p>
              </div>
              <div className="action-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
            </button>
          </div>

          {/* Active Job / Live Task Widget */}
          <section className="manifest-card" aria-label="Active Pickup Assignment">
            <div className="manifest-card__header">
              <h3 className="manifest-card__title">Active Job</h3>
              {activeJob && (
                <span className="badge badge--info" style={{ fontSize: '0.72rem' }}>
                  {activeJob.status === 'scheduled' ? 'Scheduled Visit' : 'Open Request'}
                </span>
              )}
            </div>
            {activeJob ? (
              <div className="manifest-card__item tap-effect">
                <div className="manifest-card__info">
                  <div className="pulse-dot" />
                  <div>
                    <div className="manifest-card__ref">
                      Manifest: MF-{activeJob.reference}
                    </div>
                    <div className="manifest-card__status">
                      {activeJob.status === 'scheduled' 
                        ? `Scheduled: ${formatDate(activeJob.scheduledFor)} (${WINDOW_LABELS[activeJob.scheduledWindow] ?? 'Window'})` 
                        : `Open Request: ${formatDate(activeJob.preferredDate)} (${WINDOW_LABELS[activeJob.preferredWindow] ?? 'Window'})`}
                      {' • '}{activeJob.wardName || 'Indore'}
                      {activeJob.itemsSummary && ` • ${activeJob.itemsSummary}`}
                    </div>
                  </div>
                </div>
                <Link to={`/agent/jobs/${activeJob.id}`} className="btn btn--primary btn--sm tap-effect" style={{ borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
                  {activeJob.status === 'scheduled' ? 'Collect & Weigh \u2192' : 'Review & Accept \u2192'}
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(229, 229, 234, 0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-ink-muted)' }}>
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 500, margin: '0 0 4px' }}>All caught up!</h4>
                <p className="subtle" style={{ maxWidth: '280px', margin: '0 auto var(--space-4)' }}>No urgent pickups pending in your queue.</p>
                <Link to="/agent/requests" className="btn btn--secondary btn--sm tap-effect">Browse Open Requests</Link>
              </div>
            )}
          </section>

          {/* Sealed Lots Shortcut Panel */}
          <Link 
            to="/agent/lots" 
            className="panel tap-effect" 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-md)', margin: 0, color: 'var(--color-ink)' }}>Packed Bags &amp; Dispatches</h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-subtle)' }}>
                  {collectedJobs.length > 0 ? `${collectedJobs.length} collected pickups ready to pack &amp; dispatch` : 'View and track all packed bags &amp; dispatches'}
                </p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Right Column: Recent Activity & Assigned Pickups */}
        <div className="stack">
          <aside className="products-panel">
            <div className="products-panel__header">
              <h3 className="products-panel__title">Assigned Pickups</h3>
              <Link to="/agent/pickups" className="btn-icon-add tap-effect" title="View all pickups" style={{ fontSize: '13px', width: 'auto', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
                View all &rarr;
              </Link>
            </div>

            <AsyncView
              query={mine}
              isEmpty={(d) => !d.length}
              empty={
                <div style={{ padding: 'var(--space-8) 0', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(229, 229, 234, 0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-ink-muted)' }}>
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                      <path d="M15 18H9" />
                      <path d="M19 18h2a1 1 0 0 0 1-1v-5.5a1.5 1.5 0 0 0-.44-1.06L18.5 7.38A1.5 1.5 0 0 0 17.44 7H14" />
                      <circle cx="7" cy="18" r="2" />
                      <circle cx="17" cy="18" r="2" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 500, margin: '0 0 4px' }}>No assigned pickups</h4>
                  <p className="subtle" style={{ margin: '0 0 var(--space-4)' }}>Accept an open request from your ward.</p>
                  <Link to="/agent/requests" className="btn btn--secondary btn--sm tap-effect">Find Requests</Link>
                </div>
              }
            >
              {(jobs) => (
                <ul className="products-list">
                  {jobs.slice(0, 5).map((j) => {
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
                                {j.wardName}
                                {j.status === 'scheduled' && ` • Visit: ${formatDate(j.scheduledFor)}`}
                                {j.collectedNetKg && ` • ${formatKg(j.collectedNetKg)}`}
                              </span>
                            </div>
                          </div>
                          <StatusBadge map={PICKUP_STATUS} value={j.status} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AsyncView>
          </aside>
        </div>
      </div>

      <WalkInIntakeModal
        isOpen={showWalkInModal}
        onClose={() => setShowWalkInModal(false)}
        onSuccess={() => {
          mine.reload();
          open.reload();
        }}
      />
    </div>
  );
}


