import { Navigate, useRoutes } from 'react-router-dom';

import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import Home from 'src/components/customComponent/home/Home';
import Login from 'src/components/customComponent/login/Login';
import RegisterComponent from 'src/components/customComponent/register/Register';
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <RegisterComponent />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
    },
    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
