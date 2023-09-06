import { create } from 'zustand'

interface UseAuthStore {
  isAppReady: boolean
  setIsAppReady: (value: boolean) => void
  token: string | null
  setToken: (value: string) => void
  logout: () => void
  login: (token: string) => void
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
  login: (token) => {
    set(() => ({ token: token }))
    localStorage.setItem('token', 'tes')
  },
}))

export { useAuthStore }
