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
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import DetailEvaluation from './DetailEvaluation';

let allUserSworn = [];

const ProjectDashboard = () => {

    const allProjects = useStoreState(state => state.project.allProjects);
    const getAllProjects = useStoreActions(state => state.project.getAllProjects);
    const defineSwornPremiatoryToProject = useStoreActions(actions => actions.project.defineSwornPremiatoryToProject);
    const getAllUsers = useStoreActions(actions => actions.user.getAllUsers);

    const user = useStoreState(state => state.auth.auth.user);

    useEffect(() => {
        getAllUsers()
            .then((res) => {
                allUserSworn = (res.data).filter(user => user.type === 'swornpremiatory');
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
            project_region: project.project_region,
            category: project.category,
            sworn_id: project.sworn_id || null,
            sworn_premiatory: project.sworn_premiatory || [],
            second_evaluation: project.second_evaluation || [],
        }
    })

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
                                    <TableCell align="center">JURADOS</TableCell>
                                    <TableCell></TableCell>
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
        const [sworn, setSworn] = React.useState(["nenhum"]);
        const [modalStatusSuccess, setModalStatusSuccess] = React.useState(false);
        const [modalStatusError, setModalStatusError] = React.useState(false);

        const [messageSuccess, setMessageSuccess] = React.useState('')
        const [messageError, setMessageError] = React.useState('')

        const [openModal, setOpenModal] = React.useState(false);

        const handleOpen = () => {
            setOpenModal(true);
        };

        const handleClose = () => {
            setOpenModal(false);
        };

        useEffect(() => {
            if (project.sworn_premiatory.length !== 0)
                setSworn(project.sworn_premiatory);
        }, []);

        const defineSworn = (event) => {
            const swornList = event.target.value;
            defineSwornPremiatoryToProject({ id: project.id, sworn_premiatory: swornList.filter(x => x !== "nenhum") }).then((res) => {
                if (swornList.length !== 0)
                    setSworn(swornList.filter(x => x !== "nenhum"))
                else
                    setSworn(["nenhum"])

                setMessageSuccess('Jurado atualizado para o projeto');
                setModalStatusSuccess(true);
            }).catch((err) => {
                setMessageError('Erro ao atualizar jurado para o projeto');
                setModalStatusError(true);
                console.log(err);
            });

        };

        return (
            <React.Fragment>
                <Modal
                    open={openModal}
                    onClose={handleClose}>
                    <DetailEvaluation project={project} userSworn={[...allUserSworn]}/>
                </Modal>
                <TableRow>
                    <TableCell align="center">
                        {user.type === 'admin' && (
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
                        {project.payment_identifier}
                    </TableCell>
                    <TableCell align="center">
                        {project.project_region}
                    </TableCell>
                    <TableCell align="center">
                        {project.category}
                    </TableCell>
                    <TableCell align="left" width={"30%"}>
                        <FormControl style={{ width: '100%' }}>
                            <Select
                                value={sworn}
                                displayEmpty
                                disabled={user.type === 'Auditor'}
                                multiple
                                onChange={defineSworn}>
                                <MenuItem value="nenhum" disabled>Selecione</MenuItem>
                                {allUserSworn.map((user) => (
                                    <MenuItem key={user._id} value={user._id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">
                        <IconButton size="small" onClick={handleOpen}>
                            <RemoveRedEyeIcon />
                        </IconButton>
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
