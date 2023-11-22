import { TableLowcode } from 'alurkerja-ui'
import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const DetailGaji = () => {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any } | undefined>()
  const [search, setSearch] = useState<string>()

  return (
    <section>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/hrm/pengajuan-gaji-karyawan"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="rounded bg-white pb-6">
        <div className="px-6">
          <TableLowcode
            readonly
            title="Detail Gaji Karyawan"
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
            column={[
              { label: 'Nama Pegawai', key: 'id' },
              { label: 'Gaji Pokok', key: 'id' },
              { label: 'Bonus', key: 'id' },
              { label: 'Potongan', key: 'id' },
              { label: 'Potongan Lainnya', key: 'id' },
              { label: 'Komponen Gaji Lainnya', key: 'id' },
              { label: 'Total Gaji', key: 'id' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
