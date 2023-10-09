import { TableLowcode } from 'alurkerja-ui'
import { Fragment, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'
import { PermissionsEntity } from '@/utils'

function RoleManagement() {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const ButtonAddPermission = ({ id }: { id: number }) => {
    const { mutate, isLoading } = useMutation({
      mutationFn: () => {
        return axiosInstance.post(`/crud/role/${id}/permissions`, {
          permissions: ['c1397806-f169-47b8-a667-746f0c2c4988'],
        })
      },
      onSuccess: () => {
        Dialog.success({
          callback: () => {
            setRenderState((prev) => prev + 1)
          },
        })
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
        customCell={({ defaultCell, name, value }) => {
          if (name === 'permissions') {
            return (
              <div>
                {value.map((permission: PermissionsEntity, i: number) => (
                  <Fragment key={i}>
                    <span className="text-main-blue-alurkerja bg-light-blue-alurkerja rounded-full px-3 py-0.5">
                      {permission.name}
                    </span>
                  </Fragment>
                ))}
              </div>
            )
          }
          return defaultCell
        }}
      />
    </section>
  )
}

export default RoleManagement
