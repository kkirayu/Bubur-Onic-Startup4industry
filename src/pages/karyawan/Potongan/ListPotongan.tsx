import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ListPotongan = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any } | undefined>()
  const [search, setSearch] = useState<string>()

  return (
    <section>
      <TableLowcode
        baseUrl="https://kpm-sys.merapi.javan.id"
        specPath="/api/crud/takwim"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        column={[
          { key: 'id', label: 'Id' },
          { key: 'id', label: 'Nama Pegawai' },
          { key: 'id', label: 'Nominal Potongan' },
          { key: 'id', label: 'Status Potongan' },
          { key: 'id', label: 'Periode Gaji' },
        ]}
        onClickCreate={() => navigate('create')}
        onClickEdit={(_, id) => navigate(`${id}/edit`)}
        onClickDetail={(id) => navigate(`${id}`)}
      />
    </section>
  )
}
