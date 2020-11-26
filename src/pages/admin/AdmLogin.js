import React from 'react'
import NavExample from '../../components/NavExample'
import Admin from './Admin'

export default function AdmLogin() {
  // maybe use useMemo or some other way to store this info
  const [loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div>
      <NavExample />
      {loggedIn ? (
        <>
          <Admin userData={loggedIn} />
          <button onClick={() => setLoggedIn(false)}>Deslogar</button>
        </>
      ) : (
        <>
          <p>Tela de loggin aqui</p>
          <button onClick={() => setLoggedIn(true)}>Logar</button>
        </>
      )}
    </div>
  )
}
