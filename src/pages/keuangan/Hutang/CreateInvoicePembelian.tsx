import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Select } from 'alurkerja-ui'

export const CreateInvoicePembelian = () => {
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
          <title className="text-gray-700 text-base font-semibold">
            Tambah Invoice Pembelian
          </title>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6">
          <div>
            <label htmlFor="">Nomor Purchase Order</label>
            <Select options={[]} />
          </div>
        </div>
      </div>
    </div>
  )
}
