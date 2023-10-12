import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { useMemo } from 'react'
import { ListResponse } from '@/utils'
import { AxiosResponse } from 'axios'

interface Permission {
  id: string
  name: string
  module?: null
  table?: null
  action?: null
  description?: null
}

export const getListPermission = () => {
  const listPermissionQuery = useQuery<
    AxiosResponse<ListResponse<Permission>, any>
  >({
    queryKey: ['account'],
    queryFn: async () => {
      return axiosInstance.get('/crud/permissions')
    },
  })

  const { data } = listPermissionQuery
  const listPermission = data?.data.data.content

  const listOptionPermission = useMemo(() => {
    return listPermission?.map((permission) => ({
      label: permission.name,
      value: permission.id,
    }))
  }, [listPermission])

  return {
    ...listPermissionQuery,
    data: listPermission,
    listOption: listOptionPermission,
  }
}
