import { useState } from 'react'
import { TableLowcode } from 'alurkerja-ui'
import { useNavigate } from 'react-router-dom'

export const Journal = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <TableLowcode
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
        onClickCreate={() => navigate('create')}
      />
    </div>
  )
}
