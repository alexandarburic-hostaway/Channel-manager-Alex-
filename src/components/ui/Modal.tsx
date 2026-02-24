import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Modal({ open, onClose, title, children, footer, size = 'md' }: ModalProps) {
  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    full: 'max-w-[90vw] max-h-[90vh] w-full',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300 motion-enter-lift"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 bg-background rounded-lg shadow-lg flex flex-col motion-enter-lift ${sizes[size]} ${size === 'full' ? 'h-[90vh]' : ''}`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className={`flex-1 overflow-auto ${size === 'full' ? 'p-6' : 'p-6'}`}>{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export interface ModalFooterProps {
  cancelLabel?: string
  onCancel: () => void
  primaryLabel?: string
  onPrimary: () => void
  primaryDisabled?: boolean
}

export function ModalFooter({
  cancelLabel = 'Cancel',
  onCancel,
  primaryLabel = 'Confirm',
  onPrimary,
  primaryDisabled = false,
}: ModalFooterProps) {
  return (
    <>
      <Button variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button onClick={onPrimary} disabled={primaryDisabled}>
        {primaryLabel}
      </Button>
    </>
  )
}
