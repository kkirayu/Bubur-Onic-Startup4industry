import { Outlet, createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

import { NotFound, Error } from '@/pages'
import {
  Profile,
  UserManagement,
  RoleManagement,
  UnactiveUserManagement,
  ListBonus,
  ListDenda,
} from '@/pages/admin'
import { Login, Register, ForgotPassword, ResetPassword } from '@/pages/auth'

import {
  DetailCompany,
  ListCategoryAccount,
  ListBranch,
  CreateCompany,
  ListCompany,
} from '@/pages/CompanyManagement'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/login',
    element: <Outlet />,
    errorElement: <Error />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/register',
    element: <Outlet />,
    errorElement: <Error />,
    children: [{ index: true, element: <Register /> }],
  },
  {
    path: '/forgot-password',
    element: <Outlet />,
    errorElement: <Error />,

    children: [{ index: true, element: <ForgotPassword /> }],
  },
  {
    path: '/reset-password',
    element: <Outlet />,
    errorElement: <Error />,

    children: [{ index: true, element: <ResetPassword /> }],
  },
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <></> },
      { path: 'profile', element: <Profile /> },
      {
        path: 'company',
        element: <Outlet />,
        children: [
          { path: 'list', element: <ListCompany /> },
          { path: 'create', element: <CreateCompany /> },
          { path: 'category-account', element: <ListCategoryAccount /> },
          {
            path: ':id',
            element: <Outlet />,
            children: [
              { index: true, element: <DetailCompany /> },
              { path: 'branch', element: <ListBranch /> },
            ],
          },
        ],
      },

      {
        path: 'admin',
        element: <Outlet />,
        children: [
          { path: 'user-management', element: <UserManagement /> },
          { path: 'role-management', element: <RoleManagement /> },
          {
            path: 'unactive-user-management',
            element: <UnactiveUserManagement />,
          },
          {
            path: 'bonus-management',
            element: <ListBonus />,
          },
          {
            path: 'denda-management',
            element: <ListDenda />,
          },
        ],
      },
    ],
  },
])

export default router
