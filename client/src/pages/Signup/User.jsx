import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '../../components/Button'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Error } from '../../components/Status'

import { emailValidation } from '../../utils/service'


import { Form, Section } from './styles'
import { phoneMask } from '../../utils/masks'

const Users = () => {
  const { register, handleSubmit, errors, getValues, reset } = useForm()

  const registerUser = useStoreActions(actions => actions.register.registerUser)
  const [modalStatus, setModalStatus] = useState(false)
  const registerError = useStoreState(state => state.register.error)
  //  const labelName = localStorage.user_type === 'enterprise' ? 'Nome do Responsável' : 'Nome'
  const onSubmit = (data) => {
    const formatted = {
      ...data,
      confirm_password: data.confirmPassword,
      self_declaration: data.selfDeclaration,
      type: localStorage.user_type
    }

    reset()
    setModalStatus(true)
    setTimeout(() => {
      registerUser(formatted)
    }, 3000)
  }

  const userType = localStorage.user_type === 'enterprise' ? 'Empresa' : 'Agência';

  useEffect(() => {
    if (typeof localStorage.user_type === 'undefined') return setModalStatus(true)
  }, []);

  return (
    <Section className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          color="primary"
          variant="h4"
          style={{ textAlign: 'center', margin: '10px 0', color: '#003065' }}
          component="h4">Formulário de Inscrição</Typography>
        <Typography
          color="primary"
          variant="h6"
          style={{ textAlign: 'center', margin: '10px 0', color: '#800000' }}
          component="h5">Ficha com os dados da pessoa representante pela inscrição
        </Typography>


        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              fullWidth
              error={errors.email && errors.email.message}
              helperText={errors.email && errors.email.message}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  value: emailValidation(),
                  message: 'Insira um endereço de e-mail válido'
                }
              })}
              label="Endereço de e-mail"
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="password"
              fullWidth
              type="password"
              error={errors.password && errors.password.message}
              helperText={errors.password && errors.password.message}
              inputRef={register({
                required: 'Insira uma senha',
              })}
              label="Senha"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="confirmPassword"
              fullWidth
              type="password"
              error={errors.confirmPassword && errors.confirmPassword.message}
              helperText={errors.confirmPassword && errors.confirmPassword.message}
              inputRef={register({
                required: 'Confirme sua senha',
                validate: {
                  isMatch: value => value === getValues().password || 'As senhas não combinam, tente novamente',
                },
                minLength: {
                  value: 6,
                  message: 'A senha precisa ter no mínimo 6 caracteres'
                }
              })}
              label="Confirme sua senha"
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              fullWidth
              error={errors.name && errors.name.message}
              helperText={errors.name && errors.name.message}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                maxLength: {
                  value: 60,
                }
              })}
              label="Nome completo do responsável"
              variant="filled"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="phone"
              fullWidth
              error={errors.phone && errors.phone.message}
              helperText={errors.phone && errors.phone.message}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  message: 'Insira apenas números'
                }
              })}
              onInput={({ target }) => target.value = phoneMask(target.value)}
              label="Contato Telefônico (DDD + nº)"
              variant="filled"
            />
          </Grid>
        </Grid>


        <Error msg={registerError && registerError.user} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              styles={{ display: 'block', width: '100%' }}
            >
              Enviar
              </Button>
          </Grid>
        </Grid>

      </Form>

      <Snackbar open={modalStatus} autoHideDuration={6000} onClose={() => setModalStatus(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setModalStatus(false)} severity="success">
          Usuário cadastrado com sucesso! Agora acesse sua conta e saiba os próximos passos!
          </Alert>
      </Snackbar>
    </Section>
  )
}

export default Users