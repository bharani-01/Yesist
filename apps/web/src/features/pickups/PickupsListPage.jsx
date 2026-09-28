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
  const completedPickups = pickups.filter((p) => p.status === 'collected');
  const activePickup = pickups.find((p) => p.status === 'requested' || p.status === 'scheduled');

  const totalPayout = completedPickups.reduce((acc, p) => acc + (Number(p.materialPaidAmount) || 0), 0);
  const totalMaterialsKg = completedPickups.reduce((acc, p) => acc + (Number(p.collectedNetKg) || 0), 0);
  const co2AvoidedKg = (totalMaterialsKg * 1.5).toFixed(1);

  const bookButton = <Link to="/pickups/new" className="btn btn--primary">Book a pickup</Link>;

  return (
    <div className="page">
      {/* Top Greeting with user's real full name */}
      <PageHeader
        title={user?.fullName ?? 'Dashboard'}
        eyebrow="CITIZEN OVERVIEW"
        actions={bookButton}
      />

      {/* Main Dashboard Grid matching reference image */}
      <div className="dashboard-grid">
        {/* Center Stream */}
        <div className="stack">
          {/* Hero Impact Card */}
          <section className="hero-impact-card" aria-label="Available Payout and Impact">
            <div className="hero-impact-card__header">
              <span className="hero-impact-card__eyebrow">Available Payout</span>
              <div className="hero-impact-card__amount">
                <span className="hero-impact-card__symbol">₹</span>
                <span>{totalPayout.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <Link to="/pickups" className="hero-impact-card__link">
                <span>View payout history</span>
                <span>→</span>
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
          {activePickup && (
            <section className="manifest-card" aria-label="Active Pickups Status">
              <div className="manifest-card__header">
                <h3 className="manifest-card__title">Active Pickups</h3>
              </div>
              <div className="manifest-card__item">
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
                <Link to={`/pickups/${activePickup.id}`} className="btn btn--secondary btn--sm">
                  Track
                </Link>
              </div>
            </section>
          )}

          {/* All Pickups List Panel */}
          <Panel title="Pickup History" flush>
            <AsyncView
              query={query}
              isEmpty={(d) => d.length === 0}
              empty={<EmptyState title="No pickups yet" text="Book a doorstep pickup for old phones, laptops, appliances, and cables." action={bookButton} />}
            >
              {(items) => (
                <ul className="list">
                  {items.map((p) => (
                    <li key={p.id}>
                      <Link to={`/pickups/${p.id}`} className="list__item list__item--link">
                        <div className="list__main">
                          <span className="list__title">{p.categories ?? 'Pickup'}</span>
                          <span className="list__meta">
                            <span className="mono">{p.reference}</span>
                            <span>{p.wardName}</span>
                            <span>
                              {p.scheduledFor
                                ? `Scheduled ${formatDate(p.scheduledFor)} · ${WINDOW_LABELS[p.scheduledWindow]}`
                                : `Requested for ${formatDate(p.preferredDate)}`}
                            </span>
                            {p.collectedNetKg && <span>{formatKg(p.collectedNetKg)}</span>}
                            {p.materialPaidAmount && <span>{formatInr(p.materialPaidAmount)}</span>}
                          </span>
                        </div>
                        <StatusBadge map={PICKUP_STATUS} value={p.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AsyncView>
          </Panel>
        </div>

        {/* Right Side Panel: My Products / Claimed Devices from Real Backend */}
        <aside className="products-panel">
          <div className="products-panel__header">
            <h3 className="products-panel__title">My Products</h3>
            <Link to="/devices" className="btn-icon-add" title="Claim / Scan New Device">
              +
            </Link>
          </div>

          <AsyncView
            query={devicesQuery}
            isEmpty={(d) => !d.length}
            empty={
              <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                <p className="subtle" style={{ marginBottom: 'var(--space-3)' }}>No claimed devices yet.</p>
                <Link to="/devices" className="btn btn--secondary btn--sm">Claim via QR</Link>
              </div>
            }
          >
            {(deviceItems) => (
              <ul className="products-list">
                {deviceItems.map((d) => {
                  const srn = `SRN-${d.qrPublicId.slice(-4).toUpperCase()}`;
                  return (
                    <li key={d.qrPublicId}>
                      <Link to={`/p/${d.qrPublicId}`} className="product-item product-item--link">
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
                        <StatusBadge map={UNIT_STATE} value={d.state} />
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
  );
}

