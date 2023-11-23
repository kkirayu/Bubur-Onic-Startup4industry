import { AuthContext, Input, Skeleton } from 'alurkerja-ui'
import { ArrowLeft } from 'lucide-react'
import { FieldValues, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

import { Button, Dialog } from '@/components'
import { usePaginatedFetcher } from '@/api'
import { formatToMoney } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

export const VendorPayment = () => {
  const { register, handleSubmit } = useForm()
  const params = useParams()
  const axiosInstance = useContext(AuthContext)

  const { data, isFetching } = usePaginatedFetcher({
    queryKey: ['bill'],
    url: `/keuangan/bill?show_all=true&filter[customer_id]=${params.id}`,
    mapperFn: (data) => data,
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (arg: FieldValues) => {
      const payload = {
        bills: data?.map((bill, idx) => ({
          bill_id: bill.id,
          total: bill.total ? +bill.total : 0,
          paid_total: 0,
          amount_paid: arg[`amount_paid-${idx}`]
            ? +arg[`amount_paid-${idx}`]
            : 0,
        })),
      }
      return axiosInstance.post('/keuangan/bill/pay-bill', payload)
    },
    onSuccess: () => {
      Dialog.success({ description: 'Berhasil melakukan pembayaran' })
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
    <section>
      <div className="flex gap-4 items-center  mb-4">
        <Link
          className="flex items-center text-main-blue-alurkerja gap-1"
          to="/keuangan/piutang/vendor"
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
        <div className="p-6  space-y-6">
          {!isFetching ? (
            <>
              {data?.map((bill, idx) => {
                const hasReceivables = +bill.total > 0
                const isDraft = bill.post_status === 'DRAFT'

                return (
                  <div key={bill.id}>
                    <div className="font-bold text-main-blue-alurkerja">
                      {bill.bill_number} ({bill.post_status})
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="">Jumlah Piutang</label>
                        <Input
                          readOnly
                          value={hasReceivables ? formatToMoney(bill.total) : 0}
                        />
                      </div>
                      {hasReceivables && !isDraft && (
                        <div>
                          <label htmlFor="">Bayar</label>
                          <Input {...register(`amount_paid-${idx}`)} />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <div className="w-1/2">
              <Skeleton className="mb-2 w-32" />
              <Skeleton className="mb-2 w-28" />
              <Skeleton className="h-[44px]" />
            </div>
          )}
        </div>

        <p className="px-6 text-red-alurkerja text-sm">
          note: hanya bill yang sudah di post yang bisa dibayarkan
        </p>

        <div className="w-fit ml-auto p-6 flex items-center gap-4">
          <Button
            onClick={() => handleSubmit((payload) => mutate(payload))()}
            loading={isLoading}
          >
            Bayar
          </Button>
        </div>
      </div>
    </section>
  )
}
