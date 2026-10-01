import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { AuthLayout } from './AuthLayout.jsx';
import { HOME_BY_WORKSPACE, useAuth } from './AuthProvider.jsx';
import { DemoAccounts } from './DemoAccounts.jsx';

export function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  if (auth.status === 'authenticated') {
    return <Navigate to={HOME_BY_WORKSPACE[auth.user.workspace] ?? '/'} replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setPending(true);
    setError(null);
    try {
      const user = await auth.login(form);
      const from = location.state?.from;
      navigate(from && from !== '/login' ? from : HOME_BY_WORKSPACE[user.workspace] ?? '/', { replace: true });
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your dashboard, attestations, and custody chain."
      sidebar={
        <DemoAccounts
          selectedEmail={form.email}
          onPick={(creds) => {
            setForm(creds);
            setError(null);
          }}
        />
      }
      footer={
        <>
          <div>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--color-brand)' }}>
              Create citizen account &rarr;
            </Link>
          </div>
          <div>
            <Link to="/verify" style={{ color: 'var(--color-ink-muted)', fontSize: '0.82rem' }}>
              Verify an attestation certificate &rarr;
            </Link>
          </div>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate>
        {location.state?.expired && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Alert tone="warning">Your session has expired. Please sign in again to continue.</Alert>
          </div>
        )}

        {error && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <ErrorAlert error={error} />
          </div>
        )}

        {/* Email Field */}
        <div className="auth-field">
          <label className="auth-field__label" htmlFor="login-email">
            Email address
          </label>
          <div className="auth-field__control">
            <span className="auth-field__icon">
              <Mail size={18} />
            </span>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@ecosure.test"
              className="auth-field__input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="auth-field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="auth-field__label" htmlFor="login-password" style={{ margin: 0 }}>
              Password
            </label>
          </div>
          <div className="auth-field__control">
            <span className="auth-field__icon">
              <Lock size={18} />
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              className="auth-field__input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              className="auth-field__toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="auth-submit-btn" disabled={pending}>
          {pending ? (
            <span className="spinner" style={{ width: '18px', height: '18px' }}></span>
          ) : (
            <>
              <span>Sign in to Portal</span>
              <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
