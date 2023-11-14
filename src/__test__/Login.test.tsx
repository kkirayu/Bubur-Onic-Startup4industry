import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, vi } from 'vitest'
import { Login } from '@/pages/auth'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { AuthContext } from 'alurkerja-ui'

describe('Login Page', async () => {
  const queryClient = new QueryClient()

  const setup = () => {
    const axiosInstance = axios.create({
      headers: {
        'Content-type': 'application/json',
      },
    })

    const utils = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={axiosInstance}>
            <Login />
          </AuthContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    )
    const btnLogin = screen.getByTestId('button-login')
    const alertEmail = screen.getByTestId('alert-email')
    const alertPassword = screen.getByTestId('alert-password')
    const emailField: HTMLInputElement = screen.getByTestId('field-email')
    const passwordField: HTMLInputElement = screen.getByTestId('field-password')
    return {
      btnLogin,
      alertEmail,
      alertPassword,
      emailField,
      passwordField,
      axiosInstance,
      ...utils,
    }
  }

  test('should has error message when click button login while email & password field is empty', async () => {
    const { btnLogin, alertEmail, alertPassword } = setup()

    expect(btnLogin).toBeInTheDocument()

    fireEvent.click(btnLogin)

    await waitFor(() => {
      expect(alertEmail).toHaveTextContent('this field required')
      expect(alertPassword).toHaveTextContent('this field required')
    })
  })

  test('should has error alert when login failed', async () => {
    const { btnLogin, passwordField, emailField, axiosInstance } = setup()

    const mock = new MockAdapter(axiosInstance)
    mock
      .onPost('/auth/login', { email: 'tes@gmail.com', password: 'asdf1234' })
      .reply(401)

    expect(btnLogin).toBeInTheDocument()
    expect(emailField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()

    fireEvent.change(emailField, { target: { value: 'tes@gmail.com' } })
    fireEvent.change(passwordField, { target: { value: 'asdf1234' } })
    expect(emailField.value).toBe('tes@gmail.com')
    expect(passwordField.value).toBe('asdf1234')

    fireEvent.click(btnLogin)

    await waitFor(() => {
      expect(screen.getByTestId('alert-popup')).toBeInTheDocument()
    })

    expect(screen.getByText('Email / Password salah')).toBeInTheDocument()
  })
})
