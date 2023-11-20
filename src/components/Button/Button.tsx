import { Spinner } from 'alurkerja-ui'
import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'filled' | 'outlined' | 'text'
  size?: 'small' | 'medium'
  block?: boolean
  loading?: boolean
  color?: 'blue' | 'red' | 'orange' | 'green' | 'gray'
}

const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    size = 'small',
    variant = 'filled',
    block = true,
    loading = false,
    disabled = false,
    color = 'blue',
    ...restProps
  } = props

  const filledColor = {
    blue: 'bg-main-blue-alurkerja text-white disabled:bg-gray-alurkerja-2',
    red: 'bg-red-alurkerja text-white disabled:bg-gray-alurkerja-2',
    orange: 'bg-orange-alurkerja text-white disabled:bg-gray-alurkerja-2',
    green: 'bg-green-alurkerja text-white disabled:bg-gray-alurkerja-2',
    gray: 'bg-gray-alurkerja-1 text-white',
  }

  const buttonSize = () =>
    size === 'small' ? 'px-[15px] py-2 text-sm' : 'px-[15px] py-2.5 text-base'

  const buttonVariant = () => {
    if (variant === 'filled') {
      return filledColor[color]
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
        'rounded-md disabled:cursor-not-allowed ',
        buttonBlock(),
        buttonSize(),
        buttonVariant(),
        loading && 'flex items-center justify-center gap-1',
        className
      )}
      disabled={loading || disabled}
      {...restProps}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

export default Button
