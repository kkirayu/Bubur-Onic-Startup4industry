import { Input, ReactHookWrapper, Button } from 'alurkerja-ui'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { axiosInstance } from '@/api'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const CreateCompany = () => {
  const { control, handleSubmit, register } = useForm()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const onSubmit = (data: FieldValues) => {
    setLoading(true)
    axiosInstance
      .post('/saas/perusahaan/register-perusahaan', data)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            title: 'Berhasil!',
            text: `Berhasil mendaftarkan perusahaan ${res.data.data.nama} `,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate('/company/list')
          })
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Gagal mendaftarkan perusahaan',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="bg-white p-6">
      <h6 className="text-2xl font-bold pb-4">Tambah Perusahaan</h6>
      <hr className="mb-4" />
      <div className="font-semibold mb-2 text-lg">Perusahaan</div>
      <ReactHookWrapper control={control}>
        <Input {...register('nama')} aria-label="Nama" required />
        <Input {...register('alamat')} aria-label="Alamat" textArea required />
        <Input {...register('domain')} aria-label="Domain" required />
      </ReactHookWrapper>
      <hr className="mb-4" />
      <div className="font-semibold mb-2 text-lg">Cabang</div>
      <ReactHookWrapper control={control}>
        <Input {...register('cabang.nama')} aria-label="Nama" required />
        <Input
          {...register('cabang.alamat')}
          aria-label="Alamat"
          textArea
          required
        />
        <Input {...register('cabang.kode')} aria-label="kode" required />
      </ReactHookWrapper>
      <hr className="mb-4" />
      <div className="font-semibold mb-2 text-lg">Owner</div>
      <ReactHookWrapper control={control}>
        <Input {...register('owner.nama')} aria-label="Nama" required />
        <Input
          {...register('owner.email')}
          aria-label="Email"
          type="email"
          required
        />
        <Input
          {...register('owner.password')}
          aria-label="Password"
          type="password"
          required
        />
      </ReactHookWrapper>
      <Button
        type="button"
        className="bg-main-blue-alurkerja text-white"
        onClick={() => handleSubmit(onSubmit)()}
        loading={loading}
        disabled={loading}
      >
        Tambah
      </Button>
    </div>
  )
}
