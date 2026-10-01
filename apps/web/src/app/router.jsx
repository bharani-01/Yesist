import { createBrowserRouter, Navigate } from 'react-router-dom';
import { EmptyState, LoadingState } from '../components/feedback/AsyncView.jsx';
import { AppShell } from '../components/layout/AppShell.jsx';
import { AgentHomePage } from '../features/agent/AgentHomePage.jsx';
import { AgentRequestsPage } from '../features/agent/AgentRequestsPage.jsx';
import { AgentPickupsPage } from '../features/agent/AgentPickupsPage.jsx';
import { AgentLotsPage } from '../features/agent/AgentLotsPage.jsx';
import { AgentIdCardPage } from '../features/agent/AgentIdCardPage.jsx';
import { JobDetailPage } from '../features/agent/JobDetailPage.jsx';
import { HOME_BY_WORKSPACE, useAuth } from '../features/auth/AuthProvider.jsx';
import { HubLotDetailPage } from '../features/hub/HubLotDetailPage.jsx';
import { HubLotsPage } from '../features/hub/HubLotsPage.jsx';
import { ShipmentDetailPage } from '../features/hub/ShipmentDetailPage.jsx';
import { ShipmentsPage } from '../features/hub/ShipmentsPage.jsx';
import { LoginPage } from '../features/auth/LoginPage.jsx';
import { RegisterPage } from '../features/auth/RegisterPage.jsx';
import { RequireWorkspace } from '../features/auth/RequireWorkspace.jsx';
import { OversightPage } from '../features/oversight/OversightPage.jsx';
import { WhatsAppAdminPage } from '../features/oversight/WhatsAppAdminPage.jsx';
import { NewPickupPage } from '../features/pickups/NewPickupPage.jsx';
import { PickupDetailPage } from '../features/pickups/PickupDetailPage.jsx';
import { PickupsListPage } from '../features/pickups/PickupsListPage.jsx';
import { PickupsHistoryPage } from '../features/pickups/PickupsHistoryPage.jsx';
import { PayoutHistoryPage } from '../features/pickups/PayoutHistoryPage.jsx';
import { BatchDetailPage } from '../features/producer/BatchDetailPage.jsx';
import { BatchesPage } from '../features/producer/BatchesPage.jsx';
import { LabelsPage } from '../features/producer/LabelsPage.jsx';
import { ModelsPage } from '../features/producer/ModelsPage.jsx';
import { ProducerOverviewPage } from '../features/producer/ProducerOverviewPage.jsx';
import { UnitsPage } from '../features/producer/UnitsPage.jsx';
import { MyDevicesPage } from '../features/products/MyDevicesPage.jsx';
import { ProductPage } from '../features/products/ProductPage.jsx';
import { CertificatePage } from '../features/products/CertificatePage.jsx';
import { InboundLotsPage } from '../features/recycler/InboundLotsPage.jsx';
import { LotDetailPage } from '../features/recycler/LotDetailPage.jsx';
import { VerifyPage } from '../features/verify/VerifyPage.jsx';
import { VerifyAgentPage } from '../features/verify/VerifyAgentPage.jsx';

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
      { path: 'verify/agent/:id', element: <VerifyAgentPage /> },
      { path: 'p/:qr', element: <ProductPage /> },
      {
        element: <RequireWorkspace workspace="citizen" />,
        children: [
          { path: 'devices', element: <MyDevicesPage /> },
          { path: 'devices/:qr/certificate', element: <CertificatePage /> },
          { path: 'pickups', element: <PickupsListPage /> },
          { path: 'pickups/history', element: <PickupsHistoryPage /> },
          { path: 'pickups/payouts', element: <PayoutHistoryPage /> },
          { path: 'pickups/new', element: <NewPickupPage /> },
          { path: 'pickups/:id', element: <PickupDetailPage /> },
        ],
      },
      {
        element: <RequireWorkspace workspace="agent" />,
        children: [
          { path: 'agent', element: <AgentHomePage /> },
          { path: 'agent/requests', element: <AgentRequestsPage /> },
          { path: 'agent/pickups', element: <AgentPickupsPage /> },
          { path: 'agent/lots', element: <AgentLotsPage /> },
          { path: 'agent/jobs/:id', element: <JobDetailPage /> },
          { path: 'agent/id-card', element: <AgentIdCardPage /> },
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
        element: <RequireWorkspace workspace="hub" />,
        children: [
          { path: 'hub', element: <HubLotsPage /> },
          { path: 'hub/lots/:id', element: <HubLotDetailPage /> },
          { path: 'hub/shipments', element: <ShipmentsPage /> },
          { path: 'hub/shipments/:id', element: <ShipmentDetailPage /> },
        ],
      },
      {
        element: <RequireWorkspace workspace="producer" />,
        children: [
          { path: 'producer', element: <ProducerOverviewPage /> },
          { path: 'producer/models', element: <ModelsPage /> },
          { path: 'producer/batches', element: <BatchesPage /> },
          { path: 'producer/batches/:id', element: <BatchDetailPage /> },
          { path: 'producer/batches/:id/labels', element: <LabelsPage /> },
          { path: 'producer/units', element: <UnitsPage /> },
        ],
      },
      {
        element: <RequireWorkspace workspace="oversight" />,
        children: [
          { path: 'oversight', element: <OversightPage /> },
          { path: 'oversight/whatsapp', element: <WhatsAppAdminPage /> }
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
