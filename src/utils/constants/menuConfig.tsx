import type { MenuConfig } from 'alurkerja-ui'

import { menuKeuangan } from './menuKeuangan'
import { menuLaporanKeuangan } from './menuLaporanKeuangan'
import { menuMaster } from './menuMaster'
import { menuCompany } from './menuCompany'
import { menuHRM } from './menuHRM'
import { menuProductMaster } from './menuProductMaster'
import { menuKaryawan } from './menuKaryawan'

export const menuConfig: MenuConfig[] = [
  ...menuCompany,
  ...menuKeuangan,
  ...menuLaporanKeuangan,
  ...menuHRM,
  ...menuKaryawan,
  ...menuMaster,
  ...menuProductMaster,
]
