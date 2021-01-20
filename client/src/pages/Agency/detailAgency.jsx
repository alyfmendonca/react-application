import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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

const DetailAgency = (props) => {
  const { row } = props;
  const agency = row.agency;

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
              {agency.name_agency}
            </h2>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>NOME FANTASIA</strong></p>
            <p>{agency.agency_fancy}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CNPJ</strong></p>
            <p>{agency.cnpj}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>ASSOCIADO</strong></p>
            <p>{agency.aberje_associate ? "SIM" : "NÃO"}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>PROJETOS</strong></p>
            <p>{agency.qtd_projects}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>E-MAIL</strong></p>
            <p>{row.email}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CELULAR</strong></p>
            <p>{row.phone}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CEP</strong></p>
            <p>{agency.cep}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>ENDEREÇO</strong></p>
            <p>{agency.address}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>BAIRRO</strong></p>
            <p>{agency.neighborhood}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CIDADE</strong></p>
            <p>{agency.city}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>COMPLEMENTO</strong></p>
            <p>{agency.address_complement}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>OBSERVAÇÃO</strong></p>
            <p>{agency.observation}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>REGISTRADO POR</strong></p>
            <p>{row.name}</p>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default DetailAgency;