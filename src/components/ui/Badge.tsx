import { type HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'connecting'
    | 'pending'
    | 'pending_export'
    | 'importing'
    | 'connected'
    | 'ready_to_export'
    | 'exporting'
    | 'published'
    | 'missing_requirements'
    | 'disconnected'
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  const variants: Record<string, string> = {
    default: 'bg-muted text-muted-foreground',
    connecting: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    pending_import: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    pending_export: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    importing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    connected: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    ready_to_export: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    exporting: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    missing_requirements: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    disconnected: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  }
  return (
    <span
      className={`${base} ${variants[variant] ?? variants.default} ${className}`}
      {...props}
    />
  )
}
