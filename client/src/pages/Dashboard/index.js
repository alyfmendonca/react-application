import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Person from '@material-ui/icons/Person'
import { useForm } from 'react-hook-form'

import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { getInfo } from './user_info'
import Profile from './Profile'
import Info from './Info'

import Button from '../../components/material/FormButton'

import loading from '../../assets/loading.svg'
import {
  ModalForm,
  WrapperLoadding,
  ButtonWrapper,
} from './style'
import Modal from '../../components/material/Modal'
import { TextField, Snackbar, Typography } from '@material-ui/core'
import { phoneMask } from '../../utils/masks'
import Alert from '@material-ui/lab/Alert'
import EditEnterpriseForm from './EditEnterpriseForm';
import ProjectList from '../Project/DashboardProjectList'
import DashboardEnterpriseList from '../Enterprises/DashboardEnterpriseList'
import history from '../../history';

const Dashboard = () => {
  const userType = useStoreState(state => state.auth.auth.user)

  const getUser = useStoreActions(actions => actions.user.getUser)
  const editUser = useStoreActions(actions => actions.user.editUser)

  const user = useStoreState(state => state.user.user) || {};
  const userErrors = useStoreState(state => state.user.errors)

  const editEnterprise = useStoreActions(({ enterprise }) => enterprise.editEnterprise)
  const editAgency = useStoreActions(({ agency }) => agency.editAgency)
  const createEnterprise = useStoreActions(({ enterprise }) => enterprise.createEnterprise);

  const getEnterprisesByAgency = useStoreActions(({ enterprise }) => enterprise.getEnterprisesByAgencyId);
  const enterprises = useStoreState(({ enterprise }) => enterprise.enterprises) || [];

  const allProjects = useStoreState(({ project }) => project.allProjects) || [];
  const getProjects = useStoreActions(state => state.project.getAllProjects)
  const hasProjects = allProjects.length;
  const [dashboardProjects, setDashboardProjects] = useState(0);
  const [editEnterpriseModal, setEditEnterpriseModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [createEnterpriseModal, setCreateEnterpriseModal] = useState(false);
  const [askToNewProjectsModal, setAskToNewProjectsModal] = useState(false);
  const [snackbarActive, setSnackbarActive] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')


  useEffect(() => {
    typeof userType.type !== 'undefined' && getUser(userType.type)

    if (userType.type === 'sworn') {
      return history.push(`/dashboard/jurado`)
    }

    if (userType.type === "swornpremiatory")
      return history.push(`/dashboard/jurado/premiatoria`)

    if (userType.type === "swornpremiatoryend")
      return history.push(`/dashboard/jurado/premiatoriaFinal`)

    if (userType.type === "enterprise") {
      getProjects(userType.id)
    }

    if (userType.type === "agency") {
      getEnterprisesByAgency(userType.id)
    }

  }, [getEnterprisesByAgency, getProjects, userType, getUser, user])

  const { register, errors, handleSubmit } = useForm()

  const submitCreateEnterprise = async (data) => {
    const response = await createEnterprise({ ...data, agency_id: userType.id });
    if (response.status === 404) {
      setSnackbarActive(true)
      setSnackbarMessage("Não foi possível cadastrar a empresa, tente novamente mais tarde.")
      return false;
    }

    getEnterprisesByAgency(userType.id)
    setSnackbarMessage('Empresa criada com sucesso')
    setSnackbarActive(true)
    setCreateEnterpriseModal(!createEnterpriseModal)
    return true;
  };


  const submitEditUser = async (data) => {
    const response = await editUser({ ...data, type: user.type, id: user.id });
    if (response) {
      setSnackbarActive(true)
      getUser(userType.type)
      setSnackbarMessage('Usuário alterado com sucesso.')
      setEditUserModal(!editUserModal)
      return true;
    }
    setSnackbarActive(true)
    setSnackbarMessage(userErrors.errors)
  }

  const submitEditEnterprise = async (data) => {
    const id = user.type === "agency" ? user.agency_id : user.enterprise_id;
    const isEnterprise = user.type === "enterprise";
    const submitFunction = isEnterprise ? editEnterprise : editAgency;
    const { data: responseData } = await submitFunction({ ...user, ...data, id });
    if (responseData.message) {
      getUser(user.type)
      setSnackbarActive(true);
      setSnackbarMessage(responseData.message);
      setEditEnterpriseModal(false)
      return;
    }
    setSnackbarActive(true);
    setSnackbarMessage('Ocorreu um erro ao alterar a empresa.')
    return;
  };

  const userTypeName = userType.type === "enterprise" ? "empresa" : "agencia"
  const agencyUser = userTypeName === "agencia";

  if (!Object.values(user).length) {
    return (
      <Container>
        <WrapperLoadding>
          <img src={loading} alt="loading" />
        </WrapperLoadding>
      </Container>
    )
  }

  const shouldNotRegisterProject = parseInt(user?.qtd_projects?.[0]) === (agencyUser ? dashboardProjects : allProjects.length);

  return (
    <Container>
      <Grid container direction="row" display="flex">
        <Grid item xs={4}>
          <Paper style={{ backgroundColor: '#FAFAFA', padding: '15px' }}>
            <Grid item xs={12}>
              <Profile
                id={user._id}
                name={user.enterprise_name || user.name}
                icon={userType.type === "enterprise" ?
                  <Enterprise style={{ fontSize: 60 }} /> :
                  <Person style={{ fontSize: 60 }} />}
                associate={user.aberje_associate}
                type={userType.type === "enterprise" ? "Empresa" : "Agencia"}
              />
            </Grid>
            <div style={{ width: '100%', display: 'inline-block', textAlign: 'center' }}>
              {/* <Button onClick={() => setEditUserModal(true)}>Editar usuário</Button>
              <Button onClick={() => setEditEnterpriseModal(true)}>Editar dados da empresa</Button> */}
            </div>
            <Grid item xs={12}>
              <Info
                infoList={getInfo(user, userType.type)}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {hasProjects !== undefined && userType.type === "enterprise" && (
            <>
              {/* <Container style={{ width: '100%', display: 'inline-block', textAlign: 'right' }}>
                {!shouldNotRegisterProject ? (
                  <Link to="/cadastro/projeto">
                    <Button variant="contained">
                      Cadastrar Projetos
                          </Button>
                  </Link>
                ) : (
                    <Button variant="contained" onClick={() => setAskToNewProjectsModal(true)}>
                      Solicitar cadastro de novos projetos.
                    </Button>
                  )}
              </Container> */}
              <Container>
                <Typography variant="h3" style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: 10 }}>
                  Projetos
                  </Typography>
                <ProjectList projects={allProjects.slice(0, 7)} />
                {allProjects.length > 7 && (
                  <Container style={{ width: '100%', display: 'inline-block', textAlign: 'right' }}>
                    <Link to={`/listagem/${userTypeName}/projetos/${user.user_id}`}>
                      <Button variant="contained">
                        Todos os projetos
                      </Button>
                    </Link>
                  </Container>
                )}
              </Container>
            </>
          )}
          {!hasProjects && userType.type === "enterprise" && (
            <div style={{ height: '100%', textAlign: 'center' }}>
              Você não possui projetos cadastrados.
            </div>
          )}
          {agencyUser && (
            <>
              <Container style={{ width: '100%', display: 'inline-block', textAlign: 'right' }}>
                {/* <Button variant="contained" onClick={() => setCreateEnterpriseModal(true)}>
                  Cadastrar empresa
            </Button> */}
              </Container>
              <Container>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h3" style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: 10 }}>
                    Empresas
                </Typography>
                  {/* {shouldNotRegisterProject && (
                    <Button variant="contained" onClick={() => setAskToNewProjectsModal(true)}>
                      Solicitar cadastro de novos projetos.
                    </Button>
                  )} */}
                </div>
                <DashboardEnterpriseList enterprises={enterprises} canRegisterNewProject={shouldNotRegisterProject} setDashboardProjects={setDashboardProjects} />
              </Container>
            </>
          )}
        </Grid>
      </Grid>
      {editUserModal && (
        <Modal
          title="Editar o usuário"
          isOpen={editUserModal}
          onClose={() => setEditUserModal(false)}
        >
          <ModalForm onSubmit={handleSubmit(submitEditUser)}>
            <TextField
              name="email"
              label="E-mail"
              defaultValue={user.email}
              error={errors.email && errors.email.message}
              helperText={errors.email && errors.email.message}
              inputRef={register({
                required: 'Este campo é obrigatório',
              })}
              variant="filled"
              color="secondary"
              fullWidth
              className="form-field"
            />
            <TextField
              name="name"
              label="Nome"
              defaultValue={user.name}
              error={errors.name && errors.name.message}
              helperText={errors.name && errors.name.message}
              inputRef={register({
                required: 'Este campo é obrigatório',
              })}
              variant="filled"
              color="secondary"
              fullWidth
              className="form-field"
            />
            <TextField
              name="phone"
              defaultValue={user.phone}
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
              label="Contato Telefonico (DDD + nº)"
              variant="filled"
              className="form-field"
            />
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
        </Modal>
      )}
      {createEnterpriseModal && (
        <Modal
          title="Criar empresa"
          isOpen={createEnterpriseModal}
          onClose={() => setCreateEnterpriseModal(false)}
        >
          <ModalForm onSubmit={handleSubmit(submitCreateEnterprise)}>
            <TextField
              name="enterprise_name"
              label="Nome da empresa"
              error={errors.enterprise_name && errors.enterprise_name.message}
              helperText={errors.enterprise_name && errors.enterprise_name.message}
              inputRef={register({
                required: 'Este campo é obrigatório',
              })}
              variant="filled"
              color="secondary"
              fullWidth
              className="form-field"
            />
            <ButtonWrapper>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                styles={{ display: 'block', width: '100%' }}
              >
                Criar
              </Button>
            </ButtonWrapper>
          </ModalForm>
        </Modal>
      )}
      {askToNewProjectsModal && (
        <Modal
          title="Solicitação de novos projetos"
          isOpen={askToNewProjectsModal}
          onClose={() => setAskToNewProjectsModal(false)}
        >
          <p>
            A quantidade de projetos selecionada no ato do cadastro já está completa.
           Caso necessite inscrever mais projetos, entre em contato conosco pelo email <a href="mailto:mirella@aberje.com.br">mirella@aberje.com.br</a> informando o número de novos projetos que pretende inserir
           </p>
        </Modal>
      )}
      {editEnterprise && (
        <Modal
          title={user.type === "enterprise" ? "Editar dados da empresa" : "Editar dados da agência"}
          isOpen={editEnterpriseModal}
          onClose={() => setEditEnterpriseModal(false)}
        >
          <EditEnterpriseForm user={user} onSubmit={submitEditEnterprise} />
        </Modal>
      )}
      <Snackbar open={snackbarActive} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={() => setSnackbarActive(false)}>
        <Alert elevation={6} variant="filled" onClose={() => setSnackbarActive(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Dashboard