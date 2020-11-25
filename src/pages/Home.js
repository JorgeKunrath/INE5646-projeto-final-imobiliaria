import React from 'react'
import Hero from '../components/home/Hero'
import Header from '../components/common/Header'
import NavExample from '../components/NavExample'
import SiteContainer from '../components/common/SiteContainer'
import HousesWrapper from '../components/home/HousesWrapper'

export default function Home() {
  return (
    <div>
      <Header style={{ padding: '60px' }}>
        <SiteContainer>
          <NavExample />
        </SiteContainer>
      </Header>

      <Hero>
        <h1>Seu próximo imóvel está aqui!</h1>
      </Hero>

      <SiteContainer style={{ marginTop: '2em', marginBottom: '2em' }}>
        <HousesWrapper />
      </SiteContainer>

      <footer>Rodape</footer>
    </div>
  )
}
