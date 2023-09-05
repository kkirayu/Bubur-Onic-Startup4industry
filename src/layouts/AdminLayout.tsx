import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { Header, Sidebar } from 'alurkerja-ui'
import clsx from 'clsx'

import { menuConfig } from '@/utils'
import { FullLoading } from '@/pages'
import { Button } from '@/components'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isAppReady, setIsAppReady] = useState(false)
  const [toggled, setToggled] = useState(false)

  const handleUnauthenticated = async () => {
    navigate('/login')
  }

  useEffect(() => {
    if (token === null) {
      handleUnauthenticated()
      setIsAppReady(true)
    } else {
      setIsAppReady(true)
    }
  }, [token, isAppReady])

  if (!isAppReady) {
    return <FullLoading />
  }

  return (
    <div className="max-w-screen">
      <div className="fixed">
        <Sidebar
          logo={<>Bubur Onic</>}
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
          avatarContent={
            <>
              <Button
                onClick={() => {
                  console.log('click')
                  localStorage.removeItem('token')
                  handleUnauthenticated()
                }}
              >
                Logout
              </Button>
            </>
          }
        />
        <main className="px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
