import { Outlet, createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

//pages
import { StarterPage, LoginPage } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Outlet />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [{ index: true, element: <StarterPage /> }],
  },
])

export default router
