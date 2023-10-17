import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'
import { ModalDetailPembayaranHutang, SubHeader } from './Components'

export const ListDataHutang = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Data Hutang
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Data Hutang Supplier"
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
          subHeader={showFilter ? <SubHeader /> : <></>}
          customButtonDetail={() => <ModalDetailPembayaranHutang />}
          column={[
            { key: 'name', label: 'No. Invoice' },
            { key: 'name', label: 'Nama Supplier' },
            { key: 'name', label: 'Rekening Tujuan' },
            { key: 'name', label: 'Tanggal Invoice' },
            { key: 'name', label: 'Tanggal Jatuh Tempo' },
            { key: 'name', label: 'Sisa Hutang' },
          ]}
          extraButton={() => (
            <Button
              className="flex items-center gap-1"
              color="orange"
              size="small"
            >
              <Printer size={18} /> Print
            </Button>
          )}
          extraCell={() => (
            <div className="w-full h-14 items-center inline-flex justify-between px-3.5 py-5 text-zinc-800 text-xs font-bold">
              <div>Total Hutang</div>
              <div>Rp 6,040,000.00</div>
            </div>
          )}
          readonly
        />
      </section>
    </div>
  )
}
