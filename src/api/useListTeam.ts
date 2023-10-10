import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '.'
import { Options } from '@/utils'
import { useMemo } from 'react'

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

type TeamOption = Team & Options

export const useListTeam = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      return axiosInstance.get('/team/team')
    },
  })

  const listTeam: Team[] = data?.data.data.content

  const listOptionTeam: TeamOption[] = useMemo(() => {
    return listTeam?.map((team: any) => ({
      ...team,
      label: team.nama,
      value: team.id,
    }))
  }, [listTeam])

  return { loading: isLoading, listTeam, listOptionTeam, error }
}
