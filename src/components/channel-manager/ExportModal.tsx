import { useState } from 'react'
import { Modal, Checkbox, Badge, Button } from '@/components/ui'
import type { ChannelConfig } from '@/types/channel'
import type { Listing, PublishStatus } from '@/types/channel'

export interface ExportModalProps {
  open: boolean
  onClose: () => void
  channel: ChannelConfig
  listings: Listing[]
  onExport: (listingIds: string[]) => void
}

export function ExportModal({ open, onClose, channel, listings, onExport }: ExportModalProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleExport = () => {
    onExport(Array.from(selectedIds))
    setSelectedIds(new Set())
    onClose()
  }

  const handleClose = () => {
    setSelectedIds(new Set())
    onClose()
  }

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const allSelected = listings.length > 0 && selectedIds.size === listings.length
  const toggleAll = () => {
    if (allSelected) setSelectedIds(new Set())
    else setSelectedIds(new Set(listings.map((l) => l.id)))
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Export to ${channel.name}`} size="full">
      <div className="flex flex-col h-full">
        <p className="text-sm text-muted-foreground mb-4">
          Select the listings you want to export to {channel.name}.
        </p>
        <div className="flex-1 overflow-auto border border-border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-12 px-6 py-3 text-left">
                  <Checkbox checked={allSelected} onChange={toggleAll} />
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Publish status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Requirements
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Visibility
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-border hover:bg-muted/30">
                  <td className="w-12 px-6 py-3">
                    <Checkbox
                      checked={selectedIds.has(listing.id)}
                      onChange={() => toggleRow(listing.id)}
                    />
                  </td>
                  <td className="px-6 py-3 text-sm font-medium">{listing.name}</td>
                  <td className="px-6 py-3">
                    <Badge variant={getPublishVariant(listing.publishStatus)}>
                      {listing.publishStatus ?? 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-3">
                    {listing.missingRequirements && listing.missingRequirements.length > 0 ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        See what&apos;s missing
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <select className="text-sm border border-input rounded px-2 py-1 bg-background">
                      <option>Visible</option>
                      <option>Hidden</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {selectedIds.size} of {listings.length} selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={selectedIds.size === 0}>
              Export {selectedIds.size} listings
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function getPublishVariant(s?: PublishStatus): 'default' | 'published' | 'missing_requirements' {
  if (s === 'published') return 'published'
  if (s === 'draft') return 'default'
  return 'default'
}
