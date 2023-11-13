import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

import { Button } from '@/components'

export const ListClaimableKasbon = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

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
        customActionCell={() => (
          <>
            <button className="bg-light-blue-alurkerja text-main-blue-alurkerja p-1 rounded font-bold">
              <Check size={20} />
            </button>
          </>
        )}
      />
    </section>
  )
}
