import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import Title from '../../../components/material/Title';
import { IfElse } from '../../../components/If';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import history from "../../../history"
import { Save, Pending, Draft } from './style';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DescriptionIcon from '@material-ui/icons/Description';
import DetailEvaluation from './DetailEvaluation';

const useRowStyles = makeStyles(theme => ({
    buttonApprove: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.primary.main
    }
}));

const SwornDashboard = () => {
    const classes = useRowStyles();
    const user = useStoreState(state => state.auth.auth.user);
    const getUserById = useStoreActions(actions => actions.user.getUserById);
    const projects = useStoreState(state => state.project.allProjects);
    const getAllProjects = useStoreActions(state => state.project.getAllProjects);
    let projectsFilter = [];
    let notAllowed = false;

    useEffect(() => {
        getUserById(user.id).then(result => {
            if (result === undefined) return
            if (result.premiatoryTerm !== true)
                return history.push(`/dashboard/jurado/termos`)
        })
        getAllProjects('')
    }, [getUserById, user, getAllProjects])

    if (user.type === 'swornpremiatory') {
        projectsFilter = projects.filter(project => project.sworn_premiatory.includes(user.id));
    } else if (user.type === 'admin') {
        projectsFilter = projects;
    } else {
        notAllowed = true;
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Title style={{ textAlign: 'left', fontSize: 24, marginBottom: 20, marginTop: 30 }}>
                        DASHBOARD DE JURADO PREMIATÓRIA
                    </Title>
                </Grid>

                <IfElse condition={notAllowed}
                    True={
                        <Grid item xs={12}>
                            <p>ACESSO NEGADO</p>
                        </Grid>
                    }
                    False={
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">ID</TableCell>
                                            <TableCell align="center">NOME DA EMPRESA</TableCell>
                                            <TableCell align="center">NOME DO PROJETO</TableCell>
                                            <TableCell align="center">STATUS</TableCell>
                                            <TableCell align="center">REGIÃO</TableCell>
                                            <TableCell align="center">CATEGORIA</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectsFilter.sort((a, b) => a.project_region < b.project_region ? -1 : a.project_region > b.project_region ? 1 : 0).map(project => <Projects project={project} />)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    }
                />
            </Grid>
        </Container>
    )

    function Projects(props) {
        const project = props.project;
        const [openModal, setOpenModal] = React.useState(false);

        const handleOpen = () => {
            setOpenModal(true);
        };

        const handleClose = () => {
            setOpenModal(false);
        };
        return (
            <TableRow>
                <Modal
                    open={openModal}
                    onClose={handleClose}>
                    <DetailEvaluation project={project} evaluation={project.second_evaluation?.filter(x => x.created_by == user.id)[0]} />
                </Modal>
                <TableCell align="center">
                    {project.payment_identifier}
                </TableCell>
                <TableCell align="center">
                    {project.enterprise.enterprise_name}
                </TableCell>
                <TableCell align="center">
                    {project.title}
                </TableCell>
                <TableCell align="center">
                    <IfElse condition={project.second_evaluation?.filter(x => x.created_by == user.id).length > 0}
                        True={
                            <IfElse condition={project.second_evaluation?.filter(x => x.created_by == user.id)[0]?.status === 'CONCLUDED'}
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
                    {project.project_region}
                </TableCell>
                <TableCell align="center">
                    {project.category}
                </TableCell>
                <TableCell align="center">
                    <IfElse condition={project.second_evaluation?.filter(x => x.created_by == user.id)[0]?.status === 'CONCLUDED'}
                        True={<>
                            <IconButton onClick={handleOpen} size="medium" style={{ marginRight: 23 }}>
                                <DescriptionIcon />
                            </IconButton></>}
                        False={
                            <Link to={`/projeto/${project._id}`}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.buttonApprove}>
                                    Avaliar
                            </Button>
                            </Link>
                        }
                    />
                </TableCell>
            </TableRow>
        )
    }
}

export default SwornDashboard