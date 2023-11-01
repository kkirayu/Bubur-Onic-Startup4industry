import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, InputDate, Spinner } from 'alurkerja-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import { axiosInstance, getListProduct, getListSupplier } from '@/api'
import { Button, Dialog } from '@/components'
import _ from 'underscore'

export const DetailInvoice = () => {
  const { register, watch, setValue, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()

  const { listOption: supplierOption } = getListSupplier()
  const { listOption: productOption } = getListProduct()

  const [row, setRow] = useState<number[]>([])
  const [currentPartner, setCurrentPartner] = useState<{
    label: string
    value: number | string
  }>()
  const [readonly, setReadonly] = useState(true)

  const removeAccoutRow = (idx: number) => {
    setRow((prev) => prev.filter((prevIdx) => prevIdx !== idx))
  }

  const addAccountRow = () => {
    // selalu increment index meskipun row ada yang dihapus
    setRow((prev) => [...prev, prev[prev.length - 1] + 1])
  }

  const { data: accountOptions } = useQuery({
    queryKey: ['account-odoo-option'],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          model: 'account.account',
          method: 'name_search',
          args: [],
          kwargs: {
            name: '',
            operator: 'ilike',
            args: [
              '&',
              '&',
              '&',
              ['deprecated', '=', false],
              [
                'account_type',
                'not in',
                ['asset_receivable', 'liability_payable'],
              ],
              ['company_id', '=', 1],
              ['is_off_balance', '=', false],
            ],
            limit: 8,
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              partner_id: 9,
              move_type: 'in_invoice',
            },
          },
        })
        .then((res) => res.data.data)
        .then((res) =>
          res.map((item: [number, string]) => ({
            label: item[1],
            value: item[0],
          }))
        )
    },
  })

  const { data: detailInvoice } = useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          args: [
            [+id!!],
            [
              'authorized_transaction_ids',
              'edi_show_cancel_button',
              'edi_show_abandon_cancel_button',
              'state',
              'edi_blocking_level',
              'edi_error_count',
              'edi_web_services_to_process',
              'edi_error_message',
              'tax_lock_date_message',
              'date',
              'auto_post',
              'auto_post_until',
              'partner_credit_warning',
              'transaction_ids',
              'id',
              'company_id',
              'journal_id',
              'show_name_warning',
              'posted_before',
              'move_type',
              'payment_state',
              'invoice_filter_type_domain',
              'suitable_journal_ids',
              'currency_id',
              'company_currency_id',
              'commercial_partner_id',
              'bank_partner_id',
              'display_qr_code',
              'show_reset_to_draft_button',
              'invoice_has_outstanding',
              'is_move_sent',
              'has_reconciled_entries',
              'restrict_mode_hash_table',
              'country_code',
              'display_inactive_currency_warning',
              'statement_line_id',
              'payment_id',
              'tax_country_id',
              'tax_cash_basis_created_move_ids',
              'quick_edit_mode',
              'hide_post_button',
              'duplicated_ref_ids',
              'quick_encoding_vals',
              'highest_name',
              'name',
              'partner_id',
              'l10n_id_need_kode_transaksi',
              'l10n_id_attachment_id',
              'l10n_id_kode_transaksi',
              'l10n_id_replace_invoice_id',
              'quick_edit_total_amount',
              'ref',
              'tax_cash_basis_origin_move_id',
              'invoice_vendor_bill_id',
              'invoice_date',
              'payment_reference',
              'partner_bank_id',
              'invoice_date_due',
              'invoice_payment_term_id',
              'edi_state',
              'invoice_line_ids',
              'narration',
              'tax_totals',
              'invoice_payments_widget',
              'amount_residual',
              'invoice_outstanding_credits_debits_widget',
              'line_ids',
              'user_id',
              'invoice_user_id',
              'invoice_origin',
              'qr_code_method',
              'invoice_incoterm_id',
              'fiscal_position_id',
              'invoice_source_email',
              'to_check',
              'l10n_id_tax_number',
              'l10n_id_csv_created',
              'reversed_entry_id',
              'display_name',
            ],
          ],
          model: 'account.move',
          method: 'read',
          kwargs: {
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              bin_size: true,
              params: {
                cids: 1,
                menu_id: 115,
                action: 231,
                model: 'account.move',
                view_type: 'form',
                id: 50,
              },
              default_move_type: 'out_invoice',
            },
          },
        })
        .then((res) => res.data.data[0])
    },
    onSuccess: (data) => {
      setRow(data.invoice_line_ids)
      setCurrentPartner({
        label: data.partner_id[1],
        value: data.partner_id[0],
      })
    },
  })

  const productID = detailInvoice?.invoice_line_ids

  const { data: detailProduct, refetch } = useQuery({
    queryKey: ['detail-product'],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          args: [
            productID,
            [
              'analytic_precision',
              'sequence',
              'product_id',
              'name',
              'asset_category_id',
              'account_id',
              'analytic_distribution',
              'quantity',
              'product_uom_category_id',
              'price_unit',
              'discount',
              'tax_ids',
              'price_subtotal',
              'partner_id',
              'currency_id',
              'company_id',
              'company_currency_id',
              'display_type',
              'product_uom_id',
            ],
          ],
          model: 'account.move.line',
          method: 'read',
          kwargs: {
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              params: {
                id: 35,
                cids: 1,
                menu_id: 115,
                action: 233,
                model: 'account.move',
                view_type: 'form',
              },
              default_move_type: 'in_invoice',
              journal_id: 2,
              default_partner_id: 9,
              default_currency_id: 12,
              default_display_type: 'product',
              quick_encoding_vals: false,
            },
          },
        })
        .then((res) => res.data.data)
    },
    enabled: !!productID,
    onSuccess: (data) => {
      data.forEach((product: any) => {
        setValue(`quantity-${product.id}`, product.quantity)
        setValue(`price_unit-${product.id}`, product.price_unit)
      })
    },
  })

  const { mutate: onConfirm, isLoading: isLoadingConfirm } = useMutation({
    mutationFn: () => {
      return axiosInstance.post('/odoo/odoo-api', {
        args: [[+id!!]],
        kwargs: {
          context: {
            params: {
              cids: 1,
              menu_id: 115,
              action: 231,
              model: 'account.move',
              view_type: 'form',
              id: 50,
            },
            default_move_type: 'out_invoice',
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            validate_analytic: true,
          },
        },
        method: 'action_post',
        model: 'account.move',
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat journal piutang',
        callback: () => {
          navigate('/keuangan/piutang/invoice')
        },
      })
    },
  })

  const { mutate: mutateToDraft, isLoading: isLoadingMutateToDraft } =
    useMutation({
      mutationFn: () => {
        return axiosInstance.post('/odoo/odoo-api', {
          args: [[+id!!]],
          kwargs: {
            context: {
              params: {
                id: 36,
                cids: 1,
                menu_id: 115,
                action: 233,
                model: 'account.move',
                view_type: 'form',
              },
              default_move_type: 'in_invoice',
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
            },
          },
          method: 'button_draft',
          model: 'account.move',
        })
      },
      onSuccess: () => {
        refetch()
      },
    })

  if (!detailProduct) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-4 items-center  mb-4">
        <Link
          className="flex items-center text-main-blue-alurkerja gap-1"
          to="/keuangan/hutang/invoice"
        >
          <ArrowLeft />
          Kembali
        </Link>
        <Button
          loading={isLoadingConfirm}
          onClick={() =>
            detailInvoice.state === 'posted'
              ? navigate('pembayaran')
              : onConfirm()
          }
        >
          {detailInvoice.state === 'posted' ? 'Register Payment' : 'Confirm'}
        </Button>
        {detailInvoice.state === 'posted' && (
          <Button
            variant="outlined"
            onClick={() => mutateToDraft()}
            loading={isLoadingMutateToDraft}
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
            <label htmlFor="">Nama Customer</label>
            {currentPartner && (
              <Select
                isDisabled={readonly}
                options={supplierOption}
                onChange={(selected: any) =>
                  setValue('partner_id', selected.value)
                }
                defaultValue={currentPartner}
              />
            )}
          </div>
          <div>
            <label htmlFor="">Tanggal Invoice</label>
            <InputDate
              disabled={readonly}
              onChange={(date) => {
                setValue('invoice_date', date)
              }}
              defaultValue={new Date(detailInvoice.invoice_date)}
            />
          </div>
          <div>
            <label htmlFor="">Jatuh Tempo</label>
            <InputDate
              disabled={readonly}
              onChange={(date) => {
                setValue('invoice_date_due', date)
              }}
              defaultValue={new Date(detailInvoice.invoice_date_due)}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Catatan</label>
            <Input {...register('description')} textArea readOnly />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-end items-center mb-2.5">
            <Button onClick={() => addAccountRow()} disabled={readonly}>
              Tambah Product
            </Button>
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
              {row.map((idx) => {
                if (detailProduct) {
                  const currentProductDetail = detailProduct?.filter(
                    (product: any) => product.id === idx
                  )[0]

                  const currentProductOption = {
                    label: currentProductDetail?.name,
                    value: currentProductDetail?.id,
                  }

                  const currentAccountOption = {
                    label: currentProductDetail?.account_id[1],
                    value: currentProductDetail?.account_id[0],
                  }

                  return (
                    <tr key={`account-row-${idx + 1}`}>
                      <td className="px-3 py-2.5">
                        <Select
                          isDisabled={readonly}
                          options={productOption}
                          onChange={(selected: any) => {
                            setValue(`product-${idx}`, selected)
                          }}
                          defaultValue={currentProductOption}
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <Select
                          isDisabled={readonly}
                          options={accountOptions}
                          defaultValue={currentAccountOption}
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <Input {...register(`quantity-${idx}`)} readOnly />
                      </td>
                      <td className="px-3 py-2.5">
                        <Input {...register(`price_unit-${idx}`)} readOnly />
                      </td>

                      <td className="text-center">
                        <Input
                          readOnly
                          value={
                            _.isNaN(
                              watch(`price_unit-${idx}`) *
                                watch(`quantity-${idx}`)
                            )
                              ? 0
                              : watch(`price_unit-${idx}`) *
                                watch(`quantity-${idx}`)
                          }
                        />
                      </td>
                      <td className="text-center">
                        <Button
                          disabled={readonly}
                          color="red"
                          onClick={() => removeAccoutRow(idx)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="ml-auto p-6 w-fit"></div>
      </div>
    </div>
  )
}
