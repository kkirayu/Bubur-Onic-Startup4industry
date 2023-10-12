import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListResponse, Company } from '@/utils'

export const getListCompany = () => {
  const listCompanyQuery = useQuery<AxiosResponse<ListResponse<Company>, any>>({
    queryKey: ['company'],
    queryFn: async () => {
      return axiosInstance.get('/saas/perusahaan')
    },
  })
  const { data } = listCompanyQuery

  const listCompany = data?.data.data.content

  const listOptionCompany = useMemo(() => {
    return listCompany?.map((company) => ({
      label: company.nama,
      value: company.id,
    }))
  }, [listCompany])

  return {
    ...listCompanyQuery,
    data: listCompany,
    listOption: listOptionCompany,
  }
}
