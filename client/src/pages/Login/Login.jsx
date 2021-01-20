import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import styled from 'styled-components'

import Email from '@material-ui/icons/Mail'
import Senha from '@material-ui/icons/Lock'
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
import SignupPopup from '../../components/popups/Signup'
import Title from './../../components/material/Title'
import Modal from './../../components/material/Modal'
import { emailValidation } from '../../utils/service'
import history from '../../history'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  signUpButton: {
    backgroundColor: theme.palette.text.primary,
    marginTop: 20,
    color: theme.palette.primary.main
  }
}));

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const [modalStatus, setModalStatus] = useState(false)
  const [modalErrorStatus, setModalErrorStatus] = useState(false)
  const [modalErrorMsg, setModalErrorMsg] = useState('')
  const authUser = useStoreActions(actions => actions.auth.authUser)
  const auth = useStoreState(state => state.auth.auth)
  const loginError = useStoreState(state => state.auth.error)
  const onSubmit = (data) => authUser(data)

  useEffect(() => {
    if (auth) {
      const { user: { type = '' }, isAuthenticated } = auth
      const formatedType = type === "enterprise" ? "empresa" : "agencia"
      if (isAuthenticated) return history.push(`/dashboard/${formatedType}`)
    }

    if (loginError && loginError.message) {
      setModalErrorMsg(loginError.message)
      setModalErrorStatus(true)
    }
  }, [auth, loginError])

  const classes = useStyles();
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
          <Title style={{ textAlign: 'center' }}>
            Acessar
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

          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Senha</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type="password"
              name="password"
              error={errors.password}
              inputRef={register({
                required: 'Esse campo é obrigatório',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres'
                }
              })}
              endAdornment={
                <InputAdornment position="end">
                  <Senha color="primary" />
                </InputAdornment>
              }
            />
            {errors.password && (<FormHelperText error>{errors.password.message}</FormHelperText>)}
          </FormControl>
          <ButtonsWrapper>
            <Link to="/esqueci-senha">
              <Button>
                Esqueceu sua senha?
            </Button>
            </Link>

            <Button variant="contained" type="submit" style={{ marginTop: '10px' }}>
              Entrar
            </Button>
          </ButtonsWrapper>
          {/* <Button variant="contained" color="primary" fullWidth className={classes.signUpButton} onClick={() => setModalStatus(!modalStatus)}>
            Não possui uma conta? Clique aqui.
          </Button> */}
        </FormStyled>
      </Grid>
      <Modal
        title="Cadastre-se"
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
      >
        <SignupPopup
          toggleModalStatus={() => setModalStatus(!modalStatus)}
        />
      </Modal>
      <Snackbar open={modalErrorStatus} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={() => setModalErrorStatus(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setModalErrorStatus(false)} severity="error">
          {modalErrorMsg}
        </Alert>
      </Snackbar>
    </Container>
  )
}

const FormStyled = styled.form`
width: 50%;
@media(max-width:650px){
  width: 100%;
}
`

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  button {
    span {
      color: black;
    }
  }
`;

export default Login