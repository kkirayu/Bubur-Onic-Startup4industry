import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'

export const CreateVendor = () => {
  const { register, setValue, handleSubmit } = useForm()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('/odoo/odoo-api', {
        args: [
          {
            __last_update: false,
            partner_gid: 0,
            additional_info: false,
            image_1920: false,
            is_company: true,
            active: true,
            company_id: false,
            company_type: payload.company_type ?? 'company',
            name: payload.name,
            parent_id: false,
            company_name: false,
            type: 'contact',
            street: false,
            street2: false,
            city: false,
            state_id: false,
            zip: false,
            country_id: false,
            vat: false,
            l10n_id_pkp: false,
            function: false,
            phone: false,
            mobile: false,
            user_ids: [],
            email: false,
            website: false,
            title: false,
            lang: 'en_US',
            category_id: [[6, false, []]],
            child_ids: [],
            user_id: false,
            property_payment_term_id: false,
            property_product_pricelist: false,
            property_supplier_payment_term_id: false,
            property_account_position_id: false,
            company_registry: false,
            ref: false,
            industry_id: false,
            payment_responsible_id: false,
            payment_next_action_date: false,
            payment_next_action: false,
            payment_note: false,
            unreconciled_aml_ids: [],
            bank_ids: [],
            property_account_receivable_id: 9,
            property_account_payable_id: 29,
            use_partner_credit_limit: false,
            credit_limit: 0,
            l10n_id_kode_transaksi: false,
            l10n_id_nik: false,
            l10n_id_tax_address: false,
            l10n_id_tax_name: false,
            comment: false,
          },
        ],
        model: 'res.partner',
        method: 'create',
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            search_default_supplier: 1,
            res_partner_search_mode: 'supplier',
            default_is_company: true,
            default_supplier_rank: 1,
          },
        },
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat vendor',
        callback: () => {
          navigate('/keuangan/hutang/vendor')
        },
      })
    },
  })

  return (
    <div>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/keuangan/hutang/vendor"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Tambah Vendor
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="description">Nama</label>
            <Select
              options={[
                { label: 'Individual', value: 'person' },
                { label: 'Company', value: 'company' },
              ]}
              defaultValue={{ label: 'Company', value: 'company' }}
              onChange={(selected: any) =>
                setValue('company_type', selected.value)
              }
            />
          </div>
          <div>
            <label
              htmlFor="display_name"
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nama
            </label>
            <Input {...register('name', { required: true })} />
          </div>
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
