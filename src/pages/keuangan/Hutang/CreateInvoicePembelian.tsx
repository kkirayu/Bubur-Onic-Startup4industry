import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, InputDate } from 'alurkerja-ui'
import { useState } from 'react'
import { getListAccount, getListSupplier } from '@/api'
import { useForm } from 'react-hook-form'
import { Button } from '@/components'

export const CreateInvoicePembelian = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm()

  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()
  const [row, setRow] = useState([0])

  const { listOption: supplierOption } = getListSupplier()
  const { listOption: accountOption } = getListAccount()

  const removeAccoutRow = (idx: number) => {
    setRow((prev) => prev.filter((prevIdx) => prevIdx !== idx))
  }

  const addAccountRow = () => {
    // selalu increment index meskipun row ada yang dihapus
    setRow((prev) => [...prev, prev[prev.length - 1] + 1])
  }

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
        </div>
        <div className="p-6">
          <div className="flex justify-end items-center mb-2.5">
            <Button onClick={() => addAccountRow()}>Tambah Product</Button>
          </div>
          <table className="w-full table-auto">
            <thead className="bg-[#F8F9FD]">
              <tr className="uppercase text-left">
                <th className="px-3 py-4">Product</th>
                <th className="px-3 py-4">Account</th>
                <th className="px-3 py-4">Jumlah</th>
                <th className="px-3 py-4">Harga</th>
                <th className="px-3 py-4">Tax</th>
                <th className="px-3 py-4">SubTotal</th>
                <th className="px-3 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {row.map((idx) => (
                <tr key={`account-row-${idx + 1}`}>
                  <td className="px-3 py-2.5">
                    <Select options={[]} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Select options={accountOption} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input />
                  </td>
                  <td className="px-3 py-2.5">
                    <Select options={[]} />
                  </td>
                  <td className="text-center">
                    <Input />
                  </td>
                  <td className="text-center">
                    <Button color="red" onClick={() => removeAccoutRow(idx)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
