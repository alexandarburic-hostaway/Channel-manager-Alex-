import { type ReactNode } from 'react'
import { Checkbox } from './Checkbox'
import { Input } from './Input'
import { Badge } from './Badge'
import { Button } from './Button'
import type { IntegrationStatus } from '@/types/channel'

export interface Column<T> {
  id: string
  header: string
  sortable?: boolean
  render: (row: T) => ReactNode
}

export interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  onSort?: (columnId: string) => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  onFilterClick?: () => void
  statusColumn?: {
    id: string
    getStatus: (row: T) => IntegrationStatus
  }
  emptyMessage?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  selectedIds,
  onSelectionChange,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  onFilterClick,
  statusColumn,
  emptyMessage = 'No data',
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds.size === data.length
  const someSelected = selectedIds.size > 0

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(data.map((r) => r.id)))
    }
  }

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onSelectionChange(next)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 px-6 py-3 border-b border-border">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="max-w-sm"
        />
        {onFilterClick && (
          <Button variant="outline" size="sm" onClick={onFilterClick as () => void}>
            Filter
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="w-12 px-6 py-3 text-left">
                <Checkbox
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected
                  }}
                  onChange={toggleAll}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                >
                  {col.sortable && onSort ? (
                    <button
                      className="flex items-center gap-1 hover:text-foreground"
                      onClick={() => onSort(col.id)}
                    >
                      {col.header}
                      {sortColumn === col.id && (
                        <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="w-12 px-6 py-3">
                    <Checkbox
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.id} className="px-6 py-3 text-sm">
                      {statusColumn?.id === col.id ? (
                        <Badge variant={statusColumn.getStatus(row) as never}>
                          {formatStatus(statusColumn.getStatus(row))}
                        </Badge>
                      ) : (
                        col.render(row)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatStatus(s: IntegrationStatus): string {
  const map: Record<IntegrationStatus, string> = {
    not_in_hostaway: 'Not in Hostaway',
    pending: 'Pending',
    connecting: 'Connecting…',
    pending_import: 'Pending import',
    pending_export: 'Pending export',
    importing: 'Importing…',
    connected: 'Connected',
    ready_to_export: 'Ready to export',
    exporting: 'Exporting…',
    published: 'Published',
    missing_requirements: 'Missing requirements',
    disconnected: 'Disconnected',
  }
  return map[s] ?? s
}

