import { create } from 'zustand'
import Swal from 'sweetalert2'
import _ from 'underscore'
import { axiosInstance } from '@/api'
import { LoginResponseType, UserType } from '@/utils'

interface UseAuthStore {
  token: string | null
  setToken: (value: string) => void
  logout: () => void

  registerUser: (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => Promise<any>
  currentUser: UserType | undefined
  setCurrentUser: (data: UserType) => void
}

const useAuthStore = create<UseAuthStore>((set) => ({
  token: localStorage.getItem('token'),
  setToken: (value: string) => set(() => ({ token: value })),
  logout: () => {
    set(() => ({ token: null }))
    localStorage.removeItem('token')
  },
  registerUser: async ({ name, email, password, password_confirmation }) => {
    const payload = { email, password, name, password_confirmation }
    return new Promise((resolve, reject) => {
      axiosInstance
        .post<LoginResponseType>('/auth/register', payload)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              title: 'Berhasil!',
              text: `Berhasil mendaftarkan ${email} `,
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
            }).then(() => {
              const data = res.data.data
              resolve(data)
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  currentUser: undefined,
  setCurrentUser: (data) => {
    set(() => ({ currentUser: data }))
  },
}))

export { useAuthStore }
