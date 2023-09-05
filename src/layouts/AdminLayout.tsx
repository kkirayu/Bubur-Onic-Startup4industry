import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header, Sidebar } from 'alurkerja-ui'
import clsx from 'clsx'

import { menuConfig } from '@/utils'

export default function AdminLayout() {
  const { pathname } = useLocation()

  const [toggled, setToggled] = useState(false)

  return (
    <div className="max-w-screen">
      <div className="fixed">
        <Sidebar
          toggled={toggled}
          setToggled={setToggled}
          menuConfig={menuConfig}
          currentPathName={pathname}
        />
      </div>

      <div
        className={clsx(
          'transition-[margin] ease-in-out duration-400',
          toggled ? 'sm:ml-[80px]' : 'sm:ml-[270px]'
        )}
      >
        <Header />
        <main className="px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
