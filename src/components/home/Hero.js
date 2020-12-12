import styled from 'styled-components'

import SiteContainer from '../common/SiteContainer'

const Div = styled.div`
  min-height: 45vh;
  background: #f2994a;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: white;
  text-align: center;
  font-size: 2rem;

  h1 {
    margin-top: -72px;
    padding: 1em 0;
  }
`

export default function Hero(props) {
  return (
    <Div>
      <SiteContainer>{props.children}</SiteContainer>
    </Div>
  )
}
