import React from 'react'
import styled from 'styled-components'
import Title from './../../components/material/Title'

const StyledProfile = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;

  .main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    color: #ffffff;
    background: rgb(0, 48, 101);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .associate {
    display: flex;
    align-items: center;
  }

  .bio {
    text-align: justify;
    word-break: break-all;
  }

  .segments {
    color: rgb(0, 48, 101);
    text-align: center;
    margin-top: 20px;
  }

  h2, h3, h4, h6 {
    color: rgb(0, 48, 101);;
  }

  a {
    text-decoration: none;
  }
`

function Profile({ id, icon, name }) {
  return (
    <StyledProfile className='profile'>
      <div className="main-info">
        <span className="image">{icon}</span>
        <Title size="md"><strong>{name}</strong></Title>
      </div>


    </StyledProfile>
  )
}

export default Profile