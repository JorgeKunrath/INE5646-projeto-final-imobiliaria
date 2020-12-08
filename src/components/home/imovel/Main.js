import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Main({ titulo, descricao }) {
  const paragraphs = descricao.split('\n')

  return (
    <div>
      {/* TODO adicionar botão de voltar que retorne para a home com os filtros aplicados, ou nem botar nada */}

      <h1>{titulo}</h1>

      <ReactMarkdown>{descricao}</ReactMarkdown>

      {/* TODO google maps */}
    </div>
  )
}
