import { useState, useEffect } from 'react';
import { HomeTitle } from './Home.styled';
import { fetchTrendingMovies } from 'components/Api/Api';
import { MovieList } from 'components/MovieList/MovieList';
import { Loader } from 'components/Loader/Loader';
import { errorMessage } from 'services/notifications';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function getTrendingMovies() {
      try {
        const res = await fetchTrendingMovies();
        await setTrendingMovies(res.data.results);
        await setLoading(false);
      } catch {
        console.log(`Oops! Something went wrong! Try again!`);
        errorMessage(`Oops! Something went wrong! Try again!`);
      }
    })();
  }, []);

  return (
    <>
      <HomeTitle>Trending today</HomeTitle>
      <MovieList moviesArr={trendingMovies} />
      <Loader loading={loading} />
    </>
  );
};

export default Home;
