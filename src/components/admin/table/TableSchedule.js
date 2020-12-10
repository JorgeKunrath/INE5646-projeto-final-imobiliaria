import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SiteContainer from '../../common/SiteContainer'
import IcoWhatsapp from '../../../icons/Whatsapp'

const Table = styled.div`
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  font-size: 0.95rem;
  overflow: auto;
`

const Row = styled.div`
  min-width: 900px;
  position: relative;
  background-color: white;
  padding: 0.75rem;
  transition: background-color 0.2s ease;

  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
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

  &.aluguel {
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

export default function TableSchedule({ data, loaded }) {
  console.log({ data })

  function telToZap(tel) {
    let zap = tel.trim().replace(/[\(\)\-\s  *]/gi, '')
    if (zap.length == 8) {
      zap = '9' + zap
    }
    if (zap.length == 9) {
      zap = '48' + zap
    }
    if (zap.length == 11) {
      zap = '55' + zap
    }
    console.log({ zap })
    return zap
  }

  return (
    <SiteContainer>
      <Table>
        <HeaderRow>
          <Cell>Cód. Imóvel</Cell>
          <Cell>Nome</Cell>
          <Cell>Email</Cell>
          <Cell>Telefone</Cell>
          {/* <Cell>Status</Cell> */}
          <Cell>Criado em:</Cell>
        </HeaderRow>

        {loaded &&
          data &&
          data.map(({ codRef, createdAt, email, nome, telefone, status }) => (
            <Row key={codRef}>
              <Cell className="">
                <Link to={`/admin/imovel/cod-${codRef}`}>{codRef}</Link>
              </Cell>
              <Cell className="">{nome}</Cell>
              <Cell className="">
                <a href={`mailto:${email}`}>{email}</a>
              </Cell>
              <Cell className="">
                <a
                  href={`https://wa.me/${telToZap(telefone)}`}
                  target="_blank"
                  rel="nofollow"
                  style={{ padding: '0.25em', marginRight: '0.25em' }}
                >
                  <IcoWhatsapp size={14} style={{ fill: 'var(--green)' }} />
                </a>
                <a href={`tel:${telefone}`}>{telefone}</a>
              </Cell>
              {/* <Cell className="">{status}</Cell> */}
              <Cell className="">
                {createdAt.toDate().toLocaleDateString([], {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </Cell>
            </Row>
          ))}

        {loaded && (!data || data.length == 0) && (
          <ZeroState>Nenhuma visita agendada</ZeroState>
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
          </Row>
        )}
      </Table>
    </SiteContainer>
  )
}
