import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import './AgentIdCard.css';

export function AgentIdCardPage() {
  const { user } = useAuth();
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  // Find the agent organization
  const org = user?.orgs?.find(o => ['local_shop', 'informal_collector', 'drop_point'].includes(o.type));

  useEffect(() => {
    if (user?.userId) {
      // Create a URL pointing to the verification page
      const verificationUrl = `${window.location.origin}/verify/agent/${user.userId}`;
      QRCode.toDataURL(verificationUrl, { width: 120, margin: 1, color: { dark: '#0f172a', light: '#ffffff' } })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error(err));
    }
  }, [user?.userId]);

  return (
    <div className="page">
      <PageHeader
        title="Identity Card"
        eyebrow="COLLECTION AGENT"
      />
      <div className="id-card-container">
        <div className="id-card">
          <div className="id-card__header">
            <div className="id-card__logo-area">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 5.99-5.11a2 2 0 0 1 2.72-.28c.51.36 1.02.72 1.54 1.08C17 2 19 4 20 6a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              <span>Trusted by EcoSure</span>
            </div>
            <div className="id-card__status">Authorized Partner</div>
          </div>
          
          <div className="id-card__body">
            <div className="id-card__org-section">
              <div className="id-card__label">Organization / Shop</div>
              <div className="id-card__org-name">{org?.name || 'Authorized Collector'}</div>
              {org?.idCardNumber && <div className="id-card__org-id">ID: {org.idCardNumber}</div>}
            </div>

            <div className="id-card__agent-section">
              <div className="id-card__profile-pic">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>
              <div className="id-card__agent-details">
                <div className="id-card__label">Collector Agent</div>
                <div className="id-card__agent-name">{user?.fullName}</div>
                <div className="id-card__agent-role">Official EcoSure Representative</div>
              </div>
            </div>
            
            <div className="id-card__qr-section">
              {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="Verify Agent QR Code" className="id-card__qr-code" />
              ) : (
                <div className="id-card__qr-placeholder">Generating QR...</div>
              )}
              <div className="id-card__qr-hint">Scan to verify identity</div>
            </div>
          </div>
          
          <div className="id-card__footer">
            <div className="id-card__footer-text">
              This digital ID verifies that the bearer is an authorized collection agent for the EcoSure e-waste recycling program.
            </div>
          </div>
        </div>
        
        <div className="id-card-actions" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Link to="/agent" className="btn btn--secondary">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
