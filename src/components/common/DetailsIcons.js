import React from 'react'
import styled from 'styled-components'

import IcoQuartos from '../../icons/Quartos'
import IcoBanheiros from '../../icons/Banheiros'
import IcoGaragem from '../../icons/Garagem'
import IcoArea from '../../icons/Area'

const Wrapper = styled.div`
  margin-top: auto;
  padding-right: 1em;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--gray3);
  }

  svg {
    fill: var(--orange);
    margin-right: 0.5em;
  }
`

export default function DetailsIcons({ data }) {
  return (
    <Wrapper>
      <span>
        <IcoQuartos />
        {data.dormitorios}{' '}
      </span>
      <span>
        <IcoBanheiros />
        {data.banheiros}{' '}
      </span>
      <span>
        <IcoGaragem />
        {data.vagas}{' '}
      </span>
      <span>
        <IcoArea />
        {data.area}m²{' '}
      </span>
    </Wrapper>
  )
}
