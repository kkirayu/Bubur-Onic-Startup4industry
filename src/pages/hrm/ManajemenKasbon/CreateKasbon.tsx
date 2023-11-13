import React, { useContext } from 'react'
import { AuthContext, Input, InputYear, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Dialog } from '@/components'
import { useMutation } from '@tanstack/react-query'

export const CreateKasbon = () => {
  const { setValue, register } = useForm()
  const axiosInstance = useContext(AuthContext)

  const {} = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('', payload)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil Membuat Kasbon',
      })
    },
  })

  return (
    <section className="bg-white rounded p-6">
      <h3 className="text-sm font-semibold font-['Poppins'] leading-tight">
        Tambah Kasbon
      </h3>
      <div className="p-5 grid grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Bulan
          </label>
          <Select
            options={[
              { label: 'Januari', value: 1 },
              { label: 'Februari', value: 2 },
              { label: 'Maret', value: 3 },
              { label: 'April', value: 4 },
              { label: 'Mei', value: 5 },
              { label: 'Juni', value: 6 },
              { label: 'Juli', value: 7 },
              { label: 'Agustus', value: 8 },
              { label: 'September', value: 9 },
              { label: 'Oktober', value: 10 },
              { label: 'November', value: 11 },
              { label: 'Desember', value: 12 },
            ]}
            onChange={(v: any) => {
              setValue('month', v.value)
            }}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tahun
          </label>
          <InputYear
            onChange={(value) => {
              setValue('year', value ?? '')
            }}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="after:content-['*'] after:text-red-400 after:text-sm"
          >
            Tanggal Max Pengembalian Kasbon
          </label>
          <Input {...register('date')} type="date" />
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <Button>Simpan</Button>
        <Button variant="outlined">Reset</Button>
      </div>
    </section>
  )
}
