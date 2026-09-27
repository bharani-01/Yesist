import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, ErrorAlert } from '../../components/ui/Alert.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextField } from '../../components/ui/Field.jsx';
import { AuthLayout } from './AuthLayout.jsx';
import { HOME_BY_WORKSPACE, useAuth } from './AuthProvider.jsx';
import { DemoAccounts } from './DemoAccounts.jsx';

export function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  if (auth.status === 'authenticated') return <Navigate to={HOME_BY_WORKSPACE[auth.user.workspace] ?? '/'} replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
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
      title="Sign in"
      footer={<>
        <p>New to EcoSure? <Link to="/register">Create a citizen account</Link></p>
        <p><Link to="/verify">Verify a certificate</Link></p>
      </>}
    >
      <form className="form-grid" onSubmit={onSubmit} noValidate>
        {location.state?.expired && <Alert tone="warning">Your session ended. Sign in again to continue.</Alert>}
        <ErrorAlert error={error} />
        <TextField label="Email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Password" type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" block loading={pending}>Sign in</Button>
      </form>
      <DemoAccounts selectedEmail={form.email} onPick={(creds) => { setForm(creds); setError(null); }} />
    </AuthLayout>
  );
}
