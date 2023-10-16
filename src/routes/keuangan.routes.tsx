import {
  AkunManagement,
  Aset,
  Hutang,
  Journal,
  KasBank,
  Pembayaran,
  ListPiutang,
  TransferUang,
  CreateJurnal,
  DetailJurnal,
  LayoutJournal,
  TerimaUang,
} from '@/pages/keuangan'

import { Outlet, RouteObject } from 'react-router-dom'

export const keuanganRoutes: RouteObject = {
  path: 'keuangan',
  element: <Outlet />,
  children: [
    { path: 'aset', element: <Aset /> },
    { path: 'hutang', element: <Hutang /> },
    { path: 'piutang', element: <ListPiutang /> },
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
        {
          path: ':account_id/terima-uang',
          element: <TerimaUang />,
        },
      ],
    },
  ],
}
