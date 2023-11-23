import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Input, Select, InputDate, Spinner, Skeleton } from 'alurkerja-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import _ from 'underscore'

import {
  axiosInstance,
  getListProduct,
  getListSupplier,
  getListAccount,
} from '@/api'
import { Button, Dialog } from '@/components'
import { DetailBill } from '@/utils'

export const DetailBills = () => {
  const { register, watch, setValue } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()

  const { listOption: supplierOption } = getListSupplier()
  const { listOption: productOption } = getListProduct()
  const { listOption: accountOption } = getListAccount()

  const [row, setRow] = useState<{ [x: string]: any }[]>([])
  const [currentPartner, setCurrentPartner] = useState<{
    label: string
    value: number | string
  }>()
  const [readonly, setReadonly] = useState(true)

  const removeAccoutRow = (id: number) => {
    setRow((prev) => prev.filter((item) => item.id !== id))
  }

  const addAccountRow = () => {
    // selalu increment index meskipun row ada yang dihapus
    setRow((prev) => [...prev, {}])
  }

  const {
    data: detailBills,
    refetch: refetchDetail,
    isFetching,
  } = useQuery<DetailBill>({
    queryKey: ['bills', id],
    queryFn: async () => {
      return axiosInstance
        .get(`/keuangan/bill/${id}`)
        .then((res) => res.data.data)
    },
    onSuccess: (data) => {
      setReadonly(data.state === 'draft' ? false : true)
      setRow(data.bill_details ?? [])
      setCurrentPartner({
        label: data.supplier.name,
        value: data.supplier.id,
      })
      data.bill_details?.forEach((item) => {
        setValue(`quantity-${item.id}`, item.qty)
        setValue(`price_unit-${item.id}`, item.price)
        setValue(`desc-${item.id}`, item.description)
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
              id: id,
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
            validate_analytic: true,
          },
        },
        method: 'action_post',
        model: 'account.move',
      })
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil membuat journal hutang',
        callback: () => {
          refetchDetail()
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
      onError: () => {
        Dialog.success({
          description: 'Berhasil Mengubah Journal ke Status Draft',
          callback: () => {
            refetchDetail()
          },
        })
      },
    })

  if (!detailBills) {
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
          to="/keuangan/hutang/tagihan"
        >
          <ArrowLeft />
          Kembali
        </Link>
        <Button
          disabled={isFetching}
          loading={isLoadingConfirm}
          onClick={() =>
            detailBills.state === 'posted'
              ? navigate('pembayaran')
              : onConfirm()
          }
        >
          {detailBills.state === 'posted' ? 'Register Payment' : 'Confirm'}
        </Button>
        {detailBills.state === 'posted' && (
          <Button
            disabled={isFetching}
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
            Detail Tagihan
          </div>
        </div>
        {!isFetching ? (
          <>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="">Nama Supplier</label>
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
                <label htmlFor="">Tanggal Tagihan</label>
                <InputDate
                  disabled={readonly}
                  onChange={(date) => {
                    setValue('bill_date', date)
                  }}
                  defaultValue={new Date(detailBills.bill_date)}
                />
              </div>
              <div>
                <label htmlFor="">Jatuh Tempo</label>
                <InputDate
                  disabled={readonly}
                  onChange={(date) => {
                    setValue('due_date', date)
                  }}
                  defaultValue={new Date(detailBills.due_date)}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="description">Catatan</label>
                <Input
                  {...(register('description'), { readonly: readonly })}
                  textArea
                  disabled={readonly}
                />
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
                  {row.map((item) => {
                    return (
                      <tr key={`account-row-${item.id}`}>
                        <td className="px-3 py-2.5">
                          <Select
                            isDisabled={readonly}
                            options={productOption}
                            onChange={(selected: any) => {
                              setValue(`product-${item.id}`, selected)
                            }}
                            defaultValue={{
                              label: item.product_instance.name,
                              value: item.product_instance.id,
                            }}
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Select
                            isDisabled={readonly}
                            options={accountOption}
                            defaultValue={{
                              label: item.account_instance.nama,
                              value: item.account_instance.id,
                            }}
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            {...register(`quantity-${item.id}`)}
                            readOnly={readonly}
                          />
                        </td>
                        <td className="px-3 py-2.5">
                          <Input
                            {...register(`price_unit-${item.id}`)}
                            readOnly={readonly}
                          />
                        </td>

                        <td className="text-center">
                          <Input
                            readOnly
                            value={
                              _.isNaN(
                                watch(`price_unit-${item.id}`) *
                                  watch(`quantity-${item.id}`)
                              )
                                ? 0
                                : watch(`price_unit-${item.id}`) *
                                  watch(`quantity-${item.id}`)
                            }
                          />
                        </td>
                        <td className="text-center">
                          <Button
                            disabled={readonly}
                            color="red"
                            onClick={() => removeAccoutRow(item.id)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="ml-auto p-6 w-fit"></div>
          </>
        ) : (
          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Skeleton width={50} />
              <Skeleton height={40} />
            </div>
            <div className="space-y-1">
              <Skeleton width={50} />
              <Skeleton height={40} />
            </div>
            <div className="space-y-1 col-span-2">
              <Skeleton width={50} />
              <Skeleton height={40} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
