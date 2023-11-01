import { FormLowcodeLite, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download, Search, RefreshCcw } from 'lucide-react'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/api'
import { formatToMoney } from '@/utils'

export const ListPiutang = () => {
  const navigate = useNavigate()

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const filterSpec: any = [
    {
      form_field_type: 'INPUT_DATE',
      label: 'Periode',
      name: 'period',
      type: 'text',
    },
    {
      form_field_type: 'INPUT_SELECT',
      label: 'Customer',
      name: 'supplierID',
      type: 'text',
      select_options: {
        options: [{ label: 'Opsi 1', value: 1 }],
        option_key: 'value',
        option_label: 'label',
      },
    },
  ]

  const { data } = useQuery({
    queryKey: ['invoices'],
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
              action: 231,
              model: 'account.move',
              view_type: 'list',
              cids: 1,
              menu_id: 115,
            },
            default_move_type: 'out_invoice',
          },
          count_limit: 10001,
          domain: [['move_type', '=', 'out_invoice']],
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
            'edi_state',
            'edi_blocking_level',
            'edi_error_message',
            'state',
            'move_type',
          ],
        },
      })
    },
  })

  console.log(data)

  return (
    <div>
      <section className="bg-white">
        {data && (
          <TableLowcode
            title="Invoice"
            baseUrl={import.meta.env.VITE_API_BASEURL}
            specPath="/api/journal/journal"
            data={data?.data.data.content}
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
                return value[1]
              } else if (name === 'amount_residual_signed') {
                return formatToMoney(value)
              }
              return defaultCell
            }}
            subHeader={
              <>
                <div className="w-full h-10 px-6 py-2.5 bg-slate-100 rounded-tl rounded-tr border border-slate-200 justify-start items-center gap-6 inline-flex mt-6">
                  <div className="text-gray-700 text-sm font-semibold">
                    Filter Data
                  </div>
                </div>
                <FormLowcodeLite
                  init={({ setValue }) => {
                    setValue('tes', 1)
                  }}
                  spec={filterSpec}
                  inline={false}
                  baseUrl={import.meta.env.VITE_API_BASEURL}
                  submitButtonText="Cari"
                  cancelButtonText="Reset"
                  onCancel={(reset) => {}}
                  onSubmit={(data) => console.log(data)}
                  submitButtonIcon={<Search size={18} />}
                  cancelButtonIcon={<RefreshCcw size={18} />}
                />
              </>
            }
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
          />
        )}
      </section>
    </div>
  )
}
