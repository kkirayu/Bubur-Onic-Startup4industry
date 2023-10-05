import { useMemo, useState } from 'react'
import { Input, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { Button } from '@/components'
import { useListAccount } from '@/api'

export const CreateJurnal = () => {
  const { register, watch, setValue, handleSubmit } = useForm()
  const { listAccount } = useListAccount()

  const [numberOfAccount, setNumberOfAccount] = useState(1)

  const formValues = watch()

  const totalCredit = useMemo(() => {
    let total = 0
    for (const [key, value] of Object.entries(formValues)) {
      if (key.includes('credit')) {
        total += +value
      }
    }
    return total
  }, [formValues])

  const totalDebit = useMemo(() => {
    let total = 0
    for (const [key, value] of Object.entries(formValues)) {
      if (key.includes('debit')) {
        total += +value
      }
    }
    return total
  }, [formValues])

  const listOptionAccount = useMemo(() => {
    return listAccount?.map((acc: any) => ({
      ...acc,
      label: acc.nama,
      value: acc.id,
    }))
  }, [listAccount])

  const addAccountRow = () => {
    setNumberOfAccount((prev) => prev + 1)
    // set default value for new field
    setValue(`debit_${numberOfAccount}`, 0)
    setValue(`credit_${numberOfAccount}`, 0)
  }

  const onSubmit = (payload: FieldValues) => {
    console.log(payload)
  }

  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Tambah Jurnal</h3>
      <div className="grid grid-cols-4 gap-4 px-10 mb-8">
        <div>
          <label htmlFor="">Nomor Jurnal</label>
          <Input required />
          <span className="text-gray-alurkerja-2 text-xs">
            Parena Akun (kosongkan jika akun parent)
          </span>
        </div>
        <div>
          <label htmlFor="tanggal_transaksi">Tanggal</label>
          <Input {...register('tanggal_transaksi')} required type="date" />
          <span className="text-gray-alurkerja-2 text-xs">Kode Akun</span>
        </div>
        <div className="col-span-2"></div>
        <div>
          <label htmlFor="judul">Judul Jurnal</label>
          <Input {...register('judul')} required />
          <span className="text-gray-alurkerja-2 text-xs">
            Posisi Akun Kredit
          </span>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-3">
          <label htmlFor="deskripsi">Deskripsi</label>
          <Input {...register('deskripsi')} required textArea />
          <span className="text-gray-alurkerja-2 text-xs">Deskripsi Akun</span>
        </div>
      </div>
      <div className="px-10 mb-6">
        <div className="flex justify-between items-center mb-2.5">
          <div>
            <h4 className="font-bold">Tambah Akun</h4>
            <span className="text-xs">Akun Terlibat</span>
          </div>
          <Button onClick={() => addAccountRow()}>Tambah Akun</Button>
        </div>
        <table className="w-full table-auto">
          <thead className="bg-[#F8F9FD]">
            <tr className="uppercase text-left">
              <th className="px-3 py-4">account</th>
              <th className="px-3 py-4">debit</th>
              <th className="px-3 py-4">credit</th>
              <th className="px-3 py-4">description</th>
              <th className="px-3 py-4">amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(numberOfAccount), (_, i) => (
              <tr key={`account-row-${i + 1}`}>
                <td className="px-3 py-2.5">
                  <Select options={listOptionAccount} />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    {...register(`debit_${i}`)}
                    type="number"
                    placeholder="Debit"
                    defaultValue={0}
                    disabled={watch(`credit_${i}`) > 0}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    {...register(`credit_${i}`)}
                    type="number"
                    placeholder="Credit"
                    defaultValue={0}
                    disabled={watch(`debit_${i}`) > 0}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input placeholder="Description" />
                </td>
                <td className="text-center">0.00</td>
              </tr>
            ))}

            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Credit ($)</td>
              <td className="px-3 py-2.5">{totalCredit}.00</td>
            </tr>
            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Debit ($)</td>
              <td className="px-3 py-2.5">{totalDebit}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-fit space-x-4 ml-auto px-6">
        <Button onClick={() => handleSubmit(onSubmit)()}>Simpan</Button>
        <Button variant="outlined">Reset</Button>
      </div>
    </section>
  )
}
