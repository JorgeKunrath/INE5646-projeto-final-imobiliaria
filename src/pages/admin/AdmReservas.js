import { useState, useEffect } from 'react'

import { getSchedulesForUser } from '../../services/firestore'
import TableSchedule from '../../components/admin/table/TableSchedule'
import SiteContainer from '../../components/common/SiteContainer'

export default function AdmReservas() {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  // request pro banco de dados
  useEffect(() => {
    getSchedulesForUser(setData)
  }, [])

  // trata os dados (não implementado)
  useEffect(() => {
    setLoaded(false)
    if (data) {
      setFilteredData(data)
      setLoaded(true)
    }
  }, [data])

  return (
    <SiteContainer>
      <h1
        style={{
          margin: '2rem 0 0',
          fontSize: '2rem',
          color: 'var(--gray3)',
        }}
      >
        Visitas Agendadas
      </h1>
      <TableSchedule data={filteredData} loaded={loaded} />
    </SiteContainer>
  )
}
