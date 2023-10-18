import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListResponse } from '@/utils'
import { useMemo } from 'react'

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

export const getListCategoryAccount = () => {
  const listCategoryAccountQuery = useQuery<
    AxiosResponse<ListResponse<KategoriAkun>, any>
  >({
    queryKey: ['category-account'],
    queryFn: async () => {
      return axiosInstance.get('/akun/kategori-akun')
    },
  })

  const { data } = listCategoryAccountQuery
  const listCategoryAccount = data?.data.data.content

  const listOptionCategoryAccount = useMemo(() => {
    return listCategoryAccount?.map((company) => ({
      label: company.nama,
      value: company.id,
    }))
  }, [listCategoryAccount])

  return {
    ...listCategoryAccountQuery,
    data: listCategoryAccount,
    listOption: listOptionCategoryAccount,
  }
}
