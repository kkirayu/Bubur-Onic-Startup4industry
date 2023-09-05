import { createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

//pages
import { StarterPage } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [{ index: true, element: <StarterPage /> }],
  },
])

export default router
