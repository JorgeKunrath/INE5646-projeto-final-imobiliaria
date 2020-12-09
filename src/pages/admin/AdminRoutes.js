import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdmHome from './AdmHome'
import AdmImovel from './AdmImovel'
import AdmReservas from './AdmReservas'
import Error404 from '../Error404'

// control routing
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<AdmHome />} />
      <Route path="/agendamentos" element={<AdmReservas />} />
      <Route path="/imovel/*" element={<AdmImovel />} />
      <Route path="/admin/*" element={<Error404 />} />
    </Routes>
  )
}
