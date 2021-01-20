import styled, { css } from "styled-components";

export const Container = styled.ul`
  margin-top: 20px;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    color: #444;
    justify-content: end;
    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 4px;
  color: black;
  ${({ completed, error }) =>
    error ? css`background-color: red; color: white;` :
      completed && css`background-color: green; color: white;`
  }}
    strong {
      color: inherit;
    }
    span {
      font-size: 12px;
      color: inherit;
      margin-top: 5px;
    }

  .delete-button {
    padding: 0;
  }
`;

export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
