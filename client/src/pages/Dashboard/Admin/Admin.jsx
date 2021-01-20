import React from "react"
import Typography from '@material-ui/core/Typography'

import RoleCard from '../../../components/material/RoleCard'

import Enterprise from '@material-ui/icons/AccountBalanceOutlined'
// import Person from '@material-ui/icons/Person'
import { WrapperChoices, Background } from './style'

const DashboardWrapper = () => (
  <Background>
    <Typography variant="h3" component="h2" gutterBottom>Escolha uma visão: </Typography>
    <WrapperChoices>
      <RoleCard
        icon={<Enterprise style={{ fontSize: 80, color: 'rgb(0, 48, 101)' }} />}
        to="/dashboard/admin/empresas"
        title="Empresas"
      />

      <RoleCard
        icon={<Enterprise style={{ fontSize: 80, color: 'rgb(0, 48, 101)' }} />}
        to="/dashboard/admin/agencias"
        title="Agências"
      />

      <RoleCard
        icon={<Enterprise style={{ fontSize: 80, color: 'rgb(0, 48, 101)' }} />}
        to="/dashboard/admin/projetos"
        title="Projetos"
      />


      <RoleCard
        icon={<Enterprise style={{ fontSize: 80, color: 'rgb(0, 48, 101)' }} />}
        to="/dashboard/admin/projetos_premiatoria"
        title="Projetos Premiatoria"
      />

      <RoleCard
        icon={<Enterprise style={{ fontSize: 80, color: 'rgb(0, 48, 101)' }} />}
        to="/dashboard/admin/projetos_premiatoria_end"
        title="Painel de Case(s)"
      />


      {/* <RoleCard
        icon={<Person style={{ fontSize: 80, color: 'rgb(0, 48, 101)' }} />}
        to="/dashboard/admin/profissionais"
        title="Profissional"
     />*/}
    </WrapperChoices>
  </Background>
)

export default DashboardWrapper