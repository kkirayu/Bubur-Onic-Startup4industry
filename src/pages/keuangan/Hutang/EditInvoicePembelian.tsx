import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, TableLowcode, InputDate } from 'alurkerja-ui'
import { useState } from 'react'
import { axiosInstance, getListSupplier } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const EditInvoicePembelian = () => {
  const { id } = useParams()

  const [dataTable, setDataTable] = useState([
    { name: 'tes' },
    { name: 'tes2' },
  ])
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const { listOption: supplierOption } = getListSupplier()

  const { data, isLoading: onFetchingDetail } = useQuery({
    queryKey: ['invoice-pembelian', id],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {})
        .then((res) =>
          res.data?.data.records.filter((bill: any) => bill.id === +id!!)
        )
    },
  })

  return (
    <div>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/keuangan/hutang/invoice-pembelian"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Tambah Invoice Pembelian
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="">Nama Supplier</label>
            <Select options={supplierOption} />
          </div>
          <div>
            <label htmlFor="">Tanggal</label>
            <InputDate />
          </div>
          <div>
            <label htmlFor="">Jatuh Tempo</label>
            <InputDate />
          </div>
          <div className="col-span-2">
            <label htmlFor="">Catatan</label>
            <Input textArea />
          </div>
          <div className="w-full col-span-2">
            <TableLowcode
              title="Product"
              baseUrl={import.meta.env.VITE_API_BASEURL}
              specPath="/api/journal/journal"
              data={dataTable}
              renderState={renderState}
              setRenderState={setRenderState}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              search={search}
              setSearch={setSearch}
              column={[
                { key: 'name', label: 'Nama Product' },
                { key: 'name', label: 'Harga' },
                { key: 'name', label: 'Dikirim' },
                { key: 'name', label: 'Diterima' },
                { key: 'name', label: 'Total' },
              ]}
              extraRow={() => (
                <>
                  <tr>
                    <td colSpan={8}>
                      <div className="flex items-center justify-between border-b">
                        <div className="text-zinc-800 text-xs font-bold py-5 px-4">
                          Total
                        </div>
                        <div className="text-zinc-800 text-xs font-bold py-5 px-4">
                          Rp 6,000,000.00
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={8}>
                      <div className="flex items-center justify-between border-b">
                        <div className="text-zinc-800 text-xs font-bold py-5 px-4">
                          Biaya Ongkir
                        </div>
                        <div className="text-zinc-800 text-xs font-bold py-5 px-4">
                          Rp 50,000.00
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
