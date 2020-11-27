import React, { useEffect, useState } from 'react'
import { app } from '../services/firestore'
import 'firebase/auth'

export const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
