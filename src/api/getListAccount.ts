import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListResponse } from '@/utils'

interface Account {
  id: number
  kode_akun: string
  perusahaan_id: number
  cabang_id: number
  nama: string
  deskripsi: string
  kategori_akun_id: number
  is_kas: number
  parent_akun: number | null
  created_at: Date
  updated_at: Date
  created_by: number
  updated_by: number | null
  deleted_by: number | null
  parent: number | null
  kategori_akun: KategoriAkun | null
}

interface KategoriAkun {
  id: number
  nama: string
  deskripsi: string
  perusahaan_id: number
  cabang_id: number
  parent_kategori_akun: number | null
  created_at: Date
  updated_at: Date
  created_by: number
  updated_by: number | null
  deleted_by: number | null
}

export const getListAccount = () => {
  const listAccountQuery = useQuery<AxiosResponse<ListResponse<Account>, any>>({
    queryKey: ['account'],
    queryFn: async () => {
      return axiosInstance.get('/akun/akun')
    },
  })

  const { data } = listAccountQuery
  const listAccount = data?.data.data.content

  return { ...listAccountQuery, data: listAccount }
}
