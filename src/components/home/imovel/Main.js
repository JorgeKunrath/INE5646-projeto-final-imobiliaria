import React from 'react'

export default function Main({ titulo, descricao }) {
  console.log({ descricao })

  const paragraphs = descricao.split('\n')
  console.log({ paragraphs })

  return (
    <div>
      {/* TODO adicionar botão de voltar que retorne para a home com os filtros aplicados, ou nem botar nada */}

      <h1>{titulo}</h1>
      {paragraphs.map((paragraph) => (paragraph ? <p>{paragraph}</p> : null))}

      {/* TODO google maps */}
    </div>
  )
}
