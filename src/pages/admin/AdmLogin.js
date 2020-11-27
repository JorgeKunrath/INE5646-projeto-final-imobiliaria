import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../components/AuthProvider'
import firebase from 'firebase/app'
import 'firebase/auth'

import NavExample from '../../components/NavExample'
import Admin from './Admin'

export default function AdmLogin() {
  const { currentUser } = useContext(AuthContext)

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  function SignOut() {
    return (
      currentUser && (
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      )
    )
  }

  return (
    <div>
      <NavExample />
      <header>header</header>
      {currentUser ? (
        <>
          <Admin userData={currentUser} />
          <SignOut />
        </>
      ) : (
        <>
          <p>Faça login para acessar esta parte da aplicação</p>
          <button onClick={signInWithGoogle}>Acessar com o Google</button>
        </>
      )}
    </div>
  )
}
