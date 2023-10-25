import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { OdooResponse } from '@/utils'
import { useMemo } from 'react'

export const getListSupplier = () => {
  const listSupplierQuery = useQuery<
    AxiosResponse<OdooResponse<[number, string]>, any>
  >({
    queryKey: ['supplier'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'res.partner',
        method: 'name_search',
        args: [],
        kwargs: {
          name: '',
          operator: 'ilike',
          args: [],
          limit: 8,
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            res_partner_search_mode: 'supplier',
          },
        },
      })
    },
  })

  const { data } = listSupplierQuery

  const listSupplier = data?.data.data

  const listOptionSupplier = useMemo(() => {
    return listSupplier?.map((asset) => ({
      label: asset[1],
      value: asset[0],
    }))
  }, [listSupplier])

  return {
    ...listSupplierQuery,
    data: listSupplier,
    listOption: listOptionSupplier,
  }
}
