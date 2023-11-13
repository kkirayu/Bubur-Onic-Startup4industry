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
      {
        href: '/hrm/klaim-kasbon',
        label: 'Klaim Kasbon',
      },
      {
        href: '/hrm/pinjaman-karyawan',
        label: 'Pinjaman Karyawan',
      },
    ],
  },
]
