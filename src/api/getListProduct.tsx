import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { OdooResponse2 } from '@/utils'
import { useMemo } from 'react'

export const getListProduct = () => {
  const listProductQuery = useQuery<AxiosResponse<OdooResponse2<any>, any>>({
    queryKey: ['products'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'product.template',
        method: 'web_search_read',
        args: [],
        kwargs: {
          limit: 80,
          offset: 0,
          order: '',
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            bin_size: true,
            params: {
              action: 254,
              model: 'product.template',
              view_type: 'list',
              cids: 1,
              menu_id: 115,
            },
          },
          count_limit: 10001,
          domain: [['purchase_ok', '=', true]],
          fields: [
            'activity_exception_icon',
            'default_code',
            'name',
            'list_price',
            'taxes_id',
            'supplier_taxes_id',
            'activity_exception_decoration',
          ],
        },
      })
    },
  })

  const { data } = listProductQuery

  const listProduct = data?.data.data.records

  const listOptionProduct = useMemo(() => {
    return listProduct?.map((product) => ({
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
