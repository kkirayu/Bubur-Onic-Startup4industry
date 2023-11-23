import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AuthContext, Input, InputDate, Select } from 'alurkerja-ui'
import _ from 'underscore'
import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { FieldValues, useForm } from 'react-hook-form'

import {
  getListAccount,
  getListCustomer,
  getListProduct,
  useItemFetcher,
} from '@/api'
import { Button, Dialog } from '@/components'

export const DetailInvoice = () => {
  const params = useParams()
  const navigate = useNavigate()
  const axiosInstance = useContext(AuthContext)
  const { handleSubmit, setValue, register, watch } = useForm()

  const [readonly, setReadonly] = useState(true)
  const [invoiceDetails, setInvoiceDetails] = useState<any[]>([])

  const { listOption: ListOptionCustomer, isLoading: onFetchingCustomer } =
    getListCustomer()
  const { listOption: listOptionProduct, isLoading: onFetchingProduct } =
    getListProduct()
  const { listOption: listOptionAccount, isLoading: onFetchingAccount } =
    getListAccount()

  const { data: invoice, refetch } = useItemFetcher({
    url: 'keuangan/invoice/' + params.id,
    queryKey: ['invoice', params.id!!],
    onSuccess: (data) => {
      const keys = [
        'due_date',
        'invoice_date',
        'customer_id',
        'desc',
        'invoice_details',
      ]

      keys.forEach((key) => {
        if (key === 'invoice_details') {
          data.invoice_details.forEach((invoiceDetail: any, idx: number) => {
            setValue(`product-${idx}`, invoiceDetail.id)
            setValue(`account-${idx}`, invoiceDetail.id)
            setValue(`quantity-${idx}`, invoiceDetail.qty)
            setValue(`price_unit-${idx}`, invoiceDetail.price)
            setValue(`desc-${idx}`, invoiceDetail.description)
          })
        } else {
          setValue(key, data[key])
        }
      })

      setInvoiceDetails(data.invoice_details)

      if (data.post_status === 'DRAFT') {
        setReadonly(false)
      } else {
        setReadonly(true)
      }
    },
  })

  const { mutate: confirm, isLoading: isLoadingConfirm } = useMutation({
    mutationFn: (payload: FieldValues) => {
      let totalPrice = 0
      const listProduct = invoiceDetails.map((_, idx) => {
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
          product_id: product,
          qty: +quantity,
          account_id: account,
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
        desc: payload.desc,
        customer_id: payload.customer_id,
        total: totalPrice,
        invoice_details: listProduct,
      }

      return axiosInstance.post(
        `/keuangan/invoice/${params.id}/post`,
        payloadData
      )
    },
    onSuccess: () => {
      refetch()

      Dialog.success({
        description: 'Berhasil membuat journal piutang',
      })
    },
  })

  const { mutate: onUnPost, isLoading: isLoadingUnPost } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(`/keuangan/invoice/${params.id}/un-post`)
    },
    onSuccess: () => {
      refetch()
      Dialog.success({
        description: 'Berhasil mengubah journal menjadi draft',
      })
    },
  })

  const addRow = () => {
    setInvoiceDetails((prev) => [...prev, {}])
  }

  if (invoice == null) {
    return <>Fetching..</>
  }
  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        <Link
          className="flex items-center text-main-blue-alurkerja gap-1"
          to="/keuangan/hutang/tagihan"
        >
          <ArrowLeft />
          Kembali
        </Link>
        <Button
          loading={isLoadingConfirm}
          onClick={() =>
            invoice.post_status === 'POSTED'
              ? navigate('pembayaran')
              : handleSubmit((payload) => confirm(payload))()
          }
        >
          {invoice.post_status === 'POSTED' ? 'Register Payment' : 'Confirm'}
        </Button>
        {invoice.post_status === 'POSTED' && (
          <Button
            variant="outlined"
            onClick={() => onUnPost()}
            loading={isLoadingUnPost}
          >
            Reset To Draft
          </Button>
        )}
      </div>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Detail Invoice
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="">Customer</label>
            <Select
              isLoading={onFetchingCustomer}
              options={ListOptionCustomer}
              defaultValue={{
                label: invoice.customer.name,
                value: invoice.customer.id,
              }}
              onChange={(selected: any) =>
                setValue('customer_id', selected.value)
              }
            />
          </div>
          <div>
            <label htmlFor="">Tanggal Tagihan</label>
            <InputDate
              defaultValue={new Date(invoice.invoice_date)}
              onChange={(date) => {
                setValue('invoice_date', date)
              }}
            />
          </div>
          <div>
            <label htmlFor="">Jatuh Tempo</label>
            <InputDate
              defaultValue={new Date(invoice.due_date)}
              onChange={(date) => {
                setValue('due_date', date)
              }}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Catatan</label>
            <Input {...register('desc')} textArea />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-end items-center mb-2.5">
            <Button disabled={readonly} onClick={addRow}>
              Tambah Product
            </Button>
          </div>
          <table className="w-full table-auto">
            <thead className="bg-[#F8F9FD]">
              <tr className="uppercase text-left">
                <th className="px-3 py-4">Product</th>
                <th className="px-3 py-4">Account</th>
                <th className="px-3 py-4 w-40">Jumlah</th>
                <th className="px-3 py-4 w-40">Harga</th>
                <th className="px-3 py-4">Desc</th>
                <th className="px-3 py-4 w-40">SubTotal</th>
                <th className="px-3 py-4 w-20 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetails.map((item: any, idx: any) => {
                const defaultValueProduct = item?.account_instance
                  ? {
                      label: item?.product_instance.name,
                      value: item?.product_instance.id,
                    }
                  : {}

                const defaultValuePAccount = item?.account_instance
                  ? {
                      label: item.account_instance.nama,
                      value: item.account_instance.id,
                    }
                  : {}

                return (
                  <tr key={`row-${idx + 1}`}>
                    <td className="px-3 py-2.5">
                      <Select
                        isLoading={onFetchingProduct}
                        options={listOptionProduct}
                        defaultValue={defaultValueProduct}
                        onChange={(selected: any) => {
                          setValue(`product-${item.idx}`, selected.value)
                        }}
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <Select
                        isLoading={onFetchingAccount}
                        options={listOptionAccount}
                        defaultValue={defaultValuePAccount}
                        onChange={(selected: any) => {
                          setValue(`account-${idx}`, selected.value)
                        }}
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <Input
                        {...register(`quantity-${idx}`)}
                        readOnly={readonly}
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <Input
                        {...register(`price_unit-${idx}`)}
                        readOnly={readonly}
                      />
                    </td>

                    <td className="px-3 py-2.5">
                      <Input {...register(`desc-${idx}`)} readOnly={readonly} />
                    </td>
                    <td className="text-center">
                      <Input
                        readOnly
                        value={
                          watch(`price_unit-${idx}`) * watch(`quantity-${idx}`)
                        }
                      />
                    </td>
                    <td className="text-center px-3 py-2.5">
                      <Button
                        disabled={readonly}
                        color="red"
                        // onClick={() => removeAccoutRow(idx)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
