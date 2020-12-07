import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 2em 0;

  label {
    display: flex;
    flex-flow: column;
    margin-bottom: 1em;
    color: var(--gray3);
    min-width: 0;
  }

  hr {
    margin-bottom: 1em;
    border: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .price {
    position: relative;

    input {
      padding-left: 2em;
    }

    ::before {
      content: 'R$ ';
      position: absolute;
      bottom: calc(0.5em + 2px);
      left: 0.75em;
      width: 0;
    }
  }
`

export const Fieldset = styled.div`
  display: grid;
  grid-template-columns: ${({ inputCount }) => `repeat(${inputCount}, 1fr)`};
  grid-gap: 1em;
  padding: 0;
  max-width: 100%;
`

export const InputStyled = styled.input`
  width: unset;
  max-width: auto;
  margin-top: 0.25em;
  font-size: inherit;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 0.5em 0.75em;
  color: var(--gray3);
  border: ${(props) =>
    props.error ? '1px solid #eb5757' : '1px solid #e0e0e0'};
  box-shadow: ${(props) =>
    props.error ? 'inset 0 0 0 1px #eb5757' : 'inset 0 0 0 0 transparent'};
  transition: box-shadow 0.2s ease, border 0.2s ease;

  :focus {
    outline: none;
  }

  &.textarea {
    resize: vertical;
  }
`

export const Button = styled.button`
  position: absolute;
  top: -4em;
  right: 0;

  display: block;
  padding: 0.5em 0.75em;
  background-color: var(--green);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: inherit;
  cursor: pointer;

  pointer-events: ${({ loading }) => (loading == 'true' ? 'none' : 'unset')};
  background-color: ${({ loading }) =>
    loading == 'true' ? 'var(--gray3)' : 'var(--green)'};
`

export const LeftCol = styled.div`
  width: 60%;
`

export const RigthCol = styled.div`
  width: 40%;
  padding-left: 2rem;
`
export const ImagesUploaded = styled.div`
  border: 2px solid var(--gray5);
  width: 100%;
  padding: 0.5em;
  border-radius: 5px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
  place-items: center;

  *:first-child {
    grid-column: 1 / span 2;
  }
`
