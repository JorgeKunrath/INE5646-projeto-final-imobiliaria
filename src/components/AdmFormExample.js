import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { submitImovel } from '../services/firestore'

import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

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
  max-width: 500px;
  margin: 2em auto;

  input {
    margin-top: 0.5em;
    font-size: 1rem;
  }

  p {
    margin: 0 0 0.5em;
  }
`

export default function AdmFormExample() {
  const { currentUser } = useContext(AuthContext)

  const dbData = {
    titulo: 'placeholder titulo mas n exatamente',
    inscricaoMunicipal: 'inscricao q ja veio do banco de dados',
    aluguel: 123,
    codigoProvisorio: 321,
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: dbData,
  })

  const onSubmit = (data) => {
    console.log({ data })

    console.log({ currentUser })

    const { titulo, inscricaoMunicipal, aluguel, codigoProvisorio } = data

    const databaseSchema = {
      grupoTeste: {
        titulo,
        inscricaoMunicipal,
      },
      aluguel,
      codigoProvisorio,
      user: currentUser.email,
    }

    console.log({ databaseSchema })

    // request firestore
    submitImovel(databaseSchema)
  }

  console.log({ errors })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="titulo"
        name="titulo"
        ref={register({ required: true })}
      />
      {errors.titulo && <p>Insira um título para seu imóvel</p>}

      <input
        type="text"
        placeholder="inscricaoMunicipal"
        name="inscricaoMunicipal"
        ref={register({ required: true })}
      />
      {errors.inscricaoMunicipal && <p>erro</p>}

      <input
        type="number"
        placeholder="aluguel"
        name="aluguel"
        ref={register({ required: true })}
      />
      {errors.aluguel && <p>erro</p>}

      <input
        type="number"
        placeholder="codigoProvisorio"
        name="codigoProvisorio"
        ref={register({ required: true })}
      />
      {errors.codigoProvisorio && <p>erro</p>}

      <input type="submit" />
    </Form>
  )
}
