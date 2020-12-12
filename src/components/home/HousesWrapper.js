import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Houses from './Houses'
import Filters from './Filters'
import { getImoveisResumo } from '../../services/firestore'

const Section = styled.section`
  display: grid;
  grid-template-columns: 1;
  grid-gap: 1em;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 25% auto;
  }
`

export default function HousesWrapper() {
  const [filteredData, setFilteredData] = useState([])
  const [rawData, setRawData] = useState()

  useEffect(() => {
    // get data from database
    async function getData() {
      const databaseResponseJson = await getImoveisResumo()
      setRawData(databaseResponseJson)
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
