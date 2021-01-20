import React from 'react'

import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'

import { ThemeProvider } from '@material-ui/styles'
import { Router, Switch } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import theme from './utils/theme'
import history from './history'

import Header from './components/material/Header'
import AppBody from './components/material/AppBody'

import Users from './pages/Signup/User'
import Login from './pages/Login/Login'

import Dashboard from './pages/Dashboard/index'
import Admin from './pages/Dashboard/Admin/Admin'
import PrivateRoute from './components/PrivateRoute'

import Enterprise from './pages/Signup/Enterprise'
import AllEnterprises from './pages/Enterprises/index'
import ProjectDashboard from './pages/Dashboard/Admin/Project/ProjectDashboard';
import ProjectPremiatoryDashboard from './pages/Dashboard/Admin/ProjectPremiatory/ProjectPremiatoryDashboard';
import ProjectPremiatoryEndDashboard from './pages/Dashboard/Admin/ProjectPremiatoryEnd/ProjectPremiatoryEndDashboard';

import Agency from './pages/Signup/Agency'
import AllAgencies from './pages/Agency/index'
import AllProjects from './pages/Project/AllProjects'
import ProjectRegister from './pages/Project/ProjectRegister'
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha'
import RedefinirAsenha from './pages/RedefinirAsenha/RedefinirAsenha'
import ProjectDetails from './pages/Project/ProjectDetails'
import EditProject from './pages/Project/EditProject'
import UserProjectsList from './pages/Project/UserProjectsList'
import SwornDashboard from './pages/Dashboard/Sworn/SwornDashboard'

import SwornDashboardPremiatory from './pages/Dashboard/SwornPremiatory/SwornPremiatory'
import SwornPremiatoryEnd from './pages/Dashboard/SwornPremiatoryEnd/SwornPremiatoryEnd'
import SwornTerm from './pages/Dashboard/SwornPremiatory/swornTerm'

const App = ({ store }) => {
  return (
    <Router history={history}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <Header
              isOpened={true}
            />
            <AppBody>
              <base href="/" />
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" exact component={Users} />
                <Route path="/esqueci-senha" exact component={EsqueciSenha} />
                <Route path="/reset/:token" component={RedefinirAsenha} />
                <PrivateRoute
                  exact
                  path='/listagem/projetos/:id'
                  component={AllProjects}
                />
                <PrivateRoute
                  exact
                  path='/listagem/:userType/projetos/:id'
                  component={UserProjectsList}
                />
                <PrivateRoute
                  path='/projeto/:id'
                  exact
                  component={ProjectDetails}
                />

                <PrivateRoute
                  path='/projeto/editar/:id'
                  component={EditProject}
                />
                <PrivateRoute path='/cadastro/projeto' component={ProjectRegister} />
                <PrivateRoute path='/cadastro/empresa' component={Enterprise} />

                <Route path='/cadastro/agencia' component={Agency} />


                <PrivateRoute path='/dashboard/admin' exact component={Admin} />

                <PrivateRoute
                  path='/dashboard/admin/empresas'
                  component={AllEnterprises}
                />

                <PrivateRoute
                  path='/dashboard/admin/agencias'
                  component={AllAgencies}
                />

                <PrivateRoute
                  path='/dashboard/admin/projetos'
                  component={ProjectDashboard}
                />

                <PrivateRoute path='/dashboard/admin/projetos_premiatoria' component={ProjectPremiatoryDashboard} />
                <PrivateRoute path='/dashboard/admin/projetos_premiatoria_end' component={ProjectPremiatoryEndDashboard} />

                <PrivateRoute
                  path='/dashboard/empresa'
                  component={Dashboard}
                />

                <PrivateRoute
                  path='/dashboard/agencia'
                  component={Dashboard}
                />

                <PrivateRoute path='/dashboard/jurado' exact component={SwornDashboard} />
                <PrivateRoute path='/dashboard/jurado/termos' component={SwornTerm} />
                <PrivateRoute path='/dashboard/jurado/premiatoria' component={SwornDashboardPremiatory} />
                <PrivateRoute path='/dashboard/jurado/premiatoriaFinal' component={SwornPremiatoryEnd} />
                

                <Redirect from='*' to='/' />
              </Switch>
            </AppBody>
          </>
        </ThemeProvider>
      </StoreProvider>
    </Router>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
