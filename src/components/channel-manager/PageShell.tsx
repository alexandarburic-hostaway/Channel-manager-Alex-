import type { ReactNode } from 'react'
import { PrimarySidebar } from './PrimarySidebar'

interface PageShellProps {
  children: ReactNode
  sidebarActiveIndex?: number
}

export function PageShell({ children, sidebarActiveIndex = 4 }: PageShellProps) {
  return (
    <div className="flex h-full min-h-screen w-full bg-[var(--figma-bg)] p-2" style={{ gap: 8 }}>
      <PrimarySidebar activeIndex={sidebarActiveIndex} />
      <main className="flex-1 min-w-0 min-h-0 flex flex-col" style={{ gap: 8 }}>
        {children}
      </main>
    </div>
  )
}
