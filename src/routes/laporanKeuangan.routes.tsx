import {
  BukuBesar,
  Dashboard,
  LabaRugi,
  ListJournal,
  Neraca,
  PenambahanModal,
} from '@/pages/laporan-keuangan'
import { Outlet, RouteObject } from 'react-router-dom'

export const laporanKeuanganRoutes: RouteObject = {
  path: 'laporan-keuangan',
  element: <Outlet />,
  children: [
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'daftar-jurnal', element: <ListJournal /> },
    { path: 'buku-besar', element: <BukuBesar /> },
    { path: 'neraca', element: <Neraca /> },
    { path: 'laba-rugi', element: <LabaRugi /> },
    { path: 'penambahan-modal', element: <PenambahanModal /> },
  ],
}
