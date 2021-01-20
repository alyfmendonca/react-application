import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';

import { IfElse } from '../../components/If';
import { Draft, Concluded, Pending } from './style';
import { Link } from 'react-router-dom';


import DetailEnterprise from './detailEnterprise';

import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import Title from '../../components/material/Title';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
  buttonApprove: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.main
  }
}));


let Projetos = [];

const EnterprisesList = () => {
  const enterprises = useStoreState(state => state.enterprise.enterprisesWithProjects);
  const getAllEnterprisesWithProjects = useStoreActions(actions => actions.enterprise.getAllEnterpriseWithProjects);
  const editPaymentProject = useStoreActions(actions => actions.project.editPaymentProject);
  const user = useStoreState(state => state.auth.auth.user);

  useEffect(() => {
    getAllEnterprisesWithProjects();
  }, [getAllEnterprisesWithProjects])

  const clearList = enterprises
    .map(enterprise => {

      const paymentPending = enterprise.projects.some(obj => obj.paid === false);
      const projectDraft = enterprise.projects.some(obj => obj.draft === true);

      return {
        id: enterprise.enterprise_id,
        name_enterprise: enterprise.enterprise_name,
        enterprise_fancy: enterprise.enterprise_fancy,
        cnpj: enterprise.cnpj,
        aberje_associate: enterprise.aberje_associate === true ? 'Sim' : 'Não',
        name: enterprise.name,
        email: enterprise.email,
        phone: enterprise.phone,
        observation: enterprise.observation,
        qtd_projects: enterprise.qtd_projects,
        address: enterprise.address,
        cep: enterprise.cep,
        neighborhood: enterprise.neighborhood,
        address_complement: enterprise.address_complement,
        city: enterprise.city,
        projects: enterprise.projects,
        paymentPending: paymentPending,
        projectDraft: projectDraft
      }

    });

  const filterClearList = clearList.filter((enterprise, indice) => {
    return enterprise.id !== undefined
  });

  function RowProject(props) {
    const { project } = props;
    const classes = useRowStyles();
    let identifierPayment = null;
    const [modalStatusSuccess, setModalStatusSuccess] = useState(false);
    const [modalStatusError, setModalStatusError] = useState(false);

    useEffect(() => {
      setValuePaymentIdentifier(project.payment_identifier);
    });

    const setValuePaymentIdentifier = (value) => {
      identifierPayment = value;
    }

    const sendPayment = (value) => {
      const payment = {
        id: value._id,
        paid: true,
        payment_identifier: identifierPayment
      }
      editPaymentProject(payment)
        .then((res) => {
          setModalStatusSuccess(true);
          setTimeout(() => {
            getAllEnterprisesWithProjects();
          }, 1200)
        }).catch((err) => {
          setModalStatusError(true);
          console.log(err);
        });
    };

    return (
      <React.Fragment>
        <TableRow>
          {user.type === 'admin' && (
            <TableCell>
              <Link to={`/projeto/editar/${project._id}`}>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Link>
            </TableCell>
          )}
          <TableCell>
            {project.title}
          </TableCell>
          <TableCell align="center">
            <TextField
              label=""
              name="payment_identifier"
              variant="outlined"
              defaultValue={project.payment_identifier}
              onInput={({ target }) => setValuePaymentIdentifier(target.value)} />
          </TableCell>
          <TableCell align="right">
            <IfElse condition={project.draft}
              True={
                <Draft>RASCUNHO</Draft>
              }
              False={
                <Concluded>CONCLUÍDO</Concluded>
              }
            />
          </TableCell>
          <TableCell align="right">
            <IfElse condition={project.paid}
              True={
                <Concluded>CONCLUÍDO</Concluded>
              }
              False={
                <Pending>PENDENTE</Pending>
              }
            />
          </TableCell>
          <TableCell align="right">
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonApprove}
              onClick={() => sendPayment(project)}>
              APROVAR
            </Button>
          </TableCell>
        </TableRow>
        <Snackbar open={modalStatusError} autoHideDuration={6000} onClose={() => setModalStatusError(false)}>
          <Alert elevation={6} variant="filled" onClose={() => setModalStatusError(false)} severity="error">
            Ops! Ocorreu um erro.
          </Alert>
        </Snackbar>
        <Snackbar open={modalStatusSuccess} autoHideDuration={6000} onClose={() => setModalStatusSuccess(false)}>
          <Alert elevation={6} variant="filled" onClose={() => setModalStatusSuccess(false)} severity="success">
            Projeto atualizado!
          </Alert>
        </Snackbar>
      </React.Fragment>
    );

  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const classes = useRowStyles();

    const handleOpen = () => {
      setOpenModal(true);
    };

    const handleClose = () => {
      setOpenModal(false);
    };

    // if (row.projects.length < row.qtd_projects && row.projects.length != 0 || row.projects.length < row.qtd_projects && row.projects.length != 0) {
    //   SemProjeto.push({email: row.email, nome: row.name, name_agency: row.name_enterprise, projetos_registrados: row.projects.length, quatidade_de_projetos: row.qtd_projects})
    //   console.log("Sem projetos ", JSON.stringify(SemProjeto))
    // }

    // if (row.projects.length > 0)
    //   row.projects.map(project => {
    //     Projetos.push({ regiao: project.project_region, razaoSocial: row.name_enterprise, nomeFantasia: row.enterprise_fancy, nomeDoProjeto: project.title, categoriaInscrita: project.category, nomeDoResponsavel: row.name, emailDoResponsavel: row.email })
    //   })

    // console.log(Projetos)

    return (
      <React.Fragment>
        <Modal
          open={openModal}
          onClose={handleClose}>
          <DetailEnterprise enterprise={row} />
        </Modal>

        <TableRow className={classes.root}>
          <TableCell>
            <Button onClick={handleOpen}>
              {row.name_enterprise}
            </Button>
          </TableCell>
          <TableCell align="center">
            {row.projects.length}
          </TableCell>
          <TableCell align="center">
            <IfElse condition={typeof row.projects !== 'undefined' && row.projects.length > 0}
              True={
                <IfElse condition={row.projectDraft}
                  True={
                    <Pending>PENDENTE</Pending>
                  }
                  False={
                    <Concluded>CONCLUÍDO</Concluded>
                  }
                />
              }
              False={
                <Pending>PENDENTE</Pending>
              }
            />
          </TableCell>
          <TableCell align="center">
            <IfElse condition={typeof row.projects !== 'undefined' && row.projects.length > 0}
              True={
                <IfElse condition={row.paymentPending}
                  True={
                    <Pending>PENDENTE</Pending>
                  }
                  False={
                    <Concluded>CONCLUÍDO</Concluded>
                  }
                />
              }
              False={
                <Pending>PENDENTE</Pending>
              }
            />
          </TableCell>
          <TableCell align="right">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>

              <IfElse
                condition={
                  typeof row.projects !== 'undefined' && row.projects.length > 0
                }
                True={
                  <Table style={{ backgroundColor: 'lightgrey' }}>
                    <TableHead>
                      <TableRow>
                        {user.type === 'admin' && (
                          <TableCell>EDITAR</TableCell>
                        )}
                        <TableCell>NOME DO PROJETO</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="right">STATUS</TableCell>
                        <TableCell align="right">PAGAMENTO</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.projects.map((project) => (

                        <RowProject key={row._id} project={project} />

                      ))}
                    </TableBody>
                  </Table>
                }
                False={
                  <Alert severity="warning">Não há projetos cadastrados</Alert>
                }
              />
            </Collapse>
          </TableCell>
        </TableRow >
      </React.Fragment >
    );
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title style={{ textAlign: 'left', fontSize: 24, marginBottom: 20, marginTop: 30 }}>
            LISTA DE EMPRESAS
          </Title>
        </Grid>

        {/* TABELA */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">NOME DA EMPRESA</TableCell>
                  <TableCell align="center">Nº PROJETOS CADAST.</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">PAGAMENTO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterClearList.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EnterprisesList
