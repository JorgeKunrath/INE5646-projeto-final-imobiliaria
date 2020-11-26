import React from 'react'
import { Link } from 'react-router-dom'

export default function AdmNavExample() {
  return (
    <nav>
      <Link to="/admin">home admin</Link>
      {' | '}
      <Link to="/admin/reservas">admin/reservas</Link>
      {' | '}
      <Link to="/admin/imovel/codigo">admin/imovel/*</Link>
      {' | '}
    </nav>
  )
}
