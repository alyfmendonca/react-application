import styled from 'styled-components'
import React from 'react'
import { useStoreState } from 'easy-peasy'

const StyledBody = styled.div`
  color: rgb(0, 48, 101);
  position: relative;
  transition: .3s all ease-in-out;
  left: 0;
  
  &.opened {
    left: -320px;
  }

  button:hover {
    &[type='button'] {
      color:rgb(0, 48, 101);
    }
  }

  .MuiFormLabel-root,
  .MuiIconButton-colorPrimary {
    color: rgb(0, 48, 101);
  }

  .form-group {
    display: flex;

    .option {
      flex: 50%;
    }
  }

  a {
    text-decoration: none;
  }
`

const AppBody = ({ children }) => {
  const { menuOpened } = useStoreState(state => state.ui)

  return (
    <StyledBody className={menuOpened && 'opened'}>
      {children}
    </StyledBody>
  )
}

export default AppBody
