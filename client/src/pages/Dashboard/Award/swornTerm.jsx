import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom';
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Title from '../../../components/material/Title';
import Switch from '../../../components/material/Switch';

const SwornTerm = () => {
    const user = useStoreState(state => state.auth.auth.user);
    const {
        register, handleSubmit, errors, setError,
        watch
      } = useForm()

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Title style={{ textAlign: 'left', fontSize: 24, marginBottom: 20, marginTop: 30 }}>
                        ETAPA: PREMIATÓRIA TERMO DE COMPROMISSO
                    </Title>
                </Grid>
            </Grid>
            <Grid>
                <Grid item xs={12}>
                    <p>
                        Jurado(a) componente da Comissão Julgadora comprometo-me a atuar com isenção, imparcialidade, razoabilidade e de acordo com os critérios estabelecidos no Regulamento da 46ª edição do Prêmio Aberje e no Guia do Jurado, consultado durante o julgamento.
                    </p>
                    <p>
                        Declaro não ter qualquer impedimento ou conflito de interesse que possa afetar minha necessária imparcialidade no processo de julgamento. Na hipótese de constatação de conflito de interesses ou quaisquer vícios que comprometam a lisura ou a isenção de meu julgamento, ocorrendo a responsabilização da ABERJE em eventual demanda indenizatória, a Aberje estará autorizada a denunciar a lide com fundamento no artigo 70, inciso III do Código de Processo Civil Brasileiro.
                    </p>
                    <p>
                        Comprometo-me, a não postar comentários e/ou fotos nas redes sociais referentes aos projetos que julguei no Prêmio Aberje, e ainda informar à Aberje sobre qualquer irregularidade, impedimento ou conflito de interesse que eventualmente venha tomar conhecimento.
                    </p>
                    <p>
                        São Paulo, Setembro de 2020.
                    </p>
                    <Switch
                        name="agree"
                        label="Estou de acordo"
                        register={register}
                        error={errors.agree && errors.agree.message}
                        required
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default SwornTerm