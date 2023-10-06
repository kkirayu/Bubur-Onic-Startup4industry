import { Input, ReactHookWrapper, Modal } from 'alurkerja-ui'
import { FieldValues, useForm } from 'react-hook-form'
import _ from 'underscore'
import { Button } from '@/components'
import { useAuthStore } from '@/stores'
import { axiosInstance } from '@/api'
import Swal from 'sweetalert2'
import { useState } from 'react'

export const Profile = () => {
  const { currentUser } = useAuthStore()
  const hookFormProfile = useForm()
  const hookFormReset = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  })

  const [loaders, setLoaders] = useState({
    SUBMIT_NEW_PASSWORD: false,
    SUBMIT_PROFILE: false,
  })

  const handleLoader = (key: string, value: boolean) => {
    setLoaders((prev) => ({ ...prev, [key]: value }))
  }

  const onEditProfile = (data: FieldValues) => {
    console.log(data)
  }

  const onResetPassword = (data: FieldValues) => {
    handleLoader('SUBMIT_NEW_PASSWORD', true)
    axiosInstance
      .post('/auth/password/confirm', data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Password berhasil diganti',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          })
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          Swal.fire({
            title: 'Gagal!',
            text: err.response.data.message,
            icon: 'info',
            timer: 2000,
            timerProgressBar: true,
          })
        } else {
          Swal.fire({
            title: 'Gagal!',
            text: 'Password gagal diganti',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
          })
        }
      })
      .finally(() => {
        handleLoader('SUBMIT_NEW_PASSWORD', false)
      })
  }

  return (
    <div className="bg-white px-6 pt-6 pb-10 rounded">
      <h2 className="font-bold text-xl mb-6">Profile</h2>

      <ReactHookWrapper control={hookFormProfile.control}>
        <Input
          name="name"
          aria-label="Nama"
          onChange={(e) =>
            hookFormProfile.setValue(e.target.name, e.target.value)
          }
          defaultValue={currentUser?.name}
        />
        <Input
          name="email"
          type="email"
          aria-label="Email"
          onChange={(e) =>
            hookFormProfile.setValue(e.target.name, e.target.value)
          }
          defaultValue={currentUser?.email}
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
          triggerButton={<Button variant="outlined">Ubah Password</Button>}
        >
          <div className="px-4 pt-4 space-y-6">
            <div>
              <label htmlFor="current_password">
                Password Lama <span className="text-red-600 text-sm">*</span>
              </label>
              <Input
                {...hookFormReset.register('current_password', {
                  required: { message: 'this field required', value: true },
                })}
                type="password"
              />
              <span className="text-xs text-red-400" role="alert">
                {hookFormReset.formState.errors?.new_password?.message}
              </span>
            </div>
            <div>
              <label htmlFor="new_password">
                Password Baru <span className="text-red-600 text-sm">*</span>
              </label>
              <Input
                {...hookFormReset.register('new_password', {
                  required: { message: 'this field required', value: true },
                })}
                type="password"
              />
              <span className="text-xs text-red-400" role="alert">
                {hookFormReset.formState.errors?.new_password?.message}
              </span>
            </div>
            <div>
              <label htmlFor="new_password_confirmation">
                Konfirmasi Password Baru
                <span className="text-red-600 text-sm">*</span>
              </label>
              <Input
                {...hookFormReset.register('new_password_confirmation', {
                  required: { message: 'this field required', value: true },
                })}
                type="password"
              />
              <span className="text-xs text-red-400" role="alert">
                {
                  hookFormReset.formState.errors?.new_password_confirmation
                    ?.message
                }
              </span>
            </div>
            <div className="w-fit ml-auto">
              <Button
                onClick={() => hookFormReset.handleSubmit(onResetPassword)()}
                disabled={loaders.SUBMIT_NEW_PASSWORD}
                loading={loaders.SUBMIT_NEW_PASSWORD}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </Modal>
        <Button
          block
          onClick={() => hookFormProfile.handleSubmit(onEditProfile)()}
        >
          Simpan
        </Button>
      </div>
    </div>
  )
}
