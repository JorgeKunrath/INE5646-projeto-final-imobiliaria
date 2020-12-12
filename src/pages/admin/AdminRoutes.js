import { Routes, Route } from 'react-router-dom'

import HeaderAdmin from '../../components/common/HeaderAdmin'
import Footer from '../../components/common/Footer'

// routes
import AdmHome from './AdmHome'
import AdmImovel from './AdmImovel'
import AdmReservas from './AdmReservas'
import Error404 from '../Error404'

// control routing
export default function AdminRoutes({ signOut }) {
  return (
    <>
      <HeaderAdmin signOut={signOut} />
      <Routes>
        <Route path="" element={<AdmHome />} />
        <Route path="/agendamentos" element={<AdmReservas />} />
        <Route path="/imovel/*" element={<AdmImovel />} />
        <Route path="/admin/*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  )
}
