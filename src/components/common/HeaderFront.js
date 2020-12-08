import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SiteContainer from './SiteContainer'

const HeaderInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 72px;
`

export default function HeaderFront() {
  return (
    <header style={{ background: 'var(--orange)' }}>
      <SiteContainer>
        <HeaderInner>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + '/logo_imobiliaria.png'}
              alt="Logo Genérico"
            />
          </Link>
        </HeaderInner>
      </SiteContainer>
    </header>
  )
}
