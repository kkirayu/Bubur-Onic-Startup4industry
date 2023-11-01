import {
  Journal,
  KasBank,
  Pembayaran,
  ListPiutang,
  TransferUang,
  CreateJurnal,
  DetailJurnal,
  LayoutJournal,
  TerimaUang,
  CreateInvoice,
  CreateBills,
  ListAsset,
  CreateAsset,
  EditAsset,
  DetailBills,
  ListBills,
  PembayaranBills,
} from '@/pages/keuangan'

import { Outlet, RouteObject } from 'react-router-dom'

export const keuanganRoutes: RouteObject = {
  path: 'keuangan',
  element: <Outlet />,
  children: [
    // Assets
    { path: 'aset', element: <ListAsset /> },
    { path: 'aset/create', element: <CreateAsset /> },
    { path: 'aset/:id/edit', element: <EditAsset /> },
    // HUTANG
    { path: 'hutang/tagihan', element: <ListBills /> },
    {
      path: 'hutang/tagihan/:id',
      element: <DetailBills />,
    },
    {
      path: 'hutang/tagihan/:id/pembayaran',
      element: <PembayaranBills />,
    },
    {
      path: 'hutang/tagihan/create',
      element: <CreateBills />,
    },

    // PIUTANG
    { path: 'piutang/invoice', element: <ListPiutang /> },
    {
      path: 'piutang/invoice/create',
      element: <CreateInvoice />,
    },
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
