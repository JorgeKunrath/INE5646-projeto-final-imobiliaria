import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import User from '../../icons/User'
import SiteContainer from './SiteContainer'

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  min-height: 72px;

  img {
    padding-right: 1em;
  }

  .tel {
    display: block;
    margin-left: auto;
    padding: 0.5em 0.75em;
    text-decoration: none;
    text-align: center;
    line-height: 1;
    background: var(--green);
    color: white;
    border-radius: 5px;
    box-shadow: var(--shadow);
  }

  svg {
    margin-left: 1em;
    box-shadow: var(--shadow);
    border-radius: 50%;
  }
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
          <a href="tel:48999999999" className="tel">
            48 99999 9999
          </a>
          <User width={40} height={40} />
        </HeaderInner>
      </SiteContainer>
    </header>
  )
}
