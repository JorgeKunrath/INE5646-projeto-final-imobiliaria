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
  padding: 2rem 0;

  > * {
    min-width: 250px;
    :last-child {
      margin-left: 2em;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
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

  const fakeImages = [
    'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2F0x0.jpg',
    'https://assets0.biggerpockets.com/uploads/wordpress_blog_post/image/9335/featured_student-housing-empire.jpg',
    'https://media.gazetadopovo.com.br/haus/2019/10/decoracao-de-quarto-com-cores-neutras-13-768x473-3cf2c1b0.jpg',
    'https://casa.abril.com.br/wp-content/uploads/2019/12/2-5-dicas-para-iluminar-seu-banheiro-com-charme-e-funcionalidade.jpg?quality=95&strip=info&w=1024',
    'https://images.homify.com/images/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1506348695/p/photo/image/2241997/GRP_up_over_2/fotos-de-garagens-e-ediculas-classico-por-wessex-garage-doors.jpg',
  ]

  return (
    <>
      <HeaderFront />
      {data ? (
        <>
          <HeroImovel images={fakeImages} />
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
