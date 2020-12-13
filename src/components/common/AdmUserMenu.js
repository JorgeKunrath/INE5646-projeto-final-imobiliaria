import { useState, useEffect, useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import { AuthContext } from '../../components/AuthProvider'

import styled from 'styled-components'
import IcoUser from '../../icons/User'

const MenuWrapper = styled.div`
  position: relative;
  margin-left: 1em;
  display: grid;
  place-items: center;
`

const resetButton = `
  appearance: none;
  padding: 0;
  border: 0;
  font: inherit;
  background: none;
  box-shadow: none;
  color: inherit;
`

const IconButton = styled.button`
  ${resetButton}

  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 95;

  svg,
  img {
    display: block;
    border-radius: 50%;
    box-shadow: var(--shadow);
  }

  img {
    width: 40px;
    min-width: 40px;
    height: 40px;
    padding: 0;
    margin: 0;
  }
`

const Modal = styled.div`
  background: white;
  position: absolute;
  right: -0.5rem;
  top: calc(100% + 0.25rem);
  width: min(200px, 90vw);
  border-radius: 5px;
  box-shadow: var(--shadow);
  z-index: 99;
  overflow: hidden;
  font-size: 0.9rem;

  display: flex;
  flex-direction: column;
  padding: 5px 0;

  p {
    padding: 0.5em 1em 0.75em;
    margin: 0;
    font-weight: 600;
  }

  span {
    opacity: 0.5;
    font-size: 0.8rem;
    font-weight: 400;
  }

  button {
    ${resetButton}
    padding: 0.5em 1em;
    text-align: left;
    background-color: #f5f5f5;
    color: #eb5757;
    cursor: pointer;
    transition: all 0.2s ease;

    :focus,
    :hover {
      background-color: #fddddd;
    }
  }
`
const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 90;
`

export default function AdmUserMenu() {
  const { currentUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [greeting, setGreeting] = useState()

  function signOut() {
    firebase.auth().signOut()
  }

  // o site é educado pô
  useEffect(() => {
    let today = new Date()
    let curHr = today.getHours()

    if (curHr > 6 && curHr <= 12) {
      setGreeting('Bom dia,')
    } else if (curHr > 12 && curHr <= 18) {
      setGreeting('Boa tarde,')
    } else {
      setGreeting('Boa noite,')
    }
  }, [isOpen])

  return (
    <>
      <MenuWrapper>
        <IconButton onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <IcoUser size={40} />
          )}
        </IconButton>
        {isOpen && (
          <Modal>
            {currentUser.displayName && (
              <p>
                <span>{greeting}</span>
                <br /> {currentUser.displayName}!
              </p>
            )}
            <button onClick={() => signOut()}>Sair</button>
          </Modal>
        )}
      </MenuWrapper>
      {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
    </>
  )
}
