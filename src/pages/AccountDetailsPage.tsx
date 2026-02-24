import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ImportIcon,
  LinkBrokenIcon,
  LinkRegularIcon,
  BulkActionBar,
  ChannelIcon,
  ConnectionHelpSidebar,
  ConnectionIntermediatePanel,
  ImportProgressToast,
  ListingsTable,
  PageShell,
  StatusBadge,
  TableFilter,
  type TableFilterValue,
} from '@/components/channel-manager'
import { Button, Toast } from '@/components/ui'
import { getChannelById } from '@/config/channels'
import { useChannelManagerContext } from '@/context/ChannelManagerContext'

export function AccountDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate()
  const {
    accounts,
    listings,
    importToast,
    successToast,
    simulateConnection,
    startImport,
    setSuccessToast,
    setAccounts,
    setListings,
    setImportToast,
  } = useChannelManagerContext()

  const account = accounts.find((a) => a.id === accountId)
  const channel = account ? getChannelById(account.channelId) : null
  const accountListings = (accountId ? listings[accountId] : []) ?? []
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [detailFilters, setDetailFilters] = useState<TableFilterValue>({
    channel_status: [],
    integration_status: [],
  })
  const selectAllRef = useRef<HTMLInputElement>(null)

  const filteredListings = useMemo(() => {
    return accountListings.filter((listing) => {
      const channelStatus = listing.channelStatus ?? 'live'
      const channelStatusMatch =
        detailFilters.channel_status.length === 0 || detailFilters.channel_status.includes(channelStatus)
      const integrationStatusMatch =
        detailFilters.integration_status.length === 0 ||
        detailFilters.integration_status.includes(listing.integrationStatus)
      return channelStatusMatch && integrationStatusMatch
    })
  }, [accountListings, detailFilters])

  useEffect(() => {
    if (!account) return
    const ids = new Set(filteredListings.map((listing) => listing.id))
    setSelectedIds((prev) => new Set(Array.from(prev).filter((id) => ids.has(id))))
  }, [account, filteredListings])

  if (!account || !channel) {
    return (
      <div className="p-6">
        <p>Account not found</p>
        <Button onClick={() => navigate('/')} variant="outline" className="mt-3">
          Back
        </Button>
      </div>
    )
  }

  const listingsInHostaway = accountListings.filter((listing) => listing.integrationStatus === 'connected').length
  const listingsNotInHostaway = Math.max(0, accountListings.length - listingsInHostaway)
  const isConnectedState = account.status === 'connected'
  const isImportingThisAccount = importToast.show && importToast.accountId === accountId

  const selectedCount = selectedIds.size
  const allSelected = filteredListings.length > 0 && selectedCount === filteredListings.length
  const someSelected = selectedCount > 0 && selectedCount < filteredListings.length
  if (selectAllRef.current) {
    selectAllRef.current.indeterminate = someSelected
  }

  const toggleRowSelection = (rowId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) next.delete(rowId)
      else next.add(rowId)
      return next
    })
  }

  const toggleSelectAll = () => {
    const allListingIds = filteredListings.map((listing) => listing.id)
    setSelectedIds((prev) => {
      if (prev.size === allListingIds.length) return new Set()
      return new Set(allListingIds)
    })
  }

  const runBulkImport = () => {
    if (!accountId || selectedIds.size === 0) return
    const importableSelection = Array.from(selectedIds).filter((selectedId) => {
      const listing = accountListings.find((item) => item.id === selectedId)
      return listing?.integrationStatus === 'not_in_hostaway'
    })
    if (importableSelection.length === 0) return
    startImport(accountId, importableSelection)
    setSelectedIds(new Set())
  }

  const runBulkConnect = () => {
    if (!accountId || selectedIds.size === 0) return
    setListings((prev) => ({
      ...prev,
      [accountId]: (prev[accountId] ?? []).map((listing) =>
        selectedIds.has(listing.id) ? { ...listing, integrationStatus: 'connected' } : listing
      ),
    }))
    setSelectedIds(new Set())
  }

  const runBulkDisconnect = () => {
    if (!accountId || selectedIds.size === 0) return
    setListings((prev) => ({
      ...prev,
      [accountId]: (prev[accountId] ?? []).map((listing) =>
        selectedIds.has(listing.id) ? { ...listing, integrationStatus: 'disconnected' } : listing
      ),
    }))
    setSelectedIds(new Set())
  }

  const connectAccount = () => {
    if (!accountId) return
    simulateConnection(accountId, channel.id)
  }

  const connectSingle = (listingId: string) => {
    if (!accountId) return
    setListings((prev) => ({
      ...prev,
      [accountId]: (prev[accountId] ?? []).map((listing) =>
        listing.id === listingId ? { ...listing, integrationStatus: 'connected' } : listing
      ),
    }))
  }

  const disconnectSingle = (listingId: string) => {
    if (!accountId) return
    setListings((prev) => ({
      ...prev,
      [accountId]: (prev[accountId] ?? []).map((listing) =>
        listing.id === listingId ? { ...listing, integrationStatus: 'disconnected' } : listing
      ),
    }))
  }

  const toggleVisibilitySingle = (listingId: string) => {
    if (!accountId) return
    setListings((prev) => ({
      ...prev,
      [accountId]: (prev[accountId] ?? []).map((listing) =>
        listing.id === listingId
          ? { ...listing, channelStatus: listing.channelStatus === 'hidden_from_guests' ? 'live' : 'hidden_from_guests' }
          : listing
      ),
    }))
  }

  const accountDetailsFilterTypes = useMemo(() => {
    const channelStatusOptions = [
      { value: 'live', label: 'Live' },
      { value: 'hidden_from_guests', label: 'Hidden from guests' },
      { value: 'action_required', label: 'Action required' },
    ]

    const integrationStatusLabelMap: Record<string, string> = {
      not_in_hostaway: 'Not in Hostaway',
      pending_import: 'Pending import',
      importing: 'Importing...',
      connected: 'Connected',
      disconnected: 'Disconnected',
    }
    const integrationStatusOptions = Array.from(
      new Set(accountListings.map((listing) => listing.integrationStatus))
    ).map((status) => ({
      value: status,
      label: integrationStatusLabelMap[status] ?? status,
    }))

    return [
      { id: 'channel_status', label: 'Channel status', options: channelStatusOptions },
      { id: 'integration_status', label: 'Integration status', options: integrationStatusOptions },
    ]
  }, [accountListings])

  const updateAccountName = (value: string) => {
    if (!accountId) return
    setAccounts((prev) =>
      prev.map((item) => (item.id === accountId ? { ...item, accountName: value } : item))
    )
  }

  const updateAccountEmail = (value: string) => {
    if (!accountId) return
    setAccounts((prev) =>
      prev.map((item) => (item.id === accountId ? { ...item, email: value } : item))
    )
  }

  return (
    <PageShell>
      <section className="rounded-xl border border-[#e9eaeb] bg-white px-6 py-4 shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
        <Button onClick={() => navigate('/')} variant="ghost" className="gap-1.5 !px-0">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Connected accounts
        </Button>

        <div className="mt-2.5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white border border-[#e9eaeb] flex items-center justify-center overflow-hidden">
            {channel.logo ? (
              <img src={channel.logo} alt={channel.name} className="w-full h-full object-cover" />
            ) : (
              <ChannelIcon channelId={channel.id} size={32} />
            )}
          </div>
          <h1 className="text-[20px] leading-[30px] font-semibold text-[#181d27]">
            {channel.name} • {account.accountName} ({account.email})
          </h1>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[14px] leading-5 text-[#535862]">
            {account.status === 'connected' ? (
              <StatusBadge status={account.status} />
            ) : (
              <span className="inline-flex items-center rounded-full border border-[#fedf89] bg-[#fffaeb] px-2 py-0.5 text-[12px] font-medium leading-[18px] text-[#b54708]">
                Not connected
              </span>
            )}
            <span>
              Account listings: <span className="text-[#181d27]">{accountListings.length}</span>
            </span>
            <span>
              Listings in Hostaway: <span className="text-[#181d27]">{listingsInHostaway}</span>
            </span>
            <span>
              Listings not in Hostaway: <span className="text-[#181d27]">{listingsNotInHostaway}</span>
            </span>
          </div>
          <div />
        </div>
      </section>

      {!isConnectedState ? (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_320px]">
          <ConnectionIntermediatePanel
            channel={channel}
            accountName={account.accountName}
            email={account.email}
            onConnect={connectAccount}
            onAccountNameChange={updateAccountName}
            onEmailChange={updateAccountEmail}
          />
          <ConnectionHelpSidebar channelName={channel.name} />
        </div>
      ) : (
        <section className="rounded-xl border border-[#e9eaeb] bg-white px-6 py-6 min-h-0 flex flex-col shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
          <h2 className="text-[16px] leading-6 font-semibold text-[#181d27]">{channel.name} listings</h2>
          <p className="mt-1 text-[14px] leading-5 text-[#667085]">
            This table shows all listings in this {channel.name} account and their integration status with Hostaway.
            The goal is for every {channel.name} listing to be imported and linked to a matching Hostaway listing.
          </p>
          <div className="mt-3 flex items-center justify-between">
            <TableFilter
              types={accountDetailsFilterTypes}
              value={detailFilters}
              onChange={setDetailFilters}
            />
          </div>
          <ListingsTable
            rows={filteredListings}
            selectedIds={selectedIds}
            allSelected={allSelected}
            someSelected={someSelected}
            selectAllRef={selectAllRef}
            onToggleSelectAll={toggleSelectAll}
            onToggleRowSelection={toggleRowSelection}
            onImportSingle={(listingId) => accountId && startImport(accountId, [listingId])}
            onConnectSingle={connectSingle}
            onDisconnectSingle={disconnectSingle}
            onToggleVisibility={toggleVisibilitySingle}
          />
        </section>
      )}

      {isConnectedState && (
        <BulkActionBar
          count={selectedCount}
          actions={[
            {
              label: 'Import',
              onClick: runBulkImport,
              icon: <ImportIcon />,
            },
            {
              label: 'Connect',
              onClick: runBulkConnect,
              icon: <LinkRegularIcon />,
            },
            {
              label: 'Disconnect',
              onClick: runBulkDisconnect,
              icon: <LinkBrokenIcon />,
            },
          ]}
        />
      )}

      <ImportProgressToast
        open={isImportingThisAccount}
        current={importToast.current}
        total={importToast.total}
        onCancel={() => {
          if (!accountId) return
          setImportToast((prev) => ({ ...prev, show: false }))
          setAccounts((prev) => prev.map((item) => (item.id === accountId ? { ...item, status: 'connected' } : item)))
        }}
      />

      <Toast
        open={successToast.show}
        title={successToast.message}
        variant="success"
        onClose={() => setSuccessToast({ show: false, message: '' })}
      />
    </PageShell>
  )
}
