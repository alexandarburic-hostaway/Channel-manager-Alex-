import { Button } from './Button'

export interface BulkActionBarProps {
  count: number
  onImport: () => void
  onConnect: () => void
  onDisconnect: () => void
  visible: boolean
}

export function BulkActionBar({
  count,
  onImport,
  onConnect,
  onDisconnect,
  visible,
}: BulkActionBarProps) {
  if (!visible || count === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-3 bg-foreground text-background rounded-lg shadow-lg">
      <span className="text-sm font-medium">{count} selected</span>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={onImport}>
          Import
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={onConnect}>
          Connect
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={onDisconnect}>
          Disconnect
        </Button>
      </div>
    </div>
  )
}
