import { FieldValues, useForm } from 'react-hook-form'
import { Input, StatusIcon } from 'alurkerja-ui'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components'
import { useAuthStore } from '@/stores'
import { useEffect, useState } from 'react'

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })
  const navigate = useNavigate()
  const { registerUser } = useAuthStore()

  const [loading, setLoading] = useState({ register: false })
  const [errorMessage, setErrorMessage] = useState<string>()

  const handlerLoading = (key: string, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = ({
    email,
    name,
    password,
    password_confirmation,
  }: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    if (
      password !== '' &&
      password_confirmation !== '' &&
      password_confirmation !== password
    ) {
      setError(
        'password_confirmation',
        {
          type: 'custom',
          message: 'password tidak sama',
        },
        { shouldFocus: true }
      )
    } else {
      handlerLoading('register', true)
      setErrorMessage(undefined)
      registerUser({
        email,
        name,
        password,
        password_confirmation,
      })
        .then(() => {
          navigate('/login')
        })
        .catch((err) => {
          if (err.response.status === 422) {
            setErrorMessage(err.response.data.message)
            setTimeout(() => {
              setErrorMessage(undefined)
            }, 2500)
          } else {
            setErrorMessage('Server Internal Error')
            setTimeout(() => {
              setErrorMessage(undefined)
            }, 2500)
          }
        })
        .finally(() => {
          handlerLoading('register', false)
        })
    }
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
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
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
              Name <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('name', {
                required: { message: 'this field required', value: true },
              })}
              type="text"
            />
            <span className="text-xs text-red-400 " role="alert">
              {errors?.name?.message}
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
            <span className="text-xs text-red-400 " role="alert">
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
                pattern: {
                  message:
                    'Password harus memiliki minimal 1 kapital, 1 huruf kecil, 1 symbol, 1 angka, dan minimal 8 karakter',
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
                },
              })}
              type="password"
            />
            <span className="text-xs text-red-400 " role="alert">
              {errors?.password?.message}
            </span>
          </div>
          <div>
            <label htmlFor="password">
              Password Confirmation
              <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('password_confirmation', {
                required: { message: 'this field required', value: true },
              })}
              type="password"
            />
            <span className="text-xs text-red-400 " role="alert">
              {errors?.password_confirmation?.message}
            </span>
          </div>
          <Button loading={loading.register}>Register</Button>
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

export default Register
