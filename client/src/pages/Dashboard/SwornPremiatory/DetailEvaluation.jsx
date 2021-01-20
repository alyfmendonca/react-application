import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { IfElse } from '../../../components/If';
import CategoryForm from '../../Project/SecondEvaluationCategory';
import Button from '@material-ui/core/Button';

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
  },
  subtitle: {
    fontSize: 15,
    color: theme.palette.text.primary,
    marginTop: 0
  }
}));

const DetailFirstEvaluation = (props) => {
  const { project, evaluation, title, handleClose } = props;
  const FormList = CategoryForm()[project.category];


  console.log(evaluation, FormList);

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

  return (
    <Container>
      <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2 className={classes.title}>
              {title ? title : project.title}
            </h2>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p className={classes.subtitle}><strong>O projeto está inscrito na categoria correta?</strong></p>
                <p>{evaluation.correct_category ? 'Sim' : 'Não'}</p>
              </Grid>
              <IfElse condition={!evaluation.correct_category}
                True={
                  <Grid item xs={6}>
                    <p className={classes.subtitle}><strong>Justifique</strong></p>
                    <p>{evaluation.justify_no_correct_category}</p>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
              <Grid item xs={12}>
                {
                  FormList.map(x => (
                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                      <Grid item xs={4}>
                        <p className={classes.subtitle}><strong>{x.title}</strong></p>
                      </Grid>
                      <Grid item xs={4}>
                        <p style={{ marginTop: 0 }}>{evaluation[x.name] === 'YES' ? 'Cumpre totalmente' : evaluation[x.name] === 'NO' ? 'Cumpre parcialmente' : 'Não cumpre'}</p>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <IfElse condition={evaluation.comments != ""}
                True={
                  <Grid item xs={6}>
                    <p className={classes.subtitle}><strong>Observações</strong></p>
                    <p>{evaluation.comments}</p>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2em" }}>
              <IfElse condition={evaluation.nota != undefined}
                True={
                  <Grid item xs={6}>
                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                      <Grid item xs={1}>
                        <p className={classes.subtitle}><strong>Nota:</strong></p>
                      </Grid>
                      <Grid item xs={4}>
                        <p style={{ marginTop: 0 }}>{evaluation.nota}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "2em" }}>
              <IfElse condition={evaluation.notaApresentacao != undefined}
                True={
                  <Grid item xs={6}>
                    <Grid container spacing={3} style={{ alignItems: "center" }}>
                      <Grid item xs={3}>
                        <p className={classes.subtitle}><strong>Nota da Apresentação:</strong></p>
                      </Grid>
                      <Grid item xs={4}>
                        <p style={{ marginTop: 0 }}>{evaluation.notaApresentacao}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
            </Grid>
          </Grid>
          <IfElse condition={handleClose}
            True={
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose}
                className={classes.buttonApprove}>
                Fechar
                 </Button>
            }
            False={
              <span></span>
            }
          />
        </Grid>
      </div>
    </Container>
  )
}

export default DetailFirstEvaluation;