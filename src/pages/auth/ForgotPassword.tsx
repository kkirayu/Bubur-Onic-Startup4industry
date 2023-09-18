import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Input } from 'alurkerja-ui'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from '@/components'
import { axiosInstance } from '@/api'

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = (data: FieldValues) => {
    setLoading(true)
    axiosInstance
      .post('/auth/password/email', { email: data.email, type: 'email' })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Silahkan check email untuk mereset password',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Gagal!',
          text:
            err.response.status === 422
              ? err.response.data.message
              : 'Gagal mengirim email',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="h-screen p-6 lg:p-8 ">
      <div className="flex items-center text-lg font-medium">Bubur Onic</div>
      <div className="h-full flex items-center justify-center md:block md:justify-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Lupa Password?
            </h1>
            <span className="text-gray-alurkerja-1 text-sm">
              Silahkan masukkan email dan kami akan mengirimkan link untuk reset
              password
            </span>
          </div>
          <div>
            <label htmlFor="email">
              Email <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('email', {
                required: { message: 'this field required', value: true },
              })}
              type="email"
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.email?.message}
            </span>
          </div>

          <Button loading={loading}>Kirim Email</Button>
          <Link
            className="text-center text-main-blue-alurkerja text-sm"
            to="/login"
          >
            Kembali ke halaman Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
