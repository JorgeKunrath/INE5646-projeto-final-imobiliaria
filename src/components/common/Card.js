import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  background: white;
  box-shadow: var(--shadow);
  border-radius: 5px;
  overflow: hidden;
`

export default function Card(props) {
  const styles = props.style || {}

  return (
    <Div className={props.className} style={styles}>
      {props.children}
    </Div>
  )
}
