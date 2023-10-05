import { TableLowcode } from 'alurkerja-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Journal = () => {

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const nav = useNavigate()
  return <>
  
  <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        onClickCreate={() => {
          nav("/keuangan/journal/create")
        }}
        tableName="journal"
        module="journal"
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
  </>
}
