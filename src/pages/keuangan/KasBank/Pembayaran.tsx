import { useMemo, useState } from 'react'
import { Input, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorMessage } from '@hookform/error-message'
import moment from 'moment'

import { Button, Dialog } from '@/components'
import { axiosInstance, useListAccount } from '@/api'

interface PayloadPembayaran {
  deskripsi: string
  tanggal_transaksi: string
  judul: string
  akuns?: { id: number; debit: number; credit: number; description: string }[]
}

export const Pembayaran = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { listAccount } = useListAccount()
  const navigate = useNavigate()
  const { account_id } = useParams()

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: PayloadPembayaran) => {
      return axiosInstance.post('/journal/journal/create-journal', payload)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat jurnal pembayaran',
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

  const [numberOfAccount, setNumberOfAccount] = useState(1)

  const formValues = watch()

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

  const currentAccount = useMemo(() => {
    if (account_id) {
      setValue('account_0', +account_id)
      return listAccount
        ?.map((acc: any) => ({
          ...acc,
          label: acc.nama,
          value: acc.id,
        }))
        .filter((acc: any) => acc.id === +account_id)
    }
  }, [listAccount, account_id])

  const addAccountRow = () => {
    setNumberOfAccount((prev) => prev + 1)
    // set default value for new field
    setValue(`debit_${numberOfAccount}`, 0)
  }

  const transformData = (
    inputData: FieldValues
  ): { id: number; credit: number; debit: number; description: string }[] => {
    const accountID = Object.keys(inputData)
      .filter((key) => key.startsWith('account_'))
      .map((key) => inputData[key])

    const result = accountID.map((id: number, i) => {
      const kreditKey = `credit_${i}`
      const debitKey = `debit_${i}`
      const descriptionKey = `description_${i}`

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
    const payload: PayloadPembayaran = {
      deskripsi: form.deskripsi,
      judul: form.judul,
      tanggal_transaksi: form.tanggal_transaksi,
      akuns: transformData(form),
    }

    mutate(payload)
  }

  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Pembayaran</h3>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-8">
                <label
                  htmlFor=""
                  className="font-semibold text-sm after:content-['*'] after:text-red-400 after:text-sm"
                >
                  Akun Kas Awal
                </label>
                <Select
                  options={listOptionAccount}
                  value={currentAccount}
                  isDisabled
                />
              </td>
              <td className="px-3 py-8"></td>
              <td className="px-3 py-8">
                <Input
                  {...register(`credit_0`, { setValueAs: (v) => +v })}
                  type="number"
                  placeholder="Credit"
                  defaultValue={0}
                />
              </td>
              <td className="px-3 py-8">
                <Input
                  {...register(`description_0`)}
                  placeholder="Description"
                />
              </td>
              <td className="text-center">{watch('credit_0')}.00</td>
            </tr>
            {Array.from(Array(numberOfAccount), (_, i) => (
              <tr key={`account-row-${i + 1}`}>
                <td className="px-3 py-2.5">
                  <label
                    htmlFor=""
                    className="font-semibold text-sm after:content-['*'] after:text-red-400 after:text-sm"
                  >
                    Akun Kas Tujuan
                  </label>
                  <Select
                    options={listOptionAccount}
                    onChange={(v: any) => setValue(`account_${i + 1}`, v.id)}
                  />
                </td>
                <td className="px-3 pt-6">
                  <Input
                    {...register(`debit_${i + 1}`, { setValueAs: (v) => +v })}
                    type="number"
                    placeholder="Debit"
                    defaultValue={0}
                  />
                </td>
                <td className="px-3 pt-6"></td>
                <td className="px-3 pt-6">
                  <Input
                    {...register(`description_${i + 1}`)}
                    placeholder="Description"
                  />
                </td>
                <td className="text-center">
                  {watch(`debit_${i + 1}`)}
                  .00
                </td>
              </tr>
            ))}
            <tr className="border-t border-b border-gray-100">
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5"></td>
              <td className="px-3 py-2.5 font-semibold">Total Credit (Rp)</td>
              <td className="px-3 py-2.5">{watch('credit_0')}.00</td>
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
