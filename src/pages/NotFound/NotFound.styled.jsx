import styled from 'styled-components';

export const NotFoundSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100vw;
  padding: 0;
`;

export const NotFoundStatus = styled.b`
  font-size: 60px;
  margin-bottom: 20px;
  color: red;
`;

export const NotFoundText = styled.b`
  font-size: 30px;
  margin-bottom: 40px;
  color: white;
`;

export const GoHomeBtn = styled.button`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 17px;
  padding: 7px 15px;
  border: 2px solid black;
  border-radius: 5px;
  border-color: black;
  text-decoration: none;
  color: black;
  background-color: white;
  transition: all 200ms linear;

  &:hover,
  &:focus {
    color: white;
    background-color: red;
  }
`;
