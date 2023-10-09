import axios from 'axios'
import { useAuthStore } from '@/stores'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response
  },
  (error) => {
    const { logout } = useAuthStore()

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 401) {
      logout()
    }
    return Promise.reject(error)
  }
)

export * from './useListAccount'
