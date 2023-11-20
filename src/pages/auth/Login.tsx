import { useState, useContext } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { AuthContext, Input, StatusIcon } from 'alurkerja-ui'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { Button, Dialog } from '@/components'
import { useAuthStore } from '@/stores'

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const { setToken } = useAuthStore()
  const axiosInstance = useContext(AuthContext)

  const { mutate, isLoading } = useMutation({
    mutationFn: (credential: { email: string; password: string }) => {
      return axiosInstance.post('/auth/login', credential)
    },
    onMutate: () => {
      setErrorMessage(undefined)
    },
    onSuccess: (res) => {
      localStorage.setItem('token', res.data.data.access_token)
      setToken(res.data.data.access_token)
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.data.access_token}`
      Dialog.success({
        title: 'Berhasil Login!',
        description: `Selamat datang ${res.data.data.name}`,
        callback: () => {
          navigate('/')
        },
      })
    },
    onError(error: any) {
      if (error.response.status === 401) {
        setErrorMessage('Email / Password salah')
        setTimeout(() => {
          setErrorMessage(undefined)
        }, 2500)
      } else {
        setErrorMessage('Server Internal Error')
        setTimeout(() => {
          setErrorMessage(undefined)
        }, 2500)
      }
    },
  })
  const [errorMessage, setErrorMessage] = useState<string>()

  const onSubmit = (data: FieldValues) => {
    mutate({ email: data.email, password: data.password })
  }

  return (
    <div
      className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0 bg-black-alurkerja-1 pb-12"
      style={{ backgroundImage: 'url("/bg.webp")' }}
    >
      <div className="h-fit items-center justify-center md:justify-start relative bg-white flex flex-col rounded">
        <div className="w-full bg-slate-200 py-6 flex items-center justify-center rounded">
          <img className="w-36 h-10" src="/logo.webp" />
        </div>
        <div className="px-20 pb-20 pt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]"
          >
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <span className="text-gray-alurkerja-1 text-sm">
                Silahkan login menggunakan username
              </span>
            </div>
            {errorMessage && (
              <div
                className="flex items-center gap-1 bg-red-50 px-4 py-2 rounded fixed top-0 right-0 mr-10 mt-10 shadow"
                data-testid="alert-popup"
              >
                <StatusIcon type="danger" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            <div>
              <label htmlFor="email">
                Email <span className="text-red-600 text-sm">*</span>
              </label>
              <Input
                {...register('email', {
                  required: { message: 'this field required', value: true },
                })}
                type="email"
                data-testid="field-email"
              />
              <span
                className="text-xs text-red-400"
                role="alert"
                data-testid="alert-email"
              >
                {errors?.email?.message}
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
                data-testid="field-password"
              />
              <span
                className="text-xs text-red-400"
                role="alert"
                data-testid="alert-password"
              >
                {errors?.password?.message}
              </span>
            </div>
            <Button
              block={false}
              loading={isLoading}
              data-testid="button-login"
            >
              Login
            </Button>

            <Link to="/register">
              <Button block={false} variant="outlined">
                Register
              </Button>
            </Link>
            <Link
              className=" text-main-blue-alurkerja text-sm"
              to="/forgot-password"
            >
              Lupa password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
