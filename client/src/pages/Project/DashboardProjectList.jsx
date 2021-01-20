import React from 'react';
import { ProjectStatusTag, ProjectListItemContainer } from './style';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const DashboardProjectList = ({ projects }) => (
    <div className="project-list" style={{display: "flex", flexDirection:"column"}}>
        {projects.map((project) => (
                <ProjectListItemContainer style={{ marginBottom: 10 }} className="wrapper" key={project._id}>
                        <div className="tags">
                            {/* {project.draft && (
                                <Link to={`/projeto/editar/${project._id}`}>
                                    <ProjectStatusTag color='orange'>
                                        Clique para terminar o cadastro
                                    </ProjectStatusTag>
                                </Link>
                            )} */}
                            <Link to={project.complet_project && `/projeto/${project._id}`}>
                                <ProjectStatusTag color={project.draft ? 'orange' : 'green'}>
                                    {project.draft ? 'Rascunho' : 'Completo - Clique para visualizar'}
                                </ProjectStatusTag>
                            </Link>
                            {/* <ProjectStatusTag color={project.paid ? 'green' : 'red'}>
                                {project.paid ? 'Pagamento realizado' : 'Aguardando o pagamento'}
                            </ProjectStatusTag> */}
                        </div>
                        <Typography style={{ color: 'black', margin: '5px 5px 10px 5px'}}>{project.title}</Typography>
                </ProjectListItemContainer>

        ))}
    </div>
);

export default DashboardProjectList;