import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import AdmHome from './AdmHome'
import AdmImovel from './AdmImovel'
import AdmReservas from './AdmReservas'

// control routing
export default function Admin({ userData }) {
  return (
    <div>
      logado
      <Routes>
        <Route path="" element={<AdmHome />} />
        <Route path="/reservas" element={<AdmReservas />} />
        <Route path="/imovel/*" element={<AdmImovel />} />
        <Route path="/admin/*" element={<p>inside admin</p>} />
      </Routes>
    </div>
  )
}
