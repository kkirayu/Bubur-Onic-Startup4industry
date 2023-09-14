import { UserCog, Home, Lock, User, UserX2, Building2 } from 'lucide-react'
import type { MenuConfig } from 'alurkerja-ui'

export const menuConfig: MenuConfig[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Home size={20} />,
    child: [
      {
        href: '/company',
        label: 'Company',
        icon: <Building2 size={20} />,
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
    ],
  },
]
