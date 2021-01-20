import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Switch from '../../components/material/Switch'
import { Error } from '../../components/Status'

import FileList from '../../components/FileList'

import Upload from '../../components/Upload'

import {
  project_category,
  project_region,
  region_choice
} from '../Signup/dicioFields'
import Button from '../../components/material/Button'

import Snackbar from '@material-ui/core/Snackbar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Container, SubTitle } from './style';
import { phoneMask } from '../../utils/masks';
import s3 from '../../aws-config';
import history from "../../history"
import { mountFileObj } from "../../utils/service"

const Project = ({ location }) => {
  const {
    register, handleSubmit, errors, setError,
    watch
  } = useForm()

  const enterpriseId = location?.state?.enterprise_id;
  const registerProject = useStoreActions(actions => actions.project.registerProject)

  const [charactersCount, setCharactersCount] = useState(0)
  const [files, setFiles] = useState([])
  const [authorizationLetter, setAuthorizationLetter] = useState([]);
  const [signatureFile, setSignatureFile] = useState([]);
  const [modalStatus, setModalStatus] = useState(false)
  const [draft, setDraft] = useState(false);
  
  const [projectCreatorIndex, setProjectCreatorIndex] = useState(0);
  const [projectCreators, setProjectCreators] = useState([]);

  const registerError = useStoreState(state => state.project.error)
  const userType = useStoreState(state => state.auth.auth.user)
  const typeOfUser = userType.type === "enterprise" ? "empresa" : "agencia";

  const onSubmit = data => {
    if (!data.agree) {
      return setError('agree', 'notMatch', 'Este campo é obrigatório')
    }
    
    if (!draft && !signatureFile.length) {
      return alert('Você precisa inserir uma assinatura digital.')
    }

    if (!draft && !authorizationLetter.length && typeOfUser === "agencia") {
      return alert('Você precisa inserir uma carta de autorização.')
    }

    const filesArray = files.map((file) => {
      if (!file.uploaded) {
        alert('Aguarde o upload dos arquivos')
        return false;
      }
      return { ...file };
    });

    const signaturesArray = signatureFile.map((file) => {
      if (!file.uploaded) {
        alert('Aguarde o upload da assinatura digital.')
        return false;
      }
      return { ...file, signature: true, };
    });

    const authorizationLetterFile = userType.type === "agency" ? authorizationLetter.map((file) => {
      if (!file.uploaded) {
        alert('Aguarde o upload da carta de autorização')
        return false;
      }
      return { ...file, authorizationLetter: true };
    }) : [];

    const hasOthersContacts = data.others_contacts.some(({ name, email, tel }) => name || email || tel)
    const formatted = {
      enterprise_id: enterpriseId || userType.id,
      ...data,
      ...(hasOthersContacts && { others_contacts: data.others_contacts }),
      attachment: [...filesArray, ...signaturesArray, ...authorizationLetterFile]
    }

    if(draft) {
      return registerProject({ ...formatted, type: userType.type })
        .then(() => history.push(`/dashboard/${typeOfUser}`))
        .catch(() => alert('Ocorreu um erro ao registrar o projeto, tente novamente.'))
    }

    const confirmMessage = 'Ao finalizar este projeto entenderemos que ele já está disponibilizado para análise e, portanto, não poderá mais ser editado. Caso necessite uma alteração após a finalização, entre em contato com a administração do prêmio pelo email mirella@aberje.com.br , lembrando que alterações posteriores incorrem em um decréscimo em sua pontuação, conforme o regulamento do Prêmio ABERJE 2020';
    
    if(window.confirm(confirmMessage)){
      registerProject({ ...formatted, draft: false, complet_project: true })
        .then(() => history.push(`/dashboard/${typeOfUser}`))
        .catch(() => alert('Ocorreu um erro ao registrar o projeto, tente novamente.'))
      return;
    }

  }
  
  const handleDeleteAuthorizationLetter = (id) => {
    return setAuthorizationLetter((state) => state.filter((file) => file.id !== id));
  };

  const handleDeleteSignatures = (id) => {
    return setSignatureFile((state) => state.filter((file) => file.id !== id));
  };

  const handleDeleteFiles = (id) => {
    return setFiles((state) => state.filter((file) => file.id !== id));
  };

  const uploadAuthorizationLetter = ([file]) => {
    if(authorizationLetter.length){
      return alert('Você já anexou uma carta de autorização.');
    }

    const maxSize = 3 * 1024 * 1024;

    if (file.size >= maxSize) {
      return alert('Arquivo muito grande');
    }

    const { s3Options, fileObj } = mountFileObj(file);

    s3.upload(s3Options, (err, data) => {
      if (err) {
        setAuthorizationLetter(state => state.map((file) => ({ ...file, error: true })))
        return false;
      };
      if(data) {
        setAuthorizationLetter(state => state.map((file) => ({ ...file, key: data.Key, url: data.Location, size: file.file.size, uploaded: true })))
      }
    });
    setAuthorizationLetter(state => [...state, { ...fileObj, }])

  }

  const onUploadSignature = ([file]) => {
    if(signatureFile.length >= 3){
      return alert('Limite máximo de 3 assinaturas');
    }

    const maxSize = 3 * 1024 * 1024;

    if (file.size >= maxSize) {
      return alert('Arquivo muito grande')
    }

    const { s3Options, fileObj } = mountFileObj(file);

    s3.upload(s3Options, (err, data) => {
      if (err) {
        setSignatureFile(state => state.map((file) => ({ ...file, error: true })))
        return false;
      };
      if(data) {
        setSignatureFile(state => state.map((file) => ({ ...file, key: data.Key, url: data.Location, size: file.file.size, uploaded: true })))
      }
    });
    setSignatureFile(state => [...state, { ...fileObj, }])
  };


  const uploadFiles = ([file]) => {
    // total of unique file
    const maxSize = 60 * 1024 * 1024;
    // total of all files together
    const totalMaxFile = 100 * 1024 * 1024;
    
    if (file.size >= maxSize) {
      return alert('Arquivo muito grande')
    }

    const fileSizes = files.map(({ size }) => size).reduce((accumulator, val) =>  accumulator + val, 1) + file.size;

    if(totalMaxFile < fileSizes) {
      return alert('Os seus arquivos excederam o limite máximo de 100mb');
    }

    const { s3Options, fileObj } = mountFileObj(file);

  
    s3.upload(s3Options, (err, data) => {
      if (err) {
        setFiles(state => state.map((file) => file.id === fileObj.id ? { ...file, error: true } : { ...file }))
        return false;
      };
      if (data) {
        setFiles(state => state.map((file) => file.id === fileObj.id ? { ...file, key: data.Key, url: data.Location, size: file.file.size, uploaded: true } : { ...file }))
      }
    });
    setFiles(state => [...state, { ...fileObj, }])
  }

  const addProjectCreator = (index) => {
    if(projectCreators.length >= 20) return false;
    setProjectCreatorIndex((index) => index + 1);
    const inputProps = [
      {
        name: `project_creators[${index}].agency_name`,
        fullWidth: true,
        label: "Razão Social",
        placeholder: "Insira a razão social",
        inputRef: register,
        variant: "filled",
        key: index,
      },
      {
        name: `project_creators[${index}].agency_fancy`,
        fullWidth: true,
        label: "Nome Fantasia",
        placeholder: "Insira o nome fantasia",
        inputRef: register,
        variant: "filled",
        key: index,
      }
    ]

    setProjectCreators((state) => state.concat(inputProps));
  }

  const removeProjectCreatorsFields = (key) => {
    setProjectCreators((state) => state.filter((project) => project.key !== key));
    setProjectCreatorIndex((index) => index - 1);
  };

  const agreeState = watch('agree');

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 1024, margin: '0 auto' }}>
        <Typography variant="h2" style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
          Ficha de identificação
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              name="title"
              fullWidth
              error={errors.title && errors.title.message}
              helperText={errors.title && errors.title.message}
              inputRef={register({
                required: 'Este campo é obrigatório'
              })}
              label="Nome do Projeto"
              variant="filled"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="total_period"
              type="date"
              fullWidth
              error={errors.total_period && errors.total_period.message}
              helperText={errors.total_period && errors.total_period.message}
              inputRef={register({
                required: 'Este campo é obrigatório',
                pattern: {
                  message: 'Data inválida'
                }
              })}
              inputProps={{
                min: '2019-01-01',
                max: '2020-08-31',
              }}
              InputLabelProps={{
                shrink: true
              }}
              label="Período do Projeto"
              placeholder="Período em que o projeto foi desenvolvido dentro do tempo estipulado"
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="project_about"
              fullWidth
              multiline
              rows="5"
              error={errors.project_about && errors.project_about.message}
              helperText={errors.project_about && errors.project_about.message}
              inputRef={register}
              inputProps={{
                maxLength: 900
              }}
              onChange={({ target }) => setCharactersCount(target.value.length)}
              label="Resumo sobre o projeto"
              variant="filled"
            />
            <p style={{ width: '100%', textAlign: 'right', color: charactersCount > 850 && 'red' }}>{charactersCount}/900</p>
          </Grid>


          <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
              Categoria em que o Projeto ocorre
        </Typography>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={project_category}
              renderInput={params => (
                <TextField
                  {...params}
                  name="category"
                  inputRef={register}
                  color="secondary"
                  label="Categoria"
                  variant="filled"
                  placeholder="Selecione a categoria"
                  error={errors.project_category && errors.project_category.message}
                  helperText={errors.project_category && errors.project_category.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="category_about"
              fullWidth
              multiline
              rows="5"
              error={errors.category_about && errors.category_about.message}
              helperText={errors.category_about && errors.category_about.message}
              inputRef={register}
              inputProps={{
                maxLength: 500
              }}
              label="Escreva o porquê da escolha da categoria"
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={project_region.sort()}
              renderInput={params => (
                <TextField
                  {...params}
                  name="project_region"
                  inputRef={register}
                  color="secondary"
                  label="Região"
                  variant="filled"
                  placeholder="Escolha a região"
                  error={errors.project_region && errors.project_region.message}
                  helperText={errors.project_region && errors.project_region.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={region_choice.sort()}
              renderInput={params => (
                <TextField
                  {...params}
                  name="region_choice"
                  inputRef={register}
                  color="secondary"
                  label="Escolha abaixo uma das opções do porquê da escolha da região"
                  variant="filled"
                  placeholder="Digite sua Região"
                  error={errors.region_choice && errors.region_choice.message}
                  helperText={errors.region_choice && errors.region_choice.message}
                />
              )}
            />
            <p>
              com base nos critérios dos itens III.7 e III.7.1 do regulamento
            </p>
          </Grid>
          <Grid item xs={12}>
            <div>
              <p>Abaixo insira <b>todos</b> os arquivos do seu projeto. As extensões permitidas são: <b>.PDF, .DOC, .DOCX, .MP4 e .MOV  </b></p>
              <p>
              A soma de todos os seus arquivos enviados não deve ultrapassar <b>100 megas</b>, o arquivo de vídeo case (sozinho) pode chegar até <b>50 megas</b>, se estiver maior,
              envie uma versão com menor qualidade, ela servirá somente para a análise do conteúdo do projeto. Caso o seu trabalho venha a ser classificado, vencedor regional,
              será solicitada uma cópia em alta resolução para exibição.
              </p>
              <p>
                Clique no box branco abaixo ou arraste os arquivos para fazer upload.
              </p>
              <Upload onUpload={uploadFiles} />
            </div>
            <FileList files={files} handleDelete={handleDeleteFiles} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
              Agência, assessoria, produta responsável pela criação e/ou produção do trabalho.
            </Typography>
            <div style={{ margin: '10px 0px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: "100%", textAlign: 'center' }}>
                  <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddCircleIcon />}
                  onClick={() => addProjectCreator(projectCreatorIndex)}
                  disabled={projectCreators.length >= 20}
                >
                  Adicionar
                </Button>
                </div>
            </div>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="project_creators[0].agency_name"
                  fullWidth
                  label="Razão Social"
                  placeholder="Insira a razão social"
                  inputRef={register}
                  variant="filled"
                />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="project_creators[0].agency_fancy"
                    fullWidth
                    label="Nome Fantasia"
                    placeholder="Insira o nome fantasia"
                    inputRef={register}
                    variant="filled"
                  />
                </Grid>
              {projectCreators.map((inputProps, index) => {
                const renderRemoveButton = index > 0 && index % 2 === 1;
                return (
                    <Grid item xs={6} style={{ position: "relative" }}>
                      <TextField {...inputProps}/>
                      {renderRemoveButton && (
                        <div style={{ width: '100%', textAlign: 'right' }}>
                           <Button
                            color="secondary"
                            onClick={(e) => {
                            e.preventDefault();
                            removeProjectCreatorsFields(inputProps.key)
                            }}>
                            Remover
                          </Button>
                        </div>
                      )}
                    </Grid>
                )
              })}
            </Grid>
          </Grid>
            <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
              Outros Contatos
            </Typography>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[0].name"
                  inputRef={register({
                    required: 'Esse campo é obrigatório'
                  })}
                  error={errors?.others_contacts?.[0]?.name}
                  helperText={errors?.others_contacts?.[0]?.name && errors?.others_contacts[0]?.name.message}
                  fullWidth
                  label="Nome Completo"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[0].email"
                  inputRef={register({
                    required: 'Esse campo é obrigatório'
                  })}
                  type="email"
                  fullWidth
                  label="Email"
                  variant="filled"
                  error={errors?.others_contacts?.[0]?.email}
                  helperText={errors?.others_contacts?.[0]?.email && errors?.others_contacts[0]?.email.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[0].tel"
                  inputRef={register({
                    required: 'Esse campo é obrigatório'
                  })}
                  type="text"
                  fullWidth
                  label="Telefone"
                  variant="filled"
                  onInput={({ target }) => target.value = phoneMask(target.value)}
                  error={errors?.others_contacts?.[0]?.tel}
                  helperText={errors?.others_contacts?.[0]?.tel && errors?.others_contacts[0]?.tel.message}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[2].name"
                  inputRef={register}
                  fullWidth
                  label="Nome"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[2].email"
                  inputRef={register}
                  type="email"
                  fullWidth
                  label="E-mail"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[2].tel"
                  inputRef={register}
                  type="text"
                  fullWidth
                  label="Telefone"
                  variant="filled"
                  onInput={({ target }) => target.value = phoneMask(target.value)}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[1].name"
                  inputRef={register}
                  fullWidth
                  label="Nome"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[1].email"
                  inputRef={register}
                  type="email"
                  fullWidth
                  label="E-mail"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="others_contacts[1].tel"
                  inputRef={register}
                  type="text"
                  fullWidth
                  label="Telefone"
                  variant="filled"
                  onInput={({ target }) => target.value = phoneMask(target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
              Assinatura Digital
            </Typography>
            <div>
              <p style={{ textAlign: 'center' }}>
                Suba a imagem de sua assinatura digital, se estiver cadastrado como agência, também é obrigatório o envio de uma carta de autorização.
                <b>Tamanho máximo 3mb</b>
              </p>
              <Upload onUpload={onUploadSignature} filesAccepted=".jpg, .jpeg, .png, .doc" label="Anexar assinatura digital" />
            </div>
            <FileList files={signatureFile} handleDelete={handleDeleteSignatures} />
          </Grid>
          {userType.type === "agency" && (
            <Grid item xs={12}>
              <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
                Carta de autorização.
              </Typography>
              <div>
                <p style={{ textAlign: 'center' }}>
                  Você como agência, envie a carta de autorização conforme o <a href="http://www.aberje.com.br/premio/opremio.html" target="_blank" rel="noopener noreferrer">regulamento.</a>
                  <b>Tamanho máximo de 3mb.</b>
                </p>
                <Upload onUpload={uploadAuthorizationLetter} filesAccepted=".jpg, .jpeg, .png, .doc" label="Anexar carta de autorização" />
              </div>
              <FileList files={authorizationLetter} handleDelete={handleDeleteAuthorizationLetter} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              {userType.type === "enterprise" ? (
                'Atestamos a veracidade das informações apresentadas pela nossa organização inscrita no Prêmio Aberje 2020.'
              ) : (
                'Atestamos a veracidade das informações apresentadas pela nossa agência inscrita no Prêmio Aberje 2020.'
              )}
            </Typography>
            <SubTitle>
             {userType.type === "enterprise" ? (
               'Autorizamos a publicação, na íntegra ou em parte, do trabalho inscrito no Prêmio Aberje 2020, em quaisquer veículos de comunicação de responsabilidades direta da Aberje.'
             ) : (
               'Autorizamos a publicação, na íntegra ou em parte, do trabalho inscrito no Prêmio Aberje 2020, em quaisquer veículos de comunicação de responsabilidades direta da Aberje. Os trabalhos inscritos por assessorias, agências ou profissionais autônomos externos declaram possuir autorização da empresa cliente para participar do Prêmio Aberje 2019, essa autorização deverá ser entregue juntamente com o trabalho.'
             )}
            </SubTitle>
            {userType.type === "agency" && (
              <SubTitle>
                Declaramos contar com autorização assinada pela empresa cliente para inscrever este trabalho no Prêmio Aberje 2020 e nos comprometemos a enviá-la,
                em versão digital à Aberje, juntamente com o arquivo eletrônico do trabalho.
              </SubTitle>
            )}
            <Switch
              name="agree"
              label="Estou de acordo"
              register={register}
              error={errors.agree && errors.agree.message}
              required
            />
            {agreeState && (
              <p>Acesse o regulamento em: <a href="http://www.aberje.com.br/premio/opremio.html" target="_blank" rel="noopener noreferrer">regulamento</a></p>
            )}
          </Grid>

        </Grid>

        <Error msg={registerError && registerError.project} />

        <Button type="submit" variant="contained" styles={{ marginRight: 10 }} onClick={() => setDraft(true)}>
          Salvar como rascunho
        </Button>
        <Button type="submit" variant="contained">
              Finalizar projeto
        </Button>
      </form>

      <Snackbar open={modalStatus} autoHideDuration={6000} onClose={() => setModalStatus(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setModalStatus(false)} severity="success">
          Projeto cadastrado com sucesso!
          </Alert>
      </Snackbar>
    </Container >
  )
}

export default Project;