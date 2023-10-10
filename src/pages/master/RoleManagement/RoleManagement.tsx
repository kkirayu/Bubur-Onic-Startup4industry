import { TableLowcode } from 'alurkerja-ui'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PermissionsEntity } from '@/utils'

export function RoleManagement() {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        tableName="role"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        onClickEdit={(_, id) => navigate(`${id}/edit`)}
        customButtonCreate={() => <></>}
        customCell={({ defaultCell, name, value }) => {
          if (name === 'permissions') {
            return (
              <div>
                {value.map((permission: PermissionsEntity, i: number) => (
                  <Fragment key={i}>
                    <span className="text-main-blue-alurkerja bg-light-blue-alurkerja rounded-full px-3 py-0.5">
                      {permission.name}
                    </span>
                  </Fragment>
                ))}
              </div>
            )
          }
          return defaultCell
        }}
      />
    </section>
  )
}
