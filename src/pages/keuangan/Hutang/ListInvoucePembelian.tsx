import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'
import { SubHeader } from './Components'

export const ListInvoicePembelian = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Invoice Pembelian
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Pembelian"
          baseUrl={import.meta.env.VITE_API_BASEURL}
          specPath="/api/journal/journal"
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          onClickFilter={() => {
            setShowFilter((prev) => !prev)
          }}
          subHeader={showFilter ? <SubHeader hideSupplier /> : <></>}
          column={[
            { key: 'name', label: 'Nama Supplier' },
            { key: 'name', label: 'No. Invoice' },
            { key: 'name', label: 'Tanggal' },
            { key: 'name', label: 'Total' },
            { key: 'name', label: 'Sisa Tagihan' },
            { key: 'name', label: 'Status Pembayran' },
          ]}
          extraButton={() => (
            <Button
              className="flex items-center gap-1"
              color="orange"
              size="small"
            >
              <Download size={18} /> Download
            </Button>
          )}
        />
      </section>
    </div>
  )
}
