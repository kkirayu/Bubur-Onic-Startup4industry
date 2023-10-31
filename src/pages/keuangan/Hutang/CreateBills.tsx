import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, InputDate } from 'alurkerja-ui'
import { useState } from 'react'
import moment from 'moment'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import {
  axiosInstance,
  getListAccount,
  getListProduct,
  getListSupplier,
} from '@/api'
import { Button, Dialog } from '@/components'

export const CreateBills = () => {
  const { register, watch, setValue, handleSubmit } = useForm()
  const navigate = useNavigate()

  const [row, setRow] = useState([0])

  const { listOption: supplierOption } = getListSupplier()
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
        const quantityKey = `quantity-${idx}`
        const priceKey = `price_unit-${idx}`

        const product = payload[productKey]
        const quantity = payload[quantityKey]
        const price = payload[priceKey]

        totalPrice += +price

        return {
          name: product.label,
          product_id: product.value,
          quantity: +quantity,
          price_unit: price,
          analytic_precision: 2,
          sequence: 100,
          asset_category_id: false,
          account_id: 67,
          analytic_distribution: false,
          discount: 0,
          tax_ids: [[6, false, []]],
          partner_id: 9,
          currency_id: 12,
          display_type: 'product',
          product_uom_id: 1,
        }
      })

      const invoiceLine = listProduct.map((product, idx) => [
        0,
        `virtual_${idx}`,
        product,
      ])
      return axiosInstance.post('/odoo/odoo-api', {
        args: [
          {
            date: moment(new Date()).format('YYYY-MM-DD'),
            auto_post: 'no',
            auto_post_until: false,
            company_id: 1,
            journal_id: 2,
            show_name_warning: false,
            posted_before: false,
            payment_state: 'not_paid',
            currency_id: 12,
            statement_line_id: false,
            payment_id: false,
            tax_cash_basis_created_move_ids: [],
            name: '/',
            partner_id: payload.partner_id,
            l10n_id_kode_transaksi: false,
            l10n_id_replace_invoice_id: false,
            quick_edit_total_amount: 0,
            ref: 'Pembelian-' + moment(new Date()).format('YYYY-MM-DD'),
            invoice_vendor_bill_id: false,
            invoice_date: moment(payload.invoice_date).format('YYYY-MM-DD'),
            payment_reference: false,
            partner_bank_id: false,
            invoice_date_due: moment(payload.invoice_date_due).format(
              'YYYY-MM-DD'
            ),
            invoice_payment_term_id: false,
            invoice_line_ids: invoiceLine,
            narration: false,
            line_ids: [],
            user_id: 2,
            invoice_user_id: 2,
            invoice_origin: false,
            qr_code_method: false,
            invoice_incoterm_id: false,
            fiscal_position_id: false,
            invoice_source_email: false,
            to_check: false,
            l10n_id_tax_number: false,
          },
        ],
        model: 'account.move',
        method: 'create',
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            params: {
              id: 25,
              cids: 1,
              menu_id: 115,
              action: 233,
              model: 'account.move',
              view_type: 'form',
            },
            default_move_type: 'in_invoice',
          },
        },
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat hutang',
        callback: () => {
          navigate('/keuangan/hutang/tagihan')
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
        to="/keuangan/hutang/tagihan"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Tambah Tagihan
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="">Nama Supplier</label>
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
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input {...register(`quantity-${idx}`)} />
                  </td>
                  <td className="px-3 py-2.5">
                    <Input {...register(`price_unit-${idx}`)} />
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
