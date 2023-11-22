import { useState, useEffect, Suspense } from 'react';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  GoBackLink,
  MovieDetailsWrapper,
  MovieDetailsImg,
  MovieDetailsTextWrapper,
  MovieName,
  MovieUserScore,
  MovieDetailsTitle,
  MovieDetailsData,
  MovieDetailsBtnWrapper,
} from './MovieDetails.styled';
import { StyledLink } from 'components/AppBar/AppBar.styled';
import { fetchMovieDetails, IMG_PATH } from 'components/Api/Api';
import { Loader } from 'components/Loader/Loader';
import { errorMessage } from 'services/notifications';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const [loading] = useState(true);
  const { movieId } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    (async function getFilmById() {
      try {
        const res = await fetchMovieDetails(movieId);
        await setMovieData(res.data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        console.log(`Oops! Something went wrong! Try again!`);
        errorMessage(`Oops! Something went wrong! Try again!`);
        return navigate(`*`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const {
    poster_path,
    original_title,
    release_date,
    vote_average,
    overview,
    genres,
  } = movieData;

  if (!release_date) return;

  return (
    <>
      <GoBackLink to={location.state?.from ?? '/'}>Go back</GoBackLink>
      <MovieDetailsWrapper>
        <MovieDetailsImg src={IMG_PATH + poster_path} alt={original_title} />
        <MovieDetailsTextWrapper>
          <MovieName>
            {original_title + ` (${new Date(release_date).getFullYear()})`}
          </MovieName>
          <MovieUserScore>
            User score: {Math.round(vote_average * 10)}%
          </MovieUserScore>
          <MovieDetailsTitle>Overview</MovieDetailsTitle>
          <MovieDetailsData>{overview}</MovieDetailsData>
          <MovieDetailsTitle>Genres</MovieDetailsTitle>
          <MovieDetailsData>
            {genres.map(genre => genre.name).join(', ')}
          </MovieDetailsData>
          <div>
            <MovieDetailsTitle>Additional information</MovieDetailsTitle>
            <MovieDetailsBtnWrapper>
              <StyledLink
                to="cast"
                state={{ from: location.state?.from ?? '/' }}
              >
                Cast
              </StyledLink>
              <StyledLink
                to="reviews"
                state={{ from: location.state?.from ?? '/' }}
              >
                Reviews
              </StyledLink>
            </MovieDetailsBtnWrapper>
          </div>
        </MovieDetailsTextWrapper>
      </MovieDetailsWrapper>
      <Suspense fallback={<Loader loading={loading} />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
