import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { ListResponse } from '@/utils'
import { useMemo } from 'react'
import { AxiosResponse } from 'axios'

interface Team {
  id: number
  nama: string
  perusahaan_id: number
  cabang_id: number
  deksripsi: string
  quota_kasbon_bulanan: string
  created_at: string
  updated_at: string
  created_by: number
  updated_by?: null
  deleted_by?: null
}

export const getListTeam = () => {
  const listTeamQuery = useQuery<AxiosResponse<ListResponse<Team>, any>>({
    queryKey: ['team'],
    queryFn: async () => {
      return axiosInstance.get('/team/team')
    },
  })
  const { data } = listTeamQuery

  const listTeam = data?.data.data.content

  const listOptionTeam = useMemo(() => {
    return listTeam?.map((team) => ({
      label: team.nama,
      value: team.id,
    }))
  }, [listTeam])

  return {
    ...listTeamQuery,
    data: listTeam,
    listOption: listOptionTeam,
  }
}
