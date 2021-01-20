import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { IfElse } from '../../../components/If';

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
  const { project, title } = props;


  console.log(project);

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
            <p className={classes.subtitle}><strong>O projeto se enquadra no objetivo do prêmio Aberje?</strong></p>
            <p>{project.first_evaluation.fits_the_prize ? 'Sim' : 'Não'}</p>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p className={classes.subtitle}><strong>O projeto foi realizado no período entre 1º de janeiro de 2019 a 06 de agosto de 2020?</strong></p>
                <p>{project.first_evaluation.realized_in_period ? 'Sim' : 'Não'}</p>
              </Grid>
              <IfElse condition={!project.first_evaluation.realized_in_period}
                True={
                  <Grid item xs={6}>
                    <p className={classes.subtitle}><strong>Justifique</strong></p>
                    <p>{project.first_evaluation.justify_no_realized_in_period}</p>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p className={classes.subtitle}><strong>O projeto está inscrito na região correta?</strong></p>
                <p>{project.first_evaluation.registered_correct_region ? 'Sim' : 'Não'}</p>
              </Grid>
              <IfElse condition={project.first_evaluation.registered_correct_region}
                True={
                  <Grid item xs={6}>
                    <p className={classes.subtitle}><strong>Se enquadra em qual opção:</strong></p>
                    <p>{project.first_evaluation.option_correct_region === 'HEAD_OFFICE_REGION' ? 'Região onde está localizada a sede da empresa' : 'Região em que foram realizadas as ações de maior relevância'}</p>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <p className={classes.subtitle}><strong>Existem projetos considerados iguais em outra categoria e/ou região?</strong></p>
                <p>{project.first_evaluation.has_equal_projects ? 'Sim' : 'Não'}</p>
              </Grid>
              <IfElse condition={project.first_evaluation.has_equal_projects}
                True={
                  <Grid item xs={6}>
                    <p className={classes.subtitle}><strong>Código do projeto</strong></p>
                    <p>{project.first_evaluation.id_project_equal}</p>
                  </Grid>
                }
                False={
                  <span></span>
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.subtitle}><strong>O projeto cumpriu os itens da estrutura do case, que consta no regulamento?</strong></p>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <p className={classes.subtitle}><strong>Contexto</strong></p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ marginTop: 0 }}>{project.first_evaluation.context === 'YES' ? 'Sim' : project.first_evaluation.context === 'NO' ? 'Não' : 'Não se aplica'}</p>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <p className={classes.subtitle}><strong>Estratégia</strong></p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ marginTop: 0 }}>{project.first_evaluation.strategy === 'YES' ? 'Sim' : project.first_evaluation.strategy === 'NO' ? 'Não' : 'Não se aplica'}</p>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <p className={classes.subtitle}><strong>Comunicação / Ações</strong></p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ marginTop: 0 }}>{project.first_evaluation.communication === 'YES' ? 'Sim' : project.first_evaluation.communication === 'NO' ? 'Não' : 'Não se aplica'}</p>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <p className={classes.subtitle}><strong>Evidências de Resultados</strong></p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ marginTop: 0 }}>{project.first_evaluation.evidence_of_results === 'YES' ? 'Sim' : project.first_evaluation.evidence_of_results === 'NO' ? 'Não' : 'Não se aplica'}</p>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <p className={classes.subtitle}><strong>Investimento</strong></p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ marginTop: 0 }}>{project.first_evaluation.investment === 'YES' ? 'Sim' : project.first_evaluation.investment === 'NO' ? 'Não' : 'Não se aplica'}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.subtitle}><strong>Observações</strong></p>
            <p>{project.first_evaluation.final_obs}</p>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default DetailFirstEvaluation;