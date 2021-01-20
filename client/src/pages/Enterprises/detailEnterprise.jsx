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

const DetailEnterprise = (props) => {
  const { enterprise, creator } = props;

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
              {enterprise.name_enterprise}
            </h2>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>NOME FANTASIA</strong></p>
            <p>{enterprise.enterprise_fancy}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CNPJ</strong></p>
            <p>{enterprise.cnpj}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>ASSOCIADO</strong></p>
            <p>{enterprise.aberje_associate}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>PROJETO</strong></p>
            <p>{enterprise.qtd_projects}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>E-MAIL</strong></p>
            <p>{enterprise.email}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CELULAR</strong></p>
            <p>{enterprise.phone}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CEP</strong></p>
            <p>{enterprise.cep}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>ENDEREÇO</strong></p>
            <p>{enterprise.address}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>BAIRRO</strong></p>
            <p>{enterprise.neighborhood}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>CIDADE</strong></p>
            <p>{enterprise.city}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>COMPLEMENTO</strong></p>
            <p>{enterprise.address_complement}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>OBSERVAÇÃO</strong></p>
            <p>{enterprise.observation}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.subtitle}><strong>REGISTRADO POR</strong></p>
            <p>{enterprise.name}</p>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default DetailEnterprise;