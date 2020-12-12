import styled from 'styled-components'

const Div = styled.div`
  background: white;
  box-shadow: var(--shadow);
  border-radius: 5px;
  overflow: hidden;
`

export default function Card(props) {
  const style = props.style || {}

  return (
    <Div className={props.className} style={style}>
      {props.children}
    </Div>
  )
}
