import { Modal, Select, TableLowcode } from 'alurkerja-ui'
import { axiosInstance, useListPermission } from '@/api'
import { PermissionsEntity } from '@/utils'
import { Fragment, useCallback, useState } from 'react'
import { Button, Dialog } from '@/components'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

function RoleManagement() {
  const { listOptionPermission } = useListPermission()
  const { setValue, getValues } = useForm()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => {
      return axiosInstance.post(`/crud/role/${id}/permissions`, {
        permissions: getValues('permissions'),
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil mengedit permission',
        callback: () => {
          setRenderState((prev) => prev + 1)
        },
      })
    },
  })

  const convertToOption = (list: any[]) => {
    return list.map((item) => ({ label: item.name, value: item.id, ...item }))
  }

  const ButtonEdit = useCallback(
    ({
      triggerButton,
      row,
      isLoading,
    }: {
      triggerButton: JSX.Element
      row: any
      isLoading: boolean
    }) => {
      return (
        <Modal title="Edit Role" triggerButton={triggerButton}>
          <div className="p-4 space-y-4">
            <Select
              options={listOptionPermission}
              defaultValue={convertToOption(row.permissions)}
              isMulti
              onChange={(v: any) =>
                setValue(
                  'permissions',
                  v.map((permission: PermissionsEntity) => permission.id)
                )
              }
            />
            <div className="w-fit ml-auto">
              <Button
                loading={isLoading}
                onClick={() => {
                  mutate(row.id)
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )
    },
    []
  )

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
        customButtonEdit={(_modal, Button, row) => (
          <ButtonEdit triggerButton={Button} row={row} isLoading={isLoading} />
        )}
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
