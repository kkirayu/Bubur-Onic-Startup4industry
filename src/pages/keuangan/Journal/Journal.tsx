import { useState } from 'react'
import { TableLowcode } from 'alurkerja-ui'
import { useNavigate } from 'react-router-dom'
import { formatToMoney } from '@/utils'

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
        customButtonEdit={() => <></>}
        onClickCreate={() => navigate('create')}
        onClickDetail={(id) => navigate(`${id}`)}
        column={[
          { label: 'Kode Jurnal', key: 'kode_jurnal' },
          { label: 'Judul', key: 'judul' },
          { label: 'Total Kredit', key: 'total_kredit' },
          { label: 'Total Debit', key: 'total_debit' },
          { label: 'Deskripsi', key: 'deskripsi' },
          { label: 'Status', key: 'posted_at' },
          { label: 'Posted By', key: 'posted_by' },
          { label: 'Tanggal Transaksi', key: 'tanggal_transaksi' },
        ]}
        customCell={({ defaultCell, value, name }) => {
          if (name === 'posted_at') {
            return (
              <>
                {value ? (
                  <span className="text-main-blue-alurkerja bg-light-blue-alurkerja rounded-full px-3 py-0.5">
                    Posted
                  </span>
                ) : (
                  <span className="text-white bg-gray-alurkerja-2 rounded-full px-3 py-0.5">
                    Draft
                  </span>
                )}
              </>
            )
          } else if (name === 'total_kredit' || name === 'total_debit') {
            return <>{formatToMoney(+value)}</>
          }

          return defaultCell
        }}
      />
    </div>
  )
}
