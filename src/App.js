import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Imovel from './pages/Imovel'
import AdmHome from './pages/admin/AdmHome'
import AdmImovel from './pages/admin/AdmImovel'
import AdmReservas from './pages/admin/AdmReservas'

// import DatabaseExample from "./components/DatabaseExample"

export default function App() {
  return (
    // tudo deve ir dentro de HashRouter (eu acho)
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="imovel/*" element={<Imovel />} />
        <Route path="admin" element={<AdmHome />} />
        <Route path="admin/reservas" element={<AdmReservas />} />
        <Route path="admin/imovel/*" element={<AdmImovel />} />
        <Route path="*" element={<h1>404 — Página não encontrada</h1>} />
      </Routes>
      {/* <DatabaseExample /> */}
    </HashRouter>
  )
}
