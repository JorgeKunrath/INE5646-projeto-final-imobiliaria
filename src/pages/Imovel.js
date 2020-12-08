import React from 'react'
import { useLocation } from 'react-router-dom'

import HeaderFront from '../components/common/HeaderFront'
import Footer from '../components/common/Footer'
import { getImovel } from '../services/firestore'
import SiteContainer from '../components/common/SiteContainer'
import HeroImovel from '../components/home/imovel/HeroImovel'
import Main from '../components/home/imovel/Main'
import Aside from '../components/home/imovel/Aside'
import styled from 'styled-components'

const Content = styled.main`
  /* border: 3px solid blue; */
  display: flex;
  align-items: flex-start;
  padding: 2rem 0;

  > * {
    min-width: 250px;
    :last-child {
      margin-left: 2em;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    > * {
      min-width: unset;
      :last-child {
        margin-left: 0;
      }
    }
  }
`

export default function Imovel() {
  const [data, setData] = React.useState(null)
  const location = useLocation()
  const currentCod = +location.pathname.replace('/imovel/cod-', '')

  React.useEffect(() => {
    async function getData() {
      const data = await getImovel(currentCod)
      setData(data)
      setTimeout(() => console.log(data), 0)
    }
    getData()
  }, [])

  return (
    <>
      <HeaderFront />
      {data ? (
        <>
          <HeroImovel images={data.imagens} />
          <SiteContainer>
            <Content>
              <Main titulo={data.titulo} descricao={data.descricao} />
              <Aside
                endereco={data.endereco}
                detalhes={data.detalhes}
                status={data.status}
                cod={data.cod}
                aluguel={data.aluguel}
              />
            </Content>
          </SiteContainer>
        </>
      ) : (
        <p>Carregando</p>
      )}
      <Footer />
    </>
  )
}
