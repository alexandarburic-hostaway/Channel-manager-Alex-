import { type InputHTMLAttributes, forwardRef } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', ...props }, ref) => (
    <label className={`relative inline-flex h-4 w-4 shrink-0 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        ref={ref}
        className="peer sr-only h-4 w-4 rounded-[6px] border-0 focus:ring-0 focus:ring-offset-0"
        {...props}
      />
      <span className="absolute inset-0 rounded-[6px] border border-[#d0d5dd] bg-white transition-colors duration-[120ms] peer-checked:border-[#181d27] peer-checked:bg-[#181d27] peer-focus-visible:ring-2 peer-focus-visible:ring-[#181d27] peer-focus-visible:ring-offset-0" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
        <svg
          className="h-[90%] w-[90%] text-white"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8.5l3 3 7-7" />
        </svg>
      </span>
    </label>
  )
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
