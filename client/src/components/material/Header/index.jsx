import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CloseButton from './CloseButton'
import Button from '../Button'
import {
  Wrapper,
  StyledLogo,
  StyledAside,
  StyledNavLink
} from './style';

import setAuthToken from '../../../utils/setAuthToken'
import { isEmpty, getUserType } from '../../../utils/service'

const Header = () => {
  const setAuth = useStoreActions(actions => actions.auth.setAuth)
  const logoutUser = useStoreActions(actions => actions.auth.logoutUser)
  const toggleMenu = useStoreActions(actions => actions.ui.toggleMenu)
  const auth = useStoreState(state => state.auth.auth)
  const { menuOpened } = useStoreState(state => state.ui)


  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set the auth token header auth
      setAuthToken(localStorage.jwtToken)

      // Decode token and get user info and exp
      const decoded = jwtDecode(localStorage.jwtToken)

      // Set user and auth
      setAuth({
        isAuthenticated: !isEmpty(decoded),
        user: decoded
      })

      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // Logout user
        // Clear current profile
        // Redirect to login
        logoutUser()
      }
    }
  }, [setAuth, logoutUser])

  const type = getUserType(auth && auth.user.type)
  const isAuthenticated = auth && auth.isAuthenticated;
  return (
    <Wrapper
      className={`navbar ${menuOpened && 'opened'}`}
      role="navigation"
      aria-label="main navigation"
    >
      <Container>
        <Grid container justify={isAuthenticated ? 'space-between' : 'center'}>
          <a href="http://www.aberje.com.br/premio/" target="_blank" rel="noopener noreferrer">
            <StyledLogo
              src="http://www.aberje.com.br/premio/images/logotipo_premio1.png"
              width="150"
              height="64"
              alt="Aberje Logotipo"
              isNotAuthenticated={!isAuthenticated}
            />
          </a>
          {isAuthenticated && (
            <CloseButton
              aria-label="menu"
              onClick={() => toggleMenu(!menuOpened)}
              isOpened={menuOpened}
            />
          )}
        </Grid>
        {
          isAuthenticated && (
            <StyledAside
              className={menuOpened && 'opened'}
            >
              <div className="buttons">
                <a
                  href="http://aberje.com.br/premio/index.html"
                  rel="noopener noreferrer"
                  onClick={() => toggleMenu(!menuOpened)}
                >
                  <Button>Home</Button>
                </a>
                {
                  isAuthenticated &&
                  (<>
                    <NavLink to={`/dashboard/${type}`}>
                      <Button onClick={() => toggleMenu(!menuOpened)}>
                        Dashboard
                      </Button>
                    </NavLink>
                    <Button
                      onClick={() => toggleMenu(!menuOpened)}
                    ><span onClick={logoutUser}>Sair</span></Button>
                  </>)
                }
              </div>
            </StyledAside>
          )
        }
      </Container>
    </Wrapper>
  )
}

export default Header
