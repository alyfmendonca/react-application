import React from 'react';
import cep from 'cep-promise';
import { TextField, Grid, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { phoneMask, cepMask } from '../../utils/masks';
import { ModalForm, ButtonWrapper } from './style';

const EditEnterpriseForm = ({ user, onSubmit }) => {
    const { register, errors, handleSubmit, setError, clearError, setValue } = useForm()

    const getPostalData = (e) => {
        const value = e.target.value;
        if (value.length < 9) return;

        cep(value)
            .then((data) => {
                setValue([
                    { city: data.city },
                    { neighborhood: data.neighborhood },
                    { address: data.street },
                ])
                clearError('cep')
            }).catch((err) => {
                console.log(err);
                setError('cep', 'notMatch', 'CEP não encontrado')
            });
    };

    const userTypeIsEnterprise = user.type === "enterprise";
    return (
        <ModalForm onSubmit={handleSubmit(onSubmit)}>
            {userTypeIsEnterprise ? (
                <>
                    <TextField
                        name="enterprise_name"
                        label="Razão Social"
                        defaultValue={user.enterprise_name}
                        error={errors.enterprise_name && errors.email.enterprise_name}
                        helperText={errors.enterprise_name && errors.email.enterprise_name}
                        inputRef={register({
                            required: 'Este campo é obrigatório',
                        })}
                        variant="filled"
                        color="secondary"
                        fullWidth
                        className="form-field"
                    />
                    <TextField
                        name="enterprise_fancy"
                        label="Nome Fantasia"
                        defaultValue={user.enterprise_fancy}
                        error={errors.enterprise_fancy && errors.enterprise_fancy.message}
                        helperText={errors.enterprise_fancy && errors.enterprise_fancy.message}
                        inputRef={register({
                            required: 'Este campo é obrigatório',
                        })}
                        variant="filled"
                        color="secondary"
                        fullWidth
                        className="form-field"
                    />
                    <TextField
                        name="enterprise_tel"
                        value={user.enterprise_tel}
                        fullWidth
                        error={errors.enterprise_tel && errors.enterprise_tel.message}
                        helperText={errors.enterprise_tel && errors.enterprise_tel.message}
                        inputRef={register({
                            required: 'Esse campo é obrigatório',
                            pattern: {
                                message: 'Insira apenas números'
                            }
                        })}
                        onInput={({ target }) => target.value = phoneMask(target.value)}
                        label="Telefone"
                        variant="filled"
                        className="form-field"
                    />
                </>
            ) : (
                    <>
                        <TextField
                            name="agency_name"
                            label="Razão Social"
                            defaultValue={user.agency_name}
                            error={errors.agency_name && errors.email.agency_name}
                            helperText={errors.agency_name && errors.email.agency_name}
                            inputRef={register({
                                required: 'Este campo é obrigatório',
                            })}
                            variant="filled"
                            color="secondary"
                            fullWidth
                            className="form-field"
                        />
                        <TextField
                            name="agency_fancy"
                            label="Nome Fantasia"
                            defaultValue={user.agency_fancy}
                            error={errors.agency_fancy && errors.agency_fancy.message}
                            helperText={errors.agency_fancy && errors.agency_fancy.message}
                            inputRef={register({
                                required: 'Este campo é obrigatório',
                            })}
                            variant="filled"
                            color="secondary"
                            fullWidth
                            className="form-field"
                        />
                        <TextField
                            name="agency_tel"
                            defaultValue={user.agency_tel}
                            fullWidth
                            error={errors.agency_tel && errors.agency_tel.message}
                            helperText={errors.agency_tel && errors.agency_tel.message}
                            inputRef={register({
                                required: 'Esse campo é obrigatório',
                                pattern: {
                                    message: 'Insira apenas números'
                                }
                            })}
                            onInput={({ target }) => target.value = phoneMask(target.value)}
                            label="Telefone"
                            variant="filled"
                            className="form-field"
                        />
                    </>
                )}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="cep"
                        defaultValue={user.cep}
                        fullWidth
                        error={errors.cep && errors.cep.message}
                        helperText={errors.cep && errors.cep.message}
                        inputRef={register({
                            required: 'Esse campo é obrigatório',
                            pattern: {
                                message: 'Insira apenas números'
                            }
                        })}
                        onInput={({ target }) => target.value = cepMask(target.value)}
                        onBlur={getPostalData}
                        label="CEP"
                        variant="filled"
                        className="form-field"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="city"
                        value={user.city}
                        defaultValue={user.city}
                        fullWidth
                        error={errors.city && errors.city.message}
                        helperText={errors.city && errors.city.message}
                        inputRef={register({
                            required: 'Esse campo é obrigatório',
                        })}
                        InputLabelProps={{
                            shrink: user.city
                        }}
                        onBlur={getPostalData}
                        label="Cidade"
                        variant="filled"
                        className="form-field"
                    />
                </Grid>
            </Grid>
            <TextField
                defaultValue={user.address}
                name="address"
                fullWidth
                error={errors.address && errors.address.message}
                helperText={errors.address && errors.address.message}
                inputRef={register({
                    required: 'Esse campo é obrigatório'
                })}
                InputLabelProps={{
                    shrink: user.address
                }}
                label="Endereço"
                variant="filled"
                placeholder="Insira o bairro que a da empresa reside"
                className="form-field"
            />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        defaultValue={user.neighborhood}
                        name="neighborhood"
                        fullWidth
                        error={errors.city && errors.city.message}
                        helperText={errors.city && errors.city.message}
                        inputRef={register({
                            required: 'Esse campo é obrigatório'
                        })}
                        InputLabelProps={{
                            shrink: user.neighborhood
                        }}
                        label="Bairro"
                        variant="filled"
                        placeholder="Insira o bairro que a da empresa reside"
                        className="form-field"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        defaultValue={user.address_number}
                        name="address_number"
                        fullWidth
                        error={errors.address_number && errors.address_number.message}
                        helperText={errors.address_number && errors.address_number.message}
                        inputRef={register({
                            required: 'Esse campo é obrigatório'
                        })}
                        InputLabelProps={{
                            shrink: user.address_number
                        }}
                        type="number"
                        label="Número"
                        variant="filled"
                        placeholder="Insira o número da empresa"
                        className="form-field"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        defaultValue={user.address_complement}
                        name="address_complement"
                        fullWidth
                        error={errors.address_complement && errors.address_complement.message}
                        helperText={errors.address_complement && errors.address_complement.message}
                        inputRef={register({
                            required: 'Esse campo é obrigatório'
                        })}
                        InputLabelProps={{
                            shrink: user.address_complement
                        }}
                        label="Complemento"
                        variant="filled"
                        placeholder="Insira o complemento"
                        className="form-field"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="observation"
                        className="form-field"
                        label="Observação"
                        multiline
                        rows="5"
                        defaultValue={user.observation}
                        error={errors.observation && errors.observation.message}
                        fullWidth
                        variant="filled"
                        inputRef={register({
                            required: 'Esse campo é obrigatório'
                        })}
                        style={{
                            marginBottom: 20
                        }}
                    />
                </Grid>
            </Grid>
            <ButtonWrapper>
                <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    styles={{ display: 'block', width: '100%' }}
                >
                    Editar
                </Button>
            </ButtonWrapper>
        </ModalForm>
    )
};

export default EditEnterpriseForm;