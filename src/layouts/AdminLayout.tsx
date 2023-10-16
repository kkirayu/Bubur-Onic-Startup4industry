import { Fragment, useEffect, useState } from 'react'
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

  const module = pathname.split('/')[1]
  const path = pathname.split('/').slice(2)

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
              className="h-12 w-auto aspect-auto object-cover bg-white rounded p-1"
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
        {module && (
          <div className="w-full h-11 px-3.5 py-2.5 bg-white flex-col justify-start items-start gap-2.5 inline-flex border">
            <div className="justify-start items-center gap-3.5 inline-flex">
              <div className="text-gray-700 text-base font-semibold border-r pr-4 capitalize">
                {module}
              </div>
              {path.map((name, i) => (
                <Fragment key={i}>
                  {i !== 0 ? (
                    <>
                      <Link
                        to={module + '/' + path[i - 1] + '/' + name}
                        className="text-gray-400 text-sm font-semibold capitalize hover:text-main-blue-alurkerja"
                      >
                        {name.replaceAll('-', ' ')}
                      </Link>
                      {i < path.length - 1 && (
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-gray-400 text-sm font-semibold capitalize">
                        {name.replaceAll('-', ' ')}
                      </div>
                      {i < path.length - 1 && (
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      )}
                    </>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        )}

        <main className="px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
