import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListNotPaginatedResponse, ListResponse, OdooResponse2 } from '@/utils'
import { useMemo } from 'react'
import { PaginationLowcode } from 'alurkerja-ui/dist/types'

export const getListProduct = () => {
  
const listProductQuery = useQuery<AxiosResponse<ListResponse<any>, any>>({
    queryKey: ['product'],
    queryFn: async () => {
      return axiosInstance.get('/product/product?show_all=true')
    },
  })

  const { data } = listProductQuery

  const listProduct = data?.data.data.content

  const listOptionProduct = useMemo(() => {
    return listProduct?.map((product : any) => ({
      label: product.name,
      value: product.id,
    }))
  }, [listProduct])

  return {
    ...listProductQuery,
    data: listProduct,
    listOption: listOptionProduct,
  }
}
