import React from 'react'
import styled from 'styled-components'
import SiteContainer from '../common/SiteContainer';

const Div = styled.div`
  min-height: 50vh;
  background: #F2994A;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: white;
  text-align: center;
  font-size: 2rem;
`;

export default function Hero(props) {
  return (
    <Div>
      <SiteContainer>
        {props.children}
      </SiteContainer>
    </Div>
  )
}
