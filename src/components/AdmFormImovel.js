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

const Form = styled.form`
  display: flex;
  flex-flow: column;
  margin: 2em 0;

  label {
    display: flex;
    flex-flow: column;
    margin-bottom: 1em;
    color: #828282;
    min-width: 0;
  }
`

const Fieldset = styled.fieldset`
  min-width: 0;
  border: none;
  margin: 0;

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
  transition: all 0.2s ease;

  :focus {
    outline: none;
  }
`

const Button = styled.button`
  display: block;
  padding: 0.5em;
  background-color: #219653;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: inherit;
  cursor: pointer;
`

export default function AdmFormImovel() {
  const defaultValues = {}
  const { currentUser } = useContext(AuthContext)

  const { register, handleSubmit, errors } = useForm({ defaultValues })

  const onSubmit = (data) => {
    console.log({ data })

    console.log({ currentUser })

    const fakeCod = Math.floor(Math.random() * (999 - 1 + 1)) + 1
    console.log({ fakeCod })

    // simplify the use
    const {
      titulo,
      inscricaoMunicipal,
      dormitorios,
      banheiros,
      vagas,
      area,
      aluguel,
      proprietario,
      proprietarioTel,
      proprietarioEmail,
      anotacoes,
    } = data

    const databaseSchema = {
      cod: fakeCod,
      titulo,
      inscricaoMunicipal,
      detalhes: {
        dormitorios,
        banheiros,
        vagas,
        area,
      },
      custos: { aluguel },
    }

    const databasePrivateSchema = {
      cod: fakeCod,
      proprietario: {
        proprietario,
        proprietarioTel,
        proprietarioEmail,
      },
      anotacoes,
    }

    console.log({ databaseSchema })

    // request firestore
    submitImovel(databaseSchema)
    submitImovelPrivate(databasePrivateSchema)
  }

  console.log({ errors })

  return (
    <SiteContainer style={{ maxWidth: 800 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Título
          <InputStyled
            type="text"
            name="titulo"
            ref={register({ required: true })}
            error={errors.titulo}
          />
        </label>

        <label>
          Inscrição Municipal
          <InputStyled
            type="text"
            name="inscricaoMunicipal"
            ref={register({ required: true })}
            error={errors.inscricaoMunicipal}
          />
        </label>

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
            Área (m²)
            <InputStyled
              type="text"
              name="area"
              ref={register({ required: true })}
              error={errors.area}
            />
          </label>
        </Fieldset>

        <label>
          Aluguel
          <InputStyled
            type="number"
            step=".01"
            name="aluguel"
            ref={register({ required: true })}
            error={errors.aluguel}
          />
        </label>

        <hr style={{ width: '100%' }} />

        <label>
          Proprietário
          <InputStyled
            type="text"
            name="proprietario"
            ref={register({ required: true })}
            error={errors.proprietario}
          />
        </label>

        <label>
          Telefone Proprietário
          <InputStyled
            type="tel"
            name="proprietarioTel"
            ref={register({ required: true })}
            error={errors.proprietarioTel}
          />
        </label>
        <label>
          Email Proprietário
          <InputStyled
            type="email"
            name="proprietarioEmail"
            ref={register({ required: true })}
            error={errors.proprietarioEmail}
          />
        </label>
        <label>
          Anotações
          <InputStyled
            type="textarea"
            name="anotacoes"
            ref={register({ required: true })}
            error={errors.anotacoes}
          />
        </label>

        <Button type="submit">Salvar</Button>
      </Form>
    </SiteContainer>
  )
}
