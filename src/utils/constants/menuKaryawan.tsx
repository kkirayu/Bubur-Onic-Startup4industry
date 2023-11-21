import { User } from 'lucide-react'

export const menuKaryawan = [
  {
    href: '/karyawan',
    label: 'karyawan',
    icon: <User size={20} />,
    child: [
      {
        href: '/karyawan/pengajuan-gaji',
        label: 'Pengajuan Gaji',
      },
    ],
  },
]
