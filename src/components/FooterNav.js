import { Link } from 'react-router-dom'

export default function FooterNav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/admin">Admin</Link>
    </nav>
  )
}
