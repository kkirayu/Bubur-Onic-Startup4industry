import {
  ListAccount,
  ListBonus,
  ListCategoryAccount,
  ListDenda,
  RoleManagement,
  UnactiveUserManagement,
  UserManagement,
  ManagementKaryawan,
} from '@/pages/master'
import { Outlet, RouteObject } from 'react-router-dom'

export const masterRoutes: RouteObject = {
  path: 'master',
  element: <Outlet />,
  children: [
    { path: 'kategori-akun', element: <ListCategoryAccount /> },
    { path: 'Management-karyawan', element: <ManagementKaryawan/>},
    { path: 'akun', element: <ListAccount /> },
    { path: 'user', element: <UserManagement /> },
    { path: 'role', element: <RoleManagement /> },
    { path: 'unactive-user', element: <UnactiveUserManagement /> },
    { path: 'bonus', element: <ListBonus /> },
    { path: 'denda', element: <ListDenda /> },
  ],
}
