import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import Card from '../common/Card'

const Aside = styled.aside``

export default function Filters(props) {
  const styles = props.style || {}

  const { rawData, filteredData, setFilteredData } = props

  // demo
  let filtersChanges

  // filter data (just a demo so far)
  React.useEffect(() => {
    setFilteredData(rawData)
  }, [rawData])

  return (
    <Aside>
      <Card style={{ padding: '0.5em', ...styles }}>Filtros</Card>
    </Aside>
  )
}
