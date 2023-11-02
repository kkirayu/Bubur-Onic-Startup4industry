import { useMemo, useState } from 'react'
import { Input, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage } from '@hookform/error-message'
import moment from 'moment'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListAccount } from '@/api'

interface PayloadCreateJournal {
  deskripsi: string
  tanggal_transaksi: string
  judul: string
  akuns?: { id: number; debit: number; credit: number; description: string }[]
}

export const CreateJurnal = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm()
  const { data: listAccount } = getListAccount()
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: PayloadCreateJournal) => {
      return axiosInstance.post('/journal/journal/create-journal', payload)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat jurnal',
        callback: () => {
          navigate('/keuangan/journal')
        },
      })
    },
    onError: (err: any) => {
      if (err.response.status === 422) {
        Dialog.error({ description: err.response.data.message })
      } else {
        Dialog.error()
      }
    },
  })

  const [row, setRow] = useState([0])

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
    return listAccount?.map((acc) => ({
      ...acc,
      label: `(${acc.kode_akun}) ` +  acc.nama,
      value: acc.id,
    }))
  }, [listAccount])

  const addAccountRow = () => {
    // selalu increment index meskipun row ada yang dihapus
    setRow((prev) => [...prev, prev[prev.length - 1] + 1])
    // set default value for new field
    setValue(`debit_${row.length}`, 0)
    setValue(`credit_${row.length}`, 0)
  }

  const removeAccoutRow = (idx: number) => {
    unregister(`debit_${idx}`)
    unregister(`credit_${idx}`)
    unregister(`account_${idx}`)
    unregister(`description_${idx}`)
    setRow((prev) => prev.filter((prevIdx) => prevIdx !== idx))
  }

  const transformData = (
    inputData: FieldValues
  ): { id: number; credit: number; debit: number; description: string }[] => {
    const result = row.map((idx: number) => {
      const idKey = `account_${idx}`
      const kreditKey = `credit_${idx}`
      const debitKey = `debit_${idx}`
      const descriptionKey = `description_${idx}`

      const id: number = inputData[idKey] || 0
      const credit: number = inputData[kreditKey] || 0
      const debit: number = inputData[debitKey] || 0
      const description: string = inputData[descriptionKey] || ''

      return {
        id,
        credit,
        debit,
        description,
      }
    })

    return result
  }

  const onSubmit = (form: FieldValues) => {
    const payload: PayloadCreateJournal = {
      deskripsi: form.deskripsi,
      judul: form.judul,
      tanggal_transaksi: form.tanggal_transaksi,
      akuns: transformData(form),
    }

    mutate(payload)
  }

  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Tambah Jurnal</h3>
      <div className="grid grid-cols-4 gap-4 px-10 mb-8">
        <div>
          <label htmlFor="">Nomor Jurnal</label>
          <Input disabled />
          <span className="text-gray-alurkerja-2 text-xs">
            Parena Akun (kosongkan jika akun parent)
          </span>
        </div>
        <div>
          <label
            htmlFor="tanggal_transaksi"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal
          </label>
          <Input
            {...register('tanggal_transaksi', { required: true })}
            type="date"
            defaultValue={moment(new Date()).format('YYYY-MM-DD')}
          />
          <span className="text-gray-alurkerja-2 text-xs">Kode Akun</span>
          <ErrorMessage
            errors={errors}
            name="tanggal_transaksi"
            render={() => (
              <p className="text-red-400 text-xs">Tanggal Required </p>
            )}
          />
        </div>
        <div className="col-span-2"></div>
        <div>
          <label
            htmlFor="judul"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Judul Jurnal
          </label>
          <Input {...register('judul', { required: true })} />
          <span className="text-gray-alurkerja-2 text-xs">
            Posisi Akun Kredit
          </span>
          <ErrorMessage
            errors={errors}
            name="judul"
            render={() => (
              <p className="text-red-400 text-xs"> Judul Jurnal Required </p>
            )}
          />
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-3">
          <label
            htmlFor="deskripsi"
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Deskripsi
          </label>
          <Input {...register('deskripsi', { required: true })} textArea />
          <span className="text-gray-alurkerja-2 text-xs">Deskripsi Akun</span>
          <ErrorMessage
            errors={errors}
            name="deskripsi"
            render={() => (
              <p className="text-red-400 text-xs">Deskripsi Required </p>
            )}
          />
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
              <th className="px-3 py-4 text-center">aksi</th>
            </tr>
          </thead>
          <tbody>
            {row.map((idx) => (
              <tr key={`account-row-${idx + 1}`}>
                <td className="px-3 py-2.5">
                  <Select
                    options={listOptionAccount}
                    onChange={(v: any) => setValue(`account_${idx}`, v.id)}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    {...register(`debit_${idx}`, { setValueAs: (v) => +v })}
                    type="number"
                    placeholder="Debit"
                    defaultValue={0}
                    disabled={watch(`credit_${idx}`) > 0}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    {...register(`credit_${idx}`, { setValueAs: (v) => +v })}
                    type="number"
                    placeholder="Credit"
                    defaultValue={0}
                    disabled={watch(`debit_${idx}`) > 0}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <Input
                    {...register(`description_${idx}`)}
                    placeholder="Description"
                  />
                </td>
                <td className="text-center">
                  {watch(`debit_${idx}`) > 0
                    ? watch(`debit_${idx}`)
                    : watch(`credit_${idx}`)}
                  .00
                </td>
                <td className="text-center">
                  <Button color="red" onClick={() => removeAccoutRow(idx)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}

            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Credit (Rp)</td>
              <td className="px-3 py-2.5">{totalCredit}.00</td>
            </tr>
            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Debit (Rp)</td>
              <td className="px-3 py-2.5">{totalDebit}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-fit flex gap-x-4 ml-auto px-6">
        <Button onClick={() => handleSubmit(onSubmit)()} loading={isLoading}>
          Simpan
        </Button>
        <Button variant="outlined">Reset</Button>
      </div>
    </section>
  )
}
