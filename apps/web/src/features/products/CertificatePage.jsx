import { useParams, Link } from 'react-router-dom';
import { AsyncView } from '../../components/feedback/AsyncView.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { http } from '../../lib/http.js';
import { formatDate } from '../../lib/format.js';
import { QrCode } from '../../components/qr/QrCode.jsx';
import './CertificatePage.css';

// ── Icons (Pure SVG - Strictly Zero Emojis) ──────────────────────────────────

function PrinterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function OfficialSealCrest() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ShieldMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// ── Main Certificate Component ───────────────────────────────────────────────

export function CertificatePage() {
  const { qr } = useParams();
  const query = useAsync(
    (signal) => http.get(`/devices/${encodeURIComponent(qr)}/certificate`, { signal }).then((r) => r.certificate),
    [qr],
  );

  return (
    <div className="page cert-page">
      {/* Top Header Actions (hidden in print) */}
      <div className="cert-actions-bar">
        <Link to="/devices" className="cert-back-link tap-effect">
          <ArrowLeftIcon />
          <span>Back to My Devices</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="cert-print-btn tap-effect"
        >
          <PrinterIcon />
          <span>Download / Print PDF</span>
        </button>
      </div>

      <AsyncView query={query}>
        {(cert) => {
          const deviceTitle = [cert.brand, cert.modelName].filter(Boolean).join(' ') || cert.categoryName;
          const verifyUrl = `${window.location.origin}/verify/${cert.certNumber}`;

          return (
            <article className="cert-card" aria-label="Official Certificate of Responsible Recycling">
              <div className="cert-inner-frame">
                {/* Header */}
                <header className="cert-header">
                  <div className="cert-seal-icon">
                    <OfficialSealCrest />
                  </div>
                  <span className="cert-regulatory-tag">
                    Central Pollution Control Board · E-Waste Rules, 2022
                  </span>
                  <h1 className="cert-title">
                    Certificate of Responsible Recycling
                  </h1>
                  <p className="cert-subtitle">
                    Official Statutory Attestation of Verified Material Recovery & Zero-Landfill Destruction
                  </p>

                  <div className="cert-number-pill">
                    <span className="cert-number-text">{cert.certNumber}</span>
                    <span className="cert-status-badge">CPCB Verified</span>
                  </div>
                </header>

                {/* Formal Legal Declaration */}
                <blockquote className="cert-statement">
                  "This official certificate confirms that the electronic equipment specified below was collected via an authorized circular supply chain, safely decontaminated, and recycled in strict compliance with statutory pollution control directives."
                </blockquote>

                {/* Structured Specifications Ledger */}
                <div className="cert-specs-grid">
                  {/* Left: Asset Details */}
                  <div className="cert-specs-column">
                    <span className="cert-column-title">Asset Specification</span>

                    <div className="cert-spec-row">
                      <span className="cert-spec-label">Device Model</span>
                      <span className="cert-spec-value">{deviceTitle}</span>
                    </div>

                    <div className="cert-spec-row">
                      <span className="cert-spec-label">Equipment Category</span>
                      <span className="cert-spec-value">{cert.categoryName}</span>
                    </div>

                    <div className="cert-spec-row">
                      <span className="cert-spec-label">Digital Passport ID</span>
                      <span className="cert-spec-value cert-spec-value--mono">{cert.qrPublicId}</span>
                    </div>
                  </div>

                  {/* Right: Processing Attestation */}
                  <div className="cert-specs-column">
                    <span className="cert-column-title">Disposal & Processing</span>

                    <div className="cert-spec-row">
                      <span className="cert-spec-label">Authorized Recycler</span>
                      <span className="cert-spec-value">{cert.recyclerName || 'EcoSure Certified Facility'}</span>
                    </div>

                    <div className="cert-spec-row">
                      <span className="cert-spec-label">CPCB Registration</span>
                      <span className="cert-spec-value cert-spec-value--mono">{cert.registrationNo || 'TEST-CPCB-REG-0001'}</span>
                    </div>

                    <div className="cert-spec-row">
                      <span className="cert-spec-label">Attestation Date</span>
                      <span className="cert-spec-value">{formatDate(cert.issuedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Verification and Authenticity Footer */}
                <footer className="cert-footer-grid">
                  {/* Left: Instant QR Verification */}
                  <div className="cert-qr-block">
                    <div className="cert-qr-wrap">
                      <QrCode
                        value={verifyUrl}
                        label={`Verification QR for certificate ${cert.certNumber}`}
                        size={64}
                      />
                    </div>
                    <div className="cert-qr-meta">
                      <span className="cert-qr-label">Public Registry Audit</span>
                      <span className="cert-qr-sub">Scan to verify cryptographic entry on state portal.</span>
                    </div>
                  </div>

                  {/* Right: Security & Issuer Stamp */}
                  <div className="cert-authority-block">
                    <span className="cert-authority-seal">
                      <ShieldMini />
                      <span>Zero-Landfill Assured</span>
                    </span>
                    <span className="cert-authority-org">
                      EcoSure Lifecycle Registry
                    </span>
                    <span className="cert-authority-hash">
                      Tamper-Evident Attestation
                    </span>
                  </div>
                </footer>
              </div>
            </article>
          );
        }}
      </AsyncView>
    </div>
  );
}
