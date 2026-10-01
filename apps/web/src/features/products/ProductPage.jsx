import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AsyncView, ErrorState } from '../../components/feedback/AsyncView.jsx';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDate } from '../../lib/format.js';
import { useAuth } from '../auth/AuthProvider.jsx';
import { JOURNEY_EVENT_LABELS, JOURNEY_STEPS, productsApi } from './products.api.js';
import { QrCode } from '../../components/qr/QrCode.jsx';

function CertificateIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

/** Helper to load either a manufacturer QR unit or a citizen-registered manual device */
async function fetchProductJourneyOrDevice(targetIdOrQr, signal) {
  if (!targetIdOrQr) {
    const error = new Error('Device identifier missing');
    error.status = 404;
    throw error;
  }

  // Check if target is a UUID (manual device ID format)
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(targetIdOrQr);

  // If not a UUID, try public product journey first
  if (!isUuid) {
    try {
      const product = await productsApi.journey(targetIdOrQr, signal);
      if (product) return product;
    } catch (err) {
      if (err.status !== 404 && err.status !== 400) {
        throw err;
      }
    }
  }

  // Look up from citizen's claimed / manual devices
  try {
    const myDevices = await productsApi.myDevices(signal);
    const match = myDevices?.find(
      (d) =>
        (d.id && String(d.id).toLowerCase() === String(targetIdOrQr).toLowerCase()) ||
        (d.qrPublicId && String(d.qrPublicId).toLowerCase() === String(targetIdOrQr).toLowerCase())
    );

    if (match) {
      const isRecycled = match.isRecycled || match.status === 'recycled';
      const events = [
        {
          state: 'registered',
          on: match.claimedAt || match.updatedAt || new Date().toISOString(),
        },
      ];
      if (isRecycled) {
        events.push({
          state: 'processed',
          on: match.recycledAt || match.updatedAt || new Date().toISOString(),
        });
      }

      return {
        qrPublicId: match.qrPublicId || match.id,
        brand: match.brand || '',
        modelName: match.modelName || '',
        categoryName: match.categoryName || 'Electronic Device',
        categoryCode: match.categoryCode || null,
        registered: true,
        claimed: true,
        state: isRecycled ? 'processed' : (match.status === 'in_transit' ? 'collected' : 'placed_on_market'),
        attestationNumber: match.certNumber || null,
        photoUrl: match.photoUrl || null,
        isManual: !match.qrPublicId,
        condition: match.condition || null,
        claimedAt: match.claimedAt,
        recycledAt: match.recycledAt,
        events,
      };
    }
  } catch {
    // If not authenticated or cannot load devices, fall through to 404
  }

  const error = new Error('This device or QR label is not registered with EcoSure.');
  error.status = 404;
  throw error;
}

/** Public page behind every product QR label. Shows product specifications, lifecycle journey, and verification details. */
export function ProductPage() {
  const { qr, id } = useParams();
  const targetQr = qr || id;
  const query = useAsync((s) => fetchProductJourneyOrDevice(targetQr, s), [targetQr]);
  if (query.status === 'error' && (query.error.status === 404 || query.error.status === 400)) {
    return (
      <div className="page">
        <PageHeader
          back={{ to: '/devices', label: 'My Products' }}
          title="Product not found"
        />
        <Panel>
          <ErrorState error={{ status: 404, message: 'This device or QR label is not registered with EcoSure. Check that the whole label is visible, or report a suspicious label to the helpdesk.' }} />
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
  const title = [product.brand, product.modelName].filter(Boolean).join(' ') || product.categoryName || 'Device';
  const isRecycled = product.state === 'processed' || Boolean(product.attestationNumber);

  return (
    <div className="stack stack--lg">
      <PageHeader
        back={{ to: '/devices', label: 'My Products' }}
        title={title}
        eyebrow={product.isManual ? 'Personal Device Registry' : 'Device Passport & Details'}
        description={`${product.categoryName} · ${product.isManual ? 'Registry ID' : 'Digital Passport ID'}: ${product.qrPublicId}`}
      />

      {product.state === 'disputed' && (
        <Alert tone="error" title="Missing from its lot">
          This product was expected in a sealed lot but was not found when the recycler checked the labels. The programme regulator has been alerted.
        </Alert>
      )}

      {isRecycled && (
        <Alert tone="success" title="Responsibly Recycled">
          This device has been processed and safely recycled with zero-landfill diversion.
          {product.attestationNumber && (
            <>
              {' '}
              <Link to={`/devices/${product.qrPublicId}/certificate`} style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CertificateIcon />
                View Recycling Certificate
              </Link>
            </>
          )}
        </Alert>
      )}

      <div className="split">
        {/* Left Column: Details & Journey */}
        <div className="stack">
          {/* Detailed Specifications Panel */}
          <Panel title="Product Specifications">
            <dl className="kv-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-4)',
              margin: 0
            }}>
              <div>
                <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Brand</dt>
                <dd style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--color-ink)', margin: '4px 0 0' }}>{product.brand || '—'}</dd>
              </div>
              <div>
                <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Model</dt>
                <dd style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--color-ink)', margin: '4px 0 0' }}>{product.modelName || '—'}</dd>
              </div>
              <div>
                <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Category</dt>
                <dd style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--color-ink)', margin: '4px 0 0' }}>{product.categoryName}</dd>
              </div>
              <div>
                <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{product.isManual ? 'Registry ID' : 'Passport ID'}</dt>
                <dd style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-ink)', margin: '4px 0 0' }}>{product.qrPublicId}</dd>
              </div>
              <div>
                <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Lifecycle Status</dt>
                <dd style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: isRecycled ? '#1a7f4b' : 'var(--color-ink)', margin: '4px 0 0' }}>
                  {isRecycled ? 'Responsibly Recycled' : (JOURNEY_EVENT_LABELS[product.state] ?? product.state)}
                </dd>
              </div>
              <div>
                <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>CPCB Compliance</dt>
                <dd style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#1a7f4b', margin: '4px 0 0' }}>EPR Aligned</dd>
              </div>
              {product.photoUrl && (
                <div style={{ gridColumn: '1 / -1', marginTop: 'var(--space-2)' }}>
                  <dt style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Device Photo</dt>
                  <dd style={{ margin: '8px 0 0' }}>
                    <img
                      src={product.photoUrl}
                      alt={title}
                      style={{ maxWidth: '240px', maxHeight: '180px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', objectFit: 'cover' }}
                    />
                  </dd>
                </div>
              )}
            </dl>
          </Panel>

          {/* Journey Lifecycle Timeline Panel */}
          <Panel title="Lifecycle Journey">
            <div className="stack">
              {product.events && product.events.length ? (
                <ol className="timeline">
                  {product.events.map((e, idx) => (
                    <li key={`${e.state}-${idx}`} className="timeline__item">
                      <span className="timeline__dot" aria-hidden="true" style={e.state === 'disputed' ? { background: 'var(--color-danger)' } : undefined} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                          {product.isManual && e.state === 'registered' ? 'Added to Personal Registry' : (JOURNEY_EVENT_LABELS[e.state] ?? e.state)}
                        </div>
                        <div className="subtle">{formatDate(e.on)}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : <p className="subtle">No recorded events yet.</p>}
            </div>
          </Panel>
        </div>

        {/* Right Column: QR Code & Actions */}
        <div className="stack">
          {/* Owner Console */}
          <OwnerPanel product={product} onChange={onChange} />

          {/* Live Passport QR Code Panel */}
          <Panel title={product.isManual ? 'Device Digital Tag' : 'Digital Passport QR'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div style={{ background: '#FFFFFF', padding: 8, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'inline-flex' }}>
                <QrCode value={`${window.location.origin}/devices/${product.qrPublicId}`} label={`QR for ${title}`} size={96} />
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-muted)', margin: '0 0 8px', lineHeight: 1.5 }}>
                  Scan with any smartphone camera to inspect this official zero-landfill verification record.
                </p>
                <span className="mono" style={{ fontSize: '11px', background: 'var(--color-surface-muted)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--color-border)' }}>
                  {product.qrPublicId}
                </span>
              </div>
            </div>
          </Panel>

          {/* Regulatory Information */}
          <Panel title="About This Passport">
            <p className="subtle" style={{ margin: 0, fontSize: 'var(--text-xs)', lineHeight: 1.6 }}>
              EcoSure tracks electronic assets from manufacturing to authorized zero-landfill destruction under state pollution control directives. Personal details and locations remain confidential.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function OwnerPanel({ product, onChange }) {
  const auth = useAuth();
  const location = useLocation();
  const isCitizen = auth.user?.workspace === 'citizen';
  const devices = useAsync((s) => (isCitizen ? productsApi.myDevices(s) : Promise.resolve([])), [isCitizen]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const mine = product.isManual || devices.data?.some((d) =>
    (d.qrPublicId && d.qrPublicId === product.qrPublicId) ||
    (d.id && d.id === product.qrPublicId)
  );

  if (!product.registered && !product.isManual) return null;
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
      <Panel title="Your Registered Device">
        <div className="stack stack--sm">
          <p className="subtle" style={{ margin: 0, fontSize: 'var(--text-xs)', lineHeight: 1.5 }}>
            This device is registered to your account. When you are ready to dispose of it, schedule a certified doorstep pickup to earn Green Points.
          </p>
          <div className="row" style={{ marginTop: 'var(--space-2)' }}>
            <Link to="/pickups/new" className="btn btn--primary btn--sm tap-effect">Book a Pickup</Link>
            <Link to="/devices" className="btn btn--secondary btn--sm tap-effect">Back to Products</Link>
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
