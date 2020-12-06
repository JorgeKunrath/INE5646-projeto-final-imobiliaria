import React from 'react'

import firebase from 'firebase/app'
import 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../../components/AuthProvider'

import AdminRoutes from './AdminRoutes'

export default function AdmLogin() {
  const { currentUser } = useContext(AuthContext)

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  function SignOut() {
    return (
      currentUser && (
        <button onClick={() => firebase.auth().signOut()}>
          Sign Out (mover para User)
        </button>
      )
    )
  }

  return (
    <>
      {currentUser ? (
        <>
          <AdminRoutes />
          <SignOut />
        </>
      ) : (
        <>
          <p>Faça login para acessar esta parte da aplicação</p>
          <button onClick={signInWithGoogle}>Acessar com o Google</button>
        </>
      )}
    </>
  )
}