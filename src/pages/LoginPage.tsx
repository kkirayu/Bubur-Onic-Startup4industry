import { FieldValues, useForm } from 'react-hook-form'
import { Input } from 'alurkerja-ui'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { Button } from '@/components'

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  const onSubmit = (data: FieldValues) => {
    localStorage.setItem('token', 'tes')
    Swal.fire({
      title: 'Berhasil Login!',
      text: 'Selamat datang admin',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full bg-black-alurkerja-1 text-white relative hidden flex-col bg-muted p-10 lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium">
          Bubur Onic
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote>
            "Alurkerja merupakan sekumpulan library yang mempercepat pembuatan
            aplikasi berbasis workflow"
          </blockquote>
        </div>
      </div>
      <div className="h-full p-6 lg:p-8 flex items-center justify-center md:justify-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Masuk</h1>
            <span className="text-grey-alurkerja-1 text-sm">
              Silahkan masuk menggunakan username
            </span>
          </div>
          <div>
            <label htmlFor="username">
              Username <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('username', {
                required: { message: 'this field required', value: true },
              })}
              type="text"
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.username?.message}
            </span>
          </div>
          <div>
            <label htmlFor="password">
              Password <span className="text-red-600 text-sm">*</span>
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
          <Button isblock={false}>Masuk</Button>
          <Link className=" text-blue-alurkerja text-sm" to="/forgot-password">
            Lupa password?
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
