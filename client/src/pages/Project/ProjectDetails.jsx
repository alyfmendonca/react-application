import React, { useState } from 'react';
import Container from '@material-ui/core/Container'
import { Typography, Divider } from '@material-ui/core';
import { ProjectDetailsContainer, ProjectDetailSubtitle, ProjectDetailRegionContainer } from './style';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

import { IfElse } from '../../components/If';

import FirstEvaluationProject from './FirstEvaluationProject';
import SecondEvaluationProject from './SecondEvaluationProject';
import ThreeEvaluationProject from './ThreeEvaluationProject';

const ProjectDetails = ({ match }) => {
    const user = useStoreState(state => state.auth.auth.user);
    const [project, setProject] = useState({});
    const { id } = match.params;
    const getProject = useStoreActions(actions => actions.project.getProject);

    let showFirstEvaluation = false;
    let showSecondEvaluation = false;
    let showThreeEvaluation = false;

    useEffect(() => {
        getProject(id)
            .then(({ data }) => {
                setProject(data.project);
            })
            .catch((err) => console.log(err));
    }, [getProject, id]);

    if (user) {
        if (user.type === 'sworn' || user.type === 'admin') {
            showFirstEvaluation = true;
        }
        if (user.type === 'swornpremiatory' || user.type === 'admin') {
            showSecondEvaluation = true;
        }
        if (user.type === 'swornpremiatoryend' || user.type === 'admin') {
            showThreeEvaluation = true;
        }
    }

    const hasAttachments = Boolean(project.attachment);
    const hasOthersContacts = Boolean(project.others_contacts);
    const hasProjectCreators = Boolean(project.project_creators);
    return (
        <Container style={{ backgroundColor: 'white' }}>
            <ProjectDetailsContainer>
                <Typography variant="h5">Nome do projeto</Typography>
                <Typography variant="h2" style={{ fontWeight: 'bold' }}>{project.title}</Typography>
                <span> Inicio do Projeto: {project.total_period}</span>
                <ProjectDetailSubtitle>Descrição</ProjectDetailSubtitle>
                <Typography component="p" style={{ wordBreak: 'break-word' }}>{project.project_about}</Typography>
                <Divider />
                <ProjectDetailSubtitle>Categoria</ProjectDetailSubtitle>
                <Typography component="p" style={{ wordBreak: 'break-word' }}>{project.category}</Typography>
                <ProjectDetailSubtitle>Sobre a categoria</ProjectDetailSubtitle>
                <Typography component="p" style={{ wordBreak: 'break-word', marginBottom: 10 }}>{project.category_about}</Typography>
                <ProjectDetailRegionContainer>
                    <div>
                        <ProjectDetailSubtitle>Região</ProjectDetailSubtitle>
                        <Typography component="p">{project.project_region}</Typography>
                    </div>
                    <div>
                        <ProjectDetailSubtitle>Escolha da região</ProjectDetailSubtitle>
                        <Typography component="p">{project.region_choice}</Typography>
                    </div>
                </ProjectDetailRegionContainer>
                <ProjectDetailSubtitle>Arquivos</ProjectDetailSubtitle>
                {hasAttachments && project.attachment.map((attachment) => {
                    if (!attachment || !attachment.type) return null;
                    const isVideo = attachment.type.includes('video');
                    const isImg = attachment.type.includes('image');
                    if (String(attachment.name).toLowerCase().includes("autorização") && user.type === 'swornPremiatory') {
                        return <span></span>
                    }
                    if (isVideo) {
                        return (
                            <div style={{ marginBottom: 20 }}>
                                <Typography component="h4" style={{ wordBreak: 'break-word', marginBottom: 10 }}>{attachment.name}</Typography>
                                <video src={attachment.url} width="100%" height="400" controls />
                            </div>
                        )
                    }

                    if (isImg) {
                        return (
                            <div style={{ marginBottom: 20, textAlign: 'center' }}>
                                <p style={{ display: 'block' }}>Nome do arquivo: <b>{attachment.name}</b></p>
                                <a
                                    style={{
                                        wordBreak: 'break-word',
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                        margin: 20
                                    }}
                                    download
                                    href={attachment.url}
                                >
                                    <img src={attachment.url} style={{ maxWidth: '450px', width: '100%', height: '100%' }} alt={attachment.name} />
                                </a>
                            </div>
                        )
                    }
                    return (
                        <a
                            style={{
                                wordBreak: 'break-word',
                                fontSize: 24,
                                fontWeight: 'bold',
                                margin: 20
                            }}
                            target="_blank"
                            download
                            href={attachment.url}
                        >
                            {attachment.name}
                        </a>
                    )
                })}
                {hasProjectCreators && !showSecondEvaluation && !showThreeEvaluation && (
                    <>
                        <ProjectDetailSubtitle> Agência, assessoria, produta responsável pela criação e/ou produção do trabalho.</ProjectDetailSubtitle>
                        {project.project_creators.map((contact) => (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ margin: 10 }}>
                                    <span style={{ display: 'block', fontWeight: 'bold' }}>Razão Social</span>
                                    <span style={{ display: 'block' }}>{contact.agency_name}</span>
                                </div>
                                <div style={{ margin: 10 }}>
                                    <span style={{ display: 'block', fontWeight: 'bold' }}>Nome Fantasia</span>
                                    <span style={{ display: 'block' }}>{contact.agency_fancy}</span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {hasOthersContacts && !showFirstEvaluation && !showSecondEvaluation && !showThreeEvaluation && (
                    <>
                        <ProjectDetailSubtitle>Outros contatos</ProjectDetailSubtitle>
                        {project.others_contacts.map((contact) => (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {contact.name && (
                                    <div style={{ margin: 10 }}>
                                        <span style={{ display: 'block', fontWeight: 'bold' }}>Nome</span>
                                        <span style={{ display: 'block' }}>{contact.name}</span>
                                    </div>
                                )}
                                {contact.email && (
                                    <div style={{ margin: 10 }}>
                                        <span style={{ display: 'block', fontWeight: 'bold' }}>Email</span>
                                        <span style={{ display: 'block' }}>{contact.email}</span>
                                    </div>
                                )}
                                {contact.tel && (
                                    <div style={{ margin: 10 }}>
                                        <span style={{ display: 'block', fontWeight: 'bold' }}>Telefone</span>
                                        <span style={{ display: 'block' }}>{contact.tel}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}
                <IfElse condition={showFirstEvaluation && project}
                    True={
                        <FirstEvaluationProject project={project} user={user}></FirstEvaluationProject>
                    }
                    False={
                        <span></span>
                    }
                />
                <IfElse condition={showSecondEvaluation && project}
                    True={
                        <SecondEvaluationProject project={project} user={user}></SecondEvaluationProject>
                    }
                    False={
                        <span></span>
                    }
                />
                <IfElse condition={showThreeEvaluation && project}
                    True={
                        <ThreeEvaluationProject project={project} user={user}></ThreeEvaluationProject>
                    }
                    False={
                        <span></span>
                    }
                />
            </ProjectDetailsContainer>
        </Container>
    )
}

export default ProjectDetails;