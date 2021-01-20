import React, { useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { IfElse } from '../../components/If';
import Button from '@material-ui/core/Button';
import Category from './SecondEvaluationCategory';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DetailFirstEvaluation from '../Dashboard/Sworn/DetailFirstEvaluation';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import history from '../../history'

import { SecondEvaluationSubtitle } from './style';

const useRowStyles = makeStyles(theme => ({
    buttonSubmit: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.primary.main,
        marginTop: 40,
        marginLeft: 10
    },
    buttonDraft: {
        marginTop: 40
    }
}));

const SecondEvaluationProject = (props) => {
    const { project, user } = props;

    const { register, errors, handleSubmit, control } = useForm();
    const [draft, setDraft] = React.useState(false);
    const [completedEvaluation, setCompletedEvaluation] = React.useState('');
    const classes = useRowStyles();
    const setSecondEvaluationProject = useStoreActions(actions => actions.project.setThreeEvaluationProject);
    const evaluation = project.three_evaluation?.filter(x => x.created_by == user.id)[0]
    const [correctCategory, setCorrectCategory] = React.useState('');
    const [nota, setNota] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalStatusSuccess, setModalStatusSuccess] = React.useState(false);
    const [modalStatusError, setModalStatusError] = React.useState(false);

    const [messageSuccess, setMessageSuccess] = React.useState('')
    const [messageError, setMessageError] = React.useState('')

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (correctCategory == '')
            setCorrectCategory(evaluation?.correct_category === true ? 'true' : evaluation?.correct_category === false ? 'false' : '')
    })

    const onSubmit = (secondEvaluation) => {
        secondEvaluation.correct_category = secondEvaluation.correct_category === 'true' ? true : false;

        secondEvaluation.id = project._id;
        secondEvaluation.created_by = user.id;
        secondEvaluation.updated_at = Date.now();

        const evaluation = {
            id: project._id,
            three_evaluation: secondEvaluation
        }

        if (!draft)
            secondEvaluation.status = 'CONCLUDED'
        else
            secondEvaluation.status = 'DRAFT'

        setSecondEvaluationProject(evaluation).then(result => {
            if (!draft) {
                setCompletedEvaluation(true);
                setMessageSuccess('Avaliação salva com sucesso!');
                setModalStatusSuccess(true);
            } else {
                setMessageSuccess('Avaliação salva como rascunho!');
                setModalStatusSuccess(true);
            }
            setTimeout(() => history.push(`/dashboard/jurado/premiatoriaFinal`), 5000)
        }).catch((err) => {
            setMessageError('Houve um erro ao salvar, tente novamente.');
            setModalStatusError(true);
            console.log(err);
        });
    }

    return (
        <IfElse condition={project._id}
            True={
                <Container>
                    <br /><br />
                    <Divider />
                    <br /><br />
                    <Typography variant="h2" style={{ fontWeight: 'bold' }}>ETAPA: PREMIATÓRIA</Typography>
                    <Typography variant="h2" style={{ fontWeight: 'bold' }}>{project.category}</Typography>
                    <Modal
                        open={openModal}
                        onClose={handleClose}>
                        <DetailFirstEvaluation project={project} />
                    </Modal>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen()}
                        className={classes.buttonSubmit}>
                        Ver Ficha Triagem - Primeira avaliação
                    </Button>
                    <Grid container spacing={3} style={{ display: "block" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid item xs={12}>
                                <SecondEvaluationSubtitle>O Projeto está inscrito na categoria correta?</SecondEvaluationSubtitle>
                                <FormControl error={errors?.correct_category} component="fieldset" style={{ width: '100%' }}>
                                    <Controller as={
                                        <RadioGroup>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <FormControlLabel
                                                        value="true"
                                                        onChange={(e) => {
                                                            setCorrectCategory(e.target.value)
                                                            console.log()
                                                        }}
                                                        control={<Radio />}
                                                        label="Sim" />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControlLabel
                                                        value="false"
                                                        onChange={(e) => setCorrectCategory(e.target.value)}
                                                        control={<Radio />}
                                                        label="Não" />
                                                </Grid>
                                            </Grid>
                                        </RadioGroup>
                                    }
                                        name="correct_category"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={evaluation?.correct_category === true ? 'true' : evaluation?.correct_category === false ? 'false' : ''}
                                    />
                                    <FormHelperText>{errors?.correct_category ? 'Campo obrigatório' : ''}</FormHelperText>
                                </FormControl>

                                <IfElse condition={correctCategory === 'false'}
                                    True={
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    style={{ width: '100%', marginTop: 20 }}
                                                    variant="filled"
                                                    multiline
                                                    rows={4}
                                                    label="Justifique:"
                                                    defaultValue={evaluation?.justify_no_correct_category}
                                                    name="justify_no_correct_category"
                                                    error={errors.justify_no_correct_category && errors.justify_no_correct_category.message}
                                                    helperText={errors.justify_no_correct_category && errors.justify_no_correct_category.message}
                                                    inputRef={register({
                                                        required: 'Campo obrigatório'
                                                    })}
                                                />
                                            </Grid>
                                        </Grid>
                                    }
                                    False={
                                        <span></span>
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SecondEvaluationSubtitle>Critérios de avaliação</SecondEvaluationSubtitle>
                                {Category(evaluation, errors)[project.category]?.map(a => (
                                    <Grid container spacing={3} style={{ display: "flex", alignItems: "center" }}>
                                        <Grid item xs={4}>
                                            <p>{a.title}</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FormControl error={a.errros} component="fieldset" style={{ width: '100%' }}>
                                                <Controller
                                                    as={
                                                        <RadioGroup>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={4}>
                                                                    <FormControlLabel
                                                                        value="YES"
                                                                        control={<Radio />}
                                                                        label="Cumpre totalmente" />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <FormControlLabel
                                                                        value="NO"
                                                                        control={<Radio />}
                                                                        label="Cumpre parcialmente" />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <FormControlLabel
                                                                        value="NOT_APPLICABLE"
                                                                        control={<Radio />}
                                                                        label="Não cumpre" />
                                                                </Grid>
                                                            </Grid>
                                                        </RadioGroup>
                                                    }
                                                    name={a.name}
                                                    control={control}
                                                    defaultValue={a.defaultValue}
                                                    rules={{ required: true }}

                                                />
                                                <FormHelperText>{a.errors ? 'Campo obrigatório' : ''}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        style={{ width: '100%', marginTop: 20 }}
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        label="Observações:"
                                        defaultValue={evaluation?.comments}
                                        name="comments"
                                        error={errors.comments && errors.comments.message}
                                        helperText={errors.comments && errors.comments.message}
                                        inputRef={register({
                                            required: 'Campo obrigatório'
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        style={{ width: '100%', marginTop: 20 }}
                                        label="Nota final da leitura do projeto e defesa oral:"
                                        onInput={({ target }) => {
                                            const number = target.value.replace(/\D/g, '').replace(/(\d{1})(\d)/, '$1,$2').replace(/(,\d{1})\d+?$/, '$1')
                                            if (parseFloat(number) < 10 && target.value != "1,00")
                                                target.value = number
                                            else {
                                                if (String(target.value).length > 2)
                                                    target.value = "10,0"
                                            }
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: 10, min: 0.0
                                            }
                                        }}
                                        defaultValue={evaluation?.nota}
                                        name="nota"
                                        error={errors.nota && errors.nota.message}
                                        helperText={errors.nota && errors.nota.message}
                                        inputRef={register({
                                            required: 'Campo obrigatório'
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'right' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setDraft(true)}
                                    disabled={evaluation?.status === 'CONCLUDED' || completedEvaluation}
                                    className={classes.buttonDraft}>
                                    Salvar como rascunho
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setDraft(false)}
                                    className={classes.buttonSubmit}>
                                    Submeter avaliação
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
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
                </Container>
            }
            False={<span></span>}
        />
    )
}


export default SecondEvaluationProject