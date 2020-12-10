import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SiteContainer from '../../common/SiteContainer'

const Table = styled.div`
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  font-size: 0.95rem;
  overflow: auto;
`

const Row = styled.div`
  min-width: 1100px;
  position: relative;
  background-color: white;
  padding: 0.75rem;
  transition: background-color 0.2s ease;

  display: grid;
  grid-template-columns: 40px 3fr 1fr 1fr 3fr 2fr 1.8fr;
  align-content: center;
  grid-column-gap: 1.5em;

  :focus-within,
  :focus,
  :hover {
    background-color: var(--gray6);
  }

  :not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`
const HeaderRow = styled(Row)`
  background-color: var(--gray6);
  font-weight: bold;
`

const Cell = styled.div`
  align-self: center;
  line-height: 1.2em;

  a {
    color: var(--blue);
    :after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  img {
    display: block;
    margin: 0;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }

  &.titulo {
  }

  &.aluguel,
  &.cod {
    text-align: right;
  }

  &.flags {
    span {
      display: inline-block;
      font-size: 0.9em;
      line-height: 1;
      margin: 0.25rem;
      background-color: var(--gray6);
      padding: 0.25em 0.5em 0.4em;
      border-radius: 5px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);

      &.disponível {
        background-color: var(--green);
        color: white;
      }
      &.reservado {
        background-color: var(--orange);
        color: white;
      }
      &.alugado {
        background-color: var(--blue);
        color: white;
      }
      &.indisponível {
        background-color: var(--gray4);
        color: white;
      }
    }
  }
`

const ZeroState = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: var(--gray3);

  a {
    color: var(--orange);
    font-weight: bold;
  }
`

export default function TableHouses({ data, loaded }) {
  return (
    <SiteContainer>
      <Table>
        <HeaderRow>
          <Cell></Cell>
          <Cell>Título</Cell>
          <Cell className="cod">Código</Cell>
          <Cell className="aluguel">Aluguel</Cell>
          <Cell>Endereço</Cell>
          <Cell></Cell>
          <Cell>Atualizado em:</Cell>
        </HeaderRow>

        {loaded &&
          data &&
          data.map(
            ({
              imagens,
              titulo,
              endereco,
              status,
              cod,
              aluguel,
              createdAt,
            }) => (
              <Row key={cod}>
                <Cell className="imagem">
                  <img src={imagens[0]} alt="" />
                </Cell>
                <Cell className="titulo">
                  <Link to={`/admin/imovel/cod-${cod}`}>{titulo}</Link>
                </Cell>
                <Cell className="cod">{cod}</Cell>
                <Cell className="aluguel">
                  R$&nbsp;
                  {new Number(aluguel)
                    .toFixed(2)
                    .toString()
                    .replace('.', ',')
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')}
                </Cell>
                <Cell className="endereco">
                  {endereco.bairro} — {endereco.cidade}
                </Cell>
                <Cell className="flags">
                  <span>{endereco.tipo}</span>
                  <span className={status}>{status}</span>
                </Cell>
                <Cell>
                  {createdAt.toDate().toLocaleDateString([], {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </Cell>
              </Row>
            )
          )}

        {loaded && (!data || data.length == 0) && (
          <ZeroState>
            Nenhum imóvel cadastrado.
            <br />
            <Link to="/admin/imovel/novo">Adicione o seu primeiro imóvel</Link>
          </ZeroState>
        )}

        {!loaded && (
          <Row>
            <Cell>
              <Skeleton />
            </Cell>
            <Cell>
              <Skeleton />
            </Cell>
            <Cell>
              <Skeleton />
            </Cell>
            <Cell>
              <Skeleton />
            </Cell>
            <Cell>
              <Skeleton />
            </Cell>
            <Cell>
              <Skeleton />
            </Cell>
            <Cell>
              <Skeleton />
            </Cell>
          </Row>
        )}
      </Table>
    </SiteContainer>
  )
}
