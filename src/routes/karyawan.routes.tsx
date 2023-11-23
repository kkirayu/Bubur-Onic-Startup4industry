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
  CreateListBonus,
  EditListBonus,
  ListBonusKaryawan,
} from '@/pages/karyawan'
import { DetailListBonus } from '@/pages/karyawan/ListBonusKaryawan'

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
    { path: 'list-bonus-karyawan', element: <ListBonusKaryawan /> },
    { path: 'list-bonus-karyawan/create', element: <CreateListBonus /> },
    { path: 'list-bonus-karyawan/:id', element: < DetailListBonus /> },
    { path: 'list-bonus-karyawan/:id/edit', element: <EditListBonus /> },
    
  ],
}
