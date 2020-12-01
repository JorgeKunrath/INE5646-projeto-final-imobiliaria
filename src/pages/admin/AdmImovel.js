import React from 'react'

import HeaderAdmin from '../../components/common/HeaderAdmin'
import Footer from '../../components/common/Footer'
import AdmFormExample from '../../components/AdmFormExample'

export default function AdmImovel() {
  const [dbData, setDbData] = React.useState(null)

  React.useEffect(() => {
    setTimeout(
      () =>
        setDbData({
          titulo: 'placeholder titulo mas n exatamente',
          inscricaoMunicipal: 'inscricao q ja veio do banco de dados',
          aluguel: 123,
          codigoProvisorio: 321,
        }),
      500
    )
  }, [])

  return (
    <>
      <HeaderAdmin />
      <h1>
        Admin - imovel (criação e edição, por enquanto, e talvez pra sempre)
      </h1>

      <main>
        {dbData ? (
          <AdmFormExample dbData={dbData} />
        ) : (
          <p style={{ textAlign: 'center' }}>Carregando dados</p>
        )}
      </main>

      <Footer />
    </>
  )
}
