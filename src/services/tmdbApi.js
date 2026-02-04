const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const fetchFromTMDB = async (endpoint) => {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('TMDB API Error:', error);
    throw error;
  }
};


export const getPopularMovies = () => {
  return fetchFromTMDB('/movie/popular');
};

export const getLatestMovies = () => {
    return fetchFromTMDB('/movie/now_playing');
}