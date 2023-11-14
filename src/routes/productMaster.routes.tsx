import {
  ListBrand,
  ListKategori,
  ListProduct,
  ListUnit,
} from '@/pages/productMaster'
import { CreateAkun } from '@/pages/master/AkunManagement'

import { Outlet, RouteObject } from 'react-router-dom'

export const productMaster: RouteObject = {
  path: 'product-master',
  element: <Outlet />,
  children: [
    { path: 'product', element: <ListProduct /> },
    { path: 'brand', element: <ListBrand /> },
    { path: 'unit', element: <ListUnit /> },
    { path: 'kategori', element: <ListKategori /> },
  ],
}
