import { Switch, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ListCompany() {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        tableName="perusahaan"
        module="saas"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        customButtonCreate={() => <></>}
        onClickDetail={(id) => {
          navigate('/company/' + id)
        }}
        customField={({ defaultField, field, setValue, value }) => {
          if (field.name === 'status_perusahaan') {
            return (
              <Switch
                options={[
                  { label: 'Aktif', value: true },
                  { label: 'Nonaktif', value: false },
                ]}
                onChange={(v) =>
                  setValue(field.name, v ? 'AKTIF' : 'TIDAK AKTIF')
                }
                defaultValue={value === 'AKTIF' ? true : false}
              />
            )
          }
          return defaultField
        }}
      />
    </section>
  )
}
