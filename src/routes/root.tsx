import { Outlet, createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

import {
  StarterPage,
  LoginPage,
  ForgotPassword,
  NotFound,
  ErrorPage,
  ProfilePage,
  ResetPasswordPage,
} from '@/pages'
import { UserManagement } from '@/pages/admin'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/login',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/forgot-password',
    element: <Outlet />,
    errorElement: <ErrorPage />,

    children: [{ index: true, element: <ForgotPassword /> }],
  },
  {
    path: '/reset-password',
    element: <Outlet />,
    errorElement: <ErrorPage />,

    children: [{ index: true, element: <ResetPasswordPage /> }],
  },
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <></> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'starter', element: <StarterPage /> },
      {
        path: 'admin',
        element: <Outlet />,
        children: [{ path: 'user-management', element: <UserManagement /> }],
      },
    ],
  },
])

export default router
