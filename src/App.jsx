import { useEffect, useState } from 'react';
import { Search } from './components/Search';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2';
const API_KEY = import.meta.env.VITE_KP_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/films?keyword=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/films`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        setMovieList([]);
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      console.log(data.items);

      setMovieList(data.items);
    } catch (error) {
      console.log(`Error fecthing movies: ${error}`);
      setErrorMessage('Error fecthing movies. Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="all-movies">
          <h2 className="mt-[40px] text-center">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map(movie => (
                <MovieCard key={movie.kinopoiskId} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
