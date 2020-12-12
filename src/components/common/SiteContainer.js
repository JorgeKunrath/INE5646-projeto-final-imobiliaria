import styled from 'styled-components'

const Div = styled.div`
  width: calc(100% - max(2em, 7%));
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
`

export default function SiteContainer(props) {
  const styles = props.style || {}

  return <Div style={styles}>{props.children}</Div>
}
