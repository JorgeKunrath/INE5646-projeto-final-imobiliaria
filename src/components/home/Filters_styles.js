import styled from 'styled-components'

export const Aside = styled.aside``

export const FilterInputs = styled.div`
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

export const Flags = styled.div`
  span {
    display: inline-block;
    font-size: 0.9em;
    line-height: 1;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: var(--gray6);
    padding: 0.25em 0.5em 0.4em;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &.selected {
      background-color: var(--orange);
      color: white;
    }
  }
`

export const Sliders = styled.div`
  margin-top: 1rem;
  padding: 0 0.25em;

  .MuiSlider-root {
    display: block;
    max-width: 98%;
    margin: 0 auto;
  }
  .MuiSlider-colorPrimary {
    color: var(--orange);
  }
  .MuiSlider-rail {
    background-color: var(--gray4);
  }
  .MuiSlider-thumb:focus,
  .MuiSlider-thumb:hover {
    box-shadow: 0 0 0 8px rgba(242, 153, 74, 0.25);
  }
`

export const SliderLabel = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
    fill: var(--orange);
  }
`
