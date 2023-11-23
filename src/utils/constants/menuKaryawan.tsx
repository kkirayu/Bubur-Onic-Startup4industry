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
      {
        href: '/karyawan/pengajuan-pinjaman',
        label: 'Pengajuan Pinjaman',
      },
      {
        href: '/karyawan/potongan',
        label: 'Potongan',
      },
      {
        href: '/karyawan/list-bonus-karyawan',
        label: 'List Bonus Karyawan',
      },
    ],
  },
]
