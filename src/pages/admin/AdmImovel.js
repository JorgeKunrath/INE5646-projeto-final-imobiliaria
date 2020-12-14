import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getImovel } from '../../services/firestore'
// import AdmFormExample from '../../components/AdmFormExample'
import AdmFormImovel from '../../components/admin/form/AdmFormImovel'
import SiteContainer from '../../components/common/SiteContainer'

export default function AdmImovel() {
  const [data, setData] = useState()
  const [defaultData, setDefaultData] = useState()
  const [defaultImages, setDefaultImages] = useState()

  const location = useLocation()
  const [isNew, setIsNew] = useState(location.pathname.includes('novo'))
  const [currentCod, setCurrentCod] = useState(
    +location.pathname.replace('/admin/imovel/cod-', '')
  )

  // make the request if is edit mode
  useEffect(() => {
    if (isNew) {
      setData(false)
    } else if (!isNaN(currentCod)) {
      ;(async () => {
        const data = await getImovel(currentCod)
        setData(data)
      })()
    } else {
      console.log('Algo de errado com o caminho na url')
    }
  }, [])

  // define form schema to be populated
  useEffect(() => {
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
      setDefaultImages(data.imagens)
    }
  }, [data])

  return (
    <>
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
        <h1>
          {isNew && isNaN(currentCod)
            ? 'Novo Imóvel'
            : `Editar Imóvel ${defaultData?.cod ? defaultData?.cod : ''}`}
        </h1>
      </SiteContainer>

      <main>
        {data && !isNew && defaultData && (
          <AdmFormImovel
            isNew={isNew}
            defaultValues={defaultData}
            defaultImages={defaultImages}
          />
        )}
        {isNew && (
          <AdmFormImovel
            isNew={isNew}
            defaultValues={false}
            defaultImages={false}
          />
        )}
      </main>
    </>
  )
}
