import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { useMemo } from 'react'
import { Options } from '@/utils'

interface Permission {
  id: string
  name: string
  module?: null
  table?: null
  action?: null
  description?: null
}

type PermissionOptions = Permission & Options

export const useListPermission = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      return axiosInstance.get('/crud/permissions')
    },
  })

  const listPermission: Permission[] = data?.data.data.content

  const listOptionPermission: PermissionOptions[] = useMemo(() => {
    return listPermission?.map((permission: any) => ({
      ...permission,
      label: permission.name,
      value: permission.id,
    }))
  }, [listPermission])

  return { loading: isLoading, listPermission, listOptionPermission, error }
}
