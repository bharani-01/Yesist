import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { UNIT_STATE } from '../../lib/status.js';
import { AddDeviceModal } from './AddDeviceModal.jsx';
import { productsApi } from './products.api.js';

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function MyDevicesPage() {
  const [showModal, setShowModal] = useState(false);
  const devices = useAsync((s) => productsApi.myDevices(s), []);

  const handleSuccess = () => {
    // Refresh the device list after a claim or manual registration
    devices.reload?.();
  };

  return (
    <div className="page">
      <PageHeader
        title="My devices"
        description="Devices you've claimed by scanning their EcoSure label. Follow each one from sale to recycling."
        actions={
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <PlusIcon />
            Add a device
          </Button>
        }
      />

      <Panel title="Claimed devices" flush>
        <AsyncView
          query={devices}
          isEmpty={(d) => !d.length}
          empty={
            <EmptyState
              title="No devices yet"
              text="Scan the EcoSure QR label on a phone, laptop, or appliance to claim it and follow its journey."
              action={
                <Button variant="secondary" onClick={() => setShowModal(true)}>
                  <PlusIcon />
                  Add a device
                </Button>
              }
            />
          }
        >
          {(rows) => (
            <ul className="list">
              {rows.map((d) => (
                <li key={d.qrPublicId ?? d.id}>
                  <Link to={d.qrPublicId ? `/p/${d.qrPublicId}` : '#'} className="list__item list__item--link">
                    {d.photoUrl && (
                      <img src={d.photoUrl} alt="" className="list__thumb" aria-hidden="true" />
                    )}
                    <div className="list__main">
                      <span className="list__title">
                        {d.brand ? `${d.brand} ${d.modelName ?? ''}`.trim() : d.categoryName ?? 'Device'}
                      </span>
                      <span className="list__meta">
                        <span>{d.categoryName}</span>
                        {d.claimedAt && <span>Claimed {formatDate(d.claimedAt)}</span>}
                        {d.qrPublicId && <span className="mono">…{d.qrPublicId.slice(-4)}</span>}
                        {/* Booking badge — shown when an active pickup exists for this device's category */}
                        {d.activePickupId && (
                          <Link
                            to={`/pickups/${d.activePickupId}`}
                            className="badge badge--warning"
                            onClick={e => e.stopPropagation()}
                            title={`Pickup ${d.activePickupStatus} · ${d.activePickupDate ?? ''}`}
                          >
                            📦 Booked for pickup
                          </Link>
                        )}
                      </span>
                    </div>
                    <StatusBadge map={UNIT_STATE} value={d.state ?? 'manual'} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </AsyncView>
      </Panel>

      {showModal && (
        <AddDeviceModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
