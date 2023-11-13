import { useContext, useState } from 'react'
import { AuthContext, Input, Select, TableLowcode } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'

export const DetailPinjamanKaryawan = () => {
  const { setValue, register } = useForm()
  const axiosInstance = useContext(AuthContext)

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ])
  const [periode, setPeriode] = useState<Date | null>(new Date())
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>()
  const [search, setSearch] = useState<string>()

  const {} = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('', payload)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil Membuat Pinjaman',
      })
    },
  })

  return (
    <section className="bg-white rounded p-6">
      <h3 className="text-sm font-semibold font-['Poppins'] leading-tight">
        History Pembayaran Hutang Purwa Darozatun
      </h3>
      <div className="p-5 grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-3">
          <div className="w-1/3">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Alasan Pinjam
            </label>
            <Input
              onChange={(v: any) => {
                setValue('alasan', v.value)
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Jumlah
          </label>
          <Input {...register('amount')} type="number" prefix="RP" />
        </div>

        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Lama Pinjam
          </label>
          <DatePicker
            className="w-full border p-2 rounded"
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => {
              setDateRange(update)
            }}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Periode Awal
          </label>
          <DatePicker
            className="w-full border p-2 rounded"
            selected={periode}
            onChange={(date) => setPeriode(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Bayar Hutang
          </label>
          <div className="flex">
            <Input className="rounded-r-none" />
            <Button className="whitespace-nowrap rounded-l-none">
              Bayar Hutang
            </Button>
          </div>
        </div>
      </div>
      <TableLowcode
        title="History Pembayaran"
        baseUrl={import.meta.env.VITE_API_BASEURL}
        specPath="/api/saas/perusahaan"
        renderState={renderState}
        setRenderState={setRenderState}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        search={search}
        setSearch={setSearch}
        column={[
          { key: 'id', label: 'Tanggal Pembayaran' },
          { key: 'periode', label: 'Jumlah Pembayaran' },
          { key: 'status', label: 'Sisa Hutang' },
        ]}
        readonly
      />
    </section>
  )
}
