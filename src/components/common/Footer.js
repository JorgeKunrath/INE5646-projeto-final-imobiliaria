import React from 'react'
import styled from 'styled-components'
import NavExample from '../NavExample'

const FooterStyled = styled.footer`
  background: var(--orange);
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
`

export default function Footer() {
  return (
    <FooterStyled>
      rodapé aaaquiiii
      <NavExample />
    </FooterStyled>
  )
}
