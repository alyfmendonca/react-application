import styled from 'styled-components';

export const FullWidth = styled.div`
  width: 100%;
  padding: 40px;
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`

export const Background = styled.div`
  height: calc(100vh - 200px);

  button[type='submit'] {
    display: block;
    width: 100%;
  }

  h2 {
    text-align: center;
  }
`

export const Title = styled.h3`
  color:#000;
  font-size: 40px;
`

export const FormStyled = styled.form`
width: 50%;
@media(max-width:650px){
  width: 100%;
}
`