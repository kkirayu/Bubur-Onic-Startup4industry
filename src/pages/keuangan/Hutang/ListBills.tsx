import { TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'
import { SubHeader } from './Components'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListBills = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [showFilter, setShowFilter] = useState(false)

  const { data } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      return axiosInstance.post('/odoo/odoo-api', {
        model: 'account.move',
        method: 'web_search_read',
        args: [],
        res_type: 'PAGINATEDLIST',
        kwargs: {
          limit: 80,
          offset: 0,
          order: '',
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            bin_size: true,
            params: {
              action: 233,
              model: 'account.move',
              view_type: 'list',
              cids: 1,
              menu_id: 115,
            },
            default_move_type: 'in_invoice',
          },
          count_limit: 10001,
          domain: [['move_type', '=', 'in_invoice']],
          fields: [
            'activity_exception_decoration',
            'activity_exception_icon',
            'activity_state',
            'activity_summary',
            'activity_type_icon',
            'activity_type_id',
            'made_sequence_hole',
            'name',
            'invoice_partner_display_name',
            'invoice_date',
            'date',
            'invoice_date_due',
            'invoice_origin',
            'payment_reference',
            'ref',
            'invoice_user_id',
            'l10n_id_tax_number',
            'l10n_id_csv_created',
            'activity_ids',
            'company_id',
            'amount_untaxed_signed',
            'amount_tax_signed',
            'amount_total_signed',
            'amount_total_in_currency_signed',
            'amount_residual_signed',
            'currency_id',
            'company_currency_id',
            'to_check',
            'payment_state',
            'state',
            'move_type',
          ],
        },
      })
    },
  })

  const ExtraRow = () => (
    <tr>
      <td colSpan={7}>
        <div className="flex items-center justify-between py-5 px-4">
          <div className="text-zinc-800 text-xs font-bold font-['Poppins']">
            Grand Total
          </div>

          <div className="text-zinc-800 text-xs font-bold font-['Poppins']">
            Rp 150,000,000.00
          </div>
        </div>
      </td>
    </tr>
  )

  return (
    <div>
      <section className="bg-white">
        {data && (
          <TableLowcode
            title="Tagihan"
            data={data.data.data.content}
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
            onClickFilter={() => {
              setShowFilter((prev) => !prev)
            }}
            subHeader={showFilter ? <SubHeader hideSupplier /> : <></>}
            column={[
              { key: 'invoice_partner_display_name', label: 'Nama Supplier' },
              { key: 'name', label: 'No. Invoice' },
              { key: 'date', label: 'Tanggal' },
              { key: 'amount_total_signed', label: 'Total Hutang' },
              { key: 'amount_residual_signed', label: 'Sisa Tagihan' },
              { key: 'payment_state', label: 'Status Pembayaran' },
              { key: 'state', label: 'Status' },
            ]}
            customCell={({ defaultCell, name, value }) => {
              if (
                name === 'amount_total_signed' ||
                name === 'amount_residual_signed'
              ) {
                return <>{formatToMoney(value * -1)}</>
              }
              return defaultCell
            }}
            extraButton={() => (
              <Button
                className="flex items-center gap-1"
                color="orange"
                size="small"
              >
                <Download size={18} /> Download
              </Button>
            )}
            onClickCreate={() => navigate('create')}
            onClickDetail={(id) => navigate(`${id}`)}
            customButtonEdit={() => <></>}
            extraRow={() => <ExtraRow />}
          />
        )}
      </section>
    </div>
  )
}
