import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const ListVendor = () => {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <section className="bg-white">
        <TableLowcode
          title="Supplier"
          baseUrl={import.meta.env.VITE_API_BASEURL}
          specPath="/api/keuangan/supplier"
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          extraActionButton={(data) => (
            <Link
              className="bg-green-alurkerja text-white text-xs p-2 rounded"
              to={`${data.id}/payment`}
            >
              Bayar
            </Link>
          )}
        />
      </section>
    </div>
  )
}
