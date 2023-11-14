import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '.'
import { ListNotPaginatedResponse, ListResponse } from '@/utils'
import { useMemo } from 'react'

interface SimpleFetcherProps {
  queryKey: string
  url: string
  mapperFn: (data: any) => any
}
interface SimpleItemFetcherProps {
  queryKey: string
  url: string
}


export const simplePaginatedFetcher = ({
  queryKey,
  url,
  mapperFn
}: SimpleFetcherProps) => {
  const listAccountQuery = useQuery<AxiosResponse<ListResponse<any>, any>>({
    queryKey: [queryKey],
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

export const simpleItemFetcher = ({
  queryKey,
  url
}: SimpleItemFetcherProps) => {
  const listAccountQuery = useQuery<AxiosResponse<any, any>>({
    queryKey: [queryKey],
    queryFn: async () => {
      return axiosInstance.get(url)
    },
  })

  const { data } = listAccountQuery
  const listAccount = data?.data.data


  return {
    ...listAccountQuery,
    data: listAccount,
  }
}


export const simpleNotPaginatedFetcher = ({
  queryKey,
  url,
  mapperFn
}: SimpleFetcherProps) => {
  const listAccountQuery = useQuery<AxiosResponse<ListNotPaginatedResponse<any>, any>>({
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
