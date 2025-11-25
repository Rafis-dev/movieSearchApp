import { useState, useEffect } from 'react';
import { API_BASE_URL, API_OPTIONS } from './const';

export const useMovies = (query = '') => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const endpoint = query
          ? `${API_BASE_URL}/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${encodeURIComponent(
              query
            )}`
          : `${API_BASE_URL}/api/v2.2/films/collections?type=TOP_POPULAR_ALL`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovieList(data.items);
      } catch (error) {
        console.log(`Error fecthing movies: ${error}`);
        setErrorMessage('Error fecthing movies. Please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return { movieList, isLoading, errorMessage };
};
