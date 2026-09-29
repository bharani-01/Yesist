import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { productsApi } from '../products/products.api.js';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate, formatInr, formatKg, WINDOW_LABELS } from '../../lib/format.js';
import { PICKUP_STATUS, UNIT_STATE } from '../../lib/status.js';
import { pickupsApi } from './pickups.api.js';

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

export function PickupsListPage() {
  const { user } = useAuth();
  const query = useAsync((signal) => pickupsApi.list(signal).then((r) => r.pickups), []);
  const devicesQuery = useAsync((signal) => productsApi.myDevices(signal), []);

  const pickups = query.data ?? [];
  const devices = devicesQuery.data ?? [];

  // Metrics computation strictly from real backend pickups
  const COLLECTED_STATUSES = new Set(['collected', 'in_lot', 'received', 'closed']);
  const completedPickups = pickups.filter((p) => COLLECTED_STATUSES.has(p.status));
  const activePickup = pickups.find((p) => p.status === 'requested' || p.status === 'scheduled');

  const totalPayout = completedPickups.reduce((acc, p) => acc + (Number(p.materialPaidAmount) || 0), 0);
  const totalMaterialsKg = completedPickups.reduce((acc, p) => acc + (Number(p.collectedNetKg) || 0), 0);
  const co2AvoidedKg = (totalMaterialsKg * 1.5).toFixed(1);

  // Dynamic SOTA Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const bookButton = (
    <Link to="/pickups/new" className="btn btn--primary tap-effect" style={{ borderRadius: 'var(--radius-pill)', padding: '12px 24px', fontWeight: 600 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Schedule Pickup
    </Link>
  );

  return (
    <div className="page">
      {/* Top Greeting with user's real full name */}
      <PageHeader
        title={user?.fullName ?? 'Citizen'}
        eyebrow={greeting}
        actions={bookButton}
      />

      {/* Main Dashboard Grid matching reference */}
      <div className="dashboard-grid">
        {/* Left Column: Financial Card, Active Manifest, History */}
        <div className="stack">
          {/* Hero Financial & Impact Card */}
          <section className="hero-impact-card" aria-label="Total Paid Amount and Impact">
            <div className="hero-impact-card__header">
              <span className="hero-impact-card__eyebrow">Total Paid Amount</span>
              <div className="hero-impact-card__amount">
                <span className="hero-impact-card__symbol">₹</span>
                <span>{totalPayout.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <Link to="/pickups/payouts" className="hero-impact-card__link tap-effect">
                <span>View payout history</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="hero-impact-card__divider" />

            <div className="hero-impact-card__substats">
              <div className="hero-substat">
                <span className="hero-substat__label">Materials Recovered</span>
                <div className="hero-substat__value">
                  <span>{totalMaterialsKg.toFixed(1)}</span>
                  <span className="hero-substat__unit">kg</span>
                </div>
              </div>
              <div className="hero-substat">
                <span className="hero-substat__label">CO₂ Avoided</span>
                <div className="hero-substat__value">
                  <span>{co2AvoidedKg}</span>
                  <span className="hero-substat__unit">kg</span>
                </div>
              </div>
            </div>
          </section>

          {/* Active Pickups / Live Tracking Widget */}
          <section className="manifest-card" aria-label="Active Pickups Status">
            <div className="manifest-card__header">
              <h3 className="manifest-card__title">Active Pickup</h3>
            </div>
            {activePickup ? (
              <div className="manifest-card__item tap-effect">
                <div className="manifest-card__info">
                  <div className="pulse-dot" />
                  <div>
                    <div className="manifest-card__ref">
                      Manifest: MF-{activePickup.reference}
                    </div>
                    <div className="manifest-card__status">
                      Status: {activePickup.status === 'scheduled' ? `Scheduled for ${formatDate(activePickup.scheduledFor)} (${WINDOW_LABELS[activePickup.scheduledWindow] ?? 'window'})` : `Requested for ${formatDate(activePickup.preferredDate)} (${WINDOW_LABELS[activePickup.preferredWindow] ?? 'window'})`}
                    </div>
                  </div>
                </div>
                <Link to={`/pickups/${activePickup.id}`} className="btn btn--secondary btn--sm tap-effect">
                  Track
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(229, 229, 234, 0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-ink-muted)' }}>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
                <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 500, margin: '0 0 4px' }}>No active pickups</h4>
                <p className="subtle" style={{ maxWidth: '280px', margin: '0 auto var(--space-4)' }}>Schedule a pickup to responsibly dispose of your e-waste.</p>
                <Link to="/pickups/new" className="btn btn--secondary btn--sm tap-effect">Schedule Now</Link>
              </div>
            )}
          </section>

          {/* Link to Dedicated History Page */}
          <Link to="/pickups/history" className="panel tap-effect" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-md)', margin: 0, color: 'var(--color-ink)' }}>Pickup History</h3>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-ink-subtle)' }}>View and manage all past requests</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Right Column: My Products, Quick Action Tiles, Nearest Drop-off */}
        <div className="stack">
          {/* My Products Panel */}
          <aside className="products-panel">
            <div className="products-panel__header">
              <h3 className="products-panel__title">My Products</h3>
              <Link to="/devices" className="btn-icon-add tap-effect" title="Claim / Scan New Device">
                +
              </Link>
            </div>

            <AsyncView
              query={devicesQuery}
              isEmpty={(d) => !d.length}
              empty={
                <div style={{ padding: 'var(--space-6) 0', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(229, 229, 234, 0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-ink-muted)' }}>
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 500, margin: '0 0 4px' }}>No products registered</h4>
                  <p className="subtle" style={{ margin: '0 0 var(--space-4)' }}>Add products you plan to recycle.</p>
                  <Link to="/devices" className="btn btn--secondary btn--sm tap-effect">Claim via QR</Link>
                </div>
              }
            >
              {(deviceItems) => (
                <ul className="products-list">
                  {deviceItems.map((d) => {
                    const srn = `SRN: ${d.qrPublicId.slice(-4).toUpperCase()}`;
                    return (
                      <li key={d.qrPublicId}>
                        <Link to={`/p/${d.qrPublicId}`} className="product-item product-item--link tap-effect">
                          <div className="product-item__left">
                            <div className="product-item__icon">
                              <DeviceIcon categoryCode={d.categoryCode} />
                            </div>
                            <div className="product-item__content">
                              <span className="product-item__title">
                                {d.brand ? `${d.brand} ${d.modelName}` : d.categoryName}
                              </span>
                              <span className="product-item__sub">
                                {d.typicalUnitKg ? `${d.typicalUnitKg} kg` : d.categoryName} • {srn}
                              </span>
                            </div>
                          </div>
                          {d.state !== 'claimed' && <StatusBadge map={UNIT_STATE} value={d.state} />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AsyncView>
          </aside>

          {/* Quick Action Tiles */}
          <div className="action-cards">
            <Link to="/devices" className="action-card action-card--dark tap-effect">
              <div>
                <h4 className="action-card__title">Add Product</h4>
                <p className="action-card__sub">Register a new device</p>
              </div>
              <div className="action-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </Link>

            <Link to="/pickups/new" className="action-card action-card--light tap-effect">
              <div>
                <h4 className="action-card__title">Home Pickup</h4>
                <p className="action-card__sub">Schedule collection</p>
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
          </div>

          {/* Nearest Drop-off / Regional Hub Widget */}
          <section className="dropoff-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <h3 className="dropoff-card__title" style={{ marginBottom: 0 }}>Nearest Drop-off</h3>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--color-ink-subtle)' }}>0.8 km</span>
            </div>
            <div className="dropoff-map tap-effect" style={{ padding: 0, position: 'relative', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0, pointerEvents: 'none', filter: 'contrast(1.1)' }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=75.8500%2C22.7100%2C75.8900%2C22.7300&amp;layer=mapnik&amp;marker=22.7200%2C75.8700" 
                title="Nearest Drop-off Hub"
                loading="lazy"
              ></iframe>
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'var(--color-surface)', padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600, boxShadow: 'var(--shadow-card)', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-brand)' }} />
                TechPark Hub
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

