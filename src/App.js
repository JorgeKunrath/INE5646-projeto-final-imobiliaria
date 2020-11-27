import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Imovel from './pages/Imovel'
import AdmLogin from './pages/admin/AdmLogin'
import NavExample from './components/NavExample'

// import DatabaseExample from './components/DatabaseExample'
import { AuthProvider } from './components/AuthProvider'

export default function App() {
  return (
    // tudo deve ir dentro de HashRouter (eu acho)
    <AuthProvider>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="imovel/*" element={<Imovel />} />
          <Route path="admin/*" element={<AdmLogin />} />
          <Route
            path="*"
            element={
              <>
                <NavExample />
                <h1>404 — Página não encontrada</h1>
              </>
            }
          />
        </Routes>
        {/* <DatabaseExample /> */}
      </HashRouter>
    </AuthProvider>
  )
}
