import React from "react";
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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';
import history from '../../history'
import { FirstEvaluationSubtitle } from './style';

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

const FirstEvaluationProject = (props) => {
    const { project } = props;
    const { user } = props;
    const [completedEvaluation, setCompletedEvaluation] = React.useState('');
    const classes = useRowStyles();
    const { register, errors, handleSubmit, control } = useForm();


    const [modalStatusSuccess, setModalStatusSuccess] = React.useState(false);
    const [modalStatusError, setModalStatusError] = React.useState(false);

    const [messageSuccess, setMessageSuccess] = React.useState('')
    const [messageError, setMessageError] = React.useState('')
    const [realizedInPeriod, setRealizedInPeriod] = React.useState('');
    const [registeredCorrectRegion, setRegisteredCorrectRegion] = React.useState('');
    const [correctCategory, setCorrectCategory] = React.useState('');
    const [hasEqualProjects, setHasEqualProjects] = React.useState('');
    const [draft, setDraft] = React.useState(false);
    const setFirstEvaluationToProject = useStoreActions(actions => actions.project.setFirstEvaluationToProject);


    const onSubmit = (firstEvaluation) => {

        firstEvaluation.correct_category = firstEvaluation.correct_category === 'true' ? true : false;
        firstEvaluation.fits_the_prize = firstEvaluation.fits_the_prize === 'true' ? true : false;
        firstEvaluation.has_equal_projects = firstEvaluation.has_equal_projects === 'true' ? true : false;
        firstEvaluation.realized_in_period = firstEvaluation.realized_in_period === 'true' ? true : false;
        firstEvaluation.registered_correct_region = firstEvaluation.registered_correct_region === 'true' ? true : false;

        if (firstEvaluation.registered_correct_region) {
            firstEvaluation.ideal_region = '';
        } else {
            firstEvaluation.option_correct_region = '';
        }

        if (firstEvaluation.correct_category) {
            firstEvaluation.justify_no_correct_category = '';
        }

        if (!firstEvaluation.has_equal_projects) {
            firstEvaluation.id_project_equal = '';
        }

        firstEvaluation.id = project._id;
        firstEvaluation.created_by = user.id;
        firstEvaluation.updated_at = Date.now();

        if(draft) {
            firstEvaluation.status = 'DRAFT'
        } else {
            firstEvaluation.status = 'CONCLUDED'
        }

        const evaluation = {
            id: project._id,
            first_evaluation: firstEvaluation
        }

        setFirstEvaluationToProject(evaluation)
            .then((res) => {
                if (!draft) {
                    setCompletedEvaluation(true);
                    setMessageSuccess('Triagem salva com sucesso!');
                    setModalStatusSuccess(true);
                    history.push(`/dashboard/jurado/premiatoria`)
                }else{
                    setMessageSuccess('Triagem salva como rascunho!');
                    setModalStatusSuccess(true);
                }
            }).catch((err) => {
                setMessageError('Houve um erro ao salvar a triagem, tente novamente.');
                setModalStatusError(true);
                console.log(err);
            });
    }

    return (
        <IfElse condition={project._id}
            True={
                <Container>
                    <Grid container spacing={3}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid item xs={12}>
                                <br /><br />
                                <Divider />
                                <br /><br />
                                <Typography variant="h2" style={{ fontWeight: 'bold' }}>Triagem</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FirstEvaluationSubtitle>O Projeto se enquadra no objetivo do Prêmio Aberje?</FirstEvaluationSubtitle>
                                <p style={{ textAlign: 'left' }}>(Fortalecer a visão estratégica da comunicação de empresas e instituições por meio do estímulo, do reconhecimento e da divulgação de esforços e de iniciativas na área da comunicação e dos relacionamentos)</p>

                                <FormControl error={errors?.fits_the_prize} component="fieldset" style={{ width: '100%' }}>
                                    <Controller
                                        as={
                                            <RadioGroup>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio
                                                            />}
                                                            label="Sim" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            value="false"
                                                            control={<Radio
                                                            />}
                                                            label="Não" />
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        }
                                        name="fits_the_prize"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={project?.first_evaluation?.fits_the_prize === true ? 'true' : project?.first_evaluation?.fits_the_prize === false ? 'false' : ''}
                                    />
                                    <FormHelperText>{errors?.fits_the_prize ? 'Campo obrigatório' : ''}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FirstEvaluationSubtitle>O Projeto foi realizado no período entre 1º de janeiro de 2019 a 06 de agosto de 2020?</FirstEvaluationSubtitle>
                                <FormControl error={errors?.realized_in_period} component="fieldset" style={{ width: '100%' }}>
                                    <Controller
                                        as={
                                            <RadioGroup>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            onChange={(e) => setRealizedInPeriod(e.target.value)}
                                                            value="true"
                                                            control={<Radio />}
                                                            label="Sim" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            onChange={(e) => setRealizedInPeriod(e.target.value)}
                                                            value="false"
                                                            control={<Radio />}
                                                            label="Não" />
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        }
                                        name="realized_in_period"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={project?.first_evaluation?.realized_in_period === true ? 'true' : project?.first_evaluation?.realized_in_period === false ? 'false' : ''}
                                    />
                                    <FormHelperText>{errors?.realized_in_period ? 'Campo obrigatório' : ''}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <IfElse condition={realizedInPeriod === 'false' || project?.first_evaluation?.realized_in_period === false}
                                True={
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                style={{ width: '100%', marginTop: 20 }}
                                                variant="filled"
                                                multiline
                                                rows={4}
                                                defaultValue={project?.first_evaluation?.justify_no_realized_in_period}
                                                label="Justifique:"
                                                name="justify_no_realized_in_period"
                                                error={errors.justify_no_realized_in_period && errors.justify_no_realized_in_period.message}
                                                helperText={errors.justify_no_realized_in_period && errors.justify_no_realized_in_period.message}
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
                            <Grid item xs={12}>
                                <FirstEvaluationSubtitle>O Projeto está inscrito na região correta?</FirstEvaluationSubtitle>
                                <FormControl error={errors?.registered_correct_region} component="fieldset" style={{ width: '100%' }}>

                                    <Controller
                                        as={
                                            <RadioGroup

                                            >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            onChange={(e) => setRegisteredCorrectRegion(e.target.value)}
                                                            value="true"
                                                            control={<Radio />}
                                                            label="Sim" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            onChange={(e) => setRegisteredCorrectRegion(e.target.value)}
                                                            value="false"
                                                            control={<Radio />}
                                                            label="Não" />
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        }
                                        name="registered_correct_region"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={project?.first_evaluation?.registered_correct_region === true ? 'true' : project?.first_evaluation?.registered_correct_region === false ? 'false' : ''}
                                    />
                                    <FormHelperText>{errors?.registered_correct_region ? 'Campo obrigatório' : ''}</FormHelperText>
                                </FormControl>


                                <IfElse condition={registeredCorrectRegion === 'true' || (project?.first_evaluation?.registered_correct_region === true && registeredCorrectRegion !== 'false')}
                                    True={
                                        <FormControl error={errors?.option_correct_region} component="fieldset" style={{ width: '100%', textAlign: 'left' }}>
                                            <p>Se enquadra em qual opção:</p>

                                            <Controller
                                                as={
                                                    <RadioGroup>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <FormControlLabel
                                                                    value="HEAD_OFFICE_REGION"
                                                                    control={<Radio />}
                                                                    label="Região em que foram realizadas as ações de maior relevância" />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <FormControlLabel
                                                                    value="REGION_RELEVANT_ACTIONS"
                                                                    control={<Radio />}
                                                                    label="Região onde está localizada a sede da empresa" />
                                                            </Grid>
                                                        </Grid>
                                                    </RadioGroup>
                                                }
                                                name="option_correct_region"
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={project?.first_evaluation?.option_correct_region}
                                            />
                                            <FormHelperText>{errors?.option_correct_region ? 'Campo obrigatório' : ''}</FormHelperText>
                                        </FormControl>
                                    }
                                    False={
                                        <span></span>
                                    }
                                />

                                <IfElse condition={registeredCorrectRegion === 'false' || project?.first_evaluation?.registered_correct_region === false}
                                    True={
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    style={{ width: '100%', marginTop: 20 }}
                                                    variant="filled"
                                                    label="Qual seria a região ideal?"
                                                    name="ideal_region"
                                                    defaultValue={project?.first_evaluation?.ideal_region}
                                                    error={errors.ideal_region && errors.ideal_region.message}
                                                    helperText={errors.ideal_region && errors.ideal_region.message}
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
                                <FirstEvaluationSubtitle>O Projeto está inscrito na categoria correta?</FirstEvaluationSubtitle>
                                <FormControl error={errors?.correct_category} component="fieldset" style={{ width: '100%' }}>

                                    <Controller
                                        as={
                                            <RadioGroup
                                                
                                            >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            value="true"
                                                            onChange={(e) => setCorrectCategory(e.target.value)}
                                                            control={<Radio />}
                                                            label="Sim" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            value="false"
                                                            onChange={(e) => setCorrectCategory(e.target.value)}
                                                            control={<Radio/>}
                                                            label="Não" />
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        }
                                        name="correct_category"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={project?.first_evaluation?.correct_category === true ? 'true' : project?.first_evaluation?.correct_category === false ? 'false' : ''}
                                    />
                                    <FormHelperText>{errors?.correct_category ? 'Campo obrigatório' : ''}</FormHelperText>
                                </FormControl>

                                <IfElse condition={correctCategory === 'false' || project?.first_evaluation?.correct_category === false}
                                    True={
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    style={{ width: '100%', marginTop: 20 }}
                                                    variant="filled"
                                                    multiline
                                                    rows={4}
                                                    label="Justifique:"
                                                    defaultValue={project?.first_evaluation?.justify_no_correct_category}
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
                                <FirstEvaluationSubtitle>Existem projetos considerados iguais em outra categoria e/ou região?</FirstEvaluationSubtitle>
                                <FormControl error={errors?.has_equal_projects} component="fieldset" style={{ width: '100%' }}>
                                    <Controller
                                        as={
                                            <RadioGroup>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            onChange={(e) => setHasEqualProjects(e.target.value)}
                                                            value="true"
                                                            control={<Radio />}
                                                            label="Sim" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControlLabel
                                                            onChange={(e) => setHasEqualProjects(e.target.value)}
                                                            value="false"
                                                            control={<Radio/>}
                                                            label="Não" />
                                                    </Grid>
                                                </Grid>
                                            </RadioGroup>
                                        }
                                        name="has_equal_projects"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={project?.first_evaluation?.has_equal_projects === true ? 'true' : project?.first_evaluation?.has_equal_projects === false ? 'false' : ''}
                                    />
                                    <FormHelperText>{errors?.has_equal_projects ? 'Campo obrigatório' : ''}</FormHelperText>
                                </FormControl>

                                <IfElse condition={hasEqualProjects === 'true' || project?.first_evaluation?.has_equal_projects == true}
                                    True={
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    style={{ width: '100%', marginTop: 20 }}
                                                    variant="filled"
                                                    label="Código do projeto"
                                                    name="id_project_equal"
                                                    defaultValue={project?.first_evaluation?.id_project_equal}
                                                    error={errors.id_project_equal && errors.id_project_equal.message}
                                                    helperText={errors.id_project_equal && errors.id_project_equal.message}
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
                                <FirstEvaluationSubtitle>O projeto cumpriu os itens da estrutura do case, que consta no regulamento?</FirstEvaluationSubtitle>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <p>Contexto</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl error={errors?.context} component="fieldset" style={{ width: '100%' }}>

                                            <Controller
                                                as={
                                                    <RadioGroup>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="YES"
                                                                    control={<Radio/>}
                                                                    label="Sim" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NO"
                                                                    control={<Radio/>}
                                                                    label="Não" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NOT_APPLICABLE"
                                                                    control={<Radio/>}
                                                                    label="Não se aplica" />
                                                            </Grid>
                                                        </Grid>
                                                    </RadioGroup>
                                                }
                                                name="context"
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={project?.first_evaluation?.context}
                                            />
                                            <FormHelperText>{errors?.context ? 'Campo obrigatório' : ''}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <p>Estratégia</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl error={errors?.strategy} component="fieldset" style={{ width: '100%' }}>

                                            <Controller
                                                as={
                                                    <RadioGroup>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="YES"
                                                                    control={<Radio/>}
                                                                    label="Sim" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NO"
                                                                    control={<Radio/>}
                                                                    label="Não" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NOT_APPLICABLE"
                                                                    control={<Radio/>}
                                                                    label="Não se aplica" />
                                                            </Grid>
                                                        </Grid>
                                                    </RadioGroup>
                                                }
                                                name="strategy"
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={project?.first_evaluation?.strategy}
                                            />
                                            <FormHelperText>{errors?.strategy ? 'Campo obrigatório' : ''}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <p>Comunicação / Ações</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl error={errors?.communication} component="fieldset" style={{ width: '100%' }}>

                                            <Controller
                                                as={
                                                    <RadioGroup>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="YES"
                                                                    control={<Radio/>}
                                                                    label="Sim" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NO"
                                                                    control={<Radio />}
                                                                    label="Não" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NOT_APPLICABLE"
                                                                    control={<Radio/>}
                                                                    label="Não se aplica" />
                                                            </Grid>
                                                        </Grid>
                                                    </RadioGroup>
                                                }
                                                name="communication"
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={project?.first_evaluation?.communication}
                                            />
                                            <FormHelperText>{errors?.communication ? 'Campo obrigatório' : ''}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <p>Evidências de Resultados</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl error={errors?.evidence_of_results} component="fieldset" style={{ width: '100%' }}>
                                            <Controller
                                                as={
                                                    <RadioGroup>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="YES"
                                                                    control={<Radio/>}
                                                                    label="Sim" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NO"
                                                                    control={<Radio/>}
                                                                    label="Não" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NOT_APPLICABLE"
                                                                    control={<Radio/>}
                                                                    label="Não se aplica" />
                                                            </Grid>
                                                        </Grid>
                                                    </RadioGroup>
                                                }
                                                name="evidence_of_results"
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={project?.first_evaluation?.evidence_of_results}
                                            />
                                            <FormHelperText>{errors?.evidence_of_results ? 'Campo obrigatório' : ''}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <p>Investimento</p>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl error={errors?.investment} component="fieldset" style={{ width: '100%' }}>
                                            <Controller
                                                as={
                                                    <RadioGroup>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="YES"
                                                                    control={<Radio />}
                                                                    label="Sim" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NO"
                                                                    control={<Radio/>}
                                                                    label="Não" />
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <FormControlLabel
                                                                    value="NOT_APPLICABLE"
                                                                    control={<Radio/>}
                                                                    label="Não se aplica" />
                                                            </Grid>
                                                        </Grid>
                                                    </RadioGroup>
                                                }
                                                name="investment"
                                                control={control}
                                                rules={{ required: true }}
                                                defaultValue={project?.first_evaluation?.investment}
                                            />
                                            <FormHelperText>{errors?.investment ? 'Campo obrigatório' : ''}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <FirstEvaluationSubtitle>Observações</FirstEvaluationSubtitle>
                                    <Grid container spacing={3}>

                                        <Grid item xs={12}>
                                            <TextField
                                                style={{ width: '100%', marginTop: 20 }}
                                                variant="filled"
                                                multiline
                                                rows={4}
                                                defaultValue={project?.first_evaluation?.final_obs}
                                                label="Observações:"
                                                name="final_obs"
                                                error={errors.final_obs && errors.final_obs.message}
                                                helperText={errors.final_obs && errors.final_obs.message}
                                                inputRef={register()}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} style={{textAlign: 'right'}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setDraft(true)}
                                    disabled={project?.first_evaluation?.status === 'CONCLUDED' || completedEvaluation}
                                    className={classes.buttonDraft}>
                                    Salvar como rascunho
                                </Button>

                                <Button
                                    onClick={() => setDraft(false)}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={project?.first_evaluation?.status === 'CONCLUDED' || completedEvaluation}
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
            False={
                <span></span>
            }
        />
    )
}

export default FirstEvaluationProject