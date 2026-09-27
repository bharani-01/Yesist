import { Link, useNavigate } from 'react-router-dom';
import { AsyncView, EmptyState } from '../../components/feedback/AsyncView.jsx';
import { QrScanner } from '../../components/qr/QrScanner.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { UNIT_STATE } from '../../lib/status.js';
import { productsApi } from './products.api.js';

export function MyDevicesPage() {
  const navigate = useNavigate();
  const devices = useAsync((s) => productsApi.myDevices(s), []);

  return (
    <div className="page">
      <PageHeader title="My devices" description="Devices you’ve claimed by scanning their EcoSure label. Follow each one from sale to recycling." />
      <div className="split">
        <Panel title="Claimed devices" flush>
          <AsyncView
            query={devices}
            isEmpty={(d) => !d.length}
            empty={<EmptyState title="No devices yet" text="Scan the EcoSure QR label on a phone, laptop, or appliance to claim it and follow its journey." />}
          >
            {(rows) => (
              <ul className="list">
                {rows.map((d) => (
                  <li key={d.qrPublicId}>
                    <Link to={`/p/${d.qrPublicId}`} className="list__item list__item--link">
                      <div className="list__main">
                        <span className="list__title">{d.brand ? `${d.brand} ${d.modelName}` : d.categoryName}</span>
                        <span className="list__meta">
                          <span>{d.categoryName}</span>
                          <span>Claimed {formatDate(d.claimedAt)}</span>
                          <span className="mono">…{d.qrPublicId.slice(-4)}</span>
                        </span>
                      </div>
                      <StatusBadge map={UNIT_STATE} value={d.state} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </AsyncView>
        </Panel>
        <Panel title="Add a device">
          <QrScanner label="Scan the product label" onScan={(qr) => navigate(`/p/${qr}`)} />
        </Panel>
      </div>
    </div>
  );
}
