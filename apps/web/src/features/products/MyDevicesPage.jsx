import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { AddDeviceModal } from './AddDeviceModal.jsx';
import { productsApi } from './products.api.js';

// ── Icons (Pure SVG - Strictly No Emojis) ───────────────────────────────────

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--color-ink-muted)', flexShrink: 0 }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────

export function MyDevicesPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'recycled' | 'all'

  const devicesQuery = useAsync((s) => productsApi.myDevices(s), []);
  const allDevices = devicesQuery.data ?? [];

  const handleSuccess = () => {
    devicesQuery.reload?.();
  };

  // Partition devices
  const activeDevices = useMemo(() => {
    return allDevices.filter((d) => !d.isRecycled && d.status !== 'recycled');
  }, [allDevices]);

  const recycledDevices = useMemo(() => {
    return allDevices.filter((d) => d.isRecycled || d.status === 'recycled');
  }, [allDevices]);

  const displayedDevices = useMemo(() => {
    if (activeTab === 'active') return activeDevices;
    if (activeTab === 'recycled') return recycledDevices;
    return allDevices;
  }, [activeTab, activeDevices, recycledDevices, allDevices]);

  const certifiedCount = useMemo(() => {
    return recycledDevices.filter((d) => Boolean(d.certNumber)).length;
  }, [recycledDevices]);

  return (
    <div className="page">
      <PageHeader
        title="My Products"
        eyebrow="Electronics Inventory"
        description="Track your electronics throughout their lifecycle, schedule doorstep recycling pickups, and access verified recycling certificates."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <Link to="/pickups/new" className="btn btn--secondary tap-effect">
              Schedule pickup
            </Link>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <PlusIcon />
              Add a device
            </Button>
          </div>
        }
      />


      {/* Main List Panel */}
      <Panel flush>
        {/* Custom Panel Header with Tabs */}
        <div style={{
          padding: 'var(--space-5) var(--space-6)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)'
        }}>
          {/* Tabs */}
          <div className="segmented" role="tablist" aria-label="Device status filter">
            <label>
              <input
                type="radio"
                name="deviceTab"
                value="active"
                checked={activeTab === 'active'}
                onChange={() => setActiveTab('active')}
              />
              <span>Active Devices ({activeDevices.length})</span>
            </label>
            <label>
              <input
                type="radio"
                name="deviceTab"
                value="recycled"
                checked={activeTab === 'recycled'}
                onChange={() => setActiveTab('recycled')}
              />
              <span>Past Recycled ({recycledDevices.length})</span>
            </label>
            <label>
              <input
                type="radio"
                name="deviceTab"
                value="all"
                checked={activeTab === 'all'}
                onChange={() => setActiveTab('all')}
              />
              <span>All ({allDevices.length})</span>
            </label>
          </div>

          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)' }}>
            Showing {displayedDevices.length} {displayedDevices.length === 1 ? 'device' : 'devices'}
          </div>
        </div>

        <AsyncView
          query={devicesQuery}
          isEmpty={() => displayedDevices.length === 0}
          empty={
            activeTab === 'recycled' ? (
              <EmptyState
                title="No recycled devices yet"
                text="When you recycle devices through EcoSure authorised pickups, they will appear here along with your official zero-landfill certificates."
                action={
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <Button variant="secondary" onClick={() => setActiveTab('active')}>
                      View active devices
                    </Button>
                    <Link to="/pickups/new" className="btn btn--primary tap-effect">
                      Schedule a pickup
                    </Link>
                  </div>
                }
              />
            ) : activeTab === 'active' ? (
              <EmptyState
                title="No active devices"
                text="You have no active devices in your inventory. Add a phone, laptop, or appliance to track it and schedule recycling pickups."
                action={
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    <PlusIcon />
                    Add a device
                  </Button>
                }
              />
            ) : (
              <EmptyState
                title="No devices yet"
                text="Add devices to your profile to track lifecycle stages, schedule hassle-free doorstep pickups, and earn green rewards."
                action={
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    <PlusIcon />
                    Add a device
                  </Button>
                }
              />
            )
          }
        >
          {() => (
            <ul className="list" style={{ margin: 0, padding: 0 }}>
              {displayedDevices.map((d) => {
                const isRecycled = d.isRecycled || d.status === 'recycled';
                const name = [d.brand, d.modelName].filter(Boolean).join(' ') || d.categoryName || 'Device';
                const idOrQr = d.qrPublicId || d.id;
                const targetUrl = `/devices/${idOrQr}`;

                return (
                  <li key={idOrQr} style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <Link
                      to={targetUrl}
                      className="device-item-row tap-effect"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-4) var(--space-6)',
                        borderBottom: '1px solid var(--color-border)',
                        gap: 'var(--space-4)',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'background 120ms ease',
                        cursor: 'pointer'
                      }}
                    >
                      {/* Device info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 240, flex: '1 1 auto' }}>
                        <span style={{ fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--color-ink)' }}>
                          {name}
                        </span>

                        {/* Meta line */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', flexWrap: 'wrap' }}>
                          <span>{d.categoryName}</span>
                          {d.claimedAt && <span>Added {formatDate(d.claimedAt)}</span>}
                          {isRecycled && d.recycledAt && (
                            <span style={{ color: '#1a7f4b', fontWeight: 500 }}>
                              Recycled on {formatDate(d.recycledAt)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions Right */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        {isRecycled && d.qrPublicId && (
                          <span
                            role="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.location.href = `/devices/${d.qrPublicId}/certificate`;
                            }}
                            className="btn btn--sm btn--primary tap-effect"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            <CertificateIcon />
                            View Certificate
                          </span>
                        )}
                        <ChevronRight />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </AsyncView>
      </Panel>

      {/* Add Device Modal */}
      {showModal && (
        <AddDeviceModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
