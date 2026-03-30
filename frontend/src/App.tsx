import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import { RequestCreatePage } from '@/pages/request-create-page'
import { RequestDetailsPage } from '@/pages/request-details-page'
import { RequestsListPage } from '@/pages/requests-list-page'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RequestsListPage />} />
        <Route path="/requests/new" element={<RequestCreatePage />} />
        <Route path="/requests/:id" element={<RequestDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

export default App
