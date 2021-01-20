import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';

import { Link } from 'react-router-dom';
import { Save, Pending, Draft } from './style';

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
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import DetailFirstEvaluation from './DetailFirstEvaluation';

const useRowStyles = makeStyles(theme => ({
    buttonApprove: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.primary.main
    }
}));

const SwornDashboard = () => {
    const classes = useRowStyles();
    const user = useStoreState(state => state.auth.auth.user);
    const projects = useStoreState(state => state.project.allProjects);
    const getAllProjects = useStoreActions(state => state.project.getAllProjects);
    let projectsFilter = [];
    let notAllowed = false;

    useEffect(() => {
        getAllProjects('')
    }, [getAllProjects])

    if (user.type === 'sworn') {
        projectsFilter = projects.filter(project => project.sworn_id === user.id);
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
                        DASHBOARD DE JURADO
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
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectsFilter.map((row) => (
                                            <Row project={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    }
                />
            </Grid>
        </Container>
    )

    function Row(props) {
        const { project } = props;
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
                    <DetailFirstEvaluation project={project} />
                </Modal>
                <TableRow>
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
            </React.Fragment>
        )
    }
}

export default SwornDashboard