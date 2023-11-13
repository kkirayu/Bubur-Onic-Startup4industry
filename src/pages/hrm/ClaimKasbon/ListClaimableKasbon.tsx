import { AuthContext, TableLowcode } from 'alurkerja-ui'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Dialog } from '@/components'

export const ListClaimableKasbon = () => {
  const navigate = useNavigate()
  const axiosInstance = useContext(AuthContext)

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      return axiosInstance.post('')
    },
    onSuccess: () => {
      Dialog.success()
    },
  })

  const onClaimKasbon = (id: number) => {
    Dialog.confirm({
      title: 'Claim kasbon',
      description: 'Claim Kasbon tidak bisa di batalkan',
      callback: () => {
        mutate(id)
      },
    })
  }

  return (
    <section className="bg-white">
      <TableLowcode
        title="History Kasbon"
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/saas/perusahaan"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        column={[
          { key: 'id', label: 'ID' },
          { key: 'periode', label: 'Periode' },
          { key: 'status', label: 'Status Kasbon' },
          { key: 'date', label: 'Tanggal Cair' },
        ]}
        customActionCell={(data) => (
          <>
            <button
              className="bg-light-blue-alurkerja text-main-blue-alurkerja p-1 rounded font-bold"
              onClick={() => onClaimKasbon(data.id)}
            >
              <Check size={20} />
            </button>
          </>
        )}
      />
    </section>
  )
}
