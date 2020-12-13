import { HashRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import { AuthProvider } from './components/AuthProvider'

// pages
import Home from './pages/Home'
import Imovel from './pages/Imovel'
import Error404 from './pages/Error404'
import AdmLoggedWall from './pages/admin/AdmLoggedWall'

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
            <Route path="admin/*" element={<AdmLoggedWall />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </InnerRoot>
  )
}
