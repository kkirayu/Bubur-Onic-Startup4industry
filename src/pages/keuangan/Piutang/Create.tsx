import { Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Save } from 'lucide-react'
import { Checkbox, Input, Select, TableLowcode } from 'alurkerja-ui'
import { useState } from 'react'

import { Button } from '@/components'

export const CreatePiutang = () => {
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  return (
    <div>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/keuangan/piutang"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div>
          <div className="w-full h-14 px-6 py-3.5 bg-white rounded-tl rounded-tr border border-slate-200 justify-start items-center gap-96 inline-flex">
            <div className="text-gray-700 text-base font-semibold">
              Tambah Penerimaan Pembayaran
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="no_transaksi">No Transaksi</label>
                <Input />
              </div>
              <div>
                <label
                  htmlFor="no_transaksi"
                  className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                  No Transaksi
                </label>
                <Select options={[]} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="no_transaksi"
                  className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                  Akun Kas
                </label>
                <Select options={[]} />
              </div>
              <div>
                <label
                  htmlFor="no_transaksi"
                  className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                  Tanggal
                </label>
                <Input type="date" />
              </div>
              <div>
                <label
                  htmlFor="no_transaksi"
                  className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                  Jenis Pembayaran
                </label>
                <Select options={[]} />
              </div>
            </div>
            <div>
              <label htmlFor="no_transaksi">Catatan Opsional</label>
              <Input textArea />
            </div>
          </div>
        </div>

        <div className="mx-6 my-3.5 border">
          <TableLowcode
            title="List Nomor Transaksi"
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
            readonly
          />
        </div>

        <div className="flex justify-between p-6">
          <Checkbox
            name="validator"
            className="flex"
            listOption={[
              {
                label: 'Pastikan daftar transaksu diatas tidak kosong',
                value: 1,
              },
              { label: 'Pastikan nominal bayar diatas tidak kosong', value: 2 },
              {
                label: 'Pastikan nominal bayar tidak melebihi hutang',
                value: 3,
              },
            ]}
          />
          <div className="flex gap-4 items-center">
            <label className="whitespace-nowrap" htmlFor="total">
              Total Pembayaran :
            </label>
            <Input />
          </div>
        </div>

        <div className="w-fit ml-auto flex items-center gap-4 px-6 py-10">
          <Button className="flex items-center gap-1" variant="outlined">
            <CreditCard size={18} />
            Bayar
          </Button>
          <Button className="flex items-center gap-1">
            <Save size={18} /> Simpan Data
          </Button>
        </div>
      </div>
    </div>
  )
}
