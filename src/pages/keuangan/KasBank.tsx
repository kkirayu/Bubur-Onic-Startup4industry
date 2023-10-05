import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'

export const KasBank = () => {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>({
    "is_kas": 1
  })
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        headerElement={<>
          <div className="flex flex-row items-center justify-between gap-2 px-4 py-4 border-b"><h5 className="mb-0 mr-4 font-bold uppercase" data-testid="title">Kas Bank</h5>

          </div>
        </>}
        tableName="akun"
        module="akun"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
      />
    </section>
  )
}
