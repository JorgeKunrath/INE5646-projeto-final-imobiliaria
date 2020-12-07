import React from 'react'
import styled from 'styled-components'
import Card from '../../common/Card'
import DetailsIcons from '../../common/DetailsIcons'

const Inner = styled.div`
  padding: 1rem;
  color: var(--gray3);
`

const Flags = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    font-size: 0.9rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }

  span {
    padding: 0.25em 0.35em;
    background-color: var(--gray5);
    border-radius: 3px;
    line-height: 1;
  }

  p {
    margin: 0;
    white-space: nowrap;
  }

  .disponivel {
    background-color: var(--green);
    color: white;
  }
`

const Price = styled.p`
  font-size: 1.3rem;
  margin: 0.5rem 0;
  font-weight: bold;
`

const Adress = styled.div`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  p {
    margin: 0;
  }
`

const Button = styled.button`
  box-sizing: inherit;
  font: inherit;
  color: white;
  text-align: center;

  display: block;
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 1rem;

  background-color: var(--blue);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`

export default function Aside({ endereco, detalhes, status, cod, aluguel }) {
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
        <Button>Marcar Visita</Button>
      </Inner>
    </Card>
  )
}
