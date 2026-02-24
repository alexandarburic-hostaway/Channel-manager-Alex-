import { Routes, Route } from 'react-router-dom'
import { ChannelManagerProvider } from '@/context/ChannelManagerContext'
import { ChannelManagerPage } from '@/pages/ChannelManagerPage'
import { AccountDetailsPage } from '@/pages/AccountDetailsPage'

function App() {
  return (
    <ChannelManagerProvider>
      <div className="h-full min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<ChannelManagerPage />} />
          <Route path="/accounts/:accountId" element={<AccountDetailsPage />} />
        </Routes>
      </div>
    </ChannelManagerProvider>
  )
}

export default App
