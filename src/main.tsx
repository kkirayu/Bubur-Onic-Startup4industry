import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthContext, ThemeContext } from 'alurkerja-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { axiosInstance } from '@/api'
import { theme } from '@/utils'
import 'alurkerja-ui/dist/style.css'

// routes
import router from './routes/root'

// styles
import './index.css'
import { FullLoading } from './pages'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={axiosInstance}>
        <ThemeContext.Provider value={theme}>
          <RouterProvider router={router} fallbackElement={<FullLoading />} />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
