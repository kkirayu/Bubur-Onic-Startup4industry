import { useContext, useState } from 'react'
import { AuthContext, Input, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'

export const CreatePinjamanKaryawan = () => {
  const { setValue, register } = useForm()
  const axiosInstance = useContext(AuthContext)

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(),
    new Date(),
  ])
  const [periode, setPeriode] = useState<Date | null>(new Date())

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
        Tambah Pinjaman
      </h3>
      <div className="p-5 grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-3">
          <div className="w-1/3">
            <label
              htmlFor=""
              className="after:content-['*'] after:text-red-400 after:text-sm"
            >
              Pegawai
            </label>
            <Input />
          </div>
        </div>
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
      </div>
      <div className="flex items-center gap-4 justify-end">
        <Button>Simpan</Button>
        <Button variant="outlined">Reset</Button>
      </div>
    </section>
  )
}
