import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ListAsset = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Manage Asset
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Manage Asset"
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
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Nama Barang' },
            { key: 'name', label: 'Kategori Barang' },
            { key: 'name', label: 'Status Depresiasi' },
            { key: 'name', label: 'Harga' },
            { key: 'name', label: 'Resedual' },
            { key: 'name', label: 'Tanggal Pembelian' },
          ]}
          onClickCreate={() => navigate('create')}
          onClickEdit={(_, id) => navigate(id + '/edit')}
        />
      </section>
    </div>
  )
}
