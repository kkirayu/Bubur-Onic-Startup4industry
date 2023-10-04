import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Input, StatusIcon } from 'alurkerja-ui'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { Button, Dialog } from '@/components'
import { useAuthStore } from '@/stores'
import { axiosInstance } from '@/api'

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
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full bg-black-alurkerja-1 text-white relative hidden flex-col bg-muted p-10 lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium">
          Bubur Onic
        </div>
      </div>
      <div className="h-full p-6 lg:p-8 flex items-center justify-center md:justify-start relative">
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
              className={
                'flex items-center gap-1 bg-red-50 px-4 py-2 rounded fixed top-0 right-0 mr-10 mt-10 shadow'
              }
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
            />
            <span className="text-xs text-red-400" role="alert">
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
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.password?.message}
            </span>
          </div>
          <Button loading={isLoading}>Login</Button>

          <Link to="/register">
            <Button variant="outlined">Register</Button>
          </Link>
          <Link
            className=" text-main-blue-alurkerja text-sm"
            to="/forgot-password"
          >
            Lupa password?
          </Link>
        </form>
        <div className="absolute right-0 bottom-0 mb-6 mr-6 mt-auto flex items-center gap-4">
          <img
            className="h-10 w-auto object-cover"
            src="/logo.webp"
            alt="PT Rofindiya Ekamulia Sukses"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
