import { FieldValues, useForm } from 'react-hook-form'
import { Input } from 'alurkerja-ui'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from '@/components'
import { NotFound } from '@/pages'
import { axiosInstance } from '@/api'
import { useState } from 'react'

const ResetPasswordPage = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = (data: FieldValues) => {
    setLoading(true)
    axiosInstance
      .post('/auth/password/reset', { email, token, ...data })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Berhasil mengganti password',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate('/login')
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Gagal!',
          text:
            err.response.status === 422
              ? err.response.data.message
              : 'Gagal mengganti password',
          icon: 'error',
          timer: 2000,
          timerProgressBar: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (!token) {
    return <NotFound />
  } else if (!email) {
    return <NotFound />
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
              Reset Password
            </h1>
            <span className="text-gray-alurkerja-1 text-sm">
              Silahkan masukkan password baru
            </span>
          </div>
          <div>
            <label htmlFor="password">
              Password Baru <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('password', {
                required: { message: 'this field required', value: true },
              })}
              type="password"
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.password?.message}
            </span>
          </div>
          <div>
            <label htmlFor="password_confirmation">
              Konfirmasi Password Baru
              <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('password_confirmation', {
                required: { message: 'this field required', value: true },
              })}
              type="password"
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.password_confirmation?.message}
            </span>
          </div>

          <Button loading={loading}>Reset Password</Button>
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

export default ResetPasswordPage
