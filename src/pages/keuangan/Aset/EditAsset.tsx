import { useEffect } from 'react'
import { Input, Select } from 'alurkerja-ui'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorMessage } from '@hookform/error-message'
import CurrencyInput from 'react-currency-input-field'
import _ from 'underscore'

import { Button, Dialog } from '@/components'
import { axiosInstance, getListCategoryAsset, getListSupplier } from '@/api'

export const EditAsset = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm()
  const { listOption: optionCategoryAsset } = getListCategoryAsset()
  const { listOption: optionSupplier } = getListSupplier()

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('/odoo/odoo-api', {
        args: [
          +id!!,
          {
            name: payload.name,
            date: payload.date,
            value: payload.value,
            value_residual: payload.value - payload.salvage_value,
          },
        ],
        model: 'account.asset.asset',
        method: 'write',
        kwargs: {
          context: {
            lang: 'en_US',
            tz: 'Asia/Jakarta',
            uid: 2,
            allowed_company_ids: [1],
            params: {
              action: 300,
              model: 'account.asset.asset',
              view_type: 'list',
              cids: 1,
              menu_id: 115,
            },
          },
        },
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil mengedit Asset',
        callback: () => {
          navigate('/keuangan/aset')
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

  const { data, isLoading: onFetchingDetail } = useQuery({
    queryKey: ['list'],
    queryFn: async () => {
      return axiosInstance
        .post('/odoo/odoo-api', {
          model: 'account.asset.asset',
          method: 'web_search_read',
          args: [],
          kwargs: {
            limit: 80,
            offset: 0,
            order: '',
            context: {
              lang: 'en_US',
              tz: 'Asia/Jakarta',
              uid: 2,
              allowed_company_ids: [1],
              bin_size: true,
            },
            count_limit: 10001,
            domain: [['category_id.type', '=', 'purchase']],
            fields: [
              'name',
              'category_id',
              'date',
              'partner_id',
              'value',
              'value_residual',
              'currency_id',
              'state',
            ],
          },
        })
        .then((res) =>
          res.data?.data.records.filter((asset: any) => asset.id === +id!!)
        )
    },
  })

  useEffect(() => {
    if (data && data[0]) {
      const listKey = [
        'name',
        'category_id',
        'date',
        'partner_id',
        'value',
        'value_residual',
      ]

      listKey.forEach((key) => {
        if (key === 'category_id') {
          setValue(key, data[0][key][0])
        } else if (key === 'value_residual') {
          setValue(
            'salvage_value',
            data[0]['value'] - data[0]['value_residual']
          )
        } else {
          setValue(key, data[0][key])
        }
      })
    }
  }, [data])

  return (
    <section className="bg-white rounded py-6">
      <h3 className="font-bold text-xl mb-10 px-6">Tambah Jurnal</h3>
      <div className="grid grid-cols-3 gap-4 px-10 mb-8">
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Nama Asset
          </label>
          <Input {...register('name', { required: true })} />

          <ErrorMessage
            errors={errors}
            name="name"
            render={() => (
              <p className="text-red-400 text-xs">Nama Asset Required</p>
            )}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Kategori Asset
          </label>
          <Controller
            control={control}
            name="category_id"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Select
                options={optionCategoryAsset}
                onChange={(selected: any) => onChange(selected.value)}
                isLoading={onFetchingDetail}
                value={optionCategoryAsset?.filter(
                  (asset: any) => asset.value === watch('category_id')
                )}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="category_id"
            render={() => (
              <p className="text-red-400 text-xs">Kategori Asset Required</p>
            )}
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal Pembelian
          </label>
          <Input {...register('date', { required: true })} type="date" />
          <ErrorMessage
            errors={errors}
            name="date"
            render={() => (
              <p className="text-red-400 text-xs">Tanggal Pembelian Required</p>
            )}
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal Mulai Depresiasi
          </label>
          <Input
            {...register('first_depreciation_manual_date', { required: true })}
            type="date"
          />
          <ErrorMessage
            errors={errors}
            name="first_depreciation_manual_date"
            render={() => (
              <p className="text-red-400 text-xs">
                Tanggal Mulai Depresiasi Required
              </p>
            )}
          />
        </div>
        <div className="col-span-2"></div>
        <div>
          <label htmlFor="">Gross Value</label>
          <CurrencyInput
            prefix="Rp"
            className="input border border-[#c4c4c480] h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            value={watch('value')}
            onValueChange={(value) => setValue('value', value)}
          />

          <span className="text-gray-alurkerja-2 text-xs">Harga Beli</span>
        </div>
        <div>
          <label htmlFor="">Salvage Value</label>
          <CurrencyInput
            prefix="Rp"
            className="input border border-[#c4c4c480] h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            value={watch('salvage_value')}
            onValueChange={(value) => setValue('salvage_value', value)}
          />

          <span className="text-gray-alurkerja-2 text-xs">
            Harga Jual Maksimum
          </span>
        </div>
        <div>
          <label htmlFor="">Resedual Value</label>
          <CurrencyInput
            prefix="Rp"
            className="input border border-[#c4c4c480] h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
            groupSeparator="."
            decimalSeparator=","
            decimalsLimit={2}
            value={
              !_.isNaN(watch('value') - watch('salvage_value'))
                ? watch('value') - watch('salvage_value')
                : 0
            }
          />
          <span className="text-gray-alurkerja-2 text-xs">
            Harga Beli - Harga Jual Maksimum
          </span>
        </div>

        <div className="col-span-3">
          <label htmlFor="deskripsi">Deskripsi</label>
          <Input {...register('deskripsi')} textArea />
        </div>
        <div>
          <label htmlFor="">Supplier</label>
          <Select
            options={optionSupplier}
            onChange={(selected: any) => setValue('partner_id', selected.value)}
          />
          <span className="text-gray-alurkerja-2 text-xs">Supplier</span>
        </div>
      </div>

      <div className="w-fit flex gap-x-4 ml-auto px-6">
        <Button
          onClick={() => handleSubmit((payload) => mutate(payload))()}
          loading={isLoading}
        >
          Simpan
        </Button>
        <Button variant="outlined">Reset</Button>
      </div>
    </section>
  )
}
