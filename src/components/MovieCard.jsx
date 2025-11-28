export const MovieCard = ({ movie, onClick }) => {
  return (
    <li className="movie-card" onClick={onClick}>
      <img
        className="text-gray-100"
        src={
          movie.posterUrlPreview ? `${movie.posterUrlPreview}` : '/no-movie.png'
        }
        alt={`постер к фильму ${movie.nameRu || movie.nameOriginal}`}
      />

      <div className="mt-4">
        <h3>{movie.nameRu || movie.nameOriginal}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="star icon" />
            <p
              className={
                !movie.ratingKinopoisk
                  ? ''
                  : movie.ratingKinopoisk < 5
                  ? 'text-red-500'
                  : movie.ratingKinopoisk >= 5 && movie.ratingKinopoisk <= 7
                  ? 'text-gray-200'
                  : 'text-green-400'
              }
            >
              {movie.ratingKinopoisk
                ? movie.ratingKinopoisk.toFixed(1)
                : 'Нет данных'}
            </p>
          </div>

          <p className="lang">{movie.genres.map(g => g.genre).join(', ')}</p>

          <p className="year">{movie.year ? movie.year : 'Нет данных'}</p>
        </div>
      </div>
    </li>
  );
};
