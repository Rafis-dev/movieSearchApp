import { useEffect, useState } from 'react';
import { API_BASE_URL, API_OPTIONS } from '../const';

export const useMovie = id => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const endpoint = `${API_BASE_URL}/api/v2.2/films/${id}`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          const fail = await response.json();
          throw new Error(`Возникла ошибка. ${fail.message}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  return { movie, isLoading };
};
