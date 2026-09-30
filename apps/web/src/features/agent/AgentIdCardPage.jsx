import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import { Leaf, ShieldCheck, MapPin, Recycle, FileText, Ban, Calendar, ExternalLink } from 'lucide-react';
import './AgentIdCard.css';

export function AgentIdCardPage() {
  const { user } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  
  const org = user?.orgs?.find(o => ['local_shop', 'informal_collector', 'drop_point'].includes(o.type));
  const orgName = org?.name || 'Authorized Collector';

  // Calculate validity (1 year from now)
  const validityDate = new Date();
  validityDate.setFullYear(validityDate.getFullYear() + 1);
  const formattedValidity = validityDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  useEffect(() => {
    if (user?.userId) {
      const verificationUrl = `${window.location.origin}/verify/agent/${user.userId}`;
      QRCode.toDataURL(verificationUrl, { width: 120, margin: 1, color: { dark: '#0f172a', light: '#ffffff' } })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error(err));
    }
  }, [user?.userId]);

  return (
    <div className="id-card-page">
      <PageHeader
        title="Identity Card"
        eyebrow="COLLECTION AGENT"
      />
      
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Tap the card to flip
      </p>

      <div className={`id-card-scene ${isFlipped ? 'is-flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="id-card-inner">
          
          {/* ================= FRONT SIDE ================= */}
          <div className="id-card-front">
            <div className="front-bg-leaves"></div>
            
            <div className="front-content">
              <div className="hole-punch"></div>
              
              <div className="front-header">
                <div className="logo-group">
                  <Leaf className="logo-icon" fill="currentColor" />
                  <div className="logo-text">
                    <span className="logo-title">EcoSure</span>
                    <span className="logo-subtitle">Cleaner Earth<br/>Brighter Tomorrow</span>
                  </div>
                </div>
                <div className="header-badge">
                  E-WASTE<br/>RECYCLING<br/>PROGRAM
                </div>
              </div>

              <div className="auth-badge">
                <ShieldCheck size={16} />
                AUTHORIZED PARTNER
              </div>

              <div className="org-section">
                <div className="org-label">ORGANIZATION / SHOP</div>
                <div className="org-name">{orgName}</div>
              </div>

              <div className="agent-section">
                <div className="agent-avatar">
                  {user?.fullName?.charAt(0).toUpperCase() || 'S'}
                </div>
                <div className="agent-details">
                  <div className="agent-label">COLLECTOR AGENT</div>
                  <div className="agent-name">{user?.fullName || 'Agent Name'}</div>
                  <div className="agent-role">Official EcoSure Representative</div>
                </div>
              </div>

              <div className="bottom-grid">
                <div className="grid-list">
                  <div className="grid-item">
                    <div className="grid-icon"><Leaf size={16} fill="currentColor" /></div>
                    <div className="grid-text-wrap">
                      <span className="grid-label">Program</span>
                      <span className="grid-value">E-Waste Collection</span>
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="grid-icon"><MapPin size={16} fill="currentColor" /></div>
                    <div className="grid-text-wrap">
                      <span className="grid-label">Coverage</span>
                      <span className="grid-value">Local Only</span>
                    </div>
                  </div>
                  <div className="grid-item">
                    <div className="grid-icon"><ShieldCheck size={16} fill="currentColor" /></div>
                    <div className="grid-text-wrap">
                      <span className="grid-label">Status</span>
                      <span className="grid-value">Authorized Agent</span>
                    </div>
                  </div>
                </div>
                
                <div className="qr-container">
                  <div className="qr-box">
                    {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" className="qr-code-img" /> : null}
                  </div>
                  <div className="qr-hint">SCAN TO VERIFY IDENTITY</div>
                </div>
              </div>

              <div className="card-footer">
                <Leaf size={24} className="footer-icon" fill="currentColor" />
                <div className="footer-text">
                  This digital ID verifies that the bearer is an authorized
                  collection agent for the EcoSure e-waste recycling program.
                </div>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div className="id-card-back">
            <div className="back-header">
              <div className="back-header-bg"></div>
              
              <div className="logo-group back-logo-text">
                <Leaf className="logo-icon" style={{ color: '#a7f3d0' }} fill="currentColor" />
                <div className="logo-text">
                  <span className="logo-title">EcoSure</span>
                  <span className="logo-subtitle">Cleaner Earth<br/>Brighter Tomorrow</span>
                </div>
              </div>
              <div className="back-header-badge">
                E-WASTE<br/>RECYCLING<br/>PROGRAM
              </div>
              
              {/* Wavy bottom border */}
              <svg className="back-header-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#ffffff" fillOpacity="1" d="M0,256L80,240C160,224,320,192,480,186.7C640,181,800,203,960,224C1120,245,1280,267,1360,277.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
              </svg>
            </div>

            <div className="back-guidelines">
              <div className="back-section-title">GUIDELINES</div>
              
              <div className="guideline-item">
                <div className="guideline-icon"><Recycle size={18} /></div>
                <div className="guideline-text">Collect and hand over e-waste as per EcoSure program guidelines.</div>
              </div>
              
              <div className="guideline-item">
                <div className="guideline-icon"><FileText size={18} /></div>
                <div className="guideline-text">Maintain proper records of collected items.</div>
              </div>
              
              <div className="guideline-item">
                <div className="guideline-icon"><Ban size={18} /></div>
                <div className="guideline-text">Do not deal with hazardous or non-permitted waste items.</div>
              </div>
              
              <div className="guideline-item">
                <div className="guideline-icon"><ShieldCheck size={18} /></div>
                <div className="guideline-text">Follow all local rules and EcoSure standards.</div>
              </div>
            </div>

            <div className="back-meta-grid">
              <div className="meta-block">
                <div className="meta-label">ISSUED BY</div>
                <div className="meta-value">EcoSure Program</div>
                <div className="meta-sub">Authorized Partner Network</div>
              </div>
              <div className="meta-block">
                <div className="meta-label">VALIDITY</div>
                <div className="validity-row">
                  <Calendar size={14} color="#64748b" />
                  <span className="meta-value" style={{ fontSize: '0.85rem' }}>{formattedValidity}</span>
                </div>
              </div>
            </div>

            <div className="back-footer">
              <div className="verify-box">
                <div className="verify-qr">
                  {qrCodeUrl ? <img src={qrCodeUrl} alt="QR Code" /> : null}
                </div>
                <div className="verify-text-group">
                  <div className="verify-title">Verify this ID</div>
                  <div className="verify-desc">Scan the QR code to verify the agent details with EcoSure.</div>
                  <div className="verify-link">
                    ECOSURE.IN/VERIFY <ExternalLink size={12} />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <Link to="/agent" className="btn btn--secondary">Back to Dashboard</Link>
    </div>
  );
}
