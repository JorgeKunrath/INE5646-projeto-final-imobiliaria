import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  background: #F2994A;
`;

export default function Header(props) {
  return (
    <HeaderWrapper>
      {props.children}
    </HeaderWrapper>
  )
}
