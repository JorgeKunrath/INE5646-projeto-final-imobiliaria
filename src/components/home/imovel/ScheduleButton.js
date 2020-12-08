import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { submitSchedule } from '../../../services/firestore'

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-top: 1rem;

  label {
    display: flex;
    flex-flow: column;
    margin-bottom: 0.5rem;
    color: var(--gray3);
    min-width: 0;
    width: 100%;
  }
`

const InputStyled = styled.input`
  width: unset;
  max-width: auto;
  margin-top: 0.25em;
  font-size: inherit;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 0.5em 0.75em;
  color: var(--gray3);
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
  box-sizing: inherit;
  font: inherit;
  color: white;
  text-align: center;

  display: block;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.5rem 1rem;

  background-color: var(--blue);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`

/*
TODO formulário pode ser melhorado:

  -----
  - após enviado uma vez salva os dados no LS e esconde os inputs
  - adiciona abaixo do botão o nome da pessoa
  - e mais abaixo um "trocar usuário"~algo assim q apaga os dados do LS
  - zerar o LS faz com q apareça o formulário novamente
  - enquanto isso o form continua como tá, não precisa sumir, só tira da UI mesmo
  - ele continua recebendo os dados do LS, e se por algum motivo dar ruim com a validação (q nem tem praticamente) aí dá display (if errors)

  -----
  - botão de "marcar visita" pode mudar ou avisar a pessoa q deu certo

  -----
  - banco de dados pode ter algum lance pra checar o tempo de envio das requisições e bloquear

*/

export default function ScheduleButton({ userUidRef, cod }) {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (formData) => {
    const { nome, email, telefone } = formData

    const dbSchema = {
      nome,
      email,
      telefone,

      userUidRef, // usuário que criou o imóvel
      codRef: cod,
      status: 'aberto',
    }

    console.log({ dbSchema })

    submitSchedule(dbSchema)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <InputStyled
            type="text"
            name="nome"
            title="Nome"
            placeholder="Nome"
            ref={register({ required: true })}
            error={errors.nome}
          />
        </label>
        <label>
          <InputStyled
            type="email"
            name="email"
            title="Email"
            placeholder="Email"
            ref={register({ required: true })}
            error={errors.email}
          />
        </label>
        <label>
          <InputStyled
            type="tel"
            name="telefone"
            title="Telefone"
            placeholder="Telefone"
            ref={register({ required: true })}
            error={errors.telefone}
          />
        </label>
        <Button type="submit">Agendar Visita</Button>
      </Form>
    </>
  )
}
