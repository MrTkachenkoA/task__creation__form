import styled from 'styled-components';

export const MovieReviewsList = styled.ul`
  width: 80%;
  padding: 0;
  margin: 0 auto;
  list-style: none;
`;

export const MovieReviewsItem = styled.li`
  padding: 20px;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const DontHaveFurtherInfo = styled.p`
  font-weight: 700;
  max-width: 433px;
  margin: 0 auto;
  padding: 10px 15px;
  color: white;
  background-color: red;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
`;
