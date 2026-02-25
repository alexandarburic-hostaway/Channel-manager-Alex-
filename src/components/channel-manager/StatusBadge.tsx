import { useEffect, useRef, useState } from 'react'
import type { ChannelListingStatus, IntegrationStatus } from '@/types/channel'
import { LinkBrokenIcon, LinkRegularIcon } from './ActionIcons'

interface StatusBadgeProps {
  status: IntegrationStatus
}

interface AirbnbStatusBadgeProps {
  status: ChannelListingStatus
  muted?: boolean
}

const labelMap: Record<IntegrationStatus, string> = {
  pending: 'Pending',
  connecting: 'Connecting...',
  pending_import: 'Pending import',
  pending_export: 'Pending export',
  not_in_hostaway: 'Not in Hostaway',
  importing: 'Importing...',
  connected: 'Connected',
  ready_to_export: 'Ready to export',
  exporting: 'Exporting',
  published: 'Published',
  missing_requirements: 'Missing requirements',
  disconnected: 'Disconnected',
}

const airbnbLabelMap: Record<ChannelListingStatus, string> = {
  live: 'Live',
  hidden_from_guests: 'Hidden from guests',
  action_required: 'Action required',
}

function DotIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  )
}

function HourglassIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 3h8M8 21h8M9 3v3a3 3 0 0 0 .88 2.12L12 10.24l2.12-2.12A3 3 0 0 0 15 6V3M15 21v-3a3 3 0 0 0-.88-2.12L12 13.76l-2.12 2.12A3 3 0 0 0 9 18v3" />
    </svg>
  )
}

function ImportingIcon() {
  return (
    <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="opacity-30" />
      <path d="M12 3a9 9 0 0 1 9 9" />
    </svg>
  )
}

const chipBase =
  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[12px] font-medium leading-[18px] whitespace-nowrap'

export function AirbnbStatusBadge({ status, muted = false }: AirbnbStatusBadgeProps) {
  if (muted) {
    return (
      <span className={`${chipBase} border-[#eaecf0] bg-[#f9fafb] text-[#98a2b3]`}>
        <DotIcon className="h-2 w-2 text-[#98a2b3]" />
        {airbnbLabelMap[status]}
      </span>
    )
  }

  const colorClass =
    status === 'live'
      ? 'border-[#d5d7da] bg-white text-[#344054]'
      : status === 'hidden_from_guests'
        ? 'border-[#d5d7da] bg-white text-[#344054]'
        : 'border-[#d5d7da] bg-white text-[#344054]'

  const dotClass =
    status === 'live'
      ? 'text-[#17b26a]'
      : status === 'hidden_from_guests'
        ? 'text-[#f79009]'
        : 'text-[#f04438]'

  return (
    <span className={`${chipBase} ${colorClass}`}>
      <DotIcon className={`h-2 w-2 ${dotClass}`} />
      {airbnbLabelMap[status]}
    </span>
  )
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const prevStatusRef = useRef<IntegrationStatus>(status)
  const [animateSwap, setAnimateSwap] = useState(false)

  useEffect(() => {
    const previous = prevStatusRef.current
    const isConnectedSwap =
      (previous === 'connected' && status === 'disconnected') ||
      (previous === 'disconnected' && status === 'connected')

    if (isConnectedSwap) {
      setAnimateSwap(true)
      const timeoutId = setTimeout(() => setAnimateSwap(false), 280)
      prevStatusRef.current = status
      return () => clearTimeout(timeoutId)
    }

    prevStatusRef.current = status
  }, [status])

  const config =
    status === 'connected'
      ? { className: 'border-[#abefc6] bg-[#ecfdf3] text-[#067647]', icon: <LinkRegularIcon className="h-3 w-3" /> }
      : status === 'importing' || status === 'exporting'
        ? { className: 'border-[#d5d7da] bg-[#f5f5f5] text-[#535862]', icon: <ImportingIcon /> }
        : status === 'pending_import' || status === 'pending_export'
          ? { className: 'border-[#d5d7da] bg-[#f5f5f5] text-[#535862]', icon: <HourglassIcon /> }
          : status === 'not_in_hostaway' || status === 'disconnected'
            ? { className: 'border-[#d5d7da] bg-[#f5f5f5] text-[#535862]', icon: <LinkBrokenIcon className="h-3 w-3" /> }
            : { className: 'border-[#d5d7da] bg-white text-[#535862]', icon: <DotIcon className="h-2 w-2 text-[#98a2b3]" /> }

  return (
    <span className={`${chipBase} ${config.className} transition-colors duration-300 ease-out ${animateSwap ? 'status-badge-swap' : ''}`}>
      <span className={animateSwap ? 'status-badge-icon-swap' : ''}>{config.icon}</span>
      {labelMap[status]}
    </span>
  )
}
