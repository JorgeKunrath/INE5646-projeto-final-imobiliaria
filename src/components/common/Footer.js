import React from 'react'
import styled from 'styled-components'
import NavExample from '../NavExample'

const FooterStyled = styled.footer`
  background: var(--orange);
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
  color: rgba(0, 0, 0, 0.2);
  a {
    color: rgba(0, 0, 0, 0.2);
  }
`

export default function Footer() {
  return (
    <FooterStyled>
      <NavExample />
      <small>
        Este site é um projeto acadêmico. As informações aqui contidas não
        condizem com a realidade.
      </small>
    </FooterStyled>
  )
}
