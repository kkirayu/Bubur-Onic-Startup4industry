import { PencilRuler } from 'lucide-react'

export const menuHRM = [
  {
    href: '/hrm',
    label: 'HRM',
    icon: <PencilRuler size={20} />,
    child: [
      {
        href: '/hrm/manajemen-kasbon',
        label: 'Manajemen Kasbon',
      },
    ],
  },
]
