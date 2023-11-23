import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, InputDate, Radio, Select } from 'alurkerja-ui'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FieldValues, useForm } from 'react-hook-form'

export const BillPayment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, setValue, handleSubmit, watch } = useForm()

  const { data } = useQuery({
    queryKey: ['bills', id],
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
              default_move_type: 'in_invoice',
            },
          },
        })
        .then((res) => res.data.data[0])
    },
    onSuccess: (data) => {
      setValue('amount', data.amount_residual)
      setValue('memo', data.name)
      setValue('payment_date', new Date())
    },
  })

  const { data: journalOptions } = useQuery({
    queryKey: ['journal-odoo-option'],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          model: 'account.journal',
          method: 'name_search',
          args: [],
          kwargs: {
            name: '',
            operator: 'ilike',
            args: [['id', 'in', [7, 6]]],
            limit: 8,
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
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

  const { data: paymentMethodOptions } = useQuery({
    queryKey: ['payment-method-odoo-option'],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          model: 'account.payment.method.line',
          method: 'name_search',
          args: [],
          kwargs: {
            name: '',
            operator: 'ilike',
            args: [['id', 'in', [4]]],
            limit: 8,
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
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

  const { mutate: createPayment, isLoading: isLoadingCreatePayment } =
    useMutation({
      mutationFn: (paymentID: number) => {
        return axiosInstance.post('/odoo/odoo-api', {
          args: [[paymentID]],
          kwargs: {
            context: {
              params: {
                id: 41,
                cids: 1,
                menu_id: 115,
                action: 233,
                model: 'account.move',
                view_type: 'form',
              },
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              dont_redirect_to_payments: true,
              active_model: 'account.move',
              active_id: +id!!,
              active_ids: [+id!!],
            },
          },
          method: 'action_create_payments',
          model: 'account.payment.register',
        })
      },
      onSuccess: () => {
        Dialog.success({
          description: 'Berhasil melakukan pembayaran',
          callback: () => {
            navigate('/keuangan/hutang/tagihan')
          },
        })
      },
    })

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('/odoo/odoo-api', {
        args: [
          {
            can_edit_wizard: true,
            can_group_payments: false,
            early_payment_discount_mode: false,
            payment_type: 'outbound',
            partner_type: 'supplier',
            source_amount: data.amount_residual,
            source_amount_currency: data.amount_residual,
            source_currency_id: 12,
            company_id: 1,
            partner_id: 19,
            country_code: 'ID',
            journal_id: 7,
            payment_method_line_id: 4,
            payment_token_id: false,
            partner_bank_id: false,
            group_payment: true,
            amount: payload.amount,
            currency_id: 12,
            payment_date: payload.payment_date,
            communication: payload.memo,
            payment_difference_handling: 'open',
            writeoff_account_id: false,
            writeoff_label: 'Write-Off',
          },
        ],
        model: 'account.payment.register',
        method: 'create',
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
            dont_redirect_to_payments: true,
            active_model: 'account.move',
            active_id: +id!!,
            active_ids: [+id!!],
          },
        },
      })
    },
    onSuccess: (data) => {
      const paymentID = data.data.data[0]
      createPayment(paymentID)
    },
  })

  return (
    <div>
      <div className="flex gap-4 items-center  mb-4">
        <Link
          className="flex items-center text-main-blue-alurkerja gap-1"
          to="/keuangan/hutang/tagihan"
        >
          <ArrowLeft />
          Kembali
        </Link>
      </div>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Register Payment
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="">Journal</label>
              <Select
                options={journalOptions}
                onChange={(selected: any) => {
                  setValue('journal_id', selected.value)
                }}
              />
            </div>
            <div>
              <label htmlFor="">Metode Pembayaran</label>
              <Select
                options={paymentMethodOptions}
                onChange={(selected: any) => {
                  setValue('payment_method_line_id', selected.value)
                }}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="">Jumlah</label>
              <Input {...register('amount')} />
            </div>
            {data?.amount_residual - watch('amount') !== 0 && (
              <div>
                <label htmlFor="">Payment Difference</label>
                <Input value={data?.amount_residual - watch('amount')} />
                <Radio
                  name="payment_difference"
                  listOption={[
                    { label: 'Keep Open', key: 1 },
                    { label: 'Mark As Fully Paid', key: 2 },
                  ]}
                  defaultValue={1}
                />
              </div>
            )}

            <div>
              <label htmlFor="">Tanggal Pembayaran</label>
              <InputDate
                defaultValue={new Date()}
                onChange={(date) => setValue('payment_date', date)}
              />
            </div>
            <div>
              <label htmlFor="">Memo</label>
              <Input {...register('memo')} />
            </div>
          </div>
        </div>
        <div className="w-fit ml-auto p-6 flex items-center gap-4">
          <Button
            loading={isLoading || isLoadingCreatePayment}
            onClick={() => handleSubmit((payload) => mutate(payload))()}
          >
            Buat Pembayaran
          </Button>
          <Button variant="outlined">Cancel</Button>
        </div>
      </div>
    </div>
  )
}
