import { FormLowcodeLite, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'
import { Download, Search, RefreshCcw } from 'lucide-react'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'

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
      label: 'Supplier',
      name: 'supplierID',
      type: 'text',
      select_options: {
        options: [{ label: 'Opsi 1', value: 1 }],
        option_key: 'value',
        option_label: 'label',
      },
    },
  ]

  return (
    <div>
      <div className="text-gray-700 text-xl font-semibold mb-4">
        Penerimaan Pembayaran Piutang
      </div>
      <section className="bg-white">
        <TableLowcode
          title="Data Pembayaran Piutang"
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
          column={[
            { key: 'name', label: 'No. Pembayaran' },
            { key: 'name', label: 'Tanggal Bayar' },
            { key: 'name', label: 'Jenis Pembayaran' },
            { key: 'name', label: 'Akun Kas' },
            { key: 'name', label: 'Total' },
            { key: 'name', label: 'Status' },
          ]}
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
      </section>
    </div>
  )
}
