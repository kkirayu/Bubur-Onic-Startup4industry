import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, InputDate } from 'alurkerja-ui'
import { useState } from 'react'
import moment from 'moment'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  axiosInstance,
  getListAccount,
  getListCustomer,
  getListProduct,
  getListSupplier,
  simpleItemFetcher,
} from '@/api'
import { Button, Dialog } from '@/components'
import { p } from 'vitest/dist/index-81973d31'

export const DetailInvoice = () => {
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
  const params = useParams()


  const { data: detailData, isLoading: isDetailLoading } = simpleItemFetcher({
    url: "keuangan/invoice/" + params.id,
    queryKey: "DetailItem",
  });



  const addAccountRow = () => {
    // selalu increment index meskipun row ada yang dihapus
    setRow((prev) => [...prev, prev[prev.length - 1] + 1])
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      let totalPrice = 0
      const listProduct = row.map((idx) => {
        const productKey = `product-${idx}`
        const quantityKey = `quantity-${idx}`
        const priceKey = `price_unit-${idx}`
        const descriptionKey = `desc-${idx}`

        const product = payload[productKey]
        const quantity = payload[quantityKey]
        const price = payload[priceKey]
        const desc = payload[descriptionKey]

        totalPrice += +price

        return {
          "product_id": product.value,
          "qty": +quantity,
          "account_id": 1,
          "price": price,
          "total": price * quantity,
          "discount": 0,
          "tax": 0,
          "subtotal": price * quantity,
          "description": desc,
        }
      })
      const payloadData = {
        "invoice_date": payload.invoice_date,
        "due_date": payload.invoice_date_due,
        "desc": payload.description,
        "customer_id": payload.partner_id,
        "total": totalPrice,
        "invoice_details": listProduct
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

  if (detailData == null) {
    return <>Fetching</>
  }
  return (
    <div>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/keuangan/hutang/tagihan"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Detail Invoice
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="">Customer</label>
            <Input readOnly value={
              detailData.customer.name
            } />
          </div>
          <div>
            <label htmlFor="">Tanggal Tagihan</label>
            <Input readOnly value={
              detailData.invoice_date
            } />
          </div>
          <div>
            <label htmlFor="">Jatuh Tempo</label>
            <Input readOnly value={
              detailData.due_date
            } />
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Catatan</label>
            <Input textArea readOnly value={
              detailData.desc
            } />
          </div>
        </div>
        <div className="p-6">
          <table className="w-full table-auto">
            <thead className="bg-[#F8F9FD]">
              <tr className="uppercase text-left">
                <th className="px-3 py-4">Product</th>
                <th className="px-3 py-4">Account</th>
                <th className="px-3 py-4">Jumlah</th>
                <th className="px-3 py-4">Harga</th>
                <th className="px-3 py-4">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {detailData.invoice_details.map((item: any, index: any) => (
                <tr key={`account-row-${index + 1}`}>
                  <td className="px-3 py-2.5">
                    <Input  readOnly value={
                      item.product_instance.name
                    } />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input  readOnly value={
                      item.account_instance.nama
                    } />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input  readOnly value={
                      item.qty
                    } />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input  readOnly value={
                      item.price
                    } />
                  </td>

                  <td className="text-center">
                    <Input  readOnly value={
                      item.total
                    } />
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
