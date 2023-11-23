import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ListGaji = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        title="List Penggajian Semua bulan"
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/akun/akun"
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
          { key: 'id', label: 'Periode Gaji' },
          { key: 'id', label: 'Kalkulasi Gaji Perbulan' },
        ]}
        onClickDetail={(id) => navigate(`${id}`)}
        customButtonEdit={() => <></>}
        customButtonDelete={() => <></>}
        customButtonCreate={() => <></>}
      />
    </section>
  )
}
