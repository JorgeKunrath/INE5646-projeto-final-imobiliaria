import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { submitImovel } from '../services/firestore'

import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

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

export default function AdmFormExample({ dbData }) {
  const { currentUser } = useContext(AuthContext)

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
