import { Input, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import moment from 'moment'

function UserManagement() {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [selectedRow, setSelectedRow] = useState<number[]>([])

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        tableName="user"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        customField={({ defaultField, field, value }) => {
          if (field.name === 'email_verified_at') {
            return (
              <>
                <Input
                  type="datetime-local"
                  defaultValue={
                    value
                      ? moment(value.toString()).format('YYYY-MM-DDTHH:mm:SS')
                      : ''
                  }
                />
              </>
            )
          }
          return defaultField
        }}
      />
    </section>
  )
}

export default UserManagement
