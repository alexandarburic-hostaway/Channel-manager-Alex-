import { type InputHTMLAttributes, forwardRef } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={`h-4 w-4 rounded border border-[#d0d5dd] text-[#181d27] focus:ring-[#181d27] cursor-pointer ${className}`}
      {...props}
    />
  )
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
