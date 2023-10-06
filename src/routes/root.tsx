import { Outlet, createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

// pages
import { NotFound, Error } from '@/pages'
import { Profile } from '@/pages/master'
import { Login, Register, ForgotPassword, ResetPassword } from '@/pages/auth'
import {
  DetailCompany,
  ListBranch,
  CreateCompany,
  ListCompany,
} from '@/pages/company'

import {
  BukuBesar,
  LabaRugi,
  ListJournal,
  Neraca,
  PenambahanModal,
} from '@/pages/laporan-keuangan'
import { keuanganRoutes } from './keuangan.routes'
import { masterRoutes } from './master.routes'

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
      keuanganRoutes,
      {
        path: 'laporan-keuangan',
        element: <Outlet />,
        children: [
          { path: 'daftar-jurnal', element: <ListJournal /> },
          { path: 'buku-besar', element: <BukuBesar /> },
          { path: 'neraca', element: <Neraca /> },
          { path: 'laba-rugi', element: <LabaRugi /> },
          { path: 'penambahan-modal', element: <PenambahanModal /> },
        ],
      },
      masterRoutes,
    ],
  },
])

export default router
