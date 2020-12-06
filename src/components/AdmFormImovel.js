import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { submitImovel, submitImovelPrivate } from '../services/firestore'

import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import SiteContainer from './common/SiteContainer'
import Input from './common/Input'

/*
contador para o cod do imóvel:
- ter um doc no firestore pra manter a contagem (mesma coleção)
- antes de submeter o form:
  - batch: ler a contagem, aumentar 1
- adicionar a contagem no objeto do form
- submeter
(se possível fazer tudo isso num batch só, mas acho q não é possível não — só com algum cloud function, mas n tem necessidade)
https://fireship.io/snippets/firestore-increment-tips/
outra alternativa: https://firebase.google.com/docs/firestore/extend-with-functions
*/

/*




TODO

- adicionar demais campos
- layoutar
- adicionar validação de autenticação
- suporte para upload de imagem

em algum momento melhorar o código



*/

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: 2em 0;

  label {
    display: flex;
    flex-flow: column;
    margin-bottom: 1em;
    color: #828282;
    min-width: 0;
  }

  hr {
    margin-bottom: 1em;
    border: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .price {
    position: relative;

    input {
      padding-left: 2em;
    }

    ::before {
      content: 'R$ ';
      position: absolute;
      bottom: calc(0.5em + 2px);
      left: 0.75em;
      width: 0;
    }
  }
`

const Fieldset = styled.div`
  display: grid;
  grid-template-columns: ${({ inputCount }) => `repeat(${inputCount}, 1fr)`};
  grid-gap: 1em;
  padding: 0;
  max-width: 100%;
`

const InputStyled = styled.input`
  width: unset;
  max-width: auto;
  margin-top: 0.25em;
  font-size: inherit;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 0.5em 0.75em;
  color: #828282;
  border: ${(props) =>
    props.error ? '1px solid #eb5757' : '1px solid #e0e0e0'};
  box-shadow: ${(props) =>
    props.error ? 'inset 0 0 0 1px #eb5757' : 'inset 0 0 0 0 transparent'};
  transition: box-shadow 0.2s ease, border 0.2s ease;

  :focus {
    outline: none;
  }

  &.textarea {
    resize: vertical;
  }
`

const Button = styled.button`
  position: absolute;
  top: -4em;
  right: 0;

  display: block;
  padding: 0.5em 0.75em;
  background-color: #219653;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: inherit;
  cursor: pointer;
`

const LeftCol = styled.div`
  width: 60%;
`

const RigthCol = styled.div`
  width: 40%;
  padding-left: 2rem;
`

export default function AdmFormImovel() {
  const defaultValues = {
    cod: '0000',
    titulo: 'titulo default',
    inscricaoMunicipal: '0004.5.2.455.255',

    dormitorios: 5,
    banheiros: 3,
    vagas: 0,
    area: 454,

    aluguel: 1400.5,
    status: 'reservado',

    cep: '88000-100',
    estado: 'Santa Catarina',
    cidade: 'Florianópolis',
    bairro: 'Centro',
    rua: 'Rua Fulano de Tal',
    tipo: 'casa',
    numero: '01',
    complemento: '402',

    descricao:
      'descrição do imóvel aidosjaoiwjaiosdfji oaejsfio asjdfio ajsfio jasoidfh aisufh iuasdfhj iuashf iuasjdfiu ahsfiuashdfiu ahsfiu ajsdfiu ajweifu hasdfiu hasg hasdfiu jasgiu jhasdfio hasegio hasdiofj asih iaospdfh aioseh iaosdfh aisoeth iuasdfj aisueth aisudfhasu eikfn aslkdjfn alskjnsalkdfh asieofh asgh pasdfih aphsfipuv ihyahsudkf nasiruog nasuich napriusg bnsaupicn parytbn asuinc uaipsrh uasgh uapsfh puiashrg ipuashf iuasf',
  }

  // TODO vinicius
  // function fileUpload() {}

  const { currentUser } = useContext(AuthContext)

  const { register, handleSubmit, errors } = useForm({ defaultValues })

  const onSubmit = (data) => {
    console.log({ data })

    const fakeCod = Math.floor(Math.random() * (999 - 1 + 1)) + 1
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

      // TODO vinicius
      // talvez não tenha nada aqui nesta desestruturação
      // imagens urls, // precisa pegar a resposta do upload do cloud storage, algo assim
    } = data

    const databaseSchema = {
      status,
      titulo,
      // cod vai pela request por enquanto
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
      // TODO vinicius
      // imagens: [imagens urls],
    }

    const snippetDatabaseSchema = {
      status,
      titulo,
      // cod vai pela request por enquanto
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
      // TODO vinicius
      // imagem: "1º url aqui",
    }

    console.log({ databaseSchema })
    console.log({ snippetDatabaseSchema })

    // send data to firestore
    submitImovel(databaseSchema, snippetDatabaseSchema, fakeCod)
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
                <option value="disponivel">Disponível</option>
                <option value="reservado">Reservado</option>
                <option value="alugado">Alugado</option>
                <option value="indisponivel">Indisponível</option>
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

          <Button type="submit">Salvar</Button>
        </LeftCol>

        <RigthCol>
          <label>
            <span>
              Imagens <small style={{ color: 'lightcoral' }}>implementar</small>
            </span>
            <InputStyled
              rows="6"
              type="file"
              name="imagens"
              multiple
              ref={register()}
              error={errors.imagens}
              // TODO vinicius
              // onChange={fileUpload}
            />
          </label>
        </RigthCol>
      </Form>
    </SiteContainer>
  )
}
