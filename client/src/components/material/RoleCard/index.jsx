import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ButtonMaterial from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

const StyledCard = styled(Card)`
  &.role-card {
    background-color: #FAFAFA;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    a {
      color:rgb(0, 48, 101);
      cursor: pointer;
    }
  }
`;

const RoleCard = ({ title, to, icon, children }) => {
  return (
    <StyledCard className='role-card'>
      <CardContent>
        <Link to={to}>
          <div>{icon}</div>
          <ButtonMaterial>
            {title}
          </ButtonMaterial>
        </Link>
        {children}
      </CardContent>
    </StyledCard>
  )
}

export default RoleCard
