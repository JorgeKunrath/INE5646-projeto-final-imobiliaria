import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 4px rgba(0, 0, 0, 0.05);
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
