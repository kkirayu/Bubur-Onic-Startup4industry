import { FieldValues, useForm } from 'react-hook-form'
import { Input, StatusIcon } from 'alurkerja-ui'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components'
import { useAuthStore } from '@/stores'
import { useState } from 'react'

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const { registerUser } = useAuthStore()

  const [loading, setLoading] = useState({ register: false })
  const [errorMessage, setErrorMessage] = useState<string>()

  const handlerLoading = (key: string, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = (data: FieldValues) => {
    handlerLoading('register', true)
    setErrorMessage(undefined)
    registerUser({
      email: data.email,
      name: data.name,
      password: data.password,
    })
      .then(() => {
        navigate('/login')
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrorMessage(err.response.data.message)
          setTimeout(() => {
            setErrorMessage(undefined)
          }, 2500)
        }
      })
      .finally(() => {
        handlerLoading('register', false)
      })
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
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
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
            <span className="text-xs text-red-400" role="alert">
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
          <Button loading={loading.register}>Register</Button>
        </form>
        <div className="absolute right-0 bottom-0 mb-6 mr-6 mt-auto flex items-center gap-4">
          <img
            className="h-10 w-auto object-cover"
            src="/logo.webp"
            alt="bubur onic"
          />
        </div>
      </div>
    </div>
  )
}

export default Register
