import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'
import { useMutation } from '@tanstack/react-query'

function RoleManagement() {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const ButtonAddPermission = ({ id }: { id: number }) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: () => {
        return axiosInstance.post(`/crud/role/${id}/permissions`, {
          permissions: [
            'd4f82258-6400-445a-9dd8-6cbd6623efef',
            'dad482f8-3008-461b-acb8-4bcbd573aa2b',
          ],
        })
      },
      onSuccess: () => {
        Dialog.success()
      },
    })

    return (
      <Button loading={isLoading} onClick={() => mutate()}>
        Tambah Permission
      </Button>
    )
  }

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        tableName="role"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        customButtonCreate={() => <></>}
        extraActionButton={(data) => <ButtonAddPermission id={data.id} />}
      />
    </section>
  )
}

export default RoleManagement
