import React from 'react'
import styled from 'styled-components'

import Title from './../../components/material/Title'
import Text from './../../components/material/Text'

const StyledInfo = styled.div`
  width: 100%;
  margin-right: 70px;
  
  .sec {
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(26,26,26, .2);
    &:last-child {
      border-bottom-color: transparent;
    } 

    h6 {
      color: rgb(0, 48, 101);;
    }
  }

  .values {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .field {
      width: 100%;
      display: flex;
      flex-direction: column;

      strong {
        color: rgb(0, 48, 101);;
      }
    }
  }
`

function Info({ infoList }) {
  return (
    <StyledInfo className='info'>
      {
        infoList.map((info, index) => (
          <div className="sec" key={`${info.title}-${index}`}>
            <Title align="left" size="xs"><strong>{info.title}</strong></Title>
            <div className="values">
              {
                info.values.map((val, index) => (
                  <div className="field" key={`${val.campo}-${index}`}>
                    <Text color="black"><strong>{val.campo}</strong></Text>
                    <Text color="secondary">{val.valor}</Text>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </StyledInfo>
  )
}

export default Info