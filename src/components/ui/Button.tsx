import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center rounded-lg font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:transform-none'
    const variants = {
      primary: 'bg-[#181d27] text-white hover:bg-[#0f1320]',
      secondary: 'bg-[#f2f4f7] text-[#344054] hover:bg-[#eaecf0]',
      outline: 'border border-[#d5d7da] bg-white text-[#414651] hover:bg-[#f9fafb]',
      ghost: 'text-[#414651] hover:bg-[#f9fafb]',
      destructive: 'bg-destructive text-white hover:bg-destructive/90',
    }
    const sizes = {
      sm: 'h-8 px-3 text-sm leading-5',
      md: 'h-9 px-3 text-sm leading-5',
      lg: 'h-11 px-4 text-base',
    }
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
