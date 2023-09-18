import {
  UserCog,
  List,
  Lock,
  User,
  UserX2,
  Building2,
  Plus,
  Users2,
  BadgeDollarSign,
  BadgePercent,
} from 'lucide-react'
import type { MenuConfig } from 'alurkerja-ui'

export const menuConfig: MenuConfig[] = [
  {
    href: '/company',
    label: 'Company',
    icon: <Building2 size={20} />,
    child: [
      {
        href: '/company/create',
        label: 'Create',
        icon: <Plus size={20} />,
      },
      {
        href: '/company/list',
        label: 'List',
        icon: <List size={20} />,
      },
      {
        href: '/company/category-account',
        label: 'Kategori Akun',
        icon: <Users2 size={20} />,
      },
    ],
  },

  {
    href: '/admin',
    label: 'Administrator',
    icon: <Lock size={20} />,
    child: [
      {
        href: '/admin/user-management',
        label: 'User Management',
        icon: <User size={20} />,
      },
      {
        href: '/admin/role-management',
        label: 'Role Management',
        icon: <UserCog size={20} />,
      },
      {
        href: '/admin/unactive-user-management',
        label: 'Unactive User Management',
        icon: <UserX2 size={20} />,
      },
      {
        href: '/admin/bonus-management',
        label: 'Bonus Management',
        icon: <BadgeDollarSign size={20} />,
      },
      {
        href: '/admin/denda-management',
        label: 'Denda Management',
        icon: <BadgePercent size={20} />,
      },
    ],
  },
]
