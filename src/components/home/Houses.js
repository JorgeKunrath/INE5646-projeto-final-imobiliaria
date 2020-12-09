import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

import Card from '../common/Card'
import { Link } from 'react-router-dom'
import DetailsIcons from '../common/DetailsIcons'

const Main = styled.main`
  flex-grow: 1;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1em;

  // Skeleton wrapper - not exactly the <Skeleton>, these are the children
  > span {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1em;
  }
`

const HouseCard = styled(Card)`
  a {
    height: 100%;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: unset;
  }

  transition: box-shadow 0.3s ease;
  :hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 0, 0, 0.1);
  }
  :focus-within {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(0, 0, 0, 0.3);
  }
`

const Picture = styled.picture`
  position: relative;
  padding-top: calc((9 / 16) * 100%);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #fafafa;
  }
`

const Content = styled.div`
  padding: 0.5rem 0.75rem 0.75rem;
  flex-grow: 1;
  display: flex;
  flex-flow: column;

  span,
  p {
    color: var(--gray3);
  }

  span {
    font-size: 0.9rem;
    line-height: 1.2em;
  }

  h3 {
    margin: 0 0 0.5rem;
    color: #333333;
  }

  p {
    margin: 0 0 0.75rem;
  }
`

export default function Houses(props) {
  console.log({ props })
  return (
    <Main>
      {props.data ? (
        props.data.map((data) => (
          <HouseCard key={`HouseCard-${data.codRef}`}>
            <Link to={`imovel/cod-${data.codRef}`}>
              <Picture>
                <img src={data.imagem} alt="" />
              </Picture>
              <Content>
                <span>
                  {data.endereco.bairro} — {data.endereco.cidade}
                </span>
                <h3>{data.titulo}</h3>
                {/* price can be better */}
                <p>
                  R${' '}
                  {new Number(data.aluguel)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')}
                </p>
                <DetailsIcons data={data.detalhes} style={{ marginLeft: 0 }} />
              </Content>
            </Link>
          </HouseCard>
        ))
      ) : (
        <Skeleton height={300} count={6} />
      )}
    </Main>
  )
}
