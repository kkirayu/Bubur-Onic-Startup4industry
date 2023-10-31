import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { useMemo } from 'react'

export const getListCategoryAsset = () => {
  const listCategoryAssetQuery = useQuery({
    queryKey: ['category-asset'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'account.asset.category',
        method: 'name_search',
        res_type: 'PAGINATEDLIST',
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

  const listCategoryAsset = data?.data.data.content

  const listOptionCategoryAsset = useMemo(() => {
    if (listCategoryAsset) {
      return listCategoryAsset?.map((asset: [number, string]) => ({
        label: asset[1],
        value: asset[0],
      }))
    }
    return undefined
  }, [listCategoryAsset])

  return {
    ...listCategoryAssetQuery,
    data: listCategoryAsset,
    listOption: listOptionCategoryAsset,
  }
}
