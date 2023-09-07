import { create } from 'zustand'
import Swal from 'sweetalert2'
import { axiosInstance } from '@/api'
import { LoginResponseType } from '@/utils'

interface UseAuthStore {
  isAppReady: boolean
  setIsAppReady: (value: boolean) => void
  token: string | null
  setToken: (value: string) => void
  logout: () => void
  login: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => Promise<any>
}

const useAuthStore = create<UseAuthStore>((set) => ({
  isAppReady: false,
  setIsAppReady: (value: boolean) => set(() => ({ isAppReady: value })),
  token: localStorage.getItem('token'),
  setToken: (value: string) => set(() => ({ token: value })),
  logout: () => {
    set(() => ({ token: null }))
    localStorage.removeItem('token')
  },
  login: async ({ email, password }) => {
    const payload = { email, password }
    return new Promise((resolve, reject) => {
      axiosInstance
        .post<LoginResponseType>('/auth/login', payload)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: 'Berhasil Login!',
              text: 'Selamat datang admin',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
            }).then(() => {
              const data = res.data.data
              set(() => ({ token: data.access_token }))
              localStorage.setItem('token', data.access_token)
              resolve(data)
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}))

export { useAuthStore }
