import React from 'react'
import { Link } from 'react-router-dom'

export default function NavExample() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/imovel/codigo">Imovel</Link>
      {' | '}
      <Link to="/admin">Admin</Link>
    </nav>
  )
}
