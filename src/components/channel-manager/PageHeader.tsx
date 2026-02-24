import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui'

interface HeaderTab {
  key: string
  label: string
  count?: number
}

interface PageHeaderProps {
  title: string
  tabs?: HeaderTab[]
  activeTabKey?: string
  onTabChange?: (key: string) => void
  actionLabel?: string
  onActionClick?: () => void
}

export function PageHeader({
  title,
  tabs,
  activeTabKey,
  onTabChange,
  actionLabel,
  onActionClick,
}: PageHeaderProps) {
  const navRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

  const updateIndicator = useCallback(() => {
    if (!tabs?.length || !activeTabKey) {
      setIndicator((prev) => ({ ...prev, ready: false }))
      return
    }

    const navNode = navRef.current
    const activeTabNode = tabRefs.current[activeTabKey]
    if (!navNode || !activeTabNode) {
      setIndicator((prev) => ({ ...prev, ready: false }))
      return
    }

    const navRect = navNode.getBoundingClientRect()
    const activeRect = activeTabNode.getBoundingClientRect()
    setIndicator({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
      ready: true,
    })
  }, [activeTabKey, tabs])

  useEffect(() => {
    updateIndicator()
    const frame = requestAnimationFrame(updateIndicator)
    window.addEventListener('resize', updateIndicator)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [updateIndicator])

  return (
    <header className="bg-white rounded-xl overflow-hidden border border-[#eceef2]">
      <div className="flex items-center h-[52px] px-6">
        <h1 className="text-[20px] leading-[30px] font-semibold text-[#181d27]">{title}</h1>
      </div>
      {(tabs || actionLabel) && (
        <>
          <div className="h-px bg-[#e9eaeb] mx-6" />
          <div className="flex items-center justify-between min-h-[56px] px-6 gap-6">
            <nav ref={navRef} className="relative flex items-center min-w-0 h-11 gap-4">
              {tabs?.map((tab) => {
                const active = tab.key === activeTabKey
                return (
                  <button
                    key={tab.key}
                    ref={(node) => {
                      tabRefs.current[tab.key] = node
                    }}
                    type="button"
                    onClick={() => onTabChange?.(tab.key)}
                    className="relative z-10 flex items-center gap-2 h-full shrink-0 transition-colors duration-300 ease-out"
                    style={{
                      fontSize: 14,
                      lineHeight: '20px',
                      color: active ? '#181d27' : '#535862',
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    {tab.label}
                    {typeof tab.count === 'number' && (
                      <span
                        className="inline-flex items-center justify-center rounded-md shrink-0 min-w-6 h-6 px-2 text-[14px] leading-5 font-medium transition-colors duration-300"
                        style={{
                          background: active ? '#e6f7f7' : '#f5f5f6',
                          color: active ? '#008380' : '#535862',
                        }}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
              {!!tabs?.length && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 h-[2px] transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    left: indicator.left,
                    width: indicator.width,
                    opacity: indicator.ready ? 1 : 0,
                  }}
                >
                  <div className="h-full w-full rounded-full bg-[#008380]" />
                </div>
              )}
            </nav>
            {actionLabel && onActionClick && (
              <Button onClick={onActionClick} className="shrink-0">
                <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {actionLabel}
              </Button>
            )}
          </div>
        </>
      )}
    </header>
  )
}
