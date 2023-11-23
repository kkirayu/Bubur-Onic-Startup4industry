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
  BillPayment,
  DetailInvoice,
  InvoicePayment,
  ListCustomer,
  ListVendor,
  CreateVendor,
  CreateCustomer,
  EditVendor,
  ListProduct,
  CreateProduct,
  DetailProduct,
  EditProduct,
  CustomerPayment,
  VendorPayment,
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
    { path: 'hutang/vendor', element: <ListVendor /> },
    { path: 'hutang/product', element: <ListProduct /> },
    { path: 'hutang/product/create', element: <CreateProduct /> },
    { path: 'hutang/product/:id', element: <DetailProduct /> },
    { path: 'hutang/product/:id/edit', element: <EditProduct /> },
    { path: 'hutang/vendor/create', element: <CreateVendor /> },
    { path: 'hutang/vendor/:id', element: <EditVendor /> },
    { path: 'hutang/vendor/:id/payment', element: <VendorPayment /> },
    {
      path: 'hutang/tagihan/:id',
      element: <DetailBills />,
    },
    {
      path: 'hutang/tagihan/:id/pembayaran',
      element: <BillPayment />,
    },
    {
      path: 'hutang/tagihan/create',
      element: <CreateBills />,
    },

    // PIUTANG
    { path: 'piutang/invoice', element: <ListPiutang /> },
    { path: 'piutang/customer', element: <ListCustomer /> },
    { path: 'piutang/customer/create', element: <CreateCustomer /> },
    { path: 'piutang/customer/:id/payment', element: <CustomerPayment /> },
    {
      path: 'piutang/invoice/create',
      element: <CreateInvoice />,
    },
    {
      path: 'piutang/invoice/:id',
      element: <DetailInvoice />,
    },
    {
      path: 'piutang/invoice/:id/pembayaran',
      element: <InvoicePayment />,
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
