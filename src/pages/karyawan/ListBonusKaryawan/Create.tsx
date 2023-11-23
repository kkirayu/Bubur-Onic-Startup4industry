import { useContext, useState } from 'react'
import { AuthContext, Input, InputDate, Select } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { Mutation, useMutation } from '@tanstack/react-query'
import { Button, Dialog } from '@/components'
import { Watch } from 'lucide-react'
import { ErrorMessage } from '@hookform/error-message'

export const CreateListBonus = () => {
  const { setValue, register, handleSubmit,formState: { errors } } = useForm()
  const axiosInstance = useContext(AuthContext)


  const {mutate,isLoading} = useMutation({
    mutationFn: (payload: FieldValues) => {
      return axiosInstance.post('', payload)
    },
    onSuccess: () => {
      Dialog.success({
        description: 'Berhasil Membuat Pinjaman',
      })
    },
  })

const onSubmit = (payload: FieldValues) =>{
    console.log(payload)
}



  return (
    <section className="bg-white rounded p-6 w-2/3 mx-auto">
      <h3 className="text-sm font-semibold font-['Poppins'] leading-tight">
        Tambah Bonus Karyawan
      </h3>
      <div className="p-5 grid grid-cols- gap-4 mb-6 flex">
      <div className="flex">
            <div className="w-1/2 pr-2">
                <label
                htmlFor=""
                >
                Pegawai
                </label>
                <Input {...register('Pegawai')} 
                />
            </div>
            <div className="w-1/2">
                <label
                htmlFor=""
                >
                Jumlah
                </label>
                <Input {...register('Jumlah')}
                  type="number"
                  defaultValue={0} prefix="RP"/>
            </div>
        </div>
        
        <div className=''>
            <label htmlFor="">Alasan Bonus</label>
            <Input {...register('Alasan_Bonus')}
                type='text-area' className='h-20'
            />
        </div>

        <div className="flex">
            <div className="w-1/2 pr-2">
                <label
                htmlFor=""
                className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                Bukti
                </label>
                
                <Input {...register('bukti', { required: true })}
                placeholder='Placeholder'
                type="file"
                />
                <ErrorMessage
            errors={errors}
            name="bukti"
            render={() => (
              <p className="text-red-400 text-xs">Bukti Required</p>
            )}
          />
            </div>
            <div className="w-1/2">
                <label
                htmlFor=""
                className="after:content-['*'] after:text-red-400 after:text-sm"
                >
                Periode Bonus
                </label>
                <Input {...register('date', { required: true })} type="month"  />
                <ErrorMessage
            errors={errors}
            name="date"
            render={() => (
              <p className="text-red-400 text-xs">Tanggal Pembelian Required</p>
            )}
          />
            </div>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <Button className='bg-[#7c849c]'>Simpan</Button>
        <Button loading={isLoading} onClick={() => handleSubmit(onSubmit)()}>
          Simpan Dan Ajukan
        </Button>
      </div>
    </section>
  )
}
