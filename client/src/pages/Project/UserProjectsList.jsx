import React, { useState } from 'react';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import DashboardProjectList from './DashboardProjectList';
import { Container, Typography, Grid } from '@material-ui/core'
import FormText from '../../components/material/FormText';

const UserProjectsList = ({ match }) => {
    const { id } = match.params;
    const allProjects = useStoreState(({ project }) => project.allProjects) || [];
    const getProjects = useStoreActions(state => state.project.getAllProjects)
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getProjects(id);
    }, [getProjects, id]);
    
    const filterCallback = (project) => project.title.toLowerCase().includes(searchValue);
    const filteredList = allProjects && allProjects.filter(filterCallback);

    return (
        <Container>
            <Typography variant="h3" style={{ textAlign: 'left', fontWeight: 'bold', margin: '20px 0px' }}>
                Todos os projetos
            </Typography>
            <Grid container xs={12} style={{ marginBottom: 20 }}>
                <FormText
                    label="Pesquisar projeto"
                    onChange={({ target }) => setSearchValue(target.value.toLowerCase())}
                />
            </Grid>
            <DashboardProjectList  projects={filteredList ? filteredList : allProjects}/>
        </Container>
    )
};

export default UserProjectsList;