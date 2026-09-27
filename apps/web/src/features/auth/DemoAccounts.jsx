import { useEffect, useState } from 'react';
import { authApi } from './auth.api.js';

/**
 * Local demo helper. Renders only when the API explicitly enables demo login
 * (never in production); picking an account fills the sign-in form.
 */
export function DemoAccounts({ onPick, selectedEmail }) {
  const [demo, setDemo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    authApi.demoAccounts(controller.signal).then(setDemo).catch(() => setDemo(null));
    return () => controller.abort();
  }, []);

  if (!demo?.accounts?.length) return null;

  return (
    <section className="demo-accounts" aria-labelledby="demo-accounts-title">
      <div className="demo-accounts__header">
        <h2 id="demo-accounts-title" className="demo-accounts__title">Demo accounts</h2>
        <span className="demo-accounts__hint">Local test data only</span>
      </div>
      <ul className="demo-accounts__list">
        {demo.accounts.map((a) => (
          <li key={a.email}>
            <button
              type="button"
              className="demo-accounts__item"
              aria-pressed={selectedEmail === a.email}
              onClick={() => onPick({ email: a.email, password: demo.password })}
            >
              <span className="demo-accounts__label">{a.label}</span>
              <span className="demo-accounts__email">{a.email}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
