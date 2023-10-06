import {
  AkunManagement,
  Aset,
  Hutang,
  Journal,
  KasBank,
  Pembayaran,
  Piutang,
  TransferUang,
  CreateJurnal,
  DetailJurnal,
  LayoutJournal,
} from '@/pages/keuangan'

import { Outlet, RouteObject } from 'react-router-dom'

export const keuanganRoutes: RouteObject = {
  path: 'keuangan',
  element: <Outlet />,
  children: [
    { path: 'manajemen-akun', element: <AkunManagement /> },
    { path: 'aset', element: <Aset /> },
    { path: 'hutang', element: <Hutang /> },
    { path: 'piutang', element: <Piutang /> },
    {
      path: 'journal',
      element: <Outlet />,
      children: [
        { index: true, element: <Journal /> },
        { path: 'create', element: <CreateJurnal /> },
        {
          path: ':id',
          element: <LayoutJournal />,
          children: [
            {
              index: true,
              element: <DetailJurnal />,
            },
          ],
        },
      ],
    },
    {
      path: 'kas-bank',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <KasBank />,
        },
        {
          path: ':account_id/transfer-uang',
          element: <TransferUang />,
        },
        {
          path: ':account_id/pembayaran',
          element: <Pembayaran />,
        },
      ],
    },
  ],
}
