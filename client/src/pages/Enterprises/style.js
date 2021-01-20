import styled from 'styled-components';

export const Draft = styled.p`
  color: #ffa500;
  font-weight: 600
`;

export const Concluded = styled.p`
  color: #008000;
  font-weight: 600
`;

export const Pending = styled.p`
  color: #ff0000;
  font-weight: 600
`;

export const Container = styled.div`
  box-sizing: border-box;
  height: inherit;
  width: 95%;
  display: block;
  margin: 10px auto;
`;
export const Title = styled.h1`
  font-size: 22px;  
  color:#fc9b44;
  margin: 2vw 0;
  text-align: center;
`;
export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  min-height: calc(100vh - 200px);
`
export const WrapperChoices = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`

/* STYLES ALLENTERPRISE */

export const WrapperSearchEnterprise = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const StyledButtonSearch = styled.button`
  padding: 10px;
  background-color: #6f0000;
  color: #fc9b44;
  `
  export const GroupButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
`;

export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 8px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 0px 2px 6px  rgba(0,0,0,0.1);
  overflow: hidden;
  max-height: ${({ showProjects, childrenLength }) => showProjects ? `${childrenLength * 300}px` : '61px'};
  will-change: max-height;
  transition: max-height .5s ease-in-out;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .projects-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .project-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    .wrapper {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 0;

      .tags {
        margin: 5px;
      }

      p {
        font-weight: bold;
        margin-left: 5px;
      }
    }
  }
`