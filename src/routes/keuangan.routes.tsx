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
  CreatePiutang,
  CreatePembayaranHutang,
  ListInvoicePembelian,
  CreateInvoicePembelian,
  ListAsset,
  CreateAsset,
  EditAsset,
} from '@/pages/keuangan'
import { ListPembayaranHutang } from '@/pages/keuangan/Hutang/ListPembayaranHutang'

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
    { path: 'hutang/pembayaran-hutang', element: <ListPembayaranHutang /> },
    {
      path: 'hutang/pembayaran-hutang/create',
      element: <CreatePembayaranHutang />,
    },
    { path: 'hutang/invoice-pembelian', element: <ListInvoicePembelian /> },
    {
      path: 'hutang/invoice-pembelian/create',
      element: <CreateInvoicePembelian />,
    },

    // PIUTANG
    { path: 'piutang/penerimaan-pembayaran-piutang', element: <ListPiutang /> },
    {
      path: 'piutang/penerimaan-pembayaran-piutang/create',
      element: <CreatePiutang />,
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
