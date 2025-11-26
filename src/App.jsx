import { useState } from 'react';
import { Search } from './components/Search';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';
import { useDebounce } from 'react-use';
import { useMovies } from './hooks';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { animateScroll as scroll, scroller } from 'react-scroll';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = page => {
    setCurrentPage(page);
    scroller.scrollTo('myScrollToElement', {
      duration: 1000,
      smooth: true,
      offset: -50,
    });
  };

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const { movieList, isLoading, errorMessage, totalItems } = useMovies(
    debouncedSearchTerm,
    currentPage
  );

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
          <h2 className="mt-[40px] text-center" name="myScrollToElement">
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

        {!isLoading && (
          <Pagination
            total={totalItems}
            pageSize={20}
            onChange={onChange}
            current={currentPage}
            align="center"
            hideOnSinglePage
          />
        )}
      </div>
    </main>
  );
}

export default App;
