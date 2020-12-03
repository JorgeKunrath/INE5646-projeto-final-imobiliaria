import React from 'react'

import HeaderAdmin from '../../components/common/HeaderAdmin'
import Footer from '../../components/common/Footer'
// import AdmFormExample from '../../components/AdmFormExample'
import AdmFormImovel from '../../components/AdmFormImovel'
import SiteContainer from '../../components/common/SiteContainer'

export default function AdmImovel() {
  /*
    - utilizar o negócio do routes pra ler url e buscar o "cod"
      TRUE:  - acessa contexto com os dados da aplicação e selecoina a parte q bate com o "cod"
             - passa os dados pro form
      FALSE: - informa que é uma entrada nova

    não sei se esse lance de salvar os dados localmente é legal, mt lógica pra ficar atualizando e mantendo em sincronia... (talvez, capaz de ser suave com state)
    fazer várias requisições, para cada tela e para coisa necessária, aumenta um pouco os custos no firestore e demora mais localmente, mas é mais consistente
  */

  return (
    <>
      <HeaderAdmin />

      <SiteContainer>
        <small>← Voltar</small>
        <h1>Editar Imóvel</h1>
        <p>Cod. xxxx</p>
      </SiteContainer>

      <main>
        <AdmFormImovel />
      </main>

      <Footer />
    </>
  )
}
