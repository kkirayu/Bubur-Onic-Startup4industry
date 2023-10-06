import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'

function TeamManagement() {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        tableName="team"
        specPath="/api/team/team"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        customButtonCreate={() => <></>}
      />
    </section>
  )
}

export default TeamManagement
