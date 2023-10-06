import { useQuery } from '@tanstack/react-query'
import { createContext } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { axiosInstance } from '@/api'

interface JournalAkun {
  id: number
  perusahaan_id: number
  cabang_id: number
  journal_id: number
  akun: number
  posisi_akun: string
  deskripsi: string
  jumlah: string
  created_at: string
  updated_at: string
  created_by: any
  updated_by: any
  deleted_by: any
}

interface DetailJournal {
  id: number
  kode_jurnal: string
  perusahaan_id: number
  cabang_id: number
  total_debit: string
  total_kredit: string
  deskripsi: string
  posted_at: any
  posted_by: any
  created_at: string
  updated_at: string
  created_by: any
  updated_by: any
  deleted_by: any
  judul: string
  tanggal_transaksi: string
  journal_akuns: JournalAkun[]
  posted_by_data: any
}

export const JournalContext = createContext<DetailJournal | undefined>(
  undefined
)

export const LayoutJournal = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['detail-journal'],
    queryFn: () => {
      return axiosInstance.get(`/journal/journal/${id}`)
    },
  })

  return (
    <JournalContext.Provider value={data?.data.data}>
      <Outlet />
    </JournalContext.Provider>
  )
}
