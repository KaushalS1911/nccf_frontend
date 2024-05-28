import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/basicInformation'));
const UploadDocument = lazy(() => import('src/pages/dashboard/uploadDocument'));
const UploadEvidence = lazy(() => import('../../pages/dashboard/uploadEvidence'));
const Dashboard = lazy(() => import('src/pages/dashboard/dashboard'));
const OrderNewForm = lazy(() => import('../../pages/dashboard/order'));
const BasicInformation = lazy(() => import('../../pages/dashboard/basicInformation'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
// order list

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <Dashboard />, index: true },
      { path: 'basic-info', element: <BasicInformation /> },
      { path: 'upload-document', element: <UploadDocument /> },
      { path: 'upload-evidence', element: <UploadEvidence /> },
      { path: 'place-order', element: <OrderNewForm /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];
