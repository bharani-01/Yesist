import { useState } from 'react';
import { ErrorAlert } from '../../../components/ui/Alert.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Panel } from '../../../components/ui/Panel.jsx';
import { formatDateTime } from '../../../lib/format.js';
import { pickupsApi } from '../pickups.api.js';

/** The code is shown once per generation; only its hash is stored on the server. */
export function HandoverCodePanel({ pickupId, lastExpiresAt, onIssued }) {
  const [issued, setIssued] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setPending(true);
    setError(null);
    try {
      const result = await pickupsApi.handoverCode(pickupId);
      setIssued(result);
      onIssued?.();
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <Panel title="Handover code">
      <div className="stack stack--sm">
        {issued ? (
          <>
            <div className="code-display" aria-live="polite" aria-label={`Handover code ${issued.code.split('').join(' ')}`}>{issued.code}</div>
            <p className="subtle">Valid until {formatDateTime(issued.expiresAt)}. Share it only after your items are weighed. Generating a new code cancels this one.</p>
          </>
        ) : (
          <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
            Generate the code when the Kabadi Wala is at your door. It confirms the handover and makes your incentive eligible.
            {lastExpiresAt && <> A code was generated earlier (valid until {formatDateTime(lastExpiresAt)}); a new one replaces it.</>}
          </p>
        )}
        <ErrorAlert error={error} />
        <Button variant={issued ? 'secondary' : 'primary'} onClick={generate} loading={pending}>
          {issued ? 'Generate a new code' : 'Show handover code'}
        </Button>
      </div>
    </Panel>
  );
}
