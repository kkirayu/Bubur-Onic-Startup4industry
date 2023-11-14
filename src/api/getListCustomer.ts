import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListResponse, OdooResponse } from '@/utils'
import { useMemo } from 'react'

export const getListCustomer = () => {
  const listSupplierQuery = useQuery<
    AxiosResponse<ListResponse<any>, any>
  >({
    queryKey: ['customer'],
    queryFn: async () => {
      return axiosInstance.get('/keuangan/customer?show_all=true ');
    },
  })

  const { data } = listSupplierQuery

  const listSupplier = data?.data.data.content

  const listOptionSupplier = useMemo(() => {
    return listSupplier?.map((asset) => ({
      label: asset.name,
      value: asset.id,
    }))
  }, [listSupplier])

  return {
    ...listSupplierQuery,
    data: listSupplier,
    listOption: listOptionSupplier,
  }
}
