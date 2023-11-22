import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { fetchBySearchMovie } from 'components/Api/Api';
import { Loader } from 'components/Loader/Loader';
import { MovieList } from 'components/MovieList/MovieList';
import {
  Wrapper,
  SearchTitle,
  SearchInput,
  SearchForm,
  SearchButton,
} from './MoviesSearch.styled';
import { errorMessage, infoMessage } from 'services/notifications';

const MoviesSearch = () => {
  const [query, setQuery] = useState('');
  const [requestedMovies, setRequestedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const savedQuery = searchParams.get('query') ?? '';
  const navigate = useNavigate();

  useEffect(() => {
    if (!savedQuery) {
      setRequestedMovies([]);
      setLoading(false);
      return;
    }
    (async function getSearchQuery() {
      try {
        const res = await fetchBySearchMovie(savedQuery);

        if (res.data.results.length === 0) {
          setRequestedMovies([]);
          setLoading(false);
          errorMessage('Not found! Try another query');
          return navigate(`/movies`);
        }

        setRequestedMovies(res.data.results);
        setLoading(false);
      } catch {
        console.log('Oops! Something went wrong! Try again!');
        errorMessage('Oops! Something went wrong! Try again!');
        return;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    
    if (!query.trim()) {
      setLoading(false);
      infoMessage('Enter a query to search');
      return;
    }
    if (savedQuery === query.trim().toLowerCase()) {
      setLoading(false);
      infoMessage('Enter a new query');
      return;
    }
    
    setSearchParams({ query: query.trim().toLowerCase() });
  };

  return (
    <>
      <Wrapper>
        <SearchTitle>Movie search</SearchTitle>
        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            onChange={e => {
              setQuery(e.target.value);
            }}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Enter a search query"
          />
          <SearchButton type="submit">
            <AiOutlineSearch />
          </SearchButton>
        </SearchForm>
      </Wrapper>
      <MovieList moviesArr={requestedMovies} />
      <Loader loading={loading} />
    </>
  );
};

export default MoviesSearch;
