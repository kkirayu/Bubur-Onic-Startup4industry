import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { Header, Sidebar } from 'alurkerja-ui'
import clsx from 'clsx'
import { LogOut, User2 } from 'lucide-react'

import { UserType, menuConfig } from '@/utils'
import { FullLoading } from '@/pages'
import { axiosInstance } from '@/api'
import { useAuthStore } from '@/stores'
import { AxiosResponse } from 'axios'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout, currentUser, setCurrentUser } = useAuthStore()
  const token = localStorage.getItem('token')

  const [isAppReady, setIsAppReady] = useState(false)

  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

      axiosInstance.interceptors.response.use(
        (response) => {
          // Any status code that lie within the range of 2xx cause this function to trigger

          return response
        },
        (error) => {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          if (error.response.status === 401) {
            logout()
          }
          return Promise.reject(error)
        }
      )

      axiosInstance
        .get<AxiosResponse<UserType>>('/auth/info')
        .then((res) => {
          setCurrentUser(res.data.data)
        })
        .finally(() => {
          setIsAppReady(true)
        })
    } else {
      navigate('/login')
    }
  }, [token])

  if (!isAppReady) {
    return <FullLoading />
  }

  return (
    <div className="max-w-screen">
      <div className="fixed">
        <Sidebar
          logo={
            <img
              className="h-10 w-auto aspect-auto object-cover"
              src="/logo.webp"
            />
          }
          toggled={toggled}
          setToggled={setToggled}
          menuConfig={menuConfig}
          currentPathName={pathname}
          menuWrapper={({ children, menu }) => (
            <Link to={menu.href}>
              <>{children}</>
            </Link>
          )}
        />
      </div>

      <div
        className={clsx(
          'transition-[margin] ease-in-out duration-400',
          toggled ? 'sm:ml-[80px]' : 'sm:ml-[270px]'
        )}
      >
        <Header
          role={currentUser?.name ?? 'Admin'}
          avatarContent={
            <div className="w-full">
              <div
                className="hover:bg-light-blue-alurkerja hover:text-main-blue-alurkerja px-4 py-2 cursor-pointer flex items-center gap-1"
                onClick={() => {
                  navigate('/profile')
                }}
              >
                <User2 size={18} /> Profile Saya
              </div>
              <div
                className="hover:bg-light-blue-alurkerja hover:text-main-blue-alurkerja px-4 py-2 cursor-pointer flex items-center gap-1"
                onClick={() => {
                  logout()
                }}
              >
                <LogOut size={18} />
                Logout
              </div>
            </div>
          }
        />
        <main className="px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
