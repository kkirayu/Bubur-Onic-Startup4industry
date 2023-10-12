import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListResponse } from '@/utils'

export interface Journal {
  id: number
  kode_jurnal: string
  perusahaan_id: number
  cabang_id: number
  total_debit: string
  total_kredit: string
  deskripsi: string
  posted_at: string
  posted_by: number
  created_at: string
  updated_at: string
  created_by?: null
  updated_by?: null
  deleted_by?: null
  judul: string
  tanggal_transaksi: string
  deleted_at?: null
  journal_akuns?: JournalAkunsEntity[] | null
  posted_by_data: PostedByData
}
export interface JournalAkunsEntity {
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
  created_by?: null
  updated_by?: null
  deleted_by?: null
}
export interface PostedByData {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
  user_deleted_reason?: null
  deleted_at?: null
}

export const getListJournal = () => {
  const listJournalQuery = useQuery<AxiosResponse<ListResponse<Journal>, any>>({
    queryKey: ['journal'],
    queryFn: async () => {
      return axiosInstance.get('/journal/journal')
    },
  })
  const { data } = listJournalQuery

  const listJournal = data?.data.data.content

  const listOptionJournal = useMemo(() => {
    return listJournal?.map((team) => ({
      label: team.judul,
      value: team.id,
    }))
  }, [listJournal])

  return {
    ...listJournalQuery,
    data: listJournal,
    listOption: listOptionJournal,
  }
}
