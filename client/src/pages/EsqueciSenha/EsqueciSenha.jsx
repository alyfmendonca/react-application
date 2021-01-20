import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStoreActions } from 'easy-peasy'
import Email from '@material-ui/icons/Mail'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Button from './../../components/material/Button'
import Title from './../../components/material/Title'


import {
  FormStyled
} from './style';

import { emailValidation } from '../../utils/service'
import history from '../../history'

const EsqueciSenha = () => {
  const { register, handleSubmit, errors } = useForm()
  const [modalState, setModalState] = useState({ active: false, severity: null })
  const [modalMsg, setModalMsg] = useState('')
  const forgotPassword = useStoreActions(actions => actions.user.forgotPassword)

  const onSubmit = async (data) => {
    forgotPassword(data)
      .then(({ data }) => {
          setModalMsg(data.message)
          setModalState({
            active: true,
            severity: 'success'
          })
          return true;
      }).catch((err) => {
        const hasErrors = err.errors && err.errors.message;
        setModalMsg(hasErrors || "Ocorreu um erro ao enviar o e-mail de recuperação, tente novamente")
        setModalState({
          active: true,
          severity: 'error'
        })
      })
  }

  return (
    <Container
      center
      style={{
        height: 'calc(100vh - 107px)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Grid container alignItems="stretch" justify="center">
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <Title style={{ textAlign: 'center', fontSize: 20 }}>
            Insira seu email para recuperar a senha
          </Title>
          <FormControl fullWidth style={{ margin: '10px 0' }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">E-mail</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type="text"
              name="email"
              error={errors.email}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                pattern: {
                  value: emailValidation(),
                  message: 'Insira um endereço de e-mail válido'
                }
              })}
              endAdornment={
                <InputAdornment position="end">
                  <Email color="primary" />
                </InputAdornment>
              }
            />
            {errors.email && (<FormHelperText error>{errors.email.message}</FormHelperText>)}
          </FormControl>


          <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>
            Recuperar
          </Button>
        </FormStyled>
      </Grid>
      <Snackbar open={modalState.active} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} onClose={() => {
        setModalState({ active: false })
        return history.push('/')
      }}>
        <Alert elevation={6} variant="filled" onClose={() => setModalState({
          active: false
        })} severity={modalState.severity}>
          {modalMsg}
        </Alert>
      </Snackbar>
    </Container>
  )
}


export default EsqueciSenha