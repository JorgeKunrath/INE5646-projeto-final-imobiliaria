import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

export default function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  )
}
