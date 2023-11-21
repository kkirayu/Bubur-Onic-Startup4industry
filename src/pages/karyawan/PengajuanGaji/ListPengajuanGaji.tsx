import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ListPengajuanGaji = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        title="List Pengajuan Gaji Karyawan"
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
          { key: 'periode', label: 'Periode Gaji' },
          { key: 'status', label: 'Nominal Total' },
          { key: 'status', label: 'Status Pengajuan' },
        ]}
        onClickCreate={() => navigate('create')}
        onClickDetail={(id) => navigate(`${id}`)}
        onClickEdit={(_, id) => navigate(`${id}/edit`)}
      />
    </section>
  )
}
