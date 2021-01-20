import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom';
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Title from '../../../components/material/Title';
import Switch from '../../../components/material/Switch';
import Button from '@material-ui/core/Button';
import history from "../../../history"

const SwornTerm = () => {
    const user = useStoreState(state => state.auth.auth.user);
    const editUser = useStoreActions(actions => actions.user.editUser)

    const { register, errors, watch } = useForm()

    useEffect(() => {
        if (user.type === undefined)
            return;

        if (user.type !== "swornpremiatoryend") {
            return history.push(`/dashboard`)
        } else {
            if (user.premiatoryTerm === true)
                return history.push(`/dashboard/jurado/premiatoria/final`)
        }

    }, [user])

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
                        Como jurado(a), componente da Comissão Julgadora, comprometo-me a atuar com isenção, imparcialidade, razoabilidade e de acordo com os critérios estabelecidos no Regulamento da 46ª edição do Prêmio Aberje, consultando-o durante o julgamento.
                    </p>
                    <p>
                        Declaro não ter qualquer impedimento ou conflito de interesse que possa afetar minha necessária imparcialidade no processo de julgamento. Na hipótese de constatação de conflito de interesse ou quaisquer vícios que comprometam a lisura ou a isenção de meu julgamento, ocorrendo a responsabilização da ABERJE em eventual demanda indenizatória, a Aberje estará autorizada a denunciar a lide com fundamento no artigo 70, inciso III do Código de Processo Civil Brasileiro.
                    </p>
                    <p>
                        Comprometo-me, a NÃO salvar os arquivos expostos nesta ferramenta, e não compartilhá-los para uso pessoal, para fins acadêmicos ou quaisquer outros.
                    </p>
                    <p>
                        Comprometo também, a não postar comentários e/ou fotos nas redes sociais referentes aos projetos que julguei no Prêmio Aberje, e ainda informar à Aberje sobre qualquer irregularidade, impedimento ou conflito de interesse que eventualmente venha tomar conhecimento.
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            const response = await editUser({ ...user, premiatoryTerm: watch('agree'), id: user.id });
                            history.push(`/dashboard/jurado/premiatoria/final`)
                        }}
                        disabled={!watch('agree')}
                    >
                        Próximo
                    </Button>
                </Grid>
            </Grid>
        </Container >
    )
}

export default SwornTerm