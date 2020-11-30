import React from 'react'

import HeaderFront from '../components/common/HeaderFront'
import Footer from '../components/common/Footer'

export default function Imovel() {
  return (
    <>
      <HeaderFront />
      <h1>estou no imóvel do front</h1>
      <p>
        quando acessa baixa todas as infos do firebase e salva localmente, em
        cada lugar filtra e exibe o q necessário
      </p>
      <Footer />
    </>
  )
}
