import React from 'react'
import styled from 'styled-components'
import Houses from './Houses'
import Filters from './Filters'

const Section = styled.section`
  display: grid;
  grid-template-columns: 1;
  grid-gap: 1em;

  @media (min-width: 1024px) {
    grid-template-columns: 25% auto;
  }
`

export default function HousesWrapper() {
  const [filteredData, setFilteredData] = React.useState([])
  const [rawData, setRawData] = React.useState()

  React.useEffect(() => {
    // get data from database
    const databaseResponseJson = [
      {
        codigo: 1,
        imagem:
          'https://wp-tid.zillowstatic.com/25/Traditional-style-suburban-home-shutterstock_398991412-823eff-1024x546.jpg',
        titulo: 'Titulo da casa aqui lasldjals laslal',
        bairro: 'Trindade',
        cidade: 'Florianópolis',
        aluguel: 3400.2,
      },
      {
        codigo: 2,
        imagem:
          'https://media.gazetadopovo.com.br/haus/2019/06/tiny-house-nation-haus-768x512-d5d21fa0.jpg',
        titulo: 'Titulo da casa',
        bairro: 'Trindade',
        cidade: 'Florianópolis',
        aluguel: 3400.2,
      },
      {
        codigo: 3,
        imagem:
          'https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg',
        titulo: 'Titulo da casa aqui lasldjals laslal',
        bairro: 'Trindade',
        cidade: 'Florianópolis',
        aluguel: 3400.2,
      },
      {
        codigo: 4,
        imagem:
          'https://media.gazetadopovo.com.br/haus/2019/06/tiny-house-nation-haus-768x512-d5d21fa0.jpg',
        titulo: 'Titulo da casa aqui lasldjals laslal',
        bairro: 'Trindade',
        cidade: 'Florianópolis',
        aluguel: 3400.2,
      },
      {
        codigo: 5,
        imagem:
          'https://wp-tid.zillowstatic.com/25/Traditional-style-suburban-home-shutterstock_398991412-823eff-1024x546.jpg',
        titulo: 'Titulo da casa aqui lasldjals laslal',
        bairro: 'Trindade',
        cidade: 'Florianópolis',
        aluguel: 3400.2,
      },
    ]

    setTimeout(() => setRawData(databaseResponseJson), 1000)
  }, [])

  return (
    <Section>
      <Filters
        rawData={rawData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
      {/* pass data to Houses (houses dosn`t care about logic, just render) */}
      <Houses data={filteredData} />
    </Section>
  )
}
