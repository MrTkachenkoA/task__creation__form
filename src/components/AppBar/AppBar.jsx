import { Header, Nav, StyledLink } from './AppBar.styled';

export const AppBar = () => {
  return (
    <Header>
      <Nav>
        <StyledLink to="/" tabIndex="1">
          Home
        </StyledLink>
        <StyledLink to="/movies" tabIndex="1">
          Movies
        </StyledLink>
      </Nav>
    </Header>
  );
};
