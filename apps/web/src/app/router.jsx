import { createBrowserRouter, Navigate } from 'react-router-dom';
import { EmptyState, LoadingState } from '../components/feedback/AsyncView.jsx';
import { AppShell } from '../components/layout/AppShell.jsx';
import { AgentHomePage } from '../features/agent/AgentHomePage.jsx';
import { JobDetailPage } from '../features/agent/JobDetailPage.jsx';
import { HOME_BY_WORKSPACE, useAuth } from '../features/auth/AuthProvider.jsx';
import { LoginPage } from '../features/auth/LoginPage.jsx';
import { RegisterPage } from '../features/auth/RegisterPage.jsx';
import { RequireWorkspace } from '../features/auth/RequireWorkspace.jsx';
import { OversightPage } from '../features/oversight/OversightPage.jsx';
import { NewPickupPage } from '../features/pickups/NewPickupPage.jsx';
import { PickupDetailPage } from '../features/pickups/PickupDetailPage.jsx';
import { PickupsListPage } from '../features/pickups/PickupsListPage.jsx';
import { InboundLotsPage } from '../features/recycler/InboundLotsPage.jsx';
import { LotDetailPage } from '../features/recycler/LotDetailPage.jsx';
import { VerifyPage } from '../features/verify/VerifyPage.jsx';

function HomeRedirect() {
  const auth = useAuth();
  if (auth.status === 'loading') return <LoadingState />;
  if (auth.status !== 'authenticated') return <Navigate to="/login" replace />;
  return <Navigate to={HOME_BY_WORKSPACE[auth.user.workspace] ?? '/verify'} replace />;
}

function NotFoundPage() {
  return <EmptyState title="Page not found" text="The link may be outdated. Use the navigation above to continue." />;
}

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <AppShell />,
    children: [
      { index: true, element: <HomeRedirect /> },
      { path: 'verify', element: <VerifyPage /> },
      { path: 'verify/:number', element: <VerifyPage /> },
      {
        element: <RequireWorkspace workspace="citizen" />,
        children: [
          { path: 'pickups', element: <PickupsListPage /> },
          { path: 'pickups/new', element: <NewPickupPage /> },
          { path: 'pickups/:id', element: <PickupDetailPage /> },
        ],
      },
      {
        element: <RequireWorkspace workspace="agent" />,
        children: [
          { path: 'agent', element: <AgentHomePage /> },
          { path: 'agent/jobs/:id', element: <JobDetailPage /> },
        ],
      },
      {
        element: <RequireWorkspace workspace="recycler" />,
        children: [
          { path: 'recycler', element: <InboundLotsPage /> },
          { path: 'recycler/lots/:id', element: <LotDetailPage /> },
        ],
      },
      {
        element: <RequireWorkspace workspace="oversight" />,
        children: [{ path: 'oversight', element: <OversightPage /> }],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
