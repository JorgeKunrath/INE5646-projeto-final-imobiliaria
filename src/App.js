import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Imovel from './pages/Imovel';
import AdmHome from './pages/admin/AdmHome';
import AdmImovel from './pages/admin/AdmImovel';
import AdmReservas from './pages/admin/AdmReservas';

// examples
import NavExample from './components/NavExample';
// import DatabaseExample from "./components/DatabaseExample"

export default function App() {
  return (
    // tudo deve ir dentro de BrowserRouter (eu acho)
    <BrowserRouter>
      <NavExample />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="imovel/*" element={<Imovel />} />
        <Route path="admin" element={<AdmHome />} />
        <Route path="admin/reservas" element={<AdmReservas />} />
        <Route path="admin/imovel/*" element={<AdmImovel />} />
        <Route path="*" element={<h1>404 — Página não encontrada</h1>} />
      </Routes>
      {/* <DatabaseExample /> */}
    </BrowserRouter>
  );
}
