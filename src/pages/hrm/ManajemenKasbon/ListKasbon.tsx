import { Button, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { formatToMoney } from '@/utils'
import { Dialog } from '@/components'
import { useNavigate } from 'react-router-dom'

export const ListKasbon = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Manajemen Kasbon
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Manajemen Kasbon"
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
            { key: 'total', label: 'Jumlah Kasbon Diambil' },
            { key: 'date', label: 'Tanggal' },
          ]}
          onClickCreate={() => {
            navigate('create')
          }}
          customButtonEdit={() => <></>}
          onClickDetail={(id) => navigate(`${id}`)}
        />
      </section>
    </div>
  )
}
