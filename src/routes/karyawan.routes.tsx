import {
  DetailPengajuanGaji,
  EditPengajuanGaji,
  ListPengajuanGaji,
  CreatePinjamanKaryawan,
  DetailPinjamanKaryawan,
  ListPinjamanKaryawan,
  ListPotongan,
  CreatePotongan,
  DetailPotongan,
  EditPotongan,
} from '@/pages/karyawan'

import { Outlet, RouteObject } from 'react-router-dom'

export const karyawanRoutes: RouteObject = {
  path: 'karyawan',
  element: <Outlet />,
  children: [
    { path: 'pengajuan-gaji', element: <ListPengajuanGaji /> },
    { path: 'pengajuan-gaji/:id', element: <DetailPengajuanGaji /> },
    { path: 'pengajuan-gaji/:id/edit', element: <EditPengajuanGaji /> },
    { path: 'pengajuan-pinjaman', element: <ListPinjamanKaryawan /> },
    { path: 'pengajuan-pinjaman/create', element: <CreatePinjamanKaryawan /> },
    { path: 'pengajuan-pinjaman/:id', element: <DetailPinjamanKaryawan /> },
    { path: 'potongan', element: <ListPotongan /> },
    { path: 'potongan/create', element: <CreatePotongan /> },
    { path: 'potongan/:id', element: <DetailPotongan /> },
    { path: 'potongan/:id/edit', element: <EditPotongan /> },
  ],
}
