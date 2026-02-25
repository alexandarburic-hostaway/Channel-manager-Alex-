import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  PageShell,
  AccountTable,
  BulkActionBar,
  EmptyState,
  ExportModal,
  PageHeader,
  SelectChannelModal,
  TableFilter,
  type TableFilterValue,
} from '@/components/channel-manager'
import { Button, Input, Modal } from '@/components/ui'
import { useChannelManagerContext } from '@/context/ChannelManagerContext'
import { getChannelById } from '@/config/channels'
import { createBarcelonaExportCandidates } from '@/lib/exportCandidates'
import type { Listing } from '@/types/channel'

export function ChannelManagerPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'connected' | 'channels'>(
    searchParams.get('tab') === 'channels' ? 'channels' : 'connected'
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAccountIds, setSelectedAccountIds] = useState<Set<string>>(new Set())
  const [connectedFilters, setConnectedFilters] = useState<TableFilterValue>({
    channel: [],
    connection_status: [],
  })
  const [removeAccountId, setRemoveAccountId] = useState<string | null>(null)
  const [exportAccountId, setExportAccountId] = useState<string | null>(null)
  const {
    accounts,
    listings,
    exportModalOpen,
    selectChannelOpen,
    openSelectChannel,
    closeSelectChannel,
    handleSelectChannel,
    openExportModal,
    executeExport,
    setExportModalOpen,
    removeAccount,
  } = useChannelManagerContext()

  const onSelectChannel = (channel: Parameters<typeof handleSelectChannel>[0]) => {
    handleSelectChannel(channel, (accountId) => navigate(`/accounts/${accountId}`))
  }

  const connectedRows = useMemo(() => {
    const inHostaway = (rows: Listing[]) =>
      rows.filter((listing) => listing.integrationStatus === 'connected').length
    return accounts.map((account) => {
      const accountListings = listings[account.id] ?? []
      const listingsInHostaway = inHostaway(accountListings)
      const listingsNotInHostaway = Math.max(0, accountListings.length - listingsInHostaway)
      return {
        account,
        totalListings: accountListings.length,
        listingsInHostaway,
        listingsNotInHostaway,
      }
    })
  }, [accounts, listings])

  const filteredRows = useMemo(() => {
    const byFilter = connectedRows.filter((row) => {
      const channelMatch =
        connectedFilters.channel.length === 0 || connectedFilters.channel.includes(row.account.channelId)
      const statusMatch =
        connectedFilters.connection_status.length === 0 ||
        connectedFilters.connection_status.includes(row.account.status)
      return channelMatch && statusMatch
    })

    const query = searchQuery.trim().toLowerCase()
    if (!query) return byFilter
    return byFilter.filter((row) =>
      `${row.account.accountName} ${row.account.email}`.toLowerCase().includes(query)
    )
  }, [connectedRows, connectedFilters, searchQuery])

  const connectedFilterTypes = useMemo(() => {
    const channelOptions = Array.from(
      new Map(
        connectedRows
          .map((row) => {
            const channel = getChannelById(row.account.channelId)
            return channel ? [channel.id, { value: channel.id, label: channel.name }] : null
          })
          .filter(Boolean) as Array<[string, { value: string; label: string }]>
      ).values()
    )

    const statusLabelMap: Record<string, string> = {
      connected: 'Connected',
      connecting: 'Not connected',
      disconnected: 'Disconnected',
      importing: 'Importing',
    }

    const statusOptions = Array.from(
      new Set(connectedRows.map((row) => row.account.status))
    ).map((status) => ({
      value: status,
      label: statusLabelMap[status] ?? status,
    }))

    return [
      { id: 'channel', label: 'Channel', options: channelOptions },
      { id: 'connection_status', label: 'Connection status', options: statusOptions },
    ]
  }, [connectedRows])

  const visibleAccountIds = filteredRows.map((row) => row.account.id)
  const allPageSelected =
    visibleAccountIds.length > 0 && visibleAccountIds.every((id) => selectedAccountIds.has(id))
  const somePageSelected =
    visibleAccountIds.some((id) => selectedAccountIds.has(id)) && !allPageSelected

  const toggleSelectAllOnPage = () => {
    setSelectedAccountIds((prev) => {
      const next = new Set(prev)
      if (allPageSelected) visibleAccountIds.forEach((id) => next.delete(id))
      else visibleAccountIds.forEach((id) => next.add(id))
      return next
    })
  }

  const toggleRowSelection = (accountId: string) => {
    setSelectedAccountIds((prev) => {
      const next = new Set(prev)
      if (next.has(accountId)) next.delete(accountId)
      else next.add(accountId)
      return next
    })
  }

  const openExportForAccount = (accountId: string) => {
    const account = accounts.find((a) => a.id === accountId)
    if (!account) return
    const channel = getChannelById(account.channelId)
    if (!channel) return
    setExportAccountId(accountId)
    openExportModal(channel)
  }

  const confirmRemoveAccount = () => {
    if (!removeAccountId) return
    removeAccount(removeAccountId)
    setSelectedAccountIds((prev) => {
      const next = new Set(prev)
      next.delete(removeAccountId)
      return next
    })
    setRemoveAccountId(null)
  }

  const removeSelectedAccounts = () => {
    selectedAccountIds.forEach((accountId) => removeAccount(accountId))
    setSelectedAccountIds(new Set())
  }

  const exportAccount = exportAccountId
    ? accounts.find((account) => account.id === exportAccountId) ?? null
    : null
  const exportChannel = exportAccount ? getChannelById(exportAccount.channelId) ?? null : null
  const exportListings =
    exportAccount && exportChannel
      ? createBarcelonaExportCandidates(exportAccount.id, exportChannel.id)
      : []

  return (
    <PageShell>
      <PageHeader
        title="Channel Manager"
        tabs={[
          { key: 'connected', label: 'Connected accounts', count: accounts.length },
          { key: 'channels', label: 'Channels' },
        ]}
        activeTabKey={activeTab}
        onTabChange={(key) => setActiveTab(key as 'connected' | 'channels')}
        actionLabel="Connect account"
        onActionClick={openSelectChannel}
      />

      <div className="flex-1 bg-white rounded-xl flex flex-col min-h-0 overflow-hidden border border-[#eceef2]">
        {activeTab === 'connected' && accounts.length === 0 ? (
          <EmptyState onConnectAccount={openSelectChannel} />
        ) : activeTab === 'connected' ? (
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <div className="h-[72px] flex items-center justify-between px-6 border-b border-[#e9eaeb]">
              <TableFilter
                types={connectedFilterTypes}
                value={connectedFilters}
                onChange={setConnectedFilters}
              />
              <div className="w-[250px] relative">
                <svg className="w-5 h-5 text-[#717680] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by account name"
                  className="pl-8"
                />
              </div>
            </div>
            <AccountTable
              rows={filteredRows}
              selectedAccountIds={selectedAccountIds}
              allPageSelected={allPageSelected}
              somePageSelected={somePageSelected}
              onToggleSelectAll={toggleSelectAllOnPage}
              onToggleRowSelection={toggleRowSelection}
              onExportAccount={openExportForAccount}
              onRemoveAccount={setRemoveAccountId}
            />
          </div>
        ) : (
          <div className="p-6">
            <p className="text-[#535861]" style={{ fontSize: 14, lineHeight: 20 }}>
              Channels tab content
            </p>
          </div>
        )}
      </div>

      <BulkActionBar
        count={selectedAccountIds.size}
        actions={[
          {
            label: 'Remove',
            onClick: removeSelectedAccounts,
            icon: (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14" />
              </svg>
            ),
          },
        ]}
      />

      <Modal
        open={Boolean(removeAccountId)}
        onClose={() => setRemoveAccountId(null)}
        title="Remove account"
        footer={
          <>
            <Button type="button" onClick={() => setRemoveAccountId(null)} variant="outline">
              Cancel
            </Button>
            <Button type="button" onClick={confirmRemoveAccount} variant="destructive">
              Remove account
            </Button>
          </>
        }
      >
        <p className="text-[14px] leading-5 text-[#535862]">
          This will remove the account and all associated listings data from Channel Manager.
        </p>
      </Modal>

      {exportChannel && (
        <ExportModal
          open={exportModalOpen}
          onClose={() => {
            setExportModalOpen(false)
            setExportAccountId(null)
          }}
          channel={exportChannel}
          listings={exportListings}
          onExport={executeExport}
        />
      )}

      <SelectChannelModal open={selectChannelOpen} onClose={closeSelectChannel} onSelect={onSelectChannel} />
    </PageShell>
  )
}
