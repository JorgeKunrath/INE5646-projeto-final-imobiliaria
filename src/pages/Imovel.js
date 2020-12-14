import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import HeaderFront from '../components/common/HeaderFront'
import Footer from '../components/common/Footer'
import { getImovel } from '../services/firestore'
import SiteContainer from '../components/common/SiteContainer'
import HeroImovel from '../components/home/imovel/HeroImovel'
import Main from '../components/home/imovel/Main'
import Aside from '../components/home/imovel/Aside'

const Content = styled.main`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 300px;
  grid-gap: 2rem;
  align-items: start;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export default function Imovel() {
  const [data, setData] = useState(null)
  const location = useLocation()
  const currentCod = +location.pathname.replace('/imovel/cod-', '')

  useEffect(() => {
    async function getData() {
      const data = await getImovel(currentCod)
      setData(data)
    }
    getData()
  }, [])

  return (
    <>
      <HeaderFront />
      {data ? (
        <>
          <HeroImovel images={data.imagens} />
          <SiteContainer style={{ maxWidth: 1200 }}>
            <Content>
              <Main titulo={data.titulo} descricao={data.descricao} />
              <Aside data={data} />
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
