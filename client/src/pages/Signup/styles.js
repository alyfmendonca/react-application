import styled from 'styled-components'

export const Section = styled.section`
  margin: 20px;
  height 100%;
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  @media (min-width: 1024px){
    width: 75%;
    margin: 0 auto;
    margin-top: 40px;
  }
`

export const Success = styled.div`
  color: #79A9D2;
  font-weight: 600;
  margin-top: 20px;
`

export const Background = styled.div`
  height: 100%;

  h2 {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }

  form {
    > * {
      margin: 5px 0;
    }
  }
`

export const WrapButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 18px;
    width: 50%;
  }

  button {
    height: fit-content;
  }
`

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
`

export const WrapObs = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1024px){
    line-height: 0.5em;
  }
`

export const TitleObs = styled.p`
color: brown;
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`

export const AssociateLegalText = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  margin: 5px 0px;
  margin-left: 8px;
`