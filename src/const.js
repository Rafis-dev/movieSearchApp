export const API_BASE_URL = 'https://kinopoiskapiunofficial.tech';
export const API_KEY = import.meta.env.VITE_KP_API_KEY;
export const API_KEY2 = import.meta.env.VITE_KP_API_KEY2;

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
};
