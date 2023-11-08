import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Radio, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'

export const CreateProduct = () => {
  const { register, setValue, handleSubmit, watch } = useForm()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('/odoo/odoo-api', {
        args: [
          {
            __last_update: false,
            attribute_line_ids: [],
            type: 'consu',
            company_id: false,
            image_1920: false,
            priority: '0',
            name: payload.name,
            sale_ok: true,
            purchase_ok: true,
            active: true,
            detailed_type: payload.detailed_type ?? 'consu',
            list_price: payload.list_price,
            taxes_id: [[6, false, []]],
            standard_price: 0,
            categ_id: payload.categ_id,
            default_code: false,
            barcode: false,
            product_tag_ids: [[6, false, []]],
            description: false,
            description_sale: false,
            supplier_taxes_id: [[6, false, [2]]],
            property_account_income_id: false,
            property_account_expense_id: false,
            asset_category_id: false,
          },
        ],
        model: 'product.template',
        method: 'create',
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            search_default_filter_to_purchase: 1,
          },
        },
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat product',
        callback: () => {
          navigate('/keuangan/hutang/product')
        },
      })
    },
  })

  return (
    <div>
      <Link
        className="flex items-center text-main-blue-alurkerja gap-1 mb-4"
        to="/keuangan/hutang/product"
      >
        <ArrowLeft />
        Kembali
      </Link>
      <div className="bg-white">
        <div className="w-full h-14 px-6 py-3.5  rounded-tl rounded-tr border border-slate-200 justify-start items-center inline-flex">
          <div className="text-gray-700 text-base font-semibold">
            Tambah Product
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Nama Product
            </label>
            <Input
              {...register('name', { required: true })}
              placeholder="Masukkan nama barang"
            />
          </div>
          <div>
            <label htmlFor="name">Tipe Product</label>
            <Select
              options={[
                { label: 'Consumeable', value: 'consu' },
                { label: 'Service', value: 'service' },
              ]}
              placeholder="Kategori Product"
              onChange={(v: any) => setValue('detailed_type', v.value)}
              defaultValue={{ label: 'Consumeable', value: 'consu' }}
            />
          </div>
          <div>
            <label htmlFor="name">Kategori Product</label>
            <Select
              options={[
                { label: 'All', value: 1 },
                { label: 'All / Saleable', value: 2 },
                { label: 'All / Expenses', value: 3 },
              ]}
              placeholder="Kategori Product"
              onChange={(v: any) => setValue('categ_id', v.value)}
              defaultValue={{ label: 'All', value: 1 }}
            />
          </div>

          <div>
            <label htmlFor="list_price">Harga</label>
            <Input
              {...register('list_price', { required: true })}
              placeholder="Harga Barang"
              defaultValue={1}
            />
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
