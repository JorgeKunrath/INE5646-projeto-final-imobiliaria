import { HashRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Imovel from './pages/Imovel'
import Error404 from './pages/Error404'
import AdmLogin from './pages/admin/AdmLogin'

// import DatabaseExample from './components/DatabaseExample'
import { AuthProvider } from './components/AuthProvider'
import styled from 'styled-components'

const InnerRoot = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`

export default function App() {
  return (
    <InnerRoot>
      <AuthProvider>
        <HashRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="imovel/*" element={<Imovel />} />
            <Route path="admin/*" element={<AdmLogin />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          {/* <DatabaseExample /> */}
        </HashRouter>
      </AuthProvider>
    </InnerRoot>
  )
}
