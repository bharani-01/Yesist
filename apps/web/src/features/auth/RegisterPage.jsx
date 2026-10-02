import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorAlert } from '../../components/ui/Alert.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { TextField } from '../../components/ui/Field.jsx';
import { AuthLayout } from './AuthLayout.jsx';
import { HOME_BY_WORKSPACE, useAuth } from './AuthProvider.jsx';

export function RegisterPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRef = (searchParams.get('ref') || '').toUpperCase();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', referralCode: initialRef });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const fieldErrors = error?.fieldErrors?.() ?? {};

  if (auth.status === 'authenticated') return <Navigate to={HOME_BY_WORKSPACE[auth.user.workspace] ?? '/'} replace />;

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      await auth.register(form);
      navigate('/pickups', { replace: true });
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Indore's digital e-waste recycling and circular rewards program."
      footer={<p>Already registered? <Link to="/login">Sign in &rarr;</Link></p>}
    >
      <form className="form-grid" onSubmit={onSubmit} noValidate>
        {error && !Object.keys(fieldErrors).length && <ErrorAlert error={error} />}
        <TextField label="Full name" autoComplete="name" required value={form.fullName} onChange={set('fullName')} error={fieldErrors.fullName} />
        <TextField label="Email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} error={fieldErrors.email} />
        <TextField label="Mobile number" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} required value={form.phone} onChange={set('phone')} error={fieldErrors.phone} hint="10 digits, used for pickup coordination" />
        <TextField label="Password" type="password" autoComplete="new-password" required minLength={10} value={form.password} onChange={set('password')} error={fieldErrors.password} hint="At least 10 characters" />
        <TextField
          label="Referral code (optional)"
          value={form.referralCode}
          onChange={(e) => setForm({ ...form, referralCode: e.target.value.toUpperCase() })}
          placeholder="ECO-XXXXX"
          hint={form.referralCode ? 'Bonus points will be unlocked on your first completed pickup!' : 'Have a friend’s invite code? Enter it here to earn bonus points.'}
        />
        <Button type="submit" block loading={pending}>Create account</Button>
        <p className="subtle">We never ask for Aadhaar. Your address is shared only with the Kabadi Wala who accepts your pickup.</p>
      </form>
    </AuthLayout>
  );
}
