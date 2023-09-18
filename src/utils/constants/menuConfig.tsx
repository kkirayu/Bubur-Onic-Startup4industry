import type { MenuConfig } from 'alurkerja-ui'
import { menuKeuangan } from './menuKeuangan'
import { menuLaporanKeuangan } from './menuLaporanKeuangan'
import { menuMaster } from './menuMaster'
import { menuCompany } from './menuCompany'

export const menuConfig: MenuConfig[] = [
  ...menuCompany,
  ...menuKeuangan,
  ...menuLaporanKeuangan,
  ...menuMaster,
]
