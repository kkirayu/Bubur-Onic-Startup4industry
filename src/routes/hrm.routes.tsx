import {
  ListKasbon,
  CreateKasbon,
  DetailKasbon,
  ListClaimableKasbon,
  ListPengajuanKaryawan,
  DetailPengajuanKaryawan,
  ListPengajuanGaji,
  DetailPengajuanGaji,
} from '@/pages/hrm'
import { Outlet, RouteObject } from 'react-router-dom'

export const hrmRoutes: RouteObject = {
  path: 'hrm',
  element: <Outlet />,
  children: [
    { path: 'manajemen-kasbon', element: <ListKasbon /> },
    { path: 'manajemen-kasbon/create', element: <CreateKasbon /> },
    { path: 'manajemen-kasbon/:id', element: <DetailKasbon /> },
    { path: 'klaim-kasbon', element: <ListClaimableKasbon /> },
    { path: 'pengajuan-karyawan', element: <ListPengajuanKaryawan /> },
    { path: 'pengajuan-karyawan/:id', element: <DetailPengajuanKaryawan /> },
    {
      path: 'pengajuan-gaji-karyawan',
      element: <ListPengajuanGaji />,
    },
    {
      path: 'pengajuan-gaji-karyawan/:id',
      element: <DetailPengajuanGaji />,
    },
  ],
}
