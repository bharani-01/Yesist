import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AsyncView, ErrorState } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { StatusBadge } from '../../components/ui/Badge.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { UNIT_STATE } from '../../lib/status.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { JOURNEY_EVENT_LABELS, JOURNEY_STEPS, productsApi } from './products.api.js';

/** Public page behind every product QR label. Shows stages and dates only. */
export function ProductPage() {
  const { qr } = useParams();
  const query = useAsync((s) => productsApi.journey(qr, s), [qr]);
  if (query.status === 'error' && (query.error.status === 404 || query.error.status === 400)) {
    return (
      <div className="page">
        <PageHeader title="Product not found" />
        <Panel>
          <ErrorState error={{ status: 404, message: 'This QR label is not registered with EcoSure. Check that the whole label is visible, or report a suspicious label to the helpdesk.' }} />
        </Panel>
      </div>
    );
  }
  return (
    <div className="page">
      <AsyncView query={query} loadingRows={4}>{(product) => <Journey product={product} onChange={query.refresh} />}</AsyncView>
    </div>
  );
}

function Journey({ product, onChange }) {
  const title = product.brand ? `${product.brand} ${product.modelName}` : product.categoryName;
  const reached = new Set(product.events.map((e) => e.state));
  const current = [...JOURNEY_STEPS].reverse().find((s) => reached.has(s.key))?.key;
  const currentIndex = JOURNEY_STEPS.findIndex((s) => s.key === current);

  return (
    <>
      <PageHeader
        title={title}
        description={`${product.categoryName} · label ${product.qrPublicId}`}
        actions={<StatusBadge map={UNIT_STATE} value={product.state} />}
      />
      {product.state === 'disputed' && (
        <Alert tone="error" title="Missing from its lot">
          This product was expected in a sealed lot but was not found when the recycler checked the labels. The programme regulator has been alerted.
        </Alert>
      )}
      <div className="split">
        <div className="stack">
          <Panel title="Journey">
            <div className="stack">
              {/* Removed complex stepper by request */}
              {product.events.length ? (
                <ol className="timeline">
                  {product.events.map((e) => (
                    <li key={e.state} className="timeline__item">
                      <span className="timeline__dot" aria-hidden="true" style={e.state === 'disputed' ? { background: 'var(--color-danger)' } : undefined} />
                      <div>
                        <div>{JOURNEY_EVENT_LABELS[e.state] ?? e.state}</div>
                        <div className="subtle">{formatDate(e.on)}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : <p className="subtle">No recorded events yet.</p>}
            </div>
          </Panel>
          {product.attestationNumber && (
            <Alert tone="success" title="Responsibly Recycled ✓">
              Your device has been recycled by an authorised recycler.
              {' '}
              <Link to={`/devices/${product.qrPublicId}/certificate`} style={{ fontWeight: 600 }}>View your Recycling Certificate →</Link>
            </Alert>
          )}
        </div>
        <div className="stack">
          <OwnerPanel product={product} onChange={onChange} />
          <Panel title="About this page">
            <p className="subtle" style={{ margin: 0 }}>
              EcoSure tracks e-waste from sale to recycling under Madhya Pradesh’s programme. This page shows only stages and dates:
              never who handled the product, where it was, or who owns it.
            </p>
          </Panel>
        </div>
      </div>
    </>
  );
}

function OwnerPanel({ product, onChange }) {
  const auth = useAuth();
  const location = useLocation();
  const isCitizen = auth.user?.workspace === 'citizen';
  const devices = useAsync((s) => (isCitizen ? productsApi.myDevices(s) : Promise.resolve([])), [isCitizen]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const mine = devices.data?.some((d) => d.qrPublicId === product.qrPublicId);

  if (!product.registered) return null;
  if (auth.status === 'loading' || (isCitizen && devices.status === 'loading')) return null;

  const claim = async () => {
    setPending(true);
    setError(null);
    try {
      await productsApi.claim(product.qrPublicId);
      devices.refresh();
      onChange();
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  if (mine) {
    return (
      <Panel title="Your device">
        <div className="stack stack--sm">
          <p className="subtle" style={{ margin: 0 }}>You’re following this device. When you’re done with it, book a free doorstep pickup and give the collector this label to scan.</p>
          <div className="row">
            <Link to="/pickups/new" className="btn btn--primary btn--sm">Book a pickup</Link>
            <Link to="/devices" className="btn btn--ghost btn--sm">My devices</Link>
          </div>
        </div>
      </Panel>
    );
  }
  if (product.state !== 'placed_on_market') return null;
  if (!auth.user) {
    return (
      <Panel title="Is this your device?">
        <div className="stack stack--sm">
          <p className="subtle" style={{ margin: 0 }}>Sign in to follow it through collection and recycling.</p>
          <div><Link to="/login" state={{ from: location.pathname }} className="btn btn--secondary btn--sm">Sign in</Link></div>
        </div>
      </Panel>
    );
  }
  if (!isCitizen) return null;
  return (
    <Panel title="Is this your device?">
      <div className="stack stack--sm">
        <p className="subtle" style={{ margin: 0 }}>Claim it to follow its journey. Only you can see which devices you’ve claimed.</p>
        <ErrorAlert error={error} />
        <div><Button size="sm" onClick={claim} loading={pending}>This is my device</Button></div>
      </div>
    </Panel>
  );
}
