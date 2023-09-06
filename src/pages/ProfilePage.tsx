import { Input, ReactHookWrapper, Modal } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import _ from 'underscore'
import { Button } from '@/components'

const ProfilePage = () => {
  const hookFormProfile = useForm()
  const hookFormReset = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onEditProfile = (data: FieldValues) => {
    const payload = _.omit(data, 'confirmNewPassword', 'newPassword')

    console.log(payload)
  }

  const onResetPassword = (data: FieldValues) => {
    const payload = {
      confirmNewPassword: data.confirmNewPassword,
      newPassword: data.newPassword,
    }

    console.log(payload)
  }

  return (
    <div className="bg-white px-6 pt-6 pb-10 rounded">
      <h2 className="font-bold text-xl mb-6">Profile</h2>

      <ReactHookWrapper control={hookFormProfile.control}>
        <Input
          name="fullname"
          aria-label="Nama Lengkap"
          onChange={(e) =>
            hookFormProfile.setValue(e.target.name, e.target.value)
          }
        />
        <Input
          name="email"
          type="email"
          aria-label="Email"
          onChange={(e) =>
            hookFormProfile.setValue(e.target.name, e.target.value)
          }
        />
        <Input
          name="birth_date"
          type="date"
          aria-label="Tanggal Lahir"
          onChange={(e) =>
            hookFormProfile.setValue(e.target.name, e.target.value)
          }
        />
        <Input
          name="address"
          type="text"
          aria-label="Alamat"
          textArea
          onChange={(e) =>
            hookFormProfile.setValue(e.target.name, e.target.value)
          }
        />
      </ReactHookWrapper>

      <div className="flex items-center gap-4">
        <Modal
          title="Reset Password"
          triggerButton={
            <Button variant="text" className="text-main-blue-alurkerja">
              Lupa Password?
            </Button>
          }
        >
          <div className="px-4 pt-4 space-y-6">
            <div>
              <label htmlFor="email">
                Password Baru <span className="text-red-600 text-sm">*</span>
              </label>
              <Input
                {...hookFormReset.register('newPassword', {
                  required: { message: 'this field required', value: true },
                })}
                type="password"
              />
              <span className="text-xs text-red-400" role="alert">
                {hookFormReset.formState.errors?.newPassword?.message}
              </span>
            </div>
            <div>
              <label htmlFor="confirmNewPassword">
                Konfirmasi Password Baru
                <span className="text-red-600 text-sm">*</span>
              </label>
              <Input
                {...hookFormReset.register('confirmNewPassword', {
                  required: { message: 'this field required', value: true },
                })}
                type="password"
              />
              <span className="text-xs text-red-400" role="alert">
                {hookFormReset.formState.errors?.confirmNewPassword?.message}
              </span>
            </div>
            <div className="w-fit ml-auto">
              <Button
                isblock
                onClick={() => hookFormReset.handleSubmit(onResetPassword)()}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </Modal>
        <Button
          isblock
          onClick={() => hookFormProfile.handleSubmit(onEditProfile)()}
        >
          Simpan
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage
