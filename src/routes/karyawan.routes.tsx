import {
  DetailPengajuanGaji,
  EditPengajuanGaji,
  ListPengajuanGaji,
} from '@/pages/karyawan'
import { Outlet, RouteObject } from 'react-router-dom'

export const karyawanRoutes: RouteObject = {
  path: 'karyawan',
  element: <Outlet />,
  children: [
    { path: 'pengajuan-gaji', element: <ListPengajuanGaji /> },
    { path: 'pengajuan-gaji/:id', element: <DetailPengajuanGaji /> },
    { path: 'pengajuan-gaji/:id/edit', element: <EditPengajuanGaji /> },
  ],
}
