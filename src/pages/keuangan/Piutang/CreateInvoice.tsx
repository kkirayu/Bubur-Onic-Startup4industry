import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, InputDate } from 'alurkerja-ui'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import moment from 'moment'

import {
  axiosInstance,
  getListAccount,
  getListCustomer,
  getListProduct,
} from '@/api'
import { Button, Dialog } from '@/components'

export const CreateInvoice = () => {
  const { register, watch, setValue, handleSubmit } = useForm()
  const navigate = useNavigate()

  const [row, setRow] = useState([0])

  const { listOption: supplierOption } = getListCustomer()
  const { listOption: accountOption, isLoading: isFetchingAccount } =
    getListAccount()
  const { listOption: productOption } = getListProduct()

  const removeAccoutRow = (idx: number) => {
    setRow((prev) => prev.filter((prevIdx) => prevIdx !== idx))
  }

  const addAccountRow = () => {
    // selalu increment index meskipun row ada yang dihapus
    setRow((prev) => [...prev, prev[prev.length - 1] + 1])
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      let totalPrice = 0
      const listProduct = row.map((idx) => {
        const productKey = `product-${idx}`
        const accountKey = `account-${idx}`
        const quantityKey = `quantity-${idx}`
        const priceKey = `price_unit-${idx}`
        const descriptionKey = `desc-${idx}`

        const product = payload[productKey]
        const account = payload[accountKey]
        const quantity = payload[quantityKey]
        const price = payload[priceKey]
        const desc = payload[descriptionKey]

        totalPrice += +price

        return {
          product_id: product.value,
          qty: +quantity,
          account_id: account.value,
          price: price,
          total: price * quantity,
          discount: 0,
          tax: 0,
          subtotal: price * quantity,
          description: desc,
        }
      })
      const payloadData = {
        invoice_date: moment(payload.invoice_date).format('YYYY-MM-DD'),
        due_date: moment(payload.invoice_date_due).format('YYYY-MM-DD'),
        desc: payload.description,
        customer_id: payload.partner_id,
        total: totalPrice,
        invoice_details: listProduct,
      }

      return axiosInstance.post('keuangan/invoice/create-invoice', payloadData)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat invoice',
        callback: () => {
          navigate('/keuangan/piutang/invoice')
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

  return (
    <div>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/keuangan/piutang/invoice"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Tambah Invoice
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="">Customer</label>
            <Select
              options={supplierOption}
              onChange={(selected: any) =>
                setValue('partner_id', selected.value)
              }
            />
          </div>
          <div>
            <label htmlFor="">Tanggal Tagihan</label>
            <InputDate
              onChange={(date) => {
                setValue('invoice_date', date)
              }}
            />
          </div>
          <div>
            <label htmlFor="">Jatuh Tempo</label>
            <InputDate
              onChange={(date) => {
                setValue('invoice_date_due', date)
              }}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Catatan</label>
            <Input {...register('description')} textArea />
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
                <th className="px-3 py-4">Desc</th>
                <th className="px-3 py-4">SubTotal</th>
                <th className="px-3 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {row.map((idx) => (
                <tr key={`account-row-${idx + 1}`}>
                  <td className="px-3 py-2.5">
                    <Select
                      options={productOption}
                      onChange={(selected: any) => {
                        setValue(`product-${idx}`, selected)
                      }}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Select
                      isLoading={isFetchingAccount}
                      options={accountOption}
                      onChange={(selected: any) => {
                        setValue(`account-${idx}`, selected)
                      }}
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input {...register(`quantity-${idx}`)} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input {...register(`price_unit-${idx}`)} />
                  </td>

                  <td className="px-3 py-2.5">
                    <Input {...register(`desc-${idx}`)} />
                  </td>

                  <td className="text-center">
                    <Input
                      readOnly
                      value={
                        watch(`price_unit-${idx}`) * watch(`quantity-${idx}`)
                      }
                    />
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
        <div className="ml-auto p-6 w-fit">
          <Button
            loading={isLoading}
            onClick={() => handleSubmit((payload) => mutate(payload))()}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  )
}
