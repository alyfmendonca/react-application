import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IfElse } from '../../../../components/If';
import { Save, Pending, Draft } from './style';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import DetailEvaluation from '../../SwornPremiatory/DetailEvaluation';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60%',
    height: '80%',
    overflow: 'overlay',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  title: {
    color: theme.palette.text.primary
  }
}));

const DetailFirstEvaluation = (props) => {
  const { project, userSworn } = props;

  console.log(project, userSworn);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  function UserList(props) {
    const { user } = props;
    const projectCurrent = project.three_evaluation?.filter(x => x.created_by == user._id)[0];
    
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
          <DetailEvaluation title={`${project.title} - ${user.name}`} project={project} evaluation={projectCurrent} handleClose={handleClose}/>
        </Modal>
        <TableCell align="center">
          {user.name}
        </TableCell>
        <TableCell align="center">
          <IfElse condition={project.three_evaluation?.filter(x => x.created_by == user._id).length > 0}
            True={
              <IfElse condition={projectCurrent?.status === 'CONCLUDED'}
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
          {projectCurrent?.nota || "Sem nota"}
        </TableCell>
        <TableCell align="center">
          <IfElse condition={projectCurrent?.nota}
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
    )
  }

  return (
    <Container>
      <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2 className={classes.title}>
              {project.title}
            </h2>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Jurado</TableCell>
                  <TableCell align="center">Status avaliação</TableCell>
                  <TableCell align="center">Nota</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userSworn.filter(x => project.sworn_premiatory_end.includes(x._id)).map(user => (
                  <UserList user={user} />
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    </Container >
  )
}

export default DetailFirstEvaluation;