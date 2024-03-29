import { FormLowcodeLite, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download, Search, RefreshCcw } from 'lucide-react'
import { Button, Dialog } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListBills = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <section className="bg-white">
        <TableLowcode
          title="Bills"
          baseUrl={import.meta.env.VITE_API_BASEURL}
          specPath="/api/keuangan/bill"
          renderState={renderState}
          setRenderState={setRenderState}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          customCell={({ defaultCell, name, value }) => {
            if (name === 'desc') {
              return <>{value.toString().substring(0, 20) + '...'}</>
            }
            return defaultCell
          }}
          onClickCreate={() => navigate('create')}
          onClickDetail={(id) => navigate(`${id}`)}
          customButtonEdit={() => <></>}
        />
      </section>
    </div>
  )
}
