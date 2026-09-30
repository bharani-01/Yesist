import { useParams, Link } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { http } from '../../lib/http.js';
import { formatDate } from '../../lib/format.js';

function CertBadge() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#e8f5e9" stroke="#34a853" strokeWidth="2" />
      <path d="M20 32l8 8 16-16" stroke="#34a853" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CertificatePage() {
  const { qr } = useParams();
  const query = useAsync(
    (signal) => http.get(`/devices/${encodeURIComponent(qr)}/certificate`, { signal }).then((r) => r.certificate),
    [qr],
  );

  return (
    <div className="page" style={{ maxWidth: 560, margin: '0 auto' }}>
      <AsyncView query={query}>
        {(cert) => (
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl, 20px)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            {/* Green header band */}
            <div style={{
              background: 'linear-gradient(135deg, #1a7f4b 0%, #34a853 100%)',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-3)',
              color: '#fff',
            }}>
              <CertBadge />
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                  Recycling Certificate
                </h1>
                <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: 'var(--text-sm)' }}>
                  EcoSure Responsible E-Waste Recycling
                </p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-md)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                backdropFilter: 'blur(8px)',
              }}>
                {cert.certNumber}
              </div>
            </div>

            {/* Certificate body */}
            <div style={{ padding: 'var(--space-6)' }}>
              <p style={{
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-ink-subtle)',
                margin: '0 0 var(--space-5)',
                lineHeight: 1.6,
              }}>
                This certifies that the following device has been collected and
                responsibly recycled in accordance with E-Waste (Management) Rules, 2022.
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
                <tbody>
                  {[
                    { label: 'Certificate No.', value: cert.certNumber, mono: true },
                    { label: 'Device', value: [cert.brand, cert.modelName].filter(Boolean).join(' ') || cert.categoryName },
                    { label: 'Category', value: cert.categoryName },
                    { label: 'Device ID', value: cert.qrPublicId, mono: true },
                    { label: 'Recycled on', value: formatDate(cert.issuedAt) },
                    { label: 'Recycled by', value: cert.recyclerName || '—' },
                    { label: 'Reg. No.', value: cert.registrationNo || '—', mono: true },
                  ].map(({ label, value, mono }) => (
                    <tr key={label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{
                        padding: '10px 12px',
                        width: '38%',
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--color-ink-subtle)',
                        verticalAlign: 'middle',
                        background: 'var(--color-surface-raised, #f7f8fa)',
                      }}>{label}</td>
                      <td style={{
                        padding: '10px 14px',
                        fontWeight: 500,
                        color: 'var(--color-ink)',
                        fontFamily: mono ? 'var(--font-mono)' : undefined,
                        verticalAlign: 'middle',
                      }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{
                marginTop: 'var(--space-5)',
                padding: 'var(--space-3) var(--space-4)',
                background: '#e8f5e9',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}>
                <span style={{ color: '#34a853', fontSize: 18, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 'var(--text-sm)', color: '#1a7f4b', fontWeight: 500 }}>
                  Verified responsible recycling — your device will not end up in a landfill.
                </span>
              </div>

              <div style={{ marginTop: 'var(--space-5)', display: 'flex', gap: 'var(--space-3)' }}>
                <Link to="/products" className="btn btn--secondary tap-effect" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                  ← My Devices
                </Link>
                <button
                  className="btn btn--primary tap-effect"
                  style={{ flex: 1 }}
                  onClick={() => window.print()}
                >
                  Download / Print
                </button>
              </div>

              <p style={{
                textAlign: 'center',
                fontSize: '0.7rem',
                color: 'var(--color-ink-subtle)',
                marginTop: 'var(--space-4)',
                lineHeight: 1.5,
              }}>
                Certificate No. {cert.certNumber} · Issued {formatDate(cert.issuedAt)}<br />
                This certificate is for the device owner's records only.
              </p>
            </div>
          </div>
        )}
      </AsyncView>
    </div>
  );
}

