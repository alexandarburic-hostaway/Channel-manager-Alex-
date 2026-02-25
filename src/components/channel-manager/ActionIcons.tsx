interface IconProps {
  className?: string
}

export function ImportIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={`block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v11m0 0l4-4m-4 4l-4-4M4 17v2h16v-2" />
    </svg>
  )
}

export function ExportIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={`block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21V10m0 0l4 4m-4-4l-4 4M4 7V5h16v2" />
    </svg>
  )
}

export function LinkRegularIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={`block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4.93" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L13 19.07" />
    </svg>
  )
}

export function LinkBrokenIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={`block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4.93" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L13 19.07" />
      <path d="M3 3l18 18" />
    </svg>
  )
}
