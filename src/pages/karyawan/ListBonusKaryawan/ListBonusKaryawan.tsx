import { TableLowcode, Button } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ListBonusKaryawan() {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/pegawai/profil-pegawai"
        column={[
          { label: 'Id', key:'id'},
          { label: 'Nama Pegawai', key: 'user_id' },
          { label: 'Kode Pegawai', key: 'kode_pegawai' },
          { label: 'Status', key: 'status'},
          { label: 'Periode Gaji', key: 'periode_gaji'}
      ]}
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        customButtonCreate={() => (
          <>
            <Button
              className="bg-blue-400 text-white"
              onClick={() => navigate('create')}
              size="sm"
            >
              Tambah Bonus Karyawan
            </Button>
          </>
        )}
        onClickDetail={(id) => navigate(`${id}`)}
        onClickEdit={(_, id) => navigate(`${id}/edit`)}
      />
    </section>
  )
}
