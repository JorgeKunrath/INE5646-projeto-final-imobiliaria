import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getImovel } from '../../services/firestore'
import HeaderAdmin from '../../components/common/HeaderAdmin'
import Footer from '../../components/common/Footer'
// import AdmFormExample from '../../components/AdmFormExample'
import AdmFormImovel from '../../components/admin/form/AdmFormImovel'
import SiteContainer from '../../components/common/SiteContainer'

export default function AdmImovel() {
  const [data, setData] = React.useState()
  const [defaultData, setDefaultData] = React.useState()

  const location = useLocation()
  const isNew = location.pathname.includes('novo')
  const currentCod = +location.pathname.replace('/admin/imovel/cod-', '')

  // make the request if is edit mode
  React.useEffect(() => {
    if (isNew) {
      setData(false)
    } else if (!isNaN(currentCod)) {
      async function getData() {
        const data = await getImovel(currentCod)
        setData(data)
      }
      getData()
    } else {
      console.log('something is wrong with your path')
    }
  }, [])

  // define form schema to be populated
  React.useEffect(() => {
    console.log({ data })
    if (data) {
      const {
        cod,
        status,
        titulo,
        inscricaoMunicipal,
        detalhes: { dormitorios, banheiros, vagas, area },
        aluguel,
        endereco: {
          cep,
          estado,
          cidade,
          bairro,
          rua,
          tipo,
          numero,
          complemento,
        },
        descricao,
      } = data

      const formSchema = {
        cod,
        titulo,
        inscricaoMunicipal,

        dormitorios,
        banheiros,
        vagas,
        area,

        aluguel,
        status,

        cep,
        estado,
        cidade,
        bairro,
        rua,
        tipo,
        numero,
        complemento,

        descricao,
      }
      setDefaultData(formSchema)
    }
  }, [data])

  return (
    <>
      <HeaderAdmin />

      <SiteContainer>
        <p>
          <small>
            <Link
              to="/admin"
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              ← Voltar
            </Link>
          </small>
        </p>
        <h1>{isNew ? 'Novo Imóvel' : 'Editar Imóvel'}</h1>
        {!isNew && defaultData?.cod && <p>Cód. {defaultData?.cod}</p>}
      </SiteContainer>

      <main>
        {data && !isNew && defaultData && (
          <AdmFormImovel isNew={isNew} defaultValues={defaultData} />
        )}
        {isNew && <AdmFormImovel isNew={isNew} defaultValues={false} />}
      </main>

      <Footer />
    </>
  )
}
