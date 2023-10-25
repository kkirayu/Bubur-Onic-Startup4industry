import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { OdooResponse } from '@/utils'
import { useMemo } from 'react'

export const getListCategoryAsset = () => {
  const listCategoryAssetQuery = useQuery<
    AxiosResponse<OdooResponse<[number, string]>, any>
  >({
    queryKey: ['category-asset'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'account.asset.category',
        method: 'name_search',
        args: [],
        kwargs: {
          name: '',
          operator: 'ilike',
          args: [['type', '=', 'purchase']],
          limit: 8,
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            default_type: 'purchase',
          },
        },
      })
    },
  })

  const { data } = listCategoryAssetQuery

  const listCategoryAsset = data?.data.data

  const listOptionCategoryAsset = useMemo(() => {
    return listCategoryAsset?.map((asset) => ({
      label: asset[1],
      value: asset[0],
    }))
  }, [listCategoryAsset])

  return {
    ...listCategoryAssetQuery,
    data: listCategoryAsset,
    listOption: listOptionCategoryAsset,
  }
}
