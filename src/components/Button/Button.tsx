import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'filled' | 'outlined' | 'text'
  size?: 'small' | 'medium'
  isblock?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size = 'small',
    variant = 'filled',
    isblock = false,
  } = props

  const buttonSize = () =>
    size === 'small' ? 'px-[15px] py-2' : 'px-[15px] py-2.5'
  const buttonVariant = () => {
    if (variant === 'filled') {
      return 'bg-main-blue-alurkerja text-white'
    } else if (variant === 'outlined') {
      return 'text-main-blue-alurkerja border border-main-blue-alurkerja'
    } else {
      return 'text-main-blue-alurkerja'
    }
  }
  const buttonBlock = () => (isblock ? 'w-fit' : 'w-full')

  return (
    <button
      className={clsx(
        'rounded-md',
        buttonBlock(),
        buttonSize(),
        buttonVariant()
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
