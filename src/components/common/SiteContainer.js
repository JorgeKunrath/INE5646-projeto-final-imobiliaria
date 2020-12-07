import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: calc(100% - 2em);
  max-width: 1224px;
  margin-left: auto;
  margin-right: auto;
`

export default function SiteContainer(props) {
  const styles = props.style || {}

  return <Div style={styles}>{props.children}</Div>
}
