import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { ListNotPaginatedResponse, ListResponse } from '@/utils'
import { useMemo } from 'react'
import { AxiosResponse } from 'axios'


export const getListKategoriAkun = () => {
  const listKategoriAkunQuery = useQuery<AxiosResponse<ListNotPaginatedResponse<any>, any>>({
    queryFn: async () => {
      return axiosInstance.get('akun/kategori-akun/allowed-kategori-akun')
    },
  })
  const { data } = listKategoriAkunQuery

  const listKategoriAkun = data?.data.data

  const listOptionKategoriAkun = useMemo(() => {
    return listKategoriAkun?.map((kategoriAkun) => ({
      label: `(${kategoriAkun.prefix_akun}) ` + kategoriAkun.nama,
      value: kategoriAkun.id,
    }))
  }, [listKategoriAkun])

  return {
    ...listKategoriAkunQuery,
    data: listKategoriAkun,
    listOption: listOptionKategoriAkun,
  }
}
