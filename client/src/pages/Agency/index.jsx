import React, { useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { useStoreState, useStoreActions } from 'easy-peasy';
import Alert from '@material-ui/lab/Alert'
import { Draft, Concluded, Pending } from './style';
import { Link } from 'react-router-dom';

import DetailAgency from './detailAgency';

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
import Snackbar from '@material-ui/core/Snackbar';
import { IfElse } from '../../components/If'
import { makeStyles } from '@material-ui/core/styles';
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

const AgenciesList = () => {

  const agencies = useStoreState(state => state.agency.agencyWithProjects);
  const getAllAgencyWithProjects = useStoreActions(actions => actions.agency.getAllAgencyWithProjects);
  const editPaymentProject = useStoreActions(actions => actions.project.editPaymentProject);
  const user = useStoreState(state => state.auth.auth.user);

  useEffect(() => {
    getAllAgencyWithProjects();
  }, [getAllAgencyWithProjects])

  const clearList = agencies.reverse().filter(agency => {
    return agency.agency !== undefined
  });

  function RowProject(props) {
    const { project } = props;
    const classes = useRowStyles();
    let identifierPayment = null;
    const [modalStatusSuccess, setModalStatusSuccess] = React.useState(false);
    const [paid, setPaid] = React.useState(project.paid);
    const [modalStatusError, setModalStatusError] = React.useState(false);

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
          setPaid(true)
        }).catch((err) => {
          setModalStatusError(true);
          console.log(err);
        });
    };

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            {user.type === 'admin' && (
              <Link to={`/projeto/editar/${project._id}`}>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Link>
            )}
          </TableCell>
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
            <IfElse condition={paid}
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

  function RowEnterprise(props) {
    const { enterprise } = props;
    const Projects = enterprise.projects || [];
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles()
    console.log(enterprise)
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            {enterprise.enterprise_name}
          </TableCell>
          <TableCell align="center">
            {Projects.length}
          </TableCell>
          <TableCell align="center">
            <IfElse condition={enterprise.projectDraft || !Projects.length > 0}
              True={
                <Pending>PENDENTE</Pending>
              }
              False={
                <Concluded>CONCLUÍDO</Concluded>
              }
            />
          </TableCell>

          <TableCell align="center">
            <IfElse condition={enterprise.paymentPending || !Projects.length > 0}
              True={
                <Pending>PENDENTE</Pending>
              }
              False={
                <Concluded>CONCLUÍDO</Concluded>
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
                  Projects.length > 0
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
                      {Projects.map((project) => (
                        <RowProject key={project._id} project={project} />
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

  function Row(props) {
    const { row } = props;
    const agency = row.agency;
    const enterprises = row.enterprises;
    const ProjectsNumber = enterprises.reduce((x, enterprise) => enterprise.projects.length + x, 0);

    const projectDraft = enterprises.some(obj => obj.projectDraft === true);
    const paymentPending = enterprises.some(obj => obj.paymentPending === true);

    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const classes = useRowStyles();

    const handleOpen = () => {
      setOpenModal(true);
    };

    const handleClose = () => {
      setOpenModal(false);
    };

    // Região
    // Razão Social
    // Nome Fantasia
    // Nome Do Projeto
    // Categoria Inscrita
    // Nome do Responsavel
    // E-Mail do Responsavel
    // Agências

    // if (ProjectsNumber > 0)
    //   enterprises.map(enterprise =>
    //     enterprise.projects.map(project => {
    //       Projetos.push({ regiao: project.project_region, razaoSocial: agency.agency_name, nomeFantasia: agency.agency_fancy, nomeDoProjeto: project.title, categoriaInscrita: project.category, nomeDoResponsavel: row.name, emailDoResponsavel: row.email, agencias: agency.clients })
    //     })
    //   )

    //   console.log(Projetos)

    return (
      <React.Fragment>
        <Modal
          open={openModal}
          onClose={handleClose}>
          <DetailAgency row={row} />
        </Modal>
        <TableRow className={classes.root}>
          <TableCell>
            <Button onClick={handleOpen}>
              {agency.agency_name}
            </Button>
          </TableCell>
          <TableCell align="center">
            {enterprises.length}
          </TableCell>
          <TableCell align="center">
            {ProjectsNumber}
          </TableCell>
          <TableCell align="center">
            <IfElse condition={projectDraft || !ProjectsNumber > 0}
              True={
                <Pending>PENDENTE</Pending>
              }
              False={
                <Concluded>CONCLUÍDO</Concluded>
              }
            />
          </TableCell>
          <TableCell align="center">
            <IfElse condition={paymentPending || !ProjectsNumber > 0}
              True={
                <Pending>PENDENTE</Pending>
              }
              False={
                <Concluded>CONCLUÍDO</Concluded>
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
                  enterprises.length > 0
                }
                True={
                  <Table style={{ backgroundColor: 'lightgrey' }}>
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
                      {enterprises.map((enterprise) => (
                        <RowEnterprise key={enterprise._id} enterprise={enterprise} />
                      ))}
                    </TableBody>
                  </Table>
                }
                False={
                  <Alert severity="warning">Não há empresas cadastradas</Alert>
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
            LISTA DE AGÊNCIAS
          </Title>
        </Grid>

        {/* TABELA */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">NOME DA AGÊNCIA</TableCell>
                  <TableCell align="center">Nº EMPRESAS CADAST.</TableCell>
                  <TableCell align="center">Nº PROJETOS CADAST.</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">PAGAMENTO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clearList.map((row) => (<Row key={row.agency._id} row={row} />))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AgenciesList
