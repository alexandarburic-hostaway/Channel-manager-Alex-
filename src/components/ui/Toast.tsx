import { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

export interface ToastProps {
  open: boolean
  onClose?: () => void
  title: string
  children?: ReactNode
  variant?: 'default' | 'success' | 'progress'
  progress?: { current: number; total: number }
  onCancel?: () => void
  cancelLabel?: string
}

export function Toast({
  open,
  onClose,
  title,
  children,
  variant = 'default',
  progress,
  onCancel,
  cancelLabel = 'Cancel',
}: ToastProps) {
  useEffect(() => {
    if (!open || variant !== 'success' || !onClose) return
    const timeoutId = setTimeout(() => onClose(), 5000)
    return () => clearTimeout(timeoutId)
  }, [open, variant, onClose])

  if (!open) return null

  const isProgress = variant === 'progress'
  const isSuccess = variant === 'success'
  const closeHandler = onClose ?? onCancel

  const variants = {
    default: 'bg-white text-[#181d27]',
    success: 'bg-white text-[#181d27]',
    progress: 'bg-white text-[#181d27]',
  }

  return createPortal(
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 motion-enter-right">
      <div
        className={`min-w-[320px] max-w-[420px] ${variants[variant]} ${
          isProgress || isSuccess
            ? 'rounded-xl border border-[rgba(0,0,0,0.08)] p-4 shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)]'
            : 'rounded-lg shadow-lg p-4'
        } ${isProgress ? 'motion-attention-pulse' : ''}`}
      >
        <div className="flex items-start gap-4">
          {(isProgress || isSuccess) && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#d5d7da] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
              {isProgress ? (
                <svg className="h-5 w-5 text-[#535862]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 3v11m0 0l4-4m-4 4l-4-4M4 17v2h16v-2" />
                </svg>
              ) : (
                <div className="relative h-5 w-5">
                  <div className="absolute -inset-[6px] rounded-full border-2 border-[#079455] opacity-10" />
                  <div className="absolute -inset-[3px] rounded-full border-2 border-[#079455] opacity-30" />
                  <svg className="relative h-5 w-5 text-[#079455]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" />
                  </svg>
                </div>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className={isProgress || isSuccess ? 'text-[14px] leading-5 font-semibold text-[#181d27]' : 'text-[16px] font-medium'}>
              {title}
            </p>
            {isProgress ? (
              <p className="mt-1 text-[14px] leading-5 text-[#414651]">Importing listing can take a few minutes</p>
            ) : (
              children && <div className={`mt-1 text-sm ${isSuccess ? 'text-[#414651]' : 'opacity-90'}`}>{children}</div>
            )}
          </div>
          {closeHandler && (
            <button
              onClick={closeHandler}
              className={`flex-shrink-0 rounded p-1 ${isProgress || isSuccess ? 'text-[#98a2b3] hover:bg-[#f2f4f7]' : 'hover:bg-white/20'}`}
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {progress && (
          <div className="mt-3">
            <div className={`h-2 rounded-full overflow-hidden ${isProgress ? 'bg-[#e9eaeb]' : 'bg-white/20'}`}>
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${isProgress ? 'bg-[#181d27]' : 'bg-white'}`}
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
            <p className={`mt-1 text-sm ${isProgress ? 'text-[#414651]' : 'opacity-90'}`}>
              {progress.current} of {progress.total} listings imported
            </p>
          </div>
        )}
        {onCancel && variant === 'progress' && (
          <div className="mt-3">
            <Button variant="ghost" size="sm" className="h-auto p-0 text-[#535862] hover:bg-transparent hover:text-[#181d27]" onClick={onCancel}>
              {cancelLabel}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
