import { useState, useEffect } from 'react'

import styled from 'styled-components'
import IcoUser from '../../icons/User'

const MenuWrapper = styled.div`
  position: relative;
  margin-left: 1em;
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

  svg {
    display: block;
    border-radius: 50%;
    box-shadow: var(--shadow);
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
    background-color: #fdeeee;
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

export default function AdmUserMenu({ signOut }) {
  const [isOpen, setIsOpen] = useState(false)
  const [greeting, setGreeting] = useState()

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

  const userName = 'Fulano da Silva Santos'

  return (
    <>
      <MenuWrapper>
        <IconButton onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <IcoUser size={40} />
        </IconButton>
        {isOpen && (
          <Modal>
            <p>
              <span>{greeting}</span>
              <br /> {userName}!
            </p>
            <button onClick={() => signOut()}>Sair</button>
          </Modal>
        )}
      </MenuWrapper>
      {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
    </>
  )
}
