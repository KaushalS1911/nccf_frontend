import { Navigate, useRoutes } from 'react-router-dom';

// import { PATH_AFTER_LOGIN } from 'src/config-global';

import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import Home from 'src/components/customComponent/home/home';
import Login from 'src/components/customComponent/Login';
import RegisterComponent from 'src/components/customComponent/Register';
import DashboardLayout from 'src/layouts/dashboard';
// import OneView from 'src/sections/one/view';

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
