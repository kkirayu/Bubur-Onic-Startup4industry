import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet2 } from 'lucide-react'

export const ListPengajuanKaryawan = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <section className="bg-white">
      <TableLowcode
        title="List Pengajuan Karyawan"
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/saas/perusahaan"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        column={[
          { key: 'id', label: 'ID' },
          { key: 'periode', label: 'Nama Pegawai' },
          { key: 'status', label: 'Nominal Hutang' },
          { key: 'status', label: 'Status Kasbon' },
          { key: 'status', label: 'Periode Pinjaman' },
        ]}
        onClickCreate={() => navigate('create')}
        customActionCell={(data) => (
          <>
            <button
              className="bg-light-blue-alurkerja text-main-blue-alurkerja p-1 rounded font-bold"
              onClick={() => navigate(`${data.id}`)}
            >
              <Wallet2 size={20} />
            </button>
          </>
        )}
      />
    </section>
  )
}
