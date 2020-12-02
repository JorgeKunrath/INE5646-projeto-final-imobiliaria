import React from 'react'

import HeaderAdmin from '../../components/common/HeaderAdmin'
import Footer from '../../components/common/Footer'
// import AdmFormExample from '../../components/AdmFormExample'
import AdmFormImovel from '../../components/AdmFormImovel'

export default function AdmImovel() {
  return (
    <>
      <HeaderAdmin />
      <p>
        Admin - imovel (criação e edição, por enquanto, e talvez pra sempre)
      </p>

      <main>
        <AdmFormImovel />
      </main>

      <Footer />
    </>
  )
}
