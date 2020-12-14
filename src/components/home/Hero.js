import styled from 'styled-components'

import SiteContainer from '../common/SiteContainer'

const Div = styled.div`
  min-height: 45vmin;
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
    padding: 3em 0;
    font-size: clamp(24px, 5vw, 60px);
  }
`

export default function Hero(props) {
  return (
    <Div>
      <SiteContainer>{props.children}</SiteContainer>
    </Div>
  )
}
