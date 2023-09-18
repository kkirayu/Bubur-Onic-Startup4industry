import { Spinner } from 'alurkerja-ui'
import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'filled' | 'outlined' | 'text'
  size?: 'small' | 'medium'
  block?: boolean
  loading?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size = 'small',
    variant = 'filled',
    block = false,
    loading = false,
    disabled = false,
  } = props

  const buttonSize = () =>
    size === 'small' ? 'px-[15px] py-2' : 'px-[15px] py-2.5'

  const buttonVariant = () => {
    if (variant === 'filled') {
      return 'bg-main-blue-alurkerja text-white disabled:bg-gray-alurkerja-2 disabled:cursor-not-allowed'
    } else if (variant === 'outlined') {
      return 'text-main-blue-alurkerja border border-main-blue-alurkerja'
    } else {
      return 'text-main-blue-alurkerja'
    }
  }
  const buttonBlock = () => (block ? 'w-fit' : 'w-full')

  return (
    <button
      className={clsx(
        'rounded-md',
        buttonBlock(),
        buttonSize(),
        buttonVariant(),
        loading && 'flex items-center justify-center gap-1'
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

export default Button
