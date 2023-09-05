import { FieldValues, useForm } from 'react-hook-form'
import { Input } from 'alurkerja-ui'
import { Button } from '@/components'
import { Link } from 'react-router-dom'

const ResetPasswordPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = (data: FieldValues) => {
    console.log(data)
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
            <span className="text-grey-alurkerja-1 text-sm">
              Silahkan masukkan password baru
            </span>
          </div>
          <div>
            <label htmlFor="email">
              Password Baru <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('newPassword', {
                required: { message: 'this field required', value: true },
              })}
              type="password"
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.newPassword?.message}
            </span>
          </div>
          <div>
            <label htmlFor="confirmNewPassword">
              Konfirmasi Password Baru
              <span className="text-red-600 text-sm">*</span>
            </label>
            <Input
              {...register('confirmNewPassword', {
                required: { message: 'this field required', value: true },
              })}
              type="password"
            />
            <span className="text-xs text-red-400" role="alert">
              {errors?.confirmNewPassword?.message}
            </span>
          </div>

          <Button isblock={false}>Reset Password</Button>
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
