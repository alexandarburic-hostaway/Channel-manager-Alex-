import { type InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={`flex h-9 w-full rounded-lg border border-[#d5d7da] bg-white px-3 text-sm leading-5 text-[#181d27] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#717680] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
