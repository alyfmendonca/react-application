import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  display: flex;
  margin: 10px auto;
  flex-direction: column;
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 200px);
`

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 600;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
`

export const SubTitle = styled.p`
  font-size: 1.5em;
  
`

export const Label = styled.p`
  font-size: 17px;
`
export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Textarea = styled.p`
  font-size: 17px;  
  margin-left: 0.5vw;
  color: #000;
`;

export const Form = styled.form`
  width: 100%;
  margin: 25px;
`
export const StyledForm = styled.form`
  > div {
    margin: 5px 0;
  }
`

export const WrapButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const ProjectDetailsWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`
export const ProjectStatusTag = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: fit-content;
  padding: 5px 10px;
  background-color: ${({ color }) => color};
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 12px;
  margin-bottom: 5px;

`

export const ProjectListItemContainer = styled.div`
  width: 100%;
  padding: 5px 10px;
  color: white;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
  background-color: white;
  border-radius: 4px;
`

export const ProjectDetailsContainer = styled.div`
  padding: 40px 10px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`

export const ProjectDetailSubtitle = styled.h4`
  font-size: 1.5rem;
  margin: 10px 0px;
  font-weight: bold;
`
export const ProjectDetailRegionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const FirstEvaluationSubtitle = styled.h4`
  font-size: 1.5rem;
  margin-top: 50px;
  font-weight: bold;
  text-align: left
`


export const SecondEvaluationSubtitle = styled.h4`
  font-size: 1.5rem;
  margin-top: 50px;
  font-weight: bold;
`