import QRCode from 'qrcode';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import './AgentIdCard.css';
import { Leaf, ShieldCheck, MapPin, Recycle, FileText, Ban, Calendar, ExternalLink } from 'lucide-react';

const LeafLogoSvg = ({ className }) => (
  <Leaf className={className} fill="currentColor" strokeWidth={1} />
);


export function AgentIdCardPage() {
  const { user } = useAuth();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');

  const orgNameMain = useMemo(() => {
    let main = user?.orgs?.[0]?.name || 'EcoSure Partner';
    // Remove "(local only)" entirely
    return main.replace(/\(local only\)/gi, '').trim();
  }, [user]);

  // Generate QR code for the public verification endpoint
  useEffect(() => {
    if (user?.userId) {
      const verificationUrl = `${window.location.origin}/verify/agent/${user.userId}`;
      QRCode.toDataURL(verificationUrl, {
        width: 400,
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' }
      }).then(setQrCodeDataUrl);
    }
  }, [user]);

  // Calculate 1 Year Validity
  const validUntil = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }, []);

  if (!user) return <div className="p-4 text-center">Loading ID...</div>;

  return (
    <div className="id-card-page">
      <div className="top-nav-bar">
        <Link to="/agent" className="back-btn">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="cards-container">
        
        {/* ================= FRONT ================= */}
        <div className="id-card-face id-card-front">
          <div className="front-content">
              <div className="hole-punch-container">
                <div className="hole-punch"></div>
              </div>

              <div className="front-header">
                <div className="logo-group">
                  <LeafLogoSvg className="logo-icon" />
                  <div className="logo-text">
                    <span className="logo-title">EcoSure</span>
                    <span className="logo-subtitle">Cleaner Earth<br/>Brighter Tomorrow</span>
                  </div>
                </div>
                <div className="header-badge">
                  E-WASTE<br/>RECYCLING<br/>PROGRAM
                </div>
              </div>

              <div className="org-section" style={{ marginTop: '16px' }}>
                <div className="org-label">ORGANIZATION / SHOP</div>
                <div className="org-name">
                  {orgNameMain}
                </div>
              </div>

              <div className="agent-section">
                <div className="agent-avatar">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="agent-details">
                  <div className="agent-label">COLLECTOR AGENT</div>
                  <div className="agent-name">{user.fullName}</div>
                  <div className="agent-role">Official EcoSure Representative</div>
                </div>
              </div>

              <div className="bottom-grid">
                <div className="grid-list">
                  <div className="grid-item">
                    <div className="grid-icon"><Leaf size={14} strokeWidth={2.5} /></div>
                    <div className="grid-text-wrap">
                      <div className="grid-label">PROGRAM</div>
                      <div className="grid-value">E-Waste Collection</div>
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="grid-icon"><MapPin size={14} strokeWidth={2.5} /></div>
                    <div className="grid-text-wrap">
                      <div className="grid-label">COVERAGE</div>
                      <div className="grid-value">Local Only</div>
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="grid-icon"><ShieldCheck size={14} strokeWidth={2.5} /></div>
                    <div className="grid-text-wrap">
                      <div className="grid-label">STATUS</div>
                      <div className="grid-value">Authorized Agent</div>
                    </div>
                  </div>
                </div>
                
                <div className="qr-container">
                  <div className="qr-box">
                    {qrCodeDataUrl ? (
                      <img src={qrCodeDataUrl} alt="QR Code" className="qr-code-img" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center">...</div>
                    )}
                  </div>
                  <div className="qr-hint">SCAN TO VERIFY</div>
                </div>
              </div>

              <div className="card-footer">
                <LeafLogoSvg className="footer-icon" />
                <div className="footer-text">
                  This digital ID verifies that the bearer is an authorized collection agent for the EcoSure e-waste recycling program.
                </div>
              </div>
            </div>
        </div>

        {/* ================= BACK ================= */}
        <div className="id-card-face id-card-back">
          <div className="back-header">
              
              <div className="back-hole-punch"></div>
              
              <div className="logo-group">
                <LeafLogoSvg className="logo-icon" />
                <div className="logo-text">
                  <span className="logo-title">EcoSure</span>
                  <span className="logo-subtitle">Collection Agent</span>
                </div>
              </div>
              <div className="back-header-badge">
                DIGITAL<br/>ID CARD<br/>BACK
              </div>
            </div>

            <div className="back-guidelines">
              <div className="back-section-title">AUTHORIZED ACTIVITIES</div>
              
              <div className="guideline-item">
                <div className="guideline-icon"><Recycle size={14} /></div>
                <div className="guideline-text">Collect authorized e-waste from citizens</div>
              </div>
              <div className="guideline-item">
                <div className="guideline-icon"><FileText size={14} /></div>
                <div className="guideline-text">Log collections using the EcoSure app</div>
              </div>
              <div className="guideline-item">
                <div className="guideline-icon"><ShieldCheck size={14} /></div>
                <div className="guideline-text">Maintain safe storage standards</div>
              </div>
              <div className="guideline-item">
                <div className="guideline-icon"><Ban size={14} /></div>
                <div className="guideline-text">Do not dismantle items locally</div>
              </div>
            </div>

            <div className="back-meta-grid">
              <div className="meta-block">
                <div className="meta-label">ID Number</div>
                <div className="meta-value font-mono text-sm tracking-tight">{user.userId.split('-')[0].toUpperCase()}</div>
              </div>
              <div className="meta-block">
                <div className="meta-label">Valid Until</div>
                <div className="validity-row">
                  <Calendar size={12} className="text-emerald-600" />
                  <span className="meta-value text-emerald-700">{validUntil}</span>
                </div>
              </div>
            </div>

            <div className="back-footer">
              <div className="verify-box">
                <div className="verify-qr">
                  {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="Verify QR" />}
                </div>
                <div className="verify-text-group">
                  <div className="verify-title">Verify Identity</div>
                  <div className="verify-desc">Scan the QR code to verify this agent's real-time authorization status.</div>
                  <div className="verify-link">
                    ecosure.gov.in/verify <ExternalLink size={10} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}
