import React, { useEffect } from "react"
import { useStoreState, useStoreActions } from 'easy-peasy'
import Alert from '@material-ui/lab/Alert'

import { Container, Group, Background } from './style'
import { IfElse } from '../../components/If'
import Tables from '../../components/material/Tables';

const headCells = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Título' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Categoria' },
  { id: 'project_region', numeric: false, disablePadding: false, label: 'Região' },
  { id: 'video', numeric: false, disablePadding: false, label: 'Vídeo Case' },

];


const ProjectList = ({ match }) => {
  const projects = useStoreState(state => state.project.projects)
  const getAllProjects = useStoreActions(actions => actions.project.getAllProjects)

  useEffect(() => {
    const id = match.params && match.params.id
    getAllProjects(id)
  }, [getAllProjects, match.params])

  return (
    <Background>
      <Container>
        <Group>
          <IfElse
            condition={typeof projects !== 'undefined' && projects.length > 0}
            True={
              <Tables
                title="Projetos"
                headCells={headCells}
                list={projects}
              />
            }
            False={
              <Alert severity="warning">Não há projetos cadastrados.</Alert>
            }
          />
        </Group>
      </Container>
    </Background>
  )
}

export default ProjectList
