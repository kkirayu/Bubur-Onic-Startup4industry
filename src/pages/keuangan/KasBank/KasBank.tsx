import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'

export const KasBank = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any } | undefined>({
    is_kas: 1,
  })
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/akun/akun"
        renderState={renderState}
        hideCreateButton
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        column={[
          { label: 'Nama', key: 'nama' },
          { label: 'Deskripsi', key: 'deskripsi' },
          { label: 'Saldo', key: 'saldo' },
        ]}
        customActionCell={(row) => {
          return (
            <div className="flex gap-x-2 whitespace-nowrap">
              <Button onClick={() => navigate(`${row.id}/transfer-uang`)}>
                Transfer Uang
              </Button>
              <Button onClick={() => navigate(`${row.id}/terima-uang`)}>
                Terima Uang
              </Button>
              <Button onClick={() => navigate(`${row.id}/pembayaran`)}>
                Pembayaran
              </Button>
            </div>
          )
        }}
      />
    </section>
  )
}
