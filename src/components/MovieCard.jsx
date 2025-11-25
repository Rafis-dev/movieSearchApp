export const MovieCard = ({ movie }) => {
  return (
    <li className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : '/no-movie.png'
        }
        alt={`poster to a movie ${movie.title}`}
      />

      <div className="mt-4">
        <h3>{movie.title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="star icon" />
            <p>
              {movie.vote_average
                ? movie.vote_average.toFixed(1)
                : 'Нет данных'}
            </p>
          </div>

          <span>•</span>

          <p className="lang">{movie.original_language}</p>

          <span>•</span>

          <p className="year">
            {movie.release_date
              ? movie.release_date.split('-')[0]
              : 'Нет данных'}
          </p>
        </div>
      </div>
    </li>
  );
};
