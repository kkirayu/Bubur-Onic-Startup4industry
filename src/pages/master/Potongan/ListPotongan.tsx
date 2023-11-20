import { TableLowcode } from 'alurkerja-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ListPotongan() {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any } | undefined>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <TableLowcode
        title="List Potongan"
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
        onClickCreate={() => navigate('create')}
        onClickDetail={(id) => navigate(`${id}`)}
        customButtonEdit={() => <></>}
      />
    </div>
  )
}
