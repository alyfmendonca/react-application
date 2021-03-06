import React, { useState, useEffect } from 'react'
import cep from 'cep-promise';
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Flexbox from '../../components/Flexbox'
import Button from '../../components/material/Button'
import { Error } from '../../components/Status'
import Switch from '../../components/material/Switch'
import Grid from '@material-ui/core/Grid'
import {
  qtd_projects
} from './dicioFields'
import { Form, Background, WrapButton, WrapObs, TitleObs, AssociateLegalText } from './styles'
import { cnpjMask, phoneMask, cepMask } from '../../utils/masks';
import { cnpj } from 'cpf-cnpj-validator';
import history from '../../history';

const Enterprise = () => {
  const { register, handleSubmit, errors, setValue, setError, getValues, clearErrors } = useForm()

  const registerEnterprise = useStoreActions(actions => actions.register.registerEnterprise)
  const registerError = useStoreState(state => state.register.error)
  const [snackbarState, setSnackbarState] = useState({ active: false, severity: null, message: null })
  const [aberjeAssociate, setAberjeAssociate] = useState(false)
  const [numCols] = useState(4)

  const getPostalData = (e) => {
    const value = e.target.value;
    if (value.length < 9) return;

    cep(value)
      .then((data) => {
        setValue("city", data.city);
        setValue("neighborhood", data.neighborhood);
        setValue("address", data.street);

        clearErrors(["cep"])
      }).catch((err) => {
        console.log({ err })
        setError('cep', {
          type: "manual",
          message: "CEP não encontrado"
        })
      });
  };

  const onSubmit = async (data) => {
    const formatted = {
      ...data,
      qtd_projects: data.qtdProjects,
      type: 'enterprise'
    }

    const response = await registerEnterprise(formatted)
    if (response.data && response.status === 200) {
      setSnackbarState({
        active: true,
        severity: 'success',
        message: 'Inscrição Realizada com sucesso! Em breve receberá um e-mail da organização',
      })
      setTimeout(() => {
        return history.push(`/dashboard/empresa`)
      }, 4000);
      return;
    }

    if (response.errors) {
      const errorMessage = Object.values(response.errors)
      setSnackbarState({
        active: true,
        severity: 'error',
        message: errorMessage,
      })
      return false;
    }
  }

  const handleCnpjValidator = ({ target }) => {
    const cnpjIsValid = cnpj.isValid(target.value);
    if (!cnpjIsValid) {
      return setError('cnpj', {
        type: "manual",
        message: "CNPJ inválido"
      });
    }
    clearErrors("cnpj")
  }

  // const handleRadio = (field, selectedOption) => setValue(field, (selectedOption.toLowerCase() === 'true'))

  useEffect(() => {
    register({ name: 'qtdProjects' });
  }, [register]);

  // TODO: req hasNoRegister p/ validar se o usuário tem algum registro como profissional ou empresa. Se sim, redireciona para o dashboard, se não, mantém na página.
  return (
    <Background>
      <Flexbox justify="center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2">Ficha de inscrição</Typography>
          <WrapObs>
            <TitleObs>Nesta página, você preencherá a ficha de inscrição. Essa ficha, oficializa a sua participação no <b>Prêmio Aberje 2020.</b></TitleObs>
            <TitleObs>Através deste preenchimento que receberá boleto bancário e recibo, esses documentos serão enviados via e-mail.</TitleObs>
            <TitleObs>Neste momento você não incluirá dados do projeto, somente na ficha de identificação, que é o próximo passo.</TitleObs>
          </WrapObs>

          <Grid item xs={numCols}>
            <Switch
              name="aberje_associate"
              label="Associado Aberje"
              register={register}
            />
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="enterprise_name"
                fullWidth
                error={errors.enterprise_name && errors.enterprise_name.message}
                helperText={errors.enterprise_name && errors.enterprise_name.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório',
                })}
                label="Razão Social"
                variant="filled"
                placeholder="Insira a razão social"

              />
            </Grid>


            <Grid item xs={6}>
              <TextField
                name="enterprise_fancy"
                fullWidth
                error={errors.enterprise_fancy && errors.enterprise_fancy.message}
                helperText={errors.enterprise_fancy && errors.enterprise_fancy.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                label="Nome Fantasia"
                variant="filled"
                placeholder="Insira o nome fantasia"

              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="cnpj"
                fullWidth
                error={errors.cnpj && errors.cnpj.message}
                helperText={errors.cnpj && errors.cnpj.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                onInput={({ target }) => target.value = cnpjMask(target.value)}
                onBlur={handleCnpjValidator}
                label="CNPJ"
                variant="filled"
                placeholder="Insira o CNPJ da empresa"

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="enterprise_tel"
                fullWidth
                error={errors.enterprise_fancy && errors.enterprise_fancy.message}
                helperText={errors.enterprise_fancy && errors.enterprise_fancy.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                onInput={({ target }) => target.value = phoneMask(target.value)}
                label="Telefone"
                variant="filled"
                placeholder="Insira o Telefone da empresa"

              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="cep"
                fullWidth
                error={errors.cep && errors.cep.message}
                helperText={errors.cep && errors.cep.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                onInput={({ target }) => target.value = cepMask(target.value)}
                onBlur={getPostalData}
                label="CEP"
                variant="filled"
                placeholder="Insira o CEP da empresa"

              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="city"
                fullWidth
                error={errors.city && errors.city.message}
                helperText={errors.city && errors.city.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório',
                })}
                InputLabelProps={{
                  shrink: Boolean(getValues().city)
                }}
                label="Cidade"
                variant="filled"
                placeholder="Insira a cidade que a da empresa reside"
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                name="neighborhood"
                fullWidth
                error={errors.city && errors.city.message}
                helperText={errors.city && errors.city.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                InputLabelProps={{
                  shrink: Boolean(getValues().neighborhood)
                }}
                label="Bairro"
                variant="filled"
                placeholder="Insira o bairro que a da empresa reside"

              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                name="address"
                fullWidth
                error={errors.address && errors.address.message}
                helperText={errors.address && errors.address.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                InputLabelProps={{
                  shrink: Boolean(getValues().address)
                }}
                label="Endereço"
                variant="filled"
                placeholder="Insira o endereço da empresa"

              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name="address_number"
                type="number"
                fullWidth
                error={errors.address_number && errors.address_number.message}
                helperText={errors.address_number && errors.address_number.message}
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
                label="Número"
                variant="filled"
                placeholder="Insira o número da empresa"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="address_complement"
                fullWidth
                error={errors.address_complement && errors.address_complement.message}
                helperText={errors.address_complement && errors.address_complement.message}
                label="Complemento"
                variant="filled"
                placeholder="Insira o complemento"
                inputRef={register({
                  required: 'Esse campo é obrigatório'
                })}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" component="h6">Informações do Projeto</Typography>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="filled-multiline-static"
                label="Observação"
                multiline
                rows="5"
                error={errors.observation && errors.observation.message}
                fullWidth
                name="observation"
                variant="filled"
                inputRef={register}
              />

            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                options={qtd_projects}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="qtdProjects"
                    inputRef={register({
                      required: 'Esse campo é obrigatório'
                    })}
                    color="secondary"
                    label="Quantidade de Projetos"
                    variant="filled"
                    placeholder="Selecione a quantidade"
                    error={errors.qtdProjects && errors.qtdProjects.message}
                    helperText={errors.qtdProjects && errors.qtdProjects.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Error msg={registerError && registerError.enterprise} />

          <WrapButton>
            <AssociateLegalText>
              Declaro que estou ciente de que todos os projetos inscritos estão passíveis de análise por parte da auditoria
              do Prêmio Aberje 2020
                e que pode ser excluído se estiver em desacordo com o  <a href="http://aberje.com.br/premio/images/pdf/regulamento/regulamento_premio_2020.pdf" rel="noopener noreferrer" target="_blank">regulamento.
              </a>.
              <Switch
                name="agree_terms"
                label="Estou de acordo"
                register={register}
                required
                error={errors.agree_terms && errors.agree_terms.message}
              />
            </AssociateLegalText>
            <Button variant="contained" type="submit">
              Continuar
            </Button>
          </WrapButton>
          <Snackbar
            open={Boolean(snackbarState.active)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={() => setSnackbarState({ active: false })}
          >
            <Alert elevation={6} variant="filled" onClose={() => setSnackbarState({ active: false })} severity={snackbarState.severity}>
              {snackbarState.message}
            </Alert>
          </Snackbar>
        </Form>
      </Flexbox>
    </Background>
  )
}

export default Enterprise