import { Routes, Route, useLocation } from 'react-router-dom'
import { ImportProgressToast } from '@/components/channel-manager'
import { Toast } from '@/components/ui'
import { ChannelManagerProvider } from '@/context/ChannelManagerContext'
import { useChannelManagerContext } from '@/context/ChannelManagerContext'
import { ChannelManagerPage } from '@/pages/ChannelManagerPage'
import { AccountDetailsPage } from '@/pages/AccountDetailsPage'
import { MotionPresence, PageTransition } from '@/lib/motion'

function AppContent() {
  const { importToast, exportToast, setImportToast, setExportToast, setAccounts } = useChannelManagerContext()
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
      <ImportProgressToast
        open={importToast.show}
        current={importToast.current}
        total={importToast.total}
        onCancel={handleCancelImport}
      />
      <Toast
        open={exportToast.show}
        title="Exporting listings"
        variant="progress"
        progress={{ current: exportToast.current, total: exportToast.total }}
        onCancel={() => setExportToast((prev) => ({ ...prev, show: false }))}
        cancelLabel="Cancel export"
      />
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
