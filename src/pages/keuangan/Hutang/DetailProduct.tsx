import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, Spinner } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { axiosInstance } from '@/api'
import { useState } from 'react'

export const DetailProduct = () => {
  const { register, setValue, watch } = useForm()
  const { id } = useParams()

  const [currentSelected, setCurrentSelected] = useState({
    detail_type: {},
    categ_id: {},
  })

  const { data, isFetching } = useQuery({
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
            Detail Product
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
            <div>{data?.name}</div>
          </div>
          <div>
            <label htmlFor="detailed_type">Tipe Product</label>
            <div>
              {data?.detailed_type === 'consu' ? 'Consumable' : 'Service'}
            </div>
          </div>
          <div>
            <label htmlFor="name">Kategori Product</label>
            <div>{data?.categ_id[1]}</div>
          </div>

          <div>
            <label htmlFor="list_price">Harga</label>
            <div>{data?.list_price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
