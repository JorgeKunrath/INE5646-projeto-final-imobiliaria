import React from 'react'
import styled from 'styled-components'

const InputStyled = styled.input`
  margin-top: 0.5em;
  font-size: 1rem;
  border: ${(props) => (props.error ? '1px solid red' : '1px solid grey')};
  :focus {
    outline: none;
  }
`

export default function Input(props) {
  return (
    <label>
      {props.label}
      <InputStyled
        as={props.as ? props.as : 'input'}
        type={props.type}
        name={props.name}
        ref={props.refTo}
        error={props.error}
      />
    </label>
  )
}
