import Modal from 'react-responsive-modal';
import { useMovie } from '../hooks/useMovie';

export const ModalMovie = ({ openModal, onCloseModal, id }) => {
  const { movie, isLoadingMovie } = useMovie(openModal ? id : null);

  return (
    <Modal open={openModal} onClose={onCloseModal} center blockScroll={false}>
      {(isLoadingMovie || !movie) && (
        <p className="text-white text-center">Загрузка...</p>
      )}

      {!isLoadingMovie && movie && (
        <>
          <h2 className="w-[calc(100%-30px)]">
            {movie.nameRu ? movie.nameRu : movie.nameOriginal} ({movie.year})
          </h2>
          <p className="title-orig mb-3">
            {movie.nameRu && movie.nameOriginal && movie.nameOriginal}
          </p>
          <div className="img-wrapper gap-4 mb-5 modal-movie md:mb-10">
            <img
              className="text-gray-100 object-contain w-100"
              src={movie.posterUrl ? `${movie.posterUrl}` : '/no-movie.png'}
              alt={`постер к фильму ${movie.nameRu || movie.nameOriginal}`}
            />
            {movie.slogan && (
              <p className="movie-info-overview self-start">"{movie.slogan}"</p>
            )}
          </div>

          <ul className="max-w-[800px] w-full">
            <li className="mb-5 gap-5 modal-movie">
              <p className="movie-info-title">Жанр</p>
              <div className="flex gap-3 flex-wrap">
                {movie.genres.map((g, i) => (
                  <span key={i} className="movie-info-genre">
                    {g.genre}
                  </span>
                ))}
              </div>
            </li>
            <li className="mb-5 gap-5 modal-movie">
              <p className="movie-info-title self-start">Сюжет</p>
              <p className="movie-info-overview">{movie.description}</p>
            </li>
            <li className="mb-5 gap-5 modal-movie">
              <p className="movie-info-title">Страна</p>
              <div className="flex gap-3 flex-wrap">
                {movie.countries.map((c, i) => (
                  <span key={i} className="movie-info-overview">
                    {c.country}
                    {i < movie.countries.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </li>
            {movie.filmLength && (
              <li className="mb-5 gap-5 modal-movie">
                <p className="movie-info-title">Время (мин)</p>
                <p className="movie-info-overview">{movie.filmLength}</p>
              </li>
            )}

            <li className="mb-5 gap-5 modal-movie">
              <p className="movie-info-title">Рейтинг кп</p>
              <p
                className={`movie-info-rating ${
                  !movie.ratingKinopoisk
                    ? 'text-white'
                    : movie.ratingKinopoisk < 5
                    ? 'text-red-500'
                    : movie.ratingKinopoisk >= 5 && movie.ratingKinopoisk <= 7
                    ? 'text-gray-200'
                    : 'text-green-400'
                }`}
              >
                {movie.ratingKinopoisk ? movie.ratingKinopoisk : 'Нет данных'}
              </p>
            </li>
            <li className="mb-5 gap-5 modal-movie">
              <p className="movie-info-title">Рейтинг imdb</p>
              <p className="movie-info-rating text-white">
                {movie.ratingImdb ? movie.ratingImdb : 'Нет данных'}
              </p>
            </li>
          </ul>
        </>
      )}
    </Modal>
  );
};
