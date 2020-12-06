import React from 'react'
import styled from 'styled-components'
import Houses from './Houses'
import Filters from './Filters'
import { getImoveisResumo } from '../../services/firestore'

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
    async function getData() {
      const databaseResponseJson = await getImoveisResumo()
      setRawData(databaseResponseJson)

      // provisório, ou talvez o valor inicial possa ser isso mesmo
      setFilteredData(databaseResponseJson)
    }
    getData()
  }, [])

  return (
    <Section>
      <Filters
        rawData={rawData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
      <Houses data={filteredData} />
    </Section>
  )
}
