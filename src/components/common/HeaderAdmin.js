import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AdmUserMenu from './AdmUserMenu'

import SiteContainer from './SiteContainer'

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  min-height: 72px;

  img {
    padding-right: 1em;
  }

  .cta {
    display: block;
    padding: 0.5em 0.75em;
    text-decoration: none;
    text-align: center;
    line-height: 1;
    background: white;
    color: var(--orange);
    border-radius: 5px;
    box-shadow: var(--shadow);
  }
`

const LinksWrapper = styled.div`
  margin-left: auto;

  a {
    margin-right: 1em;
    color: white;
    text-decoration: none;
  }
`

export default function HeaderAdmin({ signOut }) {
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
          <LinksWrapper>
            <Link to="/admin">Imóveis</Link>
            <Link to="/admin/agendamentos">Agendamentos</Link>
          </LinksWrapper>
          <Link to="/admin/imovel/novo" className="cta">
            Adicionar Imóvel
          </Link>
          <AdmUserMenu signOut={signOut} />
        </HeaderInner>
      </SiteContainer>
    </header>
  )
}
