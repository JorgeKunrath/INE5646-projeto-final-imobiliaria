import React from 'react'

import HeaderFront from '../components/common/HeaderFront'
import SiteContainer from '../components/common/SiteContainer'
import Hero from '../components/home/Hero'
import HousesWrapper from '../components/home/HousesWrapper'
import Footer from '../components/common/Footer'

export default function Home() {
  return (
    <>
      <HeaderFront />

      <Hero>
        <h1>Seu próximo imóvel está aqui!</h1>
      </Hero>

      <SiteContainer style={{ marginTop: '2em', marginBottom: '2em' }}>
        <HousesWrapper />
      </SiteContainer>

      <Footer />
    </>
  )
}
