import { FormLowcodeLite, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download, Search, RefreshCcw } from 'lucide-react'
import { Button, Dialog } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListPiutang = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()


  return (
    <div>
      <section className="bg-white">
      <TableLowcode
            title="Invoice"
            baseUrl={import.meta.env.VITE_API_BASEURL}
            specPath="/api/keuangan/invoice"
            renderState={renderState}
            setRenderState={setRenderState}
            pageConfig={pageConfig}
            setPageConfig={setPageConfig}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            search={search}
            setSearch={setSearch}
            column={[
              { key: 'name', label: 'No. Invoice' },
              { key: 'date', label: 'Tanggal Invoice' },
              { key: 'invoice_user_id', label: 'Customer' },
              { key: 'amount_residual_signed', label: 'Total' },
              { key: 'payment_state', label: 'Status' },
              { key: 'state', label: 'Status Journal' },
            ]}
            customCell={({ defaultCell, name, value }) => {
              if (name === 'invoice_user_id') {
                return value.length > 0 ? value[1] : '-'
              } else if (name === 'amount_residual_signed') {
                return formatToMoney(value)
              }
              return defaultCell
            }}
            
            // extraButton={() => (
            //   <Button
            //     className="flex items-center gap-1"
            //     color="orange"
            //     size="small"
            //   >
            //     <Download size={18} /> Download
            //   </Button>
            // )}
            onClickCreate={() => navigate('create')}
            // onClickDetail={(id) => navigate(`${id}`)}
            // customButtonEdit={() => <></>}
            // onClickDelete={(_, id) => {
            //   Dialog.confirm({
            //     description: 'Apakah anda yakin ingin menghapus data ini?',
            //     callback: () => {
            //       mutate(id)
            //     },
            //   })
            // }}
          />
      </section>
    </div>
  )
}
