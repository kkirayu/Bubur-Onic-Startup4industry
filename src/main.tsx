import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthContext, ThemeContext } from 'alurkerja-ui'
import { axiosInstance } from '@/api'
import { theme } from '@/utils'
import 'alurkerja-ui/dist/style.css'

// routes
import router from './routes/root'

// styles
import './index.css'
import { FullLoading } from './pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContext.Provider value={axiosInstance}>
      <ThemeContext.Provider value={theme}>
        <RouterProvider router={router} fallbackElement={<FullLoading />} />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  </React.StrictMode>
)
