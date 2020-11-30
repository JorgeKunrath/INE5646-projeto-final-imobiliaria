import React from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'

import Card from '../common/Card'
import { Link } from 'react-router-dom'

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
  }
`

const Content = styled.div`
  padding: 0.25em 0.5em 0.5em;
  flex-grow: 1;
  display: flex;
  flex-flow: column;

  span,
  p {
    color: #828282;
  }

  span {
    font-size: 0.8em;
    line-height: 1.2em;
  }

  h3 {
    margin: 0 0 0.5em;
    color: #333333;
  }

  p {
    margin: 0 0 0.5em;
  }
`

// fake, é pra ser um componente próprio
const Icons = styled.div`
  border: 2px solid blue;
`

export default function Houses(props) {
  return (
    <Main>
      {props.data ? (
        props.data.map((data) => (
          <HouseCard key={`HouseCard-${data.codigo}`}>
            <Link to={`imovel/cod-${data.codigo}`}>
              <Picture>
                <img src={data.imagem} alt="" />
              </Picture>
              <Content>
                <span>
                  {data.bairro} — {data.cidade}
                </span>
                <h3>{data.titulo}</h3>
                <p>R$ {data.aluguel.toFixed(2).replace('.', ',')}</p>
                <Icons style={{ marginTop: 'auto' }}>Icons com infos</Icons>
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
