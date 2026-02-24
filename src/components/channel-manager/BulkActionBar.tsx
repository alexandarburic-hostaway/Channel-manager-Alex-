import type { ReactNode } from 'react'
import { Button } from '@/components/ui'

interface BulkAction {
  label: string
  icon: ReactNode
  onClick: () => void
}

interface BulkActionBarProps {
  count: number
  actions: BulkAction[]
}

export function BulkActionBar({ count, actions }: BulkActionBarProps) {
  if (count === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="h-[68px] rounded-xl bg-[#181d27] px-6 py-4 flex items-center gap-6 shadow-[0px_2px_12px_rgba(0,0,0,0.42)] motion-enter-lift">
        <span className="text-[14px] leading-5 font-medium text-white">{count} selected</span>
        <div className="inline-flex items-center gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              type="button"
              onClick={action.onClick}
              variant="outline"
              className="h-9 border-[#d5d7da] bg-white text-[#414651] hover:bg-[#f9fafb]"
            >
              <span className="w-5 h-5 mr-1 inline-flex items-center justify-center">{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
