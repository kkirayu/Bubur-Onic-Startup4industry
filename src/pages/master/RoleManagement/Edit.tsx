import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { TableLowcode } from 'alurkerja-ui'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '@/api'
import { Button, Dialog } from '@/components'
import { PermissionsEntity } from '@/utils'
import { AxiosError } from 'axios'

export const EditRole = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [selectedRow, setSelectedRow] = useState<number[]>([])

  const { data } = useQuery({
    queryKey: ['role', id],
    queryFn: async () => {
      return axiosInstance.get(`/crud/role/${id}`).then((res) => res.data.data)
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(`/crud/role/${id}/permissions`, {
        permissions: selectedRow,
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil mengedit permission',
        callback: () => {
          navigate('/master/role')
        },
      })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const status = err.response?.status
        const message = err.response?.data.message
        if (status === 422) {
          Dialog.error({ description: message })
        }
      }
    },
  })

  useEffect(() => {
    if (data) {
      const currentPermssion = data.permissions.map(
        (permission: PermissionsEntity) => permission.id
      )
      setSelectedRow(currentPermssion)
    }
  }, [data])

  return (
    <section className="bg-white py-6">
      <div className="px-6">
        <h3 className="font-bold text-xl uppercase">Tambah Permission</h3>
        <p>
          Tambahkan Permission Untuk ROLE{' '}
          <span className="font-bold">{data?.name}</span>
        </p>
      </div>
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/crud/permissions"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        readonly
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
      <div className="w-fit ml-auto px-6">
        <Button loading={isLoading} onClick={() => mutate()}>
          Simpan Perubahan
        </Button>
      </div>
    </section>
  )
}
