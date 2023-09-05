import { FieldValues, useForm } from 'react-hook-form'
import { Input } from 'alurkerja-ui'
import { Button } from '@/components'
import { useNavigate } from 'react-router-dom'

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
    navigate('/')
  }

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full bg-black-alurkerja-1 text-white relative hidden flex-col bg-muted p-10 lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium">
          Alurkerja
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote>
            "Sekumpulan library yang mempercepat pembuatan aplikasi berbasis
            workflow"
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Masuk</h1>
            <span className="text-grey-alurkerja-1">
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
          <Button isBlock={false}>Masuk</Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
