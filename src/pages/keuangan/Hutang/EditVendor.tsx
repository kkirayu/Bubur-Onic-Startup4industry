import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Radio, Skeleton } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'
import moment from 'moment'

export const EditVendor = () => {
  const { register, setValue, handleSubmit, watch } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isFetching } = useQuery({
    cacheTime: 0,
    queryKey: ['vendors', id],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          args: [
            [+id!!],
            [
              '__last_update',
              'same_vat_partner_id',
              'partner_gid',
              'additional_info',
              'vies_failed_message',
              'same_company_registry_partner_id',
              'currency_id',
              'total_invoiced',
              'payment_token_count',
              'avatar_128',
              'image_1920',
              'is_company',
              'commercial_partner_id',
              'active',
              'company_id',
              'country_code',
              'company_type',
              'name',
              'parent_id',
              'company_name',
              'type',
              'street',
              'street2',
              'city',
              'state_id',
              'zip',
              'country_id',
              'vat',
              'l10n_id_pkp',
              'function',
              'phone_blacklisted',
              'mobile_blacklisted',
              'phone',
              'mobile',
              'user_ids',
              'is_blacklisted',
              'email',
              'website',
              'title',
              'active_lang_count',
              'lang',
              'category_id',
              'child_ids',
              'user_id',
              'property_payment_term_id',
              'property_product_pricelist',
              'property_supplier_payment_term_id',
              'property_account_position_id',
              'company_registry',
              'ref',
              'industry_id',
              'latest_followup_date',
              'latest_followup_level_id',
              'payment_responsible_id',
              'payment_next_action_date',
              'payment_next_action',
              'payment_note',
              'unreconciled_aml_ids',
              'payment_amount_due',
              'duplicated_bank_account_partners_count',
              'show_credit_limit',
              'bank_ids',
              'property_account_receivable_id',
              'property_account_payable_id',
              'credit',
              'use_partner_credit_limit',
              'credit_limit',
              'l10n_id_kode_transaksi',
              'l10n_id_nik',
              'l10n_id_tax_address',
              'l10n_id_tax_name',
              'comment',
              'display_name',
            ],
          ],
          model: 'res.partner',
          method: 'read',
          kwargs: {
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              bin_size: true,
              search_default_supplier: 1,
              res_partner_search_mode: 'supplier',
              default_is_company: true,
              default_supplier_rank: 1,
            },
          },
        })
        .then((res) => res.data.data[0])
    },
    onSuccess: (data) => {
      const keys = [
        'company_type',
        'name',
        'street',
        'street2',
        'city',
        'zip',
        'phone',
        'email',
        'website',
      ]
      keys.forEach((key) => {
        setValue(key, data[key] !== false ? data[key] : '')
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      const body: { [x: string]: string | number | boolean } = {}
      Object.keys(payload).forEach((key) => {
        if (payload[key] !== '') {
          body[key] = payload[key]
        }
      })
      return axiosInstance.post('/odoo/odoo-api', {
        args: [[+id!!], body],
        model: 'res.partner',
        method: 'write',
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
            Edit Vendor
          </div>
        </div>
        {!isFetching ? (
          <>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-6">
                <div>
                  <Radio
                    listOption={[
                      { label: 'Individual', key: 'person' },
                      { label: 'Company', key: 'company' },
                    ]}
                    defaultValue="company"
                    onChange={(selected) => setValue('company_type', selected)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="display_name"
                    className="after:content-['*'] after:text-red-400 after:text-sm"
                  >
                    Nama
                  </label>
                  <Input
                    {...register('name', { required: true })}
                    placeholder="contoh: PT RES"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="display_name">Alamat</label>
                <div className="space-y-6">
                  <Input {...register('street')} placeholder="jalan" />
                  <Input {...register('street2')} placeholder="jalan 2" />
                  <div className="flex gap-2">
                    <Input {...register('city')} placeholder="Kota" />
                    <Input {...register('state')} placeholder="Provinsi" />
                    <Input {...register('zip')} placeholder="ZIP" />
                  </div>
                  <Input {...register('country')} placeholder="Negara" />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="display_name">Nomor Tlp / HP</label>
                  <Input {...register('phone')} type="number" />
                </div>

                <div>
                  <label htmlFor="display_name">Email</label>
                  <Input {...register('email')} />
                </div>
                <div>
                  <label htmlFor="display_name">Website</label>
                  <Input {...register('website')} />
                </div>
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
          </>
        ) : (
          <div className="p-6">
            <div className="space-y-1">
              <Skeleton width={50} />
              <Skeleton height={40} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
