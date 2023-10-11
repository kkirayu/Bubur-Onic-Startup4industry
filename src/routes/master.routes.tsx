import {
  ListAccount,
  ListBonus,
  ListCategoryAccount,
  ListDenda,
  RoleManagement,
  TeamManagement,
  UnactiveUserManagement,
  UserManagement,
  ManagementKaryawan,
  CreateKaryawan,
  EditRole,
  DetailKaryawan,
  EditKaryawan,
} from '@/pages/master'

import { Outlet, RouteObject } from 'react-router-dom'

export const masterRoutes: RouteObject = {
  path: 'master',
  element: <Outlet />,
  children: [
    { path: 'kategori-akun', element: <ListCategoryAccount /> },
    { path: 'management-karyawan', element: <ManagementKaryawan /> },
    { path: 'management-karyawan/create', element: <CreateKaryawan /> },
    { path: 'management-karyawan/:id', element: <DetailKaryawan /> },
    { path: 'management-karyawan/:id/edit', element: <EditKaryawan /> },
    { path: 'akun', element: <ListAccount /> },
    { path: 'user', element: <UserManagement /> },
    { path: 'role', element: <RoleManagement /> },
    { path: 'role/:id/edit', element: <EditRole /> },
    { path: 'team', element: <TeamManagement /> },
    { path: 'unactive-user', element: <UnactiveUserManagement /> },
    { path: 'bonus', element: <ListBonus /> },
    { path: 'denda', element: <ListDenda /> },
  ],
}
