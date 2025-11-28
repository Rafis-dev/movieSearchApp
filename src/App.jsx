import { useState } from 'react';
import { Search } from './components/Search';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';
import { useDebounce } from 'react-use';
import { useMovies } from './hooks/useMovies';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { scroller } from 'react-scroll';
import 'react-responsive-modal/styles.css';
import { ModalMovie } from './components/ModalMovie';
import { useLockBodyScroll } from './hooks/useLockBodyScroll';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const onOpenModal = id => {
    setModalOpen(true);
    setSelectedMovieId(id);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const onChange = page => {
    setCurrentPage(page);
    scroller.scrollTo('myScrollToElement', {
      duration: 1000,
      smooth: true,
      offset: -50,
    });
  };

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  useLockBodyScroll(openModal);

  const { movieList, isLoading, errorMessage, totalItems } = useMovies(
    debouncedSearchTerm,
    currentPage
  );

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <div className="header-content">
          <img src="./hero-img.png" alt="Hero banner" />
          <h1>
            Ищите <span className="text-gradient">фильмы</span> без лишних
            хлопот
          </h1>
        </div>

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
                <MovieCard
                  key={movie.kinopoiskId}
                  movie={movie}
                  onClick={() => onOpenModal(movie.kinopoiskId)}
                  blockScroll={false}
                />
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

      {openModal && (
        <ModalMovie
          openModal={openModal}
          onCloseModal={onCloseModal}
          id={selectedMovieId}
        />
      )}
    </main>
  );
}

export default App;
