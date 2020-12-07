import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { uploadOneImageToCloudStorageAndSetUrl } from '../../../services/firestore'
import { submitImovel } from '../../../services/firestore'

// import { useContext } from 'react'
// import { AuthContext } from './AuthProvider'
import SiteContainer from '../../common/SiteContainer'

import {
  Form,
  Fieldset,
  InputStyled,
  Button,
  LeftCol,
  RigthCol,
  ImagesUploaded,
} from './AdmFormImovel_styles'

/*
contador para o cod do imóvel:
- ter um doc no firestore pra manter a contagem (mesma coleção)
- antes de submeter o form:
  - batch: ler a contagem; aumentar 1.
- adicionar a contagem no objeto da nova entrada
- submeter
(se possível fazer tudo isso num batch só, mas acho q não é possível não — só com algum cloud function, mas n tem necessidade)
https://fireship.io/snippets/firestore-increment-tips/
outra alternativa: https://firebase.google.com/docs/firestore/extend-with-functions
*/

/*




TODO

- adicionar demais campos --PRATICAMENTE OK
- layoutar --OK
- adicionar validação de autenticação --OK?
- suporte para upload de imagem -- todo upload sendo feito, agora tem que ver como fazer pra fazer com que ela seja atrelada ao imovel --OK
- TODO implantar modo de edição (ajustar request, inserir data real no load, etc)

em algum momento melhorar o código --QUE MOMENTO EIN???



*/

export default function AdmFormImovel() {
  const defaultValues = {
    cod: '0000',
    titulo: 'Casa com 2 quartos aconchegante',
    inscricaoMunicipal: '0004.5.2.455.255',

    dormitorios: 2,
    banheiros: 1,
    vagas: 0,
    area: 140,

    aluguel: 1400.5,
    status: 'disponível',

    cep: '88000-100',
    estado: 'Santa Catarina',
    cidade: 'Florianópolis',
    bairro: 'Centro',
    rua: 'Rua Fulano de Tal',
    tipo: 'casa',
    numero: '01',
    complemento: '402',

    descricao:
      'descrição do imóvel aidosjaoiwjaiosdfji oaejsfio asjdfio ajsfio jasoidfh aisufh iuasdfhj iuashf iuasjdfiu\n\nNOVALINHAAQUI ahsfiuashdfiu ahsfiu ajsdfiu ajweifu hasdfiu hasg hasdfiu jasgiu jhasdfio hasegio hasdiofj asih iaospdfh aioseh iaosdfh aisoeth iuasdfj **BOLD?** eikfn aslkdjfn alskjnsalkdfh asieofh asgh pasdfih aphsfipuv ihyahsudkf nasiruog nasuich napriusg bnsaupicn parytbn asuinc uaipsrh uasgh uapsfh puiashrg ipuashf iuasf',
  }

  // --------------------
  // GLOBAL
  // --------------------
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    console.log({ loading })
  }, [loading])

  // --------------------
  // GET IMAGE
  // --------------------
  // baseado no video https://www.google.com/search?q=upload+image+firebase+react&rlz=1C5CHFA_enBR887BR888&oq=upload+image+firebase+&aqs=chrome.2.69i57j0i457j0j0i20i263j0l5.4036j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_7Q3NX7qIEvWy5OUPkeC52A88

  // imagens selecionadas no navegador
  const [images, setImages] = useState([])

  // url da imagem (resposta cloud)
  const [url, setUrl] = useState()

  // array de urls de imagens (manipulado)
  const [urls, setUrls] = useState([])

  // pega a imagem que foi selecionada do computador e da um setImages
  const handleImageChange = (e) => {
    if (e?.target?.files?.length > 0) {
      setImages(e.target.files)
    }
  }

  // quando mudar a seleção de imagens
  React.useEffect(() => {
    setLoading(true)

    // limpa o que já tinha sido selecionado
    setUrl(null)
    setUrls([])

    // faz requests para cada imagem em separado
    if (images.length > 0) {
      const arrayFiles = Array.from(images)
      arrayFiles.forEach((image) => {
        // console.log('Imagem que vai ser feito upload', image)
        uploadOneImageToCloudStorageAndSetUrl(image, setUrl)
      })
    }
  }, [images])

  // pega cada URL em específico e agrupa num array (enviado para o db)
  React.useEffect(() => {
    if (url) {
      console.log({ url })
      setUrls(() => [...urls, url])
    }
    setLoading(false)
  }, [url])

  // --------------------
  // FORM
  // --------------------
  const { register, handleSubmit, errors } = useForm({ defaultValues })

  const onSubmit = (data) => {
    setLoading(true)

    console.log({ data })

    const fakeCod = Math.floor(Math.random() * (9999 - 1 + 1)) + 1
    console.log({ fakeCod })

    // simplify the use
    const {
      titulo,
      inscricaoMunicipal,
      status,

      dormitorios,
      banheiros,
      vagas,
      area,

      aluguel,

      cep,
      estado,
      cidade,
      bairro,
      rua,
      tipo,
      numero,
      complemento,

      descricao,
    } = data

    const databaseSchema = {
      // cod vai pela request por enquanto
      status,
      titulo,
      inscricaoMunicipal,
      detalhes: {
        dormitorios,
        banheiros,
        vagas,
        area,
      },
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

      imagens: [...urls],
    }

    const snippetDatabaseSchema = {
      // cod vai pela request por enquanto
      status,
      titulo,
      detalhes: {
        dormitorios,
        banheiros,
        vagas,
        area,
      },
      aluguel,
      endereco: {
        cidade,
        bairro,
        tipo,
      },

      imagem: urls[0],
    }

    console.log({ databaseSchema })
    console.log({ snippetDatabaseSchema })

    // send data to firestore
    submitImovel(databaseSchema, snippetDatabaseSchema, fakeCod, setLoading)
  }

  console.log({ errors })

  return (
    <SiteContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LeftCol>
          <label>
            Título
            <InputStyled
              type="text"
              name="titulo"
              ref={register({ required: true })}
              error={errors.titulo}
            />
          </label>

          <Fieldset inputCount={2}>
            <label>
              Inscrição Municipal
              <InputStyled
                type="text"
                name="inscricaoMunicipal"
                ref={register({ required: true })}
                error={errors.inscricaoMunicipal}
              />
            </label>

            <label>
              Status
              <InputStyled
                as="select"
                name="status"
                ref={register({ required: true })}
                error={errors.status}
              >
                <option value="disponível">Disponível</option>
                <option value="reservado">Reservado</option>
                <option value="alugado">Alugado</option>
                <option value="indisponível">Indisponível</option>
              </InputStyled>
            </label>
          </Fieldset>

          <Fieldset inputCount={4}>
            <label>
              Dormitórios
              <InputStyled
                type="number"
                name="dormitorios"
                ref={register({ required: true })}
                error={errors.dormitorios}
              />
            </label>
            <label>
              Banheiros
              <InputStyled
                type="number"
                name="banheiros"
                ref={register({ required: true })}
                error={errors.banheiros}
              />
            </label>
            <label>
              Vagas
              <InputStyled
                type="number"
                name="vagas"
                ref={register({ required: true })}
                error={errors.vagas}
              />
            </label>
            <label>
              <span>
                Área <small>m²</small>
              </span>
              <InputStyled
                type="number"
                name="area"
                ref={register({ required: true })}
                error={errors.area}
              />
            </label>
          </Fieldset>

          <Fieldset inputCount={2}>
            <label className="price">
              Aluguel
              <InputStyled
                type="number"
                step=".01"
                name="aluguel"
                ref={register({ required: true })}
                error={errors.aluguel}
              />
            </label>
          </Fieldset>

          <hr style={{ width: '100%' }} />

          <Fieldset inputCount={3}>
            <label>
              <span>
                CEP
                <small style={{ color: 'lightcoral' }}>
                  {' '}
                  implementar busca cep
                </small>
              </span>
              <InputStyled
                type="string"
                name="cep"
                ref={register({ required: true })}
                error={errors.cep}
              />
            </label>
          </Fieldset>

          <Fieldset inputCount={3}>
            <label>
              Estado
              <InputStyled
                type="text"
                name="estado"
                ref={register({ required: true })}
                error={errors.estado}
              />
            </label>
            <label>
              Cidade
              <InputStyled
                type="text"
                name="cidade"
                ref={register({ required: true })}
                error={errors.cidade}
              />
            </label>
            <label>
              Bairro
              <InputStyled
                type="text"
                name="bairro"
                ref={register({ required: true })}
                error={errors.bairro}
              />
            </label>
          </Fieldset>

          <label>
            Rua
            <InputStyled
              type="text"
              name="rua"
              ref={register({ required: true })}
              error={errors.rua}
            />
          </label>

          <Fieldset inputCount={3}>
            <label>
              Tipo
              <InputStyled
                as="select"
                name="tipo"
                ref={register({ required: true })}
                error={errors.tipo}
              >
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
              </InputStyled>
            </label>
            <label>
              Número
              <InputStyled
                type="text"
                name="numero"
                ref={register({ required: true })}
                error={errors.numero}
              />
            </label>
            <label>
              Complemento
              <InputStyled
                type="text"
                name="complemento"
                ref={register({ required: true })}
                error={errors.complemento}
              />
            </label>
          </Fieldset>

          <hr style={{ width: '100%' }} />

          <label>
            Descrição
            <InputStyled
              as="textarea"
              rows="12"
              cols="99999999"
              wrap="hard"
              className="textarea"
              name="descricao"
              ref={register({ required: true })}
              error={errors.descricao}
            />
          </label>
        </LeftCol>

        <RigthCol>
          <label>
            <span>
              Imagens{' '}
              <small style={{ color: 'turquoise' }}>da de melhorar</small>
            </span>
            <InputStyled
              type="file"
              name="imagens"
              multiple
              ref={register({ required: true })}
              error={errors.imagens}
              onChange={handleImageChange}
            />
          </label>
          {urls?.length > 0 && (
            <ImagesUploaded>
              {urls.map((url, i) => (
                <img key={`${url}-${i}`} src={url} />
              ))}
            </ImagesUploaded>
          )}
        </RigthCol>

        <Button type="submit" loading={loading ? 'true' : 'false'}>
          {loading ? 'Carregando' : 'Salvar'}
        </Button>
      </Form>
    </SiteContainer>
  )
}
