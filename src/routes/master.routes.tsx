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
} from '@/pages/master'

import { Outlet, RouteObject } from 'react-router-dom'

export const masterRoutes: RouteObject = {
  path: 'master',
  element: <Outlet />,
  children: [
    { path: 'kategori-akun', element: <ListCategoryAccount /> },
    { path: 'Management-karyawan', element: <ManagementKaryawan /> },
    { path: 'Management-karyawan/create', element: <CreateKaryawan /> },
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
