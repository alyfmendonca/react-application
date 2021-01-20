import React, { useState } from 'react';
import Container from '@material-ui/core/Container'
import { Grid, FormControl, InputLabel, FilledInput, InputAdornment, FormHelperText, Button, Snackbar } from '@material-ui/core';
import { FormStyled } from '../EsqueciSenha/style';
import Senha from '@material-ui/icons/Lock'
import Title from '../../components/material/Title';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useStoreActions } from 'easy-peasy';
import history from '../../history';
import Alert from '@material-ui/lab/Alert';

const RedefinirAsenha = () => {
    const [modalState, setModalState] = useState({ active: false, severity: null })
    const [modalMsg, setModalMsg] = useState('')
    const { register, handleSubmit, getValues, errors } = useForm()
    const { token } = useParams()
    const resetPassword = useStoreActions(actions => actions.user.resetPassword)
    const onSubmit = async (data) => {
        const response = await resetPassword({ ...data, token });
        if (response.data && response.status === 200) {
            setModalState({
                active: true,
                severity: 'success'
            })
            setModalMsg(response.data.message)
            setTimeout(() => {
                return history.push('/')
            }, 3000);
            return;
        }
        setModalState({ active: true, severity: 'error' })
        setModalMsg(response.payload.resetPassword || 'Um erro ocorreu ao enviar o código de restauração');
        return;
    };

    if (!token) {
        return history.push('/')
    };

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
                    <Title style={{ textAlign: 'center', fontSize: 24, marginBottom: 25 }}>
                        Redefinir a senha
                    </Title>
                    <FormControl fullWidth style={{ margin: '10px 0' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-new-password">Insira sua nova senha</InputLabel>
                        <FilledInput
                            id="filled-adornment-new-password"
                            type="password"
                            name="password"
                            error={errors.password}
                            inputRef={register({
                                required: 'Este campo é obrigatório',
                                pattern: {
                                    message: 'Insira uma senha válida'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'A senha precisa ter no mínimo 6 caracteres'
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
                    <FormControl fullWidth style={{ margin: '10px 0' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-confirm-new-password">Confirme a nova senha</InputLabel>
                        <FilledInput
                            id="filled-adornment-confirm-new-password"
                            type="password"
                            name="confirmedPassword"
                            error={errors.confirmedPassword}
                            inputRef={register({
                                required: 'Este campo é obrigatório',
                                pattern: {
                                    value: value => value === getValues().password,
                                    message: 'As senhas não combinam, tente novamente'
                                }
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Senha color="primary" />
                                </InputAdornment>
                            }
                        />
                        {errors.confirmPassword && (<FormHelperText error>{errors.confirmPassword.message}</FormHelperText>)}
                    </FormControl>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Button variant="contained" type="submit" color="primary" style={{ marginTop: '10px' }}>
                            Redefinir
                        </Button>
                    </div>
                </FormStyled>
            </Grid>
            <Snackbar
                open={modalState.active}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={() => {
                    setModalState({ active: false })
                }}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={() => setModalState({
                        active: false
                    })}
                    severity={modalState.severity}
                >
                    {modalMsg}
                </Alert>
            </Snackbar>
        </Container>
    )
};

export default RedefinirAsenha;