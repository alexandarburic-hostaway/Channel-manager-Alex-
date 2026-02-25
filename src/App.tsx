import { useEffect, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastStack, type ToastStackItem } from '@/components/ui'
import { ChannelManagerProvider } from '@/context/ChannelManagerContext'
import { useChannelManagerContext } from '@/context/ChannelManagerContext'
import { ChannelManagerPage } from '@/pages/ChannelManagerPage'
import { AccountDetailsPage } from '@/pages/AccountDetailsPage'
import { MotionPresence, PageTransition } from '@/lib/motion'

function AppContent() {
  const {
    importToast,
    exportToast,
    successToast,
    setImportToast,
    setExportToast,
    setSuccessToast,
    setAccounts,
  } = useChannelManagerContext()
  const location = useLocation()

  const handleCancelImport = () => {
    setImportToast((prev) => ({ ...prev, show: false }))
    if (!importToast.accountId) return
    setAccounts((prev) =>
      prev.map((item) =>
        item.id === importToast.accountId
          ? {
              ...item,
              status: 'connected',
            }
          : item
      )
    )
  }

  useEffect(() => {
    if (!successToast.show || !successToast.message) return
    const timeoutId = setTimeout(() => setSuccessToast({ show: false, message: '' }), 5000)
    return () => clearTimeout(timeoutId)
  }, [successToast.show, successToast.message, setSuccessToast])

  const toastStackItems = useMemo<ToastStackItem[]>(() => {
    const items: ToastStackItem[] = []
    if (successToast.show) {
      items.push({
        id: 'success',
        open: true,
        variant: 'success',
        title: successToast.message,
        onClose: () => setSuccessToast({ show: false, message: '' }),
      })
    }
    if (exportToast.show) {
      items.push({
        id: 'export',
        open: true,
        variant: 'progress',
        title: 'Exporting listings',
        progress: { current: exportToast.current, total: exportToast.total },
        progressLabel: 'listings exported',
        onCancel: () => setExportToast((prev) => ({ ...prev, show: false })),
        cancelLabel: 'Cancel export',
      })
    }
    if (importToast.show) {
      items.push({
        id: 'import',
        open: true,
        variant: 'progress',
        title: 'Importing listings',
        progress: { current: importToast.current, total: importToast.total },
        progressLabel: 'listings imported',
        onCancel: handleCancelImport,
        cancelLabel: 'Cancel import',
      })
    }
    return items
  }, [
    importToast.show,
    importToast.current,
    importToast.total,
    exportToast.show,
    exportToast.current,
    exportToast.total,
    successToast.show,
    successToast.message,
    setExportToast,
    setSuccessToast,
  ])

  return (
    <div className="h-full min-h-screen bg-background">
      <MotionPresence mode="wait">
        <PageTransition routeKey={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<ChannelManagerPage />} />
            <Route path="/accounts/:accountId" element={<AccountDetailsPage />} />
          </Routes>
        </PageTransition>
      </MotionPresence>
      <ToastStack items={toastStackItems} />
    </div>
  )
}

function App() {
  return (
    <ChannelManagerProvider>
      <AppContent />
    </ChannelManagerProvider>
  )
}

export default App
