import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, Spinner } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'
import { useState } from 'react'

const productCategory = [
  { label: 'Consumeable', value: 'consu' },
  { label: 'Service', value: 'service' },
]

export const EditProduct = () => {
  const { register, setValue, handleSubmit } = useForm()
  const { id } = useParams()
  const navigate = useNavigate()

  const [currentSelected, setCurrentSelected] = useState<{
    categ_id: { label: string; value: string }
    detailed_type: { label: string; value: string }
  }>()

  const { isFetching } = useQuery({
    cacheTime: 0,
    queryKey: ['product', id],
    queryFn: () =>
      axiosInstance
        .post('/odoo/odoo-api', {
          args: [
            [+id!!],
            [
              '__last_update',
              'product_variant_count',
              'is_product_variant',
              'attribute_line_ids',
              'type',
              'company_id',
              'pricelist_item_count',
              'id',
              'image_1920',
              'priority',
              'name',
              'sale_ok',
              'purchase_ok',
              'active',
              'detailed_type',
              'product_tooltip',
              'list_price',
              'tax_string',
              'taxes_id',
              'standard_price',
              'categ_id',
              'default_code',
              'barcode',
              'product_tag_ids',
              'currency_id',
              'cost_currency_id',
              'product_variant_id',
              'description',
              'description_sale',
              'supplier_taxes_id',
              'property_account_income_id',
              'property_account_expense_id',
              'asset_category_id',
              'display_name',
            ],
          ],
          model: 'product.template',
          method: 'read',
          kwargs: {
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              bin_size: true,
              search_default_filter_to_purchase: 1,
            },
          },
        })
        .then((res) => res.data.data[0]),
    onSuccess: (data) => {
      const inputKeys = ['name', 'list_price', 'detailed_type', 'categ_id']
      inputKeys.forEach((key) => {
        if (key === 'categ_id') {
          setValue(key, data[key][0])
        } else {
          setValue(key, data[key])
        }
      })

      setCurrentSelected(() => ({
        detailed_type: productCategory.filter(
          (obj) => obj.value === data.detailed_type
        )[0],
        categ_id: { label: data.categ_id[1], value: data.categ_id[0] },
      }))
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) =>
      axiosInstance.post('/odoo/odoo-api', {
        args: [[+id!!], payload],
        model: 'product.template',
        method: 'write',
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            params: {
              id: 6,
              cids: 1,
              menu_id: 115,
              action: 254,
              model: 'product.template',
              view_type: 'form',
            },
          },
        },
      }),
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil mengedit product',
        callback: () => {
          navigate('/keuangan/hutang/product')
        },
      })
    },
  })

  if (isFetching) {
    return (
      <>
        <Spinner />
      </>
    )
  }

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
            Edit Product
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
            <label htmlFor="detailed_type">Tipe Product</label>
            {currentSelected?.detailed_type && (
              <Select
                options={productCategory}
                placeholder="Kategori Product"
                onChange={(v: any) => setValue('detailed_type', v.value)}
                defaultValue={currentSelected.detailed_type}
              />
            )}
          </div>
          <div>
            <label htmlFor="name">Kategori Product</label>
            {currentSelected?.categ_id && (
              <Select
                options={[
                  { label: 'All', value: 1 },
                  { label: 'All / Saleable', value: 2 },
                  { label: 'All / Expenses', value: 3 },
                ]}
                placeholder="Kategori Product"
                onChange={(v: any) => setValue('categ_id', v.value)}
                defaultValue={currentSelected.categ_id}
              />
            )}
          </div>

          <div>
            <label htmlFor="list_price">Harga</label>
            <Input
              {...register('list_price', { required: true })}
              placeholder="Harga Barang"
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
