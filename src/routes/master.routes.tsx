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
  ListPaymentMethod,
  ListPotongan,
  CreatePotongan,
  DetailPotongan,
} from '@/pages/master'
import { CreateAkun } from '@/pages/master/AkunManagement'
import { CreateListBonus, EditListBonus, ListBonusKaryawan } from '@/pages/master/ListBonusKaryawan'

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
    { path: 'akun/create', element: <CreateAkun /> },
    { path: 'user', element: <UserManagement /> },
    { path: 'role', element: <RoleManagement /> },
    { path: 'role/:id/edit', element: <EditRole /> },
    { path: 'team', element: <TeamManagement /> },
    { path: 'unactive-user', element: <UnactiveUserManagement /> },
    { path: 'bonus', element: <ListBonus /> },
    { path: 'denda', element: <ListDenda /> },
    { path: 'payment-method', element: <ListPaymentMethod /> },
<<<<<<< HEAD
    { path: 'list-bonus-karyawan', element: <ListBonusKaryawan /> },
    { path: 'list-bonus-karyawan/create', element: <CreateListBonus /> },
    { path: 'list-bonus-karyawan/:id/edit', element: <EditListBonus /> },
=======
    { path: 'potongan', element: <ListPotongan /> },
    { path: 'potongan/create', element: <CreatePotongan /> },
    { path: 'potongan/:id', element: <DetailPotongan /> },
>>>>>>> 26051a00c0de07ba8b9ec87d21e82142bac1a5bd
  ],
}
