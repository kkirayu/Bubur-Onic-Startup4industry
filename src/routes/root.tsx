import { Outlet, createBrowserRouter } from 'react-router-dom'

// layouts
import { AdminLayout } from '@/layouts'

// pages
import { NotFound, Error } from '@/pages'
import {
  Profile,
  UserManagement,
  RoleManagement,
  UnactiveUserManagement,
  ListBonus,
  ListDenda,
} from '@/pages/master'
import { Login, Register, ForgotPassword, ResetPassword } from '@/pages/auth'
import {
  DetailCompany,
  ListCategoryAccount,
  ListBranch,
  CreateCompany,
  ListCompany,
} from '@/pages/company'
import {
  AkunManagement,
  Aset,
  CreateJournal,
  Hutang,
  Journal,
  KasBank,
  Piutang,
} from '@/pages/keuangan'
import {
  BukuBesar,
  LabaRugi,
  ListJournal,
  Neraca,
  PenambahanModal,
} from '@/pages/laporan-keuangan'

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
      {
        path: 'keuangan',
        element: <Outlet />,
        children: [
          { path: 'manajemen-akun', element: <AkunManagement /> },
          { path: 'aset', element: <Aset /> },
          { path: 'hutang', element: <Hutang /> },
          { path: 'kas-bank', element: <KasBank /> },
          { path: 'piutang', element: <Piutang /> },
          { path: 'journal', element: <Journal /> },
          { path: 'journal/create', element: <CreateJournal /> },
        ],
      },
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
      {
        path: 'master',
        element: <Outlet />,
        children: [
          { path: 'kategori-akun', element: <ListCategoryAccount /> },
          { path: 'user', element: <UserManagement /> },
          { path: 'role', element: <RoleManagement /> },
          { path: 'unactive-user', element: <UnactiveUserManagement /> },
          { path: 'bonus', element: <ListBonus /> },
          { path: 'denda', element: <ListDenda /> },
        ],
      },
    ],
  },
])

export default router
