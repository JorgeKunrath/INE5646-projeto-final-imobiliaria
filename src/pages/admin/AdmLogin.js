import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../components/AuthProvider'

import NavExample from '../../components/NavExample'
import Login from '../Login'
import Admin from './Admin'

// login stuff
import firebase from 'firebase/app'
import 'firebase/auth'

export default function AdmLogin() {
  // maybe use useMemo or some other way to store this info
  const { currentUser } = useContext(AuthContext)

  function SignOut() {
    return (
      firebase.auth().currentUser && (
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      )
    )
  }

  return (
    <div>
      <NavExample />
      {currentUser ? (
        <>
          <Admin userData={currentUser} />
          <SignOut />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}
