import { ListKasbon, CreateKasbon } from '@/pages/hrm'
import { Outlet, RouteObject } from 'react-router-dom'

export const hrmRoutes: RouteObject = {
  path: 'hrm',
  element: <Outlet />,
  children: [
    { path: 'manajemen-kasbon', element: <ListKasbon /> },
    { path: 'manajemen-kasbon/create', element: <CreateKasbon /> },
  ],
}
