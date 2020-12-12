import { useState, useEffect } from 'react'

import { getUserHouses } from '../../services/firestore'
import HeaderAdmin from '../../components/common/HeaderAdmin'
import Footer from '../../components/common/Footer'
import TableHouses from '../../components/admin/table/TableHouses'
import SiteContainer from '../../components/common/SiteContainer'

export default function AdmHome() {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  // request pro banco de dados
  useEffect(() => {
    getUserHouses(setData)
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
    <>
      <HeaderAdmin />
      <SiteContainer>
        <h1
          style={{
            margin: '2rem 0 0',
            fontSize: '2rem',
            color: 'var(--gray3)',
          }}
        >
          Imóveis Cadastrados
        </h1>
      </SiteContainer>
      <TableHouses data={filteredData} loaded={loaded} />
      <Footer />
    </>
  )
}
