import { useContext } from 'react'

import { AuthContext } from '../../components/AuthProvider'

import AdminRoutes from './AdminRoutes'
import LoginPage from './LoginPage'

export default function AdmLoggedWall() {
  const { currentUser } = useContext(AuthContext)

  return <>{currentUser ? <AdminRoutes /> : <LoginPage />}</>
}
