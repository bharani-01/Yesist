import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ErrorState, LoadingState } from '../../components/feedback/AsyncView.jsx';
import { HOME_BY_WORKSPACE, useAuth } from './AuthProvider.jsx';

/** Route guard: unauthenticated → login (with return path); wrong workspace → forbidden state. */
export function RequireWorkspace({ workspace }) {
  const auth = useAuth();
  const location = useLocation();
  if (auth.status === 'loading') return <LoadingState />;
  if (auth.status === 'error') return <ErrorState error={auth.error} onRetry={auth.refresh} />;
  if (auth.status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname, expired: auth.sessionExpired }} />;
  }
  if (auth.user.workspace !== workspace) {
    const home = HOME_BY_WORKSPACE[auth.user.workspace];
    return <ErrorState error={{ status: 403 }} action={home && <Link className="btn btn--secondary" to={home}>Go to your workspace</Link>} />;
  }
  return <Outlet />;
}
