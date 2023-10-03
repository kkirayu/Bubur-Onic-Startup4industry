import { Modal, Select, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Button, Dialog } from '@/components'
import { FieldValues, useForm } from 'react-hook-form'
import { axiosInstance } from '@/api'

function RoleManagement() {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const ButtonAddPermission = ({ id }: { id: number }) => {
    const { handleSubmit, setValue } = useForm()
    const onSubmit = async (payload: FieldValues) => {
      const { status } = await axiosInstance.post(
        `/crud/role/${id}/permissions`,
        { permission: [payload.permission.value] }
      )
      if (status === 200) {
        Dialog.success()
      }
    }

    return (
      <Modal
        title="Tambah Permission"
        triggerButton={<Button variant="filled">Tambah Permission</Button>}
      >
        <div className="p-4 space-y-4">
          <Select
            options={[
              {
                label: 'Permission 1',
                value: 'd4f82258-6400-445a-9dd8-6cbd6623efef',
              },
              {
                label: 'Permission 2',
                value: 'dad482f8-3008-461b-acb8-4bcbd573aa2b',
              },
            ]}
            onChange={(v: any) => setValue('permission', v)}
          />
          <Button onClick={() => handleSubmit(onSubmit)()}>Tambah</Button>
        </div>
      </Modal>
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
