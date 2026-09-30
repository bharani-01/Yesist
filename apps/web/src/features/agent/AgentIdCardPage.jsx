import QRCode from 'qrcode';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';
import './AgentIdCard.css';
import { Leaf, ShieldCheck, MapPin, Recycle, FileText, Ban, Calendar, ExternalLink } from 'lucide-react';

// Generates the smooth SVG wave for the back header
const WaveSvg = () => (
  <svg className="back-header-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
    <path
      fill="#ffffff"
      fillOpacity="1"
      d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,42.7,960,53,1080,53.3C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
    />
  </svg>
);

const LeafLogoSvg = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.5 2C13.91 2 10.5 4 8 6.5C4 10.5 2 16.5 2 20.5C2 21.33 2.67 22 3.5 22C4.33 22 5 21.33 5 20.5C5 18 6.5 15.5 8 13.5C8.83 12.39 10.02 11.45 11.23 10.67C11.64 12.63 12.56 14.47 14 16C17 19 22 20 22 20C22 20 22 14.5 19 11.5C18.17 10.67 17.15 10 16 9.5C15.82 8.5 15.65 7.5 15.6 6.5C15.42 3 16 2 17.5 2ZM6.42 20.53C6.67 21 6.84 21.5 7.21 21.84C7.57 22.18 8.04 22 8.54 22L7.38 19.38C7.15 19 6.88 18.66 6.59 18.35L6.42 20.53Z" />
  </svg>
);

// Elegant background watermark SVG for the front card
const FrontBgWatermark = () => (
  <svg className="front-bg-svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M410 -20C320 50 400 200 480 250C560 300 450 450 350 500C250 550 400 650 450 700" stroke="#f0fdf4" strokeWidth="80" strokeLinecap="round" opacity="0.6"/>
    <path d="M-50 450C50 350 -50 200 -100 150" stroke="#f0fdf4" strokeWidth="60" strokeLinecap="round" opacity="0.6"/>
  </svg>
);


export function AgentIdCardPage() {
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
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
      <div className="w-full max-w-[360px] mb-6 flex justify-between items-center px-1">
        <Link to="/agent" className="text-emerald-600 font-medium flex items-center hover:underline">
          &larr; Back to Dashboard
        </Link>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Tap card to flip</span>
      </div>

      <div 
        className={`id-card-scene ${isFlipped ? 'is-flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="id-card-inner">
          
          {/* ================= FRONT ================= */}
          <div className="id-card-front">
            <FrontBgWatermark />
            
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
          <div className="id-card-back">
            <div className="back-header">
              <div className="back-header-bg"></div>
              
              <div className="back-hole-punch"></div>
              
              <div className="logo-group back-logo-text">
                <LeafLogoSvg className="logo-icon" />
                <div className="logo-text">
                  <span className="logo-title">EcoSure</span>
                  <span className="logo-subtitle">Collection Agent</span>
                </div>
              </div>
              <div className="back-header-badge">
                DIGITAL<br/>ID CARD<br/>BACK
              </div>
              
              <WaveSvg />
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
    </div>
  );
}
