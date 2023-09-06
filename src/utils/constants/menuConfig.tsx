import { UserCog, Home, Lock } from 'lucide-react'
import type { MenuConfig } from 'alurkerja-ui'

export const menuConfig: MenuConfig[] = [
  { href: '/', label: 'Home', icon: <Home size={20} /> },
  { href: '/starter', label: 'Alurkerja Example' },
  {
    href: '/admin',
    label: 'Administrator',
    icon: <Lock size={20} />,
    child: [
      {
        href: '/admin/user-management',
        label: 'User Management',
        icon: <UserCog size={20} />,
      },
    ],
  },
]
