import styled from 'styled-components'
import FooterNav from '../FooterNav'

const FooterStyled = styled.footer`
  background: var(--orange);
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
  color: rgba(0, 0, 0, 0.4);
  a {
    color: rgba(0, 0, 0, 0.4);
  }
`

export default function Footer() {
  return (
    <FooterStyled>
      <FooterNav />
      <small>
        Este site é um projeto acadêmico. As informações aqui contidas não
        condizem com a realidade.
      </small>
    </FooterStyled>
  )
}
