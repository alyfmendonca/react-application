import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Title from '../../../../components/material/Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { IfElse } from '../../../../components/If';
import { Save, Pending, Draft } from '../style';
import DescriptionIcon from '@material-ui/icons/Description';
import DetailEvaluation from '../../Sworn/DetailFirstEvaluation';
import Modal from '@material-ui/core/Modal';

let allUserSworn = [];

const ProjectDashboard = () => {

    const allProjects = useStoreState(state => state.project.allProjects);
    const getAllProjects = useStoreActions(state => state.project.getAllProjects);
    const defineSwornToProject = useStoreActions(actions => actions.project.defineSwornToProject);
    const getAllUsers = useStoreActions(actions => actions.user.getAllUsers);
    const editPaymentProject = useStoreActions(actions => actions.project.editPaymentProject);
    const user = useStoreState(state => state.auth.auth.user);
    const registerUser = useStoreActions(actions => actions.register.registerUser)
    let lista = []

    useEffect(() => {
        getAllUsers()
            .then((res) => {
                allUserSworn = (res.data).filter(user => user.type === 'sworn');
                getAllProjects('');
            }).catch((err) => {
                console.log(err);
            });
    }, [getAllProjects])

    const projects = allProjects.map(project => {
        return {
            id: project._id,
            title: project.title,
            enterprise_name: project.enterprise.enterprise_name,
            enterprise_fancy: project.enterprise.enterprise_fancy,
            agency_fancy: project.agency ? project.agency.agency_name : "",
            agency_fancy: project.agency ? project.agency.agency_fancy : "",
            enterprise_tel: project.enterprise.enterprise_tel,
            agency_tel: project.agency ? project.agency.agency_tel : "",
            first_evaluation: project.first_evaluation,
            user_email: project.agency ? project.agency.user_email : project.enterprise.user_email,
            payment_identifier: project.payment_identifier,
            others_contacts: project.others_contacts,
            project_region: project.project_region,
            category: project.category,
            sworn_id: project.sworn_id || null
        }
    })

    // console.log(JSON.stringify(projects.sort((a, b) => a.project_region < b.project_region ? -1 : a.project_region > b.project_region ? 1 : 0)))
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Title style={{ textAlign: 'left', fontSize: 24, marginBottom: 20, marginTop: 30 }}>
                        {'LISTA DE PROJETOS'} {`(${projects.length})`}
                    </Title>
                </Grid>

                {/* TABELA */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">NOME DA EMPRESA</TableCell>
                                    <TableCell align="center">NOME DO PROJETO</TableCell>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">REGIÃO</TableCell>
                                    <TableCell align="center">CATEGORIA</TableCell>
                                    <TableCell align="center">JURADO</TableCell>
                                    <TableCell align="center">AVALIAÇÃO</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.sort((a, b) => a.project_region < b.project_region ? -1 : a.project_region > b.project_region ? 1 : 0).map((row) => (
                                    <RowProject key={row._id} project={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )

    function RowProject(props) {
        const { project } = props;
        const [sworn, setSworn] = React.useState('');
        const [modalStatusSuccess, setModalStatusSuccess] = React.useState(false);
        const [modalStatusError, setModalStatusError] = React.useState(false);

        const [messageSuccess, setMessageSuccess] = React.useState('')
        const [messageError, setMessageError] = React.useState('')

        let identifierPayment = null;

        useEffect(() => {
            setSworn(project.sworn_id);
            setValuePaymentIdentifier(project.payment_identifier);
        });

        const setValuePaymentIdentifier = (value) => {
            identifierPayment = value;
        }

        const defineSworn = (event) => {
            const sendSworn = {
                id: project.id,
                sworn_id: event.target.value
            }

            defineSwornToProject(sendSworn)
                .then((res) => {
                    project.sworn_id = event.target.value;
                    setSworn(project.sworn_id);
                    setMessageSuccess('Jurado atualizado para o projeto');
                    setModalStatusSuccess(true);
                }).catch((err) => {
                    setMessageError('Erro ao atualizar jurado para o projeto');
                    setModalStatusError(true);
                    console.log(err);
                });
        };

        const sendPayment = (value) => {
            const payment = {
                id: value.id,
                paid: value.paid,
                payment_identifier: identifierPayment
            }
            editPaymentProject(payment)
                .then((res) => {
                    setMessageSuccess('ID Atualizado para o Projeto');
                    setModalStatusSuccess(true);
                }).catch((err) => {
                    setMessageError('Não foi possível atualizar o ID');
                    setModalStatusError(true);
                    console.log(err);
                });
        };


        const [openModal, setOpenModal] = React.useState(false);

        const handleOpen = () => {
            setOpenModal(true);
        };

        const handleClose = () => {
            setOpenModal(false);
        };

        return (
            <React.Fragment>
                <Modal
                    open={openModal}
                    onClose={handleClose}>
                    <DetailEvaluation project={project} />
                </Modal>
                <TableRow>
                    <TableCell align="center">
                        {user.type === 'auditor' || (
                            <Link to={`/projeto/editar/${project.id}`}>
                                <IconButton size="small">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                        )}
                    </TableCell>
                    <TableCell align="center">
                        {project.enterprise_name}
                    </TableCell>
                    <TableCell align="center">
                        {project.title}
                    </TableCell>
                    <TableCell align="center">
                        <div style={{ display: "flex" }}>
                            <TextField
                                label=""
                                name="payment_identifier"
                                variant="outlined"
                                defaultValue={project.payment_identifier}
                                disabled={user.type === 'auditor'}
                                onInput={({ target }) => setValuePaymentIdentifier(target.value)} />
                            {user.type === 'auditor' || (
                                <IconButton
                                    style={{ marginLeft: 15 }}
                                    size="small"
                                    onClick={() => sendPayment(project)}>
                                    <SaveIcon />
                                </IconButton>
                            )}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {project.project_region}
                    </TableCell>
                    <TableCell align="center">
                        {project.category}
                    </TableCell>
                    <TableCell align="center">
                        <FormControl style={{ width: '100%' }}>
                            <Select
                                value={sworn}
                                disabled={user.type === 'auditor'}
                                onChange={defineSworn}>
                                <MenuItem value=" " disabled>Selecione</MenuItem>
                                {allUserSworn.map((user) => (
                                    <MenuItem value={user._id}>{user.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="right">
                        <IfElse condition={project.first_evaluation}
                            True={
                                <IfElse condition={project.first_evaluation?.status === 'CONCLUDED'}
                                    True={
                                        <Save>Salvo</Save>
                                    }
                                    False={
                                        <Draft>Rascunho</Draft>
                                    }
                                />
                            }
                            False={
                                <Pending>Pendente</Pending>
                            }
                        />
                    </TableCell>
                    <TableCell align="center">
                        <IfElse condition={project?.first_evaluation?.status === 'CONCLUDED'}
                            True={
                                <IconButton onClick={handleOpen} size="medium" style={{ marginRight: 23 }}>
                                    <DescriptionIcon />
                                </IconButton>
                            }
                            False={
                                <span></span>
                            }
                        />
                    </TableCell>
                </TableRow>
                <Snackbar open={modalStatusError} autoHideDuration={6000} onClose={() => setModalStatusError(false)}>
                    <Alert elevation={6} variant="filled" onClose={() => setModalStatusError(false)} severity="error">
                        {messageError}
                    </Alert>
                </Snackbar>
                <Snackbar open={modalStatusSuccess} autoHideDuration={6000} onClose={() => setModalStatusSuccess(false)}>
                    <Alert elevation={6} variant="filled" onClose={() => setModalStatusSuccess(false)} severity="success">
                        {messageSuccess}
                    </Alert>
                </Snackbar>
            </React.Fragment>
        );
    }
}

export default ProjectDashboard
