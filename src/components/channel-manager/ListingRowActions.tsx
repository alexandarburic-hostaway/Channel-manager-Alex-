import { Button } from '@/components/ui'
import type { ChannelListingStatus, IntegrationStatus } from '@/types/channel'
import { ImportIcon, LinkBrokenIcon, LinkRegularIcon } from './ActionIcons'

interface ListingRowActionsProps {
  integrationStatus: IntegrationStatus
  channelStatus?: ChannelListingStatus
  onImport: () => void
  onConnect: () => void
  onDisconnect: () => void
  onToggleVisibility: () => void
}

export function ListingRowActions({
  integrationStatus,
  channelStatus = 'live',
  onImport,
  onConnect,
  onDisconnect,
  onToggleVisibility,
}: ListingRowActionsProps) {
  const primaryAction =
    integrationStatus === 'not_in_hostaway'
      ? { onClick: onImport, ariaLabel: 'Import listing', Icon: ImportIcon, disabled: false }
      : integrationStatus === 'connected'
        ? { onClick: onDisconnect, ariaLabel: 'Disconnect listing', Icon: LinkBrokenIcon, disabled: false }
        : integrationStatus === 'disconnected'
          ? { onClick: onConnect, ariaLabel: 'Connect listing', Icon: LinkRegularIcon, disabled: false }
          : { onClick: onImport, ariaLabel: 'Import in progress', Icon: ImportIcon, disabled: true }

  return (
    <div className="inline-flex items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-1.5 text-[#717680] hover:bg-[#f9fafb]"
        onClick={primaryAction.onClick}
        aria-label={primaryAction.ariaLabel}
        disabled={primaryAction.disabled}
      >
        <primaryAction.Icon className={`w-5 h-5 ${integrationStatus === 'importing' ? 'animate-spin' : ''}`} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-1.5 text-[#717680] hover:bg-[#f9fafb]"
        onClick={onToggleVisibility}
        aria-label={channelStatus === 'hidden_from_guests' ? 'Make listing live' : 'Hide listing'}
      >
        {channelStatus === 'hidden_from_guests' ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3l18 18" />
            <path d="M10.6 10.6a3 3 0 0 0 4.24 4.24" />
            <path d="M9.9 5.2A11.7 11.7 0 0 1 12 5c6.5 0 10 7 10 7a19.2 19.2 0 0 1-3.1 3.8" />
            <path d="M6.3 6.3C3.8 8.1 2 12 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.8-1.2" />
          </svg>
        )}
      </Button>
    </div>
  )
}
