import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SiteContainer from './SiteContainer'
import AdmUserMenu from './AdmUserMenu'

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  min-height: 72px;

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

export default function HeaderAdmin() {
  return (
    <header style={{ background: 'var(--orange)' }}>
      <SiteContainer>
        <HeaderInner>
          <Link to="/">
            <img
              style={{ paddingRight: '1rem' }}
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
          <AdmUserMenu />
        </HeaderInner>
      </SiteContainer>
    </header>
  )
}
