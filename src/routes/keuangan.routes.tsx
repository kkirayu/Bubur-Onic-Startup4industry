import {
  AkunManagement,
  Aset,
  CreateJurnal,
  Hutang,
  Journal,
  KasBank,
  Piutang,
} from '@/pages/keuangan'
import { Outlet, RouteObject } from 'react-router-dom'

export const keuanganRoutes: RouteObject = {
  path: 'keuangan',
  element: <Outlet />,
  children: [
    { path: 'manajemen-akun', element: <AkunManagement /> },
    { path: 'aset', element: <Aset /> },
    { path: 'hutang', element: <Hutang /> },
    { path: 'kas-bank', element: <KasBank /> },
    { path: 'piutang', element: <Piutang /> },
    {
      path: 'journal',
      element: <Outlet />,
      children: [
        { index: true, element: <Journal /> },
        { path: 'create', element: <CreateJurnal /> },
      ],
    },
  ],
}
