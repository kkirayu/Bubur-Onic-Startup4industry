import {
  Input,
  Modal,
  ReactHookWrapper,
  Switch,
  TableLowcode,
} from 'alurkerja-ui'
import { useState } from 'react'
import { ShieldBan } from 'lucide-react'
import { FieldValues, useForm } from 'react-hook-form'
import moment from 'moment'
import { axiosInstance } from '@/api'
import { Dialog, Button } from '@/components'

export function UserManagement() {
  const { control, watch, setValue, handleSubmit } = useForm()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [selectedRow, setSelectedRow] = useState<number[]>([])

  const handleUserActivication = (
    data: { [x: string]: any },
    body: FieldValues
  ) => {
    delete data.status
    axiosInstance
      .put('/crud/user/' + data.id, {
        ...data,
        ...body,
        email_verified_at: moment(data.email_verified_at).format(
          'YYYY-MM-DD HH:mm:ss'
        ),
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Dialog.success({
            callback: () => {
              setRenderState((prev) => prev + 1)
            },
          })
        }
      })
  }

  const status = watch('status')

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        tableName="user"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        extraActionButton={(row) => (
          <Modal
            title="Aktivasi User"
            triggerButton={
              <button className="bg-gray-100 text-red-600 h-7 w-7 inline-flex items-center justify-center text-base p-2 rounded">
                <ShieldBan />
              </button>
            }
          >
            <div className="p-6 pt-4">
              <ReactHookWrapper control={control}>
                <Switch
                  onChange={(v: boolean | undefined) => setValue('status', v)}
                  aria-label="Status User"
                  options={[
                    { label: 'Aktif', value: true },
                    { label: 'Non Aktif', value: false },
                  ]}
                />
                {status === false && (
                  <Input
                    aria-label="Alasan"
                    name="user_deleted_reason"
                    onChange={(e) => setValue(e.target.name, e.target.value)}
                    textArea
                  />
                )}
                <Input
                  aria-label="Password"
                  name="password"
                  onChange={(e) => setValue(e.target.name, e.target.value)}
                  required
                />
              </ReactHookWrapper>
              <div className="w-fit ml-auto">
                <Button
                  variant="filled"
                  onClick={() =>
                    handleSubmit((data) => handleUserActivication(row, data))()
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
        )}
      />
    </section>
  )
}

