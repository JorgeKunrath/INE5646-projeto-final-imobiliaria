import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import styled from 'styled-components'

import HeaderFront from '../../components/common/HeaderFront'
import Footer from '../../components/common/Footer'
import Card from '../../components/common/Card'
import SiteContainer from '../../components/common/SiteContainer'
import IcoGoogle from '../../icons/Google'

const resetButton = `
  appearance: none;
  padding: 0;
  border: 0;
  font: inherit;
  background: none;
  box-shadow: none;
  color: inherit;
`

const Button = styled.button`
  ${resetButton}

  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin: 0 auto;
  border-radius: 5px;
  background-color: rgba(242, 153, 74, 0.1);
  transition: background-color 0.2s ease;
  cursor: pointer;

  :focus,
  :hover {
    background-color: rgba(242, 153, 74, 0.15);
  }

  svg {
    margin-right: 0.5rem;
  }
`

const Text = styled.div`
  h1 {
    margin-bottom: 1rem;
    color: var(--gray3);
  }

  p {
    font-size: 0.9rem;
    color: var(--gray4);
  }
`

export default function LoginPage() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  return (
    <>
      <HeaderFront />
      <SiteContainer
        style={{
          marginTop: 'auto',
        }}
      >
        <Card
          style={{
            maxWidth: 300,
            margin: '2rem auto',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <Text>
            <h1>Login</h1>
            <p>Entre com sua conta ou crie uma nova caso ainda não possua</p>
          </Text>

          <Button onClick={signInWithGoogle}>
            <IcoGoogle />
            Acessar com o Google
          </Button>
        </Card>
      </SiteContainer>
      <Footer />
    </>
  )
}
