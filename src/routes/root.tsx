import { Outlet, createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

//pages
import {
  StarterPage,
  LoginPage,
  ForgotPassword,
  NotFound,
  ErrorPage,
} from '@/pages'

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
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <></> },
      { path: 'starter', element: <StarterPage /> },
    ],
  },
])

export default router
