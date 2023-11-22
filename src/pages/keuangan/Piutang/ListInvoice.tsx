import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export const ListPiutang = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <section className="bg-white">
        <TableLowcode
          title="Invoice"
          baseUrl={import.meta.env.VITE_API_BASEURL}
          specPath="/api/keuangan/invoice"
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          customCell={({ defaultCell, name, value }) => {
            if (name === 'desc') {
              return <>{value.toString().substring(0, 20) + '...'}</>
            }
            return defaultCell
          }}
          onClickCreate={() => navigate('create')}
          onClickDetail={(id) => navigate(`${id}`)}
          customButtonEdit={() => <></>}
        />
      </section>
    </div>
  )
}
