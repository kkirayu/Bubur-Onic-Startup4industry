import { List, Building2, Plus } from 'lucide-react'

export const menuCompany = [
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
    ],
  },
]
