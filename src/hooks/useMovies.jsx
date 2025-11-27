import { useState, useEffect } from 'react';
import { API_BASE_URL, API_OPTIONS } from '../const';

export const useMovies = (query = '', page) => {
  const [movieList, setMovieList] = useState([]);

  const [totalPages, setTotalPages] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
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
            )}&page=${page}`
          : `${API_BASE_URL}/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          const fail = await response.json();
          throw new Error(`Failed to fetch movies. ${fail.message}`);
        }

        const data = await response.json();
        setMovieList(data.items);
        setTotalPages(data.totalPages);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error);
        setErrorMessage('Error fecthing movies. Please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  return { movieList, isLoading, errorMessage, totalPages, totalItems };
};
