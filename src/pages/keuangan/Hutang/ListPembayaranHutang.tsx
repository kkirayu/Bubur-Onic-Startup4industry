import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'

export const ListPembayaranHutang = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Pembayaran Hutang
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Data Pembayaran Piutang"
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
          column={[
            { key: 'name', label: 'No. Pembayaran' },
            { key: 'name', label: 'Tanggal Bayar' },
            { key: 'name', label: 'Jam Pembayaran' },
            { key: 'name', label: 'Akun Kas' },
            { key: 'name', label: 'Total' },
            { key: 'name', label: 'Status' },
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
          onClickCreate={() => navigate('create')}
        />
      </section>
    </div>
  )
}
