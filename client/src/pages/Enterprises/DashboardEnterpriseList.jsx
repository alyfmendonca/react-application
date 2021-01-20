import React, { useEffect, useState } from 'react';
import { DashboardWrapper } from './style';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { useStoreActions } from 'easy-peasy';
import DashboardProjectList from '../Project/DashboardProjectList';

const DashboardEnterpriseList = ({ enterprises, canRegisterNewProject, setDashboardProjects }) => {
    const [showProjectsList, setShowProjectsList] = useState([])
    const [allProjects, setAllProjects] = useState([])
    const getProjects = useStoreActions(state => state.project.getAllProjects)

    useEffect(() => {
        setDashboardProjects(0);
        enterprises.map(async ({ _id }) => {
            if(allProjects.length) return;
            const response = await getProjects(_id);
           setAllProjects((state) => [...state, ...response])
           setDashboardProjects((state) => response.length + state);
        });
    }, []);

    if (!enterprises.length) {
        return (
            <div style={{ height: '100%', textAlign: 'center' }}>
                Você não possui empresas cadastradas
            </div>
        )
    }
    const handleShowProjects = (index) => setShowProjectsList((state) => showProjectsList.includes(index) ? state.filter((item) => item !== index) : state.concat(index));

    return enterprises.map(({ enterprise_name, _id: id, }, index) => {
        console.log(allProjects)
        const filteredProject = allProjects.filter((project) => project.enterprise_id === id);
        const shouldExpandProjects = showProjectsList.includes(index);
        return (
            <DashboardWrapper showProjects={shouldExpandProjects} childrenLength={filteredProject.length}>
                <div>
                    <h4>{enterprise_name}</h4>
                    <div>
                        {!canRegisterNewProject && (
                            <Link to={{
                                pathname: '/cadastro/projeto',
                                state: { enterprise_id: id }
                            }}>
                                <Button>
                                    Criar projeto
                                </Button>
                            </Link>
                        )}
                        {filteredProject.length > 0 && (
                            <Button onClick={() => handleShowProjects(index)}>
                                {shouldExpandProjects ? "Esconder Projeos" : "Mostrar projetos"}
                            </Button>
                        )}
                    </div>
                </div>
                {filteredProject !== undefined && (
                    <div className="projects-wrapper">
                        <h2>Projetos desta empresa</h2>
                        <DashboardProjectList projects={filteredProject} />
                    </div>
                )}
            </DashboardWrapper>
        )
    });
};

export default React.memo(DashboardEnterpriseList);