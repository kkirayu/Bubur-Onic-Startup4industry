import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListNotPaginatedResponse, ListResponse } from '@/utils'
import { useMemo } from 'react'

interface SimpleFetcherProps {
  queryKey: Array<string | number>
  url: string
  mapperFn: (data: any) => any
}
interface SimpleItemFetcherProps {
  queryKey: Array<string | number>
  url: string
  onSuccess?: (data?: any) => void
}

export const usePaginatedFetcher = ({
  queryKey,
  url,
  mapperFn,
}: SimpleFetcherProps) => {
  const listAccountQuery = useQuery<AxiosResponse<ListResponse<any>, any>>({
    queryKey: [...queryKey],
    queryFn: async () => {
      return axiosInstance.get(url)
    },
  })

  const { data } = listAccountQuery
  const listAccount = data?.data.data.content

  const listOptionAccount = useMemo(() => {
    return listAccount?.map(mapperFn)
  }, [listAccount])

  return {
    ...listAccountQuery,
    data: listAccount,
    listOption: listOptionAccount,
  }
}

export const useItemFetcher = ({
  queryKey,
  url,
  onSuccess,
}: SimpleItemFetcherProps) => {
  const listAccountQuery = useQuery<AxiosResponse<any, any>>({
    cacheTime: 0,
    queryKey: [...queryKey],
    queryFn: async () => {
      return axiosInstance.get(url)
    },
    onSuccess: (data) => {
      onSuccess?.(data?.data.data)
    },
  })

  const { data } = listAccountQuery
  const listAccount = data?.data.data

  return {
    ...listAccountQuery,
    data: listAccount,
  }
}

export const useNotPaginatedFetcher = ({
  queryKey,
  url,
  mapperFn,
}: SimpleFetcherProps) => {
  const listAccountQuery = useQuery<
    AxiosResponse<ListNotPaginatedResponse<any>, any>
  >({
    queryKey: [queryKey],
    queryFn: async () => {
      return axiosInstance.get(url)
    },
  })

  const { data } = listAccountQuery
  const listAccount = data?.data.data

  const listOptionAccount = useMemo(() => {
    return listAccount?.map(mapperFn)
  }, [listAccount])

  return {
    ...listAccountQuery,
    data: listAccount,
    listOption: listOptionAccount,
  }
}
