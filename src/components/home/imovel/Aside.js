import React from 'react'
import styled from 'styled-components'
import Card from '../../common/Card'
import DetailsIcons from '../../common/DetailsIcons'
import ScheduleButton from './ScheduleButton'

const Inner = styled.div`
  padding: 1rem;
  color: var(--gray3);
`

const Flags = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;

  > * {
    font-size: 0.9rem;
    margin: 0 0.5rem 0.5rem 0;
    white-space: nowrap;
  }

  span {
    padding: 0.25em 0.35em;
    background-color: var(--gray5);
    border-radius: 3px;
    line-height: 1;
  }

  .disponivel {
    background-color: var(--green);
    color: white;
  }
`

const Price = styled.p`
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
  font-weight: bold;
`

const Adress = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  p {
    margin: 0;
  }
`

export default function Aside({ data }) {
  const { endereco, detalhes, status, cod, aluguel, userUidRef } = data
  const { rua, numero, estado, bairro, complemento, cidade } = endereco

  return (
    <Card>
      <Inner>
        <Flags>
          <span>{endereco.tipo}</span>{' '}
          <span
            className={status.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
          >
            {status}
          </span>{' '}
          <p>cód. {cod}</p>
        </Flags>

        <Price>
          R${' '}
          {new Number(aluguel)
            .toFixed(2)
            .toString()
            .replace('.', ',')
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')}
        </Price>

        <Adress>
          <p>
            {rua}, {numero} {complemento}
          </p>
          <p>{bairro}</p>
          <p>{cidade}</p>
        </Adress>
        <DetailsIcons data={detalhes} />
        <ScheduleButton userUidRef={userUidRef} cod={cod} />
      </Inner>
    </Card>
  )
}
