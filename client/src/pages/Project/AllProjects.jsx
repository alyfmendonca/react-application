import React, { useEffect, useState } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Title from '../../components/material/Title'
import Button from '../../components/material/Button'
import FormText from '../../components/material/FormText'
import CardProject from '../../components/material/CardProject'

const AllProjects = ({ match }) => {
  const projects = useStoreState(state => state.project.projects)
  const getProject = useStoreActions(actions => actions.project.getAllProjects)
  const [projectList, setProjects] = useState([])
  const [projectFullList, setFullProjects] = useState([])

  useEffect(() => {
    const setProjectsState = async () => {
      const projects = await getProject(match.params.id)
      projectList.length === 0 && setProjects(projects.data)
      setFullProjects(projects.data)
    };
    setProjectsState()
  }, [getProject, projectList.length, match.params.id, projects])

  const handleText = event => {
    const lowerText = event.target.value.toLowerCase()
    const filterProjects = projectList.filter(project => project.title.toLowerCase().startsWith(lowerText))

    !lowerText || lowerText === "" ? setProjects(projectFullList) : setProjects(filterProjects)
  }

  return (
    <Container>
      <Title style={{ margin: '30px 0' }}>Todas as vagas</Title>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <a href="/dashboard/profissional">
            <Button
              variant="contained"
            >Voltar</Button>
          </a>
        </Grid>
        <Grid item xs={12}>
          <FormText
            label="Pesquisar por projeto"
            onChange={e => handleText(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {
          projectList.length > 0 ?
            (projectList.map(project => (
              <CardProject
                key={project._id}
                id={project._id}
                enterpriseName={project.enterprise_name || "Confidencial"}
                projectTitle={project.title}
                location={project.location}
                projectDescription={project.requirements}
              />
            ))) :
            <Grid item xs={12}>
              <Alert variant="filled" severity="warning">Desculpe! Não encontramos vagas</Alert>
            </Grid>
        }
      </Grid>
    </Container>
  )
}

export default AllProjects
