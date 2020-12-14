import Footer from '../components/common/Footer'
import HeaderFront from '../components/common/HeaderFront'
import SiteContainer from '../components/common/SiteContainer'

export default function Error404() {
  return (
    <>
      <HeaderFront />
      <SiteContainer>
        <p style={{ textAlign: 'center' }}>
          <strong>Erro 404</strong>
          <br />
          Página não encontrada :(
        </p>
      </SiteContainer>
      <Footer />
    </>
  )
}
