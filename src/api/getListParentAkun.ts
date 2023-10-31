import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { ListNotPaginatedResponse, ListResponse } from '@/utils'
import { useMemo } from 'react'
import { AxiosResponse } from 'axios'


export const getListParentAkun = () => {
  const listParentAkunQuery = useQuery<AxiosResponse<ListNotPaginatedResponse<any>, any>>({
    queryFn: async () => {
      return axiosInstance.get('akun/kategori-akun/allowed-parent-akun')
    },
    queryKey: ['parent-akun']
  })
  const { data } = listParentAkunQuery

  const listParentAkun = data?.data.data

  const listOptionParentAkun = useMemo(() => {
    return listParentAkun?.map((kategoriAkun) => ({
      label: `(${kategoriAkun.prefix_akun}) ` + kategoriAkun.nama,
      value: kategoriAkun.id,
    }))
  }, [listParentAkun])

  return {
    ...listParentAkunQuery,
    data: listParentAkun,
    listOption: listOptionParentAkun,
  }
}
