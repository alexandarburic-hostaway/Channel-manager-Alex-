import { Link } from 'react-router-dom'
import { ChannelIcon } from './ChannelIcon'
import { Checkbox as UiCheckbox } from '@/components/ui'
import { getChannelById } from '@/config/channels'
import type { ConnectedAccount } from '@/types/channel'
import { TableRowActions } from './TableRowActions'
import { ExportIcon } from './ActionIcons'

export interface AccountTableRow {
  account: ConnectedAccount
  totalListings: number
  listingsInHostaway: number
  listingsNotInHostaway: number
}

interface AccountTableProps {
  rows: AccountTableRow[]
  selectedAccountIds: Set<string>
  allPageSelected: boolean
  somePageSelected: boolean
  onToggleSelectAll: () => void
  onToggleRowSelection: (accountId: string) => void
  onExportAccount: (accountId: string) => void
  onRemoveAccount: (accountId: string) => void
}

export function AccountTable({
  rows,
  selectedAccountIds,
  allPageSelected,
  somePageSelected,
  onToggleSelectAll,
  onToggleRowSelection,
  onExportAccount,
  onRemoveAccount,
}: AccountTableProps) {
  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <table className="w-full min-w-[1180px] table-fixed border-collapse">
        <colgroup>
          <col style={{ width: 52 }} />
          <col style={{ width: 280 }} />
          <col style={{ width: 160 }} />
          <col style={{ width: 180 }} />
          <col style={{ width: 180 }} />
          <col style={{ width: 180 }} />
          <col style={{ width: 150 }} />
          <col style={{ width: 120 }} />
        </colgroup>
        <thead>
          <tr className="bg-[#fafafa] border-b border-[#e9eaeb]">
            <th className="sticky left-0 z-30 h-11 px-3 text-center bg-[#fafafa]">
              <span className="flex h-5 w-5 items-center justify-center mx-auto">
                <UiCheckbox
                  ref={(el) => {
                    if (el) el.indeterminate = somePageSelected && !allPageSelected
                  }}
                  checked={allPageSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all accounts on current page"
                />
              </span>
            </th>
            <th className="sticky left-[52px] z-30 h-11 px-6 text-left text-[12px] leading-[18px] font-semibold text-[#414651] bg-[#fafafa]">
              Account
            </th>
            <th className="h-11 px-6 text-left text-[12px] leading-[18px] font-semibold text-[#414651]">Channel</th>
            <th className="h-11 px-6 text-left text-[12px] leading-[18px] font-semibold text-[#414651]">Connection status</th>
            <th className="h-11 px-6 text-left text-[12px] leading-[18px] font-semibold text-[#414651]">Account listings</th>
            <th className="h-11 px-6 text-left text-[12px] leading-[18px] font-semibold text-[#414651]">Listings in Hostaway</th>
            <th className="h-11 px-6 text-left text-[12px] leading-[18px] font-semibold text-[#414651]">Listings not in Hostaway</th>
            <th className="sticky right-0 z-30 bg-[#fafafa]" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const channel = getChannelById(row.account.channelId)
            return (
              <tr key={row.account.id} className="group h-[72px] border-b border-[#e9eaeb]">
                <td className="sticky left-0 z-20 px-3 text-center bg-white group-hover:bg-[#fcfcfd]">
                  <span className="flex h-5 w-5 items-center justify-center mx-auto">
                    <UiCheckbox
                      checked={selectedAccountIds.has(row.account.id)}
                      onChange={() => onToggleRowSelection(row.account.id)}
                      aria-label={`Select ${row.account.accountName}`}
                    />
                  </span>
                </td>
                <td className="sticky left-[52px] z-20 px-6 bg-white group-hover:bg-[#fcfcfd]">
                  <Link to={`/accounts/${row.account.id}`} className="block min-w-0">
                    <p className="text-[14px] leading-5 font-semibold text-[#0086a8] truncate">{row.account.accountName}</p>
                    <p className="text-[14px] leading-5 font-normal text-[#535862] truncate">{row.account.email}</p>
                  </Link>
                </td>
                <td className="px-6">
                  {channel && (
                    <div className="inline-flex items-center gap-1.5">
                      <ChannelIcon channelId={row.account.channelId} size={24} />
                      <span className="text-[14px] leading-5 text-[#535862]">{channel.name}</span>
                    </div>
                  )}
                </td>
                <td className="px-6">
                  {row.account.status === 'connected' ? (
                    <span className="inline-flex rounded-full border px-2 py-0.5 text-[12px] leading-[18px] font-medium bg-[#ecfdf3] border-[#abefc6] text-[#067647]">
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-[#fedf89] bg-[#fffaeb] px-2 py-0.5 text-[12px] font-medium leading-[18px] text-[#b54708]">
                      Not connected
                    </span>
                  )}
                </td>
                <td className="px-6 text-[14px] leading-5 text-[#535862]">{row.totalListings}</td>
                <td className="px-6 text-[14px] leading-5 text-[#535862]">{row.listingsInHostaway}</td>
                <td className="px-6 text-[14px] leading-5 text-[#535862]">{row.listingsNotInHostaway}</td>
                <td className="sticky right-0 z-20 px-6 relative bg-white group-hover:bg-[#fcfcfd]">
                  <div className="absolute inset-y-0 -left-6 w-6 bg-gradient-to-l from-white to-transparent group-hover:from-[#fcfcfd]" />
                  <TableRowActions
                    actions={[
                      {
                        label: `Export ${row.account.accountName}`,
                        onClick: () => onExportAccount(row.account.id),
                        icon: <ExportIcon />,
                      },
                      {
                        label: `Remove ${row.account.accountName}`,
                        onClick: () => onRemoveAccount(row.account.id),
                        icon: (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14" />
                          </svg>
                        ),
                      },
                    ]}
                  />
                </td>
              </tr>
            )
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="h-24 text-center text-[14px] text-[#717680]">
                No connected accounts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
