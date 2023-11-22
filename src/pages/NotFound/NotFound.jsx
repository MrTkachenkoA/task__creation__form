import { useNavigate } from 'react-router-dom';
import {
  NotFoundSection,
  NotFoundStatus,
  NotFoundText,
  GoHomeBtn,
} from './NotFound.styled';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundSection>
      <NotFoundStatus>404</NotFoundStatus>
      <NotFoundText>Page not found</NotFoundText>
      <GoHomeBtn onClick={() => navigate(`/`)}>Home page</GoHomeBtn>
    </NotFoundSection>
  );
};

export default NotFound;
