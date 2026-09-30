import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { ErrorState, LoadingState } from '../../components/feedback/AsyncView.jsx';

export function VerifyAgentPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/reference/agent/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setAgent(data);
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') {
    return <LoadingState text="Verifying agent identity..." />;
  }

  if (status === 'error') {
    return (
      <div className="page">
        <PageHeader title="Verification Failed" />
        <ErrorState 
          title="Agent Not Found" 
          text="We could not verify this collection agent. Please ensure you scanned the correct QR code."
        />
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/" className="btn btn--primary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: '#dcfce7', 
          color: '#16a34a',
          marginBottom: '1rem'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a', margin: '0' }}>Verified Collector</h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.875rem' }}>This person is authorized to collect e-waste on behalf of EcoSure.</p>
      </div>

      <Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>Organization / Shop</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginTop: '0.25rem' }}>{agent.orgName}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' }}>Agent Name</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginTop: '0.25rem' }}>{agent.fullName}</div>
          </div>
        </div>
      </Panel>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link to="/" className="btn btn--secondary" style={{ width: '100%' }}>Go to EcoSure Home</Link>
      </div>
    </div>
  );
}
