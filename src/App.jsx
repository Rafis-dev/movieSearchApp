import { useState } from 'react';
import { Search } from './components/Search';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';
import { useDebounce } from 'react-use';
import { useMovies } from './hooks';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const { movieList, isLoading, errorMessage } = useMovies(debouncedSearchTerm);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero banner" />
          <h1>
            Ищите <span className="text-gradient">фильмы</span> без лишних
            хлопот
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="all-movies">
          <h2 className="mt-[40px] text-center">
            Киношки, мультфильмы и сериалы
          </h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-center text-white text-xl">Такого не нашли</p>
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
