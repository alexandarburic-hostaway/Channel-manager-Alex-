import { useState } from 'react'
import { createPortal } from 'react-dom'
import { channels } from '@/config/channels'
import { Button } from '@/components/ui'
import type { ChannelConfig } from '@/types/channel'

export interface SelectChannelModalProps {
  open: boolean
  onClose: () => void
  onSelect: (channel: ChannelConfig) => void
}

export function SelectChannelModal({ open, onClose, onSelect }: SelectChannelModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleStartConnection = () => {
    if (!selectedId) return
    const channel = channels.find((c) => c.id === selectedId)
    if (channel) {
      onSelect(channel)
      setSelectedId(null)
      onClose()
    }
  }

  const handleClose = () => {
    setSelectedId(null)
    onClose()
  }

  if (!open) return null

  const renderFallbackIcon = (channel: ChannelConfig) => {
    if (channel.id === 'google') {
      return <span style={{ fontSize: 18, lineHeight: 1, fontWeight: 700, color: '#4285F4' }}>G</span>
    }

    if (channel.id === 'ical') {
      return <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700, color: '#ffffff' }}>ical</span>
    }

    return <span style={{ fontSize: 12, lineHeight: 1, fontWeight: 700, color: channel.brandColor }}>{channel.name[0]}</span>
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Background overlay - dark semi-transparent, Figma-inspired #0a0c12 at 60% opacity */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10, 12, 18, 0.6)' }}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 flex flex-col overflow-hidden"
        style={{
          width: 600,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 48px)',
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #e9eaeb',
          boxShadow: '0 24px 48px -12px rgba(10, 13, 18, 0.18)',
        }}
      >
        <div className="flex flex-col flex-1 min-h-0" style={{ padding: 24, gap: 16 }}>
          <div className="flex flex-col" style={{ gap: 4 }}>
            <h2 style={{ fontSize: 18, lineHeight: '28px', fontWeight: 600, color: '#181d27' }}>Connect an account</h2>
            <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 400, color: '#535861' }}>
              Start your new listing by choosing how you want to add the property details.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span
              style={{
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: 500,
                color: '#414651',
              }}
            >
              Select channel to connect
            </span>
            <span style={{ color: '#008380', fontSize: 14, lineHeight: '20px' }}>*</span>
          </div>

          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto pr-1" style={{ gap: 8 }}>
            {channels.map((channel) => {
              const isSelected = selectedId === channel.id
              const hasLogo = Boolean(channel.logo)
              return (
                <label
                  key={channel.id}
                  className="flex items-center gap-3 cursor-pointer transition-colors rounded-xl"
                  style={{
                    height: 64,
                    padding: '0 16px',
                    background: isSelected ? '#f2fcfb' : '#ffffff',
                    border: `1px solid ${isSelected ? '#008380' : '#d5d7da'}`,
                    borderRadius: 12,
                  }}
                >
                  <input
                    type="radio"
                    name="channel"
                    value={channel.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(channel.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 16,
                      height: 16,
                      border: `1px solid ${isSelected ? '#008380' : '#d0d5dd'}`,
                      background: '#ffffff',
                    }}
                  >
                    {isSelected && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 9999,
                          background: '#008380',
                        }}
                      />
                    )}
                  </span>
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      background: channel.id === 'ical' ? '#00b8d9' : `${channel.brandColor}1f`,
                    }}
                  >
                    {hasLogo ? (
                      <img
                        src={channel.logo}
                        alt=""
                        style={{ width: 20, height: 20, objectFit: 'contain' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      renderFallbackIcon(channel)
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: '20px',
                      fontWeight: 400,
                      color: '#181d27',
                    }}
                  >
                    {channel.name}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        <div
          className="flex items-center justify-end"
          style={{
            marginTop: 'auto',
            padding: 24,
            borderTop: '1px solid #e9eaeb',
            gap: 12,
            background: '#ffffff',
          }}
        >
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex-1"
            style={{
              height: 44,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 600,
              background: '#ffffff',
              color: '#414651',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartConnection}
            disabled={!selectedId}
            className="flex-1"
            style={{
              height: 44,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 10,
              paddingBottom: 10,
              fontSize: 14,
              lineHeight: '20px',
              fontWeight: 600,
              background: selectedId ? '#181d27' : '#f2f4f7',
              color: selectedId ? '#ffffff' : '#a4a7ae',
              border: `1px solid ${selectedId ? '#181d27' : '#e4e7ec'}`,
            }}
          >
            Start connection
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}
