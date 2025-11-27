export const MovieCard = ({ movie, onClick }) => {
  return (
    <li className="movie-card" onClick={onClick}>
      <img
        className="text-gray-100"
        src={
          movie.posterUrlPreview ? `${movie.posterUrlPreview}` : '/no-movie.png'
        }
        alt={`poster to a movie ${movie.nameRu}`}
      />

      <div className="mt-4">
        <h3>{movie.nameRu}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="star icon" />
            <p>
              {movie.ratingKinopoisk
                ? movie.ratingKinopoisk.toFixed(1)
                : 'Нет данных'}
            </p>
          </div>

          <span>•</span>

          <p className="lang">{movie.genres.map(g => g.genre).join(', ')}</p>

          <span>•</span>

          <p className="year">{movie.year ? movie.year : 'Нет данных'}</p>
        </div>
      </div>
    </li>
  );
};
